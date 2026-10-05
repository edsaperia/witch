// Area flora (stage 8 of issue #79): which trees each area type grows and in what colours. Each wooded area lists 3 to 6 species
// with their shares (the first is its main kind, as its `big` names it in art/areas.js), and a palette: its leaves' hue (the area's
// own `leaf`), and how saturated and how bright its leaves are (sat, val: times the species' own). A species may carry options as
// the area recipes do (bare: dead; dark: shadowed leaves). areaTreeVariants grows an area's ten tree variants from this list, each
// species in its share of them, spread over the height classes; the open areas (moor, stone shrine, log pile, ravine) grow none.
// The fantasy species (glowcap, crystal-leaf tree, vinewood) are here only where the place suits magic, and only as a minority.

export const AREA_FLORA = {
  "fern-forest": { species: [["larch", .45], ["fir", .25], ["aspen", .15], ["birch", .15]], palette: { sat: 1, val: 1.05 } },
  "muddy-forest": { species: [["sycamore", .4], ["alder", .25], ["elm", .2], ["crabApple", .15]], palette: { sat: .85, val: .85 } },
  "tangly-forest": { species: [["hawthorn", .45], ["elder", .25], ["crabApple", .2], ["hazel", .1]], palette: { sat: 1.05, val: .9 } },
  "wispy-forest": { species: [["lime", .4], ["birch", .25], ["aspen", .2], ["whitebeam", .15]], palette: { sat: .85, val: 1.12 } },
  "hazel-forest": { species: [["hazel", .45], ["oak", .2], ["elder", .2], ["glowcap", .15]], palette: { sat: 1.05, val: 1 } },
  garden: { species: [["willow", .4], ["cherry", .3], ["crabApple", .15], ["vinewood", .15]], palette: { sat: 1.15, val: 1.05 } },
  "twiggy-forest": { species: [["ash", .5], ["elm", .25], ["aspen", .25]], palette: { sat: .9, val: 1.05 } },
  ancient: { species: [["yew", .45], ["oak", .3], ["cedar", .25]], palette: { sat: .95, val: .82 } },
  norway: { species: [["fir", .5], ["birch", .2], ["cedar", .15], ["larch", .15]], palette: { sat: .85, val: .8 } },
  "alder-forest": { species: [["alder", .55, { dark: true }], ["elm", .25], ["willow", .2]], palette: { sat: .95, val: .9 } },
  meadow: { species: [["chestnut", .35], ["hawthorn", .25], ["cherry", .2], ["crabApple", .2]], palette: { sat: 1.1, val: 1.12 } },
  "old-oaks": { species: [["oak", .5], ["holly", .2], ["elm", .15], ["whitebeam", .15]], palette: { sat: 1, val: .95 } },
  "berry-thicket": { species: [["pine", .4], ["rowan", .25], ["elder", .2], ["crabApple", .15]], palette: { sat: 1.05, val: .95 } },
  wetland: { species: [["willow", .45], ["alder", .3], ["aspen", .25]], palette: { sat: .9, val: 1.05 } },
  stream: { species: [["alder", .45], ["willow", .3], ["weepingBirch", .25]], palette: { sat: 1, val: 1 } },
  "rocky-slope": { species: [["rowan", .4], ["pine", .3], ["whitebeam", .3]], palette: { sat: .8, val: 1 } },
  bog: { species: [["birch", .5, { dark: true }], ["pine", .3], ["aspen", .2]], palette: { sat: .75, val: .85 } },
  deadwood: { species: [["broad", .5, { bare: true }], ["elm", .25, { bare: true }], ["aspen", .25, { bare: true }]], palette: { sat: .7, val: .8 } },
  "cave-mouth": { species: [["broad", .45, { bare: true }], ["yew", .3], ["crystal", .25]], palette: { sat: .8, val: .85 } },
  grassland: { species: [["flat", .4], ["weepingBirch", .3], ["whitebeam", .3]], palette: { sat: 1, val: 1.1 } },
  "beaver-pond": { species: [["weepingBirch", .4], ["alder", .3], ["aspen", .3]], palette: { sat: .95, val: 1.05 } },
  heath: { species: [["birch", .45], ["hawthorn", .3], ["rowan", .25]], palette: { sat: .9, val: .95 } },
  "old-pinewood": { species: [["pine", .55], ["rowan", .25], ["larch", .2]], palette: { sat: .9, val: .92 } },
  "bluebell-glade": { species: [["beech", .5], ["holly", .2], ["cherry", .15], ["whitebeam", .15]], palette: { sat: 1.1, val: 1.1 } },
  "holly-thicket": { species: [["holly", .45], ["yew", .3], ["vinewood", .25]], palette: { sat: .9, val: .8 } },
  "honeysuckle-tangle": { species: [["hazel", .4], ["rowan", .25], ["elder", .2], ["crabApple", .15]], palette: { sat: 1.05, val: 1.02 } },
};

// An area's ten (or n) tree slots as species, by their shares: each species gets its share of the slots (at least one, largest
// remainders first), dealt out round the list so each kind turns up across the height classes, not bunched in one.
// `id` an area type's id, or a flora record of AREA_FLORA's shape (an art set's own).
export function floraSlots(id, n) {
  const F = typeof id === "string" ? AREA_FLORA[id] : id; if (!F) return null;
  const sp = F.species, raw = sp.map(([, w]) => w * n), cnt = raw.map(x => Math.max(1, Math.floor(x)));
  let left = n - cnt.reduce((a, b) => a + b, 0);
  const order = raw.map((x, i) => [x - Math.floor(x), i]).sort((a, b) => b[0] - a[0]);
  for (let k = 0; left > 0; k++, left--) cnt[order[k % order.length][1]]++;
  for (let k = cnt.length - 1; left < 0; k = (k + cnt.length - 1) % cnt.length) if (cnt[k] > 1) { cnt[k]--; left++; }
  const out = []; while (out.length < n) for (let i = 0; i < sp.length && out.length < n; i++) if (cnt[i] > 0) { cnt[i]--; out.push({ type: sp[i][0], ...(sp[i][2] || {}) }); }
  return out;
}
