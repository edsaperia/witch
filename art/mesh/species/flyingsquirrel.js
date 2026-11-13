// The flying squirrel, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch D: the heavy and
// the gnawing). The cold rainforest's (art/creatures/flyingsquirrel/genome.js; Ed, 2026-10-12: "a squirrel built for the night,
// huge dark eyes, a flat feathered tail and loose furred skin from wrist to ankle that spreads into a glide; its legend's
// membrane the night sky"). A small soft squirrel, grey-brown over white, its eyes huge, its tail a flat feather carried out
// behind (kit/flattail.js) and its glide skin down each flank from wrist to ankle (kit/glideskin.js), which stretches as it
// bounds. Its ladder: a big-eyed kit, its skin only a fold; a young one; the glider; and the night's own: its skin and tail
// the night sky with stars lit in them, plate of midnight blue over its back with a silver mark lit on each (Ed, 2026-11-12:
// "Armour should just be thickened polygons on their torso with a different colour and glowing runes"). It bounds. Metres; y
// up; its head along +z.
import { flattail } from "../kit/flattail.js";
import { hop } from "../kit/gaits.js";
import { glideskin } from "../kit/glideskin.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#c98a80", FS = { coat: "#8a7460", belly: "#f4eee2", nose: NOSE, upper: "#8a7460", mid: "#7a6654", sock: "#e6dccb", eye: "#0d0b0b" }, EDGE = "#3d3028";
const build = (C, o) => quad({ C, hind: { len: 0.5, thick: 1.4, foot: 1.5, spread: 1.15, ...o.hind }, fore: { len: 0.42, thick: 1.15, spread: 1.2, ...o.fore }, body: { len: 0.6, girth: 0.98, deep: 0.92, tuck: 1.0, arch: 0.9, rump: 1.15, neck: [0.08, 0.08], neckThick: 1.1, white: 0.6, ...o.body },
  head: { size: 1.1, muzzle: 0.45, muzzleWide: 1.2, muzzleDeep: 1.1, dome: 1.1, wide: 1.05, cheek: 0, eye: 2.3, eyeAt: [0.002, 0.006, -0.012], ...o.head, ear: { shape: "round", tall: 0.9, wide: 0.9, back: C.coat, inner: NOSE, ...o.ear } } });
const feather = (q, C, o = {}) => flattail("tail", "pelvis", q.root, { len: 0.46, r: 0.075, flat: 0.3, stalk: 0.08, pitch: 0.12, curl: -0.25, tip: 0.12, blunt: 0.3, bones: 4, colours: { coat: C.coat, under: C.belly, tip: C.mid }, edge: C.mid, ...o });
// (a bound with a long moment in the air, its skin spread)
const glides = (o = {}) => hop({ ...o, run: { leap: 0.55, duty: 0.2, ...o.run, body: { flex: 0.2, pitch: 0.1, ...o.run?.body } } });
const flyingsquirrel = {
  // a kit: all eyes, its skin only a fold along its side, a wisp of a tail
  baby() {
    const C = { ...FS, coat: "#9a8672", upper: "#9a8672" }, q = build(C, { hind: { len: 0.36, thick: 1.6 }, fore: { len: 0.32, thick: 1.35 }, body: { len: 0.48, arch: 0.5, neck: [0.05, 0.06] }, head: { size: 1.35, eye: 2.5 }, ear: { tall: 0.8, wide: 1.1 } });
    const t = feather(q, C, { len: 0.24, r: 0.03 });
    return plan("flyingsquirrel-baby", q.body, q.skull, [...q.legs, t, glideskin(q.legs, q.R, { wide: 0.03, colour: C.coat, under: C.belly, edge: C.mid })], glides({ lively: 1.3, tails: [t.chain] }));
  },
  // a young one: its skin grown, its tail flattening
  young() {
    const q = build(FS, { body: { len: 0.58, girth: 0.88 }, head: { size: 1.02 } }), t = feather(q, FS, { len: 0.38, r: 0.055 });
    return plan("flyingsquirrel-young", q.body, q.skull, [...q.legs, t, glideskin(q.legs, q.R, { wide: 0.055, colour: FS.coat, under: FS.belly, edge: EDGE })], glides({ lively: 1.1, tails: [t.chain] }));
  },
  // the glider: huge dark eyes, the furred skin loose down each flank with its dark rim, the flat feathered tail
  adult() {
    const q = build(FS, {}), t = feather(q, FS, { edge: EDGE });
    return plan("flyingsquirrel-adult", q.body, q.skull, [...q.legs, t, glideskin(q.legs, q.R, { wide: 0.085, colour: FS.coat, under: FS.belly, edge: EDGE })], glides({ tails: [t.chain] }), { cones: whiskers(q.P, "#f4eee2", 0.9) });
  },
  // the night's own: silvered, its eyes lit like moons; its skin a cloak of night sky down each flank with stars lit in it,
  // its tail the same, its end alight; plate of midnight blue over its back, a silver mark lit on each
  legend() {
    const STAR = "#dfe9ff", NIGHT = "#1c2350", DEEP = "#11163a", SILVER = "#aeb8d6", C = { ...FS, coat: "#6a6672", upper: "#6a6672", mid: "#55525f", belly: "#e6e4ee", sock: "#cfcfe0", eyes: [{ colour: STAR, glow: true }, { colour: STAR, glow: true }] };
    const claws = { colour: "#e6e4ee", len: 1.1 }, q = build(C, { hind: { len: 0.6, thick: 1.4, knob: 1.25, claws }, fore: { len: 0.5, thick: 1.15, knob: 1.25, claws }, body: { len: 0.72, girth: 1.08, hump: 0.3, neck: [0.09, 0.1], neckThick: 1.2 }, head: { size: 1.18, eye: 2.4 }, ear: { tall: 1.05, torn: 1 } });
    const t = feather(q, C, { len: 0.72, r: 0.12, bones: 5, colours: { coat: NIGHT, under: DEEP, tip: STAR }, tip: 0.1, edge: SILVER });
    t.lofts[0].rings.slice(-2).forEach(r => { r.glow = true; r.colour = STAR; });
    const skin = glideskin(q.legs, q.R, { wide: 0.14, sag: 0.1, colour: NIGHT, under: DEEP, edge: SILVER, stars: { colour: STAR, n: 6 } });
    const armour = [{ from: 2.0, to: 4.65, round: [0, 1.3], lames: 3, thick: 0.018, step: 0.01, colour: NIGHT, rim: SILVER, runes: { colour: STAR } }];
    return plan("flyingsquirrel-legend", q.body, q.skull, [...q.legs, t, skin], glides({ lively: 0.75, tails: [t.chain] }), { cones: whiskers(q.P, STAR, 1.4), armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "flyingsquirrel", heights: [36, 56, 81, 217], plans: flyingsquirrel };
