import Copyright from "@/components/layout/copyright";
import MobileNavigation from "@/components/layout/mobile-navigation";
import Navigation from "@/components/layout/navigation";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function AppLayout() {

    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="bg-white md:bg-transparent lg:pt-[74px]">
            <header>
                <Navigation />
                <MobileNavigation />
            </header>
            <Outlet />
            <Copyright />
        </div>
    )
}
