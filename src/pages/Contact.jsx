import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/siteContent';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaYoutube, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="w-12 h-1 bg-redc mt-3 rounded" />
      </div>
    </div>
  );
};

// ─── APPS SCRIPT CONFIG ──────────────────────────────────────
// After deploying Code.gs as a Web App, paste the URL below.
// See README_APPSSCRIPT.md for the full 5-minute setup guide.
const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE'; // ← UPDATE THIS

const Contact = () => {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      // Google Apps Script requires no-cors mode from the browser.
      // The email IS sent — we just can't read the response body (that's fine).
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError(lang === 'en'
        ? 'Network error. Please check your connection and try again.'
        : 'नेटवर्क त्रुटि। कृपया आफ्नो जडान जाँच गरी पुनः प्रयास गर्नुहोस्।');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageBanner titleEn="Contact Us" titleNp="सम्पर्क गर्नुहोस्" />

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left: Contact Info */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-navy px-5 py-4">
              <h2 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Contact Information', 'सम्पर्क जानकारी')}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-redc/10 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-redc" size={14} />
                </div>
                <div>
                  <p className={`font-semibold text-navy text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Address', 'ठेगाना')}</p>
                  <p className={`text-gray-600 text-sm mt-0.5 leading-relaxed ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? siteInfo.addressEn : siteInfo.addressNp}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-redc/10 flex items-center justify-center shrink-0">
                  <FaPhone className="text-redc" size={13} />
                </div>
                <div>
                  <p className={`font-semibold text-navy text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Phone', 'फोन')}</p>
                  <a href={`tel:${siteInfo.phone}`} className="text-gray-600 text-sm mt-0.5 hover:text-navy transition-colors">
                    {siteInfo.phone}
                  </a>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-green-600" size={15} />
                </div>
                <div>
                  <p className={`font-semibold text-navy text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>{t('WhatsApp', 'ह्वाट्सएप')}</p>
                  <a
                    href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(lang === 'en' ? 'Hello REPC-Nepal, I would like to inquire about your services.' : 'नमस्ते REPC-Nepal, म तपाईंको सेवाहरूबारे जानकारी लिन चाहन्छु।')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    <FaWhatsapp size={11} />
                    {t('Message us on WhatsApp', 'ह्वाट्सएपमा सन्देश पठाउनुहोस्')}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-redc/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-redc" size={13} />
                </div>
                <div>
                  <p className={`font-semibold text-navy text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Email', 'इमेल')}</p>
                  <a href={`mailto:${siteInfo.email}`} className="text-gray-600 text-sm mt-0.5 hover:text-navy transition-colors">
                    {siteInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-redc/10 flex items-center justify-center shrink-0">
                  <FaClock className="text-redc" size={13} />
                </div>
                <div>
                  <p className={`font-semibold text-navy text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Office Hours', 'कार्यालय समय')}</p>
                  <p className={`text-gray-600 text-sm mt-0.5 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? siteInfo.officeHoursEn : siteInfo.officeHoursNp}
                  </p>
                  <p className={`text-gray-400 text-xs mt-0.5 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Saturday & Holidays: Closed', 'शनिबार र बिदाका दिन: बन्द')}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 px-5 py-4">
              <p className={`text-sm font-semibold text-navy mb-3 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Follow Us', 'हामीलाई फलो गर्नुहोस्')}</p>
              <div className="flex gap-3">
                <a href={siteInfo.facebook} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white hover:bg-redc transition-colors" aria-label="Facebook">
                  <FaFacebook size={15} />
                </a>
                <a href={siteInfo.twitter} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white hover:bg-redc transition-colors" aria-label="Twitter">
                  <FaTwitter size={15} />
                </a>
                <a href={siteInfo.youtube} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white hover:bg-redc transition-colors" aria-label="YouTube">
                  <FaYoutube size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map — Thapathali, Kathmandu */}
          <div className="border border-gray-200 rounded-sm overflow-hidden h-52 relative">
            <iframe
              title="REPC-Nepal Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4784865791235!2d85.31502!3d27.69493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b3c4000001%3A0x1a9f2e4c8b3a5d7e!2sThapathali%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1699000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.google.com/?q=Thapathali+Kathmandu+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bottom-2 right-2 bg-white text-xs text-navy hover:text-redc border border-gray-200 shadow px-2 py-1 rounded transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {t('Open in Google Maps ↗', 'गुगल म्यापमा खोल्नुहोस् ↗')}
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-redc px-5 py-4">
              <h2 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Send Us a Message', 'हामीलाई सन्देश पठाउनुहोस्')}
              </h2>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <FaPaperPlane className="text-green-600" size={24} />
                  </div>
                  <h3 className={`text-lg font-bold text-navy mb-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Message Sent!', 'सन्देश पठाइयो!')}
                  </h3>
                  <p className={`text-gray-500 text-sm mb-5 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Thank you for reaching out. We will get back to you soon.', 'हामीलाई सम्पर्क गर्नुभएकोमा धन्यवाद। हामी चाँडै जवाफ दिनेछौं।')}
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    className={`text-navy hover:text-redc font-medium text-sm underline ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Send Another Message', 'अर्को सन्देश पठाउनुहोस्')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Full Name', 'पूरा नाम')} <span className="text-redc">*</span>
                      </label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange}
                        className="form-input"
                        placeholder={lang === 'en' ? 'Your full name' : 'तपाईंको पूरा नाम'} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Email', 'इमेल')} <span className="text-redc">*</span>
                      </label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange}
                        className="form-input"
                        placeholder="example@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Phone Number', 'फोन नम्बर')}
                      </label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className="form-input"
                        placeholder="+977-XXXXXXXXXX" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Subject', 'विषय')} <span className="text-redc">*</span>
                      </label>
                      <select name="subject" required value={form.subject} onChange={handleChange}
                        className="form-input">
                        <option value="">{t('Select subject', 'विषय छान्नुहोस्')}</option>
                        <option value="legal">{t('Free Legal Aid', 'निःशुल्क कानुनी सहायता')}</option>
                        <option value="mediation">{t('Mediation Services', 'मेलमिलाप सेवा')}</option>
                        <option value="training">{t('Training Programs', 'तालिम कार्यक्रम')}</option>
                        <option value="membership">{t('Membership', 'सदस्यता')}</option>
                        <option value="general">{t('General Inquiry', 'सामान्य जिज्ञासा')}</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {t('Message', 'सन्देश')} <span className="text-redc">*</span>
                    </label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      className="form-input resize-none"
                      placeholder={lang === 'en' ? 'Write your message here...' : 'यहाँ आफ्नो सन्देश लेख्नुहोस्...'} />
                  </div>
                  {error && (
                    <p className={`text-redc text-sm bg-red-50 border border-red-200 rounded-sm px-3 py-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {error}
                    </p>
                  )}
                  <button type="submit" disabled={sending}
                    className={`w-full bg-navy hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-sm transition-colors flex items-center justify-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    <FaPaperPlane size={14} />
                    {sending
                      ? t('Sending...', 'पठाउँदैछ...')
                      : t('Send Message', 'सन्देश पठाउनुहोस्')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
