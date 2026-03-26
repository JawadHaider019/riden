import React from 'react';
import { FaApple, FaGooglePlay, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-[#0E0E0E] text-white pt-16">
            <div className="w-full mx-auto">
                <div className="max-w-8xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16">

                    {/* Column 1: Brand Identity */}
                    <div className="space-y-8 lg:col-span-2">
                        <div className="text-3xl audiowide-regular uppercase text-white tracking-widest">
                            RIDEN
                        </div>
                        <p className="text-gray-400 dm-sans text-sm sm:text-base leading-relaxed max-w-sm">
                            Fast, fair, and reliable rides wherever you need to go. Fleet connects riders and drivers on their own terms.
                        </p>
                        {/* Store Buttons */}
                        <div className="flex flex-row gap-2 pt-4">
                            <a
                                href="/#"
                                className="flex items-center w-[180px] gap-3 px-2 py-2.5 bg-gray-100 text-black rounded-xl hover:bg-[#FF161F] hover:text-white transition-all duration-300 group "
                            >
                                <FaApple className="text-2xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] uppercase font-bold opacity-70">Download from</span>
                                    <span className="text-sm font-bold dm-sans">App Store</span>
                                </div>
                            </a>

                            <a
                                href="/#"
                                className="flex items-center w-[180px] gap-3 px-2 py-2.5 bg-gray-100 text-black rounded-xl hover:bg-[#FF161F] hover:text-white transition-all duration-300 group"
                            >
                                <FaGooglePlay className="text-2xl" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] uppercase font-bold opacity-70">Download from</span>
                                    <span className="text-sm font-bold dm-sans">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Riders */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-black audiowide-regular uppercase text-white tracking-wider">
                            Riders
                        </h4>
                        <ul className="space-y-3">
                            {['How It Works', 'Vehicle Type', 'Safety', 'Pricing', 'Loyalty Points'].map((link) => (
                                <li key={link}>
                                    <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-colors duration-300 dm-sans text-sm block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Drivers */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-black audiowide-regular uppercase text-white tracking-wider">
                            Drivers
                        </h4>
                        <ul className="space-y-3">
                            {['Drive With Fleet', 'Earnings', 'Requirements', 'Driver App', 'Support'].map((link) => (
                                <li key={link}>
                                    <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-colors duration-300 dm-sans text-sm block">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-black audiowide-regular uppercase text-white tracking-wider">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link) => (
                                <li key={link}>
                                    <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-colors duration-300 dm-sans text-sm block">
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
                        <p className="text-gray-500 uppercase audiowide-regular text-xs sm:text-sm tracking-wider text-center sm:text-left">
                            © 2026 Riden. All rights reserved.
                        </p>

                        <div className='flex items-center gap-6'>
                            <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-all duration-300 hover:scale-110">
                                <FaFacebookF className="text-xl" />
                            </a>
                            <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-all duration-300 hover:scale-110">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="/#" className="text-gray-400 hover:text-[#FF161F] transition-all duration-300 hover:scale-110">
                                <FaTwitter className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


