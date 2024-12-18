import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";
import { CLAIMED, Prizes } from "@prisma/client";
import { WHEELZ, prizes as prizesLib } from "@/utils/giftWallet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { sharePrizes } from "./games";
import { sendSolFunds } from "@/utils/sender";

type Data = {
  message?: string;
  data?: {}[];
};

const blackList = [
  "addr1q8nz8y88awkl6q2adgl5yhxyphe9hv0uelgx6qm5t4zx5aw7anlpx87jac4cdem2v7u4r7akfha6gjg9g7jt5ty9laxsfka62f",
  "addr1q9txudqa4vp7zfujxxc83llmyeqc5jjgqew32sksmwesgeyyftcusy4pwn8nvfapnv3n6qutvhkymmk7qjzvlfl96wyq6qurfy",
  "addr1q92r3kdsc7t9v38xaw7ch58alkr0utwk5t97jcvhh2pahsaxahs2txqwlk0zrmnq7tc233cqfrku7cy43uphnm4vwdqqheal5y",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      const { address } = req.query;

      let prizesAdaNotClaimed = await db.prizes.findMany({
        where: {
          address: address as string,
          name: {
            endsWith: "SOL",
          },
          claimed: CLAIMED.NO,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let prizesAdaClaimed = await db.prizes.findMany({
        where: {
          address: address as string,
          name: {
            endsWith: "SOL",
          },
          claimed: CLAIMED.YES,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let prizesXmaxNotClaimed = await db.prizes.findMany({
        where: {
          address: address as string,
          name: {
            endsWith: "XMAX",
          },
          claimed: CLAIMED.NO,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let prizesXmaxClaimed = await db.prizes.findMany({
        where: {
          address: address as string,
          name: {
            endsWith: "XMAX",
          },
          claimed: CLAIMED.YES,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (prizesAdaNotClaimed.length > 0)
        prizesAdaNotClaimed = [
          extractAmountSol({
            sym: "SOL",
            prizes: prizesAdaNotClaimed,
            extract: "X",
          }),
        ];

      if (prizesAdaClaimed.length > 0)
        prizesAdaClaimed = [
          extractAmountSol({
            sym: "SOL",
            prizes: prizesAdaClaimed,
            extract: "X",
          }),
        ];

      if (prizesXmaxNotClaimed.length > 0)
        prizesXmaxNotClaimed = [
          extractAmountXMAX({
            sym: "XMAX",
            prizes: prizesXmaxNotClaimed,
            extract: "$XMAX",
          }),
        ];

      if (prizesXmaxClaimed.length > 0)
        prizesXmaxClaimed = [
          extractAmountXMAX({
            sym: "XMAX",
            prizes: prizesXmaxClaimed,
            extract: "$XMAX",
          }),
        ];

      let prizesOther = await db.prizes.findMany({
        where: {
          address: address as string,
          NOT: [
            {
              name: {
                endsWith: "SOL",
              },
            },
            {
              name: {
                endsWith: "XMAX",
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const prizes = [
        ...prizesAdaNotClaimed,
        ...prizesXmaxNotClaimed,
        ...prizesOther,
        ...prizesAdaClaimed,
        ...prizesXmaxClaimed,
      ];

      // console.log(prizes);

      return res.status(200).json({ data: prizes });
    } else if (req.method === "POST") {
      // console.log('my body bitch', req.body);

      const { name, address, createdAt, outcome, wager, id }: Prizes = req.body;

      if (blackList.includes(address)) {
        return res.status(400).json({ message: "Bad request" });
      }

      if (name.endsWith("SOL")) {
        const prizesAdaNotClaimed = await db.prizes.findMany({
          where: {
            address: address,
            name: {
              endsWith: "SOL",
            },
            claimed: CLAIMED.NO,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const prizesAdaNotClaimedACC = extractAmountSol({
          sym: "SOL",
          prizes: prizesAdaNotClaimed,
          extract: "X",
        });

        if (prizesAdaNotClaimedACC.name !== name) {
          return res.status(400).json({ message: "Bad request" });
        }

        const amount = prizesAdaNotClaimedACC.name.includes("X")
          ? prizesLib[wager as WHEELZ].find(
              (item) => item.name === prizesAdaNotClaimedACC.name
            )?.amount
          : Number(prizesAdaNotClaimedACC.name.split(" ")[0]) *
            LAMPORTS_PER_SOL;

        console.log("AMOUNT 000PPP CHECK AM", amount);

        const update = await db.prizes.updateMany({
          where: {
            address: address,
            name: {
              endsWith: "ADA",
            },
            claimed: CLAIMED.NO,
          },
          data: {
            claimed: CLAIMED.YES,
          },
        });

        if (update.count < 1)
          return res.status(400).json({ message: "Already Claimed" });

        const trans = await sendSolFunds({
          address,
          amount: amount,
        });

        if (!trans) {
          console.log("Transaction failed");

          return res.status(400).json({ message: "Transaction failed" });
        }
      } else {
        const prizesOther = await db.prizes.findFirst({
          where: {
            address: address,
            name,
            id,
            createdAt,
            claimed: CLAIMED.NO,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (!prizesOther) {
          return res.status(400).json({ message: "Bad request" });
        }

        await db.prizes.update({
          where: {
            id: prizesOther.id,
          },
          data: {
            claimed: CLAIMED.YES,
          },
        });
      }

      return res.status(200).json({ message: "Updated" });
    }
    return res.status(400).json({ message: "Bad request" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
  }
}

const extractAmountSol = ({
  sym,
  prizes,
  extract,
}: {
  sym: string;
  extract: string;
  prizes: Prizes[];
}) => {
  return prizes.reduce((acc: any, cv: Prizes) => {
    let accSol: number = 0;

    const amount = prizesLib[cv.wager as WHEELZ].find(
      (item) => item.name === cv.name
    );

    if (acc.name.includes(extract) && amount) {
      const accAmount = prizesLib[acc.wager as WHEELZ].find(
        (item) => item.name === acc.name
      );

      if (accAmount)
        accSol =
          Number(accAmount.amount) / LAMPORTS_PER_SOL +
          Number(amount.amount) / LAMPORTS_PER_SOL;
    } else if (!acc.name.includes(extract) && amount)
      accSol =
        Number(acc.name.split(" ")[0]) +
        Number(amount.amount) / LAMPORTS_PER_SOL;

    return {
      ...acc,
      name: `${accSol.toFixed(2)} ${sym}`,
    };
  });
};

const extractAmountXMAX = ({
  sym,
  prizes,
  extract,
}: {
  sym: string;
  extract: string;
  prizes: Prizes[];
}) => {
  return prizes.reduce((acc: any, cv: any) => {
    let accXmax: number = 0;

    const amount = prizesLib[cv.wager as WHEELZ].find(
      (item) => item.name === cv.name
    );

    if (acc.name.includes(extract) && amount) {
      const accAmount = prizesLib[acc.wager as WHEELZ].find(
        (item) => item.name === acc.name
      );

      if (accAmount) accXmax = Number(accAmount.amount) + Number(amount.amount);
    } else if (!acc.name.includes(extract) && amount)
      accXmax = Number(acc.name.split(" ")[0]) + Number(amount.amount);

    return {
      ...acc,
      name: `${accXmax} ${sym}`,
    };
  });
};
