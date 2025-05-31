import Copyright from "@/components/layout/copyright";
import MobileNavigation from "@/components/layout/mobile-navigation";
import Navigation from "@/components/layout/navigation";
import { RateContext } from "@/context";
import { getRandomElement } from "@/lib/utils";
import { TCurrencies } from "@/types";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function AppLayout() {

    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const currencies = ['USD', 'EUR', 'GBP'];

    const randomCurrency = getRandomElement(currencies).toString();

    return (
        <div className="bg-white md:bg-transparent lg:pt-[74px]">
            <header>
                <RateContext value={randomCurrency as TCurrencies}>
                    <Navigation />
                    <MobileNavigation />
                </RateContext>
            </header>
            <Outlet />
            <Copyright />
        </div>
    )
}
