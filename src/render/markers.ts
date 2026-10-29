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
import { dealRunestones, type Runestone } from "../rules/runestones";
import type { Tuning } from "../rules/tuning";
import { atlasFromPixels, type Atlas } from "./atlas";
import { runJob, type ArtJob, type ArtResult, type AtlasPixels, type MakeCanvas, type StumpSpec } from "./artBuild";
import { biomeKey } from "../rules/lakeLooks";
import { islandArtSeed } from "./artCache";
import { hash2 } from "../rules/random";
import type { StoneSpec } from "./islandArt";
import { awaitOr, runSync, type Steps } from "./slices";
import type { Style } from "./style";
import { EMPTY_STONE_RGB, rankKnobs, ranksOn, STONE_WHITE } from "./leash/ranks";

/** Frames per species: dormant, then the awake levels (brighter and brighter). */
export const MARKER_LEVELS = 4;

/** An area's runestone (Ed, 2026-10-12: "20 mild variations on runestones so that they don't all look identical. They can also be
 *  flipped"): one of the art's seeded forms (art/areas.js runestoneForm), dealt to the map's areas without repeats until every form
 *  is out (rules/runestones.ts), mirrored at random as scenes are; null with runeMarkers.variants off (every stone as before). */
const DEALT = new WeakMap<ForestMap, Map<string, Runestone>>();
export function runestoneOf(map: ForestMap, cx: number, cy: number, t: Tuning): Runestone | null {
  if (!t.runeMarkers.variants) return null;
  let d = DEALT.get(map);
  if (!d) DEALT.set(map, (d = dealRunestones(map.cells, map.seed, Art.RUNESTONE_FORMS as number)));
  return d.get(`${cx},${cy}`) ?? null;
}

/** A map's runestones drawn and packed (MarkerArt.stones), for its MarkerArt. */
export interface MarkerStones { index: Map<string, number>; stoneOf: Map<string, string>; heights: Map<string, number>; pixels: AtlasPixels; /** In stump mode: each area's stump spec and mirroring (baked as it's wanted: AssetLibrary.stumpArt). */ stumps?: StumpDeal }

/** The great stumps (Ed, 2026-10-29: "we could make them all treestumps"; runeMarkers.stump): every area's centrepiece a giant
 *  tree's stump in place of its runestone, each area type's its own (Ed: "a different stump per area type ... they just have to fit
 *  in with the area's look"): its main tree's form and bark in the island's biome, its ground's moss and earth (art/props/stumps.js
 *  stumpForArea), `variants` of each type dealt round its areas, each seen from its own angle and mirrored at random. Baked as each is
 *  wanted (AssetLibrary.stumpArt), not with the island. */
export interface StumpDeal { specs: Map<string, StumpSpec>; flip: Map<string, boolean> }
export function stumpDeal(t: Tuning, map: ForestMap): StumpDeal {
  const S = t.runeMarkers.stump!, island = t.map?.island ?? "home", world = t.map?.world ?? 0, base = islandArtSeed(world, island);
  const biome = biomeKey(island, world, t.biomeLooks), n = Math.max(1, Math.round(S.variants)), specs = new Map<string, StumpSpec>(), flip = new Map<string, boolean>(), seen = new Map<number, number>();
  const AREA = Art.AREA_BY_ID as Record<string, unknown>;
  const order = [...map.cells].sort((a, b) => hash2(a[0], a[1], base) - hash2(b[0], b[1], base));
  for (const [cx, cy] of order) {
    const type = map.typeOf(cx, cy), area = AREA_TYPES[type].id, k = seen.get(type) ?? 0; seen.set(type, k + 1);
    const v = k % n, seed = base * 7 + type * 131 + v * 101;
    specs.set(`${cx},${cy}`, { species: Art.stumpForArea(AREA[area], biome) as string, seed, yaw: hash2(type, v, base + 77) * Math.PI * 2, area, ...(biome ? { biome } : {}) });
    flip.set(`${cx},${cy}`, hash2(cx, cy, base + 3) < 0.5);
  }
  return { specs, flip };
}

export class MarkerArt {
  readonly atlas: Atlas;
  private index: Map<string, number>;
  /** Each area's stone (by its cell's key, "cx,cy"): its baked stone's key. */
  private stoneOf: Map<string, string>;
  readonly colour = new Map<string, THREE.Vector3>();
  /** Baked in the ranks' colours (rank sigils on: stoneJob), so frame takes a variant. */
  readonly ranked: boolean;
  /** Per baked stone: how many art pixels the stone stands above its frame's bottom (to its topmost drawn row). */
  private heights: Map<string, number>;
  /** The scale the stones are baked at (runeMarkers.scale): drawn at runeMarkers.scale / this, so 1 (docs/STYLE.md §1). */
  readonly scale: number;
  /** Stump mode (runeMarkers.stump.on): each baked stump's ground point and cut, and each area's mirroring; null for stones. */
  readonly stumps: StumpDeal | null;

