type TProps = {
    onClick: () => void
}

export default function HamburgerButton({onClick}: TProps) {
    return (
        <button
            onClick={onClick}
            className="group fixed top-4 right-[.75rem] z-90 size-12 cursor-pointer space-y-[9px] rounded-md bg-white text-xl lg:hidden"
        >
            <span className="mx-auto block h-0.5 w-8 bg-linear-(--gradient)" />
            <span className="mx-auto block h-0.5 w-5 bg-linear-(--gradient) transition-all duration-300 group-hover:w-8 group-focus:w-8" />
            <span className="mx-auto block h-0.5 w-8 bg-linear-(--gradient)" />
        </button>
    )
}
