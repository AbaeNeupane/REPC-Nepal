import { useLang } from '../context/LanguageContext';
import { topNotices } from '../data/home';
import { FaFacebook, FaTwitter, FaYoutube, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { siteInfo } from '../data/organization';

const TopBar = () => {
  const { lang, t } = useLang();

  const marqueeText = topNotices
    .map(n => lang === 'en' ? n.en : n.np)
    .join('   ❖   ');

  return (
    <div className="bg-navy text-white text-xs py-1.5">
      <div className="site-container flex items-center justify-between gap-4">
        {/* Notice Ticker */}
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          <span className="bg-white text-sky font-bold px-2 py-0.5 rounded text-xs shrink-0">
            {t('Notice', 'सूचना')}
          </span>
          <div className="marquee-wrapper flex-1">
            <span className="marquee-content text-white/90">
              {marqueeText}&nbsp;&nbsp;&nbsp;{marqueeText}
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 shrink-0">
          <a href={siteInfo.facebook} target="_blank" rel="noopener noreferrer"
             className="hover:text-white/70 transition-colors" aria-label="Facebook">
            <FaFacebook size={13} />
          </a>
          {/* <a href={siteInfo.twitter} target="_blank" rel="noopener noreferrer"
             className="hover:text-white/70 transition-colors" aria-label="Twitter">
            <FaTwitter size={13} />
          </a> */}
          <a href={siteInfo.youtube} target="_blank" rel="noopener noreferrer"
             className="hover:text-white/70 transition-colors" aria-label="YouTube">
            <FaYoutube size={13} />
          </a>
          <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"
             className="hover:text-green-300 transition-colors" aria-label="WhatsApp">
            <FaWhatsapp size={13} />
          </a>
          <a href={`mailto:${siteInfo.email}`}
             className="hover:text-white/70 transition-colors" aria-label="Email">
            <FaEnvelope size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
