import { useLang } from '../context/LanguageContext';
import { services } from '../data/content';
import { Link } from 'react-router-dom';
import {
  FaHandshake, FaGavel, FaComments, FaExchangeAlt, FaBalanceScale,
  FaFileSignature, FaUserTie, FaUsersCog, FaChalkboardTeacher, FaSearch,
  FaDove, FaPhoneAlt,
} from 'react-icons/fa';
import SEO from '../components/SEO';

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
    <div className="bg-navy text-white py-10">
      <div className="site-container">
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
        <p className={`text-gray-600 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-base'}`}>
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
      <SEO
        titleEn="Our Services"
        titleNp="हाम्रा सेवाहरू"
        descriptionEn="Peace, mediation, legal aid, training, research, and human rights services offered by REPC-Nepal."
        descriptionNp="REPC-नेपालद्वारा प्रदान गरिने शान्ति, मेलमिलाप, कानुनी सहायता, तालिम, अनुसन्धान र मानव अधिकार सम्बन्धी सेवाहरू।"
        path="/services"
      />
      <PageBanner titleEn="Our Services" titleNp="हाम्रा सेवाहरू" />

      <div className="site-container py-10">

        {/* Intro */}
        <div className="bg-blue-50 border-l-4 border-navy p-5 rounded-sm mb-10">
          <p className={`text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-base'}`}>
            {t(
              'REPC-Nepal works to protect and promote human rights, improve access to justice, support vulnerable communities, and advance peaceful conflict resolution through mediation, legal support, awareness, training, research, and cooperation.',
              'REPC-Nepal ले मानव अधिकारको संरक्षण तथा प्रवर्द्धन, न्यायमा पहुँच सुधार, कमजोर समुदायको सहयोग तथा मेलमिलाप, कानुनी सहयोग, सचेतना, तालिम, अनुसन्धान र सहकार्यद्वारा द्वन्द्वको शान्तिपूर्ण समाधानमा काम गर्छ।'
            )}
          </p>
        </div>

        {/* Peace, mediation, and awareness */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <FaDove className="text-sky" size={20} />
            <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Peace, Mediation, and Awareness', 'शान्ति, मेलमिलाप तथा सचेतना')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {peaceServices.map((svc, i) => <ServiceCard key={i} svc={svc} lang={lang} />)}
          </div>
        </section>

        {/* Legal, training, research, and cooperation */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <FaBalanceScale className="text-black" size={20} />
            <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Legal, Training, Research, and Cooperation', 'कानुनी सेवा, तालिम, अनुसन्धान तथा सहकार्य')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalServices.map((svc, i) => <ServiceCard key={i} svc={svc} lang={lang} />)}
          </div>
        </section>

        {/*  Legal Aid CTA */}
        <div className="bg-sky text-white rounded-sm p-8 text-center">
          <FaPhoneAlt className="mx-auto mb-3" size={28} />
          <h3 className={`text-xl font-bold mb-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Need Legal Assistance?', 'कानुनी सहायता चाहिन्छ?')}
          </h3>
          <p className={`text-white/85 mb-5 text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'We provide legal consultation, assistance, and referrals to everyone seeking to protect their rights and access justice.',
              'आफ्ना अधिकारको संरक्षण र न्यायमा पहुँचका लागि सहयोग खोज्ने सबैलाई हामी कानुनी परामर्श, सहायता र आवश्यक समन्वय प्रदान गर्छौं।'
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
