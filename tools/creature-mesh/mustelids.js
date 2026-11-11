// The stoat and the marten, four levels each, as plans for tools/creature-mesh/quadruped.js (docs/plans/creature-meshes.md; the
// ladders are proposals till Ed marks them). Both are weasels: a long supple tube of a body on short legs, a flat wedge of a
// head with round ears, and a bound for a gait, the back arching. On Ed's word for the fox (2026-11-11): the adult already wears
// its signature loud, and the legend is another, older, stranger creature, not a bigger one; "I like magical armour pieces
// on legends"; and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { bound, fourLegs, head, plan, stance, tail, torso, tufts } from "./kit.js";

const NOSE = "#16100e", BLACK = "#17120f", GOLD = "#e9b949";

/** A weasel's build from a few numbers: body { len, girth, arch, neck, neckThick, white }, legs { len, thick }, head { ... }. */
function weasel(o) {
  const st = stance(o.legs.len), body = torso({ ...st, deep: 0.86, tuck: 0.96, ...o.body, colours: o.C });
  const skull = head(body.pivot, { muzzle: 0.55, wide: 0.98, dome: 0.86, muzzleWide: 1.15, cheek: 0, eye: 1.25, ear: { shape: "round", tall: 0.62, wide: 1.25, at: [0.012, -0.012, -0.005], back: o.C.ear ?? o.C.coat, inner: o.C.inner ?? "#c98f6e" }, ...o.head, colours: o.C });
  return { body, skull, legs: fourLegs(body, { colours: o.C, ...o.legs }), root: [0, body.rings[1].at[1] + 0.01, body.rings[0].at[2] + 0.03] };
}
const lope = (o = {}) => ({ seconds: 0.5, duty: 0.5, bob: 0.014, bobs: 1, sway: 0.02, rock: 0.11, tailSwing: 0.1, legs: bound(1.15), ...o });

