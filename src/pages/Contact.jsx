import React from 'react';
import HeroSection from '../components/HeroSection';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import contactImage from '../assets/contact.jpg';
const Contact = () => {
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
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block mb-2 dm-sans">
                                    Find us
                                </p>
                                <h2 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black audiowide-regular uppercase text-gray-900 leading-tight">
                                    Multiple ways to reach Riden.
                                </h2>

                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF161F] to-[#AD343E] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#FF161F]/40 transition-all duration-500">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl">Email us</p>
                                        <p className="text-gray-600 dm-sans break-all">hello@ridenapp.co</p>
                                        <p className="text-gray-600 dm-sans break-all">support@ridenapp.co</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF161F] to-[#AD343E] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#FF161F]/40 transition-all duration-500">
                                        <FaPhone size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl">Call or WhatsApp</p>
                                        <p className="text-gray-600 dm-sans font-bold">+1 (800) FLEET-00</p>
                                        <p className="text-gray-500 text-sm dm-sans italic">Available 8am – 10pm daily</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF161F] to-[#AD343E] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#FF161F]/40 transition-all duration-500">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl">Head office</p>
                                        <p className="text-gray-600 dm-sans">Riden technologies Ltd.</p>
                                        <p className="text-gray-600 dm-sans">Innovation Tower Tech District</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF161F] to-[#AD343E] rounded-2xl flex items-center justify-center text-white shrink-0 border border-transparent shadow-lg group-hover:shadow-[#FF161F]/40 transition-all duration-500">
                                        <FaDownload size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-900 font-bold audiowide-regular uppercase text-xl">Download the app</p>
                                        <p className="text-gray-600 dm-sans">The fastest way to reach our support team.</p>
                                        <p className="text-gray-600 dm-sans italic text-sm">Find us in the Help section in the Riden app.</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="bg-[#E5E5E5] rounded-[2rem] p-6 xs:p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 space-y-8">
                                <div className="space-y-2">
                                    <h3 className=" dm-sans text-[#FF161F] text-xs sm:text-sm font-bold tracking-widest uppercase">
                                        Send a Message
                                    </h3>
                                    <p className=" text-2xl xs:text-3xl uppercase audiowide-regular leading-tight">We'll get back to you within 24 hours.</p>
                                </div>

                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF161F] dm-sans">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Sara"
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#FF161F] text-black transition-all duration-300 dm-sans shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF161F] dm-sans">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Mitchell"
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#FF161F] text-black transition-all duration-300 dm-sans shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF161F] dm-sans">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="yourgmail@gmail.com"
                                            className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#FF161F] text-black transition-all duration-300 dm-sans shadow-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF161F] dm-sans">I am a...</label>
                                            <select
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#FF161F] text-black transition-all duration-300 dm-sans appearance-none shadow-sm cursor-pointer"
                                            >
                                                <option>Driver</option>
                                                <option>Passenger</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF161F] dm-sans">Subject</label>
                                            <input
                                                type="text"
                                                placeholder="How can we help?"
                                                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#FF161F] text-black transition-all duration-300 dm-sans shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF161F] dm-sans">Message</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Tell Us what is in your mind"
                                            className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl focus:outline-none focus:border-[#FF161F] text-black transition-all duration-300 dm-sans resize-none shadow-sm"
                                        ></textarea>
                                    </div>

                                    <button className="w-full px-8 py-4 bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white font-black audiowide-regular uppercase rounded-xl hover:opacity-90 transition-all duration-300 text-sm tracking-widest shadow-lg shadow-[#FF161F]/30 active:scale-95">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

