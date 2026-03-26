import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const CTA = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#FF161F] to-[#AD343E] rounded-[2rem] sm:rounded-[3rem] px-8 py-12 s shadow-2xl">
                    {/* Decorative Background Circles */}
                    <div className="absolute top-10 left-2/3 z-0 w-[400px] h-[400px] bg-[#AD343E] rounded-full pointer-events-none hidden lg:block"></div>
                    <div className="absolute -top-10 left-[70%] w-64 h-64 bg-gradient-to-br from-[#FF161F] to-[#AD343E] opacity-70 rounded-full pointer-events-none hidden lg:block"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 sm:gap-32 items-center lg:items-end ">

                        {/* Left Content */}
                        <div className="space-y-4 ">
                            <div className="space-y-4">
                                <span className="text-white/80 font-black tracking-widest uppercase text-xs sm:text-sm block">
                                    Get started today
                                </span>
                                <h2 className="text-4xl sm:text-6xl font-black audiowide-regular uppercase text-white leading-[1.1]">
                                    Your next ride is <br className="hidden sm:block" />
                                    30 seconds away.
                                </h2>
                            </div>

                            <p className="text-white/90 text-sm sm:text-lg dm-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Join over 50,000 riders already using Fleet. <br className="hidden sm:block" />
                                Free to download. No subscription. Just ride.
                            </p>
                        </div>

                        {/* Right Visual (Download Buttons Column) */}
                        <div className="flex flex-row sm:flex-col gap-2 sm:ml-10 ml-0  z-10">
                            <a
                                href="/#"
                                className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 bg-[#FF161F] text-white rounded-2xl hover:opacity-90 transition-all duration-300 group shadow-lg min-w-[130px] sm:min-w-[180px]"
                            >
                                <FaApple className="text-2xl sm:text-3xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[8px] sm:text-[10px] uppercase opacity-80">Download on the</span>
                                    <span className="text-sm sm:text-lg font-bold">App Store</span>
                                </div>
                            </a>


                            <a
                                href="/#"
                                className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300 group shadow-lg min-w-[130px] sm:min-w-[180px]"
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

export default CTA;
