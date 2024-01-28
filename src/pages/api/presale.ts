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

            const { address, amountAda, amountXmax, trans } = req.body

            await db.presale.create({
                data: {
                    address,
                    amountAda,
                    amountXmax,
                    trans
                }
            })

            return res.status(200).json({ message: "LFG!!!" })
        }

        return res.status(400).json({ message: 'Bad request' })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' })
    }


}