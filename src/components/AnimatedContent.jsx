import React from 'react';
import { motion } from 'framer-motion';

// Same icon components from Hero
const MovieIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="15" y="30" width="70" height="45" rx="4" />
        <rect x="12" y="25" width="12" height="12" rx="3" />
        <rect x="30" y="25" width="12" height="12" rx="3" />
        <rect x="48" y="25" width="12" height="12" rx="3" />
        <rect x="66" y="25" width="12" height="12" rx="3" />
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="28" y="50" width="44" height="38" rx="5" />
        <path d="M35 50V37c0-8.3 6.7-15 15-15s15 6.7 15 15v13" fill="none" stroke="currentColor" strokeWidth="8" />
    </svg>
);

const TshirtIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 28c-6 0-10 4-10 4L25 20 10 32l10 18v28h60V50l10-18-15-12-15 12s-4-4-10-4z" />
    </svg>
);

const GhostIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 18C32 18 20 30 20 45v38l10-7 10 7 10-7 10 7 10-7 10 7V45C80 30 68 18 50 18z" />
        <circle cx="38" cy="45" r="5" fill="#f97316" />
        <circle cx="62" cy="45" r="5" fill="#f97316" />
    </svg>
);

const MusicIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
        <ellipse cx="32" cy="72" rx="15" ry="10" />
        <rect x="42" y="25" width="8" height="50" />
        <path d="M50 25c0 0 25-8 25 12v8c0 0-20-10-25-8z" />
    </svg>
);

const AnimatedContent = () => {
    const contentData = [
        {
            text: "MOVIES & TV SHOWS",
            icon: MovieIcon,
            bg: '#3b82f6',
            borderRadius: '50%'
        },
        {
            text: "GAMING REWARDS",
            icon: GhostIcon,
            bg: '#f97316',
            borderRadius: '2rem'
        },
        {
            text: "MUSIC STREAMING",
            icon: MusicIcon,
            bg: '#a78bfa',
            borderRadius: '50%'
        },
        {
            text: "FASHION & STYLE",
            icon: TshirtIcon,
            bg: '#16a34a',
            borderRadius: '1.5rem'
        },
        {
            text: "SECURE & PRIVATE",
            icon: LockIcon,
            bg: '#eab308',
            borderRadius: '1.5rem'
        },
    ];

    // Duplicate content for seamless loop
    const duplicatedContent = [...contentData, ...contentData, ...contentData];

    return (
        <section className="relative bg-black py-24 overflow-hidden">
            {/* Top Row - Moving Right */}
            <div className="relative mb-12 overflow-hidden">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{
                        x: [0, -2000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedContent.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={`top-${index}`}
                                className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <div
                                    className="flex items-center justify-center w-16 h-16 flex-shrink-0"
                                    style={{
                                        background: item.bg,
                                        borderRadius: item.borderRadius,
                                    }}
                                >
                                    <div className="w-10 h-10 text-black">
                                        <IconComponent />
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-white tracking-wider">
                                    {item.text}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Middle Row - Moving Left */}
            <div className="relative mb-12 overflow-hidden">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{
                        x: [-2000, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedContent.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={`middle-${index}`}
                                className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <div
                                    className="flex items-center justify-center w-16 h-16 flex-shrink-0"
                                    style={{
                                        background: item.bg,
                                        borderRadius: item.borderRadius,
                                    }}
                                >
                                    <div className="w-10 h-10 text-black">
                                        <IconComponent />
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-white tracking-wider">
                                    {item.text}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Bottom Row - Moving Right (Faster) */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{
                        x: [0, -2000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedContent.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={`bottom-${index}`}
                                className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <div
                                    className="flex items-center justify-center w-16 h-16 flex-shrink-0"
                                    style={{
                                        background: item.bg,
                                        borderRadius: item.borderRadius,
                                    }}
                                >
                                    <div className="w-10 h-10 text-black">
                                        <IconComponent />
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-white tracking-wider">
                                    {item.text}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Gradient Overlays for fade effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default AnimatedContent;
