// The arctic fox, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its ladder is its genome's
// (art/creatures/arcticfox/genome.js): a small, round, white fox, short-muzzled and short-eared against the cold, a huge thick
// brush; a grey-brown kit, a white young, a ruffed adult, and the elder an old white fox of the long winter, shaggy,
// frost-muzzled, one vast tufted brush swept low, stone beads round its legs. The fox's build made rounder; it trots.
import { trots } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#16100e", WHITE = "#f3f5f7", SHADE = "#d5dde6", SNOW = "#ffffff";
const ARCTIC = { coat: WHITE, belly: SNOW, back: "#e4eaf0", nose: NOSE, upper: WHITE, mid: "#e4eaf0", sock: SHADE, eye: "#3a2a1c", cheek: SNOW };
const build = (C, o) => quad({ C, hind: { len: 0.85, thick: 1.3, ...o.hind }, body: { len: 0.9, girth: 1.15, deep: 1.05, tuck: 0.85, neck: [0.12, 0.12], neckThick: 1.25, white: 0.4, ...o.body },
  head: { size: 1.06, muzzle: 0.75, cheek: 0.9, eye: 1.15, ...o.head, ear: { tall: 0.7, wide: 1.2, back: SHADE, ...o.ear } } });
const arcticfox = {
  // a grey-brown kit, the summer's colour, round as a stone
  baby() {
    const C = { ...ARCTIC, coat: "#8b7d72", back: undefined, belly: "#cfc4b6", upper: "#8b7d72", mid: "#7b6e64", sock: "#5f544c", cheek: "#cfc4b6" }, q = build(C, { hind: { len: 0.46, thick: 1.8 }, body: { len: 0.52, girth: 1.12, tuck: 1.05, neck: [0.06, 0.07] }, head: { size: 1.36, muzzle: 0.45, cheek: 0.4, eye: 1.6 }, ear: { tall: 0.7, wide: 1.4, back: "#5f544c" } });
    const t = tail("tail", "pelvis", q.root, { len: 0.18, r: 0.06, pitch: 0.1, tip: 0.3, blunt: 0.4, colours: { coat: C.coat, tip: "#cfc4b6" } });
    return plan("arcticfox-baby", q.body, q.skull, [...q.legs, t], trots({ lively: 1.3, run: { duty: 0.3 }, tails: [t.chain] }));
  },
  // turned white: a round kit-faced young, its ears big on it yet, a short brush
  young() {
    const q = build(ARCTIC, { hind: { len: 0.8, thick: 1.1 }, body: { len: 0.8, girth: 0.95, tuck: 0.8 }, head: { size: 1.02, muzzle: 0.6, cheek: 0.5, eye: 1.3 }, ear: { tall: 1.0, wide: 1.25 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.36, r: 0.09, pitch: -0.3, tip: 0.2, colours: { coat: WHITE, under: SHADE, tip: SNOW } });
    return plan("arcticfox-young", q.body, q.skull, [...q.legs, t], trots({ lively: 1.1, tails: [t.chain] }));
  },
  // in its winter coat: a deep ruff round its neck and a brush as big as its body
  adult() {
    const q = build(ARCTIC, { body: { girth: 1.22, neckThick: 1.4 }, head: { cheek: 1.5 } }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 0.66, r: 0.15, pitch: -0.2, curl: 0.25, tip: 0.2, blunt: 0.2, colours: { coat: WHITE, under: SHADE, tip: SNOW } });
    const ruff = [...tufts(R[5], "neck", { n: 5, a0: 0.5, a1: 2.9, long: 0.15, sweep: 0.6, droop: 0.3, r: 0.07, lock: true, colour: () => SNOW, tip: () => SHADE }), ...tufts(R[4], "chest", { n: 4, a0: 0.9, a1: 2.8, long: 0.13, sweep: 0.7, droop: 0.35, r: 0.07, lock: true, colour: () => SNOW, tip: () => SHADE })];
    return plan("arcticfox-adult", q.body, q.skull, [...q.legs, t], trots({ tails: [t.chain] }), { cones: ruff });
  },
  // the long winter's own: its coat gone deep and shaggy, its muzzle grizzled with frost, one vast tufted brush swept low behind
  // it, stone beads round its legs; glacier ice plated over its back, a pale mark lit in each plate
  legend() {
    const ICE = "#7fe3ff", GLACIER = "#3f6788", STONE = "#8d9398", C = { ...ARCTIC, coat: "#eef1f4", back: "#cfd8e2", muzzle: "#c9e4f2", eyes: [{ colour: ICE, glow: true }, { colour: ICE, glow: true }] };
    const q = build(C, { hind: { len: 1.05, thick: 1.25, knob: 1.3, claws: { colour: "#9fb4c4", len: 1 }, band: { colour: STONE, at: 0.3, r: 0.042 } }, body: { len: 1.0, girth: 1.3, deep: 1.25, tuck: 0.75, hump: 0.7, neck: [0.1, 0.17], neckThick: 1.5 }, head: { size: 1.3, muzzle: 0.9, cheek: 2.2, eye: 1.5 }, ear: { tall: 0.8, torn: -1 } }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 1.0, r: 0.21, pitch: -0.45, curl: 0.5, bones: 6, sides: 8, tip: 0.2, blunt: 0.15, colours: { coat: C.coat, under: "#b9c6d3", tip: SNOW }, spikes: { n: 7, colour: SNOW, len: 1.1 } });
    const shag = [5, 4, 3, 2, 1].flatMap((i, k) => tufts(R[i], BONES[i], { n: 3, a0: 1.5, a1: 2.7, long: 0.15 - 0.01 * k, sweep: 0.8, droop: 0.45, r: 0.09, lock: true, grow: 0.3, colour: () => C.coat, tip: () => "#b9c6d3" }));
    const beard = [{ at: q.P(0, -0.03, 0.18), rx: 0.03, ry: 0.03, tip: q.P(0, -0.16, 0.13), bone: "head", colour: SNOW, tipColour: "#c9e4f2", split: 0.5, up: [0, 0, 1] }];
    const armour = [{ from: 1.2, to: 4.6, round: [0, 1.25], lames: 4, thick: 0.022, step: 0.012, colour: GLACIER, rim: "#dff3ff", runes: { colour: "#e8fdff" } }];
    return plan("arcticfox-legend", q.body, q.skull, [...q.legs, t], trots({ lively: 0.75, tails: [t.chain] }), { cones: [...shag, ...beard], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "arcticfox", heights: [42, 68, 96, 229], plans: arcticfox };
