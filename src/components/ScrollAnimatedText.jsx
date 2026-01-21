import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimatedText = ({
  title,
  paragraphs,
  keywords = [],
  bgColor = '#141414',
  highlightBgColor = '60, 60, 60',
  keywordColors = {
    vibrant: '#7a78ff',
    living: '#fe6d38',
    clarity: '#c6fe69',
    shape: '#7a78ff',
    interactive: '#7a78ff',
    expression: '#fe6d38',
    storytelling: '#fe6d38',
    intuitive: '#c6fe69',
    vision: '#c6fe69',
    motion: '#7a78ff',
    creative: '#fe6d38',
    bold: '#c6fe69'
  }
}) => {
  const containerRef = useRef(null);
  const animeTextRef = useRef(null);

  useEffect(() => {
    if (!animeTextRef.current) return;

    const animeTextParagraphs = animeTextRef.current.querySelectorAll('p');

    // Process each paragraph and split into words
    animeTextParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent;
      const words = text.split(/\s+/);
      paragraph.innerHTML = '';

      words.forEach((word) => {
        if (word.trim()) {
          const wordContainer = document.createElement('div');
          wordContainer.className = 'word';

          const wordText = document.createElement('span');
          wordText.textContent = word;

          const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, '');
          if (keywords.includes(normalizedWord)) {
            wordContainer.classList.add('keyword-wrapper');
            wordText.classList.add('keyword', normalizedWord);
          }

          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);

          // Add a space text node after each word for proper spacing
          paragraph.appendChild(document.createTextNode(' '));
        }
      });
    });

    // Create scroll trigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: containerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 4}`,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const words = Array.from(animeTextRef.current.querySelectorAll('.word'));
        const totalWords = words.length;

        words.forEach((word, index) => {
          const wordText = word.querySelector('span');

          if (progress <= 0.7) {
            const progressTarget = 0.7;
            const revealProgress = Math.min(1, progress / progressTarget);

            const overlapWords = 15;
            const totalAnimationLength = 1 + overlapWords / totalWords;

            const wordStart = index / totalWords;
            const wordEnd = wordStart + overlapWords / totalWords;

            const timelineScale =
              1 /
              Math.min(
                totalAnimationLength,
                1 + (totalWords - 1) / totalWords + overlapWords / totalWords
              );

            const adjustedStart = wordStart * timelineScale;
            const adjustedEnd = wordEnd * timelineScale;
            const duration = adjustedEnd - adjustedStart;

            const wordProgress =
              revealProgress <= adjustedStart
                ? 0
                : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;

            word.style.opacity = wordProgress;

            const backgroundFadeStart =
              wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
            const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
            word.style.backgroundColor = `rgba(${highlightBgColor}, ${backgroundOpacity})`;

            const textRevealThreshold = 0.9;
            const textRevealProgress =
              wordProgress >= textRevealThreshold
                ? (wordProgress - textRevealThreshold) /
                (1 - textRevealThreshold)
                : 0;
            wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
          } else {
            const reverseProgress = (progress - 0.7) / 0.3;
            word.style.opacity = 1;
            const targetTextOpacity = 1;

            const reverseOverlapWords = 5;
            const reverseWordStart = index / totalWords;
            const reverseWordEnd =
              reverseWordStart + reverseOverlapWords / totalWords;

            const reverseTimelineScale =
              1 /
              Math.max(
                1,
                (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
              );

            const reverseAdjustedStart =
              reverseWordStart * reverseTimelineScale;
            const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
            const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

            const reverseWordProgress =
              reverseProgress <= reverseAdjustedStart
                ? 0
                : reverseProgress >= reverseAdjustedEnd
                  ? 1
                  : (reverseProgress - reverseAdjustedStart) / reverseDuration;

            if (reverseWordProgress > 0) {
              wordText.style.opacity =
                targetTextOpacity * (1 - reverseWordProgress);
              word.style.backgroundColor = `rgba(${highlightBgColor}, ${reverseWordProgress})`;
            } else {
              wordText.style.opacity = targetTextOpacity;
              word.style.backgroundColor = `rgba(${highlightBgColor}, 0)`;
            }
          }
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [keywords, highlightBgColor]);

  return (
    <section
      ref={containerRef}
      className="anime-text-container relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: bgColor,
        padding: '2rem'
      }}
    >
      <div className="copy-container w-full h-full flex justify-center items-center text-center border-[0.15rem] border-dashed border-[rgb(60,60,60)] rounded-[2rem]">
        <div
          ref={animeTextRef}
          className="anime-text w-[60%] max-w-4xl"
        >
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className="text-white text-center mb-8 text-2xl md:text-4xl font-black leading-tight"
            >
              {text}
            </p>
          ))}
        </div>
      </div>

      <style jsx>{`
        .anime-text .word {
          display: inline-block;
          position: relative;
          margin-right: 0.5rem;
          margin-bottom: 0.4rem;
          padding: 0.2rem 0.4rem;
          border-radius: 2rem;
          will-change: background-color, opacity;
        }

        .anime-text .word.keyword-wrapper {
          margin: 0 0.6rem 0.4rem 0.3rem;
        }

        .anime-text .word span {
          position: relative;
          display: inline-block;
        }

        .anime-text .word span.keyword {
          border-radius: 2rem;
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 0.2rem 0.4rem;
          color: #141414;
        }

        .anime-text .word span.keyword::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% + 1.2rem);
          height: calc(100% + 0.6rem);
          background-color: #fff;
          border-radius: 2rem;
          z-index: -1;
        }

        .anime-text .word span.keyword.vibrant::before,
        .anime-text .word span.keyword.motion::before,
        .anime-text .word span.keyword.shape::before,
        .anime-text .word span.keyword.interactive::before {
          background-color: ${keywordColors.vibrant || '#7a78ff'};
        }

        .anime-text .word span.keyword.living::before,
        .anime-text .word span.keyword.expression::before,
        .anime-text .word span.keyword.storytelling::before,
        .anime-text .word span.keyword.creative::before {
          background-color: ${keywordColors.living || '#fe6d38'};
        }

        .anime-text .word span.keyword.clarity::before,
        .anime-text .word span.keyword.intuitive::before,
        .anime-text .word span.keyword.vision::before,
        .anime-text .word span.keyword.bold::before {
          background-color: ${keywordColors.clarity || '#c6fe69'};
        }

        .anime-text .word span.keyword.data::before {
          background-color: ${keywordColors.data || '#eab308'};
        }

        .anime-text .word span.keyword.interests::before,
        .anime-text .word span.keyword.value::before {
          background-color: ${keywordColors.interests || '#f97316'};
        }

        .anime-text .word span.keyword.creativity::before {
          background-color: ${keywordColors.creativity || '#16a34a'};
        }

        .anime-text .word span.keyword.personalized::before {
          background-color: ${keywordColors.personalized || '#a78bfa'};
        }

        .anime-text .word span.keyword.expressive::before {
          background-color: ${keywordColors.expressive || '#eab308'};
        }

        .anime-text .word,
        .anime-text .word span {
          opacity: 0;
        }

        @media (max-width: 1000px) {
          .anime-text {
            width: 90%;
          }

          .anime-text p {
            font-size: 1.5rem;
          }

          .anime-text .word {
            margin-right: 0.3rem;
            margin-bottom: 0.25rem;
            padding: 0.15rem 0.3rem;
          }

          .anime-text .word.keyword-wrapper {
            margin: 0 0.4rem 0.25rem 0.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollAnimatedText;
