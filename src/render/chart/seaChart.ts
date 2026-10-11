// The sea chart in 3D (Ed, 2026-10-11: "Can you show the map screen in the same way you show the island: pixellated, camera
// seeing it in 3D, your view moves around as you select islands?"). The world is a disc of night sea, home in the middle and
// every island round it where the flat chart had it (app/chartLayout.ts islandAt), each a low landmass raised from its own
// coast (rules/islandShape.ts islandCoast through art/islands.js islandPoints, the one call the flat chart used, so a new land
// map swaps in). Drawn as the game is: at the low resolution of tuning.pixelSize, scaled up with whole pixels, through the
// game's own post pass (render/post.ts: bloom, the tilt-shift, the night grade); the camera tilted down looking north, as in
// the game, never turning, only gliding to the island chosen.
//   Islands she can sail to carry their sigil glowing on the land, as a placed sigil does on the ground; the rest are bare,
// dimmer land (the '?' placeholders dimmest); won ones ringed in gold on the water; her voyages run between them on the water
// as glowing lines with a current flowing along, as a ley line does. The view only: what's found, won and sailable comes from
// the page (app/chartPage.ts, from app/chartSave.ts).
import * as THREE from "three";
import { ISLAND_LOOK, islandPoints } from "../../../art/islands.js";
import { sigilArrival, sigilColour } from "../../../art/sigils.js";
import { Post, type PostTuning } from "../post";

/** The chart's disc: radius 1 on the flat chart is this many units here. */
export const CHART_SCALE = 100;
/** An island's box across on the flat chart (chartLayout BOX), here. */
const BOX_UNITS = 0.17 * CHART_SCALE;
/** The real outlines' metres per unit: the biggest islands (phase 5, about 3.5 km across) fill the box as the round coasts did. */
const METRES = 3000 / BOX_UNITS;
/** A sigil's width on its island (units), the same on every island (Ed, 2026-10-11: "large enough that the animal sigils show
 *  clearly on the islands"); home's a little bigger. */
const SIGIL_UNITS = 6.4, HOME_SIGIL_UNITS = 7.4;
/** Its glyph's pixels, and the art pixels it spans on screen: when the chart opens, and at the furthest the camera goes (it
 *  never zooms out past where a sigil reads: the camera glides island to island instead of showing the whole world). */
const SIGIL_PX = 32, SIGIL_OPEN_PX = 34, SIGIL_MIN_PX = 22;

/** An island's real outline (rules/islandShape.ts islandOutline, made by app/chartOutlines.worker.ts): its loops, x and z
 *  interleaved in metres from its home's middle, `sea` its coast (one loop for each piece of land), else a lake's shore. */
export interface ChartOutline { loops: { pts: ArrayLike<number>; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number } }

export interface ChartIsland {
  id: string;
  /** Where on the flat chart (app/chartLayout.ts islandAt): x east, y south, the disc's radius 1. */
  x: number; y: number;
  /** Its round coast (rules/islandShape.ts islandCoast radii), drawn until its real outline comes. */
  radii: ArrayLike<number>;
  /** Its real outline, once made. */
  outline?: ChartOutline;
  /** Her island to sail to (a sigil on it); found but not sailable, bare land; unknown, a '?' placeholder (dimmest). */
  sail: boolean; unknown: boolean; won: boolean;
  /** The sigil it carries (art/sigils.js id: a kind, or home's). */
  sigil: string;
}
export interface ChartVoyage { from: string; to: string }

export interface ChartTuning extends PostTuning { pixelSize: number; camera: { fov: number } }

