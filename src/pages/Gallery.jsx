import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaImages, FaTimes, FaYoutube } from 'react-icons/fa';
import useScrollLock from '../hooks/useScrollLock';
import SEO from '../components/SEO';
import { galleryItems, getYouTubeVideoId, youtubeVideos } from '../data/gallery';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10">
      <div className="site-container">
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

const Gallery = () => {
  const { lang, t } = useLang();
  const [lightbox, setLightbox] = useState(null);
  useScrollLock(Boolean(lightbox));

  useEffect(() => {
    document.body.classList.toggle('overlay-open', Boolean(lightbox));
    return () => document.body.classList.remove('overlay-open');
  }, [lightbox]);

  return (
    <div>
      <SEO
        titleEn="Photo Gallery"
        titleNp="फोटो ग्यालरी"
        descriptionEn="Photos from REPC-Nepal's meetings, milestones, and community activities."
        descriptionNp="REPC-नेपालका बैठक, उपलब्धि र सामुदायिक गतिविधिहरूका तस्बिरहरू।"
        path="/gallery"
      />
      <PageBanner titleEn="Photo Gallery" titleNp="फोटो ग्यालरी" />

      <div className="site-container py-10">
        <p className={`text-gray-500 text-sm mb-6 italic ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t(
            "Photos from REPC-Nepal's programs, trainings, meetings, events, and campaigns.",
            'REPC-नेपालका कार्यक्रम, तालिम, बैठक, कार्यक्रम तथा अभियानसम्बन्धी तस्बिरहरू।'
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

      </div>

      {youtubeVideos.length > 0 && (
        <section className="border-t border-blue-100 bg-[#e9f2fb] py-12">
          <div className="site-container">
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Watch', 'दृश्य सामग्री')}
                </p>
                <h2 className={`mt-1 text-2xl font-bold text-navy sm:text-3xl ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Video Gallery', 'भिडियो ग्यालरी')}
                </h2>
              </div>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-sky ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                <FaYoutube size={16} /> {t('YouTube', 'युट्युब')}
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {youtubeVideos.map((video) => {
                const videoId = getYouTubeVideoId(video.source);
                if (!videoId) return null;

                return (
                  <article key={video.id} className="site-card overflow-hidden rounded-2xl">
                    <div className="aspect-video bg-slate-900">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        title={lang === 'np' ? (video.titleNp || video.titleEn || 'REPC-Nepal video') : (video.titleEn || 'REPC-Nepal video')}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className={`font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {lang === 'np' ? (video.titleNp || video.titleEn) : video.titleEn}
                      </h3>
                      {video.descriptionEn && (
                        <p className={`mt-1.5 text-sm text-slate-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
                          {lang === 'np' ? video.descriptionNp : video.descriptionEn}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && createPortal(
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
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
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;