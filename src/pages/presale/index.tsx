import Header from "@/components/homepage/header"
import Footer from "@/components/homepage/footer"
import Presale from "@/components/presale/presale"

import { useSearchParams } from "next/navigation"


export default function PresalePage() {


    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header presale />

                <div className="flex-1">
                    <Presale />
                </div>

            </div>
            <Footer />
        </div>

    )

}