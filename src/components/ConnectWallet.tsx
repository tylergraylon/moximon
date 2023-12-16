import { BrowserWallet } from '@meshsdk/core';
import { useWalletList, useWallet, useAddress } from '@meshsdk/react';
import useAddressCus from '@/utils/useAddress';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

const WalletList = [
  {
    name: "Nami",
    image: "/wallets/nami-wallet.svg",
    link: "https://namiwallet.io/"
  },
  {
    name: "Flint Wallet",
    image: "/wallets/flint-wallet.svg",
    link: "https://flint-wallet.com/"
  },
  {
    name: "Eternl",
    image: "/wallets/eternl-wallet.svg",
    link: "https://eternl.io/app/mainnet/welcome"
  },
  {
    name: "Typhon Wallet",
    image: "/wallets/typhon-wallet.svg",
    link: "https://typhonwallet.io/#/"
  },
  {
    name: "GeroWallet",
    image: "/wallets/gero-wallet.svg",
    link: "https://gerowallet.io/"
  },
  {
    name: "Yoroi",
    image: "/wallets/yoroi-wallet.svg",
    link: "https://yoroi-wallet.com"
  },
  {
    name: "Lace",
    image: "/wallets/lace-wallet.svg",
    link: "https://www.lace.io/"
  },
]

const concord = 'jhguhfguhdgfggdf'


export default function ConnectWallet({ mobile }: { mobile?: boolean }) {

  const [perCon, setPerCon] = useState<null | string>(null)

  const { connected, connect } = useWallet()


  useEffect(() => {

    if (window) {
      const walls = window.sessionStorage.getItem(concord)
      setPerCon(window.sessionStorage.getItem(concord))
      if (walls && !connected) {
        connect(walls)
      }
    }

  }, [connected])



  if (connected || perCon) return (
    <ButtonConnected />
  )

  return mobile ? <ConnectButtonMobile /> : <ConnectButton />
}



