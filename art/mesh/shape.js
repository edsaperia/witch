// A creature as a low-poly mesh on a real skeleton, built from a species' plan (its own file, art/mesh/species/<id>.js): hard-edged
// polygons on bones, drawn in code (Ed, 2026-11-11: "Is there no way that you can draw things yourself, instead of using an image
// generator?"; 2026-11-12: "I'm happy with these models, let's do the real build"). No three.js here: the game's art workers
// turn a shape into sprites themselves (art/mesh/raster.js), and tools/creature-mesh/ writes one out as a .glb.
// The model: y up, its head along +z (glTF's forward), metres. A plan gives joints (named points), bones (joint to joint, each
// with its parent), lofts (rings along a path, each ring riding one bone, joined into faceted tubes), cones (ears, tufts) and
// armour (patches of a loft's skin raised into plate, with lit runes).
// A ring or cone marked `glow` is drawn unlit (fox-fire, a lit eye): its faces are kept apart, and stay bright in the dark.
import { V3 } from "./vec.js";


const V = p => new V3(...p);

// What a creature's size is not measured by (the game sizes an animal by its body: docs/notes/creatures.md, the size candidate):
// anything riding these bones, and every cone (ears, tufts, spines, claws) and armour plate. The rest is its `core`.
const FRILL = /^(tail|wing|ant|ear|orbit|stalk)/;
// What has no coat to texture (art/mesh/raster.js `texture`): wings, feelers and eye stalks; and every cone and armour plate, and
// any ring marked `plain`. The rest of its lofts, tails too, are its `skin`.
const BARE = /^(wing|ant|orbit|stalk)/;

/** A colour, hex or already [r, g, b], as [r, g, b], 0 to 255. */
const rgb = c => { if (Array.isArray(c)) return c; const h = c.replace("#", ""), f = h.length === 3 ? [...h].map(x => x + x).join("") : h; return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)]; };

/** Collects flat-shaded triangles: each corner its own point, with its colour and the one bone it rides. `tag` marks what a
 *  face is where the game needs to know (an eye). */
class Faces {
  constructor(index) { this.index = index; this.lit = { pos: [], col: [], bone: [], core: [], tag: [], skin: [] }; this.glow = { pos: [], col: [], bone: [], core: [], tag: [], skin: [] }; }
  // (a face glows if its first corner does: fox-fire, an eye; drawn unlit, in its own group)
  tri(a, b, c) { const to = a.glow ? this.glow : this.lit; for (const v of [a, b, c]) { to.pos.push(v.p.x, v.p.y, v.p.z); to.col.push(...rgb(v.c)); to.bone.push(this.index[v.bone]); to.core.push(v.core ? 1 : 0); } to.tag.push(a.tag ?? ""); to.skin.push(a.skin ? 1 : 0); }
  quad(a, b, c, d) { this.tri(a, b, c); this.tri(a, c, d); }
}

/** A loft: rings { at, rx, ry, bone, colour } along a path, `sides` corners each, joined ring to ring and closed at both ends.
 *  A ring's plane is square to the path there; `up` picks its ry direction (rx is across). colour may be (angle 0..1 from the
 *  top, going round) => colour, so a ring can be one colour above and another below. */
function loft(faces, rings, sides, up = [0, 1, 0], core = true, fine = 1) {
  const made = rings.map((r, i) => {
    const here = V(r.at), prev = V(rings[Math.max(0, i - 1)].at), next = V(rings[Math.min(rings.length - 1, i + 1)].at);
    const t = next.sub(prev).normalize(), u0 = V(r.up ?? up), s = new V3().crossVectors(u0, t).normalize(), u = new V3().crossVectors(t, s).normalize();
    return Array.from({ length: sides }, (_, k) => {
      const a = (k + (r.turn ?? 0.5) * fine) / sides * Math.PI * 2, frac = k / sides; // (turn 0.5: a flat on top, a corner each side; `fine` times the sides, the corners it had before keep their places)
      return { p: here.clone().addScaledVector(s, Math.sin(a) * r.rx).addScaledVector(u, Math.cos(a) * r.ry), c: typeof r.colour === "function" ? r.colour(Math.cos(a), Math.sin(a), frac) : r.colour, bone: r.bone, glow: !!r.glow, tag: r.tag, core: core && !FRILL.test(r.bone), skin: core && !r.plain && !BARE.test(r.bone) };
    });
  });
  // (faces wound to look outward, whichever way the path and its frame happen to turn)
  const mids = made.map(ring => ring.reduce((m, v) => m.add(v.p), new V3()).multiplyScalar(1 / sides));
  const widest = made.reduce((best, ring, i) => (ring[0].p.distanceTo(mids[i]) > made[best][0].p.distanceTo(mids[best]) ? i : best), 0), j = Math.min(widest, made.length - 2);
  const n0 = new V3().crossVectors(made[j + 1][0].p.clone().sub(made[j][0].p), made[j][1].p.clone().sub(made[j][0].p)), out = n0.dot(made[j][0].p.clone().add(made[j][1].p).multiplyScalar(0.5).sub(mids[j])) >= 0;
  for (let i = 0; i + 1 < made.length; i++) for (let k = 0; k < sides; k++) { const a = made[i][k], b = made[i][(k + 1) % sides], c = made[i + 1][(k + 1) % sides], d = made[i + 1][k]; out ? faces.quad(a, d, c, b) : faces.quad(a, b, c, d); }
  for (const [ring, last] of [[made[0], false], [made[made.length - 1], true]]) { // the ends, as fans
    const mid = { p: ring.reduce((m, v) => m.add(v.p), new V3()).multiplyScalar(1 / sides), c: ring[0].c, bone: ring[0].bone, glow: ring[0].glow, tag: ring[0].tag, core: ring[0].core, skin: ring[0].skin };
    for (let k = 0; k < sides; k++) last === out ? faces.tri(mid, ring[(k + 1) % sides], ring[k]) : faces.tri(mid, ring[k], ring[(k + 1) % sides]);
  }
  return made;
}

