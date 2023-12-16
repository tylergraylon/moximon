import { useAddress, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { BrowserWallet } from '@meshsdk/core';


export default function useAddressCus() {

    const { name, connected } = useWallet()

    const address = useAddress()



    const [cusAddress, setCusAddress] = useState<undefined | string>(undefined)



    const getOtherAddress = async (name: string) => {
        const wallet = await BrowserWallet.enable(name)

        setCusAddress((await wallet.getUnusedAddresses())[0])

    }


    useEffect(() => {
        if (connected) {
            if (!address && connected) {
                getOtherAddress(name)
            } else {
                setCusAddress(address)
            }

        }
    }, [name, address])

    return cusAddress
}