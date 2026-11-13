// The swallowtail, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). The kind
// "moth" is the temperate meadow's butterfly (art/creatures/moth/genome.js: "the moth turned a swallowtail; its id kept ...
// yellow wings veined and bordered black, tails, blue crescents; its legend's hind wings two great eyes"). A slim dark body
// (kit/insect.js) under four broad wings (kit/insectwing.js: the bee's wings, with panels of colour laid on a black ground so
// the ground shows as veins and border). Its ladder: a small pale one, its wings plain and short; a young one, veined, no
// tails yet; the swallowtail; and the old one, its hind wings two great lit eyes, its veins and feelers' ends alight, its
// body plated in dusk violet banded with gold, a lit mark on each plate (Ed, 2026-11-12: "Armour should just be thickened
// polygons on their torso with a different colour and glowing runes"). It flies at every pace, on slow deep beats; asleep it
// comes down onto its legs and shuts its wings upright over its back, as a butterfly does. Metres; y up; its head along +z.
import { insect } from "../kit/insect.js";
import { hovers, insectwing } from "../kit/insectwing.js";

const INK = "#1d1712", YELLOW = "#f4d03a", BLUE = "#4f86d9";
function swallowtail(name, o) {
  const { fly = 0.32, k = 1, wing = 1, C = {}, cells = true, tails = 0, eyes, veins, seconds = 0.7 } = o, ground = C.ground ?? INK, fill = C.fill ?? YELLOW;
  const b = insect({ fly, k, chest: 0.8, skull: 0.85, C: { thorax: C.body ?? "#2a2118", head: C.body ?? "#2a2118", eye: C.eye ?? "#0c0a09", eyeGlow: !!o.eyeGlow, leg: INK, feeler: INK }, eye: { r: 0.9 }, abdomen: { len: 0.85, fat: 0.36, rings: 6, colour: i => (i % 2 ? ground : C.band ?? C.body ?? "#2a2118"), ...o.abdomen }, legs: { len: 0.7 }, feelers: { len: 1.1, club: C.club ?? INK, glow: !!C.clubGlow, ...o.feelers } }), { P } = b;
  const wings = [], lofts = [], cones = [], bones = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const fore = `wingf${tag}`, hind = `wingh${tag}`, fr = P(0.03 * s, 0.125, 0.045), hr = P(0.03 * s, 0.12, -0.01);
    bones.push([fore, fr, "thorax"], [hind, hr, "thorax"]); wings.push({ bone: fore, s }, { bone: hind, s, phase: -0.35 });
    const F = insectwing(fore, fr, [s * 0.78, 0.22, 0.5], { len: 0.46 * wing * k, wide: 0.2 * wing * k, colour: cells ? ground : fill, prof: [[0, 0.22], [0.3, 0.7], [0.68, 1], [0.9, 0.8], [1, 0.25]], veins,
      cells: cells ? [{ from: 0.05, to: 0.38, wide: 0.8, colour: fill }, { from: 0.41, to: 0.66, wide: 0.82, colour: fill }, { from: 0.69, to: 0.88, wide: 0.72, colour: fill }] : [] });
    const H = insectwing(hind, hr, [s * 0.7, 0.16, -0.62], { len: 0.38 * wing * k, wide: 0.2 * wing * k, colour: cells ? ground : fill, prof: [[0, 0.3], [0.3, 0.85], [0.65, 1], [0.9, 0.7], [1, 0.25]], tail: tails ? { len: tails * k, colour: ground, at: 0.8 } : null, veins,
      cells: !cells ? [] : eyes ? [{ from: 0.08, to: 0.3, wide: 0.6, colour: fill }, { from: 0.36, to: 0.9, wide: 0.82, colour: eyes.ring, glow: true }, { from: 0.47, to: 0.79, wide: 0.52, colour: eyes.iris }, { from: 0.56, to: 0.7, wide: 0.22, colour: eyes.pupil, glow: true }]
        : [{ from: 0.05, to: 0.42, wide: 0.82, colour: fill }, { from: 0.45, to: 0.7, wide: 0.82, colour: fill }, { from: 0.75, to: 0.9, wide: 0.6, colour: C.crescent ?? fill }] });
    lofts.push(...F.lofts, ...H.lofts); cones.push(...F.cones, ...H.cones);
  }
  // (asleep: its wings shut upright over its back)
  const nap = ({ rots }) => { for (const w of wings) rots[w.bone] = [0, 0, w.s * 1.25]; };
  return { name, bones: [...b.bones, ...bones], lofts: [...b.lofts, ...lofts], cones: [...b.cones, ...cones, ...(o.cones?.(b) ?? [])], armour: o.armour ?? [], hover: fly * k,
    gait: hovers(wings, { beats: 1, mid: 0.4, amp: 0.65, seconds, bob: 0.03 * k, more: b.sways, sleep: "shut", nap }) };
}
const moth = {
  baby: () => swallowtail("moth-baby", { fly: 0.22, k: 0.9, wing: 0.6, cells: false, C: { fill: "#f6e7a0", body: "#4a3c2a" }, abdomen: { len: 0.6, fat: 0.45 }, feelers: { len: 0.6 }, seconds: 0.5 }),
  young: () => swallowtail("moth-young", { fly: 0.27, wing: 0.85, C: { fill: "#f2d85a" } }),
  adult: () => swallowtail("moth-adult", { fly: 0.32, wing: 1.1, tails: 0.11, C: { crescent: BLUE } }),
  legend() {
    const GOLD = "#e9b949", LIT = "#fff0a8", DUSK = "#3b2a5c", C = { fill: "#f7c82e", ground: "#17121c", body: "#241a2c", band: GOLD, eye: "#8fb8ff", club: LIT, clubGlow: true };
    const armour = [...[1, 3, 5].map(i => ({ on: "abdomen", from: 2 * i - 0.25, to: 2 * i + 1.25, round: [0, 1.7], thick: 0.014, colour: DUSK, rim: GOLD, runes: { colour: LIT, size: 0.7, max: 1, seed: i } })), { on: "thorax", from: 0.7, to: 3.3, round: [0, 1.2], thick: 0.016, colour: DUSK, rim: GOLD, runes: { colour: LIT, max: 1 } }];
    return swallowtail("moth-legend", { fly: 0.4, wing: 1.6, tails: 0.26, C, eyeGlow: true, eyes: { ring: "#7fb2ff", iris: "#17121c", pupil: LIT }, veins: { colour: LIT, glow: true, n: 2, w: 0.004 }, abdomen: { len: 1.4, fat: 0.5, rings: 8 }, feelers: { len: 1.8, knob: 1.6 }, seconds: 1.1, armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette as its plan draws it, wings out, turned towards us: today's drawn heights, Ed,
 *  2026-11-12, "keep the sizes"); plans, each level's build. */
export const MESH = { id: "moth", heights: [30, 45, 68, 214], plans: moth };
