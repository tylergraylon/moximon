import Header from "@/components/rafflepage/header"
import MagicWheelz from "@/components/rafflepage/magic-wheelz"
import { lazy } from "react"
import dynamic from 'next/dynamic'

const Carousel = dynamic(() => import('@/components/carousel'), { ssr: false })





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