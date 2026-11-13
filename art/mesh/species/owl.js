// The spotted owl, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). The cold
// rainforest's (art/creatures/owl/genome.js: "dark chocolate brown, white spots over its crown and wings, its chest barred";
// its ladder there: "a downy owlet with huge eyes and no tufts, a smooth young with short tufts, an adult with a dark-rimmed
// disc, long tufts, a barred chest and patterned wing tips, and the legend: wings ... edged in moonlight, tufts swept back like
// horns, a ring of glowing eyes round its disc"). It stands upright, a great round head with a pale face's disc and two eyes
// to the front. Its legend's armour is plate of night blue over its back, a moon-white mark lit on each (Ed, 2026-11-12:
// "Armour should just be thickened polygons on their torso with a different colour and glowing runes"). On the ground it hops,
// both feet together, and it flies when it goes fast; asleep it sits where it is, upright, its eyes shut and its head sunk.
// Metres; y up; its head along +z.
import { bird } from "../kit/bird.js";

const BROWN = "#4c3222", DARK = "#33210f", CREAM = "#e7dcc8", SPOT = "#f1e9da", EYE = "#f2b632", BILL = "#c9b458";
const C = { back: BROWN, belly: CREAM, wing: BROWN, flight: DARK, wingTip: SPOT, under: "#b9a58a", tail: DARK, thigh: CREAM, shank: "#8a775c", toe: "#8a775c", claw: "#1d1610" };
// (its face: a shallow dish over the front of its head, pale, its rim dark where it has one; its eyes are set in it)
const disc = (Hp, hr, o = {}) => ({ sides: 8, up: [0, 1, 0], rings: [[0.7, 1.04, o.rim ?? o.colour ?? CREAM], [0.98, 1.0 * (o.size ?? 1), o.rim ?? o.colour ?? CREAM], [1.02, 0.9 * (o.size ?? 1), o.colour ?? CREAM], [1.16, 0.5, o.colour ?? CREAM], [1.2, 0.06, o.colour ?? CREAM]].map(([z, r, colour]) => ({ at: Hp(0, 0.3, z), rx: r * hr * 1.12, ry: r * hr, bone: "head", colour })) });
const tufts = (Hp, hr, long, back = 0) => [1, -1].map(s => ({ at: Hp(0.6 * s, 0.95, 0.35), rx: hr * 0.22, ry: hr * 0.14, tip: Hp((0.75 + 0.25 * long) * s, 0.95 + 0.75 * long * (1 - back * 0.5), 0.3 - back * long), bone: "head", colour: BROWN, tipColour: DARK, split: 0.55, bulge: 0.8, up: [0, 0, 1], sides: 4 }));
// (white spots over its crown and its shoulders)
const spots = (Hp, hr, rings, n) => [...Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI - Math.PI / 2, at = Hp(Math.sin(a) * 0.7, 1.22 + 0.1 * Math.cos(a * 2), 0.1 + 0.3 * Math.cos(a * 3)); return { at, rx: hr * 0.09, ry: hr * 0.09, tip: [at[0], at[1] + hr * 0.07, at[2]], bone: "head", colour: SPOT, up: [0, 0, 1], sides: 4 }; }),
  ...[3, 4].flatMap(k => [-0.5, 0.5].map(x => { const r = rings[k], at = [x * r.rx, r.at[1] + r.up[1] * r.ry * 0.9, r.at[2] + r.up[2] * r.ry * 0.9]; return { at, rx: r.rx * 0.1, ry: r.rx * 0.1, tip: at.map((v, i) => v + r.up[i] * r.rx * 0.1), bone: r.bone, colour: SPOT, up: [1, 0, 0], sides: 4 }; }))];
// (its chest's bars: short dark bars across the pale of its breast)
const bars = (rings, n) => [2, 3, 4].flatMap(k => Array.from({ length: n }, (_, i) => { const r = rings[k], x = (i - (n - 1) / 2) / n * r.rx * 1.5, c = Math.sqrt(Math.max(0, 1 - (x / r.rx) ** 2)), at = [x, r.at[1] - r.up[1] * r.ry * c * 0.96, r.at[2] - r.up[2] * r.ry * c * 0.96]; return { at: [at[0] - r.rx * 0.1, at[1], at[2]], rx: r.rx * 0.045, ry: r.rx * 0.03, tip: [at[0] + r.rx * 0.1, at[1], at[2]], bone: r.bone, colour: BROWN, bulge: 1, up: [0, 1, 0], sides: 4 }; }));
const sits = { lean: 0, head: [0.2, 0, 0], neck: [0.1, 0, 0] };
const build = (name, o) => bird(name, { tilt: 1.12, seat: -0.36, white: 0.05, walk: { type: "bound" }, roost: sits, ...o, fly: { tilt: 0.4, rise: -0.17, ...o.fly }, neck: { rise: 1.45, len: 0.05, r: 0.085, ...o.neck }, head: { wide: 1.12, nod: 0.05, colour: BROWN, ...o.head }, beak: { len: 0.5, wide: 0.16, deep: 0.2, droop: 1.3, colour: BILL, ...o.beak },
  eye: { r: 0.26, at: [0.45, 0.42, 1.06], look: [0.1, 0.05, 1], colour: EYE, ring: DARK, ...o.eye }, leg: { thick: 1.5, toe: 0.9, trousers: 1.2, ...o.leg }, wing: { tilt: 0.75, ...o.wing } });
