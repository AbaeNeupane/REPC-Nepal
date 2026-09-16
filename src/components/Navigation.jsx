import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const navItems = [
  { en: 'Home', np: 'गृह पृष्ठ', link: '/' },
  {
    en: 'About Us', np: 'हाम्रोबारे', link: '/about',
    children: [
      { en: 'Introduction',        np: 'परिचय',            link: '/about' },
      { en: 'Mission & Vision',    np: 'लक्ष्य र दृष्टि',   link: '/about#mission' },
      { en: 'Executive Committee', np: 'कार्य समिति',       link: '/about#team' },
      { en: 'Organization Structure', np: 'संस्था संरचना',   link: '/about#structure' },
      { en: 'Organization Information',   np: 'संस्थागत जानकारी',    link: '/about#organization-info' },
      { en: 'Legal Framework',     np: 'कानुनी संरचना',     link: '/legal-framework' },
    ],
  },
  {
    en: 'Services', np: 'सेवाहरू', link: '/services',
    children: [
      { en: 'Mediation',        np: 'मेलमिलाप',      link: '/services#mediation' },
      { en: 'Arbitration',      np: 'मध्यस्थता',      link: '/services#arbitration' },
      { en: 'Compromise',       np: 'सम्झौता',        link: '/services#compromise' },
      { en: 'Negotiation',      np: 'वार्ता',          link: '/services#negotiation' },
      { en: 'Judicial Justice &  Legal Aid', np: 'न्यायिक न्याय तथा  कानुनी सहायता', link: '/services#judicial-legal-aid' },
      { en: 'All Services',     np: 'सबै सेवाहरू',    link: '/services' },
    ],
  },
  { en: 'Programs', np: 'कार्यक्रमहरू', link: '/programs' },
  {
    en: 'Notices', np: 'सूचना', link: '/notices',
    children: [
      { en: 'Notices',       np: 'सूचनाहरू',       link: '/notices' },
      { en: 'Press Release', np: 'प्रेस विज्ञप्ति', link: '/notices?tab=press' },
      { en: 'Reports',       np: 'प्रतिवेदनहरू',    link: '/notices?tab=reports' },
      { en: 'Activities',    np: 'गतिविधिहरू',      link: '/notices?tab=activities' },
    ],
  },
  {
    en: 'Publications', np: 'प्रकाशनहरू', link: '/publications',
    children: [
      { en: 'Downloads',      np: 'डाउनलोडहरू',       link: '/publications#downloads' },
      { en: 'Annual Reports', np: 'वार्षिक प्रतिवेदन', link: '/publications#annual' },
      { en: 'Legal Documents',np: 'कानुनी दस्तावेज',   link: '/publications#legal' },
    ],
  },
  {
    en: 'Get Involved', np: 'सहभागी हुनुहोस्', link: '/volunteer',
    children: [
      { en: 'Volunteer',   np: 'स्वयंसेवा',        link: '/volunteer' },
      { en: 'Support Us',  np: 'सहयोग गर्नुहोस्',   link: '/support' },
      { en: 'Membership',  np: 'सदस्यता',           link: '/membership' },
    ],
  },
  { en: 'Gallery', np: 'ग्यालरी', link: '/gallery' },
  { en: 'Contact', np: 'सम्पर्क', link: '/contact' },
];

const Navigation = () => {
  const { lang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);
  const submenuTimerRef = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      setMobileExpanded([]);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    }
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded([]);
  }, [location.pathname, location.search]);

  /* Sticky shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (item) => {
    const path = location.pathname;
    if (item.children?.some(c => path === c.link.split('?')[0].split('#')[0])) return true;
    return item.link === '/' ? path === '/' : path.startsWith(item.link);
  };

  return (
    <nav
      ref={navRef}
      className={`bg-navy relative z-[60] transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Desktop nav ────────────────────────────────── */}
        <ul className="hidden lg:flex items-center">
          {navItems.map((item, i) => (
            <li key={i} className="nav-item relative group">
              <Link
                to={item.link}
                className={`flex items-center gap-1.5 px-3 py-4 text-sm font-medium transition-all duration-150 whitespace-nowrap
                  ${isActive(item)
                    ? 'bg-sky text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'}
                  ${lang === 'np' ? 'font-nepali text-base' : ''}`}
              >
                {lang === 'en' ? item.en : item.np}
                {item.children && (
                  <FaChevronDown
                    size={9}
                    className="opacity-60 group-hover:opacity-100 transition-all duration-150 group-hover:rotate-180"
                  />
                )}
              </Link>

              {item.children && (
                <div className="nav-dropdown py-1">
                  {item.children.map((child, j) => (
                    <Link
                      key={j}
                      to={child.link}
                      className={`flex items-center px-4 py-2.5 text-sm text-gray-700
                        hover:bg-navy hover:text-white
                        border-l-2 border-transparent hover:border-sky
                        transition-all duration-100
                        ${lang === 'np' ? 'font-nepali' : ''}`}
                    >
                      {lang === 'en' ? child.en : child.np}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* ── Mobile toggle ──────────────────────────────── */}
        <div className="lg:hidden flex items-center justify-end py-3">
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="text-white p-2.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <FaTimes size={18} className="animate-scaleIn" />
              : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu overlay ────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/45 lg:hidden"
          onClick={() => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            closeTimerRef.current = setTimeout(() => setMobileOpen(false), 120);
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile menu drawer ─────────────────────────── */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-40 h-screen w-[82%] max-w-sm bg-navy text-white shadow-2xl border-l border-white/10 transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className={`font-semibold ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Menu', 'मेनु')}
          </span>
          <button
            onClick={() => {
              if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
              closeTimerRef.current = setTimeout(() => setMobileOpen(false), 120);
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={t('Close menu', 'मेनु बन्द गर्नुहोस्')}
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="h-[calc(100vh-72px)] overflow-y-auto">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="border-b border-white/5 last:border-0"
              onMouseEnter={() => item.children && setMobileExpanded(prev => prev.includes(i) ? prev : [...prev, i])}
              onMouseLeave={() => item.children && setMobileExpanded(prev => prev.filter(index => index !== i))}
              onFocus={() => item.children && setMobileExpanded(prev => prev.includes(i) ? prev : [...prev, i])}
            >
              <div className="flex items-center">
                <Link
                  to={item.link}
                  onClick={() => !item.children && setMobileOpen(false)}
                  className={`flex-1 px-5 py-3.5 text-sm font-medium transition-colors
                    ${isActive(item) ? 'text-sky bg-white/5' : 'text-white/90 hover:text-white hover:bg-white/5'}
                    ${lang === 'np' ? 'font-nepali' : ''}`}
                >
                  {lang === 'en' ? item.en : item.np}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => {
                      if (submenuTimerRef.current) clearTimeout(submenuTimerRef.current);
                      setMobileExpanded(prev => {
                        if (prev.includes(i)) {
                          submenuTimerRef.current = setTimeout(() => {
                            setMobileExpanded(current => current.filter(index => index !== i));
                          }, 180);
                          return prev;
                        }

                        setMobileExpanded([]);
                        return [i];
                      });
                    }}
                    className="px-5 py-3.5 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Toggle submenu"
                  >
                    <FaChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${mobileExpanded.includes(i) ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>

              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileExpanded.includes(i) ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="bg-black/15 border-l-2 border-sky ml-5 mr-3 my-1 rounded-r-sm">
                    {item.children.map((child, j) => (
                      <Link
                        key={j}
                        to={child.link}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
                      >
                        {lang === 'en' ? child.en : child.np}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
