// The zoo's gold fences (rules/zooMap.ts zooFence; Ed, 2026-10-26: "Zoo areas, apart from home, should have a little gold
// fence around them, that stop creatures passing"; "lakes get fences too"; "I'm thinking more like the gold fence at the palace of
// Versailles"; "Make it more Versailles. Add fleur-de-lis tips, a curly scroll band and proper urns on the posts. Make it five times
// taller"; the lamps "every 30 metres or so", approved): round every island, found or not, an upright ribbon along its outline
// in the bold pixel style (three gold tones and a highlight, a near-black edge on the ornament: the approved mock,
// previews/ed/zoo-map/fence-close.png, tools/zoo/versailles-tall-mock.cjs). A section is 4 m (30 art pixels, so about 0.13 m a pixel,
// the game's): 5.5 m of railing, bars every 4 pixels with two clear between (the animals show through), a fleur-de-lis on every
// other bar and a spear on the rest, two bands of C-scrolls meeting at rosettes, a pilaster at its start topped with a footed urn
// and its flame (about 8 m). Some sections carry a gilt lamp, spread evenly round each island about every LAMP_EVERY metres, its
// lantern glowing on its own (emissive) and the nearest few lighting the ground (lights(): into the view's light budget). The
// railing dithers away round her line of sight (uHer) so it never hides her. One mesh for the whole zoo, made once.
import * as THREE from "three";
import type { ForestMap } from "../rules/map";
import { reachAt } from "../rules/zooMap";
import { ZOO_CONFIG } from "../rules/zoo";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";
import type { ForestLight } from "./view";

/** A section's width (m) and its art: TW x TH art pixels a tile, two tiles (plain, with a lamp) side by side. */
const SECTION = 4, TW = 30, TH = 72, PX = SECTION / TW, HEIGHT = TH * PX;
/** About how far apart the lamps stand round an island (m), and the lantern's height (m). */
const LAMP_EVERY = 30, LANTERN_Y = 64.5 * PX;
/** How many lamps light the ground at once (the nearest her). */
const LAMP_LIGHTS = 8;

const TONES: Record<string, number[]> = { o: [29, 18, 6], d: [124, 76, 18], m: [207, 149, 38], l: [255, 213, 106], h: [255, 244, 196], g: [255, 217, 138], w: [255, 241, 194] };

