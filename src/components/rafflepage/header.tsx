import ConnectWallet from "../ConnectWallet"
import Image from "next/image"
import goldStain from "../../../public/gold-stain.svg"
import wheelerz from "../../../public/wheelerz.svg"
import Link from "next/link"
import { MobileMenu } from "../homepage/header"
import { useAssets, useLovelace, useWallet } from "@meshsdk/react"
import { oneLoveLace, xmaxAssetId, xmaxPolicyId } from "@/utils/services"
import { Asset } from "@meshsdk/core"
import { formatNumberToKM } from "@/utils/utils"

export type AssetExtended = (Asset & { policyId: string })[] | undefined

export default function Header() {
    const lovelace = useLovelace()
    const { connected } = useWallet()
    const assets = useAssets() as AssetExtended

    return (
        <header className="relative bg-[#14112D]">
            <Image
                src={goldStain}
                alt="gold-stain"
                width={1440}
                height={70}
                style={{ width: 'auto' }}
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
                        <div className="navbar-item hidden md:block text-sm hover:!text-[#FF00FF]">
                            <Link href="/">
                                HOME
                            </Link>

                        </div>
                        <div className="divider divider-vertical mx-0 h-10"></div>
                        <div className="navbar-item text-[#FF00FF] hover:!text-[#FF00FF] px-0 md:px-1">
                            {(connected && assets && assets.length > 0 &&
                                assets.filter((item) => (item.unit === xmaxAssetId || item.policyId === xmaxPolicyId)).length > 0) ? (
                                formatNumberToKM(parseInt(assets.find(item => (item.unit === xmaxAssetId || item.policyId === xmaxPolicyId))!.quantity))
                            ) : (
                                'N/A'
                            )} <span>XMAX</span>

                        </div>
                        <div className="divider divider-vertical mx-0 h-10"></div>
                        <div className="navbar-item text-[#00FFFF] hover:!text-[#00FFFF] px-0 md:px-1">
                            {connected && lovelace ? (
                                (formatNumberToKM(parseInt(lovelace) / oneLoveLace))
                            ) : (
                                'N/A'
                            )} ADA

                        </div>
                        <div className="divider divider-vertical mx-0 h-10"></div>
                    </div>


                    <div className="navbar-item hidden md:block">
                        <ConnectWallet />
                    </div>

                    <div className="navbar-item md:hidden p-0 m-0">
                        <MobileMenu />
                    </div>

                </div>
            </div>


        </header>
    )
}