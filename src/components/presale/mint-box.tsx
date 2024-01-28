import Image from "next/image"
import { ChangeEvent, useEffect, useState, FormEvent, useRef } from "react";
import { memo } from "react";
import { useWallet, useAssets } from "@meshsdk/react";
import useAddressCus from "@/utils/useAddress";
import { Transaction } from '@meshsdk/core';
import { xmaxMintCardPolicyId, oneLoveLace, oantAddress, paymentAddress } from "@/utils/services";
import axios from "axios";
import Swal from 'sweetalert2'
import { AssetExtended } from "../rafflepage/header";
import { useTimer } from 'react-timer-hook';
import { addZero } from "@/utils/utils";
import { formatNumberToKM } from "@/utils/utils";


type Props = {
    title1: string,
    title2: string,
    title_price: string,
    coin_price: number,
    disabled?: boolean,
    limit: number,
    time: Date,
    customCheck?: () => boolean,
    checkErrorMessage?: string
}

export default memo(function MintBox({
    title1,
    title2,
    title_price,
    coin_price,
    disabled,
    time,
    limit,
    customCheck,
    checkErrorMessage
}: Props) {

    const [isClient, setIsClient] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [amount, setAmount] = useState<number>(0)

    const refAda = useRef<HTMLInputElement>(null)

    const assets = useAssets() as AssetExtended


    const { connected, wallet } = useWallet()

    const address = useAddressCus()


    const checkTimeLimit = new Date > time


    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn('onExpire called') });


    const filterInput = (e: ChangeEvent<HTMLInputElement>, limit: number) => {
        e.preventDefault()

        setAmount(Number(e.target.value))

        if (Number(e.target.value) > limit) {
            setErrorMessage(`Maximum Mint is ${limit} ADA`)
        } else {
            setErrorMessage("")
        }
    }

    const checkMintLimit = async (add: string): Promise<boolean> => {
        try {
            const response = await axios.get(`/api/presale?address${add}`)

            if (response.status === 200) {

                const minted = response.data.data.amount

                return minted >= limit ? true : false

            }

        } catch (error) {
            return false
        }
        return false
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // const amount = Number(refAda.current?.value)

        try {



            if (amount < 1 || amount > limit) {
                Swal.fire({
                    position: "top-right",
                    icon: 'info',
                    padding: "1em",
                    toast: true,
                    title: "Please input a valid amount",
                    showCloseButton: true,
                    showConfirmButton: false,
                    timer: 3000,
                    background: "#090719",
                    color: "#ffffff"
                });

                return;
            }



            if (!connected || !address) {
                Swal.fire({
                    position: "top-right",
                    icon: 'info',
                    padding: "1em",
                    toast: true,
                    title: "Please Connect Wallet",
                    showCloseButton: true,
                    showConfirmButton: false,
                    timer: 3000,
                    background: "#090719",
                    color: "#ffffff"
                });
                return;
            }

            if (customCheck && !customCheck()) {
                Swal.fire({
                    position: "center",
                    icon: 'error',
                    title: checkErrorMessage,
                    showCloseButton: true,
                    showConfirmButton: false,
                    background: "#090719",
                    color: "#ffffff"
                })

                return;
            }

            const limitChecker = await checkMintLimit(address)

            if (limitChecker) {
                Swal.fire({
                    position: "center",
                    icon: 'error',
                    title: `You have reached your mint limit`,
                    showCloseButton: true,
                    showConfirmButton: false,
                    background: "#090719",
                    color: "#ffffff"
                })

                return;
            }

            const adaAmount = amount! * oneLoveLace

            const tx = new Transaction({ initiator: wallet })
                .sendLovelace(
                    paymentAddress,
                    adaAmount.toString()
                );

            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);

            axios.post('/api/presale', {
                address,
                amountAda: amount,
                amountXmax: (amount / coin_price),
                trans: txHash
            })

            // return txHash

            if (txHash) {
                Swal.fire({
                    position: "top-right",
                    icon: 'success',
                    padding: "1em",
                    toast: true,
                    title: "LFG!!!",
                    showConfirmButton: false,
                    showCloseButton: true,
                    timer: 3000
                });

                refAda.current!.value = ""
                setAmount(0)
            }


        } catch (error: any) {
            console.log(error);

            error = `${error}`
            const errMessage = error.split(':')

            if (errMessage.includes(`\"User declined to sign the transaction.\"}.`)) {
                Swal.fire({
                    icon: 'error',
                    title: "Declined to sign the transaction",
                    background: "#090719",
                    color: "#ffffff"
                });
            } else if (errMessage.includes(` Insufficient input in transaction. shortage`)) {
                Swal.fire({
                    icon: 'error',
                    title: "Insufficient balance to complete transaction.",
                    background: "#090719",
                    color: "#ffffff"
                });

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Something went wrong...",
                    background: "#090719",
                    color: "#ffffff"
                });
            }

        }


    }




    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="text-white">

            <div className="flex flex-col gap-4 bg-[#1C1C3D] py-4 px-3 text-xs lg:text-base">

                <div className="flex justify-between items-center">

                    <h3>
                        {title1}
                    </h3>

                    <div className="flex space-x-2 items-center">
                        <Image
                            src="/clock-piece.svg"
                            alt="clock"
                            width={20}
                            height={20}
                        />

                        {
                            isClient && (
                                <span className="text-[#FA00FF]" suppressHydrationWarning>
                                    <span>{addZero(days)}</span>:<span>{addZero(hours)}</span>:<span>{addZero(minutes)}</span>:<span>{addZero(seconds)}</span>
                                </span>
                            )
                        }


                    </div>

                </div>

                <div className="flex justify-between items-center">

                    <div className="">
                        <span>{title2}</span>   <span className="font-bold">{title_price}</span>
                    </div>

                    <div className="">
                        {amount} ADA = {formatNumberToKM(amount / coin_price)} XMAX
                    </div>

                </div>

            </div>
            <div className="bg-[#0F0F29] py-4 px-3">

                <form
                    action=""
                    className="flex flex-col md:flex-row justify-between gap-3"
                    onSubmit={handleSubmit}
                >

                    <div className="">
                        <input
                            type="number"
                            name="ada"
                            id="ada"
                            ref={refAda}
                            disabled={disabled || checkTimeLimit}
                            onChange={(e) => filterInput(e, limit)}
                            className="h-12 p-2 bg-transparent border
                                     border-white/60 w-full outline-none"
                            placeholder="Amount" />
                        <div className="flex justify-between">
                            <span>
                                <div className="font-serrat text-[#E22E6B]">
                                    {errorMessage}
                                </div>
                                {
                                    limit === 500 && (
                                        <div className="text-[#00FFFF] text-xs mt-1">
                                            Total
                                        </div>
                                    )
                                }

                            </span>


                            <span className="text-xs text-[#00FFFF]">
                                {
                                    limit === 500 && assets && (
                                        `${assets.filter((item) => (item.policyId === xmaxMintCardPolicyId)).length} Mint Card${assets.filter((item) => (item.policyId === xmaxMintCardPolicyId)).length > 1 ? 's' : " "
                                        }`

                                    )
                                }
                            </span>
                        </div>
                    </div>

                    <button disabled={disabled || (errorMessage !== "") || checkTimeLimit}
                        className={`${disabled || checkTimeLimit ? 'bg-[#828282]' : 'bg-[#00FFFF]'}
                                    ${(errorMessage !== "") && 'cursor-not-allowed'}
                                    text-black h-12  w-full md:w-[30%]`}>
                        Mint
                    </button>

                </form>

            </div>

        </div>
    )
})