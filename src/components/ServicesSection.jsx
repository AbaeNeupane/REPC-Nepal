import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { services } from '../data/siteContent';
import {
  FaBalanceScale, FaHandshake, FaChalkboardTeacher,
  FaSearch, FaBullhorn, FaDove,
} from 'react-icons/fa';

const iconMap = {
  scale: FaBalanceScale,
  handshake: FaHandshake,
  training: FaChalkboardTeacher,
  research: FaSearch,
  advocacy: FaBullhorn,
  peace: FaDove,
};

const ServicesSection = () => {
  const { lang, t } = useLang();

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
      {/* Header */}
      <div className="bg-redc px-4 py-3">
        <h2 className={`text-white font-bold text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t('Our Services', 'हाम्रा सेवाहरू')}
        </h2>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        {services.map((svc, i) => {
          const Icon = iconMap[svc.icon] || FaBalanceScale;
          return (
            <Link
              key={i}
              to={svc.link}
              className="service-card rounded-none gap-2 bg-white hover:bg-navy group transition-all p-4"
            >
              <div className="w-10 h-10 rounded-full bg-navy/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon className="text-navy group-hover:text-white transition-colors" size={18} />
              </div>
              <p className={`text-xs font-semibold text-gray-700 group-hover:text-white transition-colors leading-tight text-center ${lang === 'np' ? 'font-nepali text-sm' : ''}`}>
                {lang === 'en' ? svc.titleEn : svc.titleNp}
              </p>
            </Link>
          );
        })}
      </div>

      {/* View All */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <Link
          to="/services"
          className={`text-xs font-semibold text-navy hover:text-redc transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
        >
          {t('View All Services →', 'सबै सेवाहरू हेर्नुहोस् →')}
        </Link>
      </div>
    </div>
  );
};

export default ServicesSection;
