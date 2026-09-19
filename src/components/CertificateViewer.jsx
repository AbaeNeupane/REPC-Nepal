import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
import { useLang } from '../context/LanguageContext';
import { certificates } from '../data/certificates';
import useScrollLock from '../hooks/useScrollLock';

// Same simple lightbox pattern as the Gallery page: dark backdrop, close
// button, centered image, caption below, click outside to close.
const CertificateLightbox = ({ certificate, onClose }) => {
  const { lang } = useLang();
  useScrollLock(Boolean(certificate));
  if (!certificate) return null;

  const title = lang === 'en' ? certificate.titleEn : certificate.titleNp;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close"
      >
        <FaTimes size={24} />
      </button>
      <div className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-full bg-black rounded overflow-hidden flex items-center justify-center">
          <img
            src={certificate.image}
            alt={title}
            className="max-h-[80vh] w-full object-contain"
          />
        </div>
        <p className={`text-white/80 text-sm text-center mt-3 ${lang === 'np' ? 'font-nepali' : ''}`}>
          {title}
        </p>
      </div>
    </div>,
    document.body
  );
};

const CertificateDocuments = ({ compact = false }) => {
  const { lang, t } = useLang();
  const [active, setActive] = useState(null);

  return (
    <>
      <section
        id={compact ? undefined : 'registration-documents'}
        className={compact ? 'py-8' : 'scroll-mt-28 py-2'}
      >
        <div className={compact ? 'site-container' : ''}>
          {!compact && (
            <div className="mb-6 max-w-3xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-sky">
                <FaFileAlt size={12} />
                {t('Registration & Legal Documents', 'दर्ता तथा कानुनी कागजात')}
              </div>
              <h2 className={`text-2xl font-bold text-navy sm:text-3xl ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Official Registration Documents', 'आधिकारिक दर्ता कागजातहरू')}
              </h2>
              <p className={`mt-2 text-base leading-relaxed text-slate-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t(
                  'View the organization’s registration and official documents. Click any document to view it larger.',
                  'संस्थाका दर्ता तथा आधिकारिक कागजातहरू हेर्नुहोस्। ठूलो आकारमा हेर्न कुनै पनि कागजातमा क्लिक गर्नुहोस्।'
                )}
              </p>
            </div>
          )}

          <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${compact ? 'lg:grid-cols-4' : 'lg:grid-cols-4'}`}>
            {certificates.map((certificate) => {
              const title = lang === 'en' ? certificate.titleEn : certificate.titleNp;

              return (
                <article
                  key={certificate.id}
                  onClick={() => setActive(certificate)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100 p-3">
                    <img
                      src={certificate.image}
                      alt={title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className={`text-base font-bold text-navy sm:text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {t('Official document · Click to view', 'आधिकारिक कागजात · हेर्न क्लिक गर्नुहोस्')}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CertificateLightbox certificate={active} onClose={() => setActive(null)} />
    </>
  );
};

export default CertificateDocuments;