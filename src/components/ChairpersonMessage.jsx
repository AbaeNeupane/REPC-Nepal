import { useLang } from '../context/LanguageContext';
import { team } from '../data/siteContent';
import { FaQuoteLeft } from 'react-icons/fa';

const ChairpersonMessage = () => {
  const { lang, t } = useLang();
  const chairperson = team[0];

  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-l-4 border-sky bg-slate-50 px-5 py-6 sm:px-8 sm:py-8">
          <FaQuoteLeft className="mb-4 text-sky/70" size={22} />
          <p className={`text-justify text-lg leading-relaxed text-navy sm:text-xl ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'We believe that lasting peace begins when every person can live with dignity, understand their rights, and access justice. REPC-Nepal is committed to working with communities and institutions to advance human rights, equality, mediation, and peaceful solutions.',
              'दिगो शान्ति त्यतिबेला निर्माण हुन्छ, जब प्रत्येक व्यक्तिले मर्यादापूर्वक जीवनयापन गर्न, आफ्ना अधिकार बुझ्न र न्यायमा पहुँच प्राप्त गर्न सक्छ। मानव अधिकार, समानता, मेलमिलाप तथा शान्तिपूर्ण समाधानका लागि REPC-Nepal समुदाय र सम्बन्धित संस्थाहरूसँग सहकार्य गर्न प्रतिबद्ध छ।'
            )}
          </p>
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