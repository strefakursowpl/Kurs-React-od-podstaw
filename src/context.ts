import { createContext } from "react";
import { TCategoryName, TSubCategoryName } from "./types";

type TWalletContext = {
    remove: (id: string) => void,
    edit: (id: string) => void,
} | null

export const WalletContext = createContext<TWalletContext>(null);

export type TCategoryContext = {
    subCategory: TSubCategoryName|undefined,
    setSubCategory: (subCategory: TSubCategoryName|undefined) => void,
    category: TCategoryName|undefined,
    setCategory: (category: TCategoryName|undefined) => void,
} | null

export const CategoryContext = createContext<TCategoryContext>(null);
