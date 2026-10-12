// Spawn markers (Ed, v147): a big rune stone on each spot where a soundsystem will come, its rune
// carved with the area's creature's sigil and glowing in that sigil's neon. Dormant stones glow
// steadily (findable in the dark); the next wave's stones are awake: the rune, a point light and
// rising motes pulse on the beat, building as the wave's countdown runs down. A column of light
// stands over each stone above the canopy, so they can be spotted from the treetops. When the
// party comes, the stone flares and sinks into the ground as its soundsystem arrives.
// The art (frames), the beacons and the motes; which stones to draw is the view's.
import * as THREE from "three";
import { groundPoints, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import * as Art from "../../art/generator.js";
import { AREA_TYPES, type ForestMap } from "../rules/map";
import { hash2 } from "../rules/random";
import type { Tuning } from "../rules/tuning";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import type { Style } from "./style";

/** Frames per species: dormant, then the awake levels (brighter and brighter). */
export const MARKER_LEVELS = 4;

/** An area's runestone (Ed, 2026-10-12: "20 mild variations on runestones so that they don't all look identical. They can also be
 *  flipped"): one of the art's seeded forms (art/areas.js runestoneForm) by the map's seed and its cell, mirrored at random as
 *  scenes are; null with runeMarkers.variants off (every stone as before). */
export function runestoneOf(map: ForestMap, cx: number, cy: number, t: Tuning): { form: number; flip: boolean } | null {
  if (!t.runeMarkers.variants) return null;
  const n = Art.RUNESTONE_FORMS as number;
  return { form: Math.min(n - 1, Math.floor(hash2(cx, cy, map.seed + 901) * n)), flip: hash2(cx, cy, map.seed + 903) < 0.5 };
}

export class MarkerArt {
  readonly atlas: Atlas;
  private index = new Map<string, number>();
  /** Each area's stone (by its cell's key, "cx,cy"): its baked stone's key. */
  private stoneOf = new Map<string, string>();
  readonly colour = new Map<string, THREE.Vector3>();
  /** Per baked stone: how many art pixels the stone stands above its frame's bottom (to its topmost drawn row). */
  private heights = new Map<string, number>();
  /** The scale the stones are baked at (runeMarkers.scale): drawn at runeMarkers.scale / this, so 1 (docs/STYLE.md §1). */
  readonly scale: number;

  constructor(style: Style, t: Tuning, map: ForestMap) {
    const R = t.runeMarkers, sprites: Baked[] = [];
    this.scale = R.scale;
    for (const a of AREA_TYPES) { const c = Art.sigilColour(a.creature) as number[]; this.colour.set(a.creature, new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255)); }
    const levels = [R.dormant.glow, ...Array.from({ length: MARKER_LEVELS - 1 }, (_, i) => R.awake.glow[0] + ((R.awake.glow[1] - R.awake.glow[0]) * i) / (MARKER_LEVELS - 2))];
    // Only the stones this map stands (one an area: its species' sigil on its form).
    for (const [cx, cy] of map.cells) {
      const sp = AREA_TYPES[map.typeOf(cx, cy)].creature, v = runestoneOf(map, cx, cy, t), key = v ? `${sp}|${v.form}|${v.flip ? 1 : 0}` : sp;
      this.stoneOf.set(`${cx},${cy}`, key);
      if (this.index.has(key)) continue;
      const base = (Art.runeStone as unknown as (st: Style, o: { glow: string; sigil: string; scale: number; form?: number; flip?: boolean }) => Baked & { A: HTMLCanvasElement })(style, { glow: "cyan", sigil: sp, scale: R.scale, ...(v ?? {}) });
      const c = Art.sigilColour(sp) as number[];
      this.index.set(key, sprites.length);
      this.heights.set(key, drawnHeight(base.A));
      for (const k of levels) sprites.push(recolour(base, c, k));
    }
    this.atlas = packAtlas(sprites, 2048);
  }
  /** The frame for an area's stone (by its cell) at a level (0 dormant, 1.. awake). */
  frame(cell: readonly [number, number], level: number): number { return (this.index.get(this.stoneOf.get(`${cell[0]},${cell[1]}`) ?? "") ?? 0) + Math.max(0, Math.min(MARKER_LEVELS - 1, level)); }
  /** How many art pixels an area's stone stands (its frame's drawn rows). */
  height(cell: readonly [number, number]): number { return this.heights.get(this.stoneOf.get(`${cell[0]},${cell[1]}`) ?? "") ?? 0; }
}

// Rows from the topmost drawn pixel to the lowest (sprites stand on their lowest drawn pixel).
function drawnHeight(c: HTMLCanvasElement): number {
  const d = c.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, c.width, c.height).data;
  let top = -1, bottom = -1;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 0) { const y = Math.floor((i >> 2) / c.width); if (top < 0) top = y; bottom = y; }
  return top < 0 ? 0 : bottom - top + 1;
}

// The rune's glowing pixels (alpha 254) in the sigil's colour, by their brightness, times k.
function recolour(b: Baked & { A: HTMLCanvasElement }, rgb: number[], k: number): Baked {
  const c = document.createElement("canvas");
  c.width = b.w; c.height = b.h;
  const g = c.getContext("2d", { willReadFrequently: true })!;
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
${HEIGHT_VERT_GLSL}
void main() {
  vBeam = iBeam;
  vY = position.y + 0.5;
  // Rising from the rolling ground at its foot (height.ts).
  vec3 w = (modelMatrix * instanceMatrix * vec4(position, 1.0)).xyz;
  w.y += groundH((modelMatrix * instanceMatrix * vec4(0.0, -0.5, 0.0, 1.0)).xz);
  gl_Position = clipOf(w);
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
    this.beams = new THREE.InstancedMesh(geo, new THREE.ShaderMaterial({ vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, uniforms: { ...HEIGHT_UNIFORMS, uShown: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), maxBeams);
    this.beams.frustumCulled = false;
    this.beams.renderOrder = 9;
    // The lasers: the same shader on a thin cylinder, always shown (ground and treetop).
    const lg = new THREE.CylinderGeometry(0.5, 0.5, 1, 6, 1, true);
    this.laserAttr = new THREE.InstancedBufferAttribute(new Float32Array(maxBeams * 4), 4);
    lg.setAttribute("iBeam", this.laserAttr);
    this.lasers = new THREE.InstancedMesh(lg, new THREE.ShaderMaterial({ vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, uniforms: { ...HEIGHT_UNIFORMS, uShown: { value: 1 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), maxBeams);
    this.lasers.frustumCulled = false;
    this.lasers.renderOrder = 9;
    this.mPos = new Float32Array(maxMotes * 3);
    this.mCol = new Float32Array(maxMotes * 4);
    const mg = new THREE.BufferGeometry();
    mg.setAttribute("position", new THREE.BufferAttribute(this.mPos, 3));
    mg.setAttribute("color", new THREE.BufferAttribute(this.mCol, 4));
    this.motes = new THREE.Points(mg, groundPoints(3));
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
    for (const k of ["position", "color"]) { const a = g.getAttribute(k) as THREE.BufferAttribute; a.clearUpdateRanges(); a.addUpdateRange(0, m * a.itemSize); a.needsUpdate = true; } // (only those in use)
  }
}
