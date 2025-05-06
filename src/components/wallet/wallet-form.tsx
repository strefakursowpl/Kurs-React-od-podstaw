import { useForm } from "react-hook-form";
import {boolean, number, object, string, z} from 'zod'

import {zodResolver} from '@hookform/resolvers/zod'
import { Form } from "../ui/form";

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

    const form = useForm({
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
            <form onSubmit={form.handleSubmit(() => null)} className="space-y-5 mt-2">
                
            </form>
        </Form>
    )
}
