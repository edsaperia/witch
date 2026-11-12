// The badger, the mole and the hedgehog, four levels each, as plans for tools/creature-mesh/quadruped.js
// (docs/plans/creature-meshes.md). Low, broad animals on short legs. The badger's ladder is Ed's (docs/art-guide/EVOLUTIONS.md and
// its genome: a cub that's all face, a low wedge of a young, a broad shaggy-plated digger with pale claws, and the elder, grizzled
// and scarred, its stripes running on down its back as chalk hill-figure lines, a bronze torc; with the standing stones of its
// first brief); the mole's and hedgehog's are proposals till he marks them. On his word for the fox (2026-11-11): the adult
// already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces on
// legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { ball, band, plan, quad, tail, tufts, walk } from "./kit.js";

const BLACK = "#1b1817", BRONZE = "#b9722e", BRONZE2 = "#e0a04a";
const trundle = (o = {}) => ({ seconds: 0.6, duty: 0.62, bob: 0.006, sway: 0.085, tailSwing: 0.1, legs: walk(0.95), ...o });
const whiskers = (P, colour, long = 1) => [1, -1].flatMap(s => [[-0.03, 0.15], [0.0, 0.12]].map(([dy, dz]) => ({ at: P(0.03 * s, -0.005, 0.2), rx: 0.006, ry: 0.006, tip: P((0.03 + 0.14 * long) * s, dy * long, dz), bone: "head", colour, up: [0, 1, 0], sides: 3 })));
const BONES = ["pelvis", "pelvis", "loin", "chest", "chest", "neck", "neck"]; // the bone each ring of the skin rides

// ---- The badger (wispy forest): the striped face, and the low broad digger's body.
const WHITE = "#f2efe7", BADGER = { coat: "#8d8d88", belly: BLACK, mask: WHITE, muzzle: WHITE, nose: "#141110", upper: "#2a2625", mid: BLACK, sock: BLACK, eye: "#0d0b0b", cheek: WHITE };
// (its bands: black from the muzzle through each eye to the ear, the blaze between them and its cheeks white; `w` their width)
const bands = (w = 1) => (cy, sx) => { const a = Math.abs(sx); return cy > -0.55 && a > 0.3 / w && a < 0.3 / w + 0.5 * w ? BLACK : cy > -0.2 ? WHITE : undefined; };
const brock = (C, o) => quad({ C, hind: { len: 0.44, thick: 1.9, ...o.hind }, fore: { len: 0.44, thick: 2.0, ...o.fore }, body: { len: 0.95, girth: 1.3, deep: 0.95, tuck: 1.05, neck: [0.03, 0.15], neckThick: 1.35, white: 0.5, ...o.body },
  head: { size: 1.08, muzzle: 0.85, muzzleWide: 1.2, wide: 1.02, dome: 0.92, cheek: 0, eye: 0.9, stripe: bands(o.bands ?? 1), ...o.head, ear: { shape: "round", tall: 0.55, wide: 1.0, at: [0.016, -0.014, -0.012], back: BLACK, inner: WHITE, tip: WHITE, ...o.ear } } });
