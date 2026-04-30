import React, { useState, useEffect, useRef } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const CTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white pt-16 pb-6 overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1660C3] to-[#2671D8] rounded-[2rem] sm:rounded-[3rem] px-8 py-16 shadow-xl">
                    {/* Decorative Background Circles */}
                    <div className="absolute top-10 left-2/3 z-0 w-[400px] h-[400px] bg-[#2671D8] rounded-full pointer-events-none hidden lg:block"></div>
                    <div className="absolute -top-10 left-[70%] w-64 h-64 bg-gradient-to-br from-[#1660C3] to-[#2671D8] opacity-70 rounded-full pointer-events-none hidden lg:block"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 sm:gap-32 items-center lg:items-end">
                        {/* Left Content */}
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <span
                                    className={`text-white/80 font-black tracking-widest uppercase text-xs sm:text-sm block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                >
                                    Get started today
                                </span>
                                <h2 className="text-4xl sm:text-6xl font-black audiowide-regular uppercase text-white leading-[1.1]">
                                    <span
                                        className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            }`}
                                    >
                                        Your next ride is
                                    </span>
                                    <br className="hidden sm:block" />
                                    <span
                                        className={`inline-block transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            }`}
                                    >
                                        30 seconds away.
                                    </span>
                                </h2>
                            </div>

                            <p
                                className={`text-white/90 text-sm sm:text-lg dm-sans leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                Join over 50,000 riders already using Fleet. <br className="hidden sm:block" />
                                Free to download. No subscription. Just ride.
                            </p>
                        </div>

                        {/* Right Visual (Download Buttons Column) */}
                        <div className="flex flex-row sm:flex-col gap-2 sm:ml-10 ml-0 z-10">
                            {/* Apple Store Button */}
                            <a
                                href="/#"
                                className={`flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 bg-[#1660C3] text-white rounded-2xl transition-all duration-300 group shadow-lg min-w-[130px] sm:min-w-[180px] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                    }`}
                                style={{
                                    transitionDelay: isVisible ? '800ms' : '0s',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '';
                                }}
                            >
                                <FaApple className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase opacity-80">Download From</span>
                                    <span className="text-sm sm:text-lg font-bold">App Store</span>
                                </div>
                            </a>

                            {/* Google Play Button */}
                            <a
                                href="/#"
                                className={`flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 rounded-2xl transition-all duration-300 group shadow-lg min-w-[130px] sm:min-w-[180px] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                                    }`}
                                style={{
                                    transitionDelay: isVisible ? '900ms' : '0s',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '';
                                }}
                            >
                                <FaGooglePlay className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider opacity-70">Download From</span>
                                    <span className="text-sm sm:text-lg font-bold">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 1.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default CTA;
