import { ComponentProps, ReactNode } from "react"
import { Control, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {Root as SwitchRoot} from '@radix-ui/react-switch'
import { Switch } from "../ui/switch"

type TProps = {
    control: Control<any, FieldValues>,
    name: string,
    label?: string,
    description?: string,
    leftLabel?: ReactNode,
    rightLabel?: ReactNode,
} & ComponentProps<typeof SwitchRoot>

export default function SwitchField({control, name, label, description, leftLabel, rightLabel, ...props}: TProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="text-base mt-1 flex items-center gap-3">
                            <div className="cursor-pointer" onClick={() => field.onChange(false)}>
                                {leftLabel}
                            </div>
                        <Switch
                                {...field}
                                {...props}
                                onCheckedChange={field.onChange}
                                checked={field.value}
                            />
                            <div className="cursor-pointer" onClick={() => field.onChange(true)}>
                                {rightLabel}
                            </div>
                        </div>
                    </FormControl>
                    {
                        description && (
                            <FormDescription>{description}</FormDescription>
                        )
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
