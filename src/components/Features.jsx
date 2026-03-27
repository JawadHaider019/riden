import React from 'react';
import {
    HiMapPin,
    HiWallet,
    HiStar,
    HiShieldCheck,
    HiHeart,
    HiArrowRight,
    HiClock,
    HiCurrencyDollar,
    HiChatBubbleLeftRight,
    HiChartBar
} from 'react-icons/hi2';
import AppImg from '../assets/passengerapp.png';

const Features = () => {
    const features = [
        {
            title: "Live driver tracking",
            description: "Watch your driver's exact location update in real time on the map — from the moment they accept to the second they arrive. ETA updates as they get closer.",
            category: "Core feature",
            icon: <HiMapPin className="text-2xl" />,
            isDark: true,
            span: "md:col-span-2"
        },
        {
            title: "In-app wallet",
            description: "Top up once, pay every ride instantly. Full transaction history with real-time balance — no fumbling for cash or cards at the end of a trip.",
            category: "Payments",
            icon: <HiWallet className="text-2xl" />,
            isDark: false,
            span: "md:col-span-1"
        },
        {
            title: "Loyalty points",
            description: "Every completed ride earns points. Refer a friend and earn more. Redeem them against future fares the more you ride, the more you save.",
            category: "Rewards",
            icon: <HiStar className="text-2xl" />,
            isDark: false,
            span: "md:col-span-1"
        },
        {
            title: "OTP-secured pickup",
            description: "A one-time code confirms you're in the right car with the right driver before every ride begins. Simple, automatic, non-negotiable.",
            category: "Safety",
            icon: <HiShieldCheck className="text-2xl" />,
            isDark: false,
            span: "md:col-span-1"
        },
        {
            title: "Favourite drivers",
            description: "Had a great ride? Mark that driver as a favourite and Fleet will prioritise matching you with them automatically next time you book.",
            category: "Personalisation",
            icon: <HiHeart className="text-2xl" />,
            isDark: false,
            span: "md:col-span-1"
        }
    ];

    const driverFeatures = [
        {
            title: "Flexible Schedule",
            icon: <HiClock className="text-xl" />
        },
        {
            title: "Instant Payouts",
            icon: <HiCurrencyDollar className="text-xl" />
        },
        {
            title: "24/7 Support",
            icon: <HiChatBubbleLeftRight className="text-xl" />
        },
        {
            title: "Smart Earnings",
            icon: <HiChartBar className="text-xl" />
        }
    ];

    return (
        <>
            <section className="py-16 bg-white overflow-hidden">
                <div className="max-w-8xl mx-auto px-6 sm:px-12 lg:px-20">
                    {/* Header Section */}
                    <div className="mb-16">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#FF161F] block mb-4 dm-sans">
                            App Features
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl audiowide-regular uppercase">
                            Built for the ride.<br />
                            Refined for the rider.
                        </h2>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-[2rem] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] ${feature.span} ${feature.isDark ? 'bg-[#0E0E0E] text-white' : 'bg-[#E5E5E5] text-zinc-900'}`}
                            >
                                <div className="space-y-6">
                                    {/* Icon and Heading row */}
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${feature.isDark ? 'bg-zinc-800 text-[#FF161F]' : 'bg-white text-[#FF161F]'}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl md:text-2xl audiowide-regular uppercase">
                                            {feature.title}
                                        </h3>
                                    </div>

                                    <p className={`text-sm md:text-base dm-sans leading-relaxed ${feature.isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="mt-2 flex items-center justify-between">

                                    <a
                                        href="/#"
                                        className="flex items-center gap-2 text-[#FF161F] text-sm font-bold group"
                                    >
                                        {feature.category}

                                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="max-w-8xl mx-auto px-6 lg:px-16 ">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">

                    {/* Left Content */}
                    <div className=" w-3/4 ">
                        <div className="flex flex-col gap-8">

                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-[1.1]">
                                Drive with Riden. <br className="lg:hidden" />Earn on your <br className="hidden sm:block" /> own schedule.

                            </h2>
                            <p className="text-base sm:text-lg text-zinc-600 dm-sans leading-relaxed">No fixed shifts. No hidden deductions. Just you, your car, and a platform that shows you exactly what you're earning — every single ride.</p>
                            <a href="/#" className="flex items-center gap-2 bg-gradient-to-br from-[#FF161F] to-[#AD343E] text-white px-4 py-4 rounded-2xl w-fit text-sm font-bold group">
                                Drive with Riden
                                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="  w-1/2 relative group flex justify-center ">
                        <div className="relative flex justify-center items-center">
                            {/* Centered Decorative Gradient Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[550px] lg:h-[550px] bg-gradient-to-r from-[#FF161F] to-[#AD343E] rounded-full blur-[80px] sm:blur-[120px] opacity-30 pointer-events-none"></div>

                            <img
                                src={AppImg}
                                alt="App Interface"
                                className="relative z-10 w-auto h-[400px] sm:h-[500px] lg:h-[600px] object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Features;
