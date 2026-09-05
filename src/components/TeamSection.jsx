import { useLang } from '../context/LanguageContext';
import { team } from '../data/siteContent';
import { FaUserCircle, FaPhone, FaEnvelope } from 'react-icons/fa';

const TeamSection = () => {
  const { lang, t } = useLang();

  // Show only top 4 members on homepage
  const featured = team.slice(0, 4);

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm mt-4">
      {/* Header */}
      <div className="bg-navy px-4 py-3">
        <h2 className={`text-white font-bold text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t('Executive Committee', 'कार्य समिति')}
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {featured.map((member) => (
          <div key={member.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
            {/* Photo / Avatar */}
            <div className="shrink-0">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={lang === 'en' ? member.nameEn : member.nameNp}
                  className="w-12 h-12 rounded-full object-cover border-2 border-navy/20"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                  <FaUserCircle className="text-navy/40" size={32} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-navy text-sm truncate ${lang === 'np' ? 'font-nepali' : ''}`}>
                {lang === 'en' ? member.nameEn : member.nameNp}
              </p>
              <p className={`text-xs text-redc font-medium ${lang === 'np' ? 'font-nepali' : ''}`}>
                {lang === 'en' ? member.positionEn : member.positionNp}
              </p>
              <div className="flex items-center gap-3 mt-1">
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-navy transition-colors">
                    <FaPhone size={9} /> {member.phone}
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-navy transition-colors">
                    <FaEnvelope size={9} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <a
          href="/about#team"
          className={`text-xs font-semibold text-navy hover:text-redc transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
        >
          {t('View All Members →', 'सबै सदस्यहरू हेर्नुहोस् →')}
        </a>
      </div>
    </div>
  );
};

export default TeamSection;
