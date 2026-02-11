import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingShapes = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const framesRef = useRef([]);
    const frameCount = 120; // frames from 70 to 189

    useEffect(() => {
        // Preload all frames
        const loadFrames = async () => {
            const framePromises = [];
            for (let i = 0; i < frameCount; i++) {
                const frameNumber = 70 + i;
                const img = new Image();
                const framePath = `/animation-image/frame_${String(frameNumber).padStart(4, '0')}.png`;
                img.src = framePath;
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

    useEffect(() => {
        if (!containerRef.current || framesRef.current.length === 0) return;

        // Create scroll-triggered animation
        const ctx = gsap.context(() => {
            gsap.to({}, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    onUpdate: (self) => {
                        // Map scroll progress (0-1) to frame index (0-119)
                        const frameIndex = Math.floor(self.progress * (frameCount - 1));
                        setCurrentFrame(frameIndex);
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [framesRef.current.length]);

    useEffect(() => {
        // Render current frame to canvas
        const canvas = canvasRef.current;
        if (!canvas || !framesRef.current[currentFrame]) return;

        const ctx = canvas.getContext('2d');
        const img = framesRef.current[currentFrame];

        if (img && img.complete) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        }
    }, [currentFrame]);

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden bg-black"
            style={{ height: '300vh', position: 'relative' }} // Extended height for scroll animation
        >
            {/* Frame Animation Canvas */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full object-contain"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    }}
                />
            </div>

            {/* Static Rectangular Blocks - Background/End State (hidden behind animation) */}
            <div className="absolute top-0 left-0 w-full h-screen opacity-0">
                {/* Purple Rectangle - Top Third */}
                <div
                    className="absolute top-0 right-0 w-1/2 h-[33.33vh] rounded-3xl"
                    style={{
                        background: 'linear-gradient(135deg, #7c7aff, #9d9bff)'
                    }}
                />

                {/* Lime Green Rectangle - Middle Third */}
                <div
                    className="absolute top-[33.33vh] right-0 w-1/2 h-[33.33vh] rounded-3xl"
                    style={{
                        background: 'linear-gradient(135deg, #c6fe69, #a8e050)'
                    }}
                />

                {/* Light Blue Rectangle - Bottom Third */}
                <div
                    className="absolute top-[66.66vh] right-0 w-1/2 h-[33.33vh] rounded-3xl"
                    style={{
                        background: 'linear-gradient(135deg, #93c5fd, #bfdbfe)'
                    }}
                />
            </div>
        </section>
    );
};

export default LandingShapes;
