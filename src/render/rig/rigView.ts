// Drawing creatures with the live rig (#79 stage 5), behind ?rig=1 (without it the game draws them
// as before). Each rigged creature's pieces and discs (rig.ts lays them out) become instances in a
// sprite batch per species and level, standing where their pivots fall in the world; a species
// whose parts aren't baked yet is drawn the old way until they are.
import * as THREE from "three";
import { SpriteBatch, SPRITE_UNIFORMS, type SpriteInstance } from "../sprites";
import type { AssetLibrary, RigArt } from "../assets";
import { RigBody, RigOut, type RigDrive } from "./rig";
import type { Creature } from "../../rules/creatures";
import type { RigFace, RigGear, RigMeta } from "./rigBuild";
import type { Tuning } from "../../rules/tuning";
import { ENRAGED_TINT } from "../looks";
import { hasOverride } from "../overrides";

/** The live rig is on (Ed, 2026-10-05: "let's put what we have live"); ?rig=0 turns it off, for comparison. */
export const rigOn = (): boolean => typeof location === "undefined" || new URLSearchParams(location.search).get("rig") !== "0";

/** Creatures drawn smaller than this (art pixels high) keep their baked frames: at that size the rig's
 *  motion can't be seen, and they're the many (#79: a baked cycle for swarms and tiny creatures).
 *  The tuning's rig.minPx overrides it; its rig.alwaysLevels are rigged at any size (legends). */
export const RIG_MIN_PX = 40;
const RIG_LEVELS = ["baby", "young", "adult", "legend"];

