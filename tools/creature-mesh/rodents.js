// The hare, the squirrel and the dormouse, four levels each, as plans for tools/creature-mesh/quadruped.js
// (docs/plans/creature-meshes.md; the ladders are proposals till Ed marks them). Hoppers and scurriers: haunches bigger than
// their shoulders, a rounded back, a blunt head with the eyes set high on its sides. On Ed's word for the fox (2026-11-11): the
// adult already wears its signature loud, the legend is another, older, stranger creature, and "I like magical armour pieces
// on legends".
import { ball, band, bound, plan, plate, quad, tail, tufts, walk } from "./kit.js";

const NOSE = "#2a1c18", BLACK = "#17120f", GOLD = "#e9b949", SILVER = "#dfe5ec";
const hop = (o = {}) => ({ seconds: 0.48, duty: 0.45, bob: 0.03, bobs: 1, sway: 0.015, rock: 0.14, tailSwing: 0.08, legs: bound(1.3), ...o });
const whiskers = (P, colour, long = 1, bone = "head") => [1, -1].flatMap(s => [[-0.03, 0.15], [0.0, 0.12]].map(([dy, dz]) => ({ at: P(0.03 * s, -0.005, 0.2), rx: 0.006, ry: 0.006, tip: P((0.03 + 0.14 * long) * s, dy * long, dz), bone, colour, up: [0, 1, 0], sides: 3 })));

// ---- The hare (bluebell glade): the ears, and the long hind legs.
const HARE = { coat: "#b48d60", belly: "#f0e7d6", nose: NOSE, upper: "#b48d60", mid: "#a17a50", sock: "#8a6842" };
const hareBuild = (C, o) => quad({ C, hind: { len: 0.78, thick: 1.25, foot: 2.3, ...o.hind }, fore: { len: 0.56, thick: 0.95, ...o.fore }, body: { len: 0.86, girth: 0.98, deep: 1.0, tuck: 0.9, arch: 1.1, rump: 1.28, neck: [0.13, 0.1], neckThick: 1.05, white: 0.5, ...o.body },
  head: { size: 1.02, muzzle: 0.55, muzzleWide: 1.45, muzzleDeep: 1.3, dome: 1.12, wide: 0.9, cheek: 0, eye: 1.7, eyeAt: [0.004, 0.012, -0.02], nose: 0.9, ...o.head, ear: { shape: "long", tall: 1.6, wide: 1, at: [-0.012, 0.0, -0.03], back: C.coat, inner: "#d8a996", tip: BLACK, ...o.ear } } });
