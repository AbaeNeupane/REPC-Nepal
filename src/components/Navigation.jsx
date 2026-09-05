import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const navItems = [
  {
    en: 'Home', np: 'गृह पृष्ठ', link: '/',
  },
  {
    en: 'About Us', np: 'हाम्रोबारे', link: '/about',
    children: [
      { en: 'Introduction', np: 'परिचय', link: '/about' },
      { en: 'Mission & Vision', np: 'लक्ष्य र दृष्टि', link: '/about#mission' },
      { en: 'Executive Committee', np: 'कार्य समिति', link: '/about#team' },
      { en: 'Organization Structure', np: 'संगठन संरचना', link: '/about#structure' },
      { en: 'Constitution 2083', np: 'विधान २०८३', link: '/about#constitution' },
    ],
  },
  {
    en: 'Services', np: 'सेवाहरू', link: '/services',
    children: [
      { en: 'Free Legal Aid', np: 'निःशुल्क कानुनी सहायता', link: '/services#legal' },
      { en: 'Mediation & Arbitration', np: 'मेलमिलाप र मध्यस्थता', link: '/services#mediation' },
      { en: 'Training & Workshops', np: 'तालिम र कार्यशाला', link: '/services#training' },
      { en: 'Research & Documentation', np: 'अनुसन्धान र अभिलेखीकरण', link: '/services#research' },
      { en: 'Peace Building', np: 'शान्ति निर्माण', link: '/services#peace' },
    ],
  },
  {
    en: 'Programs', np: 'कार्यक्रमहरू', link: '/programs',
  },
  {
    en: 'Notices', np: 'सूचना', link: '/notices',
    children: [
      { en: 'Notices', np: 'सूचनाहरू', link: '/notices' },
      { en: 'Press Release', np: 'प्रेस विज्ञप्ति', link: '/notices?tab=press' },
      { en: 'Reports', np: 'प्रतिवेदनहरू', link: '/notices?tab=reports' },
      { en: 'Activities', np: 'गतिविधिहरू', link: '/notices?tab=activities' },
    ],
  },
  {
    en: 'Publications', np: 'प्रकाशनहरू', link: '/publications',
    children: [
      { en: 'Downloads', np: 'डाउनलोडहरू', link: '/publications#downloads' },
      { en: 'Annual Reports', np: 'वार्षिक प्रतिवेदन', link: '/publications#annual' },
      { en: 'Legal Documents', np: 'कानुनी दस्तावेज', link: '/publications#legal' },
    ],
  },
  {
    en: 'Gallery', np: 'ग्यालरी', link: '/gallery',
  },
  {
    en: 'Contact', np: 'सम्पर्क', link: '/contact',
  },
];

const DropdownMenu = ({ items }) => {
  const { lang } = useLang();
  return (
    <div className="nav-dropdown py-1">
      {items.map((item, i) => (
        <Link
          key={i}
          to={item.link}
          className={`block px-4 py-2.5 text-sm text-gray-700 hover:bg-navy hover:text-white transition-colors border-l-2 border-transparent hover:border-redc ${lang === 'np' ? 'font-nepali' : ''}`}
        >
          {lang === 'en' ? item.en : item.np}
        </Link>
      ))}
    </div>
  );
};

const Navigation = () => {
  const { lang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();

  const isActive = (link) => location.pathname === link;

  return (
    <nav className="bg-navy shadow-md relative z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center">
          {navItems.map((item, i) => (
            <li key={i} className="nav-item relative">
              <Link
                to={item.link}
                className={`flex items-center gap-1 px-3 py-4 text-sm font-medium transition-colors whitespace-nowrap
                  ${isActive(item.link) ? 'bg-redc text-white' : 'text-white/90 hover:bg-navy-light hover:text-white'}
                  ${lang === 'np' ? 'font-nepali text-base' : ''}`}
              >
                {lang === 'en' ? item.en : item.np}
                {item.children && <FaChevronDown size={10} className="opacity-70" />}
              </Link>
              {item.children && <DropdownMenu items={item.children} />}
            </li>
          ))}
        </ul>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center justify-between py-3">
          <span className={`text-white font-semibold text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Menu', 'मेनु')}
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-2"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          {navItems.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <Link
                  to={item.link}
                  onClick={() => !item.children && setMobileOpen(false)}
                  className={`flex-1 block px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-navy-light transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
                >
                  {lang === 'en' ? item.en : item.np}
                </Link>
                {item.children && (
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                    className="px-4 py-3 text-white/70"
                  >
                    <FaChevronDown size={12} className={`transition-transform ${mobileExpanded === i ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {item.children && mobileExpanded === i && (
                <div className="bg-navy-dark/50 border-l-2 border-redc ml-4">
                  {item.children.map((child, j) => (
                    <Link
                      key={j}
                      to={child.link}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 text-sm text-white/75 hover:text-white transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
                    >
                      {lang === 'en' ? child.en : child.np}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