const badger = {
  // a round fluffy cub that's all face: an oversized white blaze, tiny legs
  baby() {
    const C = { ...BADGER, coat: "#a3a39d" }, q = brock(C, { hind: { len: 0.3, thick: 2.0 }, fore: { len: 0.3, thick: 2.0 }, body: { len: 0.58, girth: 1.3, neck: [0.02, 0.09] }, head: { size: 1.5, muzzle: 0.6, eye: 1.3 }, bands: 0.75 });
    const t = tail("tail", "pelvis", q.root, { len: 0.1, r: 0.034, pitch: -0.3, blunt: 0.08, tip: 0, colours: { coat: C.coat, tip: C.coat } });
    return plan("badger-baby", q.body, q.skull, [...q.legs, t], trundle({ seconds: 0.46, tails: [t.chain] }));
  },
  // a longer, flatter wedge: the blaze nose to crown between two black bands
  young() {
    const q = brock(BADGER, { body: { len: 0.9, girth: 1.1, tuck: 0.95 }, head: { size: 1.02 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.17, r: 0.04, pitch: -0.35, blunt: 0.08, tip: 0, colours: { coat: "#a3a39d", tip: "#a3a39d" } });
    return plan("badger-young", q.body, q.skull, [...q.legs, t], trundle({ tails: [t.chain] }));
  },
  // a broad armoured-looking back in layered shaggy plates, heavy forelegs with big pale claws, the bands pushed wider, a bristled tail
  adult() {
    const q = brock(BADGER, { fore: { len: 0.46, thick: 2.4, paw: 1.5, claws: { colour: "#e9e2cf", len: 2.2, thick: 1.8, wide: 1.2 } }, hind: { len: 0.46, thick: 2.0, claws: { colour: "#e9e2cf", len: 1.2, thick: 1.4 } }, body: { len: 1.0, girth: 1.5, deep: 0.92, hump: 0.5 }, head: { size: 1.12 }, bands: 1.25 }), R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 0.24, r: 0.055, pitch: -0.25, blunt: 0.08, tip: 0.3, colours: { coat: "#a3a39d", tip: WHITE }, spikes: { n: 3, colour: WHITE, len: 0.6 } });
    const shag = [1, 2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 4, a0: 0.15, a1: 1.7, long: 0.15, sweep: 0.97, droop: 0.12, r: 0.11, flat: 0.28, jitter: 0.15, sides: 5, lock: true, colour: k => (k % 2 ? "#6c6c68" : "#85857f"), tip: () => "#c9c6bb" }));
    return plan("badger-adult", q.body, q.skull, [...q.legs, t], trundle({ tails: [t.chain] }), { cones: shag });
  },
  // the elder: wide and low as a barrow, grizzled and scarred, its stripes running on down its back as chalk lines that shine
  // at night; standing stones grown from its spine, a lit mark on each; a bronze torc; claws like blades
  legend() {
    const CHALK = "#f7f6ee", STONE = "#8b8f8c", RUNE = "#bfe8d0", MARK = "#10b98a", C = { ...BADGER, coat: "#6f6f73", muzzle: "#dcd8cc", eyes: [{ colour: RUNE, glow: true }, { colour: "#e6ecec" }] };
    const q = brock(C, { fore: { len: 0.5, thick: 2.6, paw: 1.6, knob: 1.2, claws: { colour: "#b9bcb8", len: 3.2, thick: 2, wide: 1.25 } }, hind: { len: 0.5, thick: 2.2, knob: 1.2, claws: { colour: "#b9bcb8", len: 1.6, thick: 1.5 } }, body: { len: 1.1, girth: 1.75, deep: 0.9, hump: 0.9, neck: [0.02, 0.17], neckThick: 1.5 }, head: { size: 1.2, muzzle: 0.9, eye: 1.2 }, ear: { torn: 1 }, bands: 1.3 }), R = q.R, P = q.P;
    const t = tail("tail", "pelvis", q.root, { len: 0.28, r: 0.06, pitch: -0.25, blunt: 0.08, tip: 0.3, colours: { coat: "#9a9a96", tip: CHALK }, spikes: { n: 3, colour: CHALK, len: 0.7 } });
    // the stones along its spine, tallest over the shoulders, a mark lit on each
    const top = i => [0, R[i].at[1] + R[i].ry * 0.9, R[i].at[2]], stones = [[1, 0.13], [2, 0.17], [3, 0.24], [4, 0.2]].flatMap(([i, h]) => [{ at: top(i), rx: 0.085, ry: 0.04, tip: [0.01, top(i)[1] + h * 1.25, top(i)[2] - 0.02], bone: BONES[i], colour: STONE, tipColour: "#a4a8a5", split: 0.93, up: [0, 0, 1], sides: 5 },
      { at: [0, top(i)[1] + h * 0.55, top(i)[2] + 0.04], rx: 0.03, ry: 0.03, tip: [0, top(i)[1] + h * 0.6, top(i)[2] + 0.065], bone: BONES[i], colour: RUNE, glow: true, up: [0, 1, 0], sides: 4 }]);
    const shag = [1, 2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 1.5, a1: 2.2, long: 0.12, sweep: 0.7, droop: 0.6, r: 0.07, flat: 0.45, colour: k => (k % 2 ? "#505053" : "#7a7a7d"), tip: () => "#a9a69b" }));
    // the torc at its throat
    const torc = band("neck", R[5].at, R[6].at, { at: 0.2, r: R[5].rx * 1.04, ry: R[5].ry * 1.04, wide: 0.022, colour: BRONZE });
    // (Ed, 2026-11-12: "The badger's runes can be along the stripes on its back") its face's stripes run on down its back either
    // side of the stones as raised chalk, from its neck to its rump, the barrow's marks lit along them
    const armour = [{ from: 0.7, to: 4.85, round: [0.5, 1.0], inset: 0.14, lames: 6, thick: 0.016, step: 0.006, colour: CHALK, rim: "#c9c6b8", runes: { colour: MARK, size: 0.55, max: 1 } }];
    const scars = [{ at: P(0.03, 0.06, 0.15), rx: 0.006, ry: 0.004, tip: P(0.05, -0.02, 0.2), bone: "head", colour: "#c98a80", up: [0, 0, 1], sides: 3 }];
    return plan("badger-legend", q.body, q.skull, [...q.legs, t, torc], trundle({ seconds: 0.95, sway: 0.07, tails: [t.chain], legs: walk(0.85) }), { cones: [...shag, ...stones, ...scars], armour });
  },
};

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
      lofts.push({ sides: 4, up: [0, 1, 0], rings: [0, 0.25, 0.5, 0.75, 1].map(t => ({ at: [root[0] + (d[0] * t + hook[0] * 0.55 * t * t) * L, root[1] - 0.45 * t * t * L, root[2] + (d[2] * t + hook[2] * 0.55 * t * t) * L], rx: Math.max(0.0008, 0.02 * size * (1 - t) ** 0.7), ry: Math.max(0.0008, 0.011 * size * (1 - t) ** 0.7), bone, colour: claw })) }); } }
  return { bones: [], lofts, cones }; };
