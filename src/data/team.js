// Executive Committee and founding member records.
// The people live in team.json, which the /admin panel edits.
// The FIRST person in the list is shown as the Chairperson in the homepage message.

import data from './team.json';

export const team = (data.members || []).map((member, i) => ({ id: i + 1, ...member }));
