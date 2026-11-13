// The stag, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch C: the hoofed; proposals till
// Ed passes them). A red deer: tall on thin legs, a deep chest tucked up to the loin, a long neck carried high, ears out
// sideways, a pale rump. Each level its own build (Ed, 2026-10-05: "the evolved design per stage (not just being larger)"): a
// dappled fawn, all legs and ears; a pricket with its first forked antlers; a twelve-pointer with a dark mane; and the hart of
// the old wood (its genome's legend: lit antlers, flames on the tines), gaunt and pale, its antlers a tree hung with moss, every
// point lit like a candle, with verdigris plate over its back (Ed, 2026-11-12: "Armour should just be thickened polygons on
// their torso with a different colour and glowing runes"). Metres; y up; its head along +z.
import { antlers, TINES } from "../kit/antlers.js";
import { trots } from "../kit/gaits.js";
import { hooves } from "../kit/hooves.js";
import { plan } from "../kit/plan.js";
import { quad } from "../kit/quad.js";
import { rump, spots } from "../kit/spots.js";
import { tail } from "../kit/tail.js";
import { BONES } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const NOSE = "#1c1512", HOOF = "#2a2019", PALE = "#eadcc4", STAG = { coat: "#a9683a", belly: PALE, nose: NOSE, upper: "#a9683a", mid: "#8f5630", sock: "#6e4226" };
// (a deer lies with its forelegs folded under it, knees forward, and not out in front like a dog's: art/mesh/gear.js reads gait.lie)
const COUCHED = { fore: [-1.35, 2.5, 0.2], hind: [-0.95, 2.2, -1.25] };
const deer = (C, o) => { const q = quad({ C, hind: { len: 1.7, thick: 0.62, ...o.hind }, fore: { len: 1.85, thick: 0.6, ...o.fore }, body: { len: 1.2, girth: 1.12, deep: 1.15, tuck: 0.8, neck: [0.34, 0.19], neckThick: 1.05, white: 0.35, ...o.body },
  head: { size: 1.12, muzzle: 1.45, muzzleWide: 0.95, cheek: 0, eye: 1.2, ...o.head, ear: { shape: "long", tall: 0.85, wide: 1.25, splay: 0.9, lean: 0.45, back: C.coat, inner: "#ecd6c2", ...o.ear } } });
  return { ...q, legs: hooves(q.legs, { colour: HOOF }) }; };
