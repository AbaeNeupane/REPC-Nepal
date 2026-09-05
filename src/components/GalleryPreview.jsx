import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaImages } from 'react-icons/fa';

// Placeholder gallery items — replace src with real image paths
const galleryItems = [
  { id: 1, src: null, altEn: 'Human Rights Training Session', altNp: 'मानव अधिकार तालिम सत्र', color: 'bg-navy/80' },
  { id: 2, src: null, altEn: 'Mediation Workshop', altNp: 'मेलमिलाप कार्यशाला', color: 'bg-redc/80' },
  { id: 3, src: null, altEn: 'Community Awareness Program', altNp: 'सामुदायिक सचेतना कार्यक्रम', color: 'bg-slate-600/80' },
  { id: 4, src: null, altEn: 'Legal Aid Camp', altNp: 'कानुनी सहायता शिविर', color: 'bg-amber/80' },
  { id: 5, src: null, altEn: 'Peace Campaign 2083', altNp: 'शान्ति अभियान २०८३', color: 'bg-green-700/80' },
  { id: 6, src: null, altEn: 'Annual General Meeting', altNp: 'वार्षिक साधारण सभा', color: 'bg-purple-700/80' },
];

const GalleryPreview = () => {
  const { lang, t } = useLang();

  return (
    <section className="py-10 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Photo Gallery', 'फोटो ग्यालरी')}
            </h2>
            <div className="w-10 h-0.5 bg-redc mt-2 rounded" />
          </div>
          <Link
            to="/gallery"
            className={`text-sm font-semibold text-navy hover:text-redc transition-colors flex items-center gap-1 ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            <FaImages size={14} /> {t('View All', 'सबै हेर्नुहोस्')}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {galleryItems.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="relative aspect-square overflow-hidden group rounded-sm"
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={lang === 'en' ? item.altEn : item.altNp}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                /* Placeholder until real images are added */
                <div className={`w-full h-full ${item.color} flex flex-col items-center justify-center gap-2`}>
                  <FaImages className="text-white/60" size={24} />
                  <p className={`text-white/80 text-xs text-center px-1 leading-tight ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? item.altEn : item.altNp}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
