import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const FeatureCard = ({ icon, title, description, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: index * 0.1,
            },
        },
    };

    const iconVariants = {
        hover: {
            scale: 1.15,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                scale: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                },
                rotate: {
                    duration: 0.5,
                    ease: 'easeInOut',
                },
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
            className="icon-tile group cursor-pointer"
        >
            <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="mb-6 inline-block"
            >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-shadow duration-300">
                    {icon}
                </div>
            </motion.div>

            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors duration-300">
                {title}
            </h3>

            <p className="text-gray-400 leading-relaxed">{description}</p>

            {/* Hover glow effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent 70%)',
                }}
            />
        </motion.div>
    );
};

const Features = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const features = [
        {
            icon: '⚡',
            title: 'Blazing Fast',
            description:
                'Optimized for performance with 60fps animations and instant load times.',
        },
        {
            icon: '🎨',
            title: 'Stunning Design',
            description:
                'Premium aesthetics with modern gradients and smooth transitions.',
        },
        {
            icon: '📱',
            title: 'Fully Responsive',
            description:
                'Perfect experience across all devices, from mobile to desktop.',
        },
        {
            icon: '🔒',
            title: 'Secure & Reliable',
            description:
                'Built with best practices and enterprise-grade security standards.',
        },
        {
            icon: '🚀',
            title: 'Easy to Use',
            description:
                'Intuitive interface designed for the best user experience possible.',
        },
        {
            icon: '💎',
            title: 'Premium Quality',
            description:
                'Production-ready code with clean architecture and documentation.',
        },
    ];

    return (
        <section
            id="features"
            ref={sectionRef}
            className="min-h-screen py-20 px-6 relative"
        >
            {/* Section Header */}
            <motion.div
                style={{ opacity, scale }}
                className="max-w-3xl mx-auto text-center mb-16"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                        Powerful Features
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                    className="text-lg text-gray-300"
                >
                    Everything you need to create exceptional digital experiences
                </motion.p>
            </motion.div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} index={index} />
                ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        </section>
    );
};

export default Features;
