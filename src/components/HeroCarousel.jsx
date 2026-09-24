import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { heroSlides } from '../data/home';
import { FaChevronLeft, FaChevronRight, FaAward, FaUsers, FaHandshake } from 'react-icons/fa';

const gradients = [
  'linear-gradient(135deg, #07163d 0%, #0C2264 52%, #1a3a8f 100%)',
  'linear-gradient(135deg, #1b2b3f 0%, #2a466b 50%, #3d6284 100%)',
  'linear-gradient(135deg, #0c2f5c 0%, #0369A1 45%, #0EA5E9 100%)',
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
    <section className="relative h-[390px] sm:h-[370px] md:h-[520px] overflow-hidden bg-slate-950 select-none">
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
        <div className="site-container h-full">
          <div className="flex h-full items-center">
            <div className="max-w-2xl pt-4 sm:pt-6 md:pt-0" key={current} style={{ animation: 'fadeSlideIn 0.7s ease forwards' }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                <FaAward className="text-sky" size={12} />
                {lang === 'en' ? 'Peace • Rights • Justice' : 'शान्ति • अधिकार • न्याय'}
              </div>

              <h1 className={`mt-3 sm:mt-4 text-white font-black leading-[1.04] drop-shadow-lg ${lang === 'np' ? 'font-nepali text-2xl sm:text-3xl md:text-5xl' : 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl'}`}>
                {lang === 'en' ? slide.titleEn : slide.titleNp}
              </h1>

              <p className={`mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-white/85 leading-relaxed md:text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
                {lang === 'en' ? slide.subtitleEn : slide.subtitleNp}
              </p>

              <div className="mt-5 sm:mt-6 flex flex-row items-start gap-2 sm:gap-3">
                <Link
                  to={slide.ctaLink}
                  className={`inline-flex items-center justify-center bg-sky hover:bg-sky-light text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition-all hover:-translate-y-0.5 ${lang === 'np' ? 'font-nepali' : ''}`}
                >
                  {lang === 'en' ? slide.ctaEn : slide.ctaNp}
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center border border-white/40 bg-white/5 text-white hover:bg-white/10 text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-sm transition-all"
                >
                  {lang === 'en' ? 'About Us' : 'हाम्रो बारेमा'}
                </Link>
              </div>

              <div className="hidden sm:flex mt-6 flex-wrap gap-3 text-white/80">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <FaUsers size={12} />
                  <span className={`text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? 'Human rights advocacy' : 'मानव अधिकारको वकालत'}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <FaHandshake size={12} />
                  <span className={`text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? 'Mediation and legal support' : 'मेलमिलाप तथा कानुनी सहयोग'}
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