const SEA_VERT = /* glsl */ `
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
// The night sea: deep blue, darker toward the rim, small moving ripples catching the moon in a glitter path toward it (the
// moon low in the north), the phases' rings faint on the water, and the rim where the sea pours off the world.
const SEA_FRAG = /* glsl */ `
uniform float uTime, uR; uniform vec3 uMoonDir; varying vec3 vW;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
void main() {
  float r = length(vW.xz) / uR;
  vec3 deep = vec3(0.035, 0.06, 0.15), shal = vec3(0.07, 0.12, 0.27);
  vec3 c = mix(shal, deep, smoothstep(0.0, 1.0, r));
  float w = n(vW.xz * 0.35 + vec2(uTime * 0.25, uTime * 0.17)) * 0.6 + n(vW.xz * 0.9 - vec2(uTime * 0.31, -uTime * 0.2)) * 0.4;
  c += vec3(0.03, 0.05, 0.09) * w;
  // the moon's glitter: a band of bright ripples from the camera's side up toward the moon, in the north
  float band = exp(-pow(vW.x - uMoonDir.x * 40.0, 2.0) / 900.0);
  c += vec3(0.55, 0.6, 0.7) * band * step(0.93, w) * 0.8;
  // the phases' rings, faint (dashed round)
  for (int p = 1; p <= 5; p++) { float rr = 0.02 + float(p) * 0.165; float d = abs(r - rr);
    float dash = step(0.5, fract(atan(vW.z, vW.x) * 24.0 / 6.2832 * float(p)));
    c += vec3(0.05, 0.08, 0.16) * (1.0 - smoothstep(0.0, 0.004, d)) * dash; }
  // the rim: lighter where the water gathers to pour off
  c += vec3(0.12, 0.2, 0.32) * smoothstep(0.965, 1.0, r);
  gl_FragColor = vec4(c, 1.0);
}`;
// The sea pouring off the world's edge: a skirt below the rim, streaks running down, fading into space.
const FALL_FRAG = /* glsl */ `
uniform float uTime; varying vec2 vUv;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float a = vUv.x * 900.0, col = floor(a), streak = h(col), y = vUv.y;
  float run = fract(y * 3.0 + uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = smoothstep(0.0, 0.9, y);
  vec3 c = mix(vec3(0.05, 0.09, 0.2), vec3(0.45, 0.6, 0.85), lit) * fade;
  gl_FragColor = vec4(c, fade * (0.55 + 0.45 * lit));
}`;
// The sky past the world's edge: deep night, stars in a few sizes, a few twinkling, the moon low in the north (whole pixels:
// it's drawn at the low resolution).
const SKY_VERT = /* glsl */ `varying vec2 vNdc; void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); }`;
const SKY_FRAG = /* glsl */ `
uniform vec2 uRes; uniform float uTime; uniform vec2 uMoon; varying vec2 vNdc;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 px = floor((vNdc * 0.5 + 0.5) * uRes), uv = px / uRes;
  vec3 c = mix(vec3(0.02, 0.025, 0.06), vec3(0.06, 0.07, 0.16), smoothstep(1.0, 0.2, uv.y));
  float s = h(px); if (s > 0.9965) { float tw = 0.6 + 0.4 * sin(uTime * (1.0 + h(px + 3.0) * 3.0) + s * 40.0); c += vec3(0.75, 0.78, 0.9) * tw * (s > 0.9992 ? 1.3 : 0.7); }
  vec2 m = uMoon * uRes; float d = length(px - m), R = uRes.y * 0.045;
  if (d < R) { float lit = smoothstep(R, R * 0.2, length(px - m - vec2(R * 0.35, 0.0))); c = mix(vec3(0.85, 0.87, 0.8), vec3(0.18, 0.2, 0.28), 1.0 - lit); }
  else c += vec3(0.25, 0.28, 0.4) * exp(-(d - R) / (R * 1.6)) * 0.35;
  gl_FragColor = vec4(c, 1.0);
}`;
// A voyage's line on the water: a glowing current flowing from where she set out to where she went, as the ley line's.
const LINE_VERT = /* glsl */ `attribute float aAlong; varying float vAlong; varying vec2 vUv;
void main() { vAlong = aAlong; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const LINE_FRAG = /* glsl */ `
uniform float uTime; uniform vec3 uColour; varying float vAlong; varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
  float pulse = fract(vAlong * 0.08 - uTime * 0.6);
  float glow = smoothstep(0.0, 1.0, across) * (0.35 + 0.65 * smoothstep(0.75, 1.0, pulse));
  gl_FragColor = vec4(uColour * glow, glow);
}`;

/** One island's meshes and where it is. */
interface Isle { d: ChartIsland; group: THREE.Group; pick: THREE.Mesh; x: number; z: number; top: number; reach: number; sigil?: THREE.Mesh; glow?: THREE.Mesh }

/** A sigil as a white glyph texture, `px` across, whole pixels (art/sigils.js sigilArrival). */
function sigilTexture(id: string, px = 24): THREE.Texture {
  const ink = sigilArrival(id, px), data = new Uint8Array(px * px * 4);
  for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) { const i = y * px + x, o = ((px - 1 - y) * px + x) * 4; if (ink[i] < Infinity) data.set([255, 255, 255, 255], o); }
  const t = new THREE.DataTexture(data, px, px); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.needsUpdate = true;
  return t;
}
/** A soft round glow (for the sigils' halos and the selection ring's light). */
function glowTexture(): THREE.Texture {
  const n = 64, data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const d = Math.hypot(x + 0.5 - n / 2, y + 0.5 - n / 2) / (n / 2), a = Math.max(0, 1 - d) ** 2; data.set([255, 255, 255, Math.round(a * 255)], (y * n + x) * 4); }
  const t = new THREE.DataTexture(data, n, n); t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter; t.needsUpdate = true;
  return t;
}
type Loop = { pts: THREE.Vector2[]; sea: boolean };
/** An island's loops in its shape's units about its middle (shape y is -z, as the extrusion is laid flat): its real outline's,
 *  every other point (a chart pixel is far bigger than its step), else its round coast's (art/islands.js islandPoints). */
