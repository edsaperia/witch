// The sphinx, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built from
// what batches A to G made; this one on batch B's cats, kit/feline.js, with batch F's wing). The desert ruin's (Ed, 2026-10-23,
// its biome's fantastic creature; art/creatures/sphinx/genome.js: "a lion's long sandstone-gold body couched proud, a flat-faced
// head under a pharaoh's striped headcloth of gold and lapis, gold claws. Its evolution: a cub in a little headcloth, a lean
// young, the adult's false beard and first wings, and the legend the riddler of the dunes: an eagle's wings spread over its
// back, the cobra on its brow, a gold torc, its coat gone to weathered sandstone, its eyes lit"). Its legend's armour (Ed,
// 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and glowing runes") is lapis.
// Asleep it lies as a sphinx does, couched on its belly with its forelegs out, at every level. Metres; y up; its head along +z.
import { band } from "../kit/band.js";
import { featherwing } from "../kit/featherwing.js";
import { cat, catTail, feline, stalks } from "../kit/feline.js";

const GOLD = "#e3b23c", LAPIS = "#2a4a9c", SAND = { coat: "#d9b26a", belly: "#ecd9a8", nose: "#8a5a3a", upper: "#d9b26a", mid: "#cfa75e", sock: "#e0bd78", eye: "#2a1a10", ear: "#d9b26a", tip: "#8a6a3a", muzzle: "#e3c58a" };
const build = (C, o = {}) => feline({ C, hind: { len: 1.1, thick: 1.3, paw: 1.2, ...o.hind }, fore: { len: 1.1, thick: 1.4, paw: 1.25, ...o.fore }, body: { len: 1.18, girth: 1.15, deep: 1.15, tuck: 0.74, neck: [0.2, 0.12], neckThick: 1.3, white: 0.25, ...o.body },
  head: { size: 1.25, muzzle: 0.22, muzzleWide: 1.25, muzzleDeep: 1.35, wide: 1.0, dome: 1.08, eye: 1.05, nose: 0.55, ...o.head }, ear: { tall: 0.15, wide: 0.4, ...o.ear } });
/** Its headcloth (a pharaoh's nemes): a hood over its skull, banded gold and lapis, flaring behind its face, and a lappet hanging
 *  down each side of its chest. size 1: the adult's. */
const headcloth = (P, size = 1, a = GOLD, b = LAPIS) => { const k = P(1, 0, 0)[0], s = size;
  const hood = { sides: 8, up: [0, 1, 0], rings: [[0.112, 0.07, 0.06, 0.03], [0.1, 0.105, 0.094, 0.032], [0.07, 0.122, 0.102, 0.03], [0.04, 0.132, 0.106, 0.024], [0.01, 0.136, 0.104, 0.014], [-0.02, 0.128, 0.096, 0.004], [-0.045, 0.1, 0.08, -0.006], [-0.06, 0.04, 0.03, -0.01]]
    .map(([z, rx, ry, y], i) => ({ at: P(0, y, z), rx: rx * k * (0.86 + 0.14 * s), ry: ry * k * (0.9 + 0.1 * s), bone: "head", colour: i % 2 ? b : a, plain: true })) };
  const lappets = [1, -1].map(sd => ({ at: P(sd * 0.1, -0.02, 0.07), rx: 0.04 * k * s, ry: 0.014 * k, tip: P(sd * 0.095, -0.06 - 0.13 * s, 0.1), bone: "head", colour: a, tipColour: b, split: 0.45, bulge: 0.95, up: [1, 0, 0], sides: 4 }));
  return { part: { bones: [], lofts: [hood], cones: [] }, cones: lappets }; };
const falseBeard = (P, long = 1) => ({ at: P(0, -0.05, 0.175), rx: 0.016, ry: 0.016, tip: P(0, -0.06 - 0.09 * long, 0.19), bone: "head", colour: LAPIS, tipColour: GOLD, split: 0.7, bulge: 1.0, up: [0, 0, 1], sides: 5 });
const rope = (q, C, o) => catTail(q.root, C, { len: 0.7, r: 0.04, pitch: -0.9, curl: 1.3, tip: 0.24, plume: true, bones: 5, ...o });
/** Its wings (kit/featherwing.js) from its shoulders: shut along its sides, or with `up` held spread and raised that many
 *  radians above level, as its legend's are. */
