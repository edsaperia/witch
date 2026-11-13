// The elephant, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch D: the heavy and the
// gnawing). The jungle's elephant (art/creatures/elephant/genome.js: "the biggest creature in the game, grey and wrinkled, a
// trunk, fan ears and tusks. Its evolution: a round calf with a short trunk and huge ears, a young with its first tusks, a
// great tusker, and the legend: the elder of the elephants, an ancient matriarch, her vast trunk raised in a trumpet, her tusks
// long and worn, banded in bronze, hung with temple bells from a red saddle-cloth, a jewelled cloth on her brow and a garland
// of flowers"). A high arched back on four pillars, a domed head, the trunk (kit/trunk.js) and ears like sails. Her saddle-cloth
// is her armour: red plate raised from her back, edged in gold, a mark lit on each (Ed, 2026-11-12: "Armour should just be
// thickened polygons on their torso with a different colour and glowing runes"); no bells or garland (nothing hung or floating).
// It walks at every pace, never off the ground. Asleep it lies over on its side, bent a little, its trunk along the ground: it
// can't curl nose to tail. Metres; y up; its head along +z.
import { band } from "../kit/band.js";
import { plod } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { plate } from "../kit/plate.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { trunk } from "../kit/trunk.js";
import { tusks } from "../kit/tusks.js";

const NAIL = "#cfc6b0", GREY = { coat: "#7c7f8c", belly: "#6c6f7c", muzzle: "#74778a", nose: "#74778a", upper: "#757886", mid: "#6c6f7c", sock: "#62657a", eye: "#141110" }, CREASE = "#62657a", PINK = "#b9939a";
const nails = { colour: NAIL, len: 0.4, thick: 2.2, wide: 1.3 };
const build = (C, o) => quad({ C, hind: { len: 1.12, thick: 1.75, paw: 1.3, foot: 0.7, claws: nails, ...o.hind }, fore: { len: 1.18, thick: 1.75, paw: 1.3, foot: 0.7, claws: nails, ...o.fore }, body: { len: 1.0, girth: 1.62, deep: 1.2, tuck: 1.15, rump: 1.2, arch: 0.5, neck: [0.05, 0.12], neckThick: 1.7, white: 0, ...o.body },
  head: { size: 1.6, muzzle: 0.35, muzzleWide: 1.4, muzzleDeep: 1.5, wide: 1.05, dome: 1.3, nose: 1.6, cheek: 0, eye: 0.45, eyeAt: [0.004, -0.02, 0], ...o.head, ear: { shape: "round", tall: 0.3, wide: 0.5, back: C.coat, inner: C.coat } } });
