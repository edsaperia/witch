// The wolf, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its ladder is the wolf's own
// (docs/art-guide/EVOLUTIONS.md and art/creatures/wolf/genome.js): a round pup with big paws and floppy ears, a lanky young, an
// adult with a heavy shaggy mane over its shoulders, and the legend: shoulders twice its hips, a mane of spiky locks, pale
// spirit-fire along its spine, glowing eyes and frost on its muzzle. A fox's build made bigger in the chest and longer in the leg
// and muzzle; it trots.
import { trots } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#14100f", DARK = "#4d4a49", PALE = "#e6e0d4";
const WOLF = { coat: "#8b8883", back: DARK, belly: PALE, nose: NOSE, upper: "#8b8883", mid: "#a9a59c", sock: "#d6cfc1", eye: "#d9a520", cheek: PALE };
const build = (C, o) => quad({ C, hind: { len: 1.2, thick: 1.0, ...o.hind }, fore: { len: 1.2, thick: 1.0, ...(o.fore ?? o.hind) }, body: { len: 1.1, girth: 1.1, deep: 1.2, tuck: 0.7, neck: [0.17, 0.17], neckThick: 1.2, white: 0.35, ...o.body },
  head: { size: 1.12, muzzle: 1.2, muzzleWide: 1.15, muzzleDeep: 1.1, cheek: 0.8, eye: 1.0, ...o.head, ear: { tall: 0.95, wide: 1.0, back: DARK, ...o.ear } } });
const wolf = {
  // a round pup: big paws, floppy ears, a stub of a tail
  baby() {
    const C = { ...WOLF, coat: "#77706a", upper: "#77706a", mid: "#77706a", sock: "#8d857c", back: undefined, eye: NOSE }, q = build(C, { hind: { len: 0.5, thick: 2.0, paw: 1.35 }, body: { len: 0.56, girth: 1.12, deep: 0.95, tuck: 1.05, neck: [0.07, 0.07], white: 0.3 }, head: { size: 1.42, muzzle: 0.55, cheek: 0.3, eye: 1.5 }, ear: { shape: "round", tall: 1.25, wide: 1.1, splay: 1.5, lean: 0.5, at: [0.01, -0.02, 0], inner: "#5d5651" } });
    const t = tail("tail", "pelvis", q.root, { len: 0.18, r: 0.05, pitch: -0.2, tip: 0, blunt: 0.3, colours: { coat: C.coat, tip: C.coat } });
    return plan("wolf-baby", q.body, q.skull, [...q.legs, t], trots({ lively: 1.3, tails: [t.chain] }));
  },
  // all leg: lanky and narrow, its ears and feet too big for it
  young() {
    const q = build(WOLF, { hind: { len: 1.3, thick: 0.82, paw: 1.2 }, body: { len: 1.0, girth: 0.82, deep: 1.05, tuck: 0.62, neck: [0.16, 0.16], neckThick: 0.95 }, head: { size: 0.98, muzzle: 1.15, cheek: 0.4 }, ear: { tall: 1.25 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.5, r: 0.07, pitch: -0.7, tip: 0.15, colours: { coat: WOLF.coat, tip: DARK } });
    return plan("wolf-young", q.body, q.skull, [...q.legs, t], trots({ lively: 1.1, tails: [t.chain] }));
  },
  // deep in the chest, a heavy shaggy mane over its neck and shoulders, its tail hung low
  adult() {
    const q = build(WOLF, { hind: { len: 1.25, thick: 1.05 }, body: { len: 1.12, girth: 1.14, deep: 1.28, tuck: 0.66, hump: 0.45, neckThick: 1.4 }, head: { size: 1.14, cheek: 1.4 } }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 0.62, r: 0.1, pitch: -0.8, curl: 0.3, tip: 0.18, colours: { coat: WOLF.coat, under: PALE, tip: DARK } });
    const mane = [5, 4, 3].flatMap((i, k) => tufts(R[i], BONES[i], { n: 4, a0: 0.2, a1: 2.3 - 0.3 * k, long: 0.2 - 0.02 * k, sweep: 0.8, droop: 0.3, r: 0.08, lock: true, colour: j => (j < 2 ? DARK : WOLF.coat), tip: j => (j < 2 ? "#2f2d2d" : PALE) }));
    return plan("wolf-adult", q.body, q.skull, [...q.legs, t], trots({ tails: [t.chain] }), { cones: mane });
  },
  // the winter's own: shoulders twice its hips, a mane of spiked locks, pale fire standing along its spine and its tail, both
  // eyes lit, frost on its muzzle; iron plate on its shoulders and ribs, a cold mark lit on each
  legend() {
    const FIRE = "#bfeaff", FIRE2 = "#f2fbff", FROST = "#e8f4fb", IRON = "#2b3442", C = { ...WOLF, coat: "#6f7076", back: "#34353b", upper: "#6f7076", mid: "#85868c", sock: "#b9bac0", muzzle: FROST, cheek: FROST, eyes: [{ colour: FIRE, glow: true }, { colour: FIRE, glow: true }] };
    const q = build(C, { hind: { len: 1.5, thick: 0.95, knob: 1.3, claws: { colour: "#d9dde2", len: 1 } }, fore: { len: 1.5, thick: 1.15, knob: 1.3, claws: { colour: "#d9dde2", len: 1.1 } }, body: { len: 1.2, girth: 1.25, deep: 1.5, tuck: 0.48, hump: 1.2, rump: 0.82, neck: [0.1, 0.25], neckThick: 1.55 }, head: { size: 1.42, muzzle: 1.4, cheek: 2.0, eye: 1.5 }, ear: { tall: 1.2, torn: 1 } }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 0.85, r: 0.12, pitch: -0.5, curl: 0.5, bones: 5, tip: 0.25, colours: { coat: C.coat, under: "#34353b", tip: FROST }, spikes: { n: 5, colour: FIRE, len: 1, glow: "tip" } });
    const mane = [5, 4, 3].flatMap((i, k) => tufts(R[i], BONES[i], { n: 4, a0: 0.5, a1: 2.4 - 0.3 * k, long: 0.22 - 0.02 * k, sweep: 0.8, droop: 0.2, r: 0.08, grow: 0.3, colour: j => (j < 2 ? "#34353b" : C.coat), tip: j => (j < 2 ? "#5d5f66" : "#a9abb2") }));
    // (the fire along its spine: lit tongues standing off the top of every ring from its neck to its hips)
    const fire = [5, 4, 3, 2, 1].flatMap((i, k) => tufts(R[i], BONES[i], { n: 1, a0: 0.12, long: 0.3 - 0.03 * k, sweep: 0.5, droop: -0.3, r: 0.06, jitter: 0, glow: true, colour: () => FIRE, tip: () => FIRE2 }));
    const armour = [{ from: 2.5, to: 4.75, round: [0.35, 1.8], lames: 3, thick: 0.024, step: 0.012, colour: IRON, rim: "#93a4b8", runes: { colour: FIRE } }];
    return plan("wolf-legend", q.body, q.skull, [...q.legs, t], trots({ lively: 0.75, tails: [t.chain] }), { cones: [...mane, ...fire], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "wolf", heights: [54, 85, 121, 271], plans: wolf };
