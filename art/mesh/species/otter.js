// The otter, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/otter/genome.js): the mangrove's smooth-coated otter, paler, sleeker and longer, its throat cream, a thick flat
// tail. The stoat's build (kit/weasel.js) made heavier, with a broad blunt head and a rudder for a tail (kit/rudder.js); it
// bounds, its long back gathering and stretching (Ed, 2026-11-12: "many small creatures bound rather than trot"). Its legend is
// this builder's proposal: the old one of the river.
import { band } from "../kit/band.js";
import { lope } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { rudder } from "../kit/rudder.js";
import { tufts } from "../kit/tufts.js";
import { weasel } from "../kit/weasel.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#1c1412", CREAM = "#ead9b8";
const OTTER = { coat: "#8a6a4c", belly: CREAM, nose: NOSE, upper: "#8a6a4c", mid: "#775a40", sock: "#5f4733", ear: "#775a40", inner: "#5f4733", eye: "#140e0c" };
const build = (C, o) => weasel({ C, body: { len: 1.2, girth: 1.0, arch: 0.6, deep: 0.9, neck: [0.12, 0.16], neckThick: 1.2, white: 0.6, ...o.body }, legs: { len: 0.42, thick: 1.7, paw: 1.35, ...o.legs },
  head: { size: 1.05, wide: 1.14, dome: 0.9, muzzle: 0.5, muzzleWide: 1.5, muzzleDeep: 1.2, nose: 1.4, eye: 1.0, ear: { shape: "round", tall: 0.36, wide: 0.8, at: [0.02, -0.03, -0.01], back: C.ear, inner: C.inner }, ...o.head } });
const tailOf = (w, C, o) => rudder("tail", "pelvis", w.root, { len: 0.7, r: 0.085, pitch: -0.3, curl: 0.25, tip: 0, blunt: 0.05, bones: 5, colours: { coat: C.coat, under: C.mid, tip: C.coat }, ...o });
const otter = {
  // a pup: short, round and fluffy, paler than it will be
  baby() {
    const C = { ...OTTER, coat: "#a48667", upper: "#a48667", mid: "#93765a", sock: "#7d624a" }, w = build(C, { body: { len: 0.8, girth: 0.95, arch: 0.4, neck: [0.06, 0.09], neckThick: 1.25 }, legs: { len: 0.32, thick: 1.9 }, head: { size: 1.3, eye: 1.4 } });
    const t = tailOf(w, C, { len: 0.26, r: 0.06 });
    return plan("otter-baby", w.body, w.skull, [...w.legs, t], lope({ lively: 1.3, tails: [t.chain] }));
  },
  // sleek and narrow as an eel, the cream throat showing
  young() {
    const w = build(OTTER, { body: { len: 1.1, girth: 0.8, arch: 0.8 }, legs: { len: 0.4, thick: 1.5 }, head: { size: 0.95 } });
    const t = tailOf(w, OTTER, { len: 0.48, r: 0.075 });
    return plan("otter-young", w.body, w.skull, [...w.legs, t], lope({ lively: 1.1, tails: [t.chain] }));
  },
  // long and heavy-shouldered, its head held up on a thick neck, long pale whiskers, a tail as thick as its neck where it starts
  adult() {
    const w = build(OTTER, { body: { len: 1.25, girth: 1.08, arch: 0.9, neck: [0.2, 0.15], neckThick: 1.3 }, head: { size: 1.1 } });
    const t = tailOf(w, OTTER, { len: 0.66, r: 0.12 });
    return plan("otter-adult", w.body, w.skull, [...w.legs, t], lope({ tails: [t.chain] }), { cones: whiskers(w.skull.P, CREAM, 1.3) });
  },
  // the old one of the river: longer than an otter should be, silver down its back, its whiskers and brows grown long and
  // white, webbed claws, lit fins standing along its great tail, a torc of river gold; dark river-shell plate down its long
  // back, a mark lit on each
  legend() {
    const LIT = "#7ff5df", SHELL = "#1e4f5a", SILVER = "#c9d6d3", GOLD = "#e9b949", C = { ...OTTER, coat: "#6f5642", back: "#a9b3ae", belly: "#f2e6c9", muzzle: "#d9d2c2", upper: "#6f5642", mid: "#5f4733", sock: "#3f2f24", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const w = build(C, { body: { len: 1.45, girth: 1.15, arch: 1.2, neck: [0.28, 0.14], neckThick: 1.3 }, legs: { len: 0.6, thick: 1.5, paw: 1.6, knob: 1.2, claws: { colour: SILVER, len: 1.3, thick: 1.3, wide: 1.4 } }, head: { size: 1.25, eye: 1.3 } }), R = w.body.rings, P = w.skull.P;
    const t = tailOf(w, C, { len: 0.95, r: 0.15, pitch: -0.2, curl: 0.5, wave: 0.25, bones: 6, sides: 8 });
    // (the fins along its tail: lit blades standing off each joint, smaller toward its tip)
    const tr = t.lofts[0].rings, fins = [2, 3, 4, 5, 6].map(i => { const a = tr[i], u = a.up; return { at: a.at.map((v, k) => v + u[k] * a.ry * 0.7), rx: 0.05, ry: 0.012, tip: a.at.map((v, k) => v + u[k] * (a.ry + 0.16 - 0.015 * i) - (k === 2 ? 0.07 : 0)), bone: a.bone, colour: SHELL, tipColour: LIT, glow: true, split: 0.5, up: [0, 0, 1], sides: 4 }; });
    const torc = band("neck", R[5].at, R[6].at, { at: 0.2, r: R[5].rx * 1.07, ry: R[5].ry * 1.07, wide: 0.022, colour: GOLD });
    const brows = [1, -1].map(s => ({ at: P(0.05 * s, 0.075, 0.1), rx: 0.02, ry: 0.012, tip: P(0.16 * s, 0.12, -0.03), bone: "head", colour: "#ffffff", tipColour: SILVER, split: 0.5, up: [0, 1, 0] }));
    const mane = tufts(R[5], "neck", { n: 2, a0: 0.2, a1: 0.9, long: 0.12, sweep: 0.85, r: 0.05, lock: true, colour: () => SILVER, tip: () => "#ffffff" });
    const armour = [{ from: 1.15, to: 4.7, round: [0, 1.2], lames: 6, thick: 0.02, step: 0.012, colour: SHELL, rim: "#bfe7dc", runes: { colour: LIT, max: 1 } }];
    return plan("otter-legend", w.body, w.skull, [...w.legs, t, torc], lope({ lively: 0.75, tails: [t.chain] }), { cones: [...fins, ...brows, ...mane, ...whiskers(P, "#ffffff", 1.9)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build;
 *  curl, how it curls up to sleep where it differs from the rest (art/mesh/gear.js `napping` reads gait.curl): long, it turns further, as the stoat does, so its ring closes. */
export const MESH = { id: "otter", heights: [48, 73, 104, 250], curl: { turn: 4.5 }, plans: otter };
