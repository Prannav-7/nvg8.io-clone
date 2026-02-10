import React from 'react';
import ScrollAnimatedText from './ScrollAnimatedText';

const PowerfulFeatures = () => {
    return (
        <div className="w-full">
            {/* Text Animation Section - After Shapes */}
            <ScrollAnimatedText
                paragraphs={[
                    "Your data is taken by companies and used to train the next wave of AI models and build the world's top products and services. Yet it often happens without any earnings being distributed back to you.",
                    "It's time for a change. With Navigate you join a decentralized intelligence platform that puts the power back in your hands and rewards you for the data you contribute."
                ]}
                keywords={[
                    'your data',
                    'navigate'
                ]}
                bgColor="#141414"
                highlightBgColor="60, 60, 60"
                showIcon={true}
                iconColor="#c6fe69"
                keywordColors={{
                    'your data': '#7c7aff',
                    navigate: '#ff6b35'
                }}
            />

            {/* Violet Box Section */}
            <section className="relative w-full h-screen overflow-hidden" style={{ padding: '2rem' }}>
                <div
                    className="copy-container w-full h-full flex justify-center items-center text-center rounded-[2rem]"
                    style={{ background: '#7a78ff' }}
                >
                    <h1 className="w-[70%] text-[#141414] text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                        Built for users who shape the future of data.
                    </h1>
                </div>
            </section>
        </div>
    );
};

export default PowerfulFeatures;
