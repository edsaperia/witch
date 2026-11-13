// The raccoon, four levels, as plans for art/mesh/shape.js (the rollout's batch A, the dogs and small hunters:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief (Ed, 2026-10-12;
// art/creatures/raccoon/genome.js): grey and hunched, a black bandit mask between white brows and muzzle, dark legs and hands, a
// thick ringed tail (grey, not the red panda's russet). Its legend is this builder's proposal: the old night thief. Low, broad
// and round-backed on short legs; a rolling walk, and a trot at speed.
import { band } from "../kit/band.js";
import { trundle } from "../kit/gaits.js";
import { paint } from "../kit/paint.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { ringtail } from "../kit/ringtail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const BLACK = "#1c1a1c", WHITE = "#f1eee6", DARK = "#4d4f55";
const RACCOON = { coat: "#84868b", back: "#5b5d63", belly: "#b9b6ae", muzzle: WHITE, nose: "#121011", upper: "#5b5d63", mid: "#2f2e31", sock: BLACK, eye: "#e9e4d6", cheek: WHITE };
const RINGS = { coat: "#9a9c9f", ring: BLACK, tip: BLACK };
// (its mask: black across both eyes, white brows over it and a white muzzle under, a dark blaze between the eyes; `w` how far the black comes down)
function mask(skull, C, w = -0.2) {
  paint(skull.rings[1], cy => (cy > 0.95 ? C.back ?? C.coat : cy > 0.8 ? WHITE : cy > w ? BLACK : WHITE));
  paint(skull.rings[2], cy => (cy > 0.9 ? BLACK : WHITE));
  return skull;
}
const build = (C, o) => { const q = quad({ C, hind: { len: 0.6, thick: 1.6, ...o.hind }, fore: { len: 0.56, thick: 1.5, ...o.fore }, body: { len: 0.85, girth: 1.3, deep: 1.0, tuck: 1.0, arch: 1.0, neck: [0.05, 0.13], neckThick: 1.3, white: 0.3, ...o.body },
  head: { size: 1.1, muzzle: 0.8, muzzleWide: 0.95, wide: 1.1, cheek: 1.2, eye: 1.0, ...o.head, ear: { tall: 0.6, wide: 1.15, at: [0.012, -0.008, 0], back: C.back ?? C.coat, tip: WHITE, ...o.ear } } }); mask(q.skull, C, o.mask); return q; };
const raccoon = {
  // a kit that's all mask, its tail a stub with two rings
  baby() {
    const C = { ...RACCOON, coat: "#96989c", back: undefined, upper: "#6b6d72" }, q = build(C, { hind: { len: 0.36, thick: 2.0 }, fore: { len: 0.34, thick: 1.9 }, body: { len: 0.55, girth: 1.25, arch: 0.6, neck: [0.03, 0.08] }, head: { size: 1.45, muzzle: 0.5, cheek: 0.5, eye: 1.4 } });
    const t = ringtail("tail", "pelvis", q.root, { len: 0.22, r: 0.055, pitch: -0.1, bands: 2, colours: RINGS });
    return plan("raccoon-baby", q.body, q.skull, [...q.legs, t], trundle({ lively: 1.3, run: { duty: 0.3 }, tails: [t.chain] }));
  },
  // slimmer and quicker: the mask sharp, four rings on its tail
  young() {
    const q = build(RACCOON, { body: { len: 0.82, girth: 1.05, arch: 0.8, tuck: 0.9 }, head: { size: 1.0, cheek: 0.8 } });
    const t = ringtail("tail", "pelvis", q.root, { len: 0.42, r: 0.075, pitch: -0.3, bands: 4, colours: RINGS });
    return plan("raccoon-young", q.body, q.skull, [...q.legs, t], trundle({ lively: 1.1, tails: [t.chain] }));
  },
  // fat and hunched, wide cheek ruffs, clever dark hands with long fingers, a tail as thick as its leg is long with five rings
  adult() {
    const q = build(RACCOON, { fore: { len: 0.58, thick: 1.5, paw: 1.25, claws: { colour: BLACK, len: 1.6, thick: 1.6, wide: 1.3 } }, hind: { len: 0.62, thick: 1.7 }, body: { girth: 1.5, arch: 1.5, hump: 0.3 }, head: { size: 1.14, cheek: 1.9 } });
    const t = ringtail("tail", "pelvis", q.root, { len: 0.62, r: 0.115, pitch: -0.25, curl: 0.3, bands: 5, bones: 5, colours: RINGS });
    return plan("raccoon-adult", q.body, q.skull, [...q.legs, t], trundle({ tails: [t.chain] }), { cones: whiskers(q.P, WHITE, 0.9) });
  },
  // the old night thief: a great hunched back, its mask run down over its cheeks, one eye lit like a lantern, fingers grown
  // long, a tail longer than itself in nine rings, a stolen gold chain at its throat; pewter plate over its back, a mark lit on each
  legend() {
    const LAMP = "#ffd76a", PEWTER = "#3a3f4d", GOLD = "#e9b949", C = { ...RACCOON, coat: "#6c6e75", back: "#3f4047", muzzle: "#dcd8cc", eyes: [{ colour: LAMP, glow: true }, { colour: "#e6ecec" }] };
    const q = build(C, { mask: -0.6, fore: { len: 0.78, thick: 1.35, paw: 1.3, knob: 1.3, claws: { colour: "#cfd3d8", len: 2.6, thick: 1.6, wide: 1.4 } }, hind: { len: 0.82, thick: 1.6, knob: 1.3, claws: { colour: "#cfd3d8", len: 1.4 } }, body: { len: 1.0, girth: 1.6, deep: 1.1, arch: 1.8, hump: 0.9, neck: [0.03, 0.17], neckThick: 1.5 }, head: { size: 1.3, muzzle: 0.9, cheek: 2.6, eye: 1.4 }, ear: { tall: 0.7, torn: -1 } }), R = q.R;
    const t = ringtail("tail", "pelvis", q.root, { len: 1.15, r: 0.15, pitch: 0.5, curl: -1.3, wave: 0.25, bands: 9, bones: 7, sides: 8, tip: 0.08, colours: { coat: "#8d8f94", ring: BLACK, tip: BLACK } });
    const chain = band("neck", R[5].at, R[6].at, { at: 0.25, r: R[5].rx * 1.06, ry: R[5].ry * 1.06, wide: 0.022, colour: GOLD });
    const shag = [1, 2, 3].flatMap(i => tufts(R[i], BONES[i], { n: 3, a0: 1.6, a1: 2.4, long: 0.13, sweep: 0.75, droop: 0.5, r: 0.08, lock: true, colour: () => C.coat, tip: () => "#a9abb0" }));
    const armour = [{ from: 1.2, to: 4.7, round: [0, 1.35], lames: 4, thick: 0.022, step: 0.012, colour: PEWTER, rim: "#c9d2de", runes: { colour: LAMP } }];
    return plan("raccoon-legend", q.body, q.skull, [...q.legs, t, chain], trundle({ lively: 0.75, tails: [t.chain] }), { cones: [...shag, ...whiskers(q.P, WHITE, 1.5)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. */
export const MESH = { id: "raccoon", heights: [47, 73, 104, 249], plans: raccoon };
