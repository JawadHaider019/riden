import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Safety from '../components/Safety';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';



function Home() {
    return (
        <>
            <Hero />
            <HowItWorks />
            <Features />
            <Safety />
            <CTA />
            <FAQ />

        </>
    );
}

export default Home;
