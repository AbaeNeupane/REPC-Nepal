import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import FoundingMembersSection from '../components/FoundingMembersSection';
import TeamBioModal from '../components/TeamBioModal';
import SEO from '../components/SEO';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10">
      <div className="site-container">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/about" className="hover:text-white transition-colors">
            {lang === 'en' ? 'About Us' : 'हाम्रो बारेमा'}
          </Link>
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

const FoundingMembers = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div>
      <SEO
        titleEn="Founding Members"
        titleNp="संस्थापक सदस्यहरू"
        descriptionEn="Meet the nine founding members of REPC-Nepal (Rights, Equity and Peace Campaign), who currently also serve as its Executive Committee."
        descriptionNp="REPC-नेपाल (अधिकार, समता र शान्ति अभियान) का नौ जना संस्थापक सदस्यहरूसँग परिचित हुनुहोस्, जो हाल कार्य समितिमा पनि सेवारत हुनुहुन्छ।"
        path="/founding-members"
      />
      <PageBanner titleEn="Founding Members" titleNp="संस्थापक सदस्यहरू" />

      <div className="site-container py-10">
        <FoundingMembersSection onMemberClick={setSelectedMember} />
      </div>

      {selectedMember && (
        <TeamBioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
};

export default FoundingMembers;
