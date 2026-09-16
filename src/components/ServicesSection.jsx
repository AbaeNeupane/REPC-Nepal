import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { services } from '../data/siteContent';
import {
  FaHandshake, FaGavel, FaComments, FaExchangeAlt, FaBalanceScale,
  FaFileSignature, FaUserTie, FaUsersCog, FaChalkboardTeacher, FaSearch,
} from 'react-icons/fa';

const iconMap = {
  mediation: FaHandshake,
  arbitration: FaGavel,
  compromise: FaComments,
  negotiation: FaExchangeAlt,
  judicial: FaBalanceScale,
  drafting: FaFileSignature,
  advisory: FaUserTie,
  hr: FaUsersCog,
  training: FaChalkboardTeacher,
  research: FaSearch,
};

const featuredServiceLinks = [
  '/services#mediation',
  '/services#legal-aid',
  '/services#rights-awareness',
  '/services#human-rights-advocacy',
  '/services#training',
  '/services#research',
];

const ServicesSection = () => {
  const { lang, t } = useLang();
  const featuredServices = featuredServiceLinks
    .map(link => services.find(service => service.link === link))
    .filter(Boolean);

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
      <div className="bg-sky px-5 py-4">
        <h2 className={`text-lg font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t('Our Services', 'हाम्रा सेवाहरू')}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3">
        {featuredServices.map((svc, i) => {
          const Icon = iconMap[svc.icon] || FaBalanceScale;
          return (
            <Link
              key={i}
              to={svc.link}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-navy/30 hover:bg-navy hover:text-white"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy transition-colors group-hover:bg-white/15 group-hover:text-white">
                <Icon size={18} />
              </div>
              <p className={`text-xs font-semibold leading-relaxed transition-colors group-hover:text-white ${lang === 'np' ? 'font-nepali text-sm' : ''}`}>
                {lang === 'en' ? svc.titleEn : svc.titleNp}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
        <Link
          to="/services"
          className={`inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-sky ${lang === 'np' ? 'font-nepali' : ''}`}
        >
          {t('View All Services', 'सबै सेवाहरू हेर्नुहोस्')}
        </Link>
      </div>
    </div>
  );
};

export default ServicesSection;
