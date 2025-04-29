import { menu } from "@/data/menu-data";
import Logo from "./logo";
import MenuLink from "../ui/menu-link";

export default function Navigation() {

    return (
        <div className="fixed top-0 left-0 z-30 w-full lg:py-3 lg:bg-white lg:shadow-md">
            <div className="relative container">
                <div className="hidden gap-3 lg:flex">
                    <Logo className="mr-10" />
                    {
                        menu.map(item => (
                            <MenuLink key={item.id} to={item.to} end>
                                {item.name}
                            </MenuLink>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
