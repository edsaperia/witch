// The boar, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch C: the hoofed; proposals till
// Ed passes them). A wild pig: a wedge, heaviest at the shoulder and narrowing to small hips, its long head carried low and
// ending in a disc of a snout, small ears, a thin tail, tusks. Its ladder is its genome's (art/creatures/boar/genome.js): "a
// round, stubby, banded piglet; the young as it is; a heavy-fronted adult with a shoulder hump, its head low and its tusks
// curving; a massive, top-heavy legend charging head-down with huge curling tusks, pale flames off their tips and a dark shaggy
// mane along its spine and belly" (Ed, 2026-10-05: head down to charge, a battering ram; its eye glints under the hump), with
// rusted iron plate on its back (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different
// colour and glowing runes"). It trots. Metres; y up; its head along +z.
import { trundle } from "../kit/gaits.js";
import { hooves } from "../kit/hooves.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { sweep } from "../kit/sweep.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { tusks } from "../kit/tusks.js";

const NOSE = "#6a4a44", HOOF = "#17110f", BOAR = { coat: "#5a4332", back: "#3a2a20", belly: "#46332a", muzzle: "#3f2e25", nose: NOSE, upper: "#4a372b", mid: "#33261e", sock: "#241a15" };
const build = (C, o) => { const q = quad({ C, hind: { len: 0.82, thick: 1.4, ...o.hind }, fore: { len: 0.9, thick: 1.45, ...o.fore }, body: { len: 1.08, girth: 1.3, deep: 1.25, tuck: 0.95, rump: 0.9, neck: [-0.02, 0.15], neckThick: 1.5, white: 0.15, ...o.body },
  head: { size: 1.22, muzzle: 1.55, muzzleWide: 1.2, muzzleDeep: 1.25, nose: 1.75, dome: 0.92, cheek: 0, eye: 0.75, ...o.head, ear: { tall: 0.62, wide: 0.95, back: C.back ?? C.coat, ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: HOOF, size: 0.9 }) }; };
const whip = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.2, r: 0.016, pitch: -0.7, curl: 0.5, tip: 0.3, blunt: 0.6, sides: 4, colours: { coat: C.coat, tip: C.back ?? C.coat }, ...o });
// (bristles standing along its spine, rump to neck)
const crest = (R, o) => [2, 3, 4, 5].flatMap(i => tufts(R[i], BONES[i], { n: 1, a0: 0.1, long: 0.12, sweep: 0.75, droop: 0, r: 0.05, flat: 0.5, lock: true, ...o }));
const boar = {
  // a piglet: round and stubby, sandy with cream stripes along its back and flanks
  baby() {
    const C = { coat: "#b0834f", back: "#e9d8b0", belly: "#c9a070", muzzle: "#8f6a44", nose: "#c98a80", upper: "#b0834f", mid: "#8f6a44", sock: "#5a4332" }, q = build(C, { hind: { len: 0.5, thick: 1.6 }, fore: { len: 0.52, thick: 1.6 }, body: { len: 0.66, girth: 1.25, deep: 1.05, neck: [0.02, 0.09], neckThick: 1.2 }, head: { size: 1.4, muzzle: 0.85, nose: 1.5, eye: 1.3 }, ear: { tall: 0.8 } }), R = q.R;
    const t = whip(q, C, { len: 0.1 });
    const stripes = [1, -1].flatMap(s => [0.75, 1.35].map(a => sweep("loin", [1, 2, 3, 4].map(i => [R[i].at[0] + s * Math.sin(a) * R[i].rx, R[i].at[1] + Math.cos(a) * R[i].ry, R[i].at[2]]), { r: 0.016, flat: 0.5, colour: "#e9d8b0", sides: 4, up: [s * Math.sin(a), Math.cos(a), 0] })));
    stripes.forEach(l => l.rings.forEach((r, i) => { r.bone = BONES[i + 1]; }));
    return plan("boar-baby", q.body, q.skull, [...q.legs, t, { bones: [], lofts: stripes, cones: [] }], trundle({ lively: 1.3, tails: [t.chain] }));
  },
  // a young boar: rangy, a first bristle of a crest, tusks just showing
  young() {
    const q = build(BOAR, { hind: { len: 0.8, thick: 1.2 }, fore: { len: 0.84, thick: 1.22 }, body: { len: 0.95, girth: 1.12, deep: 1.1, neckThick: 1.3 }, head: { size: 1.1, muzzle: 1.4 } }), t = whip(q, BOAR);
    return plan("boar-young", q.body, q.skull, [...q.legs, t, tusks(q.P, { len: 0.05, r: 0.01, curl: 0.9 })], trundle({ lively: 1.1, tails: [t.chain] }), { cones: crest(q.R, { long: 0.07, r: 0.035, colour: () => "#3a2a20" }) });
  },
  // the boar: all shoulder, a hump under a dark standing crest, its head low, tusks curving up past its snout
  adult() {
    const q = build(BOAR, { fore: { len: 0.95, thick: 1.55 }, body: { girth: 1.4, deep: 1.4, hump: 1.2, tuck: 0.85, rump: 0.85, neck: [-0.06, 0.16], neckThick: 1.65 }, head: { size: 1.3 } }), t = whip(q, BOAR);
    return plan("boar-adult", q.body, q.skull, [...q.legs, t, tusks(q.P, { len: 0.13, r: 0.017, curl: 1.5 })], trundle({ tails: [t.chain] }), { cones: crest(q.R, { long: 0.15, r: 0.06, colour: () => "#2a1e17", tip: () => "#6a5240" }) });
  },
  // the old tusker: black, scarred and top-heavy, its head down under a mountain of shoulder; tusks like sickles with a pale
  // flame on each point, an ember of an eye; a mane down its spine and under its belly; rusted iron plate on its back, an
  // ember-coloured mark lit on each
  legend() {
    const EMBER = "#ff9a3c", FLAME = "#ffe6b0", IRON = "#5a3a30", EDGE = "#1a1210", C = { coat: "#2e2420", back: "#17110f", belly: "#231a17", muzzle: "#4a3a34", nose: "#5a3f3a", upper: "#2a201c", mid: "#1c1512", sock: "#120d0b", eyes: [{ colour: EMBER, glow: true }, { colour: EMBER, glow: true }] };
    const q = build(C, { hind: { len: 0.9, thick: 1.5, knob: 1.2 }, fore: { len: 1.08, thick: 1.7, knob: 1.2 }, body: { len: 1.15, girth: 1.5, deep: 1.6, hump: 2.0, tuck: 0.7, rump: 0.8, neck: [-0.12, 0.17], neckThick: 1.8 }, head: { size: 1.5, muzzle: 1.7, eye: 0.9 }, ear: { torn: 1 } }), R = q.R, P = q.P, t = whip(q, C, { len: 0.3 });
    const sickles = tusks(P, { len: 0.24, r: 0.03, curl: 2.1, out: 0.9, fire: { colour: FLAME, tip: "#ffffff", size: 1.3 } }), upper = tusks(P, { len: 0.09, r: 0.018, curl: 1.4, out: 1.1, at: [0.035, 0.0, 0.17] });
    const mane = [...crest(R, { n: 2, a1: 0.5, long: 0.3, r: 0.085, colour: () => "#17110f", tip: () => "#5a4a40" }), ...[2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 2, a0: 2.7, a1: 3.05, long: 0.16, sweep: 0.4, droop: 0.7, r: 0.06, lock: true, colour: () => "#17110f", tip: () => "#4a3a34" }))];
    const scars = [[0.07, 0.05, 0.12], [-0.06, 0.02, 0.2]].map(([x, y, z]) => ({ at: P(x, y, z), rx: 0.007, ry: 0.005, tip: P(x * 1.3, y - 0.07, z + 0.05), bone: "head", colour: "#c98a80", up: [0, 0, 1], sides: 3 }));
    const armour = [{ from: 1.3, to: 4.5, round: [0, 1.5], lames: 4, thick: 0.026, step: 0.014, colour: IRON, rim: EDGE, runes: { colour: EMBER } }];
    return plan("boar-legend", q.body, q.skull, [...q.legs, t, sickles, upper], trundle({ lively: 0.75, tails: [t.chain] }), { cones: [...mane, ...scars], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "boar", heights: [55, 83, 119, 364], plans: boar };
