
import { BaseSyntheticEvent, useState } from "react"
import { fetcherAPI } from "@/utils/utils"
import useSWR from "swr"
import { AxiosResponse } from "axios"
import Image from "next/image"
import { formatNumberToKM } from "@/utils/utils"

enum DATETOGGLE {

    twentyfourh = '24h',
    sevend = '7d',
    thirtyd = '30d',
    all = 'all',

}
export default function Collection() {
    const [timeRange, setTimeRange] = useState<DATETOGGLE>(DATETOGGLE.twentyfourh)

    const { data, isLoading } =
        useSWR<AxiosResponse<{ ranking: { [key: string]: any }[] }>>(`https://api.opencnft.io/2/market/rank/collection?time_range=${timeRange}`,
            fetcherAPI, {
            revalidateOnFocus: false,
        })
    const { data: volumeData, isLoading: volumeLoading } =
        useSWR<AxiosResponse<{ volume: number, volume_change: number }>>(`https://api.opencnft.io/2/market/metrics?time_range=24h`,
            fetcherAPI, {
            revalidateOnFocus: false,
        })


    const handleTimeChange = (e: BaseSyntheticEvent) => {
        setTimeRange(e.target.value)
    }

    const volumeChange = (color: string, change: string | number) => (
        <div className={`flex items-center space-x-2`}>
            <span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${color === '#EE4540' && 'transform rotate-90'}`}>
                    <path d="M12.75 5.25L4.5 13.5" stroke={`${color}`} strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8.25 4.5H12.75C13.1035 4.5 13.2803 4.5 13.3902 4.60984C13.5 4.71967 13.5 4.89645 13.5 5.25V9.75" stroke={`${color}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>

            <span style={{ color: color }}>
                {change}
            </span>
        </div>
    )
    return (
        <section className="pt-8 mt-14 px-6 md:px-12">

            {/* <h1
                className="text-[4.6vw] md:text-[2.6vw] font-extrabold  text-transparent bg-clip-text bg-gradient-to-r
             from-white via-[#00FFFF] to-[#00FFFF] brightness-110 font-serrat">
                COLLECTION STATS
            </h1> */}

            <div className="relative w-full flex justify-start items-center">
                <h1 className="back-text-bg text-[5.6vw] md:text-[3.9vw] font-extrabold font-serrat invisible sm:visible"> COLLECTION STATS</h1>
                <h1 className="text-[4.6vw] md:text-[2.6vw] font-extrabold font-serrat  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                    COLLECTION STATS
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between mt-7 md:mt-14">

                <div className="flex items-center justify-between bg-[#1C1938] p-3 order-last md:order-none text-xs md:text-base">

                    <p className="text-[#8E8E8E]">
                        Total 24h Volume:
                    </p>

                    <div className="flex items-center space-x-3 ml-4 text-white">
                        <span>
                            {volumeLoading || !volumeData ? '...' : (
                                formatNumberToKM(volumeData.data.volume)
                            )}

                        </span>

                        {
                            volumeLoading || !volumeData ? '...' :
                                typeof volumeData.data.volume_change === 'number' && Math.sign(volumeData.data.volume_change) === 1 ? (
                                    volumeChange('#25DD81', volumeData.data.volume_change.toFixed(2))
                                ) : typeof volumeData.data.volume_change === 'number' && Math.sign(volumeData.data.volume_change) === -1 ? (
                                    volumeChange('#EE4540', volumeData.data.volume_change.toFixed(2))
                                ) : typeof volumeData.data.volume_change === 'number' && Math.sign(volumeData.data.volume_change) === 0 ? (
                                    volumeChange('#8E8E8E', volumeData.data.volume_change.toFixed(2))
                                ) : volumeChange('#8E8E8E', 'n/a')
                        }
                    </div>

                </div>

                <div className="tabs !bg-[#1C1938] tabs-boxed gap-1 text-xs w-full sm:w-fit rounded-none justify-evenly">


                    <input
                        type="radio" id="tab-14" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.twentyfourh}
                    //  checked={timeRange === DATETOGGLE.twentyfourh} 
                    />
                    <label htmlFor="tab-14" className={`tab text-xs ${timeRange === DATETOGGLE.twentyfourh && '!bg-[#0000FF] hover:!bg-[#0000FF]'}`}>24h</label>

                    <input
                        type="radio" id="tab-15" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.sevend} />
                    <label htmlFor="tab-15" className={`tab ${timeRange === DATETOGGLE.sevend && '!bg-[#0000FF] hover:!bg-[#0000FF]'}`}>7d</label>

                    <input
                        type="radio" id="tab-13" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.thirtyd}
                    //  checked={timeRange === DATETOGGLE.oneh} 
                    />
                    <label htmlFor="tab-13" className={`tab text-xs ${timeRange === DATETOGGLE.thirtyd && '!bg-[#0000FF] hover:!bg-[#0000FF]'}`}>30d</label>

                    <input
                        type="radio" id="tab-4" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle bg-[#0000FF]" value={DATETOGGLE.all} />
                    <label htmlFor="tab-4" className={`tab ${timeRange === DATETOGGLE.all && '!bg-[#0000FF] hover:!bg-[#0000FF]'}`}>All</label>
                </div>

            </div>


            <div className="my-8 md:my-14">

                {
                    isLoading || !data?.data ? (
                        <div className="flex overflow-x-auto">
                            <table className="table w-full text-xs">
                                <thead className="!bg-gray-800">
                                    <tr className="!bg-gray-800">
                                        <th>Collection</th>

                                        <th>Floor</th>
                                        <th>Volume</th>
                                        {/* <th>Owners</th> */}


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 1].map((_, i) => (
                                            <tr key={i}>
                                                <th className="flex space-x-3 items-center">
                                                    <div className="avatar">

                                                        <div className="skeleton h-full rounded-full"></div>


                                                    </div>
                                                    <div className="skeleton h-5 rounded-md"></div>
                                                </th>
                                                <td><div className="skeleton h-5 rounded-md"></div></td>
                                                <td><div className="skeleton h-5 rounded-md"></div></td>
                                                {/* <td><div className="skeleton h-5 rounded-md"></div></td> */}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <div className="flex w-full overflow-x-auto ">
                            <table className="table">
                                <thead className="!bg-gray-800">
                                    <tr className="!bg-gray-800">
                                        <th>Collection</th>

                                        <th>Floor</th>
                                        <th>Volume</th>
                                        {/* <th>Owners</th> */}


                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.ranking.slice(0, 10).map((item, i) => {


                                        return (
                                            <tr key={i}>
                                                <td className="flex space-x-3 items-center truncate">
                                                    <div className="avatar">
                                                        {
                                                            typeof item.thumbnail === 'string' && item.thumbnail.startsWith('ipfs') && item.thumbnail.split('/').length == 3 ? (
                                                                <img src={`${item.thumbnail.replace("ipfs://", "https://ipfs.io/ipfs/")}`} alt="avatar" />
                                                            ) :
                                                                typeof item.thumbnail === 'string' && item.thumbnail.startsWith('ipfs') && item.thumbnail.split('/').length == 4 ? (
                                                                    <img src={`${item.thumbnail.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/")}`} alt="avatar" />
                                                                ) : typeof item.thumbnail === 'string' && !item.thumbnail.startsWith('ipfs') ? (
                                                                    <img src={`${item.thumbnail}`} alt="avatar" />
                                                                )
                                                                    : (
                                                                        <div className="skeleton h-full rounded-full"></div>
                                                                    )}

                                                    </div>
                                                    <span className="truncate text-white">{item.name}</span>

                                                </td>
                                                <td className="">
                                                    <div className="flex items-center">
                                                        <Image
                                                            src="/ada-symbol.svg"
                                                            loading="eager"
                                                            alt="ada"
                                                            width={14}
                                                            height={14}
                                                            className="mr-[0.1rem]" />

                                                        <span className="text-white">{item.floor_price ?? '--'}</span>

                                                    </div>

                                                    <div className="text-[0.65rem]">
                                                        {
                                                            typeof item['1dChange'] === 'number' && Math.sign(item['1dChange']) === 1 ? (
                                                                <span className="text-green-500">+{item['1dChange'].toFixed(2)}%</span>
                                                            ) : typeof item['1dChange'] === 'number' && Math.sign(item['1dChange']) === -1 ? (
                                                                <span className="text-red-500">{item['1dChange'].toFixed(2)}%</span>
                                                            ) : typeof item['1dChange'] === 'number' && Math.sign(item['1dChange']) === 0 ? (
                                                                <span className="text-red-500">0%</span>
                                                            ) : 'n/a'
                                                        }
                                                    </div>


                                                </td>
                                                <td className="text-white">{Math.round(item.volume) ?? '--'}</td>
                                                {/* <td className="">{item.total_owners[0] ?? '--'}</td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                }



            </div>


        </section>
    )
}