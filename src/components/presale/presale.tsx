
import MintBox from "./mint-box"
import { useTimer } from 'react-timer-hook';
import { useMemo, useState, useEffect, useCallback } from "react";

import { addZero } from "@/utils/utils";

import { useAssets } from "@meshsdk/react";
import { AssetExtended } from "../rafflepage/header";
import { xmaxMintCardPolicyId } from "@/utils/services";
import { white } from "./whitelisted";
import useAddressCus from "@/utils/useAddress";

export default function Presale() {


    const [isClient, setIsClient] = useState(false)

    const assets = useAssets() as AssetExtended

    const address = useAddressCus()

    const time1 = useMemo(() => {
        const now = new Date();
        const utcNow = new Date(now.toUTCString());
        const time = new Date(Date.UTC(2024, 0, 30, 19, 0, 0));
        time.setSeconds(time.getSeconds() + 0);
        return time
    }, [])

    const time2 = useMemo(() => {
        const time = new Date(Date.UTC(2024, 0, 30, 22, 0, 0));
        time.setSeconds(time.getSeconds() + 0);
        return time
    }, [])

    const time3 = useMemo(() => {
        const time = new Date(Date.UTC(2024, 1, 10, 23, 0, 0));
        time.setSeconds(time.getSeconds() + 0);
        return time
    }, [])

    const timeToPresale = useMemo(() => {
        const time = new Date(Date.UTC(2024, 0, 30, 16, 0, 0));
        time.setSeconds(time.getSeconds() + 0);
        return time
    }, [])


    // const date1 = new Date("2024-01-27T05:00:00");
    // const date2 = new Date(Date.now());
    // const diffInMinutes = Math.abs(Number(date1.getTime()) - Number(date2.getTime())) / 1000


    // const stopwatchOffset = new Date();
    // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + diffInMinutes);



    // console.log(new Date("2024-01-26T02:00:00").getMinutes());

    const checkMintCard = useCallback(() => {

        if (assets) {
            const measure = assets.filter((item) => (item.policyId === xmaxMintCardPolicyId)).length > 0

            return measure
        }
        return false
    }, [assets])

    const checkWhitelist = useCallback(() => {

        if (address) {
            const isWhitelisted = white.includes(address)

            return isWhitelisted
        }

        return false

    }, [address])





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
    } = useTimer({ expiryTimestamp: timeToPresale, onExpire: () => console.warn('Time for presale!!!') });



    useEffect(() => {
        setIsClient(true)
    }, [])


    return (
        <main className="grid lg:grid-cols-2 gap-4 h-full py-10 px-4 sm:px-10">

            <div className="bg-[url('/presale-banner.svg')] bg-no-repeat bg-cover 
                            h-96 lg:h-full flex flex-col items-center justify-center gap-4">


                <div className="relative w-full flex  justify-center items-center justify-self-center">
                    <h1 className="presale-text-bg text-[13.5vw] md:text-[9vw] lg:text-[8vw] font-extrabold font-serrat"> Presale</h1>
                    <h1 className="text-[9.5vw] md:text-[6.5vw] lg:text-[5vw] font-extrabold font-serrat  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                        Presale
                    </h1>
                </div>

                {
                    isClient && (
                        <div className="xl:text-6xl sm:text-5xl text-3xl flex text-white whitespace-nowrap gap-2">
                            <span>
                                {addZero(days)}
                                <div className="md:text-xs text-[0.5rem] text-white/70">Days</div>
                            </span>:
                            <span>
                                {addZero(hours)}
                                <div className="md:text-xs text-[0.55rem] text-white/70">Hours</div>
                            </span>:
                            <span>
                                {addZero(minutes)}
                                <div className="md:text-xs text-[0.55rem] text-white/70">Minutes</div>
                            </span>:
                            <span>
                                {addZero(seconds)}
                                <div className="md:text-xs text-[0.5rem] text-white/70">Seconds</div>
                            </span>
                        </div>
                    )
                }


            </div>

            <div className="h-full flex flex-col gap-3">

                <MintBox
                    title1="1st Phase: MintCard Owner"
                    title2="Max/Card: "
                    title_price="500 ADA"
                    coin_price={0.0145}
                    limit={500}
                    time={time1}

                    startTime={new Date(Date.UTC(2024, 0, 30, 16, 0, 0))}
                    presaleTime={timeToPresale}
                    customCheck={checkMintCard}
                    checkErrorMessage="You do not have an XMAX MINT CARD"
                />
                <MintBox
                    title1="2nd Phase: Whitelist"
                    title2="Max/Wallet: "
                    title_price="150 ADA"
                    coin_price={0.0175}
                    limit={150}

                    time={time2}
                    startTime={new Date(Date.UTC(2024, 0, 30, 19, 0, 0))}
                    presaleTime={timeToPresale}
                    customCheck={checkWhitelist}
                    checkErrorMessage="You are not whitelisted"
                />
                <MintBox
                    title1="3rd Phase: Public (FCFS)"
                    title2="Max/Wallet: "
                    title_price="90 ADA"
                    coin_price={0.018}
                    limit={90}

                    startTime={new Date(Date.UTC(2024, 0, 30, 22, 0, 0))}
                    presaleTime={timeToPresale}
                    time={time3}

                />

            </div>

        </main>
    )
}