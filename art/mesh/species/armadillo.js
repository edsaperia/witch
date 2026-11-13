// The scrub wash's armadillo, four levels, as plans for art/mesh/shape.js (the rollout's batch E, the cold-blooded and the
// armoured: docs/plans/creature-mesh-rollout.md). Its genome's brief (art/creatures/armadillo/genome.js; Ed, 2026-10-12): "a low
// domed shell banded across its middle, a long tapering snout, upright ears, a ringed tail"; its legend (Ed: "rolls into a
// glowing ball, with glowing seams between its bands, rolling when it moves"). Its shell at every level is plate raised from
// its own back's polygons (art/mesh/shape.js `armour`), cut into bands across it; the legend's is a colour of its own with a
// mark lit on each band, the bands standing apart. It walks at every level (the mesh has no rolling yet) and curls to sleep.
import { scurry } from "../kit/gaits.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { ringtail } from "../kit/ringtail.js";

const SHELL = "#a8937a", RIM = "#7d6a55", DILLO = { coat: "#c9a48c", belly: "#e3cdb8", nose: "#6a4a40", upper: "#b8957e", mid: "#a8866f", sock: "#8a6d5a", eye: "#17120f" };
const build = (C, o) => quad({ C, hind: { len: 0.36, thick: 1.6, paw: 1.2, claws: { colour: "#e9e2cf", len: 1.2, thick: 1.3 }, ...o.legs }, fore: { len: 0.36, thick: 1.5, paw: 1.2, claws: { colour: "#e9e2cf", len: 1.6, thick: 1.4 }, ...o.legs }, body: { len: 0.85, girth: 1.3, deep: 0.95, tuck: 1.05, arch: 0.8, hump: 0.3, neck: [0.0, 0.13], neckThick: 1.0, white: 0.45, ...o.body },
  head: { size: 0.9, muzzle: 1.7, muzzleWide: 0.7, muzzleDeep: 0.75, wide: 0.82, dome: 0.85, cheek: 0, eye: 0.8, nose: 0.7, ...o.head, ear: { shape: "long", tall: 0.55, wide: 0.75, lean: 0.1, splay: 0.3, at: [-0.008, -0.01, -0.01], back: C.upper, inner: "#d9a996", tip: C.upper, ...o.ear } } });
// (it scurries; and it curls up to sleep at every level, as an armadillo does)
const goes = (o = {}) => scurry({ sleep: "curl", ...o });
const tailOf = (q, C, o) => ringtail("tail", "pelvis", q.root, { len: 0.45, r: 0.05, pitch: -0.35, curl: 0.2, bands: 5, share: 0.4, tip: 0.1, blunt: 0.1, colours: { coat: C.coat, ring: RIM, tip: RIM }, ...o });
/** Its shell: bands of plate across its back from its rump to its shoulders, and a shield on its head. */
const shell = (o = {}) => [{ from: 0.55, to: 4.45, round: [0, 1.8], lames: o.lames ?? 7, thick: o.thick ?? 0.022, step: 0.008, colour: o.colour ?? SHELL, rim: o.rim ?? RIM, ...(o.gap ? { gap: o.gap } : {}), ...(o.runes ? { runes: o.runes } : {}) },
  { from: 7.1, to: 8.3, round: [0, 0.8], thick: 0.012, step: 0, colour: o.colour ?? SHELL, rim: o.rim ?? RIM }];
const armadillo = {
  // a pup: soft and pink, its shell not yet hard, big ears
  baby() {
    const C = { ...DILLO, coat: "#e3b8a8", upper: "#d9ab9a", mid: "#c99a8a", sock: "#b08678" }, q = build(C, { legs: { len: 0.28, thick: 1.7 }, body: { len: 0.6, girth: 1.25 }, head: { size: 1.2, muzzle: 1.1, eye: 1.3 }, ear: { tall: 0.75 } });
    const t = tailOf(q, C, { len: 0.2, r: 0.035, bands: 3 });
    return plan("armadillo-baby", q.body, q.skull, [...q.legs, t], goes({ lively: 1.3, tails: [t.chain] }), { armour: shell({ lames: 4, thick: 0.014, colour: "#d9b8a4", rim: "#c9a08e" }) });
  },
  // its bands hardening, its snout lengthening
  young() {
    const q = build(DILLO, { body: { len: 0.78, girth: 1.15 }, head: { size: 0.95, muzzle: 1.4 }, ear: { tall: 0.65 } }), t = tailOf(q, DILLO, { len: 0.34, r: 0.042, bands: 4 });
    return plan("armadillo-young", q.body, q.skull, [...q.legs, t], goes({ lively: 1.1, tails: [t.chain] }), { armour: shell({ lames: 6, thick: 0.018 }) });
  },
  // a low domed shell banded across its middle, a long tapering snout, upright ears, a ringed tail
  adult() {
    const q = build(DILLO, { body: { len: 0.9, girth: 1.45, hump: 0.5 }, legs: { len: 0.38, thick: 1.7 } }), t = tailOf(q, DILLO, {});
    return plan("armadillo-adult", q.body, q.skull, [...q.legs, t], goes({ tails: [t.chain] }), { armour: shell({ lames: 8, thick: 0.03 }) });
  },
  // the old one of the wash: its shell gone to red sandstone, each band standing apart from the next with light in the
  // seams between them, a mark lit on every band, its eyes lit
  legend() {
    const LIT = "#ffcf6a", ROCK = "#8a3f2a", ROCK2 = "#b5613c", C = { ...DILLO, coat: "#a8866f", belly: "#c9b09a", upper: "#96755f", mid: "#866752", sock: "#6a5040", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { body: { len: 1.0, girth: 1.75, hump: 0.7 }, legs: { len: 0.44, thick: 1.8, knob: 1.2, claws: { colour: "#d9d2b8", len: 2.2, thick: 1.6 } }, head: { size: 1.05, eye: 1.0 }, ear: { tall: 0.6 } });
    const t = tailOf(q, C, { len: 0.6, r: 0.065, bands: 6, colours: { coat: ROCK2, ring: ROCK, tip: ROCK } });
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing
    // runes"; of this kind, 2026-10-12: "glowing seams between its bands"): the bands stand apart, each edged the colour of its
    // light. (A lit layer under them drew over its body: the seams themselves are not lit yet.)
    return plan("armadillo-legend", q.body, q.skull, [...q.legs, t], goes({ lively: 0.75, tails: [t.chain] }), { armour: [...shell({ lames: 8, thick: 0.04, gap: 0.07, colour: ROCK, rim: LIT, runes: { colour: LIT, max: 1, round: [0.3, 1.5] } })] });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build; curl, how it curls up to sleep (art/mesh/gear.js `napping` reads gait.curl): tight, its nose to its tail's root. */
export const MESH = { id: "armadillo", heights: [44, 68, 104, 265], curl: { turn: 4.3 }, plans: armadillo };
