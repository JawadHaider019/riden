import React, { useState, useEffect, useRef } from 'react';

const Mission = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-16 overflow-hidden">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side */}
                    <div className="flex-1">
                        <p
                            className={`text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block dm-sans mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                }`}
                        >
                            Our Mission
                        </p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black audiowide-regular uppercase text-gray-900 leading-none">
                            <span
                                className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                Fair mobility
                            </span>
                            <br />
                            <span
                                className={`inline-block transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                for everyone
                            </span>
                            <br />
                            <span
                                className={`inline-block transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                            >
                                on the road.
                            </span>
                        </h2>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 space-y-6">
                        <p
                            className={`text-xl text-gray-600 dm-sans leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '700ms' : '0s' }}
                        >
                            Riden exists to connect riders with drivers in a way that's honest, safe, and genuinely useful — not extractive. We believe a platform should work for the people using it, not just the people running it.
                        </p>

                        <p
                            className={`text-xl text-gray-600 dm-sans leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: isVisible ? '900ms' : '0s' }}
                        >
                            That means transparent fares. Verified drivers. Fair commissions. A support system that actually responds. And an app that gets out of the way and lets you get where you're going.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;