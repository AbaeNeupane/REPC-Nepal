import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { about, team, siteInfo } from '../data/siteContent';
import { FaUserCircle, FaPhone, FaEnvelope, FaBullseye, FaEye, FaBuilding, FaTimes } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{lang === 'en' ? titleEn : titleNp}</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en' ? titleEn : titleNp}
        </h1>
        <div className="w-12 h-1 bg-sky mt-3 rounded" />
      </div>
    </div>
  );
};

const toNepaliDigits = value => String(value).replace(/[0-9]/g, digit => '०१२३४५६७८९'[digit]);

const TeamBioModal = ({ member, position, onClose }) => {
  const { lang, t } = useLang();
  const bio = lang === 'en' ? member.bioEn : member.bioNp;

  return (
    <div
      className="absolute z-50 flex w-[min(40rem,calc(100vw-2rem))]"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-sm shadow-2xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto animate-scaleIn"
        onClick={event => event.stopPropagation()}
      >
        <div className="bg-navy px-5 py-4 flex items-center justify-between">
          <h2 className={`text-white font-bold ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Committee Member', 'समिति सदस्य')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="p-6 text-center">
          {member.photo ? (
            <img src={member.photo} alt={member.nameEn}
              className="w-24 h-24 rounded-full object-cover border-4 border-navy/10 shadow mx-auto"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          {!member.photo && (
            <div className="w-24 h-24 rounded-full bg-navy/20 flex items-center justify-center border-4 border-navy/10 shadow mx-auto">
              <FaUserCircle className="text-navy/50" size={52} />
            </div>
          )}

          <h3 className={`font-bold text-navy text-lg mt-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? member.nameEn : member.nameNp}
          </h3>
          <p className={`text-sky text-sm font-semibold mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {lang === 'en' ? member.positionEn : member.positionNp}
          </p>

          <div className="mt-3 flex items-center justify-center gap-4">
            {member.phone && (
              <a href={`tel:${member.phone}`} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-navy text-xs transition-colors">
                <FaPhone size={11} /> {member.phone}
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-navy text-xs transition-colors">
                <FaEnvelope size={11} /> {member.email}
              </a>
            )}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 text-left">
            {bio ? (
              <p className={`text-gray-600 text-sm leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                {bio}
              </p>
            ) : (
              <p className="text-gray-400 text-sm italic text-center">
                {t('Bio coming soon.', 'परिचय चाँडै आउँदैछ।')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { lang, t } = useLang();
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openMemberBio = (event, member) => {
    const card = event.currentTarget.getBoundingClientRect();
    const panelWidth = Math.min(640, window.innerWidth - 32);
    const panelHeight = Math.min(560, window.innerHeight - 32);
    const viewportLeft = Math.min(
      Math.max(card.left + (card.width - panelWidth) / 2, 16),
      window.innerWidth - panelWidth - 16,
    );
    const viewportTop = Math.min(
      Math.max(card.top + (card.height - panelHeight) / 2, 16),
      window.innerHeight - panelHeight - 16,
    );

    setModalPosition({
      top: viewportTop - card.top,
      left: viewportLeft - card.left,
    });
    setSelectedMember(member);
  };

  const closeMemberBio = () => setSelectedMember(null);

  return (
    <div>
      <PageBanner titleEn="About Us" titleNp="हाम्रोबारे" />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Introduction */}
        <section className="mb-12">
          <h2 className={`text-xl font-bold text-navy mb-4 flex items-center gap-2 ${lang === 'np' ? 'font-nepali' : ''}`}>
            <FaBuilding className="text-sky" /> {t('Introduction', 'परिचय')}
          </h2>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
            <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
              {lang === 'en' ? about.introEn : about.introNp}
            </div>

            {/* Key Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className={`text-2xl font-bold text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'np' ? toNepaliDigits(2083) : '2083'}
                </p>
                <p className={`text-sm text-gray-500 mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Established (B.S.)', 'स्थापना (वि.सं.)')}</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Kathmandu', 'काठमाडौं')}
                </p>
                <p className={`text-sm text-gray-500 mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Headquarters', 'मुख्यालय')}</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {lang === 'np' ? toNepaliDigits(9) : '9'}
                </p>
                <p className={`text-sm text-gray-500 mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>{t('Executive Members', 'कार्य समिति सदस्य')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="mb-12 scroll-mt-20">
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
              <div className="bg-sky p-4 flex items-center gap-2">
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
            <ul className="list-disc pl-5 space-y-3">
              {[
                { en: 'To protect and promote human rights, child rights, the rights of older persons, and the rights of persons with disabilities.', np: 'मानव अधिकार, बाल अधिकार, ज्येष्ठ नागरिकका अधिकार तथा अपाङ्गता भएका व्यक्तिका अधिकारको संरक्षण र प्रवर्द्धन गर्ने।' },
                { en: 'To provide legal consultation, mediation, and other legal services to economically disadvantaged groups.', np: 'आर्थिक रूपमा विपन्न समूहलाई कानुनी परामर्श, मेलमिलाप तथा अन्य कानुनी सेवा उपलब्ध गराउने।' },
                { en: 'To conduct training programs on mediation, human rights, child justice, and cybersecurity.', np: 'मेलमिलाप, मानव अधिकार, बाल न्याय र साइबर सुरक्षासम्बन्धी तालिम कार्यक्रम सञ्चालन गर्ने।' },
                { en: 'To study the effects of climate change on human life and work to reduce them.', np: 'मानव जीवनमा जलवायु परिवर्तनका प्रभावको अध्ययन गरी तिनको न्यूनीकरणका लागि काम गर्ने।' },
                { en: 'To expand peace and reconciliation campaigns from the local level to the provincial and national levels.', np: 'शान्ति तथा पुनर्मिलन अभियानलाई स्थानीय तहदेखि प्रदेश र राष्ट्रिय तहसम्म विस्तार गर्ने।' },
                { en: 'To produce and distribute awareness materials on rights, mediation, child justice, and cybersecurity through appropriate media.', np: 'अधिकार, मेलमिलाप, बाल न्याय र साइबर सुरक्षासम्बन्धी सचेतनामूलक सामग्री तयार गरी उपयुक्त सञ्चार माध्यमबाट वितरण गर्ने।' },
              ].map((obj, i) => (
                <li key={i} className={`text-gray-700 text-sm leading-relaxed ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
                  {lang === 'en' ? obj.en : obj.np}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Executive Committee */}
        <section id="team" className="mb-12 scroll-mt-20">
          <h2 className={`text-xl font-bold text-navy mb-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Executive Committee', 'कार्य समिति')}
          </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member) => (
              <div
                key={member.id}
                className="relative min-w-0"
              >
                <div
                  onClick={event => openMemberBio(event, member)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={event => event.key === 'Enter' && openMemberBio(event, member)}
                  className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden hover:shadow-md hover:border-navy/30 transition-all cursor-pointer"
                >
                    <div className="bg-navy/5 p-5 flex justify-center">
                      {member.photo ? (
                        <img src={member.photo} alt={member.nameEn}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                        />
                      ) : null}
                      {(!member.photo) && (
                        <div className="w-24 h-24 rounded-full bg-navy/20 flex items-center justify-center border-4 border-white shadow">
                          <FaUserCircle className="text-navy/50" size={52} />
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className={`font-bold text-navy text-base ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {lang === 'en' ? member.nameEn : member.nameNp}
                      </h3>
                      <p className={`text-sky text-xs font-semibold mt-1 ${lang === 'np' ? 'font-nepali' : ''}`}>
                        {lang === 'en' ? member.positionEn : member.positionNp}
                      </p>
                      <div className="mt-3 flex items-center justify-center gap-3">
                        {member.phone && (
                          <a href={`tel:${member.phone}`} onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-navy transition-colors" aria-label="Phone">
                            <FaPhone size={13} />
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-navy transition-colors" aria-label="Email">
                            <FaEnvelope size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                </div>
                {selectedMember?.id === member.id && (
                  <TeamBioModal member={member} position={modalPosition} onClose={closeMemberBio} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Organisation Structure */}
        <section id="structure" className="mb-12 scroll-mt-20">
          <h2 className={`text-xl font-bold text-navy mb-6 pb-2 border-b-2  inline-block ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Organization Structure', 'संगठन संरचना')}
          </h2>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              <div className="bg-navy text-white text-sm font-semibold px-8 py-3 rounded-sm shadow text-center min-w-[220px]">
                {t('General Assembly', 'साधारण सभा')}
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="bg-sky text-white text-sm font-semibold px-8 py-3 rounded-sm shadow text-center min-w-[220px]">
                {t('Executive Committee', 'कार्य समिति')}
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="flex flex-wrap justify-center gap-3">
                {[t('Chairperson','अध्यक्ष'), t('Vice-Chairperson','उपाध्यक्ष'), t('Secretary','सचिव'), t('Treasurer','कोषाध्यक्ष')].map((label, i) => (
                  <div key={i} className="bg-navy/80 text-white text-xs font-medium px-5 py-2.5 rounded-sm shadow">
                    {label}
                  </div>
                ))}
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium px-8 py-3 rounded-sm text-center min-w-[220px]">
                {t('Sub-Committees & Members', 'उपसमितिहरू र सदस्यहरू')}
              </div>

            </div>
            <p className={`text-xs text-gray-400 text-center pb-5 ${lang === 'np' ? 'font-nepali' : ''}`}>
              {t('Registered under Association Registration Act 2034 · Affiliated with Samaj Kalyan Parishad',
                 'संस्था दर्ता ऐन २०३४ अन्तर्गत दर्ता · समाज कल्याण परिषदसँग आबद्ध')}
            </p>
          </div>
        </section>

        {/* Organization Info */}
        <section id="organization-info" className="scroll-mt-20">
          <h2 className={`text-xl font-bold text-navy mb-4 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Organizational Information', 'संस्थागत जानकारी')}
          </h2>
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            {/* CDO Registration Photo */}
            <figure className="border-b border-gray-100">
              <img
                src="/images/gallery/milestone/cdo-registration.jpeg"
                alt="Registration with Chief District Officer — 4 Bhadra 2083"
                className="w-full object-contain max-h-[520px] bg-gray-50"
              />
              <figcaption className={`text-center text-sm text-gray-500 py-3 px-4 bg-gray-50 ${lang === 'np' ? 'font-nepali' : ''}`}>
                {t(
                  'Registered with the Chief District Officer, Kathmandu, on 4 Bhadra 2083. The registration certificate was issued by the District Administration Office.',
                  'जिल्ला प्रशासन कार्यालय काठमाडौंमा संस्था दर्ता गरेपश्चात् प्रमुख जिल्ला अधिकारी ईश्वर राज पौडेलबाट संस्था दर्ता प्रमाणपत्र ग्रहण गर्दै अधिकार, समता र शान्ति अभियान–नेपालकी अध्यक्ष अधिवक्ता शुशिला सिंखडा।'
                )}
              </figcaption>
            </figure>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  { labelEn: 'Organization Name', labelNp: 'संस्थाको नाम', valueEn: siteInfo.nameEn, valueNp: siteInfo.nameNp },
                  { labelEn: 'Short Name', labelNp: 'संक्षिप्त नाम', valueEn: siteInfo.shortName, valueNp: siteInfo.shortName },
                  { labelEn: 'Motto', labelNp: 'आदर्श वाक्य', valueEn: siteInfo.mottoEn, valueNp: siteInfo.mottoNp },
                  { labelEn: 'Office Address', labelNp: 'कार्यालय ठेगाना', valueEn: siteInfo.addressEn, valueNp: siteInfo.addressNp },
                  { labelEn: 'Registration No.', labelNp: 'दर्ता नं.', valueEn: siteInfo.registrationNo, valueNp: siteInfo.registrationNo},
                  { labelEn: 'PAN Number', labelNp: 'स्थायी लेखा नं. (PAN)', valueEn: siteInfo.panNo, valueNp: siteInfo.panNo },
                  { labelEn: 'Phone', labelNp: 'फोन', valueEn: siteInfo.phone, valueNp: siteInfo.phone },
                  { labelEn: 'Email', labelNp: 'इमेल', valueEn: siteInfo.email, valueNp: siteInfo.email, preserveDigits: true },
                  { labelEn: 'Office Hours', labelNp: 'कार्यालय समय', valueEn: siteInfo.officeHoursEn, valueNp: siteInfo.officeHoursNp },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className={`px-5 py-3 font-semibold text-navy w-1/3 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? row.labelEn : row.labelNp}
                    </td>
                    <td className={`px-5 py-3 text-gray-700 ${lang === 'np' ? 'font-nepali' : ''}`}>
                      {lang === 'en' ? row.valueEn : row.preserveDigits ? row.valueNp : toNepaliDigits(row.valueNp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMemberBio}
          aria-hidden="true"
        />
      )}

    </div>
  );
};

export default About;