// The black jaguar, four levels, as plans for art/mesh/shape.js (batch B of docs/plans/creature-mesh-rollout.md, the cats, drawn
// together on kit/feline.js; the ladders are proposals till Ed marks them). Its genome's brief (art/creatures/jaguar/genome.js): "a
// melanistic jaguar, stocky and short-legged with a big head, black with rosettes a shade darker that show only in the light,
// gold-green eyes. Its evolution: a round, big-headed cub whose rosettes still show, a lithe young, a heavy-jawed adult, and
// the legend: a huge head and a crushing jaw, its hidden rosettes surfacing black on black in the moonlight ...; the elder of
// its kind, its muzzle grey, old scars on its flanks and brow, a collar of jade and bronze beads". On Ed's word (2026-11-11):
// the legend's armour is "thickened polygons on their torso with a different colour and glowing runes".
import { band } from "../kit/band.js";
import { cat, catTail, feline, stalks } from "../kit/feline.js";
import { spots } from "../kit/markings.js";
import { whiskers } from "../kit/whiskers.js";

const NOSE = "#0c0b0e", INK = "#141318", JADE = "#3cb084", BRONZE = "#b9722e", EYE = "#c9d94a";
const JAGUAR = { coat: "#3a3846", belly: "#2e2c38", nose: NOSE, upper: "#3a3846", mid: "#34323f", sock: "#2e2c38", eye: EYE, ear: "#1b1a20", inner: "#4a4450", tip: INK };
const build = (C, o = {}) => feline({ C, hind: { len: 0.84, thick: 1.6, paw: 1.25, ...o.hind }, fore: { len: 0.84, thick: 1.8, paw: 1.3, ...o.fore }, body: { len: 1.1, girth: 1.3, deep: 1.1, tuck: 0.9, neck: [0.08, 0.14], neckThick: 1.5, white: 0.2, ...o.body },
  head: { size: 1.3, muzzle: 0.6, muzzleWide: 1.6, muzzleDeep: 1.5, wide: 1.18, eye: 1.05, ...o.head }, ear: { tall: 0.58, wide: 0.9, ...o.ear } });
const rosettes = (c, o) => spots(c, { sparse: 0.35, low: -0.5, ...o });
const jaguar = {
  // a round, big-headed cub, brown-black, its rosettes still showing
  baby() {
    const C = { ...JAGUAR, coat: "#4b4038", upper: "#4b4038", mid: "#453a33", belly: "#3f352f", sock: "#3f352f" };
    const q = build(C, { hind: { len: 0.48, thick: 2.0, paw: 1.35 }, fore: { len: 0.48, thick: 2.1, paw: 1.35 }, body: { len: 0.62, girth: 1.22, neck: [0.04, 0.09] }, head: { size: 1.55, muzzle: 0.48, eye: 1.5 }, ear: { tall: 0.75, wide: 1.15 } });
    const t = catTail(q.root, C, { len: 0.3, r: 0.045, tip: 0.2 });
    return cat("jaguar-baby", q, [t], stalks({ lively: 1.3, tails: [t.chain] }), {}, rosettes("#1f1a17"));
  },
  // lithe: the cub's roundness gone, all black now
  young() {
    const q = build(JAGUAR, { hind: { len: 0.9, thick: 1.25 }, fore: { len: 0.9, thick: 1.35 }, body: { len: 1.02, girth: 1.0, tuck: 0.75 }, head: { size: 1.1 } });
    const t = catTail(q.root, JAGUAR, { len: 0.6, r: 0.045 });
    return cat("jaguar-young", q, [t], stalks({ lively: 1.1, tails: [t.chain] }), {}, rosettes(INK));
  },
  // heavy-jawed and thick in the neck, low on short strong legs
  adult() {
    const q = build(JAGUAR);
    const t = catTail(q.root, JAGUAR, { len: 0.66, r: 0.055 });
    return cat("jaguar-adult", q, [t], stalks({ tails: [t.chain] }), { cones: whiskers(q.P, "#8f8c96", 1.1) }, rosettes(INK));
  },
  // the elder: a huge head and a crushing jaw, its muzzle grey, scars on its flank and brow, its rosettes surfacing pale as
  // moonlight on water, a collar of jade and bronze; jade plate on its back, a moon-white mark lit on each
  legend() {
    const MOON = "#e2fff2", RIPPLE = "#46506e", SCAR = "#8d7f86", C = { ...JAGUAR, coat: "#343240", muzzle: "#77747c", eyes: [{ colour: "#d8f060", glow: true }, { colour: "#d8f060", glow: true }] };
    const q = build(C, { hind: { len: 0.96, thick: 1.7, paw: 1.35, knob: 1.2, claws: { colour: "#cfd4d0", len: 1.1 } }, fore: { len: 0.96, thick: 2.0, paw: 1.45, knob: 1.2, claws: { colour: "#cfd4d0", len: 1.3 } }, body: { len: 1.22, girth: 1.45, deep: 1.25, tuck: 0.8, hump: 0.9, neck: [0.06, 0.18], neckThick: 1.75 }, head: { size: 1.68, muzzle: 0.68, muzzleDeep: 1.7, eye: 1.1 }, ear: { torn: -1 } }), P = q.P, R = q.R;
    const t = catTail(q.root, C, { len: 0.85, r: 0.06, bones: 6, ring: { colour: BRONZE, at: 0.3 } });
    const collar = [band("neck", R[5].at, R[6].at, { at: 0.05, r: R[5].rx * 1.1, ry: R[5].ry * 1.08, wide: 0.035, colour: JADE }), band("neck", R[5].at, R[6].at, { at: 0.5, r: R[5].rx * 1.04, ry: R[5].ry * 1.03, wide: 0.018, colour: BRONZE })];
    const rake = (at, d, bone) => [-1, 0, 1].map(i => ({ at: [at[0], at[1] + 0.022 * i, at[2] + 0.03 * i], rx: 0.007, ry: 0.007, tip: [at[0] + d[0], at[1] + d[1] + 0.022 * i, at[2] + d[2] + 0.03 * i], bone, colour: SCAR, up: [1, 0, 0], sides: 3 }));
    const scars = [...rake([R[2].rx * 0.98, R[2].at[1] - 0.02, R[2].at[2] + 0.02], [-0.004, -0.09, -0.11], "loin"), ...rake(P(0.03, 0.085, 0.07), [-0.03, -0.06, 0.09], "head").slice(0, 2)];
    const armour = [{ from: 2.0, to: 4.7, round: [0, 1.5], lames: 4, thick: 0.024, step: 0.012, colour: "#2f8f6c", rim: BRONZE, runes: { colour: MOON } }];
    return cat("jaguar-legend", q, [t, ...collar], stalks({ lively: 0.75, tails: [t.chain] }), { cones: [...scars, ...whiskers(P, "#b9b6c0", 1.4)], armour }, rosettes(RIPPLE, { sparse: 0.45 }));
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs jaguar`: Ed, 2026-11-12, "keep the
 *  sizes"); plans, each level's build. */
export const MESH = { id: "jaguar", heights: [55, 84, 120, 250], plans: jaguar };
