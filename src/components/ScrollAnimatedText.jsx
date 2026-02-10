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
  showIcon = false,
  iconColor = '#c6fe69',
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
  const iconRef = useRef(null);

  useEffect(() => {
    if (!animeTextRef.current) return;

    const animeTextParagraphs = animeTextRef.current.querySelectorAll('p');

    // Process each paragraph and split into words
    animeTextParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent;
      const initialWords = text.split(/\s+/).filter(w => w.trim());
      paragraph.innerHTML = '';

      let i = 0;
      while (i < initialWords.length) {
        let matchedKeyword = null;
        let wordsInKeyword = 1;

        // Sort keywords by length (longest first) to match phrases correctly
        const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

        for (const kw of sortedKeywords) {
          const kwWords = kw.split(/\s+/);
          const potentialMatch = initialWords.slice(i, i + kwWords.length)
            .map(w => w.toLowerCase().replace(/[.,!?;:"]/g, ''))
            .join(' ');

          if (potentialMatch === kw.toLowerCase()) {
            matchedKeyword = kw;
            wordsInKeyword = kwWords.length;
            break;
          }
        }

        const wordGroup = initialWords.slice(i, i + wordsInKeyword).join(' ');
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word';

        const wordText = document.createElement('span');

        // Special case for Navigate brand with logo
        if (matchedKeyword && matchedKeyword.toLowerCase() === 'navigate') {
          wordText.innerHTML = `
            <span class="brand-badge">
              <svg viewBox="0 0 24 24" fill="none" style="width: 1.2em; height: 1.2em; margin-right: 0.3em; display: inline-block; vertical-align: middle;">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="currentColor"/>
              </svg>
              ${wordGroup}
            </span>
          `;
        } else {
          wordText.textContent = wordGroup;
        }

        if (matchedKeyword) {
          const normalizedKW = matchedKeyword.toLowerCase().replace(/\s+/g, '-');
          wordContainer.classList.add('keyword-wrapper');
          wordText.classList.add('keyword', normalizedKW);
        }

        wordContainer.appendChild(wordText);
        paragraph.appendChild(wordContainer);
        paragraph.appendChild(document.createTextNode(' '));

        i += wordsInKeyword;
      }
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

        // Fade out icon during reverse animation (when text disappears)
        if (iconRef.current) {
          if (progress < 0.1) {
            // Fade in icon at the very beginning
            const fadeInProgress = progress / 0.1;
            iconRef.current.style.opacity = fadeInProgress;
          } else if (progress <= 0.7) {
            // Keep icon fully visible during text reveal phase
            iconRef.current.style.opacity = 1;
          } else {
            // Fade out icon during reverse phase (0.7 to 1.0)
            const reverseProgress = (progress - 0.7) / 0.3;
            iconRef.current.style.opacity = 1 - reverseProgress;
          }
        }

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
      className="anime-text-container relative w-full h-screen overflow-hidden pt-32 px-8"
      style={{
        backgroundColor: bgColor
      }}
    >
      <div className="copy-container w-full h-full flex justify-center items-center">
        <div className="flex items-start gap-4 md:gap-6 w-full max-w-4xl px-6 md:px-12">
          {/* Icon */}
          {showIcon && (
            <div
              ref={iconRef}
              className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mt-1.5 transition-opacity duration-300"
              style={{ backgroundColor: iconColor }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 md:w-8 md:h-8"
                style={{ color: '#141414' }}
              >
                <path d="M12 2L4 12L12 22L20 12L12 2Z" />
                <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.3" />
              </svg>
            </div>
          )}

          {/* Text Content */}
          <div
            ref={animeTextRef}
            className="anime-text flex-1"
          >
            {paragraphs.map((text, index) => (
              <p
                key={index}
                className="text-white text-left text-xl md:text-3xl lg:text-4xl font-black leading-[1.3] tracking-tighter mb-8 last:mb-0"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .anime-text .word {
          display: inline-block;
          position: relative;
          margin-right: 0.4rem;
          margin-bottom: 0.2rem;
          padding: 0.1rem 0.2rem;
          border-radius: 2rem;
          will-change: background-color, opacity;
        }

        .anime-text .word.keyword-wrapper {
          margin: 0 0.5rem 0.2rem 0.2rem;
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
          width: calc(100% + 1rem);
          height: calc(100% + 0.4rem);
          background-color: #fff;
          border-radius: 2rem;
          z-index: -1;
        }

        ${Object.entries(keywordColors).map(([keyword, color]) => {
        const className = keyword.toLowerCase().replace(/\s+/g, '-');
        return `
            .anime-text .word span.keyword.${className}::before {
              background-color: ${color};
            }
          `;
      }).join('')}

        .anime-text .word {
          opacity: 0;
        }
        
        .anime-text .word span {
          opacity: 1;
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
