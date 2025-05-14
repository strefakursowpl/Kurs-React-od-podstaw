import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PlusIcon, WalletIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import WalletForm from "./wallet-form";
import { WalletContext } from "@/context";
import WalletList from "./wallet-list";
import useWallets from "@/hooks/use-wallets";
import CardHeadline from "../ui/card-headline";

export default function WalletCard() {

    const [open, setOpen] = useState(false);

    const { wallets, editedWallet, setEditedWallet, actions } = useWallets();

    return (
        <WalletContext value={{ remove: actions.remove, edit: id => {
            actions.edit(id);
            setOpen(true);
        } }}>
            <Card className="border-b-secondary overflow-hidden border-b-[6px]">
                <Dialog open={open} onOpenChange={isOpen => {
                    setEditedWallet(undefined);
                    return setOpen(isOpen);
                }}>
                    <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
                        <CardHeadline
                            title="Portfele"
                            description="Tutaj dodasz konto lub portfel"
                            Icon={WalletIcon}
                        />
                        <DialogTrigger asChild>
                            <Button>
                                Dodaj <PlusIcon />
                            </Button>
                        </DialogTrigger>
                    </CardHeader>
                    <CardContent>
                        <DialogContent>
                            <DialogHeader>
                                <ScrollArea className="max-w-[calc(100vh-200px)]">
                                    <DialogTitle asChild>
                                        <h3>Dodaj nowy portfel lub konto</h3>
                                    </DialogTitle>
                                    <WalletForm onSubmit={data => {
                                        actions.submit(data);
                                        setOpen(false);
                                    }} editedWallet={editedWallet} />
                                </ScrollArea>
                            </DialogHeader>
                        </DialogContent>
                        <WalletList wallets={wallets} />
                    </CardContent>
                </Dialog>
            </Card>
        </WalletContext>
    )
}
