// Gallery content. Add authentic photos and YouTube videos here.

export const galleryItems = [
  {
    id: 2,
    src: '/images/gallery/meetings/photo1.jpeg',
    altEn: 'A constructive discussion on the website outline, content, and future direction was held at the organization’s Thapathali office. The meeting was attended by senior advocate and mediation expert Dr. Kumar Sharma Acharya, Mediation Council member Advocate Chup Bahadur Thapa, Chairperson Advocate Sushila Singhkhada, and organization officials. Held on 1 Ashoj 2083 B.S., Wednesday.',
    altNp: 'संस्थाको वेबसाइटको रूपरेखा, सामग्री तथा आगामी कार्यदिशाका सम्बन्धमा मेलमिलाप विज्ञ वरिष्ठ अधिवक्ता डा. कुमार शर्मा आचार्य र मेलमिलाप परिषद्का सदस्य अधिवक्ता चूप बहादुर थापाज्यू सहित संस्थाका अध्यक्ष अधिवक्ता शुसिला सिंखडा तथा पदाधिकारीहरुको उपस्थितिमा रचनात्मक छलफल संस्थाको थापाथलीस्थित कार्यालयमा सम्पन्न भयो। ईति संवत् २०८३ असोज १ गते रोज ५ शुभम् ....।',
    color: 'from-[#174a8a] to-[#3b73ad]',
    categoryEn: 'Meeting',
    categoryNp: 'बैठक',
  },
  {
    id: 1,
    src: '/images/gallery/milestone/cdo-registration.jpeg',
    altEn: 'Registered with the Chief District Officer on 4 Bhadra 2083 at District Administration Office, Kathmandu.',
    altNp: 'जिल्ला प्रशासन कार्यालय काठमाडौंमा संस्था दर्ता गरेपश्चात् प्रमुख जिल्ला अधिकारी ईश्वर राज पौडेलबाट संस्था दर्ता प्रमाणपत्र ग्रहण गर्दै अधिकार, समता र शान्ति अभियान–नेपालकी अध्यक्ष अधिवक्ता शुशिला सिंखडा।',
    color: 'from-navy to-navy-light',
    categoryEn: 'Milestone',
    categoryNp: 'उपलब्धि',
  },
];

// Add a YouTube video by providing either a normal YouTube URL or the 11-character video ID.
// Example: { id: 1, source: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', titleEn: '...', titleNp: '...' }
// The section remains hidden until at least one video is added.
export const youtubeVideos = [];

export function getYouTubeVideoId(source = '') {
  const value = String(source).trim();
  if (!value) return '';

  // Plain YouTube video ID.
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || '';
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const queryId = url.searchParams.get('v');
      if (queryId) return queryId;

      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') {
        return parts[1] || '';
      }
    }
  } catch {
    return '';
  }

  return '';
}
