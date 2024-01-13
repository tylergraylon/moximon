import { memo } from "react";

import { OUTCOME } from "./jfhkjhvygcbvjh";

type Props = {
    opener: boolean;
    outcome: string | undefined,
    won: string | undefined
    setOpener: (open: boolean) => void
}
export default memo(function Prize({ opener, outcome, setOpener, won }: Props) {



    if (outcome === OUTCOME.WIN) {
        return (
            <div className="text-white">
                <label className="btn btn-primary hidden" htmlFor="modal-6"></label>

                <input
                    className="modal-state"
                    id="modal-6"
                    checked={opener}
                    onChange={() => {
                        setOpener(false)
                    }}
                    type="checkbox" />
                <div className="modal w-full bg-[url('/wheelz/won.svg')] bg-cover bg-no-repeat mx-auto">
                    <label className="modal-overlay" htmlFor="modal-6"></label>
                    <div
                        className="modal-content 
                                    flex flex-col text-center gap-5
                                    max-w-3xl bg-gradient-to-r rounded-none
                                        w-full
                                     from-[#0000FF] via-[#0000FF] to-[#FF00FF]">

                        <p className="text-lg text-white">YOU WON! {won}</p>

                        <p className="text-sm text-white">You are a magician</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <label className="btn btn-primary hidden" htmlFor="modal-6"></label>

            <input
                className="modal-state"
                id="modal-6"
                checked={opener}
                onChange={() => {
                    setOpener(false)
                }}
                type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="modal-6"></label>
                <div
                    className="modal-content flex flex-col text-center gap-5
                            max-w-3xl bg-gradient-to-r w-full rounded-none
                             bg-[#0000FF]">

                    <p className="text-lg text-white">SHEESH! </p>
                    <div className="text-sm text-white">
                        <p>We caught your tricks</p>
                        <p>You lose. TRY AGAIN</p>
                    </div>


                </div>
            </div>
        </div>
    )


})