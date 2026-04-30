import React, { useState, useEffect } from 'react';

const HeroSection = ({
    bgImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    smallHeading = "Our Services",
    mainHeading1 = "Premium Mobility",
    mainHeading2 = "Solutions",
    subText = "Experience the next generation of transportation with Riden's world-class fleet and technology."
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animations after component mounts
        setIsVisible(true);
    }, []);

    // Split main heading into words for staggered animation
    const headingWords1 = mainHeading1.split(' ');
    const headingWords2 = mainHeading2.split(' ');

    return (
        <section className="relative w-full h-[80vh] md:h-[80vh] lg:h-[80vh] py-16 md:py-0 flex items-center justify-center overflow-hidden">
            {/* Cinematic Background Image with Zoom Animation */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: isVisible ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 8s ease-out'
                }}
            >
                {/* Advanced Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-8xl mx-auto">
                <div className="max-w-5xl px-4 sm:px-8 lg:px-16 space-y-6 lg:space-y-8">
                    {/* Small Heading / Tagline */}
                    <div
                        className={`inline-block px-4 py-1 border border-[#1660C3] rounded-full bg-white/5 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                            }`}
                    >
                        <span className="text-[#1660C3] font-black tracking-[0.3em] uppercase text-xs sm:text-sm block">
                            {smallHeading}
                        </span>
                    </div>

                    {/* Main High-Impact Heading with Staggered Words */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black audiowide-regular uppercase text-white leading-none tracking-tighter drop-shadow-2xl">
                        {/* First line of heading */}
                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {headingWords1.map((word, i) => (
                                <span
                                    key={i}
                                    className={`inline-block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                                        }`}
                                    style={{
                                        transitionDelay: `${0.3 + (i * 0.1)}s`,
                                        transitionTimingFunction: 'cubic-bezier(0.34, 1.2, 0.64, 1)'
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>

                        {/* Second line of heading */}
                        <div className="flex flex-wrap gap-x-3 gap-y-2 mt-2">
                            {headingWords2.map((word, i) => (
                                <span
                                    key={i}
                                    className={`inline-block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                                        }`}
                                    style={{
                                        transitionDelay: `${0.5 + (i * 0.1)}s`,
                                        transitionTimingFunction: 'cubic-bezier(0.34, 1.2, 0.64, 1)'
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </h1>

                    {/* Supporting Subtext with Character Animation */}
                    <p
                        className={`text-lg text-white/90 dm-sans max-w-3xl leading-relaxed drop-shadow-lg transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        style={{
                            transitionDelay: '0.8s',
                            transitionDuration: '0.8s'
                        }}
                    >
                        {subText}
                    </p>

                </div>
            </div>



            {/* Bottom Decorative Element */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-10"></div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                
                @keyframes scroll-down {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-scroll-down {
                    animation: scroll-down 1.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