/** One tile's pixels: [x, y up from the ground, tone]; `lamp`, with a gilt lamp at its middle. The design of the approved mock. */
function tilePixels(lamp: boolean): { x: number; y: number; t: string; edge?: boolean }[] {
  const gold = new Map<string, { x: number; y: number; t: string; edge: boolean }>(), put = (x: number, y: number, t: string, edge = true) => { x = ((x % TW) + TW) % TW; gold.set(`${x},${y}`, { x, y, t, edge }); };
  // (the rails)
  for (let i = 0; i < TW; i++) for (const [y, t] of [[0, "d"], [1, "m"], [9, "l"], [10, "d"], [29, "l"], [30, "d"], [37, "l"], [38, "d"]] as [number, string][]) put(i, y, t, false);
  // (the bars, a fleur-de-lis on every other one, a spear on the rest)
  for (let i = 5; i < TW - 2; i += 4) {
    for (let y = 2; y <= 40; y++) { if ((y >= 3 && y <= 8) || (y >= 31 && y <= 36)) continue; put(i, y, "l", false); put(i + 1, y, "d", false); }
    const tip: [number, number, string][] = ((i - 5) / 4) % 2 === 0
      ? [[-1, 41, "m"], [0, 41, "l"], [1, 41, "m"], [2, 41, "d"], [0, 42, "h"], [1, 42, "d"], [0, 43, "h"], [1, 43, "l"], [0, 44, "h"], [1, 44, "m"], [0, 45, "h"], [1, 45, "d"], [0, 46, "l"], [1, 46, "d"], [0, 47, "h"],
         [-1, 43, "l"], [-2, 43, "l"], [-3, 44, "l"], [-3, 45, "m"], [-2, 46, "m"], [2, 43, "m"], [3, 43, "d"], [4, 44, "d"], [4, 45, "d"], [3, 46, "d"]]
      : [[0, 41, "l"], [1, 41, "d"], [-1, 42, "l"], [0, 42, "h"], [1, 42, "m"], [2, 42, "d"], [0, 43, "h"], [1, 43, "d"], [0, 44, "l"]];
    for (const [dx, y, t] of tip) put(i + dx, y, t);
  }
  // (the scroll bands: C-scrolls back to back, a rosette where they meet, every 12 pixels; a tile is 30, so they run on as 30 / 12
  // doesn't: each tile starts its band afresh after the pilaster)
  for (const base of [3, 31]) for (let i = 3; i < TW - 1; i++) {
    const u = (i - 3) % 12;
    for (let v = 0; v < 6; v++) for (const [cx, open] of [[3, 1], [9, -1]]) {
      const dx = u - cx, dy = v - 2.5, r = Math.hypot(dx, dy);
      if (Math.abs(r - 2.3) < 0.62 && dx * open < -0.3) put(i, base + v, dy > 0 ? "l" : "m");
      if (r < 0.7 || (Math.abs(dy) < 0.6 && dx * open < 0 && dx * open > -1.2)) put(i, base + v, "h");
    }
    if (u === 0 || u === 6) for (const [dx, dy, t] of [[0, 2, "h"], [0, 3, "h"], [-1, 2, "l"], [1, 3, "d"], [0, 1, "m"], [0, 4, "d"]] as [number, number, string][]) put(i + dx, base + dy, t);
  }
  // (the pilaster at the tile's start, its capital, its urn and flame)
  for (let y = 0; y <= 44; y++) { put(-2, y, "h"); put(-1, y, "l"); put(0, y, "m"); put(1, y, "d"); }
  for (const y of [45, 46]) for (let dx = -3; dx <= 2; dx++) put(dx, y, dx < -1 ? "h" : dx < 1 ? "l" : "d");
  [1, 2, 1, 1, 2, 3, 4, 4, 4, 3, 2, 4].forEach((hw, k) => { for (let dx = -hw; dx <= hw - 1; dx++) put(dx, 47 + k, dx < -hw + 1 ? "h" : dx < 0 ? "l" : dx < hw - 1 ? "m" : "d"); });
  for (const [dx, y, t] of [[-1, 59, "l"], [0, 59, "m"], [-1, 60, "h"], [0, 60, "l"], [-1, 61, "h"], [0, 62, "l"]] as [number, number, string][]) put(dx, y, t);
  // (the lamp: a gilt post at the tile's middle, a scrolled foot, two collars, its lantern, glowing, and its crown)
  if (lamp) {
    const x = 15;
    for (let y = 0; y <= 60; y++) { put(x, y, "l"); put(x + 1, y, "d"); }
    for (const [dx, y, t] of [[-2, 0, "l"], [-1, 0, "l"], [2, 0, "d"], [3, 0, "d"], [-1, 1, "l"], [2, 1, "d"], [-1, 20, "h"], [2, 20, "d"], [-1, 40, "h"], [2, 40, "d"]] as [number, number, string][]) put(x + dx, y, t);
    for (let y = 61; y <= 68; y++) for (let dx = -2; dx <= 3; dx++) put(x + dx, y, dx === -2 || dx === 3 || y === 61 || y === 68 ? "m" : y === 67 ? "w" : "g");
    for (const [dx, y, t] of [[-1, 69, "l"], [0, 69, "h"], [1, 69, "l"], [2, 69, "d"], [0, 70, "l"], [1, 70, "d"], [0, 71, "h"]] as [number, number, string][]) put(x + dx, y, t);
  }
  // (the near-black edge round the ornament, never filling the bars' gaps)
  for (const p of [...gold.values()]) if (p.edge) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = (((p.x + dx) % TW) + TW) % TW, y = p.y + dy; if (y >= 0 && y < TH && !gold.has(`${x},${y}`)) gold.set(`${x},${y}`, { x, y, t: "o", edge: false }); }
  return [...gold.values()];
}

/** The two tiles side by side (2 TW x TH), row 0 at the bottom: alpha 255 gold, 200 a lantern's glass (lit by itself), 0 clear. */
export function fenceAtlas(): Uint8Array {
  const W = TW * 2, px = new Uint8Array(W * TH * 4);
  for (const lamp of [false, true]) for (const p of tilePixels(lamp)) {
    if (p.y < 0 || p.y >= TH) continue;
    const o = (p.y * W + p.x + (lamp ? TW : 0)) * 4, c = TONES[p.t];
    px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = p.t === "g" || p.t === "w" ? 200 : 255;
  }
  return px;
}

