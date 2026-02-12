import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
        { id: 'movie', label: "MOVIES & TV SHOWS", bg: '#16a34a', borderRadius: '1.5rem', width: 240, height: 240, clipPath: null, icon: MovieIcon },
        { id: 'lock', label: "SECURE & PRIVATE", bg: '#eab308', borderRadius: '1.5rem', width: 240, height: 240, clipPath: null, icon: LockIcon },
        { id: 'shirt', label: "FASHION & STYLE", bg: '#3b82f6', borderRadius: '50%', width: 240, height: 240, clipPath: null, icon: TshirtIcon },
        { id: 'ghost', label: "GAMING REWARDS", bg: '#f97316', borderRadius: '0', width: 240, height: 240, clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)', icon: GhostIcon },
        { id: 'music', label: "MUSIC STREAMING", bg: '#a78bfa', borderRadius: '50%', width: 240, height: 240, clipPath: null, icon: MusicIcon },
    ];

    const [boxPositions, setBoxPositions] = useState([0, 1, 2, 3, 4]);
    const [isFading, setIsFading] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const containerRef = useRef(null);
    const slotRefs = useRef([]);
    const [slotPositions, setSlotPositions] = useState([]);

    // Frame Animation Refs
    const canvasRef = useRef(null);
    const framesRef = useRef([]);
    const frameCount = 97; // 189 - 93 + 1
    const startFrame = 93;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.4, 0.55],
        ['#000000', '#000000', '#ffffff']
    );

    // Section exit fade
    const sectionOpacity = useTransform(scrollYProgress, [0.95, 0.98], [1, 0]);

    // Text & Icons fade out when frames start
    const contentOpacity = useTransform(scrollYProgress, [0.80, 0.85], [1, 0]);
    const canvasOpacity = useTransform(scrollYProgress, [0.81, 0.86, 0.93, 0.98], [0, 1, 1, 0]);

    // Text Opacity Staggering - Sync with fly animation (Phase 4)
    const introOpacity = useTransform(scrollYProgress, [0.45, 0.48], [0, 1]); // Fun fact

    // Line 1: Music (Icon 0)
    const opacityL1 = useTransform(scrollYProgress, [0.60, 0.66], [0, 1]);
    const yL1 = useTransform(scrollYProgress, [0.60, 0.66], [30, 0]);

    // Line 2: Movie (Icon 1)
    const opacityL2 = useTransform(scrollYProgress, [0.64, 0.70], [0, 1]);
    const yL2 = useTransform(scrollYProgress, [0.64, 0.70], [30, 0]);

    // Line 3: Lock (Icon 2)
    const opacityL3 = useTransform(scrollYProgress, [0.68, 0.74], [0, 1]);
    const yL3 = useTransform(scrollYProgress, [0.68, 0.74], [30, 0]);

    // Line 4: Habits (Icons 3 & 4)
    const opacityL4 = useTransform(scrollYProgress, [0.72, 0.78], [0, 1]);
    const yL4 = useTransform(scrollYProgress, [0.72, 0.78], [30, 0]);

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
                setBoxPositions(prev => {
                    const newPositions = [...prev];
                    const pos1 = Math.floor(Math.random() * 5);
                    let pos2 = Math.floor(Math.random() * 5);
                    while (pos2 === pos1) {
                        pos2 = Math.floor(Math.random() * 5);
                    }
                    [newPositions[pos1], newPositions[pos2]] = [newPositions[pos2], newPositions[pos1]];
                    return newPositions;
                });
                setIsFading(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, [hasScrolled]);

    // Preload Frames
    useEffect(() => {
        const loadFrames = async () => {
            const framePromises = [];
            for (let i = 0; i < frameCount; i++) {
                const frameNumber = startFrame + i;
                const img = new Image();
                img.src = `/animation-image/frame_${String(frameNumber).padStart(4, '0')}.png`;
                framePromises.push(
                    new Promise((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(null);
                    })
                );
            }
            framesRef.current = await Promise.all(framePromises);
        };
        loadFrames();
    }, []);

    // Canvas GSAP Animation
    useEffect(() => {
        const renderFrame = (index) => {
            const canvas = canvasRef.current;
            const img = framesRef.current[index];
            if (!canvas || !img || !img.complete) return;

            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => {
                    // Start animation at 82% scroll, after content is fully in place
                    const phaseStart = 0.82;
                    const phaseEnd = 0.98;

                    if (self.progress < phaseStart) {
                        const canvas = canvasRef.current;
                        if (canvas) {
                            const ctx = canvas.getContext('2d');
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }
                        return;
                    }

                    if (self.progress > phaseEnd) return;

                    const relativeProgress = (self.progress - phaseStart) / (phaseEnd - phaseStart);
                    const frameIndex = Math.floor(relativeProgress * (frameCount - 1));
                    if (framesRef.current.length > 0) {
                        renderFrame(frameIndex);
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

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
        <section ref={containerRef} className="relative w-full" style={{ height: '1200vh', position: 'relative' }}>
            <motion.div
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
                style={{ backgroundColor, opacity: sectionOpacity }}
            >
                {/* Frame Animation Canvas Layer */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                    style={{ opacity: canvasOpacity }}
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </motion.div>

                {/* Initial Content */}
                <motion.div
                    className="text-center z-10 px-4"
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
                <motion.div
                    className="icon-group absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                    style={{ opacity: contentOpacity }}
                >
                    {featureData.map((item, index) => {
                        const positionIndex = boxPositions.indexOf(index);
                        const IconComponent = item.icon;

                        const cardDelay = positionIndex * 0.04;
                        const phase1Start = 0.05 + cardDelay;
                        const phase1End = 0.22 + cardDelay;
                        const phase2Start = 0.45;
                        const phase2End = 0.52;
                        const phase3Start = 0.52;
                        const phase3End = 0.62;
                        const flyOrder = index === 0 ? 0 : index;
                        const flyDelay = flyOrder * 0.03;
                        const phase4Start = 0.60 + flyDelay;
                        const phase4End = phase4Start + 0.08;

                        const initialPositions = [-520, -260, 0, 260, 520];
                        const rowPositions = [-520, -260, 0, 260, 520];
                        const condensedPositions = [-180, -90, 0, 90, 180];
                        const targetPos = slotPositions[index] || { x: 0, y: 0 };

                        const boxX = useTransform(
                            scrollYProgress,
                            [0, phase1Start, phase1End, phase2End, phase3Start, phase3End, phase4Start, phase4End],
                            [
                                initialPositions[positionIndex],
                                initialPositions[positionIndex],
                                rowPositions[positionIndex],
                                rowPositions[positionIndex],
                                rowPositions[positionIndex],
                                condensedPositions[positionIndex],
                                condensedPositions[positionIndex],
                                targetPos.x
                            ]
                        );

                        const boxY = useTransform(
                            scrollYProgress,
                            [0, phase1Start, phase1End, phase2Start, phase2End, phase3Start, phase3End, phase4Start, phase4End],
                            [
                                230,
                                230,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                targetPos.y
                            ]
                        );

                        const boxScale = useTransform(
                            scrollYProgress,
                            [0, phase1End, phase2End, phase3Start, phase3End, phase4Start, phase4End],
                            [
                                1,
                                1,
                                1,
                                1,
                                0.5,
                                0.5,
                                0.35
                            ]
                        );

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute flex items-center justify-center overflow-hidden border-[3px] border-black shadow-xl"
                                style={{
                                    x: boxX,
                                    y: boxY,
                                    scale: boxScale,
                                    width: item.width,
                                    height: item.height,
                                    background: item.bg,
                                    borderRadius: item.borderRadius,
                                    clipPath: item.clipPath,
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
                </motion.div>

                {/* Main Text Section */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center px-8 z-20"
                    style={{
                        pointerEvents: 'none',
                        opacity: contentOpacity
                    }}
                >
                    <div className="text-center max-w-7xl">
                        <motion.div style={{ opacity: introOpacity }}>
                            <p className="text-sm text-black/50 mb-4 font-bold tracking-[0.2em] uppercase">
                                Here's a fun fact:
                            </p>
                            <p className="text-sm text-black/50 mb-12 font-bold tracking-[0.2em] uppercase">
                                Today, you are the product
                            </p>
                        </motion.div>

                        <div className="text-4xl md:text-7xl lg:text-[6rem] font-black text-black tracking-tighter leading-[1.1] text-center flex flex-col items-center">
                            {/* Line 1: Music */}
                            <motion.div style={{ opacity: opacityL1, y: yL1 }} className="flex items-center justify-center gap-x-3 whitespace-nowrap mb-2">
                                <span>Your favorite</span>
                                <span
                                    ref={el => slotRefs.current[0] = el}
                                    className="w-[100px] h-[60px] inline-block"
                                ></span>
                                <span>songs.</span>
                            </motion.div>

                            {/* Line 2: Movie */}
                            <motion.div style={{ opacity: opacityL2, y: yL2 }} className="flex items-center justify-center gap-x-3 whitespace-nowrap mb-2">
                                <span>That</span>
                                <span
                                    ref={el => slotRefs.current[1] = el}
                                    className="w-[100px] h-[60px] inline-block"
                                ></span>
                                <span>must-see movie.</span>
                            </motion.div>

                            {/* Line 3: Lock */}
                            <motion.div style={{ opacity: opacityL3, y: yL3 }} className="flex items-center justify-center gap-x-3 whitespace-nowrap mb-2">
                                <span>Your top</span>
                                <span
                                    ref={el => slotRefs.current[2] = el}
                                    className="w-[100px] h-[60px] inline-block"
                                ></span>
                                <span>interests and</span>
                            </motion.div>

                            {/* Line 4: Shirt and Ghost */}
                            <motion.div style={{ opacity: opacityL4, y: yL4 }} className="flex items-center justify-center gap-x-3 whitespace-nowrap">
                                <span>all your shopping</span>
                                <span
                                    ref={el => slotRefs.current[3] = el}
                                    className="w-[100px] h-[60px] inline-block"
                                ></span>
                                <span
                                    ref={el => slotRefs.current[4] = el}
                                    className="w-[100px] h-[60px] inline-block"
                                ></span>
                                <span>habits.</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
