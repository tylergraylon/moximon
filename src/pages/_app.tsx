import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MeshProvider } from "@meshsdk/react";
import localFont from "next/font/local";
import { Montserrat, Lato } from "next/font/google";
import Head from 'next/head'
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--montserrat",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ['100', '300', '400', '700', '900'],
  variable: "--lato",
})

const myFont = localFont({
  src: "../fonts/conthrax-sb.woff2",
  display: "swap",
  adjustFontFallback: 'Times New Roman',
  variable: '--conthrax'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/wheelz/wheelz-image.svg" />
        <title>XMAXCOINADA</title>
      </Head>
      <MeshProvider>

        <main className={`${myFont.className} ${myFont.variable} ${montserrat.variable} ${lato.variable}`}>

          <Component {...pageProps} />
        </main>
      </MeshProvider>
    </>

  )
}
