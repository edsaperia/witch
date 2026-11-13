// The lion, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn together on
// kit/feline.js; the ladders are proposals till Ed marks them). Its genome's brief (art/creatures/lion/genome.js): "a big tawny cat,
// a spotted cub, a lean young with a fuzz of mane, the adult's dark mane; its legend the sun's: a mane of flame-locks, its
// eyes lit, sun-fire rising off it". The mane is kit/mane.js. On Ed's word (2026-11-11): the legend's armour is "thickened
// polygons on their torso with a different colour and glowing runes", and nothing on it is a ball.
import { cat, catTail, feline, stalks } from "../kit/feline.js";
import { mane } from "../kit/mane.js";
import { spots } from "../kit/markings.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#3a2420", DARK = "#4a2c16", UMBER = "#2e1b10";
const LION = { coat: "#c9974f", belly: "#ead9b8", nose: NOSE, upper: "#c9974f", mid: "#c08c45", sock: "#d1a561", eye: "#2a1a10", ear: "#7a5630", tip: DARK, muzzle: "#ead9b8" };
const build = (C, o = {}) => feline({ C, hind: { len: 1.12, thick: 1.3, paw: 1.2, ...o.hind }, fore: { len: 1.12, thick: 1.45, paw: 1.25, ...o.fore }, body: { len: 1.12, girth: 1.18, deep: 1.18, tuck: 0.72, neck: [0.15, 0.14], neckThick: 1.35, white: 0.3, ...o.body },
  head: { size: 1.2, muzzle: 0.7, muzzleWide: 1.5, muzzleDeep: 1.4, eye: 1.0, ...o.head }, ear: { tall: 0.62, wide: 0.9, ...o.ear } });
// (its tail: a rope with a dark tuft at its end)
const rope = (q, C, o) => catTail(q.root, C, { len: 0.72, r: 0.042, pitch: -0.9, curl: 1.3, tip: 0.26, plume: true, bones: 5, ...o });
const lion = {
  // a spotted cub, round-eared and big-pawed
  baby() {
    const q = build(LION, { hind: { len: 0.56, thick: 1.8, paw: 1.3 }, fore: { len: 0.56, thick: 1.9, paw: 1.3 }, body: { len: 0.62, girth: 1.15, deep: 1.0, tuck: 0.95, neck: [0.06, 0.09] }, head: { size: 1.45, muzzle: 0.5, eye: 1.5 }, ear: { tall: 0.8, wide: 1.2 } });
    const t = catTail(q.root, LION, { len: 0.3, r: 0.04, tip: 0.2 });
    return cat("lion-baby", q, [t], stalks({ lively: 1.3, tails: [t.chain] }), {}, spots("#a87a3c", { sparse: 0.35 }));
  },
  // lean and rangy, a fuzz of mane on its neck and crown
  young() {
    const q = build(LION, { hind: { len: 1.12, thick: 1.05 }, fore: { len: 1.12, thick: 1.1 }, body: { len: 1.0, girth: 0.95, deep: 1.05, tuck: 0.66 }, head: { size: 1.05 } });
    const t = rope(q, LION, { len: 0.62, r: 0.036 });
    const fuzz = mane(q.R, { rows: [6, 5], n: 3, a0: 0.2, a1: 2.2, long: 0.07, r: 0.05, colour: () => "#b07f3c", tip: () => "#8f6230" });
    return cat("lion-young", q, [t], stalks({ lively: 1.1, tails: [t.chain] }), { cones: fuzz });
  },
  // the dark mane, from its crown over its shoulders and down under its chest
  adult() {
    const q = build(LION);
    const t = rope(q, LION, {});
    const hair = mane(q.R, { n: 5, long: 0.17, r: 0.078, P: q.P, colour: (j, k) => (k + j > 3 ? UMBER : DARK), tip: (j, k) => (k + j > 3 ? "#1c120c" : UMBER) });
    return cat("lion-adult", q, [t], stalks({ tails: [t.chain] }), { cones: hair });
  },
  // the sun's: its mane long locks of flame lit at their ends, flame along its spine and at its tail's end, its eyes lit,
  // its coat gone to gold; dark red plate on its back and flanks, a sun-gold mark lit on each
  legend() {
    const FLAME = "#f29a22", LIT = "#ffe27a", RED = "#7d2418", C = { ...LION, coat: "#dba848", upper: "#dba848", mid: "#cf9a3c", sock: "#e4bb66", tip: FLAME, eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] };
    const q = build(C, { hind: { len: 1.3, thick: 1.3, knob: 1.2, claws: { colour: UMBER, len: 1.0 } }, fore: { len: 1.3, thick: 1.5, knob: 1.2, claws: { colour: UMBER, len: 1.0 } }, body: { len: 1.2, girth: 1.22, deep: 1.36, tuck: 0.6, hump: 0.8, neck: [0.17, 0.17], neckThick: 1.5 }, head: { size: 1.42, eye: 1.2 } }), R = q.R;
    const t = rope(q, C, { len: 0.95, r: 0.05, pitch: 0.2, curl: 1.4, wave: 0.2, bones: 6, fire: { colour: FLAME, tip: LIT, size: 1.3 } });
    const hair = mane(R, { n: 6, long: 0.3, r: 0.085, sweep: 0.5, droop: 0.15, P: q.P, crown: 1.7, glow: "tip", colour: (j, k) => (j % 2 ? "#e0701c" : FLAME), tip: () => LIT });
    const spine = [3, 2, 1].flatMap(i => tufts(R[i], BONES[i], { n: 1, a0: 0.1, long: 0.16, sweep: 0.55, droop: -0.3, r: 0.045, lock: true, colour: () => FLAME, tip: () => LIT, glow: "tip" }));
    const armour = [{ from: 0.9, to: 3.2, round: [0.25, 1.8], lames: 3, thick: 0.022, step: 0.012, colour: RED, rim: "#e9b949", runes: { colour: LIT } }];
    return cat("lion-legend", q, [t], stalks({ lively: 0.75, tails: [t.chain] }), { cones: [...hair, ...spine], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs lion`: Ed, 2026-11-12, "keep the sizes");
 *  plans, each level's build. */
export const MESH = { id: "lion", heights: [63, 99, 141, 305], plans: lion };
