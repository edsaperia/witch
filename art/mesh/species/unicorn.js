// The unicorn, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built
// from what batches A to G made; this one on batch C's hooves and horns). The misty old forest's (Ed, 2026-10-13: magical
// creatures for the outer islands; art/creatures/unicorn/genome.js: "a wild white horse of the misty old forest, one spiral
// horn from its brow, a nub on the foal growing longer by level; its legend's horn is light"): a horse's long head on an arched
// neck, a mane down it and a forelock, a long flowing tail, whole hooves (kit/hooves.js, not cloven). Its legend's armour (Ed,
// 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and glowing runes") is
// moon-silver. It walks and trots; its legend curls up as a fawn does. Metres; y up; its head along +z.
import { trots } from "../kit/gaits.js";
import { hooves } from "../kit/hooves.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { path, sweep } from "../kit/sweep.js";
import { tail } from "../kit/tail.js";
import { tufts } from "../kit/tufts.js";

const HOOF = "#b9b2a4", PEARL = "#efe6d2", MIST = "#c9d6e6", UNI = { coat: "#f4f2ec", belly: "#e3e1dc", muzzle: "#d9cfd0", nose: "#a8969a", upper: "#f4f2ec", mid: "#e9e6df", sock: "#d6d2c9", eye: "#1c1a24" };
// (a horse lies with its forelegs folded under it: art/mesh/gear.js reads gait.lie)
const COUCHED = { fore: [-1.35, 2.5, 0.2], hind: [-0.95, 2.2, -1.25] };
const build = (C, o) => { const q = quad({ C, hind: { len: 1.62, thick: 0.9, ...o.hind }, fore: { len: 1.76, thick: 0.86, ...o.fore }, body: { len: 1.22, girth: 1.4, deep: 1.25, tuck: 0.88, rump: 1.1, neck: [0.4, 0.2], neckThick: 1.3, white: 0, ...o.body },
  head: { size: 1.22, muzzle: 1.75, muzzleWide: 1.05, muzzleDeep: 1.15, wide: 0.92, dome: 0.95, nose: 1.3, cheek: 0, eye: 1.0, ...o.head, ear: { shape: "point", tall: 0.5, wide: 0.5, at: [-0.006, -0.004, -0.012], back: C.coat, tip: C.coat, ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: o.hoof ?? HOOF, cloven: false, size: 1.1 }) }; };
/** Its horn: one straight spiral from its brow, up and forward. len (of the head's size), r, colour and groove (the spiral's two
 *  colours, turn about), lit: the whole of it drawn unlit, as light. */
const spiral = (P, o) => { const { len = 0.3, r = 0.016, lean = 0.55, colour = PEARL, groove = "#cdbf9c", lit = false, n = 10 } = o, k = P(1, 0, 0)[0], pts = path(P(0, 0.088, 0.085), len * k, n, () => [0, Math.cos(lean), Math.sin(lean)]);
  return { bones: [], cones: [], lofts: [sweep("head", pts, { r: (t, i) => r * k * (1 - 0.93 * t) * (i % 2 ? 1.18 : 1), colour: (t, i) => (i % 2 ? colour : groove), glow: lit, sides: 5, up: [1, 0, 0] })] }; };
const flow = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.62, r: 0.075, pitch: -0.75, curl: -0.55, tip: 0.3, blunt: 0.1, bones: 5, sides: 6, plume: true, colours: { coat: o.hair ?? C.belly, tip: o.end ?? MIST }, ...o });
/** Its mane: locks down the top of its neck, falling to one side, and a forelock between its ears. */
const mane = (q, o) => [...[6, 5, 4].flatMap((i, k) => tufts(q.R[i], i === 4 ? "chest" : "neck", { n: 2, a0: 0.0, a1: 0.5, long: (o.long ?? 0.12) * (1 + 0.15 * k), sweep: 0.35, droop: 0.75, r: 0.05, flat: 0.5, lock: true, jitter: 0.2, colour: () => o.colour, tip: () => o.tip ?? o.colour, glow: o.glow ?? false })),
  { at: q.P(0, 0.085, 0.05), rx: 0.03, ry: 0.02, tip: q.P(0.015, 0.05 - 0.08 * (o.long ?? 0.12) / 0.12 * 0.4, 0.14), bone: "head", colour: o.colour, tipColour: o.tip ?? o.colour, split: 0.5, bulge: 0.9, up: [1, 0, 0], sides: 5, glow: o.glow ?? false }];
