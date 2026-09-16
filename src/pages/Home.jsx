import HeroCarousel from '../components/HeroCarousel';
import AboutIntro from '../components/AboutIntro';
import ImpactStats from '../components/ImpactStats';
import NoticesSection from '../components/NoticesSection';
import ServicesSection from '../components/ServicesSection';
import HighlightsSection from '../components/HighlightsSection';
import CampaignHighlights from '../components/CampaignHighlights';
import GalleryPreview from '../components/GalleryPreview';

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Abstract / Introduction */}
      <AboutIntro />

      {/* Impact stats */}
      <ImpactStats />

      {/* Main two-column content */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Notices (takes 2/3) */}
        <div className="lg:col-span-2">
          <NoticesSection />
        </div>

        {/* Right: Services (takes 1/3) */}
        <div className="lg:col-span-1 flex flex-col gap-0">
          <ServicesSection />
        </div>
      </div>

      {/* Full-width highlights */}
      <HighlightsSection />

      {/* Campaign highlights */}
      <CampaignHighlights />

      {/* Gallery preview */}
      <GalleryPreview />
    </div>
  );
};

export default Home;
