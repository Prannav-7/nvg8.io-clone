import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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
        <rect x="25" y="45" width="50" height="40" rx="4" />
        <path d="M35 45V30c0-8.3 6.7-15 15-15s15 6.7 15 15v15h-8V30c0-3.9-3.1-7-7-7s-7 3.1-7 7v15h-8z" />
    </svg>
);

const TshirtIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M20 25l15-10 15 10 15-10 15 10v20l-10 5v35h-40v-35l-10-5z" />
    </svg>
);

const GhostIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M20 50c0-16.6 13.4-30 30-30s30 13.4 30 30v35l-7.5-7.5-7.5 7.5-7.5-7.5-7.5 7.5-7.5-7.5-7.5 7.5V50z" />
        <circle cx="40" cy="45" r="5" fill="black" />
        <circle cx="60" cy="45" r="5" fill="black" />
    </svg>
);

const MusicIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <circle cx="35" cy="75" r="12" />
        <circle cx="75" cy="65" r="12" />
        <path d="M47 75V25l40-10v50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M47 35l40-10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Hero = () => {
    const featureData = [
        { id: 'music', label: "MUSIC STREAMING", bg: '#a78bfa', borderRadius: '50%', icon: MusicIcon },
        { id: 'movie', label: "MOVIES & TV SHOWS", bg: '#16a34a', borderRadius: '1.5rem', icon: MovieIcon },
        { id: 'lock', label: "SECURE & PRIVATE", bg: '#eab308', borderRadius: '1.5rem', icon: LockIcon },
        { id: 'shirt', label: "FASHION & STYLE", bg: '#3b82f6', borderRadius: '1.5rem', icon: TshirtIcon },
        { id: 'ghost', label: "GAMING REWARDS", bg: '#f97316', borderRadius: '2rem', icon: GhostIcon },
    ];

    const [boxPositions, setBoxPositions] = useState([0, 1, 2, 3, 4]);
    const [isFading, setIsFading] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const containerRef = useRef(null);
    const slotRefs = useRef([]);
    const [slotPositions, setSlotPositions] = useState([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 0.65],
        ['#000000', '#000000', '#ffffff']
    );

    // Track scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initial shuffle effect
    useEffect(() => {
        if (hasScrolled) return;

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setBoxPositions(prev => [...prev].sort(() => Math.random() - 0.5));
                setIsFading(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, [hasScrolled]);

    // Measure slot positions
    useEffect(() => {
        const updatePositions = () => {
            const positions = slotRefs.current.map(ref => {
                if (!ref) return { x: 0, y: 0 };
                const rect = ref.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                return {
                    x: centerX - window.innerWidth / 2,
                    y: centerY - window.innerHeight / 2
                };
            });
            setSlotPositions(positions);
        };

        updatePositions();
        window.addEventListener('resize', updatePositions);
        return () => window.removeEventListener('resize', updatePositions);
    }, [hasScrolled]);

    return (
        <section ref={containerRef} className="relative w-full" style={{ height: '800vh' }}>
            <motion.div
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
                style={{ backgroundColor }}
            >
                {/* Initial Content */}
                <motion.div
                    className="text-center z-10 px-4 mb-24"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
                        y: useTransform(scrollYProgress, [0, 0.15], [0, -50]),
                    }}
                >
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                        Your data runs the world
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        Start earning from it today.
                    </p>
                </motion.div>

                {/* Icons Layer */}
                <div className="icon-group absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    {featureData.map((item, index) => {
                        const positionIndex = boxPositions.indexOf(index);
                        const IconComponent = item.icon;

                        // Animation Phases
                        const phase1End = 0.25; // Convergence
                        const phase2End = 0.6; // Step Back (Shrink & Down)
                        const phase3Start = 0.65;
                        const phase3End = 0.9; // Fly to slots

                        // Base positions - tight consistent spacing
                        const horizontalPositions = [-640, -320, 0, 320, 640];
                        const widePositions = [-630, -320, 0, 320, 640]; // Same as horizontal for consistent gap

                        // Target Slot Position
                        const targetPos = slotPositions[index] || { x: 0, y: 0 };

                        // X interpolation
                        const boxX = useTransform(
                            scrollYProgress,
                            [0, phase1End, phase2End, phase3Start, phase3End],
                            [
                                widePositions[positionIndex] || 0,
                                horizontalPositions[positionIndex] || 0,
                                horizontalPositions[positionIndex] || 0,
                                horizontalPositions[positionIndex] || 0,
                                targetPos.x
                            ]
                        );

                        // Y interpolation (Rise from bottom -> Equal Middle -> Step Back -> Slot)
                        const boxY = useTransform(
                            scrollYProgress,
                            [0, phase1End, phase2End, phase3Start, phase3End],
                            [280, 0, 120, 120, targetPos.y]
                        );

                        // Size interpolation (Stay same size until flying to text)
                        const boxScale = useTransform(
                            scrollYProgress,
                            [0, phase1End, phase2End, phase3Start, phase3End],
                            [1, 1, 1, 1, 0.4] // Constant size until text phase
                        );

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute flex items-center justify-center overflow-hidden border-[3px] border-black shadow-xl"
                                style={{
                                    x: boxX,
                                    y: boxY,
                                    scale: boxScale,
                                    width: 280,
                                    height: 280,
                                    background: item.bg,
                                    borderRadius: item.borderRadius,
                                    willChange: 'transform',
                                }}
                                animate={{
                                    opacity: !hasScrolled && isFading ? 0 : 1,
                                }}
                            >
                                <div className="w-[60%] h-[60%] text-black flex items-center justify-center">
                                    <IconComponent />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Main Text Section */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center px-8 z-20"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.65, 0.75], [0, 1]),
                        pointerEvents: 'none',
                    }}
                >
                    <div className="text-center max-w-7xl">
                        <motion.p className="text-sm text-black/50 mb-4 font-bold tracking-[0.2em] uppercase">
                            Here's a fun fact:
                        </motion.p>
                        <motion.p className="text-sm text-black/50 mb-12 font-bold tracking-[0.2em] uppercase">
                            Today, you are the product
                        </motion.p>

                        <div className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-black tracking-tight leading-[1.2] text-center">
                            {/* Line 1: Music */}
                            <div className="flex items-center justify-center gap-x-4 flex-wrap mb-4">
                                <span>Your favorite</span>
                                <span
                                    ref={el => slotRefs.current[0] = el}
                                    className="w-[120px] h-[60px] inline-block" // Expanded gap
                                ></span>
                                <span>songs.</span>
                            </div>

                            {/* Line 2: Movie */}
                            <div className="flex items-center justify-center gap-x-4 flex-wrap mb-4">
                                <span>That</span>
                                <span
                                    ref={el => slotRefs.current[1] = el}
                                    className="w-[120px] h-[60px] inline-block" // Expanded gap
                                ></span>
                                <span>must-see movie.</span>
                            </div>

                            {/* Line 3: Lock */}
                            <div className="flex items-center justify-center gap-x-4 flex-wrap mb-4">
                                <span>Your top</span>
                                <span
                                    ref={el => slotRefs.current[2] = el}
                                    className="w-[120px] h-[60px] inline-block" // Expanded gap
                                ></span>
                                <span>interests and</span>
                            </div>

                            {/* Line 4: Shirt and Ghost */}
                            <div className="flex items-center justify-center gap-x-4 gap-y-4 flex-wrap">
                                <span>all your shopping</span>
                                <span
                                    ref={el => slotRefs.current[3] = el}
                                    className="w-[120px] h-[60px] inline-block" // Expanded gap
                                ></span>
                                <span
                                    ref={el => slotRefs.current[4] = el}
                                    className="w-[120px] h-[60px] inline-block" // Expanded gap
                                ></span>
                                <span>habits.</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
