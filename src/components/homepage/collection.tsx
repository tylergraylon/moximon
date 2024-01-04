
import { BaseSyntheticEvent, useState } from "react"
import { fetcherAPI } from "@/utils/utils"
import useSWR from "swr"
import { AxiosResponse } from "axios"
import Image from "next/image"

enum DATETOGGLE {
    oneh = '1h',
    twentyfourh = '24h',
    sevend = '7d',
    all = 'all',

}
export default function Collection() {
    const [timeRange, setTimeRange] = useState<DATETOGGLE>(DATETOGGLE.twentyfourh)

    const { data, isLoading } =
        useSWR<AxiosResponse<{ ranking: { [key: string]: any }[] }>>(`https://api.opencnft.io/2/market/rank/collection?time_range=${timeRange}`,
            fetcherAPI, {
            revalidateOnFocus: false,
        })


    const handleTimeChange = (e: BaseSyntheticEvent) => {
        setTimeRange(e.target.value)
    }
    return (
        <section className="pt-8 mt-14 px-6 md:px-12">

            <h1
                className="text-[4.6vw] md:text-[2.6vw] font-extrabold  text-transparent bg-clip-text bg-gradient-to-r
             from-white via-[#00FFFF] to-[#00FFFF] brightness-110 font-serrat">
                COLLECTION STATS
            </h1>

            <div className="flex justify-between mt-6">

                <div>

                </div>

                <div className="tabs tabs-boxed gap-1 text-xs">
                    <input
                        type="radio" id="tab-13" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.oneh} checked={timeRange === DATETOGGLE.oneh} />
                    <label htmlFor="tab-13" className="tab text-xs">1h</label>

                    <input
                        type="radio" id="tab-14" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.twentyfourh} checked={timeRange === DATETOGGLE.twentyfourh} />
                    <label htmlFor="tab-14" className="tab">24h</label>

                    <input
                        type="radio" id="tab-15" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.sevend} checked={timeRange === DATETOGGLE.sevend} />
                    <label htmlFor="tab-15" className="tab">7d</label>

                    <input
                        type="radio" id="tab-4" name="tab-5" onChange={(e) => handleTimeChange(e)}
                        className="tab-toggle" value={DATETOGGLE.all} checked={timeRange === DATETOGGLE.all} />
                    <label htmlFor="tab-4" className="tab">All</label>
                </div>

            </div>


            <div className="my-10">

                {
                    isLoading || !data?.data ? (
                        <div className="flex overflow-x-auto">
                            <table className="table w-full text-xs">
                                <thead>
                                    <tr>
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
                                <thead>
                                    <tr>
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
                                                    <span className="truncate">{item.name}</span>

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

                                                        <span>{item.floor_price ?? '--'}</span>

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
                                                <td className="">{Math.round(item.volume) ?? '--'}</td>
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