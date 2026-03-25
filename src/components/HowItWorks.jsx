import React from 'react';
import { FaMapLocationDot, FaCarSide, FaWallet } from 'react-icons/fa6';

const HowItWorks = () => {
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

    return (
        <section className="bg-white py-16">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-12 sm:mb-20">
                    <div className="flex-1">
                        <span className="text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-gray-900 leading-tight">
                            From tap to destination <br className="hidden xs:block" />
                            in three steps
                        </h2>
                    </div>

                    <div className="flex-1 lg:max-w-md">
                        <p className="text-gray-600 text-base sm:text-lg dm-sans leading-relaxed">
                            Getting around should be simple. We've streamlined our process to ensure you can book, ride, and arrive with zero friction.
                        </p>
                    </div>
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[#FF161F80] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E5E5]">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.id} className="flex flex-col group relative">
                                <div className="relative z-10 flex flex-col gap-6 px-8 py-10 sm:py-16 bg-[#E5E5E5] h-full transition-colors duration-300 hover:bg-zinc-200">
                                    {/* Number Highlight */}
                                    <span className="text-7xl font-black text-[#0E0E0E]/10 dm-sans leading-none">
                                        {step.id}
                                    </span>

                                    {/* Icon Box */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF161F] to-[#AD343E] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-200/50  transition-transform duration-500">
                                        <Icon className="text-3xl" />
                                    </div>

                                    {/* Content Title */}
                                    <div>
                                        <h3 className="text-xl sm:text-2xl text-[#0E0E0E] audiowide-regular uppercase leading-tight">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
