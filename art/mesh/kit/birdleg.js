// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F).

/** A bird's leg from its hip (inside its body): a short feathered thigh forward and down to the knee, the shin back and down to
 *  the hock (the joint that looks like a knee bent backwards), then the long bare shank down to the foot: three toes forward
 *  and one back, flat on the ground. Its bones are named as kit/leg.js names a hind leg's (hip, knee, hock, hpaw + tag), so
 *  art/mesh/shape.js `strides` plants it: bones [hip, knee, hock], the foot below. len: how far its hip is off the ground;
 *  thick; colours { thigh, shank, toe, claw }; toe the toes' length, splay their spread; trousers the thigh's feathers' fullness;
 *  web: a colour for a webbed foot (one flat pad where the toes are); band: { colour, at } a ring round the shank. */
export function birdleg(tag, s, hip, o) {
  const { len = 0.3, thick = 1, parent = "pelvis", colours: C, toe = 1, splay = 1, trousers = 1, web, band, claws } = o, k = len, t = thick * len;
  const P = (dx, dy, dz) => [hip[0] + dx * k * s, hip[1] + dy * k, hip[2] + dz * k], b = ["hip", "knee", "hock", "hpaw"].map(x => x + tag);
  const J = [[0, 0, 0], [0.02, -0.2, 0.13], [0.04, -0.52, -0.12], [0.05, -1, 0]];
  const lofts = [{ sides: 6, up: [0, 0, 1], rings: [[0, 0.06, -0.01, 0.2, 0], [0.01, -0.1, 0.07, 0.2, 0], [0.02, -0.2, 0.12, 0.15, 0], [0.03, -0.37, 0, 0.085, 1], [0.04, -0.5, -0.11, 0.05, 1]].map(([x, y, z, r, bone]) => ({ at: P(x, y, z), rx: r * t * trousers, ry: r * t * trousers * 1.15, bone: b[bone], colour: C.thigh })) },
    { sides: 5, up: [0, 0, 1], rings: [[0.04, -0.5, -0.12, 0.042, 1], [0.04, -0.54, -0.115, 0.036, 2], [0.045, -0.78, -0.05, 0.03, 2], [0.05, -0.97, -0.005, 0.034, 2]].map(([x, y, z, r, bone]) => ({ at: P(x, y, z), rx: r * t, ry: r * t, bone: b[bone], colour: C.shank, plain: true })) }];
  if (band) { const a = P(...J[2]), e = P(...J[3]), m = f => a.map((v, i) => v + (e[i] - v) * f); lofts.push({ sides: 6, up: [0, 0, 1], rings: [[-0.03, 0.8], [-0.015, 1.25], [0.015, 1.25], [0.03, 0.8]].map(([d, f]) => ({ at: m((band.at ?? 0.4) + d), rx: 0.05 * t * f, ry: 0.05 * t * f, bone: b[2], colour: band.colour, glow: !!band.glow, plain: true })) }); }
  const cones = [], y = -1 + 0.03 * thick, L = 0.34 * toe * Math.max(1, thick * 0.8);
  if (web) cones.push({ at: P(0.05, y, -0.03), rx: 0.2 * t * splay, ry: 0.03 * t, tip: P(0.05, y - 0.012, L), bone: b[3], colour: web, split: 0.75, bulge: 1.15, up: [0, 1, 0], sides: 5 });
  else for (const [a, f] of [[-0.55, 0.85], [0, 1], [0.55, 0.85], [Math.PI, 0.5]]) { const dx = Math.sin(a) * splay, dz = Math.cos(a);
    cones.push({ at: P(0.05, y, 0), rx: 0.04 * t, ry: 0.032 * t, tip: P(0.05 + dx * L * f, y - 0.018, dz * L * f), bone: b[3], colour: C.toe ?? C.shank, tipColour: claws ?? C.claw ?? C.toe ?? C.shank, split: 0.8, bulge: 0.8, up: [0, 1, 0], sides: 4, glow: claws ? "tip" : false }); }
  return { bones: J.map((j, i) => [b[i], P(...j), i ? b[i - 1] : parent]), lofts, cones, names: b };
}

/** A pair of them under a body at `hip` height, `out` apart from its middle, `z` along it. */
export const birdlegs = (o, out, z = 0) => [[1, "L"], [-1, "R"]].map(([s, tag]) => birdleg(tag, s, [out * s, o.len, z], o));
/** The two legs' timings for a pace: where in the cycle each foot comes down (a walk: half a cycle apart; a hop: together). */
export const twoLegs = (left, right) => [["L", left], ["R", right]].map(([tag, phase]) => ({ bones: ["hip", "knee", "hock"].map(x => x + tag), phase }));
