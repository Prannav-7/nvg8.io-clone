import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollStory from './components/ScrollStory';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';

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
        <div className="App">
            <Navbar />
            <Hero />
            <ScrollStory />
            <Features />
            <About />
            <Contact />
        </div>
    );
}

export default App;
