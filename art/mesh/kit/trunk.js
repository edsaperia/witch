// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the heavy and the gnawing kinds (docs/plans/creature-mesh-rollout.md, batch D).
import { path } from "./sweep.js";

/** An elephant's trunk, from P (kit/head.js gives it): a tapering tube out of the front of its face on a chain of its own bones
 *  (`chain`: hand it to the gait's `tails` and it swings a little behind the body's walk, and lies along the ground asleep). It
 *  leaves heading p0 (radians below straight ahead: 1.57 is straight down) and turns `curl` forward and up over its length, most
 *  near its tip (a raised trunk: p0 under 0 and curl under 0). len (of the head's size), r its root's thickness, tip its end's as
 *  a share of that, at [up, forward] where it leaves the face, colour and crease (every other ring a little proud and darker: its
 *  wrinkles), lip the colour of its tip, bones (4), floor: the height above the ground none of it hangs below. */
export function trunk(P, o = {}) {
  const { len = 0.3, r = 0.036, tip = 0.4, p0 = 1.25, curl = 0.9, at = [-0.015, 0.2], colour, crease, lip, bones: nb = 4, n = 12, sides = 6, floor = 0.03, name = "trunk", parent = "head" } = o, k = P(1, 0, 0)[0];
  const fat = t => r * k * (1 - (1 - tip) * t ** 0.8);
  const pts = path(P(0, at[0], at[1]), len * k, n, t => { const p = p0 - curl * t * t; return [0, -Math.sin(p), Math.cos(p)]; }).map((p, i) => [p[0], Math.max(p[1], floor + fat(i / n)), p[2]]);
  const bt = Array.from({ length: nb }, (_, i) => i / nb), bones = bt.map((t, i) => [`${name}${i + 1}`, pts[Math.round(t * n)], i ? `${name}${i}` : parent]);
  const bone = t => `${name}${Math.min(nb, Math.max(1, Math.floor(t * nb + 0.5)))}`;
  const rings = pts.map((p, i) => { const t = i / n, proud = !!crease && i % 2 === 1 && i < n; return { at: p, rx: fat(t) * (proud ? 1.07 : 1), ry: fat(t) * (proud ? 1.07 : 1), bone: i ? bone(t) : parent, colour: i >= n - 1 && lip ? lip : proud ? crease : colour, plain: true, up: [1, 0, 0] }; });
  return { bones, cones: [], lofts: [{ sides, up: [1, 0, 0], rings }], chain: bones.map(b => b[0]), end: pts[n] };
}
