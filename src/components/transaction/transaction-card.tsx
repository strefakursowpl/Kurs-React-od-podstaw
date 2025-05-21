import { CategoryContext, TransactionContext } from "@/context"
import { useContext, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CardHeadline from "../ui/card-headline";
import { ArrowRightLeftIcon, PlusIcon } from "lucide-react";
import { subCategories } from "@/data/categories-data";
import TransactionTrends from "../ui/transaction-trends";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import TransactionForm from "./transaction-form";
import useTransactions from "@/hooks/use-transactions";
import NoWalletInfo from "../ui/no-wallet-info";
import TransactionList from "./transaction-list";
import SelectMonth from "../ui/select-month";
import { calcTransactionFlow, filterTransactions } from "@/lib/transaction";

export default function TransactionCard() {

    const categoryContext = useContext(CategoryContext);

    const [open, setOpen] = useState(false);

    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());

    const {
        actions,
        transactions,
        wallets,
        editedTransaction,
        setEditedTransaction
    } = useTransactions();

    const currentCategory = categoryContext?.subCategory
        ? subCategories.find(
            subCategory => subCategory.name === categoryContext.subCategory,
        )?.label
        : 'Wszystkie';

    const transactionsFiltered = filterTransactions(
        transactions,
        categoryContext?.subCategory,
        month,
        year
    );

    const incomeValue = calcTransactionFlow(transactionsFiltered, true);
    const expenseValue = calcTransactionFlow(transactionsFiltered, false);

    return (
        <TransactionContext value={{
            remove: actions.remove,
            edit: id => {
                actions.edit(id);
                setOpen(true);
            }
        }}>
            <Card className="border-b-secondary overflow-hidden border-b-[6px]">
                <Dialog open={open} onOpenChange={isOpen => {
                    setEditedTransaction(undefined);
                    setOpen(isOpen);
                }}>
                    <CardHeader className="grid items-center justify-between gap-4 xl:grid-cols-3">
                        <CardHeadline
                            title="Transakcje"
                            description="Tutaj wpisujesz wszystkie wydatki lub zarobki"
                            Icon={ArrowRightLeftIcon}
                        />
                        <TransactionTrends
                            transactionsIncome={incomeValue}
                            transactionExpense={expenseValue}
                        />
                        <div className="text-foreground border-secondary border-l-4 pl-2 text-xl font-medium">
                            Kategoria: {currentCategory}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <SelectMonth
                                className="flex-1"
                                onChange={date => {
                                    // ex. 1_2024 or 10_2025
                                    const [selectedMonth, selectedYear] = date.split('_');
                                    setMonth(Number(selectedMonth));
                                    setYear(Number(selectedYear));
                                }}
                                value={`${month}_${year}`}
                            />
                            <DialogTrigger asChild>
                                <Button>
                                    Dodaj <PlusIcon />
                                </Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent>
                            <DialogHeader>
                                <ScrollArea className="max-h-[calc(100vh-200px)]">
                                    <DialogTitle asChild>
                                        <h3>Dodaj nową transakcję</h3>
                                    </DialogTitle>
                                    <TransactionForm
                                        wallets={wallets}
                                        onSubmit={data => {
                                            actions.submit(data);
                                            setOpen(false);
                                        }}
                                        month={month}
                                        year={year}
                                        editedTransaction={editedTransaction}
                                    />
                                </ScrollArea>
                            </DialogHeader>
                        </DialogContent>
                    </CardContent>
                    <CardFooter>
                        {
                            wallets.length === 0 ? (
                                <NoWalletInfo />
                            ) : (
                                <TransactionList
                                    transactions={transactionsFiltered.reverse()}
                                />
                            )
                        }
                    </CardFooter>
                </Dialog>
            </Card>
        </TransactionContext>
    )
}
