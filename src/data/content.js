// Programs, notices, publications, legal, and reference content.

import noticeData from './notices.json';
import linkData from './links.json';
import lawData from './laws.json';

// Each list is edited through /admin. Items get a generated id for React keys.
const withIds = (list, prefix) => (list || []).map((item, i) => ({ id: `${prefix}-${i + 1}`, ...item }));

export const notice = withIds(noticeData.notices, 'notice');
export const pressReleases = withIds(noticeData.pressReleases, 'press');
export const reports = withIds(noticeData.reports, 'report');
export const activities = withIds(noticeData.activities, 'activity');

export { services } from './work.js';

export const importantLinks = linkData.importantLinks || [];

export const legalFramework = lawData.laws || [];

export const campaigns = [
  {
    id: 1, src: null, color: 'from-[#0C2264] to-[#174a8a]',
    titleEn: 'Legal Aid Campaign', titleNp: 'कानुनी सहायता अभियान',
    descEn: 'Legal consultation and representation for vulnerable communities across Nepal.',
    descNp: 'नेपालभरका कमजोर तथा सीमान्तकृत समुदायका लागि कानुनी परामर्श र प्रतिनिधित्व।',
  },
  {
    id: 2, src: null, color: 'from-[#174a8a] to-[#3b73ad]',
    titleEn: 'Mediation & Peacebuilding Campaign', titleNp: 'मेलमिलाप तथा शान्ति निर्माण अभियान',
    descEn: 'Training community mediators and resolving local disputes without litigation.',
    descNp: 'सामुदायिक मेलमिलापकर्तालाई तालिम दिई मुद्दामामिला नगरी स्थानीय विवाद समाधानमा सहयोग।',
  },
];
