// The squirrel, four levels, as plans for art/mesh/shape.js (the hare, the squirrel and the dormouse were drawn together)
// (docs/plans/creature-meshes.md; the ladders are proposals till Ed marks them). Hoppers and scurriers: haunches bigger than
// their shoulders, a rounded back, a blunt head with the eyes set high on its sides. On Ed's word for the fox (2026-11-11): the
// adult already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces
// on legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { bound, hop } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#2a1c18", GOLD = "#e9b949";

// ---- The squirrel (twiggy forest): the tail, as big as the animal.
const SQ = { coat: "#b8521f", belly: "#f6efe4", nose: NOSE, upper: "#b8521f", mid: "#a4471a", sock: "#8a3a15" }, SQT = { coat: "#a3441a", under: "#7e3212", tip: "#c96a2c" };
const sqBuild = (C, o) => quad({ C, hind: { len: 0.5, thick: 1.5, foot: 1.6, ...o.hind }, fore: { len: 0.38, thick: 1.15, ...o.fore }, body: { len: 0.62, girth: 0.98, deep: 1.0, tuck: 0.95, arch: 1.2, rump: 1.25, neck: [0.09, 0.08], neckThick: 1.1, white: 0.55, ...o.body },
  head: { size: 1.08, muzzle: 0.5, muzzleWide: 1.2, muzzleDeep: 1.15, dome: 1.1, wide: 1.02, cheek: 0, eye: 1.75, eyeAt: [0.002, 0.008, -0.015], ...o.head, ear: { tall: 0.8, wide: 0.85, back: C.coat, ...o.ear } } });
const eartufts = (P, tall, colour) => [1, -1].map(s => ({ at: P(0.07 * s, 0.17, 0.012), rx: 0.02 + 0.004 * tall, ry: 0.016, tip: P(0.085 * s, 0.17 + 0.1 * tall, 0.0), bone: s > 0 ? "earL" : "earR", colour, bulge: 0.75, split: 0.45, up: [0, 0, 1], sides: 5 }));
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
    const t = tail("tail", "pelvis", q.root, { len: 0.44, r: 0.075, pitch: 1.45, curl: -0.5, plume: true, bones: 5, tip: 0.18, colours: SQT });
    return plan("squirrel-young", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.4, bob: 0.02, tails: [t.chain] }), { cones: eartufts(q.P, 0.6, SQ.mid) });
  },
  // a great plumed tail up its back and flicked over at the tip, bigger than it is; tall ear tufts; a hoarder's fat cheeks
  adult() {
    const q = sqBuild(SQ, { body: { len: 0.66, girth: 1.05, rump: 1.3 }, head: { size: 1.1, wide: 1.14, cheek: 0.45 }, ear: { tall: 0.95 } });
    const t = tail("tail", "pelvis", q.root, { len: 0.84, r: 0.16, pitch: 1.5, curl: -0.9, wave: 0.5, waves: 0.75, bones: 6, plume: true, tip: 0.16, colours: SQT, spikes: { n: 6, colour: "#d9803a", len: 0.9 } });
    return plan("squirrel-adult", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.42, bob: 0.022, tails: [t.chain], tailSwing: 0.05 }), { cones: [...eartufts(q.P, 1.6, "#7e3212"), ...whiskers(q.P, "#f6efe4", 0.8)] });
  },
  // the keeper of the hoard: grizzled, its tail a sail of red-gold fur coiled twice, every tuft along it tipped with light and
  // bound in gold; walnut-shell plate edged in gold over its back, a mark lit on each plate; tufts like horns, one tooth gold
  legend() {
    const LIT = "#ffd76a", WALNUT = "#4a3220", C = { coat: "#a84a1a", back: "#8c8178", belly: "#efe6d8", muzzle: "#d6cdc0", nose: NOSE, upper: "#a84a1a", mid: "#8c3c14", sock: "#5f2a0f", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = sqBuild(C, { hind: { len: 0.62, thick: 1.45, foot: 1.7, knob: 1.3, claws: { colour: "#e6dcc8", len: 1.1 } }, fore: { len: 0.46, thick: 1.15, knob: 1.3, claws: { colour: "#e6dcc8", len: 1 } }, body: { len: 0.74, girth: 1.12, deep: 1.1, rump: 1.35, hump: 0.4, neck: [0.1, 0.1], neckThick: 1.25 }, head: { size: 1.2, wide: 1.16, cheek: 0.6 }, ear: { tall: 1.0, torn: 1 } }), P = q.P, R = q.R;
    const t = tail("tail", "pelvis", q.root, { len: 1.2, r: 0.165, pitch: 1.5, curl: -1.0, wave: 0.6, waves: 0.75, bones: 7, plume: true, sides: 8, tip: 0.12, colours: { coat: "#b5561f", under: "#7e3212", tip: "#e9a94a" }, spikes: { n: 8, colour: LIT, len: 0.9, glow: "tip" }, ring: { colour: GOLD, at: 0.3 } });
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): dark walnut shell edged in gold over its back and shoulders, a mark lit on every plate
    const armour = [{ from: 2.2, to: 4.65, round: [0, 1.7], lames: 3, thick: 0.02, step: 0.012, colour: WALNUT, rim: GOLD, runes: { colour: LIT } }];
    const tooth = [{ at: P(0.008, -0.03, 0.235), rx: 0.008, ry: 0.006, tip: P(0.008, -0.062, 0.24), bone: "head", colour: GOLD, up: [0, 0, 1], sides: 3 }];
    return plan("squirrel-legend", q.body, q.skull, [...q.legs, t], hop({ seconds: 0.7, bob: 0.014, rock: 0.07, tails: [t.chain], tailSwing: 0.04, legs: bound(0.9) }), { cones: [...eartufts(P, 1.7, "#7e3212"), ...tooth, ...whiskers(P, "#efe6d8", 1.5)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "squirrel", heights: [42, 71, 122, 403], plans: squirrel };
