import { Link } from "react-router";
import { Button } from "./button";

export default function NoWalletInfo() {
    return (
        <div className="border-primary border-b-2 pb-2 flex flex-wrap gap-3 items-center">
            <h3>
                Zauważyliśmy, że nie posiadasz jeszcze portfela, utwórz go w
                pierwszej kolejności, abyś mógł zacząć zapisywać swoje transakcje
            </h3>
            <Button asChild>
                <Link to="/portfele">Utwórz portfel</Link>
            </Button>
        </div>
    )
}
