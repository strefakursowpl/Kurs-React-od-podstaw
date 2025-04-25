import { useEffect } from 'react';
// @ts-expect-error - missing type declarations
import WOW from 'wow.js';

import Features from '@/components/homepage/features';
import Intro from '@/components/homepage/intro';

import 'wow.js/css/libs/animate.css';
import Hero from "@/components/homepage/hero.js";
import Testimonials from "@/components/homepage/testimonials.js";

export default function HomePage() {
	useEffect(() => {
		const wow = new WOW({
			live: false,
		});
		wow.init();

		// @ts-expect-error - missing type declarations
		import('../../public/js/tilt.min.js');
	}, []);

	return (
		<main className="bg-white">
			<title>Techbe</title>
			<Hero />
			<Features />
			<Intro />
			<Testimonials />
		</main>
	);
}
