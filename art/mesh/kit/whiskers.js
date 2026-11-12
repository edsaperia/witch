// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.


/** Whiskers off a muzzle: two a side from the point P gives on its head (kit/head.js), `long` times a fox's. */
export const whiskers = (P, colour, long = 1, bone = "head") => [1, -1].flatMap(s => [[-0.03, 0.15], [0.0, 0.12]].map(([dy, dz]) => ({ at: P(0.03 * s, -0.005, 0.2), rx: 0.006, ry: 0.006, tip: P((0.03 + 0.14 * long) * s, dy * long, dz), bone, colour, up: [0, 1, 0], sides: 3 })));
