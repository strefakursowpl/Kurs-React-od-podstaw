import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { NavLink } from "react-router"

type TProps = {
    to: string,
    children: ReactNode,
    end: boolean,
    className?: string,
    onClick?: () => void,
}

export default function MenuLink({to, children, end, className, onClick}: TProps) {
    return (
        <NavLink to={to} className={({isActive}) => cn(
            'relative p-3 hover:text-secondary after:left-0 after:absolute after:z-10 after:top-10 after:h-px after:w-0 after:bg-linear-(--gradient) after:duration-400 hover:after:w-full',
            isActive ? 'text-secondary' : '',
            className
        )}
        onClick={onClick}
        end={end}
        >
            {children}
        </NavLink>
    )
}
