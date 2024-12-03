import {
  Keypair,
  Transaction,
  SystemProgram,
  PublicKey,
  Connection,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as bs58 from "bs58";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const account = {
  pubKey: process.env.PUBKEY,
  privKey: process.env.PRIVKEY,
};

const connection = new Connection(clusterApiUrl(WalletAdapterNetwork.Devnet));

export async function sendSolFunds({
  address,
  amount,
}: {
  address: string;
  amount: number | undefined;
}) {
  const myAccount = Keypair.fromSecretKey(
    bs58.default.decode(account.privKey!)
  );

  const transaction = new Transaction();

  // const balance = await connection.getBalance(myAccount.publicKey)

  if (!amount) return null;

  try {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: myAccount.publicKey,
        toPubkey: new PublicKey(bs58.default.decode(address)),
        lamports: amount,
      })
    );

    const trans = await sendAndConfirmTransaction(
      connection,
      transaction,
      [myAccount],
      {
        commitment: "confirmed",
      }
    );

    return trans;
  } catch (error) {
    console.log(error);

    return null;
  }
}
