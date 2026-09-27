import { useLang } from '../context/LanguageContext';
import { team } from '../data/team';
import { FaUserCircle, FaPhone, FaEnvelope } from 'react-icons/fa';

const ExecutiveCommitteeSection = ({ onMemberClick, className = '' }) => {
  const { lang, t } = useLang();

  return (
    <section id="team" className={`scroll-mt-20 ${className}`}>
      <h2 className={`mb-4 text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
        {t('Executive Committee', 'कार्य समिति')}
      </h2>

      <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 md:grid-cols-3">
        {team.map(member => (
          <div
            key={member.id}
            className={`relative mx-auto w-full max-w-[15.5rem] min-w-0 ${member.positionEn === 'Chairperson' ? 'sm:col-span-2 md:col-span-3' : ''}`}
          >
            <div
              onClick={() => onMemberClick?.(member)}
              role={onMemberClick ? 'button' : undefined}
              tabIndex={onMemberClick ? 0 : undefined}
              onKeyDown={event => onMemberClick && event.key === 'Enter' && onMemberClick(member)}
              className={`member-card overflow-hidden p-3 text-center transition-all ${onMemberClick ? 'cursor-pointer' : ''}`}
            >
              <div className="member-photo-frame relative aspect-square overflow-hidden rounded-xl border p-1 shadow-sm transition-all">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.nameEn}
                    className="h-full w-full object-cover"
                    onError={event => {
                      event.currentTarget.style.display = 'none';
                      event.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`${member.photo ? 'hidden' : 'flex'} h-full w-full items-center justify-center bg-[#dbe9f7]`}>
                  <FaUserCircle className="text-navy/50" size={52} />
                </div>
              </div>

              <div className="px-1 pt-3 text-center">
                <h3 className={`text-base font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? member.nameEn : member.nameNp}
                </h3>
                <p className={`mt-1 text-xs font-semibold text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? member.positionEn : member.positionNp}
                </p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  {member.phone && (
                    <a href={`tel:${member.phone}`} onClick={event => event.stopPropagation()} className="text-gray-400 transition-colors hover:text-navy" aria-label={t('Phone', 'फोन')}>
                      <FaPhone size={13} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} onClick={event => event.stopPropagation()} className="text-gray-400 transition-colors hover:text-navy" aria-label={t('Email', 'इमेल')}>
                      <FaEnvelope size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExecutiveCommitteeSection;
