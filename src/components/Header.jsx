import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, services, notices } from '../data/siteContent';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Static pages + services + notices, searched by title in either language.
const staticPages = [
  { titleEn: 'Home', titleNp: 'गृह पृष्ठ', link: '/' },
  { titleEn: 'About Us', titleNp: 'हाम्रोबारे', link: '/about' },
  { titleEn: 'Services', titleNp: 'सेवाहरू', link: '/services' },
  { titleEn: 'Programs', titleNp: 'कार्यक्रमहरू', link: '/programs' },
  { titleEn: 'Notices', titleNp: 'सूचना', link: '/notices' },
  { titleEn: 'Publications', titleNp: 'प्रकाशनहरू', link: '/publications' },
  { titleEn: 'Gallery', titleNp: 'ग्यालरी', link: '/gallery' },
  { titleEn: 'Contact', titleNp: 'सम्पर्क', link: '/contact' },
];

const Header = () => {
  const { lang, toggleLang, t } = useLang();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchIndex = useMemo(() => [
    ...staticPages,
    ...services.map(s => ({ titleEn: s.titleEn, titleNp: s.titleNp, link: s.link })),
    ...notices.map(n => ({ titleEn: n.titleEn, titleNp: n.titleNp, link: '/notices' })),
  ], []);

  const matches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(item => item.titleEn.toLowerCase().includes(q) || item.titleNp.includes(searchQuery.trim()))
      .slice(0, 6);
  }, [searchQuery, searchIndex]);

  const goToResult = (link) => {
    navigate(link);
    setSearchQuery('');
    setSearchOpen(false);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (matches.length > 0) goToResult(matches[0].link);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Left: Emblem + Org Name */}
        <Link to="/" className="flex items-center gap-4 min-w-0">
          {/* Emblem placeholder — replace public/emblem.png with real logo */}
          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 flex items-center justify-center">
            <img
              src="/emblem.png"
              alt="REPC-Nepal Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback emblem if image not found
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* SVG Fallback Emblem */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-navy bg-navy hidden items-center justify-center"
              aria-label="REPC-Nepal Logo Placeholder"
            >
              <span className="text-white font-bold text-xs text-center leading-tight px-1 select-none">
                REPC<br />Nepal
              </span>
            </div>
          </div>

          {/* Org Name Block */}
          <div className="min-w-0">
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              {t(siteInfo.parentEn, siteInfo.parentNp)}
            </p>
            <h1 className={`font-bold text-navy leading-tight ${lang === 'np' ? 'font-nepali text-base md:text-xl' : 'text-sm md:text-lg'}`}>
              {t(siteInfo.nameEn, siteInfo.nameNp)}
            </h1>
            <p className={`text-redc text-xs md:text-sm font-medium mt-0.5 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t(siteInfo.mottoEn, siteInfo.mottoNp)}
            </p>
          </div>
        </Link>

        {/* Right: Language Toggle + Search */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-1.5">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center border border-gray-300 rounded overflow-hidden">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t('Search...', 'खोज्नुहोस्...')}
                    className="px-3 py-1.5 text-sm outline-none w-44"
                    onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-navy text-white hover:bg-navy-light transition-colors"
                    aria-label={t('Search', 'खोज्नुहोस्')}
                  >
                    <FaSearch size={13} />
                  </button>

                  {/* Suggestions */}
                  {matches.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-sm shadow-lg overflow-hidden z-50">
                      {matches.map((item, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => goToResult(item.link)}
                          className={`block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
                        >
                          {lang === 'en' ? item.titleEn : item.titleNp}
                        </button>
                      ))}
                    </div>
                  )}
                </form>
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="p-2 text-gray-400 hover:text-redc transition-colors"
                  aria-label={t('Close search', 'खोज बन्द गर्नुहोस्')}
                >
                  <FaTimes size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-navy hover:text-redc transition-colors"
                aria-label="Open Search"
              >
                <FaSearch size={16} />
              </button>
            )}
          </div>

          {/* Language Toggle */}
          <div className="flex border border-navy rounded overflow-hidden text-xs font-semibold">
            <button
              onClick={() => toggleLang('en')}
              className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-navy text-white' : 'text-navy hover:bg-blue-50'}`}
            >
              ENG
            </button>
            <button
              onClick={() => toggleLang('np')}
              className={`px-3 py-1.5 transition-colors font-nepali ${lang === 'np' ? 'bg-navy text-white' : 'text-navy hover:bg-blue-50'}`}
            >
              नेपाली
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
