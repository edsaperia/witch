// The tiger, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn together on
// kit/feline.js; the ladders are proposals till Ed marks them). Its genome's brief (art/creatures/tiger/genome.js): "a big striped
// cat, low and long, heavy in the shoulder. Its evolution: a round, big-pawed cub with soft broad stripes, a lanky young, a
// heavy-shouldered adult with a ruff of cheek fur, and the legend: the elder of the tigers, huge and grizzled, its stripes
// worn thin with age, old scars raked across its flanks and brow, a white ruff, and a garland of red flowers and bronze beads
// round its neck, the jungle's offerings". On Ed's word (2026-11-11): the legend's armour is "thickened polygons on their
// torso with a different colour and glowing runes".
import { band } from "../kit/band.js";
import { cat, catTail, feline, stalks } from "../kit/feline.js";
import { ringed, stripes } from "../kit/markings.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#b4605a", BLACK = "#1a1513", WHITE = "#f7f1e6", BRONZE = "#b9722e";
const TIGER = { coat: "#e57f1e", belly: WHITE, nose: NOSE, upper: "#e57f1e", mid: "#dd7419", sock: "#ee9a45", eye: "#2a1a10", ear: BLACK, inner: WHITE, tip: BLACK, muzzle: WHITE, cheek: WHITE };
const build = (C, o = {}) => feline({ C, hind: { len: 0.98, thick: 1.45, paw: 1.25, ...o.hind }, fore: { len: 0.98, thick: 1.65, paw: 1.3, ...o.fore }, body: { len: 1.22, girth: 1.22, deep: 1.15, tuck: 0.8, hump: 0.3, neck: [0.1, 0.16], neckThick: 1.4, white: 0.4, ...o.body },
  head: { size: 1.22, muzzle: 0.62, muzzleWide: 1.5, muzzleDeep: 1.35, wide: 1.15, eye: 1.0, cheek: 1.2, ...o.head }, ear: { tall: 0.62, wide: 0.9, ...o.ear } });
