// A kraken off the west coast at night (Ed, 2026-10-07, via the coordinator: "a few huge tentacles rise slowly out of the
// moonlit sea, curl and sink back; maybe an eye or the dome of its head; rare, slow and awe-inspiring"; its art: art/kraken.js).
// Drawn only: nothing in the rules. Only while the beach is showing (render/beach.ts) and she's on the west coast; when and where
// it rises is rules/seaLife.ts's timetable (krakenRising), which the sound reads too: this draws each tentacle rising, curling
// over and sinking, and its head and eye. Cheap: one small batch of at most a handful of instances, baked the first time it's needed.
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { Beach } from "../rules/mapShape";
import { krakenRising } from "../rules/seaLife";
import { atlasFromPixels, type Atlas } from "./atlas";
import { packPixels, type ArtJob, type ArtResult } from "./artBuild";
import { seaSprites } from "./islandArt";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type * as THREE from "three";

export class KrakenView {
  private batch: SpriteBatch | null = null;
  private art: { atlas: Atlas; frames: number; heads: number; origins: { x: number; y: number }[] } | null = null;
  private list: SpriteInstance[] = [];
  /** `ask`: its art from the art workers (AssetLibrary.oneOff), else it's drawn here. */
  constructor(private scene: THREE.Scene, private mpp: number, private style: object, private light?: { lightFloor: number; lightTint: number; lightRim: number }, private ask?: (job: ArtJob) => Promise<ArtResult>) {}
  private asking: Promise<void> | null = null;
  private made: ArtResult | null = null;
  /** The workers couldn't: drawn here. */
  private here = false;

  /** This frame's tentacles off the west coast near her (none elsewhere, and none most of the time; their timetable:
   *  rules/seaLife.ts). `time` is the world's. */
  update(g: Game, b: Beach, time: number): void {
    const K = krakenRising(g, b, time);
    this.list.length = 0;
    const A = K ? this.ensure() : null; // (null: its art on its way)
    if (K && A) {
      const R = SPRITE_UNIFORMS.uRight.value, sea = (g.tuning.beach as { sea?: number } | undefined)?.sea ?? 0; // (world heights: the ground's height map only covers round her, and these are far out)
      for (const t of K.tentacles) { // each curling away from the middle (mirrored as the screen has it)
        const s = (time - t.start) / t.dur, k = Math.floor(s * A.frames), tx = K.tx, tz = K.tz;
        if (s >= 0 && s < 1) this.put(A.atlas.frames[k], A.origins[k], t.x, sea, t.z, t.side < 0 !== (tx * R.x + tz * R.z < 0));
      }
      const h = K.head;
      if (h) { // up, its eye open, back down
        const s = (time - h.start) / h.dur, k = s < 0 || s >= 1 ? -1 : s < 0.2 || s > 0.85 ? 0 : s < 0.4 || s > 0.7 ? 1 : 2;
        if (k >= 0) this.put(A.atlas.frames[A.frames + k], A.origins[A.frames + k], h.x, sea, h.z, R.x < 0);
      }
    }
    this.batch?.set(this.list);
  }

  /** A sprite whose origin (its foot on the water) lands on (x, y, z). */
  private put(f: Atlas["frames"][number], o: { x: number; y: number }, x: number, y: number, z: number, flip: boolean): void {
    const R = SPRITE_UNIFORMS.uRight.value, U = SPRITE_UNIFORMS.uUp.value, dx = (o.x - f.w / 2) * this.mpp * (flip ? -1 : 1), dy = (f.h - o.y) * this.mpp;
    this.list.push({ x: x - R.x * dx - U.x * dy, y: y - R.y * dx - U.y * dy, z: z - R.z * dx - U.z * dy, frame: f, flip });
  }

  /** Its art: drawn by an art worker the first time it's needed (render/islandArt.ts seaSprites; nothing of it drawn till it's
   *  back), else here, as ever (no workers). */
  private ensure(): NonNullable<KrakenView["art"]> | null {
    if (this.art) return this.art;
    if (this.ask && !this.here && !this.made) {
      this.asking ??= this.ask({ kind: "sea", id: "kraken", style: this.style as never }).then(r => { this.made = r; }, () => { this.here = true; });
      return null;
    }
    const D = Art.KRAKEN as { frames: number; headFrames: number };
    const made = this.made ?? (() => { const { sprites, origins } = seaSprites("kraken", this.style as never); return { px: packPixels(sprites, 1024), sea: origins }; })();
    const atlas = atlasFromPixels(made.px), origins = made.sea!;
    this.art = { atlas, frames: D.frames, heads: D.headFrames, origins };
    this.batch = new SpriteBatch(atlas, this.mpp, { absolute: true, rim: true, witchLight: this.light }) // (lit like the beach's witches, a light floor and the moon's rim: far out at sea there's only the moon);
    this.scene.add(...this.batch.meshes);
    return this.art;
  }

  dispose(): void { this.batch?.set([]); }
}
