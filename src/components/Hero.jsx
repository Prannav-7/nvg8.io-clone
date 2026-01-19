import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// SVG Icon Components - Black silhouettes without backgrounds
const MovieIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="15" y="30" width="70" height="45" rx="4" />
        <rect x="12" y="25" width="12" height="12" rx="3" />
        <rect x="30" y="25" width="12" height="12" rx="3" />
        <rect x="48" y="25" width="12" height="12" rx="3" />
        <rect x="66" y="25" width="12" height="12" rx="3" />
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="28" y="50" width="44" height="38" rx="5" />
        <path d="M35 50V37c0-8.3 6.7-15 15-15s15 6.7 15 15v13" fill="none" stroke="currentColor" strokeWidth="8" />
    </svg>
);

const TshirtIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 28c-6 0-10 4-10 4L25 20 10 32l10 18v28h60V50l10-18-15-12-15 12s-4-4-10-4z" />
    </svg>
);

const GhostIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 18C32 18 20 30 20 45v38l10-7 10 7 10-7 10 7 10-7 10 7V45C80 30 68 18 50 18z" />
        <circle cx="38" cy="45" r="5" fill="#f97316" />
        <circle cx="62" cy="45" r="5" fill="#f97316" />
    </svg>
);

const MusicIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <ellipse cx="32" cy="72" rx="15" ry="10" />
        <rect x="42" y="25" width="8" height="50" />
        <path d="M50 25c0 0 25-8 25 12v8c0 0-20-10-25-8z" />
    </svg>
);

const Hero = () => {
    // Box configurations with colors, icons, and styling - matching reference site
    const boxData = [
        { bg: '#16a34a', borderRadius: '1.5rem', icon: MovieIcon }, // Green - Movie
        { bg: '#eab308', borderRadius: '1.5rem', icon: LockIcon }, // Yellow - Lock
        { bg: '#3b82f6', borderRadius: '50%', icon: TshirtIcon },  // Blue - Tshirt
        { bg: '#f97316', borderRadius: '2rem', icon: GhostIcon }, // Orange - Ghost
        { bg: '#a78bfa', borderRadius: '50%', icon: MusicIcon },  // Purple - Music
    ];

    // State to track which box is in which position (0-4 indices)
    const [boxPositions, setBoxPositions] = useState([0, 1, 2, 3, 4]);

    // State for quick fade effect
    const [isFading, setIsFading] = useState(false);

    // State to track if user has scrolled
    const [hasScrolled, setHasScrolled] = useState(false);

    // Scroll-based animation reference
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Detect scroll and stop shuffle
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.05 && !hasScrolled) {
                setHasScrolled(true); // Stop shuffle when user scrolls
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, hasScrolled]);

    // Shuffle animation - runs only when user hasn't scrolled yet
    useEffect(() => {
        if (hasScrolled) return; // Stop if user scrolled

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setBoxPositions(prev => {
                    return [prev[4], prev[0], prev[1], prev[2], prev[3]];
                });
                setTimeout(() => {
                    setIsFading(false);
                }, 50);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, [hasScrolled]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative overflow-hidden bg-black"
            style={{ height: '300vh' }} // Taller section to prevent jumping to next section
        >
            {/* Sticky container that stays in viewport */}
            <div className="sticky top-0 h-screen w-screen flex flex-col items-center justify-center px-6" style={{ willChange: 'transform' }}>
                {/* Centered Heading and Button */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center z-20 mb-auto mt-32"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white leading-tight">
                        Your data runs the world
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        Start earning from it today.
                    </p>
                </motion.div>

                {/* Bottom Icon Boxes Container - Staggered One-by-One Scroll Effect */}
                <div className="w-full max-w-[96vw] flex items-end justify-center gap-2 md:gap-3 pb-4 z-10 px-2">
                    {[0, 1, 2, 3, 4].map((positionIndex) => {
                        const boxIndex = boxPositions[positionIndex];
                        const currentBox = boxData[boxIndex];
                        const IconComponent = currentBox.icon;

                        // Smooth staggered animation - boxes move one by one
                        // Slower timing to prevent stuttering
                        const delay = positionIndex * 0.08; // Closer timing for smoother cascade
                        const animDuration = 0.6; // Longer, smoother movement

                        const boxY = useTransform(
                            scrollYProgress,
                            [delay, delay + animDuration],
                            [0, -500] // Smooth upward movement
                        );
                        const boxScale = useTransform(
                            scrollYProgress,
                            [delay, delay + animDuration * 0.7, delay + animDuration],
                            [1, 0.9, 0.7] // Gradual smooth shrink
                        );

                        return (
                            <motion.div
                                key={boxIndex}
                                className="relative flex items-center justify-center overflow-hidden flex-1"
                                style={{
                                    minWidth: '160px',
                                    maxWidth: '320px',
                                    height: 'clamp(300px, 22vw, 380px)',
                                    background: currentBox.bg,
                                    borderRadius: currentBox.borderRadius,
                                    y: boxY,
                                    scale: boxScale,
                                    willChange: 'transform', // Performance hint
                                }}
                                animate={{
                                    opacity: !hasScrolled && isFading ? 0 : 1, // Fade only before scroll
                                    scale: !hasScrolled && isFading ? 0.7 : 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut'
                                }}
                            >
                                {/* Icon permanently attached to this box - no animation */}
                                <div
                                    className="w-[60%] h-[60%] text-black flex items-center justify-center"
                                    style={{
                                        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
                                    }}
                                >
                                    <IconComponent />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div> {/* Close sticky container */}
        </section>
    );
};

export default Hero;
