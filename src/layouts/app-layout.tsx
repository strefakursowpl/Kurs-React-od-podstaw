import Copyright from "@/components/layout/copyright";
import { Outlet } from "react-router";

export default function AppLayout() {
    return (
        <div className="bg-white md:bg-transparent lg:pt-[74px]">
            <header></header>
            <Outlet />
            <Copyright />
        </div>
    )
}
