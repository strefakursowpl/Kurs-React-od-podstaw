import { features } from "@/data/home-data";
import Section from "../ui/section";

export default function Features() {
    return (
        <Section>
            <div className="container">
                <div className="grid grid-cols-1 place-content-center place-items-center gap-7 md:grid-cols-2 xl:grid-cols-3">
                {
                    features.map(feature => (
                        <div key={feature.id} data-wow-delay={feature.delay}
                        className="mx-auto flex max-w-[370px] flex-col items-center px-3.5 py-5 transition
                        hover:shadow-(--shadow1) lg:px-7 lg:py-10 wow fadeInUp"
                        >
                            <div className="mb-5 flex w-full items-center justify-center">
                                <img
                                    src={feature.icon}
                                    width={70}
                                    height={70}
                                    alt=""
                                />
                            </div>
                            <h3 className="text-foreground mt-2 mb-5
                            text-center text-xl font-bold">{feature.title}</h3>
                            <p className="text-gray2 text-center text-base leading-7">
                                {feature.description}
                            </p>
                        </div>
                    ))
                }
                </div>
            </div>
        </Section>
    )
}
