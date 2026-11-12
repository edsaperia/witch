// The hedgehog, four levels, as plans for art/mesh/shape.js (the badger, the mole and the hedgehog were drawn together)
// (docs/plans/creature-meshes.md). Low, broad animals on short legs. The badger's ladder is Ed's (docs/art-guide/EVOLUTIONS.md and
// its genome: a cub that's all face, a low wedge of a young, a broad shaggy-plated digger with pale claws, and the elder, grizzled
// and scarred, its stripes running on down its back as chalk hill-figure lines, a bronze torc; with the standing stones of its
// first brief); the mole's and hedgehog's are proposals till he marks them. On his word for the fox (2026-11-11): the adult
// already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces on
// legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { scurry, trot } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const BRONZE = "#b9722e", BRONZE2 = "#e0a04a";

// ---- The hedgehog (hazel forest): the spines, and the ball it rolls into.
const HOG = { coat: "#4f3b2c", belly: "#cfae84", mask: "#cfae84", muzzle: "#cfae84", nose: "#1b1512", upper: "#b89a72", mid: "#a98a62", sock: "#8a6f4c", eye: "#120e0c" };
const urchin = (C, o) => quad({ C, hind: { len: 0.26, thick: 1.5, ...o.hind }, fore: { len: 0.26, thick: 1.4, ...o.fore }, body: { len: 0.62, girth: 1.35, deep: 1.0, tuck: 1.05, hump: 0.5, neck: [0.0, 0.11], neckThick: 1.35, white: 0.55, ...o.body },
  head: { size: 0.98, muzzle: 1.0, muzzleWide: 0.8, muzzleDeep: 0.85, wide: 1.0, cheek: 0, eye: 1.3, nose: 1.2, ...o.head, ear: { shape: "round", tall: 0.6, wide: 0.9, at: [0.012, -0.02, -0.012], back: C.mask, inner: "#e2c6a8" } } });
/** Its coat of spines: rows over every ring from the top down its flanks. */
const spines = (R, o) => (o.rings ?? [1, 2, 3, 4, 5]).flatMap(i => tufts(R[i], BONES[i], { n: o.n ?? 5, a0: 0.12, a1: o.down ?? 1.75, long: o.long * (i === 5 ? 0.75 : 1), sweep: o.sweep ?? 0.6, droop: 0, r: o.r ?? 0.028, sides: 3, jitter: o.jitter ?? 0.35, colour: o.colour ?? (() => "#5a4332"), tip: o.tip ?? (() => "#ecdfc2"), glow: o.glow ?? false }));
const hedgehog = {
  // a pale soft ball with a few short white quills, a big wet nose
  baby() {
    const C = { ...HOG, coat: "#b9a183", belly: "#e6d2b4", mask: "#e6d2b4", muzzle: "#e6d2b4" }, q = urchin(C, { hind: { len: 0.2, thick: 1.6 }, fore: { len: 0.2, thick: 1.5 }, body: { len: 0.45, girth: 1.25 }, head: { size: 1.25, muzzle: 0.7, nose: 1.7, eye: 1.6 } });
    return plan("hedgehog-baby", q.body, q.skull, q.legs, scurry({ seconds: 0.34, sway: 0.05 }), { cones: spines(q.R, { n: 3, long: 0.07, r: 0.026, down: 1.3, sweep: 0.45, colour: () => "#8f7a5e", tip: () => "#ffffff" }) });
  },
  // a full coat of short spines, a pointed snout, quick little legs
  young() {
    const q = urchin(HOG, { body: { len: 0.58, girth: 1.2 } });
    return plan("hedgehog-young", q.body, q.skull, q.legs, scurry({ seconds: 0.36, sway: 0.05 }), { cones: spines(q.R, { n: 5, long: 0.075 }) });
  },
  // long banded spines flared into a fan, a skirt of fur under them, a longer snout
  adult() {
    const q = urchin(HOG, { body: { len: 0.66, girth: 1.45, hump: 0.8 }, head: { size: 1.02, muzzle: 1.2 } }), R = q.R;
    const skirt = [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 2, a0: 1.95, a1: 2.4, long: 0.07, sweep: 0.4, droop: 0.7, r: 0.045, lock: true, colour: () => HOG.belly, tip: () => "#a98a62" }));
    return plan("hedgehog-adult", q.body, q.skull, q.legs, scurry({ seconds: 0.42, sway: 0.05 }), { cones: [...spines(q.R, { n: 6, long: 0.2, sweep: 0.42, r: 0.03, jitter: 0.5, colour: k => (k % 2 ? "#5a4332" : "#3c2c20"), tip: () => "#f3e7c9" }), ...skirt, ...whiskers(q.P, "#e6d2b4", 0.7)] });
  },
  // a walking thicket: spines long as spears, tipped in bronze, every third one's point burning; a silver
  // face, and a bronze collar in lames behind it cut with lit marks
  legend() {
    const LAMP = "#ffd27a", SILVERY = "#d9dde0", C = { ...HOG, coat: "#3a2a20", belly: "#b8a488", mask: SILVERY, muzzle: SILVERY, upper: "#a8906c", mid: "#927a58", eyes: [{ colour: LAMP, glow: true }, { colour: LAMP, glow: true }] };
    const q = urchin(C, { hind: { len: 0.34, thick: 1.6, knob: 1.2, claws: { colour: "#3a2a20", len: 1.2 } }, fore: { len: 0.34, thick: 1.5, knob: 1.2, claws: { colour: "#3a2a20", len: 1.2 } }, body: { len: 0.78, girth: 1.7, hump: 1.2, neck: [0.0, 0.14], neckThick: 1.4 }, head: { size: 1.15, muzzle: 1.35, eye: 1.2 } }), R = q.R, P = q.P;
    const spears = spines(R, { rings: [1, 2, 3, 4], n: 6, long: 0.52, sweep: 0.3, r: 0.034, jitter: 0.95, down: 1.6, colour: k => (k % 2 ? "#4a372a" : "#2f2219"), tip: k => (k % 3 ? BRONZE2 : LAMP), glow: k => (k % 3 ? false : "tip") });
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): a bronze collar in lames between its spines and its face, a lamp-lit mark on each
    const armour = [{ from: 4.55, to: 6.0, round: [0, 2.0], lames: 2, thick: 0.02, step: 0.012, colour: BRONZE, rim: BRONZE2, runes: { colour: LAMP } }];
    const skirt = [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 2, a0: 1.9, a1: 2.4, long: 0.1, sweep: 0.4, droop: 0.7, r: 0.05, lock: true, colour: () => C.belly, tip: () => "#8f7a5c" }));
    return plan("hedgehog-legend", q.body, q.skull, q.legs, scurry({ seconds: 0.85, sway: 0.06, legs: trot(1.05) }), { cones: [...spears, ...skirt, ...whiskers(P, "#e6e9ec", 1.4)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "hedgehog", heights: [47, 74, 103, 347], plans: hedgehog };
