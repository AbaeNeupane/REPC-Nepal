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
    <section className="bg-[#07163d] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? 'Our impact' : 'हाम्रो प्रभाव'}
          </p>
          <h2 className={`mt-2 text-3xl font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? 'Building Peaceful and Just Communities' : 'शान्तिपूर्ण र न्यायपूर्ण समुदाय निर्माण'}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {impactStats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || FaUsers;
            return (
              <div key={i} className="group rounded-[24px] border border-white/10 bg-white/5 p-5 text-center shadow-[0_15px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky/15 text-sky">
                  <Icon size={24} />
                </div>
                <p className={`text-3xl font-black text-white md:text-4xl ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? stat.value : stat.valueNp}
                </p>
                <p className={`mt-2 text-xs leading-relaxed text-slate-300 md:text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
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
