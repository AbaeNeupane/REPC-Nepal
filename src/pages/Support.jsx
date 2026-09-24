import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/organization';
import { donationInfo } from '../data/support';
import {
  FaHandHoldingHeart, FaUniversity, FaMobileAlt, FaIdCard, FaHandshake,
  FaWhatsapp, FaEnvelope, FaQrcode, FaCopy, FaCheck, FaArrowDown,
} from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="page-banner">
      <div className="site-container">
        <div className="relative z-10 mb-2 flex items-center gap-2 text-sm text-white/60">
          <Link to="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`relative z-10 text-2xl font-bold md:text-3xl ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="relative z-10 mt-3 h-1 w-12 rounded bg-sky" />
      </div>
    </div>
  );
};

const wayIconMap = {
  bank: FaUniversity,
  wallet: FaMobileAlt,
  member: FaIdCard,
  partner: FaHandshake,
};

const Support = () => {
  const { lang, t } = useLang();
  const isNp = lang === 'np';
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(donationInfo.accountNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable. The account number remains visible.
    }
  };

  return (
    <div>
      <PageBanner titleEn="Support Us" titleNp="हामीलाई सहयोग गर्नुहोस्" />

      <main className="site-container py-10 sm:py-12">
        <section className="support-intro mb-10">
          <div className="support-intro__icon">
            <FaHandHoldingHeart size={25} />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] text-sky ${isNp ? 'font-nepali' : ''}`}>
              {t('Support REPC-Nepal', 'REPC-नेपाललाई सहयोग गर्नुहोस्')}
            </p>
            <h2 className={`mt-1 text-2xl font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
              {t('Your Support Makes a Difference', 'तपाईंको सहयोगले फरक पार्छ')}
            </h2>
            <p className={`mt-3 max-w-4xl leading-relaxed text-slate-600 ${isNp ? 'font-nepali text-base' : 'text-base'}`}>
              {t(
                'Every contribution — financial, in-kind, or your time — helps us provide legal aid, mediate disputes, and build a more just and peaceful Nepal. REPC-Nepal is a registered nonprofit organization; your support goes directly toward our programs and the communities we serve.',
                'हरेक योगदान — आर्थिक, वस्तुगत वा समयका रूपमा — ले हामीलाई कानुनी सहायता प्रदान गर्न, विवादमा मेलमिलाप गराउन र थप न्यायपूर्ण तथा शान्तिपूर्ण नेपाल निर्माण गर्न सहयोग गर्छ। REPC-Nepal दर्ता भएको गैरनाफामूलक संस्था हो; तपाईंको सहयोग हाम्रा कार्यक्रम र हामीले सेवा गर्ने समुदायका लागि प्रत्यक्ष रूपमा उपयोग हुन्छ।'
              )}
            </p>
          </div>
        </section>

        <section className="mb-10" aria-labelledby="ways-to-give">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 id="ways-to-give" className={`text-xl font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
                {t('Ways to Help', 'सहयोगका माध्यमहरू')}
              </h2>
              <p className={`mt-1 text-sm text-slate-500 ${isNp ? 'font-nepali' : ''}`}>
                {t('Choose the form of support that works best for you.', 'तपाईंलाई उपयुक्त सहयोगको माध्यम छान्नुहोस्।')}
              </p>
            </div>
            <a href="#payment" className="support-jump hidden sm:inline-flex">
              <FaArrowDown size={11} /> {t('See payment details', 'भुक्तानी विवरण हेर्नुहोस्')}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {donationInfo.waysToGive.map((way, i) => {
              const Icon = wayIconMap[way.icon] || FaHandshake;
              return (
                <div key={i} className="support-way-card">
                  <div className="support-way-card__icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? way.titleEn : way.titleNp}
                    </h3>
                    <p className={`mt-1 text-sm leading-relaxed text-slate-600 ${isNp ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? way.descEn : way.descNp}
                    </p>
                  </div>
                </div>
              );
            })}

            <a href="#payment" className="support-way-card support-way-card--qr group">
              <div className="support-way-card__qr">
                <img src={donationInfo.qrImage} alt={isNp ? donationInfo.qrAltNp : donationInfo.qrAltEn} />
              </div>
              <div className="min-w-0">
                <span className={`text-[11px] font-bold uppercase tracking-[0.12em] text-sky ${isNp ? 'font-nepali tracking-normal' : ''}`}>
                  {t('Fonepay QR', 'Fonepay QR')}
                </span>
                <h3 className={`mt-1 text-sm font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
                  {t('Scan and contribute', 'स्क्यान गरेर सहयोग गर्नुहोस्')}
                </h3>
                <p className={`mt-1 text-sm leading-relaxed text-slate-600 ${isNp ? 'font-nepali' : ''}`}>
                  {t('Use Fonepay or a supported banking app to send your contribution.', 'Fonepay वा समर्थित बैंकिङ एपमार्फत सहयोग रकम पठाउनुहोस्।')}
                </p>
              </div>
            </a>
          </div>
        </section>

        <section id="payment" className="mb-10 scroll-mt-24" aria-labelledby="payment-heading">
          <div className="mb-5">
            <h2 id="payment-heading" className={`text-xl font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
              {t('Payment Details', 'भुक्तानी विवरण')}
            </h2>
            <p className={`mt-1 text-sm text-slate-500 ${isNp ? 'font-nepali' : ''}`}>
              {t('Use the Fonepay QR or transfer directly to the organizational bank account.', 'Fonepay QR प्रयोग गर्नुहोस् वा संस्थागत बैंक खातामा सिधै रकम पठाउनुहोस्।')}
            </p>
          </div>

          <div className="support-payment-grid">
            <div className="support-payment-card support-payment-card--qr">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`support-eyebrow ${isNp ? 'font-nepali' : ''}`}>{t('Digital payment', 'डिजिटल भुक्तानी')}</span>
                  <h3 className={`mt-1 text-lg font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
                    {t('Fonepay QR', 'Fonepay QR')}
                  </h3>
                  <p className={`mt-1 text-sm text-slate-500 ${isNp ? 'font-nepali' : ''}`}>
                    {t('Scan with Fonepay or a supported banking app.', 'Fonepay वा समर्थित बैंकिङ एपबाट स्क्यान गर्नुहोस्।')}
                  </p>
                </div>
                <span className="support-payment-icon"><FaQrcode size={16} /></span>
              </div>

              <div className="support-qr-frame">
                <img src={donationInfo.qrImage} alt={isNp ? donationInfo.qrAltNp : donationInfo.qrAltEn} />
              </div>
            </div>

            <div className="support-payment-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`support-eyebrow ${isNp ? 'font-nepali' : ''}`}>{t('Direct transfer', 'प्रत्यक्ष स्थानान्तरण')}</span>
                  <h3 className={`mt-1 text-lg font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>
                    {t('Bank Transfer', 'बैंकमार्फत सहयोग')}
                  </h3>
                </div>
                <span className="support-payment-icon"><FaUniversity size={16} /></span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  [t('Bank', 'बैंक'), lang === 'en' ? donationInfo.bankNameEn : donationInfo.bankNameNp],
                  [t('Account name', 'खाता नाम'), lang === 'en' ? donationInfo.accountNameEn : donationInfo.accountNameNp],
                  [t('Account number', 'खाता नम्बर'), donationInfo.accountNo],
                  [t('Branch', 'शाखा'), lang === 'en' ? donationInfo.branchEn : donationInfo.branchNp],
                ].map(([label, value]) => (
                  <div key={label} className="support-bank-row">
                    <dt className={`support-bank-label ${isNp ? 'font-nepali' : ''}`}>{label}</dt>
                    <dd className={`support-bank-value ${isNp ? 'font-nepali' : ''}`}>{value}</dd>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={copyAccount}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-navy transition hover:border-sky/40 hover:bg-white"
              >
                {copied ? <FaCheck className="text-green-600" size={11} /> : <FaCopy size={11} />}
                {copied ? t('Copied', 'कपी भयो') : t('Copy account number', 'खाता नम्बर कपी गर्नुहोस्')}
              </button>
            </div>
          </div>
        </section>

        <section className="support-contact-panel">
          <div>
            <span className={`support-eyebrow text-sky ${isNp ? 'font-nepali' : ''}`}>{t('Need help?', 'थप जानकारी चाहिन्छ?')}</span>
            <h2 className={`mt-1 text-xl font-bold text-white ${isNp ? 'font-nepali' : ''}`}>
              {t('Talk to REPC-Nepal about your support.', 'तपाईंको सहयोगबारे REPC-नेपालसँग कुरा गर्नुहोस्।')}
            </h2>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed text-white/70 ${isNp ? 'font-nepali' : ''}`}>
              {t('We can help with membership, partnerships, in-kind support, and larger contributions.', 'सदस्यता, साझेदारी, वस्तुगत सहयोग तथा ठूला योगदानबारे हामी जानकारी दिन सक्छौं।')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/membership" className="btn-primary bg-sky hover:bg-sky-dark">
              <FaIdCard size={13} /> {t('Become a Member', 'सदस्य बन्नुहोस्')}
            </Link>
            <a
              href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('Hello REPC-Nepal, I would like to know more about supporting your work.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline border-white text-white hover:bg-white hover:text-navy"
            >
              <FaWhatsapp size={13} /> {t('WhatsApp Us', 'व्हाट्सएप गर्नुहोस्')}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="btn-outline border-white text-white hover:bg-white hover:text-navy">
              <FaEnvelope size={13} /> {t('Email Us', 'इमेल गर्नुहोस्')}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Support;
