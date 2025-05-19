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

export default function TransactionCard() {

    const categoryContext = useContext(CategoryContext);

    const [open, setOpen] = useState(false);

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
                            transactionsIncome={0}
                            transactionExpense={0}
                        />
                        <div className="text-foreground border-secondary border-l-4 pl-2 text-xl font-medium">
                            Kategoria: {currentCategory}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center justify-between gap-4">
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
                                        month={5}
                                        year={2025}
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
                                    transactions={transactions}
                                />
                            )
                        }
                    </CardFooter>
                </Dialog>
            </Card>
        </TransactionContext>
    )
}
