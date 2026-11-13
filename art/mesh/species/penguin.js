// The penguin, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). The icy shore's
// (art/creatures/penguin/genome.js: "upright, black and white, a downy grey chick, a brown-grey young, an adult with an orange
// patch at its neck, and the island's legend ... a towering emperor weathered like sea-worn stone, ice-rimed along its back
// ... a necklace of offerings (pebbles and shells from the rookery) ... its gorget blazing, a longer beak"). It stands
// upright on two short legs set at its tail's foot, its wings stiff flippers (kit/flipper.js). Its legend's armour is the ice
// itself: plate of pale blue rime over its back, a white mark lit on each (Ed, 2026-11-12: "Armour should just be thickened
// polygons on their torso with a different colour and glowing runes"); its chick is not drawn. It waddles at any pace, rolling
// from foot to foot with its flippers held out, quicker and wider in a hurry: it does not fly. Asleep it lies on its front,
// its bill along the ground. Metres; y up; its head along +z.
import { bird } from "../kit/bird.js";
import { band } from "../kit/band.js";
import { flipper } from "../kit/flipper.js";

const BLACK = "#1e222d", WHITE = "#f3f3ee", ORANGE = "#f2a03a", FOOT = "#2b2a30";
const C = { back: BLACK, belly: WHITE, head: BLACK, thigh: WHITE, shank: FOOT, toe: FOOT, tail: BLACK };
const prone = { lean: 1.25, legs: [0.2, 0, 0.3], neck: [-0.45, 0, 0], head: [-0.75, 0, 0] };
function build(name, o) {
  // (its flippers are made inside kit/bird.js, where its body's measure is known: what rocks them at each pace is filled in then)
  let flips = []; const slow = [], fast = [];
  const wings = ({ B, Z, f }) => { flips = [[1, "L"], [-1, "R"]].map(([s, tag]) => { const at = B(s * 0.9 * f, 0.05 * f, Z(0.3)), to = B(s * (0.9 * f + 0.06 * o.len), -0.1 * f, Z(0.3) - o.len * 0.5); return flipper(tag, s, at, to.map((v, i) => v - at[i]), { len: o.len * (o.flip ?? 0.5), wide: o.len * 0.085, colours: { back: o.C.back, belly: o.C.belly, edge: o.C.back } }); });
    slow.push(...flips.flatMap(w => w.wave({ out: 0.25, amp: 0.08, beats: 1 }))); fast.push(...flips.flatMap(w => w.wave({ out: 0.7, amp: 0.15, beats: 1 }))); return flips; };
  return bird(name, { tilt: 1.42, seat: -0.45, white: 0.15, wings, roost: { ...prone, more: rots => { for (const [i, w] of flips.entries()) rots[w.names[0]] = [0, 0, (i ? -1 : 1) * 0.5]; } }, ...o,
    neck: { rise: 1.5, len: 0.07, r: 0.075, ...o.neck }, head: { nod: 0.05, ...o.head }, beak: { len: 1.2, wide: 0.2, deep: 0.2, droop: 0.12, colour: "#2a2a30", ...o.beak }, eye: { r: 0.17, colour: "#0c0a09", ...o.eye }, tail: { len: 0.05, n: 3, fan: 0.3, pitch: -0.9, ...o.tail },
    leg: { thick: 2.6, web: FOOT, toe: 1.6, splay: 1, trousers: 0.6, out: 0.42 * 0.3 * o.len * (o.fat ?? 1), ...o.leg },
    walk: { seconds: 0.8, duty: 0.66, reach: 0.5, step: 0.2, toe: 0.05, thrust: 0, extra: slow, body: { roll: 0.1, sway: 0.09, yaw: 0.09, bob: 0.04, pitch: 0.01, head: 0.9 }, ...o.walk },
    run: { seconds: 0.42, duty: 0.5, reach: 0.95, step: 0.3, toe: 0.05, extra: fast, body: { roll: 0.15, sway: 0.12, yaw: 0.13, bob: 0.06, pitch: 0.03, head: 0.9 }, ...o.run } });
}
// (the patch at each side of its neck)
const patch = (rings, colour, glow = false) => [1, -1].map(s => { const r = rings[6], at = [s * r.rx * 0.92, r.at[1], r.at[2] + r.rx * 0.1]; return { at: [at[0], at[1] + r.rx * 0.5, at[2]], rx: r.rx * 0.5, ry: r.rx * 0.2, tip: [at[0] * 1.02, at[1] - r.rx * 0.9, at[2] + r.rx * 0.3], bone: "neck", colour, glow, bulge: 1, split: 0.5, up: [s, 0, 0], sides: 4 }; });
const penguin = {
  baby: () => build("penguin-baby", { hip: 0.075, len: 0.34, fat: 1.35, C: { ...C, back: "#8d939c", belly: "#c9ccd0", head: "#2b2e36", thigh: "#c9ccd0" }, white: -0.1, flip: 0.36, neck: { r: 0.07 }, head: { r: 0.092, colour: (cy, sx, k) => (cy < 0.25 ? "#eeeeea" : "#2b2e36") }, beak: { len: 0.7 }, eye: { r: 0.22 }, lively: 1.05 }),
  young: () => build("penguin-young", { hip: 0.08, len: 0.5, fat: 1.12, C: { ...C, back: "#4d4a4c", head: "#4d4a4c", belly: "#e6e3dc", thigh: "#e6e3dc" }, head: { r: 0.09 }, beak: { len: 1.0 }, lively: 1.1 }),
  adult: () => build("penguin-adult", { hip: 0.1, len: 0.66, fat: 1.06, C, head: { r: 0.1 }, beak: { len: 1.35, tip: "#d9853a" }, neck: { colour: cy => (cy < 0.05 ? "#f6dc9a" : BLACK) }, more: ({ rings }) => ({ cones: patch(rings, ORANGE) }) }),
  legend() {
    const ICE = "#bfe3f2", RIME = "#eefaff", STONE = "#3a4150", BLAZE = "#ffb347", L = { ...C, back: STONE, head: "#2a2f3b", belly: "#dcdcd4", thigh: "#dcdcd4" };
    return build("penguin-legend", { hip: 0.12, len: 0.9, fat: 1.08, C: L, flip: 0.56, head: { r: 0.12 }, beak: { len: 1.9, tip: BLAZE }, eye: { r: 0.17, colour: RIME, glow: true }, neck: { len: 0.1, colour: cy => (cy < 0.05 ? "#f6dc9a" : "#2a2f3b") }, lively: 0.75,
      more: ({ rings, f }) => ({ cones: [...patch(rings, BLAZE, true),
          // (its necklace of offerings: pebbles and shells hung from a cord at the foot of its neck)
          ...Array.from({ length: 7 }, (_, i) => { const a = (i - 3) * 0.33, r = rings[5], at = [Math.sin(a) * r.rx * 1.02, r.at[1] - r.up[1] * r.ry * Math.cos(a) * 1.02 - 0.01, r.at[2] - r.up[2] * r.ry * Math.cos(a) * 1.02]; return { at, rx: f * 0.085, ry: f * 0.085, tip: [at[0], at[1] - f * 0.2, at[2] + f * 0.03], bone: "neck", colour: ["#d8cdb8", "#8d939c", "#e8b7a0"][i % 3], bulge: 1.1, split: 0.5, up: [0, 0, 1], sides: 5 }; })],
        lofts: band("neck", rings[5].at, rings[6].at, { at: 0.05, r: rings[5].rx * 1.02, ry: rings[5].ry * 1.02, wide: 0.012, colour: "#6d5a40", up: rings[5].up }).lofts,
        armour: [{ from: 1.1, to: 4.4, round: [0, 1.0], lames: 4, thick: 0.024, step: 0.014, colour: ICE, rim: RIME, runes: { colour: "#ffffff" } }] }) });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "penguin", heights: [50, 77, 111, 267], plans: penguin };
