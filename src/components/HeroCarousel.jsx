import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { heroSlides } from '../data/siteContent';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const gradients = [
  'linear-gradient(135deg, #07163d 0%, #0C2264 50%, #1a3a8f 100%)',
  'linear-gradient(135deg, #1c2b44 0%, #2d4a6e 50%, #3b6391 100%)',
  'linear-gradient(135deg, #4a0e10 0%, #8f1219 50%, #BE1A22 100%)',
];

const HeroCarousel = () => {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <div className="relative h-80 md:h-[440px] overflow-hidden select-none">
      {/* Background */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: gradients[i],
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-[3] h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div
            key={current}
            className="max-w-2xl"
            style={{ animation: 'fadeSlideIn 0.6s ease forwards' }}
          >
            {/* Accent line */}
            <div className="w-12 h-1 bg-amber mb-5 rounded" />

            <h2
              className={`text-white font-bold mb-4 leading-tight drop-shadow-lg
                ${lang === 'np' ? 'font-nepali text-2xl md:text-4xl' : 'text-2xl md:text-4xl lg:text-5xl'}`}
            >
              {lang === 'en' ? slide.titleEn : slide.titleNp}
            </h2>

            <p
              className={`text-white/85 mb-8 leading-relaxed drop-shadow
                ${lang === 'np' ? 'font-nepali text-base md:text-lg' : 'text-sm md:text-base lg:text-lg'}`}
            >
              {lang === 'en' ? slide.subtitleEn : slide.subtitleNp}
            </p>

            <Link
              to={slide.ctaLink}
              className={`inline-block bg-redc hover:bg-redc-light text-white font-semibold px-7 py-3 rounded-sm transition-all hover:shadow-lg active:scale-95
                ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {lang === 'en' ? slide.ctaEn : slide.ctaNp} →
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-[4] w-9 h-9 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-[4] w-9 h-9 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <FaChevronRight size={14} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[4] flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/70'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
