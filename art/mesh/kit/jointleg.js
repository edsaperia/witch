// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z).
// Added with the many-legged kinds (docs/plans/creature-mesh-rollout.md, batch G: "six, eight and fourteen legs; pincers, a sting").

/** A jointed leg, an insect's, a spider's or a crab's: from `top` on the body it goes out the way `dir` points ([x, z], level) and
 *  up to a knee, down to an ankle near the ground and to a pointed tip on it. Four bones (leg, shin, foot, toe + tag), so
 *  art/mesh/shape.js `strides` plants its tip and finds its joints as it does a paw's. len: how far out its tip stands; rise: how
 *  high its knee stands over its top (a share of len); knee and ankle: how far out they are (shares of len); low: how high the
 *  ankle is (a share of the top's height); thick; colours { upper, joint, lower, tip }: joint is a narrow band at its knee and its
 *  ankle (a tarantula's orange); glow lights its tip. */
export function jointLeg(tag, top, o) {
  const { dir = [1, 0], len = 0.2, rise = 0.3, thick = 1, parent, colours: C, knee = 0.4, ankle = 0.85, low = 0.3, sides = 4, glow = false } = o, t = thick * len, b = ["leg", "shin", "foot", "toe"].map(x => x + tag);
  const P = (f, y) => [top[0] + dir[0] * len * f, y, top[2] + dir[1] * len * f], mix = (p, q, k) => p.map((v, i) => v + (q[i] - v) * k);
  const K = P(knee, top[1] + rise * len), A = P(ankle, top[1] * low), D = P(1, 0.035 * t), up = [-dir[1], 0, dir[0]];
  const ring = (at, r, bone, colour, lit = false) => ({ at, rx: r * t, ry: r * t, bone: b[bone], colour, glow: lit });
  const rings = [ring(mix(top, K, -0.12), 0.07, 0, C.upper), ring(mix(top, K, 0.5), 0.085, 0, C.upper), ring(mix(top, K, 0.86), 0.078, 0, C.upper), ring(K, 0.078, 1, C.joint ?? C.upper), ring(mix(K, A, 0.14), 0.07, 1, C.lower ?? C.upper), ring(mix(K, A, 0.5), 0.06, 1, C.lower ?? C.upper), ring(mix(K, A, 0.88), 0.052, 1, C.lower ?? C.upper), ring(A, 0.052, 2, C.joint ?? C.upper),
    ring(mix(A, D, 0.6), 0.036, 2, C.tip ?? C.lower ?? C.upper, glow), ring(D, 0.022, 3, C.tip ?? C.lower ?? C.upper, glow), ring(P(1.03, 0.008 * t), 0.008, 3, C.tip ?? C.lower ?? C.upper, glow)];
  return { bones: [[b[0], top, parent], [b[1], K, b[0]], [b[2], A, b[1]], [b[3], D, b[2]]], lofts: [{ sides, up, rings }], cones: [], names: b };
}
