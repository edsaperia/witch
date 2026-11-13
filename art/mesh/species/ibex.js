// The ibex, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch C: the hoofed; proposals till
// Ed passes them). The crags' wild goat (its genome's brief, art/creatures/ibex/genome.js): "a stocky wild goat, dark-legged and
// bearded, its horns sweeping back in long knobbled scimitars; a hornless kid, a young with short horns, an adult with great
// ridged horns, and the elder the peaks' oldest, horns vast and knobbled, bearded, lichened, stone beads" (and its legend's
// crystals: here ice on its horns' points), with glacier-slate plate on its back (Ed, 2026-11-12: "Armour should just be
// thickened polygons on their torso with a different colour and glowing runes"). It stots at speed (kit/stot.js): a goat's
// spring from ledge to ledge. Metres; y up; its head along +z.
import { hooves } from "../kit/hooves.js";
import { horns } from "../kit/horns.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { stots } from "../kit/stot.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const DARK = "#3b2c22", HOOF = "#1c1613", WHITE = "#efe8d8", IBEX = { coat: "#9c7b55", back: "#5e4632", belly: WHITE, muzzle: "#6e553d", nose: "#17110f", upper: "#7a5c40", mid: DARK, sock: DARK };
// (a goat lies with its forelegs folded under it, knees forward: art/mesh/gear.js reads gait.lie)
const COUCHED = { fore: [-1.35, 2.5, 0.2], hind: [-0.95, 2.2, -1.25] };
const build = (C, o) => { const q = quad({ C, hind: { len: 1.12, thick: 1.0, ...o.hind }, fore: { len: 1.15, thick: 0.98, ...o.fore }, body: { len: 1.0, girth: 1.22, deep: 1.18, tuck: 0.9, neck: [0.2, 0.13], neckThick: 1.25, white: 0.3, ...o.body },
  head: { size: 1.05, muzzle: 0.95, muzzleDeep: 1.15, cheek: 0, eye: 1.05, ...o.head, ear: { shape: "long", tall: 0.6, wide: 1.1, splay: 1.1, lean: 0.6, at: [0.012, -0.03, -0.015], back: C.coat, inner: "#d9b9a0", ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: HOOF }) }; };
const flag = (q, C) => tail("tail", "pelvis", q.root, { len: 0.11, r: 0.03, pitch: 0.5, tip: 0.5, blunt: 0.2, sides: 5, colours: { coat: C.coat, tip: DARK } });
const beard = (P, colour, tipColour, long = 1) => ({ at: P(0, -0.035, 0.19), rx: 0.026, ry: 0.026, tip: P(0, -0.07 - 0.11 * long, 0.15), bone: "head", colour, tipColour, split: 0.5, bulge: 0.7, up: [0, 0, 1] });
const ibex = {
  // a kid: hornless, big-eared, a goat's upright flag of a tail
  baby() {
    const C = { ...IBEX, coat: "#b08c62", back: undefined, upper: "#b08c62", mid: "#6e553d", sock: "#4a382c" }, q = build(C, { hind: { len: 0.82, thick: 1.05 }, fore: { len: 0.84, thick: 1.02 }, body: { len: 0.64, girth: 1.05, neck: [0.13, 0.09], neckThick: 1.05 }, head: { size: 1.28, muzzle: 0.7, eye: 1.5 }, ear: { tall: 0.95 } });
    const t = flag(q, C);
    return plan("ibex-baby", q.body, q.skull, [...q.legs, t], stots({ lively: 1.3, lie: COUCHED, tails: [t.chain] }));
  },
  // a young one: short back-curved horns, the dark stripe down its back coming in
  young() {
    const q = build(IBEX, { hind: { len: 1.08, thick: 0.9 }, fore: { len: 1.1, thick: 0.88 }, body: { len: 0.9, girth: 1.05, neckThick: 1.05 }, head: { size: 1.0 } }), t = flag(q, IBEX);
    return plan("ibex-young", q.body, q.skull, [...q.legs, t, horns(q.P, { len: 0.3, r: 0.024, p0: 1.4, curl: 0.8, out: [0.12, 0.2], n: 8 })], stots({ lively: 1.1, lie: COUCHED, tails: [t.chain] }));
  },
  // the buck: great ridged scimitars sweeping back over its shoulders, a beard, a heavy neck
  adult() {
    const q = build(IBEX, { body: { girth: 1.3, deep: 1.25, hump: 0.3, neckThick: 1.45 }, head: { size: 1.1 } }), t = flag(q, IBEX);
    const sweepBack = horns(q.P, { len: 0.78, r: 0.036, p0: 1.4, curl: 1.55, out: [0.1, 0.3], n: 18, knob: 0.22, tip: "#b9a98c" });
    return plan("ibex-adult", q.body, q.skull, [...q.legs, t, sweepBack], stots({ lie: COUCHED, tails: [t.chain] }), { cones: [beard(q.P, DARK, "#6e553d")] });
  },
  // the peaks' oldest: grey as its rock and patched with lichen, a beard to its knees, stone beads on its legs; horns vast and
  // knobbled, longer than its back, ice lit on their points; glacier-slate plate on its back, an ice-blue mark lit on each
  legend() {
    const ICE = "#a8ecff", SLATE = "#3d4856", FROST = "#d3e6f0", LICHEN = "#b7c26a", STONE = "#8d9398", C = { coat: "#8f8a80", back: "#4c4740", belly: "#e3e0d6", muzzle: "#b9b4a8", nose: "#17110f", upper: "#6f6a62", mid: "#3a3632", sock: "#2c2926", eyes: [{ colour: ICE, glow: true }, { colour: ICE, glow: true }] };
    const q = build(C, { hind: { len: 1.3, thick: 1.05, knob: 1.35, band: { colour: STONE, at: 0.32, r: 0.042 } }, fore: { len: 1.36, thick: 1.02, knob: 1.35, band: { colour: STONE, at: 0.32, r: 0.042 } }, body: { len: 1.08, girth: 1.32, deep: 1.38, tuck: 0.72, hump: 0.8, neck: [0.22, 0.17], neckThick: 1.5 }, head: { size: 1.28, muzzle: 1.1, muzzleDeep: 1.3, eye: 1.2 }, ear: { torn: 1 } }), R = q.R, P = q.P, t = flag(q, C);
    const great = horns(P, { len: 1.08, r: 0.052, p0: 1.42, curl: 1.9, out: [0.1, 0.34], n: 30, knob: 0.3, colour: "#4f4a44", ridge: "#8a857a", glow: ICE });
    const lichen = [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 0.6, a1: 1.7, long: 0.07, sweep: 0.5, droop: 0.5, r: 0.055, flat: 0.35, colour: () => LICHEN, tip: () => "#dfe6a0" }));
    const mane = tufts(R[5], "neck", { n: 4, a0: 1.3, a1: 3.05, long: 0.2, sweep: 0.3, droop: 0.7, r: 0.07, lock: true, colour: () => "#e3e0d6", tip: () => "#8f8a80" });
    const armour = [{ from: 1.2, to: 4.35, round: [0, 1.55], lames: 4, thick: 0.022, step: 0.012, colour: SLATE, rim: FROST, runes: { colour: ICE } }];
    return plan("ibex-legend", q.body, q.skull, [...q.legs, t, great], stots({ lively: 0.75, lie: COUCHED, tails: [t.chain] }), { cones: [beard(P, "#e3e0d6", "#8f8a80", 2.2), ...lichen, ...mane], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "ibex", heights: [55, 99, 161, 397], plans: ibex };
