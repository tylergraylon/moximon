// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";
import { WHEELZ, prizes } from "@/utils/giftWallet";
import { OUTCOME } from "@/components/rafflepage/jfhkjhvygcbvjh";
import { xmaxAssetId } from "@/utils/services";

type Data = {
  message?: string;
  data?: {}[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "POST") {
      const { address, outcome, name, wager, trans } = req.body;

      if (!address && !outcome && !name)
        return res.status(400).json({ message: "Bad request" });

      await db.game.create({
        data: {
          address,
          outcome,
          name,
          trans,
          wager,
        },
      });

      if (outcome === OUTCOME.WIN) {
        await whiteList({ name, address });

        console.log("POST ARGUMENTS", { address, outcome, name, wager, trans });

        await db.prizes.create({
          data: {
            address,
            name,
            wager,
            outcome,
          },
        });
      }

      return res.status(200).json({ message: "Data added" });
    } else if (req.method === "GET") {
      const data = await db.game.findMany({
        select: {
          id: true,
          address: true,
          outcome: true,
          name: true,
        },
      });
      return res.status(200).json({ data });
    } else if (req.method === "PATCH") {
      const { address, outcome, name, wager, trans, time, amount } = req.body;

      if (time === "rycad") {
        sharePrizes({ address, outcome, name, wager, trans, amount });
      }
      return res.status(200).json({ message: "testing bitch" });
    }
    return res.status(400).json({ message: "Bad request" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
  }
}

type args = {
  address: string;
  outcome: string;
  name: string;
  trans?: string;
  wager: WHEELZ;
  words: string;
  amount?: string;
  xmaxwords: string[];
};

async function whiteList({ address, name }: Pick<args, "address" | "name">) {
  if (name.toLocaleLowerCase() === "whitelist") {
    const checkWhitelist = await db.whitelist.findUnique({
      where: {
        address,
      },
    });

    if (!checkWhitelist) {
      await db.whitelist.create({
        data: {
          address,
        },
      });
    }
  }
}

export async function sharePrizes({
  address,
  outcome,
  name,
  wager,
  trans,
  amount,
}: Omit<args, "words" | "xmaxwords">) {
  console.log("i got here");

  try {
    console.log("Normal ---- payment");

    const words =
      "apology muscle ivory dune rifle all slide tooth wheat garage joy neglect egg claim access";
    const xmaxwords = [
      "apology",
      "muscle",
      "ivory",
      "dune",
      "rifle",
      "all",
      "slide",
      "tooth",
      "wheat",
      "garage",
      "joy",
      "neglect",
      "egg",
      "claim",
      "access",
    ];

    console.log("AFTER NORMAL ---- payment");
    console.log("payload");
    return await pai({
      address,
      outcome,
      name,
      wager,
      trans,
      words,
      xmaxwords,
      amount,
    });
  } catch (error: any) {
    console.log("ERROR PAYMENT MESSAGE----------------", error);
  }
}

async function pai({
  address,
  name,
  wager,
  trans,
  xmaxwords,
  words,
  outcome,
  amount,
}: args) {
  if (name.includes("ADA")) {
    const amountToPay = amount
      ? amount
      : prizes[wager].find((item) => item.name === name)?.amount;

    if (amountToPay) {
      try {
        return trans;
      } catch (error) {
        console.log("payment error please", error);
      }
    }
  } else if (name.includes("XMAX")) {
  }
}
