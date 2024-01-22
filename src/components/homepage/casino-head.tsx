import Link from "next/link"
import { usePathname } from "next/navigation"


const games = [
    {
        game: "Magic Wheelz",
        product: "Live",
        color: "text-[#00FFA3]",
        link: "/magic-wheelz"
    },
    {
        game: "Xmax Slots",
        product: "Live after presale",
        color: "text-[#F600FF]",
        link: "#"
    },
    {
        game: "Aviator",
        product: "Coming soon",
        color: "text-[#8E8E8E]",
        link: "#"
    },
    {
        game: "Roulettes",
        product: "Coming soon",
        color: "text-[#8E8E8E]",
        link: "#"
    },
    {
        game: "Double U Casino",
        product: "Coming soon",
        color: "text-[#8E8E8E]",
        link: "#"
    },
    {
        game: "Jackpot Party",
        product: "Coming soon",
        color: "text-[#8E8E8E]",
        link: "#"
    },
]

export default function CasinoHead({ mobile }: { mobile?: boolean }) {

    const pathname = usePathname()
    return (
        <div className="popover">
            <label
                className={`popover-trigger ${mobile && 'text-center'}
                            hover:text-[#FF00FF] text-white text-[15px] cursor-pointer w-full`}
                tabIndex={0}>
                CASINO
            </label>
            <div className={`popover-content w-screen max-w-sm ${mobile ? 'popover-bottom-center' : 'popover-bottom-right'}  my-2 bg-[#000000]`} tabIndex={0}>
                {/* <div className="popover-arrow"></div> */}
                <div className="flex flex-col gap-2 px-4 pt-3 pb-10">

                    {
                        games.map((item, i) => (
                            <Link href={item.link}
                                className={`flex justify-between items-center 
                                ${!item.product.includes('soon') ? 'hover:bg-white/30 cursor-pointer' : 'cursor-default'} 
                                py-3 px-2`} key={i}>

                                <span
                                    className={
                                        `${item.product.includes('soon') ? 'text-[#8E8E8E]' : 'text-white'}`}>
                                    {item.game}
                                </span>

                                <span className={`${item.color} text-xs font-serrat`}>
                                    {item.product}
                                </span>

                            </Link>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}