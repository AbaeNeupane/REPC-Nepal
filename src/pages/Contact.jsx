import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/siteContent';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaYoutube, FaPaperPlane } from 'react-icons/fa';

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

const Contact = () => {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // In production, connect this to your backend or a form service like Formspree
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
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

          {/* Map placeholder */}
          <div className="bg-gray-100 border border-gray-200 rounded-sm overflow-hidden h-52 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <FaMapMarkerAlt size={28} className="mx-auto mb-2" />
              <p className={`text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Thapathali, Kathmandu', 'थापाथली, काठमाण्डौं')}
              </p>
              <a href="https://maps.google.com/?q=Thapathali+Kathmandu" target="_blank" rel="noopener noreferrer"
                className={`text-xs text-navy hover:text-redc underline mt-1 block ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('View on Google Maps', 'गुगल म्यापमा हेर्नुहोस्')}
              </a>
            </div>
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
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-navy transition-colors"
                        placeholder={lang === 'en' ? 'Your full name' : 'तपाईंको पूरा नाम'} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Email', 'इमेल')} <span className="text-redc">*</span>
                      </label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-navy transition-colors"
                        placeholder="example@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Phone Number', 'फोन नम्बर')}
                      </label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-navy transition-colors"
                        placeholder="+977-XXXXXXXXXX" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {t('Subject', 'विषय')} <span className="text-redc">*</span>
                      </label>
                      <select name="subject" required value={form.subject} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-navy transition-colors bg-white">
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
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                      placeholder={lang === 'en' ? 'Write your message here...' : 'यहाँ आफ्नो सन्देश लेख्नुहोस्...'} />
                  </div>
                  <button type="submit"
                    className={`w-full bg-navy hover:bg-navy-light text-white font-semibold py-3 px-6 rounded-sm transition-colors flex items-center justify-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    <FaPaperPlane size={14} />
                    {t('Send Message', 'सन्देश पठाउनुहोस्')}
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
