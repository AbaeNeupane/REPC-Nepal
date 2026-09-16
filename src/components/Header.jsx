import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, services, notices } from '../data/siteContent';
import { FaSearch, FaHandHoldingHeart } from 'react-icons/fa';

// Static pages + services + notices, searched by title in either language.
const staticPages = [
  { titleEn: 'Home', titleNp: 'गृह पृष्ठ', link: '/' },
  { titleEn: 'About Us', titleNp: 'हाम्रोबारे', link: '/about' },
  { titleEn: 'Services', titleNp: 'सेवाहरू', link: '/services' },
  { titleEn: 'Programs', titleNp: 'कार्यक्रमहरू', link: '/programs' },
  { titleEn: 'Notices', titleNp: 'सूचना', link: '/notices' },
  { titleEn: 'Publications', titleNp: 'प्रकाशनहरू', link: '/publications' },
  { titleEn: 'Legal Framework', titleNp: 'कानुनी संरचना', link: '/legal-framework' },
  { titleEn: 'Gallery', titleNp: 'ग्यालरी', link: '/gallery' },
  { titleEn: 'Volunteer', titleNp: 'स्वयंसेवा', link: '/volunteer' },
  { titleEn: 'Support Us', titleNp: 'सहयोग गर्नुहोस्', link: '/support' },
  { titleEn: 'Contact', titleNp: 'सम्पर्क', link: '/contact' },
];

const Header = () => {
  const { lang, toggleLang, t } = useLang();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchOpen) return;

    const handleClickOutside = (event) => {
      const isInsideSearch = searchRef.current && searchRef.current.contains(event.target);
      if (!isInsideSearch) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

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
    <header className="bg-white border-b border-gray-200 shadow-sm relative z-50">
      {searchOpen && (
        <div className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} aria-hidden="true" />
      )}

      {searchOpen && (
        <div className="md:hidden fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none">
          <div ref={searchRef} className="pointer-events-auto w-full max-w-md">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center border border-gray-300 bg-white rounded-xl shadow-2xl overflow-hidden focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/10"
            >
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('Search...', 'खोज्नुहोस्...')}
                className="px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
              />
              <button
                type="submit"
                className="h-12 w-12 flex items-center justify-center bg-navy text-white hover:bg-navy/90 transition-colors border-l border-navy/20"
                aria-label={t('Search', 'खोज्नुहोस्')}
              >
                <FaSearch size={13} />
              </button>

              {matches.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-[60]">
                  {matches.map((item, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => goToResult(item.link)}
                      className={`block w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-navy/5 hover:text-navy transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
                    >
                      {lang === 'en' ? item.titleEn : item.titleNp}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 relative z-10">

        {/* Left: Emblem + Org Name */}
        <Link to="/" className="flex items-center gap-4 min-w-0">
          {/* Emblem placeholder — replace public/emblem.png with real logo */}
          <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
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
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-navy bg-navy hidden items-center justify-center"
              aria-label="REPC-Nepal Logo Placeholder"
            >
              <span className="text-white font-bold text-xs text-center leading-tight px-1 select-none">
                REPC<br />Nepal
              </span>
            </div>
          </div>

          {/* Org Name Block */}
          <div className="min-w-0">
            <h1 className={`font-bold text-navy leading-tight ${lang === 'np' ? 'font-nepali text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>
              {t(siteInfo.nameEn, siteInfo.nameNp)}
            </h1>
            <p className={`text-sky text-sm md:text-base font-medium mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t(siteInfo.mottoEn, siteInfo.mottoNp)}
            </p>
          </div>
        </Link>

        {/*Language Toggle + Search */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Support CTA */}
          <Link
            to="/support"
            className="hidden sm:inline-flex items-center gap-1.5 bg-sky hover:bg-sky-light text-white text-xs font-semibold px-3.5 py-2 rounded-sm transition-colors shadow-sm hover:shadow-md"
          >
            <FaHandHoldingHeart size={12} />
            <span className={lang === 'np' ? 'font-nepali' : ''}>{t('Support Us', 'सहयोग गर्नुहोस्')}</span>
          </Link>

          {/* Search */}
          <div className="relative shrink-0 z-20">
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:flex items-center border border-gray-300 bg-white rounded-md shadow-sm overflow-hidden transition-all focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/10"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('Search...', 'खोज्नुहोस्...')}
                  className="px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 outline-none w-28 lg:w-52"
                  onKeyDown={e => {
                    if (e.key === 'Escape') {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                />
                <button
                  type="submit"
                  className="h-10 w-10 flex items-center justify-center bg-navy text-white hover:bg-navy/90 transition-colors border-l border-navy/20"
                  aria-label={t('Search', 'खोज्नुहोस्')}
                >
                  <FaSearch size={13} />
                </button>

                {matches.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden z-50">
                    {matches.map((item, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => goToResult(item.link)}
                        className={`block w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-navy/5 hover:text-navy transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
                      >
                        {lang === 'en' ? item.titleEn : item.titleNp}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="h-10 w-10 flex items-center justify-center rounded-md text-navy hover:text-sky hover:bg-navy/5 transition-colors shadow-sm border border-transparent hover:border-navy/10"
                aria-label={t('Open Search', 'खोज खोल्नुहोस्')}
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
