// The forest floor: one plane under the whole map, coloured per pixel in the shader from the
// Art Lab's ground recipe (noisy patches, each area's own tint, paler in clearings, a pale ring
// for the dancefloor), on the art's pixel grid so it reads as pixel art.
//
// Which area each spot belongs to comes from a data texture filled in small tiles near the
// camera (working the partition out for the whole map at once takes seconds on a phone).
import * as THREE from "three";
import type { ForestMap } from "../rules/map";
import { AREA_TYPES } from "../rules/map";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import type { Style } from "./style";

const TEXELS_PER_METRE = 2;
const TILE = 32; // texels

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
uniform float uTypeHue[32];
uniform float uGroundHue, uGroundVal, uSat, uContrast;
uniform vec3 uFloor; // dancefloor x, z, radius
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
  float gh = uGroundHue + (area.a > 0.5 ? uTypeHue[t] * uContrast / 0.6 : 0.0);
  float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
  vec3 c = hsv(gh, 0.5 * uSat, uGroundVal);
  if (v < 0.38) c = hsv(gh + 0.04, 0.55 * uSat, uGroundVal * 0.8);
  else if (v > 0.66) c = hsv(gh - 0.03, 0.45 * uSat, uGroundVal * 1.15);
  else if (hash(px * 0.37) < 0.04) c = hsv(gh + 0.1, 0.3 * uSat, uGroundVal * 0.9);
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The dancefloor: a worn ring of pale stones.
  float r = length(p - uFloor.xy);
  if (r < uFloor.z) c = mix(c, vec3(0.42, 0.42, 0.38), 0.25);
  if (abs(r - uFloor.z) < uPixel * 1.5 && hash(px * 0.71) < 0.8) c = vec3(150.0, 150.0, 135.0) / 255.0;
  gl_FragColor = vec4(min(vec3(1.0), c * nightLight(vec3(0.0, 1.0, 0.0), vWorld) * 1.25), 1.0);
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

  constructor(private map: ForestMap, st: Style, metresPerPixel: number) {
    const e = map.extent, w = e.maxX - e.minX, d = e.maxZ - e.minZ;
    const W = Math.ceil((w * TEXELS_PER_METRE) / TILE) * TILE, H = Math.ceil((d * TEXELS_PER_METRE) / TILE) * TILE;
    this.tilesX = W / TILE; this.tilesZ = H / TILE;
    this.filled = new Uint8Array(this.tilesX * this.tilesZ);
    const nearest = (t: THREE.DataTexture) => { t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true; return t; };
    this.texture = nearest(new THREE.DataTexture(new Uint8Array(W * H * 4), W, H));
    nearest(this.tile);
    const hues = new Array(32).fill(0);
    AREA_TYPES.forEach((t, i) => (hues[i] = t.groundHue));
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        ...LIGHT_UNIFORMS,
        uAreas: { value: this.texture },
        uExtent: { value: new THREE.Vector4(e.minX, e.minZ, W / TEXELS_PER_METRE, H / TEXELS_PER_METRE) },
        uPixel: { value: metresPerPixel },
        uTypeHue: { value: hues },
        uGroundHue: { value: st.groundHue }, uGroundVal: { value: st.groundVal }, uSat: { value: st.sat }, uContrast: { value: st.areaContrast },
        uFloor: { value: new THREE.Vector3(map.dancefloor.x, map.dancefloor.z, map.dancefloor.radius) },
      },
    });
    const geo = new THREE.PlaneGeometry(w + 400, d + 400);
    geo.rotateX(-Math.PI / 2);
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set((e.minX + e.maxX) / 2, 0, (e.minZ + e.maxZ) / 2);
  }

  /** Fill area tiles nearest (x, z) first, within `radius` metres, for up to `budgetMs`. Returns how many are still missing there. */
  fill(renderer: THREE.WebGLRenderer, x: number, z: number, radius: number, budgetMs: number): number {
    if (!this.initialised) { renderer.initTexture(this.texture); this.initialised = true; }
    const e = this.map.extent, tm = TILE / TEXELS_PER_METRE;
    const cx = (x - e.minX) / tm, cz = (z - e.minZ) / tm, r = Math.ceil(radius / tm);
    const todo: [number, number, number][] = [];
    for (let j = Math.max(0, Math.floor(cz) - r); j <= Math.min(this.tilesZ - 1, Math.floor(cz) + r); j++)
      for (let i = Math.max(0, Math.floor(cx) - r); i <= Math.min(this.tilesX - 1, Math.floor(cx) + r); i++)
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
    const e = this.map.extent, data = this.tile.image.data as Uint8Array;
    for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) {
      const wx = e.minX + (i * TILE + x + 0.5) / TEXELS_PER_METRE, wz = e.minZ + (j * TILE + y + 0.5) / TEXELS_PER_METRE;
      const a = this.map.areaAt(wx, wz), o = (y * TILE + x) * 4;
      data[o] = a.type; data[o + 1] = Math.round(a.openness * 255); data[o + 2] = 0; data[o + 3] = 255;
    }
    this.tile.needsUpdate = true;
    renderer.copyTextureToTexture(this.tile, this.texture, null, new THREE.Vector2(i * TILE, j * TILE));
    this.filled[j * this.tilesX + i] = 1;
  }

  dispose(): void { this.texture.dispose(); this.tile.dispose(); this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose(); }
}
