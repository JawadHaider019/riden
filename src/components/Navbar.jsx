import React, { useState, useEffect } from 'react';
import iconSvg from '../assets/icon.png';
import {
    FaCar,
    FaShieldAlt,
    FaArrowRight,
    FaDollarSign,
    FaUsers,
    FaEnvelope,
    FaChevronLeft,
    FaTimes,
    FaBars,
    FaChevronRight,
    FaTruck,
    FaBox,
    FaHandsHelping,
    FaUserShield,
    FaBuilding,
    FaBriefcase,
    FaRocket,
    FaPhone,
    FaFileContract,
    FaHome
} from 'react-icons/fa';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState(null);
    const [isNavVisible, setIsNavVisible] = useState(false);

    const navLinks = [
        {
            name: 'Home',
            href: '/',
            largeIcon: FaHome,
            hasDropdown: false,
            sublinks: []
        },
        {
            name: 'Book a Ride',
            href: '/booking',
            largeIcon: FaCar,
            hasDropdown: false,
            sublinks: [
                { name: 'Book a Ride', href: '/booking', icon: FaCar },
                { name: 'City to City', href: '/intercity', icon: FaTruck },
                { name: 'Delivery', href: '/delivery', icon: FaBox }
            ]
        },
        {
            name: 'About Us',
            href: '/about',
            largeIcon: FaUsers,
            hasDropdown: false,
            sublinks: [
                { name: 'Company', href: '/company', icon: FaBuilding },
                { name: 'Careers', href: '/careers', icon: FaBriefcase },
                { name: 'New Ventures', href: '/ventures', icon: FaRocket },
                { name: 'Contacts', href: '/contacts', icon: FaPhone },
            ]
        },
        {
            name: 'Contact Us',
            href: '/contact',
            largeIcon: FaEnvelope,
            hasDropdown: false,
            sublinks: []
        }
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Trigger navbar animation after mount
        setTimeout(() => setIsNavVisible(true), 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setMobileSubmenu(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Pre-load content when activeDropdown changes
    useEffect(() => {
        if (activeDropdown) {
            setContentLoaded(true);
            setIsDropdownVisible(true);
        } else {
            setContentLoaded(false);
            setIsDropdownVisible(false);
        }
    }, [activeDropdown]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown-trigger') && !e.target.closest('.dropdown-content')) {
                setActiveDropdown(null);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    // Handle mouse enter on dropdown trigger
    const handleDropdownEnter = (linkName, hasDropdown) => {
        if (!hasDropdown) {
            setActiveDropdown(null);
            return;
        }
        setActiveDropdown(linkName);
    };

    // Open mobile submenu
    const openMobileSubmenu = (link) => {
        setMobileSubmenu(link);
    };

    // Close mobile submenu
    const closeMobileSubmenu = () => {
        setMobileSubmenu(null);
    };

    return (
        <>
            {/* Navbar with Tailwind Animations */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md py-3 shadow-md'
                    : 'bg-white py-5'
                    } ${isMobileMenuOpen ? 'lg:block hidden' : 'block'
                    } ${isNavVisible
                        ? 'animate-slideDownFadeIn'
                        : 'opacity-0 -translate-y-full'
                    }`}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                {/* Subtle border line */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-widthExpand"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <a
                            href="/"
                            className="flex items-center gap-3 group animate-scaleIn"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <img
                                src={iconSvg}
                                alt="Riden Logo"
                                className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-md "
                            />
                            <span className="text-3xl font-bold bg-gradient-to-r from-[#FF161F] to-[#AD343E] bg-clip-text text-transparent tracking-wide font-audiowide uppercase md:text-3xl">
                                RIDEN
                            </span>
                        </a>

                        {/* Desktop Navigation Links with fade-in animation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link, index) => (
                                <div
                                    key={link.name}
                                    className="relative dropdown-trigger"
                                    onMouseEnter={() => handleDropdownEnter(link.name, link.hasDropdown)}
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${0.1 + index * 0.1}s forwards`,
                                        opacity: 0,
                                        transform: 'translateY(20px)'
                                    }}
                                >
                                    <a
                                        href={link.href}
                                        className="relative px-3 py-2 group block"
                                    >
                                        <span className={`relative z-10 text-sm tracking-wide transition-all duration-300 ${activeDropdown === link.name
                                            ? 'text-[#FF161F]'
                                            : 'text-gray-700 group-hover:text-[#FF161F]'
                                            }`}>
                                            {link.name}
                                        </span>

                                        {/* Elegant underline */}
                                        <span className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-[#FF161F] to-[#AD343E] transform -translate-x-1/2 transition-all duration-300 group-hover:w-4/5 ${activeDropdown === link.name ? 'w-4/5' : 'w-0'
                                            }`}></span>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Get App Button - Desktop */}
                        <div className="hidden lg:block">
                            <button
                                className="relative  group animate-scaleIn"
                                style={{ animationDelay: '0.4s' }}
                            >
                                <div className="relative px-6 py-2.5 font-medium uppercase bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                                    Download App
                                </div>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-300 animate-scaleIn"
                                style={{ animationDelay: '0.3s' }}
                            >
                                {isMobileMenuOpen ? (
                                    <FaTimes className="w-5 h-5 text-gray-800 transition-transform duration-300 rotate-90" />
                                ) : (
                                    <FaBars className="w-5 h-5 text-gray-800 transition-transform duration-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Dropdown */}
                <div
                    className={`hidden lg:block absolute left-0 w-screen bg-white shadow-2xl overflow-hidden rounded-b-[40px] dropdown-content transition-all duration-500 ease-in-out ${isDropdownVisible && contentLoaded
                        ? 'animate-dropdownExpand'
                        : 'h-0 opacity-0'
                        }`}
                    style={{
                        top: '100%',
                    }}
                >
                    {/* Decorative top line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-black animate-widthExpand"></div>

                    {/* Descriptive content area */}
                    <div className="h-full overflow-hidden">
                        {activeDropdown && navLinks.find(l => l.name === activeDropdown)?.hasDropdown && (
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative animate-fadeInUp">
                                {navLinks
                                    .filter(link => link.name === activeDropdown)
                                    .map(link => {
                                        const LargeIcon = link.largeIcon;
                                        return (
                                            <div key={link.name} className="grid grid-cols-2 gap-16">
                                                {/* Left Side - Title and Large Icon */}
                                                <div className="space-y-6 relative">
                                                    <h2 className="text-3xl font-bold text-gray-900 z-20 font-audiowide uppercase animate-slideInLeft">
                                                        {link.name}
                                                    </h2>

                                                    <div className="text-center">
                                                        <div className="text-[35rem] text-[#FF161F]/10 absolute -top-20 right-0 z-10 animate-scaleIn">
                                                            <LargeIcon />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Side - Sublinks */}
                                                <div className="space-y-8">
                                                    {link.sublinks.length > 0 && (
                                                        <div className="grid grid-cols-1 gap-y-5">
                                                            {link.sublinks.map((sublink, idx) => (
                                                                <a
                                                                    key={sublink.name}
                                                                    href={sublink.href}
                                                                    className="block p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:translate-x-2"
                                                                    style={{
                                                                        animation: `fadeInRight 0.3s ease-out ${0.2 + idx * 0.05}s forwards`,
                                                                        opacity: 0,
                                                                        transform: 'translateX(20px)'
                                                                    }}
                                                                >
                                                                    <span className="text-black font-medium text-xl group-hover:text-[#FF161F] transition-colors duration-300 dm-sans">
                                                                        {sublink.name}
                                                                    </span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div className={`lg:hidden fixed inset-0 z-50 bg-white transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 animate-slideInRight' : 'translate-x-full'
                }`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 animate-fadeIn">
                    <a href="/" className="flex items-center gap-3 group">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#FF161F] to-[#AD343E] bg-clip-text text-transparent tracking-wide font-audiowide uppercase">
                            RIDEN
                        </span>
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300 hover:rotate-90"
                    >
                        <FaTimes className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="h-[calc(100vh-80px)] overflow-y-auto relative">
                    {/* Main Menu */}
                    <div className={`absolute inset-0 transition-all duration-500 ${mobileSubmenu ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                        }`}>
                        <div className="px-6 py-8">
                            {/* Mobile Navigation Links */}
                            <div className="space-y-1">
                                {navLinks.map((link, index) => (
                                    <div
                                        key={link.name}
                                        style={{
                                            animation: `fadeInLeft 0.4s ease-out ${0.1 + index * 0.08}s forwards`,
                                            opacity: 0,
                                            transform: 'translateX(-20px)'
                                        }}
                                    >
                                        {link.hasDropdown ? (
                                            <button
                                                onClick={() => openMobileSubmenu(link)}
                                                className="w-full flex items-center justify-between px-4 py-4 text-gray-900 font-medium text-lg hover:bg-gray-50 rounded-xl transition-all duration-300 hover:translate-x-2"
                                            >
                                                <span>{link.name}</span>
                                                <FaChevronRight className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
                                            </button>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="block px-4 py-4 text-gray-900 font-medium text-lg hover:bg-gray-50 rounded-xl transition-all duration-300 hover:translate-x-2"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Get App Button */}
                            <div className="mt-8 px-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg font-medium">
                                    <span>Download App</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submenu */}
                    <div className={`absolute inset-0 bg-white transition-all duration-500 ${mobileSubmenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                        }`}>
                        {mobileSubmenu && (
                            <div className="h-full overflow-y-auto">
                                <div className="px-6 py-8 relative animate-slideInRight">
                                    {/* Large Background Icon */}
                                    <div className="text-[25rem] text-[#FF161F]/10 absolute top-10 -right-40 z-0 pointer-events-none animate-scaleIn">
                                        {(() => {
                                            const Icon = mobileSubmenu.largeIcon;
                                            return <Icon />;
                                        })()}
                                    </div>

                                    {/* Submenu Header */}
                                    <h2 className="flex items-center gap-2 relative z-10 text-2xl font-bold text-gray-900 mb-6 animate-slideInLeft">
                                        {/* Back Button */}
                                        <button
                                            onClick={closeMobileSubmenu}
                                            className="relative z-10 flex items-center gap-2 text-gray-600 hover:text-[#FF161F] transition-all duration-300 hover:-translate-x-1"
                                        >
                                            <FaChevronLeft className="text-sm" />
                                        </button>
                                        {mobileSubmenu.name}
                                    </h2>

                                    {/* Sublinks */}
                                    <div className="relative z-10 space-y-4">
                                        {mobileSubmenu.sublinks.map((sublink, idx) => (
                                            <a
                                                key={sublink.name}
                                                href={sublink.href}
                                                className="block relative overflow-hidden rounded-xl hover:bg-gray-50 transition-all duration-300 group hover:translate-x-2"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setMobileSubmenu(null);
                                                }}
                                                style={{
                                                    animation: `fadeInRight 0.3s ease-out ${0.15 + idx * 0.05}s forwards`,
                                                    opacity: 0,
                                                    transform: 'translateX(20px)'
                                                }}
                                            >
                                                <span className="relative z-10 block px-6 text-gray-700 group-hover:text-[#FF161F] transition-colors duration-300 text-lg font-medium">
                                                    {sublink.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add custom Tailwind animations to your tailwind.config.js */}
            <style jsx>{`
                @keyframes slideDownFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes widthExpand {
                    from {
                        width: 0%;
                        left: 50%;
                    }
                    to {
                        width: 100%;
                        left: 0%;
                    }
                }
                
                @keyframes dropdownExpand {
                    from {
                        height: 0;
                        opacity: 0;
                    }
                    to {
                        height: 60vh;
                        opacity: 1;
                    }
                }
                
                .animate-slideDownFadeIn {
                    animation: slideDownFadeIn 0.6s ease-out forwards;
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.4s ease-out forwards;
                }
                
                .animate-fadeInRight {
                    animation: fadeInRight 0.4s ease-out forwards;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.5s ease-out forwards;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.4s ease-out forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.4s ease-out forwards;
                }
                
                .animate-widthExpand {
                    animation: widthExpand 0.5s ease-out forwards;
                }
                
                .animate-dropdownExpand {
                    animation: dropdownExpand 0.4s ease-out forwards;
                }
                
                .animate-fadeIn {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default Navbar;