// Rune shapes for armour: made-up marks of a few straight strokes each, [x0, y0, x1, y1] in a unit square, y towards the spine.
const RUNES = [
  [[0.35, 0, 0.35, 1], [0.35, 1, 0.8, 0.62], [0.35, 0.55, 0.8, 0.2]],
  [[0.15, 0, 0.5, 1], [0.5, 1, 0.85, 0]],
  [[0.35, 0, 0.35, 1], [0.35, 0.8, 0.8, 0.5], [0.8, 0.5, 0.35, 0.2]],
  [[0.12, 0.5, 0.5, 1], [0.5, 1, 0.88, 0.5], [0.88, 0.5, 0.5, 0], [0.5, 0, 0.12, 0.5]],
  [[0.15, 0, 0.85, 1], [0.15, 1, 0.85, 0]],
  [[0.22, 0, 0.22, 1], [0.78, 0, 0.78, 1], [0.22, 0.68, 0.78, 0.32]],
  [[0.4, 0, 0.4, 1], [0.4, 1, 0.8, 0.6]],
  [[0.15, 0.1, 0.85, 0.1], [0.5, 0.1, 0.5, 1]],
];

/** Armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing
 *  runes"): a patch of a loft's own skin raised into plate. `made` is the loft's corners (what `loft` returns). o: from, to (the
 *  rings it runs between, counted along the loft; fractions fall between rings), round [a0, a1] (the facets it covers by their
 *  angle from the top, radians, both sides; side 1 or -1 for one flank only), thick, lames (it's cut into that many plates along
 *  its length, each one's rear edge standing `step` proud of the next, as a lobster's tail), colour, rim (its edges' colour),
 *  inset (each facet drawn in that share from its edges: a stripe, or with `gap`, the same along it, every facet its own plate with
 *  the skin showing between), flare (its lower edge stands that much further off the body: a pauldron's lip), glow (drawn unlit:
 *  a line of light and not a plate),
 *  runes { colour, round (which facets carry them), size (of the facet, 0..1), every, seed, w (a stroke's width), max (to a plate) }: a lit mark
 *  on each plate's facets, drawn unlit like fox-fire. */
