// Publications and downloads. The documents live in publications.json,
// which the /admin panel edits.

import data from './publications.json';

const typeOf = (item) => {
  if (item.type) return item.type;
  return /\.docx?$/i.test(item.url || '') ? 'docx' : 'pdf';
};

export const publications = (data.sections || []).map((section) => ({
  category: { en: section.categoryEn, np: section.categoryNp },
  items: (section.items || []).map((item) => ({ ...item, type: typeOf(item) })),
}));
