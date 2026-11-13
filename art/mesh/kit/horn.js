// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the heavy and the gnawing kinds (docs/plans/creature-mesh-rollout.md, batch D).
import { path, sweep } from "./sweep.js";

/** A rhino's horn, from P (kit/head.js gives it): one horn standing on the middle of its nose, thick at the root and curving
 *  back to a point. at [up, forward] where it stands; len (of the head's size); r its root's thickness; lean (radians it tips
 *  forward from straight up at its root) and curl (radians it turns back over its length); colour, tip (its point's colour);
 *  glow: a colour its point is lit in; bands: { colour, at: [..] } rings round it (a legend's offerings); root: a colour for
 *  the rough collar it grows from. */
export function horn(P, o = {}) {
  const { len = 0.14, r = 0.03, lean = 0.35, curl = 0.7, at = [0.02, 0.22], colour = "#d8cdb8", tip, glow, bands, root, bone = "head", n = 8, sides = 6 } = o, k = P(1, 0, 0)[0];
  const pts = path(P(0, at[0], at[1]), len * k, n, t => { const p = lean - curl * t; return [0, Math.cos(p), Math.sin(p)]; }), fat = t => r * k * (1 - 0.94 * t ** 1.25);
  const lofts = [sweep(bone, pts, { r: fat, flat: 1.12, colour: t => (glow && t > 0.8 ? glow : tip && t > 0.7 ? tip : root && t < 0.1 ? root : colour), glow: t => !!glow && t > 0.8, sides, up: [1, 0, 0] })];
  for (const t of bands?.at ?? []) { const i = Math.max(1, Math.min(n - 1, Math.round(t * n)));
    lofts.push(sweep(bone, [pts[i - 1], pts[i], pts[i + 1]].map(p => p.map((v, c) => pts[i][c] + (v - pts[i][c]) * 0.3)), { r: fat(i / n) * 1.25, flat: 1.12, colour: bands.colour, sides, up: [1, 0, 0] })); }
  return { bones: [], lofts, cones: [], end: pts[n] };
}
