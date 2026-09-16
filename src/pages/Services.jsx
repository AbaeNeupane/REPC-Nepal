import { useLang } from '../context/LanguageContext';
import { services } from '../data/siteContent';
import { Link } from 'react-router-dom';
import {
  FaHandshake, FaGavel, FaComments, FaExchangeAlt, FaBalanceScale,
  FaFileSignature, FaUserTie, FaUsersCog, FaChalkboardTeacher, FaSearch,
  FaDove, FaPhoneAlt,
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

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
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

const ServiceCard = ({ svc, lang }) => {
  const Icon = iconMap[svc.icon] || FaBalanceScale;
  const anchorId = svc.link.split('#')[1];
  return (
    <div id={anchorId} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-shadow scroll-mt-20">
      <div className="flex items-center gap-4 p-5 border-b border-gray-100 bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
          <Icon className="text-white" size={20} />
        </div>
        <h2 className={`font-bold text-navy text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? svc.titleEn : svc.titleNp}
        </h2>
      </div>
      <div className="p-5">
        <p className={`text-gray-600 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
          {lang === 'en' ? svc.descEn : svc.descNp}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const { lang, t } = useLang();
  const peaceServices = services.filter(s => s.group === 'peace');
  const legalServices = services.filter(s => s.group === 'legal');

  return (
    <div>
      <PageBanner titleEn="Our Services" titleNp="हाम्रा सेवाहरू" />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <div className="bg-blue-50 border-l-4 border-navy p-5 rounded-sm mb-10">
          <p className={`text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
            {t(
              'REPC-Nepal provides a wide range of services focused on human rights protection, legal aid, mediation, training, and peace building. All services are delivered by qualified professionals dedicated to justice and equity.',
              'REPC-Nepal ले मानव अधिकार संरक्षण, कानुनी सहायता, मेलमिलाप, तालिम र शान्ति निर्माणमा केन्द्रित विभिन्न सेवाहरू प्रदान गर्दछ। सबै सेवाहरू न्याय र समताप्रति समर्पित योग्य पेशेवरहरूद्वारा प्रदान गरिन्छ।'
            )}
          </p>
        </div>

        {/* Peace Through... */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <FaDove className="text-sky" size={20} />
            <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Peace Through...', 'यसमार्फत शान्ति...')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {peaceServices.map((svc, i) => <ServiceCard key={i} svc={svc} lang={lang} />)}
          </div>
        </section>

        {/* Legal & Professional Services */}
        <section className="mb-12">
          <h2 className={`text-xl font-bold text-navy mb-5 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Legal & Professional Services', 'कानुनी तथा पेशागत सेवाहरू')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalServices.map((svc, i) => <ServiceCard key={i} svc={svc} lang={lang} />)}
          </div>
        </section>

        {/*  Legal Aid CTA */}
        <div className="bg-sky text-white rounded-sm p-8 text-center">
          <FaPhoneAlt className="mx-auto mb-3" size={28} />
          <h3 className={`text-xl font-bold mb-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Need  Legal Assistance?', ' कानुनी सहायता चाहिन्छ?')}
          </h3>
          <p className={`text-white/85 mb-5 text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'We provide  legal aid to economically disadvantaged individuals, single women, children, and persons with disabilities.',
              'हामी आर्थिक रूपमा विपन्न व्यक्ति, एकल महिला, बालबालिका र अपाङ्गता भएका व्यक्तिलाई  कानुनी सहायता प्रदान गर्दछौं।'
            )}
          </p>
          <Link
            to="/contact"
            className={`inline-block bg-white text-sky font-bold px-8 py-3 rounded-sm hover:bg-gray-100 transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            {t('Contact Us', 'सम्पर्क गर्नुहोस्')}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Services;