// (its ears: a sail hung from each side of its head, out and swept back, on the head's own ear bones; size, and how far it hangs)
const fans = (P, C, size = 1, o = {}) => ({ bones: [], cones: [], lofts: [1, -1].map(s => ({ sides: 6, up: [s * 0.74, 0, 0.67], rings: [[0, 0.5], [0.3, 1], [0.65, 1.05], [0.9, 0.75], [1, 0.3]].map(([t, f]) => ({ at: P((0.072 + 0.1 * size * t) * s, 0.055 - (o.hang ?? 0.05) * size * (t + f * 0.6), 0.03 - 0.11 * size * t), rx: 0.085 * size * f * P(1, 0, 0)[0], ry: 0.009 * P(1, 0, 0)[0], bone: s > 0 ? "earL" : "earR", up: [s * 0.74, 0, 0.67], colour: t > 0.85 ? (o.rim ?? C.mid) : cy => (cy > 0 ? (o.inner ?? C.mid) : C.coat) })) })) });
const whip = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.34, r: 0.02, pitch: -1.3, curl: 0.15, tip: 0.2, blunt: 1.0, sides: 4, colours: { coat: C.coat, tip: "#2a2830" }, ...o });
// (it walks at every pace, its trunk swinging with it; asleep it lies on its side at any age)
const walks = (o = {}) => plod({ sleep: "curl", ...o, walk: { seconds: 1.5, reach: 0.55, ...o.walk, body: { roll: 0.035, sway: 0.035, bob: 0.025, head: 0.85, ...o.walk?.body } }, run: { seconds: 0.8, duty: 0.55, reach: 1.0, step: 0.16, ...o.run, body: { roll: 0.04, sway: 0.03, yaw: 0.06, ...o.run?.body } } });
const elephant = {
  // a calf: round, a short trunk it hasn't learnt, huge ears
  baby() {
    const C = { ...GREY, coat: "#8f92a0", upper: "#888b99" }, q = build(C, { hind: { len: 0.7, thick: 1.9 }, fore: { len: 0.72, thick: 1.9 }, body: { len: 0.72, girth: 1.4, deep: 1.1, arch: 0.2, neck: [0.04, 0.09], neckThick: 1.4 }, head: { size: 1.6, eye: 0.7 } }), P = q.P;
    const tr = trunk(P, { len: 0.14, r: 0.034, p0: 1.2, curl: 0.9, colour: C.coat, crease: C.mid, lip: PINK, bones: 3, n: 8 }), t = whip(q, C, { len: 0.18 });
    return plan("elephant-baby", q.body, q.skull, [...q.legs, t, tr, fans(P, C, 1.25, { inner: PINK })], walks({ lively: 1.3, tails: [t.chain, tr.chain] }));
  },
  // a young elephant: leggy, its first tusks showing
  young() {
    const q = build(GREY, { hind: { thick: 1.5 }, fore: { thick: 1.5 }, body: { len: 0.92, girth: 1.4, deep: 1.1, arch: 0.35, neckThick: 1.5 }, head: { size: 1.45 } }), P = q.P;
    const tr = trunk(P, { len: 0.22, r: 0.034, colour: GREY.coat, crease: CREASE, lip: PINK }), t = whip(q, GREY, { len: 0.28 });
    return plan("elephant-young", q.body, q.skull, [...q.legs, t, tr, fans(P, GREY, 1.05), tusks(P, { len: 0.06, r: 0.012, curl: 0.5, out: 0.35, at: [0.04, -0.04, 0.15] })], walks({ lively: 1.1, tails: [t.chain, tr.chain] }));
  },
  // the great tusker: a wall of grey, its trunk to the ground, long ivory, ears like sails
  adult() {
    const q = build(GREY, {}), P = q.P;
    const tr = trunk(P, { len: 0.25, r: 0.04, colour: GREY.coat, crease: CREASE, lip: PINK }), t = whip(q, GREY);
    return plan("elephant-adult", q.body, q.skull, [...q.legs, t, tr, fans(P, GREY, 1.2), tusks(P, { len: 0.2, r: 0.02, curl: 0.75, out: 0.4, at: [0.042, -0.045, 0.15] })], walks({ tails: [t.chain, tr.chain] }));
  },
  // the matriarch: ancient and vast, her trunk raised in a trumpet, her tusks long and worn; her ears torn at the rim; a
  // jewelled cloth on her brow; her red saddle-cloth plate on her back, edged in gold, a mark lit on each plate
  legend() {
    const LIT = "#ffd76a", GOLD = "#c9962e", RED = "#a3282a", DEEP = "#6a1719", C = { ...GREY, coat: "#6a6c7c", upper: "#64667a", mid: "#5a5c70", sock: "#505266", muzzle: "#64667a", nose: "#64667a", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hind: { thick: 1.95, knob: 1.12 }, fore: { len: 1.22, thick: 1.95, knob: 1.12 }, body: { len: 1.08, girth: 1.78, deep: 1.22, arch: 0.7, hump: 0.4, neckThick: 1.85 }, head: { size: 1.75 } }), P = q.P, R = q.R;
    const tr = trunk(P, { len: 0.34, r: 0.044, p0: 0.95, curl: 2.7, colour: C.coat, crease: "#505266", lip: PINK, bones: 5, n: 14 }), t = whip(q, C, { len: 0.4 });
    const ivory = tusks(P, { len: 0.28, r: 0.024, curl: 0.9, out: 0.45, at: [0.042, -0.045, 0.15], colour: "#e0d6ba", tip: "#fff6dc" });
    const brow = plate("head", P(0, 0.115, 0.095), [0, 0.75, 0.65], { r: 0.034 * 1.75, ry: 0.045 * 1.75, high: 0.016, colour: RED, rim: GOLD, gem: { colour: LIT }, up: [1, 0, 0], sides: 4 });
    const girth = band("chest", R[3].at, R[4].at, { at: 0.5, r: (R[3].rx + R[4].rx) * 0.5 * 1.03, ry: (R[3].ry + R[4].ry) * 0.5 * 1.03, wide: 0.03, colour: GOLD, up: [0, 1, 0] });
    const armour = [{ from: 1.6, to: 4.4, round: [0, 1.25], lames: 3, thick: 0.024, step: 0.008, colour: RED, rim: GOLD, runes: { colour: LIT } }];
    return plan("elephant-legend", q.body, q.skull, [...q.legs, t, tr, fans(P, C, 1.35, { rim: "#4a4c5e", hang: 0.06 }), ivory, brow, girth], walks({ lively: 0.7, tails: [t.chain, tr.chain] }), { armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build;
 *  curl, how it lies asleep (art/mesh/gear.js `napping` reads gait.curl): over on its side and bent only a little, not in a ring. */
export const MESH = { id: "elephant", heights: [90, 139, 200, 280], curl: { turn: 1.3, tail: 0.3, roll: 1.1 }, plans: elephant };