// (stripes on its legs and rings on its tail, as well as its body's)
const dress = (q, t, c = BLACK) => { q.legs.forEach(l => ringed(l, c, 1, 1)); return ringed(t, c, 2); };
const tiger = {
  // a round cub on big paws, its stripes soft and broad
  baby() {
    const q = build(TIGER, { hind: { len: 0.52, thick: 1.9, paw: 1.4 }, fore: { len: 0.52, thick: 2.0, paw: 1.4 }, body: { len: 0.64, girth: 1.2, deep: 1.0, tuck: 0.95, hump: 0, neck: [0.05, 0.09] }, head: { size: 1.5, muzzle: 0.48, eye: 1.5, cheek: 0.6 }, ear: { tall: 0.8, wide: 1.15 } });
    const t = dress(q, catTail(q.root, TIGER, { len: 0.34, r: 0.045, tip: 0.2 }), "#5a3a26");
    return cat("tiger-baby", q, [t], stalks({ lively: 1.3, tails: [t.chain] }), {}, stripes("#5a3a26", { every: 3, gaps: 0.1 }));
  },
  // lanky: long in the leg and the back, the stripes drawn sharp
  young() {
    const q = build(TIGER, { hind: { len: 1.04, thick: 1.1 }, fore: { len: 1.04, thick: 1.2 }, body: { len: 1.12, girth: 0.95, deep: 1.0, tuck: 0.7, hump: 0 }, head: { size: 1.05, cheek: 0.8 } });
    const t = dress(q, catTail(q.root, TIGER, { len: 0.7, r: 0.042 }));
    return cat("tiger-young", q, [t], stalks({ lively: 1.1, tails: [t.chain] }), {}, stripes(BLACK));
  },
  // low and long, heavy in the shoulder, a ruff of white cheek fur
  adult() {
    const q = build(TIGER, { head: { size: 1.25, cheek: 0.9 } });
    const t = dress(q, catTail(q.root, TIGER, { len: 0.78, r: 0.05 }));
    return cat("tiger-adult", q, [t], stalks({ tails: [t.chain] }), { cones: whiskers(q.P, "#ffffff", 1.2) }, stripes(BLACK));
  },
  // the elder of the tigers: huge and grizzled, its stripes worn thin, old scars raked across its flank and brow, a white
  // ruff, one eye lit, the jungle's garland of red flowers and bronze beads; river-green plate on its back, an ember mark on each
  legend() {
    const GREEN = "#17503f", EMBER = "#ffb84a", RED = "#d6303a", SCAR = "#f0c2a8", C = { ...TIGER, coat: "#cf7426", upper: "#cf7426", mid: "#c26a20", sock: "#dc9550", muzzle: "#d9d4ca", eyes: [{ colour: EMBER, glow: true }, { colour: "#e6e2d6" }] };
    const q = build(C, { hind: { len: 1.12, thick: 1.5, paw: 1.35, knob: 1.25, claws: { colour: "#e6dfcf", len: 1.1 } }, fore: { len: 1.12, thick: 1.8, paw: 1.4, knob: 1.25, claws: { colour: "#e6dfcf", len: 1.3 } }, body: { len: 1.34, girth: 1.34, deep: 1.3, tuck: 0.7, hump: 1.0, neck: [0.07, 0.2], neckThick: 1.6 }, head: { size: 1.5, cheek: 0.8, eye: 1.15 }, ear: { torn: 1 } }), P = q.P, R = q.R;
    const t = dress(q, catTail(q.root, C, { len: 0.95, r: 0.055, bones: 6 }), "#3a2a22");
    const ruff = [...tufts(R[6], "neck", { n: 4, a0: 1.0, a1: 2.9, long: 0.13, sweep: 0.85, droop: 0.15, r: 0.065, lock: true, colour: () => WHITE, tip: () => "#c9c4ba" }), ...tufts(R[5], "neck", { n: 3, a0: 1.4, a1: 2.9, long: 0.13, sweep: 0.85, droop: 0.2, r: 0.065, lock: true, colour: () => WHITE, tip: () => "#c9c4ba" })];
    // the garland low on its neck: bronze beads, and a red flower at every lock's root
    const beads = band("neck", R[4].at, R[5].at, { at: 0.75, r: R[5].rx * 1.22, ry: R[5].ry * 1.16, wide: 0.03, colour: BRONZE });
    const flowers = tufts(R[5], "neck", { n: 4, a0: 0.5, a1: 2.7, long: 0.11, sweep: 0.05, droop: 0, r: 0.055, jitter: 0, sides: 5, colour: () => RED, tip: () => "#ffd24a" });
    const rake = (at, d, bone) => [-1, 0, 1].map(i => ({ at: [at[0], at[1] + 0.022 * i, at[2] + 0.03 * i], rx: 0.007, ry: 0.007, tip: [at[0] + d[0], at[1] + d[1] + 0.022 * i, at[2] + d[2] + 0.03 * i], bone, colour: SCAR, up: [1, 0, 0], sides: 3 }));
    const scars = [...rake([R[3].rx * 0.97, R[3].at[1] - 0.02, R[3].at[2] - 0.03], [-0.004, -0.09, -0.12], "chest"), ...rake(P(-0.03, 0.085, 0.07), [0.02 * 1.5, -0.04 * 1.5, 0.06 * 1.5], "head").slice(0, 2)];
    const armour = [{ from: 1.0, to: 3.6, round: [0, 0.95], lames: 4, thick: 0.022, step: 0.012, colour: GREEN, rim: BRONZE, runes: { colour: EMBER } }];
    return cat("tiger-legend", q, [t, beads], stalks({ lively: 0.75, tails: [t.chain] }), { cones: [...ruff, ...flowers, ...scars, ...whiskers(P, "#ffffff", 1.5)], armour }, stripes("#4a3226", { gaps: 0.38 }));
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs tiger`: Ed, 2026-11-12, "keep the sizes");
 *  plans, each level's build. */
export const MESH = { id: "tiger", heights: [63, 97, 140, 276], plans: tiger };
