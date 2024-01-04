import Image from "next/image"
import Link from "next/link"
import ConnectWallet from "../ConnectWallet"
export default function Header() {
    return (
        <header className="">
            <div className="navbar bg-[#14112D]">
                <div className="">
                    <Image
                        src="/xmax-logo.png"
                        alt="xmax"
                        width={320}
                        height={200}
                        className="navbar-item hidden md:block"
                    />
                    <Image
                        src="/xmax-logo.png"
                        alt="xmax"
                        width={150}
                        height={100}
                        className="navbar-item md:hidden"
                    />

                </div>
                <div className="navbar-start hidden md:flex text-sm">
                    <Link href="#" className="navbar-item !text-[#FF00FF]">HOME</Link>
                    <Link href="/magic-wheelz" className="navbar-item whitespace-nowrap hover:!text-[#FF00FF]">MAGIC WHEELZ</Link>
                    <Link href="#" className="navbar-item hover:!text-[#FF00FF]">WHITEPAPER</Link>
                </div>


                <div className="navbar-end">
                    <div className="hidden md:flex">

                        <Link
                            href="https://x.com/xmaxcoinada"
                            target="_blank"
                            className="flex justify-center items-center"
                        >
                            <Image
                                src="/x-logo.svg"
                                alt="x"
                                width={40}
                                height={40}
                                className="navbar-item"
                            />
                        </Link>

                        <Link
                            href="#"
                            target="_blank"
                            className="flex justify-center items-center"
                        >

                            <Image
                                src="/discord-logo.svg"
                                alt="discord"
                                width={40}
                                height={40}
                                className="navbar-item"
                            />
                        </Link>


                        <div className="navbar-item">
                            <ConnectWallet />
                        </div>
                    </div>


                    <div className="md:hidden">
                        <MobileMenu />
                    </div>




                </div>
            </div>
        </header>
    )
}



export function MobileMenu() {



    return (
        <>
            <input
                type="checkbox"
                id="drawer-top"
                className="drawer-toggle"
            />

            <label htmlFor="drawer-top" className="btn btn-sm bg-transparent">
                <svg

                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>

            </label>
            <label className="overlay" htmlFor="drawer-top"></label>
            <div className="drawer h-screen drawer-top pb-5 pt-2 bg-[#14112D]">
                <div className="drawer-content">
                    <div className="flex justify-between items-center">
                        <Image
                            src="/xmax-logo.png"
                            alt="xmax"
                            width={150}
                            height={100}
                            className="navbar-item py-0"
                        />
                        <label htmlFor="drawer-top" className="btn btn-sm btn-circle btn-ghost">✕</label>
                    </div>

                    <div className="mt-5 flex flex-col items-center">
                        <ConnectWallet mobile />
                        <div className="w-full my-2">
                            <div className="divider my-0"></div>
                        </div>

                        <nav className="menu rounded-md items-center">
                            <section className="menu-section">
                                <ul className="menu-items text-center items-center">
                                    <li className="menu-item  w-full">
                                        <Link href="/" className=" text-[#FF00FF] w-full text-[15px]">HOME</Link>
                                    </li>
                                    <li className="menu-item w-full">
                                        <Link href="/magic-wheelz" className="text-[15px] w-full">MAGIC WHEELZ</Link>
                                    </li>
                                    <li className="menu-item w-full">
                                        <Link href="#" className="text-[15px] w-full">WHITEPAPER</Link>
                                    </li>

                                    <li className="flex">

                                        <Link
                                            href="https://x.com/xmaxcoinada"
                                            target="_blank"
                                            className="flex justify-center items-center"
                                        >
                                            <Image
                                                src="/x-logo.svg"
                                                alt="x"
                                                width={40}
                                                height={40}
                                                className="navbar-item"
                                            />
                                        </Link>

                                        <Link
                                            href="#"
                                            target="_blank"
                                            className="flex justify-center items-center"
                                        >
                                            <Image
                                                src="/discord-logo.svg"
                                                alt="discord"
                                                width={40}
                                                height={40}
                                                className="navbar-item"
                                            />
                                        </Link>

                                    </li>
                                </ul>
                            </section>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}