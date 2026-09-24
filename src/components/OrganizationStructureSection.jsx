import { useLang } from '../context/LanguageContext';

const OrganizationStructureSection = ({ className = '' }) => {
  const { lang, t } = useLang();

  return (
    <section id="structure" className={`scroll-mt-20 ${className}`}>
      <h2 className={`mb-6 inline-block border-b-2 border-sky pb-2 text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
        {t('Organization Structure', 'संगठन संरचना')}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:rounded-[28px]">
        <div className="flex flex-col items-center p-6 sm:p-8">
          <div className="min-w-[220px] rounded-sm bg-navy px-8 py-3 text-center text-sm font-semibold text-white shadow">
            {t('General Assembly', 'साधारण सभा')}
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="min-w-[220px] rounded-sm bg-sky px-8 py-3 text-center text-sm font-semibold text-white shadow">
            {t('Executive Committee', 'कार्य समिति')}
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="flex flex-wrap justify-center gap-3">
            {[t('Chairperson', 'अध्यक्ष'), t('Vice-Chairperson', 'उपाध्यक्ष'), t('Secretary', 'सचिव'), t('Treasurer', 'कोषाध्यक्ष')].map(label => (
              <div key={label} className="rounded-sm bg-navy/80 px-5 py-2.5 text-xs font-medium text-white shadow">
                {label}
              </div>
            ))}
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div className="min-w-[220px] rounded-sm border border-gray-300 bg-gray-100 px-8 py-3 text-center text-sm font-medium text-gray-700">
            {t('Sub-Committees & Members', 'उपसमितिहरू र सदस्यहरू')}
          </div>
        </div>
        <p className={`px-5 pb-5 text-center text-xs text-gray-400 ${lang === 'np' ? 'font-nepali' : ''}`}>
          {t(
            'Registered under Association Registration Act 2034 · Affiliated with Samaj Kalyan Parishad',
            'संस्था दर्ता ऐन २०३४ अन्तर्गत दर्ता · समाज कल्याण परिषदसँग आबद्ध'
          )}
        </p>
      </div>
    </section>
  );
};

export default OrganizationStructureSection;