const ConnectButton = () => {
  const wallets = useWalletList()
  const { connect, connecting, connected } = useWallet()

  const [isModalOpen, setIsModalOpen] = useState(false)


  const uninstalledWallets = WalletList.filter(wallet => !wallets.map(item => item.name.toLowerCase()).includes(wallet.name.toLowerCase()))
  return (
    <div className=''>
      <label className="btn btn-sm sm:btn-md bg-transparent  border border-white rounded-none text-white min-w-[150px]" htmlFor="modal-2">
        {
          (isModalOpen && !connected) || connecting ? (
            <svg
              className="spinner-ring [--spinner-color:var(--blue-12)] spinner-sm"
              viewBox="25 25 50 50"
              strokeWidth="5">
              <circle cx="50" cy="50" r="20" />
            </svg>
          ) : (
            <span className='text-xs'>
              Connect Wallet
            </span>

          )
        }
      </label>

      <input
        className="modal-state"
        id="modal-2"
        checked={isModalOpen}
        type="checkbox"
        onChange={(e) => {

          setIsModalOpen(e.target.checked)
        }}
      />
      <div className="modal w-screen ">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 w-96 sm:w-[25.8rem]">
          <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <h2 className="text-xl">Connect Wallet</h2>
          <div className='mt-4'>
            {
              wallets.length > 0 && (
                <nav className="menu bg-gray-2 p-4 rounded-md">
                  <section className="menu-section">
                    <span className="menu-title">Installed Wallets</span>
                    <ul className="menu-items">
                      {wallets.map((wallet, i) => (
                        <li
                          className="menu-item justify-between"
                          key={i}
                          onClick={async () => {
                            await connect(wallet.name)
                            sessionStorage.setItem(concord, wallet.name)
                          }}
                        >
                          <span className='text-xs'>{wallet.name}</span>
                          {
                            !wallet.icon.startsWith('data') ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                              </svg>

                            ) : (
                              <Image
                                src={wallet.icon}
                                alt={wallet.name}
                                width={25}
                                height={25}
                              />
                            )
                          }

                        </li>
                      ))}
                    </ul>
                  </section>
                  <div className="divider my-0"></div>
                </nav>

              )

            }

            {
              uninstalledWallets.length > 0 && (
                <nav className="menu bg-gray-2 p-4 rounded-md">
                  <section className="menu-section">
                    <span className="menu-title">Uninstalled Wallets</span>
                    <ul className="menu-items">
                      {
                        uninstalledWallets.map((wallet, i) => (
                          <li
                            className="menu-item justify-between"
                            key={i}
                            onClick={() => {
                              window.open(wallet.link, '_blank')
                            }}>
                            <span className='text-xs'>{wallet.name}</span>
                            <div className='flex items-center'>
                              <span className="badge badge-md badge-flat-primary mr-3 text-[0.62rem]">Not Installed</span>
                              <Image
                                src={wallet.image}
                                alt={wallet.name}
                                width={28}
                                height={28}
                              />
                            </div>

                          </li>
                        ))
                      }

                    </ul>
                  </section>
                </nav>
              )
            }


          </div>
        </div>
      </div>
    </div>

  )
}
const ConnectButtonMobile = () => {
  const wallets = useWalletList()
  const { connect, connecting, connected } = useWallet()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const uninstalledWallets = WalletList.filter(wallet => !wallets.map(item => item.name.toLowerCase()).includes(wallet.name.toLowerCase()))
  return (
    <div className=''>
      <label className="btn btn-sm sm:btn-md bg-transparent border border-white rounded-none text-white min-w-[150px]" htmlFor="modal-3">
        {
          (isModalOpen && !connected) || connecting ? (
            <svg
              className="spinner-ring [--spinner-color:var(--blue-12)] spinner-sm"
              viewBox="25 25 50 50"
              strokeWidth="5">
              <circle cx="50" cy="50" r="20" />
            </svg>
          ) : (
            'Connect Wallet'
          )
        }
      </label>

      <input
        className="modal-state"
        id="modal-3"
        checked={isModalOpen}
        type="checkbox"
        onChange={(e) => {

          setIsModalOpen(e.target.checked)
        }}
      />
      <div className="modal w-screen ">
        <label className="modal-overlay" htmlFor="modal-3"></label>
        <div className="modal-content flex flex-col gap-5 w-96 sm:w-[25.8rem]">
          <label htmlFor="modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <h2 className="text-xl">Connect Wallet</h2>
          <div className='mt-4'>
            {
              wallets.length > 0 && (
                <nav className="menu bg-gray-2 p-4 rounded-md">
                  <section className="menu-section">
                    <span className="menu-title">Installed Wallets</span>
                    <ul className="menu-items">
                      {wallets.map((wallet, i) => (
                        <li
                          className="menu-item justify-between"
                          key={i}
                          onClick={async () => {
                            await connect(wallet.name)
                            sessionStorage.setItem(concord, wallet.name)
                          }}
                        >
                          <span>{wallet.name}</span>
                          {
                            !wallet.icon.startsWith('data') ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                              </svg>

                            ) : (
                              <Image
                                src={wallet.icon}
                                alt={wallet.name}
                                width={25}
                                height={25}
                              />
                            )
                          }

                        </li>
                      ))}
                    </ul>
                  </section>
                  <div className="divider my-0"></div>
                </nav>

              )

            }

            {
              uninstalledWallets.length > 0 && (
                <nav className="menu bg-gray-2 p-4 rounded-md">
                  <section className="menu-section">
                    <span className="menu-title">Uninstalled Wallets</span>
                    <ul className="menu-items">
                      {
                        uninstalledWallets.map((wallet, i) => (
                          <li
                            className="menu-item justify-between"
                            key={i}
                            onClick={() => {
                              window.open(wallet.link, '_blank')
                            }}>
                            <span>{wallet.name}</span>
                            <div className='flex items-center'>
                              <span className="badge badge-md badge-flat-primary mr-3">Not Installed</span>
                              <Image
                                src={wallet.image}
                                alt={wallet.name}
                                width={28}
                                height={28}
                              />
                            </div>

                          </li>
                        ))
                      }

                    </ul>
                  </section>
                </nav>
              )
            }


          </div>
        </div>
      </div>
    </div>

  )
}

const ButtonConnected = () => {
  const { disconnect, name, connected } = useWallet()
  const address = useAddressCus()




  return (
    <>
      <div className="popover popover-border">
        <label
          className="popover-trigger btn btn-sm sm:btn-md bg-transparent 
            border border-white rounded-none text-white sm:min-w-[150px] flex justify-between"
          tabIndex={0}>
          {
            address ? (
              `${address.slice(0, 5)}...${address.slice(-4)}`
            ) : (
              <svg
                className="spinner-ring [--spinner-color:var(--blue-12)] spinner-sm"
                viewBox="25 25 50 50"
                strokeWidth="5">
                <circle cx="50" cy="50" r="20" />
              </svg>
            )
          }
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </label>

        <div className="popover-content popover-bottom-left p-2 mt-2" tabIndex={0}>

          <div className='mx-auto p-2 rounded-full border border-white mb-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

          </div>
          <div className="divider my-0"></div>

          <div
            className="flex items-center px-3 py-1 rounded-lg ease-in-out hover:bg-gray-5 focus-visible:ring-opacity-50"
            onClick={() => {
              disconnect()
              sessionStorage.removeItem(concord)
            }}
          >
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-content1">Disconnect</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
