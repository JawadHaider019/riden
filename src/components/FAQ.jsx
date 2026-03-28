import React, { useState, useEffect, useRef } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi2';

const FAQItem = ({ question, answer, isOpen, onClick, isVisible, delay }) => {
    return (
        <div
            className={`border-b border-zinc-200 py-6 transition-all duration-700`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transitionDelay: `${delay}s`,
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
        >
            <button
                className="w-full flex items-center justify-between text-left group transition-all duration-300"
                onClick={onClick}
            >
                <h3 className={`text-lg md:text-xl audiowide-regular uppercase transition-all duration-300 ${isOpen ? 'text-[#FF161F]' : 'text-[#0E0E0E] group-hover:text-[#FF161F]'}`}>
                    {question}
                </h3>
                <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#FF161F] text-white rotate-180' : 'bg-zinc-100 text-[#0E0E0E] group-hover:bg-[#FF161F]/10'}`}>
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
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const leftRef = useRef(null);

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

    useEffect(() => {
        // Observer for the entire section
        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    sectionObserver.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            sectionObserver.observe(sectionRef.current);
        }

        return () => sectionObserver.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left side: Heading and text */}
                    <div ref={leftRef} className="space-y-8">
                        <div className="space-y-4">
                            <span
                                className={`text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block dm-sans transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                    }`}
                            >
                                FAQ
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-[#0E0E0E] leading-[1.1]">
                                <span
                                    className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                >
                                    Questions people
                                </span>
                                <br className="hidden sm:block" />
                                <span
                                    className={`inline-block transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                >
                                    actually ask.
                                </span>
                            </h2>
                        </div>
                        <p
                            className={`text-zinc-600 text-lg dm-sans leading-relaxed max-w-md transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
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
                                isVisible={isVisible}
                                delay={0.8 + (index * 0.1)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
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
            `}</style>
        </section>
    );
};

export default FAQ;