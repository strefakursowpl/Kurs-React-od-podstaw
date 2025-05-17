import { TTransaction, TWallet } from "@/types";
import useLocalStorage from "./use-local-storage";
import { useState } from "react";
import { TTransactionSchema } from "@/components/transaction/transaction-form";
import { float } from "@/lib/utils";
import { categories } from "@/data/categories-data";

export default function useTransactions() {
    
    const [wallets, setWallets] = useLocalStorage<TWallet[]>('wallets', []);
    const [transactions, setTransactions] = useLocalStorage<TTransaction[]>('transactions', []);

    const [editedTransaction, setEditedTransaction] = useState<TTransaction|undefined>();
    
    function compareWalletValues(
        prevIsIncome: boolean,
        prevValue: number,
        newIsIncome: boolean,
        newValue: number
    ) {
        const prevWalletValue = prevIsIncome ? prevValue : prevValue * -1;
        const newWalletValue = newIsIncome ? newValue : newValue * -1;

        return float((prevWalletValue - newWalletValue) * -1);
    }

    function updateWallets(id: string, calculatedWalletValue: number, isAddition: boolean) {

        const updatedWallets = wallets.map(wallet => {
            if(wallet.id === id) {
                return {
                    ...wallet,
                    value: isAddition ? float(wallet.value + calculatedWalletValue) : float(wallet.value - calculatedWalletValue)
                }
            }
            return wallet;
        });

        setWallets(updatedWallets);
    }

    function remove(id: string) {
        const removedTransaction = transactions.find(val => val.id === id);

        if(!removedTransaction) {
            return;
        }

        const newTransactions = transactions.filter(val => val.id !== id);
        setTransactions(newTransactions);

        const calculatedWalletValue = removedTransaction.isIncome
            ? removedTransaction.value
            : removedTransaction.value * -1;

        updateWallets(removedTransaction.walletId, calculatedWalletValue, false);
    }

    function edit(id: string) {
        setEditedTransaction(
            transactions.find(val => val.id === id)
        );
    }

    function submit({
        subCategory,
        date,
        isIncome,
        name,
        value,
        walletId
    }: TTransactionSchema) {
        let newTransactions: TTransaction[];

        let calculatedWalletValue = 0;

        const category = categories.find(v => {
            const index = v.subCategories.findIndex(
                v => v.name === subCategory
            );
            if(index !== -1) {
                return v;
            }
        })?.categoryName ?? 'other';

        if(editedTransaction) {
            calculatedWalletValue = compareWalletValues(
                editedTransaction.isIncome,
                editedTransaction.value,
                isIncome,
                value
            );

            newTransactions = transactions.map(val => {
                if(val.id === editedTransaction.id) {
                    return {
                        id: editedTransaction.id,
                        category,
                        subCategory,
                        isIncome,
                        name,
                        value,
                        walletId: editedTransaction.walletId,
                        year: date.getFullYear(),
                        month: date.getMonth(),
                        day: date.getDate(),
                    };
                }
                return val;
            });
        } else {
            newTransactions = [
                ...transactions,
                {
                    id: crypto.randomUUID(),
                    category,
                    subCategory,
                    isIncome,
                    name,
                    value,
                    walletId,
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate(),
                }
            ];
            calculatedWalletValue = isIncome ? value : -value;
        }

        updateWallets(walletId, calculatedWalletValue, true);

        setEditedTransaction(undefined);
        setTransactions(newTransactions);
    }

    return {
        wallets,
        setWallets,
        transactions,
        setTransactions,
        editedTransaction,
        setEditedTransaction,
        compareWalletValues,
        actions: {
            remove,
            edit,
            submit
        }
    }
}
