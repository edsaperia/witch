// The dragonfly, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). The mangrove
// swamp's (art/creatures/dragonfly/genome.js; Ed, 2026-10-12: "a hawker over the water, metallic blue-green, four glassy veined
// wings; every level flies (Ed: the baby a small dragonfly); its legend the elder of its kind, a coal-forest giant: all eye,
// vast tattered wings, scarred"). A stout thorax and a great-eyed head on a long thin ringed tail (kit/insect.js), four long
// narrow wings held straight out (kit/insectwing.js), its legs bunched forward under it. Its wings and tail grow with it, as
// its genome's levels have them. The elder's armour is plate of old bronze over its thorax and down its tail, a blue-green
// mark lit on each (Ed, 2026-11-12: "Armour should just be thickened polygons on their torso with a different colour and
// glowing runes"). It flies at every pace, its two pairs of wings beating against each other; asleep it settles onto its legs
// with its wings out flat and let down a little, as a dragonfly rests (it cannot fold them back). Metres; y up; its head along +z.
import { insect } from "../kit/insect.js";
import { hovers, insectwing } from "../kit/insectwing.js";

const TEAL = "#1f9c8f", DEEP = "#12564f", BLUE = "#2f7fd0", GLASS = "#cfeef5", VEIN = "#3e6f7c";
function hawker(name, o) {
  const { fly = 0.34, k = 1, wing = 1, tail = 1, C = {}, eye = 1.7, tatters = 0, veins = { colour: VEIN, n: 2, w: 0.004 }, seconds = 0.8 } = o;
  const b = insect({ fly, k, chest: 1.05, skull: 1.1, C: { thorax: C.thorax ?? TEAL, head: C.head ?? DEEP, eye: C.eye ?? "#3ad0c0", eyeGlow: !!C.eyeGlow, leg: "#16211f" }, eye: { r: eye, out: 0.045, up: 0.018, fwd: 0.02 }, feelers: { len: 0 }, legs: { len: 0.75, fwd: 0.07 },
    abdomen: { len: 1.75 * tail, fat: 0.36, rings: o.rings ?? 9, bones: 3, droop: 0.015, prof: t => 0.62 - 0.3 * t + (t > 0.85 ? 0.12 : 0), colour: i => (i % 2 ? C.ring ?? "#16302e" : C.tail ?? BLUE) } }), { P } = b;
  const wings = [], lofts = [], cones = [], bones = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) for (const [pair, z, dir, len, wide, phase] of [["f", 0.055, [s, 0.07, 0.14], 0.56, 0.058, 0], ["h", -0.02, [s, 0.04, -0.2], 0.52, 0.072, Math.PI]]) {
    const bone = `wing${pair}${tag}`, root = P(0.04 * s, 0.13, z); bones.push([bone, root, "thorax"]); wings.push({ bone, s, phase });
    const w = insectwing(bone, root, dir, { len: len * wing * k, wide: wide * wing * k, colour: C.glass ?? GLASS, veins, tatters, prof: [[0, 0.4], [0.25, 0.9], [0.6, 1], [0.88, 0.8], [1, 0.3]], cells: [{ from: 0.8, to: 0.88, wide: 0.3, off: -0.55, colour: C.mark ?? "#2b3f46", glow: !!C.markGlow }] });
    lofts.push(...w.lofts); cones.push(...w.cones);
  }
  // (asleep: settled, its wings out flat and let down a little)
  const nap = ({ rots }) => { for (const w of wings) rots[w.bone] = [0, 0, -w.s * 0.22]; };
  return { name, bones: [...b.bones, ...bones], lofts: [...b.lofts, ...lofts], cones: [...b.cones, ...cones], armour: o.armour ?? [], hover: fly * k,
    gait: hovers(wings, { beats: 3, mid: 0.06, amp: 0.34, seconds, bob: 0.015 * k, more: b.sways, sleep: "settle", nap }) };
}
const dragonfly = {
  baby: () => hawker("dragonfly-baby", { fly: 0.24, k: 0.9, wing: 0.62, tail: 0.6, eye: 1.9, rings: 6, C: { thorax: "#57b8a4", tail: "#6aa6d8", head: "#2f7a6c" }, seconds: 0.6 }),
  young: () => hawker("dragonfly-young", { fly: 0.29, wing: 0.8, tail: 0.85, rings: 8 }),
  adult: () => hawker("dragonfly-adult", { fly: 0.34, wing: 1, tail: 1, rings: 9 }),
  legend() {
    const LIT = "#7ff3df", BRONZE = "#6b5630", C = { thorax: "#176b62", head: "#0d3b36", eye: LIT, eyeGlow: true, tail: "#1f5fa8", ring: "#0f2422", glass: "#a9d6dc", mark: LIT, markGlow: true };
    const armour = [...[1, 3, 5, 7, 9].map(i => ({ on: "abdomen", from: 2 * i - 0.25, to: 2 * i + 1.25, round: [0, 1.9], thick: 0.012, colour: BRONZE, rim: "#c9a24a", runes: { colour: LIT, size: 0.75, max: 1, seed: i } })), { on: "thorax", from: 0.7, to: 3.3, round: [0, 1.25], thick: 0.02, colour: BRONZE, rim: "#c9a24a", runes: { colour: LIT, max: 1 } }];
    return hawker("dragonfly-legend", { fly: 0.44, k: 1.1, wing: 1.45, tail: 1.4, eye: 2.25, rings: 11, tatters: 0.9, veins: { colour: LIT, glow: true, n: 2, w: 0.0045 }, C, seconds: 1.2, armour });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette as its plan draws it, wings out, turned towards us: today's drawn heights, Ed,
 *  2026-11-12, "keep the sizes"); plans, each level's build. */
export const MESH = { id: "dragonfly", heights: [36, 57, 86, 267], plans: dragonfly };
