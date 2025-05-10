import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PlusIcon, WalletIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import WalletForm, { TWalletSchema } from "./wallet-form";
import { TWallet } from "@/types";
import { WalletContext } from "@/context";
import WalletList from "./wallet-list";

export default function WalletCard() {

    const [open, setOpen] = useState(false);

    const [wallets, setWallets] = useState<TWallet[]>([]);

    const [editedWallet, setEditedWallet] = useState<TWallet | undefined>();

    function submit(data: TWalletSchema) {

        let newWallets;

        if(editedWallet) {
            newWallets = wallets.map(val => {
                if(val.id === editedWallet.id) {
                    return {
                        id: editedWallet.id,
                        name: data.name,
                        value: data.value,
                        isAccount: data.isAccount,
                    }
                }
                return val;
            });
        } else {
            newWallets = [
                ...wallets,
                {
                    id: crypto.randomUUID(),
                    name: data.name,
                    value: data.value,
                    isAccount: data.isAccount,
                }
            ];
        }

        setWallets(newWallets);
        setEditedWallet(undefined);
        setOpen(false);
    }

    function edit(id: string) {
        setEditedWallet(
            wallets.find(val => val.id === id)
        );
        setOpen(true);
    }

    function remove(id: string) {
        setWallets(
            wallets.filter(val => val.id !== id)
        );
    }

    return (
        <WalletContext value={{remove, edit}}>
            <Card className="border-b-secondary overflow-hidden border-b-[6px]">
                <Dialog open={open} onOpenChange={isOpen => {
                    setEditedWallet(undefined);
                    return setOpen(isOpen);
                }}>
                    <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="flex items-center gap-3">
                                <WalletIcon /> Portfele
                            </h1>
                            <CardDescription>
                                Tutaj dodasz konto lub portfel
                            </CardDescription>
                        </div>
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
                                    <WalletForm onSubmit={submit} editedWallet={editedWallet} />
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
