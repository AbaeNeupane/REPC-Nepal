import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { about } from '../data/siteContent';
import { FaArrowRight, FaCompass, FaHeart, FaUsers } from 'react-icons/fa';

const abstractEn = about.introEn.split('\n\n')[1];
const abstractNp = about.introNp.split('\n\n')[1];

const AboutIntro = () => {
  const { lang, t } = useLang();

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
              <FaCompass size={12} />
              {t('Our mission', 'हाम्रो उद्देश्य')}
            </div>

            <h2 className={`mt-5 text-2xl font-black leading-tight text-navy md:text-4xl ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('A just society begins with peaceful dialogue.', 'न्यायपूर्ण समाज शान्तिपूर्ण संवादबाट सुरु हुन्छ।')}
            </h2>

            <div className="mt-5 h-1 w-20 rounded-full bg-sky" />

            <p className={`mt-6 text-base leading-relaxed text-gray-600 md:text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('We support communities in resolving conflict through rights-based, people-centered, and sustainable solutions.', 'हामी समुदायलाई अधिकार-आधारित, जनकेन्द्रित र दिगो समाधानद्वारा विवाद समाधानमा सहयोग गर्छौं।')}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <FaHeart className="text-sky" />
                <p className={`mt-3 text-sm font-semibold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Human rights', 'मानव अधिकार')}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <FaUsers className="text-navy" />
                <p className={`mt-3 text-sm font-semibold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Community care', 'समुदाय सेवा')}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <p className={`text-base leading-relaxed text-gray-700 md:text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? abstractEn : abstractNp}
            </p>

            <Link
              to="/about"
              className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-sky ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {t('Learn more about us', 'हाम्रोबारे थप जान्नुहोस्')} <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
