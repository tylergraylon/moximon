import { BlockFrostAPI, BlockfrostServerError } from '@blockfrost/blockfrost-js';
import type { NextApiRequest, NextApiResponse } from 'next'

import { composeTransaction } from '../../sender/composeTransaction';
import { signTransaction } from '../../sender/signTransaction';
import { deriveAddressPrvKey, mnemonicToPrivateKey } from '../../sender/keys';
import { UTXO } from '../../sender/types';
import { db } from '@/utils/db';


type Data = {
    message?: string;
    data?: {}[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {

        if (req.method === 'PATCH') {
            const { time } = req.body

            if (time === 'rycad') {
                // await payment({
                //     output_address: 'addr1q94rmhjkld62z8qckefyfzmv2en6ty5ckdz8tjtwqw2xus60aqyvmad3e6e6xevgjp4e7g8rewxunx65fwnpalevcmjq226pgx',
                //     amount: '10000000',
                //     words: 'apology muscle ivory dune rifle all slide tooth wheat garage joy neglect egg claim access',
                //     name: '1X ADA',
                //     outcome: 'WIN'
                // })

                await db.unpaid.create({
                    data: {
                        address: "addr1q94rmhjkld62z8qckefyfzmv2en6ty5ckdz8tjtwqw2xus60aqyvmad3e6e6xevgjp4e7g8rewxunx65fwnpalevcmjq226pgx",
                        outcome: "WIN",
                        name: "1X ADA"
                    }
                })
            }

            return res.status(200).json({ message: 'money sent' })
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' })
    }

}



export async function payment({ output_address, amount, words, name, outcome }: { output_address: string, amount: string, words: string, name: string, outcome: string }) {

    const MNEMONIC = words;

    // Recipient address (needs to be Bech32)
    const OUTPUT_ADDRESS = output_address

    // Amount sent to the recipient
    const OUTPUT_AMOUNT = amount; // 1 000 000 lovelaces = 1 ADA

    if (!process.env.BLOCKFROST_PROJECT_ID) {
        throw Error('Set env variable BLOCKFROST_PROJECT_ID');
    }

    const client = new BlockFrostAPI({
        projectId: process.env.BLOCKFROST_PROJECT_ID,
    });

    const run = async () => {
        // Derive an address (this is the address where you need to send ADA in order to have UTXO to actually make the transaction)
        const bip32PrvKey = mnemonicToPrivateKey(MNEMONIC);
        const testnetPreview = true;
        const { signKey, address } = deriveAddressPrvKey(bip32PrvKey, false);
        console.log(`Using address ${address}`);

        // Retrieve protocol parameters
        const protocolParams = await client.epochsLatestParameters();

        // Retrieve utxo for the address
        let utxo: UTXO = [];
        try {
            utxo = await client.addressesUtxosAll(address);
        } catch (error) {
            if (error instanceof BlockfrostServerError && error.status_code === 404) {
                // Address derived from the seed was not used yet
                // In this case Blockfrost API will return 404
                utxo = [];
            } else {
                throw error;
            }
        }

        if (utxo.length === 0) {
            console.log();
            console.log(`You should send ADA to ${address} to have enough funds to send a transaction`);
            console.log();
        }

        console.log(`UTXO on ${address}:`);
        console.log(JSON.stringify(utxo[0], undefined, 4));

        // Get current blockchain slot from latest block
        const latestBlock = await client.blocksLatest();
        const currentSlot = latestBlock.slot;
        if (!currentSlot) {
            throw Error('Failed to fetch slot number');
        }

        // Prepare transaction
        const { txBody } = composeTransaction(address, OUTPUT_ADDRESS, OUTPUT_AMOUNT, utxo, {
            protocolParams,
            currentSlot,
        });

        // Sign transaction
        const transaction = signTransaction(txBody, signKey);

        // Push transaction to network
        try {
            // txSubmit endpoint returns transaction hash on successful submit
            const txHash = await client.txSubmit(transaction.to_bytes());

            console.log(`Transaction successfully submitted: ${txHash}\n`);

            // Before the tx is included in a block it is a waiting room known as mempool
            // Retrieve transaction from Blockfrost Mempool
            const mempoolTx = await client.mempoolTx(txHash);
            console.log('Mempool Tx:');
            console.log(JSON.stringify(mempoolTx, undefined, 4));

        } catch (error) {
            // submit could fail if the transactions is rejected by cardano node
            if (error instanceof BlockfrostServerError && error.status_code === 400) {
                console.log(`Transaction rejected`);
                // Reason for the rejection is in error.message
                await db.unpaid.create({
                    data: {
                        address: OUTPUT_ADDRESS,
                        outcome,
                        name
                    }
                })

                console.log(error);
                throw new Error(`${error}`)
            } else {
                // rethrow other errors
                console.log('NOT FPUND IN MEMPOOL OOO', `${error}`);

                throw error;
            }
        }
    };

    run();

}


// This example is written in Typescript.
// In order to run it on Node.js your need to compile the code first.
// Follow instructions in README


// BIP39 mnemonic (seed) from which we will generate address to retrieve utxo from and private key used for signing the transaction
