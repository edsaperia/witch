// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the heavy and the gnawing kinds (docs/plans/creature-mesh-rollout.md, batch D).
import { tail } from "./tail.js";

/** A beaver's tail: kit/tail.js's (the same options, and its bones), but a paddle: a narrow stalk where it leaves the body,
 *  then broad and thin, its end round. r its half-width at its broadest; flat its depth as a share of that; stalk how much of
 *  its length is the stalk; scale: a second colour in bands across it (its scales); edge: a colour for its rim. */
export function flattail(name, parent, root, o) {
  const { r = 0.08, flat = 0.16, stalk = 0.2, scale, edge } = o, t = tail(name, parent, root, { sides: 8, ...o, plume: false }), rings = t.lofts[0].rings, n = rings.length - 1;
  rings.forEach((ring, i) => { const u = i / n, f = u < stalk ? 0.3 + 0.25 * (u / stalk) : Math.sqrt(Math.max(0.03, 1 - ((u - 0.62) / 0.4) ** 2)) * (0.55 + 0.45 * Math.min(1, (u - stalk) / 0.2));
    ring.rx = r * f; ring.ry = Math.max(r * flat * Math.min(1, f + 0.3), u < stalk ? r * 0.3 : 0); ring.plain = true;
    const base = scale && i % 2 ? scale : ring.colour; ring.colour = edge ? (cy, sx) => (Math.abs(sx) > 0.8 ? edge : typeof base === "function" ? base(cy, sx) : base) : base; });
  return t;
}
