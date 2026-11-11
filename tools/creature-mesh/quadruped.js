// A four-legged animal as a low-poly mesh on a real skeleton, built from a species' plan (its own file beside this one): a trial of
// creatures drawn in code as hard-edged polygons on bones, rather than as the generator's melted ellipsoids (Ed, 2026-11-11: "Is
// there no way that you can draw things yourself, instead of using an image generator?"). tools/creature-mesh/make.mjs writes it
// out as a .glb for tools/creature-bake/bake.mjs.
// The model: y up, its head along +z (glTF's forward), metres. A plan gives joints (named points), bones (joint to joint, each
// with its parent), lofts (rings along a path, each ring riding one bone, joined into faceted tubes) and cones (ears, tufts).
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
  constructor(index) { this.index = index; this.pos = []; this.col = []; this.skin = []; }
  tri(a, b, c) { for (const v of [a, b, c]) { this.pos.push(v.p.x, v.p.y, v.p.z); const k = new THREE.Color(v.c); this.col.push(k.r, k.g, k.b); this.skin.push(this.index[v.bone]); } }
  quad(a, b, c, d) { this.tri(a, b, c); this.tri(a, c, d); }
  geometry() {
    const g = new THREE.BufferGeometry(), n = this.skin.length, si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) { si[i * 4] = this.skin[i]; sw[i * 4] = 1; }
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3)); g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
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
      return { p: here.clone().addScaledVector(s, Math.sin(a) * r.rx).addScaledVector(u, Math.cos(a) * r.ry), c: typeof r.colour === "function" ? r.colour(Math.cos(a), Math.sin(a), frac) : r.colour, bone: r.bone };
    });
  });
  // (faces wound to look outward, whichever way the path and its frame happen to turn)
  const mids = made.map(ring => ring.reduce((m, v) => m.add(v.p), new THREE.Vector3()).multiplyScalar(1 / sides));
  const widest = made.reduce((best, ring, i) => (ring[0].p.distanceTo(mids[i]) > made[best][0].p.distanceTo(mids[best]) ? i : best), 0), j = Math.min(widest, made.length - 2);
  const n0 = new THREE.Vector3().crossVectors(made[j + 1][0].p.clone().sub(made[j][0].p), made[j][1].p.clone().sub(made[j][0].p)), out = n0.dot(made[j][0].p.clone().add(made[j][1].p).multiplyScalar(0.5).sub(mids[j])) >= 0;
  for (let i = 0; i + 1 < made.length; i++) for (let k = 0; k < sides; k++) { const a = made[i][k], b = made[i][(k + 1) % sides], c = made[i + 1][(k + 1) % sides], d = made[i + 1][k]; out ? faces.quad(a, d, c, b) : faces.quad(a, b, c, d); }
  for (const [ring, last] of [[made[0], false], [made[made.length - 1], true]]) { // the ends, as fans
    const mid = { p: ring.reduce((m, v) => m.add(v.p), new THREE.Vector3()).multiplyScalar(1 / sides), c: ring[0].c, bone: ring[0].bone };
    for (let k = 0; k < sides; k++) last === out ? faces.tri(mid, ring[(k + 1) % sides], ring[k]) : faces.tri(mid, ring[k], ring[(k + 1) % sides]);
  }
}

/** A cone: a base ring { at, rx, ry, up } and a tip, for ears, cheek tufts and claws. tipColour for the last part of it. */
function cone(faces, o) {
  const mid = { at: V(o.at).lerp(V(o.tip), o.split ?? 0.6).toArray(), rx: o.rx * (1 - (o.split ?? 0.6)), ry: o.ry * (1 - (o.split ?? 0.6)) };
  loft(faces, [{ ...o, colour: o.colour }, { ...mid, bone: o.bone, colour: o.tipColour ?? o.colour, up: o.up }, { at: o.tip, rx: 0.0005, ry: 0.0005, bone: o.bone, colour: o.tipColour ?? o.colour, up: o.up }], o.sides ?? 4, o.up ?? [0, 0, 1]);
}

/** The gait as a looping clip: each leg's joints swing by its phase (stance back, swing forward with the joints folding), the
 *  body bobs and sways, the head counters, the tail trails. plan.gait: { seconds, duty, legs: [{ bones: [upper, lower, foot],
 *  phase, swing, fold: [lower, foot] }], bob, sway, tails: [[...bones], ...], tailSwing }. */
