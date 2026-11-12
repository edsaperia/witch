// The mole, four levels, as plans for art/mesh/shape.js (the badger, the mole and the hedgehog were drawn together)
// (docs/plans/creature-meshes.md). Low, broad animals on short legs. The badger's ladder is Ed's (docs/art-guide/EVOLUTIONS.md and
// its genome: a cub that's all face, a low wedge of a young, a broad shaggy-plated digger with pale claws, and the elder, grizzled
// and scarred, its stripes running on down its back as chalk hill-figure lines, a bronze torc; with the standing stones of its
// first brief); the mole's and hedgehog's are proposals till he marks them. On his word for the fox (2026-11-11): the adult
// already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces on
// legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { ball } from "../kit/ball.js";
import { scurry, trot } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

// ---- The mole (fern forest): the spade hands and the velvet barrel, no eyes to speak of.
const PINK = "#e9a79c", MOLE = { coat: "#574f66", belly: "#6a6179", nose: PINK, upper: "#574f66", mid: "#574f66", sock: "#6a6179", eye: "#15121a" };
const digger = (C, o) => quad({ C, hind: { len: 0.24, thick: 2.0, ...o.hind }, fore: { len: 0.24, thick: 2.2, paw: 2.8, spread: 2.3, claws: { colour: "#f3e9dc", len: 1.6, thick: 1.8, wide: 2.4 }, ...o.fore }, body: { len: 0.72, girth: 1.3, deep: 0.95, tuck: 1.05, neck: [0.0, 0.1], neckThick: 1.22, white: 0, ...o.body },
  head: { size: 1.08, muzzle: 0.8, muzzleWide: 1.3, muzzleDeep: 1.2, wide: 1.0, dome: 0.95, cheek: 0, eye: 0.4, nose: 2.0, ...o.head, ear: { shape: "round", tall: 0.08, wide: 0.5, back: C.coat, inner: C.coat } } });
/** Its spade hands: a broad pink paddle flat out from each shoulder, a fan of claws round its outer edge; they ride the shoulders. */
// (Ed, 2026-11-12: "the mole's hands can mostly be the same colour as its fur": the hand is its fur's paler shade, only the claws pale)
const spades = (q, size, claw, clawLen = 1, skin = MOLE.belly) => { const lofts = [], cones = [];
  for (const s of [1, -1]) { const r = q.R[4], rad = 0.07 * size, c = [(r.rx + rad * 0.75) * s, 0.03 * size + 0.01, r.at[2] + rad * 0.9], bone = s > 0 ? "shoulderL" : "shoulderR";
    lofts.push(...ball(bone, c, { r: rad, squash: 0.32, colour: skin, sides: 8 }).lofts);
    // five claws fanned off its front edge, each a flat blade curving down and in towards its nose like a scythe (Ed, 2026-11-12:
    // "Give the mole curved claws")
    for (let i = 0; i < 5; i++) { const a = -0.35 + i * 0.42, d = [Math.sin(a) * s, 0, Math.cos(a)], hook = [-Math.cos(a) * s, 0, Math.sin(a)], L = 0.1 * size * clawLen, root = [c[0] + d[0] * rad * 0.82, c[1], c[2] + d[2] * rad * 0.82];
      lofts.push({ sides: 4, up: [0, 1, 0], rings: [0, 0.25, 0.5, 0.75, 1].map(t => ({ at: [root[0] + (d[0] * t + hook[0] * 0.55 * t * t) * L, root[1] - 0.45 * t * t * L, root[2] + (d[2] * t + hook[2] * 0.55 * t * t) * L], rx: Math.max(0.0008, 0.02 * size * (1 - t) ** 0.7), ry: Math.max(0.0008, 0.011 * size * (1 - t) ** 0.7), bone, colour: claw, plain: true })) }); } }
  return { bones: [], lofts, cones }; };
