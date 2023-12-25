// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/utils/db'
import { WHEELZ, wallet, prizes } from '@/utils/giftWallet'
import { OUTCOME } from '@/components/rafflepage/wheel-data'
import { Transaction } from '@meshsdk/core'
import { xmaxAssetId } from '@/utils/services'

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

      const { address, outcome, name, wager } = req.body

      if (!address && !outcome && !name) return res.status(400).json({ message: 'Bad request' })

      await db.game.create({
        data: {
          address,
          outcome,
          name
        }
      })



      if (outcome === OUTCOME.WIN) {
        await whiteList({ name, address })
        sharePrizes({ address, outcome, name, wager })
      }


      return res.status(200).json({ message: 'Data added' })

    } else if (req.method === 'GET') {

      const data = await db.game.findMany()
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


async function sharePrizes({ address, name, wager }: args) {

  try {

    if (name.includes('ADA')) {

      const amount = prizes[wager].find(item => item.name === name)

      if (amount) {

        const tx = new Transaction({ initiator: wallet })
          .sendLovelace(
            address,
            amount.amount
          )
          ;

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        await wallet.submitTx(signedTx);
      }

    } else if (name.includes('XMAX')) {

      const amount = prizes[wager].find(item => item.name === name)

      if (amount) {

        const tx = new Transaction({ initiator: wallet })
          .sendAssets(
            address,
            [
              {
                unit: xmaxAssetId,
                amount: amount.amount
              }
            ]
          )
          ;

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        await wallet.submitTx(signedTx);
      }

    }

  } catch (error) {
    console.log('PRIZE SHARING ERROR', error);

  }



}