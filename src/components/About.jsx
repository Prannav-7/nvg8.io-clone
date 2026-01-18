import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

    const stats = [
        { value: '60fps', label: 'Performance' },
        { value: '100%', label: 'Responsive' },
        { value: '∞', label: 'Possibilities' },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="min-h-screen py-20 px-6 flex items-center relative overflow-hidden"
        >
            {/* Parallax background elements */}
            <motion.div
                style={{ y: y }}
                className="absolute inset-0 -z-10"
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            </motion.div>

            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        style={{ opacity, scale }}
                        className="space-y-6"
                    >
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold"
                        >
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Built for
                            </span>
                            <br />
                            <span className="text-white">Excellence</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                            className="text-lg text-gray-300 leading-relaxed"
                        >
                            Crafted with meticulous attention to detail, our solution combines
                            cutting-edge technology with stunning design to deliver an
                            unforgettable experience.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                            className="text-gray-400 leading-relaxed"
                        >
                            Every animation is optimized for performance, every interaction feels
                            natural, and every pixel is purposefully placed to create a premium
                            digital experience.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                            className="grid grid-cols-3 gap-6 pt-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.4 + index * 0.1,
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 15,
                                    }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Animated Cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="relative h-96 lg:h-[500px]"
                    >
                        {/* Floating cards */}
                        {[1, 2, 3].map((card, index) => (
                            <motion.div
                                key={card}
                                initial={{ opacity: 0, y: 50, rotate: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                viewport={{ once: true }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 3, 0],
                                }}
                                transition={{
                                    opacity: {
                                        delay: 0.2 + index * 0.15,
                                        type: 'spring',
                                        stiffness: 80,
                                        damping: 15,
                                    },
                                    y: {
                                        duration: 3 + index * 0.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                    rotate: {
                                        duration: 4 + index * 0.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                                className={`absolute w-64 h-48 bg-gradient-to-br ${index === 0
                                    ? 'from-violet-600/20 to-purple-600/20 top-0 left-0'
                                    : index === 1
                                        ? 'from-purple-600/20 to-pink-600/20 top-20 right-0'
                                        : 'from-pink-600/20 to-violet-600/20 bottom-0 left-1/4'
                                    } backdrop-blur-sm border border-purple-500/20 rounded-3xl p-6 shadow-2xl`}
                                style={{ zIndex: 3 - index }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl mb-4" />
                                <div className="space-y-2">
                                    <div className="h-3 bg-white/20 rounded w-3/4" />
                                    <div className="h-3 bg-white/10 rounded w-1/2" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