function armour(faces, made, o, m = 1) {
  // (m: how many of the loft's corners stand where one did before its sides were multiplied, shape's `fine`: a plate, a stripe
  // and a rune keep the facets they were drawn for, each now a run of m narrower ones)
  const fineSides = made[0].length, sides = fineSides / m, N = made.length - 1, { from = 0, to = N, round = [0, 1.7], side = 0, thick = 0.014, step = 0.006, lames = 1, colour, rim = colour, runes, inset = 0, gap = 0, flare = 0, glow = false } = o;
  const mids = made.map(r => r.reduce((mid, v) => mid.add(v.p), new V3()).multiplyScalar(1 / fineSides));
  // (a facet's angle from the top, and which side it's on: facet k lies between the corners k and k + 1 of the unmultiplied ring)
  const ang = k => { const a = ((k + 1) % sides) / sides * Math.PI * 2; return a > Math.PI + 1e-6 ? [Math.PI * 2 - a, -1] : [a, a < 1e-6 || Math.abs(a - Math.PI) < 1e-6 ? 0 : 1]; };
  const within = (k, r) => { const [a, s] = ang((k + sides) % sides); return a >= r[0] - 1e-6 && a <= r[1] + 1e-6 && (!side || !s || s === side); }, on = k => within(k, round);
  // (how far down the plate a corner lies, 0 at its upper edge to 1 at its lower: what `flare` lifts)
  const low = j => { const a = ((j + 0.5 * m) / fineSides * Math.PI * 2) % (Math.PI * 2), f = a > Math.PI ? Math.PI * 2 - a : a; return Math.min(1, Math.max(0, (f - round[0]) / Math.max(1e-6, round[1] - round[0]))); };
  const at = (t, h) => { const i = Math.min(N - 1, Math.max(0, Math.floor(t + 1e-9))), u = t - i, mid = mids[i].clone().lerp(mids[i + 1], u), skin = made[i].map((v, k) => v.p.clone().lerp(made[i + 1][k].p, u));
    return { mid, bone: (u < 0.5 ? made[i] : made[i + 1])[0].bone, skin, out: skin.map((p, k) => p.clone().add(p.clone().sub(mid).normalize().multiplyScalar(h * (1 + flare * low(k))))) }; };
  // (a point across facet K of a ring of corners, v 0..1 from its one edge to its other, along its m narrow facets; and the facet's
  // edge as a run of points, drawn in by `inset` at each end)
  const across = (ring, K, v) => { const x = Math.min(m - 1e-9, Math.max(0, v * m)), i = Math.floor(x); return ring[(K * m + i) % fineSides].clone().lerp(ring[(K * m + i + 1) % fineSides], x - i); };
  const run = (ring, K) => { const pts = [across(ring, K, inset)]; for (let i = 1; i < m; i++) if (i / m > inset + 1e-6 && i / m < 1 - inset - 1e-6) pts.push(ring[(K * m + i) % fineSides].clone()); pts.push(across(ring, K, 1 - inset)); return pts; };
  const vert = (p, c, bone, lit = false) => ({ p, c, bone, glow: lit });
  // (a quad wound to face away from `ref`)
  const away = (a, b, c, d, ref) => { const n = b.p.clone().sub(a.p).cross(d.p.clone().sub(a.p)), mid = a.p.clone().add(b.p).add(c.p).add(d.p).multiplyScalar(0.25); n.dot(mid.sub(ref)) >= 0 ? faces.quad(a, b, c, d) : faces.quad(a, d, c, b); };
  for (let j = 0; j < lames; j++) {
    const a0 = from + (to - from) * j / lames, b0 = from + (to - from) * (j + 1) / lames, a = a0 + (b0 - a0) * gap, b = b0 - (b0 - a0) * gap, ts = [a]; for (let i = Math.floor(a) + 1; i < b - 1e-6; i++) ts.push(i); ts.push(b);
    const h = t => thick + step * (1 - (t - a) / (b - a)), st = ts.map(t => at(t, h(t)));
    for (let n = 0; n + 1 < st.length; n++) for (let K = 0; K < sides; K++) if (on(K)) {
      const r = st[n], f = st[n + 1], core = r.mid.clone().lerp(f.mid, 0.5), ro = run(r.out, K), fo = run(f.out, K), rs = run(r.skin, K), fs = run(f.skin, K), last = ro.length - 1;
      const cell = [...ro, ...fo, ...rs, ...fs].reduce((mid, v) => mid.add(v), new V3()).multiplyScalar(1 / (4 * ro.length));
      const wall = (p, q, ps, qs, pb, qb) => away(vert(p, rim, pb, glow), vert(q, rim, qb, glow), vert(qs, rim, qb, glow), vert(ps, rim, pb, glow), cell);
      for (let i = 0; i < last; i++) {
        away(vert(ro[i], colour, r.bone, glow), vert(ro[i + 1], colour, r.bone, glow), vert(fo[i + 1], colour, f.bone, glow), vert(fo[i], colour, f.bone, glow), core);
        if (n === 0) wall(ro[i], ro[i + 1], rs[i], rs[i + 1], r.bone, r.bone);
        if (n === st.length - 2) wall(fo[i], fo[i + 1], fs[i], fs[i + 1], f.bone, f.bone);
      }
      if (inset || !on(K - 1)) wall(ro[0], fo[0], rs[0], fs[0], r.bone, f.bone);
      if (inset || !on(K + 1)) wall(ro[last], fo[last], rs[last], fs[last], r.bone, f.bone);
    }
    if (!runes) continue;
    for (let K = 0; K < sides; K++) if (on(K) && within(K, runes.round ?? round) && (j * 3 + K) % (runes.every ?? 1) === 0) {
      const S = (t, v) => { const s = at(Math.min(b, Math.max(a, t)), h(t) + 0.004); return { p: across(s.out, K, v), mid: s.mid, bone: s.bone }; };
      const wide = S((a + b) / 2, 0).p.distanceTo(S((a + b) / 2, 1).p), long = S(a, 0.5).p.distanceTo(S(b, 0.5).p), s = (runes.size ?? 0.62) * Math.min(wide, long), dt = s / long * (b - a), dv = s / wide, w = runes.w ?? Math.max(0.006, s * 0.13);
      const count = Math.max(1, Math.min(runes.max ?? 2, Math.floor(long / (s * 1.7)))), flip = ((K + 1) % sides) / sides > 0.5 ? 1 : -1;
      for (let c = 0; c < count; c++) {
        const tc = a + (b - a) * (c + 0.5) / count, G = RUNES[(j * 5 + K * 3 + c * 2 + (runes.seed ?? 0)) % RUNES.length], pt = (gx, gy) => S(tc + (gx - 0.5) * dt, 0.5 + flip * (gy - 0.5) * dv);
        for (const [x0, y0, x1, y1] of G) for (let q = 0; q < 2; q++) {
          const P0 = pt(x0 + (x1 - x0) * q / 2, y0 + (y1 - y0) * q / 2), P1 = pt(x0 + (x1 - x0) * (q + 1) / 2, y0 + (y1 - y0) * (q + 1) / 2), d = P1.p.clone().sub(P0.p), out = P0.p.clone().add(P1.p).multiplyScalar(0.5).sub(P0.mid).normalize();
          const sv = d.clone().cross(out).normalize().multiplyScalar(w / 2), e = d.clone().normalize().multiplyScalar(w * 0.3), v = (p, sgn, end) => vert(p.clone().addScaledVector(sv, sgn).addScaledVector(e, end), runes.colour, P0.bone, true);
          const A = v(P0.p, 1, -1), B = v(P1.p, 1, 1), C = v(P1.p, -1, 1), D = v(P0.p, -1, -1); faces.quad(A, B, C, D); faces.quad(A, D, C, B);
        }
      }
    }
  }
}

/** A cone: a base ring { at, rx, ry, up } and a tip, for ears, cheek tufts and claws. tipColour for the last part of it; bulge and
 *  bend shape it into a lock of fur. */
function cone(faces, o) {
  // (bulge: its middle kept that full, so it's a leaf or a lock of fur and not a needle; bend: its middle pushed that way, so it curves)
  const k = o.bulge ?? 1 - (o.split ?? 0.6), mid = { at: V(o.at).lerp(V(o.tip), o.split ?? 0.6).add(V(o.bend ?? [0, 0, 0])).toArray(), rx: o.rx * k, ry: o.ry * k };
  // (glow "tip": only its outer half is lit, a spine's burning point)
  loft(faces, [{ ...o, colour: o.colour, glow: o.glow === true }, { ...mid, bone: o.bone, colour: o.tipColour ?? o.colour, up: o.up, glow: !!o.glow, tag: o.tag }, { at: o.tip, rx: 0.0005, ry: 0.0005, bone: o.bone, colour: o.tipColour ?? o.colour, up: o.up, glow: !!o.glow, tag: o.tag }], o.sides ?? 4, o.up ?? [0, 0, 1], false);
}

/** How a creature gets about, its plan's `gait.type` (Ed, 2026-11-12: "many small creatures bound rather than trot"): "walk" (one
 *  foot after another, three on the ground), "trot" (its legs in diagonal pairs), "bound" (hind legs together, then fore: its back
 *  gathering and stretching, and a moment in the air after each push), "glide" (no legs: a snail) or "fly" (off the ground: a bee). */
export const GAIT_TYPES = ["walk", "trot", "bound", "glide", "fly"];

