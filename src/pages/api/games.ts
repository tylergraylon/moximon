// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/utils/db'
import { WHEELZ, wallet, prizes } from '@/utils/giftWallet'
import { OUTCOME } from '@/components/rafflepage/jfhkjhvygcbvjh'
import { Transaction } from '@meshsdk/core'
import { xmaxAssetId } from '@/utils/services'
import { blockchainProvider } from '@/utils/giftWallet'

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

      const checkTransac = await db.game.findFirst({
        where: {
          trans: trans
        }
      })

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

        if (!checkTransac) sharePrizes({ address, outcome, name, wager, trans })
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
  wager: WHEELZ
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


export async function sharePrizes({ address, name, wager, trans }: args) {

  try {

    console.log('i got here');

    blockchainProvider.onTxConfirmed(trans, async () => {

      if (name.includes('ADA')) {

        const amount = prizes[wager].find(item => item.name === name)

        if (amount) {

          console.log('amount ooooo', amount);
          console.log('baseaddress', wallet.getBaseAddress());
          console.log('paymentAddress', wallet.getPaymentAddress());
          console.log('rewardAddress', wallet.getRewardAddress());
          console.log('usedAddress', wallet.getUsedAddress());



          const tx = new Transaction({ initiator: wallet })

          const utxo = await wallet.getUsedUTxOs()


          tx.setCollateral(utxo)


          tx.sendLovelace(
            address,
            amount.amount
          )


          const unsignedTx = await tx.build();
          const signedTx = await wallet.signTx(unsignedTx);
          const txhash = await wallet.submitTx(signedTx);

          console.log('transtx', txhash);


        }

      } else if (name.includes('XMAX')) {

        const amount = prizes[wager].find(item => item.name === name)

        if (amount) {

          const tx = new Transaction({ initiator: wallet })

          const utxo = await wallet.getUsedUTxOs()
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
          await wallet.submitTx(signedTx);
        }

      }

    })






  } catch (error) {
    console.log('PRIZE SHARING ERROR', error);

  }



}