import { createContext } from "react";

type TWalletContext = {
    remove: (id: string) => void,
    edit: (id: string) => void,
} | null

export const WalletContext = createContext<TWalletContext>(null);
