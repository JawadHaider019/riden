import React, { useState, useEffect, useRef } from 'react';
import {
    HiMapPin,
    HiWallet,
    HiStar,
    HiShieldCheck,
    HiHeart,
    HiArrowRight
} from 'react-icons/hi2';
import AppImg from '../assets/passengerapp.png';

const features = [
    {
        title: "Live driver tracking",
        description: "Watch your driver's exact location update in real time on the map — from the moment they accept to the second they arrive. ETA updates as they get closer.",
        category: "Core feature",
        icon: <HiMapPin className="text-2xl" />,
        isDark: true,
        span: "md:col-span-2"
    },
    {
        title: "In-app wallet",
        description: "Top up once, pay every ride instantly. Full transaction history with real-time balance — no fumbling for cash or cards at the end of a trip.",
        category: "Payments",
        icon: <HiWallet className="text-2xl" />,
        isDark: false,
        span: "md:col-span-1"
    },
    {
        title: "Loyalty points",
        description: "Every completed ride earns points. Refer a friend and earn more. Redeem them against future fares the more you ride, the more you save.",
        category: "Rewards",
        icon: <HiStar className="text-2xl" />,
        isDark: false,
        span: "md:col-span-1"
    },
    {
        title: "OTP-secured pickup",
        description: "A one-time code confirms you're in the right car with the right driver before every ride begins. Simple, automatic, non-negotiable.",
        category: "Safety",
        icon: <HiShieldCheck className="text-2xl" />,
        isDark: false,
        span: "md:col-span-1"
    },
    {
        title: "Favourite drivers",
        description: "Had a great ride? Mark that driver as a favourite and Fleet will prioritise matching you with them automatically next time you book.",
        category: "Personalisation",
        icon: <HiHeart className="text-2xl" />,
        isDark: false,
        span: "md:col-span-1"
    }
];

const Features = () => {
    const [visibleSections, setVisibleSections] = useState({
        header: false,
        cards: [],
        bottom: false,
        image: false
    });

    const headerRef = useRef(null);
    const cardsRef = useRef([]);
    const bottomRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // Observer for header section
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, header: true }));
                    headerObserver.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (headerRef.current) {
            headerObserver.observe(headerRef.current);
        }

        // Observers for each card
        const cardObservers = features.map((_, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => ({
                            ...prev,
                            cards: [...prev.cards, index]
                        }));
                        observer.disconnect();
                    }
                },
                { threshold: 0.3 }
            );

            if (cardsRef.current[index]) {
                observer.observe(cardsRef.current[index]);
            }
            return observer;
        });

        // Observer for bottom section
        const bottomObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, bottom: true }));
                    bottomObserver.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (bottomRef.current) {
            bottomObserver.observe(bottomRef.current);
        }

        // Observer for image section
        const imageObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, image: true }));
                    imageObserver.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (imageRef.current) {
            imageObserver.observe(imageRef.current);
        }

        return () => {
            headerObserver.disconnect();
            cardObservers.forEach(observer => observer.disconnect());
            bottomObserver.disconnect();
            imageObserver.disconnect();
        };
    }, []);

    return (
        <section className="py-16 bg-white overflow-hidden max-w-8xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="flex flex-col gap-2">
                {/* Header Section */}
                <div ref={headerRef} className="mb-16">
                    <span
                        className={`text-sm font-bold uppercase tracking-widest text-[#FF161F] block mb-4 dm-sans transition-all duration-700 ${visibleSections.header ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        App Features
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl audiowide-regular uppercase">
                        <span
                            className={`inline-block transition-all duration-700 delay-200 ${visibleSections.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
                            Built for the ride.
                        </span>
                        <br />
                        <span
                            className={`inline-block transition-all duration-700 delay-400 ${visibleSections.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
                            Refined for the rider.
                        </span>
                    </h2>
                </div>

                {/* Grid Layout - each card triggers individually */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className={`p-8 rounded-[2rem] flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] ${feature.span} ${feature.isDark ? 'bg-[#0E0E0E] text-white' : 'bg-[#E5E5E5] text-zinc-900'}`}
                            style={{
                                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                                opacity: visibleSections.cards.includes(index) ? 1 : 0,
                                transform: visibleSections.cards.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                                transitionDelay: visibleSections.cards.includes(index) ? '0s' : '0s'
                            }}
                        >
                            <div className="space-y-6">
                                {/* Icon and Heading row */}
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${feature.isDark ? 'bg-zinc-800 text-[#FF161F]' : 'bg-white text-[#FF161F]'}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl audiowide-regular uppercase">
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className={`text-sm md:text-base dm-sans leading-relaxed ${feature.isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    {feature.description}
                                </p>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                                <a
                                    href="/#"
                                    className="flex items-center gap-2 text-[#FF161F] text-sm font-bold group"
                                >
                                    {feature.category}
                                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div ref={bottomRef} className="pt-10">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="sm:w-3/4 w-full">
                        <div className="flex flex-col gap-8">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl audiowide-regular uppercase">
                                <span
                                    className={`inline-block transition-all duration-700 ${visibleSections.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: visibleSections.bottom ? '0s' : '0s' }}
                                >
                                    Drive with Riden.
                                </span>
                                <br className="md:hidden" />
                                <span
                                    className={`inline-block transition-all duration-700 ${visibleSections.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: visibleSections.bottom ? '0.1s' : '0s' }}
                                >
                                    Earn on your
                                </span>
                                <br className="hidden md:block" />
                                <span
                                    className={`inline-block transition-all duration-700 ${visibleSections.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: visibleSections.bottom ? '0.2s' : '0s' }}
                                >
                                    own schedule.
                                </span>
                            </h2>
                            <p
                                className={`text-base sm:text-lg text-zinc-600 dm-sans leading-relaxed transition-all duration-700 ${visibleSections.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: visibleSections.bottom ? '0.3s' : '0s' }}
                            >
                                No fixed shifts. No hidden deductions. Just you, your car, and a platform that shows you exactly what you're earning — every single ride.
                            </p>
                            <a
                                href="/booking"
                                className={`flex items-center gap-2 bg-gradient-to-br from-[#FF161F] to-[#AD343E] text-white px-4 py-4 rounded-2xl w-fit text-sm font-bold group transition-all duration-700 ${visibleSections.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    } hover:scale-105`}
                                style={{ transitionDelay: visibleSections.bottom ? '0.4s' : '0s' }}
                            >
                                Drive with Riden
                                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div ref={imageRef} className="sm:w-1/2 w-full relative group flex justify-center">
                        <div
                            className={`relative flex justify-center items-center transition-all duration-1000 ${visibleSections.image ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                }`}
                        >
                            {/* Centered Decorative Gradient Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[550px] lg:h-[550px] bg-gradient-to-r from-[#FF161F] to-[#AD343E] rounded-full blur-[80px] sm:blur-[120px] opacity-30 pointer-events-none"></div>

                            <img
                                src={AppImg}
                                alt="App Interface"
                                className="relative z-10 w-auto h-[400px] sm:h-[500px] lg:h-[600px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;