import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PillScrollAnimation = () => {
    const containerRef = useRef(null);
    const pillsRef = useRef([]);
    const textRef = useRef(null);

    // Pill colors as specified
    const pillColors = [
        '#FF5E1A', // Bright Orange
        '#8257FF', // Deep Lavender
        '#A3E635', // Lime Green
        '#22D3EE', // Electric Cyan
        '#FACC15', // Sunny Yellow
    ];

    useEffect(() => {
        const container = containerRef.current;
        const pills = pillsRef.current;
        const text = textRef.current;

        // Set initial state - pills start at 0% width (incomplete)
        gsap.set(pills, {
            scaleX: 0, // Start with no width
            transformOrigin: 'left center' // Grow from left to right
        });
        gsap.set(text, { y: 50, opacity: 0 });

        // Create the main timeline for pills animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2, // Physics-based lag for smoothness
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Background color transition at 50% scroll mark
                    if (self.progress > 0.5) {
                        gsap.to('body', {
                            backgroundColor: '#0B0B0B',
                            duration: 0.5,
                            ease: 'power2.inOut',
                        });
                    } else {
                        gsap.to('body', {
                            backgroundColor: '#F9F9F9',
                            duration: 0.5,
                            ease: 'power2.inOut',
                        });
                    }
                },
            },
        });

        // Animate pills - progressively complete from left to right
        tl.to(pills, {
            scaleX: 1, // Grow to full width (complete the shape)
            ease: 'expo.inOut', // Slow-fast-slow premium motion
            stagger: 0.1, // 0.1s staggered start for each bar
            force3D: true, // Hardware acceleration
            duration: 2,
        });

        // Text reveal animation
        tl.to(
            text,
            {
                y: 0,
                opacity: 1,
                ease: 'power4.out',
                duration: 1,
                force3D: true,
            },
            '-=0.5' // Start slightly before pills finish
        );

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-[300vh] w-full overflow-hidden bg-transparent"
        >
            {/* Pills Container - Pinned Section */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-start items-start overflow-hidden">
                {/* Pills - Each in separate row, starting incomplete */}
                {pillColors.map((color, index) => (
                    <div
                        key={index}
                        className="w-full flex items-center"
                        style={{
                            height: '20vh', // Each row is exactly 20vh
                            position: 'relative',
                        }}
                    >
                        <div
                            ref={(el) => (pillsRef.current[index] = el)}
                            className="pill"
                            style={{
                                width: '160vw',
                                height: '100%', // Fill the row height
                                backgroundColor: color,
                                borderRadius: '999px',
                                position: 'absolute',
                                left: 0,
                                willChange: 'transform',
                                zIndex: 5 + index, // Each pill has increasing z-index
                            }}
                        />
                    </div>
                ))}

                {/* Reveal Text */}
                <div
                    ref={textRef}
                    className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                    <h2 className="text-6xl md:text-8xl font-bold text-white text-center px-8 leading-tight">
                        Experience the
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                            Smooth Transition
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default PillScrollAnimation;
