import React from 'react'

const Mission = () => {
    return (

        < section className="bg-white py-16 overflow-hidden" >
            <div className="max-w-8xl mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <div className="flex-1">
                        <p className="text-[#FF161F] font-bold tracking-widest uppercase text-xs sm:text-sm block dm-sans mb-4">
                            Our Mission
                        </p>
                        <h2 className="text-5xl lg:text-6xl font-black audiowide-regular uppercase text-gray-900 leading-none">
                            Fair mobility <br /> for everyone <br /> on the road.
                        </h2>
                    </div>
                    <div className="flex-1">
                        <p className="text-xl text-gray-600 dm-sans leading-relaxed">
                            Riden exists to connect riders with drivers in a way that's honest, safe, and genuinely useful — not extractive. We believe a platform should work for the people using it, not just the people running it.  </p>

                        <p className="text-xl text-gray-600 dm-sans leading-relaxed">
                            That means transparent fares. Verified drivers. Fair commissions. A support system that actually responds. And an app that gets out of the way and lets you get where you're going.  </p>

                    </div>


                </div>
            </div>
        </section >
    )
}

export default Mission