import axios from 'axios'


export const gamesKey = '/api/games'
export const leadersKey = '/api/leaders'
export const prizesKey = (add: string) => `/api/prizes?address=${add}`

export const fetcher = async <T>(url: string) => await axios.get<T>(url)

export async function fetcherAPI<T>(url: string) {
    return await axios.get<T>(url, {
        headers: {
            'X-Api-Key': 'ocnft_657233c1c8af0819283f9456'
        }
    });
}

export function formatNumberToK(number: number | undefined) {

    if (number) {

        if (number >= 1000) {
            // Calculate the 'k' version
            const kVersion = number / 1000;

            // Use toFixed(1) to round to 1 decimal place
            const roundedKVersion = kVersion.toFixed(1);

            // Check if the rounded version ends with '.0' and remove it if necessary
            const formattedK = roundedKVersion.replace(/\.0$/, '');

            // Append 'K' to the formatted version
            return formattedK + 'K';
        }

        // If the number is less than 1000, return it as is
        return number.toFixed(1).toString();

    }
    // Check if the number is greater than or equal to 1000
    return '0.0'
}

export function formatNumberToKM(number: number | undefined) {
    if (number) {
        if (number >= 1000000) {
            // Calculate the 'M' version
            const mVersion = number / 1000000;

            // Use toFixed(1) to round to 1 decimal place
            const roundedMVersion = mVersion.toFixed(1);

            // Check if the rounded version ends with '.0' and remove it if necessary
            const formattedM = roundedMVersion.replace(/\.0$/, '');

            // Append 'M' to the formatted version
            return formattedM + 'M';
        } else if (number >= 1000) {
            // Calculate the 'K' version
            const kVersion = number / 1000;

            // Use toFixed(1) to round to 1 decimal place
            const roundedKVersion = kVersion.toFixed(1);

            // Check if the rounded version ends with '.0' and remove it if necessary
            const formattedK = roundedKVersion.replace(/\.0$/, '');

            // Append 'K' to the formatted version
            return formattedK + 'K';
        }

        // If the number is less than 1000, return it as is
        return number.toFixed(1).toString();
    }

    // If the number is undefined or 0, return '0.0'
    return '0.0';
}
