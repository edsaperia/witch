// A kraken off the west coast at night (Ed, 2026-10-07, via the coordinator: "a few huge tentacles rise slowly out of the
// moonlit sea, curl and sink back; maybe an eye or the dome of its head; rare, slow and awe-inspiring"; its art: art/kraken.js).
// Drawn only: nothing in the rules. Only while the beach is showing (render/beach.ts) and she's on the west coast; when and where
// it rises is rules/seaLife.ts's timetable (krakenRising), which the sound reads too: this draws each tentacle rising, curling
// over and sinking, and its head and eye. Cheap: one small batch of at most a handful of instances, baked the first time it's needed.
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { Beach } from "../rules/mapShape";
import { krakenRising } from "../rules/seaLife";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type * as THREE from "three";

export class KrakenView {
  private batch: SpriteBatch | null = null;
  private art: { atlas: Atlas; frames: number; heads: number; origins: { x: number; y: number }[] } | null = null;
  private list: SpriteInstance[] = [];
  constructor(private scene: THREE.Scene, private mpp: number, private style: object) {}

  /** This frame's tentacles off the west coast near her (none elsewhere, and none most of the time; their timetable:
   *  rules/seaLife.ts). `time` is the world's. */
  update(g: Game, b: Beach, time: number): void {
    const K = krakenRising(g, b, time);
    this.list.length = 0;
    if (K) {
      const A = this.ensure(), R = SPRITE_UNIFORMS.uRight.value, sea = 0; // (heights over the ground: out there it's the sea's surface)
      for (const t of K.tentacles) { // each curling away from the middle (mirrored as the screen has it)
        const s = (time - t.start) / t.dur, k = Math.floor(s * A.frames), tx = -(t.z - b.z), tz = t.x - b.x;
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

  private ensure(): NonNullable<KrakenView["art"]> {
    if (this.art) return this.art;
    const D = Art.KRAKEN as { frames: number; headFrames: number }, col = Art.krakenColours() as Record<number, number[]>, st = this.style as never, sprites: Baked[] = [], origins: { x: number; y: number }[] = [];
    const bakeOf = (sp: { origin: { x: number; y: number } }) => { origins.push(sp.origin); sprites.push(Art.bake(sp as never, col, st, (st as { cOutline?: string }).cOutline) as Baked); };
    for (let frame = 0; frame < D.frames; frame++) bakeOf((Art.krakenTentacle as unknown as (s: never, o: object) => { origin: { x: number; y: number } })(st, { frame }));
    for (let frame = 0; frame < D.headFrames; frame++) bakeOf((Art.krakenHead as unknown as (s: never, o: object) => { origin: { x: number; y: number } })(st, { frame }));
    const atlas = packAtlas(sprites, 1024);
    this.art = { atlas, frames: D.frames, heads: D.headFrames, origins };
    this.batch = new SpriteBatch(atlas, this.mpp);
    this.scene.add(...this.batch.meshes);
    return this.art;
  }

  dispose(): void { this.batch?.set([]); }
}
