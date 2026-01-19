import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// SVG Icon Components
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
    const boxData = [
        { bg: '#16a34a', borderRadius: '1.5rem', icon: MovieIcon },
        { bg: '#eab308', borderRadius: '1.5rem', icon: LockIcon },
        { bg: '#3b82f6', borderRadius: '50%', icon: TshirtIcon },
        { bg: '#f97316', borderRadius: '2rem', icon: GhostIcon },
        { bg: '#a78bfa', borderRadius: '50%', icon: MusicIcon },
    ];

    const [boxPositions, setBoxPositions] = useState([0, 1, 2, 3, 4]);
    const [isFading, setIsFading] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.05 && !hasScrolled) {
                setHasScrolled(true);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, hasScrolled]);

    useEffect(() => {
        if (hasScrolled) return;

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setBoxPositions(prev => [prev[4], prev[0], prev[1], prev[2], prev[3]]);
                setTimeout(() => setIsFading(false), 50);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, [hasScrolled]);

    // Background color transition - only changes at the very end when icons are tiny
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.85, 0.95, 1],
        ['#000000', '#000000', '#1a1a1a', '#ffffff']
    );

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative"
            style={{ height: '500vh' }}  // Extended height for longer shrinking animation
        >
            <motion.div
                className="sticky top-0 h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
                style={{ backgroundColor }}
            >
                {/* Heading - Fades out on scroll */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center z-20 absolute top-32"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
                    }}
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white leading-tight">
                        Your data runs the world
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        Start earning from it today.
                    </p>
                </motion.div>

                {/* Icons Container - All icons wrapped in one div */}
                <div className="icon-group absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2, 3, 4].map((positionIndex) => {
                        const boxIndex = boxPositions[positionIndex];
                        const currentBox = boxData[boxIndex];
                        const IconComponent = currentBox.icon;

                        // Spacing with visible gaps like reference (~15-20px between icons)
                        // Icons are 290px * 0.85 = 247px, so need 265-270px spacing for visible gaps
                      const horizontalPosition = [-600, -300, 0, 300, 600];

                        // When converged, space them out in a row (smaller gaps since they're smaller)
                        const convergedPosition = [-280, -140, 0, 140, 280];

                        // Staggered timing - each icon moves at different scroll progress (left to right)
                        const staggerDelay = positionIndex * 0.08; // 0, 0.08, 0.16, 0.24, 0.32

                        // Phase 1: Move to middle (staggered)
                        const phase1Start = 0.1 + staggerDelay;
                        const phase1End = 0.25 + staggerDelay;

                        // Phase 2: Converge horizontally (0.35 to 0.5)
                        const phase2Start = 0.35;
                        const phase2End = 0.5;

                        // Phase 3: Gradual shrinking (0.5 to 0.9)
                        const shrinkStart = 0.5;
                        const shrinkEnd = 0.9;

                        // Horizontal position - stays same in phase 1, converges to center in phase 2
                        // Then scales proportionally with size to maintain small gaps
                        // Use same spacing as start to maintain consistent gaps (no overlap!)
                        const baseConvergedPosition = [-530, -265, 0, 265, 530];

                        // Scale horizontal spacing proportionally with icon size
                        // This maintains consistent VISUAL gaps throughout the animation
                        const scaledSpacing = useTransform(
                            scrollYProgress,
                            [0, phase2End, shrinkStart, 0.65, 0.75, shrinkEnd, 0.95, 1],
                            [
                                horizontalPosition[positionIndex],     // Start spread out
                                baseConvergedPosition[positionIndex],  // Converge to this spacing
                                baseConvergedPosition[positionIndex] * 1.0,   // Maintain (scale 0.8)
                                baseConvergedPosition[positionIndex] * 0.75,  // Shrink spacing (scale 0.6)
                                baseConvergedPosition[positionIndex] * 0.5,   // More shrink (scale 0.4)
                                baseConvergedPosition[positionIndex] * 0.31,  // Even smaller (scale 0.25)
                                baseConvergedPosition[positionIndex] * 0.23,  // Final (scale 0.18)
                                baseConvergedPosition[positionIndex] * 0.23   // Maintain final
                            ]
                        );

                        const boxX = scaledSpacing;

                        // Vertical movement - two phases
                        // Phase 1: Move to middle one by one
                        // Phase 2: STAY at middle while converging and shrinking
                        const boxY = useTransform(
                            scrollYProgress,
                            [0, phase1Start, phase1End, 1],
                            [
                                200,    // Start at bottom
                                200,    // Wait until stagger time
                                0,      // Move to middle
                                0       // STAY at middle (no top movement)
                            ]
                        );

                        // Scaling - larger icons, shrink to small at top
                        const boxScale = useTransform(
                            scrollYProgress,
                            [0, phase1Start, phase1End, phase2Start, phase2End, shrinkStart, 0.65, 0.75, shrinkEnd, 0.95, 1],
                            [
                                0.85,  // Start with normal size
                                0.85,  // Same size
                                0.85,  // Stay same in middle
                                0.85,  // Stay before converging
                                0.8,   // Slightly smaller after converge
                                0.8,   // Maintain size
                                0.6,   // Start gradual shrinking
                                0.4,   // Continue shrinking
                                0.25,  // More shrinking
                                0.18,  // Very small at top
                                0.18   // Final small size
                            ]
                        );

                        return (
                            <motion.div
                                key={boxIndex}
                                className="absolute flex items-center justify-center"
                                style={{
                                    width: '290px', // Reduced size to prevent overlap
                                    height: '290px',
                                    background: currentBox.bg,
                                    borderRadius: currentBox.borderRadius,
                                    x: boxX,
                                    y: boxY,
                                    scale: boxScale,
                                    willChange: 'transform',
                                }}
                                animate={{
                                    opacity: !hasScrolled && isFading ? 0 : 1,
                                    scale: !hasScrolled && isFading ? 0.7 : 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut'
                                }}
                            >
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
            </motion.div>
        </section>
    );
};

export default Hero;
