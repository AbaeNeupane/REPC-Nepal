import { createPortal } from 'react-dom';
import { useLang } from '../context/LanguageContext';
import { FaUserCircle, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';
import useScrollLock from '../hooks/useScrollLock';

const TeamBioModal = ({ member, onClose }) => {
  const { lang, t } = useLang();
  useScrollLock(true);
  const bio = lang === 'en' ? member.bioEn : member.bioNp;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-scaleIn"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-navy px-5 py-4">
          <h2 className={`font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Committee Member', 'समिति सदस्य')}
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

        <div className="p-6 text-center">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.nameEn}
              className="mx-auto h-24 w-24 rounded-full border-4 border-navy/10 object-cover shadow"
              onError={event => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`${member.photo ? 'hidden' : 'flex'} mx-auto h-24 w-24 items-center justify-center rounded-full border-4 border-navy/10 bg-navy/10 shadow`}>
            <FaUserCircle className="text-navy/50" size={52} />
          </div>

          <h3 className={`mt-4 text-lg font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? member.nameEn : member.nameNp}
          </h3>
          <p className={`mt-1 text-sm font-semibold text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? member.positionEn : member.positionNp}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {member.phone && (
              <a href={`tel:${member.phone}`} className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-navy">
                <FaPhone size={11} /> {member.phone}
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-navy">
                <FaEnvelope size={11} /> {member.email}
              </a>
            )}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-5 text-left">
            {bio ? (
              <p className={`text-justify text-sm leading-relaxed text-gray-600 ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                {bio}
              </p>
            ) : (
              <p className="text-center text-sm italic text-gray-400">
                {t('Bio coming soon.', 'परिचय चाँडै आउँदैछ।')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TeamBioModal;