const scut = (root, o = {}) => tail("tail", "pelvis", [root[0], root[1] + 0.02, root[2] + 0.02], { len: 0.09, r: 0.055, pitch: 0.7, tip: 0.75, blunt: 0.5, colours: { coat: "#5a4630", tip: "#ffffff" }, ...o });
const hare = {
  // a leveret pressed flat: ears short and laid back, huge dark eyes
  baby() {
    const C = { ...HARE, coat: "#a8845c", upper: "#a8845c", mid: "#a8845c" }, q = hareBuild(C, { hind: { len: 0.4, thick: 1.7, foot: 1.5 }, fore: { len: 0.32, thick: 1.5 }, body: { len: 0.6, girth: 1.05, arch: 0.6, rump: 1.15, neck: [0.06, 0.07], neckThick: 1.2 }, head: { size: 1.22, eye: 2.1 }, ear: { tall: 0.7, lean: 1.15, wide: 1.2 } });
    const t = scut(q.root, { len: 0.06, r: 0.04 });
    return plan("hare-baby", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.4, bob: 0.018, rock: 0.09, tails: [t.chain] }));
  },
  // ears up and already too long for it, gangly back legs
  young() {
    const q = hareBuild(HARE, { hind: { len: 0.82, thick: 1.0 }, fore: { len: 0.6, thick: 0.85 }, body: { len: 0.82, girth: 0.82, tuck: 0.8, rump: 1.2 }, head: { size: 0.95 }, ear: { tall: 1.9, lean: 0.1, wide: 0.9 } });
    const t = scut(q.root);
    return plan("hare-young", q.body, q.skull, [...q.legs, t], hop({ tails: [t.chain] }));
  },
  // tall black-tipped ears like blades, a deep chest with a ruff, hind legs like springs, whiskers out wide
  adult() {
    const q = hareBuild(HARE, { hind: { len: 0.9, thick: 1.3, foot: 2.5 }, fore: { len: 0.62, thick: 1.0 }, body: { len: 0.9, girth: 1.02, deep: 1.18, tuck: 0.78, rump: 1.38, neckThick: 1.2 }, head: { size: 1.06 }, ear: { tall: 2.7, lean: 0.12, wide: 1.15, splay: 0.16 } });
    const t = scut(q.root, { len: 0.11, r: 0.065 });
    const ruff = tufts(q.R[5], "neck", { n: 4, a0: 1.2, a1: 2.95, long: 0.11, sweep: 0.5, droop: 0.45, r: 0.04, colour: () => HARE.belly });
    const crest = tufts(q.R[4], "chest", { n: 1, a0: 0.1, long: 0.1, sweep: 0.8, r: 0.035, colour: () => HARE.coat, tip: () => "#6e5334" });
    return plan("hare-adult", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.52, tails: [t.chain] }), { cones: [...ruff, ...crest, ...whiskers(q.P, "#f0e7d6", 1.1)] });
  },
  // the moon's hare: silvered and lean and very tall in the leg, its ears twice its own height, notched and ringed; a crescent
  // lit on its brow and a small moon carried between its ears; moon-silver on its haunches and shins, each plate with a pale stone
  legend() {
    const MOON = "#f4f7ff", GLOW = "#cfe6ff", C = { coat: "#c9ced6", back: "#9ea5b0", belly: "#f3f5f8", nose: NOSE, upper: "#c9ced6", mid: "#aab0ba", sock: "#7f8794", eyes: [{ colour: GLOW, glow: true }, { colour: GLOW, glow: true }] };
    const q = hareBuild(C, { hind: { len: 1.1, thick: 1.3, foot: 2.6, knob: 1.25, claws: { colour: "#3a3f48", len: 1 }, band: { colour: SILVER, at: 0.3, r: 0.045 } }, fore: { len: 0.78, thick: 1.0, knob: 1.25, band: { colour: SILVER, at: 0.3, r: 0.036 } }, body: { len: 0.98, girth: 0.96, deep: 1.25, tuck: 0.62, rump: 1.4, hump: 0.3, neck: [0.2, 0.1], neckThick: 1.15 }, head: { size: 1.12, muzzle: 0.62, eye: 1.6 }, ear: { tall: 5.2, lean: 0.06, wide: 1.25, splay: 0.09, back: "#aab0ba", inner: "#e9d2cc", tip: "#3a3f48", torn: -1 } }), P = q.P, R = q.R;
    const t = scut(q.root, { len: 0.13, r: 0.07, colours: { coat: "#9ea5b0", tip: "#ffffff" } });
    // the moon it carries, held between its ears; the crescent on its brow
    const moon = ball("head", P(0, 0.62, -0.03), { r: 0.085, colour: MOON, glow: true });
    const crescent = [1, -1].map(s => ({ at: P(0.012 * s, 0.092, 0.1), rx: 0.03, ry: 0.012, tip: P(0.06 * s, 0.14, 0.085), bone: "head", colour: GLOW, glow: true, up: [0, 0, 1], sides: 4 }));
    // rings in its ears
    const rings = [0.55, 0.8].flatMap((f, i) => [1].map(s => ({ at: P((0.036 + 0.1 * f) * s, 0.07 * 1.12 + 0.82 * f, -0.03), rx: 0.03, ry: 0.012, tip: P((0.036 + 0.1 * f) * s + 0.07, 0.07 * 1.12 + 0.82 * f - 0.02, -0.03), bone: "earL", colour: SILVER, split: 0.8, up: [0, 1, 0], sides: 4 })));
    // armour: a plate on each haunch and shoulder, a crest plate on its chest
    const hip = R[1].at, sh = R[4].at, plates = [...[1, -1].map(s => plate("pelvis", [R[1].rx * 0.92 * s, hip[1] + 0.02, hip[2] + 0.03], [s, 0.35, -0.1], { r: 0.095, high: 0.04, colour: SILVER, rim: "#8d96a3", gem: { colour: GLOW }, up: [0, 0, 1] })),
      ...[1, -1].map(s => plate("chest", [R[4].rx * 0.9 * s, sh[1] + 0.03, sh[2] - 0.01], [s, 0.5, 0.1], { r: 0.065, high: 0.035, colour: SILVER, rim: "#8d96a3", gem: { colour: GLOW }, up: [0, 0, 1] })),
      plate("chest", [0, sh[1] - R[4].ry * 0.5, sh[2] + 0.07], [0, -0.4, 1], { r: 0.07, ry: 0.085, high: 0.03, colour: SILVER, rim: "#8d96a3", gem: { colour: GLOW } })];
    const mane = tufts(R[5], "neck", { n: 4, a0: 0.9, a1: 2.95, long: 0.16, sweep: 0.55, droop: 0.5, r: 0.05, colour: () => "#f3f5f8", tip: () => "#aab0ba" });
    return plan("hare-legend", q.body, q.skull, [...q.legs, t, moon, ...plates], hop({ seconds: 0.85, bob: 0.02, rock: 0.09, tails: [t.chain], legs: bound(1.05) }), { cones: [...crescent, ...rings, ...mane, ...whiskers(P, "#f3f5f8", 1.6)] });
  },
};

