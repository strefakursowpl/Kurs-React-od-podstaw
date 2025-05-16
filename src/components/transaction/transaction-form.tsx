import { CategoryContext } from "@/context";
import { subCategories } from "@/data/categories-data";
import { TSubCategoryName, TTransaction, TWallet } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { boolean, date, number, object, string, z } from "zod"
import { Form } from "../ui/form";
import SwitchField from "../fields/switch-field";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import InputField from "../fields/input-field";
import SelectField from "../fields/select-field";
import DatePickerField from "../fields/date-picker-field";
import { Button } from "../ui/button";

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
                <SwitchField
                    control={form.control}
                    name="isIncome"
                    label="Wybierz typ transakcji (wydatek lub przychód)"
                    leftLabel={<TrendingDownIcon className="text-red-500" />}
                    rightLabel={<TrendingUpIcon className="text-green-500" />}
                />
                <InputField
                    control={form.control}
                    name="name"
                    label="Nazwa"
                    placeholder="np. zakup komputera"
                    type="text"
                />
                <InputField
                    control={form.control}
                    name="value"
                    label="Wpisz kwotę w zł"
                    placeholder="0,00"
                    type="number"
                />
                <SelectField
                    control={form.control}
                    name="subCategory"
                    label="Wybierz kategorię"
                    placeholder="Nie wybrano żadnej kategorii"
                    items={subCategories.map(subCategory => ({
                        value: subCategory.name,
                        label: subCategory.label
                    })).sort((a, b) => a.label.localeCompare(b.label))}
                />
                <SelectField
                    control={form.control}
                    name="walletId"
                    label="Wybierz portfel"
                    placeholder="Nie wybrano żadnego portfela"
                    disabled={!!editedTransaction}
                    items={wallets.map(wallet => ({
                        value: wallet.id,
                        label: wallet.name
                    })).sort((a, b) => a.label.localeCompare(b.label))}
                />
                <DatePickerField
                    control={form.control}
                    name="date"
                    label="Wybierz datę"
                />
                <Button variant="secondary" type="submit">
                    Zapisz
                </Button>
            </form>
        </Form>
    )
}
