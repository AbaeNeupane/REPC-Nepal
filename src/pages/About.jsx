import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/organization';
import CertificateDocuments from '../components/CertificateViewer';
import PurposeSection from '../components/PurposeSection';
import WhoWeAreSection from '../components/WhoWeAreSection';
import ExecutiveCommitteeSection from '../components/ExecutiveCommitteeSection';
import OrganizationStructureSection from '../components/OrganizationStructureSection';
import TeamBioModal from '../components/TeamBioModal';
import SEO from '../components/SEO';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10">
      <div className="site-container">
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

const About = () => {
  const { lang, t } = useLang();
  const [selectedMember, setSelectedMember] = useState(null);

  const openMemberBio = (member) => setSelectedMember(member);
  const closeMemberBio = () => setSelectedMember(null);

  return (
    <div>
      <SEO
        titleEn="About Us"
        titleNp="हाम्रो बारेमा"
        descriptionEn="Learn about REPC-Nepal's mission, executive committee, founding members, and organizational structure — a registered NGO working on legal aid, mediation, and human rights in Nepal."
        descriptionNp="REPC-नेपालको उद्देश्य, कार्य समिति, संस्थापक सदस्य र संगठनात्मक संरचनाको बारेमा जान्नुहोस्।"
        path="/about"
      />
      <PageBanner titleEn="About Us" titleNp="हाम्रो बारेमा" />

      <div className="site-container py-10">

        <WhoWeAreSection />

        <PurposeSection />

        <ExecutiveCommitteeSection onMemberClick={openMemberBio} className="mb-12" />

        {/* Founding Members — full profiles now live on their own page */}
        <section className="mb-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-sky/20 bg-gradient-to-r from-sky/5 via-white to-navy/[0.04] p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                <FaUsers size={20} />
              </div>
              <div>
                <h2 className={`text-lg font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t('Founding Members', 'संस्थापक सदस्यहरू')}
                </h2>
                <p className={`mt-1 text-sm text-slate-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
                  {t(
                    'Meet the nine founding members of REPC-Nepal, who currently also serve as the Executive Committee.',
                    'REPC-नेपालका नौ जना संस्थापक सदस्यहरूसँग परिचित हुनुहोस्, जो हाल कार्य समितिमा पनि सेवारत हुनुहुन्छ।'
                  )}
                </p>
              </div>
            </div>
            <Link
              to="/founding-members"
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md sm:self-center ${lang === 'np' ? 'font-nepali' : ''}`}
            >
              {t('View Founding Members', 'संस्थापक सदस्यहरू हेर्नुहोस्')} <FaArrowRight size={12} />
            </Link>
          </div>
        </section>

        <OrganizationStructureSection className="mb-12" />

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
            <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
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
          </div>
        </section>

        {/* Registration & Legal Documents */}
        <CertificateDocuments />

      </div>

      {selectedMember && (
        <TeamBioModal member={selectedMember} onClose={closeMemberBio} />
      )}

    </div>
  );
};

export default About;