// ---- The squirrel (twiggy forest): the tail, as big as the animal.
const SQ = { coat: "#b8521f", belly: "#f6efe4", nose: NOSE, upper: "#b8521f", mid: "#a4471a", sock: "#8a3a15" }, SQT = { coat: "#a3441a", under: "#7e3212", tip: "#c96a2c" };
const sqBuild = (C, o) => quad({ C, hind: { len: 0.5, thick: 1.5, foot: 1.6, ...o.hind }, fore: { len: 0.38, thick: 1.15, ...o.fore }, body: { len: 0.62, girth: 0.98, deep: 1.0, tuck: 0.95, arch: 1.2, rump: 1.25, neck: [0.09, 0.08], neckThick: 1.1, white: 0.55, ...o.body },
  head: { size: 1.08, muzzle: 0.5, muzzleWide: 1.2, muzzleDeep: 1.15, dome: 1.1, wide: 1.02, cheek: 0, eye: 1.75, eyeAt: [0.002, 0.008, -0.015], ...o.head, ear: { tall: 0.8, wide: 0.85, back: C.coat, ...o.ear } } });
const eartufts = (P, tall, colour) => [1, -1].map(s => ({ at: P(0.07 * s, 0.17, 0.012), rx: 0.016, ry: 0.014, tip: P(0.085 * s, 0.17 + 0.1 * tall, 0.0), bone: s > 0 ? "earL" : "earR", colour, up: [0, 0, 1] }));
const squirrel = {
  // a pink-eared kit with a thin tail like a string
  baby() {
    const C = { ...SQ, coat: "#c06a3a", upper: "#c06a3a", mid: "#c06a3a" }, q = sqBuild(C, { hind: { len: 0.36, thick: 1.7 }, fore: { len: 0.3, thick: 1.4 }, body: { len: 0.5, girth: 1.0, arch: 0.7, neck: [0.05, 0.06] }, head: { size: 1.3, eye: 2.0 }, ear: { tall: 0.7, wide: 1.1, back: "#e6a58f" } });
    const t = tail("tail", "pelvis", q.root, { len: 0.26, r: 0.022, pitch: 0.7, curl: -0.9, blunt: 0.4, tip: 0, colours: { coat: C.coat, tip: C.coat } });
    return plan("squirrel-baby", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.36, bob: 0.014, rock: 0.08, tails: [t.chain] }));
  },
  // ear tufts starting, the tail a bottle-brush held straight up
  young() {
    const q = sqBuild(SQ, { body: { len: 0.6, girth: 0.86 }, head: { size: 1.0 }, ear: { tall: 0.9 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.42, r: 0.062, pitch: 1.45, curl: 0.25, blunt: 0.35, tip: 0.18, colours: SQT });
    return plan("squirrel-young", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.4, bob: 0.02, tails: [t.chain] }), { cones: eartufts(q.P, 0.6, SQ.mid) });
  },
  // a great plumed tail curled over its back, bigger than it is; tall ear tufts; a hoarder's fat cheeks
  adult() {
    const q = sqBuild(SQ, { body: { len: 0.66, girth: 1.05, rump: 1.3 }, head: { size: 1.1, wide: 1.14, cheek: 0.45 }, ear: { tall: 0.95 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.78, r: 0.15, pitch: 1.35, curl: 1.5, wave: 0.2, waves: 0.8, bones: 6, blunt: 0.3, tip: 0.16, colours: SQT, spikes: { n: 6, colour: "#d9803a", len: 0.9 } });
    return plan("squirrel-adult", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.42, bob: 0.022, tails: [t.chain], tailSwing: 0.05 }), { cones: [...eartufts(q.P, 1.6, "#7e3212"), ...whiskers(q.P, "#f6efe4", 0.8)] });
  },
  // the keeper of the hoard: grizzled, its tail a sail of red-gold fur coiled twice and carrying the first acorn, lit; a cap
  // of an acorn's cup, walnut shells banded in gold on its shoulders with a lit stone in each, a cloak of strung nuts, tufts
  // like horns, one tooth gold
  legend() {
    const LIT = "#ffd76a", SHELL = "#8a5a34", CUP = "#6b4a2c", C = { coat: "#a84a1a", back: "#8c8178", belly: "#efe6d8", muzzle: "#d6cdc0", nose: NOSE, upper: "#a84a1a", mid: "#8c3c14", sock: "#5f2a0f", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = sqBuild(C, { hind: { len: 0.62, thick: 1.45, foot: 1.7, knob: 1.3, claws: { colour: "#e6dcc8", len: 1.1 } }, fore: { len: 0.46, thick: 1.15, knob: 1.3, claws: { colour: "#e6dcc8", len: 1 } }, body: { len: 0.74, girth: 1.12, deep: 1.1, rump: 1.35, hump: 0.4, neck: [0.1, 0.1], neckThick: 1.25 }, head: { size: 1.2, wide: 1.16, cheek: 0.6 }, ear: { tall: 1.0, torn: 1 } }), P = q.P, R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 1.25, r: 0.17, pitch: 1.2, curl: 2.5, wave: 0.3, waves: 1.0, bones: 7, blunt: 0.3, tip: 0.12, colours: { coat: "#b5561f", under: "#7e3212", tip: "#e9a94a" }, spikes: { n: 8, colour: "#e9a94a", len: 0.8 }, orb: { colour: LIT, size: 1.2 }, ring: { colour: GOLD, at: 0.3 } });
    // the acorn-cup cap with its stalk, and the horn-tufts
    const cap = [plate("head", P(0, 0.085, 0.06), [0, 1, -0.1], { r: 0.085 * 1.2, ry: 0.08 * 1.2, high: 0.06, colour: CUP, rim: "#4f3620", up: [0, 0, 1], sides: 8 })], stalk = [{ at: P(0, 0.14, 0.05), rx: 0.014, ry: 0.014, tip: P(0.02, 0.22, 0.03), bone: "head", colour: "#4f3620", up: [0, 0, 1] }];
    const sh = R[4].at, pauldrons = [1, -1].map(s => plate("chest", [R[4].rx * 0.9 * s, sh[1] + 0.03, sh[2] - 0.01], [s, 0.6, 0.05], { r: 0.085, high: 0.06, colour: SHELL, rim: GOLD, gem: { colour: LIT }, up: [0, 0, 1], sides: 7 }));
    // the cloak: nuts strung round its shoulders
    const NUTS = ["#7a4d2a", "#b9853f", "#5c3a20", "#c9a35a"], cloak = [...tufts(R[4], "chest", { n: 5, a0: 0.5, a1: 2.6, long: 0.07, sweep: 0.3, droop: 0.9, r: 0.036, flat: 1, sides: 5, jitter: 0.2, colour: i => NUTS[i % 4], tip: i => NUTS[(i + 1) % 4] }), ...tufts(R[5], "neck", { n: 4, a0: 0.6, a1: 2.6, long: 0.06, sweep: 0.3, droop: 0.9, r: 0.03, flat: 1, sides: 5, jitter: 0.2, colour: i => NUTS[(i + 2) % 4] })];
    const tooth = [{ at: P(0.008, -0.03, 0.235), rx: 0.008, ry: 0.006, tip: P(0.008, -0.062, 0.24), bone: "head", colour: GOLD, up: [0, 0, 1], sides: 3 }];
    return plan("squirrel-legend", q.body, q.skull, [...q.legs, t, ...cap, ...pauldrons], hop({ seconds: 0.7, bob: 0.014, rock: 0.07, tails: [t.chain], tailSwing: 0.04, legs: bound(1.0) }), { cones: [...stalk, ...eartufts(P, 3.2, "#8c8178"), ...cloak, ...tooth, ...whiskers(P, "#efe6d8", 1.5)] });
  },
};

