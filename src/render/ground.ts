// The forest floor: one plane under the whole map, coloured per pixel in the shader from the
// Art Lab's ground recipe (noisy patches, each area's own tint, paler in clearings, a pale ring
// for the dancefloor), on the art's pixel grid so it reads as pixel art.
//
// Which area each spot belongs to comes from a data texture filled in small tiles near the
// camera (working the partition out for the whole map at once takes seconds on a phone).
import * as THREE from "three";
import type { ForestMap } from "../rules/map";
import type { Forest } from "../rules/forest";
import { AREA_TYPES } from "../rules/map";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import type { TilePixels } from "./artBuild";
import type { Style } from "./style";

const TEXELS_PER_METRE = 2;
const TILE = 32; // texels
const FLOOR_COLS = 8;

const VERT = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
uniform vec4 uCircle;
uniform vec4 uSweeps[4]; // partifying areas: the front's origin x, z, its radius, strength
uniform int uSweepCount; // magic circle: hue, second hue, brightness (pulsing), rune band's turn (radians)

// The magic circle on the dancefloor, in art pixels: rings, a band of rune glyphs that turns,
// and a five-pointed star. Returns 0 (nothing), 1 (lines) or 2 (runes).
float magicCircle(vec2 d, float R, float px) {
  float r = length(d), ang = atan(d.y, d.x);
  if (abs(r - R * 0.9) < px * 0.8 || abs(r - R * 0.76) < px * 0.8 || abs(r - R * 0.36) < px * 0.6) return 1.0;
  if (r > R * 0.78 && r < R * 0.88) {
    float n = 44.0, a = (ang + uCircle.w) * n / 6.2831853, ci = floor(a), u = fract(a), v = (r - R * 0.78) / (R * 0.1);
    if (u > 0.18 && u < 0.82) {
      int gx = int((u - 0.18) / 0.64 * 3.0), gy = int(v * 4.0);
      int bits = int(fract(sin(ci * 91.7 + 3.1) * 43758.5453) * 4095.0) | 18;
      if (((bits >> (gx + gy * 3)) & 1) == 1) return 2.0;
    }
  }
  if (r < R * 0.76) {
    for (int k = 0; k < 5; k++) {
      float a0 = -1.5707963 + float(k) * 2.5132741, a1 = a0 + 2.5132741;
      vec2 p0 = vec2(cos(a0), sin(a0)) * R * 0.76, p1 = vec2(cos(a1), sin(a1)) * R * 0.76, e = p1 - p0;
      float t = clamp(dot(d - p0, e) / dot(e, e), 0.0, 1.0);
      if (length(d - p0 - e * t) < px * 0.7) return 1.0;
    }
  }
  return 0.0;
}
uniform vec4 uCanopy; // canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing; // clearingSize, clearingFalloff: where trees, and so canopy, begin
varying vec3 vWorld;
${LIGHT_GLSL}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
vec3 hsv(float h, float s, float v) {
  vec3 k = clamp(abs(mod(fract(h) * 6.0 + vec3(0, 4, 2), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return clamp(v, 0.0, 1.0) * mix(vec3(1.0), k, clamp(s, 0.0, 1.0));
}
void main() {
  vec2 px = floor(vWorld.xz / uPixel);           // the art pixel this fragment is in
  vec2 p = (px + 0.5) * uPixel;                   // its centre, in metres
  // Wobble the lookup a little so area borders read as ragged, not as the texture's grid.
  vec2 j = vec2(vnoise(px / 5.0) - 0.5, vnoise(px / 5.0 + 17.0) - 0.5) * 0.9;
  vec4 area = texture2D(uAreas, (p + j - uExtent.xy) / uExtent.zw);
  float open = area.a > 0.5 ? area.g : 1.0;
  int t = int(area.r * 255.0 + 0.5);
  vec3 c;
  if (area.a > 0.5 && uFloorReady[t] > 0.5) {
    // The area's floor tile, repeated on the art's pixel grid.
    vec2 cell = vec2(mod(float(t), ${FLOOR_COLS}.0), floor(float(t) / ${FLOOR_COLS}.0));
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * uTile + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The dancefloor: worn ground inside the stones, and the glowing magic circle (unlit: it glows).
  float r = length(p - uFloor.xy);
  if (r < uFloor.z) c = mix(c, vec3(0.42, 0.42, 0.38), 0.25);
  if (r < uFloor.z) {
    float mc = magicCircle(p - uFloor.xy, uFloor.z, uPixel);
    if (mc > 0.5) {
      vec3 col = hsv(mc > 1.5 ? uCircle.y : uCircle.x, 0.75, 1.0) * uCircle.z;
      gl_FragColor = vec4(haze(col, vWorld), 1.0);
      return;
    }
  }
  // Ponds: dark water mirroring the moon. The glint is a fake highlight from the view and a
  // moon mirrored into the sky ahead, so it slides as the camera moves, and shimmers.
  {
    if (area.a > 0.5 && area.b > 0.5) {
      vec3 V = normalize(cameraPosition - vec3(p.x, 0.0, p.y));
      vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
      vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
      float spec = dot(R, moon) + (vnoise(px * vec2(0.6, 2.5) + vec2(uTime * 1.5, 0.0)) - 0.5) * 0.05;
      vec3 water = vec3(0.015, 0.03, 0.055) * nightLight(vec3(0.0, 1.0, 0.0), vWorld) * 4.0;
      if (spec > 0.985) water = vec3(0.92, 0.95, 1.0);
      else if (spec > 0.965) water = vec3(0.45, 0.55, 0.7);
      else if (mod(px.y, 4.0) < 1.0 && vnoise(px / 3.0 + uTime) > 0.62) water += vec3(0.06, 0.08, 0.12); // ripples
      gl_FragColor = vec4(haze(water, vWorld), 1.0);
      return;
    }
  }
  // The party arriving: a front of glowing runes sweeping across the area, a soft glow behind it.
  for (int i = 0; i < 4; i++) {
    if (i >= uSweepCount) break;
    float d = length(p - uSweeps[i].xy), front = uSweeps[i].z, k = uSweeps[i].w;
    if (k <= 0.0 || d > front + 3.0) continue;
    if (abs(d - front) < 2.2) {
      vec2 cell = floor(px / 3.0);
      if (fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453) > 0.55 && mod(px.x + px.y, 3.0) < 2.0) {
        vec3 col = mod(cell.x + cell.y, 2.0) > 0.5 ? hsv(uCircle.x, 0.7, 1.0) : hsv(uCircle.y, 0.7, 1.0);
        gl_FragColor = vec4(haze(col * k, vWorld), 1.0);
        return;
      }
    }
    if (d < front) c += hsv(uCircle.x, 0.6, 0.18) * k * (1.0 - smoothstep(0.0, 1.0, (front - d) / 30.0));
  }
  float moonK = 1.0;
  if (uCanopy.x > 0.0) {
    // The canopy's shadow: a dappled layer at canopy height, cast along the moonlight onto the
    // ground, drifting with the wind; thinner where the canopy thins, in the clearings.
    vec2 q = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(q / 2.6) * 0.6 + vnoise(q / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (open - uClearing.x) / max(0.01, uClearing.y));
    float edge = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.03 : -0.03;
    if (uSmooth > 0.5) moonK = 1.0 - uCanopy.x * smoothstep(-0.07, 0.07, cover - leaves);
    else if (leaves + edge < cover) moonK = 1.0 - uCanopy.x;
  }
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, moonK);
  gl_FragColor = vec4(haze(min(vec3(1.0), c * light * 1.25), vWorld), 1.0);
}
`;

export class Ground {
  readonly mesh: THREE.Mesh;
  private texture: THREE.DataTexture;
  private tile = new THREE.DataTexture(new Uint8Array(TILE * TILE * 4), TILE, TILE);
  private filled: Uint8Array;
  private tilesX: number;
  private tilesZ: number;
  private initialised = false;
  private floorReady = new Array(32).fill(0);
  private floors: THREE.DataTexture;
  private pendingFloors: [number, TilePixels][] = [];

  constructor(private map: ForestMap, private forest: Forest, st: Style, metresPerPixel: number) {
    const e = map.extent, w = e.maxX - e.minX, d = e.maxZ - e.minZ;
    const W = Math.ceil((w * TEXELS_PER_METRE) / TILE) * TILE, H = Math.ceil((d * TEXELS_PER_METRE) / TILE) * TILE;
    this.tilesX = W / TILE; this.tilesZ = H / TILE;
    this.filled = new Uint8Array(this.tilesX * this.tilesZ);
    const nearest = (t: THREE.DataTexture) => { t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true; return t; };
    this.texture = nearest(new THREE.DataTexture(new Uint8Array(W * H * 4), W, H));
    nearest(this.tile);
    this.floors = nearest(new THREE.DataTexture(new Uint8Array(64 * FLOOR_COLS * 48 * 4 * 4), 64 * FLOOR_COLS, 48 * 4));
    const floors = Array.from({ length: 32 }, (_, i) => new THREE.Vector3(...(AREA_TYPES[i]?.floor ?? [0.25, 0.45, 0.4])));
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        ...LIGHT_UNIFORMS,
        uAreas: { value: this.texture },
        uExtent: { value: new THREE.Vector4(e.minX, e.minZ, W / TEXELS_PER_METRE, H / TEXELS_PER_METRE) },
        uPixel: { value: metresPerPixel },
        uTypeFloor: { value: floors },
        uFloorReady: { value: this.floorReady },
        uFloors: { value: this.floors },
        uTile: { value: new THREE.Vector2(64, 48) },
        uFloorsSize: { value: new THREE.Vector2(64 * FLOOR_COLS, 48 * 4) },
        uSat: { value: st.sat },
        uFloor: { value: new THREE.Vector3(map.dancefloor.x, map.dancefloor.z, map.dancefloor.radius) },
        uCanopy: { value: new THREE.Vector4() },
        uCircle: { value: new THREE.Vector4() },
        uSweeps: { value: Array.from({ length: 4 }, () => new THREE.Vector4()) },
        uSweepCount: { value: 0 },
        uClearing: { value: new THREE.Vector2(map.tuning.clearingSize, map.tuning.clearingFalloff) },
      },
    });
    const geo = new THREE.PlaneGeometry(w + 400, d + 400);
    geo.rotateX(-Math.PI / 2);
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set((e.minX + e.maxX) / 2, 0, (e.minZ + e.maxZ) / 2);
  }

  /** The fronts of light sweeping across areas as the party arrives (up to 4). */
  setSweeps(sweeps: { x: number; z: number; radius: number; strength: number }[]): void {
    const u = (this.mesh.material as THREE.ShaderMaterial).uniforms, list = u.uSweeps.value as THREE.Vector4[];
    sweeps.slice(0, 4).forEach((w, i) => list[i].set(w.x, w.z, w.radius, w.strength));
    u.uSweepCount.value = Math.min(4, sweeps.length);
  }

  /** The magic circle: its two hues, brightness now, and the rune band's turn. */
  setCircle(hue: number, hue2: number, brightness: number, turn: number): void {
    ((this.mesh.material as THREE.ShaderMaterial).uniforms.uCircle.value as THREE.Vector4).set(hue, hue2, brightness, turn);
  }

  /** The canopy shadow layer's settings (strength 0 turns it off). */
  setCanopyShadow(strength: number, height: number, cover: number, wind: number): void {
    ((this.mesh.material as THREE.ShaderMaterial).uniforms.uCanopy.value as THREE.Vector4).set(strength, height, cover, wind);
  }

  /** An area type's floor tile has been drawn: put it in the atlas (on the next fill). */
  setFloor(type: number, tile: TilePixels): void { this.pendingFloors.push([type, tile]); }

  private placeFloors(renderer: THREE.WebGLRenderer): void {
    for (const [type, tile] of this.pendingFloors) {
      const u = this.mesh.material as THREE.ShaderMaterial, size = u.uniforms.uTile.value as THREE.Vector2;
      if (tile.w !== size.x || tile.h !== size.y) continue; // a tile of another size: keep the flat colour
      const t = new THREE.DataTexture(tile.albedo, tile.w, tile.h);
      t.needsUpdate = true;
      renderer.copyTextureToTexture(t, this.floors, null, new THREE.Vector2((type % FLOOR_COLS) * tile.w, Math.floor(type / FLOOR_COLS) * tile.h));
      t.dispose();
      this.floorReady[type] = 1;
    }
    this.pendingFloors = [];
  }

  /** Fill the area tiles over a rectangle of ground, nearest (x, z) first, for up to `budgetMs`.
   *  Returns how many there are still missing. */
  fill(renderer: THREE.WebGLRenderer, rect: { minX: number; maxX: number; minZ: number; maxZ: number }, x: number, z: number, budgetMs: number): number {
    if (!this.initialised) { renderer.initTexture(this.texture); renderer.initTexture(this.floors); this.initialised = true; }
    if (this.pendingFloors.length) this.placeFloors(renderer);
    const e = this.map.extent, tm = TILE / TEXELS_PER_METRE;
    const i0 = Math.max(0, Math.floor((rect.minX - e.minX) / tm)), i1 = Math.min(this.tilesX - 1, Math.floor((rect.maxX - e.minX) / tm));
    const j0 = Math.max(0, Math.floor((rect.minZ - e.minZ) / tm)), j1 = Math.min(this.tilesZ - 1, Math.floor((rect.maxZ - e.minZ) / tm));
    const cx = (x - e.minX) / tm, cz = (z - e.minZ) / tm, todo: [number, number, number][] = [];
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++)
      if (!this.filled[j * this.tilesX + i]) todo.push([i, j, (i + 0.5 - cx) ** 2 + (j + 0.5 - cz) ** 2]);
    todo.sort((a, b) => a[2] - b[2]);
    const t0 = performance.now();
    let done = 0;
    for (const [i, j] of todo) {
      if (done > 0 && performance.now() - t0 > budgetMs) break;
      this.fillTile(renderer, i, j);
      done++;
    }
    return todo.length - done;
  }

  private fillTile(renderer: THREE.WebGLRenderer, i: number, j: number): void {
    const e = this.map.extent, data = this.tile.image.data as Uint8Array, tm = TILE / TEXELS_PER_METRE;
    const x0 = e.minX + i * tm, z0 = e.minZ + j * tm;
    // Ponds are part of the ground: every one is marked in the tile, so none can pop.
    const ponds = this.forest.lightsNear(x0 + tm / 2, z0 + tm / 2, tm / 2 + 6).filter(l => l.kind === "pond");
    for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) {
      const wx = x0 + (x + 0.5) / TEXELS_PER_METRE, wz = z0 + (y + 0.5) / TEXELS_PER_METRE;
      const a = this.map.areaAt(wx, wz), o = (y * TILE + x) * 4;
      let pond = 0;
      for (const p of ponds) if (Math.hypot(wx - p.x, wz - p.z) < 3 * p.size) pond = 255;
      data[o] = a.type; data[o + 1] = Math.round(a.openness * 255); data[o + 2] = pond; data[o + 3] = 255;
    }
    this.tile.needsUpdate = true;
    renderer.copyTextureToTexture(this.tile, this.texture, null, new THREE.Vector2(i * TILE, j * TILE));
    this.filled[j * this.tilesX + i] = 1;
  }

  dispose(): void { this.texture.dispose(); this.tile.dispose(); this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose(); }
}
