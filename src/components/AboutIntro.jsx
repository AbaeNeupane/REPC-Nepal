import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { about } from '../data/siteContent';
import { FaArrowRight, FaBullseye, FaGavel, FaChevronDown, FaCompass, FaEye, FaHeart, FaUsers } from 'react-icons/fa';

const objectives = [
  {
    en: 'To function as a non-profit, public-interest social organization dedicated to the protection of human rights, social justice, and the public good.',
    np: 'मानव अधिकार, सामाजिक न्याय तथा जनहितको संरक्षण र प्रवर्द्धनमा समर्पित गैरनाफामूलक, जनहितकारी सामाजिक संस्थाका रूपमा कार्य गर्ने।',
  },
  {
    en: 'To undertake study, research, documentation, and knowledge development on human rights, child rights, the rights of older persons, the rights of persons with disabilities, mediation, arbitration, and related areas.',
    np: 'मानव अधिकार, बाल अधिकार, ज्येष्ठ नागरिकका अधिकार, अपाङ्गता भएका व्यक्तिका अधिकार, मेलमिलाप तथा मध्यस्थतालगायतका विषयमा अध्ययन, अनुसन्धान, अभिलेखीकरण तथा ज्ञान विकास गर्ने।',
  },
  {
    en: 'To mobilize qualified human resources and implement human rights, targeted-group rights, mediation, and peacebuilding programs as campaigns for the advancement of social justice and a peaceful, prosperous society.',
    np: 'दक्ष जनशक्तिको परिचालन गरी मानव अधिकार, लक्षित वर्ग तथा समूहका अधिकार, मेलमिलाप तथा शान्ति निर्माणसम्बन्धी कार्यक्रमलाई अभियानका रूपमा सञ्चालन गर्दै सामाजिक न्यायमा आधारित शान्त र समृद्ध समाज निर्माणमा योगदान पुर्‍याउने।',
  },
  {
    en: 'To study the effects of climate change on human life and undertake appropriate initiatives to mitigate its adverse impacts.',
    np: 'जलवायु परिवर्तनका कारण मानव जीवनमा परेको प्रभावको अध्ययन गरी त्यसका प्रतिकूल असर न्यूनीकरणका लागि आवश्यक पहल गर्ने।',
  },
  {
    en: 'To conduct basic and advanced mediation training, develop and mobilize mediators, and support the resolution of disputes registered with judicial bodies and local governments through mediation.',
    np: 'मेलमिलापसम्बन्धी आधारभूत तथा विशिष्ट तालिम सञ्चालन गरी मेलमिलापकर्ताको उत्पादन तथा परिचालन गर्ने र न्यायिक निकाय तथा स्थानीय तहमा दर्ता भएका विवादको मेलमिलापमार्फत समाधानमा सहयोग पुर्‍याउने।',
  },
  {
    en: 'To organize training, seminars, orientation programs, and other capacity-building activities on human rights, the rights of targeted groups and communities, and mediation.',
    np: 'मानव अधिकार, लक्षित वर्ग तथा समुदायका अधिकार र मेलमिलापसम्बन्धी तालिम, गोष्ठी, अभिमुखीकरण तथा क्षमता विकासका कार्यक्रम सञ्चालन गर्ने।',
  },
  {
    en: 'To provide free legal consultation, mediation, arbitration, and other legal services, as required, to economically disadvantaged and vulnerable persons, including children involved in legal disputes, single women, older persons, and persons with disabilities.',
    np: 'आर्थिक रूपमा विपन्न तथा असहाय व्यक्ति, कानुनी विवादमा परेका बालबालिका, एकल महिला, ज्येष्ठ नागरिक तथा अपाङ्गता भएका व्यक्तिलाई आवश्यकता अनुसार निःशुल्क कानुनी परामर्श, मेलमिलाप, मध्यस्थता तथा अन्य कानुनी सेवा उपलब्ध गराउने।',
  },
  {
    en: 'To prepare, publish, distribute, and provide orientation on legal documents and educational materials relating to human rights, cybersecurity, child justice, and mediation.',
    np: 'मानव अधिकार, साइबर सुरक्षा, बाल न्याय तथा मेलमिलापसम्बन्धी कानुनी दस्तावेज तथा शैक्षिक सामग्री तयार, प्रकाशन, वितरण र अभिमुखीकरण गर्ने।',
  },
  {
    en: 'To develop specialized training packages on human rights, the rights of targeted groups and communities, mediation, arbitration, and law, and conduct such training in coordination with and with the approval of federal, provincial, and local governments and relevant institutions.',
    np: 'मानव अधिकार, लक्षित वर्ग तथा समुदायका अधिकार, मेलमिलाप, मध्यस्थता तथा कानूनसम्बन्धी विशिष्टीकृत तालिम प्याकेज निर्माण गरी संघीय, प्रदेश तथा स्थानीय सरकार र सम्बन्धित संस्था तथा निकायसँगको समन्वय एवं स्वीकृतिमा तालिम सञ्चालन गर्ने।',
  },
  {
    en: 'To promote sustainable peace, social harmony, and coexistence, and to expand the peace campaign throughout the country.',
    np: 'दिगो शान्ति, सामाजिक सद्भाव तथा सहअस्तित्वको प्रवर्द्धन गर्दै शान्ति अभियानलाई देशव्यापी रूपमा विस्तार गर्ने।',
  },
  {
    en: 'To enhance access to justice and coordinate with stakeholders to implement effective programs for the protection of children, women, older persons, and other persons and groups at risk.',
    np: 'न्यायमा पहुँच अभिवृद्धि गर्दै पीडित तथा जोखिममा रहेका बालबालिका, महिला, ज्येष्ठ नागरिक तथा अन्य व्यक्ति र समूहको संरक्षणका लागि सरोकारवाला निकायसँग समन्वय गरी प्रभावकारी कार्यक्रम सञ्चालन गर्ने।',
  },
  {
    en: 'To establish and operate mediation centers in different parts of the country, as required, with the approval of the Mediation Council.',
    np: 'मेलमिलाप परिषद्को स्वीकृतिमा आवश्यकता अनुसार देशका विभिन्न स्थानमा मेलमिलाप केन्द्र स्थापना तथा सञ्चालन गर्ने।',
  },
  {
    en: 'To produce and distribute audiovisual and awareness materials on the rights of children, older persons, differently abled person, and other targeted groups, as well as on arbitration and mediation, through media and public dialogue programs.',
    np: 'बालबालिका, ज्येष्ठ नागरिक, अपाङ्गता भएका व्यक्ति तथा अन्य लक्षित वर्ग र समूहका अधिकार, मध्यस्थता तथा मेलमिलापसम्बन्धी प्रचारप्रसारमूलक श्रव्यदृश्य सामग्री निर्माण गरी सञ्चार माध्यमबाट प्रकाशन तथा प्रसारण गर्ने र अन्तरसंवाद कार्यक्रम सञ्चालन गर्ने।',
  },
];

