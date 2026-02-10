import React from 'react';
import { motion } from 'framer-motion';

const RewardsSection = () => {
    const dataPoints = [
        { label: "Product Name", icon: "📦" },
        { label: "Product Type", icon: "🏷️" },
        { label: "Order Status", icon: "✅" },
        { label: "Order Placed Date", icon: "📅" },
        { label: "Order Total", icon: "💰" },
        { label: "Seller Name", icon: "🏪" },
        { label: "Shipment City and Zip/Postal Code", icon: "📍" }
    ];

    return (
        <section
            id="rewards"
            className="relative w-full bg-white py-24 md:py-32 overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-6">
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 bg-gray-100 px-6 py-2 rounded-full">
                            Earn Navigate Points
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tight">
                        Turn Your Data Into{' '}
                        <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                            Rewards
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                        Share your data and earn points for every contribution. It's that simple.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                    {/* Left: Data Points List */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-black mb-8">
                            Data We Collect
                        </h3>
                        <ul className="space-y-3">
                            {dataPoints.map((point, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-lime-400"
                                >
                                    <span className="text-2xl">{point.icon}</span>
                                    <span className="text-lg font-medium text-gray-800">{point.label}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right: Reward Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-lime-400 to-green-500 rounded-3xl blur-2xl opacity-20"></div>

                        <div className="relative bg-black rounded-3xl p-8 md:p-12 border-2 border-lime-400/20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center text-3xl">
                                    🎁
                                </div>
                                <div>
                                    <p className="text-lime-400 font-bold text-sm tracking-wider uppercase">
                                        Sign Up Bonus
                                    </p>
                                    <h4 className="text-3xl font-black text-white">100 Points</h4>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="border-t border-gray-700 pt-6">
                                    <h5 className="text-2xl font-bold text-white mb-4">
                                        How It Works
                                    </h5>
                                    <ol className="space-y-4 text-gray-300">
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold">
                                                1
                                            </span>
                                            <span className="pt-1">Download the Navigate Rewards Extension</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold">
                                                2
                                            </span>
                                            <span className="pt-1">Connect your favorite shopping accounts</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold">
                                                3
                                            </span>
                                            <span className="pt-1">Earn points automatically with every purchase</span>
                                        </li>
                                    </ol>
                                </div>

                                <a
                                    href="https://chromewebstore.google.com/detail/navigate-data-quest/nggldafanajogepfhigplhkamalbpghc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full download-button text-center mt-8"
                                >
                                    Download Rewards Extension
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { value: '100+', label: 'Points on Signup' },
                        { value: '24/7', label: 'Automatic Tracking' },
                        { value: '100%', label: 'Data Privacy' },
                        { value: '∞', label: 'Earning Potential' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200 hover:border-lime-400 transition-all duration-300"
                        >
                            <div className="text-4xl md:text-5xl font-black text-black mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default RewardsSection;
