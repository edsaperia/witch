// The stoat, four levels, as plans for art/mesh/shape.js (the stoat and the marten were drawn together and share kit/weasel.js) (docs/plans/creature-meshes.md; the
// ladders are proposals till Ed marks them). Both are weasels: a long supple tube of a body on short legs, a flat wedge of a
// head with round ears, and a bound for a gait, the back arching. On Ed's word for the fox (2026-11-11): the adult already wears
// its signature loud, and the legend is another, older, stranger creature, not a bigger one; "I like magical armour pieces
// on legends"; and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { lope } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { tail } from "../kit/tail.js";
import { tufts } from "../kit/tufts.js";
import { weasel } from "../kit/weasel.js";

const NOSE = "#16100e", BLACK = "#17120f", GOLD = "#e9b949";

// ---- The stoat (alder forest): the long neck, the upright stand, the black tail tip; its war dance.
const PAULDRON = -1; // (which shoulder the legend's pauldron sits on: -1 is the flank the bake's two views both show)
const STOAT = { coat: "#b9743d", belly: "#f6f0e3", nose: NOSE, upper: "#b9743d", mid: "#a5642f", sock: "#f0e8d8" };
const stoat = {
  // a tiny pale kit with a mane of baby fur at its neck
  baby() {
    const C = { ...STOAT, coat: "#c99a72", upper: "#c99a72", mid: "#c99a72", sock: "#e9dcc8" };
    const w = weasel({ C, body: { len: 0.78, girth: 0.72, arch: 0.5, neck: [0.07, 0.09], neckThick: 1.15, white: 0.7 }, legs: { len: 0.34, thick: 1.7 }, head: { size: 1.18, muzzle: 0.42, eye: 1.6 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.13, r: 0.03, pitch: 0.1, tip: 0.3, blunt: 0.3, colours: { coat: C.coat, tip: "#5a4234" } });
    const mane = tufts(w.body.rings[5], "neck", { n: 3, a0: 0.3, a1: 2.0, long: 0.07, sweep: 0.5, r: 0.04, lock: true, colour: () => "#efe3cf" });
    return plan("stoat-baby", w.body, w.skull, [...w.legs, t], lope({ lively: 1.3, tails: [t.chain] }), { cones: mane });
  },
  // a slim tube of an animal, the black tip just showing
  young() {
    const w = weasel({ C: STOAT, body: { len: 1.12, girth: 0.56, arch: 0.9, neck: [0.14, 0.14], neckThick: 0.95, white: 0.72 }, legs: { len: 0.4, thick: 1.35 }, head: { size: 0.94, eye: 1.4 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.26, r: 0.034, pitch: -0.1, tip: 0.3, blunt: 0.3, colours: { coat: STOAT.coat, tip: BLACK } });
    return plan("stoat-young", w.body, w.skull, [...w.legs, t], lope({ lively: 1.1, tails: [t.chain] }));
  },
  // the neck held high as a periscope, a white belly, the tail's black brush flared, a crest raised down its neck for the dance
  adult() {
    const w = weasel({ C: STOAT, body: { len: 1.3, girth: 0.6, arch: 1.2, neck: [0.3, 0.1], neckThick: 0.92, white: 0.78 }, legs: { len: 0.44, thick: 1.35 }, head: { size: 1.02, eye: 1.5 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.5, r: 0.09, pitch: 0.6, curl: -0.6, tip: 0.6, plume: true, colours: { coat: STOAT.coat, tip: BLACK } });
    const crest = [...tufts(w.body.rings[6], "neck", { n: 1, a0: 0.1, long: 0.12, sweep: 0.7, r: 0.035, colour: () => STOAT.coat, tip: () => BLACK }), ...tufts(w.body.rings[5], "neck", { n: 1, a0: 0.1, long: 0.13, sweep: 0.7, r: 0.038, colour: () => STOAT.coat, tip: () => BLACK }), ...tufts(w.body.rings[4], "chest", { n: 1, a0: 0.1, long: 0.09, sweep: 0.8, r: 0.03, colour: () => STOAT.coat, tip: () => BLACK })];
    return plan("stoat-adult", w.body, w.skull, [...w.legs, t], lope({ tails: [t.chain] }), { cones: crest });
  },
  // the white one: in full ermine and longer than a stoat should be, its neck risen like a snake's; three black plumes for a
  // tail; a king's robe turned back on its makers: a collar of ermine tails; a gold circlet, and one gold pauldron cut
  // with lit marks; gold on its forelegs; eyes that hold you
  legend() {
    const WHITE = "#f4f2ec", C = { coat: WHITE, belly: "#ffffff", back: "#e3ded2", nose: NOSE, upper: WHITE, mid: "#e3ded2", sock: "#d8d2c4", eyes: [{ colour: "#ff5a3c", glow: true }, { colour: "#ff5a3c", glow: true }], ear: "#e3ded2" }, GEM = "#ff6a4a";
    const w = weasel({ C, body: { len: 1.45, girth: 0.72, arch: 1.5, neck: [0.36, 0.08], neckThick: 0.98, white: 0.5 }, legs: { len: 0.6, thick: 1.2, knob: 1.3, claws: { colour: BLACK, len: 0.9 }, band: { colour: GOLD, at: 0.25, r: 0.036 } }, head: { size: 1.16, muzzle: 0.62, eye: 1.5, ear: { shape: "round", tall: 0.62, wide: 1.25, at: [0.012, -0.012, -0.005], back: "#e3ded2", inner: "#c98f6e", torn: 1 } } }), P = w.skull.P;
    const tails = [-1, 0, 1].map((f, i) => tail(`tail${"abc"[i]}`, "pelvis", [0.02 * f, w.root[1], w.root[2]], { len: 0.62 - 0.1 * Math.abs(f), r: 0.07, yaw: f * 0.5, twist: f * 0.4, pitch: 0.9 - 0.3 * Math.abs(f), curl: -0.9, wave: 0.25, phase: i * 2, bones: 5, tip: 0.5, plume: true, colours: { coat: WHITE, tip: BLACK } }));
    // the collar: ermine tails hung round its shoulders, white with black tips
    const robe = [...tufts(w.body.rings[4], "chest", { n: 5, a0: 0.2, a1: 2.3, long: 0.22, sweep: 0.8, droop: 0.25, r: 0.042, flat: 1, jitter: 0.15, colour: () => "#ffffff", tip: () => BLACK }), ...tufts(w.body.rings[3], "chest", { n: 4, a0: 0.25, a1: 2.0, long: 0.2, sweep: 0.85, droop: 0.2, r: 0.04, flat: 1, jitter: 0.15, colour: () => "#ffffff", tip: () => BLACK })];
    // its armour (Ed, 2026-11-12: "Stoat armour should be a pauldron"): one gold pauldron on its shoulder, in three lames, its lip
    // standing off its body, a red mark lit on each plate
    const armour = [{ from: 3.4, to: 4.95, round: [0, 1.7], side: PAULDRON, lames: 3, thick: 0.022, step: 0.012, flare: 1.0, colour: "#d9a531", rim: "#8a6420", runes: { colour: "#ff3b1f", round: [0.6, 1.7], size: 0.6, w: 0.005, max: 1 } }];
    // the circlet: a gold band on its brow with one stone, and three points
    const crown = [{ at: P(0, 0.085, 0.085), rx: 0.04, ry: 0.016, tip: P(0, 0.23, 0.07), bone: "head", colour: GOLD, split: 0.6, up: [0, 0, 1] }, ...[1, -1].map(s => ({ at: P(0.05 * s, 0.075, 0.07), rx: 0.028, ry: 0.014, tip: P(0.075 * s, 0.18, 0.05), bone: "head", colour: GOLD, split: 0.6, up: [0, 0, 1] })),
      { at: P(0, 0.085, 0.1), rx: 0.016, ry: 0.016, tip: P(0, 0.1, 0.125), bone: "head", colour: GEM, glow: true, up: [0, 1, 0] }];
    const whiskers = [1, -1].map(s => ({ at: P(0.03 * s, -0.005, 0.2), rx: 0.006, ry: 0.006, tip: P(0.17 * s, -0.03, 0.15), bone: "head", colour: "#ffffff", up: [0, 1, 0], sides: 3 }));
    return plan("stoat-legend", w.body, w.skull, [...w.legs, ...tails], lope({ lively: 0.75, tails: tails.map(t => t.chain) }), { cones: [...robe, ...crown, ...whiskers], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build;
 *  curl, how it curls up to sleep where it differs from the rest (art/mesh/gear.js `napping` reads gait.curl): long, it turns further, so its ring closes with its head on its haunch. */
export const MESH = { id: "stoat", heights: [41, 63, 88, 229], curl: { turn: 4.5 }, plans: stoat };
