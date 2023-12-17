// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/utils/db'

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

      const { address, outcome, name } = req.body

      if (!address && !outcome && !name) return res.status(400).json({ message: 'Bad request' })

      await db.game.create({
        data: {
          address,
          outcome,
          name
        }
      })

      if ((name as string).toLocaleLowerCase() === 'whitelist') {
        const checkWhitelist = await db.whitelist.findUnique({
          where: {
            address: address as string
          }
        })

        if (checkWhitelist) {
          await db.whitelist.create({
            data: {
              address
            }
          })
        }
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
