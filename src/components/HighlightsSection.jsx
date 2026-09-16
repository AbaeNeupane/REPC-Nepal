import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaGavel, FaPeace, FaUsers, FaLeaf } from 'react-icons/fa';

const highlights = [
  {
    icon: FaGavel,
    en: 'Human Rights Protection',
    np: 'मानव अधिकार संरक्षण',
    descEn: 'Protecting and promoting human rights, equality, dignity, and social justice.',
    descNp: 'मानव अधिकार, समानता, मर्यादा तथा सामाजिक न्यायको संरक्षण र प्रवर्द्धन।',
    color: 'bg-navy',
  },
  {
    icon: FaPeace,
    en: 'Mediation and Reconciliation',
    np: 'मेलमिलाप तथा पुनर्मिलन',
    descEn: 'Supporting dialogue, mediation, reconciliation, and peaceful conflict resolution.',
    descNp: 'संवाद, मेलमिलाप, पुनर्मिलन तथा द्वन्द्वको शान्तिपूर्ण समाधानमा सहयोग।',
    color: 'bg-sky',
  },
  {
    icon: FaUsers,
    en: 'Legal Aid and Access to Justice',
    np: 'कानुनी सहायता तथा न्यायमा पहुँच',
    descEn: 'Improving access to legal consultation, assistance, and justice for disadvantaged and marginalized groups.',
    descNp: 'विपन्न तथा सीमान्तकृत समूहका लागि कानुनी परामर्श, सहायता तथा न्यायमा पहुँच सुधार।',
    color: 'bg-blue-600',
  },
  {
    icon: FaLeaf,
    en: 'Awareness, Training, and Research',
    np: 'सचेतना, तालिम तथा अनुसन्धान',
    descEn: 'Building knowledge through awareness, training, research, documentation, and institutional cooperation.',
    descNp: 'सचेतना, तालिम, अनुसन्धान, अभिलेखीकरण तथा संस्थागत सहकार्यद्वारा ज्ञान र क्षमता विकास।',
    color: 'bg-cyan-700',
  },
];

const HighlightsSection = () => {
  const { lang, t } = useLang();

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Our work', 'हाम्रो कार्यक्षेत्र')}
          </p>
          <h2 className={`mt-3 text-3xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Our Areas of Work', 'हाम्रा कार्यक्षेत्रहरू')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white p-0 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(15,23,42,0.12)]">
                <div className={`${item.color} flex items-center justify-between p-5`}>
                  <span className={`text-xs font-semibold uppercase tracking-[0.18em] text-white/80 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Area of Work', 'कार्य क्षेत्र')}
                  </span>
                  <Icon className="text-white" size={22} />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? item.en : item.np}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed text-gray-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? item.descEn : item.descNp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className={`inline-flex items-center justify-center rounded-full border-2 border-navy px-8 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            {t('Learn More About Our Work', 'हाम्रो कार्यबारे थप जान्नुहोस्')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
