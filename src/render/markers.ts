// Spawn markers (Ed, v147): a big rune stone on each spot where a soundsystem will come, its rune
// carved with the area's creature's sigil and glowing in that sigil's neon. Dormant stones glow
// steadily (findable in the dark); the next wave's stones are awake: the rune, a point light and
// rising motes pulse on the beat, building as the wave's countdown runs down. A column of light
// stands over each stone above the canopy, so they can be spotted from the treetops. When the
// party comes, the stone flares and sinks into the ground as its soundsystem arrives.
// The art (frames), the beacons and the motes; which stones to draw is the view's.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { runeGlyph } from "../../art/core.js";
import { AREA_TYPES } from "../rules/map";
import type { Tuning } from "../rules/tuning";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import type { Style } from "./style";

/** Frames per species: dormant, then the awake levels (brighter and brighter). */
export const MARKER_LEVELS = 4;

export class MarkerArt {
  readonly atlas: Atlas;
  private index = new Map<string, number>();
  readonly colour = new Map<string, THREE.Vector3>();
  /** Per species: how many art pixels the stone stands above its frame's bottom (to its topmost drawn row). */
  readonly height = new Map<string, number>();

  constructor(style: Style, t: Tuning) {
    const R = t.runeMarkers, sprites: Baked[] = [];
    const species = [...new Set(AREA_TYPES.map(a => a.creature))];
    const levels = [R.dormant.glow, ...Array.from({ length: MARKER_LEVELS - 1 }, (_, i) => R.awake.glow[0] + ((R.awake.glow[1] - R.awake.glow[0]) * i) / (MARKER_LEVELS - 2))];
    for (const sp of species) {
      const base = (Art.runeStone as unknown as (st: Style, o: { glow: string; sigil: string }) => Baked & { A: HTMLCanvasElement })(style, { glow: "cyan", sigil: sp });
      const c = Art.sigilColour(sp) as number[];
      this.index.set(sp, sprites.length);
      this.height.set(sp, drawnHeight(base.A));
      this.colour.set(sp, new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255));
      for (const k of levels) sprites.push(recolour(base, c, k));
    }
    this.atlas = packAtlas(sprites, 2048);
  }
  /** The frame for a species' stone at a level (0 dormant, 1.. awake). */
  frame(species: string, level: number): number { return (this.index.get(species) ?? 0) + Math.max(0, Math.min(MARKER_LEVELS - 1, level)); }
}

// Rows from the topmost drawn pixel to the lowest (sprites stand on their lowest drawn pixel).
function drawnHeight(c: HTMLCanvasElement): number {
  const d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
  let top = -1, bottom = -1;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 0) { const y = Math.floor((i >> 2) / c.width); if (top < 0) top = y; bottom = y; }
  return top < 0 ? 0 : bottom - top + 1;
}

// The rune's glowing pixels (alpha 254) in the sigil's colour, by their brightness, times k.
function recolour(b: Baked & { A: HTMLCanvasElement }, rgb: number[], k: number): Baked {
  const c = document.createElement("canvas");
  c.width = b.w; c.height = b.h;
  const g = c.getContext("2d")!;
  g.drawImage(b.A, 0, 0);
  const img = g.getImageData(0, 0, b.w, b.h), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] !== 254) continue;
    const lum = Math.max(d[i], d[i + 1], d[i + 2]) / 255, white = Math.max(0, lum - 0.75) * 2.4;
    for (let j = 0; j < 3; j++) d[i + j] = Math.min(255, (rgb[j] * (1 - white) + 255 * white) * lum * k);
  }
  g.putImageData(img, 0, 0);
  return { ...b, A: c };
}

const BEAM_VERT = /* glsl */ `
attribute vec4 iBeam; // colour rgb, strength
varying vec4 vBeam;
varying float vY;
void main() {
  vBeam = iBeam;
  vY = position.y + 0.5;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
}
`;
const BEAM_FRAG = /* glsl */ `
uniform float uShown;
varying vec4 vBeam;
varying float vY;
void main() {
  float a = vBeam.a * uShown * (1.0 - vY) * smoothstep(0.0, 0.08, vY);
  if (a < 0.003) discard;
  gl_FragColor = vec4(vBeam.rgb * a, 1.0);
}
`;

