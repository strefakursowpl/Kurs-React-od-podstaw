import { Control, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"

type TProps = {
    control: Control<any, FieldValues>,
    name: string,
    label?: string,
    description?: string,
}

export default function DatePickerField({control, name, label, description}: TProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover modal={true}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    className="w-[240px] pl-3 text-left font-normal justify-between"
                                >
                                    {
                                        field.value ? (
                                            field.value.toLocaleDateString()
                                        ) : (
                                            <span>Wybierz datę</span>
                                        )
                                    }
                                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="h-[374px]"
                                disabled={
                                    date =>
                                        date > new Date() ||
                                        date < new Date('1900-01-01')
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
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
