import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is Navigate?",
            answer: "Navigate is a decentralized intelligence platform that rewards you for sharing your data. Join a community building user-owned datasets for better AI models."
        },
        {
            question: "How do I earn Navigate points?",
            answer: "Simply install the Navigate Rewards Extension, connect your shopping accounts, and earn points automatically with every purchase and data contribution. You get 100 points just for signing up!"
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. Your data is encrypted and you maintain full control over what you share. Navigate uses industry-leading security practices to protect your information."
        },
        {
            question: "What can I do with my points?",
            answer: "Navigate points can be redeemed for rewards, used within the Data Quest app, and will unlock exclusive features as the platform grows."
        },
        {
            question: "What are Navigators?",
            answer: "Navigators are empowered digital avatars that represent you in the Navigate ecosystem. They're shaped by the data you share and serve as your gateway to earning Navigate points."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="relative w-full bg-black py-24 md:py-32 overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-6">
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-lime-400 bg-lime-400/10 px-6 py-2 rounded-full border border-lime-400/20">
                            Also Asked
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Frequently Asked{' '}
                        <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        Everything you need to know about Navigate
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-900 rounded-2xl border border-gray-800 hover:border-lime-400/30 transition-all duration-300 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left group"
                            >
                                <span className="text-lg md:text-xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300 pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0 w-8 h-8 bg-lime-400/10 rounded-full flex items-center justify-center"
                                >
                                    <svg
                                        className="w-5 h-5 text-lime-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">
                        Still have questions?
                    </p>
                    <a
                        href="https://docs.nvg8.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-300 transition-all duration-300 hover:scale-105"
                    >
                        Visit Our Docs
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