// ---- The stoat (alder forest): the long neck, the upright stand, the black tail tip; its war dance.
const STOAT = { coat: "#b9743d", belly: "#f6f0e3", nose: NOSE, upper: "#b9743d", mid: "#a5642f", sock: "#f0e8d8" };
const stoat = {
  // a tiny pale kit with a mane of baby fur at its neck
  baby() {
    const C = { ...STOAT, coat: "#c99a72", upper: "#c99a72", mid: "#c99a72", sock: "#e9dcc8" };
    const w = weasel({ C, body: { len: 0.78, girth: 0.72, arch: 0.5, neck: [0.07, 0.09], neckThick: 1.15, white: 0.7 }, legs: { len: 0.34, thick: 1.7 }, head: { size: 1.18, muzzle: 0.42, eye: 1.6 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.13, r: 0.03, pitch: 0.1, tip: 0.3, blunt: 0.3, colours: { coat: C.coat, tip: "#5a4234" } });
    const mane = tufts(w.body.rings[5], "neck", { n: 3, a0: 0.3, a1: 2.0, long: 0.07, sweep: 0.5, r: 0.04, lock: true, colour: () => "#efe3cf" });
    return plan("stoat-baby", w.body, w.skull, [...w.legs, t], lope({ seconds: 0.42, tails: [t.chain], rock: 0.08 }), { cones: mane });
  },
  // a slim tube of an animal, the black tip just showing
  young() {
    const w = weasel({ C: STOAT, body: { len: 1.12, girth: 0.56, arch: 0.9, neck: [0.14, 0.14], neckThick: 0.95, white: 0.72 }, legs: { len: 0.4, thick: 1.35 }, head: { size: 0.94, eye: 1.4 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.26, r: 0.034, pitch: -0.1, tip: 0.3, blunt: 0.3, colours: { coat: STOAT.coat, tip: BLACK } });
    return plan("stoat-young", w.body, w.skull, [...w.legs, t], lope({ tails: [t.chain] }));
  },
  // the neck held high as a periscope, a white belly, the tail's black brush flared, a crest raised down its neck for the dance
  adult() {
    const w = weasel({ C: STOAT, body: { len: 1.3, girth: 0.6, arch: 1.2, neck: [0.3, 0.1], neckThick: 0.92, white: 0.78 }, legs: { len: 0.44, thick: 1.35 }, head: { size: 1.02, eye: 1.5 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.5, r: 0.09, pitch: 0.6, curl: -0.6, tip: 0.6, plume: true, colours: { coat: STOAT.coat, tip: BLACK } });
    const crest = [...tufts(w.body.rings[6], "neck", { n: 1, a0: 0.1, long: 0.12, sweep: 0.7, r: 0.035, colour: () => STOAT.coat, tip: () => BLACK }), ...tufts(w.body.rings[5], "neck", { n: 1, a0: 0.1, long: 0.13, sweep: 0.7, r: 0.038, colour: () => STOAT.coat, tip: () => BLACK }), ...tufts(w.body.rings[4], "chest", { n: 1, a0: 0.1, long: 0.09, sweep: 0.8, r: 0.03, colour: () => STOAT.coat, tip: () => BLACK })];
    return plan("stoat-adult", w.body, w.skull, [...w.legs, t], lope({ tails: [t.chain] }), { cones: crest });
  },
  // the white one: in full ermine and longer than a stoat should be, its neck risen like a snake's; three black plumes for a
  // tail; a king's robe turned back on its makers: a collar of ermine tails; a gold circlet, and its neck sheathed in gold plate
  // cut with lit marks; gold on its forelegs; eyes that hold you
  legend() {
    const WHITE = "#f4f2ec", C = { coat: WHITE, belly: "#ffffff", back: "#e3ded2", nose: NOSE, upper: WHITE, mid: "#e3ded2", sock: "#d8d2c4", eyes: [{ colour: "#ff5a3c", glow: true }, { colour: "#ff5a3c", glow: true }], ear: "#e3ded2" }, GEM = "#ff6a4a";
    const w = weasel({ C, body: { len: 1.45, girth: 0.72, arch: 1.5, neck: [0.36, 0.08], neckThick: 0.98, white: 0.5 }, legs: { len: 0.6, thick: 1.2, knob: 1.3, claws: { colour: BLACK, len: 0.9 }, band: { colour: GOLD, at: 0.25, r: 0.036 } }, head: { size: 1.16, muzzle: 0.62, eye: 1.5, ear: { shape: "round", tall: 0.62, wide: 1.25, at: [0.012, -0.012, -0.005], back: "#e3ded2", inner: "#c98f6e", torn: 1 } } }), P = w.skull.P;
    const tails = [-1, 0, 1].map((f, i) => tail(`tail${"abc"[i]}`, "pelvis", [0.02 * f, w.root[1], w.root[2]], { len: 0.62 - 0.1 * Math.abs(f), r: 0.07, yaw: f * 0.5, twist: f * 0.4, pitch: 0.9 - 0.3 * Math.abs(f), curl: -0.9, wave: 0.25, phase: i * 2, bones: 5, tip: 0.5, plume: true, colours: { coat: WHITE, tip: BLACK } }));
    // the collar: ermine tails hung round its shoulders, white with black tips
    const robe = [...tufts(w.body.rings[4], "chest", { n: 5, a0: 0.2, a1: 2.3, long: 0.22, sweep: 0.8, droop: 0.25, r: 0.042, flat: 1, jitter: 0.15, colour: () => "#ffffff", tip: () => BLACK }), ...tufts(w.body.rings[3], "chest", { n: 4, a0: 0.25, a1: 2.0, long: 0.2, sweep: 0.85, droop: 0.2, r: 0.04, flat: 1, jitter: 0.15, colour: () => "#ffffff", tip: () => BLACK })];
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): gold lames up the whole of its long neck, a red mark lit on each
    const armour = [{ from: 4.45, to: 6.0, round: [0, 3.2], lames: 4, thick: 0.014, step: 0.01, colour: "#c9962e", rim: "#fff0b0", runes: { colour: "#ff3b1f", round: [0.5, 2.0], size: 0.7 } }];
    // the circlet: a gold band on its brow with one stone, and three points
    const crown = [{ at: P(0, 0.085, 0.085), rx: 0.04, ry: 0.016, tip: P(0, 0.23, 0.07), bone: "head", colour: GOLD, split: 0.6, up: [0, 0, 1] }, ...[1, -1].map(s => ({ at: P(0.05 * s, 0.075, 0.07), rx: 0.028, ry: 0.014, tip: P(0.075 * s, 0.18, 0.05), bone: "head", colour: GOLD, split: 0.6, up: [0, 0, 1] })),
      { at: P(0, 0.085, 0.1), rx: 0.016, ry: 0.016, tip: P(0, 0.1, 0.125), bone: "head", colour: GEM, glow: true, up: [0, 1, 0] }];
    const whiskers = [1, -1].map(s => ({ at: P(0.03 * s, -0.005, 0.2), rx: 0.006, ry: 0.006, tip: P(0.17 * s, -0.03, 0.15), bone: "head", colour: "#ffffff", up: [0, 1, 0], sides: 3 }));
    return plan("stoat-legend", w.body, w.skull, [...w.legs, ...tails], lope({ seconds: 0.75, bob: 0.01, rock: 0.07, tailSwing: 0.07, tails: tails.map(t => t.chain) }), { cones: [...robe, ...crown, ...whiskers], armour });
  },
};

// ---- The marten (old pinewood): the long supple body, the cream bib, the climber's reach.
const MARTEN = { coat: "#5e3d28", belly: "#f2c98b", nose: NOSE, upper: "#4a2f1f", mid: "#3d261a", sock: "#2a1a13", ear: "#5e3d28", inner: "#f0d9b0" };
const martenHead = { size: 1.0, muzzle: 0.7, wide: 1.02, eye: 1.4, ear: { shape: "round", tall: 0.85, wide: 1.35, at: [0.012, -0.008, -0.005], back: MARTEN.coat, inner: "#e8cfa0" } };
const marten = {
  // a short dark kit with a bright bib, round ears too big for it
  baby() {
    const w = weasel({ C: MARTEN, body: { len: 0.78, girth: 0.78, arch: 0.4, neck: [0.07, 0.09], neckThick: 1.15, white: 0.45 }, legs: { len: 0.4, thick: 1.7 }, head: { ...martenHead, size: 1.22, muzzle: 0.5, eye: 1.7, ear: { ...martenHead.ear, tall: 1.05, wide: 1.6 } } });
    const t = tail("tail", "pelvis", w.root, { len: 0.2, r: 0.045, pitch: 0.05, blunt: 0.3, tip: 0, colours: { coat: MARTEN.coat, tip: MARTEN.coat } });
    return plan("marten-baby", w.body, w.skull, [...w.legs, t], lope({ seconds: 0.44, tails: [t.chain], rock: 0.08 }));
  },
  // stretching out, a bushy tail, big paws
  young() {
    const w = weasel({ C: MARTEN, body: { len: 1.08, girth: 0.66, arch: 0.8, neck: [0.13, 0.14], white: 0.36 }, legs: { len: 0.55, thick: 1.3, paw: 1.3 }, head: martenHead });
    const t = tail("tail", "pelvis", w.root, { len: 0.44, r: 0.085, pitch: -0.1, blunt: 0.3, tip: 0, colours: { coat: MARTEN.coat, under: "#3d261a", tip: MARTEN.coat } });
    return plan("marten-young", w.body, w.skull, [...w.legs, t], lope({ tails: [t.chain] }));
  },
  // long and arched, the bib grown into a ruff, a tail as long as its body carried high, hooked claws, tufted ears
  adult() {
    const w = weasel({ C: MARTEN, body: { len: 1.28, girth: 0.72, arch: 1.25, neck: [0.17, 0.15], neckThick: 1.1, white: 0.42 }, legs: { len: 0.62, thick: 1.25, paw: 1.25, claws: { colour: "#e6dcc8", len: 0.8 } }, head: { ...martenHead, size: 1.06, eye: 1.5 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.7, r: 0.125, pitch: 0.55, curl: -0.8, wave: 0.15, bones: 5, blunt: 0.3, tip: 0, colours: { coat: MARTEN.coat, under: "#3d261a", tip: MARTEN.coat }, spikes: { n: 4, colour: "#3d261a", len: 0.9 } });
    const ruff = tufts(w.body.rings[5], "neck", { n: 4, a0: 1.3, a1: 2.95, long: 0.12, sweep: 0.5, droop: 0.4, r: 0.05, lock: true, colour: () => MARTEN.belly });
    const eartufts = [1, -1].map(s => ({ at: w.skull.P(0.075 * s, 0.14, 0.01), rx: 0.012, ry: 0.01, tip: w.skull.P(0.1 * s, 0.2, -0.005), bone: s > 0 ? "earL" : "earR", colour: "#3d261a", up: [0, 0, 1] }));
    return plan("marten-adult", w.body, w.skull, [...w.legs, t], lope({ seconds: 0.56, tails: [t.chain] }), { cones: [...ruff, ...eartufts] });
  },
  // the pinewood's old hunter, longer than seems right: plates of dark resin down its spine with amber lit in them, pine
  // needles along their edges, the feathers of a hundred catches braided at its neck, a tail like a pine bough
  legend() {
    const AMBER = "#f0a23a", AMBER2 = "#ffd27a", NEEDLE = "#2f4a2c", C = { ...MARTEN, coat: "#4a2e1e", back: "#2f1d14", belly: "#e8b874", eyes: [{ colour: AMBER2, glow: true }, { colour: AMBER2, glow: true }] };
    const w = weasel({ C, body: { len: 1.5, girth: 0.84, arch: 1.5, hump: 0.4, neck: [0.2, 0.2], neckThick: 1.2, white: 0.4 }, legs: { len: 0.74, thick: 1.15, knob: 1.35, paw: 1.3, claws: { colour: "#efe6d2", len: 1.5, thick: 1.3 } }, head: { ...martenHead, size: 1.18, muzzle: 0.8, eye: 1.6, ear: { ...martenHead.ear, tall: 1.0, torn: -1 } } }), P = w.skull.P, R = w.body.rings;
    const t = tail("tail", "pelvis", w.root, { len: 0.95, r: 0.165, pitch: 0.75, curl: -1.1, wave: 0.25, waves: 1.2, bones: 6, blunt: 0.25, tip: 0, colours: { coat: C.coat, under: "#2f1d14", tip: C.coat }, spikes: { n: 6, colour: NEEDLE, len: 1.3 } });
    // pine needles standing along the edges of its armour
    const needles = [R[1], R[2], R[3], R[4]].flatMap((r, i) => tufts(r, ["pelvis", "loin", "chest", "chest"][i], { n: 2, a0: 0.95, a1: 1.3, long: 0.13, sweep: 0.75, r: 0.022, sides: 3, colour: () => C.back, tip: () => NEEDLE }));
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): plates of dark resin down its spine from hips to shoulders, amber lit in each
    const armour = [{ from: 0.9, to: 4.6, round: [0, 0.8], lames: 5, thick: 0.018, step: 0.012, colour: "#8a4a16", rim: AMBER, runes: { colour: AMBER2 } }];
    // feathers at its neck: jay blue, owl barred, crow black
    const FEATHERS = ["#3f7fc4", "#d9c9a8", "#1c1a1c", "#8a5a34", "#e9e2d2"], feathers = tufts(R[5], "neck", { n: 5, a0: 0.15, a1: 2.1, long: 0.26, sweep: 0.8, droop: 0.2, r: 0.045, flat: 0.4, jitter: 0.2, colour: i => FEATHERS[i % 5], tip: i => FEATHERS[(i + 2) % 5] });
    const whiskers = [1, -1].map(s => ({ at: P(0.03 * s, -0.005, 0.2), rx: 0.006, ry: 0.006, tip: P(0.18 * s, -0.04, 0.14), bone: "head", colour: "#efe6d2", up: [0, 1, 0], sides: 3 }));
    return plan("marten-legend", w.body, w.skull, [...w.legs, t], lope({ seconds: 0.8, bob: 0.01, rock: 0.07, tailSwing: 0.08, tails: [t.chain] }), { cones: [...needles, ...feathers, ...whiskers], armour });
  },
};

export const STOAT_PLANS = stoat, MARTEN_PLANS = marten;
