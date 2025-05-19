import { TransactionContext } from "@/context";
import { TTransaction } from "@/types"
import { useContext } from "react"
import { TableCell, TableRow } from "../ui/table";
import { MoreHorizontalIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { subCategories } from "@/data/categories-data";

type TProps = {
    transaction: TTransaction
}

export default function TransactionItem({
    transaction: {
        id,
        isIncome,
        name,
        value,
        subCategory,
        day,
        month,
        year
    }
}: TProps) {

    const transactionContext = useContext(TransactionContext);

    return (
        <TableRow>
            <TableCell>
                {
                    isIncome ? (
                        <TrendingUpIcon className="text-green-500" />
                    ) : (
                        <TrendingDownIcon className="text-red-500" />
                    )
                }
            </TableCell>
            <TableCell>
                {new Date(year, month, day).toLocaleDateString()}
            </TableCell>
            <TableCell>
                {
                    subCategories.find(
                        v => v.name === subCategory
                    )?.label
                }
            </TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell className="text-right">
                <strong>
                    {isIncome ? (
                        <span className="text-green-500">{value} zł</span>
                    ) : (
                        <span className="text-red-500">-{value} zł</span>
                    )}
                </strong>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="size-8 p-0">
                            <span className="sr-only">Otwórz menu</span>
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            Akcje
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(id)}
                        >
                            Kopiuj ID transakcji
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => transactionContext?.edit(id)}>
                            Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => transactionContext?.remove(id)}>
                            Usuń
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}
