import { testimonials } from '@/data/home-data';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Header from '../ui/header';
import Section from '../ui/section';
import SwiperButton from '../ui/swiper-button';

export default function Testimonials() {
	return (
		<Section>
			<div className="absolute top-[90px] left-0">
				<img
					src="/shapes/testimonial-shape.png"
					alt=""
					width={270}
					height={733}
				/>
			</div>
			<div className="absolute top-[90px] right-0">
				<img
					src="/shapes/testimonial-shape2.png"
					alt=""
					width={408}
					height={879}
				/>
			</div>
			<div className="container max-w-[1300px]">
				<Header title="Co klienci mówią o nas?" subTitle="Opinie" />
				<div className="flex flex-wrap items-center">
					<div className="w-full lg:w-[42%]">
						<div
							className="wow fadeInUp relative hidden lg:block"
							data-wow-delay=".6s">
							<img
								src="/images/man-with-laptop.jpg"
								alt="człowiek piszący na laptopie"
								width={490}
								height={485}
								className="rounded-4xl"
							/>
							<SwiperButton
								direction="left"
								className="top-[94%] right-[50%] bg-linear-(--gradient) hover:opacity-80"
							/>
							<SwiperButton
								direction="right"
								className="top-[94%] right-[34%] bg-linear-(--gradient) hover:opacity-80"
							/>
						</div>
					</div>
					<div className="w-full lg:w-[58%]">
						<Swiper
							loop
							modules={[Navigation]}
							spaceBetween={20}
							navigation={{
								prevEl: '#slider-prev',
								nextEl: '#slider-next',
							}}
							className="swiper swiper-horizontal swiper-backface-hidden lg:-ml-20!">
							{testimonials.map(testimonial => (
								<SwiperSlide
									key={testimonial.id}
									className="swiper-slide">
									<div className="border-primary relative mb-5 rounded-2xl border-t-4 bg-white shadow-(--shadow1)">
										<div className="flex gap-5 pt-12 pb-5 pl-12">
											<div>
												<img
													src={testimonial.imageSrc}
													alt="awatar osoby"
                                                    className="object-cover rounded-full"
													width={100}
													height={100}
												/>
											</div>
                                            <div>
                                                <h3 className="text-foreground mb-px text-base font-semibold lg:text-xl">
                                                    {testimonial.name}
                                                </h3>
                                                <div className="text-gray2 mb-1 text-sm lg:text-base">
                                                    {testimonial.designation}
                                                </div>
                                                <ul className="flex">
                                                    {[
                                                        ...Array(
                                                            testimonial.stars
                                                        ),
                                                    ].map((_, starIndex) => (
                                                        <li key={starIndex}>
                                                            <img src="/icons/star-orange.png" alt="" width={20} height={20} />
                                                        </li>
                                                    ))
                                                    }
                                                </ul>
                                            </div>
										</div>
                                        <p className="text-gray2 pr-10 pb-12 pl-12 text-lg lg:text-2xl">
                                            {testimonial.text}
                                        </p>
                                        <div className="absolute top-10 right-10 hidden lg:block">
                                            <img src="/icons/quote.png" alt="" width={50} height={37} />
                                        </div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</Section>
	);
}
