// The silhouette check (art/genome/silhouette.js) on an art set: every species as the set draws it (young and adult,
// facing us), shrunk to 24 px, against every other; prints the closest pairs and any under the check's 0.15.
//   node tools/art-iterations/silhouettes.mjs [artSet] [n closest]
import { defaultStyle, critter, SPECIES } from "../../art/generator.js";
import { silhouette, silhouettePairs } from "../../art/genome/silhouette.js";
import { artSet } from "../../art/genome/next.js";

const name = process.argv[2] || "next", n = +(process.argv[3] || 8), st = { ...defaultStyle(), artSet: name };
const ids = [...new Set([...SPECIES.map(s => s.id), ...Object.keys(artSet(name)?.species || {})])], changed = new Set(Object.keys(artSet(name)?.species || {}));
for (const [level, label] of [[1, "young"], [2, "adult"]]) {
  const shapes = Object.fromEntries(ids.map(id => [id, silhouette(critter(id, level, 0, st))]));
  const pairs = silhouettePairs(shapes), mine = pairs.filter(p => changed.has(p.a) || changed.has(p.b));
  console.log(`${label}: ${pairs.filter(p => p.d < .15).length} pairs under 0.15; closest pairs with a changed or new species:`);
  for (const p of mine.slice(0, n)) console.log(`  ${p.a} ~ ${p.b}  ${p.d.toFixed(3)}`);
}
