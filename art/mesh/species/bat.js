// The fruit bat, four levels, as plans for art/mesh/shape.js (docs/plans/creature-mesh-rollout.md, batch F: wings). The jungle's
// (art/creatures/bat/genome.js: "a flying fox, a fox's face with big eyes and small ears, a golden mantle over its shoulders,
// broad dark wings"; its legend's word there is "sonar"). A small furred body and a fox's head (the kit's torso and head) hung
// in the air between two wings of skin (kit/skinwing.js), its feet trailing. Its ladder: a pup, all eyes, its wings short; a
// young one, brown all over; the flying fox in its golden mantle; and the old one, great-eared, its mantle a mane, its
// fingers lit through its wings' skin, plate of dark plum over its back with a gold mark lit on each (Ed, 2026-11-12:
// "Armour should just be thickened polygons on their torso with a different colour and glowing runes"). It flies at every
// pace; asleep it comes down and lies wrapped in its wings (a bat hangs to sleep, and there is nothing in the open to hang
// from). Metres; y up; its head along +z.
import { head } from "../kit/head.js";
import { plan } from "../kit/plan.js";
import { skinwing } from "../kit/skinwing.js";
import { torso } from "../kit/torso.js";
import { tufts } from "../kit/tufts.js";

const FUR = "#5a3a22", GOLD = "#c98e3a", SKIN = "#2d221d", UNDER = "#3d2d26", NOSE = "#1a1210";
function fruitbat(name, o) {
  const { fly = 0.45, size = 1, wing = 1, C = {}, ears = 1, mantle, eye = 1.5, ribs, seconds = 0.7, lively = 1 } = o, coat = C.coat ?? FUR, K = { coat, belly: C.belly ?? GOLD, nose: NOSE, eye: C.eye ?? "#120d0a", eyes: C.eyes };
  const body = torso({ back: fly, len: 0.55 * size, girth: 0.82 * size, deep: 0.9, tuck: 0.9, neck: [0.07 * size, 0.1 * size], neckThick: 1.1, white: 0.35, colours: K });
  const skull = head(body.pivot, { size: 0.82 * size, muzzle: 0.95, muzzleWide: 0.9, ear: { tall: 0.62 * ears, wide: 0.8, back: C.ear ?? "#3a271a", tip: C.ear ?? "#3a271a" }, cheek: 0, eye, colours: K });
  const sh = s => { const p = body.shoulder(s); return [p[0] * 0.9, fly + 0.035 * size, p[2] - 0.02]; };
  const wings = [[1, "L"], [-1, "R"]].map(([s, tag]) => skinwing(tag, s, sh(s), { arm: 0.3 * wing * size, hand: 0.46 * wing * size, back: 0.2 * size, colours: { skin: C.skin ?? SKIN, under: C.under ?? UNDER, bone: C.bone ?? "#4a3324", claw: "#d9cfc0" }, ribs }));
  // (its feet, trailed behind it, and its mantle: a ruff of longer fur over its shoulders)
  const feet = [1, -1].map(s => { const h = body.hip(s); return { at: [h[0] * 0.7, fly - 0.03 * size, h[2] - 0.03], rx: 0.022 * size, ry: 0.018 * size, tip: [h[0] * 0.9, fly - 0.1 * size, h[2] - 0.13 * size], bone: "pelvis", colour: C.skin ?? SKIN, split: 0.7, bulge: 0.7, up: [0, 1, 0], sides: 4 }; });
  const ruff = mantle ? [...tufts(body.rings[4], "chest", { n: mantle.n ?? 4, a0: 0.2, a1: 2.3, long: mantle.long, sweep: 0.75, droop: 0.2, r: 0.05 * size, lock: true, colour: () => mantle.colour, tip: () => mantle.tip ?? mantle.colour }), ...tufts(body.rings[5], "neck", { n: mantle.n ?? 4, a0: 0.3, a1: 2.6, long: mantle.long * 0.8, sweep: 0.7, droop: 0.25, r: 0.045 * size, lock: true, colour: () => mantle.colour, tip: () => mantle.tip ?? mantle.colour })] : [];
  const T = Math.PI * 2, nap = ({ rots }) => { for (const w of wings) w.wrap(rots); rots.neck = [0.35, 0, 0]; rots.head = [0.25, 0.3, 0]; };
  const p = plan(name, body, skull, wings, { type: "fly", seconds, legs: [], bob: 0.035 * size, bobs: 1, sway: 0.02, lively, sleep: "wrap", nap,
    extra: [...wings.flatMap(w => w.flap({ mid: 0.12, amp: 0.7, beats: 1 })), { bone: "pelvis", rot: u => [-0.12 + 0.07 * Math.sin(T * u + 2), 0, 0] }, { bone: "head", rot: u => [0.1 - 0.05 * Math.sin(T * u + 2), 0.05 * Math.sin(T * u), 0] }] }, { cones: [...feet, ...ruff, ...(o.cones?.({ P: skull.P }) ?? [])], armour: o.armour ?? [] });
  return { ...p, hover: fly * 0.6 };
}
const bat = {
  baby: () => fruitbat("bat-baby", { fly: 0.3, size: 0.8, wing: 0.7, ears: 0.9, eye: 2.0, C: { coat: "#7a573a", belly: "#c9a36a" }, seconds: 0.5, lively: 1.3 }),
  young: () => fruitbat("bat-young", { fly: 0.38, size: 0.9, wing: 0.95, C: { belly: "#8a5f34" }, seconds: 0.6 }),
  adult: () => fruitbat("bat-adult", { fly: 0.45, wing: 1.15, mantle: { long: 0.1, colour: GOLD, tip: "#e3b55a" } }),
  legend() {
    const LIT = "#ffcf6a", PLUM = "#3a1f3f";
    return fruitbat("bat-legend", { fly: 0.6, size: 1.15, wing: 1.5, ears: 2.2, eye: 1.6, C: { coat: "#3e2616", belly: "#b87a2e", skin: "#1f1620", under: "#2c1f2e", bone: "#5a3a22", eyes: [{ colour: LIT, glow: true }, { colour: LIT, glow: true }], ear: "#2a1a12" }, mantle: { n: 6, long: 0.2, colour: "#d39a3c", tip: "#f3d48a" }, ribs: { colour: LIT, glow: true }, seconds: 1.0, lively: 0.75,
      armour: [{ from: 1.15, to: 4.2, round: [0, 1.2], lames: 3, thick: 0.018, step: 0.01, colour: PLUM, rim: "#c9a24a", runes: { colour: LIT } }] });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (its whole silhouette as its plan draws it, wings out, turned towards us: today's drawn heights, Ed,
 *  2026-11-12, "keep the sizes"); plans, each level's build. */
export const MESH = { id: "bat", heights: [40, 62, 88, 246], plans: bat };
