// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** Paints over a ring of the skin (a mask on a face, a band across a back): fn(cy, sx) gives a colour, or nothing to leave the
 *  ring's own there. cy is 1 at the ring's top and -1 at its bottom; sx is -1..1 across it. */
export function paint(ring, fn) {
  const old = ring.colour;
  ring.colour = (cy, sx, f) => fn(cy, sx) ?? (typeof old === "function" ? old(cy, sx, f) : old);
  return ring;
}
