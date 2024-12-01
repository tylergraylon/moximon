import {
  BlockFrostAPI,
  BlockfrostServerError,
} from "@blockfrost/blockfrost-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/utils/db";

type Data = {
  message?: string;
  data?: {}[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "PATCH") {
      const { time } = req.body;

      if (time === "rycad") {
        // await payment({
        //     output_address: 'addr1q94rmhjkld62z8qckefyfzmv2en6ty5ckdz8tjtwqw2xus60aqyvmad3e6e6xevgjp4e7g8rewxunx65fwnpalevcmjq226pgx',
        //     amount: '10000000',
        //     words: 'apology muscle ivory dune rifle all slide tooth wheat garage joy neglect egg claim access',
        //     name: '1X ADA',
        //     outcome: 'WIN'
        // })

        await db.unpaid.create({
          data: {
            address:
              "addr1q94rmhjkld62z8qckefyfzmv2en6ty5ckdz8tjtwqw2xus60aqyvmad3e6e6xevgjp4e7g8rewxunx65fwnpalevcmjq226pgx",
            outcome: "WIN",
            name: "1X ADA",
          },
        });
      }

      return res.status(200).json({ message: "money sent" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" });
  }
}

// This example is written in Typescript.
// In order to run it on Node.js your need to compile the code first.
// Follow instructions in README

// BIP39 mnemonic (seed) from which we will generate address to retrieve utxo from and private key used for signing the transaction
