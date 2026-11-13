// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

import { head } from "./head.js";
import { fourLegs } from "./leg.js";
import { stance, torso } from "./torso.js";

/** A weasel's build from a few numbers: body { len, girth, arch, neck, neckThick, white }, legs { len, thick }, head { ... }. */
export function weasel(o) {
  const st = stance(o.legs.len), body = torso({ ...st, deep: 0.86, tuck: 0.96, ...o.body, colours: o.C });
  const skull = head(body.pivot, { muzzle: 0.55, wide: 0.98, dome: 0.86, muzzleWide: 1.15, cheek: 0, eye: 1.25, ear: { shape: "round", tall: 0.62, wide: 1.25, at: [0.012, -0.012, -0.005], back: o.C.ear ?? o.C.coat, inner: o.C.inner ?? "#c98f6e" }, ...o.head, colours: o.C });
  return { body, skull, legs: fourLegs(body, { colours: o.C, ...o.legs }), root: [0, body.rings[1].at[1] + 0.01, body.rings[0].at[2] + 0.03] };
}
