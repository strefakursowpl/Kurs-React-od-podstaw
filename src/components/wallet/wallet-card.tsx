import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PlusIcon, WalletIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export default function WalletCard() {

    const [open, setOpen] = useState(false);

    return (
        <Card className="border-b-secondary overflow-hidden border-b-[6px]">
            <Dialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
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
                                Tutaj będzie formularz...
                            </ScrollArea>
                        </DialogHeader>
                    </DialogContent>
                    Tutaj będzie lista portfeli...
                </CardContent>
            </Dialog>
        </Card>
    )
}
