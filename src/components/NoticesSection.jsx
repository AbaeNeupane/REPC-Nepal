import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { notices, pressReleases, reports, activities } from '../data/siteContent';
import { FaDownload, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const tabs = [
  { en: 'Notices', np: 'सूचनाहरू', key: 'notices' },
  { en: 'Press Release', np: 'प्रेस विज्ञप्ति', key: 'press' },
  { en: 'Reports', np: 'प्रतिवेदन', key: 'reports' },
  { en: 'Activities', np: 'गतिविधि', key: 'activities' },
];

const dataMap = {
  notices,
  press: pressReleases,
  reports,
  activities,
};

const NoticeItem = ({ item }) => {
  const { lang } = useLang();
  return (
    <div className="notice-item group cursor-pointer">
      <FaCalendarAlt className="text-redc shrink-0 mt-0.5" size={12} />
      <div className="flex-1 min-w-0">
        <p className={`text-xs text-gray-400 mb-0.5 ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? item.date : item.dateNp}
        </p>
        <p className={`text-sm text-gray-700 group-hover:text-navy transition-colors leading-snug ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? item.titleEn : item.titleNp}
        </p>
      </div>
      {item.downloadUrl && item.downloadUrl !== '#' && (
        <a
          href={item.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-navy hover:text-redc transition-colors"
          aria-label="Download"
          onClick={e => e.stopPropagation()}
        >
          <FaDownload size={12} />
        </a>
      )}
    </div>
  );
};

const NoticesSection = () => {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState('notices');
  const items = dataMap[activeTab] || [];

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
      {/* Section header */}
      <div className="bg-navy px-4 py-3">
        <h2 className={`text-white font-bold text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t('Latest Updates', 'ताजा अपडेटहरू')}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''} ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            {lang === 'en' ? tab.en : tab.np}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100 min-h-[260px]">
        {items.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">
            {t('No items found.', 'कुनै सामग्री भेटिएन।')}
          </p>
        ) : (
          items.map(item => <NoticeItem key={item.id} item={item} />)
        )}
      </div>

      {/* View All */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <Link
          to="/notices"
          className={`flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-redc transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
        >
          {t('View All', 'सबै हेर्नुहोस्')} <FaArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
};

export default NoticesSection;
