import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type TProps = {
    children: ReactNode,
    className?: string
}

export default function Section({children, className}: TProps) {
    return (
        <section className={cn('relative overflow-hidden py-14 lg:py-28', className)}>
            {children}
        </section>
    )
}
