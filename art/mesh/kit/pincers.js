// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z).
// Added with the many-legged kinds (docs/plans/creature-mesh-rollout.md, batch G: "six, eight and fourteen legs; pincers, a sting").

const unit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); }, add = (p, d, k) => p.map((v, j) => v + d[j] * k);
/** A pincer on an arm: from `at` on the body an arm goes `out` (any way, [x, y, z]) to its elbow, then a hand swells along `fwd`
 *  and ends in two fingers, one fixed and one hinged (it opens `open` radians, towards `gape`: the way its hinged finger lifts
 *  off the other). Three bones: arm, claw (the hand, at the elbow) and nip (the hinged finger) + tag; turn `nip` to snap it.
 *  l1, l2: the arm's and the hand's lengths; size: the hand's girth (a share of l2); finger: the fingers' length (a share of
 *  l2); colours { arm, hand, finger, tip }; glow lights the fingers' points. Returns its pieces and names. */
export function pincer(tag, at, o) {
  const { out = [1, 0, 0], fwd = [0, 0, 1], gape = [0, 1, 0], l1 = 0.1, l2 = 0.12, size = 0.3, finger = 0.8, open = 0.35, thick = 0.2, parent, colours: C, glow = false, sides = 6 } = o;
  const d1 = unit(out), d2 = unit(fwd), g = unit(gape), b = ["arm", "claw", "nip"].map(x => x + tag), E = add(at, d1, l1), W = add(E, d2, l2), R = size * l2, side = unit([d2[1] * g[2] - d2[2] * g[1], d2[2] * g[0] - d2[0] * g[2], d2[0] * g[1] - d2[1] * g[0]]);
  const lofts = [{ sides: 4, up: g, rings: [[-0.1, 0.8], [0.5, 1], [1, 0.8]].map(([f, k]) => ({ at: add(at, d1, l1 * f), rx: thick * l1 * k, ry: thick * l1 * k, bone: b[0], colour: C.arm, up: g })) },
    // (the hand: fattest a third along, flattened a little the way it gapes)
    { sides, up: g, rings: [[-0.05, 0.4], [0.2, 0.85], [0.5, 1], [0.8, 0.9], [1, 0.6]].map(([f, k]) => ({ at: add(E, d2, l2 * f), rx: R * k, ry: R * k * 0.8, bone: b[1], colour: C.hand ?? C.arm, up: g })) }];
  // its fingers: the fixed one on from the hand's lower half, the hinged one from its upper, lifted open
  const F = finger * l2, hinge = add(W, g, R * 0.35), base = add(W, g, -R * 0.3), lift = [d2[0] * Math.cos(open) + g[0] * Math.sin(open), d2[1] * Math.cos(open) + g[1] * Math.sin(open), d2[2] * Math.cos(open) + g[2] * Math.sin(open)];
  const cones = [{ at: base, rx: R * 0.5, ry: R * 0.38, tip: add(add(base, d2, F), g, R * 0.25), bend: g.map(v => -v * F * 0.12), bulge: 0.65, bone: b[1], colour: C.finger ?? C.hand ?? C.arm, tipColour: C.tip ?? C.finger ?? C.hand ?? C.arm, glow: glow ? "tip" : false, up: side, sides: 4 },
    { at: hinge, rx: R * 0.45, ry: R * 0.34, tip: add(add(hinge, lift, F * 0.95), g, -R * 0.1), bend: g.map(v => v * F * 0.14), bulge: 0.65, bone: b[2], colour: C.finger ?? C.hand ?? C.arm, tipColour: C.tip ?? C.finger ?? C.hand ?? C.arm, glow: glow ? "tip" : false, up: side, sides: 4 }];
  return { bones: [[b[0], at, parent], [b[1], E, b[0]], [b[2], hinge, b[1]]], lofts, cones, names: b, side };
}
