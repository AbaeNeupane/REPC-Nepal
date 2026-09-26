import { Helmet } from 'react-helmet-async';
import { useLang } from '../context/LanguageContext';

const SITE_NAME_EN = 'REPC-Nepal';
const SITE_NAME_NP = 'REPC-नेपाल';
// TODO: swap to https://www.repcnepal.org.np once the custom domain is live
const BASE_URL = 'https://repc-nepal.vercel.app';

/**
 * Drop this at the top of any page component to set that page's
 * <title>, meta description, canonical URL and Open Graph tags.
 *
 *   <SEO
 *     titleEn="Our Services"
 *     titleNp="हाम्रा सेवाहरू"
 *     descriptionEn="..."
 *     descriptionNp="..."
 *     path="/services"
 *   />
 */
const SEO = ({ titleEn, titleNp, descriptionEn, descriptionNp, path = '' }) => {
  const { lang } = useLang();

  const title = lang === 'en'
    ? `${titleEn} | ${SITE_NAME_EN}`
    : `${titleNp} | ${SITE_NAME_NP}`;
  const description = lang === 'en' ? descriptionEn : descriptionNp;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

export default SEO;