/** base: the height (metres) it rises from, the top of its stone. */
export interface Beacon { x: number; z: number; colour: THREE.Vector3; strength: number; base?: number; /** its own height (metres), else the shared one */ height?: number }
/** A thin laser straight up from an awake stone (Ed, v149), like the disco ball's: width and height in metres. */
export interface Laser { x: number; z: number; colour: THREE.Vector3; strength: number; width: number; height: number; base?: number }
export interface Mote { x: number; y: number; z: number; colour: THREE.Vector3; alpha: number }

/** The columns of light over the stones (seen from the treetops) and the motes rising from them. */
export class MarkerFx {
  readonly group = new THREE.Group();
  private beams: THREE.InstancedMesh;
  private beamAttr: THREE.InstancedBufferAttribute;
  private lasers: THREE.InstancedMesh;
  private laserAttr: THREE.InstancedBufferAttribute;
  private motes: THREE.Points;
  private mPos: Float32Array;
  private mCol: Float32Array;
  private m4 = new THREE.Matrix4();

  constructor(private readonly maxBeams = 64, private readonly maxMotes = 600) {
    const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 8, 1, true);
    this.beamAttr = new THREE.InstancedBufferAttribute(new Float32Array(maxBeams * 4), 4);
    geo.setAttribute("iBeam", this.beamAttr);
    this.beams = new THREE.InstancedMesh(geo, new THREE.ShaderMaterial({ vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, uniforms: { uShown: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), maxBeams);
    this.beams.frustumCulled = false;
    this.beams.renderOrder = 9;
    // The lasers: the same shader on a thin cylinder, always shown (ground and treetop).
    const lg = new THREE.CylinderGeometry(0.5, 0.5, 1, 6, 1, true);
    this.laserAttr = new THREE.InstancedBufferAttribute(new Float32Array(maxBeams * 4), 4);
    lg.setAttribute("iBeam", this.laserAttr);
    this.lasers = new THREE.InstancedMesh(lg, new THREE.ShaderMaterial({ vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, uniforms: { uShown: { value: 1 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), maxBeams);
    this.lasers.frustumCulled = false;
    this.lasers.renderOrder = 9;
    this.mPos = new Float32Array(maxMotes * 3);
    this.mCol = new Float32Array(maxMotes * 4);
    const mg = new THREE.BufferGeometry();
    mg.setAttribute("position", new THREE.BufferAttribute(this.mPos, 3));
    mg.setAttribute("color", new THREE.BufferAttribute(this.mCol, 4));
    this.motes = new THREE.Points(mg, new THREE.PointsMaterial({ size: 3, sizeAttenuation: false, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.motes.frustumCulled = false;
    this.group.add(this.beams, this.lasers, this.motes);
  }

  /** shown: how much the beacons show (0 on the ground, 1 at the treetops). */
  update(beacons: Beacon[], height: number, shown: number, motes: Mote[], lasers: Laser[] = []): void {
    const nl = Math.min(this.maxBeams, lasers.length);
    for (let i = 0; i < nl; i++) {
      const b = lasers[i];
      this.m4.makeScale(b.width, b.height, b.width).setPosition(b.x, b.height / 2 + (b.base ?? 1.5), b.z);
      this.lasers.setMatrixAt(i, this.m4);
      this.laserAttr.setXYZW(i, b.colour.x, b.colour.y, b.colour.z, b.strength);
    }
    this.lasers.count = nl;
    this.lasers.instanceMatrix.needsUpdate = true;
    this.laserAttr.needsUpdate = true;
    const n = Math.min(this.maxBeams, beacons.length);
    for (let i = 0; i < n; i++) {
      const b = beacons[i];
      const hb = b.height ?? height;
      this.m4.makeScale(1.2, hb, 1.2).setPosition(b.x, hb / 2 + (b.base ?? 0), b.z);
      this.beams.setMatrixAt(i, this.m4);
      this.beamAttr.setXYZW(i, b.colour.x, b.colour.y, b.colour.z, b.strength);
    }
    this.beams.count = n;
    this.beams.instanceMatrix.needsUpdate = true;
    this.beamAttr.needsUpdate = true;
    (this.beams.material as THREE.ShaderMaterial).uniforms.uShown.value = shown;
    const m = Math.min(this.maxMotes, motes.length);
    for (let i = 0; i < m; i++) {
      const p = motes[i];
      this.mPos.set([p.x, p.y, p.z], i * 3);
      this.mCol.set([p.colour.x, p.colour.y, p.colour.z, p.alpha], i * 4);
    }
    const g = this.motes.geometry;
    g.setDrawRange(0, m);
    (g.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (g.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
  }
}

// The forecast's rings (Ed, 2026-10-04): up to 12 magic symbols round a rune stone on the ground,
// in its area's neon, one per rune glyph; the count shows how close the stone is to waking. Drawn
// as flat quads in one instanced draw; from the treetops the ring is lifted above the canopy.
const GLYPHS = 12, GPX = 16;
const RING_VERT = /* glsl */ `
attribute vec4 iRing; // x, z, size, glyph
attribute vec4 iCol;  // rgb, alpha
uniform float uLift;
varying vec2 vUv;
varying vec4 vCol;
void main() {
  vUv = vec2((iRing.w + uv.x) / ${GLYPHS}.0, uv.y);
  vCol = iCol;
  vec3 p = vec3(iRing.x + position.x * iRing.z, 0.08 + uLift, iRing.y - position.y * iRing.z);
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;
const RING_FRAG = /* glsl */ `
uniform sampler2D uGlyphs;
varying vec2 vUv;
varying vec4 vCol;
void main() {
  if (texture2D(uGlyphs, vUv).a < 0.5 || vCol.a < 0.02) discard;
  gl_FragColor = vec4(vCol.rgb * vCol.a, 1.0);
}`;

export interface RingSymbol { x: number; z: number; size: number; glyph: number; colour: THREE.Vector3; alpha: number }

export class SymbolRings {
  readonly mesh: THREE.Mesh;
  private geo: THREE.InstancedBufferGeometry;
  private ring: THREE.InstancedBufferAttribute;
  private col: THREE.InstancedBufferAttribute;
  private mat: THREE.ShaderMaterial;

  constructor(private readonly max = 400) {
    // The glyph atlas: 12 rune glyphs side by side, white on clear.
    const data = new Uint8Array(GLYPHS * GPX * GPX * 4);
    for (let k = 0; k < GLYPHS; k++) for (let y = 0; y < GPX; y++) for (let x = 0; x < GPX; x++) {
      const u = (x + 0.5) / GPX, v = (y + 0.5) / GPX;
      if (!runeGlyph(u, v, 5 + k * 11, 0.09)) continue;
      const i = ((GPX - 1 - y) * GLYPHS * GPX + k * GPX + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 255;
    }
    const tex = new THREE.DataTexture(data, GLYPHS * GPX, GPX);
    tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.needsUpdate = true;
    this.geo = new THREE.InstancedBufferGeometry();
    const quad = new THREE.PlaneGeometry(1, 1);
    this.geo.index = quad.index; this.geo.setAttribute("position", quad.getAttribute("position")); this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.ring = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4); this.ring.setUsage(THREE.DynamicDrawUsage);
    this.col = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4); this.col.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute("iRing", this.ring); this.geo.setAttribute("iCol", this.col);
    this.geo.instanceCount = 0;
    this.mat = new THREE.ShaderMaterial({ vertexShader: RING_VERT, fragmentShader: RING_FRAG, uniforms: { uGlyphs: { value: tex }, uLift: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 8;
  }

  /** `lift`: metres to raise the rings (above the canopy in treetop mode). */
  update(symbols: RingSymbol[], lift: number): void {
    const n = Math.min(this.max, symbols.length), R = this.ring.array as Float32Array, C = this.col.array as Float32Array;
    for (let i = 0; i < n; i++) {
      const s = symbols[i];
      R.set([s.x, s.z, s.size, s.glyph % GLYPHS], i * 4);
      C.set([s.colour.x, s.colour.y, s.colour.z, s.alpha], i * 4);
    }
    this.geo.instanceCount = n;
    this.ring.needsUpdate = true; this.col.needsUpdate = true;
    this.mat.uniforms.uLift.value = lift;
  }
}
