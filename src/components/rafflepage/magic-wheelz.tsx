import { useRef, useState, useEffect, RefObject } from "react";
import { AdaWheelz } from "./jfhkjhvygcbvjh";
import Image from "next/image";
import { useSWRConfig } from "swr";
import { gamesKey, paymentAddress, prizesKey } from "@/utils/utils";
import {
  useConnection,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import useAddressCus from "@/utils/useAddress";
import { GlobalWheelz, WheelzDetails } from "./boxes";
import Prize from "./prize";
import swal from "sweetalert";
import { ConnectButtonWheel } from "../ConnectWallet";
import { ClaimPrizeMobile } from "../claim-prize";
import useBalance from "@/hooks/useBalance";

export enum WHEELZ {
  ten = "ten",
  fifty = "fifty",
  hundred = "hundred",
  fivehundred = "fivehundred",
  onethousand = "onethousand",
  onethousandfive = "onethousandfive",
}

const spin = "from-[#00FCFF] via-[#0200FF] to-[#F500FF] cursor-pointer";
const not_spin = "from-[#8A8A8B] via-[#0A081A] to-[#8E8E8E] cursor-not-allowed";
const numOfSpins = 360 * 20;
const counter = "hgfjhhgfghfjyfjyt";

//Can use Math.floor to round to integer
const randomer = (num: number) => Math.random() * (num + 24 - num) + num;

export default function MagicWheelz() {
  const [wheelz, setWheelz] = useState<WHEELZ>(WHEELZ.ten);
  const [count, setCount] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(false);
  const [win, setWin] = useState<{ outcome: string; name: string }>({
    name: AdaWheelz[wheelz].out[count].name,
    outcome: AdaWheelz[wheelz].out[count].outcome,
  });
  const [spinner, setSpinner] = useState(
    numOfSpins + randomer(AdaWheelz[wheelz].out[count].code)
  );

  const [prizeOpener, setPrizeOpener] = useState<boolean>(false);
  const [currentPrize, setCurrentPrize] = useState<{
    outcome: string;
    name: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wheel = useRef<HTMLDivElement>(null);

  const { connected, publicKey, sendTransaction } = useSolanaWallet();
  // const assets = useAssets() as AssetExtended;

  const address = useAddressCus();

  const { balance } = useBalance();

  const { mutate } = useSWRConfig();

  const { connection } = useConnection();

  const sendTransactionX = async () => {
    try {
      if (
        wheelz === WHEELZ.ten ||
        wheelz === WHEELZ.fifty ||
        wheelz === WHEELZ.hundred
      ) {
        let amount: number;
        switch (wheelz) {
          case WHEELZ.ten:
            amount = 0.1 * LAMPORTS_PER_SOL;
            break;
          case WHEELZ.fifty:
            amount = 0.25 * LAMPORTS_PER_SOL;
            break;
          case WHEELZ.hundred:
            amount = 0.5 * LAMPORTS_PER_SOL;
            break;
          default:
            amount = 0.1 * LAMPORTS_PER_SOL;
            break;
        }

        if (Number(balance) * LAMPORTS_PER_SOL <= amount) {
          console.log("balances amount", Number(balance), amount);

          swal(
            "Error",
            "Insufficient balance to complete transaction.",
            "error"
          );
          return;
        }

        const hash = await connection.getLatestBlockhash({
          commitment: "finalized",
        });

        const tx = new Transaction({
          blockhash: hash.blockhash,
          lastValidBlockHeight: hash.lastValidBlockHeight,
          feePayer: publicKey,
        });

        tx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey!,
            toPubkey: new PublicKey(paymentAddress),
            lamports: amount,
          })
          // SystemProgram.transfer({
          //   fromPubkey: publicKey,
          //   toPubkey: new PublicKey(bs58.decode(chargeAddress)),
          //   lamports: 0.01 * LAMPORTS_PER_SOL,
          // })
        );

        const data = await sendTransaction(tx, connection, {
          preflightCommitment: "confirmed",
        });
        // console.log("transac data", data);
        return data;

        return "txHash";
      } else if (
        wheelz === WHEELZ.fivehundred ||
        wheelz === WHEELZ.onethousand ||
        wheelz === WHEELZ.onethousandfive
      ) {
        // if (
        //   !(
        //     assets &&
        //     assets.filter(
        //       (item) =>
        //         item.unit === xmaxAssetId || item.policyId === xmaxPolicyId
        //     ).length > 0
        //   )
        // ) {
        //   swal("Error", "No Xmax token. Please buy some tokens", "error");
        //   return null;
        // }

        let amount: number;
        switch (wheelz) {
          case WHEELZ.fivehundred:
            amount = 500;
            break;
          case WHEELZ.onethousand:
            amount = 1000;
            break;
          case WHEELZ.onethousandfive:
            amount = 1500;
            break;
          default:
            amount = 500;
            break;
        }

        return "txHash";
      }

      return null;
    } catch (error: any) {
      error = `${error}`;
      const errMessage = error.split(":");

      if (errMessage.includes(`\"User declined to sign the transaction.\"}.`)) {
        swal("Error", "Declined to sign the transaction", "error");
      } else if (
        errMessage.includes(` Insufficient input in transaction. shortage`)
      ) {
        swal("Error", "Insufficient balance to complete transaction.", "error");
      } else {
        swal("Error", "Something went wrong...", "error");
      }

      return null;
    }
  };

  const spinWheel = async () => {
    // console.log('before', spinner);

    try {
      const spin_wheel = wheel.current;

      if (connected && address) {
        const transac = await sendTransactionX();

        if (spin_wheel && transac) {
          spin_wheel.classList.add("wheel-spinner-timer");

          // console.log('counter win', win);
          if (spinner >= Number.MAX_SAFE_INTEGER - 10000) {
            spin_wheel.style.removeProperty("transform");
            window.location.reload();
            return;
          }
          // console.log('before spinning', spinner);
          const auds = new Audio("/audio/win-sound.mp3");
          spin_wheel.style.transform = `rotate(${spinner}deg)`;
          setDisable(true);
          setCurrentPrize(win);
          setTimeout(async () => {
            setDisable(false);
            setPrizeOpener(true);
            auds.play();
            try {
              const res = await fetch("/api/games", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  address: address.trim(),
                  outcome: win.outcome,
                  name: win.name,
                  wager: wheelz,
                  trans: transac,
                }),
              });

              if (res.status === 200) {
                await mutate(gamesKey);
                await mutate(prizesKey(address));
              }
            } catch (error) {}
          }, 6300);

          setCount((prev) => {
            const next =
              prev >= AdaWheelz[wheelz].out.length - 1 ? 0 : prev + 1;
            localStorage.setItem(counter, next.toString());

            setWin({
              name: AdaWheelz[wheelz].out[next].name,
              outcome: AdaWheelz[wheelz].out[next].outcome,
            });

            setSpinner((prevSpinner) => {
              const remainder = prevSpinner % numOfSpins;
              prevSpinner = prevSpinner - remainder;
              // console.log('previous spinner', prevSpinner);

              // console.log('remainder', remainder);

              const nextSpinner =
                numOfSpins + randomer(AdaWheelz[wheelz].out[next].code);
              // console.log('randomer', randomer(AdaWheelz[wheelz].out[count].code))
              // console.log('code', AdaWheelz[wheelz].out[next].code)
              // console.log('next spinner', nextSpinner);

              return (prevSpinner += nextSpinner);
            });

            return next;
          });
        }
      }
    } catch (error: any) {
      error = `${error}`;
      const errMessage = error.split(":");

      // console.log(errMessage);

      if (
        errMessage.includes(
          `"User declined to sign the transaction."}.') is invalid`
        )
      ) {
        swal("Error", "Declined to sign the transaction", "error");
      } else if (
        errMessage.includes(` Insufficient input in transaction. shortage`)
      ) {
        swal("Error", "Insufficient balance to complete transaction.", "error");
      } else {
        swal("Error", "Something went wrong...", "error");
      }
    }
  };

  useEffect(() => {
    if (window) {
      const leftof = localStorage.getItem(counter);
      if (leftof && Number(leftof) < AdaWheelz[wheelz].out.length) {
        setCount(Number(leftof) ?? 0);
        setSpinner(
          numOfSpins + randomer(AdaWheelz[wheelz].out[Number(leftof)].code)
        );
        setWin({
          name: AdaWheelz[wheelz].out[Number(leftof)].name,
          outcome: AdaWheelz[wheelz].out[Number(leftof)].outcome,
        });
      }
    }
  }, [wheelz]);

  useEffect(() => {
    if (connected) {
      setIsModalOpen(false);
    }
  }, [connected]);
  return (
    <main
      className="grid grid-cols-1 xl:grid-cols-7 py-20
                bg-no-repeat h-full
                sm:mx-10 gap-y-6 gap-x-1 min-h-full background-rounder"
    >
      <div className="justify-self-center xl:col-span-2 xl:justify-self-start order-last xl:order-none">
        <GlobalWheelz />
      </div>

      <div className="absolute right-5 lg:hidden">
        <ClaimPrizeMobile />
      </div>

      <div className="xl:hidden mb-2 justify-self-center">
        <label
          className="btn btn-sm rounded-none bg-transparent border border-white space-x-2"
          htmlFor="modal-5"
        >
          <span>Wheelz Details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <input className="modal-state" id="modal-5" type="checkbox" />
        <div className="modal w-screen">
          <label className="modal-overlay" htmlFor="modal-5"></label>
          <div className="modal-content flex flex-col w-[19.5rem] p-0 rounded-none">
            <label
              htmlFor="modal-5"
              className="btn btn-sm btn-circle btn-ghost self-end"
            >
              ✕
            </label>

            <WheelzDetails wheelz={wheelz} />
          </div>
        </div>
      </div>

      <section className="flex items-center xl:col-span-3 justify-center py-4 px-2 xl:-mt-14 self-start w-full h-full">
        <div className="roulette-ring">
          <div
            className={`roulette-pointer ${
              disable && count !== 0 && "animate-ringBlinker"
            }`}
          >
            {/* <div className="z-30 border-[6px] border-[#A61746] rounded-full">
                            <Image
                                src="/wheelz/rous-blue.svg"
                                alt="rous"
                                width={25}
                                height={25}
                            />
                        </div> */}

            <Image
              src="/wheelz/stopper.svg"
              alt="rous"
              width={70}
              height={68}
              className="z-30 mt-5"
            />
          </div>

          <div className="roulette-holder flex justify-center ">
            <button
              onClick={() => (connected ? spinWheel() : setIsModalOpen(true))}
              disabled={disable}
              className={`absolute h-14 w-[120%] border-4 border-black 
                                        bg-gradient-to-r
                                         ${
                                           connected && address && !disable
                                             ? spin
                                             : not_spin
                                         } 
                                        flex justify-center items-center
                                         -bottom-9 rounded-tl-3xl rounded-tr-3xl`}
            >
              <span className="text-center text-xl select-none">
                {connected && address ? "SPIN" : <ConnectButtonWheel />}
              </span>
            </button>
          </div>

          <div className="roulette-container">
            <div className="roulette-middle p-1">
              <Image src="/wheelz/wheelz-image.svg" alt="wheelz" fill />
            </div>

            <div ref={wheel} className="roulette-wheel">
              {AdaWheelz[wheelz].wheel.map((item, i) => {
                return (
                  <div
                    className={`roulette-spin ${item.backgroundImage} bg-cover bg-no-repeat`}
                    style={{
                      backgroundColor: item.background,
                      transform: `rotate(calc(${
                        360 / AdaWheelz[wheelz].wheel.length
                      }deg * ${i + 1}))`,
                    }}
                    key={i}
                  >
                    <span
                      style={{ color: item.textColor }}
                      className="transform rotate-45 w-full text-end 
                                                               pr-[1.4rem] sm:pr-[1.7rem]"
                    >
                      <p className=" text-[0.57rem] md:text-[0.77rem]">
                        {item.name}
                      </p>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="justify-self-center xl:col-span-2 xl:justify-self-end">
        <WheelzPicker
          wheelz={wheelz}
          setWheelz={setWheelz}
          setCount={setCount}
          setDisable={setDisable}
          setWin={setWin}
          wheelRef={wheel}
          setSpinner={setSpinner}
        />
      </div>

      <Prize
        won={currentPrize?.name}
        outcome={currentPrize?.outcome}
        opener={prizeOpener}
        setOpener={setPrizeOpener}
      />
    </main>
  );
}

const adaWager = [
  { name: "0.1", wheel: WHEELZ.ten },
  { name: "0.25", wheel: WHEELZ.fifty },
  { name: "0.5", wheel: WHEELZ.hundred },
];

const xmaxWager = [
  { name: "500", wheel: WHEELZ.fivehundred },
  { name: "1000", wheel: WHEELZ.onethousand },
  { name: "1500", wheel: WHEELZ.onethousandfive },
];

type WheelzPickerProps = {
  wheelz: WHEELZ;
  setWheelz: (wheelz: WHEELZ) => void;
  setWin: ({ name, outcome }: { name: string; outcome: string }) => void;
  setSpinner: (spinner: (p: number) => number) => void;
  setCount: (counter: number) => void;
  setDisable: (disa: boolean) => void;
  wheelRef: RefObject<HTMLDivElement> | null;
};

function WheelzPicker({
  wheelz,
  setWheelz,
  setCount,
  wheelRef,
  setSpinner,
  setWin,
  setDisable,
}: WheelzPickerProps) {
  const changeWager = (wheel: WHEELZ) => {
    setDisable(true);
    const DivWheel = wheelRef?.current;

    setTimeout(() => {
      setDisable(false);
    }, 500);

    if (DivWheel && window) {
      DivWheel.classList.remove("wheel-spinner-timer");

      // setCount(0)
      // localStorage.removeItem(counter)
      setSpinner((prev) => {
        const remainder = prev % numOfSpins;
        prev = prev - remainder;
        // const turnto = 360 - remainder

        DivWheel.style.removeProperty("transform");

        return numOfSpins + randomer(AdaWheelz[wheel].out[0].code);
      });
      setWin({
        name: AdaWheelz[wheel].out[0].name,
        outcome: AdaWheelz[wheel].out[0].outcome,
      });
      setWheelz(wheel);
    }
  };

  return (
    <aside className="w-[19.1rem] mt-10">
      <div className="w-full hidden xl:block">
        <WheelzDetails wheelz={wheelz} />
      </div>

      <section className="w-full bg-[#1E1A45] xl:bg-transparent">
        <div className=" mt-8 text-sm">
          <div className="py-3 text-white pl-4 w-full  bg-gradient-to-r from-[#006666] to-[#00FFFF]">
            Wager SOL
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 w-full">
            {adaWager.map((item, i) => (
              <button
                onClick={() => changeWager(item.wheel)}
                className={`border  py-6 btn btn-md rounded-none text-white
                                                ${
                                                  item.wheel === wheelz
                                                    ? "bg-[#0000FF]"
                                                    : "bg-transparent hover:bg-[#020274]"
                                                }
                                                 border-[#00FFFF] text-center  text-sm font-medium`}
                key={i}
              >
                <div className="">
                  <p>{item.name}</p>
                  <p>SOL</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 text-sm">
          <div className="py-3 text-white pl-4 w-full  bg-gradient-to-r from-[#660066] to-[#FF00FF]">
            Wager $XMAX Coming Soon
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 w-full">
            {xmaxWager.map((item, i) => (
              <button
                disabled
                onClick={() => changeWager(item.wheel)}
                className={`border  py-6 btn btn-md rounded-none text-white
                                                ${
                                                  item.wheel === wheelz
                                                    ? "bg-[#0000FF]"
                                                    : "bg-transparent hover:bg-[#020274]"
                                                }
                                                 border-[#FF00FF] text-center  text-sm font-medium`}
                key={i}
              >
                <div className="">
                  <p>{item.name}</p>
                  <p>$XMAX</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
