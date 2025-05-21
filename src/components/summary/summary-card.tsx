import useLocalStorage from "@/hooks/use-local-storage";
import { calcTransactionFlow } from "@/lib/transaction";
import { TTransaction, TWallet } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import CardHeadline from "../ui/card-headline";
import { ChartColumnIncreasingIcon } from "lucide-react";
import SelectMonth from "../ui/select-month";
import TransactionTrends from "../ui/transaction-trends";
import NoWalletInfo from "../ui/no-wallet-info";

export default function SummaryCard() {

    const currentDate = new Date();

    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());
    
    const [transactions] = useLocalStorage<TTransaction[]>('transactions', []);
    const [wallets] = useLocalStorage<TWallet[]>('wallets', []);

    const transactionsCurrentYear = transactions.filter(
        val => val.year === year
    );

    const transactionsCurrentMonth = transactionsCurrentYear.filter(
        val => val.month === month
    );

    const incomeValue = calcTransactionFlow(transactionsCurrentMonth, true);
    const expenseValue = calcTransactionFlow(transactionsCurrentMonth, false);

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-4 lg:flex-row">
                <CardHeadline
                    title="Podsumowanie"
                    description="W tym miejscu przejrzysz statystyki swoich wydatków lub przychodów"
                    Icon={ChartColumnIncreasingIcon}
                />
                <div className="mb-2 flex flex-col items-center gap-4 sm:gap-10 sm:flex-row">
                    <SelectMonth
                        className="flex-1"
                        onChange={date => {
                            // ex. 1_2024 or 10_2025
                            const [selectedMonth, selectedYear] = date.split('_');
                            setMonth(Number(selectedMonth));
                            setYear(Number(selectedYear));
                        }}
                        value={`${month}_${year}`}
                    />
                    <TransactionTrends
                        transactionsIncome={incomeValue}
                        transactionsExpense={expenseValue}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {
                    wallets.length === 0 && <NoWalletInfo />
                }
            </CardContent>
        </Card>
    )
}
