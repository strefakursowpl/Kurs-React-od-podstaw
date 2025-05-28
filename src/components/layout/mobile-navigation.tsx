import { useRef, useState } from 'react';
import { menu } from '@/data/menu-data';
import { createPortal } from 'react-dom';

import MenuLink from '../ui/menu-link';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import useClickOutside from "@/hooks/use-click-outside";
import RatesMonitor from "./rates-monitor";

export default function MobileNavigation() {
	const [open, setOpen] = useState(false);

	const mobileMenuRef = useRef(null);
	const menuAreaRef = useRef(null);

    useClickOutside(menuAreaRef, () => setOpen(false));

	return (
		<>
			<HamburgerButton onClick={() => setOpen(true)} />
			{createPortal(
				<div
					ref={mobileMenuRef}
					data-open={open}
					className="bg-gray-transparent invisible fixed top-0 z-100 h-full w-full opacity-0 transition-all duration-700 data-[open=true]:visible data-[open=true]:opacity-100">
					<div
						ref={menuAreaRef}
						data-open={open}
						className="border-primary relative left-[-110%] h-full w-full max-w-[250px] border-r-[3px] bg-white transition-all duration-700 data-[open=true]:left-0">
						<div className="bg-white p-5">
							<Logo
								className="mx-auto"
								onClick={() => setOpen(false)}
							/>
						</div>
						<nav className="flex flex-col items-start divide-solid">
							{menu.map(item => (
								<MenuLink
									key={item.id}
									className="w-full border-b pl-10 hover:after:content-none"
									to={item.to}
									onClick={() => setOpen(false)}
									end>
									{item.name}
								</MenuLink>
							))}
						</nav>
						<div className="p-5 pt-16">
							<RatesMonitor />
						</div>
					</div>
				</div>,
				document.body,
			)}
		</>
	);
}
