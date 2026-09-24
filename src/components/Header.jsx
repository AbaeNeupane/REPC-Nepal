import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/organization';
import { services } from '../data/content';
import { notices } from '../data/home';
import { FaSearch, FaHandHoldingHeart, FaBars, FaTimes } from 'react-icons/fa';

// Static pages + services + notices, searched by title in either language.
const staticPages = [
  { titleEn: 'Home', titleNp: 'गृह पृष्ठ', link: '/' },
  { titleEn: 'About Us', titleNp: 'हाम्रो बारेमा', link: '/about' },
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
  const isNp = lang === 'np';
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchOpen) return;

    const handleClickOutside = (event) => {
      const isInsideSearch =
        searchRef.current && searchRef.current.contains(event.target);

      if (!isInsideSearch) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  const searchIndex = useMemo(
    () => [
      ...staticPages,
      ...services.map((s) => ({
        titleEn: s.titleEn,
        titleNp: s.titleNp,
        link: s.link,
      })),
      ...notices.map((n) => ({
        titleEn: n.titleEn,
        titleNp: n.titleNp,
        link: '/notices',
      })),
    ],
    []
  );

  const matches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) return [];

    return searchIndex
      .filter(
        (item) =>
          item.titleEn.toLowerCase().includes(q) ||
          item.titleNp.includes(searchQuery.trim())
      )
      .slice(0, 6);
  }, [searchQuery, searchIndex]);

  const goToResult = (link) => {
    navigate(link);
    setSearchQuery('');
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (matches.length > 0) {
      goToResult(matches[0].link);
    }
  };

  const handleLanguageToggle = () => {
    toggleLang(lang === 'en' ? 'np' : 'en');
    window.location.reload();
  };

  return (
    <header className="bg-[#F1F2F4] border-b border-gray-200 shadow-sm relative z-50">
      <div className="site-container py-5 sm:py-4 flex items-center justify-between gap-3 relative z-10">

        {/* Left: LOGO + Org Name */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">

          {/* Dynamic Emblem based on language */}
          <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-26 lg:h-26 shrink-0 flex items-center justify-center">
            <img
              key={lang}
              src={lang === 'np' ? '/logoNp.png' : '/logoEn.png'}
              alt="REPC-Nepal Logo"
              className="w-full h-full object-contain scale-[1.4] md:scale-[1.5] lg:scale-[1.5]"
              onError={(e) => {
                e.target.style.display = 'none';

                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />

            {/* Fallback Emblem */}
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-[4.5rem] md:h-[4.5rem] lg:w-20 lg:h-20 rounded-full border-4 border-navy bg-navy hidden items-center justify-center"
              aria-label="REPC-Nepal Logo Placeholder"
            >
              <span className="text-white font-bold text-xs text-center leading-tight px-1 select-none">
                REPC
                <br />
                Nepal
              </span>
            </div>
          </div>

          {/* Org Name Block */}
          <div className="min-w-0">
            <p
              className={`mt-1 text-sm italic text-navy sm:block ${
                isNp ? 'font-nepali text-sm' : ''
              }`}
            >
              “{t(siteInfo.mottoEn, siteInfo.mottoNp)}”
            </p>

            <h1
              className={`font-bold leading-tight text-navy ${
                lang === 'np'
                  ? 'font-nepali text-base sm:text-lg md:text-4xl'
                  : 'text-base sm:text-lg md:text-3xl'
              }`}
            >
              {t(siteInfo.nameEn, siteInfo.nameNp)}
            </h1>
          </div>
        </Link>

        {/* Language Toggle + Search */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">

          {/* Support CTA */}
          <Link
            to="/support"
            className="hidden md:inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white text-sm font-semibold px-4 py-2.5 rounded-sm transition-colors shadow-sm hover:shadow-md"
          >
            <FaHandHoldingHeart size={14} />

            <span className={lang === 'np' ? 'font-nepali' : ''}>
              {t('Donate', 'सहयोग')}
            </span>
          </Link>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={handleLanguageToggle}
            aria-label={t(
              'Switch to Nepali',
              'अंग्रेजीमा परिवर्तन गर्नुहोस्'
            )}
            className="h-10 items-center gap-2 px-3 text-xs font-bold text-navy hover:border-sky/40 hover:bg-slate-50 md:inline-flex"
          >
            {lang === 'en' ? 'EN' : 'NP'}
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMobileToggle}
            className="lg:hidden h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center text-navy rounded-full hover:bg-navy/5 transition-colors"
            aria-label={
              mobileOpen
                ? t('Close menu', 'मेनु बन्द गर्नुहोस्')
                : t('Open menu', 'मेनु खोल्नुहोस्')
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;