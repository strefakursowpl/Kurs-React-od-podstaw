import { cn, createDateRange } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { CalendarIcon } from "lucide-react";

type TProps = {
    onChange: (date: string) => void,
    value: string
    className?: string,
}

export default function SelectMonth({onChange, value, className}: TProps) {

    const monthItems = createDateRange(0, 2025, new Date().getMonth(), new Date().getFullYear(), false);

    return (
        <div className={cn('max-w-[300px] flex gap-3 items-center', className)}>
            <Select onValueChange={val => onChange(val)} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder="Wybierz miesiąc" />
                </SelectTrigger>
                <SelectContent>
                    {
                        monthItems.map(item => (
                            <SelectItem key={item.date} value={item.date}>
                                {item.monthLabel} {item.year}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <CalendarIcon />
        </div>
    )
}
