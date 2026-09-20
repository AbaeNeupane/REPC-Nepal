import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, importantLinks } from '../data/siteContent';

import {
  FaFacebook, FaTwitter, FaYoutube, FaWhatsapp,
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaClock, FaChevronDown,
} from 'react-icons/fa';

const toNepaliDigits = value => String(value).replace(/[0-9]/g, digit => '०१२३४५६७८९'[digit]);

const quickLinks = [
  { en: 'Home', np: 'गृह पृष्ठ', to: '/' },
  { en: 'Our Organization', np: 'हाम्रो संस्था', to: '/about' },
  { en: 'Our Services', np: 'हाम्रा सेवाहरू', to: '/services' },
  { en: 'Notices', np: 'सूचनाहरू', to: '/notices' },
  { en: 'Programs', np: 'कार्यक्रमहरू', to: '/programs' },
  { en: 'Publications', np: 'प्रकाशनहरू', to: '/publications' },
  { en: 'Legal Framework', np: 'कानुनी संरचना', to: '/legal-framework' },
  { en: 'Gallery', np: 'ग्यालरी', to: '/gallery' },
  { en: 'Volunteer', np: 'स्वयंसेवा', to: '/volunteer' },
  { en: 'Support Us', np: 'सहयोग गर्नुहोस्', to: '/support' },
  { en: 'Contact Us', np: 'सम्पर्क', to: '/contact' },
];

/**
 * Footer column with a heading.
 * - Below `md`: heading is a tap-to-expand button (keeps the footer short on phones).
 * - `md` and up: always open, plain heading.
 */
const FooterSection = ({ title, fontClass, defaultOpen = false, children, className = '' }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`border-b border-white/10 md:border-0 ${className}`}>
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className={`w-full flex items-center justify-between py-4 md:py-0 md:mb-4 md:pb-2 md:border-b md:border-white/20
                      text-left text-white font-bold text-sm md:cursor-default
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky ${fontClass}`}
        >
          <span>{title}</span>
          <FaChevronDown
            size={11}
            className={`md:hidden text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div className={`${open ? 'block' : 'hidden'} pb-5 md:block md:pb-0`}>{children}</div>
    </section>
  );
};

const socials = [
  { key: 'facebook', label: 'Facebook', Icon: FaFacebook, href: () => siteInfo.facebook, hover: 'hover:bg-sky' },
  { key: 'twitter', label: 'Twitter', Icon: FaTwitter, href: () => siteInfo.twitter, hover: 'hover:bg-sky' },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube, href: () => siteInfo.youtube, hover: 'hover:bg-sky' },
  { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp, href: () => `https://wa.me/${siteInfo.whatsapp}`, hover: 'hover:bg-green-500' },
];

