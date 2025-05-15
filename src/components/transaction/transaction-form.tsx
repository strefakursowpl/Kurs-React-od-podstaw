import { CategoryContext } from "@/context";
import { subCategories } from "@/data/categories-data";
import { TSubCategoryName, TTransaction, TWallet } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { boolean, date, number, object, string, z } from "zod"
import { Form } from "../ui/form";

const transactionSchema = object({
    name: string().min(2).max(256),
    value: number().min(1).max(1_000_000),
    subCategory: z.enum(
        subCategories.map(subCategory => subCategory.name) as [
            TSubCategoryName,
            ...TSubCategoryName[]
        ]
    ),
    walletId: string().uuid(),
    date: date(),
    isIncome: boolean(),
});

export type TTransactionSchema = z.infer<typeof transactionSchema>;

type TProps = {
    wallets: TWallet[],
    onSubmit: (v: TTransactionSchema) => void,
    editedTransaction?: TTransaction,
    month: number,
    year: number
}

export default function TransactionForm({wallets, onSubmit, editedTransaction, month, year}: TProps) {

    const categoryContext = useContext(CategoryContext);

    const defaultSubCategory = categoryContext?.subCategory;

    const currentDate = new Date();

    const defaultDate = currentDate.getFullYear() === year && currentDate.getMonth() === month ? currentDate : new Date(year, month);

    const form = useForm<TTransactionSchema>({
        resolver: zodResolver(transactionSchema),
        mode: 'onTouched',
        defaultValues: {
            name: editedTransaction?.name ?? '',
            value: editedTransaction?.value,
            date: editedTransaction?.day ? new Date(editedTransaction.year, editedTransaction.month, editedTransaction.day) : defaultDate,
            isIncome: editedTransaction?.isIncome ?? false,
            subCategory: editedTransaction?.subCategory ?? defaultSubCategory,
            walletId: editedTransaction?.walletId
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
                
            </form>
        </Form>
    )
}
