import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo-new.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProductsMenu, setShowProductsMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Project', link: '#project' },
        { name: 'Navigators', link: '#navigators' },
        { name: 'Rewards', link: '#rewards' },
        { name: 'FAQ', link: '#faq' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/90 backdrop-blur-lg'
                : 'bg-black/80 backdrop-blur-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                        className="flex items-center gap-3"
                    >
                        <img src={logo} alt="Navigatz Logo" className="w-9 h-9 rounded-md" />
                        <span className="text-white text-xl font-bold">Navigatz</span>
                    </motion.div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.link}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
                                className="nav-link-simple"
                            >
                                {item.name}
                            </motion.a>
                        ))}

                        {/* Products Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowProductsMenu(true)}
                            onMouseLeave={() => setShowProductsMenu(false)}
                        >
                            <motion.button
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                                className="nav-link-simple flex items-center gap-1"
                            >
                                Products
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>

                    {/* Launch Game Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                        className="hidden md:block px-6 py-2 border border-lime-400 text-lime-400 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition-all duration-300"
                    >
                        Launch Game
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="md:hidden text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
