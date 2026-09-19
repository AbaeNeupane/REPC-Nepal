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
        <div className="w-12 h-1 bg-sky mt-3 rounded" />
      </div>
    </div>
  );
};

// Replace `src: null` with real image paths like '/images/gallery/img1.jpg'
export const galleryItems = [
  { id: 2, src: '/images/gallery/meetings/photo1.jpeg', altEn: 'A constructive discussion on the website outline, content, and future direction was held at the organization’s Thapathali office. The meeting was attended by senior advocate and mediation expert Dr. Kumar Sharma Acharya, Mediation Council member Advocate Chup Bahadur Thapa, Chairperson Advocate Sushila Singhkhada, and organization officials. Held on 1 Ashoj 2083 B.S., Wednesday.', altNp: 'संस्थाकाे वेबसाइटको रूपरेखा, सामग्री तथा आगामी कार्यदिशाका सम्बन्धमा मेलमिलाप विज्ञ वरिष्ठ अधिवक्ता डा. कुमार शर्मा आचार्य र मेलमिलाप परिषद्का सदस्य अधिवक्ता चूप बहादुर थापाज्यू सहित संस्थाका अध्यक्ष अधिवक्ता शुसिला सिंखडा तथा पदाधिकारीहरुको उपस्थितिमा रचनात्मक छलफल संस्थाको थापाथलीस्थित कार्यालयमा सम्पन्न भयो। ईति संवत् २०८३ असाेज १ गते राेज ५ शुभम् ....।', color: 'from-sky to-sky-light', categoryEn: 'Meeting', categoryNp: 'बैठक' },
  { id: 1, src: '/images/gallery/milestone/cdo-registration.jpeg', altEn: 'Registered with the Chief District Officer on 4 Bhadra 2083 at District Administration Office, Kathmandu.', altNp: 'जिल्ला प्रशासन कार्यालय काठमाडौंमा संस्था दर्ता गरेपश्चात् प्रमुख जिल्ला अधिकारी ईश्वर राज पौडेलबाट संस्था दर्ता प्रमाणपत्र ग्रहण गर्दै अधिकार, समता र शान्ति अभियान–नेपालकी अध्यक्ष अधिवक्ता शुशिला सिंखडा।', color: 'from-navy to-navy-light', categoryEn: 'Milestone', categoryNp: 'उपलब्धि' },

];

const Gallery = () => {
  const { lang, t } = useLang();
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      <PageBanner titleEn="Photo Gallery" titleNp="फोटो ग्यालरी" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className={`text-gray-500 text-sm mb-6 italic ${lang === 'np' ? 'font-nepali' : ''}`}>
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

        {/* Upload prompt — shown only when all gallery items are placeholders */}
        {galleryItems.every(item => !item.src) && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-sm p-6 text-center">
            <FaImages className="mx-auto text-gray-300 mb-3" size={32} />
            <p className={`text-gray-500 text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t(
                'Photos from our events and programs will appear here soon.',
                'हाम्रा कार्यक्रम तथा गतिविधिहरूका फोटोहरू चाँडै यहाँ प्रकाशित हुनेछन्।'
              )}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            {lightbox.src ? (
              <div className="aspect-[3/2] w-full bg-black rounded overflow-hidden">
                <img
                  src={lightbox.src}
                  alt={lang === 'en' ? lightbox.altEn : lightbox.altNp}
                  className="w-full h-full object-contain"
                />
              </div>
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