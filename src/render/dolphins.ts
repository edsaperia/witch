// Dolphins leaping off the east coast at night (Ed, 2026-10-07, via the coordinator: "leaping dolphins in the sea off the east
// coast ... occasional dolphins arcing out of the water and back, alone or in pairs ... a silvery moonlit highlight and a small
// splash"; their art: art/dolphins.js). Drawn only: nothing in the rules. Only while the beach is showing (render/beach.ts) and
// she's on the east coast; when and where each leaps is rules/seaLife.ts's timetable (dolphinLeaps), which the sound reads too:
// this draws each along its arc, a splash where it leaves the water and where it goes back in. Cheap: one small batch, at
// most a few instances, baked the first time it's needed.
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { Beach } from "../rules/mapShape";
import { dolphinLeaps, type Leap } from "../rules/seaLife";
import { atlasFromPixels, type Atlas } from "./atlas";
import { packPixels, type ArtJob, type ArtResult } from "./artBuild";
import { seaSprites } from "./islandArt";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type * as THREE from "three";

export class DolphinView {
  private batch: SpriteBatch | null = null;
  private art: { atlas: Atlas; leap: number; splash: number; frames: number; splashes: number; origins: { x: number; y: number }[] } | null = null;
  private list: SpriteInstance[] = [];
  /** `ask`: its art from the art workers (AssetLibrary.oneOff), else it's drawn here. */
  constructor(private scene: THREE.Scene, private mpp: number, private style: object, private light?: { lightFloor: number; lightTint: number; lightRim: number }, private ask?: (job: ArtJob) => Promise<ArtResult>) {}
  private asking: Promise<void> | null = null;
  private made: ArtResult | null = null;
  /** The workers couldn't: drawn here. */
  private here = false;

  /** This frame's leaps off the east coast near her (none elsewhere; their timetable: rules/seaLife.ts). `time` is the world's. */
  update(g: Game, b: Beach, time: number): void {
    const leaps = dolphinLeaps(g, b, time);
    if (!leaps.length) { this.list.length = 0; this.batch?.set([]); return; }
    const A = this.ensure();
    if (!A) return; // (its art on its way)
    const U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, sea = (g.tuning.beach as { sea?: number } | undefined)?.sea ?? 0; // (world heights: the ground's height map only covers round her, and these are far out)
    this.list.length = 0;
    for (const L of leaps) this.leap(A, L, (time - L.start) / L.dur, sea, U, R);
    this.batch!.set(this.list);
  }

  /** One dolphin `s` of the way through its leap (splashes a little before and after). */
  private leap(A: NonNullable<DolphinView["art"]>, L: Leap, s: number, sea: number, U: THREE.Vector3, R: THREE.Vector3): void {
    const at = (u: number) => ({ x: L.x + L.tx * (u - 0.5) * L.length, z: L.z + L.tz * (u - 0.5) * L.length }), flip = L.tx * R.x + L.tz * R.z < 0;
    const splash = (u: number, k: number) => { const p = at(u), f = A.atlas.frames[A.splash + Math.min(A.splashes - 1, k)]; this.list.push({ x: p.x, y: sea, z: p.z, frame: f, flip: false }); };
    if (s < 0.25) splash(0, Math.max(0, Math.floor((s + 0.1) / 0.12))); // leaving the water
    if (s > 0.85) splash(1, Math.max(0, Math.floor((s - 0.85) / 0.17))); // going back in
    if (s < 0 || s > 1) return;
    const p = at(s), y = sea + Math.sin(s * Math.PI) * L.height, i = Math.min(A.frames - 1, Math.floor(s * A.frames)), f = A.atlas.frames[A.leap + i], o = A.origins[i];
    // its middle on the arc: the sprite's bottom middle put so its origin lands there
    const dx = (o.x - f.w / 2) * this.mpp * (flip ? -1 : 1), dy = (f.h - o.y) * this.mpp;
    this.list.push({ x: p.x - R.x * dx - U.x * dy, y: y - R.y * dx - U.y * dy, z: p.z - R.z * dx - U.z * dy, frame: f, flip });
  }

  /** Its art: drawn by an art worker the first time it's needed (render/islandArt.ts seaSprites; nothing of it drawn till it's
   *  back), else here, as ever (no workers). */
  private ensure(): NonNullable<DolphinView["art"]> | null {
    if (this.art) return this.art;
    if (this.ask && !this.here && !this.made) {
      this.asking ??= this.ask({ kind: "sea", id: "dolphins", style: this.style as never }).then(r => { this.made = r; }, () => { this.here = true; });
      return null;
    }
    const D = Art.DOLPHIN as { frames: number; splashFrames: number };
    const made = this.made ?? (() => { const { sprites, origins } = seaSprites("dolphins", this.style as never); return { px: packPixels(sprites, 512), sea: origins }; })();
    const atlas = atlasFromPixels(made.px), origins = made.sea!;
    this.art = { atlas, leap: 0, splash: D.frames, frames: D.frames, splashes: D.splashFrames, origins };
    this.batch = new SpriteBatch(atlas, this.mpp, { absolute: true, rim: true, witchLight: this.light }) // (lit like the beach's witches, a light floor and the moon's rim: far out at sea there's only the moon);
    this.scene.add(...this.batch.meshes);
    return this.art;
  }

  dispose(): void { this.batch?.set([]); }
}
