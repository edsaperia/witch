// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).

/** A fawn's dapples: pale dots lying on the flanks, n a side on each of the skin's `rings` (kit/torso.js's, with the bone each
 *  rides: BONES) and between them, from angle a0 to a1 round from the spine. colour, r (a dot's size). */
export function spots(rings, bones, o = {}) {
  const { colour = "#f3ead6", n = 3, a0 = 0.45, a1 = 1.5, r = 0.014, from = 1, to = 4 } = o, out = [];
  for (let i = from * 2; i <= to * 2; i++) { const A = rings[Math.floor(i / 2)], B = rings[Math.ceil(i / 2)], mix = (p, q) => (p + q) / 2, c = [0, 1, 2].map(j => mix(A.at[j], B.at[j])), rx = mix(A.rx, B.rx), ry = mix(A.ry, B.ry);
    for (const s of [1, -1]) for (let j = 0; j < n; j++) { const a = a0 + (a1 - a0) * ((j + (i % 2) * 0.5 + ((i * 3 + j) % 3) * 0.12) / n), sx = Math.sin(a) * s, cy = Math.cos(a), at = [c[0] + sx * rx * 0.97, c[1] + cy * ry * 0.97, c[2] + ((j * 5 + i) % 3 - 1) * 0.008];
      out.push({ at, rx: r, ry: r, tip: [at[0] + sx * 0.012, at[1] + cy * 0.012, at[2]], bone: bones[Math.floor(i / 2)], colour, bulge: 0.9, split: 0.5, up: [0, 0, 1], sides: 5 }); } }
  return out;
}

/** A deer's pale rump: a cap over the end of its haunches, from the skin's rings (0 the rump's tip, 1 the hips). */
export const rump = (rings, colour, size = 1) => ({ at: [0, rings[1].at[1] + rings[1].ry * 0.05, rings[1].at[2] - 0.012], rx: rings[1].rx * 0.8 * size, ry: rings[1].ry * 0.86 * size, tip: [0, rings[0].at[1], rings[0].at[2] - 0.012], bone: "pelvis", colour, bulge: 0.78, split: 0.55, up: [0, 1, 0], sides: 8 });