const star = (P, n, r, colour, glow = false) => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return { at: P(Math.cos(a) * 0.012, -0.013 + Math.sin(a) * 0.012, 0.265), rx: 0.007, ry: 0.007, tip: P(Math.cos(a) * r, -0.013 + Math.sin(a) * r, 0.285), bone: "head", colour, glow, up: [0, 0, 1], sides: 3 }; });
const mole = {
  // a pink-nosed velvet bean, its hands already too big
  baby() {
    const q = digger(MOLE, { hind: { len: 0.18, thick: 2.2 }, fore: { len: 0.18, thick: 2.4, paw: 2.6, spread: 2.3, claws: { colour: "#f3e9dc", len: 1.0, thick: 1.5, wide: 2.2 } }, body: { len: 0.48, girth: 1.2 }, head: { size: 1.3, muzzle: 0.7, nose: 2.0 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.05, r: 0.016, pitch: 0.2, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    return plan("mole-baby", q.body, q.skull, [...q.legs, t, spades(q, 0.8, "#f3e9dc", 0.6)], trundle({ seconds: 0.4, sway: 0.11, tails: [t.chain] }));
  },
  // a short barrel, broad pink hands turned outward
  young() {
    const q = digger(MOLE, { body: { len: 0.66, girth: 1.15 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.07, r: 0.016, pitch: 0.2, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    return plan("mole-young", q.body, q.skull, [...q.legs, t, spades(q, 1.1, "#f3e9dc", 0.8)], trundle({ seconds: 0.46, sway: 0.11, tails: [t.chain] }));
  },
  // huge clawed spade hands, a long snout feeling ahead with its star, whiskers, a body like a furred boulder
  adult() {
    const q = digger(MOLE, { fore: { len: 0.28, thick: 2.6, paw: 3.8, spread: 2.5 }, hind: { len: 0.26, thick: 2.2 }, body: { len: 0.78, girth: 1.6, hump: 0.6, neckThick: 1.1 }, head: { size: 1.2, muzzle: 1.0 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.08, r: 0.018, pitch: 0.3, blunt: 0.4, tip: 0, colours: { coat: PINK, tip: PINK } });
    return plan("mole-adult", q.body, q.skull, [...q.legs, t, spades(q, 1.9, "#f3e9dc", 1.2)], trundle({ seconds: 0.55, sway: 0.1, tails: [t.chain] }), { cones: [...star(q.P, 8, 0.05, PINK), ...whiskers(q.P, "#cfc6d6", 0.9)] });
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
    return plan("mole-legend", q.body, q.skull, [...q.legs, t, spades(q, 2.6, STEEL, 1.5, C.belly)], trundle({ seconds: 0.9, sway: 0.08, tails: [t.chain], legs: walk(0.85) }), { cones: [...clods, ...roots, ...star(P, 11, 0.085, "#ffb8c8", true), ...whiskers(P, "#cfc6d6", 1.3)], armour });
  },
};

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
    return plan("hedgehog-baby", q.body, q.skull, q.legs, trundle({ seconds: 0.34, sway: 0.05 }), { cones: spines(q.R, { n: 3, long: 0.07, r: 0.026, down: 1.3, sweep: 0.45, colour: () => "#8f7a5e", tip: () => "#ffffff" }) });
  },
  // a full coat of short spines, a pointed snout, quick little legs
  young() {
    const q = urchin(HOG, { body: { len: 0.58, girth: 1.2 } });
    return plan("hedgehog-young", q.body, q.skull, q.legs, trundle({ seconds: 0.36, sway: 0.05 }), { cones: spines(q.R, { n: 5, long: 0.075 }) });
  },
  // long banded spines flared into a fan, a skirt of fur under them, a longer snout
  adult() {
    const q = urchin(HOG, { body: { len: 0.66, girth: 1.45, hump: 0.8 }, head: { size: 1.02, muzzle: 1.2 } }), R = q.R;
    const skirt = [2, 3, 4].flatMap(i => tufts(R[i], BONES[i], { n: 2, a0: 1.95, a1: 2.4, long: 0.07, sweep: 0.4, droop: 0.7, r: 0.045, lock: true, colour: () => HOG.belly, tip: () => "#a98a62" }));
    return plan("hedgehog-adult", q.body, q.skull, q.legs, trundle({ seconds: 0.42, sway: 0.05 }), { cones: [...spines(q.R, { n: 6, long: 0.2, sweep: 0.42, r: 0.03, jitter: 0.5, colour: k => (k % 2 ? "#5a4332" : "#3c2c20"), tip: () => "#f3e7c9" }), ...skirt, ...whiskers(q.P, "#e6d2b4", 0.7)] });
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
    return plan("hedgehog-legend", q.body, q.skull, q.legs, trundle({ seconds: 0.85, sway: 0.06, legs: walk(0.85) }), { cones: [...spears, ...skirt, ...whiskers(P, "#e6e9ec", 1.4)], armour });
  },
};

// (asleep, the mole's great hands stay flat on the ground beside it: art/mesh/gear.js `napping` reads gait.lie)
export const BADGER_PLANS = badger, HEDGEHOG_PLANS = hedgehog, MOLE_PLANS = Object.fromEntries(Object.entries(mole).map(([level, make]) => [level, () => { const p = make(); p.gait.lie = { fore: [-0.3, 0.1, 0.1] }; return p; }]));
