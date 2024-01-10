import Header from "@/components/rafflepage/header"
import MagicWheelz from "@/components/rafflepage/magic-wheelz"
import Carousel from "@/components/carousel"





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