const star = (P, n, r, colour, glow = false) => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return { at: P(Math.cos(a) * 0.012, -0.013 + Math.sin(a) * 0.012, 0.265), rx: 0.007, ry: 0.007, tip: P(Math.cos(a) * r, -0.013 + Math.sin(a) * r, 0.285), bone: "head", colour, glow, up: [0, 0, 1], sides: 3 }; });
const mole = {
  // a pink-nosed velvet bean, its hands already too big
  baby() {
    const q = digger(MOLE, { hind: { len: 0.18, thick: 2.2 }, fore: { len: 0.18, thick: 2.4, paw: 2.6, spread: 2.3, claws: { colour: "#f3e9dc", len: 1.0, thick: 1.5, wide: 2.2 } }, body: { len: 0.48, girth: 1.2 }, head: { size: 1.3, muzzle: 0.7, nose: 2.0 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.05, r: 0.016, pitch: 0.2, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    return plan("mole-baby", q.body, q.skull, [...q.legs, t, spades(q, 0.8, "#f3e9dc", 0.6)], scurry({ seconds: 0.4, sway: 0.11, tails: [t.chain] }));
  },
  // a short barrel, broad pink hands turned outward
  young() {
    const q = digger(MOLE, { body: { len: 0.66, girth: 1.15 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.07, r: 0.016, pitch: 0.2, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    return plan("mole-young", q.body, q.skull, [...q.legs, t, spades(q, 1.1, "#f3e9dc", 0.8)], scurry({ seconds: 0.46, sway: 0.11, tails: [t.chain] }));
  },
  // huge clawed spade hands, a long snout feeling ahead with its star, whiskers, a body like a furred boulder
  adult() {
    const q = digger(MOLE, { fore: { len: 0.28, thick: 2.6, paw: 3.8, spread: 2.5 }, hind: { len: 0.26, thick: 2.2 }, body: { len: 0.78, girth: 1.6, hump: 0.6, neckThick: 1.1 }, head: { size: 1.2, muzzle: 1.0 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.08, r: 0.018, pitch: 0.3, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    return plan("mole-adult", q.body, q.skull, [...q.legs, t, spades(q, 1.9, "#f3e9dc", 1.2)], scurry({ seconds: 0.55, sway: 0.1, tails: [t.chain] }), { cones: [...star(q.P, 8, 0.05, PINK), ...whiskers(q.P, "#cfc6d6", 0.9)] });
  },
  // the delver: blind and certain: hands like ploughshares worn bright, a star for a nose that lights its way; a crust of earth
  // and roots on its rump; iron lames over its back cut with lamp-lit marks, iron on its wrists
  legend() {
    const STEEL = "#d3dae2", IRON = "#5d646d", LAMP = "#ffd98a", EARTH = "#5c4630", ROOT = "#c9b99a", C = { ...MOLE, coat: "#463f54", belly: "#584f68", upper: "#463f54", mid: "#463f54", eye: "#463f54" };
    const q = digger(C, { fore: { len: 0.34, thick: 2.8, paw: 4.4, spread: 2.6, knob: 1.2, band: { colour: IRON, at: 0.1, r: 0.04 } }, hind: { len: 0.3, thick: 2.4, claws: { colour: STEEL, len: 1.4, thick: 1.6 } }, body: { len: 0.9, girth: 1.9, hump: 1.0, neck: [0.0, 0.12], neckThick: 1.15 }, head: { size: 1.35, muzzle: 1.1 } }), R = q.R, P = q.P;
    const t = tail("tail", "pelvis", q.root, { len: 0.1, r: 0.02, pitch: 0.3, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    // the crust: clods of earth over its rump, roots trailing from them
    const clods = [1, 2].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 0.2, a1: 1.3, long: 0.07, sweep: 0.5, droop: 0.0, r: 0.085, flat: 0.8, sides: 5, jitter: 0.5, colour: k => (k % 2 ? EARTH : "#6f563a"), tip: () => "#7a6040" }));
    const roots = [1, 2].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 1.0, a1: 1.9, long: 0.2, sweep: 0.7, droop: 0.7, r: 0.014, sides: 3, jitter: 0.6, colour: () => ROOT }));
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): worn iron in lames over its shoulders and back, a lamp-lit mark on each to dig by
    const armour = [{ from: 2.45, to: 4.9, round: [0, 1.3], lames: 4, thick: 0.024, step: 0.014, colour: "#8a929c", rim: IRON, runes: { colour: LAMP } }];
    return plan("mole-legend", q.body, q.skull, [...q.legs, t, spades(q, 2.6, STEEL, 1.5, C.belly)], scurry({ seconds: 0.9, sway: 0.08, tails: [t.chain], legs: trot(1.05) }), { cones: [...clods, ...roots, ...star(P, 11, 0.085, "#ffb8c8", true), ...whiskers(P, "#cfc6d6", 1.3)], armour });
  },
};

// (the mole's forefeet are spades with long claws, set on its shoulders: they paddle a little while its hind legs do the striding,
// and its wrists fold little as they swing, or the claws would stab down through the ground and lift the whole animal)
const spadework = legs => legs.map(l => (/^shoulder/.test(l.bones[0]) ? { ...l, swing: l.swing * 0.15, fold: [l.fold[0], 0.15] } : l));
// (asleep, the mole lies on its belly at every level, its great hands flat on the ground beside it: art/mesh/gear.js `napping`
// reads gait.lie and gait.sleep)
const asleep = make => () => { const p = make(); p.gait.lie = { fore: [-0.3, 0.1, 0.1] }; p.gait.sleep = "sphinx"; p.gait.legs = spadework(p.gait.legs); return p; };

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "mole", heights: [45, 67, 95, 323], plans: { baby: asleep(mole.baby), young: asleep(mole.young), adult: asleep(mole.adult), legend: asleep(mole.legend) } };
