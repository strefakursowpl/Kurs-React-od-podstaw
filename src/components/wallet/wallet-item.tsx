import { TWallet } from "@/types"
import { TableCell, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import { useContext } from "react"
import { WalletContext } from "@/context"

type TProps = {
    wallet: TWallet
}

export default function WalletItem({wallet: {id, isAccount, name, value}}: TProps) {

    const walletContext = useContext(WalletContext);

    return (
        <TableRow>
            <TableCell className="w-[40%]">{id}</TableCell>
            <TableCell className="font-medium w-[40%]">{name}</TableCell>
            <TableCell className="w-[10%]">{isAccount ? 'Konto' : 'Portfel'}</TableCell>
            <TableCell className="text-right w-[10%]">{value} zł</TableCell>
            <TableCell className="text-right">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
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
                            Kopiuj ID portfela
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => walletContext?.edit(id)}>
                            Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => walletContext?.remove(id)}>
                            Usuń
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}
