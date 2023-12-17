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
        if (req.method === 'GET') {
            const data = await db.game.groupBy({
                by: 'address',
                orderBy: {
                    _count: {
                        address: 'desc'
                    }
                },
                take: 20
            })
            return res.status(200).json({ data })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }


}