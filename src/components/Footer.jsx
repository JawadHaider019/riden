import React, { useState, useEffect, useRef } from 'react';
import { FaApple, FaGooglePlay, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import iconSvg from '../assets/icon.png';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef(null);

    const riderLinks = ['How It Works', 'Vehicle Type', 'Safety', 'Pricing', 'Loyalty Points'];
    const driverLinks = ['Drive With Fleet', 'Earnings', 'Requirements', 'Driver App', 'Support'];
    const companyLinks = ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'FAQ'];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#0E0E0E] text-white pt-16 overflow-hidden">
            <div className="w-full mx-auto">
                <div className="max-w-8xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16">
                    {/* Column 1: Brand Identity */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Logo */}
                        <a
                            href="/"
                            className={`flex items-center gap-3 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
                        >
                            <img
                                src={iconSvg}
                                alt="Riden Logo"
                                className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-sm"
                            />
                            <div className="text-3xl audiowide-regular uppercase text-white tracking-widest">
                                RIDEN
                            </div>
                        </a>

                        <p
                            className={`text-gray-400 dm-sans text-sm sm:text-base leading-relaxed max-w-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}
                        >
                            Fast, fair, and reliable rides wherever you need to go. Fleet connects riders and drivers on their own terms.
                        </p>

                        {/* Store Buttons */}
                        <div className="flex flex-row gap-2 pt-4">
                            <a
                                href="/#"
                                className={`flex items-center w-[180px] gap-3 px-2 py-2.5 bg-gray-100 text-black rounded-xl transition-all duration-500 group hover:bg-[#FF161F] hover:text-white ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                    }`}
                                style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <FaApple className="text-2xl transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] uppercase font-bold opacity-70">Download from</span>
                                    <span className="text-sm font-bold dm-sans">App Store</span>
                                </div>
                            </a>

                            <a
                                href="/#"
                                className={`flex items-center w-[180px] gap-3 px-2 py-2.5 bg-gray-100 text-black rounded-xl transition-all duration-500 group hover:bg-[#FF161F] hover:text-white ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                                    }`}
                                style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <FaGooglePlay className="text-2xl transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] uppercase font-bold opacity-70">Download from</span>
                                    <span className="text-sm font-bold dm-sans">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Riders */}
                    <div className="space-y-6">
                        <h4
                            className={`text-lg font-black audiowide-regular uppercase text-white tracking-wider transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '0.5s' : '0s' }}
                        >
                            Riders
                        </h4>
                        <ul className="space-y-3">
                            {riderLinks.map((link, index) => (
                                <li
                                    key={link}
                                    style={{
                                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                                        transitionDelay: isVisible ? `${0.6 + (index * 0.05)}s` : '0s'
                                    }}
                                >
                                    <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-all duration-300 dm-sans text-sm block hover:translate-x-2">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Drivers */}
                    <div className="space-y-6">
                        <h4
                            className={`text-lg font-black audiowide-regular uppercase text-white tracking-wider transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '0.7s' : '0s' }}
                        >
                            Drivers
                        </h4>
                        <ul className="space-y-3">
                            {driverLinks.map((link, index) => (
                                <li
                                    key={link}
                                    style={{
                                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                                        transitionDelay: isVisible ? `${0.8 + (index * 0.05)}s` : '0s'
                                    }}
                                >
                                    <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-all duration-300 dm-sans text-sm block hover:translate-x-2">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div className="space-y-6">
                        <h4
                            className={`text-lg font-black audiowide-regular uppercase text-white tracking-wider transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '0.9s' : '0s' }}
                        >
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link, index) => (
                                <li
                                    key={link}
                                    style={{
                                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                                        transitionDelay: isVisible ? `${1.0 + (index * 0.05)}s` : '0s'
                                    }}
                                >
                                    <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-all duration-300 dm-sans text-sm block hover:translate-x-2">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-16 px-6 lg:px-16 py-8">
                    <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p
                            className={`text-gray-500 uppercase audiowide-regular text-xs sm:text-sm tracking-wider text-center sm:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '1.2s' : '0s' }}
                        >
                            © 2026 Riden. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            {[
                                { Icon: FaFacebookF, label: 'Facebook' },
                                { Icon: FaInstagram, label: 'Instagram' },
                                { Icon: FaTwitter, label: 'Twitter' }
                            ].map((social, index) => (
                                <a
                                    key={social.label}
                                    href="/#"
                                    className={`text-gray-400 transition-all duration-300 hover:text-[#FF161F] hover:scale-110 hover:translateY(-3px) ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                        }`}
                                    style={{
                                        transition: 'all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
                                        transitionDelay: isVisible ? `${1.3 + (index * 0.1)}s` : '0s'
                                    }}
                                >
                                    <social.Icon className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;