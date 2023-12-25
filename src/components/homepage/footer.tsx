import Link from "next/link";


export default function Footer() {
    return (
        <footer className="mx-8 md:mx-12 text-sm rounded-none flex flex-col justify-center items-center py-5 space-x-3 opacity-60">

            <div>
                &copy; {new Date().getFullYear()} XMAX ALL RIGHTS RESERVED
            </div>
            <div className="divider divider-vertical mx-0 h-7"></div>
            <Link href="#">
                Read Whitepaper
            </Link>

        </footer>
    )
}