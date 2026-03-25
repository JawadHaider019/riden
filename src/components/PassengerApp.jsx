import React from 'react';
import { FaLocationDot, FaWallet, FaTicket, FaPhone } from 'react-icons/fa6';
import passengerAppImg from '../assets/passengerapp.png';

const PassengerApp = () => {
    const features = [
        {
            title: 'Live Driver Tracking',
            icon: FaLocationDot
        },
        {
            title: 'In-app wallet',
            icon: FaWallet,
        },
        {
            title: 'Promo codes & loyalty',
            icon: FaTicket,
        },
        {
            title: 'One-tap driver call',
            icon: FaPhone,
        }
    ];

    return (
        <section className="bg-[#E5E5E5] py-12 lg:py-0 overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">

                    {/* Left Content */}
                    <div className=" flex-1 w-full">
                        <div className="space-y-4 mb-10 sm:mb-12">
                            <span className="text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block">
                                Passenger app
                            </span>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-[1.1]">
                                Everything a <br className="lg:hidden" /> rider needs, <br className="hidden sm:block" />
                                nothing they <br className="lg:hidden" /> don't
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:gap-10">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex items-center gap-4 group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-b from-[#FF161F] to-[#AD343E] text-white rounded-xl flex items-center justify-center shadow-md">
                                            <Icon className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-[#0E0E0E] audiowide-regular uppercase">
                                                {feature.title}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative group flex-1 flex justify-center lg:justify-end w-full">
                        <div className="relative flex justify-center items-center">
                            {/* Centered Decorative Gradient Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[650px] lg:h-[650px] bg-gradient-to-r from-[#FF161F] to-[#AD343E] rounded-full blur-[80px] sm:blur-[120px] opacity-30 pointer-events-none"></div>

                            <img
                                src={passengerAppImg}
                                alt="Passenger App Interface"
                                className="relative z-10 w-auto h-[400px] sm:h-[600px] lg:h-[900px] object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PassengerApp;
