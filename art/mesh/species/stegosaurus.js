// The stegosaurus, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built
// from what batches A to G made; this one on batch D's rhino). The volcano's (Ed, 2026-10-12: "stegosaurus (good for volcano)";
// art/creatures/stegosaurus/genome.js: "a heavy, high-hipped plant-eater, its small head low, two rows of plates along its back
// and a thagomizer of four spikes; a legend's plates veined with lava"): a barrel highest over its hips on pillar hind legs and
// short forelegs, a small head carried near the ground, a heavy tail held out level. Its plates are kit/backplates.js and its
// spikes kit/thagomizer.js. Its elder (its genome's brief): "plates of obsidian veined with lava, chipped by ages, old scars
// across its flank, ash-grey frost on its muzzle, moss in its folds, a gold ring offered round each spike, one spike broken
// short", with basalt plate down its flanks, a mark lit on each (Ed, 2026-11-12: "Armour should just be thickened polygons on
// their torso with a different colour and glowing runes"). Asleep it lies on its belly at every level: its plates won't let it
// onto its side. Metres; y up; its head along +z.
import { alongBack, alongTail, backPlates } from "../kit/backplates.js";
import { trundle } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { thagomizer } from "../kit/thagomizer.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const SPIKE = "#e6dcc2", NAIL = "#c9c0a8", STEG = { coat: "#7f7a4e", belly: "#cdbf8c", muzzle: "#8f8a5e", nose: "#4d4a30", upper: "#77724a", mid: "#6a6542", sock: "#59553a", eye: "#17130f" };
const nails = { colour: NAIL, len: 0.45, thick: 2.0, wide: 1.3 };
const build = (C, o) => quad({ C, hind: { len: 1.12, thick: 1.75, paw: 1.3, foot: 0.8, claws: nails, ...o.hind }, fore: { len: 0.66, thick: 1.9, paw: 1.3, foot: 0.8, claws: nails, ...o.fore }, body: { len: 1.2, girth: 1.65, deep: 1.25, tuck: 1.12, rump: 1.25, arch: 0.8, neck: [-0.06, 0.2], neckThick: 0.95, white: 0.3, ...o.body },
  head: { size: 0.82, muzzle: 1.25, muzzleWide: 0.95, muzzleDeep: 0.9, wide: 0.8, dome: 0.78, nose: 0.9, cheek: 0, eye: 0.8, ...o.head, ear: { shape: "round", tall: 0.05, wide: 0.3, back: C.coat, inner: C.coat } } });
