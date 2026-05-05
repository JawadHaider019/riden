import React, { useState, useEffect, useRef } from 'react';
import { FaRoute, FaUserCheck, FaLock, FaPhone } from 'react-icons/fa6';

const safetyData = [
    {
        title: 'In-app communication',
        description: 'Call your driver through the app. No personal numbers shared — full privacy on both sides.',
        icon: FaPhone
    },
    {
        title: 'Live trip sharing',
        description: 'Share your real-time route with a trusted contact they can follow along without needing the app.',
        icon: FaRoute
    },
    {
        title: 'Verified drivers only',
        description: 'Every Fleet driver passes background checks, license verification, and vehicle inspection before their first ride.',
        icon: FaUserCheck
    },
    {
        title: 'OTP-secured pickups',
        description: "A one-time code confirms you're in the right car. No code, no ride simple as that.",
        icon: FaLock
    }
];

const SafetyCard = ({ title, description, icon: Icon, isVisible, delay }) => {
    return (
        <div
            className={`bg-white px-4 py-2 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-center group`}
            style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transitionDelay: `${delay}s`
            }}
        >
            <div className="text-xl bg-gradient-to-b from-[#1660C3] to-[#2671D8] p-4 sm:p-5 rounded-2xl text-white shadow-lg shadow-blue-200/50 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Icon />
            </div>
            <div>
                <h3 className="text-lg font-black audiowide-regular uppercase text-[#0E0E0E] leading-tight">
                    {title}
                </h3>
                <p className="text-gray-500 dm-sans text-sm sm:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

const Safety = () => {
    const [visibleSections, setVisibleSections] = useState({
        leftContent: false,
        cards: []
    });

    const leftRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // Observer for left content section
        const leftObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => ({ ...prev, leftContent: true }));
                    leftObserver.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (leftRef.current) {
            leftObserver.observe(leftRef.current);
        }

        // Observers for each card
        const cardObservers = safetyData.map((_, index) => {
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
                { threshold: 0.4 }
            );

            if (cardsRef.current[index]) {
                observer.observe(cardsRef.current[index]);
            }
            return observer;
        });

        return () => {
            leftObserver.disconnect();
            cardObservers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <section className="relative bg-white py-16 overflow-hidden">
            {/* Decorative Background Glow */}
            <div className="absolute top-0 right-0  w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-[#1660C3]/30 rounded-full blur-[80px] lg:blur-[100px] opacity-60 pointer-events-none"></div>
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Content */}
                    <div ref={leftRef} className="space-y-6 sm:space-y-8">
                        <div className="space-y-4">
                            <span
                                className={`text-[#1660C3] font-black tracking-widest uppercase text-xs sm:text-sm block transition-all duration-700 ${visibleSections.leftContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                    }`}
                            >
                                Safety first
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-[1.1]">
                                <span
                                    className={`inline-block transition-all duration-700 delay-200 ${visibleSections.leftContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                >
                                    Every ride,
                                </span>
                                <br className="hidden sm:block" />
                                <span
                                    className={`inline-block transition-all duration-700 delay-400 ${visibleSections.leftContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                >
                                    every rider protected.
                                </span>
                            </h2>
                        </div>

                        <p
                            className={`text-gray-600 text-base sm:text-lg dm-sans leading-relaxed max-w-md transition-all duration-700 delay-600 ${visibleSections.leftContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
                            We don't treat safety as a checkbox. It's built into every layer of Fleet — from driver verification to your live trip share.
                        </p>

                        <a
                            href="/about"
                            className={`inline-flex items-center gap-4 text-[#1660C3] font-black dm-sans uppercase tracking-wider text-xs sm:text-sm border-b-2 border-[#1660C3]/20 pb-2 hover:border-[#1660C3] transition-all duration-300 cursor-pointer ${visibleSections.leftContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: visibleSections.leftContent ? '0.8s' : '0s' }}
                        >
                            Learn more about safety
                        </a>
                    </div>

                    {/* Right Visual (Feature Cards) */}
                    <div className="flex flex-col gap-6 sm:gap-8">
                        {safetyData.map((item, index) => (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                            >
                                <SafetyCard
                                    {...item}
                                    isVisible={visibleSections.cards.includes(index)}
                                    delay={index * 0.15}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Safety;
