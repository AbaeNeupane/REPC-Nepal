import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { FaGavel, FaPeace, FaUsers, FaLeaf } from 'react-icons/fa';

const highlights = [
  {
    icon: FaGavel,
    en: 'Human Rights',
    np: 'मानव अधिकार',
    descEn: 'Protecting and promoting the fundamental rights of every citizen.',
    descNp: 'प्रत्येक नागरिकको मौलिक अधिकारको संरक्षण र प्रवर्धन।',
    color: 'bg-navy',
  },
  {
    icon: FaPeace,
    en: 'Mediation',
    np: 'मेलमिलाप',
    descEn: 'Training certified mediators and resolving disputes peacefully.',
    descNp: 'प्रमाणित मेलमिलापकर्ताहरूको तालिम र विवादको शान्तिपूर्ण समाधान।',
    color: 'bg-sky',
  },
  {
    icon: FaUsers,
    en: 'Community',
    np: 'समुदाय',
    descEn: 'Empowering vulnerable communities through awareness and legal access.',
    descNp: 'सचेतना र कानुनी पहुँचद्वारा कमजोर समुदायको सशक्तिकरण।',
    color: 'bg-blue-600',
  },
  {
    icon: FaLeaf,
    en: 'Climate & Rights',
    np: 'जलवायु र अधिकार',
    descEn: 'Studying climate change impacts on human rights and livelihoods.',
    descNp: 'मानव अधिकार र जीविकोपार्जनमा जलवायु परिवर्तनको प्रभावको अध्ययन।',
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
            {t('What we do', 'हामी के गर्छौं')}
          </p>
          <h2 className={`mt-3 text-3xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Our Focus Areas', 'हाम्रा प्राथमिकता क्षेत्रहरू')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white p-0 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(15,23,42,0.12)]">
                <div className={`${item.color} flex items-center justify-between p-5`}>
                  <span className={`text-xs font-semibold uppercase tracking-[0.18em] text-white/80 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {t('Focus', 'प्राथमिकता')}
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
