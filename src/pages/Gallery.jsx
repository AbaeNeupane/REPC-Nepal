import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaImages, FaTimes } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="w-12 h-1 bg-redc mt-3 rounded" />
      </div>
    </div>
  );
};

// Replace `src: null` with real image paths like '/images/gallery/img1.jpg'
const galleryItems = [
  { id: 1, src: null, altEn: 'Human Rights Training Session', altNp: 'मानव अधिकार तालिम सत्र', color: 'from-navy to-navy-light', categoryEn: 'Training', categoryNp: 'तालिम' },
  { id: 2, src: null, altEn: 'Mediation Workshop 2083', altNp: 'मेलमिलाप कार्यशाला २०८३', color: 'from-redc to-redc-light', categoryEn: 'Workshop', categoryNp: 'कार्यशाला' },
  { id: 3, src: null, altEn: 'Community Awareness Program', altNp: 'सामुदायिक सचेतना कार्यक्रम', color: 'from-slate-600 to-slate-500', categoryEn: 'Awareness', categoryNp: 'सचेतना' },
  { id: 4, src: null, altEn: 'Free Legal Aid Camp', altNp: 'निःशुल्क कानुनी सहायता शिविर', color: 'from-amber-600 to-amber-500', categoryEn: 'Legal Aid', categoryNp: 'कानुनी सहायता' },
  { id: 5, src: null, altEn: 'Peace Campaign 2083', altNp: 'शान्ति अभियान २०८३', color: 'from-green-700 to-green-600', categoryEn: 'Campaign', categoryNp: 'अभियान' },
  { id: 6, src: null, altEn: 'Annual General Meeting 2083', altNp: 'वार्षिक साधारण सभा २०८३', color: 'from-purple-700 to-purple-600', categoryEn: 'Meeting', categoryNp: 'सभा' },
  { id: 7, src: null, altEn: 'Child Rights Awareness Event', altNp: 'बाल अधिकार सचेतना कार्यक्रम', color: 'from-teal-700 to-teal-600', categoryEn: 'Event', categoryNp: 'कार्यक्रम' },
  { id: 8, src: null, altEn: 'Women Empowerment Program', altNp: 'महिला सशक्तिकरण कार्यक्रम', color: 'from-rose-700 to-rose-600', categoryEn: 'Program', categoryNp: 'कार्यक्रम' },
  { id: 9, src: null, altEn: 'Mediation Center Launch', altNp: 'मेलमिलाप केन्द्र उद्घाटन', color: 'from-indigo-700 to-indigo-600', categoryEn: 'Launch', categoryNp: 'उद्घाटन' },
];

const Gallery = () => {
  const { lang, t } = useLang();
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      <PageBanner titleEn="Photo Gallery" titleNp="फोटो ग्यालरी" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className={`text-gray-500 text-sm mb-6 ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t(
            'Photos from our programs, trainings, events, and campaigns across Nepal.',
            'नेपालभर हाम्रा कार्यक्रम, तालिम, कार्यक्रम र अभियानहरूका फोटोहरू।'
          )}
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className="relative aspect-square overflow-hidden cursor-pointer rounded-sm group shadow-sm hover:shadow-md transition-shadow"
            >
              {item.src ? (
                <img src={item.src} alt={lang === 'en' ? item.altEn : item.altNp}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${item.color} flex flex-col items-center justify-center gap-2 p-3 group-hover:brightness-90 transition-all`}>
                  <FaImages className="text-white/50" size={28} />
                  <p className={`text-white/90 text-xs text-center leading-tight font-medium ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? item.altEn : item.altNp}
                  </p>
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                <span className={`text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? item.categoryEn : item.categoryNp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-sm p-4 text-center">
          <p className={`text-blue-700 text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              '📷 To add real photos: replace placeholder items in src/pages/Gallery.jsx with your image paths.',
              '📷 वास्तविक फोटो थप्न: src/pages/Gallery.jsx मा placeholder items लाई आफ्नो इमेज पाथले प्रतिस्थापन गर्नुहोस्।'
            )}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" aria-label="Close">
            <FaTimes size={24} />
          </button>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            {lightbox.src ? (
              <img src={lightbox.src} alt={lang === 'en' ? lightbox.altEn : lightbox.altNp} className="w-full rounded" />
            ) : (
              <div className={`aspect-video bg-gradient-to-br ${lightbox.color} rounded flex flex-col items-center justify-center gap-3`}>
                <FaImages className="text-white/50" size={48} />
                <p className={`text-white text-lg font-semibold text-center px-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? lightbox.altEn : lightbox.altNp}
                </p>
              </div>
            )}
            <p className={`text-white/80 text-sm text-center mt-3 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? lightbox.altEn : lightbox.altNp}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
