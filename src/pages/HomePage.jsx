import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import PassengerApp from '../components/PassengerApp';
import Services from '../components/Services';
import Safety from '../components/Safety';
import CTA from '../components/CTA';


function Home() {
    return (
        <>
            <Hero />
            <HowItWorks />
            <PassengerApp />
            <Services />
            <Safety />
            <CTA />

        </>
    );
}

export default Home;