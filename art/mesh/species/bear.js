// The black bear, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch D: the heavy and the
// gnawing). The cold rainforest's bear (art/creatures/bear/genome.js: "black, a tan muzzle, tall ears, no grizzly's shoulder
// hump"): a heavy barrel on thick flat-footed legs, a broad head with a blunt tan muzzle, round ears stood well up, a stub of
// a tail. Its ladder: a round cub that is all head and ears; a rangy young one; the black bear, glossy, a pale crescent on its
// chest; and the elder of the rainforest, vast and grey-muzzled, moss and lichen hanging off its shoulders, claws like hooks,
// cedar-bark plate on its back with a green mark lit on each (Ed, 2026-11-12: "Armour should just be thickened polygons on their
// torso with a different colour and glowing runes"). It walks rolling and trots heavily. Metres; y up; its head along +z.
import { trundle } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const TAN = "#b08a5e", BEAR = { coat: "#221d1c", belly: "#2b2523", muzzle: TAN, nose: "#0d0b0b", upper: "#221d1c", mid: "#1c1817", sock: "#141110", eye: "#0d0b0b" };
const build = (C, o) => quad({ C, hind: { len: 0.9, thick: 1.75, paw: 1.25, foot: 1.2, ...o.hind }, fore: { len: 0.92, thick: 1.8, paw: 1.3, ...o.fore }, body: { len: 1.02, girth: 1.5, deep: 1.18, tuck: 1.05, rump: 1.12, neck: [0.0, 0.15], neckThick: 1.6, white: 0.1, ...o.body },
  head: { size: 1.3, muzzle: 0.85, muzzleWide: 1.35, muzzleDeep: 1.3, wide: 1.15, dome: 1.05, nose: 1.25, cheek: 0, eye: 0.62, ...o.head, ear: { shape: "round", tall: 1.0, wide: 0.95, at: [0.012, -0.012, -0.012], back: C.coat, inner: C.mid, ...o.ear } } });
const stub = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.07, r: 0.035, pitch: -0.5, blunt: 0.3, tip: 0, sides: 5, bones: 2, colours: { coat: C.coat, tip: C.coat }, ...o });
// (the pale crescent on its chest: a few pale locks across the front of its shoulders)
const crescent = (R, colour, o = {}) => tufts(R[5], "neck", { n: 2, a0: 2.5, a1: 2.95, long: 0.07, sweep: 0.1, droop: 0.5, r: 0.045, flat: 0.5, lock: true, colour: () => colour, ...o });
const heavy = (o = {}) => trundle({ ...o, walk: { seconds: 1.25, ...o.walk, body: { roll: 0.06, sway: 0.045, ...o.walk?.body } }, run: { seconds: 0.62, duty: 0.36, reach: 1.0, ...o.run, body: { bob: 0.06, pitch: 0.05, ...o.run?.body } } });
const bear = {
  // a cub: round, all head and ears, on short thick legs
  baby() {
    const C = { ...BEAR, coat: "#2e2725", upper: "#2e2725", muzzle: "#c4a077" }, q = build(C, { hind: { len: 0.56, thick: 1.9 }, fore: { len: 0.56, thick: 1.9 }, body: { len: 0.66, girth: 1.3, deep: 1.05, neck: [0.02, 0.09], neckThick: 1.3 }, head: { size: 1.55, muzzle: 0.6, eye: 1.0 }, ear: { tall: 1.25, wide: 1.2 } }), t = stub(q, C, { len: 0.04 });
    return plan("bear-baby", q.body, q.skull, [...q.legs, t], heavy({ lively: 1.3, tails: [t.chain] }));
  },
  // a young bear: rangy and long-legged, its ears still too big for it
  young() {
    const q = build(BEAR, { hind: { len: 0.92, thick: 1.45 }, fore: { len: 0.94, thick: 1.5 }, body: { len: 0.95, girth: 1.22, deep: 1.05, neckThick: 1.35 }, head: { size: 1.15, muzzle: 0.8 }, ear: { tall: 1.15 } }), t = stub(q, BEAR);
    return plan("bear-young", q.body, q.skull, [...q.legs, t], heavy({ lively: 1.1, tails: [t.chain] }));
  },
  // the black bear: a glossy barrel, a broad head and a tan muzzle, a pale crescent on its chest, pale claws
  adult() {
    const claws = { colour: "#cfc6b4", len: 1.1, thick: 1.4 }, q = build(BEAR, { hind: { claws }, fore: { claws }, body: { hump: 0.2 } }), t = stub(q, BEAR);
    return plan("bear-adult", q.body, q.skull, [...q.legs, t], heavy({ tails: [t.chain] }), { cones: crescent(q.R, "#e6dcc6") });
  },
  // the elder of the rainforest: vast, its muzzle gone grey, one eye lit green; moss and lichen hanging off its shoulders and
  // flanks, claws like hooks; cedar-bark plate over its back, a green mark lit on each
  legend() {
    const MOSS = "#5f8a3a", LICHEN = "#a9c27a", LIT = "#9dff8a", BARK = "#5a3626", EDGE = "#2c1a12", C = { ...BEAR, coat: "#1b1a1c", muzzle: "#9a938a", upper: "#1b1a1c", eyes: [{ colour: LIT, glow: true }, { colour: "#d9d2c2" }] };
    const claws = { colour: "#d9d0b8", len: 2.4, thick: 1.8, wide: 1.2 }, q = build(C, { hind: { len: 0.95, thick: 1.9, knob: 1.15, claws: { ...claws, len: 1.5 } }, fore: { len: 1.0, thick: 2.05, paw: 1.45, knob: 1.15, claws }, body: { len: 1.1, girth: 1.7, deep: 1.25, hump: 0.9, neck: [-0.03, 0.17], neckThick: 1.8 }, head: { size: 1.42, muzzle: 0.95 }, ear: { torn: -1 } }), R = q.R, P = q.P, t = stub(q, C);
    const shag = [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 0.5, a1: 1.9, long: 0.11, sweep: 0.55, droop: 0.6, r: 0.085, flat: 0.55, lock: true, colour: k => (k % 2 ? MOSS : "#3f5f2c"), tip: () => LICHEN }));
    const ruff = tufts(R[5], "neck", { n: 3, a0: 0.4, a1: 2.3, long: 0.13, sweep: 0.5, droop: 0.5, r: 0.07, flat: 0.5, lock: true, colour: () => "#2a282a", tip: () => "#8c877f" });
    const scars = [[0.05, 0.07, 0.12], [-0.03, 0.05, 0.17]].map(([x, y, z]) => ({ at: P(x, y, z), rx: 0.007, ry: 0.005, tip: P(x * 1.2, y - 0.07, z + 0.05), bone: "head", colour: "#b9a79a", up: [0, 0, 1], sides: 3 }));
    const armour = [{ from: 1.2, to: 4.6, round: [0, 1.35], lames: 4, thick: 0.026, step: 0.013, colour: BARK, rim: EDGE, runes: { colour: LIT } }];
    return plan("bear-legend", q.body, q.skull, [...q.legs, t], heavy({ lively: 0.75, tails: [t.chain] }), { cones: [...shag, ...ruff, ...scars, ...crescent(R, "#cfd8b8", { long: 0.1 })], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "bear", heights: [72, 112, 160, 265], plans: bear };
