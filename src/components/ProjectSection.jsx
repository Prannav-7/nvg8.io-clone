import React from 'react';
import { motion } from 'framer-motion';

const ProjectSection = () => {
    const features = [
        {
            icon: "🌐",
            title: "Decentralized Platform",
            description: "A user-owned intelligence platform that puts power back in your hands"
        },
        {
            icon: "🎁",
            title: "Earn Rewards",
            description: "Get rewarded for every data contribution you make to the ecosystem"
        },
        {
            icon: "🔒",
            title: "Privacy First",
            description: "Maintain full control over your data with industry-leading security"
        },
        {
            icon: "🤖",
            title: "Better AI",
            description: "Help build better AI models through quality, user-owned datasets"
        }
    ];

    return (
        <section
            id="project"
            className="relative w-full bg-gradient-to-b from-black to-gray-900 py-24 md:py-32 overflow-hidden"
            style={{ position: 'relative' }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-6">
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-lime-400 bg-lime-400/10 px-6 py-2 rounded-full border border-lime-400/20">
                            The Navigate Project
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        Join a community building{' '}
                        <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                            user-owned datasets
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                        Navigate is creating a new data ecosystem where people earn from the valuable data they generate daily, while helping build better AI models for everyone.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-lime-400/30 transition-all duration-500 h-full">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-gray-800"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent mb-2">
                                100%
                            </div>
                            <div className="text-gray-400 font-medium">
                                Your Data Ownership
                            </div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent mb-2">
                                24/7
                            </div>
                            <div className="text-gray-400 font-medium">
                                Passive Earning
                            </div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent mb-2">
                                ∞
                            </div>
                            <div className="text-gray-400 font-medium">
                                Growth Potential
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <a
                        href="https://discord.com/invite/nvg8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        <span>Join Our Discord</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectSection;
