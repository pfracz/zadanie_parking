import axios from "axios";
import Currency from "../models/currency";

const currencyExchange = async (amount: number, date: string, currency: Currency): Promise<number> => {
    let exchangedAmount: number = 0;

    return axios
        .get(
            `http://api.exchangeratesapi.io/v1/${date}?access_key=${process.env.EXCHANGE_RATES_API_KEY}&symbols=USD,PLN,EUR&format=1`
        )
        .then((result) => {
            if (result.data.success) {
                // Switch from USD to EUR
                let EUR = 1 / result.data.rates.USD; // reversed EUR rate (USD > EUR)
                exchangedAmount = amount * EUR; // result in EUR

                if (currency === Currency.PLN) {
                    exchangedAmount *= result.data.rates.PLN; // switch from EUR to PLN
                }
            }

            return exchangedAmount;
        })
        .catch((e) => {
            console.error(e);
            return amount;
        });
};

export default currencyExchange;
