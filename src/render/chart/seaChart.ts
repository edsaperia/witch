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
import { sigilColour } from "../../../art/sigils.js";
import { sigilDetail } from "../../../art/sigilDetail.js";
import { Post, type PostTuning } from "../post";

/** The chart's disc: radius 1 on the flat chart is this many units here. */
export const CHART_SCALE = 100;
/** How far each island reaches from its middle (units), by its phase (Ed, 2026-10-11: "the islands larger and more detailed"):
 *  the chart's scale is ours, so each island fills its place on its phase's ring, the small ones as well as the big, rather than
 *  keeping their sizes in metres against each other and the sea. */
const REACH = [8.5, 5.6, 6.8, 7.4, 7.6, 7.8];
const reachOf = (d: { id: string; phase: number }) => (d.id === "home" ? REACH[0] : REACH[Math.max(1, Math.min(5, d.phase))]);
/** The camera's nearest (units): one island filling the screen and more (Ed, 2026-10-12: "the islands should be larger at full
 *  zoom"), its fine grid made for it (app/chartOutlines.worker.ts `detail`). */
const CLOSEST = 17;
/** How deep (m) the shallows fade out to. */
const SHALLOWS = 240;
/** The land's heights (m) on the chart: exaggerated, so the hills read from high up. */
const RELIEF = 5;
/** The chart's pixel (CSS pixels across one): finer than the game's, for the islands' and sigils' detail; still whole pixels. */
const CHART_PIXEL = 2;
/** A sigil's width against its island's reach (Ed: "the sigils should be larger and more detailed"). */
const SIGIL_SHARE = 1.25;
/** A sigil's art by how many pixels it spans on screen (art/sigilDetail.js detailTier; Ed, 2026-10-12: "we don't need the circles
 *  around the rune; ideally we want more detailed versions of the rune itself"): the plain glyph while small, the carved bands,
 *  then the carved emblem; each texture about as many pixels as it shows, so it stays crisp. */
const SIGIL_TIERS = [{ from: 0, px: 48 }, { from: 64, px: 128 }, { from: 128, px: 256 }];
/** When the chart opens, a sigil spans this many art pixels, and at the furthest no fewer than this. */
const SIGIL_OPEN_PX = 96, SIGIL_MIN_PX = 16;
/** A typical sailable island's sigil (units), for the zoom's limits. */
const SIGIL_TYPICAL = REACH[2] * SIGIL_SHARE;

/** An island's real land (app/chartOutlines.worker.ts): its coast's loops (x, z interleaved, metres from its home's middle; `sea`
 *  its coast, one loop for each piece of land, else a lake's shore), their box, and its ground on a grid (heights and colours). */
