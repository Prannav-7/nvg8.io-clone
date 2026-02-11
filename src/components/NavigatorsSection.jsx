import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NavigatorsSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animate cards on scroll
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const navigatorFeatures = [
        {
            title: "Your Navigator",
            description: "Navigators are shaped by the data you share and are your gateway to earning Navigate points.",
            gradient: "from-purple-600 to-blue-600",
        },
        {
            title: "Archetypes",
            description: "Empowered digital avatars designed to represent you across the Navigate ecosystem.",
            gradient: "from-blue-600 to-cyan-600",
        }
    ];

    return (
        <section
            id="navigators"
            ref={sectionRef}
            className="relative w-full bg-black py-24 md:py-32 overflow-hidden"
            style={{ position: 'relative' }}
        >
            {/* Background gradient effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Meet the <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">Navigators</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        Your Navigator is the gateway to the Data Quest app, a gamified platform that rewards you for each and every data contribution.
                    </p>
                </motion.div>

                {/* Navigator Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {navigatorFeatures.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`}></div>
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700/50 hover:border-lime-400/30 transition-all duration-500 transform hover:-translate-y-2">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Archetypes Showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mt-20"
                >
                    <div className="inline-block bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700/50">
                        <p className="text-sm text-lime-400 font-bold tracking-[0.2em] uppercase mb-4">
                            Data Quest
                        </p>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                            Navigator Archetypes
                        </h3>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Your data is unique to you, and so is your Navigator.
                        </p>

                        {/* Archetype Icons Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {['Explorer', 'Creator', 'Guardian', 'Pioneer'].map((archetype, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/30 hover:border-lime-400/30"
                                >
                                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                    <p className="text-white font-semibold">{archetype}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <a
                        href="https://dataquest.nvg8.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 download-button"
                    >
                        <span>Sign Up Now</span>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">100 points rewarded</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default NavigatorsSection;
