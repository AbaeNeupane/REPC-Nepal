import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { heroSlides } from '../data/siteContent';
import { FaChevronLeft, FaChevronRight, FaAward, FaUsers, FaHandshake } from 'react-icons/fa';

const gradients = [
  'linear-gradient(135deg, #07163d 0%, #0C2264 52%, #1a3a8f 100%)',
  'linear-gradient(135deg, #1b2b3f 0%, #2a466b 50%, #3d6284 100%)',
  'linear-gradient(135deg, #4f0d13 0%, #8f1219 45%, #b71f2d 100%)',
];

const HeroCarousel = () => {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const animatingRef = useRef(false);

  const goTo = useCallback((idx) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setCurrent(idx);
    setTimeout(() => { animatingRef.current = false; }, 650);
  }, []);

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="relative h-[420px] md:h-[520px] overflow-hidden bg-slate-950 select-none">
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{
            background: gradients[i],
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      <div
        className="absolute inset-0 z-[2] opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#07163d]/80 via-[#07163d]/35 to-transparent" />

      <div className="relative z-[3] h-full">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center">
            <div className="max-w-2xl pt-10 md:pt-0" key={current} style={{ animation: 'fadeSlideIn 0.7s ease forwards' }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                <FaAward className="text-amber" size={12} />
                {lang === 'en' ? 'Peace • Rights • Justice' : 'शान्ति • अधिकार • न्याय'}
              </div>

              <h1 className={`mt-5 text-white font-black leading-[1.04] drop-shadow-lg ${lang === 'np' ? 'font-nepali text-3xl md:text-5xl' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
                {lang === 'en' ? slide.titleEn : slide.titleNp}
              </h1>

              <p className={`mt-5 max-w-xl text-white/85 leading-relaxed ${lang === 'np' ? 'font-nepali text-base md:text-lg' : 'text-base md:text-lg'}`}>
                {lang === 'en' ? slide.subtitleEn : slide.subtitleNp}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
                <Link
                  to={slide.ctaLink}
                  className={`inline-flex items-center justify-center bg-redc hover:bg-redc-light text-white font-semibold px-7 py-3 rounded-full shadow-lg transition-all hover:-translate-y-0.5 ${lang === 'np' ? 'font-nepali' : ''}`}
                >
                  {lang === 'en' ? slide.ctaEn : slide.ctaNp}
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center border border-white/40 bg-white/5 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-full backdrop-blur-sm transition-all"
                >
                  {lang === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <FaUsers size={12} />
                  <span className={`text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? 'Community-led' : 'समुदायको नेतृत्वमा'}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <FaHandshake size={12} />
                  <span className={`text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? 'Conflict resolution' : 'द्वन्द्व समाधान'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-[4] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white transition hover:bg-black/35"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={14} />
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-[4] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white transition hover:bg-black/35"
        aria-label="Next slide"
      >
        <FaChevronRight size={14} />
      </button>

      <div className="absolute bottom-5 left-1/2 z-[4] flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all ${i === current ? 'h-2.5 w-8 bg-white' : 'h-2.5 w-2.5 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
