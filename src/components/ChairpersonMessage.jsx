import { useLang } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { team } from '../data/siteContent';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';

const ChairpersonMessage = () => {
  const { lang, t } = useLang();
  const chairperson = team[0];

  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="site-container">
        <div className="border-l-4 border-sky bg-slate-50 px-5 py-6 sm:px-8 sm:py-8">
          <FaQuoteLeft className="mb-4 text-sky/70" size={22} />
          <p className={`text-justify text-lg leading-relaxed text-navy sm:text-xl ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'Nepal has reached its present circumstances after passing through many ups and downs in political, economic, and social change. The political changes of 2007, 2046, 2063, and 2082 B.S. created new ideas, possibilities, and foundations for transformation in Nepali society. Yet political, economic, and social transformation has not advanced at the pace citizens expected, deepening challenges such as social fragmentation, political instability, economic disorder, and family disruption. These challenges cannot be resolved through the efforts of state institutions alone. Genuine change also requires citizens’ awareness, participation, unity, and shared responsibility...',
              'नेपालले राजनीतिक, आर्थिक तथा सामाजिक परिवर्तनका अनेकौँ आरोह–अवरोह पार गर्दै वर्तमान परिस्थितिमा आएको छ। वि.सं. २००७, २०४६, २०६३ तथा २०८२ का राजनीतिक परिवर्तनहरूले नेपाली समाजमा नयाँ सोच, सम्भावना र परिवर्तनका आधारहरू निर्माण गरेपनि नागरिकका अपेक्षा र चाहनाअनुरूप राजनीतिक, आर्थिक तथा सामाजिक रूपान्तरणले अपेक्षित गति लिन नसक्दा सामाजिक विखण्डन, राजनीतिक अस्थिरता, आर्थिक विशृङ्खलता र पारिवारिक विचलनजस्ता चुनौतीहरू अझै गहिरिँदै गएको अनुभूति भएको छ। यी समस्याहरूको समाधान राज्यका निकायहरूको मात्र प्रयासबाट सम्भव हुँदैन। परिवर्तनको वास्तविक आधार नागरिकको जागरूकता, सहभागिता, एकता र सामूहिक उत्तरदायित्वको पनि जरुरी छ। त्यसैले...',
            )}
          </p>
          <Link to="/chairperson-message" className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky hover:text-sky-dark ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Read Full Message', 'पूर्ण सन्देश पढ्नुहोस्')} <FaArrowRight size={12} />
          </Link>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className={`font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Message from the Chairperson', 'अध्यक्षको सन्देश')}
            </p>
            <p className={`mt-1 text-sm text-gray-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? chairperson.nameEn : chairperson.nameNp}, {lang === 'en' ? chairperson.positionEn : chairperson.positionNp}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairpersonMessage;
