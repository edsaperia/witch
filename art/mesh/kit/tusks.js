// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).
import { path, sweep } from "./sweep.js";

/** A boar's tusks, from P (kit/head.js gives it): each out of the side of its jaw, forward and out, then curling up and back.
 *  len (of the head's size), r, curl (radians it turns upward over its length), out, colour, tip, at [out, up, forward] where
 *  each leaves the jaw; fire: { colour, tip, size } a flame standing on its point, lit (a legend's). */
export function tusks(P, o = {}) {
  const { len = 0.09, r = 0.013, curl = 1.3, out = 0.7, colour = "#efe6cf", tip = "#fffaf0", at = [0.03, -0.028, 0.2], bone = "head", fire, sides = 5 } = o, k = P(1, 0, 0)[0], lofts = [], cones = [];
  for (const s of [1, -1]) {
    const pts = path(P(at[0] * s, at[1], at[2]), len * k, 6, t => { const a = 0.15 + curl * t; return [s * out * (1 - 0.6 * t), Math.sin(a), 0.6 * Math.cos(a)]; });
    lofts.push(sweep(bone, pts, { r: t => r * k * (1 - 0.9 * t * t), colour: t => (t > 0.7 ? tip : colour), sides }));
    if (fire) { const e = pts[pts.length - 1], z = fire.size ?? 1; cones.push({ at: e, rx: 0.02 * k * z, ry: 0.02 * k * z, tip: [e[0] + s * 0.01 * k, e[1] + 0.11 * k * z, e[2] - 0.03 * k * z], bone, colour: fire.colour, tipColour: fire.tip ?? fire.colour, glow: true, bulge: 0.75, split: 0.45, up: [0, 0, 1], sides: 5 }); }
  }
  return { bones: [], lofts, cones };
}
