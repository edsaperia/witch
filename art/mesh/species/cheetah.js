// The cheetah, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn together
// on kit/feline.js; the ladders are proposals till Ed marks them). Its genome's brief (art/creatures/cheetah/genome.js): "built to
// sprint, a greyhound of a cat. A very deep, narrow chest, a waist tucked up tight, its spine arched, long thin legs, a small
// round head with small ears, solid black spots, black tear lines and a long heavy ringed tail, its rudder; the cub in its
// silver mantle; its legend the wind's: longer and leaner still, its tears lit, wind streaming off its back". On Ed's word
// (2026-11-11): the legend's armour is "thickened polygons on their torso with a different colour and glowing runes".
import { cat, catTail, feline, sprints } from "../kit/feline.js";
import { either, ringed, spots, tears } from "../kit/markings.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#1c1614", BLACK = "#1c1614", WHITE = "#f8f2e6";
const CHEETAH = { coat: "#dfa64e", belly: WHITE, nose: NOSE, upper: "#dfa64e", mid: "#d99e45", sock: "#e8bf7c", eye: "#2a1a10", ear: "#3a2a1c", tip: WHITE };
const build = (C, o = {}) => feline({ C, hind: { len: 1.36, thick: 0.82, ...o.hind }, fore: { len: 1.32, thick: 0.8, ...o.fore }, body: { len: 1.06, girth: 0.82, deep: 1.28, tuck: 0.45, arch: 0.45, neck: [0.15, 0.13], neckThick: 0.95, white: 0.3, ...o.body },
  head: { size: 0.84, muzzle: 0.55, wide: 1.0, dome: 1.08, eye: 1.2, ...o.head }, ear: { tall: 0.6, wide: 0.8, ...o.ear } });
const coat = (o = {}) => either(tears(BLACK), spots(BLACK, { sparse: 0.12, ...o }));
// (its rudder: long and heavy, ringed black towards its white end)
const rudder = (q, C, o) => ringed(catTail(q.root, C, { len: 0.8, r: 0.05, pitch: -0.7, curl: 1.1, tip: 0.1, blunt: 0.6, bones: 6, ...o }), BLACK, 4);
const cheetah = {
  // the cub in its silver mantle: dark underneath, a cape of long pale fur from its crown to its tail
  baby() {
    const C = { ...CHEETAH, coat: "#6b5a4c", upper: "#6b5a4c", mid: "#5f5044", sock: "#57493e", belly: "#57493e", back: "#d9d6cf" };
    const q = build(C, { hind: { len: 0.66, thick: 1.4 }, fore: { len: 0.64, thick: 1.4 }, body: { len: 0.62, girth: 0.98, deep: 1.0, tuck: 0.9, arch: 0.2, neck: [0.07, 0.08], neckThick: 1.15 }, head: { size: 1.22, eye: 1.6 }, ear: { tall: 0.7, wide: 1.0 } });
    const t = catTail(q.root, { ...C, tip: "#d9d6cf" }, { len: 0.3, r: 0.04, tip: 0.3 });
    const mantle = [6, 5, 4, 3, 2].flatMap(i => tufts(q.R[i], BONES[i], { n: 2, a0: 0.15, a1: 0.9, long: 0.11, sweep: 0.7, droop: 0.1, r: 0.05, lock: true, colour: () => "#e4e1da", tip: () => "#b9b5ac" }));
    return cat("cheetah-baby", q, [t], sprints({ lively: 1.3, tails: [t.chain] }), { cones: mantle }, tears(BLACK));
  },
  // gangly, the last of the mantle a crest on its neck, its spots through
  young() {
    const q = build(CHEETAH, { hind: { len: 1.3, thick: 0.74 }, fore: { len: 1.26, thick: 0.72 }, body: { len: 0.94, girth: 0.72, deep: 1.1 }, head: { size: 0.86 } });
    const t = rudder(q, CHEETAH, { len: 0.66, r: 0.042 });
    const crest = tufts(q.R[5], "neck", { n: 1, a0: 0.1, long: 0.08, sweep: 0.7, r: 0.04, lock: true, colour: () => "#e4e1da" });
    return cat("cheetah-young", q, [t], sprints({ lively: 1.1, tails: [t.chain] }), { cones: crest }, coat(), 4);
  },
  // the sprinter: a deep keel of a chest, a waist like a wasp's, the small head low on a long neck, the rudder out behind
  adult() {
    const q = build(CHEETAH);
    const t = rudder(q, CHEETAH, {});
    return cat("cheetah-adult", q, [t], sprints({ tails: [t.chain] }), {}, coat(), 4);
  },
  // the wind's: longer and leaner still, its tears lit, pale streamers blown back off its spine and its heels, its rudder
  // twice as long; sky-blue plate along its back, a white mark lit on each
  legend() {
    const SKY = "#2d6fb0", LIT = "#e9fbff", WIND = "#cfeaf2", C = { ...CHEETAH, coat: "#e6b869", upper: "#e6b869", mid: "#deae5c", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hind: { len: 1.62, thick: 0.74, knob: 1.15, claws: { colour: BLACK, len: 0.8 } }, fore: { len: 1.58, thick: 0.72, knob: 1.15, claws: { colour: BLACK, len: 0.8 } }, body: { len: 1.28, girth: 0.8, deep: 1.42, tuck: 0.34, arch: 0.7, neck: [0.17, 0.17] }, head: { size: 0.92 } }), P = q.P, R = q.R;
    const t = rudder(q, C, { len: 1.3, r: 0.055, pitch: -0.3, curl: 0.9, wave: 0.25, bones: 7 });
    const lit = [1, -1].map(s => ({ at: P(0.045 * s, 0.045, 0.135), rx: 0.008, ry: 0.012, tip: P(0.04 * s, -0.035, 0.215), bone: "head", colour: LIT, glow: true, up: [0, 0, 1], sides: 3 }));
    const wind = [[5, 0.24], [4, 0.34], [3, 0.4], [2, 0.34], [1, 0.3]].flatMap(([i, long]) => tufts(R[i], BONES[i], { n: 1, a0: 0.12, long, sweep: 1.0, droop: -0.12, r: 0.03, flat: 0.5, lock: true, colour: () => WIND, tip: () => LIT, glow: "tip" }));
    const heels = q.legs.map(l => { const r = l.lofts[0].rings[3]; return { at: r.at, rx: 0.02, ry: 0.012, tip: [r.at[0], r.at[1] + 0.03, r.at[2] - 0.2], bone: r.bone, colour: WIND, tipColour: LIT, glow: "tip", split: 0.5, up: [0, 1, 0] }; });
    const armour = [{ from: 1.2, to: 4.6, round: [0, 1.1], lames: 5, thick: 0.016, step: 0.012, colour: SKY, rim: "#bfe3f5", runes: { colour: LIT } }];
    return cat("cheetah-legend", q, [t], sprints({ lively: 0.85, tails: [t.chain] }), { cones: [...lit, ...wind, ...heels], armour }, coat({ sparse: 0.3 }), 4);
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs cheetah`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "cheetah", heights: [54, 84, 120, 308], plans: cheetah };
