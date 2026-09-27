import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../context/LanguageContext';
import { FaUserCircle, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';
import useScrollLock from '../hooks/useScrollLock';

const TeamBioModal = ({ member, onClose }) => {
  const { lang, t } = useLang();
  useScrollLock(true);

  useEffect(() => {
    document.body.classList.add('overlay-open');
    return () => document.body.classList.remove('overlay-open');
  }, []);

  const bio = lang === 'en' ? member.bioEn : member.bioNp;

  // Supports both:
  // 1. An array of paragraphs in team.js
  // 2. A single string with blank lines between paragraphs
  const paragraphs = Array.isArray(bio)
    ? bio.filter(Boolean)
    : bio
      ? bio
          .split(/\n\s*\n/)
          .map(paragraph => paragraph.trim())
          .filter(Boolean)
      : [];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-2xl bg-[#f3f8fe] shadow-2xl animate-scaleIn"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-navy px-5 py-4">
          <h2
            className={`font-bold text-white ${
              lang === 'np' ? 'font-nepali' : ''
            }`}
          >
            {t('Committee Profile', 'समिति पदाधिकारीको परिचय')}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-white/70 transition-colors hover:text-white"
            aria-label={t('Close', 'बन्द गर्नुहोस्')}
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="p-5 text-center sm:p-7">
          <div className="modal-photo-frame mx-auto max-w-xl">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.nameEn}
                className="h-full w-full object-cover"
                onError={event => {
                  event.currentTarget.style.display = 'none';

                  if (event.currentTarget.nextSibling) {
                    event.currentTarget.nextSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}

            <div
              className={`${
                member.photo ? 'hidden' : 'flex'
              } h-full w-full items-center justify-center bg-[#dbe9f7]`}
            >
              <FaUserCircle className="text-navy/45" size={88} />
            </div>
          </div>

          <h3
            className={`mt-4 text-lg font-bold text-navy ${
              lang === 'np' ? 'font-nepali' : ''
            }`}
          >
            {lang === 'en' ? member.nameEn : member.nameNp}
          </h3>

          <p
            className={`mt-1 text-sm font-semibold text-sky ${
              lang === 'np' ? 'font-nepali' : ''
            }`}
          >
            {lang === 'en'
              ? member.positionEn
              : member.positionNp}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-navy"
              >
                <FaPhone size={11} /> {member.phone}
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-navy"
              >
                <FaEnvelope size={11} /> {member.email}
              </a>
            )}
          </div>

          <div className="mt-6 border-t border-blue-100 pt-5 text-left">
            {paragraphs.length > 0 ? (
              <div
                className={`space-y-4 text-justify text-sm leading-relaxed text-gray-600 ${
                  lang === 'np'
                    ? 'font-nepali text-base leading-8'
                    : ''
                }`}
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TeamBioModal;
