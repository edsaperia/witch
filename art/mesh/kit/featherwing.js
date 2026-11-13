// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the winged kinds (docs/plans/creature-mesh-rollout.md, batch F).

// (turns as art/mesh/shape.js's pose makes them: nine numbers by rows, y then x then z)
export const turnOf = (x, y, z) => { const cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z); return [cy * cz + sy * sx * sz, sy * sx * cz - cy * sz, sy * cx, cx * sz, cx * cz, -sx, cy * sx * sz - sy * cz, sy * sz + cy * sx * cz, cy * cx]; };
export const times = (a, b) => [0, 1, 2].flatMap(r => [0, 1, 2].map(c => a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c]));
export const flipped = m => [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
export const eulerOf = m => [Math.asin(Math.max(-1, Math.min(1, -m[5]))), Math.atan2(m[2], m[8]), Math.atan2(m[3], m[4])];
export const turned = (A, v) => [A[0] * v[0] + A[1] * v[1] + A[2] * v[2], A[3] * v[0] + A[4] * v[1] + A[5] * v[2], A[6] * v[0] + A[7] * v[1] + A[8] * v[2]];

/** A bird's wing on three bones (wing<tag>1 the upper arm, 2 the forearm, 3 the hand), from its `shoulder`. It is laid out
 *  spread, flat and level: a blade of small feathers along each bone, a row of secondaries
 *  behind the forearm and a fan of long primaries off the hand. Then each bone's part is carried, whole, to where it lies
 *  folded: the upper arm up and back to the top of its back, the forearm hung from there down its flank (so the secondaries lie
 *  back along its side), the hand back along its belly's line with the primaries towards its tail, the whole of it against the bird's
 *  side and tipped to its body's slope (`tilt`); that is how the plan draws it, so it stands and walks with its wings shut.
 *  `fly` gives the turns that open it again and beat it.
 *  o: span (shoulder to the hand's end, spread; the primaries reach past it), chord (its depth front to back), parent, tilt,
 *  primaries and secondaries (how many), colours { coat (the small feathers), flight, tip (the flight feathers' ends), under },
 *  lit (a colour: the primaries' points burn with it, a legend's), fold { roll, at: [three angles back from straight out] }. */
export function featherwing(tag, s, shoulder, o = {}) {
  const { span = 0.8, chord = 0.3, parent = "chest", tilt = 0, primaries = 5, secondaries = 4, colours: C, lit, thick = 0.006 } = o, F = { roll: 1.35, at: [2.3, 0.15, 1.5], ...o.fold };
  const names = [1, 2, 3].map(i => `wing${tag}${i}`), sw = [0.3, -0.25, 0.25], long = [0.26, 0.36, 0.2].map(v => v * span);
  const dir = a => [s * Math.cos(a), 0, -Math.sin(a)], add = (p, d, l) => p.map((v, i) => v + d[i] * l), lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const J = [shoulder]; for (let i = 0; i < 3; i++) J.push(add(J[i], dir(sw[i]), long[i]));
  const top = cy => (cy > 0 ? C.coat : C.under ?? C.coat), pieces = [[], [], []], up = [0, 1, 0];
  // the small feathers: a flat blade along each bone, its front edge the bone
  [[0.6, 0.85], [0.85, 0.75], [0.75, 0.4]].forEach(([w0, w1], i) => { const back = dir(sw[i] + Math.PI / 2), ring = (t, w) => ({ at: add(lerp(J[i], J[i + 1], t), back, w * chord * 0.5), rx: w * chord * 0.5 / 0.707, ry: thick, colour: top, up });
    pieces[i].push({ loft: { sides: 4, up, rings: [ring(-0.04, w0), ring(0.5, (w0 + w1) / 2), ring(1.04, w1)] } }); });
  const feather = (i, base, a, len, wide, n, colour = C.flight) => pieces[i].push({ cone: { at: [base[0], base[1] + (n % 2 ? 0.004 : -0.002), base[2]], rx: wide, ry: thick, tip: add(base, dir(a), len), colour, tipColour: C.tip ?? colour, split: 0.6, bulge: 0.92, up, sides: 4 } });
  for (let j = 0; j < secondaries; j++) { const t = (j + 0.5) / secondaries; feather(1, add(lerp(J[1], J[2], t), dir(sw[1] + Math.PI / 2), chord * 0.6), sw[1] + Math.PI / 2 - 0.12 - 0.2 * t, chord * 0.62, long[1] / secondaries * 0.8, j); }
  for (let j = 0; j < primaries; j++) { const f = primaries > 1 ? j / (primaries - 1) : 1, base = add(lerp(J[2], J[3], f * 0.9), dir(sw[2] + Math.PI / 2), chord * 0.25 * (1 - f));
    feather(2, base, sw[2] + 0.1 + 0.6 * (1 - f), span * (0.36 + 0.12 * f), span * 0.05, j); if (lit) Object.assign(pieces[2][pieces[2].length - 1].cone, { tipColour: lit, glow: "tip" }); }
  // folded: each bone's own turn from where it lies spread, and where its joint comes to
  const W = sw.map((a, i) => times(times(turnOf(-tilt, 0, 0), turnOf(0, 0, -s * F.roll)), turnOf(0, s * (F.at[i] - a), 0))), Jf = [shoulder];
  for (let i = 0; i < 3; i++) Jf.push(add(Jf[i], turned(W[i], J[i + 1].map((v, k) => v - J[i][k])), 1));
  const carry = i => p => add(Jf[i], turned(W[i], p.map((v, k) => v - J[i][k])), 1), lofts = [], cones = [];
  pieces.forEach((list, i) => { const to = carry(i), u = turned(W[i], up), bone = names[i];
    for (const p of list) { if (p.loft) lofts.push({ ...p.loft, up: u, rings: p.loft.rings.map(r => ({ ...r, at: to(r.at), up: u, bone })) }); else cones.push({ ...p.cone, at: to(p.cone.at), tip: to(p.cone.tip), up: u, bone }); } });
  /** The turns that open it and beat it, for a gait's `extra`: K the turn its body is given in flight (so the wings open level
   *  whatever its body does), mid and amp (how high it is held and how far it beats, radians), lag (each bone later than the
   *  last), beats a cycle. It beats from level upward: a wing below level, on the side nearer us, would be drawn under the
   *  ground its sprite stands on. */
  const fly = ({ K = turnOf(0, 0, 0), mid = 0.64, amp = 0.4, lag = 0.35, beats = 1, phase = 0, sweep = 0 } = {}) => { const Kt = flipped(K), T = Math.PI * 2;
    const G = (i, u) => times(times(turnOf(0, s * sweep * i, 0), turnOf(0, 0, s * (mid + amp * Math.sin(T * beats * u + phase - lag * i)))), flipped(W[i]));
    return names.map((bone, i) => ({ bone, rot: u => eulerOf(i ? times(flipped(G(i - 1, u)), G(i, u)) : times(Kt, G(0, u))) })); };
  return { bones: names.map((n, i) => [n, Jf[i], i ? names[i - 1] : parent]), lofts, cones, names, fly };
}
