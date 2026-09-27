import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const navItems = [
  { en: 'Home', np: 'गृह पृष्ठ', link: '/' },
  {
    en: 'About Us', np: 'हाम्रो बारेमा', link: '/about',
    children: [
      { en: 'Who We Are', np: 'हामी को हौं', link: '/about#who-we-are' },
      { en: 'Mission & Vision', np: 'ध्येय तथा परिकल्पना', link: '/about#purpose' },
      { en: 'Executive Committee', np: 'कार्य समिति', link: '/about#team' },
      { en: 'Organization Structure', np: 'संस्था संरचना', link: '/about#structure' },
      { en: 'Legal Status & Affiliations', np: 'कानुनी हैसियत तथा आबद्धता', link: '/about#legal-status' },
    ],
  },
  {
    en: 'Our Work', np: 'हाम्रो कार्य', link: '/our-work',
    children: [
      { en: 'Core Services', np: 'मुख्य सेवाहरू', link: '/our-work#core-services' },
      { en: 'Other Services', np: 'अन्य सेवाहरू', link: '/our-work#other-services' },
      { en: 'Areas of Focus', np: 'कार्यका प्राथमिकता क्षेत्र', link: '/our-work#areas-of-focus' },
      { en: 'Programs', np: 'कार्यक्रमहरू', link: '/programs' },
      { en: 'Legal Framework', np: 'कानुनी संरचना', link: '/legal-framework' },
    ],
  },
  {
    en: 'Resources', np: 'स्रोत तथा कागजात', link: '/resources',
    children: [
      { en: 'Organizational Documents', np: 'संस्थागत कागजात', link: '/resources#organizational-documents' },
      { en: 'Notices & Updates', np: 'सूचना तथा अपडेटहरू', link: '/notices' },
      { en: 'Publications & Downloads', np: 'प्रकाशन तथा डाउनलोडहरू', link: '/publications' },
    ],
  },
  {
    en: 'Get Involved', np: 'सहभागी हुनुहोस्', link: '/volunteer',
    children: [
      { en: 'Volunteer', np: 'स्वयंसेवा', link: '/volunteer' },
      { en: 'Support Us', np: 'सहयोग गर्नुहोस्', link: '/support' },
      { en: 'Membership', np: 'सदस्यता', link: '/membership' },
    ],
  },
  { en: 'Gallery', np: 'ग्यालरी', link: '/gallery' },
  { en: 'Contact', np: 'सम्पर्क', link: '/contact' },
  { en: 'Donate', np: 'सहयोग', link: '/support#donate', isDonate: true },
];

const Navigation = ({ mobileOpen, setMobileOpen }) => {
  const { lang, t } = useLang();
  const [mobileExpanded, setMobileExpanded] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);

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

  /* Lock body scroll when mobile menu open 
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  */

  const isActive = (item) => {
    const path = location.pathname;
    if (item.children?.some(c => path === c.link.split('?')[0].split('#')[0])) return true;
    return item.link === '/' ? path === '/' : path.startsWith(item.link);
  };

  return (
    <nav
      ref={navRef}
      className={`site-navigation lg:sticky lg:top-0 lg:bg-navy lg:z-[60] max-lg:fixed max-lg:inset-0 max-lg:z-[70] max-lg:pointer-events-none transition-shadow duration-300 ${scrolled ? 'lg:shadow-xl' : 'lg:shadow-md'}`}
    >
      <div className="site-container">

        {/* ── Desktop nav ────────────────────────────────── */}
        <ul className="hidden lg:flex items-center">
          {navItems.map((item, i) => (
            <li key={i} className="nav-item relative group">
              <Link
                to={item.link}
                className={`flex items-center gap-1.5 px-3 py-4 text-sm font-medium transition-all duration-150 whitespace-nowrap
                  ${item.isDonate
                    ? 'my-2 ml-2 rounded-lg bg-sky px-5 py-2.5 font-bold text-white shadow-sm hover:bg-sky-light hover:shadow-md'
                    : isActive(item)
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
                      className={`flex items-start px-4 py-2.5 text-sm leading-snug text-gray-700
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
      </div>

      {/* ── Mobile menu overlay ────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/45 lg:hidden pointer-events-auto"
          onClick={() => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            closeTimerRef.current = setTimeout(() => setMobileOpen(false), 120);
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile menu drawer ─────────────────────────── */}
      <div
        className={`lg:hidden pointer-events-auto fixed top-0 right-0 z-40 h-screen w-[82%] max-w-sm bg-navy text-white shadow-2xl border-l border-white/10 transform transition-transform duration-300 ease-in-out
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
        <Link to="/support#donate" onClick={() => setMobileOpen(false)} className={`mb-2 flex items-center justify-center rounded-xl bg-sky px-4 py-3 text-sm font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>♥ {t('Donate now', 'अहिले सहयोग गर्नुहोस्')}</Link>

        <div className="h-[calc(100vh-72px)] overflow-y-auto">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="border-b border-white/5 last:border-0"
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
                      setMobileExpanded(prev => {
                        return prev.includes(i)
                          ? prev.filter(index => index !== i)
                          : [...prev, i];
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
