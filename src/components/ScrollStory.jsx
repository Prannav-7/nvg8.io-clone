import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollStory = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);
    const canvasRef = useRef(null);
    const framesRef = useRef([]);
    const frameCount = 252; // frames from 21 to 272

    // Preload frames
    useEffect(() => {
        const loadFrames = async () => {
            const framePromises = [];
            for (let i = 0; i < frameCount; i++) {
                const frameNumber = 21 + i;
                const img = new Image();
                const framePath = `/shape-animation/frame_${String(frameNumber).padStart(4, '0')}.png`;
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
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Background color animation
            gsap.to(bgRef.current, {
                backgroundColor: '#000000',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '60% top',
                    scrub: 1,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Canvas animation
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            end: `+=${window.innerHeight * 6}`, // Extended scroll for frames
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Update Canvas Frame
                if (framesRef.current.length > 0) {
                    const frameIndex = Math.floor(progress * (frameCount - 1));
                    const img = framesRef.current[frameIndex];
                    if (img && img.complete) {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                        canvasCtx.drawImage(img, 0, 0);
                    }
                }
            }
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full"
            style={{ height: '600vh', position: 'relative' }}
        >
            <div
                ref={bgRef}
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: '#ffffff' }}
            >
                {/* Animation Canvas */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            opacity: 1 // Full opacity since text is removed
                        }}
                    />
                </div>
            </div>

            <style>{`
                .word {
                    display: inline-block;
                    position: relative;
                    margin-right: 0.2rem;
                    margin-bottom: 0.2rem;
                    padding: 0.1rem 0.2rem;
                    border-radius: 2rem;
                    will-change: background-color, opacity;
                    opacity: 0;
                }

                .word span {
                    position: relative;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};

export default ScrollStory;
