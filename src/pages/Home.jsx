import HeroCarousel from '../components/HeroCarousel';
import AboutIntro from '../components/AboutIntro';
import ChairpersonMessage from '../components/ChairpersonMessage';
import NoticesSection from '../components/NoticesSection';
import ServicesSection from '../components/ServicesSection';
import HighlightsSection from '../components/HighlightsSection';
import CampaignHighlights from '../components/CampaignHighlights';
import GalleryPreview from '../components/GalleryPreview';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  return (
    <div>
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

      {/* Main two-column content */}
      <ScrollReveal delay={90}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left: Notices (takes 2/3) */}
        <div className="lg:col-span-2">
          <NoticesSection />
        </div>

        {/* Right: Services (takes 1/3) */}
        <div className="lg:col-span-1 flex flex-col gap-0">
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