export interface ChartOutline { loops: { pts: ArrayLike<number>; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; ground?: { x0: number; z0: number; step: number; cols: number; rows: number; h: ArrayLike<number>; rgb: ArrayLike<number>; /** 0 land, 1 sea, 2 lake */ water?: ArrayLike<number>; /** a lake's water level (m, as h) */ level?: ArrayLike<number> } }

export interface ChartIsland {
  id: string;
  /** Where on the flat chart (app/chartLayout.ts islandAt): x east, y south, the disc's radius 1. */
  x: number; y: number;
  /** Its phase (0 home), for its size on the chart. */
  phase: number;
  /** Its round coast (rules/islandShape.ts islandCoast radii), drawn until its real land comes. */
  radii: ArrayLike<number>;
  /** Its real land, once made. */
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

// The islands' ground (groundMaterial): its colour relief-shaded as a painted map is (Ed, 2026-10-12, his close-up reference: the
// hills lit from the north-west, dark on their far sides) under the moon, the heights a little paler, a cool fill in the shadow.
const GROUND_VERT = /* glsl */ `
varying vec3 vN; varying vec3 vC; varying float vY;
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`;
const GROUND_FRAG = /* glsl */ `
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise; varying vec3 vN; varying vec3 vC; varying float vY;
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  gl_FragColor = vec4(c, 1.0);
}`;
// The shallows round an island (shallowMaterial): the sea pale and green-blue by the shore, fading into the deep (the reference's
// light coastal water), from each sample's depth.
const SHALLOW_VERT = /* glsl */ `
attribute float aDepth; varying float vD;
void main() { vD = aDepth; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`;
const SHALLOW_FRAG = /* glsl */ `
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD;
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`;
/** The sea's shallows' colours, and a lake's (lighter than the sea, as in the game: about 0.15, 0.28, 0.37 against 0.09, 0.18,
 *  0.26; hotel, #711), each pale by its shore. */
const SEA_WATER = { deep: new THREE.Color(0.08, 0.2, 0.34), pale: new THREE.Color(0.22, 0.46, 0.52) }, LAKE_WATER = { deep: new THREE.Color(0.15, 0.28, 0.37), pale: new THREE.Color(0.3, 0.52, 0.56) };
/** How deep (m) a lake's shallows fade out to. */
const LAKE_SHALLOWS = 6;

/** One island's meshes and where it is. */
interface Isle { d: ChartIsland; group: THREE.Group; pick: THREE.Mesh; x: number; z: number; top: number; reach: number; sigil?: THREE.Mesh; glow?: THREE.Mesh; tier?: number; size?: number }

/** A sigil as a white texture, `px` across, whole pixels, at a detail tier (art/sigilDetail.js). */
function sigilTexture(id: string, px = 24, tier = 0): THREE.Texture {
  const ink = sigilDetail(id, px, { tier }), data = new Uint8Array(px * px * 4);
  for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) { const i = y * px + x, o = ((px - 1 - y) * px + x) * 4; if (ink[i]) data.set([255, 255, 255, 255], o); }
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
/** An island's loops in its shape's units about its middle (shape y is -z, as the extrusion is laid flat), scaled to its reach on
 *  the chart; and the scale (units a metre) and middle (m) its real land was put there with. Its real outline's (every other
 *  point: a chart pixel is far coarser than its step), else its round coast's (art/islands.js islandPoints). */
function islandLoops(d: ChartIsland): { loops: Loop[]; k: number; cx: number; cz: number } {
  const o = d.outline, want = reachOf(d);
  if (o && o.loops.some(l => l.sea)) {
    const cx = (o.box.minX + o.box.maxX) / 2, cz = (o.box.minZ + o.box.maxZ) / 2;
    let far = 0;
    for (const l of o.loops) if (l.sea) for (let i = 0; i < l.pts.length; i += 2) far = Math.max(far, Math.hypot(l.pts[i] - cx, l.pts[i + 1] - cz));
    const k = want / Math.max(1, far), out: Loop[] = [];
    for (const l of o.loops) {
      const n = l.pts.length / 2, by = n > 160 ? 2 : 1, pts: THREE.Vector2[] = [];
      for (let i = 0; i < n; i += by) pts.push(new THREE.Vector2((l.pts[i * 2] - cx) * k, -(l.pts[i * 2 + 1] - cz) * k));
      if (pts.length >= 3) out.push({ pts, sea: l.sea });
    }
    if (out.some(l => l.sea)) return { loops: out, k, cx, cz };
  }
  const raw = (islandPoints(d.radii) as [number, number][]).map(([px, py]) => new THREE.Vector2(px - 0.5, -(py - 0.5)));
  const far = Math.max(...raw.map(p => p.length())), k = want / far;
  return { loops: [{ pts: raw.map(p => p.multiplyScalar(k)), sea: true }], k: 0, cx: 0, cz: 0 };
}
const middle = (pts: THREE.Vector2[]) => pts.reduce((a, p) => a.add(p), new THREE.Vector2()).divideScalar(pts.length);
const tmp = new THREE.Vector3();
const col = (c: readonly number[], k = 1) => new THREE.Color((c[0] / 255) * k, (c[1] / 255) * k, (c[2] / 255) * k);

export class SeaChart {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera: THREE.PerspectiveCamera;
  private scene = new THREE.Scene();
  private post: Post;
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
  private w = 1; private h = 1;

  constructor(readonly canvas: HTMLCanvasElement, readonly tuning: ChartTuning) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.camera = new THREE.PerspectiveCamera(tuning.camera.fov ?? 40, 1, 1, 4000);
    this.post = new Post(this.renderer, tuning);
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