const owl = {
  baby: () => build("owl-baby", { hip: 0.1, len: 0.3, fat: 1.45, C: { ...C, back: "#b9ab98", wing: "#a8998a", flight: "#8f8172", belly: "#e9e2d6", thigh: "#e9e2d6", wingTip: "#8f8172" }, head: { r: 0.115, colour: "#b9ab98" }, eye: { r: 0.36, colour: "#1c1611", ring: "#6c5f52" }, neck: { r: 0.08 }, tail: { len: 0.03, n: 3 }, wing: { span: 0.26, chord: 0.11, primaries: 3, secondaries: 3 }, lively: 1.3, fly: { seconds: 0.4 },
    more: ({ Hp, hr }) => ({ lofts: [disc(Hp, hr, { colour: "#d9d0c2" })] }) }),
  young: () => build("owl-young", { hip: 0.14, len: 0.4, fat: 1.2, C, head: { r: 0.12 }, eye: { r: 0.3 }, tail: { len: 0.07, n: 5, fan: 0.3 }, wing: { span: 0.5, chord: 0.2 }, lively: 1.1,
    more: ({ Hp, hr, rings }) => ({ lofts: [disc(Hp, hr)], cones: [...tufts(Hp, hr, 0.35), ...spots(Hp, hr, rings, 4)] }) }),
  adult: () => build("owl-adult", { hip: 0.16, len: 0.48, fat: 1.22, C, head: { r: 0.14 }, tail: { len: 0.1, n: 5, fan: 0.35, tip: SPOT }, wing: { span: 0.66, chord: 0.25, primaries: 6, secondaries: 5 },
    more: ({ Hp, hr, rings }) => ({ lofts: [disc(Hp, hr, { rim: DARK })], cones: [...tufts(Hp, hr, 0.8), ...spots(Hp, hr, rings, 6), ...bars(rings, 4)] }) }),
  legend() {
    const MOON = "#e6f0ff", NIGHT = "#232b55", L = { ...C, back: "#3a2617", wing: "#3f2a1a", flight: "#241709", wingTip: MOON };
    return build("owl-legend", { hip: 0.2, len: 0.6, fat: 1.25, C: L, head: { r: 0.185, wide: 1.18, colour: "#3a2617" }, eye: { r: 0.3, colour: "#ffd45a", glow: true }, beak: { len: 0.6 }, tail: { len: 0.16, n: 7, fan: 0.45, tip: MOON, lit: true }, wing: { span: 0.9, chord: 0.33, primaries: 7, secondaries: 6, lit: MOON, fold: { at: [2.3, 0.15, 1.85] } }, leg: { claws: MOON }, lively: 0.75, fly: { seconds: 0.75 },
      more: ({ Hp, hr, rings }) => ({ lofts: [disc(Hp, hr, { rim: DARK, size: 1.08 })], cones: [...tufts(Hp, hr, 1.5, 1), ...spots(Hp, hr, rings, 8), ...bars(rings, 5),
          // (the ring of small lit eyes round its disc: Ed's ladder for it)
          ...Array.from({ length: 9 }, (_, i) => { const a = (i + 0.5) / 9 * Math.PI * 1.5 - Math.PI * 0.75, at = Hp(Math.sin(a) * 1.16, 0.3 + Math.cos(a) * 1.02, 1.0); return { at, rx: hr * 0.075, ry: hr * 0.075, tip: Hp(Math.sin(a) * 1.16, 0.3 + Math.cos(a) * 1.02, 1.1), bone: "head", colour: "#ffd45a", glow: true, up: [0, 1, 0], sides: 4 }; })],
        armour: [{ from: 1.15, to: 4.3, round: [0, 0.95], lames: 3, thick: 0.022, step: 0.012, colour: NIGHT, rim: "#aeb8d6", runes: { colour: MOON } }] }) });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette, standing still, turned towards us: today's drawn heights, Ed, 2026-11-12, "keep
 *  the sizes"); plans, each level's build. */
export const MESH = { id: "owl", heights: [40, 62, 94, 289], plans: owl };
