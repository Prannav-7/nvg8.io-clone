import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingShapes = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    scrub: 1,
                }
            });

            // Phase 1: Slide diagonal bars to the right (0-60%)
            tl.to('.diagonal-bar', {
                x: '50%',
                duration: 0.6,
                stagger: 0.03,
                ease: 'power1.inOut'
            }, 0);

            // Phase 2: Continue sliding completely off-screen (60-100%)
            tl.to('.diagonal-bar', {
                x: '150%',
                duration: 0.4,
                stagger: 0.03,
                ease: 'power2.in'
            }, 0.6);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-white"
            style={{ height: '200vh' }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Lime Green Bar - Top */}
                <div
                    className="diagonal-bar absolute top-0 left-0 w-full h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #c6fe69, #a8e050)',
                        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'
                    }}
                />

                {/* Orange Bar - Top Right Overlap */}
                <div
                    className="diagonal-bar absolute top-0 right-0 w-3/4 h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #ff6b35, #ff8c5a)',
                        clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 7% 100%)'
                    }}
                />

                {/* Purple Bar - Middle */}
                <div
                    className="diagonal-bar absolute top-[30vh] left-0 w-full h-[50vh]"
                    style={{
                        background: 'linear-gradient(to right, #7c7aff, #9d9bff)',
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 10% 100%)'
                    }}
                />

                {/* Light Blue Bar - Left Side Overlap */}
                <div
                    className="diagonal-bar absolute top-[30vh] left-0 w-2/3 h-[50vh]"
                    style={{
                        background: 'linear-gradient(to right, #93c5fd, #bfdbfe)',
                        clipPath: 'polygon(0 0, 92% 0, 65% 100%, 0 100%)'
                    }}
                />

                {/* Yellow Bar - Bottom */}
                <div
                    className="diagonal-bar absolute bottom-0 left-0 w-full h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #fbbf24, #fcd34d)',
                        clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)'
                    }}
                />

                {/* Coral Bar - Bottom Right Overlap */}
                <div
                    className="diagonal-bar absolute bottom-0 right-0 w-3/4 h-[45vh]"
                    style={{
                        background: 'linear-gradient(to right, #fb923c, #fdba74)',
                        clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 12% 100%)'
                    }}
                />
            </div>
        </section>
    );
};

export default LandingShapes;
