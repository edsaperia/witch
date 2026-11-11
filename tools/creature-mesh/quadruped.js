// A four-legged animal as a low-poly mesh on a real skeleton, built from a species' plan (its own file beside this one): a trial of
// creatures drawn in code as hard-edged polygons on bones, rather than as the generator's melted ellipsoids (Ed, 2026-11-11: "Is
// there no way that you can draw things yourself, instead of using an image generator?"). tools/creature-mesh/make.mjs writes it
// out as a .glb for tools/creature-bake/bake.mjs.
// The model: y up, its head along +z (glTF's forward), metres. A plan gives joints (named points), bones (joint to joint, each
// with its parent), lofts (rings along a path, each ring riding one bone, joined into faceted tubes), cones (ears, tufts) and
// armour (patches of a loft's skin raised into plate, with lit runes).
// A ring or cone marked `glow` is drawn unlit, in a second material named "glow" (fox-fire, a lit eye): the bake keeps it bright.
import * as THREE from "three";

const V = p => new THREE.Vector3(...p);

/** A plan's skeleton: bones at their joints, named, parented. */
function skeleton(plan) {
  const bones = {}, list = [];
  for (const [name, at, parent] of plan.bones) {
    const b = new THREE.Bone(); b.name = name; b.userData.at = V(at);
    b.position.copy(parent ? V(at).sub(bones[parent].userData.at) : V(at));
    if (parent) bones[parent].add(b);
    bones[name] = b; list.push(b);
  }
  return { bones, list };
}

/** Collects flat-shaded triangles: each corner its own vertex, with its colour and the one bone it rides. */
class Faces {
  constructor(index) { this.index = index; this.lit = { pos: [], col: [], skin: [] }; this.glow = { pos: [], col: [], skin: [] }; }
  // (a face glows if its first corner does: fox-fire, an eye; drawn unlit, in its own group)
  tri(a, b, c) { const to = a.glow ? this.glow : this.lit; for (const v of [a, b, c]) { to.pos.push(v.p.x, v.p.y, v.p.z); const k = new THREE.Color(v.c); to.col.push(k.r, k.g, k.b); to.skin.push(this.index[v.bone]); } }
  quad(a, b, c, d) { this.tri(a, b, c); this.tri(a, c, d); }
  geometry() {
    const pos = [...this.lit.pos, ...this.glow.pos], col = [...this.lit.col, ...this.glow.col], skin = [...this.lit.skin, ...this.glow.skin];
    const g = new THREE.BufferGeometry(), n = skin.length, si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) { si[i * 4] = skin[i]; sw[i * 4] = 1; }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    g.addGroup(0, this.lit.skin.length, 0); if (this.glow.skin.length) g.addGroup(this.lit.skin.length, this.glow.skin.length, 1);
    g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute("skinWeight", new THREE.Float32BufferAttribute(sw, 4));
    g.computeVertexNormals(); // (no shared corners, so every face is flat)
    return g;
  }
}

/** A loft: rings { at, rx, ry, bone, colour } along a path, `sides` corners each, joined ring to ring and closed at both ends.
 *  A ring's plane is square to the path there; `up` picks its ry direction (rx is across). colour may be (angle 0..1 from the
 *  top, going round) => colour, so a ring can be one colour above and another below. */
