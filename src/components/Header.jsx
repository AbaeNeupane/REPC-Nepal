import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/siteContent';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const { lang, toggleLang, t } = useLang();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Left: Emblem + Org Name */}
        <Link to="/" className="flex items-center gap-4 min-w-0">
          {/* Emblem placeholder — replace public/emblem.png with real logo */}
          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 flex items-center justify-center">
            <img
              src="/emblem.png"
              alt="REPC-Nepal Emblem"
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
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
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
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1.5 bg-navy text-white hover:bg-navy-light transition-colors"
                >
                  <FaSearch size={13} />
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
