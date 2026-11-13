// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A raised boss (a turtle's keel; a legend's armour is not this but `armour`, plate raised from its own skin: see `plan`): a
 *  faceted boss of `r` standing `high` off `at` the way `out` points, on `bone`; gem: { colour } a lit stone
 *  set in its middle; rim a second colour for its edge. */
export function plate(bone, at, out, o) {
  const { r = 0.08, high = 0.04, colour, rim, gem, sides = 6, up = [0, 1, 0], ry = r } = o, l = Math.hypot(...out) || 1, d = out.map(v => v / l), top = at.map((v, i) => v + d[i] * high);
  const cones = [{ at, rx: r, ry, tip: top, bone, colour: rim ?? colour, tipColour: colour, split: 0.35, up, sides }];
  if (gem) cones.push({ at: top.map((v, i) => v - d[i] * high * 0.35), rx: r * 0.28, ry: r * 0.28, tip: top.map((v, i) => v + d[i] * high * 0.5), bone, colour: gem.colour, glow: true, up, sides: 4 });
  return { bones: [], lofts: [], cones };
}
