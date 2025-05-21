import { TSubCategoryName, TTransaction } from "@/types";

export function filterTransactions(
    transactions: TTransaction[],
    subCategory: TSubCategoryName|undefined,
    month: number,
    year: number
) {
    const transactionsFiltered = transactions.filter(val => {

        let isValid = false;

        if(val.year === year && val.month === month) {
            isValid = true;
            if(subCategory) {
                isValid = val.subCategory === subCategory;
            }
        }

        return isValid;
    });

    return transactionsFiltered;
}

export function calcTransactionFlow(transactions: TTransaction[], isIncome: boolean) {
    
    return transactions.reduce((acc, val) => {
        if(isIncome && val.isIncome) {
            return acc + val.value;
        } else if(!isIncome && !val.isIncome) {
            return acc + val.value;
        }
        return acc;
    }, 0);
}
