import ConnectWallet from "../ConnectWallet";
import Image from "next/image";
import goldStain from "../../../public/gold-stain.svg";
import wheelerz from "../../../public/wheelerz.svg";
import Link from "next/link";
import { MobileMenu } from "../homepage/header";
import { formatNumberToKM } from "@/utils/utils";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import useBalance from "@/hooks/useBalance";
import ClaimPrize from "../claim-prize";
import CasinoHead from "../homepage/casino-head";
import { useState } from "react";

export default function Header() {
  return (
    <header className="relative bg-[#14112D]">
      <Image
        src={goldStain}
        alt="gold-stain"
        width={1440}
        height={70}
        style={{ width: "auto" }}
        priority
      />
      <Image
        src={wheelerz}
        alt="wheelerz"
        className="absolute  top-0 left-0 w-[40%] sm:w-[34%]  lg:w-[25%] z-10"
      />

      <div className="navbar bg-transparent shadow-none absolute top-6 bg-[#14112D] w-full h-full p-0">
        <div className="navbar-end bg-[#14112D] w-full py-2">
          <div className=" items-center flex text-[0.65rem] sm:text-xs">
            <div className="navbar-item hidden xl:block text-white text-sm hover:!text-[#FF00FF]">
              <Link href="/">HOME</Link>
            </div>

            <div className="navbar-item hidden xl:block">
              <CasinoHead />
            </div>

            {/* <div className="navbar-item hidden xl:block text-white text-sm hover:!text-[#FF00FF]">
                            <Link href="/presale">
                                PRESALE
                            </Link>
                        </div> */}

            <div className="navbar-item hidden xl:block">
              <ClaimPrize />
            </div>

            <div className="divider divider-vertical mx-0 h-10"></div>
            <FundsShow />
            <div className="divider divider-vertical mx-0 h-10"></div>
          </div>

          <div className="navbar-item hidden xl:block">
            <ConnectWallet />
          </div>

          <div className="navbar-item xl:hidden p-0 m-0">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export function FundsShow() {
  const { connected, publicKey } = useSolanaWallet();

  const { balance } = useBalance();

  return (
    <>
      <div className="navbar-item text-[#FF00FF] hover:!text-[#FF00FF] px-0 md:px-1">
        {/* {(connected && assets && assets.length > 0 &&
                    assets.filter((item) => (item.unit === xmaxAssetId || item.policyId === xmaxPolicyId)).length > 0) ? (
                    formatNumberToKM(parseInt(assets.find(item => (item.unit === xmaxAssetId || item.policyId === xmaxPolicyId))!.quantity))
                ) : (
                    'N/A'
                )} <span>XMAX</span> */}

        <span>0 XMAX</span>
      </div>
      <div className="divider divider-vertical mx-0 h-10"></div>
      <div className="navbar-item text-[#00FFFF] hover:!text-[#00FFFF] px-0 md:px-1">
        {connected && balance
          ? // (formatNumberToKM(parseInt(lovelace) / oneLoveLace))
            balance
          : "N/A"}{" "}
        SOl
      </div>
    </>
  );
}
