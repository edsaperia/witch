// The creature bake's page (tools/creature-bake/bake.mjs loads it in headless Chromium): a rigged, animated glTF model drawn as
// pixel sprites at the game's view (art/model3d.js: the head turned YAW towards or away, the camera looking down PITCH), one
// frame a step through a clip. Each frame is drawn `ss` times too big and brought down a block an art pixel, so thin legs
// don't flicker; its colours go to one small palette for the whole bake; its normals are the camera's (x right, y up, z to us).
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PITCH = 0.52; // (art/model3d.js)

/** k colours for a set of [r, g, b] samples: k-means from an evenly spread start, the same every run. */
function palette(samples, k) {
  if (samples.length <= k) return samples.map(s => [...s]);
  const sorted = [...samples].sort((a, b) => (a[0] * 2 + a[1] * 4 + a[2]) - (b[0] * 2 + b[1] * 4 + b[2]));
  let cs = Array.from({ length: k }, (_, i) => [...sorted[Math.floor((i + 0.5) * sorted.length / k)]]);
  for (let pass = 0; pass < 12; pass++) {
    const sum = cs.map(() => [0, 0, 0, 0]);
    for (const s of samples) { let b = 0, bd = Infinity; for (let i = 0; i < k; i++) { const c = cs[i], d = (s[0] - c[0]) ** 2 + (s[1] - c[1]) ** 2 + (s[2] - c[2]) ** 2; if (d < bd) { bd = d; b = i; } } const t = sum[b]; t[0] += s[0]; t[1] += s[1]; t[2] += s[2]; t[3]++; }
    cs = cs.map((c, i) => (sum[i][3] ? [sum[i][0] / sum[i][3], sum[i][1] / sum[i][3], sum[i][2] / sum[i][3]] : c));
  }
  return cs;
}
const nearest = (cs, r, g, b) => { let best = 0, bd = Infinity; for (let i = 0; i < cs.length; i++) { const c = cs[i], d = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2; if (d < bd) { bd = d; best = i; } } return best; };

const png = (w, h, rgba) => { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(rgba), w, h), 0, 0); return c; };

/** Bakes `o.glb` (base64). o: clip (name), frames, headings (radians: art/model3d.js YAW), height (art pixels, standing), ss, forward
 *  ("z": glTF's own, or "x"), colours (palette size), light ([x, y, z] in the camera's space), bands. */