function gaitClip(plan, bones, name = "Walk", steps = 24) {
  const G = plan.gait, T = G.seconds, times = Array.from({ length: steps + 1 }, (_, i) => (i / steps) * T), tracks = [];
  const rot = (bone, f) => { const v = []; for (const t of times) { const [x = 0, y = 0, z = 0] = f((t / T) % 1); const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, "YXZ")); v.push(q.x, q.y, q.z, q.w); } tracks.push(new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`, times, v)); };
  const ease = s => s * s * (3 - 2 * s), TAU = Math.PI * 2;
  for (const leg of G.legs) {
    const [upper, lower, foot] = leg.bones, [foldLower, foldFoot] = leg.fold, d = G.duty;
    const cyc = u => (u + leg.phase) % 1, sw = u => { const c = cyc(u); return c < d ? null : (c - d) / (1 - d); };
    // (a leg hangs down: turning it about x by +a carries the foot back, so forward is negative)
    rot(upper, u => { const c = cyc(u), s = sw(u); return [s === null ? -leg.swing + 2 * leg.swing * (c / d) : leg.swing - 2 * leg.swing * ease(s) + (leg.lift ?? 0) * Math.sin(Math.PI * s)]; });
    rot(lower, u => { const s = sw(u); return [s === null ? 0 : foldLower * Math.sin(Math.PI * s)]; });
    rot(foot, u => { const s = sw(u), c = cyc(u); return [s === null ? (leg.push ?? 0) * Math.max(0, (c / d - 0.6) / 0.4) : foldFoot * Math.sin(Math.PI * Math.min(1, s * 1.15))]; });
  }
  const S = G.sway ?? 0.05, B = G.bob ?? 0.008;
  rot(G.hips, u => [0, S * Math.sin(TAU * u), (G.roll ?? 0.03) * Math.sin(TAU * u + 1)]);
  rot(G.chest, u => [0.02 * Math.sin(TAU * 2 * u + 1), -S * 1.6 * Math.sin(TAU * u), -(G.roll ?? 0.03) * Math.sin(TAU * u + 1.4)]);
  rot(G.neck, u => [0.035 * Math.sin(TAU * 2 * u + 2.2), S * 0.5 * Math.sin(TAU * u), 0]);
  rot(G.head, u => [-0.03 * Math.sin(TAU * 2 * u + 2.2), S * 0.4 * Math.sin(TAU * u), 0]);
  (G.tails ?? [G.tail]).forEach((chain, n) => chain.forEach((b, i) => rot(b, u => [0.05 * Math.sin(TAU * 2 * u - i * 0.9 + n * 1.3), (G.tailSwing ?? 0.14) * Math.sin(TAU * u - 0.8 - i * 0.7 + n * 0.8), 0]))); // (each tail a little out of step with the last)
  for (const e of G.ears ?? []) rot(e, u => [0.05 * Math.sin(TAU * 2 * u + 3), 0, 0]);
  const root = bones[G.root], y0 = root.position.y, pv = []; for (const t of times) pv.push(root.position.x, y0 + B * Math.sin(TAU * 2 * (t / T) + 0.6), root.position.z);
  tracks.push(new THREE.VectorKeyframeTrack(`${G.root}.position`, times, pv));
  return new THREE.AnimationClip(name, T, tracks);
}

/** The plan built: { scene, clips }. */
export function build(plan) {
  const { bones, list } = skeleton(plan), faces = new Faces(Object.fromEntries(list.map((b, i) => [b.name, i])));
  for (const l of plan.lofts) loft(faces, l.rings, l.sides ?? 6, l.up);
  for (const c of plan.cones ?? []) cone(faces, c);
  const mesh = new THREE.SkinnedMesh(faces.geometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, flatShading: true }));
  mesh.name = plan.name; const root = list[0]; mesh.add(root); mesh.updateMatrixWorld(true); mesh.bind(new THREE.Skeleton(list));
  const scene = new THREE.Scene(); scene.add(mesh);
  return { scene, clips: plan.gait ? [gaitClip(plan, bones)] : [] };
}
