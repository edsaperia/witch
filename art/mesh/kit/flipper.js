// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F).

/** A penguin's flipper on one bone (wing<tag>): a stiff narrow blade from its `shoulder` along `dir`, dark outside and pale
 *  inside. len, wide; colours { back, belly, edge }. `wave` gives a gait's `extra` that holds it out and rocks it. */
export function flipper(tag, s, shoulder, dir, o = {}) {
  const { len = 0.3, wide = 0.07, parent = "chest", colours: C, thick = 0.012 } = o, bone = `wing${tag}`, l = Math.hypot(...dir) || 1, d = dir.map(v => v / l), up = [s, 0.15, 0];
  const rings = [[0, 0.55], [0.25, 1], [0.6, 0.95], [0.88, 0.6], [1, 0.15]].map(([t, f]) => ({ at: shoulder.map((v, i) => v + d[i] * len * t), rx: wide * f, ry: thick * (0.5 + 0.5 * f), bone, up, plain: true, colour: (cy, sx) => (Math.abs(sx) > 0.9 && C.edge ? C.edge : cy > 0 ? C.back : C.belly) }));
  return { bones: [[bone, shoulder, parent]], lofts: [{ sides: 6, up, rings }], cones: [], names: [bone],
    wave: ({ out = 0.5, amp = 0.2, beats = 2, phase = 0 } = {}) => [{ bone, rot: u => [0.1 * Math.sin(Math.PI * 2 * beats * u + phase), 0, s * (out + amp * Math.sin(Math.PI * 2 * beats * u + phase + (s > 0 ? 0 : Math.PI)))] }] };
}
