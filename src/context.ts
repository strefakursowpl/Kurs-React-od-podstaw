import { createContext } from "react";
import { TCategoryName, TCurrencies, TSubCategoryName } from "./types";

type TWalletContext = {
    remove: (id: string) => void,
    edit: (id: string) => void,
} | null

export const WalletContext = createContext<TWalletContext>(null);

type TTransactionContext = {
    remove: (id: string) => void,
    edit: (id: string) => void,
} | null

export const TransactionContext = createContext<TTransactionContext>(null);

export type TCategoryContext = {
    subCategory: TSubCategoryName|undefined,
    setSubCategory: (subCategory: TSubCategoryName|undefined) => void,
    category: TCategoryName|undefined,
    setCategory: (category: TCategoryName|undefined) => void,
} | null

export const CategoryContext = createContext<TCategoryContext>(null);

export const RateContext = createContext<TCurrencies|null>(null);
