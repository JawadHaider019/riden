import React, { useState } from 'react';
import {
    HiMapPin,
    HiPlusCircle,
    HiChevronRight,
    HiXMark,
    HiArrowLeft
} from 'react-icons/hi2';
// import mapBg from '../assets/map_background.png';

const BookingPage = () => {
    const [step, setStep] = useState('booking'); // booking, for_whom, phone, otp
    const [serviceClass, setServiceClass] = useState('Standard');
    const [isForSomeoneElse, setIsForSomeoneElse] = useState(false);
    const [isLogin] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const renderBookingSidebar = () => (
        <div className={`absolute top-0 left-0 h-full w-[360px] lg:w-[400px] bg-white shadow-2xl p-5 sm:p-8 z-20 overflow-y-auto scrollbar-hide flex flex-col transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-0 right-0 p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
                <HiXMark className="text-xl text-zinc-600" />
            </button>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl audiowide-regular uppercase text-[#0E0E0E]">
                    Enter Your Ride Details
                </h2>

            </div>

            <div className="flex flex-col gap-3">
                {/* Locations */}
                <div className="relative space-y-2">
                    <div className="flex items-center gap-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                        <div className="w-2 h-2 rounded-full bg-[#FF161F]" />
                        <div className="flex-1">
                            <input type="text" placeholder="Enter pickup location" className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                        <div className="w-2 h-2 rounded-full bg-black" />
                        <div className="flex-1">
                            <input type="text" placeholder="Enter destination" className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans" />
                        </div>
                    </div>

                    <button className="flex items-center gap-2 text-[#FF161F] text-xs font-bold uppercase tracking-wider px-2 dm-sans">
                        <HiPlusCircle className="text-lg" /> Add Stops
                    </button>
                </div>

                {/* Service Class */}
                <div className="space-y-4 ">
                    <p className="text-[10px] uppercase text-center font-bold text-zinc-900">Choose Service Class</p>
                    <div className="grid grid-cols-3 gap-3">
                        {['Standard', 'Premium', 'Handicap'].map((cls) => (
                            <button
                                key={cls}
                                onClick={() => setServiceClass(cls)}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 dm-sans ${serviceClass === cls ? 'border-[#FF161F] bg-[#FF161F]/5 text-[#FF161F]' : 'border-zinc-100 bg-zinc-50 text-zinc-400'}`}
                            >
                                <span className="text-xs font-bold mb-1">{cls}</span>
                                <span className="text-[10px] opacity-70">From $35</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Driver Instruction */}
                <div className="space-y-2">
                    <textarea
                        placeholder="Any special requests for the driver?"
                        className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-3 outline-none text-sm dm-sans h-16 resize-none"
                    />
                </div>

                {/* Options */}
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="forSomeone"
                            checked={isForSomeoneElse}
                            onChange={(e) => {
                                setIsForSomeoneElse(e.target.checked);
                                if (e.target.checked) setStep('for_whom');
                            }}
                            className="w-5 h-5 accent-[#FF161F] cursor-pointer"
                        />
                        <label htmlFor="forSomeone" className="text-sm font-bold text-[#0E0E0E] cursor-pointer">For Someone Else</label>
                    </div>
                </div>

                {/* Main Action */}
                <button
                    onClick={() => {
                        if (isForSomeoneElse && step !== 'for_whom' && step !== 'phone') setStep('for_whom');
                        else if (!isLogin) setStep('phone');
                        else alert("Payment/Booking Flow Initialized");
                    }}
                    className="w-full bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white py-4 rounded-[1.5rem] font-bold dm-sans uppercase tracking-wider shadow-lg shadow-red-200/50 hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
                >
                    {isLogin ? 'Continue' : 'Log in To continue'} <HiChevronRight className="text-xl" />
                </button>
            </div>
        </div>
    );

    const renderForWhomModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                <button onClick={() => setStep('booking')} className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors">
                    <HiXMark className="text-2xl" />
                </button>

                <h2 className="text-md audiowide-regular uppercase text-[#0E0E0E] mb-10 pr-8">
                    Who you want to give this ride?
                </h2>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-zinc-400">Phone</p>
                        <input type="tel" placeholder="+92 XXX XXXXXXX" className="w-full bg-zinc-100 border border-zinc-100 rounded-2xl p-5 outline-none font-medium" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-zinc-400">Name</p>
                        <input type="text" placeholder="Passanger Name" className="w-full bg-zinc-100 border border-zinc-100 rounded-2xl p-5 outline-none font-medium" />
                    </div>
                    <button
                        onClick={() => setStep('phone')}
                        className="w-full bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white py-4 rounded-[1.5rem] font-bold dm-sans uppercase tracking-wider shadow-lg shadow-red-200/50 hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPhoneModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-md relative animate-in fade-in zoom-in duration-300 text-center">
                <button onClick={() => setStep('booking')} className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors">
                    <HiXMark className="text-2xl" />
                </button>

                <h2 className="text-md audiowide-regular uppercase text-[#0E0E0E] mb-4">
                    ENter Your phone number
                </h2>
                <p className="text-zinc-500 dm-sans mb-10">
                    We will send a confirmation code to it
                </p>

                <div className="space-y-6">
                    <input
                        type="tel"
                        placeholder="Enter Your Number"
                        className="w-full bg-zinc-100 border border-zinc-100 rounded-2xl p-3 text-center text-xl font-medium outline-none focus:border-[#FF161F] transition-colors"
                    />

                    <button
                        onClick={() => setStep('otp')}
                        className="w-full bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white py-4 rounded-[1.5rem] font-bold dm-sans uppercase tracking-wider shadow-lg shadow-red-200/50 hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
                    >
                        Continue
                    </button>

                    <p className="text-[10px] text-zinc-400 leading-relaxed px-4">
                        By clicking Next, you accept the terms of the <span className="text-[#0E0E0E] underline font-medium">User Agreement</span> and agree to having your personal information processed in accordance with the terms of the <span className="text-[#0E0E0E] underline font-medium">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );

    const renderOTPModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-md relative animate-in fade-in zoom-in duration-300 text-center">
                <button onClick={() => setStep('phone')} className="absolute top-8 left-8 text-zinc-400 hover:text-black transition-colors">
                    <HiArrowLeft className="text-2xl" />
                </button>

                <h2 className="text-md audiowide-regular uppercase text-[#0E0E0E] mb-4">
                    ENTER THE 6-DIGIT CODE
                </h2>
                <p className="text-zinc-500 dm-sans mb-10">
                    We sent it to <span className="text-[#0E0E0E] font-bold">+92 317 6062118</span> via SMS
                </p>

                <div className="space-y-8">
                    <div className="flex justify-center gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength="1"
                                className="w-12 h-16 bg-zinc-100 border border-zinc-300 rounded-xl text-center text-2xl font-black outline-none focus:border-[#FF161F] transition-colors"
                            />
                        ))}
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-zinc-500 mb-2">Didn't receive it?</p>
                        <button className="text-[#FF161F] font-bold underline uppercase tracking-wider text-xs">
                            Resend It
                        </button>
                    </div>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white py-4 rounded-[1.5rem] font-bold dm-sans uppercase tracking-wider shadow-lg shadow-red-200/50 hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
                    >
                        Verify & Complete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative h-[calc(100vh-72px)] lg:h-[calc(100vh-84px)] w-full bg-zinc-100 overflow-hidden mt-[72px] lg:mt-[84px]">
            {/* Real Map (Google Maps Embed) */}
            <div className="absolute inset-0 z-0">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    title="Real Map"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=New%20York%20City+(Riden)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    className="grayscale contrast-125 opacity-80"
                ></iframe>
                {/* Overlay to allow clicking elements through map if needed, or just for styling */}
                <div className="absolute inset-0 bg-[#FF161F]/5 pointer-events-none" />
            </div>

            {/* Content Layers */}
            {renderBookingSidebar()}

            {/* Open Drawer Button */}
            {!isDrawerOpen && (
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="absolute top-1/2 -translate-y-1/2 left-0 bg-white shadow-[10px_0_20px_rgba(0,0,0,0.1)] p-4 rounded-r-2xl z-10 hover:bg-zinc-50 transition-colors border border-l-0 border-zinc-200"
                >
                    <HiChevronRight className="text-2xl text-[#0E0E0E]" />
                </button>
            )}

            {step === 'for_whom' && renderForWhomModal()}
            {step === 'phone' && renderPhoneModal()}
            {step === 'otp' && renderOTPModal()}

            {/* Map Interactive HUD (Mock) */}
            <div className="absolute top-10 right-10 flex flex-col gap-4 z-10">
                <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-xl text-zinc-600 hover:text-[#FF161F] transition-colors dm-sans">
                    <HiMapPin />
                </button>

            </div>
        </div>
    );
};

export default BookingPage;
