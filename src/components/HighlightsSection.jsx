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
    color: 'bg-redc',
  },
  {
    icon: FaUsers,
    en: 'Community',
    np: 'समुदाय',
    descEn: 'Empowering vulnerable communities through awareness and legal access.',
    descNp: 'सचेतना र कानुनी पहुँचद्वारा कमजोर समुदायको सशक्तिकरण।',
    color: 'bg-amber',
  },
  {
    icon: FaLeaf,
    en: 'Climate & Rights',
    np: 'जलवायु र अधिकार',
    descEn: 'Studying climate change impacts on human rights and livelihoods.',
    descNp: 'मानव अधिकार र जीविकोपार्जनमा जलवायु परिवर्तनको प्रभावको अध्ययन।',
    color: 'bg-green-700',
  },
];

const HighlightsSection = () => {
  const { lang, t } = useLang();

  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Our Focus Areas', 'हाम्रा प्राथमिकता क्षेत्रहरू')}
          </h2>
          <div className="w-16 h-1 bg-redc mx-auto mt-3 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className={`${item.color} p-5 flex items-center justify-center`}>
                  <Icon className="text-white" size={36} />
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-navy mb-2 ${lang === 'np' ? 'font-nepali text-lg' : 'text-base'}`}>
                    {lang === 'en' ? item.en : item.np}
                  </h3>
                  <p className={`text-gray-600 text-sm leading-relaxed ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? item.descEn : item.descNp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/services"
            className={`inline-block border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-2.5 rounded-sm transition-all ${lang === 'np' ? 'font-nepali' : ''}`}
          >
            {t('Learn More About Our Work', 'हाम्रो कार्यबारे थप जान्नुहोस्')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
