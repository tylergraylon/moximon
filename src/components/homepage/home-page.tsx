import Link from "next/link"
import Header from "./header"
import Image from "next/image"
import Collection from "./collection"
import Footer from "./footer"
import roadmap_rect from "../../../public/roadmap-rect.svg"
import roadmap from "../../../public/beta-testing-roadmap.svg"
import Carousel from '@/components/carousel'


export default function HomePage() {
    return (
        <main className="h-full">
            <Header />
            <Carousel />
            <section className="bg-[url('/xmax-hero.png')] bg-no-repeat bg-cover
             h-[38rem] px-10 flex justify-center items-center">

                <div className="flex flex-col items-center justify-center text-center w-[80%] md:w-[60%]">

                    <h1 className="xmax-text-bg text-[17vw] sm:text-[13vw] font-lato font-extrabold"> XMAX</h1>

                    <p className="text-white">
                        Experience the thrilling excitement of casino gaming on a decentralized platform.
                        XMAX simplifies the online gaming experience for both experienced players and newcomers
                        to the game, making it accessible for all.
                    </p>

                    <div className="flex space-x-5 md:space-x-12 justify-center mt-10 mx-5">
                        <button className="btn btn-sm sm:btn-md whitespace-nowrap text-xs bg-transparent border border-white hover:text-[#FF00FF] hover:border-[#FF00FF] rounded-none text-white">
                            <Link href="#roadmap" className="">
                                View Roadmap
                            </Link>

                        </button>
                        <button className="btn btn-sm sm:btn-md whitespace-nowrap text-xs bg-[#00FFFF] hover:bg-[#FF00FF] rounded-none text-black">
                            <Link href="/magic-wheelz">
                                Spin Magic Wheelz
                            </Link>

                        </button>
                    </div>

                </div>

            </section>

            <section

                className="mt-14 grid grid-cols-1 lg:grid-cols-2 px-8 md:px-12">

                <div className="order-last lg:order-none text-center lg:text-start">
                    <div className="relative w-full hidden lg:flex  justify-start items-center">
                        <h1 className="back-text-bg text-[9vw] md:text-[4.4vw] font-extrabold font-serrat"> OUR MISSION</h1>
                        <h1 className="text-[8vw] md:text-[3vw] font-extrabold font-serrat  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                            OUR MISSION
                        </h1>
                    </div>


                    <p className="mt-6 text-white">
                        XMAX, is the ultimate destination for Gamers, offering a seamless and exciting gaming experience.
                        Built on the principles of Web3, XMAX ensures transparency, decentralization, and user empowerment,
                        allowing players to enjoy the game while retaining ownership of their data and assets.
                        Experience the Thrill of Casino on a Decentralized Platform.
                    </p>


                    <div className="mt-12 text-white">
                        <span className="text-[#00FFFF]">Welcome to XMAX:</span> Embark on thrilling adventures, defy gravity in Wheels, soar to new heights with Aviator,
                        and explore a world of endless possibilities. Your next gaming journey awaits!
                    </div>

                    <button className="mt-16 btn btn-md bg-transparent border border-white hover:text-[#FF00FF] hover:border-[#FF00FF] rounded-none text-white">
                        <Link href="https://xmax.gitbook.io/xmax-paper/" target="_blank" className="">
                            View WhitePaper
                        </Link>

                    </button>

                </div>


                {/* <h1 className="text-[8vw] md:text-[3vw] justify-self-center font-serrat lg:hidden font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                    OUR MISSION
                </h1> */}

                <div className="relative w-full flex lg:hidden  justify-center items-center justify-self-center">
                    <h1 className="back-text-bg text-[9.5vw] md:text-[4.4vw] font-extrabold font-serrat"> OUR MISSION</h1>
                    <h1 className="text-[8vw] md:text-[3vw] font-extrabold font-serrat  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                        OUR MISSION
                    </h1>
                </div>

                <div className="flex lg:justify-end justify-center">




                    <Image
                        src="/game-controller.svg"
                        width={400}
                        height={300}
                        alt="discord"
                    />


                </div>

            </section>

            <section className="mt-16 px-3 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 px-8 py-9  border border-white/40 rounded-2xl">
                    <div className="self-center space-y-4 order-last lg:order-none text-center lg:text-start">
                        {/* <h1 className="text-[8vw] hidden lg:block md:text-[3vw] font-serrat font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                            TOKENOMICS
                        </h1> */}

                        <div className="relative w-full hidden lg:flex  justify-start items-center">
                            <h1 className="back-text-bg text-[9vw] md:text-[4.4vw] font-extrabold font-serrat"> TOKENOMICS</h1>
                            <h1 className="text-[8vw] md:text-[3vw] font-extrabold font-serrat  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                                TOKENOMICS
                            </h1>
                        </div>

                        <p className="text-white">
                            We distribute our tokens fairly without any private or VC investment, ensuring that our
                            community of users receives the maximum rewards, rather than benefiting speculators and insiders.
                        </p>
                    </div>

                    {/* <h1 className="text-[8vw] font-serrat justify-self-center lg:hidden md:text-[3vw] font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                        TOKENOMICS
                    </h1> */}

                    <div className="relative w-full flex lg:hidden  justify-center items-center justify-self-center">
                        <h1 className="back-text-bg text-[9.5vw] md:text-[4.4vw] font-extrabold font-serrat"> TOKENOMICS</h1>
                        <h1 className="text-[8vw] md:text-[3vw] font-extrabold font-serrat  text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFFF] to-[#00FFFF] brightness-110">
                            TOKENOMICS
                        </h1>
                    </div>

                    <div className="flex flex-col items-center mt-5 mb-12 lg:mb-0">

                        <Image
                            src="/total-supply.svg"
                            width={340}
                            height={340}
                            alt="discord"
                        />

                        <div className="mt-9 space-y-3 flex flex-col text-white items-center justify-center text-xs sm:text-[0.82rem]">

                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <span className="flex items-center gap-2">
                                    <span className="dot bg-[#FF00FF]"></span>
                                    <span>55% Pre-sale</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="dot dot-success"></span>
                                    <span>20% Liquidity Pool</span>
                                </span>

                            </div>

                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <span className="flex items-center gap-2">
                                    <span className="dot bg-blue-700"></span>
                                    <span>8% Team</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="dot dot-error"></span>
                                    <span>7% Gaming Improvement</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="dot bg-[#00FFFF]"></span>
                                    <span>4% Airdrop</span>
                                </span>


                            </div>

                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <span className="flex items-center gap-2">
                                    <span className="dot bg-[#FE9800]"></span>
                                    <span>3% CEX Listing & Partnership</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="dot bg-[#FFF500]"></span>
                                    <span>3% Marketing</span>
                                </span>



                            </div>

                        </div>

                    </div>
                </div>



            </section>

            <section
                className="mt-[8rem]" id="roadmap">

                <div className="bg-[url('/roadmap-bg.svg')] bg-no-repeat bg-cover px-8 md:px-12  flex flex-col items-center justify-center">
                    {/* <span className="xmax-text-bg"></span> */}
                    <h1
                        className="text-[8.5vw] md:text-[3.5vw] font-serrat text-transparent
                        bg-clip-text font-extrabold bg-gradient-to-r from-white mb-4
                        via-[#00FFFF] to-[#00FFFF]">

                        ROADMAP
                    </h1>

                    <p className="tracking-widest text-center opacity-80 text-white">
                        $XMAX, BRINGING SOMETHING GREAT TO CARDANO
                    </p>

                    <Image
                        src={roadmap_rect}
                        alt="roadmap"
                        className="my-3"
                    />

                </div>

                <div className="h-min bg-[url('/xmax-hero.png')] bg-no-repeat bg-cover py-10 gap flex flex-col items-center">

                    <div className="-mt-5 pt-16 px-5">

                        <Image
                            src={roadmap}
                            alt="roadmap"
                        />

                        <div
                            className="bg-clip-text bg-gradient-to-r from-[#00FFFF]
                                to-[#FF7CFF] text-transparent md:text-sm text-[0.58rem]
                                  float-right mt-4 text-white
                                ">
                            <span className="flex items-center gap-2">
                                <span className="dot bg-[#00FFFF]"></span>
                                <span>Building Mobile App</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="dot bg-[#00FFFF]"></span>
                                <span> MVP Release Of XMAX App </span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="dot bg-[#00FFFF]"></span>
                                <span>CEX Listing</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="dot bg-[#00FFFF]"></span>
                                <span>More Coming...</span>
                            </span>

                        </div>
                    </div>



                </div>

            </section>

            <Collection />
            <Footer />
        </main>
    )
}