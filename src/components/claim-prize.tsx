import Image from "next/image";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import useAddressCus from "@/utils/useAddress";
import useSWR from "swr";
import { CLAIMED, Prizes } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { fetcher, prizesKey } from "@/utils/utils";
import { useState } from "react";

export default function ClaimPrize() {
  return (
    <div>
      <label
        className="btn btn-md text-black bg-[#00FFFF] hover:bg-[#FF00FF] rounded-none hidden lg:inline-flex"
        htmlFor="modal-11"
      >
        CLAIM PRIZE
      </label>

      <input className="modal-state" id="modal-11" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-11"></label>
        <div className="modal-content bg-[#090719] flex flex-col min-w-[22rem] rounded-none !p-0">
          <div className=" bg-gradient-to-r from-[#0000FF] via-[#0000FF] to-[#FF00FF] py-2 px-4">
            <label
              htmlFor="modal-11"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-1"
            >
              ✕
            </label>
            <span className="text-xl flex items-center space-x-3">
              <Image
                src="/prize-claim.svg"
                alt="prize claim"
                width={20}
                height={20}
              />

              <p className="text-white">YOUR PRIZE</p>
            </span>
          </div>
          <ClaimPrizeBody />
        </div>
      </div>
    </div>
  );
}

export function ClaimPrizeMobile() {
  return (
    <div>
      <label className="lg:hidden cursor-pointer" htmlFor="modal-16">
        <Image
          src="/prize-claim.svg"
          alt="prize claim"
          width={27}
          height={27}
        />
      </label>

      <input className="modal-state" id="modal-16" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-16"></label>
        <div className="modal-content bg-[#090719] flex flex-col min-w-[22rem] rounded-none !p-0">
          <div className=" bg-gradient-to-r from-[#0000FF] via-[#0000FF] to-[#FF00FF] py-2 px-4">
            <label
              htmlFor="modal-16"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-1"
            >
              ✕
            </label>
            <span className="text-xl flex items-center space-x-3">
              <Image
                src="/prize-claim.svg"
                alt="prize claim"
                width={20}
                height={20}
              />

              <p className="text-white">YOUR PRIZE</p>
            </span>
          </div>
          <ClaimPrizeBody />
        </div>
      </div>
    </div>
  );
}

const ClaimPrizeBody = () => {
  const { connected, publicKey } = useSolanaWallet();
  const addr = useAddressCus();
  const { data, isLoading, mutate } = useSWR<AxiosResponse<{ data: Prizes[] }>>(
    connected && addr ? `${prizesKey(addr)}` : null,
    fetcher
  );

  const [showPop, setShowPop] = useState("hidden");
  const [prizeLoader, setPrizeLoader] = useState(false);
  const [prizeId, setPrizeId] = useState("");

  const claimPrize = async (prize: Prizes) => {
    setPrizeLoader(true);
    setPrizeId(prize.id);
    try {
      const response = await axios.post("api/prizes", prize);

      if (response.status === 200) {
        const updatedData = data!.data.data.map((item) => {
          if (item.id === prize.id) {
            return {
              ...item,
              claimed: CLAIMED.YES,
            };
          }

          return {
            ...item,
          };
        });

        mutate({ data: { data: updatedData } } as AxiosResponse<{
          data: Prizes[];
        }>);
      }
    } catch (error) {}

    setPrizeLoader(false);
    setPrizeId("");
  };

  return (
    <>
      <div className="p-4 min-h-[385px] max-h-[500px] overflow-y-scroll border border-[#00FFFF]">
        {connected && addr && isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div className="flex justify-between items-center" key={i}>
                <div className="skeleton h-5 w-14 "></div>

                <div className="skeleton h-10 w-32"></div>
              </div>
            ))}
          </div>
        ) : connected && addr && data && data.data.data.length > 0 ? (
          <div className="flex flex-col gap-3 ">
            {data.data.data.map((item, i) => (
              <div className="flex items-center justify-between">
                {item.claimed === CLAIMED.NO ? (
                  <>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF]">
                      {item.name}
                    </p>

                    <div className={`popover popover-border`}>
                      <label
                        className="popover-trigger btn btn-sm sm:btn-md text-white
                                                                                    border-white border rounded-none bg-transparent w-32
                                                                                    hover:text-[#FF00FF] hover:border-[#FF00FF]
                                                                                    "
                        tabIndex={0}
                        onClick={() => setShowPop("flex")}
                      >
                        {prizeLoader && prizeId === item.id
                          ? "PENDING"
                          : "CLAIM"}
                      </label>
                      <div
                        className={`popover-content my-3 ${showPop} w-[18rem] popover-bottom-left p-2 bg-[#090719] text-white`}
                        tabIndex={0}
                      >
                        <div className="popover-arrow"></div>

                        <div className="flex flex-col items-center gap-4 py-3">
                          <h1 className="text-lg ">CLAIM PRIZE</h1>

                          <div className="p-4 text-xs  text-center">
                            You’re about to claim{" "}
                            <span className="text-[#FA00FF]">{item.name}</span>{" "}
                            on magic wheelz.
                            <br />
                            <br />
                            Click proceed to complete your transaction
                          </div>

                          <div className="flex justify-evenly gap-4 w-full">
                            <button
                              className="btn btn-xs sm:btn-sm whitespace-nowrap text-xs bg-transparent
                                                                             border border-white hover:text-[#FF00FF]
                                                                              hover:border-[#FF00FF] !rounded-none text-white"
                              onClick={() => setShowPop("hidden")}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-xs sm:btn-sm whitespace-nowrap
                                                                                text-xs bg-[#00FFFF] min-w-[6rem] hover:bg-[#FF00FF] !rounded-none text-black"
                              disabled={prizeLoader}
                              onClick={() => {
                                claimPrize(item);
                              }}
                            >
                              {prizeLoader && prizeId === item.id
                                ? "Claiming.."
                                : "Proceed"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-white/50">{item.name}</p>

                    <button
                      className="btn btn-sm sm:btn-md text-white/60
                                                             border-white/60 border rounded-none 
                                                             bg-transparent w-32"
                      disabled
                    >
                      CLAIMED
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : connected && addr && data && data.data.data.length === 0 ? (
          <div className="mx-auto text-center">
            <p className="mb-4 text-white/60">You haven't won any prizes yet</p>

            <span className="text-white">
              CLICK ON <span className="text-[#A200FF]"> SPIN</span> NOW!
            </span>

            <p className="text-white/60 mt-2">To win Amazing Prizes</p>
          </div>
        ) : (
          <h1 className="m-auto uppercase text-center">
            Connect Wallet
            <br />
            to see Prizes
          </h1>
        )}
      </div>
    </>
  );
};
