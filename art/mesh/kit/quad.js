// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.
import { head } from "./head.js";
import { fourLegs } from "./leg.js";
import { stance, torso } from "./torso.js";

/** A four-legged build in one go: o.body (the torso's options, its stance worked out from the legs), o.head, o.hind and o.fore
 *  (the legs'; fore defaults to hind), o.C its colours. Returns { body, skull, legs, root (where a tail starts), R (the skin's
 *  rings: 0 rump tip, 1 hips, 2 loin, 3 ribs, 4 shoulders, 5 neck, 6 throat), P (a point on the head) }. */
export function quad(o) {
  const hind = { colours: o.C, ...o.hind }, fore = { colours: o.C, ...(o.fore ?? o.hind) };
  const body = torso({ ...stance(hind.len, fore.len), ...o.body, colours: o.C }), skull = head(body.pivot, { ...o.head, colours: o.C });
  return { body, skull, legs: fourLegs(body, hind, fore), root: [0, body.rings[1].at[1] + 0.01, body.rings[0].at[2] + 0.03], R: body.rings, P: skull.P };
}
