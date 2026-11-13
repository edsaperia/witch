// The raven, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). A big black
// crow with a heavy bill, a shaggy throat and a wedge of a tail, its black shot with blue and violet (art/creatures/raven/genome.js;
// its legend's word there is "hoard"). Its ladder: a fledgling, grey-black down, a pale gape, a stub of a tail; a sleek young
// one; the raven, hackled and heavy-billed; and the hoarder, old and ragged, a coin in its bill, gold round its neck and its
// shanks, one eye lit, its flight feathers' points and its tail's burning gold, plate of blued iron over its back with a gold
// mark lit on each (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and
// glowing runes"). It walks, its head thrust forward at each step, and flies when it goes fast; asleep it roosts, its bill laid
// in the feathers of its back. Metres; y up; its head along +z.
import { bird } from "../kit/bird.js";
import { band } from "../kit/band.js";

const BLACK = "#2b2a40", SHEEN = "#3d3e6a", FLIGHT = "#1d1c2b", BILL = "#55525c", SHANK = "#3a3840";
const C = { back: BLACK, wing: SHEEN, flight: FLIGHT, wingTip: "#14131c", under: "#22212f", shank: SHANK, toe: SHANK, claw: "#0b0a0e", tail: FLIGHT };
// (its throat's hackles: pointed feathers standing off the front of its neck)
const hackles = (rings, n, long, colour) => Array.from({ length: n }, (_, i) => { const r = rings[5 + (i % 2)], x = (i - (n - 1) / 2) * r.rx * 0.5; return { at: [x, r.at[1] - r.ry * 0.2, r.at[2] + r.ry * 0.75], rx: r.rx * 0.4, ry: r.rx * 0.25, tip: [x * 1.3, r.at[1] - r.ry * 0.5 - long, r.at[2] + r.ry * 0.9 + long * 0.4], bone: "neck", colour, split: 0.5, bulge: 0.8, up: [0, 0, 1], sides: 4 }; });
const raven = {
  baby: () => bird("raven-baby", { hip: 0.17, len: 0.42, fat: 1.25, tilt: 0.6, seat: -0.14, C: { ...C, back: "#33313f", wing: "#3a3850", belly: "#4a4756" }, white: -0.5, neck: { len: 0.07, r: 0.062 }, head: { r: 0.105, nod: 0.05 }, beak: { len: 0.7, wide: 0.34, deep: 0.3, colour: "#3a373c", tip: "#e9c46a" }, eye: { r: 0.24, colour: "#0c0a09", ring: "#5a5766" },
    tail: { len: 0.1, n: 3, fan: 0.3 }, wing: { span: 0.36, chord: 0.15, primaries: 3, secondaries: 3 }, leg: { thick: 1.5, toe: 0.9 }, lively: 1.3, fly: { seconds: 0.4 } }),
  young: () => bird("raven-young", { hip: 0.25, len: 0.56, fat: 0.92, tilt: 0.5, C, neck: { len: 0.11, r: 0.06 }, head: { r: 0.095 }, beak: { len: 1.1, wide: 0.3, deep: 0.3, colour: BILL, bulge: 0.7 }, eye: { r: 0.2, colour: "#0c0a09", ring: "#7a7896" },
    tail: { len: 0.2, n: 5, fan: 0.35 }, wing: { span: 0.66, chord: 0.24 }, lively: 1.1 }),
  adult: () => bird("raven-adult", { hip: 0.27, len: 0.64, fat: 1.02, tilt: 0.48, C, neck: { len: 0.13, r: 0.075 }, head: { r: 0.105 }, beak: { len: 1.35, wide: 0.34, deep: 0.38, colour: BILL, bulge: 0.78, hook: -0.05 }, eye: { r: 0.19, colour: "#0c0a09", ring: "#8a88a8" },
    tail: { len: 0.3, n: 7, fan: 0.5, wide: 0.06 }, wing: { span: 0.82, chord: 0.28, primaries: 6, secondaries: 5 }, more: ({ rings }) => ({ cones: hackles(rings, 5, 0.06, SHEEN) }) }),
  legend() {
    const GOLD = "#e9b949", LIT = "#ffd76a", IRON = "#39406b", L = { ...C, back: "#232234", wing: "#34325a", wingTip: "#0f0e16" };
    return bird("raven-legend", { hip: 0.34, len: 0.78, fat: 1.08, tilt: 0.55, C: L, neck: { len: 0.17, r: 0.09 }, head: { r: 0.125 }, beak: { len: 1.6, wide: 0.36, deep: 0.42, colour: "#3a3740", bulge: 0.8, hook: -0.07 }, eye: { r: 0.21, colours: [LIT, "#cfd3e6"], glow: true, ring: "#0b0a10" },
      tail: { len: 0.46, n: 9, fan: 0.6, wide: 0.07, tip: GOLD, lit: true }, wing: { span: 1.05, chord: 0.34, primaries: 7, secondaries: 6, lit: LIT, fold: { at: [2.3, 0.15, 1.85] } }, leg: { thick: 1.1, band: { colour: GOLD, at: 0.45 }, claws: GOLD }, lively: 0.75, fly: { seconds: 0.7 },
      more: ({ rings, Hp, hr }) => ({ cones: [...hackles(rings, 7, 0.11, "#2d2a4a"),
          // (ragged feathers standing off its nape, and the coin it carries: a flat gold disc held in its bill's point)
          ...[-1, 0, 1].map(i => ({ at: Hp(i * 0.35, 0.95, -0.2), rx: hr * 0.2, ry: hr * 0.12, tip: Hp(i * 0.6, 1.5, -1.1), bone: "head", colour: L.back, tipColour: "#2d2a4a", split: 0.5, bulge: 0.8, up: [0, 0, 1], sides: 4 })),
          { at: Hp(0.16, -0.18, 2.55), rx: hr * 0.34, ry: hr * 0.34, tip: Hp(-0.16, -0.18, 2.55), bone: "head", colour: GOLD, split: 0.5, bulge: 1, up: [0, 1, 0], sides: 6 }],
        lofts: band("neck", rings[5].at, rings[6].at, { at: 0.3, r: rings[5].rx * 1.04, ry: rings[5].ry * 1.04, wide: 0.022, colour: GOLD, up: rings[5].up }).lofts,
        armour: [{ from: 1.15, to: 4.3, round: [0, 0.95], lames: 3, thick: 0.02, step: 0.012, colour: IRON, rim: GOLD, runes: { colour: LIT } }] }) });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "raven", heights: [43, 62, 90, 286], plans: raven };
