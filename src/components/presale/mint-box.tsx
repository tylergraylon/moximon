import Image from "next/image";
import { ChangeEvent, useEffect, useState, FormEvent, useRef } from "react";
import { memo } from "react";

import useAddressCus from "@/utils/useAddress";

import {
  xmaxMintCardPolicyId,
  oneLoveLace,
  oantAddress,
  presaleWalletAddress,
} from "@/utils/services";
import axios from "axios";
import Swal from "sweetalert2";
import { useTimer } from "react-timer-hook";
import { addZero } from "@/utils/utils";
import { formatNumberToKM } from "@/utils/utils";

type Props = {
  title1: string;
  title2: string;
  title_price: string;
  coin_price: number;
  disabled?: boolean;
  limit: number;
  time: Date;
  startTime: Date;
  presaleTime: Date;
  customCheck?: () => boolean;
  checkErrorMessage?: string;
};

export default memo(function MintBox({
  title1,
  title2,
  title_price,
  coin_price,
  disabled,
  time,
  limit,
  customCheck,
  checkErrorMessage,
  presaleTime,
  startTime,
}: Props) {
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const refAda = useRef<HTMLInputElement>(null);

  const address = useAddressCus();

  const today = new Date();

  const checkTimeLimit = !(today >= startTime) || today > time;

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
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  const filterInput = (e: ChangeEvent<HTMLInputElement>, limit: number) => {
    e.preventDefault();

    setAmount(Number(e.target.value));

    if (Number(e.target.value) > limit) {
      setErrorMessage(`Maximum input amount is ${limit} ADA`);
    } else {
      setErrorMessage("");
    }
  };

  const checkMintLimit = async (add: string): Promise<boolean> => {
    try {
      const response = await axios.get(`/api/presale?address${add}`);

      if (response.status === 200) {
        const minted = response.data.data.amount;

        return minted >= limit ? true : false;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="text-white">
      <div className="flex flex-col gap-4 bg-[#1C1C3D] py-4 px-3 text-xs lg:text-base">
        <div className="flex justify-between items-center">
          <h3>{title1}</h3>

          <div className="flex space-x-2 items-center">
            <Image src="/clock-piece.svg" alt="clock" width={20} height={20} />

            {isClient && (
              <span className="text-[#FA00FF]" suppressHydrationWarning>
                {today >= startTime ? (
                  <>
                    <span>{addZero(days)}</span>:<span>{addZero(hours)}</span>:
                    <span>{addZero(minutes)}</span>:
                    <span>{addZero(seconds)}</span>
                  </>
                ) : (
                  <>
                    <span>00</span>:<span>00</span>:<span>00</span>:
                    <span>00</span>
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <span>{title2}</span>{" "}
            <span className="font-bold">{title_price}</span>
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
              placeholder="Amount"
            />
            <div className="flex justify-between">
              <span>
                <div className="font-serrat text-[#E22E6B]">{errorMessage}</div>
                {limit === 500 && (
                  <div className="text-[#00FFFF] text-xs mt-1">Total</div>
                )}
              </span>
            </div>
          </div>

          <button
            disabled={disabled || errorMessage !== ""}
            className={`${disabled ? "bg-[#828282]" : "bg-[#00FFFF]"}
                                    ${
                                      errorMessage !== "" &&
                                      "cursor-not-allowed"
                                    }
                                    text-black h-12  w-full md:w-[30%]`}
          >
            Mint
          </button>
        </form>
      </div>
    </div>
  );
});
