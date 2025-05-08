import { useForm } from "react-hook-form";
import {boolean, number, object, string, z} from 'zod'

import {zodResolver} from '@hookform/resolvers/zod'
import { Form } from "../ui/form";
import SwitchField from "../fields/switch-field";
import InputField from "../fields/input-field";
import { Button } from "../ui/button";

const walletSchema = object({
    name: string().min(2).max(256),
    value: number().min(0).max(1_000_000),
    isAccount: boolean()
});

export type TWalletSchema = z.infer<typeof walletSchema>

type TProps = {
    props: string
}

export default function WalletForm({props}: TProps) {

    const form = useForm<TWalletSchema>({
        resolver: zodResolver(walletSchema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            value: 0,
            isAccount: false
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-5 mt-2">
                <SwitchField
                    control={form.control}
                    name="isAccount"
                    label="Wybierz typ źródła"
                    leftLabel="Portfel"
                    rightLabel="Konto"
                />
                <InputField
                    control={form.control}
                    name="name"
                    label="Wpisz nazwę portfela"
                    placeholder="Mój portfel"
                    type="text"
                />
                <InputField
                    control={form.control}
                    name="value"
                    label="Wpisz kwotę w zł"
                    placeholder="0,00"
                    type="number"
                />
                <Button variant="secondary" type="submit">
                    Zapisz
                </Button>
            </form>
        </Form>
    )
}
