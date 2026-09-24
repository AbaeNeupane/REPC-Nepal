import { useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { about, objectives } from '../data/organization';
import { FaBullseye, FaChevronDown, FaEye } from 'react-icons/fa';

const PurposeSection = () => {
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
    <section className="mb-12">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
          <div className="flex items-center gap-2 bg-navy p-4">
            <FaBullseye className="text-white" />
            <h2 className={`font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Our Mission', 'हाम्रो लक्ष्य')}
            </h2>
          </div>
          <p className={`p-5 text-justify leading-relaxed text-gray-700 sm:p-6 ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
            {lang === 'en' ? about.missionEn : about.missionNp}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
          <div className="flex items-center gap-2 bg-sky p-4">
            <FaEye className="text-white" />
            <h2 className={`font-bold text-white ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Our Vision', 'हाम्रो दृष्टि')}
            </h2>
          </div>
          <p className={`p-5 text-justify leading-relaxed text-gray-700 sm:p-6 ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
            {lang === 'en' ? about.visionEn : about.visionNp}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="w-full">
            <h2 className={`text-xl font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Our Objectives', 'हाम्रा उद्देश्यहरू')}
            </h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-x-8">
              {objectives.slice(0, 6).map(objectiveItem)}
            </ul>
            <div
              className={`grid overflow-hidden transition-all duration-500 ease-in-out ${showAllObjectives ? 'mt-3 max-h-[1600px] translate-y-0 opacity-100' : 'max-h-0 translate-y-[-8px] opacity-0'}`}
              aria-hidden={!showAllObjectives}
            >
              <ul className="grid gap-3 md:grid-cols-3 md:gap-x-8">
                {objectives.slice(6).map((objective, index) => objectiveItem(objective, index + 6))}
              </ul>
            </div>
            <button
              type="button"
              onClick={toggleObjectives}
              aria-expanded={showAllObjectives}
              className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-sky ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {showAllObjectives ? t('See less', 'थोरै') : t('See more', 'थप हेर्नुहोस्')}
              <FaChevronDown className={`transition-transform duration-300 ${showAllObjectives ? 'rotate-180' : ''}`} size={11} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
