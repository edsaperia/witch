// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.
import { tail } from "./tail.js";

/** An otter's tail: kit/tail.js's, but thickest where it leaves the body and tapering to a point, wider than it is deep
 *  (`flat`: its depth as a share of its width). The same options as `tail`. */
export function rudder(name, parent, root, o) {
  const { r = 0.08, flat = 0.7 } = o, t = tail(name, parent, root, { ...o, plume: false }), rings = t.lofts[0].rings, n = rings.length - 1;
  rings.forEach((ring, i) => { const f = 1 - 0.95 * (i / n) ** 1.3; ring.rx = r * f; ring.ry = r * f * flat; });
  return t;
}
