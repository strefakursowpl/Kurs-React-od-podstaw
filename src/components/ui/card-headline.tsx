import { LucideIcon } from "lucide-react"
import { CardDescription } from "./card"

type TProps = {
    title: string,
    description: string,
    Icon: LucideIcon,
}

export default function CardHeadline({title, description, Icon}: TProps) {
    return (
        <div>
            <h1 className="flex items-center gap-3">
                <Icon /> {title}
            </h1>
            <CardDescription>
                {description}
            </CardDescription>
        </div>
    )
}
