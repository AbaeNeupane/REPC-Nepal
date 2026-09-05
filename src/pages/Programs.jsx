import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const PageBanner = ({ titleEn, titleNp }) => {
  const { lang } = useLang();
  return (
    <div className="bg-navy text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
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

const programs = [
  {
    titleEn: 'Basic Mediation Training Program',
    titleNp: 'आधारभूत मेलमिलाप तालिम कार्यक्रम',
    descEn: 'A foundational training program for individuals seeking to become certified mediators. Covers principles of mediation, communication skills, and practical exercises.',
    descNp: 'प्रमाणित मेलमिलापकर्ता बन्न चाहने व्यक्तिहरूका लागि आधारभूत तालिम कार्यक्रम। मेलमिलापका सिद्धान्त, संचार कौशल र व्यावहारिक अभ्यासहरू समावेश।',
    statusEn: 'Ongoing',
    statusNp: 'जारी',
    color: 'bg-navy',
  },
  {
    titleEn: 'Human Rights Awareness Campaign',
    titleNp: 'मानव अधिकार सचेतना अभियान',
    descEn: 'Community-level campaigns to raise awareness about fundamental human rights, legal protections, and how to access justice.',
    descNp: 'मौलिक मानव अधिकार, कानुनी सुरक्षा र न्यायमा पहुँच बारे जागरुकता बढाउन समुदाय स्तरीय अभियानहरू।',
    statusEn: 'Ongoing',
    statusNp: 'जारी',
    color: 'bg-redc',
  },
  {
    titleEn: 'Free Legal Aid Clinics',
    titleNp: 'निःशुल्क कानुनी सहायता क्लिनिक',
    descEn: 'Regular free legal counselling sessions for vulnerable groups including women, children, elderly, and persons with disabilities.',
    descNp: 'महिला, बालबालिका, ज्येष्ठ नागरिक र अपाङ्गता भएका व्यक्ति सहित कमजोर समूहका लागि नियमित निःशुल्क कानुनी परामर्श सत्रहरू।',
    statusEn: 'Ongoing',
    statusNp: 'जारी',
    color: 'bg-green-700',
  },
  {
    titleEn: 'Gender-Based Violence Prevention Program',
    titleNp: 'लैङ्गिक हिंसा रोकथाम कार्यक्रम',
    descEn: 'Educational programs targeting prevention of gender-based violence, supporting survivors, and connecting victims with legal resources.',
    descNp: 'लैङ्गिक हिंसा रोकथाम, पीडितहरूलाई सहायता र पीडितहरूलाई कानुनी स्रोतसँग जोड्ने शैक्षिक कार्यक्रमहरू।',
    statusEn: 'Planned',
    statusNp: 'योजनाबद्ध',
    color: 'bg-amber',
  },
  {
    titleEn: 'Child Rights and Juvenile Justice Program',
    titleNp: 'बाल अधिकार र बाल न्याय कार्यक्रम',
    descEn: 'Programs focusing on child rights awareness, protection from abuse and exploitation, and support for children in conflict with the law.',
    descNp: 'बाल अधिकार सचेतना, दुर्व्यवहार र शोषणबाट सुरक्षा र कानुनसँग द्वन्द्वमा रहेका बालबालिकालाई सहयोगमा केन्द्रित कार्यक्रमहरू।',
    statusEn: 'Ongoing',
    statusNp: 'जारी',
    color: 'bg-purple-700',
  },
  {
    titleEn: 'Climate Change & Human Rights Study',
    titleNp: 'जलवायु परिवर्तन र मानव अधिकार अध्ययन',
    descEn: 'Research initiative studying the intersection of climate change and human rights in Nepal, with focus on vulnerable communities.',
    descNp: 'नेपालमा जलवायु परिवर्तन र मानव अधिकारको सम्बन्धको अध्ययन गर्ने अनुसन्धान पहल, कमजोर समुदायमा केन्द्रित।',
    statusEn: 'Planned',
    statusNp: 'योजनाबद्ध',
    color: 'bg-teal-700',
  },
];

const Programs = () => {
  const { lang, t } = useLang();

  return (
    <div>
      <PageBanner titleEn="Programs & Activities" titleNp="कार्यक्रम तथा गतिविधिहरू" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className={`text-gray-600 mb-8 leading-relaxed max-w-3xl ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
          {t(
            'REPC-Nepal runs a variety of programs designed to promote human rights, provide legal aid, train mediators, and build peace at the community and national level.',
            'REPC-Nepal ले मानव अधिकारको प्रवर्धन, कानुनी सहायता, मेलमिलापकर्ताको तालिम र समुदाय तथा राष्ट्रिय स्तरमा शान्ति निर्माणका लागि विभिन्न कार्यक्रमहरू सञ्चालन गर्दछ।'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className={`${prog.color} h-2`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className={`font-bold text-navy leading-snug ${lang === 'np' ? 'font-nepali text-base' : 'text-sm'}`}>
                    {lang === 'en' ? prog.titleEn : prog.titleNp}
                  </h3>
                  <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-semibold ${prog.statusEn === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-amber/20 text-amber-700'} ${lang === 'np' ? 'font-nepali' : ''}`}>
                    {lang === 'en' ? prog.statusEn : prog.statusNp}
                  </span>
                </div>
                <p className={`text-gray-600 leading-relaxed ${lang === 'np' ? 'font-nepali text-sm' : 'text-xs'}`}>
                  {lang === 'en' ? prog.descEn : prog.descNp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-sm p-6 text-center">
          <p className={`text-navy font-semibold mb-3 ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Interested in participating in our programs?', 'हाम्रा कार्यक्रमहरूमा सहभागी हुन इच्छुक हुनुहुन्छ?')}
          </p>
          <Link to="/contact"
            className={`inline-block bg-navy text-white font-semibold px-7 py-2.5 rounded-sm hover:bg-navy-light transition-colors ${lang === 'np' ? 'font-nepali' : ''}`}>
            {t('Get in Touch', 'सम्पर्कमा रहनुहोस्')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Programs;
