import { Control, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type TProps = {
    control: Control<any, FieldValues>,
    name: string,
    label?: string,
    placeholder?: string,
    description?: string,
    items: {
        label: string,
        value: string
    }[],
    disabled?: boolean
}

export default function SelectField({control, name, label, placeholder, description, items, disabled = false}: TProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {items.map(item => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
