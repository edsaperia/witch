// A kraken off the west coast at night (Ed, 2026-10-07, via the coordinator: "a few huge tentacles rise slowly out of the
// moonlit sea, curl and sink back; maybe an eye or the dome of its head; rare, slow and awe-inspiring"; its art: art/kraken.js).
// Drawn only: nothing in the rules. Only while the beach is showing (render/beach.ts) and she's on the west coast (within the
// tuning's beach.kraken.arc of due west): now and then (a slot every `every` seconds, `chance` of it holding a rising, seeded
// by the moment, so no state but the clock) `tentacles` tentacles rise one after another `out` metres off the shore, each over
// `time` seconds (rising, curling over, sinking), and in some (`head`) the dome of its head breaks the water between them and
// opens its eye. Cheap: one small batch of at most a handful of instances, baked the first time it's needed.
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { Beach } from "../rules/mapShape";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type * as THREE from "three";

export interface KrakenKnobs { on: boolean; arc: number; every: number; chance: number; tentacles: [number, number]; out: [number, number]; time: number; head: number }
export const KRAKEN_DEFAULT: KrakenKnobs = { on: true, arc: 0.7, every: 75, chance: 0.6, tentacles: [2, 4], out: [90, 150], time: 14, head: 0.5 };

const hash = (n: number, k = 0) => { const x = Math.sin(n * 91.3 + k * 217.9) * 43758.5453; return x - Math.floor(x); };

export class KrakenView {
  private batch: SpriteBatch | null = null;
  private art: { atlas: Atlas; frames: number; heads: number; origins: { x: number; y: number }[] } | null = null;
  private list: SpriteInstance[] = [];
  constructor(private scene: THREE.Scene, private mpp: number, private style: object) {}

  /** This frame's tentacles off the west coast near her (none elsewhere). `time` is the world's. */
  update(g: Game, b: Beach, time: number): void {
    const K = { ...KRAKEN_DEFAULT, ...((g.tuning.beach as { kraken?: Partial<KrakenKnobs> } | undefined)?.kraken ?? {}) }, w = g.witch;
    const her = Math.atan2(w.z - b.z, w.x - b.x), west = Math.PI - Math.abs(her);
    if (!K.on || west > K.arc) { this.batch?.set([]); return; }
    const slot = Math.floor(time / K.every), t = time - slot * K.every;
    this.list.length = 0;
    if (hash(slot, 1) < K.chance) {
      const A = this.ensure(), R = SPRITE_UNIFORMS.uRight.value, beach = g.tuning.beach as { sea?: number; shore?: number };
      const sea = beach.sea ?? 0, a = her + (hash(slot, 2) - 0.5) * 0.2, out = K.out[0] + hash(slot, 3) * (K.out[1] - K.out[0]);
      const r = b.edge(a) + (beach.shore ?? 0) + out, cx = b.x + Math.cos(a) * r, cz = b.z + Math.sin(a) * r, tx = -Math.sin(a), tz = Math.cos(a);
      const n = K.tentacles[0] + Math.floor(hash(slot, 4) * (K.tentacles[1] - K.tentacles[0] + 1)), gap = K.time * 0.3;
      for (let k = 0; k < n; k++) { // one after another along the coast, curling away from the middle
        const s = (t - k * gap) / K.time, along = (k - (n - 1) / 2) * 7 + (hash(slot, 10 + k) - 0.5) * 3;
        if (s < 0 || s >= 1) continue;
        const flip = along < 0 !== (tx * R.x + tz * R.z < 0);
        this.put(A.atlas.frames[Math.floor(s * A.frames)], A.origins[Math.floor(s * A.frames)], cx + tx * along, sea, cz + tz * along, flip);
      }
      if (hash(slot, 5) < K.head) { // its head between them, out a little further: up, its eye open, back down
        const s = (t - gap) / K.time, k = s < 0 || s >= 1 ? -1 : s < 0.2 || s > 0.85 ? 0 : s < 0.4 || s > 0.7 ? 1 : 2;
        if (k >= 0) this.put(A.atlas.frames[A.frames + k], A.origins[A.frames + k], cx + Math.cos(a) * 8, sea, cz + Math.sin(a) * 8, tx * R.x + tz * R.z < 0);
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
    this.batch = new SpriteBatch(atlas, this.mpp, { absolute: true });
    this.scene.add(...this.batch.meshes);
    return this.art;
  }

  dispose(): void { this.batch?.set([]); }
}