  /** An island: its land rising out of the sea (its real ground once made: its hills, each area's floor, its beaches, its lakes
   *  under the water; till then a low landmass raised from its round coast), a shelf of shallows round it; its sigil lying on
   *  it glowing if she can sail there; a gold ring on the water if won. */
  private island(d: ChartIsland): Isle {
    const g = new THREE.Group(), x = d.x * CHART_SCALE, z = d.y * CHART_SCALE;
    g.position.set(x, 0, z); this.scene.add(g);
    const { loops, k, cx, cz } = islandLoops(d), seas = loops.filter(l => l.sea);
    const dim = d.unknown ? 0.72 : d.sail ? 1 : 0.85, home = d.id === "home", reach = reachOf(d);
    let body: THREE.Mesh, top: number;
    const G = d.outline?.ground;
    if (!G || !(k > 0)) { // a shelf of shallows round the round coast (the real ground brings its own)
      const shelfShape = seas.map(l => { const c = middle(l.pts); return new THREE.Shape(l.pts.map(v => c.clone().lerp(v, 1.12))); });
      g.add(new THREE.Mesh(new THREE.ShapeGeometry(shelfShape).rotateX(-Math.PI / 2).translate(0, 0.04, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.1, 0.2, 0.32).multiplyScalar(dim), transparent: true, opacity: 0.8, depthWrite: false })));
    }
    if (G && k > 0) { // its real ground: a heightfield, each sample its height and colour, lit by the moon
      const { cols, rows, step } = G, pos = new Float32Array(cols * rows * 3), colour = new Float32Array(cols * rows * 3), idx: number[] = [];
      let hi = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const i = r * cols + c, hm = G.h[i], y = hm > 0 ? 0.04 + hm * k * RELIEF : -0.12; // (the shore shelving gently into the water)
        pos[i * 3] = (G.x0 + c * step - cx) * k; pos[i * 3 + 1] = y; pos[i * 3 + 2] = (G.z0 + r * step - cz) * k;
        for (let j = 0; j < 3; j++) colour[i * 3 + j] = (G.rgb[i * 3 + j] / 255) * dim;
        hi = Math.max(hi, y);
      }
      for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
        const a = r * cols + c, b = a + 1, e = a + cols, f = e + 1;
        if (G.h[a] <= 0 && G.h[b] <= 0 && G.h[e] <= 0 && G.h[f] <= 0) continue; // (open water: nothing to draw)
        idx.push(a, e, b, b, e, f);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("color", new THREE.BufferAttribute(colour, 3)); geo.setIndex(idx);
      geo.computeVertexNormals();
      body = new THREE.Mesh(geo, this.groundMaterial);
      top = hi;
      // the shallows: the water over every sample within reach of the shore, flat on the sea, by its depth
      const flat = new Float32Array(cols * rows * 3), depth = new Float32Array(cols * rows), wi: number[] = [];
      for (let i = 0; i < cols * rows; i++) { flat[i * 3] = pos[i * 3]; flat[i * 3 + 1] = 0.03; flat[i * 3 + 2] = pos[i * 3 + 2]; depth[i] = G.h[i] > 0 || G.water?.[i] === 2 ? 0 : Math.min(1, -G.h[i] / SHALLOWS); }
      for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
        const a = r * cols + c, b = a + 1, e = a + cols, f = e + 1;
        if (depth[a] >= 1 && depth[b] >= 1 && depth[e] >= 1 && depth[f] >= 1) continue;
        if (G.h[a] > 0 && G.h[b] > 0 && G.h[e] > 0 && G.h[f] > 0) continue; // (under the land: nothing to show)
        wi.push(a, e, b, b, e, f);
      }
      const wg = new THREE.BufferGeometry();
      wg.setAttribute("position", new THREE.BufferAttribute(flat, 3)); wg.setAttribute("aDepth", new THREE.BufferAttribute(depth, 1)); wg.setIndex(wi);
      const waterMat = (w: { deep: THREE.Color; pale: THREE.Color }, opaque: number) => new THREE.ShaderMaterial({ vertexShader: SHALLOW_VERT, fragmentShader: SHALLOW_FRAG, uniforms: { uDim: { value: 0.6 + 0.4 * dim }, uOpaque: { value: opaque }, uDeep: { value: w.deep }, uPale: { value: w.pale } }, transparent: opaque < 1, depthWrite: opaque >= 1 });
      g.add(new THREE.Mesh(wg, waterMat(SEA_WATER, 0)));
      // the lakes: still water at each one's level, in its hollow, pale where it's shallow by its shore
      if (G.water && G.level) {
        const lp = new Float32Array(cols * rows * 3), ld = new Float32Array(cols * rows), li: number[] = [];
        for (let i = 0; i < cols * rows; i++) {
          const lv = G.water[i] === 2 ? G.level[i] : 0;
          lp[i * 3] = pos[i * 3]; lp[i * 3 + 1] = 0.06 + lv * k * RELIEF; lp[i * 3 + 2] = pos[i * 3 + 2];
          ld[i] = G.water[i] === 2 ? Math.min(1, (G.level[i] - G.h[i]) / LAKE_SHALLOWS) : 0;
        }
        // (a lake's edge samples take the level of the lake next to them, so its water meets its shore)
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const i = r * cols + c; if (G.water[i] === 2) continue;
          for (const j of [i - 1, i + 1, i - cols, i + cols]) if (j >= 0 && j < cols * rows && G.water[j] === 2) { lp[i * 3 + 1] = 0.06 + G.level[j] * k * RELIEF; break; }
        }
        for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
          const a = r * cols + c, b = a + 1, e = a + cols, f = e + 1;
          if (G.water[a] === 2 || G.water[b] === 2 || G.water[e] === 2 || G.water[f] === 2) li.push(a, e, b, b, e, f);
        }
        if (li.length) {
          const lg = new THREE.BufferGeometry();
          lg.setAttribute("position", new THREE.BufferAttribute(lp, 3)); lg.setAttribute("aDepth", new THREE.BufferAttribute(ld, 1)); lg.setIndex(li);
          g.add(new THREE.Mesh(lg, waterMat(LAKE_WATER, 1)));
        }
      }
    } else { // till then: a low landmass raised from its round coast
      const H = home ? 1.6 : 1.1, c = col(ISLAND_LOOK.land2, dim * 1.6);
      const lam = (cc: THREE.Color) => new THREE.MeshLambertMaterial({ color: cc, emissive: cc.clone().multiplyScalar(0.18) });
      body = new THREE.Mesh(new THREE.ExtrudeGeometry(seas.map(l => new THREE.Shape(l.pts)), { depth: H, bevelEnabled: true, bevelThickness: 0.4, bevelSize: 0.5, bevelSegments: 1, curveSegments: 4 }).rotateX(-Math.PI / 2), [lam(c), lam(col(ISLAND_LOOK.sand, dim * 0.9))]);
      top = H + 0.4;
    }
    g.add(body);
    const isle: Isle = { d, group: g, pick: body, x, z, top, reach };
    if (d.sail) { // its sigil, lying over the land and glowing as a placed sigil does, a halo of its light under it
      const c = sigilColour(d.sigil), s = reach * SIGIL_SHARE;
      const sg = new THREE.Mesh(new THREE.PlaneGeometry(s, s).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: this.sigilArt(d.sigil, 0), color: col(c, 0.95), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      sg.position.y = top + 0.35; g.add(sg); isle.sigil = sg; isle.tier = 0; isle.size = s;
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(s * 1.6, s * 1.6).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: this.glow, color: col(c, 0.16), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      halo.position.y = top + 0.25; g.add(halo); isle.glow = halo;
    }
    if (d.won) { // won: a gold ring on the water round it
      const r = reach * 1.3;
      const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.95, r, 96).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe8b46a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.position.y = 0.12; g.add(ring);
    }
    return isle;
  }

  /** The islands' ground: each sample's own colour (its area's floor, the beach's sand), lit by the moon so the hills show, a
   *  little of the night's blue in the shadows; not the scene's lights, whose blue would drown the areas' colours. */
  private groundMaterial = new THREE.ShaderMaterial({
    vertexShader: GROUND_VERT, fragmentShader: GROUND_FRAG,
    uniforms: { uMoon: { value: new THREE.Vector3(-0.3, 0.6, -0.9).normalize() }, uShade: { value: new THREE.Vector3(-0.7, 0.45, -0.55).normalize() }, uRise: { value: 3 } },
    vertexColors: true,
  });

  /** A sigil's art at a tier (SIGIL_TIERS), made once. */
  private sigilArts = new Map<string, THREE.Texture>();
  private sigilArt(id: string, tier: number): THREE.Texture {
    const key = `${id}|${tier}`;
    let t = this.sigilArts.get(key);
    if (!t) { t = sigilTexture(id, SIGIL_TIERS[tier].px, tier); this.sigilArts.set(key, t); }
    return t;
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

  /** Choose an island: the camera glides to it; the ring goes round it. */
  select(id: string | null, instant = false): void {
    this.selected = id && this.isles.has(id) ? id : null;
    const i = this.selected ? this.isles.get(this.selected)! : null;
    this.aim.set(i ? i.x : 0, 0, i ? i.z : 0);
    if (instant) this.focus.copy(this.aim);
  }
  /** Nearer or further (a share of the default), within reason. */
  zoom(k: number): void { this.distTo = Math.max(CLOSEST, Math.min(this.distMax, this.distTo * k)); }

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
    const p = CHART_PIXEL;
    this.w = Math.max(1, Math.ceil(cssW / p)); this.h = Math.max(1, Math.ceil(cssH / p));
    this.renderer.setSize(this.w, this.h, false);
    this.post.resize(this.w, this.h, this.w, this.h);
    this.canvas.style.width = `${this.w * p}px`; this.canvas.style.height = `${this.h * p}px`;
    this.camera.aspect = this.w / this.h; this.camera.updateProjectionMatrix();
    (this.skyU.uRes.value as THREE.Vector2).set(this.w, this.h);
    // how far the camera stands for a sigil to span so many art pixels across (a flat sigil keeps its width as it tilts away)
    const at = (px: number) => (SIGIL_TYPICAL * this.h) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * px);
    const was = this.distOpen;
    this.distOpen = at(SIGIL_OPEN_PX); this.distMax = at(SIGIL_MIN_PX);
    if (!this.sized) { this.dist = this.distTo = this.distOpen; this.sized = true; }
    else { this.distTo = Math.max(CLOSEST, Math.min(this.distMax, this.distTo * (this.distOpen / was))); this.dist = this.distTo; }
  }

  /** A frame: the camera eases toward the chosen island, the sea moves, the sigils pulse. */
  frame(dt: number, time: number): void {
    this.uTime.value = time;
    const k = 1 - Math.exp(-dt * 3.2);
    this.focus.lerp(this.aim, k); this.dist += (this.distTo - this.dist) * k;
    // tilted down, looking north (-z), never turning (as the game's camera)
    this.camera.position.set(this.focus.x, this.focus.y + Math.sin(this.pitch) * this.dist, this.focus.z + Math.cos(this.pitch) * this.dist);
    this.camera.lookAt(this.focus.x, 0, this.focus.z + this.dist * 0.035); // (the chosen island a little above the middle, clear of its card)
    // the depth range round what it's looking at (from one island close in to the whole sea: a fixed range would lose the
    // precision to keep the rings and the shallows off the water)
    const near = Math.max(0.5, this.dist * 0.25), far = this.dist * 3 + 400;
    if (Math.abs(near - this.camera.near) > 0.01 || Math.abs(far - this.camera.far) > 1) { this.camera.near = near; this.camera.far = far; this.camera.updateProjectionMatrix(); }
    this.post.lift = 0; // (the ground's gentler tilt-shift: the sigils off the middle still read)
    for (const i of this.isles.values()) {
      const pulse = 0.85 + 0.15 * Math.sin(time * 1.6 + i.x * 0.1), chosen = i.d.id === this.selected;
      let fade = 1;
      if (i.sigil) {
        const m = i.sigil.material as THREE.MeshBasicMaterial;
        // its art by how big it shows (a texture about as many pixels as it spans)
        const px = (i.size! * this.h) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * this.camera.position.distanceTo(tmp.set(i.x, i.top, i.z)));
        fade = px > 220 ? Math.max(0, 1 - (px - 220) / 260) : 1; // (close in, it fades away: the land is the thing to see)
        m.opacity = pulse * fade;
        i.sigil.visible = fade > 0;
        let tier = 0; for (let t = 1; t < SIGIL_TIERS.length; t++) if (px >= SIGIL_TIERS[t].from) tier = t;
        if (tier !== i.tier) { i.tier = tier; m.map = this.sigilArt(i.d.sigil, tier); m.needsUpdate = true; }
      }
      if (i.glow) { (i.glow.material as THREE.MeshBasicMaterial).opacity = (chosen ? 0.85 : 0.7) * pulse * fade; i.glow.visible = i.sigil?.visible ?? true; }
      i.group.position.y = chosen ? Math.sin(time * 2) * 0.12 : 0;
    }
    const sel = this.selected ? this.isles.get(this.selected) : null;
    this.ring.visible = !!sel;
    if (sel) { const r = sel.reach * 1.6 * (1 + 0.04 * Math.sin(time * 3)); this.ring.position.set(sel.x, 0.15, sel.z); this.ring.scale.set(r, 1, r); (this.ring.material as THREE.MeshBasicMaterial).opacity = 0.7 + 0.3 * Math.sin(time * 3); }
    this.post.render(this.scene, this.camera);
  }
}