function islandLoops(d: ChartIsland): Loop[] {
  const o = d.outline;
  if (o && o.loops.some(l => l.sea)) {
    const cx = (o.box.minX + o.box.maxX) / 2, cz = (o.box.minZ + o.box.maxZ) / 2, out: Loop[] = [];
    for (const l of o.loops) {
      const n = l.pts.length / 2, by = n > 120 ? 2 : 1, pts: THREE.Vector2[] = [];
      for (let i = 0; i < n; i += by) pts.push(new THREE.Vector2((l.pts[i * 2] - cx) / METRES, -(l.pts[i * 2 + 1] - cz) / METRES));
      if (pts.length >= 3) out.push({ pts, sea: l.sea });
    }
    if (out.some(l => l.sea)) return out;
  }
  const pts = islandPoints(d.radii) as [number, number][];
  return [{ pts: pts.map(([px, py]) => new THREE.Vector2((px - 0.5) * BOX_UNITS, -(py - 0.5) * BOX_UNITS)), sea: true }];
}
const middle = (pts: THREE.Vector2[]) => pts.reduce((a, p) => a.add(p), new THREE.Vector2()).divideScalar(pts.length);
const shrunk = (pts: THREE.Vector2[], k: number) => { const c = middle(pts); return pts.map(p => c.clone().lerp(p, k)); };
/** Is a point inside a loop (even-odd)? */
function inside(p: THREE.Vector2, pts: THREE.Vector2[]): boolean {
  let r = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i], b = pts[j];
    if ((a.y > p.y) !== (b.y > p.y) && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) r = !r;
  }
  return r;
}
const col = (c: readonly number[], k = 1) => new THREE.Color((c[0] / 255) * k, (c[1] / 255) * k, (c[2] / 255) * k);

