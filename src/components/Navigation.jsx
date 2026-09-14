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
      { en: 'Organization Structure', np: 'संगठन संरचना',   link: '/about#structure' },
      { en: 'Constitution 2083',   np: 'विधान २०८३',        link: '/about#constitution' },
    ],
  },
  {
    en: 'Services', np: 'सेवाहरू', link: '/services',
    children: [
      { en: 'Free Legal Aid',          np: 'निःशुल्क कानुनी सहायता', link: '/services#legal' },
      { en: 'Mediation & Arbitration', np: 'मेलमिलाप र मध्यस्थता',   link: '/services#mediation' },
      { en: 'Training & Workshops',    np: 'तालिम र कार्यशाला',       link: '/services#training' },
      { en: 'Research & Documentation',np: 'अनुसन्धान र अभिलेखीकरण', link: '/services#research' },
      { en: 'Peace Building',          np: 'शान्ति निर्माण',          link: '/services#peace' },
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
    ],
  },
  { en: 'Gallery', np: 'ग्यालरी', link: '/gallery' },
  { en: 'Contact', np: 'सम्पर्क', link: '/contact' },
];

const Navigation = () => {
  const { lang, t } = useLang();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled]         = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
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
      className={`bg-navy relative z-40 transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Desktop nav ────────────────────────────────── */}
        <ul className="hidden md:flex items-center">
          {navItems.map((item, i) => (
            <li key={i} className="nav-item relative group">
              <Link
                to={item.link}
                className={`flex items-center gap-1.5 px-3 py-4 text-sm font-medium transition-all duration-150 whitespace-nowrap
                  ${isActive(item)
                    ? 'bg-redc text-white'
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
                        border-l-2 border-transparent hover:border-redc
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
        <div className="md:hidden flex items-center justify-between py-3">
          <span className={`text-white font-semibold text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Menu', 'मेनु')}
          </span>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="text-white p-2 rounded hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <FaTimes size={20} className="animate-scaleIn" />
              : <FaBars  size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu overlay ────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile menu drawer ─────────────────────────── */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 z-40
          bg-navy-dark border-t border-white/10 shadow-2xl
          transition-all duration-300 ease-in-out origin-top
          ${mobileOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
        style={{ transformOrigin: 'top' }}
      >
        <div className="max-h-[75vh] overflow-y-auto">
          {navItems.map((item, i) => (
            <div key={i} className="border-b border-white/5 last:border-0">
              <div className="flex items-center">
                <Link
                  to={item.link}
                  onClick={() => !item.children && setMobileOpen(false)}
                  className={`flex-1 px-5 py-3.5 text-sm font-medium transition-colors
                    ${isActive(item) ? 'text-amber' : 'text-white/90 hover:text-white hover:bg-white/5'}
                    ${lang === 'np' ? 'font-nepali' : ''}`}
                >
                  {lang === 'en' ? item.en : item.np}
                </Link>
                {item.children && (
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                    className="px-5 py-3.5 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Toggle submenu"
                  >
                    <FaChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${mobileExpanded === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>

              {/* Submenu */}
              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-250
                    ${mobileExpanded === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="bg-black/20 border-l-2 border-redc ml-5 mb-1">
                    {item.children.map((child, j) => (
                      <Link
                        key={j}
                        to={child.link}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5
                          transition-colors
                          ${lang === 'np' ? 'font-nepali' : ''}`}
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