function loft(faces, rings, sides, up = [0, 1, 0]) {
  const made = rings.map((r, i) => {
    const here = V(r.at), prev = V(rings[Math.max(0, i - 1)].at), next = V(rings[Math.min(rings.length - 1, i + 1)].at);
    const t = next.sub(prev).normalize(), u0 = V(r.up ?? up), s = new THREE.Vector3().crossVectors(u0, t).normalize(), u = new THREE.Vector3().crossVectors(t, s).normalize();
    return Array.from({ length: sides }, (_, k) => {
      const a = (k + (r.turn ?? 0.5)) / sides * Math.PI * 2, frac = k / sides; // (turn 0.5: a flat on top, a corner each side)
      return { p: here.clone().addScaledVector(s, Math.sin(a) * r.rx).addScaledVector(u, Math.cos(a) * r.ry), c: typeof r.colour === "function" ? r.colour(Math.cos(a), Math.sin(a), frac) : r.colour, bone: r.bone, glow: !!r.glow };
    });
  });
  // (faces wound to look outward, whichever way the path and its frame happen to turn)
  const mids = made.map(ring => ring.reduce((m, v) => m.add(v.p), new THREE.Vector3()).multiplyScalar(1 / sides));
  const widest = made.reduce((best, ring, i) => (ring[0].p.distanceTo(mids[i]) > made[best][0].p.distanceTo(mids[best]) ? i : best), 0), j = Math.min(widest, made.length - 2);
  const n0 = new THREE.Vector3().crossVectors(made[j + 1][0].p.clone().sub(made[j][0].p), made[j][1].p.clone().sub(made[j][0].p)), out = n0.dot(made[j][0].p.clone().add(made[j][1].p).multiplyScalar(0.5).sub(mids[j])) >= 0;
  for (let i = 0; i + 1 < made.length; i++) for (let k = 0; k < sides; k++) { const a = made[i][k], b = made[i][(k + 1) % sides], c = made[i + 1][(k + 1) % sides], d = made[i + 1][k]; out ? faces.quad(a, d, c, b) : faces.quad(a, b, c, d); }
  for (const [ring, last] of [[made[0], false], [made[made.length - 1], true]]) { // the ends, as fans
    const mid = { p: ring.reduce((m, v) => m.add(v.p), new THREE.Vector3()).multiplyScalar(1 / sides), c: ring[0].c, bone: ring[0].bone, glow: ring[0].glow };
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
 *  inset (each facet drawn in that share from its edges: a stripe), glow (drawn unlit: a line of light and not a plate),
 *  runes { colour, round (which facets carry them), size (of the facet, 0..1), every, seed, w (a stroke's width), max (to a plate) }: a lit mark
 *  on each plate's facets, drawn unlit like fox-fire. */
function armour(faces, made, o) {
  const sides = made[0].length, N = made.length - 1, { from = 0, to = N, round = [0, 1.7], side = 0, thick = 0.014, step = 0.006, lames = 1, colour, rim = colour, runes, inset = 0, glow = false } = o;
  const mids = made.map(r => r.reduce((m, v) => m.add(v.p), new THREE.Vector3()).multiplyScalar(1 / sides));
  // (a facet's angle from the top, and which side it's on: facet k lies between corners k and k + 1)
  const ang = k => { const a = ((k + 1) % sides) / sides * Math.PI * 2; return a > Math.PI + 1e-6 ? [Math.PI * 2 - a, -1] : [a, a < 1e-6 || Math.abs(a - Math.PI) < 1e-6 ? 0 : 1]; };
  const within = (k, r) => { const [a, s] = ang((k + sides) % sides); return a >= r[0] - 1e-6 && a <= r[1] + 1e-6 && (!side || !s || s === side); }, on = k => within(k, round);
  const at = (t, h) => { const i = Math.min(N - 1, Math.max(0, Math.floor(t + 1e-9))), u = t - i, mid = mids[i].clone().lerp(mids[i + 1], u), skin = made[i].map((v, k) => v.p.clone().lerp(made[i + 1][k].p, u));
    return { mid, bone: (u < 0.5 ? made[i] : made[i + 1])[0].bone, skin, out: skin.map(p => p.clone().add(p.clone().sub(mid).normalize().multiplyScalar(h))) }; };
  const vert = (p, c, bone, glow = false) => ({ p, c, bone, glow });
  // (a quad wound to face away from `ref`)
  const away = (a, b, c, d, ref) => { const n = b.p.clone().sub(a.p).cross(d.p.clone().sub(a.p)), m = a.p.clone().add(b.p).add(c.p).add(d.p).multiplyScalar(0.25); n.dot(m.sub(ref)) >= 0 ? faces.quad(a, b, c, d) : faces.quad(a, d, c, b); };
  for (let j = 0; j < lames; j++) {
    const a = from + (to - from) * j / lames, b = from + (to - from) * (j + 1) / lames, ts = [a]; for (let i = Math.floor(a) + 1; i < b - 1e-6; i++) ts.push(i); ts.push(b);
    const h = t => thick + step * (1 - (t - a) / (b - a)), st = ts.map(t => at(t, h(t)));
    for (let n = 0; n + 1 < st.length; n++) for (let k = 0; k < sides; k++) if (on(k)) {
      // (the facet's four corners, outside and on the skin; `inset` draws each facet in from its neighbours, a stripe and not a sheet)
      const r = st[n], f = st[n + 1], k1 = (k + 1) % sides, core = r.mid.clone().lerp(f.mid, 0.5), e = (ring, w) => ring[k].clone().lerp(ring[k1], w);
      const ro = [e(r.out, inset), e(r.out, 1 - inset)], fo = [e(f.out, inset), e(f.out, 1 - inset)], rs = [e(r.skin, inset), e(r.skin, 1 - inset)], fs = [e(f.skin, inset), e(f.skin, 1 - inset)];
      const cell = [...ro, ...fo, ...rs, ...fs].reduce((m, v) => m.add(v), new THREE.Vector3()).multiplyScalar(1 / 8);
      away(vert(ro[0], colour, r.bone, glow), vert(ro[1], colour, r.bone, glow), vert(fo[1], colour, f.bone, glow), vert(fo[0], colour, f.bone, glow), core);
      const wall = (p, q, pb, ps, qs, qb) => away(vert(p, rim, pb, glow), vert(q, rim, qb, glow), vert(qs, rim, qb, glow), vert(ps, rim, pb, glow), cell);
      if (inset || !on(k - 1)) wall(ro[0], fo[0], r.bone, rs[0], fs[0], f.bone);
      if (inset || !on(k + 1)) wall(ro[1], fo[1], r.bone, rs[1], fs[1], f.bone);
      if (n === 0) wall(ro[0], ro[1], r.bone, rs[0], rs[1], r.bone);
      if (n === st.length - 2) wall(fo[0], fo[1], f.bone, fs[0], fs[1], f.bone);
    }
    if (!runes) continue;
    for (let k = 0; k < sides; k++) if (on(k) && within(k, runes.round ?? round) && (j * 3 + k) % (runes.every ?? 1) === 0) {
      const k1 = (k + 1) % sides, S = (t, v) => { const s = at(Math.min(b, Math.max(a, t)), h(t) + 0.004); return { p: s.out[k].clone().lerp(s.out[k1], v), mid: s.mid, bone: s.bone }; };
      const wide = S((a + b) / 2, 0).p.distanceTo(S((a + b) / 2, 1).p), long = S(a, 0.5).p.distanceTo(S(b, 0.5).p), s = (runes.size ?? 0.62) * Math.min(wide, long), dt = s / long * (b - a), dv = s / wide, w = runes.w ?? Math.max(0.006, s * 0.13);
      const count = Math.max(1, Math.min(runes.max ?? 2, Math.floor(long / (s * 1.7)))), flip = ((k + 1) % sides) / sides > 0.5 ? 1 : -1;
      for (let c = 0; c < count; c++) {
        const tc = a + (b - a) * (c + 0.5) / count, G = RUNES[(j * 5 + k * 3 + c * 2 + (runes.seed ?? 0)) % RUNES.length], pt = (gx, gy) => S(tc + (gx - 0.5) * dt, 0.5 + flip * (gy - 0.5) * dv);
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
  loft(faces, [{ ...o, colour: o.colour, glow: o.glow === true }, { ...mid, bone: o.bone, colour: o.tipColour ?? o.colour, up: o.up, glow: !!o.glow }, { at: o.tip, rx: 0.0005, ry: 0.0005, bone: o.bone, colour: o.tipColour ?? o.colour, up: o.up, glow: !!o.glow }], o.sides ?? 4, o.up ?? [0, 0, 1]);
}

/** The gait as a looping clip: each leg's joints swing by its phase (stance back, swing forward with the joints folding), the
 *  body bobs and sways, the head counters, the tail trails. plan.gait: { seconds, duty, legs: [{ bones: [upper, lower, foot],
 *  phase, swing, fold: [lower, foot] }], bob, sway, tails: [[...bones], ...], tailSwing }. */
function gaitClip(plan, bones, name = "Walk", steps = 24) {
  const G = plan.gait, T = G.seconds, times = Array.from({ length: steps + 1 }, (_, i) => (i / steps) * T), tracks = [];
  const rot = (bone, f) => { const v = []; for (const t of times) { const [x = 0, y = 0, z = 0] = f((t / T) % 1); const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, "YXZ")); v.push(q.x, q.y, q.z, q.w); } tracks.push(new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`, times, v)); };
  const ease = s => s * s * (3 - 2 * s), TAU = Math.PI * 2;
  for (const leg of G.legs ?? []) {
    const [upper, lower, foot] = leg.bones, [foldLower, foldFoot] = leg.fold, d = G.duty;
    const cyc = u => (u + leg.phase) % 1, sw = u => { const c = cyc(u); return c < d ? null : (c - d) / (1 - d); };
    // (a leg hangs down: turning it about x by +a carries the foot back, so forward is negative)
    rot(upper, u => { const c = cyc(u), s = sw(u); return [s === null ? -leg.swing + 2 * leg.swing * (c / d) : leg.swing - 2 * leg.swing * ease(s) + (leg.lift ?? 0) * Math.sin(Math.PI * s)]; });
    rot(lower, u => { const s = sw(u); return [s === null ? 0 : foldLower * Math.sin(Math.PI * s)]; });
    rot(foot, u => { const s = sw(u), c = cyc(u); return [s === null ? (leg.push ?? 0) * Math.max(0, (c / d - 0.6) / 0.4) : foldFoot * Math.sin(Math.PI * Math.min(1, s * 1.15))]; });
  }
  const S = G.sway ?? 0.05, B = G.bob ?? 0.008, K = G.rock ?? 0; // (rock: the whole back pitching once a stride, a bound's)
  if (G.hips) rot(G.hips, u => [K * Math.sin(TAU * u + (G.rockAt ?? 0)), S * Math.sin(TAU * u), (G.roll ?? 0.03) * Math.sin(TAU * u + 1)]);
  if (G.chest) rot(G.chest, u => [0.02 * Math.sin(TAU * 2 * u + 1) - K * 1.6 * Math.sin(TAU * u + (G.rockAt ?? 0) + 0.5), -S * 1.6 * Math.sin(TAU * u), -(G.roll ?? 0.03) * Math.sin(TAU * u + 1.4)]);
  if (G.neck) rot(G.neck, u => [K * 0.6 * Math.sin(TAU * u + (G.rockAt ?? 0) + 0.5) + 0.035 * Math.sin(TAU * 2 * u + 2.2), S * 0.5 * Math.sin(TAU * u), 0]);
  if (G.head) rot(G.head, u => [-0.03 * Math.sin(TAU * 2 * u + 2.2), S * 0.4 * Math.sin(TAU * u), 0]);
  (G.tails ?? (G.tail ? [G.tail] : [])).forEach((chain, n) => chain.forEach((b, i) => rot(b, u => [0.05 * Math.sin(TAU * 2 * u - i * 0.9 + n * 1.3), (G.tailSwing ?? 0.14) * Math.sin(TAU * u - 0.8 - i * 0.7 + n * 0.8), 0]))); // (each tail a little out of step with the last)
  for (const e of G.ears ?? []) rot(e, u => [0.05 * Math.sin(TAU * 2 * u + 3), 0, 0]);
  // (anything else that moves: { bone, rot: u => [x, y, z] } or { bone, pos: u => [dx, dy, dz] } from where it rests)
  for (const e of G.extra ?? []) { if (e.rot) rot(e.bone, e.rot); if (e.pos) { const b = bones[e.bone], v = []; for (const t of times) { const d = e.pos((t / T) % 1); v.push(b.position.x + d[0], b.position.y + d[1], b.position.z + d[2]); } tracks.push(new THREE.VectorKeyframeTrack(`${e.bone}.position`, times, v)); } }
  const bobs = G.bobs ?? 2, root = bones[G.root], y0 = root.position.y, pv = []; for (const t of times) pv.push(root.position.x, y0 + B * Math.sin(TAU * bobs * (t / T) + 0.6), root.position.z);
  tracks.push(new THREE.VectorKeyframeTrack(`${G.root}.position`, times, pv));
  return new THREE.AnimationClip(name, T, tracks);
}

/** The plan built: { scene, clips }. */
export function build(plan) {
  const { bones, list } = skeleton(plan), faces = new Faces(Object.fromEntries(list.map((b, i) => [b.name, i])));
  const made = plan.lofts.map(l => loft(faces, l.rings, l.sides ?? 6, l.up));
  for (const c of plan.cones ?? []) cone(faces, c);
  // (armour lies on a loft's own corners: `on` names the loft, or counts to it; the first is a four-legged plan's skin)
  for (const a of plan.armour ?? []) { const i = typeof a.on === "string" ? plan.lofts.findIndex(l => l.name === a.on) : a.on ?? 0; if (i < 0) throw Error(`${plan.name}: no loft "${a.on}" for armour`); armour(faces, made[i], a); }
  const body = new THREE.MeshStandardMaterial({ name: "body", vertexColors: true, roughness: 1, metalness: 0, flatShading: true }), glow = new THREE.MeshBasicMaterial({ name: "glow", vertexColors: true });
  const mesh = new THREE.SkinnedMesh(faces.geometry(), [body, glow]);
  mesh.name = plan.name; const root = list[0]; mesh.add(root); mesh.updateMatrixWorld(true); mesh.bind(new THREE.Skeleton(list));
  const scene = new THREE.Scene(); scene.add(mesh);
  return { scene, clips: plan.gait ? [gaitClip(plan, bones)] : [] };
}
