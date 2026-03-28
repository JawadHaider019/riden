import React, { useState, useEffect, useRef } from 'react';
import { FaMapLocationDot, FaCarSide, FaWallet } from 'react-icons/fa6';

const HowItWorks = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const steps = [
        {
            id: '01',
            title: 'Set your destination',
            icon: FaMapLocationDot
        },
        {
            id: '02',
            title: 'Choose your ride',
            icon: FaCarSide
        },
        {
            id: '03',
            title: 'Ride and pay',
            icon: FaWallet
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
        <section ref={sectionRef} className="bg-white py-16 overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-12 sm:mb-20">
                    <div className="flex-1">
                        <span
                            className={`text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                }`}
                        >
                            How It Works
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-gray-900 leading-tight">
                            <span
                                className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                From tap to destination
                            </span>
                            <br className="hidden xs:block" />
                            <span
                                className={`inline-block transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                in three steps
                            </span>
                        </h2>
                    </div>

                    <div className="flex-1 lg:max-w-md">
                        <p
                            className={`text-gray-600 text-base sm:text-lg dm-sans leading-relaxed transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                                }`}
                        >
                            Getting around should be simple. We've streamlined our process to ensure you can book, ride, and arrive with zero friction.
                        </p>
                    </div>
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[#FF161F80] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E5E5]">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.id} className="flex flex-col group relative">
                                {/* Card background - no hover effects */}
                                <div className="relative z-10 flex flex-col gap-6 px-8 py-10 sm:py-16 bg-[#E5E5E5] h-full transition-colors duration-300">
                                    {/* Number Highlight with hover effect */}
                                    <span
                                        className={`text-7xl font-black text-[#0E0E0E]/10 dm-sans leading-none transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                            } group-hover:text-[#FF161F]/20 group-hover:scale-110 group-hover:translate-x-2`}
                                        style={{ transitionDelay: `${300 + index * 150}ms` }}
                                    >
                                        {step.id}
                                    </span>

                                    {/* Icon Box with hover effect */}
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-br from-[#FF161F] to-[#AD343E] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-200/50 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                            } group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl`}
                                        style={{ transitionDelay: `${400 + index * 150}ms` }}
                                    >
                                        <Icon className="text-3xl transition-transform duration-500 group-hover:scale-110" />
                                    </div>

                                    {/* Content Title with hover effect */}
                                    <div>
                                        <h3
                                            className={`text-xl sm:text-2xl text-[#0E0E0E] audiowide-regular uppercase leading-tight transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                                } group-hover:text-[#FF161F] group-hover:translate-x-2`}
                                            style={{ transitionDelay: `${500 + index * 150}ms` }}
                                        >
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;