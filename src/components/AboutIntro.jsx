import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { about } from '../data/organization';
import { FaCompass, FaGavel, FaHeart, FaUsers } from 'react-icons/fa';

const AboutIntro = () => {
  const { lang, t } = useLang();

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="site-container">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
            <FaCompass size={12} />
            {t('Who we are', 'हामी को हौं')}
          </div>
          <h2 className={`mt-4 text-2xl font-black leading-tight text-navy md:text-4xl ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Rights, equity, and peace in action.', 'अधिकार, समता र शान्तिका लागि हाम्रो अभियान।')}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] sm:rounded-[30px] sm:p-6 md:p-8">
            <p className={`text-justify text-base leading-relaxed text-gray-700 md:text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? about.introEn : about.introNp}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <FaHeart className="text-sky" />
                <p className={`mt-3 text-sm font-semibold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Human rights protection', 'मानव अधिकार संरक्षण')}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <FaGavel className="text-navy" />
                <p className={`mt-3 text-sm font-semibold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Access to justice', 'न्यायमा पहुँच')}
                </p>
              </div>

              <Link
                to="/about"
                className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-navy p-4 text-sm font-semibold text-white transition-colors hover:bg-navy-light ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                <FaUsers />
                {t('About Us', 'हाम्रो बारेमा')}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-navy p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:rounded-[30px] md:p-8">
            <p className={`text-xs font-bold uppercase tracking-[0.18em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('What guides REPC-Nepal', 'REPC-नेपाललाई मार्गदर्शन गर्ने आधारहरू')}
            </p>
            <div className="mt-5 grid gap-4">
              {[
                ['Rights', 'अधिकार'],
                ['Equity', 'समता'],
                ['Justice', 'न्याय'],
                ['Peace', 'शान्ति'],
              ].map(([en, np]) => (
                <div key={en} className="flex items-center gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky" />
                  <span className={`text-base font-semibold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? en : np}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-sky transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {t('Learn more about REPC-Nepal', 'REPC-नेपालबारे थप जान्नुहोस्')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
