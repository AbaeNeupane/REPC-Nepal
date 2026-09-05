import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, importantLinks } from '../data/siteContent';
import {
  FaFacebook, FaTwitter, FaYoutube,
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';

const Footer = () => {
  const { lang, t } = useLang();

  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Column 1: Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden flex items-center justify-center bg-navy shrink-0">
              <img src="/emblem.png" alt="Logo" className="w-full h-full object-contain"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
              <span className="text-white text-xs font-bold hidden items-center justify-center">REPC</span>
            </div>
            <div>
              <p className={`font-bold text-sm leading-tight ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('REPC-Nepal', 'REPC-नेपाल')}
              </p>
              <p className={`text-white/60 text-xs ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t(siteInfo.mottoEn, siteInfo.mottoNp)}
              </p>
            </div>
          </div>

          <p className={`text-white/70 text-xs leading-relaxed mb-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'A non-profit NGO dedicated to human rights, mediation, and building a just and peaceful society in Nepal.',
              'मानव अधिकार, मेलमिलाप र नेपालमा न्यायपूर्ण तथा शान्तिपूर्ण समाज निर्माणका लागि समर्पित गैर सरकारी संस्था।'
            )}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a href={siteInfo.facebook} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 rounded-full bg-white/10 hover:bg-redc flex items-center justify-center transition-colors" aria-label="Facebook">
              <FaFacebook size={14} />
            </a>
            <a href={siteInfo.twitter} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 rounded-full bg-white/10 hover:bg-redc flex items-center justify-center transition-colors" aria-label="Twitter">
              <FaTwitter size={14} />
            </a>
            <a href={siteInfo.youtube} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 rounded-full bg-white/10 hover:bg-redc flex items-center justify-center transition-colors" aria-label="YouTube">
              <FaYoutube size={14} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className={`text-white font-bold text-sm mb-4 pb-2 border-b border-white/20 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Quick Links', 'द्रुत लिंकहरू')}
          </h3>
          <ul className="space-y-2">
            {[
              { en: 'Home', np: 'गृह पृष्ठ', to: '/' },
              { en: 'About Us', np: 'हाम्रोबारे', to: '/about' },
              { en: 'Our Services', np: 'हाम्रा सेवाहरू', to: '/services' },
              { en: 'Notices', np: 'सूचनाहरू', to: '/notices' },
              { en: 'Programs', np: 'कार्यक्रमहरू', to: '/programs' },
              { en: 'Publications', np: 'प्रकाशनहरू', to: '/publications' },
              { en: 'Gallery', np: 'ग्यालरी', to: '/gallery' },
              { en: 'Contact Us', np: 'सम्पर्क', to: '/contact' },
            ].map((l, i) => (
              <li key={i}>
                <Link to={l.to}
                  className={`text-white/70 hover:text-white text-xs flex items-center gap-1.5 transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}>
                  <span className="text-redc">›</span> {lang === 'en' ? l.en : l.np}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Important Links */}
        <div>
          <h3 className={`text-white font-bold text-sm mb-4 pb-2 border-b border-white/20 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Important Links', 'महत्त्वपूर्ण लिंकहरू')}
          </h3>
          <ul className="space-y-2">
            {importantLinks.map((l, i) => (
              <li key={i}>
                <a href={l.url} target="_blank" rel="noopener noreferrer"
                  className={`text-white/70 hover:text-white text-xs flex items-start gap-1.5 transition-colors leading-snug ${lang === 'np' ? 'font-nepali' : ''}`}>
                  <span className="text-redc shrink-0 mt-0.5">›</span>
                  {lang === 'en' ? l.en : l.np}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact + Office Hours */}
        <div>
          <h3 className={`text-white font-bold text-sm mb-4 pb-2 border-b border-white/20 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Contact Us', 'सम्पर्क गर्नुहोस्')}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-redc shrink-0 mt-0.5" size={12} />
              <span className={`text-white/70 text-xs leading-relaxed ${lang === 'np' ? 'font-nepali' : ''}`}>
                {lang === 'en' ? siteInfo.addressEn : siteInfo.addressNp}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhone className="text-redc shrink-0" size={11} />
              <a href={`tel:${siteInfo.phone}`} className="text-white/70 hover:text-white text-xs transition-colors">
                {siteInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-redc shrink-0" size={11} />
              <a href={`mailto:${siteInfo.email}`} className="text-white/70 hover:text-white text-xs transition-colors">
                {siteInfo.email}
              </a>
            </li>
          </ul>

          {/* Office Hours */}
          <div className="mt-5 p-3 bg-white/5 rounded-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <FaClock className="text-amber" size={12} />
              <p className={`text-white text-xs font-semibold ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Office Hours', 'कार्यालय समय')}
              </p>
            </div>
            <p className={`text-white/70 text-xs ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? siteInfo.officeHoursEn : siteInfo.officeHoursNp}
            </p>
            <p className={`text-white/50 text-xs mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Saturday & Holidays: Closed', 'शनिबार र बिदाका दिन: बन्द')}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`text-white/50 text-xs ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              `© 2083 Rights, Equity and Peace Campaign – Nepal. All rights reserved.`,
              `© २०८३ अधिकार, समता र शान्ति अधियान, नेपाल। सर्वाधिकार सुरक्षित।`
            )}
          </p>
          <p className={`text-white/40 text-xs ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(`Reg. No: ${siteInfo.registrationNo}`, `दर्ता नं: ${siteInfo.registrationNo}`)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