const tailOf = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.8, r: 0.115, pitch: -0.12, curl: 0.2, tip: 0, blunt: 0.08, sides: 7, bones: 5, colours: { coat: C.coat, under: C.belly, tip: C.coat }, ...o });
// (its plates: small on its tail, the tallest over its hips, small again on its neck)
const bell = t => 0.3 + 0.7 * Math.sin(Math.PI * Math.min(1, Math.max(0, t * 0.9 + 0.08))) ** 1.3;
const plates = (q, t, o) => backPlates([...alongTail(t, 1, 5), ...alongBack(q.R, BONES, { from: 1, to: 6, n: o.n ?? 2 })], { size: bell, ...o });
const slow = (o = {}) => trundle({ sleep: "sphinx", ...o, walk: { seconds: 1.4, ...o.walk, body: { roll: 0.035, sway: 0.03, bob: 0.025, ...o.walk?.body } }, run: { seconds: 0.66, duty: 0.4, reach: 0.9, ...o.run, body: { bob: 0.045, pitch: 0.03, ...o.run?.body } } });
const stegosaurus = {
  // a hatchling: round, big-eyed, a row of buds where its plates will be, no spikes yet
  baby() {
    const C = { ...STEG, coat: "#9a9560", upper: "#9a9560", mid: "#878252" }, q = build(C, { hind: { len: 0.7, thick: 1.8 }, fore: { len: 0.46, thick: 1.9 }, body: { len: 0.74, girth: 1.3, arch: 0.5, neck: [0, 0.12], neckThick: 1.0 }, head: { size: 1.2, muzzle: 0.8, eye: 1.4 } }), t = tailOf(q, C, { len: 0.4, r: 0.08 });
    return plan("stegosaurus-baby", q.body, q.skull, [...q.legs, t, plates(q, t, { n: 1, high: 0.05, long: 0.04, colour: "#c0733a", tip: "#e0a060" })], slow({ lively: 1.3, tails: [t.chain] }));
  },
  // a young one: leggy, its plates small and bright, two short spikes
  young() {
    const q = build(STEG, { hind: { len: 1.0, thick: 1.5 }, fore: { len: 0.6, thick: 1.6 }, body: { len: 1.02, girth: 1.35 }, head: { size: 0.9 } }), t = tailOf(q, STEG, { len: 0.66, r: 0.095 });
    return plan("stegosaurus-young", q.body, q.skull, [...q.legs, t, plates(q, t, { high: 0.14, long: 0.075, colour: "#b8612f", rim: "#8a5a32", tip: "#e39a4c" }), thagomizer(t, { pairs: 1, from: 0.85, len: 0.1, r: 0.018, colour: SPIKE })], slow({ lively: 1.1, tails: [t.chain] }));
  },
  // the stegosaurus: two rows of tall rust-red plates, four long spikes on its tail
  adult() {
    const q = build(STEG, {}), t = tailOf(q, STEG);
    return plan("stegosaurus-adult", q.body, q.skull, [...q.legs, t, plates(q, t, { high: 0.25, long: 0.11, colour: "#a84f2a", rim: "#7a5230", tip: "#e08a3c" }), thagomizer(t, { colour: SPIKE, tip: "#fff6e0", len: 0.19 })], slow({ tails: [t.chain] }));
  },
  // the volcano's old survivor: plates of obsidian veined with lava and chipped by ages, a gold ring round each spike and one
  // spike broken short, ash on its muzzle, moss in its folds, its eyes lit; basalt plate down its flanks, a lava mark lit on each
  legend() {
    const LAVA = "#ff7a2a", OBSIDIAN = "#221d24", BASALT = "#3a363c", GOLD = "#e9b949", C = { ...STEG, coat: "#5f5a44", upper: "#59543f", mid: "#4e4a38", sock: "#403d2f", muzzle: "#a9a8a2", belly: "#a89c78", eyes: [{ colour: LAVA, glow: true }, { colour: LAVA, glow: true }] };
    const q = build(C, { hind: { len: 1.22, thick: 1.9, knob: 1.15 }, fore: { len: 0.74, thick: 2.05, knob: 1.15 }, body: { len: 1.3, girth: 1.85, deep: 1.3, arch: 1.0 }, head: { size: 0.95 } }), R = q.R, t = tailOf(q, C, { len: 0.95, r: 0.135, bones: 6 });
    const moss = [2, 3].flatMap(i => tufts(R[i], BONES[i], { n: 2, a0: 1.5, a1: 2.1, long: 0.06, sweep: 0.5, droop: 0.6, r: 0.06, flat: 0.5, lock: true, colour: () => "#5f7a3a", tip: () => "#a9c27a" }));
    const armour = [{ from: 1.0, to: 4.6, round: [0.5, 1.75], lames: 4, thick: 0.03, step: 0.014, colour: BASALT, rim: "#17141a", runes: { colour: LAVA } }];
    return plan("stegosaurus-legend", q.body, q.skull, [...q.legs, t, plates(q, t, { high: 0.33, long: 0.14, thin: 0.016, colour: OBSIDIAN, rim: "#3a3038", tip: "#4a3a44", vein: LAVA, chips: [5, 10] }), thagomizer(t, { colour: "#cfc4a8", tip: "#fff6e0", len: 0.26, r: 0.028, band: GOLD, broken: 1 })], slow({ lively: 0.7, tails: [t.chain] }), { cones: moss, armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs stegosaurus`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "stegosaurus", heights: [91, 166, 248, 373], plans: stegosaurus };
