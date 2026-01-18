import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const socialLinks = [
        { icon: '💬', name: 'Twitter', href: '#' },
        { icon: '📧', name: 'Email', href: '#' },
        { icon: '🔗', name: 'LinkedIn', href: '#' },
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="min-h-screen py-20 px-6 flex items-center relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-pink-600/10 blur-3xl"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="max-w-4xl mx-auto text-center w-full"
            >
                {/* Heading */}
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Let's Connect
                    </span>
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                >
                    Ready to elevate your digital presence? Get in touch and let's create
                    something extraordinary together.
                </motion.p>

                {/* Contact Form */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 md:p-12 mb-12"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-6 py-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            />
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-6 py-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            />
                        </div>

                        <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            rows="5"
                            placeholder="Your Message"
                            className="w-full px-6 py-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            type="submit"
                            className="glow-button w-full md:w-auto px-12"
                        >
                            <span className="relative z-10">Send Message</span>
                        </motion.button>
                    </form>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-300">
                        Or connect with us on
                    </h3>

                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                transition={{
                                    delay: 0.8 + index * 0.1,
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 bg-gradient-to-br from-violet-600/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl flex items-center justify-center text-2xl hover:border-purple-500/60 transition-all duration-300 group"
                            >
                                <motion.span
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    {social.icon}
                                </motion.span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
