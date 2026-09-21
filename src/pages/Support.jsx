import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, donationInfo } from '../data/siteContent';
import {
  FaHandHoldingHeart, FaUniversity, FaMobileAlt, FaIdCard, FaHandshake,
  FaWhatsapp, FaEnvelope, FaFileInvoiceDollar, FaQrcode, FaCopy, FaCheck,
} from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10">
      <div className="site-container">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="w-12 h-1 bg-sky mt-3 rounded" />
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
      // clipboard API unavailable — number is still visible on the page
    }
  };

  return (
    <div>
      <PageBanner titleEn="Support Us" titleNp="हामीलाई सहयोग गर्नुहोस्" />

      <div className="site-container py-10">

        {/* Why it matters */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <FaHandHoldingHeart className="text-sky mx-auto mb-4" size={34} />
          <h2 className={`text-xl font-bold text-navy mb-3 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Your Support Makes a Difference', 'तपाईंको सहयोगले फरक पार्छ')}
          </h2>
          <p className={`text-gray-600 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-base'}`}>
            {t(
              'Every contribution — financial, in-kind, or your time — helps us provide legal aid, mediate disputes, and build a more just and peaceful Nepal. REPC-Nepal is a registered nonprofit organization; your support goes directly toward our programs and the communities we serve.',
              'हरेक योगदान — आर्थिक, वस्तुगत वा समयका रूपमा — ले हामीलाई कानुनी सहायता प्रदान गर्न, विवादमा मेलमिलाप गराउन र थप न्यायपूर्ण तथा शान्तिपूर्ण नेपाल निर्माण गर्न सहयोग गर्छ। REPC-Nepal दर्ता भएको गैरनाफामूलक संस्था हो; तपाईंको सहयोग हाम्रा कार्यक्रम र हामीले सेवा गर्ने समुदायका लागि प्रत्यक्ष रूपमा उपयोग हुन्छ।'
            )}
          </p>
        </section>

        {/* Ways to give */}
        <section className="mb-12">
          <h2 className={`text-xl font-bold text-navy mb-5 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Ways to Give', 'सहयोगका माध्यमहरू')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {donationInfo.waysToGive.map((way, i) => {
              const Icon = wayIconMap[way.icon] || FaHandshake;
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 flex gap-4 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <Icon className="text-navy" size={18} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-navy text-sm mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? way.titleEn : way.titleNp}
                    </h3>
                    <p className={`text-gray-600 text-xs leading-relaxed ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? way.descEn : way.descNp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bank details */}
        <section className="mb-12">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy shadow-sm"><FaQrcode size={16} /></span>
            <div>
              <h3 className={`font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>{t('Scan to contribute', 'QR स्क्यान गरेर सहयोग गर्नुहोस्')}</h3>
              <p className={`text-xs text-slate-500 ${isNp ? 'font-nepali' : ''}`}>{t('Use Fonepay or a supported banking app', 'Fonepay वा समर्थित बैंकिङ एप प्रयोग गर्नुहोस्')}</p>
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <img src={donationInfo.qrImage} alt={isNp ? donationInfo.qrAltNp : donationInfo.qrAltEn} className="mx-auto aspect-square max-w-[280px] object-contain" />
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className={`font-bold text-navy ${isNp ? 'font-nepali' : ''}`}>{t('Or use bank transfer', 'वा बैंकमार्फत सहयोग गर्नुहोस्')}</h3>
              <button type="button" onClick={copyAccount} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-navy hover:border-sky" title={t('Copy account number', 'खाता नम्बर कपी गर्नुहोस्')}>
                {copied ? <FaCheck className="text-green-600" size={11} /> : <FaCopy size={11} />}
                {copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}
              </button>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                [t('Bank', 'बैंक'), lang === 'en' ? donationInfo.bankNameEn : donationInfo.bankNameNp],
                [t('Account name', 'खाता नाम'), lang === 'en' ? donationInfo.accountNameEn : donationInfo.accountNameNp],
                [t('Account number', 'खाता नम्बर'), donationInfo.accountNo],
                [t('Branch', 'शाखा'), lang === 'en' ? donationInfo.branchEn : donationInfo.branchNp],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[92px_1fr] gap-3">
                  <dt className={`font-semibold text-slate-500 ${isNp ? 'font-nepali' : ''}`}>{label}</dt>
                  <dd className={`font-semibold text-slate-800 break-words ${isNp ? 'font-nepali' : ''}`}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy rounded-sm p-8 text-center">
          <h2 className={`text-white font-bold text-lg mb-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Questions About Giving?', 'सहयोगबारे प्रश्न छ?')}
          </h2>
          <p className={`text-white/70 text-sm mb-6 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Talk to us about membership, partnerships, or large donations.', 'सदस्यता, साझेदारी, वा ठूला दानबारे हामीसँग कुरा गर्नुहोस्।')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/membership" className="btn-primary bg-sky hover:bg-sky-dark">
              <FaIdCard className="inline mr-2" size={13} /> {t('Become a Member', 'सदस्य बन्नुहोस्')}
            </Link>
            <a
              href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('Hello REPC-Nepal, I would like to know more about supporting your work.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-outline border-white text-white hover:bg-white hover:text-navy"
            >
              <FaWhatsapp className="inline mr-2" size={13} /> {t('WhatsApp Us', 'व्हाट्सएप गर्नुहोस्')}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="btn-outline border-white text-white hover:bg-white hover:text-navy">
              <FaEnvelope className="inline mr-2" size={13} /> {t('Email Us', 'इमेल गर्नुहोस्')}
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Support;
