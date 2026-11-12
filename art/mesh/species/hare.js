// The hare, four levels, as plans for art/mesh/shape.js (the hare, the squirrel and the dormouse were drawn together)
// (docs/plans/creature-meshes.md; the ladders are proposals till Ed marks them). Hoppers and scurriers: haunches bigger than
// their shoulders, a rounded back, a blunt head with the eyes set high on its sides. On Ed's word for the fox (2026-11-11): the
// adult already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces
// on legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { bound, hop } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#2a1c18", BLACK = "#17120f", SILVER = "#dfe5ec";

// ---- The hare (bluebell glade): the ears, and the long hind legs.
const HARE = { coat: "#b48d60", belly: "#f0e7d6", nose: NOSE, upper: "#b48d60", mid: "#a17a50", sock: "#8a6842" };
const hareBuild = (C, o) => quad({ C, hind: { len: 0.78, thick: 1.25, foot: 2.3, ...o.hind }, fore: { len: 0.56, thick: 0.95, ...o.fore }, body: { len: 0.86, girth: 0.98, deep: 1.0, tuck: 0.9, arch: 1.1, rump: 1.28, neck: [0.13, 0.1], neckThick: 1.05, white: 0.5, ...o.body },
  head: { size: 1.02, muzzle: 0.55, muzzleWide: 1.45, muzzleDeep: 1.3, dome: 1.12, wide: 0.9, cheek: 0, eye: 1.7, eyeAt: [0.004, 0.012, -0.02], nose: 0.9, ...o.head, ear: { shape: "long", tall: 1.6, wide: 1, at: [-0.012, 0.0, -0.03], back: C.coat, inner: "#d8a996", tip: BLACK, ...o.ear } } });
const scut = (root, o = {}) => tail("tail", "pelvis", [root[0], root[1] + 0.02, root[2] + 0.02], { len: 0.1, r: 0.036, pitch: 0.95, tip: 0.7, blunt: 0.05, sides: 5, colours: { coat: "#5a4630", tip: "#ffffff" }, ...o });
const hare = {
  // a leveret pressed flat: ears short and laid back, huge dark eyes
  baby() {
    const C = { ...HARE, coat: "#a8845c", upper: "#a8845c", mid: "#a8845c" }, q = hareBuild(C, { hind: { len: 0.4, thick: 1.7, foot: 1.5 }, fore: { len: 0.32, thick: 1.5 }, body: { len: 0.6, girth: 1.05, arch: 0.6, rump: 1.15, neck: [0.06, 0.07], neckThick: 1.2 }, head: { size: 1.22, eye: 2.1 }, ear: { tall: 0.8, lean: 0.75, wide: 1.1, inner: C.coat, tip: "#5a4630" } });
    const t = scut(q.root, { len: 0.06, r: 0.028 });
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
    const t = scut(q.root, { len: 0.13, r: 0.042 });
    const ruff = tufts(q.R[5], "neck", { n: 4, a0: 1.2, a1: 2.95, long: 0.11, sweep: 0.5, droop: 0.45, r: 0.05, lock: true, colour: () => HARE.belly });
    const crest = tufts(q.R[4], "chest", { n: 1, a0: 0.1, long: 0.1, sweep: 0.8, r: 0.035, colour: () => HARE.coat, tip: () => "#6e5334" });
    return plan("hare-adult", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.52, tails: [t.chain] }), { cones: [...ruff, ...crest, ...whiskers(q.P, "#f0e7d6", 1.1)] });
  },
  // the moon's hare: silvered and lean and very tall in the leg, its ears twice its own height, notched and ringed; a crescent
  // lit on its brow; moon-steel plate over its haunches and shoulders, a pale mark lit on each
  legend() {
    const GLOW = "#cfe6ff", STEEL = "#4f5b78", C = { coat: "#c9ced6", back: "#9ea5b0", belly: "#f3f5f8", nose: NOSE, upper: "#c9ced6", mid: "#aab0ba", sock: "#7f8794", eyes: [{ colour: GLOW, glow: true }, { colour: GLOW, glow: true }] };
    const q = hareBuild(C, { hind: { len: 1.1, thick: 1.3, foot: 2.6, knob: 1.25, claws: { colour: "#3a3f48", len: 1 }, band: { colour: STEEL, at: 0.3, r: 0.05 } }, fore: { len: 0.78, thick: 1.0, knob: 1.25, band: { colour: SILVER, at: 0.3, r: 0.036 } }, body: { len: 0.98, girth: 0.96, deep: 1.25, tuck: 0.62, rump: 1.4, hump: 0.3, neck: [0.2, 0.1], neckThick: 1.15 }, head: { size: 1.12, muzzle: 0.62, eye: 1.6 }, ear: { tall: 5.2, lean: 0.06, wide: 1.25, splay: 0.09, back: "#aab0ba", inner: "#e9d2cc", tip: "#3a3f48", torn: -1 } }), P = q.P, R = q.R;
    const t = scut(q.root, { len: 0.17, r: 0.048, colours: { coat: "#9ea5b0", tip: "#ffffff" } });
    // the crescent on its brow
    const crescent = [1, -1].map(s => ({ at: P(0.012 * s, 0.092, 0.1), rx: 0.03, ry: 0.012, tip: P(0.06 * s, 0.14, 0.085), bone: "head", colour: GLOW, glow: true, up: [0, 0, 1], sides: 4 }));
    // rings in its ears
    const rings = [0.55, 0.8].flatMap((f, i) => [1].map(s => ({ at: P((0.036 + 0.1 * f) * s, 0.07 * 1.12 + 0.82 * f, -0.03), rx: 0.03, ry: 0.012, tip: P((0.036 + 0.1 * f) * s + 0.07, 0.07 * 1.12 + 0.82 * f - 0.02, -0.03), bone: "earL", colour: SILVER, split: 0.8, up: [0, 1, 0], sides: 4 })));
    // armour (Ed, 2026-11-11: "thickened polygons on their torso with a different colour and glowing runes"): moon-steel over its
    // haunches and its shoulders, each plate with its lit mark
    const armour = [{ from: 0.75, to: 2.15, round: [0, 1.7], lames: 2, thick: 0.02, step: 0.012, colour: STEEL, rim: SILVER, runes: { colour: GLOW } }, { from: 3.2, to: 4.75, round: [0, 1.7], lames: 2, thick: 0.02, step: 0.012, colour: STEEL, rim: SILVER, runes: { colour: GLOW, seed: 3 } }];
    const mane = tufts(R[5], "neck", { n: 4, a0: 0.9, a1: 2.95, long: 0.16, sweep: 0.55, droop: 0.5, r: 0.06, lock: true, colour: () => "#f3f5f8", tip: () => "#aab0ba" });
    return plan("hare-legend", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.85, bob: 0.02, rock: 0.09, tails: [t.chain], legs: bound(0.9) }), { cones: [...crescent, ...rings, ...mane, ...whiskers(P, "#f3f5f8", 1.6)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build;
 *  curl, how it curls up to sleep where it differs from the rest (art/mesh/gear.js `napping` reads gait.curl): its ears, longer than its ring is wide, lie back and swung in across its own back. */
export const MESH = { id: "hare", heights: [74, 114, 164, 491], curl: { ears: 1.4, earsIn: 1.6 }, plans: hare };
