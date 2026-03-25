import React from 'react';
import { FaRoute, FaUserCheck, FaLock } from 'react-icons/fa6';

const SafetyCard = ({ title, description, icon: Icon }) => {
    return (
        <div className="bg-white px-4 py-2 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-center group">
            <div className="text-xl bg-gradient-to-b from-[#FF161F] to-[#AD343E] p-4 sm:p-5 rounded-2xl text-white shadow-lg shadow-red-200/50 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Icon />
            </div>
            <div >
                <h3 className="text-lg  font-black audiowide-regular uppercase text-[#0E0E0E] leading-tight">
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
    const safetyData = [
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

    return (
        <section className="bg-[#E5E5E5] py-16">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Content */}
                    <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-32">
                        <div className="space-y-4">
                            <span className="text-[#FF161F] font-black tracking-widest uppercase text-xs sm:text-sm block">
                                Safety first
                            </span>
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-[1.1]">
                                Every ride, <br className="hidden sm:block" />
                                every rider protected.
                            </h2>
                        </div>

                        <p className="text-gray-600 text-base sm:text-lg dm-sans leading-relaxed max-w-xl">
                            We don't treat safety as a checkbox. It's built into every layer of Fleet from driver verification to your live trip share.
                        </p>

                        <div className="inline-flex items-center gap-4 text-[#FF161F] font-black audiowide-regular uppercase tracking-wider text-xs sm:text-sm border-b-2 border-[#FF161F]/20 pb-2 hover:border-[#FF161F] transition-all duration-300 cursor-pointer">
                            Learn more about safety
                        </div>
                    </div>

                    {/* Right Visual (Feature Cards) */}
                    <div className="flex flex-col gap-6 sm:gap-8 pt-4 lg:pt-8">
                        {safetyData.map((item, index) => (
                            <SafetyCard key={index} {...item} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Safety;
