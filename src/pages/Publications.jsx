import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaFilePdf, FaFileWord, FaDownload } from 'react-icons/fa';
import SEO from '../components/SEO';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10">
      <div className="site-container">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
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

const publications = [
  {
    category: { en: 'Annual Reports', np: 'वार्षिक प्रतिवेदन' },
    items: [
    ],
  },
  {
    category: { en: 'Legal Documents', np: 'कानुनी दस्तावेज' },
    items: [
    ],
  },
  {
    category: { en: 'Training Materials', np: 'तालिम सामग्री' },
    items: [
    ],
  },
  {
    category: { en: 'Research Reports', np: 'अनुसन्धान प्रतिवेदन' },
    items: [
    ],
  },
];

const typeIcon = (type) => type === 'pdf' ? <FaFilePdf className="text-red-500" size={20} /> : <FaFileWord className="text-blue-500" size={20} />;

const Publications = () => {
  const { lang, t } = useLang();

  return (
    <div>
      <SEO
        titleEn="Publications & Downloads"
        titleNp="प्रकाशन तथा डाउनलोडहरू"
        descriptionEn="Annual reports, legal documents, and downloadable publications from REPC-Nepal."
        descriptionNp="REPC-नेपालका वार्षिक प्रतिवेदन, कानुनी दस्तावेज र डाउनलोड गर्न मिल्ने प्रकाशनहरू।"
        path="/publications"
      />
      <PageBanner titleEn="Publications & Downloads" titleNp="प्रकाशन तथा डाउनलोडहरू" />

      <div id="downloads" className="site-container py-10 space-y-10 scroll-mt-20">
        {publications.map((section, si) => (
          <div key={si} id={['annual', 'legal', 'training', 'research'][si]} className="scroll-mt-20">
            <h2 className={`text-lg font-bold text-navy mb-4 flex items-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
              <span className="w-1 h-6 bg-sky rounded inline-block" />
              {lang === 'en' ? section.category.en : section.category.np}
            </h2>
            <div className="site-card overflow-hidden rounded-2xl">
              {section.items.map((item, ii) => (
                <div key={ii} className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-[#eef5ff] transition-colors ${ii % 2 === 0 ? 'bg-[#f8fbff]' : 'bg-[#e8f1fa]'}`}>
                  <div className="shrink-0">{typeIcon(item.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium text-gray-800 ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                      {lang === 'en' ? item.titleEn : item.titleNp}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {lang === 'en' ? item.dateEn : item.dateNp} · {item.type.toUpperCase()}
                    </p>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-sky transition-colors shrink-0 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    <FaDownload size={12} /> {t('Download', 'डाउनलोड')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
