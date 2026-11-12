// The badger, four levels, as plans for art/mesh/shape.js (the badger, the mole and the hedgehog were drawn together)
// (docs/plans/creature-meshes.md). Low, broad animals on short legs. The badger's ladder is Ed's (docs/art-guide/EVOLUTIONS.md and
// its genome: a cub that's all face, a low wedge of a young, a broad shaggy-plated digger with pale claws, and the elder, grizzled
// and scarred, its stripes running on down its back as chalk hill-figure lines, a bronze torc; with the standing stones of its
// first brief); the mole's and hedgehog's are proposals till he marks them. On his word for the fox (2026-11-11): the adult
// already wears its signature loud, the legend is another, older, stranger creature, "I like magical armour pieces on
// legends", and that armour is plate raised from the torso's own polygons, a lit rune on each.
import { band } from "../kit/band.js";
import { trot, trundle } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const BLACK = "#1b1817", BRONZE = "#b9722e";

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
    return plan("badger-legend", q.body, q.skull, [...q.legs, t, torc], trundle({ seconds: 0.95, sway: 0.07, tails: [t.chain], legs: trot(0.9) }), { cones: [...shag, ...stones, ...scars], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: the sizes Ed passed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build;
 *  curl, how it curls up to sleep where it differs from the rest (art/mesh/gear.js `napping` reads gait.curl): it curls the other way round, so its striped face is on the side she sees it from and not behind its plates. */
export const MESH = { id: "badger", heights: [54, 82, 113, 256], curl: { side: -1 }, plans: badger };