export async function bake(o) {
  const { frames = 8, headings = [0.6, -0.6], height = 137, ss = 4, forward = "z", colours = 10, light = [-0.45, 0.65, 0.6], cover = 0.4 } = o;
  const bytes = Uint8Array.from(atob(o.glb), c => c.charCodeAt(0));
  const gltf = await new Promise((ok, no) => new GLTFLoader().parse(bytes.buffer, "", ok, no));
  const model = gltf.scene, pivot = new THREE.Group(), scene = new THREE.Scene();
  model.rotation.y = forward === "z" ? Math.PI / 2 : 0; // its head along +x, as the art's models
  pivot.add(model); scene.add(pivot);
  const clips = gltf.animations.map(a => ({ name: a.name, seconds: a.duration }));
  const clip = gltf.animations.find(a => a.name === o.clip) ?? gltf.animations[0] ?? null;
  const mixer = clip ? new THREE.AnimationMixer(model) : null;
  if (mixer) mixer.clipAction(clip).play();
  const pose = i => { if (mixer) mixer.setTime((i / frames) * clip.duration); scene.updateMatrixWorld(true); model.traverse(m => m.isSkinnedMesh && m.skeleton.update()); };

  // Its box over the whole clip, unturned: one frame and one scale for every sprite, so nothing breathes or jumps.
  const box = new THREE.Box3(), stand = new THREE.Box3();
  for (let i = 0; i < frames; i++) { pose(i); const b = new THREE.Box3().setFromObject(model, true); box.union(b); if (i === 0) stand.copy(b); }
  const cp = Math.cos(PITCH), sp = Math.sin(PITCH), centre = box.getCenter(new THREE.Vector3()), radius = box.getSize(new THREE.Vector3()).length() / 2;
  // (its height on screen, standing, at the towards heading: the art's own measure)
  const ups = []; pivot.rotation.y = -headings[0]; scene.updateMatrixWorld(true);
  for (const x of [stand.min.x, stand.max.x]) for (const y of [stand.min.y, stand.max.y]) for (const z of [stand.min.z, stand.max.z]) { const p = new THREE.Vector3(x, y, z).applyMatrix4(pivot.matrixWorld); ups.push(p.y * cp - p.z * sp); }
  let ppu = height / (Math.max(...ups) - Math.min(...ups)), S = Math.ceil(radius * 2 * ppu) + 6, half = S / (2 * ppu), big = S * ss;

  const canvas = document.createElement("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(big, big, false); renderer.setClearColor(0x000000, 0);
  const camera = new THREE.OrthographicCamera(-half, half, half, -half, 0.01, radius * 6);
  const aim = yaw => { pivot.rotation.y = -yaw; const c = centre.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -yaw); camera.position.set(c.x, c.y + sp * radius * 3, c.z + cp * radius * 3); camera.lookAt(c); camera.updateMatrixWorld(true); };
  const flat = new Map(); // its own colours, unlit
  model.traverse(m => { if (!m.isMesh) return; const src = m.material; if (!m.geometry.attributes.normal) m.geometry.computeVertexNormals(); // (a model with none: smooth ones from its faces)
    if (src.map) { src.map.magFilter = THREE.NearestFilter; src.map.minFilter = THREE.NearestFilter; src.map.generateMipmaps = false; src.map.needsUpdate = true; }
    flat.set(m, new THREE.MeshBasicMaterial({ map: src.map ?? null, color: src.color ?? 0xffffff, vertexColors: !!src.vertexColors, side: THREE.DoubleSide })); m.frustumCulled = false; });
  const normals = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }), depths = new THREE.MeshDepthMaterial({ side: THREE.DoubleSide });
  const gl = renderer.getContext(), read = () => { const px = new Uint8Array(big * big * 4); gl.readPixels(0, 0, big, big, gl.RGBA, gl.UNSIGNED_BYTE, px); return px; };
  const draw = how => {
    if (how === "colour") { scene.overrideMaterial = null; model.traverse(m => { if (m.isMesh) { m.userData.own ??= m.material; m.material = flat.get(m); } }); }
    else { model.traverse(m => { if (m.isMesh && m.userData.own) m.material = m.userData.own; }); scene.overrideMaterial = how === "normal" ? normals : depths; }
    renderer.render(scene, camera); return read();
  };

  // Its box is a loose guess at its height on screen (a box's corners reach past the animal), so the first frame is drawn once,
  // its solid rows counted, and the scale set so that frame stands exactly `height` art pixels tall: the art's own measure.
  { aim(headings[0]); pose(0); const C = draw("colour"); let top = big, bottom = -1;
    for (let y = 0; y < big; y++) for (let x = 0; x < big; x++) if (C[((big - 1 - y) * big + x) * 4 + 3] >= 128) { top = Math.min(top, y); bottom = Math.max(bottom, y); break; }
    if (bottom >= top) { ppu *= height / ((bottom - top + 1) / ss); S = Math.ceil(radius * 2 * ppu) + 6; half = S / (2 * ppu); big = S * ss;
      renderer.setSize(big, big, false); camera.left = -half; camera.right = half; camera.top = half; camera.bottom = -half; camera.updateProjectionMatrix(); } }

  // Every frame, brought down to art pixels: colour (mean of the covered samples), normal, depth, solid or not.
  const raw = [], samples = [];
  for (const yaw of headings) {
    aim(yaw);
    for (let i = 0; i < frames; i++) {
      pose(i);
      const C = draw("colour"), N = draw("normal"), D = draw("depth");
      const rgb = new Float32Array(S * S * 3), nrm = new Float32Array(S * S * 3), dep = new Float32Array(S * S), on = new Uint8Array(S * S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        let n = 0, r = 0, g = 0, b = 0, nx = 0, ny = 0, nz = 0, d = 0;
        for (let v = 0; v < ss; v++) for (let u = 0; u < ss; u++) {
          const k = ((big - 1 - (y * ss + v)) * big + x * ss + u) * 4; // (readPixels starts at the bottom)
          if (C[k + 3] < 128) continue;
          n++; r += C[k]; g += C[k + 1]; b += C[k + 2]; nx += N[k] / 127.5 - 1; ny += N[k + 1] / 127.5 - 1; nz += N[k + 2] / 127.5 - 1; d += 1 - D[k] / 255;
        }
        if (n < cover * ss * ss) continue;
        const j = y * S + x, l = Math.hypot(nx, ny, nz) || 1;
        on[j] = 1; rgb[j * 3] = r / n; rgb[j * 3 + 1] = g / n; rgb[j * 3 + 2] = b / n; nrm[j * 3] = nx / l; nrm[j * 3 + 1] = ny / l; nrm[j * 3 + 2] = nz / l; dep[j] = d / n;
        if ((x + y * 7 + i * 3) % 5 === 0) samples.push([rgb[j * 3], rgb[j * 3 + 1], rgb[j * 3 + 2]]);
      }
      raw.push({ yaw, i, rgb, nrm, dep, on });
    }
  }
  renderer.dispose();

  // One palette for the bake; one crop for every frame, the ground point under its middle kept.
  const pal = palette(samples, colours), lum = c => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11, dark = pal.reduce((a, c) => (lum(c) < lum(a) ? c : a), pal[0]).map(v => v * 0.38);
  let x0 = S, x1 = -1, y0 = S, y1 = -1;
  for (const f of raw) for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (f.on[y * S + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  x0 = Math.max(0, x0 - 1); y0 = Math.max(0, y0 - 1); x1 = Math.min(S - 1, x1 + 1); y1 = Math.min(S - 1, y1 + 1);
  const w = x1 - x0 + 1, h = y1 - y0 + 1, L = new THREE.Vector3(...light).normalize();
  const origin = [S / 2 - x0, S / 2 + ((centre.y - box.min.y) * cp) * ppu - y0]; // the ground under its middle, in the sprite
  const out = [];
  for (const f of raw) {
    const albedo = new Uint8ClampedArray(w * h * 4), normal = new Uint8ClampedArray(w * h * 4), lit = new Uint8ClampedArray(w * h * 4);
    const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : f.on[(y + y0) * S + x + x0]), depth = (x, y) => f.dep[(y + y0) * S + x + x0];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const j = (y + y0) * S + x + x0, k = (y * w + x) * 4;
      if (!f.on[j]) continue;
      const c = pal[nearest(pal, f.rgb[j * 3], f.rgb[j * 3 + 1], f.rgb[j * 3 + 2])], n = [f.nrm[j * 3], f.nrm[j * 3 + 1], f.nrm[j * 3 + 2]];
      albedo.set([c[0], c[1], c[2], 255], k); normal.set([(n[0] + 1) * 127.5, (n[1] + 1) * 127.5, (n[2] + 1) * 127.5, 255], k);
      // lit in three bands, a dark line round it and wherever a nearer part stands in front of it
      const edge = !at(x - 1, y) || !at(x + 1, y) || !at(x, y - 1) || !at(x, y + 1);
      const step = 0.02, behind = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => at(x + a, y + b) && depth(x + a, y + b) < f.dep[j] - step);
      const dot = n[0] * L.x + n[1] * L.y + n[2] * L.z, band = dot < 0.12 ? 0.58 : dot < 0.62 ? 0.84 : 1.06;
      const s = edge ? dark : behind ? c.map(v => v * 0.5) : [c[0] * band, c[1] * band * (band < 0.7 ? 0.98 : 1), c[2] * (band < 0.7 ? band * 1.12 : band)];
      lit.set([s[0], s[1], s[2], 255], k);
    }
    out.push({ yaw: f.yaw, i: f.i, albedo: png(w, h, albedo).toDataURL(), normal: png(w, h, normal).toDataURL(), lit: png(w, h, lit).toDataURL(), canvas: png(w, h, lit) });
  }
  // The contact sheet: a row a heading, each frame `zoom` times its size on the preview sheets' green.
  const zoom = o.zoom ?? 3, sheet = document.createElement("canvas"); sheet.width = w * zoom * frames; sheet.height = h * zoom * headings.length;
  const g = sheet.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = o.ground ?? "#6b8a2e"; g.fillRect(0, 0, sheet.width, sheet.height);
  out.forEach((f, n) => g.drawImage(f.canvas, (n % frames) * w * zoom, Math.floor(n / frames) * h * zoom, w * zoom, h * zoom));
  return { w, h, origin, ppu, clip: clip?.name ?? null, clips, palette: pal.map(c => c.map(Math.round)), frames: out.map(({ canvas, ...f }) => f), sheet: sheet.toDataURL() };
}
window.creatureBake = bake;