const VERT = /* glsl */ `
attribute vec2 base; // the ground point under this corner (x, z)
attribute vec3 st;   // along the section (0-1), up (0 at the foot, 1 at the top), its tile (0 plain, 1 with a lamp)
uniform vec3 uUp;    // the sprites' up (render/sprites.ts): it stands as they do, facing the camera's pitch, so it reads at its full height
varying vec3 vWorld;
varying vec3 vSt;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = vec3(base.x, groundH(base), base.y) + uUp * position.y;
  vWorld = w;
  vSt = st;
  gl_Position = clipOf(w);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uStrip;
uniform vec4 uHer; // her middle (x, y, z), and the radius (m) round her line of sight the railing clears
varying vec3 vWorld;
varying vec3 vSt;
${LIGHT_GLSL}
void main() {
  vec4 c = texture2D(uStrip, vec2((vSt.z + clamp(vSt.x, 0.0, 0.9999)) * 0.5, vSt.y));
  if (c.a < 0.1) discard;
  // (round the line from her to the camera, dithered away by whole screen pixels, so she always shows through it)
  vec3 toCam = normalize(cameraPosition - uHer.xyz), rel = vWorld - uHer.xyz;
  float along = dot(rel, toCam), off = length(rel - toCam * along);
  if (along > 0.0) {
    float k = smoothstep(uHer.w, uHer.w * 0.55, off);
    vec2 q = mod(floor(gl_FragCoord.xy), 2.0);
    if (k > 0.75 || (k > 0.25 && q.x == q.y)) discard;
  }
  vec3 col;
  if (c.a < 0.9) col = c.rgb * 1.25; // (a lantern's glass: its own light)
  else col = min(vec3(1.0), c.rgb * nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, 1.0) * 1.35);
  gl_FragColor = vec4(haze(glowPool(col, vWorld), vWorld), 1.0);
}
`;

export class ZooFences {
  readonly mesh: THREE.Mesh;
  private texture: THREE.DataTexture;
  /** Every lamp's place (its foot), for lights(). */
  readonly lamps: { x: number; z: number }[] = [];
  private material: THREE.ShaderMaterial;
  constructor(map: ForestMap) {
    const L = map.zoo?.layout;
    const pos: number[] = [], base: number[] = [], st: number[] = [], idx: number[] = [];
    for (const I of L?.islands ?? []) {
      // (round its outline in sections of about SECTION metres, a lamp in every LAMP_EVERY metres' worth, spread evenly)
      let per = 0;
      for (let k = 0; k < 96; k++) { const a0 = -Math.PI + (k / 96) * Math.PI * 2, a1 = -Math.PI + ((k + 1) / 96) * Math.PI * 2, r0 = reachAt(I.reach, a0), r1 = reachAt(I.reach, a1); per += Math.hypot(Math.cos(a1) * r1 - Math.cos(a0) * r0, Math.sin(a1) * r1 - Math.sin(a0) * r0); }
      const n = Math.max(12, Math.round(per / SECTION)), nl = Math.max(3, Math.round(per / LAMP_EVERY)), lampAt = new Set(Array.from({ length: nl }, (_, j) => Math.floor(((j + 0.5) * n) / nl)));
      for (let k = 0; k < n; k++) {
        const a0 = -Math.PI + (k / n) * Math.PI * 2, a1 = -Math.PI + ((k + 1) / n) * Math.PI * 2, r0 = reachAt(I.reach, a0), r1 = reachAt(I.reach, a1);
        const x0 = I.x + Math.cos(a0) * r0, z0 = I.z + Math.sin(a0) * r0, x1 = I.x + Math.cos(a1) * r1, z1 = I.z + Math.sin(a1) * r1, v = pos.length / 3, tile = lampAt.has(k) ? 1 : 0;
        for (const [x, z, s, y] of [[x0, z0, 0, 0], [x1, z1, 1, 0], [x1, z1, 1, 1], [x0, z0, 0, 1]]) { pos.push(0, y * HEIGHT, 0); base.push(x, z); st.push(s, y, tile); }
        idx.push(v, v + 1, v + 2, v, v + 2, v + 3);
        if (tile) this.lamps.push({ x: (x0 + x1) / 2, z: (z0 + z1) / 2 });
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("base", new THREE.Float32BufferAttribute(base, 2));
    g.setAttribute("st", new THREE.Float32BufferAttribute(st, 3));
    g.setIndex(idx);
    const t = (this.texture = new THREE.DataTexture(fenceAtlas(), TW * 2, TH));
    t.magFilter = t.minFilter = THREE.NearestFilter; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.needsUpdate = true;
    this.material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uUp: SPRITE_UNIFORMS.uUp, uStrip: { value: t }, uHer: { value: new THREE.Vector4(0, -1e4, 0, 3) } } });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.name = "zooFences";
    this.mesh.frustumCulled = false; // (its corners' places are in base, not position)
  }
  /** Her middle this frame (the railing clears round her line of sight to the camera). */
  update(x: number, y: number, z: number): void { (this.material.uniforms.uHer.value as THREE.Vector4).set(x, y, z, 3); }
  /** The nearest lamps' lights (warm, from their lanterns), for the view's light budget (render/view/lights.ts setLights). */
  lights(x: number, z: number, time: number): ForestLight[] {
    const near = this.lamps.map(l => ({ l, d: Math.hypot(l.x - x, l.z - z) })).filter(p => p.d < 160).sort((a, b) => a.d - b.d).slice(0, LAMP_LIGHTS);
    return near.map(({ l }, i) => ({ x: l.x, y: LANTERN_Y, z: l.z, reach: 16, rgb: LAMP_RGB, strength: 0.95 + 0.05 * Math.sin(time * 2.3 + i) }));
  }
  dispose(): void { this.mesh.geometry.dispose(); this.material.dispose(); this.texture.dispose(); }
}
const LAMP_RGB = new THREE.Vector3(1, 0.78, 0.45);

