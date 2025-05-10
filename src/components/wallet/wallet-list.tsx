import { TWallet } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import WalletItem from "./wallet-item"

type TProps = {
    wallets: TWallet[]
}

export default function WalletList({wallets}: TProps) {
    return (
        <Table className="min-w-[630px]">
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead className="text-right">Kwota</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    wallets.length > 0 ? (
                        wallets.map(
                            wallet => <WalletItem key={wallet.id} wallet={wallet} />
                        )
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-xl font-medium">
                                Brak portfeli, dodaj nowy aby zacząć korzystać z aplikacji
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}
