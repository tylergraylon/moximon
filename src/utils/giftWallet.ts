import { BlockfrostProvider, AppWallet, Network } from '@meshsdk/core';
import { blockFrostApiKey } from './services';
import { oneLoveLace } from './services';

export const blockchainProvider = new BlockfrostProvider(blockFrostApiKey);

export enum WHEELZ {
    ten = 'ten',
    fifty = 'fifty',
    hundred = 'hundred',
    fivehundred = 'fivehundred',
    onethousand = 'onethousand',
    onethousandfive = 'onethousandfive',
}


export const prizes = {
    [WHEELZ.ten]: [
        {
            name: '1X ADA',
            amount: `${5 * oneLoveLace}`
        },
        {
            name: '2X ADA',
            amount: `${10 * oneLoveLace}`
        },
        {
            name: '15 ADA',
            amount: `${15 * oneLoveLace}`
        },
        {
            name: '10X ADA',
            amount: `${50 * oneLoveLace}`
        },
        {
            name: '200 ADA',
            amount: `${200 * oneLoveLace}`
        },
        {
            name: '3X ADA',
            amount: `${15 * oneLoveLace}`
        },
        {
            name: '5000 $XMAX',
            amount: `${5000}`
        },
        {
            name: '100 ADA',
            amount: `${100 * oneLoveLace}`
        },
    ],
    [WHEELZ.fifty]: [
        {
            name: '30 ADA',
            amount: `${30 * oneLoveLace}`
        },
        {
            name: '400 ADA',
            amount: `${400 * oneLoveLace}`
        },
        {
            name: '200 ADA',
            amount: `${200 * oneLoveLace}`
        },
        {
            name: '10000 $XMAX',
            amount: `${10000}`
        },
        {
            name: '5X ADA',
            amount: `${(25 * oneLoveLace) * 5}`
        },
        {
            name: '2X ADA',
            amount: `${(25 * oneLoveLace) * 5}`
        },
        {
            name: '3X ADA',
            amount: `${(25 * oneLoveLace) * 3}`
        },
        {
            name: '15X ADA',
            amount: `${(25 * oneLoveLace) * 15}`
        },
        {
            name: '1X ADA',
            amount: `${(25 * oneLoveLace)}`
        },
    ],
    [WHEELZ.hundred]: [
        {
            name: '800 ADA',
            amount: `${400 * oneLoveLace}`
        },
        {
            name: '10X ADA',
            amount: `${(50 * oneLoveLace) * 10}`
        },
        {
            name: '3X ADA',
            amount: `${(50 * oneLoveLace) * 3}`
        },
        {
            name: '1X ADA',
            amount: `${(50 * oneLoveLace)}`
        },
        {
            name: '2X ADA',
            amount: `${(50 * oneLoveLace) * 3}`
        },
        {
            name: '20000 $XMAX',
            amount: `${20000}`
        },
        {
            name: '400 ADA',
            amount: `${400 * oneLoveLace}`
        },
        {
            name: '200 ADA',
            amount: `${200 * oneLoveLace}`
        },
    ],
    [WHEELZ.fivehundred]: [
        {
            name: '500 ADA',
            amount: `${500 * oneLoveLace}`
        },
        {
            name: '50 ADA',
            amount: `${500 * oneLoveLace}`
        },
        {
            name: '10X $XMAX',
            amount: `${500 * 10}`
        },
        {
            name: '300 ADA',
            amount: `${300 * oneLoveLace}`
        },
        {
            name: '1X $XMAX',
            amount: `${500 * 1}`
        },
        {
            name: '300 $XMAX',
            amount: `${300}`
        },
    ],
    [WHEELZ.onethousand]: [
        {
            name: '15X $XMAX',
            amount: `${1000 * 15}`
        },
        {
            name: '500 ADA',
            amount: `${500 * oneLoveLace}`
        },
        {
            name: '800 ADA',
            amount: `${800 * oneLoveLace}`
        },
        {
            name: '1X $XMAX',
            amount: `${1000 * 1}`
        },
        {
            name: '15000 $XMAX',
            amount: `${15000}`
        },
        {
            name: '100 ADA',
            amount: `${100 * oneLoveLace}`
        },
    ],
    [WHEELZ.onethousandfive]: [
        {
            name: '20000 $XMAX',
            amount: `${20000}`
        },
        {
            name: '700 ADA',
            amount: `${700 * oneLoveLace}`
        },
        {
            name: '1000 ADA',
            amount: `${1000 * oneLoveLace}`
        },
        {
            name: '200 ADA',
            amount: `${200 * oneLoveLace}`
        },
        {
            name: '20X $XMAX',
            amount: `${20 * 1500}`
        },
        {
            name: '1X $XMAX',
            amount: `${1 * 1500}`
        },
    ]
}

