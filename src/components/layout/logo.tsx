import { Link } from "react-router"

type TProps = {
    className?: string,
    onClick?: () => void
}

export default function Logo({className, onClick}: TProps) {
    return (
        <Link to="/" onClick={onClick}>
            <img src="/logo.svg" className={className} width={245} height={50} />
        </Link>
    )
}
