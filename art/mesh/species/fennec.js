// The fennec fox, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/fennec/genome.js): a small pale sand fox that's mostly ears, a black-tipped brush; its legend the dunes' own:
// ears like sails, a white mask, turquoise beads, heat-shimmer rising off its back. The fox's build made small and light; it
// bounds (Ed, 2026-11-12: "many small creatures bound rather than trot").
import { band } from "../kit/band.js";
import { hop } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#1a1210", BLACK = "#2a1a16", CREAM = "#fbf3e2", PINK = "#e9b7a0";
const FENNEC = { coat: "#e6c891", belly: CREAM, nose: NOSE, upper: "#e6c891", mid: "#edd5a6", sock: CREAM, eye: "#20140f", cheek: CREAM };
const build = (C, o) => quad({ C, hind: { len: 0.8, thick: 0.85, ...o.hind }, body: { len: 0.8, girth: 0.86, deep: 0.95, tuck: 0.75, neck: [0.14, 0.11], neckThick: 0.95, white: 0.45, ...o.body },
  head: { size: 1.0, muzzle: 0.8, muzzleWide: 0.85, cheek: 0.5, eye: 1.4, ...o.head, ear: { tall: 2.3, wide: 1.6, splay: 0.35, back: C.coat, tip: C.coat, ...o.ear } } });
// (the pink of an ear's inside: a smaller ear set just in front of each)
const inner = (P, tall, colour = PINK) => [1, -1].map(s => ({ at: P(0.05 * s, 0.075, 0.034), rx: 0.03, ry: 0.012, tip: P((0.05 + 0.05 * tall) * s, 0.075 + 0.12 * tall, 0.03), bone: s > 0 ? "earL" : "earR", colour, split: 0.55, up: [0, 0, 1], sides: 4 }));
const fennec = {
  // a ball of pale fluff under two ears already too big for it
  baby() {
    const C = { ...FENNEC, coat: "#ecd9b4", upper: "#ecd9b4", mid: "#ecd9b4" }, q = build(C, { hind: { len: 0.42, thick: 1.6 }, body: { len: 0.48, girth: 1.0, tuck: 1.05, neck: [0.06, 0.06], neckThick: 1.15 }, head: { size: 1.3, muzzle: 0.45, cheek: 0.2, eye: 1.8 }, ear: { tall: 1.5, wide: 1.8 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.16, r: 0.045, pitch: 0.1, tip: 0.3, blunt: 0.4, colours: { coat: C.coat, tip: "#6b4d3a" } });
    return plan("fennec-baby", q.body, q.skull, [...q.legs, t], hop({ lively: 1.3, tails: [t.chain] }), { cones: inner(q.P, 1.5 * 1.3) });
  },
  // slight and leggy, the ears at full height, the brush's black tip come in
  young() {
    const q = build(FENNEC, { hind: { len: 0.84, thick: 0.72 }, body: { girth: 0.74, tuck: 0.7 }, head: { size: 0.92 }, ear: { tall: 2.4, wide: 1.8 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.38, r: 0.07, pitch: -0.3, tip: 0.22, colours: { coat: FENNEC.coat, under: "#c9a56c", tip: BLACK } });
    return plan("fennec-young", q.body, q.skull, [...q.legs, t], hop({ lively: 1.1, tails: [t.chain] }), { cones: inner(q.P, 2.4 * 0.92) });
  },
  // mostly ears: each as long as its head and neck together, a full black-tipped brush, pale cheeks and long whiskers
  adult() {
    const q = build(FENNEC, { head: { size: 1.04, cheek: 1.0 }, ear: { tall: 2.7, wide: 2.1, splay: 0.5 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.5, r: 0.1, pitch: -0.15, curl: 0.2, tip: 0.22, colours: { coat: FENNEC.coat, under: "#c9a56c", tip: BLACK } });
    return plan("fennec-adult", q.body, q.skull, [...q.legs, t], hop({ tails: [t.chain] }), { cones: [...inner(q.P, 2.7 * 1.04), ...whiskers(q.P, CREAM, 0.9)] });
  },
  // the dunes' own: ears like sails, a white mask, turquoise beads at its throat and on its legs, the day's heat still rising
  // off its back; turquoise plate edged in gold over its back, a sun's mark lit on each
  legend() {
    const TURQ = "#1ea39f", GOLD = "#f0c75e", HEAT = "#ffd98a", C = { ...FENNEC, coat: "#d9b06a", back: "#c0914e", mask: "#fffaf0", muzzle: "#fffaf0", upper: "#d9b06a", mid: "#e6c891", eyes: [{ colour: HEAT, glow: true }, { colour: HEAT, glow: true }] };
    const q = build(C, { hind: { len: 1.05, thick: 0.8, knob: 1.25, claws: { colour: "#5a3b2a", len: 0.9 }, band: { colour: TURQ, at: 0.3, r: 0.036 } }, body: { len: 0.9, girth: 0.92, deep: 1.1, tuck: 0.6, hump: 0.5, neck: [0.19, 0.13], neckThick: 1.1 }, head: { size: 1.2, muzzle: 0.9, cheek: 1.7, eye: 1.6 }, ear: { tall: 3.0, wide: 2.6, splay: 0.75, torn: -1 } }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 0.8, r: 0.13, pitch: 0.3, curl: -0.5, wave: 0.2, bones: 5, tip: 0.25, plume: true, colours: { coat: C.coat, under: "#a87a3c", tip: BLACK }, ring: { colour: TURQ, at: 0.25 } });
    const beads = band("neck", R[5].at, R[6].at, { at: 0.3, r: R[5].rx * 1.08, ry: R[5].ry * 1.08, wide: 0.03, colour: TURQ });
    // (the heat off its back: thin lit tongues standing off its spine)
    const heat = [4, 3, 2, 1].flatMap((i, k) => tufts(R[i], BONES[i], { n: 1, a0: 0.15, long: 0.2 - 0.02 * k, sweep: 0.3, droop: -0.3, r: 0.028, jitter: 0, glow: true, colour: () => HEAT, tip: () => "#fff6dc" }));
    const armour = [{ from: 1.3, to: 4.6, round: [0.3, 1.5], lames: 4, thick: 0.02, step: 0.01, colour: TURQ, rim: GOLD, runes: { colour: "#fff3b0" } }];
    return plan("fennec-legend", q.body, q.skull, [...q.legs, t, beads], hop({ lively: 0.75, tails: [t.chain] }), { cones: [...inner(q.P, 3.0 * 1.2, "#f3cdb8"), ...heat, ...whiskers(q.P, "#fffaf0", 1.4)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "fennec", heights: [39, 61, 90, 222], plans: fennec };
