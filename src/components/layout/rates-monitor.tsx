import { RateContext } from "@/context";
import { getExchangesRates } from "@/services/fca-service";
import { TApiRateLatest } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function RatesMonitor() {

    const randomCurrency = useContext(RateContext)!;

    const {
        data: rates,
        isFetching,
        error
    } = useQuery<TApiRateLatest>({
        queryFn: () => getExchangesRates(randomCurrency),
        queryKey: ['rates', randomCurrency],
        staleTime: 1000 * 60 * 60 * 24
    });

    if (isFetching) {
        return (
            <div className="text-primary top-2.5 right-0 text-xl lg:absolute">
                Loading...
            </div>
        );
    }

    if (error) {
        console.log(error);
        return;
    }

    return (
        <div className="top-2.5 right-0 text-xl lg:absolute">
            Kurs {randomCurrency}:{' '}
            <strong className="text-primary">
                {rates?.data?.PLN.toFixed(2) ?? ''} PLN
            </strong>
        </div>
    );
}
