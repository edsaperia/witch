// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A band round a bone's line from a to b (a collar, a rope): colour, r, how far along (0..1), wide. */
export function band(bone, a, b, o) {
  const { at = 0.5, r = 0.08, wide = 0.03, colour, up = [0, 0.8, -0.6], sides = 8, ry = r } = o, L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) || 1;
  const m = f => a.map((v, i) => v + (b[i] - v) * f), w = wide / L;
  return { bones: [], cones: [], lofts: [{ sides, up, rings: [[-w, 0.82], [-w / 2, 1], [w / 2, 1], [w, 0.82]].map(([d, f]) => ({ at: m(at + d), rx: r * f, ry: ry * f, bone, colour, up })) }] };
}
