// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them.

// A coat's markings (the cats', batch B of docs/plans/creature-mesh-rollout.md): the skin has too few rings to carry a stripe or a
// spot, so `marked` puts more rings between them, on the same lines (the shape is the same), and paints the marks on those.
const hash = (i, j) => { const x = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return x - Math.floor(x); };
/** How far round from the spine a corner is, in sixteenths of the way to the belly's middle: 0 on top, 8 underneath, the same on
 *  both flanks. */
const round = (cy, sx) => Math.round(Math.abs(Math.atan2(sx, cy)) / Math.PI * 8);

/** `plan` with its skin's rings made `n` times as many and `pattern` painted over them: pattern(u, cy, sx, m) gives a colour, or
 *  nothing for the coat's own; u counts the skin's rings as the plan had them (0 rump tip, 1 hips, 2 loin, 3 ribs, 4 shoulders, 5
 *  neck, 6 throat, 7 on: the head's), m the new ones. Its armour and its anchors, which count rings, are kept where they were. */
export function marked(plan, pattern, n = 3) {
  const skin = plan.lofts[0], src = skin.rings, rings = [], own = (r, cy, sx, f) => (typeof r.colour === "function" ? r.colour(cy, sx, f) : r.colour);
  src.forEach((r, i) => { const next = src[i + 1];
    for (let k = 0; k < (next ? n : 1); k++) { const t = k / n, near = t < 0.5 ? r : next, m = rings.length, u = i + t, mix = (a, b) => a + (b - a) * t;
      rings.push({ ...near, at: k ? r.at.map((v, j) => mix(v, next.at[j])) : r.at, rx: k ? mix(r.rx, next.rx) : r.rx, ry: k ? mix(r.ry, next.ry) : r.ry, colour: (cy, sx, f) => pattern(u, cy, sx, m) ?? own(near, cy, sx, f) }); } });
  return { ...plan, lofts: [{ ...skin, rings }, ...plan.lofts.slice(1)], armour: plan.armour.map(a => ({ ...a, from: (a.from ?? 0) * n, to: (a.to ?? src.length - 1) * n })), anchors: { neck: plan.anchors.neck * n, skull: plan.anchors.skull * n } };
}

/** Stripes round the body, a tiger's: every `every`th ring from `from` to `to`, down to `low` on the flank (cy: 1 the spine, -1
 *  the belly), broken here and there (`gaps`, 0 to 1) and stepped a ring where they cross the flank. */
export const stripes = (colour, o = {}) => { const { from = 0.7, to = 6.7, low = -0.35, every = 2, gaps = 0.18, seed = 0 } = o;
  return (u, cy, sx, m) => { if (u < from || u > to || cy < low) return undefined; const q = round(cy, sx); return (m + (q > 3 ? 1 : 0)) % every === 0 && hash(m + seed, q) >= gaps ? colour : undefined; }; };
/** Spots, a cheetah's: every other corner of every other ring, each row stepped a corner from the last so no two touch, `sparse`
 *  (0 to 1) of them left out: more left out, a rosette's scatter. */
export const spots = (colour, o = {}) => { const { from = 0.7, to = 6.7, low = -0.3, sparse = 0.15, seed = 0 } = o;
  return (u, cy, sx, m) => { if (u < from || u > to || cy < low) return undefined; const q = round(cy, sx); return m % 2 === 0 && (q + (m >> 1)) % 2 === 0 && hash(m + seed, q) >= sparse ? colour : undefined; }; };
/** A line down each side of the face from the eye's inner corner to the mouth: a cheetah's tears. */
export const tears = colour => (u, cy, sx) => (u > 8.2 && u < 10.5 && round(cy, sx) === 3 ? colour : undefined);
/** Several patterns, the first that marks a place winning. */
export const either = (...patterns) => (u, cy, sx, m) => { for (const p of patterns) { const c = p(u, cy, sx, m); if (c) return c; } return undefined; };
/** Rings round a tail (kit/tail.js) or bars round a leg (kit/leg.js): every other ring of its skin from `from` in `colour`. */
export const ringed = (part, colour, from = 3, to = 99) => { part.lofts[0].rings.forEach((r, i) => { if (i >= from && i <= to && (i - from) % 2 === 0) r.colour = colour; }); return part; };