const wings = (q, o, up) => [[1, "L"], [-1, "R"]].map(([s, tag]) => featherwing(tag, s, [s * q.R[4].rx * 0.8, q.R[4].at[1] + q.R[4].ry * 0.62, q.R[4].at[2] - 0.03], { parent: "chest", tilt: 0, ...o, ...(up ? { fold: { roll: -up, at: [0.5, -0.05, 0.4] } } : {}) }));
// (asleep a raised wing is swung back and let down level along its back)
const folded = (ws, up) => ({ rots }) => { ws.forEach((w, i) => { const s = i ? -1 : 1; rots[w.names[0]] = [0, s * 1.25, -s * (up - 0.25)]; rots[w.names[1]] = [0, s * 0.25, 0]; }); };
const couched = (o = {}) => stalks({ sleep: "sphinx", ...o });
const sphinx = {
  // a cub in a little headcloth
  baby() {
    const q = build(SAND, { hind: { len: 0.56, thick: 1.8, paw: 1.3 }, fore: { len: 0.56, thick: 1.9, paw: 1.3 }, body: { len: 0.64, girth: 1.12, deep: 1.0, tuck: 0.95, neck: [0.08, 0.08] }, head: { size: 1.5, eye: 1.5 } });
    const t = catTail(q.root, SAND, { len: 0.3, r: 0.04, tip: 0.2 }), h = headcloth(q.P, 0.6);
    return cat("sphinx-baby", q, [t, h.part], couched({ lively: 1.3, tails: [t.chain] }), { cones: h.cones });
  },
  // lean and long-legged, its headcloth grown
  young() {
    const q = build(SAND, { hind: { thick: 1.05 }, fore: { thick: 1.1 }, body: { len: 1.02, girth: 0.95, deep: 1.02, tuck: 0.68 }, head: { size: 1.1 } }), t = rope(q, SAND, { len: 0.6, r: 0.035 }), h = headcloth(q.P, 0.85);
    return cat("sphinx-young", q, [t, h.part], couched({ lively: 1.1, tails: [t.chain] }), { cones: h.cones });
  },
  // the sphinx: the false beard on its chin, gold claws, its first wings shut along its sides
  adult() {
    const claws = { colour: GOLD, len: 1.0 }, q = build(SAND, { hind: { claws }, fore: { claws } }), t = rope(q, SAND, {}), h = headcloth(q.P, 1);
    const w = wings(q, { span: 0.62, chord: 0.24, primaries: 4, secondaries: 3, colours: { coat: "#c9a25a", flight: "#e9dcb8", tip: "#8a6a3a", under: "#ecd9a8" } });
    return cat("sphinx-adult", q, [t, h.part, ...w], couched({ tails: [t.chain] }), { cones: [...h.cones, falseBeard(q.P)] });
  },
  // the riddler of the dunes: an eagle's wings spread over its back, their points lit, the cobra on its brow, a gold torc, its
  // coat gone to weathered sandstone, its eyes lit; lapis plate on its back and flanks, a turquoise mark lit on each
  legend() {
    const LIT = "#7ff0e0", UP = 0.95, C = { ...SAND, coat: "#bfa27a", upper: "#bfa27a", mid: "#b09468", sock: "#c9ad86", belly: "#d9c8a2", muzzle: "#cdb690", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const claws = { colour: GOLD, len: 1.4, thick: 1.3 }, q = build(C, { hind: { len: 1.28, thick: 1.3, knob: 1.15, claws }, fore: { len: 1.28, thick: 1.45, knob: 1.15, claws }, body: { len: 1.28, girth: 1.22, deep: 1.32, tuck: 0.62, hump: 0.5, neck: [0.24, 0.14], neckThick: 1.45 }, head: { size: 1.45 } }), R = q.R, P = q.P;
    const t = rope(q, C, { len: 0.95, r: 0.048, pitch: 0.1, curl: 1.4, wave: 0.2, bones: 6 }), h = headcloth(P, 1.15);
    const w = wings(q, { span: 1.5, chord: 0.5, primaries: 7, secondaries: 5, lit: LIT, colours: { coat: "#a88a5a", flight: "#e9dcb8", tip: GOLD, under: "#d9c8a2" } }, UP);
    const cobra = [{ at: P(0, 0.1, 0.108), rx: 0.016, ry: 0.01, tip: P(0, 0.165, 0.13), bone: "head", colour: GOLD, tipColour: LIT, glow: "tip", split: 0.6, bulge: 1.1, up: [1, 0, 0], sides: 4 }];
    const torc = band("neck", R[5].at, R[6].at, { at: 0.3, r: R[5].rx * 1.07, ry: R[5].ry * 1.07, wide: 0.03, colour: GOLD });
    const armour = [{ from: 1.0, to: 3.3, round: [0.25, 1.8], lames: 3, thick: 0.022, step: 0.012, colour: LAPIS, rim: GOLD, runes: { colour: LIT } }];
    return cat("sphinx-legend", q, [t, h.part, torc, ...w], couched({ lively: 0.75, tails: [t.chain], nap: folded(w, UP) }), { cones: [...h.cones, falseBeard(P, 1.5), ...cobra], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs sphinx`: Ed, 2026-11-12, "keep the sizes";
 *  its legend's is to the top of its raised wings, as today's is); plans, each level's build. */
export const MESH = { id: "sphinx", heights: [63, 98, 181, 484], plans: sphinx };
