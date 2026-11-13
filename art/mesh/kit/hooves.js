// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).

/** Hooves on legs made by kit/leg.js (`fourLegs`, or kit/quad.js's `legs`): each leg's paw taken off below its ankle and a
 *  hoof put there, standing on the same ground and riding the same bone, so its stride and its planted feet are as they were.
 *  colour; size (its width, of the ankle's); long (its length forward); cloven (true: two toes side by side, a deer's, a goat's,
 *  a pig's; false: one). Hands back the legs, changed. */
export function hooves(legs, o = {}) {
  const { colour = "#2a2019", size = 1, long = 1, cloven = true } = o;
  return legs.map(l => {
    const R = l.lofts[0].rings, a = R[4], bone = R[5].bone, ground = Math.min(R[5].at[1] - R[5].ry, R[6].at[1] - R[6].ry), w = Math.max(a.rx, a.ry) * 1.3 * size, h = a.at[1] - ground;
    const [x, , z] = a.at, top = a.at[1] - h * 0.3, cz = z + w * 0.25, sz = z + w * 0.85 * long;
    // (the leg ends in its coronet, the hoof's top; the toes start inside it)
    const shank = { ...l.lofts[0], rings: [...R.slice(0, 5), { at: [x, top, cz], rx: w * 0.95, ry: w * 0.95, bone, colour }, { at: [x, top - h * 0.12, cz], rx: w * 0.5, ry: w * 0.5, bone, colour }] };
    const toes = (cloven ? [1, -1] : [0]).map(d => ({ sides: 5, up: [0, 0, 1], rings: [
      { at: [x + d * w * 0.42, top + h * 0.05, cz], rx: w * (cloven ? 0.52 : 0.9), ry: w * 0.85, bone, colour, plain: true },
      { at: [x + d * w * 0.5, ground + h * 0.4, sz], rx: w * (cloven ? 0.6 : 1), ry: w * 1.05 * long, bone, colour, plain: true },
      { at: [x + d * w * 0.54, ground, sz], rx: w * (cloven ? 0.58 : 1), ry: w * 1.1 * long, bone, colour, plain: true }] }));
    return { ...l, lofts: [shank, ...toes, ...l.lofts.slice(1)], cones: [] };
  });
}