const AboutIntro = () => {
  const { lang, t } = useLang();
  const [showAllObjectives, setShowAllObjectives] = useState(false);
  const fifthObjectiveRef = useRef(null);
  const objectiveItem = (objective, index) => (
    <li
      key={index}
      ref={index === 4 ? fifthObjectiveRef : null}
      className={`list-disc ml-5 text-justify text-sm leading-relaxed text-gray-700 ${lang === 'np' ? 'font-nepali text-base' : ''}`}
    >
      {lang === 'en' ? objective.en : objective.np}
    </li>
  );

  const toggleObjectives = () => {
    if (showAllObjectives) {
      setShowAllObjectives(false);
      requestAnimationFrame(() => {
        const objectiveTop = fifthObjectiveRef.current?.getBoundingClientRect().top;
        if (objectiveTop === undefined) return;
        window.scrollTo({
          top: window.scrollY + objectiveTop - 112,
          behavior: 'smooth',
        });
      });
      return;
    }

    setShowAllObjectives(true);
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="max-w-auto mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
            <FaCompass size={12} />
            {t('Who we are', 'हामी को हौं')}
          </div>
          <h2 className={`mt-4 text-2xl font-black leading-tight text-navy md:text-4xl ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Rights, equity, and peace in action.', 'अधिकार, समता र शान्तिका लागि हाम्रो अभियान।')}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl sm:rounded-[30px] border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] md:p-8">
            <p className={`text-justify text-base leading-relaxed text-gray-700 md:text-lg ${lang === 'np' ? 'font-nepali' : ''}`}>
              {lang === 'en' ? about.introEn : about.introNp}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
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
              <div className="rounded-2xl bg-slate-50 p-4">
                <FaUsers className="text-navy" />
                <Link
                  to="/about"
                  className={`inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-sky py-2  ${lang === 'np' ? 'font-nepali' : ''}`}
                >
                  {t('Meet our team', 'हाम्रो टिमसँग भेट्नुहोस्')} <FaArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] overflow-hidden">
              <div className="bg-navy p-4 flex items-center gap-2">
                <FaBullseye className="text-white" />
                <h3 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Our Mission', 'हाम्रो लक्ष्य')}
                </h3>
              </div>
              <p className={`p-5 text-justify text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
                {lang === 'en' ? about.missionEn : about.missionNp}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] overflow-hidden">
              <div className="bg-sky p-4 flex items-center gap-2">
                <FaEye className="text-white" />
                <h3 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Our Vision', 'हाम्रो दृष्टि')}
                </h3>
              </div>
              <p className={`p-5 text-justify text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
                {lang === 'en' ? about.visionEn : about.visionNp}
              </p>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="mt-5 rounded-2xl sm:rounded-[30px] border border-slate-200 bg-white p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t('Our Objectives', 'हाम्रा उद्देश्यहरू')}
              </h3>
              <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-x-8">
                {objectives.slice(0, 6).map(objectiveItem)}
              </ul>
              <div
                className={`grid overflow-hidden transition-all duration-500 ease-in-out ${showAllObjectives ? 'mt-3 max-h-[1600px] translate-y-0 opacity-100' : 'max-h-0 translate-y-[-8px] opacity-0'}`}
                aria-hidden={!showAllObjectives}
              >
                <ul className="grid gap-3 md:grid-cols-3 md:gap-x-8">
                  {objectives.slice(4).map((objective, index) => objectiveItem(objective, index + 4))}
                </ul>
              </div>
              <button
                type="button"
                onClick={toggleObjectives}
                aria-expanded={showAllObjectives}
                className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-sky ${lang === 'np' ? 'font-nepali' : ''}`}
              >
                {showAllObjectives
                  ? t('See less', 'थोरै')
                  : t('See more', 'थप हेर्नुहोस्')}
                <FaChevronDown className={`transition-transform duration-300 ${showAllObjectives ? 'rotate-180' : ''}`} size={11} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