/** A legless creature's going as a looping clip (a snail's glide, a bee's hover): the body bobs and sways, the head counters, the
 *  tail trails. plan.gait: { type (GAIT_TYPES), seconds, bob, bobs, sway, tails: [[...bones], ...], tailSwing, extra }. One with
 *  legs goes by `strides`, below. */
function motion(plan) {
  const G = plan.gait, rots = new Map(), poss = new Map();
  const rot = (bone, f) => rots.set(bone, f);
  const TAU = Math.PI * 2, S = G.sway ?? 0.05, B = G.bob ?? 0.008;
  if (G.hips) rot(G.hips, u => [0, S * Math.sin(TAU * u), (G.roll ?? 0.03) * Math.sin(TAU * u + 1)]);
  if (G.chest) rot(G.chest, u => [0.02 * Math.sin(TAU * 2 * u + 1), -S * 1.6 * Math.sin(TAU * u), -(G.roll ?? 0.03) * Math.sin(TAU * u + 1.4)]);
  if (G.neck) rot(G.neck, u => [0.035 * Math.sin(TAU * 2 * u + 2.2), S * 0.5 * Math.sin(TAU * u), 0]);
  if (G.head) rot(G.head, u => [-0.03 * Math.sin(TAU * 2 * u + 2.2), S * 0.4 * Math.sin(TAU * u), 0]);
  (G.tails ?? (G.tail ? [G.tail] : [])).forEach((chain, n) => chain.forEach((b, i) => rot(b, u => [0.05 * Math.sin(TAU * 2 * u - i * 0.9 + n * 1.3), (G.tailSwing ?? 0.14) * Math.sin(TAU * u - 0.8 - i * 0.7 + n * 0.8), 0]))); // (each tail a little out of step with the last)
  for (const e of G.ears ?? []) rot(e, u => [0.05 * Math.sin(TAU * 2 * u + 3), 0, 0]);
  // (anything else that moves: { bone, rot: u => [x, y, z] } or { bone, pos: u => [dx, dy, dz] } from where it rests)
  for (const e of G.extra ?? []) { if (e.rot) rot(e.bone, e.rot); if (e.pos) poss.set(e.bone, e.pos); }
  const bobs = G.bobs ?? 2; poss.set(G.root, u => [0, B * Math.sin(TAU * bobs * u + 0.6), 0]);
  // (aloft: a legless pace that flies, a bird's fast one, kit/bird.js: `grounded` carries it that much higher than it stands; lift: it is in the air, about that far, for whoever asks)
  return { seconds: G.seconds, rots, poss, ...(G.aloft !== undefined ? { aloft: G.aloft, lift: () => G.air ?? 0.05 } : {}) };
}

