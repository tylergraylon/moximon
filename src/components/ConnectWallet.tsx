import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import Image from "next/image";
import { useEffect, useState } from "react";

const WalletList = [
  {
    name: "Nami",
    image: "/wallets/nami-wallet.svg",
    link: "https://namiwallet.io/",
  },
  {
    name: "Flint Wallet",
    image: "/wallets/flint-wallet.svg",
    link: "https://flint-wallet.com/",
  },
  {
    name: "Typhon Wallet",
    image: "/wallets/typhon-wallet.svg",
    link: "https://typhonwallet.io/#/",
  },
  {
    name: "GeroWallet",
    image: "/wallets/gero-wallet.svg",
    link: "https://gerowallet.io/",
  },
  {
    name: "Yoroi",
    image: "/wallets/yoroi-wallet.svg",
    link: "https://yoroi-wallet.com",
  },
  {
    name: "Lace",
    image: "/wallets/lace-wallet.svg",
    link: "https://www.lace.io/",
  },
];

const concord = "jhguhfguhdgfggdf";

export default function ConnectWallet({
  mobile,
  wheel,
}: {
  mobile?: boolean;
  wheel?: boolean;
}) {
  const [hydrate, setHydrate] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    setHydrate(true);
  }, []);

  if (!hydrate) return null;
  return (
    <WalletMultiButton
      className="bg-transparent"
      style={{
        background: "#66000000",
        border: !wheel ? "1px solid white " : "",
      }}
    >
      {!publicKey
        ? "Connect Wallet"
        : `${publicKey.toBase58().slice(0, 6)}...${publicKey
            .toBase58()
            .slice(-4)}`}
    </WalletMultiButton>
  );
}

export const ConnectButtonWheel = ({}: {}) => {
  return <ConnectWallet wheel />;
};
