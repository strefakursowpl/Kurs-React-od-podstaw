import useLocalStorage from "@/hooks/use-local-storage";
import { calcTransactionFlow } from "@/lib/transaction";
import { TCategoryName, TTransaction, TWallet } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import CardHeadline from "../ui/card-headline";
import { ChartColumnIncreasingIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import SelectMonth from "../ui/select-month";
import TransactionTrends from "../ui/transaction-trends";
import NoWalletInfo from "../ui/no-wallet-info";
import { prepareMonthData, prepareYearData } from "@/lib/summary";
import PieChart from "../charts/pie-chart";
import { monthChartConfig } from "@/data/charts-config-data";

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

    const yearTransactionsData = prepareYearData(incomeValue, expenseValue);

    const categoryIncome: Record<TCategoryName, number> = {
        employees: 0,
        tools: 0,
        marketingAndSales: 0,
        costs: 0,
        taxesAndInvestments: 0,
        other: 0
    }

    const categoryExpense = {...categoryIncome};

    const {categoryIncomeData, categoryExpenseData} = prepareMonthData(transactionsCurrentMonth, categoryIncome, categoryExpense);

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-4 lg:flex-row">
                <div className="mb-2 flex flex-col items-center gap-4 sm:gap-10 sm:flex-row">
                    <CardHeadline
                        title="Podsumowanie"
                        description="W tym miejscu przejrzysz statystyki swoich wydatków lub przychodów"
                        Icon={ChartColumnIncreasingIcon}
                    />
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
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {
                        expenseValue ? (
                            <Card className="border-b-primary border-b-[6px]">
                                <CardHeader className="flex flex-row items-center justify-center gap-2">
                                    <h3>Wydatki</h3>
                                    <TrendingDownIcon className="size-10 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <PieChart
                                        config={monthChartConfig}
                                        data={categoryExpenseData}
                                        dataKey="value"
                                        nameKey="category"
                                    />
                                </CardContent>
                            </Card>
                        ) : ''
                    }
                    {
                        incomeValue ? (
                            <Card className="border-b-primary border-b-[6px]">
                                <CardHeader className="flex flex-row items-center justify-center gap-2">
                                    <h3>Przychody</h3>
                                    <TrendingUpIcon className="size-10 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <PieChart
                                        config={monthChartConfig}
                                        data={categoryIncomeData}
                                        dataKey="value"
                                        nameKey="category"
                                    />
                                </CardContent>
                            </Card>
                        ) : ''
                    }
                </div>
            </CardContent>
        </Card>
    )
}
