import React from 'react';
import { FaCarSide, FaTruck, FaUsers, FaMapLocationDot } from 'react-icons/fa6';

const ServiceCard = ({ title, description, links, icon: Icon, isComingSoon }) => {
    return (
        <div className={`relative group py-8 px-6 rounded-[1.5rem]  transition-all duration-500 overflow-hidden ${isComingSoon ? 'bg-[#E5E5E5]' : 'bg-[#E5E5E5] hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1'
            }`}>
            {/* Grayscale Overlay for Coming Soon */}
            {isComingSoon && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100/40 backdrop-blur-[2px]">
                    <span className="px-4 py-2 text-[#FF161F] text-2xl sm:text-3xl font-black audiowide-regular uppercase tracking-tighter">
                        Coming Soon
                    </span>
                </div>
            )}

            <div className={`space-y-6 sm:space-y-8 ${isComingSoon ? 'grayscale opacity-90' : ''}`}>
                <div className="space-y-4">
                    <div className='flex items-start justify-between gap-4'>
                        <h3 className="text-2xl sm:text-3xl audiowide-regular uppercase text-[#FF161F] leading-tight">
                            {title}
                        </h3>
                        <div className='text-3xl bg-gradient-to-b from-[#FF161F] to-[#AD343E] p-3 rounded-2xl text-white shadow-lg shadow-red-200/50 flex-shrink-0'>
                            <Icon />
                        </div>
                    </div>
                    <p className="text-gray-600 dm-sans text-sm sm:text-base leading-relaxed max-w-[90%]">
                        {description}
                    </p>
                </div>

                <div className="space-y-3">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="flex items-center uppercase justify-between text-[#FF161F] font-bold text-xs sm:text-sm"
                        >
                            <span className="audiowide-regular tracking-wide">{link}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    const serviceData = [
        {
            title: 'Ride Share',
            description: 'Forever good rides for a fair price.',
            links: ['For Passenger', 'For Drivers'],
            icon: FaCarSide,
            isComingSoon: false
        },
        {
            title: 'Cargo',
            description: 'Express delivery for business and people.',
            links: ['For Couriers', 'For Business'],
            icon: FaTruck,
            isComingSoon: true
        },
        {
            title: 'Dispatch',
            description: 'Grow your fleet business with inDrive.',
            links: ['For Clients', 'For Business'],
            icon: FaUsers,
            isComingSoon: true
        },
        {
            title: 'City to City',
            description: 'Safe and reliable long-distance travel options.',
            links: ['For Passenger', 'For Drivers'],
            icon: FaMapLocationDot,
            isComingSoon: true
        }
    ];

    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="max-w-8xl mx-auto px-6 lg:px-24">
                {/* Heading Section */}
                <div className="text-center mb-16 sm:mb-24">
                    <span className="text-[#FF161F] font-black tracking-widest uppercase text-xs sm:text-sm block mb-4">
                        Our Offerings
                    </span>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-tight">
                        Services
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                    {serviceData.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
