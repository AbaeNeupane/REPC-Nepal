// Gallery content. The photos and videos live in gallery.json, which the /admin panel edits.

import data from './gallery.json';

// Photos: the list order in gallery.json is the display order.
export const galleryItems = (data.items || []).map((item, i) => ({
  id: i + 1,
  color: 'from-navy to-navy-light', // fallback background when a photo has no image file
  ...item,
}));

// Videos: add a normal YouTube URL (or the 11-character video ID) as `source`.
// The Videos section stays hidden until at least one video is added.
export const youtubeVideos = (data.videos || []).map((video, i) => ({ id: i + 1, ...video }));

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
