// The red panda, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief (Ed, 2026-10-12;
// art/creatures/redpanda/genome.js): rusty red, a white mask and ear rims, dark legs, a thick ringed tail; its legend the elder of
// the red pandas, an old mountain sage, big and round, its whiskers and muzzle gone white, a long pale ruff like a beard, its
// ringed tail heavier, the long claws of a life in the trees, and prayer beads wound round its legs. Round and low; a rolling
// walk, and a trot at speed.
import { trundle } from "../kit/gaits.js";
import { paint } from "../kit/paint.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { ringtail } from "../kit/ringtail.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const BLACK = "#231614", WHITE = "#f8f1e6", RUST = "#b4471c";
const PANDA = { coat: RUST, belly: BLACK, muzzle: WHITE, nose: "#141010", upper: "#5a2616", mid: BLACK, sock: BLACK, eye: "#120d0c", cheek: WHITE };
const RINGS = { coat: RUST, ring: "#e7a868", tip: "#3a1d14" };
// (its face: white cheeks and muzzle, a white spot over each eye, and the rust running down from each eye to the corner of its mouth)
function mask(skull, C) {
  paint(skull.rings[0], cy => (cy < -0.1 ? WHITE : undefined));
  paint(skull.rings[1], cy => (cy > 0.95 ? undefined : cy > 0.8 ? WHITE : cy > 0.2 ? C.coat : WHITE));
  paint(skull.rings[2], cy => (cy > 0.9 ? C.coat : WHITE));
  return skull;
}
const build = (C, o) => { const q = quad({ C, hind: { len: 0.6, thick: 1.65, ...o.hind }, fore: { len: 0.58, thick: 1.6, ...o.fore }, body: { len: 0.85, girth: 1.25, deep: 1.0, tuck: 1.0, arch: 0.8, neck: [0.06, 0.12], neckThick: 1.3, white: 0.45, ...o.body },
  head: { size: 1.16, muzzle: 0.5, muzzleWide: 1.05, wide: 1.15, dome: 1.05, cheek: 1.0, eye: 1.2, ...o.head, ear: { tall: 0.75, wide: 1.45, splay: 0.5, at: [0.014, -0.006, 0], back: C.coat, tip: WHITE, ...o.ear } } }); mask(q.skull, C); return q; };
const redpanda = {
  // a pale cub, round as a bun, its rings only just showing
  baby() {
    const C = { ...PANDA, coat: "#c9814f", upper: "#6e3a22" }, q = build(C, { hind: { len: 0.36, thick: 2.0 }, fore: { len: 0.35, thick: 1.9 }, body: { len: 0.55, girth: 1.25, arch: 0.5, neck: [0.03, 0.08] }, head: { size: 1.48, muzzle: 0.4, cheek: 0.5, eye: 1.5 } });
    const t = ringtail("tail", "pelvis", q.root, { len: 0.24, r: 0.06, pitch: -0.1, bands: 2, colours: { coat: C.coat, ring: "#e3b68a", tip: "#6e3a22" } });
    return plan("redpanda-baby", q.body, q.skull, [...q.legs, t], trundle({ lively: 1.3, run: { duty: 0.27 }, tails: [t.chain] }));
  },
  // red now, lighter on its feet, the tail filling out
  young() {
    const q = build(PANDA, { body: { len: 0.82, girth: 1.02, tuck: 0.9 }, head: { size: 1.04, cheek: 0.7 } });
    const t = ringtail("tail", "pelvis", q.root, { len: 0.46, r: 0.085, pitch: -0.25, bands: 4, colours: RINGS });
    return plan("redpanda-young", q.body, q.skull, [...q.legs, t], trundle({ lively: 1.1, tails: [t.chain] }));
  },
  // deep red and round, wide white cheeks and ear rims, a tail as long as itself in six rings, a climber's claws
  adult() {
    const q = build(PANDA, { fore: { len: 0.6, thick: 1.7, claws: { colour: "#e9dcc8", len: 1.3, thick: 1.3 } }, hind: { len: 0.62, thick: 1.75, claws: { colour: "#e9dcc8", len: 1.1 } }, body: { girth: 1.42, arch: 1.1 }, head: { size: 1.2, cheek: 1.8 }, ear: { tall: 0.85 } });
    const t = ringtail("tail", "pelvis", q.root, { len: 0.78, r: 0.125, pitch: -0.2, curl: 0.35, bands: 6, bones: 5, colours: RINGS });
    return plan("redpanda-adult", q.body, q.skull, [...q.legs, t], trundle({ tails: [t.chain] }), { cones: whiskers(q.P, WHITE, 1.0) });
  },
  // the old mountain sage: big and round, its muzzle and long whiskers gone white, a pale ruff hanging like a beard, a heavy
  // tail in nine rings, the long claws of a life in the trees, prayer beads on its legs; jade plate edged in gold on its back,
  // a mark lit on each
  legend() {
    const JADE = "#2c7a5c", GOLD = "#e9c46a", LIT = "#c9ffd9", PALE = "#efe6d6", C = { ...PANDA, coat: "#9c3a16", back: "#7a2c10", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { fore: { len: 0.8, thick: 1.6, knob: 1.25, claws: { colour: PALE, len: 2.4, thick: 1.6, wide: 1.2 }, band: { colour: GOLD, at: 0.3, r: 0.04 } }, hind: { len: 0.82, thick: 1.7, knob: 1.25, claws: { colour: PALE, len: 1.6, thick: 1.4 }, band: { colour: GOLD, at: 0.3, r: 0.04 } }, body: { len: 0.95, girth: 1.7, deep: 1.1, arch: 1.3, hump: 0.5, neck: [0.05, 0.15], neckThick: 1.5 }, head: { size: 1.4, muzzle: 0.55, cheek: 2.4, eye: 1.3 }, ear: { tall: 0.9, torn: 1 } }), R = q.R, P = q.P;
    const t = ringtail("tail", "pelvis", q.root, { len: 1.15, r: 0.17, pitch: -0.35, curl: 0.6, wave: 0.2, bands: 9, bones: 7, sides: 8, tip: 0.08, colours: RINGS });
    const ruff = [...tufts(R[5], "neck", { n: 4, a0: 1.3, a1: 3.0, long: 0.24, sweep: 0.35, droop: 0.7, r: 0.075, lock: true, colour: () => PALE, tip: () => "#cfc3ae" }), ...tufts(R[4], "chest", { n: 2, a0: 2.4, a1: 3.0, long: 0.2, sweep: 0.3, droop: 0.7, r: 0.07, lock: true, colour: () => PALE, tip: () => "#cfc3ae" })];
    const brows = [1, -1].map(s => ({ at: P(0.05 * s, 0.085, 0.1), rx: 0.024, ry: 0.014, tip: P(0.15 * s, 0.13, -0.02), bone: "head", colour: WHITE, tipColour: PALE, split: 0.5, up: [0, 1, 0] }));
    const armour = [{ from: 1.2, to: 4.7, round: [0, 1.3], lames: 4, thick: 0.022, step: 0.012, colour: JADE, rim: GOLD, runes: { colour: LIT } }];
    return plan("redpanda-legend", q.body, q.skull, [...q.legs, t], trundle({ lively: 0.75, tails: [t.chain] }), { cones: [...ruff, ...brows, ...whiskers(P, WHITE, 1.8)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "redpanda", heights: [46, 72, 103, 238], plans: redpanda };