  constructor(style: Style, t: Tuning, map: ForestMap, made: MarkerStones = runSync(MarkerArt.stones(style, t, map))) {
    this.scale = t.runeMarkers.scale;
    this.ranked = ranksOn(t);
    for (const a of AREA_TYPES) { const c = Art.sigilColour(a.creature) as number[]; this.colour.set(a.creature, new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255)); }
    this.index = made.index; this.stoneOf = made.stoneOf; this.heights = made.heights; this.stumps = made.stumps ?? null;
    this.atlas = atlasFromPixels(made.pixels);
  }

  /** The art job for the stones this map stands (one an area: its species' sigil on its form), and where each area's is in it. */
  static stoneJob(style: Style, t: Tuning, map: ForestMap): { job: ArtJob; index: Map<string, number>; stoneOf: Map<string, string>; keys: string[] } {
    const R = t.runeMarkers, index = new Map<string, number>(), stoneOf = new Map<string, string>(), stones: StoneSpec[] = [], keys: string[] = [];
    if (R.stump?.on) return { job: { kind: "stumps", id: "none", style, stumps: [] }, index, stoneOf, keys }; // (the great stumps: baked as each is wanted)
    const levels = [R.dormant.glow, ...Array.from({ length: MARKER_LEVELS - 1 }, (_, i) => R.awake.glow[0] + ((R.awake.glow[1] - R.awake.glow[0]) * i) / (MARKER_LEVELS - 2))];
    // Rank sigils on (render/leash/ranks.ts): each stone baked in the four ranks' colours and unlit (EMPTY_STONE), the view picking
    // by its area's top rank; else once, in its sigil's colour.
    const ranked = ranksOn(t), colours = ranked ? [...rankKnobs(t).enemy.map(c => [c[0], c[1], c[2], STONE_WHITE]), EMPTY_STONE_RGB] : [[0, 0, 0]];
    for (const [cx, cy] of map.cells) {
      const sp = AREA_TYPES[map.typeOf(cx, cy)].creature, v = runestoneOf(map, cx, cy, t), key = v ? `${sp}|${v.form}|${v.flip ? 1 : 0}` : sp;
      stoneOf.set(`${cx},${cy}`, key);
      if (index.has(key)) continue;
      index.set(key, stones.length * levels.length * colours.length); keys.push(key);
      stones.push({ sigil: sp, ...(v ? { form: v.form, flip: v.flip } : {}), ...(ranked ? { colours } : {}) });
    }
    return { job: { kind: "stones", id: keys.join(";") + (ranked ? "|ranks:" + colours.join(";") : ""), style, stones, levels, scale: R.scale }, index, stoneOf, keys };
  }

  /** The stones this map stands, drawn and packed: by an art worker, the page going on meanwhile (`art`, sliced: render/slices.ts,
   *  View.build's runestones), else here. */
  static *stones(style: Style, t: Tuning, map: ForestMap, art?: (job: ArtJob) => Promise<ArtResult>): Steps<MarkerStones> {
    const { job, index, stoneOf, keys } = MarkerArt.stoneJob(style, t, map), heights = new Map<string, number>();
    yield "stones";
    const made = yield* awaitOr(() => art ? art(job) : Promise.reject(new Error("here")), () => runJob(job, Art.defaultCanvas as MakeCanvas));
    if (made.stumps) return { index, stoneOf, heights, pixels: made.px, stumps: stumpDeal(t, map) };
    keys.forEach((k, i) => heights.set(k, made.stones![i]));
    return { index, stoneOf, heights, pixels: made.px };
  }
  /** Let go of the stones' atlas. */
  dispose(): void { this.atlas.albedo.dispose(); this.atlas.normal.dispose(); }
  /** The frame for an area's stone (by its cell) at a level (0 dormant, 1.. awake), in its colour `variant` (rank sigils: its area's
   *  top rank, or EMPTY_STONE; render/leash/ranks.ts) where baked so. */
  frame(cell: readonly [number, number], level: number, variant = 0): number { return (this.index.get(this.stoneOf.get(`${cell[0]},${cell[1]}`) ?? "") ?? 0) + (this.ranked ? variant * MARKER_LEVELS : 0) + Math.max(0, Math.min(MARKER_LEVELS - 1, level)); }
  /** How many art pixels an area's stone stands (its frame's drawn rows). */
  height(cell: readonly [number, number]): number { return this.heights.get(this.stoneOf.get(`${cell[0]},${cell[1]}`) ?? "") ?? 0; }
  /** Stump mode: an area's stump spec and whether it's mirrored; null for stones (or an area dealt none). */
  stump(cell: readonly [number, number]): { spec: StumpSpec; flip: boolean } | null {
    if (!this.stumps) return null;
    const k = `${cell[0]},${cell[1]}`, spec = this.stumps.specs.get(k);
    return spec ? { spec, flip: this.stumps.flip.get(k) ?? false } : null;
  }
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
  /** moteSize: the motes' size in the picture's pixels (runeMarkers.awake.moteSize). */
  update(beacons: Beacon[], height: number, shown: number, motes: Mote[], lasers: Laser[] = [], moteSize = 3): void {
    (this.motes.material as THREE.ShaderMaterial).uniforms.uSize.value = moteSize;
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
    const m = Math.min(this.maxMotes, motes.length), P = this.mPos, C = this.mCol;
    for (let i = 0; i < m; i++) {
      const p = motes[i], c = p.colour, j3 = i * 3, j4 = i * 4; // (written straight in: a list a mote a frame before)
      P[j3] = p.x; P[j3 + 1] = p.y; P[j3 + 2] = p.z;
      C[j4] = c.x; C[j4 + 1] = c.y; C[j4 + 2] = c.z; C[j4 + 3] = p.alpha;
    }
    const g = this.motes.geometry;
    g.setDrawRange(0, m);
    for (const k of ["position", "color"]) { const a = g.getAttribute(k) as THREE.BufferAttribute; a.clearUpdateRanges(); a.addUpdateRange(0, m * a.itemSize); a.needsUpdate = true; } // (only those in use)
  }
}
