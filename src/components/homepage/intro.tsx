export default function Intro() {
    return (
        <section className="overflow-hidden py-14 lg:py-28 bg-[url(/bg/gray-waves-bg.png)]">
            <div className="container max-w-[1300px]">
                <div className="grid gap-14 lg:grid-cols-2">
                    <div className="relative wow fadeInUp" data-wow-delay=".3s">
                        <div className="absolute bottom-12">
                            <img
                                data-tilt=""
                                data-tilt-max={10}
                                alt=""
                                src="/bg/about-bg.png"
                                width={465}
                                height={230}
                            />
                        </div>
                        <div className="relative -right-5 -bottom-1 lg:-right-28">
                            <img
                                data-tilt=""
                                data-tilt-max={20}
                                alt="screen z aplikacji z wykresem kołowym"
                                src="/images/screen1.jpg"
                                width={242}
                                height={474}
                                className="shadow-xl"
                            />
                        </div>
                        <div className="absolute -top-5 right-44 animate-spin animate-duration-150 lg:top-24">
                            <img src="/icons/star.png" alt="" width={34} height={34} />
                        </div>
                        <div className="absolute -top-7 right-40 animate-spin animate-duration-150 lg:top-32">
                            <img src="/icons/star-small.png" alt="" width={24} height={24} />
                        </div>
                        <div className="absolute -top-12 -left-1 animate-spin animate-duration-150 lg:top-10">
                            <img src="/icons/about.png" alt="" width={73} height={68} />
                        </div>
                    </div>
                    <div className="wow fadeInUp" data-wow-delay=".6s">
                        <div className="mx-auto max-w-[645px]">
                            <div
                            data-wow-delay=".3s"
                            className="wow fadeInUp mb-2.5 text-left bg-clip-text text-sm lg:text-base font-bold text-transparent bg-linear-(--gradient2) uppercase">
                               O aplikacji
                            </div>
                            <h2
                            data-wow-delay=".6s"
                            className="text-foreground wow fadeInUp mb-12 text-left text-xl font-extrabold lg:text-4xl">
                                Zwiększamy Twoją efektywność i świadomość budowania budżetu
                            </h2>
                        </div>
                        <p className="text-gray2 mb-4 text-base leading-7">
                            Dzięki temu narzędziu nauczysz się jak skalować biznes.
                            Będziesz mógł prześledzić wszystkie swoje wydatki i przychody,
                            przez co lepiej nauczysz się zarządzać finansami Twojej firmy.
                        </p>
                        <div className="my-10 space-y-4">
                            <div className="flex ml-1.5 items-center gap-2">
                                <img
                                    src="/icons/sign-icon.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                <p className="text-gray2">
                                    Mnogość kategorii finansowych.
                                </p>
                            </div>
                            <div className="flex ml-1.5 items-center gap-2">
                                <img
                                    src="/icons/sign-icon.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                <p className="text-gray2">
                                    Wiele źródeł rachunków.
                                </p>
                            </div>
                            <div className="flex ml-1.5 items-center gap-2">
                                <img
                                    src="/icons/sign-icon.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                <p className="text-gray2">
                                    Czytelne wykresy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
