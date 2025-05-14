import TransactionCard from "@/components/transaction/transaction-card";
import TransactionSidebar from "@/components/transaction/transaction-sidebar";
import AppSection from "@/components/ui/app-section";
import { CategoryContext } from "@/context";
import { TCategoryName, TSubCategoryName } from "@/types";
import { useState } from "react";

export default function TransactionsPage() {

    const [subCategory, setSubCategory] = useState<TSubCategoryName>();
    const [category, setCategory] = useState<TCategoryName>();

    return (
        <AppSection title="Transakcje">
            <div className="grid lg:grid-cols-[22%_78%] gap-12">
                <CategoryContext
                    value={{
                        subCategory,
                        setSubCategory: val => setSubCategory(val),
                        category,
                        setCategory: val => setCategory(val)
                    }}
                >
                    <TransactionSidebar />
                    <TransactionCard />
                </CategoryContext>
            </div>
        </AppSection>
    )
}
