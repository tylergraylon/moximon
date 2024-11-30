import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function useBalance() {
  const [balance, setBalance] = useState<null | string>(null);
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    (async () => {
      if (publicKey) {
        const bal = await connection.getBalance(publicKey);

        console.log("balance", bal);

        setBalance((bal / LAMPORTS_PER_SOL).toFixed(3));
      }
    })();
  }, [publicKey, connected]);

  return {
    balance,
  };
}
