import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo, volunteerAreas } from '../data/siteContent';
import {
  FaHandsHelping, FaBalanceScale, FaHandshake, FaBullhorn,
  FaClipboardList, FaBriefcase, FaPaperPlane, FaCheckCircle,
} from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
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

const areaIconMap = {
  legal: FaBalanceScale,
  mediation: FaHandshake,
  outreach: FaBullhorn,
  events: FaClipboardList,
  professional: FaBriefcase,
};

// ─── APPS SCRIPT CONFIG ──────────────────────────────────────
// Set VITE_APPS_SCRIPT_URL in your .env file (see .env.example).
// Same deployment as the Contact form — see README_APPSSCRIPT.md.
const SCRIPT_URL = import.meta.env.APPS_SCRIPT_URL || '';

const Volunteer = () => {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', area: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');

    if (!SCRIPT_URL) {
      setError(lang === 'en'
        ? `The volunteer form isn't set up yet. Please email us directly at ${siteInfo.email}.`
        : `स्वयंसेवक फारम अझै सेटअप भएको छैन। कृपया ${siteInfo.email} मा सिधै इमेल गर्नुहोस्।`);
      setSending(false);
      return;
    }

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ formType: 'volunteer', ...form }),
      });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', area: '', message: '' });
    } catch {
      setError(lang === 'en'
        ? 'Something went wrong. Please try again or reach us on WhatsApp.'
        : 'केही समस्या भयो। कृपया पुनः प्रयास गर्नुहोस् वा व्हाट्सएपमार्फत सम्पर्क गर्नुहोस्।');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageBanner titleEn="Get Involved" titleNp="सहभागी हुनुहोस्" />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <FaHandsHelping className="text-sky mx-auto mb-4" size={34} />
          <h2 className={`text-xl font-bold text-navy mb-3 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Volunteer With REPC-Nepal', 'REPC-नेपालसँग स्वयंसेवा गर्नुहोस्')}
          </h2>
          <p className={`text-gray-600 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
            {t(
              'Whether you have a few hours a month or a professional skill to share, there is a place for you at REPC-Nepal. Tell us how you would like to contribute, and we will follow up with the next steps.',
              'तपाईंसँग महिनामा केही घण्टा समय होस् वा साझा गर्न मिल्ने व्यावसायिक सीप, REPC-नेपालमा तपाईंका लागि योगदान गर्ने अवसर छ। तपाईं कुन क्षेत्रमा सहयोग गर्न चाहनुहुन्छ बताउनुहोस्; हामी आगामी प्रक्रियाबारे सम्पर्क गर्नेछौं।'
            )}
          </p>
        </section>

        {/* Areas */}
        <section className="mb-12">
          <h2 className={`text-xl font-bold text-navy mb-5 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Ways to Volunteer', 'स्वयंसेवाका क्षेत्रहरू')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {volunteerAreas.map((area) => {
              const Icon = areaIconMap[area.id] || FaHandsHelping;
              return (
                <div key={area.id} className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 hover:shadow-md transition-shadow">
                  <Icon className="text-sky mb-3" size={20} />
                  <h3 className={`font-bold text-navy text-sm mb-1.5 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? area.titleEn : area.titleNp}
                  </h3>
                  <p className={`text-gray-600 text-xs leading-relaxed ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? area.descEn : area.descNp}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-navy p-4">
              <h2 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Volunteer Interest Form', 'स्वयंसेवा इच्छा फारम')}
              </h2>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-green-500 mx-auto mb-3" size={36} />
                  <p className={`text-navy font-semibold ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Thank you! We\'ll be in touch soon.', 'धन्यवाद! हामी छिट्टै सम्पर्क गर्नेछौं।')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder={t('Full Name', 'पूरा नाम')}
                      className="form-input"
                    />
                    <input
                      type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder={t('Email', 'इमेल')}
                      className="form-input"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="phone" value={form.phone} onChange={handleChange}
                      placeholder={t('Phone (optional)', 'फोन (वैकल्पिक)')}
                      className="form-input"
                    />
                    <select name="area" required value={form.area} onChange={handleChange} className="form-input">
                      <option value="">{t('Select area of interest', 'रुचिको क्षेत्र छान्नुहोस्')}</option>
                      {volunteerAreas.map(area => (
                        <option key={area.id} value={area.id}>{lang === 'en' ? area.titleEn : area.titleNp}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    name="message" rows={4} value={form.message} onChange={handleChange}
                    placeholder={t('Tell us a bit about yourself and your availability', 'आफ्नोबारे र उपलब्धताबारे संक्षिप्त जानकारी दिनुहोस्')}
                    className="form-input resize-none"
                  />

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                    <FaPaperPlane size={13} />
                    {sending ? t('Sending...', 'पठाउँदै...') : t('Submit Interest', 'इच्छा पठाउनुहोस्')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Volunteer;
