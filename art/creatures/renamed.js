// Kinds that changed their id, old to new (Ed, 2026-11-13, of the swallowtail that had kept the moth's id since 2026-10-23: "can we
// actually rename it in the files and put the moth on the bench?"). Hand-written; tools/creatures.mjs never touches it.
//   - kindNow: what an old save or link means by a name (src/app/chartSave.ts loadSave, src/app/linkParams.ts ?island=): the
//     moth's island, found or won, is the butterfly's.
//   - seedId: the id a kind's seeded looks and sounds are drawn from (its island's shape, its voice and melody, its coat's
//     texture, its sigil's detail: each a hash of the id's letters): the butterfly's are still the moth's letters, so nothing of
//     it changed with its id. The moth on the bench shares them, and meets no one.
export const RENAMED = { moth: "butterfly" };
const OLD = Object.fromEntries(Object.entries(RENAMED).map(([old, now]) => [now, old]));
/** @param {string} id */
export const kindNow = id => (Object.hasOwn(RENAMED, id) ? RENAMED[id] : id);
/** @param {string} id */
export const seedId = id => (Object.hasOwn(OLD, id) ? OLD[id] : id);
