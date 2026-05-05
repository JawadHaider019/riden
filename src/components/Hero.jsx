import React, { useState, useEffect } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import heroBg from '../assets/hero.jpg';
import heroApp from '../assets/heroapp.png';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        setIsVisible(true);
    }, []);


    const descriptionText = "Book a ride in seconds, track your driver live, and arrive safely every time. Fleet puts you in control—fast, fair, and always reliable.";
    const descriptionWords = descriptionText.split(' ');

    return (
        <section
            className="relative min-h-[100vh] md:h-[100vh] w-full flex items-center bg-zinc-900 overflow-hidden py-24 md:py-0"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'

            }}
        >
            {/* Overlay for better text readability and image depth */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Background zoom animation */}
            <div
                className="absolute inset-0 z-0 transition-all duration-[1.5s] ease-out hidden md:block"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundPosition: 'center center',
                    backgroundSize: isVisible ? '105%' : '100%',
                    backgroundRepeat: 'no-repeat',
                    filter: isVisible ? 'blur(0)' : 'blur(4px)',
                    transition: 'background-size 1.5s ease-out, filter 1s ease-out'
                }}
            ></div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 sm:py-16 py-8  mt-20">
                <div className="flex flex-col lg:flex-row gap-12  items-center ">

                    <div className="w-full lg:w-[60%]  space-y-8  flex flex-col ">
                        <div className="flex flex-col  gap-8 ">
                            {/* Badge */}
                            <div
                                className={`transform transition-all duration-700 delay-200 ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 -translate-y-10'
                                    }`}
                            >
                                <span className="border border-[#1660C3]/70 text-white/80 px-6 py-2 rounded-full text-xs font-medium backdrop-blur-sm">
                                    Available In Your City
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-6xl  sm:text-6xl md:text-7xl  audiowide-regular leading-[0.85] tracking-[-0.02em] uppercase overflow-hidden">
                                <div className="text-white drop-shadow-2xl">RIDE ON YOUR</div>
                                <div className="text-[#1660C3] drop-shadow-2xl">TERMS.</div>
                            </h1>

                            {/* Description */}
                            <div className="text-sm sm:text-lg md:text-xl text-white/70 max-w-2xl dm-sans leading-relaxed tracking-wide">
                                Book A Ride In Seconds, Track Your Driver Live, And Arrive
                                Safely Every Time. Fleet Puts You In Control Fast, Fair, And
                                Always Reliable.
                            </div>

                            {/* Store Buttons */}
                            <div className="flex flex-row gap-2 pt-4 w-full ">
                                {/* App Store */}
                                <a
                                    href="/#"
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1660C3] text-white rounded-xl transition-transform hover:scale-105 shadow-xl w-[160px] sm:w-[200px] "
                                >
                                    <FaApple className="text-3xl sm:text-4xl" />
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-[10px] opacity-80">Download From</span>
                                        <span className="text-sm sm:text-xl font-bold">App Store</span>
                                    </div>
                                </a>

                                <a
                                    href="/#"
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-900 rounded-xl transition-transform hover:scale-105 shadow-xl w-[160px] sm:w-[200px] "
                                >
                                    <FaGooglePlay className="text-2xl sm:text-3xl" />
                                    <div className="flex flex-col items-start leading-tight text-left">
                                        <span className="text-[10px] opacity-70 font-bold uppercase">Download From</span>
                                        <span className="text-sm sm:text-xl font-bold">Google Play</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right App Image - 40% on Desktop */}
                    <div
                        className={`lg:block hidden w-full lg:w-[40%] transform pt-24 transition-all duration-1000 delay-500 flex items-center justify-center ${isVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-20'
                            }`}
                    >
                        <img
                            src={heroApp}
                            alt="Riden App"
                            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-none h-auto lg:h-[800px] object-contain lg:object-cover drop-shadow-[0_20px_60px_rgba(22,96,195,0.4)] animate-float"
                        />
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
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
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

                .animate-float {
                    animation: float 6s ease-in-out infinite;
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
