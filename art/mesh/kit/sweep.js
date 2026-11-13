// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).

const pick = (v, t, i) => (typeof v === "function" ? v(t, i) : v);

/** Points along a path from `from`, `len` long in n steps, each heading dir(t) (t 0..1 along it; any length). tighten shortens
 *  the later steps (a spiral drawing in). */
export function path(from, len, n, dir, tighten = 0) {
  const pts = [[...from]], w = i => 1 - tighten * (i + 0.5) / n, total = Array.from({ length: n }, (_, i) => w(i)).reduce((a, b) => a + b, 0);
  for (let i = 0; i < n; i++) { const d = dir((i + 0.5) / n), l = Math.hypot(...d) || 1, s = len * w(i) / total; pts.push(pts[i].map((v, k) => v + d[k] / l * s)); }
  return pts;
}

/** The point a share t along `pts`. */
export const along = (pts, t) => { const f = Math.min(pts.length - 1 - 1e-6, Math.max(0, t * (pts.length - 1))), i = Math.floor(f), u = f - i; return pts[i].map((v, k) => v + (pts[i + 1][k] - v) * u); };

/** A sideways direction square enough to d to give a ring or a cone its `up`. */
export const aside = d => { const a = d.map(Math.abs); return a[0] <= a[1] && a[0] <= a[2] ? [1, 0, 0] : a[2] <= a[1] ? [0, 0, 1] : [0, 1, 0]; };

/** A tube along `pts` on `bone` (a horn, an antler's beam, a tusk, a stripe): one loft. r, flat (ry as a share of rx), colour
 *  and glow are each a value or (t, i) => a value, t 0..1 along it (for a ring coloured round itself, kit/bib.js, hand back the
 *  function from one). up picks the rings' ry direction: not the way the path runs. Its rings have no coat's texture (`plain`). */
export function sweep(bone, pts, o) {
  const { r = 0.02, colour, sides = 5, up = [0, 0, 1], flat = 1, glow = false } = o, n = Math.max(1, pts.length - 1);
  return { sides, up, rings: pts.map((at, i) => { const t = i / n, R = pick(r, t, i); return { at, rx: R, ry: R * pick(flat, t, i), bone, colour: pick(colour, t, i), glow: !!pick(glow, t, i), plain: true, up }; }) };
}
