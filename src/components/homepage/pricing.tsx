import { pricingPlans } from "@/data/home-data";
import Header from "../ui/header";
import Section from "../ui/section";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Pricing() {
    return (
        <Section className="bg-[url(/bg/pricing-bg.jpg)]">
            <div className="absolute -top-24 left-0">
                <img src="/shapes/pricing-shape.png" alt="" width={293} height={553} />
            </div>
            <div className="container max-w-[1300px]">
                <Header
                    title="Nasze plany"
                    subTitle="Cennik"
                />
                <div className="relative mt-12 grid justify-center gap-7 lg:grid-cols-3">
                    {pricingPlans.map(plan => (
                        <div className="border-muted wow fadeInUp relative max-w-[320px] rounded-2xl border bg-white lg:max-w-[340px]"
                        key={plan.id}
                        data-wow-delay={plan.delay}
                        >
                            <div className="rounded-t-2xl rounded-b-[50px] bg-[url(/bg/pricing-header-bg.png)] bg-cover bg-center bg-no-repeat px-14 py-7">
                                <div className="mb-6 rounded-xl bg-white px-12 py-4 text-center font-semibold">
                                    {plan.badge}
                                </div>
                                <div className="mb-2 5 text-center text-4xl font-semibold text-white">
                                    {plan.price}
                                </div>
                                <div className="text-center text-lg text-white">
                                    {plan.period}
                                </div>
                            </div>
                            <ul className="my-10 pl-10">
                                {
                                    plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="mb-4 ml-1.5 flex items-center gap-2">
                                            <img src="/icons/sign-icon2.png" alt="" width={16} height={16} />
                                            <span>{feature}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="mb-9 ml-10">
                                <Button>
                                    {plan.buyText} <ArrowRightIcon />
                                </Button>
                            </div>
                            <div className="absolute right-0 bottom-0">
                                <img src="/shapes/pricing-shape-small.png" alt="" width={100} height={110} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
