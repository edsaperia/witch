// The heron, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). The heronry's
// (art/creatures/heron/genome.js: "a tall grey wader, S-necked, dagger-billed"; its legend's word there is "lantern"). Grey
// above and white below on long yellow legs, its neck an S, a black stripe over its eye running out into a crest, a long yellow
// dagger of a bill. Its ladder: a chick, all legs and fluff, its neck not yet grown; a grey young one; the heron, crested and
// plumed; and the lantern-bearer, tall and hoar-grey, its bill's point and its long crest's ends lit like a lamp's wick, plumes
// down its breast, plate of green bronze over its back with a lamp-gold mark lit on each (Ed, 2026-11-12: "Armour should just
// be thickened polygons on their torso with a different colour and glowing runes"). It stalks, and flies when it goes fast,
// its legs trailed behind it; asleep it stands hunched, its neck folded down into its shoulders. Metres; y up; its head along +z.
import { bird } from "../kit/bird.js";

const GREY = "#8792a3", WHITE = "#eceef0", SLATE = "#4b5467", INK = "#1d2029", YELLOW = "#e2b23a", LEG = "#b9a455";
const C = { back: GREY, belly: WHITE, wing: GREY, flight: SLATE, wingTip: "#343b4b", under: "#aab2bf", tail: SLATE, shank: LEG, toe: LEG, claw: "#3a3526", thigh: WHITE };
// (white, with the black stripe from its eye back over its crown's sides)
const face = (cy, sx) => (cy > 0.1 && cy < 0.8 && Math.abs(sx) > 0.35 ? INK : WHITE);
// (its crest: long black plumes off the back of its head; and plumes hung from the foot of its neck)
const crest = (Hp, hr, n, long, tip, glow) => Array.from({ length: n }, (_, i) => ({ at: Hp((i - (n - 1) / 2) * 0.3, 0.75, -0.5), rx: hr * 0.16, ry: hr * 0.1, tip: Hp((i - (n - 1) / 2) * 0.55, 0.5 - 0.2 * i, -0.5 - long), bone: "head", colour: INK, tipColour: tip ?? INK, glow: glow ? "tip" : false, split: 0.6, bulge: 0.7, up: [0, 0, 1], sides: 4 }));
const plumes = (rings, n, long, colour) => Array.from({ length: n }, (_, i) => { const r = rings[5], x = (i - (n - 1) / 2) * r.rx * 0.55; return { at: [x, r.at[1] - r.ry * 0.3, r.at[2] + r.ry * 0.6], rx: r.rx * 0.3, ry: r.rx * 0.16, tip: [x * 1.4, r.at[1] - r.ry * 0.3 - long, r.at[2] + r.ry * 0.5], bone: "chest", colour, split: 0.6, bulge: 0.75, up: [0, 0, 1], sides: 4 }; });
// (asleep: on its feet, hunched, its neck folded down so its head rests on its shoulders, its bill forward and down)
const hunch = { lean: 0, legs: [0, 0, 0], neck: [-0.55, 0, 0], neck2: [1.3, 0, 0], head: [-0.5, 0, 0] };
// (in the air: its neck drawn back into an S, its head on its shoulders)
const tucked = { trail: 1.72 - 0.38, knee: 0, hock: 0, neck: [-0.85, 0, 0], neck2: [1.3, 0, 0], head: [-0.5, 0, 0] };
const heron = {
  baby: () => bird("heron-baby", { hip: 0.3, len: 0.36, fat: 1.2, tilt: 0.55, C: { ...C, back: "#a4abb6", wing: "#a4abb6", flight: "#8a919c" }, neck: { rise: 1.25, len: 0.16, s: 0.3, r: 0.04 }, head: { r: 0.07, colour: "#c9cdd3" }, beak: { len: 1.5, wide: 0.24, deep: 0.24, colour: "#c9a94a", droop: 0.05 }, eye: { r: 0.24, colour: "#16130f", ring: YELLOW },
    tail: { len: 0.07, n: 3 }, wing: { span: 0.32, chord: 0.13, primaries: 3, secondaries: 3 }, leg: { thick: 0.5, toe: 0.55, trousers: 1.5 }, lively: 1.3, roost: hunch, fly: { ...tucked, seconds: 0.45 }, walk: { seconds: 0.8 } }),
  young: () => bird("heron-young", { hip: 0.5, len: 0.52, fat: 0.9, tilt: 0.5, C: { ...C, belly: "#d9dce0" }, neck: { rise: 1.2, len: 0.38, s: 0.5, r: 0.036 }, head: { r: 0.066, colour: "#9aa3b0" }, beak: { len: 2.3, wide: 0.22, deep: 0.22, colour: "#b99c45", droop: 0.04 }, eye: { r: 0.22, colour: "#16130f", ring: YELLOW },
    tail: { len: 0.12, n: 5, fan: 0.3 }, wing: { span: 0.68, chord: 0.24 }, leg: { thick: 0.34, toe: 0.42, trousers: 1.6 }, lively: 1.1, roost: hunch, fly: tucked, walk: { seconds: 1.1, reach: 0.55, step: 0.28 } }),
  adult: () => bird("heron-adult", { hip: 0.62, len: 0.64, fat: 0.92, tilt: 0.48, C, neck: { rise: 1.2, len: 0.52, s: 0.55, r: 0.04 }, head: { r: 0.072, colour: face }, beak: { len: 2.8, wide: 0.22, deep: 0.22, colour: YELLOW, droop: 0.04 }, eye: { r: 0.2, colour: "#16130f", ring: YELLOW },
    tail: { len: 0.14, n: 5, fan: 0.3 }, wing: { span: 0.92, chord: 0.3, primaries: 6, secondaries: 5 }, leg: { thick: 0.3, toe: 0.4, trousers: 1.7 }, roost: hunch, fly: { ...tucked, seconds: 0.7 }, walk: { seconds: 1.3, reach: 0.6, step: 0.3 },
    more: ({ Hp, hr, rings }) => ({ cones: [...crest(Hp, hr, 2, 2.2), ...plumes(rings, 4, 0.14, WHITE)] }) }),
  legend() {
    const LAMP = "#ffcf6a", BRONZE = "#3f7a6c", HOAR = "#b7bfcb", L = { ...C, back: "#6f7a8c", wing: "#77839a", flight: "#3b4354", belly: HOAR, thigh: HOAR, shank: "#8f8450", toe: "#8f8450" };
    return bird("heron-legend", { hip: 0.78, len: 0.78, fat: 0.95, tilt: 0.52, C: L, neck: { rise: 1.2, len: 0.7, s: 0.6, r: 0.045 }, head: { r: 0.08, colour: face }, beak: { len: 3.4, wide: 0.22, deep: 0.22, colour: "#c79a36", tip: LAMP, glow: "tip", droop: 0.04 }, eye: { r: 0.22, colour: LAMP, glow: true, ring: INK },
      tail: { len: 0.2, n: 7, fan: 0.35 }, wing: { span: 1.1, chord: 0.36, primaries: 7, secondaries: 6, lit: LAMP, fold: { at: [2.3, 0.15, 1.85] } }, leg: { thick: 0.3, toe: 0.4, trousers: 1.8, band: { colour: BRONZE, at: 0.3 } }, lively: 0.75, roost: hunch, fly: { ...tucked, seconds: 0.9 }, walk: { seconds: 1.6, reach: 0.6, step: 0.3 },
      more: ({ Hp, hr, rings }) => ({ cones: [...crest(Hp, hr, 4, 4.2, LAMP, true), ...plumes(rings, 6, 0.3, HOAR), ...plumes([, , , , , rings[4]], 5, 0.22, "#dfe3e8")],
        armour: [{ from: 1.15, to: 4.3, round: [0, 0.95], lames: 3, thick: 0.02, step: 0.012, colour: BRONZE, rim: "#c79a36", runes: { colour: LAMP } }] }) });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "heron", heights: [39, 62, 91, 233], plans: heron };
