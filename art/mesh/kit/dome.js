// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A dome on `bone`, its rim at `c`: rx across, rz along the animal, high; a turtle's shell. colour(row, cz, sx) each facet's (row
 *  0 at the rim; cz 1 at its front, sx -1..1 across); rim: { colour, r } a lip round its edge; seams: { colour, glow, n } thin
 *  lines up it from the rim to the crown and one round it, lit if glow (the joins between its plates); glow: the whole of it lit
 *  (the light under plates laid on it as armour: its loft is named `name`, "dome"). Returns its pieces and
 *  `on(up, round)`: the point on it `up` (0 rim .. 1 crown) and `round` (radians, 0 its front), with the way out from there. */
export function dome(bone, c, o) {
  const { rx = 0.16, rz = 0.2, high = 0.12, colour, rim, seams, sides = 10, rows = 5 } = o, lat = i => (i / rows) * (Math.PI / 2) * 0.97;
  const on = (up, round) => { const f = up * (Math.PI / 2) * 0.97, x = Math.sin(round) * Math.cos(f), z = Math.cos(round) * Math.cos(f), y = Math.sin(f), n = [x / rx, y / high, z / rz], l = Math.hypot(...n) || 1; return { at: [c[0] + x * rx, c[1] + y * high, c[2] + z * rz], out: n.map(v => v / l) }; };
  const rings = Array.from({ length: rows + 1 }, (_, i) => ({ at: [c[0], c[1] + Math.sin(lat(i)) * high, c[2]], rx: rx * Math.cos(lat(i)), ry: rz * Math.cos(lat(i)), bone, up: [0, 0, 1], glow: !!o.glow, colour: (cz, sx) => colour(i, cz, sx) }));
  const lofts = [{ name: o.name ?? "dome", sides, up: [0, 0, 1], rings: [{ ...rings[0], at: [c[0], c[1] - 0.012, c[2]], rx: rx * 0.9, ry: rz * 0.9 }, ...rings] }];
  if (rim) lofts.push({ sides, up: [0, 0, 1], rings: [[-0.02, 0.96], [-0.006, 1.06], [0.01, 1.06], [0.022, 0.98]].map(([dy, f]) => ({ at: [c[0], c[1] + dy, c[2]], rx: rx * f + (rim.r ?? 0), ry: rz * f + (rim.r ?? 0), bone, up: [0, 0, 1], colour: rim.colour })) });
  if (seams) {
    const w = seams.w ?? 0.007, line = pts => ({ sides: 3, up: [0, 1, 0], rings: pts.map(p => ({ at: p.at.map((v, j) => v + p.out[j] * w * 0.6), rx: w, ry: w, bone, colour: seams.colour, glow: !!seams.glow, up: p.out })) });
    for (let k = 0; k < (seams.n ?? 6); k++) { const a = (k + 0.5) / (seams.n ?? 6) * Math.PI * 2; lofts.push(line([0.02, 0.25, 0.5, 0.72].map(u => on(u, a + (u > 0.4 ? 0.12 : 0))))); }
    lofts.push(line(Array.from({ length: 13 }, (_, i) => on(0.72, (i / 12) * Math.PI * 2)))), lofts.push(line(Array.from({ length: 13 }, (_, i) => on(0.36, (i / 12) * Math.PI * 2 + 0.26))));
  }
  return { bones: [], cones: [], lofts, on };
}