// ---- Turns as nine numbers (rows), the way `pose` holds them: what a leg's joints are worked out with.
const turnOf = (x, y, z) => { const cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z); return [cy * cz + sy * sx * sz, sy * sx * cz - cy * sz, sy * cx, cx * sz, cx * cz, -sx, cy * sx * sz - sy * cz, sy * sz + cy * sx * cz, cy * cx]; }; // (y, then x, then z)
const anglesOf = L => [Math.asin(Math.max(-1, Math.min(1, -L[5]))), Math.atan2(L[2], L[8]), Math.atan2(L[3], L[4])];
const times = (A, B) => { const o = new Array(9); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) o[r * 3 + c] = A[r * 3] * B[c] + A[r * 3 + 1] * B[3 + c] + A[r * 3 + 2] * B[6 + c]; return o; };
const flipped = A => [A[0], A[3], A[6], A[1], A[4], A[7], A[2], A[5], A[8]];
const turned = (A, v) => [A[0] * v[0] + A[1] * v[1] + A[2] * v[2], A[3] * v[0] + A[4] * v[1] + A[5] * v[2], A[6] * v[0] + A[7] * v[1] + A[8] * v[2]];
const minus = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], long = v => Math.hypot(v[0], v[1], v[2]), unit = v => { const l = long(v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }, dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** A frame whose y lies along `v`, its x kept as near the animal's own side-to-side as it can be (columns x, y, z). */
const frameOf = v => { const y = unit(v), k = y[0], x = unit([1 - k * y[0], -k * y[1], -k * y[2]]), z = cross(x, y); return [x[0], y[0], z[0], x[1], y[1], z[1], x[2], y[2], z[2]]; };
/** The turn that carries a bone drawn along `from` to lie along `to`, without twisting it about itself. */
const aim = (from, to) => times(frameOf(to), flipped(frameOf(from)));

/** What a pace's body does where its gait doesn't say (a gait's `body`; kit/gaits.js gives each way of going its own). Lengths
 *  are shares of its hips' height, turns radians. */
const BODY = { bob: 0.04, pitch: 0.02, roll: 0.03, sway: 0.02, yaw: 0.04, flex: 0, head: 0.7, tail: 1, lag: 0.09, wag: 0.1, crouch: 0.03 };

/** A legged creature's going as a looping clip, its feet planted (Ed, 2026-11-12, of the walk clip: "the feet don't plant, and the
 *  bodies seem rigid"). The clip is the animal seen from beside it as it goes: the ground passes back under it one `stride` a
 *  cycle. A paw on the ground is a point of that ground: it comes down ahead, stays where it is on the ground for its stance (so
 *  it goes back under the body at exactly the body's pace, in a straight line, whatever the body does above it), then lifts and
 *  swings forward. The leg's joints are found from the paw's place, not turned by a clock: hip (or shoulder) to hock by the two
 *  bones between, the bone below the hock leaning as the heel rises, the toes flat on the ground; where that isn't reach enough the hip
 *  or shoulder itself gives towards the paw (`give`, a share of the leg's height: a shoulder blade's slide).
 *  G (the plan's gait, with the pace's own numbers over it: `paced`): { type (GAIT_TYPES), seconds, duty (the share of the cycle a
 *  foot is down), legs: [{ bones: [upper, lower, foot], phase }], reach (a stance's length on the ground, a share of the hips'
 *  height), step (how high a swinging paw lifts, the same share), heel [as it lands, as it leaves, folded mid-swing] (how far the
 *  bone above the paw leans, radians), toe (how far a swinging paw droops), leap (how high it goes when no foot is down, the
 *  same share), gather (a bound's: where in the cycle its back is most gathered), tails, body: BODY's numbers }.
 *  The body, by its gait: a walk and a trot bob twice a cycle (a walk vaults over each forefoot, a trot sinks onto each pair),
 *  pitch a little, and roll and sway over the feet that are down; a bound rises and falls once, pitching nose up off its hind
 *  feet and down onto its fore, its back gathering as its hind feet land and stretching as they push. The head turns back most
 *  of what the body under it turns (`head`), so it stays steadier; each joint of a tail does what the hips did a moment before
 *  (`lag` of the cycle a joint), so it follows. */
function strides(plan, G, ctx) {
  const rots = new Map(), poss = new Map(), TAU = Math.PI * 2, B = { ...BODY, ...G.body }, wrap = v => ((v % 1) + 1) % 1;
  const at = Object.fromEntries(plan.bones.map(([n, p]) => [n, p])), parent = Object.fromEntries(plan.bones.map(([n, , p]) => [n, p]));
  const legs = G.legs.map(l => { const [a, b, c] = l.bones, paw = plan.bones.find(x => x[2] === c)?.[0]; if (!paw) throw Error(`${plan.name}: leg ${a} has no paw below ${c}`);
    const r1 = minus(at[b], at[a]), r2 = minus(at[c], at[b]), r3 = minus(at[paw], at[c]), whole = minus(at[c], at[a]), w = unit(whole), k = dot(r1, w);
    return { ...l, names: [a, b, c, paw], on: parent[a], duty: l.duty ?? G.duty ?? 0.5, r1, r2, r3, l1: long(r1), l2: long(r2), l3: long(r3), bend: unit(minus(r1, [w[0] * k, w[1] * k, w[2] * k])), high: at[a][1] - at[paw][1], give: (l.give ?? G.give ?? 0.3) * (at[a][1] - at[paw][1]), u: NaN, got: null }; });
  for (const k of ["bob", "pitch", "roll", "sway", "yaw", "flex", "wag"]) B[k] *= G.lively ?? 1; // (a baby's body moves more, a legend's less)
  // (H: its shorter legs' height, what its body's own movements are shares of; mean: its legs' height taken together, what its
  // stance is a share of; a bound leaps by its hind legs' height, and each paw lifts by its own leg's: a hare's are not its forelegs')
  const H = Math.min(...legs.map(l => l.high)), mean = legs.reduce((s, l) => s + l.high, 0) / legs.length, d = legs[0].duty, bounds = G.type === "bound";
  // how far a paw goes along the ground in its stance: what the gait asks, or as far as its shortest leg can reach from both ends
  const reach = Math.min((G.reach ?? 0.6) * mean, ...legs.map(l => { const far = (l.l1 + l.l2 + l.l3 * 0.8) * 0.97 + l.give * 0.8, up = l.high - (B.crouch + (bounds ? 0 : Math.abs(B.bob) * 0.5)) * H, half = Math.sqrt(Math.max(0, far * far - up * up)); return 2 * (half - Math.abs(at[l.names[3]][2] + (l.fwd ?? 0) * H - at[l.names[0]][2])) * 0.8; }));
  const stride = reach / d, heel = G.heel ?? [-0.12, 0.5, 0.55], toe = G.toe ?? 0.5, step = G.step ?? 0.16;
  // when no foot is down it is in the air: each such stretch of the cycle an arc, the longest `leap` high and a shorter one lower
  const down = u => legs.some(l => wrap(u + l.phase) < l.duty), N = 240, airs = [], leap = (G.leap ?? 0) * legs[0].high;
  if (leap > 0) { let start = -1; for (let i = 0; i < N; i++) if (down(i / N)) { start = i; break; }
    if (start >= 0) for (let i = 0, from = -1; i <= N; i++) { const u = (start + i) / N, on = i === N || down(u % 1); if (!on && from < 0) from = u; if (on && from >= 0) { airs.push([from, u]); from = -1; } } }
  const longest = Math.max(1e-6, ...airs.map(([a, b]) => b - a));
  const lift = u0 => { const u = wrap(u0); for (const [a, b] of airs) for (const v of [u, u + 1]) if (v > a && v < b) return leap * ((b - a) / longest) * Math.sin(Math.PI * (v - a) / (b - a)); return 0; };

  // ---- the body
  const hindL = legs[0], foreL = legs.find(l => l.on !== hindL.on) ?? hindL, um = d / 2 - hindL.phase, uf = d / 2 - foreL.phase, land = -hindL.phase, gatherAt = G.gather ?? land - 0.06;
  // (how far down each foot's stance is, summed: a body sinks onto the feet that carry it)
  const sink = u => legs.reduce((s, l) => { const c = wrap(u + l.phase); return s + (c < l.duty ? Math.sin(Math.PI * c / l.duty) : 0); }, 0) / legs.length;
  const low = B.crouch * H; // (how much lower it carries itself going than standing)
  const height = bounds ? u => lift(u) - B.bob * H * sink(u) * 2 - low
    : G.type === "walk" ? u => B.bob * H * (Math.cos(2 * TAU * (u - uf)) - 1) / 2 - low // (a walk: highest as it vaults over each forefoot)
    : u => lift(u) - B.bob * H * (1 - Math.cos(2 * TAU * (u - land))) / 2 - low; // (a trot: lowest in the middle of each pair's stance)
  const g = u => Math.cos(TAU * (u - gatherAt)); // (a bound's back: 1 gathered, -1 stretched)
  const pitch = bounds ? u => -B.pitch * Math.sin(TAU * (u - land) - 0.3) : u => B.pitch * Math.sin(2 * TAU * (u - um));
  const side = u => Math.cos(TAU * (u - um)); // (1: over its left hind foot, in the middle of that foot's stance)
  const hipsTurn = u => [pitch(u) - B.flex * g(u), B.yaw * Math.sin(TAU * (u - um)), B.roll * side(u)];
  const loinTurn = u => [B.flex * 0.7 * g(u), -B.yaw * 0.5 * Math.sin(TAU * (u - um)), 0];
  const chestTurn = u => [B.flex * 1.1 * g(u) - pitch(u) * 0.6, -B.yaw * Math.sin(TAU * (u - um)), -B.roll * 1.3 * side(u)];
  const spine = [G.hips, parent[G.chest] !== G.hips && parent[G.chest] ? parent[G.chest] : null, G.chest];
  if (G.hips) rots.set(G.hips, hipsTurn);
  if (spine[1]) rots.set(spine[1], loinTurn);
  if (G.chest) rots.set(G.chest, chestTurn);
  // the head: most of what the body under it turns, turned back, half at the neck and half at the skull
  const under = u => { const a = G.hips ? hipsTurn(u) : [0, 0, 0], b = spine[1] ? loinTurn(u) : [0, 0, 0], c = G.chest ? chestTurn(u) : [0, 0, 0]; return [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]]; };
  const counter = k => u => { const t = under(u); return [-t[0] * B.head * k, -t[1] * B.head * k, -t[2] * B.head * k]; };
  if (G.neck) rots.set(G.neck, counter(0.5));
  if (G.head) rots.set(G.head, counter(G.neck ? 0.5 : 1));
  // its tails: each joint where the hips were a moment before (`lag` a joint), so a turn or a rise runs down it late; a slow wag on top
  const hipsUp = u => height(u) / H;
  (G.tails ?? (G.tail ? [G.tail] : [])).forEach((chain, n) => chain.forEach((b, i) => rots.set(b, u => { const a = hipsTurn(u - B.lag * (i + 1)), was = hipsTurn(u - B.lag * i), up = hipsUp(u - B.lag * i) - hipsUp(u - B.lag * (i + 1));
    return [B.tail * (a[0] - was[0]) - B.tail * (i ? 0.25 : 0.6) * up, B.tail * (a[1] - was[1]) + B.wag * Math.sin(TAU * (u - um) - 0.8 - i * TAU * B.lag + n * 0.8), 0]; })));
  for (const e of G.ears ?? []) rots.set(e, u => [0.06 * Math.sin(TAU * (bounds ? 1 : 2) * (u - land) + 2.4), 0, 0]); // (ears: a flop behind each landing)
  for (const e of G.extra ?? []) { if (e.rot) rots.set(e.bone, e.rot); if (e.pos) poss.set(e.bone, e.pos); }
  for (const [name, , p] of plan.bones) if (!p) poss.set(name, () => [0, ctx.rest, 0]); // (stood on the ground: `grounded` says how high)
  const rootWas = poss.get(G.root); poss.set(G.root, u => { const p = rootWas?.(u) ?? [0, 0, 0]; return [p[0] + B.sway * H * side(u), p[1] + height(u), p[2]]; });

  // ---- the legs
  /** A body bone's place at `u` (a leg hangs from it): its turn, and where its joint is. Legs' own bones are never asked. */
  const memo = new Map(), world = (name, u) => { let m = memo.get(name); if (m && m.u === u) return m; const p = parent[name], r = rots.get(name)?.(u) ?? [0, 0, 0], L = turnOf(r[0], r[1], r[2]), dp = poss.get(name)?.(u) ?? [0, 0, 0];
    if (!p) m = { u, R: L, T: [at[name][0] + dp[0], at[name][1] + dp[1], at[name][2] + dp[2]] };
    else { const P = world(p, u), o = turned(P.R, [at[name][0] - at[p][0] + dp[0], at[name][1] - at[p][1] + dp[1], at[name][2] - at[p][2] + dp[2]]); m = { u, R: times(P.R, L), T: [P.T[0] + o[0], P.T[1] + o[1], P.T[2] + o[2]] }; }
    memo.set(name, m); return m; };
  const lean = (v, a) => { const c = Math.cos(a), s = Math.sin(a); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; };
  /** A leg's four turns at `u` (hip, knee, hock, paw: each [x, y, z] from its parent), from where its paw is then. */
  const solve = (leg, u) => {
    if (leg.u === u) return leg.got;
    const c = wrap(u + leg.phase), [, , , pawName] = leg.names, rest = at[pawName], mid = rest[2] + (leg.fwd ?? 0) * H, ground = rest[1] + ctx.rest; let p, phi, droop = 0;
    if (c < leg.duty) { const t = c / leg.duty; p = [rest[0], ground, mid + reach * (0.5 - t)]; phi = heel[0] + (heel[1] - heel[0]) * t * t; }
    else { const s = (c - leg.duty) / (1 - leg.duty), e = s * s * (3 - 2 * s), arc = Math.sin(Math.PI * s); p = [rest[0], ground + step * leg.high * arc + lift(u) * 0.9, mid - reach / 2 + reach * e]; phi = heel[1] + (heel[0] - heel[1]) * s + heel[2] * arc; droop = toe * arc; }
    const W = world(leg.on, u), o = turned(W.R, minus(at[leg.names[0]], at[leg.on])), most = (leg.l1 + leg.l2) * 0.995, least = Math.abs(leg.l1 - leg.l2) + 1e-4;
    let hip = [W.T[0] + o[0], W.T[1] + o[1], W.T[2] + o[2]];
    // the hock, above the paw: leant further towards the hip while the two bones above can't reach it
    let hock, D, far;
    for (let n = 0; ; n++) { const up = lean([-leg.r3[0], -leg.r3[1], -leg.r3[2]], phi); hock = [p[0] + up[0], p[1] + up[1], p[2] + up[2]]; D = minus(hock, hip); far = long(D); if (far <= most || n >= 14) break; phi += 0.07 * Math.sign(hip[2] - p[2] || 1); }
    // further than they reach still: the hip or the shoulder itself gives towards the paw (a shoulder blade slides on the ribs; a
    // leg drawn standing straight, as a foreleg is, has no other slack), by no more than the leg's `give`
    let slid = [0, 0, 0];
    if (far > most) { const k = Math.min(far - most, leg.give) / far; slid = [D[0] * k, D[1] * k, D[2] * k]; hip = [hip[0] + slid[0], hip[1] + slid[1], hip[2] + slid[2]]; D = minus(hock, hip); far = long(D); }
    if (far > most + 1e-9 || far < least) { const k = Math.min(most, Math.max(least, far)) / far; D = [D[0] * k, D[1] * k, D[2] * k]; far *= k; const was = hock; hock = [hip[0] + D[0], hip[1] + D[1], hip[2] + D[2]]; p = [p[0] + hock[0] - was[0], p[1] + hock[1] - was[1], p[2] + hock[2] - was[2]]; } // (out of reach all the same: the paw is dragged, and tools/creature-mesh/slip.mjs says by how much)
    const dir = [D[0] / far, D[1] / far, D[2] / far], bk = dot(leg.bend, dir), b = unit([leg.bend[0] - dir[0] * bk, leg.bend[1] - dir[1] * bk, leg.bend[2] - dir[2] * bk]), a = (leg.l1 * leg.l1 - leg.l2 * leg.l2 + far * far) / (2 * far), h = Math.sqrt(Math.max(0, leg.l1 * leg.l1 - a * a));
    const knee = [hip[0] + dir[0] * a + b[0] * h, hip[1] + dir[1] * a + b[1] * h, hip[2] + dir[2] * a + b[2] * h];
    const R1 = aim(leg.r1, minus(knee, hip)), R2 = aim(leg.r2, minus(hock, knee)), R3 = aim(leg.r3, minus(p, hock)), R4 = turnOf(droop, 0, 0);
    leg.u = u; leg.slid = turned(flipped(W.R), slid); leg.got = [anglesOf(times(flipped(W.R), R1)), anglesOf(times(flipped(R1), R2)), anglesOf(times(flipped(R2), R3)), anglesOf(times(flipped(R3), R4))];
    return leg.got;
  };
  for (const leg of legs) { leg.names.forEach((name, i) => rots.set(name, u => solve(leg, u)[i])); poss.set(leg.names[0], u => (solve(leg, u), leg.slid)); }
  return { seconds: G.seconds, rots, poss, lift, planted: true, stride, reach, feet: legs.map(l => ({ paw: l.names[3], phase: l.phase, duty: l.duty })) };
}

