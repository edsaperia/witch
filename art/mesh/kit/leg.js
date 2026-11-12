// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A leg from its top joint: "hind" (hip, knee, hock, paw: the hock high and back) or "fore" (shoulder, elbow, wrist, paw).
 *  len 1 reaches the ground from a fox's hip (0.37 up) or shoulder (0.34 up); thick fattens it. colours { upper, mid, sock }.
 *  band: { colour, at: 0..1 down the lowest long bone, r } puts a ring of beads there; knob swells the joints (an old animal's);
 *  claws: { colour, len, thick, wide } three long claws a paw; foot the toes' length (a hare's long hind foot); paw its width (a
 *  mole's spade). */
export function leg(kind, tag, s, top, o) {
  const { len = 1, thick = 1, parent, colours: C, band, knob = 1, claws, foot = 1, paw = 1 } = o, k = len, t = thick * len;
  const P = (dx, dy, dz) => [top[0] + dx * k * s, top[1] + dy * k, top[2] + dz * k];
  const hind = kind === "hind", n = hind ? ["hip", "knee", "hock", "hpaw"] : ["shoulder", "elbow", "wrist", "fpaw"], b = n.map(x => x + tag);
  const J = hind ? [[0, 0, 0], [0.01, -0.145, 0.065], [0.01, -0.245, -0.065], [0.01, -0.348, -0.035]] : [[0, 0, 0], [0.005, -0.125, -0.035], [0.005, -0.255, -0.02], [0.005, -0.318, -0.015]];
  const R = hind
    ? [[-0.005, 0.02, -0.005, 0.056, 0.111, 0, "upper"], [0.005, -0.07, 0.035, 0.059, 0.098, 0, "upper"], [0.01, -0.145, 0.065, 0.039, 0.052, 0, "mid"], [0.01, -0.245, -0.065, 0.024, 0.029, 1, "sock"], [0.01, -0.34, -0.038, 0.022, 0.023, 2, "sock"], [0.01, -0.358, -0.012, 0.031, 0.016, 3, "sock", 1], [0.01, -0.36, 0.035, 0.028, 0.013, 3, "sock", 1]]
    : [[-0.002, 0.03, 0.01, 0.049, 0.085, 0, "upper"], [0.003, -0.05, -0.015, 0.05, 0.075, 0, "upper"], [0.005, -0.125, -0.035, 0.034, 0.042, 0, "mid"], [0.005, -0.255, -0.02, 0.022, 0.025, 1, "sock"], [0.005, -0.312, -0.017, 0.022, 0.022, 2, "sock"], [0.005, -0.328, 0.01, 0.031, 0.016, 3, "sock", 1], [0.005, -0.33, 0.05, 0.028, 0.013, 3, "sock", 1]];
  const out = { bones: J.map((j, i) => [b[i], P(...j), i ? b[i - 1] : parent]), lofts: [{ sides: 5, up: [0, 0, 1], rings: R.map(([dx, dy, dz, rx, ry, bone, c, flat], i) => ({ at: P(dx, dy, i === 6 ? R[5][2] + (dz - R[5][2]) * foot : dz), rx: rx * t * (i === 2 || i === 3 ? knob : 1) * (flat ? paw : 1), ry: ry * t * (i === 2 || i === 3 ? knob : 1), bone: b[bone], colour: C[c], ...(flat ? { up: [0, 1, 0] } : {}) })) }], cones: [], names: b };
  if (claws) { const toe = [R[6][0], R[6][1], R[5][2] + (R[6][2] - R[5][2]) * foot], cw = (claws.wide ?? 1) * paw; for (const dx of [-0.02, 0, 0.02]) out.cones.push({ at: P(toe[0] + dx * cw, toe[1] + 0.004, toe[2] - 0.005), rx: 0.008 * t * (claws.thick ?? 1), ry: 0.008 * t * (claws.thick ?? 1), tip: P(toe[0] + dx * 1.3 * cw, toe[1] - 0.008, toe[2] + 0.03 * (claws.len ?? 1)), bone: b[3], colour: claws.colour, up: [0, 1, 0], sides: 3 }); }
  if (band) { // beads round the cannon bone, riding it
    const a = P(...J[2]), e = P(...J[3]), m = f => a.map((v, i) => v + (e[i] - v) * f), r = (band.r ?? 0.034) * t, w = 0.035;
    out.lofts.push({ sides: 6, up: [0, 0, 1], rings: [[-w, 0.6], [-w / 2, 1], [w / 2, 1], [w, 0.6]].map(([d, f]) => ({ at: m(band.at + d), rx: r * f, ry: r * f, bone: b[2], colour: band.colour })) });
  }
  return out;
}

/** The four legs on a torso: hind and fore each { len, thick, ... } (leg's own options), the hips and shoulders set at the
 *  heights those lengths reach from (make the torso with `stance(hind.len, fore.len)`). */
export function fourLegs(body, hind, fore = hind) {
  const out = [];
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const hip = body.hip(s), sh = body.shoulder(s);
    out.push(leg("hind", tag, s, [hip[0] * (hind.spread ?? 1), 0.37 * hind.len, hip[2]], { ...hind, parent: "pelvis" }), leg("fore", tag, s, [sh[0] * (fore.spread ?? 1), 0.34 * fore.len, sh[2]], { ...fore, parent: "chest" }));
  }
  return out;
}
