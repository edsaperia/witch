// The biome lakes' shore dressing and the lava's light, drawn (Ed, 2026-10-23, the biome lakes' second part; rules/lakeShore.ts
// lays the pieces out, art/lakeShore.js draws them): one sprite batch of the pieces round her, laid out again only when she's
// moved a few metres, and a warm light or two from the nearest lava lake on the trees round it. Nothing of it is made on an
// island without a dressed lake (home, and every island before the biome lakes' phase): there it costs a lookup a night.
import * as THREE from "three";
import type { Game } from "../rules/game";
import type { ForestMap } from "../rules/map";
import { lavaGlows, shorePieces, type ShorePiece } from "../rules/lakeShore";
import type { AssetLibrary } from "./assets";
import type { Atlas } from "./atlas";
import type { LakeShoreArt } from "./artBuild";
import { lakeLooksOf } from "./lakeLooks";
import { SpriteBatch, type SpriteInstance } from "./sprites";
import type { ForestLight } from "./view";

/** How far round her (m) the pieces are drawn, and the lava's lights lit. */
const REACH = 240, LIGHT_REACH = 150;
/** The lava's light: its colour, how far it reaches (m), how strong, how high over the lava (m); two at once at most. */
const LAVA_RGB = new THREE.Vector3(1.0, 0.42, 0.12), LAVA = { reach: 40, strength: 2.6, y: 2.5 }; // (a campfire's: the tuning's lights.campfire)

export class LakeShoreView {
  private batch: SpriteBatch | null = null;
  private atlas: Atlas | null = null;
  private night: { map: ForestMap; pieces: ShorePiece[]; glows: number[] } | null = null;
  private items: SpriteInstance[] = [];
  private at = { x: NaN, z: NaN };
  private lights: ForestLight[] = Array.from({ length: 2 }, () => ({ x: 0, y: 0, z: 0, reach: LAVA.reach, rgb: LAVA_RGB, strength: 0 }));
  private lit: ForestLight[] = [];

  constructor(private scene: THREE.Scene, private mpp: number) {}

  /** This night's pieces and glows (made once a map). */
  private of(map: ForestMap): { pieces: ShorePiece[]; glows: number[] } {
    if (this.night?.map !== map) {
      const k = lakeLooksOf(map);
      this.night = { map, pieces: k ? shorePieces(map, k.lake, k.looks) : [], glows: k ? lavaGlows(map, k.lake, k.looks) : [] };
      this.at.x = NaN;
    }
    return this.night;
  }

  /** Lay the pieces out round (x, z) (only once she's moved on a little), asking for their art the first time there are any. */
  update(g: Game, assets: AssetLibrary, x: number, z: number): void {
    const N = this.of(g.map);
    if (!N.pieces.length) { if (this.batch) this.batch.set([]); return; }
    const art = assets.lakeShoreArt();
    if (!art) { if (this.batch) this.dispose(); return; } // (none yet, or another island's being drawn again in this one's biome look)
    if (this.atlas !== art.atlas) { this.dispose(); this.atlas = art.atlas; this.batch = new SpriteBatch(art.atlas, this.mpp, { scenery: true, fade: true }).name("lakeShore"); this.scene.add(...this.batch.meshes); this.at.x = NaN; }
    if (Math.hypot(x - this.at.x, z - this.at.z) < 6) return;
    this.at.x = x; this.at.z = z;
    const F = art.atlas.frames, items = this.items;
    items.length = 0;
    for (const p of N.pieces) {
      if (Math.abs(p.x - x) > REACH || Math.abs(p.z - z) > REACH) continue;
      const list = (art as LakeShoreArt).kinds[p.kind];
      if (!list?.length) continue;
      const k = list[p.v % list.length], sway = p.kind === "palm" || p.kind === "grass" || p.kind === "reeds" ? 1 : 0;
      items.push({ x: p.x, y: 0, z: p.z, frame: F[k.bot], flip: p.flip, scale: p.scale, sway });
      if (k.top != null) items.push({ x: p.x, y: 0, z: p.z, frame: F[k.top], flip: p.flip, scale: p.scale, sway });
    }
    this.batch!.set(items);
  }

  /** The lava's light this frame: its nearest glows within reach, flickering (nothing allocated). */
  lavaLights(g: Game, time: number, x: number, z: number): ForestLight[] {
    const G = this.of(g.map).glows, out = this.lit;
    out.length = 0;
    if (!G.length) return out;
    // (the nearest two within reach)
    let b0 = -1, d0 = LIGHT_REACH, b1 = -1, d1 = LIGHT_REACH;
    for (let i = 0; i < G.length; i += 2) {
      const d = Math.hypot(G[i] - x, G[i + 1] - z);
      if (d < d0) { b1 = b0; d1 = d0; b0 = i; d0 = d; } else if (d < d1) { b1 = i; d1 = d; }
    }
    for (const [k, i] of [[0, b0], [1, b1]] as const) {
      if (i < 0) continue;
      const L = this.lights[k];
      L.x = G[i]; L.z = G[i + 1]; L.y = LAVA.y; L.reach = LAVA.reach;
      L.strength = LAVA.strength * (0.85 + 0.1 * Math.sin(time * 1.3 + L.x * 0.1) + 0.05 * Math.sin(time * 3.1 + L.z * 0.1));
      out.push(L);
    }
    return out;
  }

  dispose(): void {
    if (this.batch) { this.scene.remove(...this.batch.meshes); this.batch.release(); }
    this.batch = null; this.atlas = null; this.at.x = NaN;
  }
}
