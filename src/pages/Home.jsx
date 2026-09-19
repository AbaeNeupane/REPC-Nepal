import HeroCarousel from '../components/HeroCarousel';
import AboutIntro from '../components/AboutIntro';
import ChairpersonMessage from '../components/ChairpersonMessage';
import NoticesSection from '../components/NoticesSection';
import ServicesSection from '../components/ServicesSection';
import HighlightsSection from '../components/HighlightsSection';
import CampaignHighlights from '../components/CampaignHighlights';
import GalleryPreview from '../components/GalleryPreview';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaArrowRight, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  const { lang, t } = useLang();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroCarousel />

      {/* Abstract / Introduction */}
      <ScrollReveal>
        <AboutIntro />
      </ScrollReveal>

      {/* Chairperson's message */}
      <ScrollReveal delay={60}>
        <ChairpersonMessage />
      </ScrollReveal>

      {/* Registration / document trust link */}
      <ScrollReveal delay={75}>
        <section className="bg-white py-7 sm:py-8">
          <div className="site-container">
            <div className="flex flex-col gap-5 rounded-2xl border border-sky/20 bg-gradient-to-r from-sky/5 via-white to-navy/[0.04] p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                  <FaShieldAlt size={21} />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.08em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Registration & Legal Documents', 'दर्ता तथा कानुनी कागजात')}
                  </p>
                  <h2 className={`mt-1 text-lg font-bold text-navy sm:text-xl ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Official organizational documents', 'संस्थाका आधिकारिक कागजातहरू')}
                  </h2>
                  <p className={`mt-1 text-sm text-slate-600 sm:text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('View the organization’s registration documents and inspect them at full size.', 'संस्थाका दर्ता कागजातहरू हेर्नुहोस् र पूर्ण आकारमा निरीक्षण गर्नुहोस्।')}
                  </p>
                </div>
              </div>

              <Link
                to="/about#registration-documents"
                className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md sm:self-center ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                {t('View documents', 'कागजात हेर्नुहोस्')}
                <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/** Main content */}
      
      {/* Main two-column content */}
      <ScrollReveal delay={90}>
        <div className="site-container py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <NoticesSection />
            <ServicesSection />
          </div>
        </div>
      </ScrollReveal>

      {/* Full-width highlights */}
      <ScrollReveal delay={120}>
        <HighlightsSection />
      </ScrollReveal>

      {/* Campaign highlights */}
      <ScrollReveal delay={140}>
        <CampaignHighlights />
      </ScrollReveal>

      {/* Gallery preview */}
      <ScrollReveal delay={160}>
        <GalleryPreview />
      </ScrollReveal>
    </div>
  );
};

export default Home;
