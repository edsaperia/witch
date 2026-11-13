// The rhino, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch D: the heavy and the
// gnawing). The bushveld's rhino (art/creatures/rhino/genome.js: "a grey hulk, a great horn on its nose and a smaller one
// behind it, its hide in folds"; Ed's review, 2026-10-13: "a horn that grows by level (a calf's nub, a young one's short
// horn), the head carried low, a young of its own (lighter, smooth-hided, no hump yet)"): a barrel on pillars, a hump over the
// shoulders, a long heavy head hung low, tube ears, a whip of a tail. Its legend is the elder, revered (its brief: "one
// colossal horn ringed with bronze offerings, the hide in heavy armour folds and old scars, a necklace of offerings, the hump a
// hill"; Ed, 2026-10-13: "one giant horn"), its folds plate raised from its hide with a mark lit on each (Ed, 2026-11-12:
// "Armour should just be thickened polygons on their torso with a different colour and glowing runes"). It trots. Asleep it
// lies over on its side, bent a little, its horn clear of the ground: it can't curl nose to tail. Metres; y up; its head along +z.
import { band } from "../kit/band.js";
import { trundle } from "../kit/gaits.js";
import { horn } from "../kit/horn.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";

const HORN = "#cfc4ae", NAIL = "#b9b2a4", HIDE = { coat: "#7f8388", belly: "#6c7075", muzzle: "#74787d", nose: "#5f6368", upper: "#777b80", mid: "#6c7075", sock: "#5f6368", eye: "#141110" };
const nails = { colour: NAIL, len: 0.45, thick: 2.2, wide: 1.3 };
const build = (C, o) => quad({ C, hind: { len: 0.86, thick: 2.0, paw: 1.25, foot: 0.8, claws: nails, ...o.hind }, fore: { len: 0.88, thick: 2.05, paw: 1.3, foot: 0.8, claws: nails, ...o.fore }, body: { len: 1.18, girth: 1.6, deep: 1.2, tuck: 1.1, rump: 1.2, hump: 0.9, neck: [-0.09, 0.17], neckThick: 1.7, white: 0.05, ...o.body },
  head: { size: 1.3, muzzle: 1.5, muzzleWide: 1.45, muzzleDeep: 1.4, wide: 0.95, dome: 0.85, nose: 1.5, cheek: 0, eye: 0.5, eyeAt: [0, -0.012, 0.01], ...o.head, ear: { shape: "long", tall: 0.5, wide: 0.9, lean: 0.1, splay: 0.5, at: [0.008, -0.01, -0.01], back: C.coat, inner: C.mid, tip: C.coat, ...o.ear } } });
