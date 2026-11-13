// The mangrove swamp's crocodile, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded:
// docs/plans/creature-mesh-rollout.md; the ladder's first three are proposals till Ed marks them). Its genome's brief
// (art/creatures/crocodile/genome.js): "long and low, a flat wide jaw lined with teeth, a heavy tail along the ground"; its legend
// (Ed, 2026-10-12: "emphasise the thing that makes that creature unusual"): "enormous jaws, its scutes risen into a ridge of
// standing stones down its back and tail root, its eyes glowing just above the water line". A sprawler (kit/sprawl.js): the
// lowest and longest of them, its belly near the mud.
import { plan } from "../kit/plan.js";
import { rudder } from "../kit/rudder.js";
import { scutes } from "../kit/scutes.js";
import { sprawler, sprawls } from "../kit/sprawl.js";
import { BONES } from "../kit/torso.js";

const TOOTH = "#f1ecd8", CROC = { coat: "#5f7042", belly: "#cfc89a", nose: "#3d4a2c", upper: "#56663c", mid: "#4d5c36", sock: "#3f4c2d", eye: "#d9b43a" };
const build = (C, o) => sprawler({ C, wide: 1.3, flat: 0.72, body: { back: 0.16, len: 1.4, girth: 1.25, deep: 0.85, neck: [0.0, 0.16], neckThick: 1.45, white: 0.45, ...o.body }, hind: { len: 0.36, thick: 1.1, paw: 1.3, ...o.legs }, fore: { len: 0.3, thick: 1.0, paw: 1.2, ...o.legs, ...o.fore },
  head: { size: 1.1, muzzle: 2.6, muzzleWide: 1.55, muzzleDeep: 0.6, wide: 0.95, dome: 0.62, eye: 0.9, eyeAt: [-0.012, 0.012, -0.03], nose: 0.9, ...o.head } });
