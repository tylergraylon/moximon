
// import { MeshProvider } from "@meshsdk/react";
import { ReactNode } from "react";

import dynamic from "next/dynamic";

const MeshProvider = dynamic(async () => (await import('@meshsdk/react')).MeshProvider, { ssr: false })



export default function CardonoProvider({ children }: { children: ReactNode }) {
    return (
        <div>
            <MeshProvider>
                {children}
            </MeshProvider>
        </div>

    )
}