import { categories } from "./data/categories-data"

export type TWallet = {
    id: string,
    name: string,
    value: number,
    isAccount: boolean
}

export type TCategories = typeof categories;

export type TCategoryName = TCategories[number]['categoryName'];
export type TSubCategoryName = TCategories[number]['subCategories'][number]['name'];

export type TTransaction = {
    id: string,
    name: string,
    value: number,
    category: TCategoryName,
    subCategory: TSubCategoryName,
    walletId: string,
    day: number,
    month: number,
    year: number,
    isIncome: boolean
}
