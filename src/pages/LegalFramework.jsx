import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { legalFramework } from '../data/siteContent';
import { FaBalanceScale, FaHandshake, FaUserShield, FaChild, FaExternalLinkAlt, FaExclamationTriangle } from 'react-icons/fa';

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
        <div className="w-12 h-1 bg-redc mt-3 rounded" />
      </div>
    </div>
  );
};

const categoryMeta = {
  foundation:        { icon: FaBalanceScale, titleEn: 'Constitutional Foundation',        titleNp: 'संवैधानिक आधार' },
  mediation:         { icon: FaHandshake,    titleEn: 'Mediation & Local Justice',        titleNp: 'मेलमिलाप तथा स्थानीय न्याय' },
  'legal-aid':       { icon: FaUserShield,   titleEn: 'Legal Aid',                        titleNp: 'कानुनी सहायता' },
  rights:            { icon: FaUserShield,   titleEn: 'Human Rights Institutions',        titleNp: 'मानव अधिकार संस्थाहरू' },
  'vulnerable-groups': { icon: FaChild,      titleEn: 'Protection of Vulnerable Groups',  titleNp: 'कमजोर समूहको संरक्षण' },
};

const categoryOrder = ['foundation', 'mediation', 'legal-aid', 'rights', 'vulnerable-groups'];

const LegalFramework = () => {
  const { lang, t } = useLang();

  return (
    <div>
      <PageBanner titleEn="Legal Framework" titleNp="कानुनी संरचना" />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Intro */}
        <div className="bg-blue-50 border-l-4 border-navy p-5 rounded-sm mb-8">
          <p className={`text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
            {t(
              'REPC-Nepal\u2019s work in mediation, legal aid, and human rights protection is grounded in the following Nepali laws. This overview is for general awareness only.',
              'REPC-Nepal को मेलमिलाप, कानुनी सहायता र मानव अधिकार संरक्षणसम्बन्धी काम निम्न नेपाली कानूनहरूमा आधारित छ। यो विवरण सामान्य जानकारीका लागि मात्र हो।'
            )}
          </p>
        </div>

        {/* Laws grouped by category */}
        {categoryOrder.map((cat) => {
          const laws = legalFramework.filter(l => l.category === cat);
          if (laws.length === 0) return null;
          const meta = categoryMeta[cat];
          const CatIcon = meta.icon;
          return (
            <section key={cat} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <CatIcon className="text-redc" size={18} />
                <h2 className={`text-lg font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? meta.titleEn : meta.titleNp}
                </h2>
              </div>
              <div className="space-y-4">
                {laws.map((law, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className={`font-bold text-navy text-sm md:text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {lang === 'en' ? law.nameEn : law.nameNp}
                      </h3>
                      {law.sourceUrl && (
                        <a
                          href={law.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="text-navy/50 hover:text-redc transition-colors shrink-0"
                          aria-label={t('View source', 'स्रोत हेर्नुहोस्')}
                          title={t('View source', 'स्रोत हेर्नुहोस्')}
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                    <p className={`text-gray-600 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
                      {lang === 'en' ? law.descEn : law.descNp}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Disclaimer */}
        <div className="bg-amber/10 border border-amber/40 rounded-sm p-5 flex gap-3">
          <FaExclamationTriangle className="text-amber shrink-0 mt-0.5" size={18} />
          <p className={`text-gray-600 text-xs leading-relaxed ${lang === 'np' ? 'font-nepali text-sm' : ''}`}>
            {t(
              'This page is provided for general awareness only and is not legal advice. Laws are periodically amended — always verify current text with the Nepal Law Commission (lawcommission.gov.np) or consult a qualified legal professional for advice on a specific situation. This list covers laws most relevant to our work areas and is not exhaustive.',
              'यो पृष्ठ सामान्य जानकारीका लागि मात्र हो, यो कानुनी सल्लाह होइन। कानूनहरू समय-समयमा संशोधन हुन्छन् — कृपया सधैं नेपाल कानून आयोग (lawcommission.gov.np) बाट हालको पाठ पुष्टि गर्नुहोस् वा विशेष अवस्थाका लागि योग्य कानुनी व्यवसायीसँग परामर्श गर्नुहोस्। यो सूची हाम्रा कार्यक्षेत्रसँग सम्बन्धित प्रमुख कानूनहरू मात्र समेट्छ र सम्पूर्ण होइन।'
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

export default LegalFramework;
