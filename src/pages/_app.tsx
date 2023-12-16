import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MeshProvider } from "@meshsdk/react";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--montserrat",
});

const myFont = localFont({
  src: "../fonts/conthrax-sb.woff2",
  display: "swap",
  weight: '100',
  adjustFontFallback: 'Times New Roman',
  variable: '--conthrax'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <main className={`${myFont.className} ${montserrat.variable}`}>

        <Component {...pageProps} />
      </main>
    </MeshProvider>
  )
}