/** A meta with its head piece in an expression (made once per meta and face, so a frame allocates nothing). */
const faceMetas = new WeakMap<RigMeta, Partial<Record<RigFace, RigMeta>>>();
export function withFace(meta: RigMeta, face: RigFace | undefined): RigMeta {
  const head = face && face !== "neutral" ? meta.faces?.[face] : undefined;
  if (!head) return meta;
  let by = faceMetas.get(meta); if (!by) faceMetas.set(meta, (by = {}));
  return (by[face!] ??= { ...meta, head });
}
export interface RigLook { /** extra height (a dance, a hop, sinking) in metres */ y: number; /** a party animal tapping its feet on the beat while it stands: -1..1, a front foot (far or near) lifted */ tap?: number; scale: number; glow: number; fresh: boolean; /** its ordinary frame's height in art pixels */ h: number; /** its expression (render/looks.ts expression(c), #89): the head piece with that face */ face?: RigFace; /** a party animal's gear (render/artBuild.ts partyGearOf): its rig page wears it */ gear?: RigGear; /** an attack's feel (render/attackFeel.ts): squash and stretch about its feet, its wind-up's crouch, mid-lunge */ sx?: number; sy?: number; crouch?: number; lunging?: boolean; /** a sleeping legend (render/legendSleep.ts): lying asleep, its head down, a nightmare's fits, each 0..1 */ sleep?: number; droop?: number; twitch?: number; /** its character (render/character.ts): its posture, and its idle quirk and how far through it (-1: none) */ posture?: { hx: number; hy: number; by: number }; quirk?: string; quirkK?: number; /** standing, it turns to look at this (rules/wildWatch.ts: a wild area watching her come down) */ lookAt?: { x: number; z: number } }

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

  /** A wild legend's batch look (render/view/creatures.ts legendLook: its sleeping rim and its light in steps), set by the view. */
  legendLook: ((species: string) => { legend?: THREE.Vector4; legendFloor?: number; steps?: number }) | null = null;

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number) {}

  private time = 0; private dt = 0; private minPx = RIG_MIN_PX; private always = [3]; private ground = true;
  /** ground: she's on the ground (Ed, 2026-10-05: rigged on the ground, baked frames in the treetops, legends always). */
  begin(time: number, tuning?: Tuning["rig"], ground = true): void {
    this.ground = ground;
    this.minPx = tuning?.minPx ?? RIG_MIN_PX; this.always = (tuning?.alwaysLevels ?? ["legend"]).map(l => RIG_LEVELS.indexOf(l)).filter(i => i >= 0);
    this.dt = this.time ? Math.min(0.1, Math.max(0, time - this.time)) : 0; this.time = time;
    for (const k of this.used.keys()) this.used.set(k, 0);
    this.seen.clear();
    this.stats.creatures = 0; this.stats.instances = 0; this.stats.ms = 0;
    this.R.copy(SPRITE_UNIFORMS.uRight.value); this.U.copy(SPRITE_UNIFORMS.uUp.value); this.F.copy(SPRITE_UNIFORMS.uFacing.value);
  }

  /** Lays out a creature with the rig, if its template has one and its parts are baked: true when drawn. */
  add(c: Creature, look: RigLook): boolean {
    if ((!this.ground || look.h * look.scale < this.minPx) && !this.always.includes(c.level)) return false; // (legends always: Ed, 2026-10-05)
    if (hasOverride(c.species, c.level)) return false; // (a hand-drawn level: its own frames, art/overrides)
    const t0 = performance.now(), art = this.assets.rigArt(c.species, c.level, look.gear);
    if (!art) return false;
    let body = this.bodies.get(c.id);
    if (!body) this.bodies.set(c.id, (body = new RigBody()));
    this.seen.add(c.id);
    // how it moves, as drawn (eased between the rules' steps): its velocity only in a charge (c.vx is a fight's, and stale out of one,
    // so a creature wandering with an old vx of 0 would glide with its legs still)
    body.update(c.x, c.z, this.dt, c.charge ? c.charge.dx * c.charge.speed : undefined, c.charge ? c.charge.dz * c.charge.speed : undefined, look.lookAt);
    const drive = this.drive(c, this.time, look), u2m = this.mpp * art.meta.s * look.scale; // metres per model unit
    this.out.reset();
    const meta = withFace(art.meta, look.face);
    if (meta.template === "quadruped") body.quadruped(meta, u2m, this.dt, drive, this.out);
    else body.serpent(meta, u2m, this.dt, drive, this.out);
    this.place(c, art, look, u2m);
    this.stats.creatures++; this.stats.ms += performance.now() - t0;
    return true;
  }

  /** How the creature's state drives its body: crouching before a charge, a leap or a blow, charging (or lunging), in the air. */
  private drive(c: Creature, time: number, look: RigLook): RigDrive {
    const ch = c.charge, lp = c.leap;
    const winding = ch && ch.from !== undefined && time < ch.from ? 1 - Math.max(0, (ch.from - time) / 0.5) : 0;
    const charging = !!ch && (ch.from === undefined || time >= ch.from) && time < ch.until;
    let air = 0, crouch = winding;
    if (lp) { const k = (time - lp.at) / Math.max(0.01, lp.lands - lp.at); if (k < 0) crouch = Math.max(crouch, 1 + k * 3); else if (k <= 1) air = Math.sin(k * Math.PI); else crouch = Math.max(crouch, Math.max(0, 1 - (k - 1) * 4)); }
    crouch = Math.max(crouch, (look.crouch ?? 0) * 0.8); // an attack's wind-up crouches it too (render/attackFeel.ts)
    return { crouch: Math.max(0, Math.min(1, crouch)), charging: charging || !!look.lunging, air, tap: look.tap ?? 0, sleep: look.sleep ?? 0, droop: look.droop ?? look.sleep ?? 0, twitch: look.twitch ?? 0, posture: look.posture, quirk: look.quirk, quirkK: look.quirkK ?? -1 };
  }

  /** Each item as an instance: the sprite placed so its pivot pixel lands on the item's world point. The limbs' discs go in a batch of
   *  their own with no moonlight rim (Ed's playtest, 2026-10-06: "Animal legs have outlines on them; they'd look better without"):
   *  each disc rimmed alone, a leg strung of them read as a glowing wireframe. The torso, head and tail keep it. */
  private place(c: Creature, art: RigArt, look: RigLook, u2m: number): void {
    const key = art.atlas.albedo.uuid, dkey = key + "|discs", discs = discFrames(art.meta);
    for (const k of [key, dkey]) if (!this.pool.has(k)) { this.pool.set(k, []); this.used.set(k, 0); }
    if (!this.batches.has(key)) for (const [k, rim] of [[key, true], [dkey, false]] as const) { const L = c.boss && !c.leashed && this.legendLook ? this.legendLook(c.species) : {}, b = new SpriteBatch(art.atlas, this.mpp, { solid: true, rim, find: !look.gear, tint: look.gear?.woken ? ENRAGED_TINT : undefined, ...(rim ? L : { steps: L.steps }) }); this.batches.set(k, b); this.scene.add(...b.meshes); } // (a legend's look: its rim on its body, not its legs' discs)
    const pools = [this.pool.get(key)!, this.pool.get(dkey)!], ns = [this.used.get(key)!, this.used.get(dkey)!];
    const m = this.mpp * look.scale, R = this.R, U = this.U, F = this.F, sx = look.sx ?? 1, sy = look.sy ?? 1;
    for (let k = 0; k < this.out.n; k++) {
      const it = this.out.items[k], f = art.atlas.frames[it.piece.frame];
      if (!f) continue;
      const px = it.flip ? f.w - it.piece.px : it.piece.px, dx = (px - f.w / 2) * m, dy = (f.h - it.piece.py) * m, b = it.bias * u2m;
      const w = discs.has(it.piece.frame) ? 1 : 0, pool = pools[w], n = ns[w]++;
      let s = pool[n];
      if (!s) pool[n] = s = { x: 0, y: 0, z: 0, frame: f, flip: false };
      s.x = c.x + it.x - R.x * dx - U.x * dy + F.x * b; s.y = look.y + it.y - R.y * dx - U.y * dy + F.y * b; s.z = c.z + it.z - R.z * dx - U.z * dy + F.z * b;
      if (sx !== 1 || sy !== 1) { s.x = c.x + (s.x - c.x) * sx; s.z = c.z + (s.z - c.z) * sx; s.y = look.y + (s.y - look.y) * sy; } // squashed or stretched about its feet
      s.frame = f; s.flip = it.flip; s.fresh = look.fresh; s.glow = look.glow; s.scale = look.scale; s.sx = sx; s.sy = sy;
    }
    this.used.set(key, ns[0]); this.used.set(dkey, ns[1]);
    this.stats.instances += this.out.n;
  }

  /** Hands every batch its instances; forgets creatures no longer drawn. */
  end(): void {
    for (const [k, b] of this.batches) { const pool = this.pool.get(k) ?? [], n = this.used.get(k) ?? 0; if (pool.length > n) pool.length = n; b.set(pool); } // (trimmed to this frame's: the batch draws them all)
    for (const id of this.bodies.keys()) if (!this.seen.has(id)) this.bodies.delete(id);
  }
}

/** A four-legged rig page's disc frames (its limbs': a serpent's body discs keep their rim, wide enough to carry it), worked out once per page. */
const discSets = new WeakMap<RigMeta, Set<number>>();
function discFrames(m: RigMeta): Set<number> {
  let d = discSets.get(m);
  if (!d) { d = new Set(); if (m.template === "quadruped") for (const byR of Object.values(m.discs)) for (const p of Object.values(byR)) d.add(p.frame); discSets.set(m, d); }
  return d;
}