// (where a horn stands on its nose: `f` along its muzzle, 1 its end)
const on = (q, m, f) => [0.05 - 0.026 * f, 0.16 + 0.07 * m * f];
const whip = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.26, r: 0.02, pitch: -1.2, curl: 0.2, tip: 0.25, blunt: 0.9, sides: 4, colours: { coat: C.coat, tip: "#2a2624" }, ...o });
const charge = (o = {}) => trundle({ sleep: "curl", ...o, walk: { seconds: 1.3, ...o.walk, body: { roll: 0.04, sway: 0.03, bob: 0.03, ...o.walk?.body } }, run: { seconds: 0.6, duty: 0.38, reach: 0.95, ...o.run, body: { bob: 0.05, pitch: 0.035, ...o.run?.body } } });
const rhino = {
  // a calf: smooth and pale, big-eared, a nub where its horn will be
  baby() {
    const C = { ...HIDE, coat: "#9a9da0", upper: "#94979a", belly: "#85888b" }, q = build(C, { hind: { len: 0.6, thick: 1.9 }, fore: { len: 0.6, thick: 1.9 }, body: { len: 0.76, girth: 1.35, deep: 1.05, hump: 0, neck: [-0.01, 0.1], neckThick: 1.35 }, head: { size: 1.4, muzzle: 0.95, eye: 0.85 }, ear: { tall: 0.7, wide: 1.1 } }), t = whip(q, C, { len: 0.14 });
    return plan("rhino-baby", q.body, q.skull, [...q.legs, t, horn(q.P, { at: on(q, 0.95, 0.75), len: 0.03, r: 0.022, lean: 0.2, curl: 0.2, colour: HORN, n: 4 })], charge({ lively: 1.3, tails: [t.chain] }));
  },
  // a young rhino: lighter, smooth-hided, no hump yet, a short horn
  young() {
    const C = { ...HIDE, coat: "#8a8e92", upper: "#84888c" }, q = build(C, { hind: { thick: 1.65 }, fore: { thick: 1.7 }, body: { len: 1.05, girth: 1.32, deep: 1.08, hump: 0.15, neck: [-0.04, 0.15], neckThick: 1.45 }, head: { size: 1.18, muzzle: 1.3 } }), t = whip(q, C, { len: 0.2 });
    return plan("rhino-young", q.body, q.skull, [...q.legs, t, horn(q.P, { at: on(q, 1.3, 0.8), len: 0.08, r: 0.026, colour: HORN })], charge({ lively: 1.1, tails: [t.chain] }));
  },
  // the rhino: a grey hulk, its head low under the hump, a great horn on its nose and a smaller one behind it
  adult() {
    const q = build(HIDE, {}), t = whip(q, HIDE);
    const front = horn(q.P, { at: on(q, 1.5, 0.85), len: 0.2, r: 0.034, lean: 0.4, curl: 0.75, colour: HORN, tip: "#efe8d8", root: "#8f8a80" }), back = horn(q.P, { at: on(q, 1.5, 0.4), len: 0.08, r: 0.028, lean: 0.25, curl: 0.4, colour: HORN, root: "#8f8a80" });
    return plan("rhino-adult", q.body, q.skull, [...q.legs, t, front, back], charge({ tails: [t.chain] }));
  },
  // the elder, revered: one colossal horn ringed with bronze offerings, its point lit; the hump a hill; its hide in heavy
  // plates like dressed stone, a mark lit on each; a ring of offerings at its throat; old scars
  legend() {
    const LIT = "#ffc46a", BRONZE = "#b9722e", STONE = "#4f5459", EDGE = "#2c3034", C = { ...HIDE, coat: "#63676c", upper: "#5c6065", mid: "#54585d", sock: "#4a4e52", muzzle: "#5c6065", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hind: { len: 0.9, thick: 2.2, knob: 1.15 }, fore: { len: 0.95, thick: 2.3, knob: 1.15 }, body: { len: 1.25, girth: 1.75, deep: 1.25, hump: 1.9, neck: [-0.14, 0.18], neckThick: 1.9 }, head: { size: 1.45, muzzle: 1.6 }, ear: { torn: 1 } }), R = q.R, P = q.P, t = whip(q, C, { len: 0.32 });
    const great = horn(P, { at: on(q, 1.6, 0.85), len: 0.42, r: 0.046, lean: 0.55, curl: 1.0, colour: "#b9ae98", root: "#6f6a62", glow: LIT, bands: { colour: BRONZE, at: [0.22, 0.4, 0.58] }, n: 12 });
    const ring = band("neck", R[5].at, R[6].at, { at: 0.5, r: R[5].rx * 1.06, ry: R[5].ry * 1.06, wide: 0.026, colour: BRONZE });
    const scars = [[0.05, 0.05, 0.14], [-0.04, 0.03, 0.22]].map(([x, y, z]) => ({ at: P(x, y, z), rx: 0.007, ry: 0.005, tip: P(x * 1.3, y - 0.06, z + 0.05), bone: "head", colour: "#a8a39c", up: [0, 0, 1], sides: 3 }));
    const armour = [{ from: 0.9, to: 2.6, round: [0, 1.9], lames: 2, thick: 0.03, step: 0.012, colour: STONE, rim: EDGE, runes: { colour: LIT } }, { from: 2.9, to: 4.7, round: [0, 2.0], lames: 2, thick: 0.034, step: 0.014, colour: STONE, rim: EDGE, runes: { colour: LIT } }];
    return plan("rhino-legend", q.body, q.skull, [...q.legs, t, great, ring], charge({ lively: 0.7, tails: [t.chain] }), { cones: scars, armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build;
 *  curl, how it lies asleep (art/mesh/gear.js `napping` reads gait.curl): over on its side and bent only a little, not in a ring
 *  (on its brisket with its head down, its horn stood it off the ground). */
export const MESH = { id: "rhino", heights: [82, 127, 179, 290], curl: { turn: 1.2, tail: 0.3, roll: 1.05 }, plans: rhino };
