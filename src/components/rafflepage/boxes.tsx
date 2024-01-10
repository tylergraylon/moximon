import useSWR from "swr"
import { AxiosResponse } from "axios"
import { fetcher, gamesKey } from "@/utils/utils"
import { useCallback } from "react"
import { AdaWheelz } from "./jfhkjhvygcbvjh"
import { WHEELZ } from "./magic-wheelz"


export function GlobalWheelz() {

    const { data, isLoading } = useSWR<AxiosResponse<{ data: { address: string, name: string, outcome: string }[] }>>(gamesKey, fetcher)


    const GlobalSpins = useCallback(() => (
        <>

            <div className="py-3 text-black px-4 w-full gap-x-2 flex justify-between  bg-gradient-to-r from-[#F9B64F] to-[#F9E680]">
                <span className="">RECENT SPIN</span>
                <button className="btn btn-sm text-xs rounded-none">
                    Global
                </button>
            </div>

            <div className="px-3 py-3 bg-black w-full border border-[#00FFFF] gap-y-3 overflow-hidden max-h-[25rem] h-[25rem]">
                {
                    isLoading || !data?.data ? (
                        [1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                            <div className="flex justify-evenly gap-3 items-center" key={i}>
                                <div className="skeleton h-5 "></div>
                                <div className="divider divider-vertical mx-0 h-8"></div>
                                <div className="skeleton h-5"></div>
                                <div className="divider divider-vertical mx-0 h-8"></div>
                                <div className="skeleton h-5"></div>
                            </div>
                        ))


                    ) : (
                        data.data.data.map((item, i) => (
                            <div

                                className={`flex items-center text-center gap-2 text-xs mt-2  animate-wheelzSlider`} key={i}>
                                <p className=" jus w-full ">
                                    {item.address.slice(0, 5)}...{item.address.slice(-4)}
                                </p>

                                <div className="divider divider-vertical mx-0 h-8"></div>
                                <p className={`${item.outcome == 'LOSE' && ''} uppercase w-36`}>
                                    {item.outcome}

                                </p>

                                <div className="divider divider-vertical mx-0 h-8"></div>
                                <p className="uppercase w-full">
                                    {item.name}
                                </p>

                            </div>
                        )).reverse()
                    )
                }
            </div>

        </>
    ), [data])


    return (
        <div className="w-[19.5rem]">
            <aside className="hidden xl:block mt-10">
                {GlobalSpins()}
            </aside>


            <div className="xl:hidden my-2">
                <label className="btn rounded-none bg-transparent w-full border border-white" htmlFor="modal-4">Recent Spins</label>

                <input className="modal-state" id="modal-4" type="checkbox" />
                <div className="modal w-screen">
                    <label className="modal-overlay" htmlFor="modal-4"></label>
                    <div className="modal-content flex flex-col w-[19.5rem] p-0 rounded-none">
                        <label htmlFor="modal-4" className="btn btn-sm btn-circle btn-ghost self-end">✕</label>

                        {GlobalSpins()}

                    </div>
                </div>
            </div>

        </div>

    )
}



export function WheelzDetails({ wheelz }: { wheelz: WHEELZ }) {
    return (
        <section className="w-full ">

            <div className="py-3 text-black pl-4 w-full  bg-gradient-to-r from-[#F9B64F] to-[#F9E680]">
                WHEELZ DETAILS
            </div>

            <div className="pl-4 py-3 bg-black w-full border border-[#00FFFF]">
                {
                    AdaWheelz[wheelz].wheel.map((item, i) => (

                        <div className="flex gap-x-2 text-sm" key={i}>
                            <p>
                                {i + 1}.
                            </p>
                            <p>
                                {item.name}
                            </p>
                        </div>

                    ))
                }
            </div>

        </section>
    )
}