const scut = (q, C, o = {}) => tail("tail", "pelvis", q.root, { len: 0.13, r: 0.032, pitch: -0.9, tip: 0.5, blunt: 0.2, sides: 5, colours: { coat: C.coat, tip: PALE }, ...o });
const stag = {
  // a fawn: dappled, all legs and ears and eyes
  baby() {
    const C = { ...STAG, coat: "#b8773f", upper: "#b8773f", mid: "#a76a38", sock: "#8f5630" }, q = deer(C, { hind: { len: 1.15, thick: 0.7 }, fore: { len: 1.22, thick: 0.68 }, body: { len: 0.72, girth: 0.9, deep: 0.95, neck: [0.2, 0.12], neckThick: 0.95 }, head: { size: 1.3, muzzle: 0.85, eye: 1.7 }, ear: { tall: 1.15, splay: 0.7 } });
    const t = scut(q, C, { len: 0.08 });
    return plan("stag-baby", q.body, q.skull, [...q.legs, t], trots({ lively: 1.3, lie: COUCHED, tails: [t.chain] }), { cones: spots(q.R, BONES, { colour: PALE }) });
  },
  // a pricket: leggy and narrow, its first antlers a fork each
  young() {
    const q = deer(STAG, { hind: { len: 1.6, thick: 0.56 }, fore: { len: 1.72, thick: 0.54 }, body: { len: 1.05, girth: 0.95, deep: 1.02, neck: [0.32, 0.16], neckThick: 0.9 }, head: { size: 1.05, muzzle: 1.3 } });
    const t = scut(q, STAG);
    return plan("stag-young", q.body, q.skull, [...q.legs, t, antlers(q.P, { kind: "fork", size: 0.5, spread: 0.7 })], trots({ lively: 1.1, lie: COUCHED, tails: [t.chain] }), { cones: [rump(q.R, PALE)] });
  },
  // a twelve-pointer: a deep chest and high withers, a dark shaggy mane on its neck, the full head of antlers
  adult() {
    const q = deer(STAG, { hind: { len: 1.75, thick: 0.68 }, fore: { len: 1.92, thick: 0.66 }, body: { len: 1.22, girth: 1.18, deep: 1.25, tuck: 0.76, hump: 0.35, neck: [0.36, 0.2], neckThick: 1.3 }, head: { size: 1.15, muzzle: 1.5 } }), R = q.R;
    const t = scut(q, STAG), mane = [...tufts(R[5], "neck", { n: 4, a0: 1.3, a1: 3.0, long: 0.15, sweep: 0.3, droop: 0.6, r: 0.06, lock: true, colour: () => "#6e4226", tip: () => "#4a2c1a" }), ...tufts(R[6], "neck", { n: 3, a0: 1.6, a1: 3.0, long: 0.12, sweep: 0.3, droop: 0.6, r: 0.05, lock: true, colour: () => "#6e4226", tip: () => "#4a2c1a" })];
    return plan("stag-adult", q.body, q.skull, [...q.legs, t, antlers(q.P, { kind: "red", size: 1.1 })], trots({ lie: COUCHED, tails: [t.chain] }), { cones: [rump(R, PALE), ...mane] });
  },
  // the hart of the old wood: gaunt, towering and gone pale as birch, a beard of a mane to its knees, one eye lit; its antlers a
  // winter tree hung with moss, a flame on every point; verdigris plate over its back and shoulders, a gold mark lit on each
  legend() {
    const GOLD = "#ffe08a", BRONZE = "#3f6b58", RIM = "#c9a24a", MOSS = "#55783a", C = { coat: "#cfc6b4", back: "#8d8372", belly: "#f1ece0", muzzle: "#a39a8a", nose: NOSE, upper: "#bdb3a0", mid: "#9a8f7c", sock: "#5e5548", eyes: [{ colour: GOLD, glow: true }, { colour: "#e6e9ea" }] };
    const q = deer(C, { hind: { len: 2.0, thick: 0.62, knob: 1.4, band: { colour: RIM, at: 0.35, r: 0.045 } }, fore: { len: 2.2, thick: 0.6, knob: 1.4, band: { colour: RIM, at: 0.35, r: 0.045 } }, body: { len: 1.3, girth: 1.12, deep: 1.4, tuck: 0.55, hump: 0.9, neck: [0.4, 0.26], neckThick: 1.35 }, head: { size: 1.3, muzzle: 1.7, eye: 1.4 }, ear: { tall: 1.0, torn: -1 } }), R = q.R, P = q.P;
    const t = scut(q, C, { len: 0.2 });
    const crown = antlers(P, { kind: "red", size: 1.4, spread: 1.15, r: 0.026, colour: "#9c8f78", glow: GOLD, moss: { colour: MOSS, tip: "#86a85a", long: 1.5 }, tines: [...TINES.red, [0.36, [0.9, 0.5, 0.3], 0.2], [0.62, [-0.3, 0.8, 0.9], 0.22], [0.66, [1, 0.5, -0.4], 0.2], [0.95, [0.6, 1, 0.4], 0.16]] });
    const mane = [...tufts(R[5], "neck", { n: 5, a0: 1.0, a1: 3.05, long: 0.3, sweep: 0.25, droop: 0.75, r: 0.075, lock: true, grow: 0.6, colour: () => "#f1ece0", tip: () => "#a39a8a" }), ...tufts(R[6], "neck", { n: 3, a0: 1.6, a1: 3.05, long: 0.24, sweep: 0.2, droop: 0.8, r: 0.06, lock: true, colour: () => "#f1ece0", tip: () => "#a39a8a" }),
      ...tufts(R[4], "chest", { n: 2, a0: 2.6, a1: 3.05, long: 0.2, sweep: 0.3, droop: 0.7, r: 0.06, lock: true, colour: () => "#f1ece0", tip: () => "#a39a8a" })];
    const beard = [{ at: P(0, -0.03, 0.2), rx: 0.03, ry: 0.03, tip: P(0, -0.2, 0.15), bone: "head", colour: "#f1ece0", tipColour: "#a39a8a", split: 0.5, bulge: 0.7, up: [0, 0, 1] }];
    const armour = [{ from: 1.2, to: 4.45, round: [0, 1.65], lames: 4, thick: 0.022, step: 0.012, colour: BRONZE, rim: RIM, runes: { colour: GOLD } }];
    return plan("stag-legend", q.body, q.skull, [...q.legs, t, crown], trots({ lively: 0.75, lie: COUCHED, tails: [t.chain] }), { cones: [...mane, ...beard], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "stag", heights: [64, 152, 240, 386], plans: stag };
