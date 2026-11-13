// The frost troll, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built
// from what batches A to G made; this one on batch D's bear). The trollwood's troll (art/creatures/frosttroll/genome.js: "a
// hulking, shaggy, mossy-stone troll, more cute than scary, knuckling along on great arms, big round eyes and a bulb of a nose, a
// white beard, long arms down to its knuckles; a troll kid all eyes, a shaggy young, an adult, and its elder half turned to
// stone"): a bear's barrel carried high at the shoulders on arms far longer than its legs, a great round head sunk between
// them. Its legend's armour is its own stone (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a
// different colour and glowing runes"). It walks rolling and trots heavily. Metres; y up; its head along +z.
import { trundle } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const BEARD = "#f2f4f3", MOSS = "#6f8f4a", NOSE = "#c79a9a", TROLL = { coat: "#7f8f95", belly: "#a9b6b8", muzzle: "#a9b6b8", nose: NOSE, upper: "#7f8f95", mid: "#6d7c82", sock: "#5b686e", eye: "#1a1716" };
const build = (C, o) => quad({ C, hind: { len: 0.66, thick: 2.2, paw: 1.4, foot: 1.2, ...o.hind }, fore: { len: 1.12, thick: 1.75, paw: 1.7, foot: 0.8, ...o.fore }, body: { len: 0.82, girth: 1.65, deep: 1.25, tuck: 1.1, rump: 1.1, hump: 0.7, neck: [-0.02, 0.11], neckThick: 1.8, white: 0.15, ...o.body },
  head: { size: 1.55, muzzle: 0.42, muzzleWide: 1.5, muzzleDeep: 1.3, wide: 1.2, dome: 1.08, nose: 2.6, cheek: 0, eye: 1.5, eyeAt: [-0.004, 0, 0.004], ...o.head, ear: { shape: "long", tall: 0.42, wide: 1.2, splay: 2.2, lean: 0.1, at: [0.03, -0.045, -0.01], back: C.coat, inner: "#c9a9a9", ...o.ear } } });
const stub = (q, C) => tail("tail", "pelvis", q.root, { len: 0.1, r: 0.03, pitch: -0.9, blunt: 0.4, tip: 0.5, sides: 5, bones: 2, colours: { coat: C.coat, tip: C.mid } });
const beard = (P, long, colour = BEARD, tip = "#cfd6d6") => [0, 1, -1].map(s => ({ at: P(s * 0.035, -0.045, 0.17), rx: 0.04, ry: 0.03, tip: P(s * 0.05, -0.07 - 0.15 * long * (s ? 0.75 : 1), 0.15), bone: "head", colour, tipColour: tip, split: 0.5, bulge: 0.85, up: [0, 0, 1], sides: 5 }));
const shag = (R, o) => [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 0.3, a1: 1.9, long: 0.1, sweep: 0.5, droop: 0.65, r: 0.08, flat: 0.55, lock: true, ...o }));
const heavy = (o = {}) => trundle({ ...o, walk: { seconds: 1.3, ...o.walk, body: { roll: 0.07, sway: 0.05, ...o.walk?.body } }, run: { seconds: 0.64, duty: 0.36, reach: 0.95, ...o.run, body: { bob: 0.06, pitch: 0.05, ...o.run?.body } } });
const frosttroll = {
  // a troll kid: all eyes, a round head as big as the rest of it, a first fluff of beard
  baby() {
    const C = { ...TROLL, coat: "#93a3a8", upper: "#93a3a8", mid: "#7f8f95" }, q = build(C, { hind: { len: 0.44, thick: 2.2 }, fore: { len: 0.68, thick: 1.9 }, body: { len: 0.56, girth: 1.35, hump: 0.2, neck: [0, 0.08], neckThick: 1.4 }, head: { size: 1.75, eye: 2.0, nose: 2.0 }, ear: { tall: 0.6 } }), t = stub(q, C);
    return plan("frosttroll-baby", q.body, q.skull, [...q.legs, t], heavy({ lively: 1.3, tails: [t.chain] }), { cones: beard(q.P, 0.25) });
  },
  // a shaggy young one: its arms grown long before the rest of it, hair in its eyes
  young() {
    const q = build(TROLL, { hind: { len: 0.6, thick: 1.9 }, fore: { len: 1.0, thick: 1.5 }, body: { len: 0.74, girth: 1.4, hump: 0.4, neckThick: 1.5 }, head: { size: 1.45 } }), t = stub(q, TROLL);
    const hair = shag(q.R, { long: 0.12, colour: () => "#6d7c82", tip: () => "#a9b6b8" });
    return plan("frosttroll-young", q.body, q.skull, [...q.legs, t], heavy({ lively: 1.1, tails: [t.chain] }), { cones: [...beard(q.P, 0.5), ...hair] });
  },
  // the troll: a hulk on its knuckles, moss on its shoulders, a white beard to its chest
  adult() {
    const claws = { colour: "#3d4548", len: 0.8, thick: 1.6, wide: 1.2 }, q = build(TROLL, { hind: { claws }, fore: { claws } }), t = stub(q, TROLL);
    const moss = shag(q.R, { n: 2, a1: 1.2, long: 0.07, colour: () => MOSS, tip: () => "#9db86a" });
    return plan("frosttroll-adult", q.body, q.skull, [...q.legs, t], heavy({ tails: [t.chain] }), { cones: [...beard(q.P, 1), ...moss] });
  },
  // the elder, half turned to stone: its back and shoulders gone to grey rock, cracked into plates with a frost-blue mark lit
  // on each; icicles in its beard, moss and lichen in its folds, its eyes lit
  legend() {
    const LIT = "#a8ecff", STONE = "#575f66", EDGE = "#2f3438", C = { ...TROLL, coat: "#6b787e", upper: "#6b787e", mid: "#5b666c", sock: "#4a5459", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const claws = { colour: "#2a2f32", len: 1.2, thick: 1.9, wide: 1.2 }, q = build(C, { hind: { len: 0.72, thick: 2.3, knob: 1.15, claws }, fore: { len: 1.25, thick: 1.9, paw: 1.9, knob: 1.2, claws }, body: { len: 0.9, girth: 1.85, deep: 1.3, hump: 1.5, neck: [-0.06, 0.12], neckThick: 2.0 }, head: { size: 1.7 }, ear: { torn: 1 } }), R = q.R, P = q.P, t = stub(q, C);
    const moss = shag(R, { n: 3, a0: 1.3, a1: 2.2, long: 0.1, colour: k => (k % 2 ? MOSS : "#4f6e38"), tip: () => "#b7c98a" });
    const icicles = [-0.06, -0.02, 0.03, 0.065].map((x, i) => ({ at: P(x, -0.1 - 0.02 * (i % 2), 0.16), rx: 0.012, ry: 0.012, tip: P(x * 1.1, -0.2 - 0.03 * (i % 2), 0.155), bone: "head", colour: "#d9f4ff", tipColour: LIT, glow: "tip", up: [0, 0, 1], sides: 3 }));
    const armour = [{ from: 1.1, to: 4.7, round: [0, 1.45], lames: 4, thick: 0.03, step: 0.014, colour: STONE, rim: EDGE, runes: { colour: LIT } }];
    return plan("frosttroll-legend", q.body, q.skull, [...q.legs, t], heavy({ lively: 0.7, tails: [t.chain] }), { cones: [...beard(P, 1.5, "#e6eef0", "#b9c9cf"), ...moss, ...icicles], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs frosttroll`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "frosttroll", heights: [89, 137, 201, 293], plans: frosttroll };
