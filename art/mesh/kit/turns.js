// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z).
// Added with the many-legged kinds (docs/plans/creature-mesh-rollout.md, batch G: "six, eight and fourteen legs; pincers, a sting").

// Turns as nine numbers by rows, as art/mesh/shape.js's `pose` holds them (y, then x, then z), for the parts here that work out a
// sleeping pose: a leg folded about its own sideways line (kit/manylegs.js), a tail laid down and curled (kit/sting.js).
export const turnOf = (x, y, z) => { const cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z); return [cy * cz + sy * sx * sz, sy * sx * cz - cy * sz, sy * cx, cx * sz, cx * cz, -sx, cy * sx * sz - sy * cz, sy * sz + cy * sx * cz, cy * cx]; };
export const times = (a, b) => [0, 1, 2].flatMap(r => [0, 1, 2].map(c => a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c]));
export const transposed = m => [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
/** A turn's three angles [x, y, z], what a pose's `rots` take. */
export const eulerOf = m => [Math.asin(Math.max(-1, Math.min(1, -m[5]))), Math.atan2(m[2], m[8]), Math.atan2(m[3], m[4])];
/** The turn by `a` radians about the unit line `k`. */
export const about = (k, a) => { const c = Math.cos(a), s = Math.sin(a), t = 1 - c, [x, y, z] = k; return [c + t * x * x, t * x * y - s * z, t * x * z + s * y, t * x * y + s * z, c + t * y * y, t * y * z - s * x, t * x * z - s * y, t * y * z + s * x, c + t * z * z]; };
