// The snow leopard, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn
// together on kit/feline.js; the ladders are proposals till Ed marks them). Its genome's brief (art/creatures/snowleopard/genome.js):
// "a long, low, pale smoky cat with rosettes, small round ears, a broad face and a very long thick tail; a fluffy cub, a lean
// young, a heavy adult, and the elder the high ice's ghost, its long ringed tail worn round its shoulders like a stole,
// frost-muzzled, stone beads". On Ed's word (2026-11-11): the legend's armour is "thickened polygons on their torso with a
// different colour and glowing runes".
import { band } from "../kit/band.js";
import { cat, catTail, feline, springs } from "../kit/feline.js";
import { ringed, spots } from "../kit/markings.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#6a4a48", SMOKE = "#56524e", WHITE = "#f6f5f0", STONE = "#8d9398";
const SNOW = { coat: "#cfcabd", belly: WHITE, nose: NOSE, upper: "#cfcabd", mid: "#c6c1b3", sock: "#dedacf", eye: "#2a2622", ear: "#6f6a62", inner: WHITE, tip: SMOKE, muzzle: WHITE };
const build = (C, o = {}) => feline({ C, hind: { len: 0.88, thick: 1.5, paw: 1.4, ...o.hind }, fore: { len: 0.84, thick: 1.6, paw: 1.45, ...o.fore }, body: { len: 1.12, girth: 1.18, deep: 1.1, tuck: 0.88, neck: [0.08, 0.14], neckThick: 1.4, white: 0.4, ...o.body },
  head: { size: 1.12, muzzle: 0.5, wide: 1.2, dome: 1.06, eye: 1.1, ...o.head }, ear: { tall: 0.5, wide: 0.9, ...o.ear } });
const rosettes = o => spots(SMOKE, { sparse: 0.3, ...o });
// (its tail: nearly as long as itself and thick as its leg, ringed dark)
const brush = (q, C, o) => ringed(catTail(q.root, C, { len: 0.95, r: 0.085, pitch: -0.6, curl: 1.1, blunt: 0.7, tip: 0.1, bones: 6, sides: 7, ...o }), SMOKE, 3);
const snowleopard = {
  // a fluffy cub, pale and round, a tail already too big for it
  baby() {
    const q = build(SNOW, { hind: { len: 0.5, thick: 2.0 }, fore: { len: 0.5, thick: 2.0 }, body: { len: 0.62, girth: 1.25, neck: [0.04, 0.09] }, head: { size: 1.45, eye: 1.5 }, ear: { tall: 0.6, wide: 1.1 } });
    const t = brush(q, SNOW, { len: 0.4, r: 0.065, pitch: -0.2, curl: 0.9 });
    const fluff = [4, 3, 2].flatMap(i => tufts(q.R[i], BONES[i], { n: 2, a0: 0.6, a1: 1.8, long: 0.06, sweep: 0.6, r: 0.05, lock: true, colour: () => WHITE }));
    return cat("snowleopard-baby", q, [t], springs({ lively: 1.3, tails: [t.chain] }), { cones: fluff }, rosettes({ sparse: 0.5 }));
  },
  // lean and long, its tail a counterweight
  young() {
    const q = build(SNOW, { hind: { len: 0.96, thick: 1.15 }, fore: { len: 0.92, thick: 1.2 }, body: { len: 1.06, girth: 0.94, tuck: 0.75 }, head: { size: 1.0 } });
    const t = brush(q, SNOW, { len: 0.85, r: 0.07 });
    return cat("snowleopard-young", q, [t], springs({ lively: 1.1, tails: [t.chain] }), {}, rosettes());
  },
  // heavy and low, great furred paws, the tail as long as its body
  adult() {
    const q = build(SNOW);
    const t = brush(q, SNOW, { len: 1.05 });
    return cat("snowleopard-adult", q, [t], springs({ tails: [t.chain] }), { cones: whiskers(q.P, "#ffffff", 1.1) }, rosettes());
  },
  // the high ice's ghost: paler and longer, frost on its muzzle and brows, its eyes lit, its great ringed tail carried up over
  // its back and round its shoulders like a stole, stone beads at its neck and on its legs; ice-blue plate on its flanks
  legend() {
    const ICE = "#356f9e", LIT = "#c4f3ff", FROST = "#eef7fb", C = { ...SNOW, coat: "#dedbd2", upper: "#dedbd2", mid: "#d4d1c7", sock: "#ecebe6", muzzle: FROST, eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hind: { len: 0.98, thick: 1.55, paw: 1.5, knob: 1.2, claws: { colour: SMOKE, len: 0.9 }, band: { colour: STONE, at: 0.3, r: 0.04 } }, fore: { len: 0.94, thick: 1.7, paw: 1.55, knob: 1.2, claws: { colour: SMOKE, len: 0.9 }, band: { colour: STONE, at: 0.3, r: 0.04 } }, body: { len: 1.3, girth: 1.22, deep: 1.2, tuck: 0.8, hump: 0.5, neck: [0.09, 0.18], neckThick: 1.5 }, head: { size: 1.3, eye: 1.25 } }), P = q.P, R = q.R;
    // (the stole: up from its rump, forward over its back and down across one shoulder)
    const t = brush(q, C, { len: 1.15, r: 0.09, pitch: 2.0, curl: 2.5, yaw: 0.2, twist: 0.7, bones: 8 });
    const beads = band("neck", R[5].at, R[6].at, { at: 0.4, r: R[5].rx * 1.1, ry: R[5].ry * 1.08, wide: 0.035, colour: STONE });
    const frost = [{ at: P(0, -0.03, 0.2), rx: 0.03, ry: 0.03, tip: P(0, -0.15, 0.16), bone: "head", colour: FROST, tipColour: LIT, split: 0.5, up: [0, 0, 1] }, ...[1, -1].map(s => ({ at: P(0.05 * s, 0.09, 0.1), rx: 0.024, ry: 0.016, tip: P(0.13 * s, 0.15, -0.02), bone: "head", colour: FROST, tipColour: LIT, split: 0.5, up: [0, 1, 0] }))];
    const armour = [{ from: 1.0, to: 3.4, round: [0.7, 1.9], lames: 3, thick: 0.022, step: 0.012, colour: ICE, rim: "#dff1ff", runes: { colour: LIT } }];
    return cat("snowleopard-legend", q, [t, beads], springs({ lively: 0.75, tails: [t.chain] }), { cones: [...frost, ...whiskers(P, "#ffffff", 1.5)], armour }, rosettes({ sparse: 0.45 }));
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs snowleopard`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "snowleopard", heights: [55, 102, 144, 265], plans: snowleopard };
