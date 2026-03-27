import React, { useState } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi2';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-zinc-200 py-6">
            <button
                className="w-full flex items-center justify-between text-left group transition-all duration-300"
                onClick={onClick}
            >
                <h3 className={`text-lg md:text-xl audiowide-regular uppercase transition-colors duration-300 ${isOpen ? 'text-[#FF161F]' : 'text-[#0E0E0E] group-hover:text-[#FF161F]'}`}>
                    {question}
                </h3>
                <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#FF161F] text-white rotate-180' : 'bg-zinc-100 text-[#0E0E0E]'}`}>
                    {isOpen ? <HiMinus /> : <HiPlus />}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-zinc-600 dm-sans leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = [
        {
            question: "How do i book ride?",
            answer: "Download the Riden app, set your destination, and tap 'Book Ride'. You'll see your driver's details and ETA instantly."
        },
        {
            question: "Can i cancel a booking?",
            answer: "Yes, you can cancel your ride before the driver arrives. Please note that a small cancellation fee may apply if the driver is already close."
        },
        {
            question: "How do i become a Riden driver?",
            answer: "Sign up through the Riden Driver app or our website. You'll need to provide your license, vehicle registration, and pass a background check."
        },
        {
            question: "How are Riden Drivers verified?",
            answer: "Every driver undergoes a multi-step verification process, including criminal background checks, driving record reviews, and vehicle safety inspections."
        }
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left side: Heading and text */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block dm-sans">
                                FAQ
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-[1.1]">
                                Questions people <br className="hidden sm:block" /> actually ask.
                            </h2>
                        </div>
                        <p className="text-zinc-600 text-lg dm-sans leading-relaxed max-w-md">
                            We've answered the ones that come up most. If yours isn't here, our team responds within a few hours.
                        </p>
                    </div>

                    {/* Right side: Accordion */}
                    <div className="flex flex-col">
                        {faqData.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
