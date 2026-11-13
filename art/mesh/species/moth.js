// The moth, four levels, as plans for art/mesh/shape.js. On the bench (src/rules/kinds.ts BENCH; Ed, 2026-11-13: "can we actually
// rename it in the files and put the moth on the bench?"): the swallowtail that wore its id has its own (species/butterfly.js),
// and this is the moth again, from batch F's insect kit (kit/insect.js, kit/insectwing.js) as the brief asks: a furry body,
// feathery feelers, dusky wings folded like a tent asleep. Its colours are the old drawing's (art/creatures/moth/genome.js: dusty
// brown and cream). A stout body deep in fur (kit/tufts.js: a ruff round its thorax, a mane down its back) under broad dusky
// wings, each a dark ground with paler bands laid on it; two feelers like feathers, a comb of barbs down each side. Its ladder: a
// small pale fluffy one, its wings short and plain, its feelers two stubs; a young one, one band on each wing; the moth, banded,
// a dark ring on each hind wing; and the old one, its hind wings two great lit eyes (the old legend's, "its wings' eye spots
// opened into two staring glowing eyes"), its feelers great lit plumes, its body plated in tarnished verdigris edged in bone, a
// moon-pale mark on each plate (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour
// and glowing runes"; nothing on it is a ball). It flies at every pace, on quick shallow beats; asleep it comes down onto its
// legs and lays its wings back over its body, sloping down each side like a tent, as a moth does. Metres; y up; its head along +z.
import { insect } from "../kit/insect.js";
import { hovers, insectwing } from "../kit/insectwing.js";
import { tufts } from "../kit/tufts.js";

