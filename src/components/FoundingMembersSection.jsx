import { useLang } from '../context/LanguageContext';
import { team } from '../data/team';
import { FaUserCircle } from 'react-icons/fa';

const FoundingMembersSection = ({ onMemberClick }) => {
  const { lang, t } = useLang();

  return (
    <section id="founding-members" className="mb-12 scroll-mt-20">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Founding Members', 'संस्थापक सदस्यहरू')}
          </h2>
          <p className={`mt-1 max-w-3xl text-sm leading-relaxed text-gray-500 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'These nine founding members currently serve as the Executive Committee of REPC-Nepal.',
              'यी नौ जना संस्थापक सदस्यहरू हाल REPC-नेपालको कार्य समितिमा पनि सेवा गरिरहनुभएको छ।'
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {team.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => onMemberClick?.(member)}
            className="group rounded-sm border border-gray-200 bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky/40"
          >
            <div className="mx-auto aspect-square w-full max-w-[9rem] overflow-hidden rounded-sm border border-gray-100 bg-gray-50 p-1">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={lang === 'en' ? member.nameEn : member.nameNp}
                  className="h-full w-full object-cover"
                  onError={event => {
                    event.currentTarget.style.display = 'none';
                    event.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`${member.photo ? 'hidden' : 'flex'} h-full w-full items-center justify-center bg-navy/10`}
              >
                <FaUserCircle className="text-navy/40" size={44} />
              </div>
            </div>
            <p className={`mt-3 font-bold text-navy text-sm leading-snug ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? member.nameEn : member.nameNp}
            </p>
            <p className={`mt-1 text-[11px] font-semibold text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? member.positionEn : member.positionNp}
            </p>
            <p className={`mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 ${lang === 'np' ? 'font-nepali tracking-normal' : ''}`}>
              {t('Founding Member', 'संस्थापक सदस्य')}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FoundingMembersSection;
