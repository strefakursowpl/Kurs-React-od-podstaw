import months from "@/data/months-data";
import { TCategoryName, TTransaction } from "@/types";

export function prepareYearData(transactionsCurrentYear: TTransaction[]) {
    return months.map((month, i) => ({
        month,
        incomeValue: transactionsCurrentYear.reduce((acc, val) => {
            return val.month === i && val.isIncome ? acc + val.value : acc
        }, 0),
        expenseValue: transactionsCurrentYear.reduce((acc, val) => {
            return val.month === i && !val.isIncome ? acc + val.value : acc
        }, 0)
    }));
}

export function prepareMonthData(
    transactionsCurrentMonth: TTransaction[],
    categoryIncome: Record<TCategoryName, number>,
    categoryExpense: Record<TCategoryName, number>,
) {
    transactionsCurrentMonth.forEach(val => {
        if(val.isIncome) {
            categoryIncome[val.category] += val.value;
        } else {
            categoryExpense[val.category] += val.value;
        }
    });

    const categoryIncomeData = Object.entries(categoryIncome).map(([category, value], idx) => ({
        category,
        value,
        fill: `var(--chart-${idx + 1})`,
    }))

    const categoryExpenseData = Object.entries(categoryExpense).map(([category, value], idx) => ({
        category,
        value,
        fill: `var(--chart-${idx + 1})`,
    }))

    return {
        categoryIncomeData,
        categoryExpenseData
    }
}
