import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

export default function useAddressCus() {
  const { publicKey } = useSolanaWallet();

  return publicKey?.toBase58();
}