/** A plan's gait at a pace: "walk" (going slowly) or "run" (going fast). A gait with `paces` has each pace's own numbers, laid
 *  over what the paces share (a pace's `body` over the shared `body`); one without goes the one way at any pace. */
export function paced(G, pace = "walk") {
  const P = G?.paces?.[pace]; if (!P) return G;
  return { ...G, ...P, body: { ...G.body, ...P.body } };
}

/** A still pose that breathes (art/mesh/gear.js `napping`): each bone's turn and shift held, its chest and its root rising and
 *  falling once a cycle (u 0 out, 0.5 in). */
function still(S) {
  const rots = new Map(), poss = new Map(), breath = u => (1 - Math.cos(Math.PI * 2 * u)) / 2;
  for (const [bone, r] of Object.entries(S.rots)) rots.set(bone, bone === S.chest ? u => [r[0] - 0.03 * breath(u), r[1], r[2]] : () => r);
  if (S.chest && !rots.has(S.chest)) rots.set(S.chest, u => [-0.03 * breath(u), 0, 0]);
  for (const [bone, p] of Object.entries(S.poss)) poss.set(bone, bone === S.root ? u => [p[0], p[1] + 0.006 * breath(u), p[2]] : () => p);
  if (S.root && !poss.has(S.root)) poss.set(S.root, u => [0, 0.006 * breath(u), 0]);
  return { seconds: 3, rots, poss };
}

