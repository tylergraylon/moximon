import Link from "next/link";


export default function Footer() {
    return (
        <footer className="mx-8 md:mx-12 text-xs sm:text-sm rounded-none flex flex-col text-white justify-center items-center py-5 space-x-3 opacity-60">

            <div className="text-white">
                &copy; {new Date().getFullYear()} XMAX ALL RIGHTS RESERVED
            </div>
            <div className="divider divider-vertical mx-0 h-7 text-white"></div>
            <Link href="https://xmax.gitbook.io/xmax-paper/" target="_blank">
                Read about XMAX here...
            </Link>

        </footer>
    )
}