const FUR = "#8a745c", CREAM = "#d9c8a6", DUSK = "#5a4b40", BAND = "#b39f82", DARK = "#2b231d";
function mothOf(name, o) {
  const { fly = 0.3, k = 1, wing = 1, C = {}, bands = 2, eyes, veins, seconds = 0.5, chest = 1.1, skull = 0.9, fur = {}, plume = 1, feeler = 1 } = o;
  const coat = C.fur ?? FUR, pale = C.pale ?? CREAM, ground = C.ground ?? DUSK, band = C.band ?? BAND, dark = C.dark ?? DARK;
  const b = insect({ fly, k, chest, skull, C: { thorax: coat, head: C.head ?? coat, eye: C.eye ?? "#0c0a09", eyeGlow: !!o.eyeGlow, leg: dark, feeler: C.feeler ?? dark }, eye: { r: 0.8 }, abdomen: { len: 0.8, fat: 0.62, rings: 6, colour: i => (i % 2 ? coat : pale), ...o.abdomen }, legs: { len: 0.75 }, feelers: { len: feeler } }), { P } = b;
  const wings = [], lofts = [], cones = [], bones = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const fore = `wingf${tag}`, hind = `wingh${tag}`, fr = P(0.035 * s, 0.12, 0.05), hr = P(0.035 * s, 0.115, -0.005);
    bones.push([fore, fr, "thorax"], [hind, hr, "thorax"]); wings.push({ bone: fore, s }, { bone: hind, s, phase: -0.3 });
    // (a moth's forewing: a long triangle, broadest near its tip; its hind wing short and round, mostly hidden under the fore one at rest)
    const F = insectwing(fore, fr, [s * 0.86, 0.14, 0.18], { len: 0.44 * wing * k, wide: 0.17 * wing * k, colour: ground, prof: [[0, 0.2], [0.3, 0.6], [0.7, 1], [0.92, 0.85], [1, 0.3]], veins,
      cells: [[0.3, 0.44], [0.6, 0.76]].slice(0, bands).map(([from, to]) => ({ from, to, wide: 0.86, colour: band })) });
    const H = insectwing(hind, hr, [s * 0.72, 0.1, -0.58], { len: 0.3 * wing * k, wide: 0.17 * wing * k, colour: C.hind ?? band, prof: [[0, 0.3], [0.35, 0.9], [0.7, 1], [0.92, 0.7], [1, 0.25]], veins,
      cells: eyes ? [{ from: 0.34, to: 0.86, wide: 0.6, colour: eyes.ring, glow: true }, { from: 0.44, to: 0.78, wide: 0.4, colour: eyes.iris }, { from: 0.55, to: 0.68, wide: 0.16, colour: eyes.pupil, glow: true }] : bands > 1 ? [{ from: 0.42, to: 0.78, wide: 0.5, colour: ground }, { from: 0.54, to: 0.68, wide: 0.2, colour: pale }] : [] });
    lofts.push(...F.lofts, ...H.lofts); cones.push(...F.cones, ...H.cones);
    // its feelers feathery: a comb of barbs down each side of the feeler the kit draws (the same root and tip as kit/insect.js's)
    if (feeler && plume) { const hz = 0.02 + (0.115 + 0.02 * skull) * chest, a = P(0.02 * s, 0.05 + 0.055 * skull, hz + 0.025), z = P((0.02 + 0.05 * feeler) * s, 0.05 + 0.055 * skull + 0.12 * feeler, hz + 0.025 + 0.1 * feeler), n = o.barbs ?? 4;
      for (let i = 0; i < n; i++) { const t = 0.25 + 0.7 * i / (n - 1), at = a.map((v, j) => v + (z[j] - v) * t + (j === 1 ? 0.04 * k * feeler * Math.sin(Math.PI * t) * 0.6 : 0)), L = 0.045 * k * plume * Math.sin(Math.PI * (0.25 + 0.6 * t));
        for (const side of [1, -1]) cones.push({ at, rx: 0.006 * k, ry: 0.006 * k, tip: [at[0] + side * L, at[1] - L * 0.15, at[2] - L * 0.25], bone: `ant${tag}`, colour: C.plume ?? pale, glow: !!C.plumeGlow, up: [0, 0, 1], sides: 3 }); } }
  }
  // its fur: a ruff round the thorax behind the head and a shaggier coat over its back, in locks
  const thorax = z => ({ at: P(0, 0.06, 0.02 + z * chest), rx: 0.088 * k * chest, ry: 0.088 * k * chest });
  cones.push(...tufts(thorax(0.07), "thorax", { n: fur.n ?? 4, a0: 0.25, a1: 2.7, long: (fur.long ?? 0.05) * k, sweep: 0.25, droop: 0, r: 0.03 * k, lock: true, colour: () => fur.ruff ?? pale, tip: () => fur.tip ?? "#f3ead6" }),
    ...tufts(thorax(0), "thorax", { n: fur.n ?? 4, a0: 0.2, a1: 2.6, long: (fur.long ?? 0.05) * 1.1 * k, sweep: 0.55, droop: 0, r: 0.032 * k, lock: true, colour: () => coat, tip: () => fur.tip ?? pale }),
    ...tufts(thorax(-0.06), "thorax", { n: Math.max(3, (fur.n ?? 4) - 1), a0: 0.3, a1: 2.4, long: (fur.long ?? 0.05) * k, sweep: 0.7, droop: 0.1, r: 0.028 * k, lock: true, colour: () => coat, tip: () => fur.tip ?? pale }));
  // (asleep: its wings laid back along its body and sloped down each side, the fore pair over the hind: a tent)
  const nap = ({ rots }) => { for (const w of wings) rots[w.bone] = /^wingf/.test(w.bone) ? [0, w.s * 1.25, -w.s * 0.62] : [0, w.s * 0.8, -w.s * 0.5]; };
  return { name, bones: [...b.bones, ...bones], lofts: [...b.lofts, ...lofts], cones: [...b.cones, ...cones], armour: o.armour ?? [], hover: fly * k,
    gait: hovers(wings, { beats: 2, mid: 0.2, amp: 0.55, seconds, bob: 0.025 * k, more: b.sways, sleep: "tent", nap }) };
}
const moth = {
  baby: () => mothOf("moth-baby", { fly: 0.22, k: 0.9, wing: 0.6, bands: 0, chest: 1.25, skull: 1, C: { fur: "#cdbb9c", pale: "#efe6d2", ground: "#b7a58b", band: "#b7a58b", hind: "#cdbb9c", dark: "#5a4a3a" }, abdomen: { len: 0.55, fat: 0.7 }, feeler: 0.6, plume: 0.7, barbs: 3, fur: { n: 4, long: 0.06, tip: "#fbf6ea" }, seconds: 0.4 }),
  young: () => mothOf("moth-young", { fly: 0.26, wing: 0.85, bands: 1, feeler: 1, plume: 1.1, C: { ground: "#6b5a4c" } }),
  adult: () => mothOf("moth-adult", { fly: 0.3, wing: 1.1, bands: 2, chest: 1.2, feeler: 1.35, plume: 1.6, barbs: 5, fur: { n: 5, long: 0.065 } }),
  legend() {
    const VERDIGRIS = "#3f6f66", BONE = "#e6dcc3", MOON = "#dff6ff", C = { fur: "#6f5d4b", pale: "#cdbb9c", ground: "#3a2f2a", band: "#8a745c", hind: "#4a3c33", dark: "#1c1613", eye: "#bfe6ff", feeler: "#cdbb9c", plume: MOON, plumeGlow: true };
    const armour = [...[1, 3, 5].map(i => ({ on: "abdomen", from: 2 * i - 0.25, to: 2 * i + 1.25, round: [0, 1.7], thick: 0.014, colour: VERDIGRIS, rim: BONE, runes: { colour: MOON, size: 0.7, max: 1, seed: i + 20 } })), { on: "thorax", from: 0.7, to: 3.3, round: [0, 1.2], thick: 0.016, colour: VERDIGRIS, rim: BONE, runes: { colour: MOON, max: 1, seed: 7 } }];
    return mothOf("moth-legend", { fly: 0.38, wing: 1.55, bands: 2, chest: 1.2, C, eyeGlow: true, eyes: { ring: "#bfe6ff", iris: "#1c1613", pupil: MOON }, veins: { colour: MOON, glow: true, n: 2, w: 0.004 }, abdomen: { len: 1.3, fat: 0.7, rings: 8 }, feeler: 1.7, plume: 1.9, barbs: 7, fur: { n: 6, long: 0.09, tip: "#ffffff", ruff: "#f3ead6" }, seconds: 0.8, armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette as its plan draws it, wings out, turned towards us: its generated drawing's
 *  heights, Ed, 2026-11-12, "keep the sizes") (on the bench: src/rules/kinds.ts BENCH); plans, each level's build. */
export const MESH = { id: "moth", heights: [29, 46, 69, 226], plans: moth };
