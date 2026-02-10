import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo-new.png';

const Footer = () => {
    const experienceLinks = [
        { name: 'Data Quest App', url: 'https://dataquest.nvg8.io/' },
        { name: 'Get In Touch', url: 'mailto:contact@nvg8.io' }
    ];

    const exploreLinks = [
        { name: 'Visit Our Docs', url: 'https://docs.nvg8.io/' },
        { name: 'Our Blog', url: 'https://paragraph.xyz/@navigate' },
        { name: 'Privacy Policy', url: 'https://dataquest.nvg8.io/privacy.pdf' },
        { name: 'Terms of Service', url: 'https://dataquest.nvg8.io/terms_of_use.pdf' }
    ];

    const socialLinks = [
        {
            name: 'Discord',
            url: 'https://discord.com/invite/nvg8',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
            )
        },
        {
            name: 'X',
            url: 'https://x.com/navigate_ai',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
        {
            name: 'Farcaster',
            url: 'https://warpcast.com/navigate',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16v16H4z" />
                    <path d="M8 8h8v8H8z" fill="black" />
                </svg>
            )
        }
    ];

    return (
        <footer className="relative w-full bg-black border-t border-gray-800 py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 pb-16 border-b border-gray-800"
                >
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Sign up to earn from your data.
                    </h3>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                        Join the community of Navigators reshaping data collection and earning from their valuable data.
                    </p>
                    <a
                        href="https://dataquest.nvg8.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block download-button"
                    >
                        Launch Data Quest
                    </a>
                </motion.div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <img src={logo} alt="Navigate Logo" className="w-10 h-10 rounded-md" />
                            <span className="text-white text-2xl font-bold">Navigate</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Building user-owned datasets for better AI models. Your data, your rewards.
                        </p>
                    </div>

                    {/* Experience Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Experience</h4>
                        <ul className="space-y-3">
                            {experienceLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        target={link.url.startsWith('http') ? '_blank' : undefined}
                                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {exploreLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Links & Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
                    {/* Social Icons */}
                    <div className="flex items-center gap-4 mb-6 md:mb-0">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-gray-400 hover:text-lime-400 hover:bg-gray-800 transition-all duration-300 border border-gray-800 hover:border-lime-400/30"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Navigate. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
