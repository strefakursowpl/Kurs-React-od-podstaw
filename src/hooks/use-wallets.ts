import { useState } from "react";
import useLocalStorage from "./use-local-storage";
import { TTransaction, TWallet } from "@/types";
import { TWalletSchema } from "@/components/wallet/wallet-form";

export default function useWallets() {
    const [wallets, setWallets] = useLocalStorage<TWallet[]>('wallets', []);
    const [transactions, setTransactions] = useLocalStorage<TTransaction[]>('transactions', []);

    const [editedWallet, setEditedWallet] = useState<TWallet | undefined>();

    function submit(data: TWalletSchema) {

        let newWallets;

        if(editedWallet) {
            newWallets = wallets.map(val => {
                if(val.id === editedWallet.id) {
                    return {
                        id: editedWallet.id,
                        name: data.name,
                        value: data.value,
                        isAccount: data.isAccount,
                    }
                }
                return val;
            });
        } else {
            newWallets = [
                ...wallets,
                {
                    id: crypto.randomUUID(),
                    name: data.name,
                    value: data.value,
                    isAccount: data.isAccount,
                }
            ];
        }

        setWallets(newWallets);
        setEditedWallet(undefined);
    }

    function edit(id: string) {
        setEditedWallet(
            wallets.find(val => val.id === id)
        );
    }

    function remove(id: string) {
        setWallets(
            wallets.filter(val => val.id !== id)
        );

        const newTransactions = transactions.filter(val => val.walletId !== id);
        setTransactions(newTransactions);
    }

    return {
        wallets,
        setWallets,
        editedWallet,
        setEditedWallet,
        actions: {
            submit,
            edit,
            remove
        }
    }
}
