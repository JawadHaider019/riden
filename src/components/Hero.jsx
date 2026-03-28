import React, { useState, useEffect } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import heroImage from '../assets/hero.png';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animations after component mounts
        setIsVisible(true);
    }, []);

    // Split description into words for staggered animation
    const descriptionText = "Book a ride in seconds, track your driver live, and arrive safely every time. Fleet puts you in control—fast, fair, and always reliable.";
    const descriptionWords = descriptionText.split(' ');

    return (
        <section
            className="relative min-h-screen w-full flex items-center bg-zinc-900 overflow-hidden"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'

            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Background zoom animation */}
            <div
                className="absolute inset-0 z-0 transition-all duration-[1.5s] ease-out hidden md:block"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundPosition: 'center center',
                    backgroundSize: isVisible ? '110%' : '100%',
                    backgroundRepeat: 'no-repeat',
                    filter: isVisible ? 'blur(0)' : 'blur(4px)',
                    transition: 'background-size 1.5s ease-out, filter 1s ease-out'
                }}
            ></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 mt-20 md:mt-24">
                <div className="max-w-3xl space-y-8">
                    {/* Content Group */}
                    <div className="flex flex-col gap-6 items-start">
                        {/* Badge Animation */}
                        <div
                            className={`transform transition-all duration-700 delay-200 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 -translate-y-10'
                                }`}
                        >
                            <span className="bg-[#FF161F]/20 border border-[#FF161F]/40 text-[#FF161F] px-4 py-2 rounded-full w-fit text-sm font-medium backdrop-blur-sm animate-pulse-slow">
                                Available in Your City
                            </span>
                        </div>

                        {/* Heading with staggered word animation */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl audiowide-regular uppercase text-white leading-[1.1] tracking-tight overflow-hidden">
                            <div className="space-y-2">
                                <div className="flex flex-wrap">
                                    {'Ride on your'.split(' ').map((word, i) => (
                                        <span
                                            key={i}
                                            className={`inline-block transform transition-all duration-700 delay-${200 + i * 150} ${isVisible
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-full'
                                                } ${i > 0 ? 'ml-2' : ''}`}
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap">
                                    <span
                                        className={`inline-block transform transition-all duration-700 delay-500 ${isVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-full'
                                            }`}
                                    >
                                        your
                                    </span>
                                    <span
                                        className={`inline-block ml-2 transform transition-all duration-700 delay-650 ${isVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-full'
                                            }`}
                                    >
                                        <span className="bg-gradient-to-r from-[#FF161F] via-[#FF6B6B] to-[#FF161F] bg-clip-text text-transparent animate-text-shine">
                                            terms.
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </h1>

                        {/* Description with staggered word animation - Enhanced like heading */}
                        <div className="text-sm sm:text-lg md:text-xl text-zinc-100 max-w-xl dm-sans leading-relaxed opacity-90 overflow-hidden">
                            <div className="flex flex-wrap gap-x-1 gap-y-2">
                                {descriptionWords.map((word, index) => (
                                    <span
                                        key={index}
                                        className={`inline-block transform transition-all duration-500 delay-${Math.min(700 + index * 50, 1500)} ${isVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-8'
                                            }`}
                                        style={{
                                            transitionDelay: `${700 + index * 50}ms`,
                                            transitionProperty: 'opacity, transform',
                                            transitionDuration: '500ms',
                                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        {word}
                                        {index < descriptionWords.length - 1 && '\u00A0'}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Buttons with stagger animation */}
                        <div className="flex flex-row gap-3 sm:gap-4 pt-4 w-full sm:w-auto pb-2 sm:pb-0">
                            {/* Apple Store Button */}
                            <a
                                href="/#"
                                className={`flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-[#FF161F] text-white rounded-2xl transition-all duration-500 group shadow-lg min-w-[140px] sm:min-w-[180px] hover:shadow-red-500/30 ${isVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-20'
                                    }`}
                                style={{ transitionDelay: '800ms' }}
                            >
                                <FaApple className="text-2xl sm:text-3xl group-hover:animate-bounce-slow" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase opacity-80">Download on the</span>
                                    <span className="text-sm sm:text-lg font-bold">App Store</span>
                                </div>
                            </a>

                            {/* Google Play Button */}
                            <a
                                href="/#"
                                className={`flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 rounded-2xl transition-all duration-500 group shadow-lg min-w-[140px] sm:min-w-[180px] hover:shadow-xl hover:scale-105 ${isVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-20'
                                    }`}
                                style={{ transitionDelay: '900ms' }}
                            >
                                <FaGooglePlay className="text-2xl sm:text-3xl group-hover:animate-bounce-slow" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider opacity-70">Get it on</span>
                                    <span className="text-sm sm:text-lg font-bold">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                
                @keyframes scroll-down {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                }
                
                @keyframes text-shine {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }
                
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-scroll-down {
                    animation: scroll-down 1.5s ease-in-out infinite;
                }
                
                .animate-text-shine {
                    animation: text-shine 3s linear infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 2s ease-in-out infinite;
                }
                
                /* Staggered delay utilities */
                .delay-200 { transition-delay: 200ms; }
                .delay-500 { transition-delay: 500ms; }
                .delay-650 { transition-delay: 650ms; }
                .delay-700 { transition-delay: 700ms; }
                .delay-800 { transition-delay: 800ms; }
                .delay-900 { transition-delay: 900ms; }
                .delay-1000 { transition-delay: 1000ms; }
            `}</style>
        </section>
    );
};

export default Hero;