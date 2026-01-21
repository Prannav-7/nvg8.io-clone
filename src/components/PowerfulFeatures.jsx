import React from 'react';
import ScrollAnimatedText from './ScrollAnimatedText';

const PowerfulFeatures = () => {
    return (
        <div className="w-full">
            {/* About Section */}
            <ScrollAnimatedText
                paragraphs={[
                    'Navigatz is a vibrant space for users who think in motion and build with intent. It\'s more than a tool — it\'s where bold ideas turn into living interfaces, powered by data, rewards, and creative control.',
                    'We believe great experiences start with clarity and expression. That\'s why Navigatz is built to simplify your digital life while amplifying your creative reach. From browsing to shopping, it\'s a space where your data takes shape and your interests come to life.'
                ]}
                keywords={[
                    'vibrant',
                    'motion',
                    'bold',
                    'living',
                    'data',
                    'creative',
                    'clarity',
                    'expression',
                    'shape',
                    'interests'
                ]}
                bgColor="#141414"
                highlightBgColor="60, 60, 60"
                keywordColors={{
                    vibrant: '#a78bfa',
                    living: '#16a34a',
                    clarity: '#eab308',
                    expression: '#3b82f6',
                    shape: '#f97316',
                    motion: '#a78bfa',
                    bold: '#16a34a',
                    data: '#eab308',
                    creative: '#3b82f6',
                    interests: '#f97316'
                }}
            />

            {/* CTA Section */}
            <section className="relative w-full h-screen overflow-hidden" style={{ padding: '2rem' }}>
                <div
                    className="copy-container w-full h-full flex justify-center items-center text-center rounded-[2rem]"
                    style={{ background: '#c6fe69' }}
                >
                    <h1 className="w-[70%] text-[#141414] text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                        Join Navigatz now to earn from your data.
                    </h1>
                </div>
            </section>

            {/* Features Section */}
            <ScrollAnimatedText
                paragraphs={[
                    'Navigatz brings motion, structure, and creativity together in one intuitive space. Browse content, discover products, and explore rich storytelling visuals. All while earning rewards from your everyday activities.',
                    'With built-in support for interactive shopping, personalized recommendations, and real-time rewards, Navigatz lets you experience bold, expressive interfaces that feel as good as they look. It\'s the fastest way to turn your data into value.'
                ]}
                keywords={[
                    'motion',
                    'creativity',
                    'intuitive',
                    'storytelling',
                    'interactive',
                    'personalized',
                    'bold',
                    'expressive',
                    'data',
                    'value'
                ]}
                bgColor="#141414"
                highlightBgColor="60, 60, 60"
                keywordColors={{
                    motion: '#a78bfa',
                    creativity: '#16a34a',
                    intuitive: '#eab308',
                    storytelling: '#3b82f6',
                    interactive: '#f97316',
                    personalized: '#a78bfa',
                    bold: '#16a34a',
                    expressive: '#eab308',
                    data: '#3b82f6',
                    value: '#f97316'
                }}
            />

            {/* Outro Section */}
            <section className="relative w-full h-screen overflow-hidden" style={{ padding: '2rem' }}>
                <div
                    className="copy-container w-full h-full flex justify-center items-center text-center rounded-[2rem]"
                    style={{ background: '#7a78ff' }}
                >
                    <h1 className="w-[70%] text-[#141414] text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                        Built for users who shape their digital world.
                    </h1>
                </div>
            </section>
        </div>
    );
};

export default PowerfulFeatures;
