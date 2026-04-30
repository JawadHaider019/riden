import React, { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaApple, FaGooglePlay } from 'react-icons/fa';
import contactImage from '../assets/contact.jpg';

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const contactInfoRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Observer for contact info section
        const infoObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    infoObserver.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        // Observer for form section
        const formObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsFormVisible(true);
                    formObserver.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (contactInfoRef.current) {
            infoObserver.observe(contactInfoRef.current);
        }

        if (formRef.current) {
            formObserver.observe(formRef.current);
        }

        return () => {
            infoObserver.disconnect();
            formObserver.disconnect();
        };
    }, []);

    return (
        <div className="pt-20">
            <HeroSection
                smallHeading="Get in touch"
                mainHeading1="We're real people."
                mainHeading2="Talk to us."
                subText="Whether you're a rider with a question, a driver with a concern, or a business looking to partner — we respond to every message."
                bgImage={contactImage}
            />

            <section className="bg-white py-16">
                <div className="max-w-8xl mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Left Side: Contact Info */}
                        <div ref={contactInfoRef} className="space-y-8">
                            <div className="space-y-4">
                                <p
                                    className={`text-[#1660C3] font-bold tracking-widest uppercase text-xs sm:text-sm block mb-2 dm-sans transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                        }`}
                                >
                                    Find us
                                </p>
                                <h2 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black audiowide-regular uppercase text-gray-900 leading-tight">
                                    <span
                                        className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            }`}
                                    >
                                        Multiple ways
                                    </span>
                                    <br />
                                    <span
                                        className={`inline-block transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            }`}
                                    >
                                        to reach Riden.
                                    </span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Email */}
                                <div
                                    className={`flex items-center gap-6 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                        }`}
                                    style={{ transitionDelay: isVisible ? '0.5s' : '0s' }}
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#1660C3] to-[#2671D8] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#1660C3]/40 group-hover:scale-110 transition-all duration-500">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl group-hover:text-[#1660C3] transition-colors duration-300">Email us</p>
                                        <p className="text-gray-600 dm-sans break-all">hello@ridenapp.co</p>
                                        <p className="text-gray-600 dm-sans break-all">support@ridenapp.co</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div
                                    className={`flex items-center gap-6 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                        }`}
                                    style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#1660C3] to-[#2671D8] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#1660C3]/40 group-hover:scale-110 transition-all duration-500">
                                        <FaPhone size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl group-hover:text-[#1660C3] transition-colors duration-300">Call or WhatsApp</p>
                                        <p className="text-gray-600 dm-sans font-bold">+1 (800) FLEET-00</p>
                                        <p className="text-gray-500 text-sm dm-sans italic">Available 8am – 10pm daily</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div
                                    className={`flex items-center gap-6 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                        }`}
                                    style={{ transitionDelay: isVisible ? '0.7s' : '0s' }}
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#1660C3] to-[#2671D8] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#1660C3]/40 group-hover:scale-110 transition-all duration-500">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl group-hover:text-[#1660C3] transition-colors duration-300">Head office</p>
                                        <p className="text-gray-600 dm-sans">Riden technologies Ltd.</p>
                                        <p className="text-gray-600 dm-sans">Innovation Tower Tech District</p>
                                    </div>
                                </div>

                                {/* Download Buttons */}
                                <div
                                    className={`flex items-center gap-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                        }`}
                                    style={{ transitionDelay: isVisible ? '0.8s' : '0s' }}
                                >
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl group-hover:text-[#1660C3] transition-colors duration-300">Download the app</p>
                                        <div className="flex gap-2 z-10">
                                            <a
                                                href="/#"
                                                className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 bg-[#1660C3] text-white rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-300 group shadow-lg min-w-[130px] sm:min-w-[180px]"
                                            >
                                                <FaApple className="text-2xl sm:text-3xl group-hover:animate-bounce-slow" />
                                                <div className="flex flex-col items-start leading-tight">
                                                    <span className="text-[8px] sm:text-[10px] uppercase opacity-80">Download From</span>
                                                    <span className="text-sm sm:text-lg font-bold">App Store</span>
                                                </div>
                                            </a>

                                            <a
                                                href="/#"
                                                className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-2xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 group shadow-lg min-w-[130px] sm:min-w-[180px]"
                                            >
                                                <FaGooglePlay className="text-2xl sm:text-3xl group-hover:animate-bounce-slow" />
                                                <div className="flex flex-col items-start leading-tight">
                                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider opacity-70">Download From</span>
                                                    <span className="text-sm sm:text-lg font-bold">Google Play</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div
                            ref={formRef}
                            className={`bg-[#E5E5E5] rounded-[2rem] p-6 xs:p-8 sm:p-12 shadow-2xl relative overflow-hidden group transition-all duration-700 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                }`}
                        >
                            <div className="relative z-10 space-y-8">
                                <div className="space-y-2">
                                    <h3 className="dm-sans text-[#1660C3] text-xs sm:text-sm font-bold tracking-widest uppercase">
                                        Send a Message
                                    </h3>
                                    <p className="text-2xl xs:text-3xl uppercase audiowide-regular leading-tight">We'll get back to you within 24 hours.</p>
                                </div>

                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1660C3] dm-sans">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Sara"
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#1660C3] text-black transition-all duration-300 dm-sans shadow-sm focus:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1660C3] dm-sans">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Mitchell"
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#1660C3] text-black transition-all duration-300 dm-sans shadow-sm focus:scale-105"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1660C3] dm-sans">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="yourgmail@gmail.com"
                                            className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#1660C3] text-black transition-all duration-300 dm-sans shadow-sm focus:scale-105"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1660C3] dm-sans">I am a...</label>
                                            <select className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#1660C3] text-black transition-all duration-300 dm-sans appearance-none shadow-sm cursor-pointer focus:scale-105">
                                                <option>Driver</option>
                                                <option>Passenger</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1660C3] dm-sans">Subject</label>
                                            <input
                                                type="text"
                                                placeholder="How can we help?"
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#1660C3] text-black transition-all duration-300 dm-sans shadow-sm focus:scale-105"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1660C3] dm-sans">Message</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Tell Us what is in your mind"
                                            className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#1660C3] text-black transition-all duration-300 dm-sans resize-none shadow-sm focus:scale-105"
                                        ></textarea>
                                    </div>

                                    <button className="w-full px-8 py-4 bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white font-black audiowide-regular uppercase rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-300 text-sm tracking-widest shadow-lg shadow-[#1660C3]/30 active:scale-95">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Contact;
