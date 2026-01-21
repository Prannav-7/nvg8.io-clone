import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollStory = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Background color - transparent to black
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.35, 0.5],
        ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', '#000000']
    );

    // Transition animation opacity (colorful shapes) - FINISH EARLIER
    const transitionOpacity = useTransform(scrollYProgress, [0, 0.12, 0.32, 0.42], [0, 1, 1, 0]);

    // Black section message opacity - START AFTER TRANSITION ENDS
    const messageOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);

    // Text animation effect
    useEffect(() => {
        if (!textRef.current || !containerRef.current) return;

        const textElement = textRef.current;
        const originalText = "It's time for a change. With Navigate you join a decentralized intelligence platform that puts the power back in your hands and rewards you for the data you contribute.";
        const words = originalText.split(/\s+/);

        // Clear and rebuild with word spans
        textElement.innerHTML = '';

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'inline-block';
            wordSpan.style.opacity = '0.15';  // Start very dim
            wordSpan.style.transition = 'opacity 0.2s ease';

            // Special styling for "Navigate"
            if (word === 'Navigate') {
                wordSpan.className = 'inline-block bg-[#f97316] text-black px-6 py-2 rounded-full transform -skew-x-6';
                wordSpan.style.opacity = '0.15';
                wordSpan.style.transition = 'opacity 0.2s ease';
            }

            wordSpan.textContent = word;
            textElement.appendChild(wordSpan);

            // Add space after each word (except last)
            if (index < words.length - 1) {
                textElement.appendChild(document.createTextNode(' '));
            }
        });

        // Get all word spans
        const wordSpans = Array.from(textElement.querySelectorAll('span'));
        const totalWords = wordSpans.length;

        // Create GSAP animation - REVEAL ALL WORDS FROM THE START
        const scrollTriggerConfig = {
            trigger: containerRef.current,
            start: 'top+=50% bottom',  // Start after colorful transition
            end: 'bottom-=15% top',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                // Reveal words progressively FROM THE BEGINNING
                const revealProgress = Math.min(progress * 1.2, 1);
                const visibleWordCount = Math.floor(revealProgress * totalWords);

                wordSpans.forEach((span, index) => {
                    // Use <= to include current index
                    if (index <= visibleWordCount) {
                        span.style.opacity = '1';
                    } else {
                        span.style.opacity = '0.15';
                    }
                });
            }
        };

        const trigger = ScrollTrigger.create(scrollTriggerConfig);

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full" style={{ height: '450vh' }}>
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{ backgroundColor }}
            >
                {/* Transition Animation: Colorful Organic Shapes */}
                <motion.div
                    className="absolute inset-0 bg-white"
                    style={{ opacity: transitionOpacity }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                            d="M0,0 L100,0 L100,30 Q80,35 60,30 T20,25 L0,30 Z"
                            fill="#7c7aff"
                            style={{
                                y: useTransform(scrollYProgress, [0.02, 0.42], [-25, 12])
                            }}
                        />
                        <motion.path
                            d="M0,25 L100,30 L100,55 Q70,60 40,50 T10,45 L0,50 Z"
                            fill="#c6fe69"
                            style={{
                                y: useTransform(scrollYProgress, [0.02, 0.42], [-5, 18])
                            }}
                        />
                        <motion.path
                            d="M20,40 Q50,35 80,45 L100,50 L100,80 Q60,75 30,80 L0,75 L0,55 Q15,50 20,40 Z"
                            fill="#f59e0b"
                            style={{
                                y: useTransform(scrollYProgress, [0.02, 0.42], [5, 22]),
                                rotate: useTransform(scrollYProgress, [0.02, 0.42], [-8, 8])
                            }}
                        />
                        <motion.path
                            d="M0,70 L100,75 L100,100 L0,100 Z"
                            fill="#93c5fd"
                            style={{
                                y: useTransform(scrollYProgress, [0.02, 0.42], [15, 28])
                            }}
                        />
                        <motion.path
                            d="M80,75 L100,80 L100,100 L90,100 Z"
                            fill="#fb923c"
                            style={{
                                y: useTransform(scrollYProgress, [0.02, 0.42], [12, 25])
                            }}
                        />
                    </svg>
                </motion.div>

                {/* Black Section: Change Message with Text Animation */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center px-8"
                    style={{ opacity: messageOpacity }}
                >
                    <div className="max-w-3xl">
                        <p
                            ref={textRef}
                            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
                        >
                            It's time for a change. With Navigate you join a decentralized intelligence platform that puts the power back in your hands and rewards you for the data you contribute.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ScrollStory;
