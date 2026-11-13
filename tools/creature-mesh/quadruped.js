// A mesh creature's shape (art/mesh/shape.js) as three.js objects, for writing it out as a .glb (make.mjs): a skinned mesh on its
// skeleton, lit faces in a material named "body" and glowing ones in one named "glow" (the bake keeps those bright), and its walk
// as a clip sampled from the shape's motion. The game doesn't use this: its art workers draw the shape themselves.
import * as THREE from "three";
import { shape } from "../../art/mesh/shape.js";

/** The plan built: { scene, clips }. */
export function build(plan, steps = 24) {
  const sh = shape(plan), list = sh.bones.map(b => { const bone = new THREE.Bone(); bone.name = b.name; return bone; });
  sh.bones.forEach((b, i) => { const at = new THREE.Vector3(...b.at); list[i].position.copy(b.parent < 0 ? at : at.sub(new THREE.Vector3(...sh.bones[b.parent].at))); if (b.parent >= 0) list[b.parent].add(list[i]); });
  const pos = [...sh.lit.pos, ...sh.glow.pos], bone = [...sh.lit.bone, ...sh.glow.bone], col = [];
  for (const c of [sh.lit.col, sh.glow.col]) for (let i = 0; i < c.length; i += 3) { const k = new THREE.Color().setRGB(c[i] / 255, c[i + 1] / 255, c[i + 2] / 255, THREE.SRGBColorSpace); col.push(k.r, k.g, k.b); }
  const g = new THREE.BufferGeometry(), n = bone.length, si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) { si[i * 4] = bone[i]; sw[i * 4] = 1; }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.addGroup(0, sh.lit.bone.length, 0); if (sh.glow.bone.length) g.addGroup(sh.lit.bone.length, sh.glow.bone.length, 1);
  g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute("skinWeight", new THREE.Float32BufferAttribute(sw, 4));
  g.computeVertexNormals(); // (no shared corners, so every face is flat)
  const body = new THREE.MeshStandardMaterial({ name: "body", vertexColors: true, roughness: 1, metalness: 0, flatShading: true }), glow = new THREE.MeshBasicMaterial({ name: "glow", vertexColors: true });
  const mesh = new THREE.SkinnedMesh(g, [body, glow]);
  mesh.name = plan.name; mesh.add(list[0]); mesh.updateMatrixWorld(true); mesh.bind(new THREE.Skeleton(list));
  const scene = new THREE.Scene(); scene.add(mesh);
  if (!sh.motion) return { scene, clips: [] };
  const T = sh.motion.seconds, times = Array.from({ length: steps + 1 }, (_, i) => (i / steps) * T), tracks = [], byName = Object.fromEntries(list.map(b => [b.name, b]));
  for (const [name, f] of sh.motion.rots) { const v = []; for (const t of times) { const [x = 0, y = 0, z = 0] = f((t / T) % 1), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, "YXZ")); v.push(q.x, q.y, q.z, q.w); } tracks.push(new THREE.QuaternionKeyframeTrack(`${name}.quaternion`, times, v)); }
  for (const [name, f] of sh.motion.poss) { const b = byName[name], v = []; for (const t of times) { const d = f((t / T) % 1); v.push(b.position.x + d[0], b.position.y + d[1], b.position.z + d[2]); } tracks.push(new THREE.VectorKeyframeTrack(`${name}.position`, times, v)); }
  return { scene, clips: [new THREE.AnimationClip("Walk", T, tracks)] };
}