// The zoo's edge (Ed, 2026-10-26: "all around the flagstones give way to water, which falls off the disc as a waterfall, and behind
// that is space"): a skirt hanging from the lip (the ground's water ends there: render/ground.ts uZooStreet), streaks running
// down it, fading into space, as the sea chart's fall (render/chart/seaChart.ts FALL_FRAG) in the game's whole art pixels.
const FALL_VERT = /* glsl */ `
attribute vec2 base;
attribute vec2 st; // round (0-1), down (0 at the lip, 1 at the bottom)
varying vec3 vWorld;
varying vec2 vSt;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = vec3(base.x, groundH(base) + position.y, base.y);
  vWorld = w;
  vSt = st;
  gl_Position = clipOf(w);
}
`;
const FALL_FRAG = /* glsl */ `
uniform float uTime;
uniform float uCols;
varying vec3 vWorld;
varying vec2 vSt;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  // (in whole pixels: a column a metre and a bit round the rim, 90 rows down the fall)
  float col = floor(vSt.x * uCols), y = floor(vSt.y * 90.0) / 90.0, r = h(col), r2 = h(col + 17.3);
  // the crest: white water rolling over the lip, a lit band and its curl
  float crest = 1.0 - smoothstep(0.0, 0.07, y);
  // the sheet: streaks of white water racing down it, each column its own speed and spacing, over deep blue water
  float speed = 0.9 + r * 0.8, run = fract(y * (2.0 + r2 * 3.0) - uTime * speed + r);
  float streak = step(0.62 - 0.25 * r2, run) * (0.55 + 0.45 * r);
  float band = step(0.5, fract(col * 0.5)) * 0.15; // (alternate columns a shade apart: the water in ropes)
  vec3 deep = vec3(0.1, 0.2, 0.32), white = vec3(0.78, 0.88, 0.96);
  vec3 c = mix(deep * (1.0 + band), white, streak * (1.0 - smoothstep(0.55, 0.95, y)));
  c = mix(c, vec3(0.92, 0.97, 1.0), crest);
  // falling away into the dark: thinning to mist past the middle, gone by the bottom
  float body = 1.0 - smoothstep(0.45, 1.0, y), mist = 0.35 * smoothstep(0.35, 0.7, y) * (1.0 - smoothstep(0.7, 1.0, y)) * (0.6 + 0.4 * h(col * 3.1 + floor(y * 30.0 - uTime * 2.0)));
  float a = max(crest, max(body * (0.85 + 0.15 * streak), mist));
  if (a < 0.02) discard;
  gl_FragColor = vec4(c * (0.55 + 0.45 * body) + vec3(mist * 0.3), a);
}
`;

