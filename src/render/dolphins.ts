// Dolphins leaping off the east coast at night (Ed, 2026-10-07, via the coordinator: "leaping dolphins in the sea off the east
// coast ... occasional dolphins arcing out of the water and back, alone or in pairs ... a silvery moonlit highlight and a small
// splash"; their art: art/dolphins.js). Drawn only: nothing in the rules. Only while the beach is showing (render/beach.ts) and
// she's on the east coast (within the tuning's beach.dolphins.arc of due east, round the map's middle): now and then (every
// `every` seconds, seeded by the moment, so no state but the clock) a dolphin, or two side by side a beat apart (`pair`), leaps
// `out` metres off the shore, along the coast, `length` metres long and `height` high over `time` seconds, a splash where it
// leaves the water and where it goes back in. Cheap: one small batch, at most a few instances, baked the first time it's needed.
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { Beach } from "../rules/mapShape";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type * as THREE from "three";

export interface DolphinKnobs { on: boolean; arc: number; every: [number, number]; pair: number; out: [number, number]; length: number; height: number; time: number }
export const DOLPHINS_DEFAULT: DolphinKnobs = { on: true, arc: 0.7, every: [5, 12], pair: 0.4, out: [30, 70], length: 6, height: 2.2, time: 1.4 };

const hash = (n: number, k = 0) => { const x = Math.sin(n * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

export class DolphinView {
  private batch: SpriteBatch | null = null;
  private art: { atlas: Atlas; leap: number; splash: number; frames: number; splashes: number; origins: { x: number; y: number }[] } | null = null;
  private list: SpriteInstance[] = [];
  constructor(private scene: THREE.Scene, private mpp: number, private style: object) {}

  /** This frame's leaps off the east coast near her (none elsewhere). `time` is the world's. */
  update(g: Game, b: Beach, time: number): void {
    const K = { ...DOLPHINS_DEFAULT, ...((g.tuning.beach as { dolphins?: Partial<DolphinKnobs> } | undefined)?.dolphins ?? {}) }, w = g.witch;
    const her = Math.atan2(w.z - b.z, w.x - b.x);
    if (!K.on || Math.abs(her) > K.arc) { this.batch?.set([]); return; }
    const A = this.ensure(), U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, sea = (g.tuning.beach as { sea?: number } | undefined)?.sea ?? 0;
    this.list.length = 0;
    // The slot clock: each slot `every[1]` long holds at most one leap, at a seeded moment in it (and the one before, still landing).
    const slotLen = Math.max((K.every[0] + K.every[1]) / 2, K.time + 0.5), now = Math.floor(time / slotLen);
    for (let slot = now - 1; slot <= now; slot++) {
      if (hash(slot, 1) < 0.15) continue; // (now and then a slot empty: the gaps vary)
      const t0 = slot * slotLen + hash(slot, 2) * (slotLen - K.time), a = her + (hash(slot, 3) - 0.5) * 0.25;
      const out = K.out[0] + hash(slot, 4) * (K.out[1] - K.out[0]), r = b.edge(a) + (g.tuning.beach as { shore?: number }).shore! + out;
      const cx = b.x + Math.cos(a) * r, cz = b.z + Math.sin(a) * r, dir = hash(slot, 5) < 0.5 ? 1 : -1;
      const tx = -Math.sin(a) * dir, tz = Math.cos(a) * dir, n = hash(slot, 6) < K.pair ? 2 : 1; // (along the coast)
      for (let k = 0; k < n; k++) {
        const s = (time - t0 - k * 0.25) / K.time, ox = k * 1.6 * Math.cos(a), oz = k * 1.6 * Math.sin(a); // (the second a beat behind, a little further out)
        this.leap(A, cx + ox, cz + oz, tx, tz, s, sea, K, U, R);
      }
    }
    this.batch!.set(this.list);
  }

  /** One dolphin `s` of the way through its leap (splashes a little before and after), centred on (cx, cz), travelling (tx, tz). */
  private leap(A: NonNullable<DolphinView["art"]>, cx: number, cz: number, tx: number, tz: number, s: number, sea: number, K: DolphinKnobs, U: THREE.Vector3, R: THREE.Vector3): void {
    if (s < -0.1 || s > 1.35) return;
    const L = K.length, at = (u: number) => ({ x: cx + tx * (u - 0.5) * L, z: cz + tz * (u - 0.5) * L }), flip = tx * R.x + tz * R.z < 0;
    const splash = (u: number, k: number) => { const p = at(u), f = A.atlas.frames[A.splash + Math.min(A.splashes - 1, k)]; this.list.push({ x: p.x, y: sea, z: p.z, frame: f, flip: false }); };
    if (s < 0.25) splash(0, Math.max(0, Math.floor((s + 0.1) / 0.12))); // leaving the water
    if (s > 0.85) splash(1, Math.max(0, Math.floor((s - 0.85) / 0.17))); // going back in
    if (s < 0 || s > 1) return;
    const p = at(s), y = sea + Math.sin(s * Math.PI) * K.height, i = Math.min(A.frames - 1, Math.floor(s * A.frames)), f = A.atlas.frames[A.leap + i], o = A.origins[i];
    // its middle on the arc: the sprite's bottom middle put so its origin lands there
    const dx = (o.x - f.w / 2) * this.mpp * (flip ? -1 : 1), dy = (f.h - o.y) * this.mpp;
    this.list.push({ x: p.x - R.x * dx - U.x * dy, y: y - R.y * dx - U.y * dy, z: p.z - R.z * dx - U.z * dy, frame: f, flip });
  }

  private ensure(): NonNullable<DolphinView["art"]> {
    if (this.art) return this.art;
    const D = Art.DOLPHIN as { frames: number; splashFrames: number }, col = Art.dolphinColours() as Record<number, number[]>, st = this.style as never, sprites: Baked[] = [], origins: { x: number; y: number }[] = [];
    for (let frame = 0; frame < D.frames; frame++) { const sp = (Art.dolphinSprite as unknown as (s: never, o: object) => { origin: { x: number; y: number } })(st, { frame }); origins.push(sp.origin); sprites.push(Art.bake(sp as never, col, st, (st as { cOutline?: string }).cOutline) as Baked); }
    for (let frame = 0; frame < D.splashFrames; frame++) sprites.push(Art.bake((Art.dolphinSplash as unknown as (s: never, o: object) => never)(st, { frame }), col, st, "none") as Baked);
    const atlas = packAtlas(sprites, 512);
    this.art = { atlas, leap: 0, splash: D.frames, frames: D.frames, splashes: D.splashFrames, origins };
    this.batch = new SpriteBatch(atlas, this.mpp, { absolute: true });
    this.scene.add(...this.batch.meshes);
    return this.art;
  }

  dispose(): void { this.batch?.set([]); }
}
