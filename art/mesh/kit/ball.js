// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A ball on `bone` at `c`: r, colour, glow (a lit stone, a moon, a berry). */
export function ball(bone, c, o) {
  const { r = 0.04, colour, glow = false, sides = 7, squash = 1 } = o;
  return { bones: [], cones: [], lofts: [{ sides, up: [0, 0, 1], rings: [[-1, 0.12], [-0.62, 0.78], [0, 1], [0.62, 0.78], [1, 0.12]].map(([y, f]) => ({ at: [c[0], c[1] + y * r * squash, c[2]], rx: r * f, ry: r * f, bone, colour, glow, up: [0, 0, 1] })) }] };
}
