import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { siteInfo } from '../data/organization';
import SEO from '../components/SEO';

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

const Section = ({ titleEn, titleNp, children }) => {
  const { lang } = useLang();
  return (
    <div className="mb-8">
      <h2 className={`mb-2 text-lg font-bold text-navy ${lang === 'np' ? 'font-nepali' : ''}`}>
        {lang === 'en' ? titleEn : titleNp}
      </h2>
      <div className={`text-sm leading-relaxed text-gray-700 ${lang === 'np' ? 'font-nepali text-base' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const Privacy = () => {
  const { lang } = useLang();

  return (
    <div>
      <SEO
        titleEn="Privacy Policy"
        titleNp="गोपनीयता नीति"
        descriptionEn="How REPC-Nepal collects, uses, and protects information submitted through this website."
        descriptionNp="यस वेबसाइटमार्फत बुझाइएको जानकारी REPC-नेपालले कसरी सङ्कलन, प्रयोग र सुरक्षित गर्छ।"
        path="/privacy"
      />
      <PageBanner titleEn="Privacy Policy" titleNp="गोपनीयता नीति" />

      <div className="site-container max-w-3xl py-10">
        <p className={`mb-8 text-sm text-gray-500 ${lang === 'np' ? 'font-nepali' : ''}`}>
          {lang === 'en'
            ? 'Last updated: September 2026'
            : 'अन्तिम अद्यावधिक: सेप्टेम्बर २०२६'}
        </p>

        <Section titleEn="What we collect" titleNp="हामीले सङ्कलन गर्ने जानकारी">
          {lang === 'en' ? (
            <p>
              We only collect what you choose to give us: your name, email, phone number, and
              message when you use our Contact, Volunteer, Membership, or Newsletter forms.
              We do not use tracking cookies or sell any information to third parties.
            </p>
          ) : (
            <p>
              हामीले तपाईंले स्वेच्छाले उपलब्ध गराउनुभएको जानकारी मात्र सङ्कलन गर्छौं: सम्पर्क, स्वयंसेवा, सदस्यता वा न्यूजलेटर फारम प्रयोग गर्दा तपाईंको नाम, इमेल, फोन नम्बर र सन्देश। हामी ट्र्याकिङ कुकी प्रयोग गर्दैनौं र कुनै पनि जानकारी तेस्रो पक्षलाई बेच्दैनौं।
            </p>
          )}
        </Section>

        <Section titleEn="How we use it" titleNp="हामी यसलाई कसरी प्रयोग गर्छौं">
          {lang === 'en' ? (
            <p>
              Information you submit is used only to respond to your inquiry, process a
              volunteer or membership application, or send occasional updates if you subscribe
              to our newsletter. We do not use it for any other purpose.
            </p>
          ) : (
            <p>
              तपाईंले बुझाउनुभएको जानकारी तपाईंको सोधपुछको जवाफ दिन, स्वयंसेवा वा सदस्यता आवेदन प्रशोधन गर्न, वा तपाईंले न्यूजलेटरमा सदस्यता लिनुभएमा कहिलेकाहीं अपडेट पठाउन मात्र प्रयोग गरिन्छ। यसलाई अन्य कुनै उद्देश्यका लागि प्रयोग गरिँदैन।
            </p>
          )}
        </Section>

        <Section titleEn="Where it's stored" titleNp="यो कहाँ भण्डारण गरिन्छ">
          {lang === 'en' ? (
            <p>
              Form submissions are sent directly by email to REPC-Nepal's office inbox and are
              not stored in any separate database. Newsletter subscriptions are sent to the same
              inbox so we can add you to future updates. We take reasonable steps to keep this
              information secure, but no online system can be guaranteed 100% secure.
            </p>
          ) : (
            <p>
              फारम पेशीहरू सिधै इमेलमार्फत REPC-नेपालको कार्यालय इनबक्समा पठाइन्छ र यसलाई कुनै छुट्टै डाटाबेसमा भण्डारण गरिँदैन। न्यूजलेटर सदस्यता पनि उही इनबक्समा पठाइन्छ ताकि हामी तपाईंलाई भविष्यका अपडेटहरूमा थप्न सकौं। हामी यो जानकारी सुरक्षित राख्न उचित उपायहरू अपनाउँछौं, तर कुनै पनि अनलाइन प्रणालीलाई शतप्रतिशत सुरक्षित हुनेग्यारेन्टी दिन सकिँदैन।
            </p>
          )}
        </Section>

        <Section titleEn="Your rights" titleNp="तपाईंका अधिकारहरू">
          {lang === 'en' ? (
            <p>
              You can ask us to unsubscribe from the newsletter, or to correct or delete
              information you've submitted, at any time by contacting us at{' '}
              <a href={`mailto:${siteInfo.email}`} className="text-sky hover:underline">{siteInfo.email}</a>.
            </p>
          ) : (
            <p>
              तपाईं जुनसुकै बेला हामीलाई सम्पर्क गरेर न्यूजलेटरबाट अनसब्स्क्राइब गर्न, वा आफूले बुझाएको जानकारी सच्याउन वा हटाउन अनुरोध गर्न सक्नुहुन्छ:{' '}
              <a href={`mailto:${siteInfo.email}`} className="text-sky hover:underline">{siteInfo.email}</a>।
            </p>
          )}
        </Section>

        <Section titleEn="Contact" titleNp="सम्पर्क">
          {lang === 'en' ? (
            <p>
              Questions about this policy can be sent to {siteInfo.email} or to our office in{' '}
              {siteInfo.addressEn}.
            </p>
          ) : (
            <p>
              यस नीतिसम्बन्धी प्रश्नहरू {siteInfo.email} मा वा {siteInfo.addressNp} स्थित हाम्रो कार्यालयमा पठाउन सकिन्छ।
            </p>
          )}
        </Section>
      </div>
    </div>
  );
};

export default Privacy;
