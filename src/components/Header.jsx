import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, services, notices } from '../data/siteContent';
import { FaSearch, FaHandHoldingHeart, FaBars, FaTimes } from 'react-icons/fa';

// Static pages + services + notices, searched by title in either language.
const staticPages = [
  { titleEn: 'Home', titleNp: 'गृह पृष्ठ', link: '/' },
  { titleEn: 'Our Organization', titleNp: 'हाम्रो संस्था', link: '/about' },
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

const Header = ({ mobileOpen, onMobileToggle }) => {
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

  const handleLanguageToggle = () => {
    toggleLang(lang === 'en' ? 'np' : 'en');
    window.location.reload();
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

      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-2.5 flex items-center justify-between gap-3 relative z-10">

        {/* Left: Emblem + Org Name */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          
          {/* UPDATED: Dynamic Emblem based on language */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 flex items-center justify-center">
            <img
              key={lang} // CRITICAL: Forces React to reset the image element when language changes
              src={lang === 'np' ? '/emblem.png' : '/emblem.jpeg'}
              alt="REPC-Nepal Logo"
              className="w-full h-full object-contain scale-[1.24]"
              onError={(e) => {
                // Fallback emblem if image not found
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
            {/* Fallback Emblem */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-navy bg-navy hidden items-center justify-center"
              aria-label="REPC-Nepal Logo Placeholder"
            >
              <span className="text-white font-bold text-xs text-center leading-tight px-1 select-none">
                REPC<br />Nepal
              </span>
            </div>
          </div>

          {/* Org Name Block */}
          <div className="min-w-0">
            <p className={`block text-sky italic text-[10px] sm:text-xs md:text-sm font-medium leading-none mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
              “{t(siteInfo.mottoEn, siteInfo.mottoNp)}”
            </p>
            <h1 className={`font-bold leading-tight text-navy ${lang === 'np' ? 'font-nepali text-sm sm:text-base md:text-3xl' : 'text-sm sm:text-base md:text-2xl'}`}>
              {t(siteInfo.nameEn, siteInfo.nameNp)}
            </h1>
          </div>
        </Link>

        {/* Language Toggle + Search */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">

          {/* Support CTA */}
          <Link
            to="/support"
            className="hidden md:inline-flex items-center gap-1.5 bg-sky hover:bg-sky-light text-white text-xs font-semibold px-3.5 py-2 rounded-sm transition-colors shadow-sm hover:shadow-md"
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
                className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-gray-200 text-navy hover:text-sky hover:bg-navy/5 transition-colors shadow-sm"
                aria-label={t('Open Search', 'खोज खोल्नुहोस्')}
              >
                <FaSearch size={16} />
              </button>
            )}
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={handleLanguageToggle}
            aria-label={t('Switch to Nepali', 'अंग्रेजीमा परिवर्तन गर्नुहोस्')}
            className="h-10 w-12 sm:h-11 sm:w-14 lg:h-8 lg:w-auto lg:min-w-[3.8rem] lg:rounded rounded-full border border-navy bg-white px-1 text-[11px] font-semibold text-navy text-center outline-none transition-colors hover:bg-navy hover:text-white focus:ring-2 focus:ring-sky/30"
          >
            {lang === 'en' ? 'EN' : 'NP'}
          </button>

          <button
            onClick={onMobileToggle}
            className="lg:hidden h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center text-navy rounded-full hover:bg-navy/5 transition-colors"
            aria-label={mobileOpen ? t('Close menu', 'मेनु बन्द गर्नुहोस्') : t('Open menu', 'मेनु खोल्नुहोस्')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;