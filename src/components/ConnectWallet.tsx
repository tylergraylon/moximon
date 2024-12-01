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

export default function ConnectWallet({ mobile }: { mobile?: boolean }) {
  const [hydrate, setHydrate] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    setHydrate(true);
  }, []);

  if (!hydrate) return null;
  return (
    <WalletMultiButton
      className="bg-transparent"
      style={{ background: "#66000000", border: "1px solid white " }}
    >
      {!publicKey
        ? "Connect Wallet"
        : `${publicKey.toBase58().slice(0, 6)}...${publicKey
            .toBase58()
            .slice(-4)}`}
    </WalletMultiButton>
  );
}

export const ConnectButtonWheel = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (is: boolean) => void;
}) => {
  const { connecting, connected } = useWallet();

  return (
    <div className="">
      <label className="btn btn-sm sm:btn-md bg-transparent  rounded-none text-white min-w-[150px]">
        {(isModalOpen && !connected) || connecting ? (
          <svg
            className="spinner-ring [--spinner-color:var(--blue-12)] spinner-sm"
            viewBox="25 25 50 50"
            strokeWidth="5"
          >
            <circle cx="50" cy="50" r="20" />
          </svg>
        ) : (
          <span className="text-xs lg:text-sm text-white">Connect Wallet</span>
        )}
      </label>

      <input
        className="modal-state"
        id="modal-10"
        checked={isModalOpen}
        type="checkbox"
        onChange={(e) => {
          setIsModalOpen(e.target.checked);
        }}
      />
      <div className="modal w-screen ">
        <label className="modal-overlay" htmlFor="modal-10"></label>
        <div className="modal-content flex flex-col gap-5 w-96 sm:w-[25.8rem]">
          <label
            htmlFor="modal-10"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
        </div>
      </div>
    </div>
  );
};