export class SeaChart {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera: THREE.PerspectiveCamera;
  private scene = new THREE.Scene();
  private post: Post;
  /** The post pass's own knobs: the bloom gentler in a small view (a map table's miniature), where it would wash the sigils out. */
  private postTuning: ChartTuning;
  private isles = new Map<string, Isle>();
  private lines: THREE.Mesh[] = [];
  private voyages: ChartVoyage[] = [];
  private uTime = { value: 0 };
  private glow = glowTexture();
  private skyU: Record<string, THREE.IUniform>;
  private ring: THREE.Mesh;
  private focus = new THREE.Vector3();
  private aim = new THREE.Vector3();
  /** How far the camera stands from what it looks at (units); `zoomTo` eases it. */
  private dist = 130;
  private distTo = 130;
  /** The camera's distance when the chart opens, and the furthest it goes, by the screen's height (resize). */
  private distOpen = 130;
  private distMax = 200;
  private sized = false;
  /** How steeply the camera looks down (radians from level). */
  private pitch = 0.95;
  selected: string | null = null;
  /** Circle the chosen island this fast (radians a second; the map table's miniature), 0 for the chart's still north-facing view. */
  orbit = 0;
  private yaw = 0;
  private w = 1; private h = 1;

  constructor(readonly canvas: HTMLCanvasElement, readonly tuning: ChartTuning) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.camera = new THREE.PerspectiveCamera(tuning.camera.fov ?? 40, 1, 1, 1200);
    this.postTuning = { ...tuning, bloom: { ...tuning.bloom } };
    this.post = new Post(this.renderer, this.postTuning);
    this.scene.background = new THREE.Color(0x05060e);
    // the night's light: a cool moon from the north, a little sky all round
    this.scene.add(new THREE.HemisphereLight(0x7080c0, 0x182030, 2.6));
    const moon = new THREE.DirectionalLight(0xd0dcff, 3.2); moon.position.set(-30, 60, -90); this.scene.add(moon);
    // the sky past the rim
    const skyGeo = new THREE.BufferGeometry(); skyGeo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    this.skyU = { uRes: { value: new THREE.Vector2(1, 1) }, uTime: this.uTime, uMoon: { value: new THREE.Vector2(0.28, 0.88) } };
    const sky = new THREE.Mesh(skyGeo, new THREE.ShaderMaterial({ vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, uniforms: this.skyU, depthWrite: false, depthTest: true, depthFunc: THREE.LessEqualDepth }));
    sky.frustumCulled = false; sky.renderOrder = 9; this.scene.add(sky);
    // the sea, and the sea pouring off its rim
    const R = CHART_SCALE * 1.02;
    const sea = new THREE.Mesh(new THREE.CircleGeometry(R, 160).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({ vertexShader: SEA_VERT, fragmentShader: SEA_FRAG, uniforms: { uTime: this.uTime, uR: { value: R }, uMoonDir: { value: new THREE.Vector3(-0.3, 0.6, -0.9) } } }));
    this.scene.add(sea);
    const fall = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.97, 40, 160, 1, true).translate(0, -20, 0), new THREE.ShaderMaterial({
      vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: FALL_FRAG, uniforms: { uTime: this.uTime }, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
    this.scene.add(fall);
    // the selection: a bright ring on the water round the chosen island
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xa8dcff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.ring.position.y = 0.15; this.ring.visible = false; this.scene.add(this.ring);
  }

  /** Every island and her voyages: the scene rebuilt (on load, and after a start over). */
  set(islands: ChartIsland[], voyages: ChartVoyage[]): void {
    for (const i of this.isles.values()) this.scene.remove(i.group);
    for (const l of this.lines) this.scene.remove(l);
    this.isles.clear(); this.lines = [];
    for (const d of islands) this.isles.set(d.id, this.island(d));
    this.voyages = voyages;
    for (const v of voyages) { const a = this.isles.get(v.from), b = this.isles.get(v.to); if (a && b) this.lines.push(this.voyage(a, b)); }
    if (this.selected && !this.isles.has(this.selected)) this.selected = null;
  }

  /** An island's real outline has come: its land rebuilt in that shape (her voyages redrawn to its new shore). */
  reshape(id: string, outline: ChartOutline): void {
    const old = this.isles.get(id); if (!old) return;
    this.scene.remove(old.group);
    this.isles.set(id, this.island({ ...old.d, outline }));
    for (const l of this.lines) this.scene.remove(l);
    this.lines = this.voyages.flatMap(v => { const a = this.isles.get(v.from), b = this.isles.get(v.to); return a && b ? [this.voyage(a, b)] : []; });
  }

  /** An island: a low landmass raised from its coast, a lighter shelf of shallows round it, a hill toward its middle; its
   *  sigil glowing on it if she can sail there; a gold ring on the water if won. */
  private island(d: ChartIsland): Isle {
    const g = new THREE.Group(), x = d.x * CHART_SCALE, z = d.y * CHART_SCALE;
    g.position.set(x, 0, z); this.scene.add(g);
    const loops = islandLoops(d), seas = loops.filter(l => l.sea), lakes = loops.filter(l => !l.sea);
    const main = seas.reduce((a, l) => (Math.abs(THREE.ShapeUtils.area(l.pts)) > Math.abs(THREE.ShapeUtils.area(a.pts)) ? l : a));
    // each piece of land a shape (its lakes holes in it), grown or shrunk about its own middle by k
    const shapeOf = (l: Loop, k: number, holes: Loop[] = []) => {
      const c = middle(l.pts), at = (v: THREE.Vector2) => new THREE.Vector2(c.x + (v.x - c.x) * k, c.y + (v.y - c.y) * k);
      const sh = new THREE.Shape(l.pts.map(at));
      for (const h of holes) if (inside(h.pts[0], l.pts)) sh.holes.push(new THREE.Path(h.pts));
      return sh;
    };
    const shape = (k: number) => seas.map(l => shapeOf(l, k, k === 1 ? lakes : []));
    const dim = d.unknown ? 0.42 : d.sail ? 1 : 0.62, home = d.id === "home";
    const H = home ? 2.2 : 1.4;
    const lam = (c: THREE.Color) => new THREE.MeshLambertMaterial({ color: c, emissive: c.clone().multiplyScalar(0.18) });
    const land = lam(col(ISLAND_LOOK.land2, dim * 1.6)), sand = lam(col(ISLAND_LOOK.sand, dim * 0.9));
    const body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape(1), { depth: H, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 0.6, bevelSegments: 1, curveSegments: 4 }).rotateX(-Math.PI / 2), [land, sand]);
    g.add(body);
    if (lakes.length) { // its lakes, still water a little below the land
      const lake = new THREE.Mesh(new THREE.ShapeGeometry(lakes.map(l => new THREE.Shape(l.pts))).rotateX(-Math.PI / 2).translate(0, H * 0.7, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.09, 0.17, 0.36).multiplyScalar(0.6 + dim * 0.6) }));
      g.add(lake);
    }
    const hillHoles = lakes.filter(h => h.pts.every(p => inside(p, shrunk(main.pts, 0.55))));
    const hill = new THREE.Mesh(new THREE.ExtrudeGeometry(shapeOf(main, 0.55, hillHoles), { depth: H * 0.9, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 0.8, bevelSegments: 1 }).rotateX(-Math.PI / 2).translate(0, H, 0), lam(col(ISLAND_LOOK.land, dim * 1.5)));
    g.add(hill);
    const shelf = new THREE.Mesh(new THREE.ShapeGeometry(shape(1.22)).rotateX(-Math.PI / 2).translate(0, 0.05, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.1, 0.2, 0.32).multiplyScalar(dim), transparent: true, opacity: 0.85 }));
    g.add(shelf);
    let reach = 0; for (const l of seas) for (const p of l.pts) reach = Math.max(reach, p.length());
    const top = H * 1.9 + 1.2;
    const isle: Isle = { d, group: g, pick: body, x, z, top, reach };
    if (d.sail) { // its sigil, lying on the land and glowing as a placed sigil does, a halo of its light under it
      const c = sigilColour(d.sigil), s = home ? HOME_SIGIL_UNITS : SIGIL_UNITS;
      const sg = new THREE.Mesh(new THREE.PlaneGeometry(s, s).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: sigilTexture(d.sigil, SIGIL_PX), color: col(c, 0.9), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      sg.position.y = top + 0.3; g.add(sg); isle.sigil = sg;
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(s * 1.9, s * 1.9).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: this.glow, color: col(c, 0.22), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      halo.position.y = top + 0.2; g.add(halo); isle.glow = halo;
    }
    if (d.won) { // won: a gold ring on the water round it
      const r = reach * 1.35;
      const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.94, r, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe8b46a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.position.y = 0.12; g.add(ring);
    }
    return isle;
  }

  /** A voyage's line on the water: a gentle curve from one island's shore to the other's, the current flowing along it. */
  private voyage(a: Isle, b: Isle): THREE.Mesh {
    const A = new THREE.Vector2(a.x, a.z), B = new THREE.Vector2(b.x, b.z), dir = B.clone().sub(A), len = dir.length(), n = new THREE.Vector2(-dir.y, dir.x).normalize();
    const mid = A.clone().add(B).multiplyScalar(0.5).add(n.multiplyScalar(len * 0.12));
    const N = 48, Wd = 0.9, pos: number[] = [], uv: number[] = [], along: number[] = [], idx: number[] = [];
    const at = (t: number) => { const u = 1 - t; return new THREE.Vector2(u * u * A.x + 2 * u * t * mid.x + t * t * B.x, u * u * A.y + 2 * u * t * mid.y + t * t * B.y); };
    const t0 = a.reach / len * 1.1, t1 = 1 - (b.reach / len) * 1.1; // (from shore to shore)
    for (let i = 0; i <= N; i++) {
      const t = t0 + (t1 - t0) * (i / N), p = at(t), q = at(Math.min(1, t + 0.01)), tg = q.sub(p).normalize(), side = new THREE.Vector2(-tg.y, tg.x).multiplyScalar(Wd);
      pos.push(p.x + side.x, 0.2, p.y + side.y, p.x - side.x, 0.2, p.y - side.y); uv.push(i / N, 0, i / N, 1); along.push(t * len, t * len);
      if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); geo.setAttribute("aAlong", new THREE.Float32BufferAttribute(along, 1)); geo.setIndex(idx);
    const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: LINE_VERT, fragmentShader: LINE_FRAG, uniforms: { uTime: this.uTime, uColour: { value: new THREE.Color(1, 0.72, 0.38) } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    this.scene.add(m);
    return m;
  }

  /** Let go of everything it holds on the GPU (its meshes, materials, textures, render targets and the context). */
  dispose(): void {
    this.scene.traverse(o => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      for (const mat of ([] as THREE.Material[]).concat((m.material as THREE.Material | THREE.Material[]) ?? [])) {
        for (const v of Object.values(mat)) if (v instanceof THREE.Texture) v.dispose();
        mat.dispose();
      }
    });
    this.glow.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  /** Choose an island: the camera glides to it; the ring goes round it. */
  select(id: string | null, instant = false): void {
    this.selected = id && this.isles.has(id) ? id : null;
    const i = this.selected ? this.isles.get(this.selected)! : null;
    this.aim.set(i ? i.x : 0, 0, i ? i.z : 0);
    if (instant) this.focus.copy(this.aim);
  }
  /** Nearer or further (a share of the default), within reason. */
  zoom(k: number): void { this.distTo = Math.max(45, Math.min(this.distMax, this.distTo * k)); }

  /** The island under a point on the canvas (CSS pixels), or null. */
  pick(clientX: number, clientY: number): string | null {
    const r = this.canvas.getBoundingClientRect(), ndc = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const hit = ray.intersectObjects([...this.isles.values()].map(i => i.pick), false)[0];
    if (hit) for (const [id, i] of this.isles) if (i.pick === hit.object) return id;
    // else the nearest island to where the ray meets the sea, if it's close (small islands are hard to tap)
    const p = new THREE.Vector3(); if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), p)) return null;
    let best: string | null = null, bd = Infinity;
    for (const [id, i] of this.isles) { const d = Math.hypot(i.x - p.x, i.z - p.z) - i.reach; if (d < bd) { bd = d; best = id; } }
    return bd < 6 ? best : null;
  }

  /** Where each island is on the screen (CSS pixels from the canvas's top left), for labels. */
  screenOf(id: string): { x: number; y: number } | null {
    const i = this.isles.get(id); if (!i) return null;
    const v = new THREE.Vector3(i.x, i.top, i.z).project(this.camera), r = this.canvas.getBoundingClientRect();
    return { x: ((v.x + 1) / 2) * r.width, y: ((1 - v.y) / 2) * r.height };
  }

  /** Fit the canvas (CSS pixels): the scene at low resolution, scaled up with whole pixels. */
  resize(cssW: number, cssH: number): void {
    const p = this.tuning.pixelSize || 3;
    this.w = Math.max(1, Math.ceil(cssW / p)); this.h = Math.max(1, Math.ceil(cssH / p));
    this.renderer.setSize(this.w, this.h, false);
    this.post.resize(this.w, this.h, this.w, this.h);
    this.canvas.style.width = `${this.w * p}px`; this.canvas.style.height = `${this.h * p}px`;
    this.camera.aspect = this.w / this.h; this.camera.updateProjectionMatrix();
    (this.skyU.uRes.value as THREE.Vector2).set(this.w, this.h);
    this.postTuning.bloom.strength = this.tuning.bloom.strength * Math.max(0.3, Math.min(1, (this.h - 60) / 180));
    // how far the camera stands for a sigil to span so many art pixels across (a flat sigil keeps its width as it tilts away)
    const at = (px: number) => (SIGIL_UNITS * this.h) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * px);
    const was = this.distOpen;
    this.distOpen = at(SIGIL_OPEN_PX); this.distMax = at(SIGIL_MIN_PX);
    if (!this.sized) { this.dist = this.distTo = this.distOpen; this.sized = true; }
    else { this.distTo = Math.max(45, Math.min(this.distMax, this.distTo * (this.distOpen / was))); this.dist = this.distTo; }
  }

  /** A frame: the camera eases toward the chosen island, the sea moves, the sigils pulse. */
  frame(dt: number, time: number): void {
    this.uTime.value = time;
    const k = 1 - Math.exp(-dt * 3.2);
    this.focus.lerp(this.aim, k); this.dist += (this.distTo - this.dist) * k;
    // tilted down, looking north (-z), never turning (as the game's camera)
    this.yaw += dt * this.orbit;
    const back = Math.cos(this.pitch) * this.dist, sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    this.camera.position.set(this.focus.x + back * sy, this.focus.y + Math.sin(this.pitch) * this.dist, this.focus.z + back * cy);
    const ahead = this.orbit ? 0 : this.dist * 0.035; // (the chosen island a little above the middle, clear of its card)
    this.camera.lookAt(this.focus.x, 0, this.focus.z + ahead);
    this.post.lift = 0; // (the ground's gentler tilt-shift: the sigils off the middle still read)
    for (const i of this.isles.values()) {
      const pulse = 0.85 + 0.15 * Math.sin(time * 1.6 + i.x * 0.1), chosen = i.d.id === this.selected;
      if (i.sigil) (i.sigil.material as THREE.MeshBasicMaterial).opacity = pulse;
      if (i.glow) (i.glow.material as THREE.MeshBasicMaterial).opacity = (chosen ? 0.85 : 0.7) * pulse;
      i.group.position.y = chosen ? Math.sin(time * 2) * 0.12 : 0;
    }
    const sel = this.selected ? this.isles.get(this.selected) : null;
    this.ring.visible = !!sel;
    if (sel) { const r = sel.reach * 1.6 * (1 + 0.04 * Math.sin(time * 3)); this.ring.position.set(sel.x, 0.15, sel.z); this.ring.scale.set(r, 1, r); (this.ring.material as THREE.MeshBasicMaterial).opacity = 0.7 + 0.3 * Math.sin(time * 3); }
    this.post.render(this.scene, this.camera);
  }
}