const Footer = () => {
  const { lang, t } = useLang();
  const np = lang === 'np' ? 'font-nepali' : '';

  return (
    <footer className="site-footer bg-[#0a1628] text-white">
      {/* Accent edge */}
      <div className="h-[3px] bg-sky" aria-hidden="true" />

      {/* Main footer
          mobile : 1 column, link groups collapse
          md     : 2 columns (brand + contact span full width)
          lg     : 12-col grid -> brand 4 | quick 2 | important 3 | contact 3 */}
      <div className="site-container pt-8 pb-6 sm:pt-10 md:pt-12 md:pb-10
                      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12
                      gap-x-8 lg:gap-x-10 gap-y-2 md:gap-y-10">

        {/* Brand + About */}
        <div className="md:col-span-2 lg:col-span-4 pb-6 md:pb-0 border-b border-white/10 md:border-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center bg-navy shrink-0 border-2 border-white/30">
              <img
                key={lang}
                src={lang === 'np' ? '/logoNp.png' : '/logoEn.png'}
                alt={lang === 'np' ? 'REPC नेपाल लोगो' : 'REPC Logo'}
                className="w-full h-full object-cover rounded-full block scale-[1.24]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <span className="text-white text-xs font-bold hidden items-center justify-center">REPC</span>
            </div>
            <div className="min-w-0">
              <p className={`text-white/60 text-xs italic mt-0.5 ${np}`}>
                "{t(siteInfo.mottoEn, siteInfo.mottoNp)}"
              </p>
              <p className={`font-bold text-base leading-tight ${np}`}>
                {t('REPC-Nepal', 'REPC-नेपाल')}
              </p>
            </div>
          </div>

          {/* About text + socials sit side by side on tablet, stacked elsewhere */}
          <div className="md:flex md:items-center md:justify-between md:gap-10 lg:block">
            <p className={`text-white/70 text-[13px] leading-relaxed mb-4 md:mb-0 md:max-w-xl lg:max-w-none lg:mb-5 ${np}`}>
              {t(
                "Working toward a Nepal where rights are protected, conflicts are resolved with dignity, and peace is within everyone's reach.",
                'अधिकार सुरक्षित हुने, द्वन्द्वहरू मर्यादापूर्वक समाधान हुने, र शान्ति सबैको पहुँचमा हुने नेपाल निर्माणतर्फ काम गर्दै।'
              )}
            </p>

            <div className="flex items-center gap-3 shrink-0">
              {socials.map(({ key, label, Icon, href, hover }) => (
                <a
                  key={key}
                  href={href()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 md:w-9 md:h-9 rounded-full bg-white/10 ${hover} flex items-center justify-center transition-colors
                              focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <FooterSection
          title={t('Quick Links', 'द्रुत लिंकहरू')}
          fontClass={np}
          className="lg:col-span-2"
        >
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1 md:gap-y-0 md:space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`text-white/70 hover:text-white text-[13px] md:text-xs flex items-center gap-1.5 py-1.5 md:py-0 transition-colors ${np}`}
                >
                  <span className="text-sky" aria-hidden="true">›</span>
                  {lang === 'en' ? l.en : l.np}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Important Links */}
        <FooterSection
          title={t('Important Links', 'महत्त्वपूर्ण लिंकहरू')}
          fontClass={np}
          className="lg:col-span-3"
        >
          <ul className="space-y-1 md:space-y-2">
            {importantLinks.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 hover:text-white text-[13px] md:text-xs flex items-start gap-1.5 py-1.5 md:py-0 leading-snug transition-colors ${np}`}
                >
                  <span className="text-sky shrink-0 md:mt-0.5" aria-hidden="true">›</span>
                  {lang === 'en' ? l.en : l.np}
                </a>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Contact + Office Hours (always visible; the most-used info on mobile)
            md: contact list and hours card sit side by side, lg: stacked in the column */}
        <div className="pt-6 md:pt-0 md:col-span-2 lg:col-span-3">
          <h3 className={`text-white font-bold text-sm mb-4 md:pb-2 md:border-b md:border-white/20 ${np}`}>
            {t('Contact Us', 'सम्पर्क गर्नुहोस्')}
          </h3>

          <div className="grid gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-1 lg:gap-5">
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-sky shrink-0 mt-1" size={12} aria-hidden="true" />
                <span className={`text-white/70 text-[13px] md:text-xs leading-relaxed ${np}`}>
                  {lang === 'en' ? siteInfo.addressEn : siteInfo.addressNp}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhone className="text-sky shrink-0" size={11} aria-hidden="true" />
                <a href={`tel:${siteInfo.phone}`} className="text-white/70 hover:text-white text-[13px] md:text-xs py-1 transition-colors">
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 min-w-0">
                <FaEnvelope className="text-sky shrink-0" size={11} aria-hidden="true" />
                <a href={`mailto:${siteInfo.email}`} className="text-white/70 hover:text-white text-[13px] md:text-xs py-1 transition-colors break-all">
                  {siteInfo.email}
                </a>
              </li>
            </ul>

            <div className="p-4 bg-white/5 rounded-md border border-white/10 self-start w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <FaClock className="text-sky" size={12} aria-hidden="true" />
                <p className={`text-white text-xs font-semibold ${np}`}>
                  {t('Office Hours', 'कार्यालय समय')}
                </p>
              </div>
              <p className={`text-white/70 text-xs ${np}`}>
                {lang === 'en' ? siteInfo.officeHoursEn : siteInfo.officeHoursNp}
              </p>
              <p className={`text-white/50 text-xs mt-1 ${np}`}>
                {t('Saturday & Holidays: Closed', 'शनिबार र बिदाका दिन: बन्द')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar
          mobile: centered stack (extra bottom padding clears a fixed bottom nav)
          md+   : copyright left, registration right */}
      <div className="border-t border-white/10 py-4 pb-24 md:pb-4 bg-black/20">
        <div className="site-container footer-bottom-bar flex flex-col md:flex-row items-center md:justify-between gap-1.5 md:gap-4 text-center md:text-left">
          <p className={`text-white/50 text-[10px] md:text-xs ${np}`}>
            {t(
              `© 2083 Rights, Equity and Peace Campaign – Nepal. All rights reserved.`,
              `© २०८३ अधिकार, समता र शान्ति अभियान–नेपाल। सर्वाधिकार सुरक्षित।`
            )}
          </p>
          <p className={`text-white/40 text-xs md:text-right ${np}`}>
            {t(
              `Reg. No: ${siteInfo.registrationNo}`,
              `दर्ता नं: ${toNepaliDigits(siteInfo.registrationNo)}`
            )}
            <span className="mx-2 opacity-50">|</span>
            {t(
              `PAN: ${siteInfo.panNo}`,
              `स्थायी लेखा नं: ${toNepaliDigits(siteInfo.panNo)}`
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;