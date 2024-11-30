import useSWR from "swr";
import { AxiosResponse } from "axios";
import { fetcher, gamesKey } from "@/utils/utils";
import { useCallback } from "react";
import { AdaWheelz, OUTCOME } from "./jfhkjhvygcbvjh";
import { WHEELZ } from "./magic-wheelz";

export function GlobalWheelz() {
  const { data, isLoading } = useSWR<
    AxiosResponse<{
      data: { address: string; name: string; outcome: string }[];
    }>
  >(gamesKey, fetcher);

  const GlobalSpins = useCallback(
    () => (
      <>
        <div className="py-3 text-black px-4 w-full gap-x-2 flex justify-between  bg-gradient-to-r from-[#F9B64F] to-[#F9E680]">
          <span className="">RECENT SPIN</span>
          <button className="btn btn-sm text-xs rounded-none">Global</button>
        </div>

        <div className="px-3 py-3 bg-black w-full border border-[#00FFFF] gap-y-3 overflow-hidden max-h-[25rem] h-[25rem]">
          {isLoading || !data?.data
            ? [1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                <div className="flex justify-evenly gap-3 items-center" key={i}>
                  <div className="skeleton h-5 "></div>
                  <div className="divider divider-vertical mx-0 h-8"></div>
                  <div className="skeleton h-5"></div>
                  <div className="divider divider-vertical mx-0 h-8"></div>
                  <div className="skeleton h-5"></div>
                </div>
              ))
            : data.data.data
                .map((item, i) => (
                  <div
                    className={`flex items-center text-center gap-2 text-xs mt-2 text-white  animate-wheelzSlider`}
                    key={i}
                  >
                    <div className="flex justify-center w-36">
                      {(item.outcome == OUTCOME.WIN && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-7 w-7 fill-green-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )) || (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-7 w-7 fill-red-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {/* {item.address.slice(0, 5)}...{item.address.slice(-4)} */}
                    </div>

                    <div className="divider divider-vertical mx-0 h-8"></div>
                    <p
                      className={`${
                        item.outcome == "LOSE" && ""
                      } uppercase w-36`}
                    >
                      {item.outcome}
                    </p>

                    <div className="divider divider-vertical mx-0 h-8"></div>
                    <p className="uppercase w-full">{item.name}</p>
                  </div>
                ))
                .reverse()}
        </div>
      </>
    ),
    [data]
  );

  return (
    <div className="w-[19.5rem]">
      <aside className="hidden xl:block mt-10">{GlobalSpins()}</aside>

      <div className="xl:hidden my-2">
        <label
          className="btn rounded-none bg-transparent w-full border border-white"
          htmlFor="modal-4"
        >
          Recent Spins
        </label>

        <input className="modal-state" id="modal-4" type="checkbox" />
        <div className="modal w-screen">
          <label className="modal-overlay" htmlFor="modal-4"></label>
          <div className="modal-content flex flex-col w-[19.5rem] p-0 rounded-none">
            <label
              htmlFor="modal-4"
              className="btn btn-sm btn-circle btn-ghost self-end"
            >
              ✕
            </label>

            {GlobalSpins()}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WheelzDetails({ wheelz }: { wheelz: WHEELZ }) {
  return (
    <section className="w-full ">
      <div className="py-3 text-black pl-4 w-full  bg-gradient-to-r from-[#F9B64F] to-[#F9E680]">
        WHEELZ DETAILS
      </div>

      <div className="pl-4 py-3 bg-black w-full border border-[#00FFFF]">
        {AdaWheelz[wheelz].wheel.map((item, i) => (
          <div className="flex gap-x-2 text-sm text-white" key={i}>
            <p>{i + 1}.</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