const tailOf = (q, C, o) => rudder("tail", "pelvis", q.root, { len: 1.1, r: 0.13, flat: 0.95, pitch: -0.1, curl: 0.08, tip: 0, bones: 6, colours: { coat: C.coat, under: C.belly, tip: C.coat }, ...o });
/** Teeth along its jaw: n a side from behind its nose back to its cheek, pointing down; m the muzzle's length, k the head's size. */
const teeth = (P, n, m, long = 1) => [1, -1].flatMap(s => Array.from({ length: n }, (_, i) => { const f = (i + 0.5) / n, z = 0.165 + 0.07 * m * f, x = (0.062 - 0.022 * f) * s; return { at: P(x, -0.022, z), rx: 0.007, ry: 0.007, tip: P(x * 1.05, -0.022 - 0.022 * long * (i % 2 ? 0.7 : 1), z), bone: "head", colour: TOOTH, up: [0, 0, 1], sides: 3 }; }));
/** The fins of scutes down its tail: two rows that become one, as a crocodile's do. */
const tailScutes = (t, o) => t.lofts[0].rings.slice(1, 7).map((a, i) => ({ at: [a.at[0], a.at[1] + a.ry * 0.85, a.at[2]], rx: 0.02, ry: 0.035, tip: [a.at[0], a.at[1] + a.ry + (o.high ?? 0.05) * (1 - 0.08 * i), a.at[2] - 0.03], bone: a.bone, colour: o.colour, tipColour: o.tip ?? o.colour, glow: o.glow, split: 0.55, up: [0, 0, 1], sides: 4 }));
// (stiffer in the back than a lizard: its hips swing less, and its heavy tail with them)
const goes = (o = {}) => sprawls({ ...o, walk: { body: { yaw: 0.1 } }, run: { body: { yaw: 0.14 } } });
const crocodile = {
  // a hatchling: all eyes, a short snout, yellow bands still on its tail
  baby() {
    const C = { ...CROC, coat: "#7a8a4e", upper: "#7a8a4e", mid: "#6c7c46", sock: "#5c6a3c" }, q = build(C, { body: { len: 0.9, girth: 1.0, back: 0.13 }, legs: { len: 0.26, thick: 1.0 }, head: { size: 1.15, muzzle: 1.3, eye: 1.6 } });
    const t = tailOf(q, C, { len: 0.6, r: 0.08 }); t.lofts[0].rings.forEach((r, i) => { if (i % 2) r.colour = "#c9c06a"; });
    return plan("crocodile-baby", q.body, q.skull, [...q.legs, t], goes({ lively: 1.3, tails: [t.chain] }));
  },
  // long-snouted and narrow, quick in the shallows
  young() {
    const q = build(CROC, { body: { len: 1.2, girth: 1.0 }, head: { size: 1.0, muzzle: 2.1 } }), t = tailOf(q, CROC, { len: 0.95, r: 0.1 });
    return plan("crocodile-young", q.body, q.skull, [...q.legs, t], goes({ lively: 1.1, tails: [t.chain] }), { cones: [...teeth(q.P, 4, 2.1, 0.7), ...tailScutes(t, { colour: CROC.mid, high: 0.035 })] });
  },
  // long and low, a flat wide jaw lined with teeth, rows of scutes down its back, a heavy tail along the ground
  adult() {
    const q = build(CROC, { body: { len: 1.5, girth: 1.4, back: 0.18 }, legs: { len: 0.4, thick: 1.15, claws: { colour: "#2a2a1c" } }, head: { size: 1.2 } }), t = tailOf(q, CROC, { len: 1.35, r: 0.15 });
    const rows = scutes(q.R, BONES, { from: 1, to: 5, n: 2, side: 0.45, high: 0.03, wide: 0.022, long: 0.03, colour: CROC.mid, tip: "#7d8c58" });
    return plan("crocodile-adult", q.body, q.skull, [...q.legs, t], goes({ tails: [t.chain] }), { cones: [...teeth(q.P, 6, 2.6), ...rows, ...tailScutes(t, { colour: CROC.mid, tip: "#7d8c58" })] });
  },
  // the old one of the swamp: enormous jaws, its scutes risen into a ridge of standing stones down its back and its tail's
  // root, its eyes lit; plate of black bog oak down its flanks either side of the stones, a mark lit on each
  legend() {
    const LIT = "#9af0c0", STONE = "#8b8f8c", OAK = "#26302a", C = { ...CROC, coat: "#46553a", belly: "#b5b08a", upper: "#3f4d34", mid: "#38452f", sock: "#2c3725", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { body: { len: 1.65, girth: 1.65, back: 0.22, neckThick: 1.5 }, legs: { len: 0.5, thick: 1.2, paw: 1.4, claws: { colour: "#d9d2b8", len: 1.5 } }, head: { size: 1.5, muzzle: 3.0, muzzleWide: 1.7, muzzleDeep: 0.7 } }), R = q.R;
    const t = tailOf(q, C, { len: 1.6, r: 0.19, bones: 7 });
    const stones = scutes(R, BONES, { from: 1, to: 5, n: 2, high: 0.15, wide: 0.05, long: 0.045, lean: 0.15, colour: STONE, tip: "#a4a8a5", sides: 5 });
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes")
    const armour = [{ from: 0.8, to: 4.8, round: [0.5, 1.3], lames: 6, thick: 0.022, step: 0.012, colour: OAK, rim: "#5a6a4a", runes: { colour: LIT, max: 1 } }];
    return plan("crocodile-legend", q.body, q.skull, [...q.legs, t], goes({ lively: 0.75, tails: [t.chain] }), { cones: [...teeth(q.P, 8, 3.0, 1.5), ...stones, ...tailScutes(t, { colour: STONE, tip: "#a4a8a5", high: 0.12 })], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build; curl, how it curls up to sleep (art/mesh/gear.js `napping` reads gait.curl): long and stiff, a looser ring. */
export const MESH = { id: "crocodile", heights: [73, 113, 160, 278], curl: { turn: 3.8 }, plans: crocodile };
