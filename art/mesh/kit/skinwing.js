// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F).

/** A bat's wing on two bones (wing<tag>1 the arm, from its `shoulder` to its wrist; wing<tag>2 the hand): skin stretched from
 *  its flank to its arm and between three long fingers, a thumb's claw at the wrist. Drawn spread, as it flies. o: arm and hand
 *  (their lengths), back (how far down its flank the skin is joined on), parent, colours { skin, under, bone (its arm and
 *  fingers), claw }, ribs: { colour, glow } (its fingers lit, a legend's). `flap` gives a gait's `extra` that beats it, `wrap`
 *  the turns that fold it round its body asleep. */
export function skinwing(tag, s, shoulder, o = {}) {
  const { arm = 0.3, hand = 0.42, back = 0.3, parent = "chest", colours: C, ribs, thick = 0.004, lift = 0.22 } = o, names = [`wing${tag}1`, `wing${tag}2`];
  const unit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); }, add = (p, d, l = 1) => p.map((v, i) => v + d[i] * l), mid = (a, b) => a.map((v, i) => (v + b[i]) / 2), sub = (a, b) => a.map((v, i) => v - b[i]), cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const wrist = add(shoulder, unit([s * 0.85, lift, 0.32]), arm), tips = [[0.97, 0.06, -0.12, 1], [0.66, -0.04, -0.72, 0.96], [0.2, -0.1, -1, 0.8]].map(([x, y, z, f]) => add(wrist, unit([s * x, y, z]), hand * f)), flank = add(shoulder, [-s * 0.02, -0.03, -back]);
  const skin = cy => (cy > 0 ? C.skin : C.under ?? C.skin), lofts = [], cones = [];
  // a sheet of skin between two edges (each a pair of points): a flat tube from the middle of the one to the middle of the other
  const sheet = ([a, b], [c, d], bones) => { const m0 = mid(a, b), m1 = mid(c, d), n = unit(cross(sub(m1, m0), sub(b, a))), up = n[1] < 0 ? n.map(v => -v) : n;
    lofts.push({ sides: 4, up, rings: [[m0, a, b, bones[0]], [m1, c, d, bones[1]]].map(([m, p, q, bone]) => ({ at: m, rx: Math.max(0.002, Math.hypot(...sub(q, p)) / 2 / 0.707), ry: thick, bone, up, colour: skin, plain: true })) }); };
  sheet([shoulder, flank], [wrist, tips[2]], [parent, names[0]]);
  sheet([wrist, add(wrist, sub(tips[1], wrist), 0.04)], [tips[0], tips[1]], [names[1], names[1]]); sheet([wrist, add(wrist, sub(tips[2], wrist), 0.04)], [tips[1], tips[2]], [names[1], names[1]]);
  const rod = (a, b, bone, r, colour, glow = false) => lofts.push({ sides: 4, up: [0, 1, 0], rings: [[a, 1], [mid(a, b), 0.8], [b, 0.35]].map(([p, f]) => ({ at: [p[0], p[1] + thick, p[2]], rx: r * f, ry: r * f, bone, colour, glow, plain: true })) });
  rod(shoulder, wrist, names[0], arm * 0.07, C.bone ?? C.skin);
  for (const t of tips) rod(wrist, t, names[1], hand * 0.022, ribs?.colour ?? C.bone ?? C.skin, !!ribs?.glow);
  cones.push({ at: wrist, rx: arm * 0.04, ry: arm * 0.04, tip: add(wrist, unit([s * 0.2, 0.5, 0.8]), arm * 0.22), bone: names[0], colour: C.claw ?? C.bone ?? C.skin, up: [0, 1, 0], sides: 3 });
  const T = Math.PI * 2;
  return { bones: [[names[0], shoulder, parent], [names[1], wrist, names[0]]], lofts, cones, names, wrist, tips,
    flap: ({ mid: m = 0.1, amp = 0.75, lag = 0.9, beats = 1, phase = 0 } = {}) => [{ bone: names[0], rot: u => [0, 0, s * (m + amp * Math.sin(T * beats * u + phase))] }, { bone: names[1], rot: u => [0, s * 0.12 * Math.cos(T * beats * u + phase), s * (amp * 0.75 * Math.sin(T * beats * u + phase - lag) - 0.1)] }],
    wrap: (rots, { arm: a = [0.3, 1.0, -1.0], hand: h = [0, 1.5, -0.3] } = {}) => { rots[names[0]] = [a[0], s * a[1], s * a[2]]; rots[names[1]] = [h[0], s * h[1], s * h[2]]; } };
}
