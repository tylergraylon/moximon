import { blockFrostApiKey } from "./services";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export enum WHEELZ {
  ten = "ten",
  fifty = "fifty",
  hundred = "hundred",
  fivehundred = "fivehundred",
  onethousand = "onethousand",
  onethousandfive = "onethousandfive",
}

export const prizes = {
  [WHEELZ.ten]: [
    {
      name: "1X SOL",
      amount: 0.1 * 1 * LAMPORTS_PER_SOL,
    },
    {
      name: "2X SOL",
      amount: 0.1 * 2 * LAMPORTS_PER_SOL,
    },
    {
      name: "5 SOL",
      amount: 0.1 * 5 * LAMPORTS_PER_SOL,
    },
    {
      name: "1X SOL",
      amount: 0.1 * 1 * LAMPORTS_PER_SOL,
    },
    {
      name: "2 SOL",
      amount: 2 * LAMPORTS_PER_SOL,
    },
    {
      name: "3X SOL",
      amount: 0.1 * 3 * LAMPORTS_PER_SOL,
    },

    {
      name: "1 SOL",
      amount: 1 * LAMPORTS_PER_SOL,
    },
  ],
  [WHEELZ.fifty]: [
    {
      name: "3 SOL",
      amount: 3 * LAMPORTS_PER_SOL,
    },
    {
      name: "4 SOL",
      amount: 4 * LAMPORTS_PER_SOL,
    },
    {
      name: "2 SOL",
      amount: 2 * LAMPORTS_PER_SOL,
    },

    {
      name: "5X SOL",
      amount: 0.25 * 5 * LAMPORTS_PER_SOL,
    },
    {
      name: "2X SOL",
      amount: 0.25 * 2 * LAMPORTS_PER_SOL,
    },
    {
      name: "3X SOL",
      amount: 0.25 * 3 * LAMPORTS_PER_SOL,
    },
    {
      name: "5X SOL",
      amount: 0.25 * 5 * LAMPORTS_PER_SOL,
    },
    {
      name: "1X SOL",
      amount: 0.25 * 1 * LAMPORTS_PER_SOL,
    },
  ],
  [WHEELZ.hundred]: [
    {
      name: "8 SOL",
      amount: 8 * LAMPORTS_PER_SOL,
    },
    {
      name: "1X SOL",
      amount: 0.5 * 1 * LAMPORTS_PER_SOL,
    },
    {
      name: "3X SOL",
      amount: 0.5 * 3 * LAMPORTS_PER_SOL,
    },
    {
      name: "1X SOL",
      amount: 0.5 * 1 * LAMPORTS_PER_SOL,
    },
    {
      name: "2X SOL",
      amount: 0.5 * 2 * LAMPORTS_PER_SOL,
    },

    {
      name: "4 SOL",
      amount: 4 * LAMPORTS_PER_SOL,
    },
    {
      name: "2 SOL",
      amount: 2 * LAMPORTS_PER_SOL,
    },
  ],
  [WHEELZ.fivehundred]: [
    {
      name: "5 SOL",
      amount: 5 * LAMPORTS_PER_SOL,
    },
  ],
  [WHEELZ.onethousand]: [
    {
      name: "5 SOL",
      amount: 5 * LAMPORTS_PER_SOL,
    },
  ],
  [WHEELZ.onethousandfive]: [
    {
      name: "5 SOL",
      amount: 5 * LAMPORTS_PER_SOL,
    },
  ],
};
