import { useLang } from '../context/LanguageContext';
import { coreServices, otherServices, areasOfFocus } from '../data/work';
import { Link } from 'react-router-dom';
import {
  FaBalanceScale, FaHandshake, FaBullhorn, FaChalkboardTeacher,
  FaSearch, FaUsersCog, FaArrowRight, FaPhoneAlt,
  FaChild, FaUserShield, FaGlobeAsia, FaLock, FaDove, FaGavel, FaComments, FaFileAlt, FaUserTie, FaGraduationCap,
} from 'react-icons/fa';
import SEO from '../components/SEO';

const iconMap = {
  legal: FaBalanceScale,
  mediation: FaHandshake,
  awareness: FaBullhorn,
  training: FaChalkboardTeacher,
  research: FaSearch,
  coordination: FaUsersCog,
};

const otherServiceIconMap = {
  mediation: FaHandshake,
  arbitration: FaGavel,
  negotiation: FaComments,
  compromise: FaHandshake,
  judicial: FaBalanceScale,
  drafting: FaFileAlt,
  advisory: FaUserTie,
  hr: FaUserShield,
  training: FaGraduationCap,
  research: FaSearch,
};

const focusIconMap = {
  'human-rights': FaUserShield,
  'access-to-justice': FaBalanceScale,
  children: FaChild,
  'vulnerable-groups': FaUsersCog,
  peacebuilding: FaDove,
  climate: FaGlobeAsia,
  cyber: FaLock,
  'research-documentation': FaSearch,
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

const Services = () => {
  const { lang, t } = useLang();
  const np = lang === 'np' ? 'font-nepali' : '';

  return (
    <div>
      <SEO
        titleEn="Our Work"
        titleNp="हाम्रो कार्य"
        descriptionEn="REPC-Nepal's core services and areas of focus in legal support, mediation, human rights, training, research, and peacebuilding."
        descriptionNp="कानुनी सहायता, मेलमिलाप, मानव अधिकार, तालिम, अनुसन्धान तथा शान्ति निर्माणसम्बन्धी REPC-नेपालका मुख्य तथा अन्य सेवाहरू र कार्यका प्राथमिकता क्षेत्रहरू।"
        path="/our-work"
      />
      <PageBanner titleEn="Our Work" titleNp="हाम्रो कार्य" />

      <div className="site-container py-10">
        <section id="core-services" className="scroll-mt-28 mb-14">
          <div className="mb-7 max-w-3xl">
            <p className={`text-sm font-bold uppercase tracking-[0.08em] text-sky ${np}`}>
              {t('What we do', 'हामी के गर्छौं')}
            </p>
            <h2 className={`mt-2 text-2xl font-bold text-navy sm:text-3xl ${np}`}>
              {t('Core Services', 'मुख्य सेवाहरू')}
            </h2>
            <p className={`mt-3 leading-relaxed text-slate-600 ${np}`}>
              {t(
                'These are the principal forms of support and activities through which REPC-Nepal advances its organizational objectives.',
                'यी REPC-नेपालले आफ्ना संस्थागत उद्देश्यहरू कार्यान्वयन गर्न प्रयोग गर्ने प्रमुख सेवा तथा कार्यका स्वरूपहरू हुन्।'
              )}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map(service => {
              const Icon = iconMap[service.icon] || FaBalanceScale;
              return (
                <article key={service.id} id={service.id} className="site-card scroll-mt-28 rounded-2xl p-5 sm:p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon size={19} />
                  </div>
                  <h3 className={`text-lg font-bold text-navy ${np}`}>
                    {lang === 'en' ? service.titleEn : service.titleNp}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed text-slate-600 ${np}`}>
                    {lang === 'en' ? service.bodyEn : service.bodyNp}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="other-services" className="scroll-mt-28 mb-14">
          <div className="mb-7 max-w-3xl">
            <p className={`text-sm font-bold uppercase tracking-[0.08em] text-sky ${np}`}>
              {t('Additional services', 'अन्य सेवाहरू')}
            </p>
            <h2 className={`mt-2 text-2xl font-bold text-navy sm:text-3xl ${np}`}>
              {t('Other Services', 'अन्य सेवाहरू')}
            </h2>
            <p className={`mt-3 leading-relaxed text-slate-600 ${np}`}>
              {t(
                'These services remain part of REPC-Nepal’s broader service catalogue and may be provided in accordance with applicable law, institutional mandate, and relevant approvals.',
                'यी सेवाहरू REPC-नेपालको व्यापक सेवा सूचीअन्तर्गत रहेका छन्। प्रचलित कानून, संस्थाको कार्यादेश तथा आवश्यक स्वीकृतिको अधीनमा रही सम्बन्धित सेवा तथा सहयोग उपलब्ध गराउन सकिनेछ।'
              )}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherServices.map(service => {
              const Icon = otherServiceIconMap[service.icon] || FaBalanceScale;
              return (
                <article key={service.id} id={service.id} className="site-card scroll-mt-28 rounded-2xl p-5 sm:p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-[#e7f1fb] text-navy shadow-sm">
                    <Icon size={18} />
                  </div>
                  <h3 className={`text-lg font-bold text-navy ${np}`}>
                    {lang === 'en' ? service.titleEn : service.titleNp}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed text-slate-600 ${np}`}>
                    {lang === 'en' ? service.descEn : service.descNp}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="areas-of-focus" className="scroll-mt-28 mb-14">
          <div className="mb-7 max-w-3xl">
            <p className={`text-sm font-bold uppercase tracking-[0.08em] text-sky ${np}`}>
              {t('Where our work is focused', 'हाम्रो कार्यका प्राथमिकता क्षेत्र')}
            </p>
            <h2 className={`mt-2 text-2xl font-bold text-navy sm:text-3xl ${np}`}>
              {t('Areas of Focus', 'कार्यका प्राथमिकता क्षेत्र')}
            </h2>
            <p className={`mt-3 leading-relaxed text-slate-600 ${np}`}>
              {t(
                'These focus areas reflect the subjects and communities identified in the organization’s constitutional objectives.',
                'यी प्राथमिकता क्षेत्रहरूले संस्थाको विधानमा उल्लेख भएका विषय, अधिकार र लक्षित समुदायहरूलाई समेट्छन्।'
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areasOfFocus.map(area => {
              const Icon = focusIconMap[area.id] || FaBalanceScale;
              return (
                <article key={area.id} className="site-card rounded-2xl p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-[#e3eef9] text-navy">
                    <Icon size={17} />
                  </div>
                  <h3 className={`font-bold text-navy ${np}`}>
                    {lang === 'en' ? area.titleEn : area.titleNp}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${np}`}>
                    {lang === 'en' ? area.bodyEn : area.bodyNp}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-navy p-7 text-white sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className={`text-sm font-bold uppercase tracking-[0.08em] text-sky-light ${np}`}>
                {t('Need support?', 'सहयोग आवश्यक छ?')}
              </p>
              <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${np}`}>
                {t('Connect with REPC-Nepal', 'REPC-नेपालसँग सम्पर्क गर्नुहोस्')}
              </h2>
              <p className={`mt-3 text-sm leading-relaxed text-white/75 sm:text-base ${np}`}>
                {t(
                  'For legal support, mediation enquiries, partnerships, training, or other organizational matters, contact the REPC-Nepal office.',
                  'कानुनी सहायता, मेलमिलाप, साझेदारी, तालिम वा अन्य संस्थागत विषयका लागि REPC-नेपाल कार्यालयसँग सम्पर्क गर्नुहोस्।'
                )}
              </p>
            </div>
            <Link
              to="/contact"
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-[#edf4fc] ${np}`}
            >
              <FaPhoneAlt size={13} /> {t('Contact Us', 'सम्पर्क गर्नुहोस्')} <FaArrowRight size={11} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
