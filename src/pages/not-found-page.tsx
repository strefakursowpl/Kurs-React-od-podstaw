import AppSection from "@/components/ui/app-section";

export default function NotFoundPage() {
    return (
        <AppSection title="404">
            <div className="mt-28 text-center text-7xl font-bold uppercase leading-24">
                <div>Nie</div>znaleziono strony
                <div className="pt-5">Błąd 404</div>
            </div>
        </AppSection>
    )
}
