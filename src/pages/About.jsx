import React from 'react';
import HeroSection from '../components/HeroSection';
import aboutImage from '../assets/about.jpg';
import Mission from '../components/Mission';
import Believe from '../components/Believe';
import Team from '../components/Team';

const About = () => {
    return (
        <div className="pt-20">
            {/* Cinematic Hero Section */}
            <HeroSection
                smallHeading="Our story"
                mainHeading1="Built because getting"
                mainHeading2="around shouldn't be hard."
                subText="Riden started with a simple observation: people deserved a ride-hailing app that treated them fairly clear pricing, real safety, and a driver experience worth sticking with."
                bgImage={aboutImage}
            />

            <Mission />
            <Believe />
            <Team />
        </div>
    );
};

export default About;
