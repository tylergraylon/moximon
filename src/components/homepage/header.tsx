import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "../ConnectWallet";
import { usePathname } from "next/navigation";
import CasinoHead from "./casino-head";
import { FundsShow } from "../rafflepage/header";
export default function Header({ presale }: { presale?: boolean }) {
  const pathname = usePathname();
  return (
    <header className="">
      <div className="navbar bg-[#14112D]">
        <div className="">
          <Image
            src="/xmax-logo.png"
            alt="xmax"
            width={320}
            height={200}
            className="navbar-item hidden lg:block"
          />
          <Image
            src="/xmax-logo.png"
            alt="xmax"
            width={150}
            height={100}
            className="navbar-item lg:hidden"
          />
        </div>
        <div className="navbar-start hidden lg:flex text-sm">
          <Link
            href="#"
            className={`${
              pathname.endsWith("/") ? "text-[#FF00FF]" : "text-white"
            } navbar-item hover:!text-[#FF00FF]`}
          >
            HOME
          </Link>
          {/* <Link href="/magic-wheelz" className="navbar-item whitespace-nowrap text-white hover:!text-[#FF00FF]">MAGIC WHEELZ</Link> */}
          <CasinoHead />
          <Link
            href="https://xmax.gitbook.io/xmax-paper/"
            target="_blank"
            className="navbar-item text-white hover:!text-[#FF00FF]"
          >
            WHITEPAPER
          </Link>
          {/* <Link href="/presale" className={`${pathname.endsWith('presale') ? 'text-[#FF00FF]' : 'text-white'} navbar-item  hover:!text-[#FF00FF]`}>PRESALE</Link> */}
        </div>

        <div className="navbar-end">
          {presale && (
            <div className="flex items-center text-xs">
              <FundsShow />
            </div>
          )}

          <div className="hidden lg:flex">
            <Link
              href="https://www.jpg.store/collection/xmaxmintcard?tab=items"
              target="_blank"
              className="flex justify-center items-center navbar-item"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <circle cx="16.5" cy="16" r="16" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_916_1433"
                      transform="scale(0.00446429)"
                    />
                  </pattern>
                  <image
                    id="image0_916_1433"
                    width="224"
                    height="224"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
            </Link>

            <Link
              href="https://x.com/xmaxcoinada"
              target="_blank"
              className="flex justify-center items-center navbar-item"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-[#FF00FF] fill-white"
              >
                <path d="M0.749719 1.24465C0.94419 0.864319 1.33534 0.625 1.7625 0.625H7.45C7.81526 0.625 8.1583 0.800397 8.37215 1.09651L13.7913 8.59999L21.4332 0.958165C21.8774 0.513945 22.5977 0.513945 23.0418 0.958165C23.4861 1.40239 23.4861 2.12261 23.0418 2.56683L15.1406 10.4682L23.1596 21.5714C23.4098 21.9178 23.4448 22.3751 23.2503 22.7554C23.0558 23.1357 22.6646 23.375 22.2375 23.375H16.55C16.1847 23.375 15.8417 23.1996 15.6279 22.9035L10.2087 15.4L2.56684 23.0418C2.12262 23.4861 1.4024 23.4861 0.958167 23.0418C0.513947 22.5976 0.513947 21.8773 0.958167 21.4332L8.85946 13.5318L0.840357 2.42849C0.590259 2.0822 0.555247 1.62499 0.749719 1.24465Z" />
              </svg>
            </Link>

            <Link
              href="https://discord.gg/azz9jnck"
              target="_blank"
              className="flex justify-center items-center navbar-item"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-[#FF00FF] fill-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.23926 0.630115C9.63482 0.587299 10.0095 0.816735 10.1511 1.18854L10.6872 2.59574C10.7828 2.84651 10.8305 2.9719 10.933 3.03423C11.0357 3.09658 11.1735 3.08068 11.4493 3.04887C11.9698 2.98884 12.4838 2.95836 13.0001 2.95836C13.5164 2.95836 14.0303 2.98884 14.5509 3.04887C14.8267 3.08068 14.9644 3.09658 15.0671 3.03423C15.1697 2.9719 15.2175 2.84651 15.3129 2.59574L15.849 1.18854C15.9906 0.816735 16.3654 0.587299 16.7609 0.630115C18.7756 0.8482 20.8038 1.30217 22.8272 2.75864C22.9747 2.86478 23.0854 3.0142 23.1441 3.18614C24.4312 6.95759 25.1356 10.2491 25.4079 12.8949C25.6767 15.5071 25.535 17.5886 25.0359 18.8783C25.0274 18.9005 25.018 18.9223 25.0076 18.9437C24.5526 19.8839 23.8655 20.9557 23.0132 21.8066C22.1755 22.6428 21.0654 23.375 19.776 23.375C19.4516 23.375 19.1723 23.2291 19.0218 23.1419C18.8363 23.0345 18.6461 22.8941 18.4636 22.7427C18.0961 22.4376 17.6918 22.031 17.317 21.5905C16.9424 21.1502 16.5772 20.6526 16.3005 20.1599C16.2031 19.9866 16.1544 19.8999 16.1581 19.8013C16.1611 19.7192 16.201 19.6269 16.2589 19.5684C16.3282 19.4983 16.4361 19.4716 16.6519 19.4182C17.5247 19.2023 18.6943 18.8827 19.1448 18.6511C19.5963 18.479 19.823 17.9735 19.6509 17.5219C19.479 17.0702 18.9733 16.8437 18.5218 17.0156C14.6391 18.4949 11.3608 18.4949 7.47813 17.0156C7.02654 16.8437 6.52098 17.0702 6.34895 17.5219C6.17691 17.9735 6.40354 18.479 6.85513 18.6511C7.7045 18.9746 8.53177 19.2341 9.34571 19.4292C9.55393 19.4793 9.65805 19.5043 9.72522 19.5664C9.79313 19.6294 9.83734 19.7306 9.83735 19.8232C9.83735 19.9148 9.79144 19.9965 9.69962 20.1599C9.42294 20.6526 9.05776 21.1502 8.68312 21.5905C8.30833 22.031 7.90403 22.4376 7.5365 22.7427C7.35403 22.8941 7.1639 23.0345 6.97838 23.1419C6.82785 23.2291 6.5486 23.375 6.22414 23.375C4.93468 23.375 3.82467 22.6428 2.98699 21.8066C2.13461 20.9557 1.44757 19.8839 0.992583 18.9437C0.982235 18.9223 0.972762 18.9005 0.964175 18.8783C0.465134 17.5886 0.323489 15.5071 0.592312 12.8949C0.864589 10.2491 1.56886 6.95759 2.85609 3.18614C2.91477 3.0142 3.02553 2.86478 3.17298 2.75864C5.19627 1.30217 7.22459 0.8482 9.23926 0.630115ZM5.41668 10.25C5.41668 8.96411 6.45465 7.91666 7.74122 7.91666H7.7588C9.04537 7.91666 10.0833 8.96411 10.0833 10.25C10.0833 11.5359 9.04537 12.5834 7.7588 12.5834H7.74122C6.45465 12.5834 5.41668 11.5359 5.41668 10.25ZM15.9167 10.25C15.9167 8.96411 16.9547 7.91666 18.2413 7.91666H18.2588C19.5454 7.91666 20.5833 8.96411 20.5833 10.25C20.5833 11.5359 19.5454 12.5834 18.2588 12.5834H18.2413C16.9547 12.5834 15.9167 11.5359 15.9167 10.25Z"
                />
              </svg>
            </Link>

            <div className="navbar-item">
              <ConnectWallet />
            </div>
          </div>

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <>
      <input type="checkbox" id="drawer-top" className="drawer-toggle" />

      <label htmlFor="drawer-top" className="btn btn-sm bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </label>
      <label className="overlay" htmlFor="drawer-top"></label>
      <div className="drawer h-screen drawer-top pb-5 pt-2 bg-[#14112D]">
        <div className="drawer-content">
          <div className="flex justify-between items-center">
            <Image
              src="/xmax-logo.png"
              alt="xmax"
              width={150}
              height={100}
              className="navbar-item py-0"
            />
            <label
              htmlFor="drawer-top"
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <ConnectWallet mobile />
            <div className="w-full my-2">
              <div className="divider my-0"></div>
            </div>

            <nav className="menu rounded-md items-center">
              <section className="menu-section">
                <ul className="menu-items text-center items-center">
                  <li className="menu-item  w-full">
                    <Link
                      href="/"
                      className={`${
                        pathname.endsWith("/") && "text-[#FF00FF]"
                      } text-white  w-full text-[15px]`}
                    >
                      HOME
                    </Link>
                  </li>
                  <li className=" w-full">
                    <CasinoHead mobile />
                    {/* <Link href="/magic-wheelz" className={`${pathname.endsWith('magic-wheelz') && 'text-[#FF00FF]'} text-white text-[15px] w-full`}>MAGIC WHEELZ</Link> */}
                  </li>
                  <li className="menu-item w-full">
                    <Link
                      href="https://xmax.gitbook.io/xmax-paper/"
                      className="text-[15px] text-white w-full"
                    >
                      WHITEPAPER
                    </Link>
                  </li>
                  {/* 
                  <li className="menu-item w-full">
                    <Link
                      href="/presale"
                      className={`${
                        pathname.endsWith("presale")
                          ? "text-[#FF00FF]"
                          : "text-white"
                      } text-[15px] w-full`}
                    >
                      PRESALE
                    </Link>
                  </li> */}

                  <li className="flex">
                    <Link
                      href="https://www.jpg.store/collection/xmaxmintcard?tab=items"
                      target="_blank"
                      className="flex justify-center items-center navbar-item"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <circle
                          cx="16.5"
                          cy="16"
                          r="16"
                          fill="url(#pattern0)"
                        />
                        <defs>
                          <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlinkHref="#image0_916_1433"
                              transform="scale(0.00446429)"
                            />
                          </pattern>
                          <image
                            id="image0_916_1433"
                            width="224"
                            height="224"
                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC"
                          />
                        </defs>
                      </svg>
                    </Link>

                    <Link
                      href="https://x.com/xmaxcoinada"
                      target="_blank"
                      className="flex justify-center items-center navbar-item"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:fill-[#FF00FF] fill-white"
                      >
                        <path d="M0.749719 1.24465C0.94419 0.864319 1.33534 0.625 1.7625 0.625H7.45C7.81526 0.625 8.1583 0.800397 8.37215 1.09651L13.7913 8.59999L21.4332 0.958165C21.8774 0.513945 22.5977 0.513945 23.0418 0.958165C23.4861 1.40239 23.4861 2.12261 23.0418 2.56683L15.1406 10.4682L23.1596 21.5714C23.4098 21.9178 23.4448 22.3751 23.2503 22.7554C23.0558 23.1357 22.6646 23.375 22.2375 23.375H16.55C16.1847 23.375 15.8417 23.1996 15.6279 22.9035L10.2087 15.4L2.56684 23.0418C2.12262 23.4861 1.4024 23.4861 0.958167 23.0418C0.513947 22.5976 0.513947 21.8773 0.958167 21.4332L8.85946 13.5318L0.840357 2.42849C0.590259 2.0822 0.555247 1.62499 0.749719 1.24465Z" />
                      </svg>
                    </Link>

                    <Link
                      href="https://discord.gg/azz9jnck"
                      target="_blank"
                      className="flex justify-center items-center navbar-item"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:fill-[#FF00FF] fill-white"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.23926 0.630115C9.63482 0.587299 10.0095 0.816735 10.1511 1.18854L10.6872 2.59574C10.7828 2.84651 10.8305 2.9719 10.933 3.03423C11.0357 3.09658 11.1735 3.08068 11.4493 3.04887C11.9698 2.98884 12.4838 2.95836 13.0001 2.95836C13.5164 2.95836 14.0303 2.98884 14.5509 3.04887C14.8267 3.08068 14.9644 3.09658 15.0671 3.03423C15.1697 2.9719 15.2175 2.84651 15.3129 2.59574L15.849 1.18854C15.9906 0.816735 16.3654 0.587299 16.7609 0.630115C18.7756 0.8482 20.8038 1.30217 22.8272 2.75864C22.9747 2.86478 23.0854 3.0142 23.1441 3.18614C24.4312 6.95759 25.1356 10.2491 25.4079 12.8949C25.6767 15.5071 25.535 17.5886 25.0359 18.8783C25.0274 18.9005 25.018 18.9223 25.0076 18.9437C24.5526 19.8839 23.8655 20.9557 23.0132 21.8066C22.1755 22.6428 21.0654 23.375 19.776 23.375C19.4516 23.375 19.1723 23.2291 19.0218 23.1419C18.8363 23.0345 18.6461 22.8941 18.4636 22.7427C18.0961 22.4376 17.6918 22.031 17.317 21.5905C16.9424 21.1502 16.5772 20.6526 16.3005 20.1599C16.2031 19.9866 16.1544 19.8999 16.1581 19.8013C16.1611 19.7192 16.201 19.6269 16.2589 19.5684C16.3282 19.4983 16.4361 19.4716 16.6519 19.4182C17.5247 19.2023 18.6943 18.8827 19.1448 18.6511C19.5963 18.479 19.823 17.9735 19.6509 17.5219C19.479 17.0702 18.9733 16.8437 18.5218 17.0156C14.6391 18.4949 11.3608 18.4949 7.47813 17.0156C7.02654 16.8437 6.52098 17.0702 6.34895 17.5219C6.17691 17.9735 6.40354 18.479 6.85513 18.6511C7.7045 18.9746 8.53177 19.2341 9.34571 19.4292C9.55393 19.4793 9.65805 19.5043 9.72522 19.5664C9.79313 19.6294 9.83734 19.7306 9.83735 19.8232C9.83735 19.9148 9.79144 19.9965 9.69962 20.1599C9.42294 20.6526 9.05776 21.1502 8.68312 21.5905C8.30833 22.031 7.90403 22.4376 7.5365 22.7427C7.35403 22.8941 7.1639 23.0345 6.97838 23.1419C6.82785 23.2291 6.5486 23.375 6.22414 23.375C4.93468 23.375 3.82467 22.6428 2.98699 21.8066C2.13461 20.9557 1.44757 19.8839 0.992583 18.9437C0.982235 18.9223 0.972762 18.9005 0.964175 18.8783C0.465134 17.5886 0.323489 15.5071 0.592312 12.8949C0.864589 10.2491 1.56886 6.95759 2.85609 3.18614C2.91477 3.0142 3.02553 2.86478 3.17298 2.75864C5.19627 1.30217 7.22459 0.8482 9.23926 0.630115ZM5.41668 10.25C5.41668 8.96411 6.45465 7.91666 7.74122 7.91666H7.7588C9.04537 7.91666 10.0833 8.96411 10.0833 10.25C10.0833 11.5359 9.04537 12.5834 7.7588 12.5834H7.74122C6.45465 12.5834 5.41668 11.5359 5.41668 10.25ZM15.9167 10.25C15.9167 8.96411 16.9547 7.91666 18.2413 7.91666H18.2588C19.5454 7.91666 20.5833 8.96411 20.5833 10.25C20.5833 11.5359 19.5454 12.5834 18.2588 12.5834H18.2413C16.9547 12.5834 15.9167 11.5359 15.9167 10.25Z"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </section>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
