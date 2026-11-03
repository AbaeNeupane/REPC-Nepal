// REPC-Nepal work areas.
// The text itself lives in work.json, which the /admin panel edits.
// Core services follow the organization's constitutional objectives. Other services
// preserve the organization's previously published service catalogue.

import data from './work.json';

const slugify = (text = '') =>
  String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Every item needs a stable id (used as a React key and a page anchor).
// Items added through /admin get one generated from their English title.
const withIds = (list) =>
  (list || []).map((item, i) => ({ ...item, id: item.id || slugify(item.titleEn) || `item-${i + 1}` }));

export const coreServices = withIds(data.coreServices);
export const otherServices = withIds(data.otherServices);

// Retain the previously published service catalogue for search and compatibility.
export const services = [...coreServices, ...otherServices];

export const areasOfFocus = withIds(data.areasOfFocus);
