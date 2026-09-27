import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { resourceSections } from '../data/resources';
import CertificateDocuments from '../components/CertificateViewer';
import SEO from '../components/SEO';
import { FaArrowRight, FaFileAlt, FaBalanceScale, FaNewspaper, FaBookOpen } from 'react-icons/fa';

const iconMap = {
  'organizational-documents': FaFileAlt,
  notices: FaNewspaper,
  publications: FaBookOpen,
  'legal-framework': FaBalanceScale,
};

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

const Resources = () => {
  const { lang, t } = useLang();
  const np = lang === 'np' ? 'font-nepali' : '';

  return (
    <div>
      <SEO
        titleEn="Resources"
        titleNp="स्रोत तथा कागजात"
        descriptionEn="Organizational documents, notices, publications, reports, and legal resources from REPC-Nepal."
        descriptionNp="REPC-नेपालका संस्थागत कागजात, सूचना, प्रकाशन, प्रतिवेदन तथा कानुनी स्रोतहरू।"
        path="/resources"
      />
      <PageBanner titleEn="Resources" titleNp="स्रोत तथा कागजात" />

      <div className="site-container py-10">
        <section className="mb-10">
          <div className="mb-6 max-w-3xl">
            <p className={`text-sm font-bold uppercase tracking-[0.08em] text-sky ${np}`}>
              {t('Information & Documentation', 'जानकारी तथा कागजात')}
            </p>
            <h2 className={`mt-2 text-2xl font-bold text-navy sm:text-3xl ${np}`}>
              {t('Documents, updates, and resources', 'कागजात, सूचना तथा स्रोतहरू')}
            </h2>
            <p className={`mt-3 leading-relaxed text-slate-600 ${np}`}>
              {t(
                'Find official organizational documents, public updates, publications, and selected legal resources in one place.',
                'आधिकारिक संस्थागत कागजात, सार्वजनिक सूचना, प्रकाशन तथा सम्बन्धित कानुनी स्रोतहरू एकै ठाउँमा हेर्नुहोस्।'
              )}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {resourceSections.map(section => {
              const Icon = iconMap[section.id] || FaFileAlt;
              return (
                <Link
                  key={section.id}
                  to={section.link}
                  className="site-card group rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-lg font-bold text-navy ${np}`}>
                        {lang === 'en' ? section.titleEn : section.titleNp}
                      </h3>
                      <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${np}`}>
                        {lang === 'en' ? section.descriptionEn : section.descriptionNp}
                      </p>
                      <span className={`mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky ${np}`}>
                        {t('Explore', 'हेर्नुहोस्')} <FaArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="organizational-documents" className="scroll-mt-28">
          <div className="mb-6 max-w-3xl">
            <p className={`text-sm font-bold uppercase tracking-[0.08em] text-sky ${np}`}>
              {t('Organizational Documents', 'संस्थागत कागजात')}
            </p>
            <h2 className={`mt-2 text-2xl font-bold text-navy sm:text-3xl ${np}`}>
              {t('Registration & affiliation documents', 'दर्ता तथा आबद्धतासम्बन्धी कागजात')}
            </h2>
            <p className={`mt-3 leading-relaxed text-slate-600 ${np}`}>
              {t(
                'Official documents are provided here for verification and public reference.',
                'सार्वजनिक सन्दर्भ तथा प्रमाणीकरणका लागि आधिकारिक कागजातहरू यहाँ उपलब्ध गराइएका छन्।'
              )}
            </p>
          </div>
          <CertificateDocuments compact />
        </section>
      </div>
    </div>
  );
};

export default Resources;
