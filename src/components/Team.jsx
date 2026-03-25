import React from 'react';

const Team = () => {
    const teamMembers = [
        {
            name: 'Jaxson',
            role: 'Chief Executive Officer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Kadin',
            role: 'Chief Product officer',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Ahmad',
            role: 'Head of engineering',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
        },
        {
            name: 'Jakob',
            role: 'Head Of Operations',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop'
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-20">
                    <div className="flex-1">
                        <span className="text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block mb-4">
                            The team
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black audiowide-regular uppercase text-gray-900 leading-tight">
                            People who care about <br className="hidden xs:block" />
                            getting this right.
                        </h2>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center group">
                            {/* Circle Image Container */}
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8">
                                <div className="absolute inset-0 bg-[#FF161F]/10 rounded-full scale-105 blur-2xl group-hover:bg-[#FF161F]/20 transition-all duration-500"></div>
                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-100 shadow-xl group-hover:border-[#FF161F]/50 transition-all duration-500">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black audiowide-regular uppercase text-gray-900">
                                    {member.name}
                                </h3>
                                <p className="text-[#FF161F] font-bold tracking-widest uppercase text-[10px] sm:text-xs dm-sans">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="flex justify-center">
                    <a
                        href="/contact"
                        className="relative overflow-hidden group inline-block"
                    >
                        <div className="relative px-8 py-3 font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF161F] to-[#AD343E] text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-red-500/20 active:scale-95">
                            Get In touch
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Team;
