import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/organization';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

// Same Apps Script Web App used by Contact.jsx / Volunteer.jsx.
// Your Code.gs needs a branch that recognizes { formType: 'newsletter', email }
// and appends it to its own "Newsletter" sheet tab — see the note in chat.
const SCRIPT_URL = import.meta.env.APPS_SCRIPT_URL || '';

const NewsletterSignup = ({ className = '' }) => {
  const { lang, t } = useLang();
  const np = lang === 'np' ? 'font-nepali' : '';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) return;

    if (!SCRIPT_URL) {
      setError(lang === 'en'
        ? 'Newsletter signup isn\'t connected yet.'
        : 'न्यूजलेटर साइनअप अझै जडान भएको छैन।');
      return;
    }

    setStatus('sending');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ formType: 'newsletter', email: email.trim() }),
      });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
      setError(lang === 'en'
        ? 'Network error. Please try again.'
        : 'नेटवर्क त्रुटि। कृपया पुनः प्रयास गर्नुहोस्।');
    }
  };

  if (status === 'done') {
    return (
      <div className={`flex items-center gap-2 text-sm text-sky ${np} ${className}`}>
        <FaCheckCircle />
        {t('Thanks — you\'re subscribed!', 'धन्यवाद — तपाईं सदस्यता लिनुभयो!')}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className={`text-white font-bold text-sm mb-1 ${np}`}>
        {t('Stay Updated', 'अपडेट रहनुहोस्')}
      </p>
      <p className={`text-white/60 text-xs mb-3 ${np}`}>
        {t('Get REPC-Nepal notices and updates by email.', 'इमेलमार्फत REPC-नेपालका सूचना तथा अपडेट प्राप्त गर्नुहोस्।')}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('Your email address', 'तपाईंको इमेल ठेगाना')}
          className={`flex-1 min-w-0 rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-sky ${np}`}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-label={t('Subscribe', 'सदस्यता लिनुहोस्')}
          className="shrink-0 rounded-md bg-sky px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky/80 disabled:opacity-60"
        >
          <FaPaperPlane size={13} />
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      {!SCRIPT_URL && !error && (
        <p className="mt-2 text-xs text-white/40">
          {t(`Or email us directly at ${siteInfo.email}.`, `वा सिधै ${siteInfo.email} मा इमेल गर्नुहोस्।`)}
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
