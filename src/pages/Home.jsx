import HeroCarousel from '../components/HeroCarousel';
import NoticesSection from '../components/NoticesSection';
import ServicesSection from '../components/ServicesSection';
import TeamSection from '../components/TeamSection';
import HighlightsSection from '../components/HighlightsSection';
import GalleryPreview from '../components/GalleryPreview';

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Main two-column content */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Notices (takes 2/3) */}
        <div className="lg:col-span-2">
          <NoticesSection />
        </div>

        {/* Right: Services + Team (takes 1/3) */}
        <div className="lg:col-span-1 flex flex-col gap-0">
          <ServicesSection />
          <TeamSection />
        </div>
      </div>

      {/* Full-width highlights */}
      <HighlightsSection />

      {/* Gallery preview */}
      <GalleryPreview />
    </div>
  );
};

export default Home;
