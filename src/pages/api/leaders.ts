import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";

type Data = {
  message?: string;
  data?: {}[];
};

const leaders = [
  {
    address: "oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7",
  },
  {
    address: "DDws22Z91d3ZzxPFCqvh1BWZY1zyZzLzGHVXXQw5bhwc",
  },
  {
    address: "7H2aMNigJrHi5TtXtDtEN9NFQRp5x7GQR48SUWdZ7SnW",
  },
  {
    address: "BwEkdn8SgNQZkZJhEQStmv4MPEZtqHjurKVxJycGRYLm",
  },
  {
    address: "6rRiMihF7UdJz25t5QvS7PgP9yzfubN7TBRv26ZBVAhE",
  },
  {
    address: "DEPKEYTPgU7T3Jj4BfKSurvA2SAxxXpbzuuRexjNxFYz",
  },
  {
    address: "2CTUgWzXexb8YLknnLbTMEEugMXMup8r7GjT3KsY6j99",
  },
  {
    address: "xx3nK3x3MCpYxgZsgRQPFoucfewJhFk2EUqysgQ9hAm",
  },
  {
    address: "ZarcMnrdRLojGFwMPKJ9prwzcAdjWSJDV2pBogab4iT",
  },
  {
    address: "8X35rQUK2u9hfn8rMPwwr6ZSEUhbmfDPEapp589XyoM1",
  },
  {
    address: "F4oEKU8a1bPfQaXiHAnPLQ34fMUmjgp2p5AJSwxU36wd",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      const data = await db.game.groupBy({
        by: ["address"],
        _count: {
          address: true,
        },
        orderBy: {
          _count: {
            address: "desc",
          },
        },
        take: 20,
      });
      return res.status(200).json({ data: leaders });
    }

    return res.status(400).json({ message: "Bad request" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
