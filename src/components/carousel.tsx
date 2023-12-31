
import useSWR from "swr"
import { AxiosResponse } from "axios"
import { fetcher, leadersKey } from "@/utils/utils"
import { useEffect, useState } from "react"

export default function Carousel() {
    const [envy, setEnvy] = useState(false)
    const { data, isLoading } =
        useSWR<AxiosResponse<{ data: { address: string, name: string, outcome: string }[] }>>(leadersKey, fetcher)

    useEffect(() => {
        setEnvy(true)
    }, [])
    if (!envy) return null
    return (
        <div
            className="relative overflow-hidden w-full h-10 
                    bg-gradient-to-r from-[#FF7CFF] via-[#00FFFF] to-[#00FFFF]">

            <div className="flex items-center absolute left-0 w-[200%] h-full text-xs sm:text-sm font-normal gap-x-5 animate-skyWalker">

                <div className="flex justify-around gap-x-5 ml-10 items-center text-black w-1/2">
                    {!isLoading && data && data?.data?.data &&
                        <p className="uppercase font-medium text-sm sm:text-base">
                            Leaderboard
                        </p>
                    }
                    {!isLoading && data && data?.data?.data && (
                        data.data.data.map((item, i) => {
                            return (
                                <p key={i} className="font-serrat">
                                    {item?.address.slice(0, 5)}...{item?.address.slice(-4)}
                                </p>
                            )
                        })
                    )}

                </div>

                <div className="flex justify-around gap-x-5 ml-10 items-center text-black w-1/2">
                    {!isLoading && data && data?.data?.data &&
                        <p className="uppercase font-medium text-sm sm:text-base">
                            Leaderboard
                        </p>
                    }
                    {!isLoading && data && data?.data?.data && (
                        data.data.data.map((item, i) => {
                            return (
                                <p key={i} className="font-serrat">
                                    {item?.address.slice(0, 5)}...{item?.address.slice(-4)}
                                </p>
                            )
                        })
                    )}

                </div>

            </div>

        </div>
    )
}