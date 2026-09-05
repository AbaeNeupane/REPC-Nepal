import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaFilePdf, FaFileWord, FaDownload } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
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

const publications = [
  {
    category: { en: 'Annual Reports', np: 'वार्षिक प्रतिवेदन' },
    items: [
      { titleEn: 'Annual Progress Report 2082/83', titleNp: 'वार्षिक प्रगति प्रतिवेदन २०८२/८३', type: 'pdf', url: '#', dateEn: '2083', dateNp: '२०८३' },
    ],
  },
  {
    category: { en: 'Legal Documents', np: 'कानुनी दस्तावेज' },
    items: [
      { titleEn: 'Constitution of REPC-Nepal 2083', titleNp: 'REPC-Nepal को विधान २०८३', type: 'pdf', url: '#', dateEn: '2083', dateNp: '२०८३' },
      { titleEn: 'Membership Application Form', titleNp: 'सदस्यता आवेदन फारम', type: 'word', url: '#', dateEn: '2083', dateNp: '२०८३' },
    ],
  },
  {
    category: { en: 'Training Materials', np: 'तालिम सामग्री' },
    items: [
      { titleEn: 'Basic Mediation Training Manual', titleNp: 'आधारभूत मेलमिलाप तालिम पुस्तिका', type: 'pdf', url: '#', dateEn: '2083', dateNp: '२०८३' },
      { titleEn: 'Human Rights Handbook (Nepali)', titleNp: 'मानव अधिकार पुस्तिका (नेपाली)', type: 'pdf', url: '#', dateEn: '2083', dateNp: '२०८३' },
    ],
  },
  {
    category: { en: 'Research Reports', np: 'अनुसन्धान प्रतिवेदन' },
    items: [
      { titleEn: 'Human Rights Situation Report Q1 2083', titleNp: 'मानव अधिकार अवस्था प्रतिवेदन पहिलो त्रैमास २०८३', type: 'pdf', url: '#', dateEn: '2083', dateNp: '२०८३' },
    ],
  },
];

const typeIcon = (type) => type === 'pdf' ? <FaFilePdf className="text-red-500" size={20} /> : <FaFileWord className="text-blue-500" size={20} />;

const Publications = () => {
  const { lang, t } = useLang();

  return (
    <div>
      <PageBanner titleEn="Publications & Downloads" titleNp="प्रकाशन तथा डाउनलोडहरू" />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {publications.map((section, si) => (
          <div key={si} id={si === 0 ? 'annual' : si === 1 ? 'legal' : 'downloads'} className="scroll-mt-24">
            <h2 className={`text-lg font-bold text-navy mb-4 flex items-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
              <span className="w-1 h-6 bg-redc rounded inline-block" />
              {lang === 'en' ? section.category.en : section.category.np}
            </h2>
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              {section.items.map((item, ii) => (
                <div key={ii} className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${ii % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
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
                    className={`flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-redc transition-colors shrink-0 ${lang === 'np' ? 'font-nepali' : ''}`}>
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
