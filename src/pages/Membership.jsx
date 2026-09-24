import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { membershipInfo } from '../data/engagement';
import { siteInfo } from '../data/organization';
import { FaArrowRight, FaCheckCircle, FaIdCard, FaUsers } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();

  return (
    <div className="bg-navy py-10 text-white">
      <div className="site-container">
        <div className="mb-2 flex items-center gap-2 text-sm text-white/60">
          <Link to="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`text-2xl font-bold md:text-3xl ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="mt-3 h-1 w-12 rounded bg-sky" />
      </div>
    </div>
  );
};

const Membership = () => {
  const { lang, t } = useLang();

  return (
    <div>
      <PageBanner titleEn="Membership" titleNp="सदस्यता" />

      <div className="site-container py-10">
        <section className="mx-auto mb-12 max-w-3xl text-center">
          <FaUsers className="mx-auto mb-4 text-sky" size={34} />
          <h2 className={`mb-3 text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Join the REPC–NEPAL community', 'REPC–NEPAL समुदायमा जोडिनुहोस्')}
          </h2>
          <p className={`leading-relaxed text-gray-600 ${lang === 'np' ? 'font-nepali text-base' : 'text-base'}`}>
            {lang === 'en' ? membershipInfo.introEn : membershipInfo.introNp}
          </p>
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <FaIdCard className="text-sky" />
            <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Membership categories and fees', 'सदस्यताका प्रकार र शुल्क')}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {membershipInfo.categories.map(category => (
              <article key={category.id} className="rounded-[22px] border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`text-lg font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? category.titleEn : category.titleNp}
                  </h3>
                  <FaCheckCircle className="mt-1 shrink-0 text-sky" size={16} />
                </div>
                <p className={`mt-4 font-semibold text-sky ${lang === 'np' ? 'font-nepali' : 'text-sm'}`}>
                  {lang === 'en' ? category.feeEn : category.feeNp}
                </p>
                <p className={`mt-3 text-sm leading-relaxed text-gray-600 ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                  {lang === 'en' ? category.detailEn : category.detailNp}
                </p>
                {category.linkEn && category.linkNp && category.linkUrl && (
                  <Link to={category.linkUrl} className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky hover:text-sky-dark ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? category.linkEn : category.linkNp} <FaArrowRight size={12} />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] bg-slate-50 p-6 md:p-8">
          <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('How to apply', 'आवेदन गर्ने तरिका')}
          </h2>
          <p className={`mt-3 max-w-3xl leading-relaxed text-gray-600 ${lang === 'np' ? 'font-nepali text-base' : 'text-base'}`}>
            {lang === 'en' ? membershipInfo.processEn : membershipInfo.processNp}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact?subject=membership" className={`btn-primary inline-flex items-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Contact us about membership', 'सदस्यताका लागि सम्पर्क गर्नुहोस्')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Membership;
