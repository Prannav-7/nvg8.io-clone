import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DiagonalShapes = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // PHASE 1: Set initial position for outgoing bars
            gsap.set('.diagonal-bar-moving', { x: '0%', opacity: 1 });
            gsap.set('.incoming-bar-moving', { x: '-120%', opacity: 1 });

            // PHASE 2: Set colored shapes to start ON-SCREEN but HIDDEN
            gsap.set('.colored-shape-moving', { x: '0%', opacity: 0 });
            gsap.set('.pill-text', { y: 50, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=400%', // Adjusted for smoother pacing
                    pin: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Background color transition at 60% scroll mark
                        if (self.progress > 0.6) {
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
                }
            });

            // ========================================
            // PHASE 1: Diagonal shapes animation (0% - 50%)
            // ========================================

            // Outgoing bars: slide across and off screen to the right
            tl.to('.diagonal-bar-moving', {
                x: '120%',
                duration: 1,
                stagger: {
                    each: 0.15,
                    from: 'start'
                },
                ease: 'power1.inOut'
            }, 0);

            // Incoming bars: slide in from the left and continue all the way across
            tl.to('.incoming-bar-moving', {
                x: '120%',
                duration: 1,
                stagger: {
                    each: 0.15,
                    from: 'start'
                },
                ease: 'power1.inOut'
            }, 0);

            // ========================================
            // TRANSITION: Fade out Phase 1, Fade in Phase 2 (50%)
            // ========================================

            // Fade out first set of diagonal shapes
            tl.to(['.diagonal-bar-moving', '.incoming-bar-moving'], {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            }, 1.0);

            // Fade in colored shapes (make them visible)
            tl.to('.colored-shape-moving', {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut'
            }, 1.0);

            // ========================================
            // PHASE 2: Colored diagonal shapes animation (50% - 100%)
            // ========================================

            // Animate colored shapes - slide from ON-SCREEN (0%) to OFF-SCREEN RIGHT (120%)
            tl.to('.colored-shape-moving', {
                x: '120%', // Move to the right
                ease: 'expo.inOut',
                stagger: 0.1, // Stagger each shape
                force3D: true,
                duration: 1.5,
            }, 1.0); // Start at same time as fade-in

            // Text reveal animation
            tl.to('.pill-text', {
                y: 0,
                opacity: 1,
                ease: 'power4.out',
                duration: 0.8,
                force3D: true,
            }, '-=0.5');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-white"
            style={{ height: '100vh', position: 'relative' }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Outgoing Diagonal Shapes */}
                {/* Lime Green Bar - Top */}
                <div
                    className="diagonal-bar-moving absolute top-0 left-0 w-full h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #c6fe69, #a8e050)',
                        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'
                    }}
                />

                {/* Orange Bar - Top Right Overlap */}
                <div
                    className="diagonal-bar-moving absolute top-0 right-0 w-3/4 h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #ff6b35, #ff8c5a)',
                        clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 7% 100%)'
                    }}
                />

                {/* Purple Bar - Middle */}
                <div
                    className="diagonal-bar-moving absolute top-[30vh] left-0 w-full h-[50vh]"
                    style={{
                        background: 'linear-gradient(to right, #7c7aff, #9d9bff)',
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 10% 100%)'
                    }}
                />

                {/* Light Blue Bar - Left Side Overlap */}
                <div
                    className="diagonal-bar-moving absolute top-[30vh] left-0 w-2/3 h-[50vh]"
                    style={{
                        background: 'linear-gradient(to right, #93c5fd, #bfdbfe)',
                        clipPath: 'polygon(0 0, 92% 0, 65% 100%, 0 100%)'
                    }}
                />

                {/* Yellow Bar - Bottom */}
                <div
                    className="diagonal-bar-moving absolute bottom-0 left-0 w-full h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #fbbf24, #fcd34d)',
                        clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)'
                    }}
                />

                {/* Coral Bar - Bottom Right Overlap */}
                <div
                    className="diagonal-bar-moving absolute bottom-0 right-0 w-3/4 h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #fb923c, #fdba74)',
                        clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 12% 100%)'
                    }}
                />

                {/* Incoming Diagonal Shapes */}
                {/* Lime Green Bar */}
                <div
                    className="incoming-bar-moving absolute top-0 left-0 w-[150%] h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #c6fe69, #a8e050)',
                        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'
                    }}
                />

                {/* Orange Bar */}
                <div
                    className="incoming-bar-moving absolute top-0 right-0 w-[100%] h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #ff6b35, #ff8c5a)',
                        clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 7% 100%)'
                    }}
                />

                {/* Purple Bar */}
                <div
                    className="incoming-bar-moving absolute top-[30vh] left-0 w-[150%] h-[50vh]"
                    style={{
                        background: 'linear-gradient(to right, #7c7aff, #9d9bff)',
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 10% 100%)'
                    }}
                />

                {/* Light Blue Bar */}
                <div
                    className="incoming-bar-moving absolute top-[30vh] left-0 w-[90%] h-[50vh]"
                    style={{
                        background: 'linear-gradient(to right, #93c5fd, #bfdbfe)',
                        clipPath: 'polygon(0 0, 92% 0, 65% 100%, 0 100%)'
                    }}
                />

                {/* Yellow Bar */}
                <div
                    className="incoming-bar-moving absolute bottom-0 left-0 w-[150%] h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #fbbf24, #fcd34d)',
                        clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)'
                    }}
                />

                {/* Coral Bar */}
                <div
                    className="incoming-bar-moving absolute bottom-0 right-0 w-[100%] h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #fb923c, #fdba74)',
                        clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 12% 100%)'
                    }}
                />

                {/* PHASE 2: Colored Arrow/Chevron Shape Elements (Like Reference) */}
                {/* Orange Arrow - Row 1 */}
                <div
                    className="colored-shape-moving absolute left-0 w-[160vw] h-[20vh]"
                    style={{
                        top: 0,
                        background: '#FF5E1A',
                        clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
                        willChange: 'transform',
                        zIndex: 20,
                    }}
                />

                {/* Purple Arrow - Row 2 */}
                <div
                    className="colored-shape-moving absolute left-0 w-[160vw] h-[20vh]"
                    style={{
                        top: '20vh',
                        background: '#8257FF',
                        clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
                        willChange: 'transform',
                        zIndex: 21,
                    }}
                />

                {/* Green Arrow - Row 3 */}
                <div
                    className="colored-shape-moving absolute left-0 w-[160vw] h-[20vh]"
                    style={{
                        top: '40vh',
                        background: '#A3E635',
                        clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
                        willChange: 'transform',
                        zIndex: 22,
                    }}
                />

                {/* Cyan Arrow - Row 4 */}
                <div
                    className="colored-shape-moving absolute left-0 w-[160vw] h-[20vh]"
                    style={{
                        top: '60vh',
                        background: '#22D3EE',
                        clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
                        willChange: 'transform',
                        zIndex: 23,
                    }}
                />

                {/* Yellow Arrow - Row 5 */}
                <div
                    className="colored-shape-moving absolute left-0 w-[160vw] h-[20vh]"
                    style={{
                        top: '80vh',
                        background: '#FACC15',
                        clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)',
                        willChange: 'transform',
                        zIndex: 24,
                    }}
                />

                {/* Reveal Text */}
                <div className="pill-text absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 50 }}>
                    <h2 className="text-6xl md:text-8xl font-bold text-white text-center px-8 leading-tight">
                        Experience the
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                            Smooth Transition
                        </span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default DiagonalShapes;
