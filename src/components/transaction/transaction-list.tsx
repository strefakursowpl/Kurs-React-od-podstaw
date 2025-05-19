import { TTransaction } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import TransactionItem from "./transaction-item"

type TProps = {
    transactions: TTransaction[]
}

export default function TransactionList({transactions}: TProps) {
    return (
        <Table className="min-w-[630px]">
            <TableHeader>
                <TableRow>
                    <TableHead>Typ</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Kategoria</TableHead>
                    <TableHead>Nazwa</TableHead>
                    <TableHead className="text-right">Kwota</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    transactions.length > 0 ? transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    )) : <TableRow>
                        <TableCell colSpan={6} className="text-center font-medium text-xl">
                            Brak transakcji
                        </TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    )
}
