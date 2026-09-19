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
    <div className="flex flex-col gap-12">
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

      {/** Main content */}
      
      {/* Main two-column content */}
      <ScrollReveal delay={90}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-8 py-12">
          <NoticesSection />
          <ServicesSection />
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
