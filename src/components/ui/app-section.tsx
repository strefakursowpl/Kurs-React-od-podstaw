import { ReactNode } from "react"

type TProps = {
    title: string,
    children: ReactNode
}

export default function AppSection({title, children}: TProps) {
    return (
        <main className="min-h-screen py-7">
            <title>{title}</title>
            <section className="container">
                {children}
            </section>
        </main>
    )
}
