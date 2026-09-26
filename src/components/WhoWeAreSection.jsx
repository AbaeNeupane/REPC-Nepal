import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/organization';
import { FaCompass } from 'react-icons/fa';

const WhoWeAreSection = () => {
  const { lang, t } = useLang();

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6 md:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
          <FaCompass size={12} />
          {t('Who We Are', 'हामी को हौं')}
        </div>

        <h2 className={`mb-4 text-xl font-bold text-navy md:text-2xl ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? siteInfo.nameEn : siteInfo.nameNp}
        </h2>

        <p className={`text-justify leading-relaxed text-gray-700 ${lang === 'np' ? 'font-nepali text-base' : 'text-sm md:text-base'}`}>
          {t(
            `${siteInfo.shortName} is a registered non-governmental, non-profit organization based in Thapathali, Kathmandu, working on human rights protection, mediation, legal aid, and peacebuilding across Nepal. Registered under the Association Registration Act, 2034 (1977) with the Kathmandu District Administration Office (registration no. ${siteInfo.registrationNo}), we bring together advocates, mediators, and community members committed to expanding access to justice for women, children, older persons, persons with disabilities, and other at-risk and underserved communities.`,
            `${siteInfo.shortName} थापाथली, काठमाडौंमा आधारित दर्ता भएको गैरसरकारी, गैरनाफामूलक संस्था हो, जसले नेपालभर मानव अधिकार संरक्षण, मेलमिलाप, कानुनी सहायता र शान्ति निर्माणमा काम गर्दछ। संस्था दर्ता ऐन, २०३४ अन्तर्गत काठमाडौं जिल्ला प्रशासन कार्यालयमा दर्ता (दर्ता नं. ${siteInfo.registrationNo}) भएको यस संस्थामा अधिवक्ता, मेलमिलापकर्ता र सामुदायिक सदस्यहरू महिला, बालबालिका, ज्येष्ठ नागरिक, अपाङ्गता भएका व्यक्ति लगायत जोखिममा रहेका र वञ्चित समुदायको न्यायमा पहुँच विस्तार गर्न प्रतिबद्ध छन्।`
          )}
        </p>

        <p className={`mt-4 text-xs font-semibold uppercase tracking-wide text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
          "{lang === 'en' ? siteInfo.mottoEn : siteInfo.mottoNp}"
        </p>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
