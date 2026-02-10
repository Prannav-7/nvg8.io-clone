import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollStory = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);

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

    // Text animation
    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const textElement = textRef.current;
        const originalText = "It's time for a change. With Navigate you join a decentralized intelligence platform that puts the power back in your hands and rewards you for the data you contribute.";
        const words = originalText.split(/\s+/);

        textElement.innerHTML = '';

        words.forEach((word) => {
            if (word.trim()) {
                const wordContainer = document.createElement('div');
                wordContainer.className = 'word';

                const wordText = document.createElement('span');
                wordText.textContent = word;

                wordContainer.appendChild(wordText);
                textElement.appendChild(wordContainer);
            }
        });

        const wordContainers = Array.from(textElement.querySelectorAll('.word'));
        const totalWords = wordContainers.length;

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            end: `+=${window.innerHeight * 4}`,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                wordContainers.forEach((word, index) => {
                    const wordText = word.querySelector('span');

                    if (progress <= 0.7) {
                        const progressTarget = 0.7;
                        const revealProgress = Math.min(1, progress / progressTarget);
                        const overlapWords = 15;
                        const totalAnimationLength = 1 + overlapWords / totalWords;
                        const wordStart = index / totalWords;
                        const wordEnd = wordStart + overlapWords / totalWords;
                        const timelineScale = 1 / Math.min(totalAnimationLength, 1 + (totalWords - 1) / totalWords + overlapWords / totalWords);
                        const adjustedStart = wordStart * timelineScale;
                        const adjustedEnd = wordEnd * timelineScale;
                        const duration = adjustedEnd - adjustedStart;
                        const wordProgress = revealProgress <= adjustedStart ? 0 : revealProgress >= adjustedEnd ? 1 : (revealProgress - adjustedStart) / duration;

                        word.style.opacity = wordProgress;
                        const backgroundFadeStart = wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
                        const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
                        word.style.backgroundColor = `rgba(60, 60, 60, ${backgroundOpacity * 0.5})`;
                        const textRevealThreshold = 0.9;
                        const textRevealProgress = wordProgress >= textRevealThreshold ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold) : 0;
                        wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
                    } else {
                        const reverseProgress = (progress - 0.7) / 0.3;
                        word.style.opacity = 1;
                        const reverseOverlapWords = 5;
                        const reverseWordStart = index / totalWords;
                        const reverseWordEnd = reverseWordStart + reverseOverlapWords / totalWords;
                        const reverseTimelineScale = 1 / Math.max(1, (totalWords - 1) / totalWords + reverseOverlapWords / totalWords);
                        const reverseAdjustedStart = reverseWordStart * reverseTimelineScale;
                        const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
                        const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;
                        const reverseWordProgress = reverseProgress <= reverseAdjustedStart ? 0 : reverseProgress >= reverseAdjustedEnd ? 1 : (reverseProgress - reverseAdjustedStart) / reverseDuration;

                        if (reverseWordProgress > 0) {
                            wordText.style.opacity = 1 * (1 - reverseWordProgress);
                            word.style.backgroundColor = `rgba(60, 60, 60, ${reverseWordProgress * 0.5})`;
                        } else {
                            wordText.style.opacity = 1;
                            word.style.backgroundColor = `rgba(60, 60, 60, 0)`;
                        }
                    }
                });
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
            style={{ height: '500vh' }}
        >
            <div
                ref={bgRef}
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{ backgroundColor: '#ffffff' }}
            >
                {/* Text */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-8">
                    <div className="max-w-5xl w-full">
                        <div
                            ref={textRef}
                            className="anime-text text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight text-center"
                            style={{
                                fontWeight: 900,
                                lineHeight: 1,
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            It's time for a change. With Navigate you join a decentralized intelligence platform that puts the power back in your hands and rewards you for the data you contribute.
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
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
