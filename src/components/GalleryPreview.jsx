import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaImages } from 'react-icons/fa';

const galleryItems = [
  { id: 1, src: '/images/gallery/milestone/cdo-registration.jpeg', altEn: 'Official Registration with CDO, 4 Bhadra 2083', altNp: 'जिल्ला प्रशासन कार्यालय काठमाडौंमा संस्था दर्ता गरे पश्चात...', color: 'bg-navy/80' },
  { id: 2, src: null, altEn: 'Mediation Workshop', altNp: 'मेलमिलाप कार्यशाला', color: 'bg-redc/80' },
  { id: 3, src: null, altEn: 'Community Awareness Program', altNp: 'सामुदायिक सचेतना कार्यक्रम', color: 'bg-slate-600/80' },
  { id: 4, src: null, altEn: 'Legal Aid Camp', altNp: 'कानुनी सहायता शिविर', color: 'bg-amber/80' },
  { id: 5, src: null, altEn: 'Peace Campaign 2083', altNp: 'शान्ति अभियान २०८३', color: 'bg-green-700/80' },
  { id: 6, src: null, altEn: 'Annual General Meeting', altNp: 'वार्षिक साधारण सभा', color: 'bg-purple-700/80' },
].sort((a, b) => (b.src ? 1 : 0) - (a.src ? 1 : 0));

const GalleryPreview = () => {
  const { lang, t } = useLang();

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-redc ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Moments', 'झलकहरू')}
            </p>
            <h2 className={`mt-2 text-3xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Photo Gallery', 'फोटो ग्यालरी')}
            </h2>
          </div>

          <Link
            to="/gallery"
            className={`inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-redc ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            <FaImages size={14} /> {t('View All', 'सबै हेर्नुहोस्')}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {galleryItems.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group relative aspect-square overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={lang === 'en' ? item.altEn : item.altNp}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className={`flex h-full w-full flex-col items-center justify-center gap-2 ${item.color}`}>
                  <FaImages className="text-white/65" size={22} />
                  <p className={`px-2 text-center text-[10px] leading-relaxed text-white/80 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? item.altEn : item.altNp}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07163d]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;