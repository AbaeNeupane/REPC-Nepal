// Homepage and public update content.
// Slides and the top banner text live in home.json, which the /admin panel edits.

import data from './home.json';

// Compatibility export for components/pages that consume public notices.
export { notice as notices } from './content.js';

export const topNotices = data.topNotices || [];

// Colour themes editors can pick for a slide. The class names stay written out here
// so Tailwind keeps them in the build.
const slideThemes = {
  navy:  { gradient: 'from-navy-dark via-navy to-navy-light', accent: '#0EA5E9' },
  slate: { gradient: 'from-slate-800 via-slate-700 to-slate-600', accent: '#38BDF8' },
  blue:  { gradient: 'from-blue-900 via-blue-800 to-sky-700', accent: '#0369A1' },
};

export const heroSlides = (data.slides || []).map((slide) => ({
  ...slide,
  ...(slideThemes[slide.theme] || slideThemes.navy),
}));
