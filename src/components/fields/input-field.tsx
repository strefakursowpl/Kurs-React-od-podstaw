import { InputHTMLAttributes } from "react"
import { Control, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

type TProps = {
    control: Control<any, FieldValues>,
    name: string,
    label?: string,
    placeholder?: string,
    description?: string,
} & InputHTMLAttributes<HTMLInputElement>

export default function InputField({control, name, label, placeholder, description, ...props}: TProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            {...props}
                            value={props.type === 'number' ? String(field.value) : field.value}
                            onChange={e => field.onChange(props.type === 'number' ? Number(e.target.value) : e.target.value)}
                        />
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
