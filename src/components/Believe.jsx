import React, { useState, useEffect, useRef } from 'react';

const Believe = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const beliefs = [
        {
            id: '01',
            title: 'Transparency',
            description: 'No hidden fees. No algorithm mysteries. Every fare is explained, every commission is visible, and every policy is written in plain language.'
        },
        {
            id: '02',
            title: 'Safety first',
            description: "Verified drivers, OTP pickups, live trip sharing safety isn't marketed, it's enforced. Every feature decision runs through this lens before anything else"
        },
        {
            id: '03',
            title: 'Fair for both sides',
            description: "A platform that squeezes drivers to win riders isn't sustainable. We build for both because happy, fairly paid drivers are what make rides excellent."
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#AD343E] py-16 overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-12 sm:mb-20">
                    <div className="flex-1">
                        <span
                            className={`text-white/95 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                }`}
                        >
                            What we believe
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-white leading-tight">
                            <span
                                className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                The values behind
                            </span>
                            <br className="hidden xs:block" />
                            <span
                                className={`inline-block transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                every decision we make.
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Beliefs Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                    {beliefs.map((belief, index) => {
                        return (
                            <div
                                key={belief.id}
                                className="flex flex-col group relative"
                                style={{
                                    transition: 'all 0.6s ease-out',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    transitionDelay: `${0.3 + (index * 0.15)}s`
                                }}
                            >
                                <div className="relative z-10 flex flex-col gap-6 px-8 py-10 sm:py-16 bg-white h-full transition-all duration-500 group-hover:bg-gray-50">
                                    {/* Number Highlight */}
                                    <span className="text-7xl font-black text-black/30 dm-sans leading-none transition-all duration-500 group-hover:text-[#AD343E]/30 group-hover:scale-110 group-hover:translate-x-2">
                                        {belief.id}
                                    </span>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl sm:text-2xl text-[#0E0E0E] audiowide-regular uppercase leading-tight transition-all duration-500 group-hover:text-[#AD343E] group-hover:translate-x-2">
                                            {belief.title}
                                        </h3>
                                        <p className="text-gray-600 text-base sm:text-lg dm-sans leading-relaxed transition-all duration-500 group-hover:text-gray-800">
                                            {belief.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default Believe;