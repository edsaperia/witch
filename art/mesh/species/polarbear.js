// The polar bear, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch D: the heavy and the
// gnawing). The pack ice's bear (art/creatures/polarbear/genome.js: "a long-necked white bear, its coat shaggy"; Ed's review,
// 2026-10-13: "less loaf: a longer neck, the head lower and smaller, a higher shoulder"): pear-shaped, heaviest at the haunch,
// a long neck carrying a small wedge of a head low, small ears, great furred feet. Its ladder: a white ball of a cub; a lean
// young one; the ice bear, cream-white with a black nose; and the elder, revered (its genome's brief: "a vast fleece hanging
// off it to the ground, a ruff, frost on its muzzle, a necklace of bronze offerings with a stone at its throat"), with plate
// of old blue ice on its back, a mark lit on each (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso
// with a different colour and glowing runes"). It walks rolling and trots heavily. Metres; y up; its head along +z.
import { band } from "../kit/band.js";
import { trundle } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { plate } from "../kit/plate.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const ICE = { coat: "#f0ece0", belly: "#e2dccb", muzzle: "#e6e0d0", nose: "#141110", upper: "#ece7da", mid: "#e0dac9", sock: "#d6cfbc", eye: "#141110" };
const build = (C, o) => quad({ C, hind: { len: 0.95, thick: 1.9, paw: 1.4, foot: 1.2, ...o.hind }, fore: { len: 0.95, thick: 1.8, paw: 1.45, ...o.fore }, body: { len: 1.15, girth: 1.45, deep: 1.12, tuck: 1.1, rump: 1.28, hump: 0.35, neck: [0.02, 0.26], neckThick: 1.35, white: 0.3, ...o.body },
  head: { size: 1.08, muzzle: 1.15, muzzleWide: 1.25, muzzleDeep: 1.2, wide: 1.0, dome: 0.9, nose: 1.3, cheek: 0, eye: 0.6, ...o.head, ear: { shape: "round", tall: 0.6, wide: 0.7, at: [0.012, -0.016, -0.02], back: C.coat, inner: C.mid, ...o.ear } } });
const stub = (q, C) => tail("tail", "pelvis", q.root, { len: 0.07, r: 0.035, pitch: -0.6, blunt: 0.3, tip: 0, sides: 5, bones: 2, colours: { coat: C.coat, tip: C.coat } });
// (its shaggy coat: locks hanging off its flanks and the backs of its legs' tops)
const fleece = (R, o) => [1, 2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 2, a0: 1.5, a1: 2.3, long: 0.1, sweep: 0.4, droop: 0.8, r: 0.06, flat: 0.5, lock: true, colour: () => "#e6e0d0", tip: () => "#cfc8b4", ...o }));
const heavy = (o = {}) => trundle({ ...o, walk: { seconds: 1.3, ...o.walk, body: { roll: 0.06, sway: 0.05, head: 0.85, ...o.walk?.body } }, run: { seconds: 0.64, duty: 0.36, reach: 1.0, ...o.run, body: { bob: 0.06, pitch: 0.05, ...o.run?.body } } });
const polarbear = {
  // a cub: a white ball with black eyes and nose, short-necked yet
  baby() {
    const C = { ...ICE, coat: "#f7f4ec", upper: "#f7f4ec" }, q = build(C, { hind: { len: 0.56, thick: 2.0 }, fore: { len: 0.56, thick: 1.95 }, body: { len: 0.68, girth: 1.3, deep: 1.05, rump: 1.15, hump: 0, neck: [0.03, 0.1], neckThick: 1.3 }, head: { size: 1.45, muzzle: 0.7, eye: 0.95 }, ear: { tall: 0.8, wide: 0.9 } }), t = stub(q, C);
    return plan("polarbear-baby", q.body, q.skull, [...q.legs, t], heavy({ lively: 1.3, tails: [t.chain] }));
  },
  // a young bear: lean and long, its neck coming
  young() {
    const q = build(ICE, { hind: { thick: 1.5 }, fore: { thick: 1.45 }, body: { len: 1.05, girth: 1.18, deep: 1.02, rump: 1.15, hump: 0.15, neck: [0.03, 0.2], neckThick: 1.2 }, head: { size: 1.02 } }), t = stub(q, ICE);
    return plan("polarbear-young", q.body, q.skull, [...q.legs, t], heavy({ lively: 1.1, tails: [t.chain] }));
  },
  // the ice bear: a great pear of a body behind a long low neck, shaggy at the flank, dark claws on furred feet
  adult() {
    const claws = { colour: "#3a3430", len: 1.0, thick: 1.4 }, q = build(ICE, { hind: { claws }, fore: { claws } }), t = stub(q, ICE);
    return plan("polarbear-adult", q.body, q.skull, [...q.legs, t], heavy({ tails: [t.chain] }), { cones: fleece(q.R, {}) });
  },
  // the elder, revered: its fleece hanging to the ground, a ruff, frost blue on its muzzle and its eyes lit pale; a bronze
  // ring of offerings round its neck, a stone at its throat; plate of old blue ice over its back, a mark lit on each
  legend() {
    const LIT = "#9af2ff", FROST = "#bfe4f2", BLUE = "#6fa8c9", DEEP = "#3d6d8f", BRONZE = "#b9722e", C = { ...ICE, coat: "#e9e6de", muzzle: FROST, sock: "#c9d6dc", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const claws = { colour: "#2a2624", len: 1.8, thick: 1.7, wide: 1.2 }, q = build(C, { hind: { thick: 2.1, knob: 1.15, claws }, fore: { len: 1.0, thick: 2.0, knob: 1.15, claws }, body: { len: 1.22, girth: 1.6, deep: 1.18, hump: 0.8, rump: 1.35, neck: [0.0, 0.3], neckThick: 1.5 }, head: { size: 1.15, muzzle: 1.25 }, ear: { torn: 1 } }), R = q.R, t = stub(q, C);
    const hang = [...fleece(R, { n: 4, a0: 0.9, a1: 2.3, long: 0.11, grow: 0.3, sweep: 0.6, droop: 0.6, r: 0.1, flat: 0.6, colour: k => (k % 2 ? "#dcd7ca" : "#ece8dc"), tip: () => "#d6d2c6" }), ...tufts(R[5], "neck", { n: 4, a0: 0.3, a1: 2.6, long: 0.1, sweep: 0.6, droop: 0.45, r: 0.09, flat: 0.6, lock: true, colour: () => "#f2efe6", tip: () => "#dfe9ec" })];
    const ring = band("neck", R[5].at, R[6].at, { at: 0.75, r: R[6].rx * 1.12, ry: R[6].ry * 1.12, wide: 0.024, colour: BRONZE });
    const stone = plate("neck", [0, R[6].at[1] - R[6].ry * 1.05, R[6].at[2] - 0.01], [0, -0.7, 0.7], { r: 0.035, high: 0.022, colour: DEEP, rim: BRONZE, gem: { colour: LIT }, up: [1, 0, 0] });
    const armour = [{ from: 1.2, to: 4.6, round: [0, 1.25], lames: 4, thick: 0.024, step: 0.012, colour: BLUE, rim: DEEP, runes: { colour: LIT } }];
    return plan("polarbear-legend", q.body, q.skull, [...q.legs, t, ring, stone], heavy({ lively: 0.75, tails: [t.chain] }), { cones: hang, armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "polarbear", heights: [72, 111, 159, 265], plans: polarbear };
