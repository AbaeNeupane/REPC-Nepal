import HeroCarousel from '../components/HeroCarousel';
import AboutIntro from '../components/AboutIntro';
import ChairpersonMessage from '../components/ChairpersonMessage';
import LeadershipGovernance from '../components/LeadershipGovernance';
import NoticesSection from '../components/NoticesSection';
import HighlightsSection from '../components/HighlightsSection';
import GalleryPreview from '../components/GalleryPreview';
import ScrollReveal from '../components/ScrollReveal';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaShieldAlt, FaHandsHelping, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { lang, t } = useLang();

  return (
    <div className="home-page flex flex-col">
      <SEO
        titleEn="Home"
        titleNp="गृह पृष्ठ"
        descriptionEn="Rights, Equity and Peace Campaign Nepal – Legal aid, mediation, human rights advocacy, and peace building in Nepal."
        descriptionNp="अधिकार, समता र शान्ति अभियान नेपाल – कानुनी सहायता, मेलमिलाप, मानव अधिकार अभिवृद्धि र शान्ति स्थापना।"
        path="/"
      />

      {/* Hero */}
      <div className="home-hero relative z-0">
        <HeroCarousel />
      </div>

      {/* Need help right now? — the practical path, before the org-explaining sections */}
      <section className="home-help-strip bg-navy py-5 sm:py-6">
        <div className="site-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <FaHandsHelping className="shrink-0 text-sky" size={22} />
              <p className={`text-sm font-semibold text-white sm:text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Need legal aid or mediation support?', 'कानुनी सहायता वा मेलमिलाप सहयोग चाहिन्छ?')}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                to="/contact?subject=legal"
                className={`inline-flex items-center gap-2 rounded-lg bg-sky px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky/80 ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                {t('Get help now', 'अहिले सहयोग लिनुहोस्')} <FaArrowRight size={11} />
              </Link>
              <Link
                to="/services"
                className={`hidden items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                {t('See our services', 'हाम्रा सेवाहरू हेर्नुहोस्')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract / Introduction */}
      <ScrollReveal>
        <div className="home-section home-intro-shell">
          <AboutIntro />
        </div>
      </ScrollReveal>

      {/* Leadership & Governance */}
      <ScrollReveal delay={60}>
        <div className="home-section home-leadership-shell">
          <LeadershipGovernance />
        </div>
      </ScrollReveal>

      {/* Chairperson's message */}
      <ScrollReveal delay={80}>
        <div className="home-section home-message-shell">
          <ChairpersonMessage />
        </div>
      </ScrollReveal>


      {/** Main content */}
      
      {/* Notices */}
      <ScrollReveal delay={100}>
        <div className="home-updates-shell site-container py-12">
          <div className="mx-auto max-w-2xl">
            <NoticesSection />
          </div>
        </div>
      </ScrollReveal>

      {/* Full-width highlights */}
      <ScrollReveal delay={120}>
        <div className="home-section home-highlights-shell">
          <HighlightsSection />
        </div>
      </ScrollReveal>

      
      {/* Registration / document trust link */}
      <ScrollReveal delay={75}>
        <section className="home-trust-section bg-white py-7 sm:py-8">
          <div className="site-container">
            <div className="flex flex-col gap-5 rounded-2xl border border-sky/20 bg-gradient-to-r from-sky/5 via-white to-navy/[0.04] p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                  <FaShieldAlt size={21} />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.08em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Organizational Trust', 'संस्थागत विश्वास')}
                  </p>
                  <h2 className={`mt-1 text-lg font-bold text-navy sm:text-xl ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Legal status and official documents', 'कानुनी हैसियत तथा आधिकारिक कागजात')}
                  </h2>
                  <p className={`mt-1 text-sm text-slate-600 sm:text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Review registration, affiliation, and other official documents in the Resources section.', 'दर्ता, आबद्धता तथा अन्य आधिकारिक कागजातहरू स्रोत तथा कागजात खण्डमा हेर्नुहोस्।')}
                  </p>
                </div>
                
              </div>
              <Link
                to="/resources#organizational-documents"
                className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md sm:self-center ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                {t('View documents', 'कागजात हेर्नुहोस्')}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Campaign highlights */}
      {/* <ScrollReveal delay={140}>
        <CampaignHighlights />
      </ScrollReveal> */}

      {/* Gallery preview */}
      <ScrollReveal delay={160}>
        <div className="home-section home-gallery-shell">
          <GalleryPreview />
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Home;
