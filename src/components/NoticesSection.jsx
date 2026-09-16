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
    <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-navy/30 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-redc/10 text-redc">
          <FaCalendarAlt size={12} />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-[11px] uppercase tracking-[0.14em] text-slate-500 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? item.date : item.dateNp}
          </p>
          <p className={`mt-1 text-sm font-medium leading-relaxed text-slate-700 transition-colors group-hover:text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? item.titleEn : item.titleNp}
          </p>
        </div>

        {item.downloadUrl && item.downloadUrl !== '#' && (
          <a
            href={item.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 shrink-0 text-navy transition-colors hover:text-redc"
            aria-label="Download"
            onClick={e => e.stopPropagation()}
          >
            <FaDownload size={12} />
          </a>
        )}
      </div>
    </div>
  );
};

const NoticesSection = () => {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState('notices');
  const items = dataMap[activeTab] || [];

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.04)]">
      <div className="bg-[#07163d] px-5 py-4">
        <h2 className={`text-lg font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t('Latest Updates', 'ताजा अपडेटहरू')}
        </h2>
      </div>

      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-3 py-2">
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

      <div className="space-y-3 p-4">
        {items.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">
            {t('No items found.', 'कुनै सामग्री भेटिएन।')}
          </p>
        ) : (
          items.map(item => <NoticeItem key={item.id} item={item} />)
        )}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
        <Link
          to="/notices"
          className={`inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-redc ${lang === 'np' ? 'font-nepali' : ''}`}
        >
          {t('View All', 'सबै हेर्नुहोस्')} <FaArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
};

export default NoticesSection;
