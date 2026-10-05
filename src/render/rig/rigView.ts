// Drawing creatures with the live rig (#79 stage 5), behind ?rig=1 (without it the game draws them
// as before). Each rigged creature's pieces and discs (rig.ts lays them out) become instances in a
// sprite batch per species and level, standing where their pivots fall in the world; a species
// whose parts aren't baked yet is drawn the old way until they are.
import * as THREE from "three";
import { SpriteBatch, SPRITE_UNIFORMS, type SpriteInstance } from "../sprites";
import type { AssetLibrary, RigArt } from "../assets";
import { RigBody, RigOut, type RigDrive } from "./rig";
import type { Creature } from "../../rules/creatures";

/** ?rig=1 turns the live rig on (Ed: desktop first; it costs more instances per creature). */
export const rigOn = (): boolean => typeof location !== "undefined" && new URLSearchParams(location.search).get("rig") === "1";

/** Creatures drawn smaller than this (art pixels high) keep their baked frames: at that size the rig's
 *  motion can't be seen, and they're the many (#79: a baked cycle for swarms and tiny creatures). */
export const RIG_MIN_PX = 40;
export interface RigLook { /** extra height (a dance, a hop, sinking) in metres */ y: number; scale: number; glow: number; fresh: boolean; /** its ordinary frame's height in art pixels */ h: number }

export class RigView {
  private bodies = new Map<number, RigBody>();
  private seen = new Set<number>();
  private batches = new Map<string, SpriteBatch>();
  private out = new RigOut();
  // the instances handed to the batches: objects reused frame to frame (pool, and how many each list uses)
  private pool = new Map<string, SpriteInstance[]>(); private used = new Map<string, number>();
  private R = new THREE.Vector3(); private U = new THREE.Vector3(); private F = new THREE.Vector3();
  /** Creatures drawn with the rig this frame, its instances, and its own time (ms). */
  stats = { creatures: 0, instances: 0, ms: 0 };

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number) {}

  private time = 0; private dt = 0;
  begin(time: number): void {
    this.dt = this.time ? Math.min(0.1, Math.max(0, time - this.time)) : 0; this.time = time;
    for (const k of this.used.keys()) this.used.set(k, 0);
    this.seen.clear();
    this.stats.creatures = 0; this.stats.instances = 0; this.stats.ms = 0;
    this.R.copy(SPRITE_UNIFORMS.uRight.value); this.U.copy(SPRITE_UNIFORMS.uUp.value); this.F.copy(SPRITE_UNIFORMS.uFacing.value);
  }

  /** Lays out a creature with the rig, if its template has one and its parts are baked: true when drawn. */
  add(c: Creature, look: RigLook): boolean {
    if (look.h * look.scale < RIG_MIN_PX) return false;
    const t0 = performance.now(), art = this.assets.rigArt(c.species, c.level);
    if (!art) return false;
    let body = this.bodies.get(c.id);
    if (!body) this.bodies.set(c.id, (body = new RigBody()));
    this.seen.add(c.id);
    body.update(c.x, c.z, this.dt, c.charge ? c.charge.dx * c.charge.speed : c.vx, c.charge ? c.charge.dz * c.charge.speed : c.vz);
    const drive = this.drive(c, this.time), u2m = this.mpp * art.meta.s * look.scale; // metres per model unit
    this.out.reset();
    if (art.meta.template === "quadruped") body.quadruped(art.meta, u2m, this.dt, drive, this.out);
    else body.serpent(art.meta, u2m, this.dt, drive, this.out);
    this.place(c, art, look, u2m);
    this.stats.creatures++; this.stats.ms += performance.now() - t0;
    return true;
  }

  /** How the creature's state drives its body: crouching before a charge or a leap, charging, in the air. */
  private drive(c: Creature, time: number): RigDrive {
    const ch = c.charge, lp = c.leap;
    const winding = ch && ch.from !== undefined && time < ch.from ? 1 - Math.max(0, (ch.from - time) / 0.5) : 0;
    const charging = !!ch && (ch.from === undefined || time >= ch.from) && time < ch.until;
    let air = 0, crouch = winding;
    if (lp) { const k = (time - lp.at) / Math.max(0.01, lp.lands - lp.at); if (k < 0) crouch = Math.max(crouch, 1 + k * 3); else if (k <= 1) air = Math.sin(k * Math.PI); else crouch = Math.max(crouch, Math.max(0, 1 - (k - 1) * 4)); }
    return { crouch: Math.max(0, Math.min(1, crouch)), charging, air };
  }

  /** Each item as an instance: the sprite placed so its pivot pixel lands on the item's world point. */
  private place(c: Creature, art: RigArt, look: RigLook, u2m: number): void {
    const key = art.atlas.albedo.uuid;
    let pool = this.pool.get(key);
    if (!pool) { this.pool.set(key, (pool = [])); this.used.set(key, 0); }
    let n = this.used.get(key)!;
    if (!this.batches.has(key)) { const b = new SpriteBatch(art.atlas, this.mpp, { solid: true, find: !c.leashed && !c.enraged }); this.batches.set(key, b); this.scene.add(...b.meshes); }
    const m = this.mpp * look.scale, R = this.R, U = this.U, F = this.F;
    for (let k = 0; k < this.out.n; k++) {
      const it = this.out.items[k], f = art.atlas.frames[it.piece.frame];
      if (!f) continue;
      const px = it.flip ? f.w - it.piece.px : it.piece.px, dx = (px - f.w / 2) * m, dy = (f.h - it.piece.py) * m, b = it.bias * u2m;
      let s = pool[n];
      if (!s) pool[n] = s = { x: 0, y: 0, z: 0, frame: f, flip: false };
      s.x = c.x + it.x - R.x * dx - U.x * dy + F.x * b; s.y = look.y + it.y - R.y * dx - U.y * dy + F.y * b; s.z = c.z + it.z - R.z * dx - U.z * dy + F.z * b;
      s.frame = f; s.flip = it.flip; s.fresh = look.fresh; s.glow = look.glow; s.scale = look.scale;
      n++;
    }
    this.used.set(key, n);
    this.stats.instances += this.out.n;
  }

  /** Hands every batch its instances; forgets creatures no longer drawn. */
  end(): void {
    for (const [k, b] of this.batches) { const pool = this.pool.get(k) ?? [], n = this.used.get(k) ?? 0; if (pool.length > n) pool.length = n; b.set(pool); } // (trimmed to this frame's: the batch draws them all)
    for (const id of this.bodies.keys()) if (!this.seen.has(id)) this.bodies.delete(id);
  }
}
