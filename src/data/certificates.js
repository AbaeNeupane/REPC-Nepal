// Official registration / organizational documents shown on the website.
// The list lives in certificates.json, which the /admin panel edits.

import data from './certificates.json';

const slugify = (text = '') =>
  String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const certificates = (data.certificates || []).map((item, i) => ({
  id: slugify(item.titleEn).slice(0, 40) || `certificate-${i + 1}`,
  ...item,
}));
