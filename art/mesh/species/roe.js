// The roe deer, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch C: the hoofed; proposals
// till Ed passes them). The mossy dell's small, slight deer (its genome's brief, art/creatures/roe/genome.js): all ears and
// eyes, a white rump and a black nose, no tail to speak of; the buck's short upright three-tined antlers. A dappled fawn; a
// young buck with two buttons of antler; the buck; and the elder of the roe: "an ancient buck grown tall and grey-muzzled, its
// antlers the old bucks' perruque, heavy, many-tined and furred with moss, a pale winter ruff at its throat, moss on its flanks
// from lying out for ages in the dell, and bead offerings bound round its legs", with birch-bark plate on its back (Ed,
// 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and glowing runes").
// It stots at speed (kit/stot.js). Metres; y up; its head along +z.
import { antlers, TINES } from "../kit/antlers.js";
import { hooves } from "../kit/hooves.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { rump, spots } from "../kit/spots.js";
import { stots } from "../kit/stot.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#120e0c", HOOF = "#241b15", WHITE = "#f6f1e6", ROE = { coat: "#b56f38", belly: WHITE, nose: NOSE, upper: "#b56f38", mid: "#a2612f", sock: "#8a5228" };
// (a deer lies with its forelegs folded under it, knees forward: art/mesh/gear.js reads gait.lie)
const COUCHED = { fore: [-1.35, 2.5, 0.2], hind: [-0.95, 2.2, -1.25] };
const build = (C, o) => { const q = quad({ C, hind: { len: 1.36, thick: 0.52, ...o.hind }, fore: { len: 1.4, thick: 0.5, ...o.fore }, body: { len: 0.92, girth: 0.96, deep: 1.02, tuck: 0.74, arch: 0.3, neck: [0.3, 0.13], neckThick: 0.82, white: 0.4, ...o.body },
  head: { size: 1.08, muzzle: 0.95, muzzleWide: 0.9, cheek: 0, eye: 1.6, nose: 1.2, ...o.head, ear: { shape: "long", tall: 1.25, wide: 1.3, splay: 0.6, lean: 0.25, back: C.coat, inner: "#f0dccb", tip: "#3a2a20", ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: HOOF }) }; };
const roe = {
  // a fawn: tiny and dappled, ears as big as its face
  baby() {
    const C = { ...ROE, coat: "#a8663a", upper: "#a8663a", mid: "#a8663a" }, q = build(C, { hind: { len: 0.95, thick: 0.62 }, fore: { len: 0.98, thick: 0.6 }, body: { len: 0.62, girth: 0.9, neck: [0.17, 0.09], neckThick: 0.9 }, head: { size: 1.3, muzzle: 0.7, eye: 2.0 }, ear: { tall: 1.3 } });
    return plan("roe-baby", q.body, q.skull, q.legs, stots({ lively: 1.3, lie: COUCHED }), { cones: spots(q.R, BONES, { colour: WHITE, r: 0.012 }) });
  },
  // a young buck: slight and long-necked, two buttons of antler
  young() {
    const q = build(ROE, { hind: { len: 1.25, thick: 0.5 }, fore: { len: 1.28, thick: 0.48 }, body: { len: 0.85, girth: 0.88 }, head: { size: 1.02 } });
    return plan("roe-young", q.body, q.skull, [...q.legs, antlers(q.P, { kind: "spike", size: 0.26, spread: 0.3, lean: 0.3 })], stots({ lively: 1.1, lie: COUCHED }), { cones: [rump(q.R, WHITE)] });
  },
  // the buck: short rough three-tined antlers standing straight up, the white rump, a white chin under the black nose
  adult() {
    const C = { ...ROE, muzzle: "#8a5228" }, q = build(C, { body: { girth: 1.02, deep: 1.1, neckThick: 0.95 } });
    return plan("roe-adult", q.body, q.skull, [...q.legs, antlers(q.P, { kind: "roe", size: 0.62, spread: 0.4, lean: 0.35, r: 0.026, colour: "#a08a66" })], stots({ lie: COUCHED }), { cones: [rump(q.R, WHITE, 1.1)] });
  },
  // the elder of the roe: tall, grizzled and grey-muzzled; perruque antlers, heavy and many-tined and furred with moss; a pale
  // winter ruff; moss on its flanks; beads bound on its legs; birch-bark plate on its back, a green mark lit on each
  legend() {
    const LEAF = "#9df07a", BARK = "#e9e4d6", SCAR = "#3b3a35", MOSS = "#4f7a3a", C = { coat: "#93795e", back: "#6f5b47", belly: "#efe9dc", muzzle: "#b9b2a6", nose: NOSE, upper: "#93795e", mid: "#7a6450", sock: "#54463a", eyes: [{ colour: LEAF, glow: true }, { colour: LEAF, glow: true }] };
    const q = build(C, { hind: { len: 1.62, thick: 0.56, knob: 1.35, band: { colour: "#c4553a", at: 0.3, r: 0.05 } }, fore: { len: 1.7, thick: 0.54, knob: 1.35, band: { colour: "#4f8fb0", at: 0.3, r: 0.05 } }, body: { len: 1.0, girth: 1.0, deep: 1.25, tuck: 0.6, hump: 0.5, neck: [0.4, 0.17], neckThick: 1.0 }, head: { size: 1.2, muzzle: 1.1, eye: 1.5 }, ear: { tall: 1.5, torn: 1 } }), R = q.R;
    const wig = antlers(q.P, { kind: "roe", size: 0.95, spread: 0.55, lean: 0.4, r: 0.034, colour: "#6f6a4c", tip: "#d9d2b8", glow: LEAF, moss: { colour: MOSS, tip: "#7ba24c" }, tines: [...TINES.roe, [0.2, [0.8, 0.5, 0.5], 0.2], [0.34, [-0.6, 0.6, 0.6], 0.2], [0.6, [1, 0.6, -0.2], 0.24], [0.86, [-0.4, 1, 0.3], 0.2], [0.9, [0.6, 0.9, 0.5], 0.18]] });
    const ruff = tufts(R[5], "neck", { n: 5, a0: 1.1, a1: 3.05, long: 0.17, sweep: 0.35, droop: 0.6, r: 0.06, lock: true, colour: () => "#efe9dc", tip: () => "#b9b2a6" });
    const moss = [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 0.5, a1: 1.5, long: 0.09, sweep: 0.5, droop: 0.7, r: 0.05, flat: 0.4, colour: () => MOSS, tip: () => "#7ba24c" }));
    const armour = [{ from: 1.3, to: 4.3, round: [0, 1.5], lames: 3, thick: 0.02, step: 0.01, colour: BARK, rim: SCAR, runes: { colour: LEAF } }];
    return plan("roe-legend", q.body, q.skull, [...q.legs, wig], stots({ lively: 0.75, lie: COUCHED }), { cones: [rump(R, "#efe9dc", 1.1), ...ruff, ...moss], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "roe", heights: [51, 78, 115, 363], plans: roe };
