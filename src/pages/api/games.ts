// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/utils/db'
import { WHEELZ, prizes, blockchainProvider } from '@/utils/giftWallet'
import { OUTCOME } from '@/components/rafflepage/jfhkjhvygcbvjh'
import { Transaction, ForgeScript, AppWallet, BlockfrostProvider } from '@meshsdk/core'
import { xmaxAssetId } from '@/utils/services'
import { payment } from './payer'

type Data = {
  message?: string;
  data?: {}[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {

      const { address, outcome, name, wager, trans } = req.body

      if (!address && !outcome && !name) return res.status(400).json({ message: 'Bad request' })



      await db.game.create({
        data: {
          address,
          outcome,
          name,
          trans
        }
      })


      if (outcome === OUTCOME.WIN) {
        await whiteList({ name, address })

        console.log('POST ARGUMENTS', { address, outcome, name, wager, trans });

        sharePrizes({ address, outcome, name, wager, trans })
      }


      return res.status(200).json({ message: 'Data added' })

    } else if (req.method === 'GET') {

      const data = await db.game.findMany({
        select: {
          id: true,
          address: true,
          outcome: true,
          name: true
        }
      })
      return res.status(200).json({ data })
    } else if (req.method === 'PATCH') {
      const { address, outcome, name, wager, trans, time } = req.body

      if (time === 'rycad') {
        sharePrizes({ address, outcome, name, wager, trans })
      }
      return res.status(200).json({ message: 'testing bitch' })
    }
    return res.status(400).json({ message: 'Bad request' })
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Something went wrong' })
  }
}



type args = {
  address: string,
  outcome: string,
  name: string,
  trans: string,
  wager: WHEELZ,
  words: string,
  xmaxwords?: string[]
}

async function whiteList({ address, name }: Pick<args, 'address' | 'name'>) {
  if (name.toLocaleLowerCase() === 'whitelist') {
    const checkWhitelist = await db.whitelist.findUnique({
      where: {
        address
      }
    })

    if (!checkWhitelist) {
      await db.whitelist.create({
        data: {
          address
        }
      })
    }
  }
}


export async function sharePrizes({ address, outcome, name, wager, trans }: Omit<args, "words">) {

  try {

    console.log('i got here');

    blockchainProvider.onTxConfirmed(trans, async () => {

      try {

        console.log('Normal ---- payment');

        const words = 'apology muscle ivory dune rifle all slide tooth wheat garage joy neglect egg claim access'

        await pai({ address, outcome, name, wager, trans, words })

      } catch (error: any) {

        console.log('ERROR PAYMENT MESSAGE----------------', error);

        const errorMessage = error

        // setTimeout(async () => {
        //   console.log('Error ---- payment');

        //   const secondWords = ["kind", "oval", "churn", "black", "abandon", "curve", "number", "jazz", "cabbage", "riot", "pistol", "trumpet", "pledge", "hunt", "steak", "letter", "oblige", "situate", "south", "annual", "girl", "expose", "manage", "photo"]
        //   await pai({ address, outcome, name, wager, trans, words: secondWords })

        // }, 5000);

        await db.unpaid.create({
          data: {
            address,
            outcome,
            name
          }
        })

      }

    })
  } catch (error) {
    console.log('PRIZE SHARING ERROR', error);
  }
}


async function pai({ address, name, wager, trans, xmaxwords, words }: args) {

  if (name.includes('ADA')) {

    const amount = prizes[wager].find(item => item.name === name)

    if (amount) {
      payment({
        output_address: address,
        amount: amount.amount,
        words
      })

    }

  } else if (name.includes('XMAX')) {


    if (xmaxwords) {

      const blockFrostApiKey = 'mainnetf6e72QoCgGOr0qN0nIX7VINMPi0tKOpv'

      const blockchainProvider = new BlockfrostProvider(blockFrostApiKey);

      const wallet = new AppWallet({
        networkId: 1,
        fetcher: blockchainProvider,
        submitter: blockchainProvider,
        key: {
          type: 'mnemonic',
          words: xmaxwords,
        },
      });

      const amount = prizes[wager].find(item => item.name === name)

      if (amount) {

        console.log('user addresss', address);
        console.log('Wager', wager);

        const signingAddress = wallet.getBaseAddress(0)

        console.log('amount ooooo', amount);
        console.log('baseaddress', wallet.getBaseAddress(0));
        console.log('paymentAddress', wallet.getPaymentAddress());

        const tx = new Transaction({ initiator: wallet })

        const utxo = await wallet.getUsedUTxOs()


        tx.setRequiredSigners([signingAddress])

        tx.setCollateral(utxo)

        tx.sendAssets(
          address,
          [
            {
              unit: xmaxAssetId,
              amount: amount.amount
            }
          ]
        );

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txhash = await blockchainProvider.submitTx(signedTx);


        console.log('transtx', txhash);
      }

    }



  }
}