// ---- The dormouse (honeysuckle tangle): the big dark eyes, the furred tail, the curl of its sleep.
const DOR = { coat: "#d59a40", belly: "#f7ecd4", nose: "#c98a80", upper: "#d59a40", mid: "#c0862f", sock: "#f0d9c0", eye: BLACK };
const dorBuild = (C, o) => quad({ C, hind: { len: 0.32, thick: 1.6, foot: 1.3, ...o.hind }, fore: { len: 0.28, thick: 1.3, ...o.fore }, body: { len: 0.55, girth: 1.0, deep: 1.0, tuck: 1.0, arch: 0.8, rump: 1.15, neck: [0.06, 0.07], neckThick: 1.2, white: 0.5, ...o.body },
  head: { size: 1.2, muzzle: 0.42, muzzleWide: 1.1, dome: 1.08, wide: 1.05, cheek: 0, eye: 2.1, eyeAt: [0.0, 0.004, -0.012], nose: 0.9, ...o.head, ear: { shape: "round", tall: 0.75, wide: 1.25, at: [0.012, -0.012, -0.012], back: C.coat, inner: "#e9b9a8", ...o.ear } } });
const dormouse = {
  // a big-eyed baby with a short thin tail
  baby() {
    const C = { ...DOR, coat: "#c9a070", upper: "#c9a070", mid: "#c9a070" }, q = dorBuild(C, { hind: { len: 0.26, thick: 1.7 }, fore: { len: 0.24, thick: 1.5 }, body: { len: 0.44, girth: 0.95 }, head: { size: 1.42, eye: 2.4 }, ear: { tall: 0.9, wide: 1.4 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.16, r: 0.016, pitch: -0.1, blunt: 0.4, tip: 0, colours: { coat: "#b98f62", tip: "#b98f62" } });
    return plan("dormouse-baby", q.body, q.skull, [...q.legs, t], { seconds: 0.4, duty: 0.55, bob: 0.008, sway: 0.07, tailSwing: 0.2, tails: [t.chain], legs: walk(1.1) });
  },
  // slim and leggy, its tail not yet bushy
  young() {
    const q = dorBuild(DOR, { hind: { len: 0.42, thick: 1.2 }, fore: { len: 0.36, thick: 1.0 }, body: { len: 0.6, girth: 0.8, tuck: 0.85 }, head: { size: 1.08 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.42, r: 0.026, pitch: -0.05, curl: 0.4, blunt: 0.4, tip: 0, colours: { coat: DOR.mid, tip: DOR.mid } });
    return plan("dormouse-young", q.body, q.skull, [...q.legs, t], { seconds: 0.44, duty: 0.55, bob: 0.008, sway: 0.06, tailSwing: 0.18, tails: [t.chain], legs: walk(1.1) });
  },
  // fattened for its long sleep, golden, its full furred tail curled up over it like a blanket, whiskers out wide
  adult() {
    const q = dorBuild(DOR, { body: { len: 0.6, girth: 1.42, deep: 1.05, rump: 1.2 }, head: { size: 1.26 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.62, r: 0.085, pitch: 1.1, curl: 2.0, bones: 6, blunt: 0.35, tip: 0.12, colours: { coat: "#c88a30", under: "#a8701f", tip: "#f7ecd4" }, spikes: { n: 5, colour: "#e9bb62", len: 0.7 } });
    return plan("dormouse-adult", q.body, q.skull, [...q.legs, t], { seconds: 0.62, duty: 0.6, bob: 0.01, sway: 0.08, tailSwing: 0.05, tails: [t.chain], legs: walk(0.95) }, { cones: whiskers(q.P, "#f7ecd4", 1.2) });
  },
  // the sleeper: vast and round and never quite awake, its eyes shut; honeysuckle grown through its fur and flowering, lit; a
  // nest of woven grass on its back; hazel shells banded in gold on its shoulders, each with a dream-stone; whiskers like rods
  legend() {
    const DREAM = "#c9a8ff", BLOOM = "#fff0b8", STRAW = "#cdb06a", SHELL = "#9a6a3a", C = { ...DOR, coat: "#c98f3a", back: "#b9a48a", belly: "#f3e6cc", muzzle: "#e6d8c0", upper: "#c98f3a", mid: "#b07a2c", eye: "#6a4a2a" };
    const q = dorBuild(C, { hind: { len: 0.44, thick: 1.9, knob: 1.2 }, fore: { len: 0.4, thick: 1.6, knob: 1.2 }, body: { len: 0.72, girth: 1.95, deep: 1.0, rump: 1.15, neck: [0.04, 0.1], neckThick: 1.5 }, head: { size: 1.75, eye: 0.7, eyeAt: [0.004, -0.004, -0.012] }, ear: { tall: 0.8, wide: 1.3, torn: -1 } }), P = q.P, R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 1.0, r: 0.13, pitch: 0.9, curl: 2.6, wave: 0.2, bones: 6, blunt: 0.35, tip: 0.1, colours: { coat: "#b9802c", under: "#96661f", tip: "#f3e6cc" }, spikes: { n: 7, colour: "#e9bb62", len: 0.9 } });
    // the nest: a ring of straw on its back, ends sticking out
    const top = r => [0, r.at[1] + r.ry * 0.86, r.at[2]], nest = [band("loin", top(R[2]), [0, top(R[2])[1] + 0.12, R[2].at[2]], { at: 0.25, r: 0.2, ry: 0.19, wide: 0.07, colour: STRAW, up: [0, 0, 1], sides: 9 })];
    const straws = Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2, c = top(R[2]); return { at: [c[0] + Math.cos(a) * 0.17, c[1] + 0.03, c[2] + Math.sin(a) * 0.17], rx: 0.02, ry: 0.015, tip: [c[0] + Math.cos(a) * 0.3, c[1] + 0.07 + 0.04 * (i % 2), c[2] + Math.sin(a) * 0.3], bone: "loin", colour: STRAW, tipColour: "#a88c4a", up: [0, 1, 0], sides: 3 }; });
    // honeysuckle: a vine round its neck and flank, its trumpets lit
    const vine = [band("chest", R[3].at, R[4].at, { at: 0.5, r: R[4].rx * 1.03, ry: R[4].ry * 1.03, wide: 0.02, colour: "#4f7a3a" })];
    const blooms = [...tufts(R[4], "chest", { n: 5, a0: 0.3, a1: 2.4, long: 0.1, sweep: 0.1, droop: -0.2, r: 0.03, sides: 5, jitter: 0.3, colour: () => "#ffd7c8", tip: () => BLOOM, glow: true }), ...tufts(R[5], "neck", { n: 3, a0: 0.4, a1: 2.0, long: 0.08, sweep: 0.0, droop: -0.2, r: 0.026, sides: 5, colour: () => BLOOM, glow: true })];
    const sh = R[4].at, pauldrons = [1, -1].map(s => plate("chest", [R[4].rx * 0.93 * s, sh[1] + 0.05, sh[2] + 0.03], [s, 0.45, 0.25], { r: 0.1, high: 0.06, colour: SHELL, rim: GOLD, gem: { colour: DREAM }, up: [0, 0, 1], sides: 7 }));
    const brow = [plate("head", P(0, 0.09, 0.09), [0, 1, 0.5], { r: 0.05, high: 0.025, colour: GOLD, gem: { colour: DREAM }, up: [0, 0, 1] })];
    return plan("dormouse-legend", q.body, q.skull, [...q.legs, t, ...nest, ...vine, ...pauldrons, ...brow], { seconds: 1.2, duty: 0.68, bob: 0.012, sway: 0.09, tailSwing: 0.03, tails: [t.chain], legs: walk(0.8) }, { cones: [...straws, ...blooms, ...whiskers(P, "#f3e6cc", 2.4)] });
  },
};

export const HARE_PLANS = hare, SQUIRREL_PLANS = squirrel, DORMOUSE_PLANS = dormouse;
