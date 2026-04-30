import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    FaUser,
    FaCreditCard,
    FaTicketAlt,
    FaFileAlt,
    FaSignOutAlt,
    FaChevronRight,
    FaPlus,
    FaChevronLeft,
    FaPaperPlane,
    FaCamera,
    FaComments,
    FaSmile,
    FaMicrophone
} from 'react-icons/fa';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('ACCOUNT');
    const [view, setView] = useState('list'); // 'list' or 'detail' (for tickets) or 'add' (for cards)
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const tabs = [
        { id: 'ACCOUNT', label: 'ACCOUNT', icon: FaUser },
        { id: 'PAYMENT METHODS', label: 'PAYMENT METHODS', icon: FaCreditCard },
        { id: 'COMPLAINT TICKETS', label: 'COMPLAINT TICKETS', icon: FaTicketAlt },
        { id: 'TERMS & CONDITION', label: 'TERMS & CONDITION', icon: FaFileAlt },
        { id: 'LOGOUT', label: 'LOGOUT', icon: FaSignOutAlt, color: 'text-red-500' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'ACCOUNT':
                return <AccountSettings />;
            case 'PAYMENT METHODS':
                if (view === 'add') return <AddCard onBack={() => setView('list')} />;
                return <PaymentMethods onAddCard={() => setView('add')} />;
            case 'COMPLAINT TICKETS':
                if (view === 'detail') return <TicketDetail ticket={selectedTicket} onBack={() => setView('list')} />;
                if (view === 'submit') return <SubmitTicket onBack={() => setView('list')} />;
                return <ComplaintTickets onSelectTicket={(ticket) => { setSelectedTicket(ticket); setView('detail'); }} onSubmitNew={() => setView('submit')} />;
            case 'TERMS & CONDITION':
                return <TermsAndConditions />;
            default:
                return <AccountSettings />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar />

            {/* Logout Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-gray-100 rounded-[40px] p-10 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-scaleIn">
                        <div className="w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-600 flex items-center justify-center mb-6 relative">
                            <div className="w-12 h-12 bg-[#1660C3] rounded-full flex items-center justify-center">
                                <FaSignOutAlt className="text-white text-2xl" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Leaving Already?</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">You'll need to log in again to access your account.</p>

                        <div className="w-full space-y-4">
                            <button className="w-full py-4 bg-[#1660C3] text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                Log Out
                            </button>
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="w-full py-4 bg-blue-100/50 text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-100 transition-all"
                            >
                                Stay Logged In
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-audiowide mb-8 text-gray-900">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Sidebar */}
                    <div className="lg:col-span-4 xl:col-span-3 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fadeInLeft">
                        <div className="bg-[#82A9FF] p-6 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-md overflow-hidden relative group">
                                <FaUser className="text-gray-300 text-5xl" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <FaCamera className="text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 tracking-wider">HARIS MEHMOOD</h2>
                        </div>

                        <nav className="p-4 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        if (tab.id === 'LOGOUT') {
                                            setIsLogoutModalOpen(true);
                                            return;
                                        }
                                        setActiveTab(tab.id);
                                        setView('list');
                                    }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${activeTab === tab.id
                                        ? 'bg-blue-50 text-[#1660C3] shadow-sm'
                                        : tab.color || 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="font-audiowide text-sm tracking-widest">{tab.label}</span>
                                    {tab.id !== 'LOGOUT' && (
                                        <FaChevronRight className={`text-sm transition-transform ${activeTab === tab.id ? 'translate-x-1' : ''}`} />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 xl:col-span-9 bg-gray-200/50 rounded-3xl p-4 md:p-10 shadow-inner animate-fadeInUp">
                        {renderContent()}
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .font-audiowide { font-family: 'Audiowide', sans-serif; }
                .font-dm-sans { font-family: 'DM Sans', sans-serif; }
                
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
                .animate-fadeInUp { animation: fadeInUp 0.6s ease-out 0.2s forwards; opacity: 0; }
            `}</style>
        </div>
    );
};

// Sub-components
const AccountSettings = () => (
    <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#1660C3] mb-6 font-audiowide uppercase tracking-wide">Account Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">First Name</label>
                <input
                    type="text"
                    defaultValue="Sara"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] focus:border-transparent transition-all outline-none"
                    placeholder="Enter first name"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Last Name</label>
                <input
                    type="text"
                    defaultValue="Mitchell"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] focus:border-transparent transition-all outline-none"
                    placeholder="Enter last name"
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
            <input
                type="email"
                defaultValue="yourgmail@gmail.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] focus:border-transparent transition-all outline-none"
                placeholder="Enter email address"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Phone Number</label>
            <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-3 bg-white border border-gray-200 rounded-xl min-w-[100px]">
                    <span className="text-xl">🇨🇦</span>
                    <FaChevronRight className="rotate-90 text-[10px] text-gray-400" />
                </div>
                <input
                    type="tel"
                    defaultValue="+1 217 7895412"
                    className="flex-grow px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] focus:border-transparent transition-all outline-none"
                    placeholder="Enter phone number"
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <input
                type="password"
                defaultValue="************"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] focus:border-transparent transition-all outline-none"
                placeholder="Enter password"
            />
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-200 mt-4 uppercase tracking-widest font-audiowide">
            Save Changes
        </button>
    </div>
);

const PaymentMethods = ({ onAddCard }) => (
    <div className="space-y-8">
        <h3 className="text-2xl font-bold text-[#1660C3] mb-6 font-audiowide uppercase tracking-wide">Payment Methods</h3>

        {/* Primary */}
        <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Primary</h4>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow max-w-sm">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center text-[#1660C3]">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M17.05 20.28c-.96.95-2.02 1.25-3.08 1.25-1.07 0-2.13-.3-3.13-1.25C9.8 19.33 8.7 18.9 7.63 18.9s-2.17.43-3.13 1.38c-.96.95-2.02 1.25-3.04 1.25s-2.09-.3-3.04-1.25c-.96-.95-1.44-2.2-1.44-3.75 0-1.55.48-3.04 1.44-4.47.96-1.43 2.21-2.14 3.75-2.14 1.54 0 2.7.71 3.5 2.14h.02c.8-1.43 1.96-2.14 3.5-2.14 1.54 0 2.79.71 3.75 2.14.96 1.43 1.44 2.92 1.44 4.47 0 1.55-.48 2.8-1.44 3.75zM12 7.03c-.15 0-.3-.01-.45-.02-.15.01-.3.02-.45.02-1.28 0-2.31-.95-2.31-2.14 0-1.24 1.15-2.25 2.56-2.25s2.56 1.01 2.56 2.25c0 1.19-1.03 2.14-2.31 2.14z" /></svg>
                    </div>
                    <span className="font-bold text-gray-800">Apple Pay</span>
                </div>
            </div>
        </section>

        {/* Others */}
        <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Others</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button onClick={onAddCard} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-2 group hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#1660C3]">
                        <FaCreditCard className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-800">Add Card</span>
                </button>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-2 group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 flex items-center justify-center text-gray-800">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12.545 11.027v1.97h1.61c-.69 2.106-2.52 3.633-4.73 3.633-2.76 0-5-2.24-5-5s2.24-5 5-5c1.24 0 2.37.45 3.24 1.2l1.64-1.64c-1.32-1.22-3.08-1.99-5.02-1.99-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c4.14 0 7.5-3.36 7.5-7.5 0-.53-.06-1.05-.16-1.57h-7.34z" /></svg>
                    </div>
                    <span className="font-bold text-gray-800">Google Pay</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-2 group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 flex items-center justify-center text-[#1660C3]">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M20.007 21.03h-1.543l.872-5.46h-1.543l-.872 5.46h-3.086l.872-5.46h-1.544l-.871 5.46h-1.544l.871-5.46h-1.544l-.872 5.46H7.658l.871-5.46h-1.543l-.872 5.46H4.571l.872-5.46H3.9l-.872 5.46H1.484l.872-5.46H.813v-.546h1.543l.872-5.46H1.685l.873-5.46H1.015v-.546h1.543l.872-5.46H.887v-.546h1.543l.872-5.46H.759v-.546H22.516v.546H20.973l-.872 5.46h1.544l.871-5.46h1.544l-.871 5.46h3.086l-.872 5.46h1.544l.872-5.46h1.543l-.872 5.46h3.086l-.871 5.46h1.543l.872-5.46h1.543l-.872 5.46h1.543l.871-5.46h1.543l-.872 5.46h1.543l.871-5.46h1.543l-.872 5.46H20.007z" /></svg>
                    </div>
                    <span className="font-bold text-gray-800">Paypal</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 flex items-center justify-center text-[#1660C3]">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M17.05 20.28c-.96.95-2.02 1.25-3.08 1.25-1.07 0-2.13-.3-3.13-1.25C9.8 19.33 8.7 18.9 7.63 18.9s-2.17.43-3.13 1.38c-.96.95-2.02 1.25-3.04 1.25s-2.09-.3-3.04-1.25c-.96-.95-1.44-2.2-1.44-3.75 0-1.55.48-3.04 1.44-4.47.96-1.43 2.21-2.14 3.75-2.14 1.54 0 2.7.71 3.5 2.14h.02c.8-1.43 1.96-2.14 3.5-2.14 1.54 0 2.79.71 3.75 2.14.96 1.43 1.44 2.92 1.44 4.47 0 1.55-.48 2.8-1.44 3.75zM12 7.03c-.15 0-.3-.01-.45-.02-.15.01-.3.02-.45.02-1.28 0-2.31-.95-2.31-2.14 0-1.24 1.15-2.25 2.56-2.25s2.56 1.01 2.56 2.25c0 1.19-1.03 2.14-2.31 2.14z" /></svg>
                        </div>
                        <span className="font-bold text-gray-800">Apple Pay</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

const AddCard = ({ onBack }) => (
    <div className="space-y-8">
        <div className="flex items-center gap-2 text-[#1660C3] mb-6">
            <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all">
                <FaChevronLeft />
            </button>
            <h3 className="text-2xl font-bold font-audiowide uppercase">Add New Card</h3>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800 ml-1">Card Number</label>
                <input
                    type="text"
                    placeholder="Enter Your Card Number"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] transition-all outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800 ml-1">Card Holder Name</label>
                <input
                    type="text"
                    placeholder="Enter Card Holder Name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] transition-all outline-none"
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-800 ml-1">CVV</label>
                    <input
                        type="text"
                        placeholder="Enter Your CVV"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-800 ml-1">Expiry Date</label>
                    <input
                        type="text"
                        placeholder="00/00/0000"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1660C3] transition-all outline-none"
                    />
                </div>
            </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white rounded-xl font-bold text-lg hover:scale-[1.02] transition-all shadow-lg shadow-blue-200 mt-4 uppercase tracking-widest font-audiowide">
            Save Card
        </button>
    </div>
);

const ComplaintTickets = ({ onSelectTicket, onSubmitNew }) => (
    <div className="space-y-8">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-blue-600 font-dm-sans">Complaint Tickets</h3>
            <button
                onClick={onSubmitNew}
                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
                <FaPlus /> Submit
            </button>
        </div>

        <div className="space-y-8">
            {/* Today */}
            <section className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500">Today</h4>
                <div
                    onClick={() => onSelectTicket({ id: '2345', title: 'Complaint Against Driver', status: 'In Progress' })}
                    className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all group"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Complaint Against Driver</h5>
                        <span className="px-4 py-1.5 border border-blue-400 text-blue-500 text-[10px] font-bold rounded-lg">Booking ID : 2345</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                        I am writing to formally lodge a complaint regarding a recent ride I took through your platform. The experience was disappointing and did not meet the standards I expect from your service. The driver assigned to my trip arrived late...
                    </p>
                    <div className="flex justify-end">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg">
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
            </section>

            {/* Previous */}
            <section className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500">Previous</h4>
                <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm opacity-80 hover:opacity-100 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Complaint Against Driver</h5>
                        <span className="px-4 py-1.5 border border-blue-400 text-blue-500 text-[10px] font-bold rounded-lg">Booking ID : 2345</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                        I am writing to formally lodge a complaint regarding a recent ride I took through your platform. The experience was disappointing and did not meet the standards I expect from your service...
                    </p>
                    <div className="flex justify-end">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg">
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
);

const TicketDetail = ({ ticket, onBack }) => (
    <div className="space-y-6">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all">
                <FaChevronLeft className="text-xl" />
            </button>
            <h3 className="text-2xl font-bold font-dm-sans">{ticket?.title || 'Complaint Against Driver'}</h3>
        </div>

        <div className="text-right text-sm font-bold text-gray-500 mb-2 pr-2">You</div>

        <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100 mb-8 relative">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-bold text-gray-900">Complaint Against Driver</h5>
                <span className="px-4 py-1.5 border border-blue-400 text-blue-500 text-xs font-bold rounded-lg bg-white">Booking ID : {ticket?.id || '2345'}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                I am writing to formally lodge a complaint regarding a recent ride I took through your platform. The experience was disappointing and did not meet the standards I expect from your service. The driver assigned to my trip arrived late without any prior communication or apology. During the ride, the driver displayed unprofessional behavior, including speaking rudely and using inappropriate language. Additionally, the vehicle was not in a clean or acceptable condition, which made the journey uncomfortable. Furthermore, the driver did not follow the suggested route on the app and took a longer path without my consent, which resulted in a higher fare. When I questioned this, the driver responded dismissively and did not provide a reasonable explanation. I believe such conduct reflects poorly on your service and compromises passenger safety and trust. I kindly request that you look into this matter and take appropriate action to ensure that similar incidents do not occur in the future... <span className="text-blue-500 font-bold cursor-pointer">more</span>
            </p>

            <div className="flex gap-2">
                <div className="w-40 h-28 bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                    <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2670&auto=format&fit=crop" alt="Ticket attachment" className="w-full h-full object-cover" />
                </div>
                <div className="w-40 h-28 bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                    <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop" alt="Ticket attachment" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>

        <div className="text-left text-sm font-bold text-gray-500 mb-2 pl-2">Support</div>
        <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100 mb-8 max-w-[95%]">
            <p className="text-gray-500 text-sm leading-relaxed">
                Thank you for contacting us. We're sorry to hear about your experience. To help us investigate this matter further, could you please provide additional details such as the date and time of the ride, driver's name, and any specific incidents you would like us to review? We appreciate your cooperation and look forward to resolving this issue.
            </p>
        </div>

        <div className="relative group mt-10">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer hover:scale-110 transition-transform">
                <FaPlus className="text-2xl" />
            </div>
            <input
                type="text"
                placeholder="Type your message"
                className="w-full pl-16 pr-16 py-5 bg-blue-100/50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none text-blue-900 placeholder:text-blue-400 font-medium"
            />
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 hover:scale-110 transition-transform">
                <FaPaperPlane className="text-2xl" />
            </button>
        </div>
    </div>
);

const SubmitTicket = ({ onBack }) => (
    <div className="space-y-8">
        <div className="flex items-center gap-2 text-blue-600 mb-6">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all">
                <FaChevronLeft className="text-xl" />
            </button>
            <h3 className="text-2xl font-bold font-dm-sans">Submit New Complaint Ticket</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <label className="text-base font-bold text-gray-800 ml-1">Complaint Type</label>
                <div className="relative">
                    <select className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none font-medium text-gray-600">
                        <option>Complaint Type</option>
                        <option>Driver Behavior</option>
                        <option>Vehicle Condition</option>
                        <option>Route Issue</option>
                        <option>Overcharging</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <FaChevronRight className="rotate-90 text-gray-400 text-sm" />
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <label className="text-base font-bold text-gray-800 ml-1">Booking ID</label>
                <input
                    type="text"
                    placeholder="Enter Booking ID"
                    className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-gray-600"
                />
            </div>
        </div>

        <div className="space-y-3">
            <label className="text-base font-bold text-gray-800 ml-1">Short Title</label>
            <input
                type="text"
                placeholder="Enter Short Title"
                className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-gray-600"
            />
        </div>

        <div className="space-y-3">
            <label className="text-base font-bold text-gray-800 ml-1">Description</label>
            <textarea
                placeholder="Enter The Description"
                rows="6"
                className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-gray-600 resize-none"
            ></textarea>
        </div>

        <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 mt-6 font-dm-sans">
            Submit
        </button>
    </div>
);

const TermsAndConditions = () => (
    <div className="space-y-8">
        <div className="flex items-center gap-2 text-blue-600 mb-6">
            <FaChevronLeft className="text-xl" />
            <h3 className="text-2xl font-bold font-dm-sans">Terms & Conditions</h3>
        </div>
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8 h-[700px] overflow-y-auto custom-scrollbar">
            <p className="text-gray-600 leading-relaxed text-sm font-medium">
                By accessing or using this application ("App"), you agree to be bound by these Terms of Use. If you do not agree with these terms, you must not use the App.
            </p>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">1. Service Description</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    The App provides a platform that connects users seeking transportation services with independent drivers. The App does not itself provide transportation services and is not a transportation carrier. All rides are fulfilled by third-party drivers who operate independently.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">2. User Responsibilities</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    Users agree to provide accurate information, behave respectfully toward drivers, and comply with all applicable laws and regulations while using the App. Any misuse of the platform may result in suspension or termination of access.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">3. Driver Responsibility</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    Drivers are solely responsible for the transportation services they provide, including compliance with local laws, vehicle safety, licensing, and insurance requirements.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">4. Limitation of Liability</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    To the maximum extent permitted by law, the App and its owners shall not be liable for any direct, indirect, incidental, or consequential damages arising from:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Use of the App</li>
                        <li>Delays, cancellations, or service interruptions</li>
                        <li>Conduct of drivers or other users</li>
                    </ul>
                    All services are provided on an "as is" and "as available" basis.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">5. Availability of Service</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    We do not guarantee uninterrupted or error-free operation of the App. Features and services may be modified, suspended, or discontinued at any time without prior notice.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">6. Payments & Pricing</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    Fares are calculated based on distance, time, and other applicable factors. Prices may vary due to demand, traffic conditions, or other external factors. By confirming a ride, you agree to the displayed fare or fare estimate.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">7. Privacy</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">8. Changes to Terms</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    We reserve the right to update or modify these Terms at any time. Continued use of the App following any changes constitutes acceptance of those changes.
                </p>
            </section>

            <section className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">9. Contact</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                    For any questions regarding these Terms, please contact support through the App.
                </p>
            </section>
        </div>

        <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}</style>
    </div>
);

export default ProfilePage;
