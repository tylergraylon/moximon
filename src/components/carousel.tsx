
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
            className="logos 
                    bg-gradient-to-r from-[#FF7CFF] via-[#00FFFF] to-[#00FFFF] h-10">



            <div className="logos-slide  gap-x-5 text-black">
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

            <div className="logos-slide gap-x-5 text-black">
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
    )
}