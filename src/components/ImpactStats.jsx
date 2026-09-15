import { useLang } from '../context/LanguageContext';
import { impactStats } from '../data/siteContent';
import { FaBalanceScale, FaHandshake, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const iconMap = {
  legal: FaBalanceScale,
  mediation: FaHandshake,
  training: FaChalkboardTeacher,
  community: FaUsers,
};

const ImpactStats = () => {
  const { lang } = useLang();

  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || FaUsers;
            return (
              <div key={i} className="text-center text-white">
                <Icon className="mx-auto mb-2 text-amber" size={26} />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className={`text-white/70 text-xs mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? stat.labelEn : stat.labelNp}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;