/** The plan built: { name, bones: [{ name, parent (its place in the list, -1 for the root), at }], lit and glow (each { pos, col,
 *  bone, core, tag }: a triangle's three corners in turn, their colours 0..255, the bone each rides, whether each is part of its
 *  body proper (what its size is measured by), and a tag and whether it is coat a triangle), and motion:
 *  { seconds, rots, poss }: for a bone's name, (u) => [x, y, z], its turn (radians, applied y then x then z) or its shift from
 *  where it rests, u the walk's cycle 0..1; null if the plan has no gait }. */
export function shape(plan, pace = "walk") {
  const index = Object.fromEntries(plan.bones.map(([name], i) => [name, i])), faces = new Faces(index);
  const bones = plan.bones.map(([name, at, parent]) => ({ name, parent: parent ? index[parent] : -1, at: [...at] }));
  bones.forEach((b, i) => { if (b.parent >= i) throw Error(`${plan.name}: bone ${b.name} comes before its parent`); });
  // (plan.fine: every tube of six sides or more is given that many times as many, so it's rounder: Ed, 2026-11-12, "texture, twice the sides")
  const fines = plan.lofts.map(l => ((l.sides ?? 6) >= 6 ? plan.fine ?? 1 : 1)), made = plan.lofts.map((l, i) => loft(faces, l.rings, (l.sides ?? 6) * fines[i], l.up, true, fines[i]));
  for (const c of plan.cones ?? []) cone(faces, c);
  // (armour lies on a loft's own corners: `on` names the loft, or counts to it; the first is a four-legged plan's skin)
  for (const a of plan.armour ?? []) { const i = typeof a.on === "string" ? plan.lofts.findIndex(l => l.name === a.on) : a.on ?? 0; if (i < 0) throw Error(`${plan.name}: no loft "${a.on}" for armour`); armour(faces, made[i], a, fines[i]); }
  const G = plan.gait ? paced(plan.gait, pace) : null, ctx = { rest: 0 }, legged = !plan.still && !!G?.legs?.length;
  const sh = grounded({ name: plan.name, bones, lit: faces.lit, glow: faces.glow, motion: plan.still ? still(plan.still) : legged ? strides(plan, G, ctx) : G ? motion({ ...plan, gait: G }) : null, gait: G, pace, hover: plan.hover ?? 0, still: !!plan.still }, ctx);
  // (its planted feet, for whoever checks them: the paw's bone, and when in the cycle it is down)
  if (legged) { sh.stride = sh.motion.stride; sh.feet = sh.motion.feet.map(f => ({ ...f, paw: index[f.paw] })); }
  return sh;
}

