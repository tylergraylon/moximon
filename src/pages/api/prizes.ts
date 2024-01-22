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

            let prizesXmaxNotClaimed = await db.prizes.findMany({
                where: {
                    address: address as string,
                    name: {
                        endsWith: "XMAX"
                    },
                    claimed: CLAIMED.NO
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            let prizesXmaxClaimed = await db.prizes.findMany({
                where: {
                    address: address as string,
                    name: {
                        endsWith: "XMAX",
                    },
                    claimed: CLAIMED.YES
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })




            if (prizesAdaNotClaimed.length > 0) prizesAdaNotClaimed = [extractAmountAda({ sym: 'ADA', prizes: prizesAdaNotClaimed, extract: 'X' })]

            if (prizesAdaClaimed.length > 0) prizesAdaClaimed = [extractAmountAda({ sym: 'ADA', prizes: prizesAdaClaimed, extract: 'X' })]

            if (prizesXmaxNotClaimed.length > 0) prizesXmaxNotClaimed = [extractAmountXMAX({ sym: 'XMAX', prizes: prizesXmaxNotClaimed, extract: '$XMAX' })]


            if (prizesXmaxClaimed.length > 0) prizesXmaxClaimed = [extractAmountXMAX({ sym: 'XMAX', prizes: prizesXmaxClaimed, extract: '$XMAX' })]




            let prizesOther = await db.prizes.findMany({
                where: {
                    address: address as string,
                    NOT: [
                        {
                            name: {
                                endsWith: "ADA"
                            },

                        },
                        {
                            name: {

                                endsWith: "XMAX"
                            },
                        }
                    ]

                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            const prizes = [
                ...prizesAdaNotClaimed,
                ...prizesXmaxNotClaimed,
                ...prizesOther,
                ...prizesAdaClaimed,
                ...prizesXmaxClaimed
            ]

            // console.log(prizes);



            return res.status(200).json({ data: prizes })
        }

        else if (req.method === 'POST') {
            // console.log('my body bitch', req.body);

            const {
                name,
                address,
                createdAt,
                outcome,
                wager,
                id
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

                const prizesAdaNotClaimedACC = extractAmountAda({ sym: "ADA", prizes: prizesAdaNotClaimed, extract: 'X' })

                if (prizesAdaNotClaimedACC.name !== name) {
                    return res.status(400).json({ message: 'Bad request' })
                }

                const amount = prizesAdaNotClaimedACC.name.includes('X') ? (prizesLib[wager as WHEELZ].find(item => item.name === prizesAdaNotClaimedACC.name))?.amount : (
                    Number(prizesAdaNotClaimedACC.name.split(' ')[0]) * oneLoveLace
                )


                console.log('AMOUNT 000PPP CHECK AM', amount);



                const trans = await sharePrizes({
                    address,
                    outcome,
                    name,
                    wager: wager as WHEELZ,
                    amount: `${amount}`
                })


                if (!trans) {
                    console.log('Transaction failed');

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

            } else if (name.endsWith("XMAX")) {

                const prizesXmaxNotClaimed = await db.prizes.findMany({
                    where: {
                        address: address,
                        name: {
                            endsWith: "XMAX"
                        },
                        claimed: CLAIMED.NO
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })

                const prizesXmaxNotClaimedACC = extractAmountAda({ sym: "ADA", prizes: prizesXmaxNotClaimed, extract: '$XMAX' })

                if (prizesXmaxNotClaimedACC.name !== name) {
                    return res.status(400).json({ message: 'Bad request' })
                }

                const amount = prizesXmaxNotClaimedACC.name.includes('$XMAX') ? (prizesLib[wager as WHEELZ].find(item => item.name === prizesXmaxNotClaimedACC.name))?.amount : (
                    Number(prizesXmaxNotClaimedACC.name.split(' ')[0])
                )

                const trans = await sharePrizes({
                    address,
                    outcome,
                    name,
                    wager: wager as WHEELZ,
                    amount: `${amount}`
                })


                if (!trans) {
                    return res.status(400).json({ message: 'Transaction failed' })
                }

                await db.prizes.updateMany({
                    where: {
                        address: address,
                        name: {
                            endsWith: "XMAX"
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
                        id,
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
        return res.status(400).json({ message: 'Bad request' })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' })
    }
}


const extractAmountAda = ({ sym, prizes, extract }: { sym: string, extract: string, prizes: Prizes[] }) => {

    return prizes.reduce((acc: any, cv: any) => {

        let accAda: number = 0

        const amount = prizesLib[cv.wager as WHEELZ].find(item => item.name === cv.name)

        if (acc.name.includes(extract) && amount) {

            const accAmount = prizesLib[acc.wager as WHEELZ].find(item => item.name === acc.name)

            if (accAmount) accAda = (Number(accAmount.amount) / oneLoveLace) + (Number(amount.amount) / oneLoveLace)
        }

        else if (!acc.name.includes(extract) && amount) accAda = Number(acc.name.split(' ')[0]) + Number(amount.amount) / oneLoveLace

        return {
            ...acc,
            name: `${accAda} ${sym}`
        }
    })
}

const extractAmountXMAX = ({ sym, prizes, extract }: { sym: string, extract: string, prizes: Prizes[] }) => {

    return prizes.reduce((acc: any, cv: any) => {

        let accXmax: number = 0

        const amount = prizesLib[cv.wager as WHEELZ].find(item => item.name === cv.name)

        if (acc.name.includes(extract) && amount) {

            const accAmount = prizesLib[acc.wager as WHEELZ].find(item => item.name === acc.name)

            if (accAmount) accXmax = (Number(accAmount.amount)) + (Number(amount.amount))
        }

        else if (!acc.name.includes(extract) && amount) accXmax = Number(acc.name.split(' ')[0]) + Number(amount.amount)

        return {
            ...acc,
            name: `${accXmax} ${sym}`
        }
    })
}


