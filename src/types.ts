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
