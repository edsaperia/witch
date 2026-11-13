// The griffin, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch H: the wonders, built from
// what batches A to G made; this one on batch F's wing and batch B's lion). The eyrie's (art/creatures/griffin/genome.js: "an
// eagle's white head, hooked gold beak and feathered ear tufts on a lion's tawny body, eagle's wings and talons on its forelegs,
// a lion's tufted tail; its legend the thing that makes it a griffin: wings vast as a sail, a crest of long white feathers, gold
// talons"). Its wings are shut along its sides till its legend, which holds them spread and raised. Its legend's armour (Ed,
// 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and glowing runes") is storm-blue.
// It prowls and trots, on the ground at every pace. Asleep its legend lies couched, its wings let down along its back: it
// can't curl onto a spread wing. Metres; y up; its head along +z.
import { featherwing } from "../kit/featherwing.js";
import { catTail, stalks } from "../kit/feline.js";
import { head } from "../kit/head.js";
import { fourLegs } from "../kit/leg.js";
import { plan } from "../kit/plan.js";
import { stance, torso } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const GOLD = "#e8b22c", WHITE = "#f4f1e8", DARK = "#4a2c16", LION = { coat: "#c79a52", belly: "#e6d3ae", upper: "#c79a52", mid: "#bb8d46", sock: "#cfa55e", tip: DARK }, EAGLE = { coat: WHITE, belly: WHITE, nose: GOLD, muzzle: GOLD, eye: "#2a1a10" };
/** A lion's body and hind legs, an eagle's head and feathered neck, forelegs scaled gold below the elbow and taloned. */
function build(o = {}) {
  const C = o.C ?? LION, HC = { ...EAGLE, ...o.HC }, talons = { colour: o.talon ?? "#3a2a1c", len: 1.7, thick: 1.5, wide: 1.3, ...o.talons };
  const hind = { colours: C, len: 1.1, thick: 1.3, paw: 1.2, ...o.hind }, fore = { colours: { upper: C.upper, mid: GOLD, sock: GOLD }, len: 1.12, thick: 1.25, paw: 1.3, claws: talons, ...o.fore };
  const body = torso({ ...stance(hind.len, fore.len), len: 1.1, girth: 1.15, deep: 1.2, tuck: 0.72, neck: [0.2, 0.13], neckThick: 1.35, white: 0.3, ...o.body, colours: C });
  const skull = head(body.pivot, { size: 1.15, muzzle: 0.3, muzzleWide: 0.85, muzzleDeep: 0.95, wide: 0.95, dome: 1.05, cheek: 0, eye: 1.0, nose: 0.5, ...o.head, ear: { shape: "point", tall: 0.5, wide: 0.55, back: WHITE, tip: "#b9a98c", ...o.ear }, colours: HC }), R = body.rings, P = skull.P, k = P(1, 0, 0)[0];
  R[5].colour = R[6].colour = HC.coat;
  // (its beak: deep at the root, hooked down to a point)
  const beak = { at: P(0, -0.004, 0.165), rx: 0.03 * k, ry: 0.034 * k, tip: P(0, -0.05, 0.165 + 0.1 * (o.beak ?? 1)), bone: "head", colour: GOLD, tipColour: o.beakTip ?? "#b9801c", split: 0.55, bulge: 0.9, bend: [0, 0.03 * k, 0.012 * k], up: [0, 1, 0], sides: 5 };
  const ruff = tufts(R[5], "neck", { n: 4, a0: 0.3, a1: 2.8, long: 0.09 * (o.ruff ?? 1), sweep: 0.6, droop: 0.4, r: 0.06, flat: 0.5, lock: true, colour: () => WHITE, tip: () => "#d9d2c0" });
  return { body, skull, legs: fourLegs(body, hind, fore), root: [0, R[1].at[1] + 0.01, R[0].at[2] + 0.03], R, P, cones: [beak, ...ruff] };
}
const rope = (q, C, o) => catTail(q.root, C, { len: 0.7, r: 0.04, pitch: -0.9, curl: 1.3, tip: 0.26, plume: true, bones: 5, ...o });
const wings = (q, o, up) => [[1, "L"], [-1, "R"]].map(([s, tag]) => featherwing(tag, s, [s * q.R[4].rx * 0.8, q.R[4].at[1] + q.R[4].ry * 0.62, q.R[4].at[2] - 0.02], { parent: "chest", tilt: 0, colours: { coat: "#8a5f34", flight: "#5e3f22", tip: "#e6d3ae", under: "#c79a52" }, ...o, ...(up ? { fold: { roll: -up, at: [0.5, -0.05, 0.4] } } : {}) }));
const folded = (ws, up) => ({ rots }) => { ws.forEach((w, i) => { const s = i ? -1 : 1; rots[w.names[0]] = [0, s * 1.25, -s * (up - 0.25)]; rots[w.names[1]] = [0, s * 0.25, 0]; }); };
const griffin = {
  // a chick of a cub: downy, big-headed, stubs of wings
  baby() {
    const q = build({ HC: { coat: "#e6e0d2", belly: "#e6e0d2" }, hind: { len: 0.58, thick: 1.8, paw: 1.3 }, fore: { len: 0.58, thick: 1.7, talons: { len: 0.8 } }, body: { len: 0.64, girth: 1.15, deep: 1.0, tuck: 0.95, neck: [0.1, 0.09] }, head: { size: 1.45, eye: 1.5 }, beak: 0.6, ruff: 0.6 });
    const t = catTail(q.root, LION, { len: 0.3, r: 0.04, tip: 0.2 }), w = wings(q, { span: 0.3, chord: 0.16, primaries: 3, secondaries: 2 });
    return plan("griffin-baby", q.body, q.skull, [...q.legs, t, ...w], stalks({ sleep: "sphinx", lively: 1.3, tails: [t.chain] }), { cones: q.cones });
  },
  // a fledgling: lean, its wings grown before its chest has
  young() {
    const q = build({ hind: { thick: 1.05 }, fore: { thick: 1.05 }, body: { len: 1.0, girth: 0.95, deep: 1.05, tuck: 0.66 }, head: { size: 1.05 }, ruff: 0.8 }), t = rope(q, LION, { len: 0.6, r: 0.035 });
    const w = wings(q, { span: 0.75, chord: 0.28, primaries: 4, secondaries: 3 });
    return plan("griffin-young", q.body, q.skull, [...q.legs, t, ...w], stalks({ sleep: "sphinx", lively: 1.1, tails: [t.chain] }), { cones: q.cones });
  },
  // the griffin: an eagle's white head and hooked gold beak, great wings shut along a lion's flanks, talons before and paws behind
  adult() {
    const q = build({}), t = rope(q, LION, {}), w = wings(q, { span: 1.15, chord: 0.4, primaries: 6, secondaries: 4 });
    return plan("griffin-adult", q.body, q.skull, [...q.legs, t, ...w], stalks({ sleep: "sphinx", tails: [t.chain] }), { cones: q.cones });
  },
  // the eyrie's lord: wings vast as a sail held spread above it, their points lit, a crest of long white feathers, gold talons,
  // its eyes lit; storm-blue plate on its back and flanks, a gold mark lit on each
  legend() {
    const LIT = "#ffe27a", STORM = "#34486a", UP = 0.95, C = { ...LION, coat: "#b88a44", upper: "#b88a44", mid: "#a97c3a", sock: "#c2984f" };
    const q = build({ C, HC: { eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }] }, talon: GOLD, talons: { len: 2.4, thick: 1.8 }, hind: { len: 1.3, thick: 1.3, knob: 1.15, claws: { colour: DARK, len: 1.0 } }, fore: { len: 1.32, thick: 1.4, knob: 1.15 }, body: { len: 1.2, girth: 1.22, deep: 1.36, tuck: 0.6, hump: 0.6, neck: [0.24, 0.15], neckThick: 1.5 }, head: { size: 1.4 }, ear: { tall: 0.7 }, beak: 1.2, ruff: 1.5 }), P = q.P;
    const t = rope(q, C, { len: 0.95, r: 0.05, pitch: 0.2, curl: 1.4, wave: 0.2, bones: 6 });
    const w = wings(q, { span: 1.75, chord: 0.58, primaries: 8, secondaries: 6, lit: LIT }, UP);
    const crest = [-0.03, 0, 0.03].flatMap((x, i) => [0, 1].map(j => ({ at: P(x, 0.085, 0.04 - 0.03 * j), rx: 0.014, ry: 0.03, tip: P(x * 2.2, 0.17 + 0.05 * (i === 1 ? 1 : 0) - 0.03 * j, -0.1 - 0.07 * j), bone: "head", colour: WHITE, tipColour: LIT, glow: "tip", split: 0.6, bulge: 0.92, up: [1, 0, 0], sides: 4 })));
    const armour = [{ from: 0.9, to: 3.2, round: [0.25, 1.8], lames: 3, thick: 0.022, step: 0.012, colour: STORM, rim: GOLD, runes: { colour: LIT } }];
    return plan("griffin-legend", q.body, q.skull, [...q.legs, t, ...w], stalks({ sleep: "sphinx", lively: 0.75, tails: [t.chain], nap: folded(w, UP) }), { cones: [...q.cones, ...crest], armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawn heights, `node tools/creature-mesh/sizes.mjs griffin`: Ed, 2026-11-12, "keep the
 *  sizes"; its legend's is to the top of its raised wings, as today's is); plans, each level's build. */
export const MESH = { id: "griffin", heights: [63, 139, 218, 524], plans: griffin };
