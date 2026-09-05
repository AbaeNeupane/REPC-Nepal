import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { notices, pressReleases, reports, activities } from '../data/siteContent';
import { FaDownload, FaCalendarAlt, FaFilter } from 'react-icons/fa';

const tabs = [
  { en: 'All Notices', np: 'सबै सूचनाहरू', key: 'notices' },
  { en: 'Press Release', np: 'प्रेस विज्ञप्ति', key: 'press' },
  { en: 'Reports', np: 'प्रतिवेदन', key: 'reports' },
  { en: 'Activities', np: 'गतिविधि', key: 'activities' },
];

const dataMap = { notices, press: pressReleases, reports, activities };

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

const Notices = () => {
  const { lang, t } = useLang();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('notices');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && dataMap[tab]) setActiveTab(tab);
  }, [searchParams]);

  const items = dataMap[activeTab] || [];

  return (
    <div>
      <PageBanner titleEn="Notices & Updates" titleNp="सूचना तथा अपडेटहरू" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 text-sm font-semibold rounded-sm transition-colors ${activeTab === tab.key ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-navy hover:text-navy'} ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {lang === 'en' ? tab.en : tab.np}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-navy text-white grid grid-cols-12 px-4 py-3 text-sm font-semibold">
            <div className={`col-span-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('S.N.', 'क्र.सं.')}</div>
            <div className={`col-span-2 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Date', 'मिति')}</div>
            <div className={`col-span-7 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Title', 'शीर्षक')}</div>
            <div className={`col-span-2 text-center ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Download', 'डाउनलोड')}</div>
          </div>

          {/* Rows */}
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <FaFilter size={32} className="mx-auto mb-3 opacity-30" />
              <p className={lang === 'np' ? 'font-nepali' : ''}>{t('No items found.', 'कुनै सामग्री भेटिएन।')}</p>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={item.id}
                className={`grid grid-cols-12 px-4 py-3.5 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                <div className="col-span-1 text-gray-500 text-sm">{i + 1}</div>
                <div className="col-span-2">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaCalendarAlt className="text-redc" size={10} />
                    {lang === 'en' ? item.date : item.dateNp}
                  </span>
                </div>
                <div className="col-span-7">
                  <p className={`text-sm text-gray-700 leading-snug hover:text-navy cursor-pointer transition-colors ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                    {lang === 'en' ? item.titleEn : item.titleNp}
                  </p>
                </div>
                <div className="col-span-2 flex justify-center">
                  {item.downloadUrl && item.downloadUrl !== '#' ? (
                    <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-navy hover:text-redc transition-colors font-medium">
                      <FaDownload size={12} /> {t('PDF', 'पिडिएफ')}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
