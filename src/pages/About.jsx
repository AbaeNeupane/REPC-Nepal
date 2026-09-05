import { useLang } from '../context/LanguageContext';
import { about, team, siteInfo } from '../data/siteContent';
import { FaUserCircle, FaPhone, FaEnvelope, FaBullseye, FaEye, FaBuilding } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="w-12 h-1 bg-redc mt-3 rounded" />
      </div>
    </div>
  );
};

const About = () => {
  const { lang, t } = useLang();

  return (
    <div>
      <PageBanner titleEn="About Us" titleNp="हाम्रोबारे" />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Introduction */}
        <section className="mb-12">
          <h2 className={`text-xl font-bold text-navy mb-4 flex items-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
            <FaBuilding className="text-redc" /> {t('Introduction', 'परिचय')}
          </h2>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
            <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
              {lang === 'en' ? about.introEn : about.introNp}
            </div>

            {/* Key Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-redc">2083</p>
                <p className={`text-sm text-gray-500 mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Established (B.S.)', 'स्थापना (वि.सं.)')}</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold text-redc ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Kathmandu', 'काठमाण्डौं')}
                </p>
                <p className={`text-sm text-gray-500 mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Headquarters', 'मुख्यालय')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-redc">7</p>
                <p className={`text-sm text-gray-500 mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Executive Members', 'कार्य समिति सदस्य')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="mb-12 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="bg-navy p-4 flex items-center gap-2">
                <FaBullseye className="text-white" />
                <h2 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Our Mission', 'हाम्रो लक्ष्य')}
                </h2>
              </div>
              <div className="p-5">
                <p className={`text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
                  {lang === 'en' ? about.missionEn : about.missionNp}
                </p>
              </div>
            </div>
            {/* Vision */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="bg-redc p-4 flex items-center gap-2">
                <FaEye className="text-white" />
                <h2 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Our Vision', 'हाम्रो दृष्टि')}
                </h2>
              </div>
              <div className="p-5">
                <p className={`text-gray-700 leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
                  {lang === 'en' ? about.visionEn : about.visionNp}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-12">
          <h2 className={`text-xl font-bold text-navy mb-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Our Objectives', 'हाम्रा उद्देश्यहरू')}
          </h2>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
            <ul className="space-y-3">
              {[
                { en: 'Protect and promote human rights, child rights, elderly rights, and rights of persons with disabilities.', np: 'मानव अधिकार, बाल अधिकार, ज्येष्ठ नागरिकको अधिकार र अपाङ्गता भएका व्यक्तिको अधिकारको संरक्षण र प्रवर्धन।' },
                { en: 'Provide free legal counselling, mediation, and legal services to economically disadvantaged groups.', np: 'आर्थिक रूपमा विपन्न समूहलाई निःशुल्क कानुनी परामर्श, मेलमिलाप र कानुनी सेवा उपलब्ध गराउने।' },
                { en: 'Conduct training programs on mediation, human rights, child justice, and cyber security.', np: 'मेलमिलाप, मानव अधिकार, बाल न्याय र साइबर सुरक्षामा तालिम कार्यक्रम सञ्चालन।' },
                { en: 'Study the impacts of climate change on human life and work to reduce those impacts.', np: 'मानव जीवनमा जलवायु परिवर्तनको प्रभावको अध्ययन र त्यो प्रभाव न्यूनीकरणमा कार्य।' },
                { en: 'Extend peace campaigns to the local, provincial, and national level.', np: 'शान्ति अभियानलाई स्थानीय, प्रदेश र राष्ट्रिय तहसम्म विस्तार गर्ने।' },
                { en: 'Produce and distribute awareness materials on rights and mediation through media.', np: 'अधिकार र मेलमिलापसम्बन्धी प्रचारमूलक श्रव्यदृश्य सामग्री निर्माण र सञ्चार माध्यमद्वारा वितरण।' },
              ].map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className={`text-gray-700 text-sm leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                    {lang === 'en' ? obj.en : obj.np}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Executive Committee */}
        <section id="team" className="mb-12 scroll-mt-24">
          <h2 className={`text-xl font-bold text-navy mb-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Executive Committee', 'कार्य समिति')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.id} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-navy/5 p-5 flex justify-center">
                  {member.photo ? (
                    <img src={member.photo} alt={member.nameEn}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-navy/20 flex items-center justify-center border-4 border-white shadow">
                      <FaUserCircle className="text-navy/50" size={44} />
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className={`font-bold text-navy text-sm ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? member.nameEn : member.nameNp}
                  </h3>
                  <p className={`text-redc text-xs font-semibold mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? member.positionEn : member.positionNp}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-navy transition-colors" aria-label="Phone">
                        <FaPhone size={13} />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-navy transition-colors" aria-label="Email">
                        <FaEnvelope size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organization Info */}
        <section id="constitution" className="scroll-mt-24">
          <h2 className={`text-xl font-bold text-navy mb-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Organizational Information', 'संस्थागत जानकारी')}
          </h2>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  { labelEn: 'Organization Name', labelNp: 'संस्थाको नाम', valueEn: siteInfo.nameEn, valueNp: siteInfo.nameNp },
                  { labelEn: 'Short Name', labelNp: 'संक्षिप्त नाम', valueEn: siteInfo.shortName, valueNp: siteInfo.shortName },
                  { labelEn: 'Motto', labelNp: 'आदर्श वाक्य', valueEn: siteInfo.mottoEn, valueNp: siteInfo.mottoNp },
                  { labelEn: 'Office Address', labelNp: 'कार्यालय ठेगाना', valueEn: siteInfo.addressEn, valueNp: siteInfo.addressNp },
                  { labelEn: 'Registration No.', labelNp: 'दर्ता नं.', valueEn: siteInfo.registrationNo, valueNp: siteInfo.registrationNo },
                  { labelEn: 'Phone', labelNp: 'फोन', valueEn: siteInfo.phone, valueNp: siteInfo.phone },
                  { labelEn: 'Email', labelNp: 'इमेल', valueEn: siteInfo.email, valueNp: siteInfo.email },
                  { labelEn: 'Office Hours', labelNp: 'कार्यालय समय', valueEn: siteInfo.officeHoursEn, valueNp: siteInfo.officeHoursNp },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className={`px-5 py-3 font-semibold text-navy w-1/3 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? row.labelEn : row.labelNp}
                    </td>
                    <td className={`px-5 py-3 text-gray-700 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? row.valueEn : row.valueNp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
