import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { campaigns } from '../data/siteContent';
import { FaBullhorn, FaImage } from 'react-icons/fa';

const CampaignHighlights = () => {
  const { lang, t } = useLang();

  return (
    <section className="bg-white py-16">
      <div className="site-container">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
            <FaBullhorn size={12} />
            {t('Campaigns', 'अभियानहरू')}
          </div>
          <h2 className={`mt-4 text-3xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Our Campaigns', 'हाम्रा अभियानहरू')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((c) => (
            <div key={c.id} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)]">
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${c.color}`}>
                {c.src ? (
                  <img src={c.src} alt={lang === 'en' ? c.titleEn : c.titleNp} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/80">
                    <FaImage size={22} />
                    <span className="text-xs font-medium">{t('Photo coming soon', 'फोटो चाँडै उपलब्ध हुनेछ')}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07163d]/40 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? c.titleEn : c.titleNp}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-gray-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'en' ? c.descEn : c.descNp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/programs"
            className={`inline-flex items-center justify-center rounded-full border-2 border-navy px-8 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            {t('See All Programs', 'सबै कार्यक्रमहरू हेर्नुहोस्')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampaignHighlights;
