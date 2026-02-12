import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollStory from './components/ScrollStory';
import DiagonalShapes from './components/DiagonalShapes';
import PowerfulFeatures from './components/PowerfulFeatures';
import ProjectSection from './components/ProjectSection';
import NavigatorsSection from './components/NavigatorsSection';
import RewardsSection from './components/RewardsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
    useEffect(() => {
        // Initialize Lenis smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });

        // Connect Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="App relative" style={{ position: 'relative' }}>
            <Navbar />
            <Hero />
            <ScrollStory />
            <DiagonalShapes />
            <PowerfulFeatures />
            <ProjectSection />
            <NavigatorsSection />
            <RewardsSection />
            <FAQSection />
            <Footer />
        </div>
    );
}

export default App;
