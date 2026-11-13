// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** Fur, spines or plates standing off a ring of the skin: n a side round it from angle a0 to a1 (0 the top, going down its
 *  flank; mirrored), each `long`, swept back by `sweep` and hanging by `droop`, growing down the flank by `grow`. colour(i, s)
 *  and tip(i, s) pick each one's; r its root's size; sides its facets; glow lights it (true: all of it; "tip": its outer half; or
 *  (i, s) => either, to light some and not others); lock makes each a full curved lock of fur where it would be a spike. */
export function tufts(ring, bone, o) {
  const out = [], { n = 6, a0 = 0.2, a1 = 2.6, long = 0.2, sweep = 0.6, r = 0.045, colour, tip, grow = 0, droop = 0.15, sides = 4, glow = false, flat = 0.8, jitter = 0.3, lock = false } = o;
  for (const s of [1, -1]) for (let i = 0; i < n; i++) {
    const a = a0 + (a1 - a0) * (n === 1 ? 0 : i / (n - 1)), cx = Math.sin(a) * s, cy = Math.cos(a), L = long * (1 + grow * (i / Math.max(1, n - 1))) * (1 - jitter / 2 + jitter * ((i * 7 + (s > 0 ? 0 : 3)) % 5) / 4);
    const at = [ring.at[0] + cx * ring.rx * 0.8, ring.at[1] + cy * ring.ry * 0.8, ring.at[2]];
    out.push({ at, rx: r, ry: r * flat, tip: [at[0] + cx * L * (1 - sweep) * 0.8, at[1] + cy * L * (1 - sweep) * 0.8 - L * droop, at[2] - L * sweep], bone, colour: colour(i, s), tipColour: tip?.(i, s) ?? colour(i, s), split: lock ? 0.45 : 0.5, up: [0, 0, 1], sides: lock ? 5 : sides, glow: typeof glow === "function" ? glow(i, s) : glow, ...(lock ? { bulge: 0.9, bend: [cx * L * 0.12, cy * L * 0.12 + L * 0.06, 0] } : {}) });
  }
  return out;
}