const unicorn = {
  // a foal: all legs, a short brush of mane and tail, a nub where its horn will be
  baby() {
    const q = build(UNI, { hind: { len: 1.22, thick: 0.78 }, fore: { len: 1.32, thick: 0.74 }, body: { len: 0.74, girth: 0.95, deep: 0.98, neck: [0.24, 0.12], neckThick: 1.05 }, head: { size: 1.3, muzzle: 1.1, eye: 1.6 }, ear: { tall: 0.7 } }), t = flow(q, UNI, { len: 0.22, r: 0.05, pitch: -0.5, curl: -0.2 });
    return plan("unicorn-baby", q.body, q.skull, [...q.legs, t, spiral(q.P, { len: 0.045, r: 0.014, n: 4 })], trots({ lively: 1.3, lie: COUCHED, tails: [t.chain] }), { cones: mane(q, { long: 0.05, colour: "#e3e1dc" }) });
  },
  // a yearling: leggy and narrow, its horn a hand long
  young() {
    const q = build(UNI, { hind: { len: 1.5, thick: 0.68 }, fore: { len: 1.62, thick: 0.64 }, body: { len: 1.04, girth: 1.02, deep: 1.05, neck: [0.34, 0.17], neckThick: 1.05 }, head: { size: 1.1, muzzle: 1.5 } }), t = flow(q, UNI, { len: 0.42, r: 0.06 });
    return plan("unicorn-young", q.body, q.skull, [...q.legs, t, spiral(q.P, { len: 0.16, r: 0.015, n: 8 })], trots({ lively: 1.1, lie: COUCHED, tails: [t.chain] }), { cones: mane(q, { long: 0.09, colour: "#e9e6df", tip: MIST }) });
  },
  // the unicorn: white, a long pearl spiral of a horn, a mane and tail the colour of mist
  adult() {
    const q = build(UNI, {}), t = flow(q, UNI);
    return plan("unicorn-adult", q.body, q.skull, [...q.legs, t, spiral(q.P, { len: 0.32, r: 0.017, n: 12 })], trots({ lie: COUCHED, tails: [t.chain] }), { cones: mane(q, { long: 0.14, colour: "#e9e6df", tip: MIST }) });
  },
  // the old forest's own: its horn is light, long as its neck; its mane and tail fall like mist, lit at their ends, feather on
  // its fetlocks, its eyes lit; moon-silver plate on its back and flanks, a mark lit on each
  legend() {
    const LIT = "#bfe9ff", SILVER = "#8fa1b8", C = { ...UNI, coat: "#fbfaf6", upper: "#fbfaf6", mid: "#eef0f2", sock: "#dfe6ee", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hoof: "#d9c88a", hind: { len: 1.78, thick: 0.86, knob: 1.1 }, fore: { len: 1.95, thick: 0.82, knob: 1.1 }, body: { len: 1.3, girth: 1.3, deep: 1.32, tuck: 0.8, hump: 0.3, neck: [0.46, 0.22], neckThick: 1.5 }, head: { size: 1.32 } }), t = flow(q, C, { len: 0.95, r: 0.1, pitch: -0.6, curl: -0.7, wave: 0.25, bones: 6, hair: "#eef0f2", end: LIT });
    const feather = q.legs.flatMap(l => { const r = l.lofts[0].rings[4]; return [{ at: r.at, rx: r.rx * 1.5, ry: r.ry * 1.5, tip: [r.at[0], r.at[1] - 0.05, r.at[2] - 0.07], bone: r.bone, colour: "#eef0f2", tipColour: MIST, split: 0.5, bulge: 0.9, up: [1, 0, 0], sides: 5 }]; });
    const armour = [{ from: 1.2, to: 4.4, round: [0.15, 1.6], lames: 4, thick: 0.02, step: 0.011, colour: SILVER, rim: "#e6eef6", runes: { colour: LIT } }];
    return plan("unicorn-legend", q.body, q.skull, [...q.legs, t, spiral(q.P, { len: 0.62, r: 0.024, n: 18, colour: "#ffffff", groove: LIT, lit: true })], trots({ lively: 0.8, lie: COUCHED, tails: [t.chain] }), { cones: [...mane(q, { long: 0.26, colour: "#eef0f2", tip: LIT, glow: "tip" }), ...feather], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs unicorn`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "unicorn", heights: [71, 111, 160, 278], plans: unicorn };
