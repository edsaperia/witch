// The lynx, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn together
// on kit/feline.js; the ladders are proposals till Ed marks them). A lynx's own build: tall on its legs, the hind ones longer,
// short in the back, a bobbed black-tipped tail, great paws, a ruff under its jaw and black tufts on its ears. On Ed's word for
// the fox (2026-11-11): the adult wears its signature loud, the legend is another, older, stranger creature; its armour
// "thickened polygons on their torso with a different colour and glowing runes".
import { cat, catTail, feline, springs } from "../kit/feline.js";
import { spots } from "../kit/markings.js";
import { tufts } from "../kit/tufts.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#4a2f2a", BLACK = "#191513", PALE = "#f1e9da";
const LYNX = { coat: "#b98b5c", belly: PALE, nose: NOSE, upper: "#b98b5c", mid: "#b08253", sock: "#c9a57a", eye: "#1a1512", ear: "#8a6846", tip: BLACK, cheek: PALE };
const build = (C, o = {}) => feline({ C, hind: { len: 1.22, thick: 1.15, paw: 1.3, ...o.hind }, fore: { len: 1.1, thick: 1.15, paw: 1.3, ...o.fore }, body: { len: 0.84, girth: 1.0, deep: 1.05, tuck: 0.8, neck: [0.13, 0.11], neckThick: 1.2, white: 0.4, ...o.body },
  head: { size: 1.05, cheek: 1.3, eye: 1.2, ...o.head }, ear: { shape: "point", tall: 1.0, wide: 0.95, at: [0.008, 0, -0.01], tip: BLACK, ...o.ear } });
// (the black tuft standing on each ear's tip, `long` times a lynx's)
const eartufts = (q, long = 1, o = {}) => [1, -1].map(s => { const e = q.earTip(s); return { at: [e[0], e[1] - 0.012, e[2]], rx: 0.012, ry: 0.012, tip: [e[0] + 0.012 * s * long, e[1] + 0.075 * long, e[2] - 0.01 * long], bone: s > 0 ? "earL" : "earR", colour: BLACK, up: [0, 0, 1], sides: 4, ...o }; });
const bob = (q, C, o) => catTail(q.root, C, { len: 0.16, r: 0.05, pitch: -0.2, curl: 0.3, tip: 0.45, blunt: 0.5, bones: 3, ...o });
const DOT = "#8c6640";
const lynx = {
  // a spotted kitten on big soft paws, its ear tufts just starting
  baby() {
    const q = build(LYNX, { hind: { len: 0.6, thick: 1.7, paw: 1.4 }, fore: { len: 0.56, thick: 1.7, paw: 1.4 }, body: { len: 0.56, girth: 1.08, neck: [0.06, 0.08] }, head: { size: 1.4, cheek: 0.6, eye: 1.7 }, ear: { tall: 0.8, wide: 1.1 } });
    const t = bob(q, LYNX, { len: 0.09 });
    return cat("lynx-baby", q, [t], springs({ lively: 1.3, tails: [t.chain] }), { cones: eartufts(q, 0.5) }, spots(DOT, { sparse: 0.3 }));
  },
  // all leg, the ruff coming in
  young() {
    const q = build(LYNX, { hind: { len: 1.2, thick: 0.95 }, fore: { len: 1.08, thick: 0.95 }, body: { len: 0.78, girth: 0.85, tuck: 0.7 }, head: { size: 0.98, cheek: 1.0 } });
    const t = bob(q, LYNX, {});
    return cat("lynx-young", q, [t], springs({ lively: 1.1, tails: [t.chain] }), { cones: eartufts(q, 0.8) }, spots(DOT, { sparse: 0.5 }));
  },
  // tall and square, a full ruff in two points, long black ear tufts, great paws
  adult() {
    const q = build(LYNX, { head: { size: 1.08, cheek: 1.5 } });
    const t = bob(q, LYNX, {});
    return cat("lynx-adult", q, [t], springs({ tails: [t.chain] }), { cones: [...eartufts(q, 1.3), ...whiskers(q.P, "#ffffff", 1.1)] }, spots(DOT, { sparse: 0.55 }));
  },
  // the winter one: silver-grey and taller still, its ruff grown to a forked beard, its ear tufts long as horns and lit at
  // their ends, its eyes lit; a mane of pale fur down its neck; dusk-blue plate on its back, a moon-pale mark on each
  legend() {
    const SILVER = "#c9c8c6", DUSK = "#3b3766", MOON = "#d5dcff", C = { ...LYNX, coat: SILVER, upper: SILVER, mid: "#b5b3b0", sock: "#e6e4df", belly: "#f7f5f0", ear: "#8d8b88", muzzle: "#f7f5f0", eyes: [{ colour: MOON, glow: true }, { colour: MOON, glow: true }] };
    const q = build(C, { hind: { len: 1.5, thick: 1.1, paw: 1.45, knob: 1.2, claws: { colour: BLACK, len: 0.9 } }, fore: { len: 1.36, thick: 1.12, paw: 1.45, knob: 1.2, claws: { colour: BLACK, len: 0.9 } }, body: { len: 0.95, girth: 1.05, deep: 1.25, tuck: 0.6, hump: 0.6, neck: [0.16, 0.14], neckThick: 1.3 }, head: { size: 1.3, cheek: 1.6, eye: 1.5 }, ear: { tall: 1.25 } }), P = q.P, R = q.R;
    const t = bob(q, C, { len: 0.22, r: 0.06 });
    const beard = [1, -1].map(s => ({ at: P(0.03 * s, -0.04, 0.12), rx: 0.035, ry: 0.03, tip: P(0.07 * s, -0.17, 0.08), bone: "head", colour: "#f7f5f0", tipColour: "#a9a7a4", split: 0.5, up: [0, 0, 1] }));
    const fur = [...tufts(R[5], "neck", { n: 3, a0: 0.3, a1: 2.6, long: 0.16, sweep: 0.7, droop: 0.4, r: 0.07, lock: true, colour: () => "#f7f5f0", tip: () => "#a9a7a4" }), ...tufts(R[4], "chest", { n: 2, a0: 0.2, a1: 1.2, long: 0.14, sweep: 0.85, droop: 0.2, r: 0.07, lock: true, colour: () => SILVER, tip: () => "#8d8b88" })];
    const armour = [{ from: 1.1, to: 3.5, round: [0, 1.6], lames: 3, thick: 0.02, step: 0.012, colour: DUSK, rim: "#9aa0d8", runes: { colour: MOON } }];
    return cat("lynx-legend", q, [t], springs({ lively: 0.75, tails: [t.chain] }), { cones: [...eartufts(q, 1.9, { tipColour: MOON, split: 0.6, glow: "tip" }), ...beard, ...fur, ...whiskers(P, "#ffffff", 1.5)], armour }, spots("#8f8e8c", { sparse: 0.6 }));
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs lynx`: Ed, 2026-11-12, "keep the sizes");
 *  plans, each level's build. */
export const MESH = { id: "lynx", heights: [50, 78, 111, 332], plans: lynx };
