import Header from "@/components/rafflepage/header"
import MagicWheelz from "@/components/rafflepage/magic-wheelz"
import { lazy } from "react"
const Carousel = lazy(() => import('@/components/carousel'))




export default function MagicWheelzPage() {

    return (
        <main className="min-h-screen">
            <Header />
            <div className="mt-7">
                <Carousel />
            </div>

            <MagicWheelz />


        </main>
    )

}