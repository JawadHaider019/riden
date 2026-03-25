import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import heroImage from '../assets/hero.png';

const Hero = () => {
    return (
        <section
            className="relative min-h-screen w-full flex items-center bg-zinc-900 overflow-hidden"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: 'center 40%',
                backgroundSize: 'cover'
            }}
        >
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/40 sm:bg-black/30 lg:bg-gradient-to-r lg:from-black/60 lg:to-transparent"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 mt-20 md:mt-24">
                <div className="max-w-3xl space-y-8">
                    {/* Content Group */}
                    <div className="flex flex-col gap-6 items-start">
                        <span className="bg-[#FF161F]/20 border border-[#FF161F]/40 text-[#FF161F] px-4 py-2 rounded-full w-fit text-sm font-medium backdrop-blur-sm">
                            Available in Your City
                        </span>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl audiowide-regular uppercase text-white leading-[1.1] tracking-tight">
                            Ride on your
                            <br />
                            <span className="text-[#FF161F]">terms.</span>
                        </h1>

                        <p className="text-sm sm:text-lg md:text-xl text-zinc-100 max-w-xl dm-sans leading-relaxed opacity-90">
                            Book a ride in seconds, track your driver live, and arrive safely every time. Fleet puts you in control—fast, fair, and always reliable.
                        </p>

                        <div className="flex flex-row gap-3 sm:gap-4 pt-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-[#FF161F] text-white rounded-2xl hover:opacity-90 transition-all duration-300 group shadow-lg min-w-[140px] sm:min-w-[180px]"
                            >
                                <FaApple className="text-2xl sm:text-3xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase opacity-80">Download on the</span>
                                    <span className="text-sm sm:text-lg font-bold">App Store</span>
                                </div>
                            </a>

                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300 group shadow-lg min-w-[140px] sm:min-w-[180px]"
                            >
                                <FaGooglePlay className="text-2xl sm:text-3xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider opacity-70">Get it on</span>
                                    <span className="text-sm sm:text-lg font-bold">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;