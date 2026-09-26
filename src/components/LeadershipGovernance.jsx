import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import ExecutiveCommitteeSection from './ExecutiveCommitteeSection';
import TeamBioModal from './TeamBioModal';

const LeadershipGovernance = () => {
  const { lang, t } = useLang();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="site-container">
        <div className="mb-7 max-w-4xl">
          <p className={`text-xs font-bold uppercase tracking-[0.16em] text-sky ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Leadership & Governance', 'नेतृत्व तथा सुशासन')}
          </p>
          <h2 className={`mt-1 text-2xl font-black text-navy sm:text-3xl ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Executive Committee', 'कार्य समिति')}
          </h2>
          <p className={`mt-3 max-w-3xl text-base leading-relaxed text-slate-600 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t(
              'REPC-Nepal is governed through its Executive Committee. The current Executive Committee has nine members: Chairperson, Vice Chairperson, Secretary, Treasurer, and five Members.',
              'REPC-नेपाल कार्य समितिमार्फत सञ्चालित छ। वर्तमान कार्य समितिमा नौ जना सदस्य छन्: अध्यक्ष, उपाध्यक्ष, सचिव, कोषाध्यक्ष तथा पाँच जना सदस्य।'
            )}
          </p>
        </div>

        <ExecutiveCommitteeSection onMemberClick={setSelectedMember} />
      </div>

      {selectedMember && (
        <TeamBioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </section>
  );
};

export default LeadershipGovernance;
