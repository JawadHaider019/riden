import React from 'react';

const HeroSection = ({
    bgImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    smallHeading = "Our Services",
    mainHeading1 = "Premium Mobility Solutions",
    mainHeading2 = "Premium Mobility Solutions",
    subText = "Experience the next generation of transportation with Riden's world-class fleet and technology."
}) => {
    return (
        <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background Image */}
            <div
                className="absolute inset-0 z-0 scale-105 animate-subtle-zoom"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Advanced Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-8xl mx-auto">
                <div className="max-w-5xl  px-6 sm:px-8 lg:px-16 space-y-6 lg:space-y-8">

                    {/* Small Heading / Tagline */}
                    <div className="inline-block px-4 py-1 border border-[#FF4D4D] rounded-full bg-white/5 backdrop-blur-sm animate-fade-in-down">
                        <span className="text-[#FF4D4D] font-black tracking-[0.3em] uppercase text-xs sm:text-sm block">
                            {smallHeading}
                        </span>
                    </div>

                    {/* Main High-Impact Heading */}
                    <h1 className="text-5xl sm:text-6xl font-black audiowide-regular uppercase text-white leading-none tracking-tighter drop-shadow-2xl animate-fade-in">
                        {mainHeading1} <br />
                        {mainHeading2}
                    </h1>


                    {/* Supporting Subtext */}
                    <p className="text-lg text-white/90 dm-sans max-w-3xl  leading-relaxed drop-shadow-lg animate-fade-in-up">
                        {subText}
                    </p>

                </div>
            </div>

            {/* Bottom Decorative Element (Optional) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-10"></div>
        </section>
    );
};

export default HeroSection;

// Note: Ensure your tailwind.config.js or global CSS includes these subtle animations if desired
/*
@keyframes subtle-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-subtle-zoom { animation: subtle-zoom 20s infinite alternate; }
.animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out 0.2s forwards; }
.animate-fade-in { animation: fade-in 1s ease-out forwards; }
*/
