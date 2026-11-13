// The sand cat, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn
// together on kit/feline.js; the ladders are proposals till Ed marks them). Its genome's brief (art/creatures/cat/genome.js): "small
// and stocky, pale sand, a broad flat head under big low-set ears, faint bars only, a black-ringed tail; its legend crowned".
// On Ed's word for the fox (2026-11-11): the adult wears its signature loud, the legend is another, older, stranger creature;
// its armour "thickened polygons on their torso with a different colour and glowing runes".
import { band } from "../kit/band.js";
import { cat, catTail, feline, springs } from "../kit/feline.js";
import { ringed } from "../kit/markings.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#3a2622", BLACK = "#1c1614", BAR = "#a98a5c", GOLD = "#e9b949";
const SAND = { coat: "#d8bd8f", belly: "#f6efe2", nose: NOSE, upper: "#d8bd8f", mid: "#cdb083", sock: "#eadcc0", eye: "#1a1512", ear: "#b6976a", tip: BLACK, cheek: "#f6efe2" };
const build = (C, o = {}) => feline({ C, hind: { len: 0.7, thick: 1.45, ...o.hind }, fore: { len: 0.7, thick: 1.5, ...o.fore }, body: { len: 0.9, girth: 1.12, deep: 0.95, tuck: 0.95, neck: [0.07, 0.12], neckThick: 1.25, white: 0.4, ...o.body },
  head: { size: 1.15, wide: 1.25, dome: 0.88, eye: 1.5, cheek: 0.8, ...o.head }, ear: { shape: "point", tall: 0.85, wide: 1.6, splay: 0.7, at: [0.03, -0.022, -0.01], ...o.ear } });
// (its bars: one round each upper leg; its tail's black rings and tip)
const bars = q => q.legs.forEach(l => ringed(l, BAR, 1, 1)), rings = (q, C, o) => ringed(catTail(q.root, C, { len: 0.5, r: 0.046, tip: 0.1, ...o }), BLACK, 3);
const sandcat = {
  // a kitten that's all ears and eyes
  baby() {
    const q = build(SAND, { hind: { len: 0.42, thick: 1.8 }, fore: { len: 0.42, thick: 1.8 }, body: { len: 0.56, girth: 1.1, neck: [0.05, 0.08] }, head: { size: 1.42, eye: 1.9, cheek: 0.4 }, ear: { tall: 0.8, wide: 1.7 } });
    const t = catTail(q.root, SAND, { len: 0.24, r: 0.04, tip: 0.3, curl: 0.8 });
    return cat("cat-baby", q, [t], springs({ lively: 1.3, tails: [t.chain] }));
  },
  // leggier, the ears already full size, the tail's rings showing
  young() {
    const q = build(SAND, { hind: { len: 0.74, thick: 1.15 }, fore: { len: 0.74, thick: 1.15 }, body: { len: 0.84, girth: 0.92, tuck: 0.8 }, head: { size: 1.05, cheek: 0.5 }, ear: { tall: 0.95 } });
    const t = rings(q, SAND, { len: 0.42 });
    return cat("cat-young", q, [t], springs({ lively: 1.1, tails: [t.chain] }));
  },
  // stocky and low, the head broad and flat under wide ears, barred legs, whiskers out wide
  adult() {
    const q = build(SAND, { ear: { tall: 1.0, wide: 1.75, tip: BLACK } }); bars(q);
    const t = rings(q, SAND, {});
    return cat("cat-adult", q, [t], springs({ tails: [t.chain] }), { cones: whiskers(q.P, "#ffffff", 1.2) });
  },
  // the desert's small king: ears like sails with gold in them, a gold circlet with one lit stone, a broad collar of gold and
  // faience, its tail ringed in gold, its eyes lit; faience plate on its back, a mark of sun-gold lit on each
  legend() {
    const FAIENCE = "#1f9c98", LIT = "#ffe9a8", C = { ...SAND, coat: "#e3cfa6", upper: "#e3cfa6", mid: "#d6bf90", muzzle: "#f6efe2", eyes: [{ colour: "#b8f26a", glow: true }, { colour: "#b8f26a", glow: true }] };
    const q = build(C, { hind: { len: 0.86, thick: 1.3, claws: { colour: BLACK, len: 0.8 }, band: { colour: GOLD, at: 0.3, r: 0.036 } }, fore: { len: 0.86, thick: 1.35, claws: { colour: BLACK, len: 0.8 }, band: { colour: GOLD, at: 0.3, r: 0.036 } }, body: { len: 1.0, girth: 1.1, deep: 1.1, neck: [0.14, 0.12] }, head: { size: 1.3, cheek: 1.1, eye: 1.6 }, ear: { tall: 1.7, wide: 1.9, splay: 0.8, tip: BLACK } }), P = q.P, R = q.R; bars(q);
    const t = ringed(catTail(q.root, C, { len: 0.8, r: 0.05, pitch: 0.5, curl: 1.4, wave: 0.2, tip: 0.1, bones: 6 }), GOLD, 3);
    const collar = [band("neck", R[5].at, R[6].at, { at: 0.1, r: R[5].rx * 1.08, ry: R[5].ry * 1.08, wide: 0.03, colour: GOLD }), band("neck", R[5].at, R[6].at, { at: 0.5, r: R[5].rx * 1.04, ry: R[5].ry * 1.02, wide: 0.02, colour: FAIENCE })];
    const crown = [{ at: P(0, 0.085, 0.085), rx: 0.045, ry: 0.016, tip: P(0, 0.2, 0.07), bone: "head", colour: GOLD, split: 0.6, up: [0, 0, 1] }, { at: P(0, 0.085, 0.1), rx: 0.016, ry: 0.016, tip: P(0, 0.1, 0.125), bone: "head", colour: "#7ff0e0", glow: true, up: [0, 1, 0] },
      ...[1, -1].map(s => ({ at: q.earTip(s).map((v, i) => v - [0.03 * s, 0.1, 0][i]), rx: 0.02, ry: 0.02, tip: q.earTip(s).map((v, i) => v - [0.01 * s, 0.17, 0][i]), bone: s > 0 ? "earL" : "earR", colour: GOLD, split: 0.85, up: [0, 0, 1], sides: 5 }))];
    const armour = [{ from: 1.1, to: 4.4, round: [0, 1.5], lames: 4, thick: 0.02, step: 0.01, colour: FAIENCE, rim: GOLD, runes: { colour: LIT } }];
    return cat("cat-legend", q, [t, ...collar], springs({ lively: 0.75, tails: [t.chain] }), { cones: [...crown, ...whiskers(P, "#ffffff", 1.6)], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs cat`: Ed, 2026-11-12, "keep the sizes");
 *  plans, each level's build. */
export const MESH = { id: "cat", heights: [42, 68, 96, 248], plans: sandcat };