export class ZooFall {
  readonly mesh: THREE.Mesh;
  constructor(map: ForestMap, lip: number, drop = 70, out = 45) {
    const L = map.zoo?.layout, R = (L?.reach ?? 0) + (ZOO_CONFIG.margin ?? 120) + lip; // (the disc's coast, rules/map.ts, and the lip past it)
    // (the water pouring over the lip, a sheet curving out and down: out metres beyond it as it falls drop metres, so it shows
    // from above past the edge, where a sheer fall would hide behind the lip; the ground cut away over it, render/ground.ts)
    const pos: number[] = [], base: number[] = [], st: number[] = [], idx: number[] = [], n = Math.max(64, Math.round((Math.PI * 2 * R) / 3)), rows = 16;
    const cx = L?.home.x ?? 0, cz = L?.home.z ?? 0;
    for (let k = 0; k <= n; k++) {
      const a = (k / n) * Math.PI * 2;
      for (let j = 0; j <= rows; j++) {
        const v = j / rows, r = R + out * v;
        pos.push(0, -(drop * v * v + 3 * v), 0); base.push(cx + Math.cos(a) * r, cz + Math.sin(a) * r); st.push(k / n, v);
      }
    }
    for (let k = 0; k < n; k++) for (let j = 0; j < rows; j++) { const a = k * (rows + 1) + j, b = a + rows + 1; idx.push(a, b, b + 1, a, b + 1, a + 1); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("base", new THREE.Float32BufferAttribute(base, 2));
    g.setAttribute("st", new THREE.Float32BufferAttribute(st, 2));
    g.setIndex(idx);
    this.mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({ vertexShader: FALL_VERT, fragmentShader: FALL_FRAG, transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: { ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime, uCols: { value: Math.round((Math.PI * 2 * R) / 1.2) } } }));
    this.mesh.name = "zooFall";
    this.mesh.frustumCulled = false;
    // (and the spray thrown up where it goes over: a curtain of mist rising off the lip, so the fall reads from the ground too,
    // where the sheet itself hides below the lip)
    const sp: number[] = [], sb: number[] = [], ss: number[] = [], si: number[] = [];
    for (let k = 0; k <= n; k++) {
      const a = (k / n) * Math.PI * 2;
      for (const v of [0, 1]) { sp.push(0, v * SPRAY_H, 0); sb.push(cx + Math.cos(a) * (R + 1.5), cz + Math.sin(a) * (R + 1.5)); ss.push(k / n, v); }
    }
    for (let k = 0; k < n; k++) { const a = k * 2; si.push(a, a + 2, a + 3, a, a + 3, a + 1); }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
    sg.setAttribute("base", new THREE.Float32BufferAttribute(sb, 2));
    sg.setAttribute("st", new THREE.Float32BufferAttribute(ss, 2));
    sg.setIndex(si);
    this.spray = new THREE.Mesh(sg, new THREE.ShaderMaterial({ vertexShader: FALL_VERT, fragmentShader: SPRAY_FRAG, transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: { ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime, uCols: { value: Math.round((Math.PI * 2 * R) / 0.4) } } }));
    this.spray.name = "zooSpray";
    this.spray.frustumCulled = false;
    this.mesh.add(this.spray);
  }
  private spray: THREE.Mesh;
  dispose(): void { this.mesh.geometry.dispose(); (this.mesh.material as THREE.Material).dispose(); this.spray.geometry.dispose(); (this.spray.material as THREE.Material).dispose(); }
}

/** The spray's height over the lip (m). */
const SPRAY_H = 4;
const SPRAY_FRAG = /* glsl */ `
uniform float uTime;
uniform float uCols;
varying vec3 vWorld;
varying vec2 vSt;
float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  // (whole pixels of mist and droplets drifting up and thinning, densest at the lip)
  vec2 cell = vec2(floor(vSt.x * uCols), floor(vSt.y * 28.0 - uTime * 7.0));
  float k = 1.0 - vSt.y, drop = step(1.0 - 0.55 * k * k, h(cell)), mist = 0.28 * k * k * (0.6 + 0.4 * h(cell * 0.37));
  float a = max(drop * 0.8 * k, mist);
  if (a < 0.02) discard;
  gl_FragColor = vec4(mix(vec3(0.62, 0.74, 0.84), vec3(0.9, 0.95, 1.0), drop), a);
}
`;
