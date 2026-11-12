// Membership and volunteer information.
// The text lives in engagement.json, which the /admin panel edits.

import data from './engagement.json';

const slugify = (text = '') =>
  String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Every item needs a stable id (form option values, React keys, icons).
// Items added through /admin get one generated from their English title.
const withIds = (list, prefix) =>
  (list || []).map((item, i) => ({ ...item, id: item.id || slugify(item.titleEn) || `${prefix}-${i + 1}` }));

export const membershipInfo = {
  ...data.membershipInfo,
  categories: withIds(data.membershipInfo.categories, 'category'),
};

export const volunteerAreas = withIds(data.volunteerAreas, 'area');
