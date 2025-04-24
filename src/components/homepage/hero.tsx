import { Swiper, SwiperSlide } from 'swiper/react';

// @ts-expect-error - missing type declarations
import 'swiper/css';
// @ts-expect-error - missing type declarations
import 'swiper/css/effect-fade';

import { slides } from '@/data/home-data';
import { ArrowRightIcon, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { EffectFade, Navigation } from 'swiper/modules';

import { Button } from '../ui/button';

export default function Hero() {
	return (
		<section className="clip-path1 overflow-hidden">
			<Swiper
				className="swiper swiper-initialized swiper-horizontal swiper-autoheight"
				modules={[Navigation, EffectFade]}
				effect="fade"
				loop
				navigation={{
					prevEl: '#slider-prev',
					nextEl: '#slider-next',
				}}
				autoHeight>
				{slides.map(slide => (
					<SwiperSlide
						key={slide.id}
						className="swiper-slide z-10 h-[calc(100vh-100px)]! min-h-[400px]">
						<div
							className="animate-scale-in absolute inset-0 -z-1 bg-cover bg-center after:absolute after:top-0 after:left-0 after:-z-1 after:h-full after:w-full after:bg-linear-(--gradient3) after:opacity-90"
							style={{ backgroundImage: `url(${slide.bgSrc})` }}
						/>
						<div className="container h-full">
							<div className="flex h-full flex-col items-start justify-center lg:max-w-2/3">
								<div className="mb-2 text-sm font-semibold text-white uppercase lg:text-lg">
									{slide.subtitle}
								</div>
								<div className="text-xl font-extrabold text-white lg:text-7xl">
									<div className="mb-2">{slide.title1}</div>
									<div>{slide.title2}</div>
								</div>
								<p className="mt-5 mb-10 max-w-[675px] text-sm font-medium text-white lg:text-lg">
									{slide.text}
								</p>
								<Button>
									Sprawdź <ArrowRightIcon />
								</Button>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button
				id="slider-prev"
				className="border-primary absolute top-[75%] left-[2%] z-10 flex size-14 cursor-pointer items-center justify-center rounded-full border bg-transparent hover:bg-linear-(--gradient) lg:top-[53%]">
				<MoveLeftIcon className="stroke-border" />
			</button>
			<button
				id="slider-next"
				className="border-primary absolute top-[75%] right-[2%] z-10 flex size-14 cursor-pointer items-center justify-center rounded-full border bg-transparent hover:bg-linear-(--gradient) lg:top-[53%]">
				<MoveRightIcon className="stroke-border" />
			</button>
		</section>
	);
}