/** Stands a shape on the ground through its whole clip (Ed's playtest, 2026-11-12: "animals appear to float above the ground"):
 *  wherever it is in its walk or its sleep, the lowest point of its legs (of all of it, if it has none or is lying down) is on the
 *  ground, y 0, or as far above it as its gait's leap has it then. Its root is shifted up or down to make that so, whatever its
 *  bones are doing. A flyer (hover) is left hanging where its plan put it. `sh.rest`: the same for it standing still, no clip. */
function grounded(sh, ctx = {}) {
  if (sh.hover) return sh;
  const legs = sh.still ? [] : sh.gait?.legs ?? [], on = new Set();
  if (legs.length) sh.bones.forEach((b, i) => { if (on.has(b.parent) || legs.some(l => l.bones[0] === b.name)) on.add(i); });
  const pos = [...sh.lit.pos, ...sh.glow.pos], bone = [...sh.lit.bone, ...sh.glow.bone];
  if (!bone.length) return sh;
  // (the lowest point of its legs, or of all of it: `whole`)
  const lowest = (s, u, whole = !on.size) => { const { R, T } = pose(s, u); let lo = Infinity; for (let v = 0; v < bone.length; v++) { const b = bone[v]; if (!whole && !on.has(b)) continue; const a = s.bones[b].at, y = R[b * 9 + 3] * (pos[v * 3] - a[0]) + R[b * 9 + 4] * (pos[v * 3 + 1] - a[1]) + R[b * 9 + 5] * (pos[v * 3 + 2] - a[2]) + T[b * 3 + 1]; if (y < lo) lo = y; } return lo; };
  // (what of it hangs lower than its feet as it stands, a hedgehog's skirt of spines, a fat dormouse's belly, a mole's spades: that
  // is what rests on the ground, and its feet stay that much above it, as its plan drew them)
  const bare = { ...sh, motion: null }, sag = Math.min(0, lowest(bare, 0, true) - lowest(bare, 0)), roots = sh.bones.filter(b => b.parent < 0).map(b => b.name);
  sh.rest = ctx.rest = -lowest(bare, 0) - sag;
  if (!sh.motion || sh.motion.planted) return sh; // (a strider's feet are put on the ground one by one: `strides`)
  // (a walker's flying pace: where it stands, and `aloft` higher (or lower: long legs trailed behind it), its wings free to beat below it)
  if (sh.motion.aloft !== undefined) { for (const name of roots) { const was = sh.motion.poss.get(name); sh.motion.poss.set(name, u => { const p = was?.(u) ?? [0, 0, 0]; return [p[0], p[1] + sh.rest + sh.motion.aloft, p[2]]; }); } return sh; }
  const free = { ...sh, motion: { ...sh.motion, poss: new Map(sh.motion.poss) } }, memo = new Map(), lift = sh.motion.lift ?? (() => 0);
  const shift = u => { let d = memo.get(u); if (d === undefined) { if (memo.size > 512) memo.clear(); memo.set(u, (d = lift(u) - lowest(free, u) - sag)); } return d; };
  for (const name of roots) { const was = free.motion.poss.get(name); sh.motion.poss.set(name, u => { const p = was?.(u) ?? [0, 0, 0]; return [p[0], p[1] + shift(u), p[2]]; }); }
  return sh;
}

/** Every bone's place in the world at `u` of the walk (null: standing still, as its plan drew it, on the ground): for each, nine
 *  numbers of its turn (rows) and three of where its joint is. */
export function pose(sh, u) {
  const n = sh.bones.length, R = new Float64Array(n * 9), T = new Float64Array(n * 3), M = u === null ? null : sh.motion;
  sh.bones.forEach((b, i) => {
    const [x = 0, y = 0, z = 0] = M?.rots.get(b.name)?.(u) ?? [], d = M?.poss.get(b.name)?.(u) ?? (u === null && b.parent < 0 ? [0, sh.rest ?? 0, 0] : [0, 0, 0]), p = b.parent;
    const cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z);
    // (y, then x, then z: three.js's "YXZ")
    const L = [cy * cz + sy * sx * sz, sy * sx * cz - cy * sz, sy * cx, cx * sz, cx * cz, -sx, cy * sx * sz - sy * cz, sy * sz + cy * sx * cz, cy * cx];
    const o = p < 0 ? b.at : b.at.map((v, j) => v - sh.bones[p].at[j]), t = [o[0] + d[0], o[1] + d[1], o[2] + d[2]];
    if (p < 0) { R.set(L, i * 9); T.set(t, i * 3); return; }
    const P = R.subarray(p * 9, p * 9 + 9);
    for (let r = 0; r < 3; r++) { for (let c = 0; c < 3; c++) R[i * 9 + r * 3 + c] = P[r * 3] * L[c] + P[r * 3 + 1] * L[3 + c] + P[r * 3 + 2] * L[6 + c]; T[i * 3 + r] = T[p * 3 + r] + P[r * 3] * t[0] + P[r * 3 + 1] * t[1] + P[r * 3 + 2] * t[2]; }
  });
  return { R, T };
}
