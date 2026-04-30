import React, { useState } from 'react';
import {
    HiMapPin,
    HiPlusCircle,
    HiChevronRight,
    HiXMark,
    HiArrowLeft,
    HiPhone,
    HiChevronDown
} from 'react-icons/hi2';
import {
    FaCar,
    FaCarSide,
    FaWheelchair,
    FaShareAlt,
    FaCommentDots,
    FaSmile,
    FaPaperPlane,
    FaChevronLeft,
    FaGoogle,
    FaApple
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Import assets
import standardCar from '../assets/standard_car.png';
import suvCar from '../assets/suv_car.png';
import vanCar from '../assets/van_car.png';
import driverProfile from '../assets/driver_profile.png';

const BookingPage = () => {
    const [sidebarStep, setSidebarStep] = useState('details'); // details, selection, request, searching, arriving
    const [serviceClass, setServiceClass] = useState('Standard');
    const [selectedCar, setSelectedCar] = useState(null);
    const [isLogin] = useState(false); // Toggle to test 'LOG IN TO CONTINUE'
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [step, setStep] = useState('booking'); // for modals: booking, for_whom, phone, otp

    const carOptions = {
        Standard: [
            { id: 1, name: 'Riden Standard', type: 'Sedan', price: 'C$ 70.00', time: '4 min', capacity: 3, image: standardCar },
            { id: 2, name: 'Riden SUV', type: 'SUV', price: 'C$ 70.00', time: '4 min', capacity: 4, image: suvCar },
            { id: 3, name: 'Riden Van', type: 'Van', price: 'C$ 70.00', time: '4 min', capacity: 6, image: vanCar },
        ],
        Premium: [
            { id: 4, name: 'Riden Premium', type: 'Luxury', price: 'C$ 120.00', time: '5 min', capacity: 3, image: standardCar },
        ],
        Handicap: [
            { id: 5, name: 'Riden Assist', type: 'Special', price: 'C$ 85.00', time: '8 min', capacity: 2, image: vanCar },
        ]
    };

    const renderRideDetails = () => (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl audiowide-regular uppercase text-[#0E0E0E] text-center mt-4">
                Enter Your Ride Details
            </h2>

            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-zinc-200 pb-2">
                    <div className="w-6 h-6 rounded-full border-4 border-black flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="From"
                        className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-sm"
                    />
                </div>

                <div className="flex items-center gap-4 border-b border-zinc-200 pb-2">
                    <div className="w-6 h-6 rounded-full border-4 border-[#1660C3] flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="To"
                        className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-sm"
                    />
                </div>

                <button className="flex items-center gap-2 text-[#1660C3] text-sm font-bold dm-sans pt-2">
                    <HiPlusCircle className="text-xl" /> Add Stops
                </button>
            </div>

            <div className="border-t border-zinc-100 pt-6">
                <h3 className="text-[12px] audiowide-regular uppercase text-center mb-6 text-zinc-900">
                    Choose Service Class
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: 'Standard', label: 'Standard', icon: FaCarSide, price: 'From $35' },
                        { id: 'Premium', label: 'Premium', icon: FaCar, price: 'From $35' },
                        { id: 'Handicap', label: 'Handicap', icon: FaWheelchair, price: 'From $35' }
                    ].map((cls) => (
                        <button
                            key={cls.id}
                            onClick={() => {
                                setServiceClass(cls.id);
                                setSidebarStep('selection');
                            }}
                            className={`flex flex-col items-center group transition-all duration-300`}
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-2 shadow-sm transition-all ${serviceClass === cls.id ? 'bg-[#1660C3] text-white' : 'bg-zinc-100 text-[#1660C3] group-hover:bg-zinc-200'}`}>
                                <cls.icon className="text-2xl" />
                            </div>
                            <span className="text-xs font-bold text-zinc-900 mb-0.5">{cls.label}</span>
                            <span className="text-[10px] text-zinc-400 font-medium">{cls.price}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 space-y-4">
                <textarea
                    placeholder="Driver Instruction"
                    className="w-full bg-zinc-100/50 border border-transparent rounded-xl p-4 outline-none text-sm dm-sans h-24 resize-none focus:bg-white focus:border-zinc-200 transition-all"
                />

                <button
                    onClick={() => setStep('for_whom')}
                    className="w-full flex items-center justify-between bg-zinc-100/50 p-4 rounded-xl hover:bg-zinc-100 transition-colors"
                >
                    <span className="text-sm font-bold text-zinc-600">For Someone Else</span>
                    <HiChevronRight className="text-zinc-600" />
                </button>

                <button
                    onClick={() => {
                        if (!isLogin) setStep('phone');
                        else setSidebarStep('selection');
                    }}
                    className="w-full bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white py-4 rounded-xl font-bold dm-sans uppercase tracking-[1px] shadow-lg shadow-blue-200/50 hover:opacity-90 transition-opacity mt-2"
                >
                    {isLogin ? 'Continue' : 'Log in To continue'}
                </button>
            </div>
        </div>
    );

    const renderCarSelection = () => (
        <div className="flex flex-col h-full bg-[#F9F9F9] -mx-6 md:-mx-8 -my-8 p-6 md:p-8 overflow-y-auto scrollbar-hide">
            <h2 className="text-xl audiowide-regular uppercase text-[#0E0E0E] text-center mt-4 mb-6 md:mb-8">
                Enter Your Ride Details
            </h2>

            <div className="space-y-4 bg-white p-4 rounded-2xl mb-8 shadow-sm">
                <div className="flex items-center gap-4 border-b border-zinc-100 pb-2">
                    <div className="w-6 h-6 rounded-full border-4 border-black flex-shrink-0" />
                    <input type="text" value="Pickup Location" readOnly className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-xs" />
                </div>
                <div className="flex items-center gap-4 border-b border-zinc-100 pb-2">
                    <div className="w-6 h-6 rounded-full border-4 border-[#1660C3] flex-shrink-0" />
                    <input type="text" value="Destination Location" readOnly className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-xs" />
                </div>
                <button className="flex items-center gap-2 text-[#1660C3] text-xs font-bold dm-sans">
                    <HiPlusCircle className="text-lg" /> Add Stops
                </button>
            </div>

            <div className="border-t border-zinc-200 pt-6">
                <h3 className="text-[12px] audiowide-regular uppercase text-center mb-6 text-zinc-900 border-b border-zinc-100 pb-4">
                    Choose Service Class
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { id: 'Standard', label: 'Standard', icon: FaCarSide },
                        { id: 'Premium', label: 'Premium', icon: FaCar },
                        { id: 'Handicap', label: 'Handicap', icon: FaWheelchair }
                    ].map((cls) => (
                        <button
                            key={cls.id}
                            onClick={() => setServiceClass(cls.id)}
                            className={`flex flex-col items-center group transition-all duration-300`}
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-2 shadow-sm transition-all ${serviceClass === cls.id ? 'bg-[#1660C3] text-white' : 'bg-white text-[#1660C3] group-hover:bg-zinc-50'}`}>
                                <cls.icon className="text-2xl" />
                            </div>
                            <span className="text-xs font-bold text-zinc-900">{cls.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-zinc-800">{serviceClass} Cars</h4>
                    <span className="text-xs text-zinc-400 font-medium">{carOptions[serviceClass]?.length} Options</span>
                </div>

                <div className="space-y-3 mb-8">
                    {carOptions[serviceClass].map((car) => (
                        <div
                            key={car.id}
                            onClick={() => setSelectedCar(car)}
                            className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${selectedCar?.id === car.id ? 'bg-[#60A3FF] border-transparent' : 'bg-white border-transparent hover:border-zinc-100'}`}
                        >
                            <div className="flex items-center gap-4">
                                <img src={car.image} alt={car.name} className="w-24 h-auto object-contain" />
                                <div>
                                    <h5 className={`font-bold text-sm ${selectedCar?.id === car.id ? 'text-white' : 'text-zinc-900'}`}>{car.name}</h5>
                                    <div className={`flex items-center gap-2 text-[10px] ${selectedCar?.id === car.id ? 'text-white/80' : 'text-zinc-400'}`}>
                                        <span className="flex items-center gap-1"><HiMapPin size={10} /> {car.time}</span>
                                        <span className="uppercase">{car.type}</span>
                                        <span className="flex items-center gap-1 font-bold">● {car.capacity}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${selectedCar?.id === car.id ? 'text-white' : 'text-zinc-900'}`}>{car.price}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <textarea
                        placeholder="Driver Instruction"
                        className="w-full bg-zinc-100 border-none rounded-2xl p-4 outline-none text-sm dm-sans h-32 resize-none"
                    />

                    <button
                        onClick={() => setStep('for_whom')}
                        className="w-full flex items-center justify-between bg-zinc-100/50 p-4 rounded-xl hover:bg-zinc-100 transition-colors"
                    >
                        <span className="text-sm font-bold text-zinc-600">For Someone Else</span>
                        <HiChevronRight className="text-zinc-600" />
                    </button>

                    <button
                        disabled={!selectedCar}
                        onClick={() => setSidebarStep('request')}
                        className={`w-full text-white py-4 rounded-xl font-bold dm-sans uppercase tracking-[1px] shadow-lg transition-all ${selectedCar ? 'bg-gradient-to-r from-[#1660C3] to-[#2671D8] shadow-blue-200/50' : 'bg-zinc-300 shadow-none cursor-not-allowed'}`}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );

    const renderRequestRide = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => setSidebarStep('selection')} className="p-2 hover:bg-zinc-100 rounded-full">
                    <HiArrowLeft className="text-xl" />
                </button>
                <h2 className="text-xl audiowide-regular uppercase text-[#0E0E0E]">Request Ride</h2>
                <div className="w-8" /> {/* Spacer */}
            </div>

            <h3 className="text-lg audiowide-regular uppercase mb-4 text-zinc-900">Car Selected</h3>

            <div className="bg-[#D9E8FF] p-6 rounded-[2rem] relative mb-8">
                <div className="flex items-center justify-between mb-4">
                    <img src={selectedCar?.image} alt={selectedCar?.name} className="w-32 h-20 object-contain" />
                    <div className="text-right">
                        <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#1660C3]" />
                            <span className="text-[10px] font-bold text-[#1660C3]">SUGGESTED</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-zinc-900">{selectedCar?.name}</h4>
                        <div className="flex items-center gap-4 text-xs text-zinc-600 mt-1">
                            <span className="flex items-center gap-1"><HiMapPin /> {selectedCar?.time}</span>
                            <span className="uppercase">{selectedCar?.type}</span>
                            <span className="flex items-center gap-1 font-bold">● {selectedCar?.capacity}</span>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-zinc-900">{selectedCar?.price}</span>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-bold text-zinc-600 mb-2 block">Payment Method</label>
                    <div className="relative">
                        <select className="w-full bg-zinc-100/80 border-none rounded-xl p-4 outline-none text-sm font-bold appearance-none cursor-pointer">
                            <option>Choose Payment Method</option>
                            <option>Cash</option>
                            <option>Credit Card</option>
                        </select>
                        <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold text-zinc-600 mb-2 block">Discount Code (Optional)</label>
                    <input
                        type="text"
                        placeholder="Enter your discount Code"
                        className="w-full bg-zinc-100/80 border-none rounded-xl p-4 outline-none text-sm font-medium"
                    />
                </div>

                <button
                    onClick={() => {
                        setSidebarStep('searching');
                        setTimeout(() => setSidebarStep('arriving'), 3000); // Simulate search
                    }}
                    className="w-full bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white py-5 rounded-2xl font-bold audiowide-regular uppercase tracking-[2px] shadow-xl shadow-blue-200/50 hover:opacity-95 transition-all mt-8"
                >
                    Request Ride
                </button>
            </div>
        </div>
    );

    const renderSearching = () => (
        <div className="flex flex-col items-center justify-center h-full py-20">
            <h2 className="text-2xl audiowide-regular uppercase text-[#0E0E0E] mb-12 text-center">Searching For Car</h2>

            <div className="relative w-48 h-48 mb-12">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[12px] border-zinc-100 border-t-[#1660C3]"
                />
                <div className="absolute inset-4 rounded-full bg-zinc-50 flex items-center justify-center overflow-hidden">
                    <motion.img
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                        src={selectedCar?.image}
                        alt="searching"
                        className="w-32 h-auto object-contain grayscale opacity-50"
                    />
                </div>
            </div>

            <button
                onClick={() => setSidebarStep('request')}
                className="bg-zinc-100/80 text-[#1660C3] px-12 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
                Cancel Ride
            </button>
        </div>
    );

    const renderCarArriving = () => (
        <div className="flex flex-col h-full bg-[#F4F4F4] -mx-6 md:-mx-8 -my-8 p-6 md:p-8 overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900">Car Arriving</h2>
                <span className="text-xs text-zinc-500 font-medium tracking-tight">5 mins away</span>
            </div>

            {/* Driver Info */}
            <div className="bg-white p-4 rounded-2xl flex items-center justify-between mb-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={driverProfile} alt="Driver" className="w-14 h-14 rounded-full object-cover border-2 border-zinc-100" />
                    <div>
                        <h4 className="font-bold text-zinc-900">Sergio Fernandez</h4>
                        <p className="text-xs text-zinc-400 font-medium">Driver</p>
                    </div>
                </div>
                <div
                    onClick={() => setSidebarStep('chat')}
                    className="bg-[#1660C3] text-white p-3 rounded-xl cursor-pointer hover:opacity-90 shadow-lg shadow-blue-100"
                >
                    <FaCommentDots className="text-lg" />
                </div>
            </div>

            {/* Destination Card */}
            <div className="bg-white p-6 rounded-2xl mb-4 shadow-sm">
                <h5 className="font-bold text-zinc-900 mb-4">Destination</h5>
                <div className="relative pl-8 space-y-8">
                    {/* Road Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-zinc-200" />

                    <div className="relative">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-black border-4 border-white shadow-sm" />
                        <h6 className="text-[14px] font-bold text-zinc-900">Home</h6>
                        <p className="text-[12px] text-zinc-400 font-medium">2872 Westheimer Rd. Santa Ana, Illinois 85486</p>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-[35px] top-1 flex items-center justify-center">
                            <HiMapPin className="text-2xl text-[#1660C3]" />
                        </div>
                        <h6 className="text-[14px] font-bold text-zinc-900">Coffee Shop</h6>
                        <p className="text-[12px] text-zinc-400 font-medium">8502 Preston Rd. Inglewood, Maine 98380</p>
                    </div>
                </div>
            </div>

            {/* Ride Details Card */}
            <div className="bg-white p-6 rounded-2xl mb-4 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="font-bold text-zinc-900">Ride Details</h5>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Booking ID: 2365</span>
                </div>

                <h6 className="text-sm font-bold text-zinc-800 border-b border-zinc-50 pb-4 mb-4">Riden: SUV(ID: 984-2WRT)</h6>

                <div className="space-y-4">
                    {[
                        { label: 'Total Distance', value: '5.8 km' },
                        { label: 'Total Fare', value: 'C$70' },
                        { label: 'Discount', value: 'C$0' },
                        { label: 'Payment Method', value: 'Wallet' }
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center pb-2 border-b border-zinc-50 last:border-0 last:pb-0">
                            <span className="text-xs font-bold text-zinc-400">{item.label}</span>
                            <span className="text-xs font-bold text-zinc-800">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button className="flex items-center justify-center gap-4 bg-zinc-100 p-5 rounded-2xl font-bold mb-4 hover:bg-zinc-200 transition-colors">
                <div className="bg-[#1660C3] p-2 rounded-lg text-white">
                    <FaShareAlt className="text-sm" />
                </div>
                <span className="text-sm text-zinc-800">Share Ride Details</span>
            </button>

            <button
                onClick={() => setSidebarStep('details')}
                className="w-full bg-[#D9E8FF] text-[#1660C3] py-5 rounded-3xl font-bold uppercase tracking-widest text-sm hover:bg-[#C9E1FF] transition-colors"
            >
                Cancel Ride
            </button>
        </div>
    );

    const renderChat = () => (
        <div className="flex flex-col h-full -mx-4">
            {/* Chat Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-100 mb-6">
                <button onClick={() => setSidebarStep('arriving')} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <FaChevronLeft className="text-lg text-blue-600" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100">
                        <img src={driverProfile} alt="Driver" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">Sergio Fernandez</h3>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow space-y-6 overflow-y-auto pr-2 scrollbar-hide py-2">
                <div className="flex justify-end">
                    <div className="bg-[#A5C0E5] text-white p-4 px-6 rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px] max-w-[85%] shadow-sm">
                        <p className="text-sm font-medium">Hi There excited for the ride</p>
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="bg-[#D1DCEE] text-zinc-900 p-4 px-6 rounded-tr-[25px] rounded-tl-[25px] rounded-br-[25px] max-w-[85%] shadow-sm">
                        <p className="text-sm font-medium">Is your location is correct are you there</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="bg-[#A5C0E5] text-white p-4 px-6 rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px] max-w-[85%] shadow-sm">
                        <p className="text-sm font-medium">Yes it is correct and i am there</p>
                    </div>
                </div>
            </div>

            {/* Chat Input */}
            <div className="pt-6 mt-auto">
                <div className="relative flex items-center gap-2">
                    <div className="flex-grow relative">
                        <FaSmile className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 text-xl cursor-pointer" />
                        <input
                            type="text"
                            placeholder="Type your message"
                            className="w-full pl-14 pr-14 py-4 bg-[#D1DCEE]/60 rounded-2xl border-none focus:ring-2 focus:ring-blue-400 transition-all outline-none text-blue-900 placeholder:text-blue-500 font-medium text-sm"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors">
                            < HiPhone className="text-sm" />
                        </div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
                        <FaPaperPlane className="text-xl" />
                    </button>
                </div>
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
                        className="w-full bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white py-4 rounded-[1.5rem] font-bold dm-sans uppercase tracking-wider shadow-lg shadow-blue-200/50 hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPhoneModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] p-6 lg:p-7 w-full max-w-[380px] relative animate-in fade-in zoom-in duration-300 md:overflow-visible overflow-y-auto scrollbar-hide max-h-[90vh] md:max-h-none">
                <button onClick={() => setStep('booking')} className="absolute top-5 right-6 text-blue-500 hover:scale-110 transition-transform">
                    <HiXMark className="text-xl" />
                </button>

                <h2 className="text-lg audiowide-regular uppercase text-[#0E0E0E] mb-6">
                    Sign Up
                </h2>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Phone Number</label>
                        <div className="flex bg-zinc-100/80 rounded-xl overflow-hidden">
                            <div className="flex items-center gap-1.5 px-3 border-r border-zinc-200 cursor-pointer hover:bg-zinc-200/50 transition-colors">
                                <span className="text-lg">🇨🇦</span>

                            </div>
                            <input
                                type="tel"
                                placeholder="+1 317 7895412"
                                className="w-full bg-transparent border-none p-3 outline-none text-sm font-medium placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-800 ml-1 uppercase">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-zinc-100/80 border-none rounded-xl p-3 outline-none text-sm font-medium placeholder:text-zinc-400 focus:bg-zinc-100 transition-all"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setStep('otp')}
                        className="w-full bg-[#1660C3] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-100 active:scale-95 transition-all mt-1"
                    >
                        Continue
                    </button>

                    <div className="text-center space-y-4 pt-1">
                        <p className="text-[9px] font-black audiowide-regular uppercase tracking-widest text-zinc-400">
                            Or log in using
                        </p>

                        <div className="flex justify-center gap-6">
                            <button className="hover:scale-110 transition-transform text-[#1660C3]">
                                <FaGoogle className="text-3xl sm:text-4xl" />
                            </button>
                            <button className="hover:scale-110 transition-transform text-black">
                                <FaApple className="text-3xl sm:text-4xl" />
                            </button>
                        </div>

                        <p className="text-[10px] text-zinc-400 leading-tight px-1 uppercase tracking-tighter">
                            By Clicking Continue, You Accept The <span className="text-[#1660C3] font-bold cursor-pointer">User Agreement</span> & <span className="text-[#1660C3] font-bold cursor-pointer">Privacy Policy</span>
                        </p>
                    </div>
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
                                className="w-12 h-16 bg-zinc-100 border border-zinc-300 rounded-xl text-center text-2xl font-black outline-none focus:border-[#1660C3] transition-colors"
                            />
                        ))}
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-zinc-500 mb-2">Didn't receive it?</p>
                        <button className="text-[#1660C3] font-bold underline uppercase tracking-wider text-xs">
                            Resend It
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setStep('booking');
                            setSidebarStep('selection');
                        }}
                        className="w-full bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white py-4 rounded-[1.5rem] font-bold dm-sans uppercase tracking-wider shadow-lg shadow-blue-200/50 hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2"
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
                <div className="absolute inset-0 bg-[#1660C3]/5 pointer-events-none" />
            </div>

            {/* Sidebar */}
            <div className={`absolute top-0 left-0 h-full w-[320px] sm:w-[380px] lg:w-[450px] bg-white shadow-2xl px-6 md:px-8 pt-8 pb-0 z-40 overflow-y-auto scrollbar-hide flex flex-col transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors z-30"
                >
                    <HiXMark className="text-xl text-zinc-600" />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={sidebarStep}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {sidebarStep === 'details' && renderRideDetails()}
                        {sidebarStep === 'selection' && renderCarSelection()}
                        {sidebarStep === 'request' && renderRequestRide()}
                        {sidebarStep === 'searching' && renderSearching()}
                        {sidebarStep === 'arriving' && renderCarArriving()}
                        {sidebarStep === 'chat' && renderChat()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Open Drawer Button */}
            {!isDrawerOpen && (
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="absolute top-1/2 -translate-y-1/2 left-0 bg-white shadow-[10px_0_20px_rgba(0,0,0,0.1)] p-4 rounded-r-2xl z-10 hover:bg-zinc-50 transition-colors border border-l-0 border-zinc-200"
                >
                    <HiChevronRight className="text-2xl text-[#1660C3]" />
                </button>
            )}

            {step === 'for_whom' && renderForWhomModal()}
            {step === 'phone' && renderPhoneModal()}
            {step === 'otp' && renderOTPModal()}

            {/* Map Interactive HUD */}
            <div className="absolute top-10 right-10 flex flex-col gap-4 z-10">
                <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-xl text-zinc-600 hover:text-[#1660C3] transition-colors">
                    <HiMapPin />
                </button>
            </div>
        </div>
    );
};

export default BookingPage;

