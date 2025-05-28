const API_URL = 'https://api.freecurrencyapi.com';

const endpoints = {
    getExchangeRates: '/v1/latest'
} as const;

type TEndpoints = keyof typeof endpoints;

const apiUrl = (value: TEndpoints, params: Record<string, string> = {}) => {

    const stringParams = new URLSearchParams({
        ...params,
        apikey: import.meta.env.VITE_FCA_KEY
    }).toString();

    return `${API_URL}${endpoints[value]}?${stringParams}`;
}

// https://freecurrencyapi.com/docs/latest#request-parameters
export const getExchangesRates = async (currency: string) => {

    const params = {
        base_currency: currency,
        currencies: 'PLN'
    }
    const response = await fetch(
        apiUrl('getExchangeRates', params)
    );

    const data = await response.json();

    if('message' in data) {
        throw new Error(data.message);
    }
    return data;
}
