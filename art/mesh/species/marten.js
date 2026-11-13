// The marten, four levels, as plans for art/mesh/shape.js (the stoat and the marten were drawn together and share kit/weasel.js) (docs/plans/creature-meshes.md; the
// ladders are proposals till Ed marks them). Both are weasels: a long supple tube of a body on short legs, a flat wedge of a
// head with round ears, and a bound for a gait, the back arching. On Ed's word for the fox (2026-11-11): the adult already wears
// its signature loud, and the legend is another, older, stranger creature, not a bigger one; "I like magical armour pieces
// on legends"; and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { lope } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { tail } from "../kit/tail.js";
import { tufts } from "../kit/tufts.js";
import { weasel } from "../kit/weasel.js";

const NOSE = "#16100e";

// ---- The marten (the old pinewood's till the bee took its place; on the bench since Ed, 2026-11-12): the long supple body, the cream bib, the climber's reach.
const MARTEN = { coat: "#5e3d28", belly: "#f2c98b", nose: NOSE, upper: "#4a2f1f", mid: "#3d261a", sock: "#2a1a13", ear: "#5e3d28", inner: "#f0d9b0" };
const martenHead = { size: 1.0, muzzle: 0.7, wide: 1.02, eye: 1.4, ear: { shape: "round", tall: 0.85, wide: 1.35, at: [0.012, -0.008, -0.005], back: MARTEN.coat, inner: "#e8cfa0" } };
const marten = {
  // a short dark kit with a bright bib, round ears too big for it
  baby() {
    const w = weasel({ C: MARTEN, body: { len: 0.78, girth: 0.78, arch: 0.4, neck: [0.07, 0.09], neckThick: 1.15, white: 0.45 }, legs: { len: 0.4, thick: 1.7 }, head: { ...martenHead, size: 1.22, muzzle: 0.5, eye: 1.7, ear: { ...martenHead.ear, tall: 1.05, wide: 1.6 } } });
    const t = tail("tail", "pelvis", w.root, { len: 0.2, r: 0.045, pitch: 0.05, blunt: 0.3, tip: 0, colours: { coat: MARTEN.coat, tip: MARTEN.coat } });
    return plan("marten-baby", w.body, w.skull, [...w.legs, t], lope({ lively: 1.3, tails: [t.chain] }));
  },
  // stretching out, a bushy tail, big paws
  young() {
    const w = weasel({ C: MARTEN, body: { len: 1.08, girth: 0.66, arch: 0.8, neck: [0.13, 0.14], white: 0.36 }, legs: { len: 0.55, thick: 1.3, paw: 1.3 }, head: martenHead });
    const t = tail("tail", "pelvis", w.root, { len: 0.44, r: 0.085, pitch: -0.1, blunt: 0.3, tip: 0, colours: { coat: MARTEN.coat, under: "#3d261a", tip: MARTEN.coat } });
    return plan("marten-young", w.body, w.skull, [...w.legs, t], lope({ lively: 1.1, tails: [t.chain] }));
  },
  // long and arched, the bib grown into a ruff, a tail as long as its body carried high, hooked claws, tufted ears
  adult() {
    const w = weasel({ C: MARTEN, body: { len: 1.28, girth: 0.72, arch: 1.25, neck: [0.17, 0.15], neckThick: 1.1, white: 0.42 }, legs: { len: 0.62, thick: 1.25, paw: 1.25, claws: { colour: "#e6dcc8", len: 0.8 } }, head: { ...martenHead, size: 1.06, eye: 1.5 } });
    const t = tail("tail", "pelvis", w.root, { len: 0.7, r: 0.125, pitch: 0.55, curl: -0.8, wave: 0.15, bones: 5, blunt: 0.3, tip: 0, colours: { coat: MARTEN.coat, under: "#3d261a", tip: MARTEN.coat }, spikes: { n: 4, colour: "#3d261a", len: 0.9 } });
    const ruff = tufts(w.body.rings[5], "neck", { n: 4, a0: 1.3, a1: 2.95, long: 0.12, sweep: 0.5, droop: 0.4, r: 0.05, lock: true, colour: () => MARTEN.belly });
    const eartufts = [1, -1].map(s => ({ at: w.skull.P(0.075 * s, 0.14, 0.01), rx: 0.012, ry: 0.01, tip: w.skull.P(0.1 * s, 0.2, -0.005), bone: s > 0 ? "earL" : "earR", colour: "#3d261a", up: [0, 0, 1] }));
    return plan("marten-adult", w.body, w.skull, [...w.legs, t], lope({ tails: [t.chain] }), { cones: [...ruff, ...eartufts] });
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
    return plan("marten-legend", w.body, w.skull, [...w.legs, t], lope({ lively: 0.75, tails: [t.chain] }), { cones: [...needles, ...feathers, ...whiskers], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes") (on the bench: src/rules/kinds.ts BENCH); plans, each level's build;
 *  curl, how it curls up to sleep where it differs from the rest (art/mesh/gear.js `napping` reads gait.curl): long, it turns further, so its ring closes with its head on its haunch. */
export const MESH = { id: "marten", heights: [45, 69, 97, 237], curl: { turn: 4.3 }, plans: marten };
