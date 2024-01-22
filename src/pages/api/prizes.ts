import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/utils/db'
import { CLAIMED, Prizes } from '@prisma/client';
import { WHEELZ, prizes as prizesLib, blockchainProvider } from '@/utils/giftWallet'
import { oneLoveLace } from '@/utils/services';
import { sharePrizes } from './games';


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
            const { address } = req.query

            let prizesAdaNotClaimed = await db.prizes.findMany({
                where: {
                    address: address as string,
                    name: {
                        endsWith: "ADA"
                    },
                    claimed: CLAIMED.NO
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            let prizesAdaClaimed = await db.prizes.findMany({
                where: {
                    address: address as string,
                    name: {
                        endsWith: "ADA",
                    },
                    claimed: CLAIMED.YES
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            if (prizesAdaNotClaimed.length > 0) prizesAdaNotClaimed = [prizesAdaNotClaimed.reduce((acc, cv) => {

                let accAda: number = 0

                const amount = prizesLib[cv.wager as WHEELZ].find(item => item.name === cv.name)

                if (acc.name.includes('X') && amount) {

                    const accAmount = prizesLib[acc.wager as WHEELZ].find(item => item.name === acc.name)

                    if (accAmount) accAda = (Number(accAmount.amount) / oneLoveLace) + (Number(amount.amount) / oneLoveLace)
                }

                else if (!acc.name.includes('X') && amount) accAda = Number(acc.name.split(' ')[0]) + Number(amount.amount) / oneLoveLace

                return {
                    ...acc,
                    name: `${accAda} ADA`
                }
            })]

            if (prizesAdaClaimed.length > 0) prizesAdaClaimed = [prizesAdaClaimed.reduce((acc, cv) => {
                let accAda: number = 0

                const amount = prizesLib[cv.wager as WHEELZ].find(item => item.name === cv.name)

                if (acc.name.includes('X') && amount) {

                    const accAmount = prizesLib[acc.wager as WHEELZ].find(item => item.name === acc.name)

                    if (accAmount) accAda = (Number(accAmount.amount) / oneLoveLace) + (Number(amount.amount) / oneLoveLace)
                }

                else if (!acc.name.includes('X') && amount) accAda = Number(acc.name.split(' ')[0]) + Number(amount.amount) / oneLoveLace

                return {
                    ...acc,
                    name: `${accAda} ADA`
                }
            })]


            let prizesOther = await db.prizes.findMany({
                where: {
                    address: address as string,
                    NOT: [
                        {
                            name: {
                                contains: "X ADA"
                            },

                        },
                        // {
                        //     name: {

                        //         contains: "X "
                        //     },
                        // }
                    ]

                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            const prizes = [
                ...prizesAdaNotClaimed,
                ...prizesOther,
                ...prizesAdaClaimed,
            ]

            // console.log(prizes);



            return res.status(200).json({ data: prizes })
        }

        else if (req.method === 'POST') {
            console.log('my body bitch', req.body);

            const {
                name,
                address,
                createdAt,
                outcome,
                wager,

            }: Prizes = req.body

            if (name.endsWith("ADA")) {

                const prizesAdaNotClaimed = await db.prizes.findMany({
                    where: {
                        address: address,
                        name: {
                            endsWith: "ADA"
                        },
                        claimed: CLAIMED.NO
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })

                const prizesAdaNotClaimedACC = prizesAdaNotClaimed.reduce((acc, cv) => {
                    let accAda: number = 0

                    const amount = prizesLib[cv.wager as WHEELZ].find(item => item.name === cv.name)

                    if (acc.name.includes('X') && amount) {

                        const accAmount = prizesLib[acc.wager as WHEELZ].find(item => item.name === acc.name)

                        if (accAmount) accAda = (Number(accAmount.amount) / oneLoveLace) + (Number(amount.amount) / oneLoveLace)
                    }

                    else if (!acc.name.includes('X') && amount) accAda = Number(acc.name.split(' ')[0]) + Number(amount.amount) / oneLoveLace

                    return {
                        ...acc,
                        name: `${accAda} ADA`
                    }
                })

                if (prizesAdaNotClaimedACC.name !== name) {
                    return res.status(400).json({ message: 'Bad request' })
                }

                const amount = Number(prizesAdaNotClaimedACC.name.split(' ')[0]) * oneLoveLace

                const trans = await sharePrizes({
                    address,
                    outcome,
                    name,
                    wager: wager as WHEELZ,
                    amount: amount.toString()
                })


                if (!trans) {
                    return res.status(400).json({ message: 'Transaction failed' })
                }

                await db.prizes.updateMany({
                    where: {
                        address: address,
                        name: {
                            endsWith: "ADA"
                        },
                        claimed: CLAIMED.NO
                    },
                    data: {
                        claimed: CLAIMED.YES
                    }
                })

            }
            else {
                const prizesOther = await db.prizes.findFirst({
                    where: {
                        address: address,
                        name,
                        createdAt,
                        claimed: CLAIMED.NO
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })

                if (!prizesOther) {
                    return res.status(400).json({ message: 'Bad request' })
                }

                await db.prizes.update({
                    where: {
                        id: prizesOther.id
                    },
                    data: {
                        claimed: CLAIMED.YES
                    }
                })
            }

            return res.status(200).json({ message: 'Updated' })
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' })
    }
}


