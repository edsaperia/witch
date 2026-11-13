// The beaver, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch D: the heavy and the
// gnawing). Low, humped and broad on short legs: a blunt head with small round ears and orange teeth, webbed hind feet, and
// its tail a scaled paddle (kit/flattail.js; its genome's `tail: "flat"`, `teeth`, `whiskers`, and "moss" for its legend). Its
// ladder: a fluffy kit with a leaf of a tail; a sleek young one; the beaver, humped and glossy, teeth showing; and the old
// lodge-keeper, grizzled, moss on its back and flanks, its teeth lit like coals, plate of peeled lodge-wood over its back with
// a water-blue mark lit on each (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different
// colour and glowing runes"). It waddles, and trots at speed. Metres; y up; its head along +z.
import { flattail } from "../kit/flattail.js";
import { trundle } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const TOOTH = "#e8862a", SCALE = "#2e2622", BEAVER = { coat: "#7a4a26", belly: "#9a6a3e", muzzle: "#8a5a32", nose: "#1c1512", upper: "#6f4322", mid: "#5a361c", sock: "#33241a", eye: "#0d0b0b" };
const build = (C, o) => quad({ C, hind: { len: 0.46, thick: 1.9, paw: 1.5, foot: 1.5, ...o.hind }, fore: { len: 0.42, thick: 1.6, ...o.fore }, body: { len: 0.86, girth: 1.5, deep: 1.0, tuck: 1.1, rump: 1.25, hump: 0.7, arch: 0.5, neck: [0.02, 0.11], neckThick: 1.5, white: 0.3, ...o.body },
  head: { size: 1.12, muzzle: 0.6, muzzleWide: 1.5, muzzleDeep: 1.4, wide: 1.08, dome: 0.95, nose: 1.3, cheek: 0, eye: 0.6, ...o.head, ear: { shape: "round", tall: 0.4, wide: 0.6, at: [0.014, -0.02, -0.02], back: C.mid, inner: C.mid, ...o.ear } } });
// (its two front teeth, below its nose)
const teeth = (P, m, o = {}) => [1, -1].map(s => ({ at: P(0.009 * s, -0.03, 0.16 + 0.075 * m), rx: 0.009 * (o.size ?? 1), ry: 0.006, tip: P(0.009 * s, -0.03 - 0.034 * (o.size ?? 1), 0.16 + 0.08 * m), bone: "head", colour: o.colour ?? TOOTH, glow: !!o.glow, up: [0, 0, 1], sides: 4 }));
const paddle = (q, C, o = {}) => flattail("tail", "pelvis", q.root, { len: 0.3, r: 0.085, pitch: -0.62, curl: 0.62, tip: 0, blunt: 0.3, bones: 3, colours: { coat: SCALE, tip: SCALE }, scale: "#3d332d", edge: "#1c1714", ...o });
const waddle = (o = {}) => trundle({ ...o, walk: { ...o.walk, body: { roll: 0.06, sway: 0.045, yaw: 0.08, ...o.walk?.body } }, run: { seconds: 0.5, duty: 0.36, ...o.run, body: { roll: 0.035, yaw: 0.07, ...o.run?.body } } });
const beaver = {
  // a kit: a ball of fluff, its tail a small leaf
  baby() {
    const C = { ...BEAVER, coat: "#96643a", upper: "#8a5a32", belly: "#b08458" }, q = build(C, { hind: { len: 0.32, thick: 1.9 }, fore: { len: 0.3, thick: 1.7 }, body: { len: 0.56, girth: 1.3, hump: 0.2, arch: 0.2, neck: [0.02, 0.08], neckThick: 1.3 }, head: { size: 1.4, muzzle: 0.5, eye: 1.0 }, ear: { tall: 0.5 } });
    const t = paddle(q, C, { len: 0.14, r: 0.045, pitch: -0.5, curl: 0.5 });
    return plan("beaver-baby", q.body, q.skull, [...q.legs, t], waddle({ lively: 1.3, tails: [t.chain] }));
  },
  // a young beaver: sleeker and longer, its paddle grown
  young() {
    const q = build(BEAVER, { body: { len: 0.8, girth: 1.25, hump: 0.4 }, head: { size: 1.05 } }), t = paddle(q, BEAVER, { len: 0.24, r: 0.065 });
    return plan("beaver-young", q.body, q.skull, [...q.legs, t, { bones: [], lofts: [], cones: teeth(q.P, 0.6, { size: 0.7 }) }], waddle({ lively: 1.1, tails: [t.chain] }));
  },
  // the beaver: humped and glossy, orange teeth, whiskers, the broad scaled paddle behind it
  adult() {
    const claws = { colour: "#2a201a", len: 0.9, thick: 1.2 }, q = build(BEAVER, { fore: { claws } }), t = paddle(q, BEAVER);
    return plan("beaver-adult", q.body, q.skull, [...q.legs, t], waddle({ tails: [t.chain] }), { cones: [...teeth(q.P, 0.6), ...whiskers(q.P, "#e6d8c0", 0.7)] });
  },
  // the old lodge-keeper: grizzled, moss on its back and flanks, its teeth lit like coals and its paddle rimmed with the same
  // light; plate of peeled lodge-wood over its back, a water-blue mark lit on each
  legend() {
    const LIT = "#7fe6ff", COAL = "#ffb04a", WOOD = "#c9b48a", EDGE = "#6a5636", MOSS = "#5f8a3a", C = { ...BEAVER, coat: "#5f3c22", upper: "#573620", muzzle: "#a39684", belly: "#806040", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const claws = { colour: "#d9d0b8", len: 1.6, thick: 1.5 }, q = build(C, { hind: { len: 0.5, thick: 2.1, knob: 1.15, claws: { ...claws, len: 1.0 } }, fore: { len: 0.46, thick: 1.8, knob: 1.15, claws }, body: { len: 0.95, girth: 1.7, hump: 1.2, neckThick: 1.65 }, head: { size: 1.25, muzzle: 0.7 }, ear: { torn: 1 } }), R = q.R, P = q.P;
    const t = paddle(q, C, { len: 0.42, r: 0.12, edge: LIT, scale: "#4a3e36" });
    t.lofts[0].rings.forEach(r => { const was = r.colour; if (typeof was === "function") r.colour = (cy, sx) => (Math.abs(sx) > 0.9 ? LIT : was(cy, sx) === LIT ? "#1c1714" : was(cy, sx)); });
    const moss = [1, 2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 1.2, a1: 2.2, long: 0.09, sweep: 0.5, droop: 0.7, r: 0.06, flat: 0.5, lock: true, colour: k => (k % 2 ? MOSS : "#3f5f2c"), tip: () => "#a9c27a" }));
    const armour = [{ from: 1.3, to: 4.6, round: [0, 1.15], lames: 5, thick: 0.02, step: 0.009, colour: WOOD, rim: EDGE, runes: { colour: LIT } }];
    return plan("beaver-legend", q.body, q.skull, [...q.legs, t], waddle({ lively: 0.75, tails: [t.chain] }), { cones: [...moss, ...teeth(P, 0.7, { size: 1.5, colour: COAL, glow: true }), ...whiskers(P, "#d9d0c0", 1.1)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "beaver", heights: [51, 77, 113, 244], plans: beaver };
