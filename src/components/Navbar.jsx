import React, { useState, useEffect } from 'react';
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
    FaCity,
    FaTruck,
    FaBox,
    FaHandsHelping,
    FaUserShield,
    FaBuilding,
    FaBriefcase,
    FaRocket,
    FaPhone,
    FaFileContract
} from 'react-icons/fa';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState(null);

    const navLinks = [
        {
            name: 'Fair services',
            href: '/fair-services',
            largeIcon: FaCar,
            hasDropdown: true,
            sublinks: [
                { name: 'City rides', href: '/city-rides', icon: FaCity },
                { name: 'City to City', href: '/intercity', icon: FaTruck },
                { name: 'Delivery', href: '/delivery', icon: FaBox }
            ]
        },
        {
            name: 'Earn with Us',
            href: '/earn',
            largeIcon: FaDollarSign,
            hasDropdown: true,
            sublinks: [
                { name: 'City rides', href: '/city-rides-driver', icon: FaCar },
                { name: 'City to City', href: '/intercity-driver', icon: FaTruck },
                { name: 'Courier delivery', href: '/courier', icon: FaBox },
                { name: 'Freight delivery', href: '/freight', icon: FaTruck }
            ],
            exploreLink: { label: 'Explore all services', href: '/earn-services' }
        },
        {
            name: 'Safety',
            href: '/safety',
            largeIcon: FaShieldAlt,
            hasDropdown: true,
            sublinks: [
                { name: 'Safety pact', href: '/safety-pact', icon: FaFileContract },
                { name: 'Passenger safety', href: '/passenger-safety', icon: FaUserShield },
                { name: 'Driver safety', href: '/driver-safety', icon: FaHandsHelping }
            ]
        },
        {
            name: 'About Us',
            href: '/about',
            largeIcon: FaUsers,
            hasDropdown: true,
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

    // Handle mouse leave from nav container
    const handleNavLeave = (e) => {
        const relatedTarget = e.relatedTarget;
        if (relatedTarget?.closest?.('.dropdown-content')) {
            return;
        }
        if (relatedTarget?.closest?.('.dropdown-trigger')) {
            return;
        }
        setActiveDropdown(null);
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
            {/* Navbar - Hidden when mobile menu is open */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md py-3 shadow-md'
                    : 'bg-white py-5'
                    } ${isMobileMenuOpen ? 'lg:block hidden' : 'block'
                    }`}
            >
                {/* Subtle border line */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-3 group">
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF161F] to-[#AD343E] bg-clip-text text-transparent tracking-wide font-audiowide uppercase">
                                RIDEN
                            </span>
                        </a>

                        {/* Desktop Navigation Links */}
                        <div
                            className="hidden lg:flex items-center space-x-1"
                            onMouseLeave={handleNavLeave}
                        >
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative dropdown-trigger"
                                    onMouseEnter={() => handleDropdownEnter(link.name, link.hasDropdown)}
                                >
                                    <a
                                        href={link.href}
                                        className="relative px-3 py-2 group block"
                                    >
                                        <span className={`relative z-10 text-sm tracking-wide transition-colors duration-300 ${activeDropdown === link.name
                                            ? 'text-[#FF161F]'
                                            : 'text-gray-700 group-hover:text-[#FF161F]'
                                            }`}>
                                            {link.name}
                                        </span>

                                        {/* Elegant underline */}
                                        <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF161F] to-[#AD343E] transform -translate-x-1/2 transition-all duration-300 group-hover:w-4/5 ${activeDropdown === link.name ? 'w-4/5' : ''
                                            }`}></span>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Get App Button - Desktop */}
                        <div className="hidden lg:block">
                            <button className="relative overflow-hidden group">
                                <div className="relative px-6 py-2.5 font-medium uppercase bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                                    Download App
                                </div>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <button className="px-4 py-2 bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white rounded-lg hover:opacity-90 transition-all duration-300">
                                <span className="text-sm font-medium uppercase flex items-center gap-2">
                                    <span className="hidden xs:inline">Download App</span>
                                    <span className="xs:hidden">Get App</span>
                                </span>
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-300"
                            >
                                {isMobileMenuOpen ? (
                                    <FaTimes className="w-5 h-5 text-gray-800" />
                                ) : (
                                    <FaBars className="w-5 h-5 text-gray-800" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Dropdown - 70vh with rounded bottom */}
                <div
                    className="hidden lg:block absolute left-0 w-screen bg-white shadow-2xl overflow-hidden rounded-b-[40px] dropdown-content transition-all duration-500 ease-in-out"
                    style={{
                        top: '100%',
                        height: isDropdownVisible && contentLoaded ? '70vh' : '0',
                        opacity: isDropdownVisible && contentLoaded ? 1 : 0
                    }}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    {/* Decorative top line - red to black gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-black"></div>

                    {/* Scrollable content area */}
                    <div className="h-full overflow-y-auto">
                        {activeDropdown && navLinks.find(l => l.name === activeDropdown)?.hasDropdown && (
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                                {navLinks
                                    .filter(link => link.name === activeDropdown)
                                    .map(link => {
                                        const LargeIcon = link.largeIcon;
                                        return (
                                            <div key={link.name} className="grid grid-cols-2 gap-16">
                                                {/* Left Side - Title and Large Icon */}
                                                <div className="space-y-6 relative">
                                                    <h2 className="text-3xl font-bold text-gray-900 z-20 font-audiowide uppercase">
                                                        {link.name}
                                                    </h2>

                                                    <div className="text-center">
                                                        <div className="text-[35rem] text-[#FF161F]/10 absolute -top-20 right-0 z-10">
                                                            <LargeIcon />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Side - Sublinks */}
                                                <div className="space-y-8">
                                                    {link.sublinks.length > 0 && (
                                                        <div className="grid grid-cols-1 gap-y-5">
                                                            {link.sublinks.map((sublink) => (
                                                                <a
                                                                    key={sublink.name}
                                                                    href={sublink.href}
                                                                    className="block p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                                                                >
                                                                    <span className="text-black font-medium text-xl group-hover:text-[#FF161F] transition-colors duration-300 font-audiowide">
                                                                        {sublink.name}
                                                                    </span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Explore all services link */}
                                                    {link.exploreLink && (
                                                        <div className=" ml-4">
                                                            <a
                                                                href={link.exploreLink.href}
                                                                className="inline-flex items-center gap-2 text-[#FF161F] hover:text-[#AD343E] font-medium group"
                                                            >
                                                                {link.exploreLink.label}
                                                                <FaArrowRight className="text-sm group-hover:translate-x-2 transition-transform duration-300" />
                                                            </a>
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
            <div className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <a href="/" className="flex items-center gap-3 group">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#FF161F] to-[#AD343E] bg-clip-text text-transparent tracking-wide font-audiowide uppercase">
                            RIDEN
                        </span>
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                        <FaTimes className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="h-[calc(100vh-80px)] overflow-y-auto relative">
                    {/* Main Menu */}
                    <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${mobileSubmenu ? '-translate-x-full' : 'translate-x-0'
                        }`}>
                        <div className="px-6 py-8">
                            {/* Mobile Navigation Links */}
                            <div className="space-y-1">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        {link.hasDropdown ? (
                                            <button
                                                onClick={() => openMobileSubmenu(link)}
                                                className="w-full flex items-center justify-between px-4 py-4 text-gray-900 font-medium text-lg hover:bg-gray-50 rounded-xl transition-colors duration-300"
                                            >
                                                <span>{link.name}</span>
                                                <FaChevronRight className="text-gray-400" />
                                            </button>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="block px-4 py-4 text-gray-900 font-medium text-lg hover:bg-gray-50 rounded-xl transition-colors duration-300"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Get App Button */}
                            <div className="mt-8 px-4">

                                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium">
                                    <span> Download App</span>
                                </button>
                            </div>


                        </div>
                    </div>

                    {/* Submenu - Slides from Right with Big Background Icons */}
                    <div className={`absolute inset-0 bg-white transition-transform duration-500 ease-in-out ${mobileSubmenu ? 'translate-x-0' : 'translate-x-full'
                        }`}>
                        {mobileSubmenu && (
                            <div className="h-full overflow-y-auto">
                                <div className="px-6 py-8 relative">
                                    {/* Large Background Icon */}
                                    <div className="text-[25rem] text-[#FF161F]/10 absolute top-10 -right-40 z-0 pointer-events-none">
                                        {(() => {
                                            const Icon = mobileSubmenu.largeIcon;
                                            return <Icon />;
                                        })()}
                                    </div>

                                    {/* Submenu Header */}
                                    <h2 className="flex items-center gap-2 relative z-10 text-2xl font-bold text-gray-900 mb-6">
                                        {/* Back Button */}
                                        <button
                                            onClick={closeMobileSubmenu}
                                            className="relative z-10 flex items-center gap-2 text-gray-600 hover:text-[#FF161F] group"
                                        >
                                            <FaChevronLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
                                        </button>
                                        {mobileSubmenu.name}
                                    </h2>

                                    {/* Sublinks */}
                                    <div className="relative z-10 space-y-4">
                                        {mobileSubmenu.sublinks.map((sublink) => (
                                            <a
                                                key={sublink.name}
                                                href={sublink.href}
                                                className="block relative overflow-hidden rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setMobileSubmenu(null);
                                                }}
                                            >
                                                {/* Text */}
                                                <span className="relative z-10 block px-6 text-gray-700 group-hover:text-[#FF161F] transition-colors duration-300 text-lg font-medium">
                                                    {sublink.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Explore/View All Link */}
                                    {mobileSubmenu.exploreLink && (
                                        <div className="relative z-10 mt-8 pt-6 border-t border-gray-200">
                                            <a
                                                href={mobileSubmenu.exploreLink.href}
                                                className="inline-flex items-center gap-2 text-[#FF161F] hover:text-[#AD343E] font-medium group"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setMobileSubmenu(null);
                                                }}
                                            >
                                                {mobileSubmenu.exploreLink.label}
                                                <FaArrowRight className="text-sm group-hover:translate-x-2 transition-transform duration-300" />
                                            </a>
                                        </div>
                                    )}

                                    {!mobileSubmenu.exploreLink && mobileSubmenu.sublinks.length > 0 && (
                                        <div className="relative z-10 mt-8 pt-6 border-t border-gray-200">
                                            <a
                                                href={mobileSubmenu.href}
                                                className="inline-flex items-center gap-2 text-[#FF161F] hover:text-[#AD343E] font-medium group"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setMobileSubmenu(null);
                                                }}
                                            >
                                                View all {mobileSubmenu.name}
                                                <FaArrowRight className="text-sm group-hover:translate-x-2 transition-transform duration-300" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;