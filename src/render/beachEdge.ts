// The woods' edge at the beach (Ed, 2026-10-06: "The transition between beach and forest looks odd", with a photo of a real
// beach forest: the forest ends in "a distinct, irregular, scalloped edge of rounded bushes and shrubs, dense low vegetation,
// pandanus and palm-like plants, clumps spilling onto the sand; taller trees rise behind ... no noise gradient"): a scalloped
// line of beach shrubs and round bushes in rows along the sand's edge (the ground shader's own scalloped line, render/ground.ts,
// worked out the same way here), grass clumps at its foot, a palm now and then among them, and a few strays out on the sand.
// The forest's own trees stand behind, up to the sand's line (rules/map.ts), so the canopy steps up from the bushes.
// Objects are pixels, light can be smooth (Ed): the bushes are the art's sprites (render/artBuild.ts beachEdge), their soft
// shadows on the sand the ground shader's.
//
// Drawn only while the beach is (render/beach.ts: she's within beach.shown of the sand), round her along the coast, laid out
// again only when she's moved a few metres along it.
import type { Beach } from "../rules/mapShape";
import type { BeachEdgeArt } from "./artBuild";
import type { Atlas } from "./atlas";
import { SpriteBatch, type SpriteInstance } from "./sprites";
import * as THREE from "three";

/** The ground shader's value noise (render/shaders.ts VALUE_NOISE_GLSL), here, so the bushes follow the line it draws. */
const fract = (v: number) => v - Math.floor(v);
function hash(x: number, y: number): number {
  let px = fract(x * 123.34), py = fract(y * 456.21);
  const d = px * (px + 45.32) + py * (py + 45.32);
  px += d; py += d;
  return fract(px * py);
}
export function vnoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

/** How far (m) the sand's line stands out past the beach's plain one at this arc length round the coast (render/ground.ts). */
export const scallop = (arc: number) => (vnoise(arc / 7, 3) - 0.5) * 7 + (vnoise(arc / 2.3, 11) - 0.5) * 2;

/** A placed plant: where, which sprite (a palm: its crown too), mirrored or not, how big. */
export interface EdgePlant { x: number; z: number; kind: "shrub" | "grass" | "palm"; v: number; flip: boolean; scale: number }

/** Metres between the places along the coast a plant may stand, and how far round her (m) the edge is laid out. */
const STEP = 1.6, REACH = 150;

/** The plants along the edge within REACH of the coast point nearest (x, z): rows of shrubs in the scallop, the grass at its foot,
 *  palms among them, strays on the sand. Seeded by their place round the coast: the same plants wherever she comes from. */
export function edgePlants(b: Beach, x: number, z: number, out: EdgePlant[] = []): EdgePlant[] {
  out.length = 0;
  const R0 = (b.edgeMin + b.edgeMax) / 2, da = STEP / R0, a0 = Math.atan2(z - b.z, x - b.x), k0 = Math.round(a0 / da), K = Math.ceil(REACH / STEP);
  // (each at its own place round: `d` metres past the sand's line there, + onto the sand)
  const lineAt = (a: number) => { const an = Math.atan2(Math.sin(a), Math.cos(a)), e = b.edge(an); return e - b.width + scallop(an * e); };
  const put = (a: number, d: number, kind: EdgePlant["kind"], v: number, flip: boolean, scale: number) => { const r = lineAt(a) + d; out.push({ x: b.x + Math.cos(a) * r, z: b.z + Math.sin(a) * r, kind, v, flip, scale }); };
  for (let k = k0 - K; k <= k0 + K; k++) {
    const a = k * da, h = (salt: number) => hash(k * 0.137 + salt, salt * 0.71 + 3.3);
    // the bushes' reach onto the sand: more in some stretches than others
    const spill = 0.6 + 0.8 * vnoise((a * R0) / 11, 21);
    if (h(1) < 0.85) put(a + (h(2) - 0.5) * da, spill - h(3) * 1.6, "shrub", Math.floor(h(4) * 8), h(5) < 0.5, 0.85 + h(6) * 0.4); // the front row, over the line
    if (h(7) < 0.75) put(a + (h(8) - 0.5) * da, -2.2 - h(9) * 2.2, "shrub", Math.floor(h(10) * 8), h(11) < 0.5, 1 + h(12) * 0.5); // behind it, bigger
    if (h(13) < 0.5) put(a + (h(14) - 0.5) * da, -5 - h(15) * 3, "shrub", Math.floor(h(16) * 8), h(17) < 0.5, 1.2 + h(18) * 0.5);
    if (h(19) < 0.7) put(a + (h(20) - 0.5) * da, 0.4 + h(21) * 1.4, "grass", Math.floor(h(22) * 4), h(23) < 0.5, 0.8 + h(24) * 0.5); // the grass at its foot
    if (h(25) < 0.07) put(a, -2.5 - h(26) * 4, "palm", Math.floor(h(27) * 4), h(28) < 0.5, 0.9 + h(29) * 0.3); // a palm among them
    if (h(30) < 0.05) put(a, 2.5 + h(31) * 5, h(32) < 0.3 ? "palm" : "shrub", Math.floor(h(33) * (h(32) < 0.3 ? 4 : 8)), h(34) < 0.5, 0.7 + h(35) * 0.4); // a stray out on the sand
  }
  return out;
}

/** The edge's sprites, laid out round her and drawn in one batch (palms' crowns flagged as tops, so they show from the treetops). */
export class BeachEdgeView {
  private batch: SpriteBatch | null = null;
  private atlas: Atlas | null = null;
  private plants: EdgePlant[] = [];
  private items: SpriteInstance[] = [];
  private at = { x: NaN, z: NaN };

  constructor(private scene: THREE.Scene, private mpp: number) {}

  update(b: Beach, art: (BeachEdgeArt & { atlas: Atlas }) | undefined, x: number, z: number): void {
    if (!art) return;
    if (this.atlas !== art.atlas) { this.dispose(); this.atlas = art.atlas; this.batch = new SpriteBatch(art.atlas, this.mpp, { scenery: true, fade: true }); this.scene.add(...this.batch.meshes); this.at.x = NaN; }
    if (Math.hypot(x - this.at.x, z - this.at.z) < 6) return; // (laid out again only when she's moved on a little)
    this.at.x = x; this.at.z = z;
    edgePlants(b, x, z, this.plants);
    const F = art.atlas.frames, items = this.items;
    items.length = 0;
    for (const p of this.plants) {
      if (p.kind === "palm") { const P = art.palms[p.v % art.palms.length]; items.push({ x: p.x, y: 0, z: p.z, frame: F[P.bot], flip: p.flip, scale: p.scale, sway: 1 }, { x: p.x, y: 0, z: p.z, frame: F[P.top], flip: p.flip, scale: p.scale, sway: 1, top: true }); }
      else { const list = p.kind === "grass" ? art.grass : art.shrubs; items.push({ x: p.x, y: 0, z: p.z, frame: F[list[p.v % list.length]], flip: p.flip, scale: p.scale, sway: 1 }); }
    }
    this.batch!.set(items);
  }

  /** Let go (she's left the beach). */
  dispose(): void {
    if (this.batch) { this.scene.remove(...this.batch.meshes); this.batch.mesh.geometry.dispose(); }
    this.batch = null; this.atlas = null; this.at.x = NaN;
  }
}
