// The generated soundsystems in play (art/soundsystemGen.js; Ed, 2026-10-08: "a variety, for them all to point towards the dancefloor
// ... the ones further away to be larger ... we don't see any exactly identical ones on the map"). Per map: every area's genome, dealt
// as one set (soundsystemSet: none alike), its yaw towards the dancefloor (soundsystemYaw, at most the tuning's maxYaw off facing us,
// so none turns edge-on) and its size by how far out it stands (soundsystemScale, near to far). Each is baked by the art workers at
// its own yaw and size (assets.soundsystemGenArt: playing, damaged, destroyed), in the background for the next waves' areas and
// urgently for one partifying; until its art is there it isn't drawn (the old stacks are gone). Drawing only.
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import { leyChain } from "../rules/leylines";
import type { ForestMap } from "../rules/map";
import { cellKey } from "../rules/party";
import type { AssetLibrary } from "./assets";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type * as THREE from "three";

export interface SoundsystemGenKnobs { on: boolean; near: number; far: number; from: number; to: number; maxYaw: number; toward: boolean; ahead: number }
export const SOUNDSYSTEM_GEN_DEFAULT: SoundsystemGenKnobs = { on: true, near: 0.8, far: 1.6, from: 120, to: 1000, maxYaw: 60, toward: false, ahead: 2 };

/** One area's soundsystem as the map deals it. */
export interface GenSpec { key: string; id: string; genome: unknown; yaw: number; size: number; far: number }

const SETS = new WeakMap<ForestMap, { knobs: string; specs: Map<string, GenSpec> }>();
const hashKey = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };

/** Every area's soundsystem on this map (worked out once a map and set of knobs). */
export function soundsystemSpecs(map: ForestMap, K: SoundsystemGenKnobs): Map<string, GenSpec> {
  const kk = JSON.stringify(K), have = SETS.get(map);
  if (have && have.knobs === kk) return have.specs;
  const d = map.dancefloor, list: { key: string; seed: number; far: number; dx: number; dz: number }[] = [];
  for (const [cx, cy] of map.cells) {
    if (cx === map.centreCell[0] && cy === map.centreCell[1]) continue; // (home has the dancefloor's ring instead)
    const s = map.soundsystemSpot(cx, cy), dx = s.x - d.x, dz = s.z - d.z, dist = Math.hypot(dx, dz);
    list.push({ key: cellKey([cx, cy]), seed: hashKey(`${map.seed}:${cx},${cy}`) % 1e9, far: Math.max(0, Math.min(1, (dist - K.from) / Math.max(1, K.to - K.from))), dx, dz });
  }
  list.sort((a, b) => a.far - b.far); // (dealt from the middle out: a re-roll goes to the further of two alike)
  const set = (Art.soundsystemSet as unknown as (l: { seed: number; far: number }[]) => { seed: number; salt: number }[])(list), specs = new Map<string, GenSpec>();
  const share = Art.PROFILE_YAW as unknown as Record<string, number>;
  list.forEach((a, i) => {
    const g = set[i] as { seed: number; salt: number; profile: string }, limit = (K.toward ? 180 : K.maxYaw * (share[g.profile] ?? 1)) * Math.PI / 180;
    let yaw = (Art.soundsystemYaw as unknown as (dx: number, dz: number, mode: string) => number)(a.dx, a.dz, K.toward ? "toward" : "ring") * Math.PI / 180;
    // a soft limit, by profile (the art director's pass, 2026-10-08): a wall turns at most 2/3 of maxYaw, straight 5/6, the rest
    // all of it; easing towards it (tanh) rather than piling up there, so a wide stack never stands side-on
    if (!K.toward) yaw = limit * Math.tanh(yaw / limit);
    yaw = yaw * 180 / Math.PI;
    const size = +(Art.soundsystemScale as unknown as (f: number, n: number, fk: number) => number)(a.far, K.near, K.far).toFixed(3);
    specs.set(a.key, { key: a.key, id: `ss-${g.seed}-${g.salt}-${Math.round(yaw)}-${size}`, genome: g, yaw: Math.round(yaw), size, far: a.far });
  });
  SETS.set(map, { knobs: kk, specs });
  return specs;
}

export const genKnobs = (g: Game): SoundsystemGenKnobs => ({ ...SOUNDSYSTEM_GEN_DEFAULT, ...((g.tuning as { soundsystemGen?: Partial<SoundsystemGenKnobs> }).soundsystemGen ?? {}) });

/** One area's soundsystem drawn this frame: where it stands, its state's frame, how far risen (0..1). */
export interface GenDraw { key: string; x: number; z: number; rise: number; /** 0 playing, 1 to 3 damaged by stage (art DAMAGE_STAGES), 4 destroyed. */ stage: number; time: number; fresh?: boolean }

/** The damage stage for a share of health left (art/soundsystemGen.js DAMAGE_STAGES): 0 playing, 1 to 3 damaged, 4 destroyed. */
export function damageStage(share: number, ruined: boolean): number {
  if (ruined || share <= 0) return 4;
  const S = Art.DAMAGE_STAGES as unknown as number[];
  return share < S[2] ? 3 : share < S[1] ? 2 : share < S[0] ? 1 : 0;
}

/** What the view knows of one drawn this frame: its light colour, its projector's top in the world (the sky hologram's anchor;
 *  null destroyed), its height (m) and its damage stage (0 playing, 1 to 3, 4 destroyed: the hologram glitches more with each). */
export interface GenInfo { rgb: number[]; projector: { x: number; y: number; z: number } | null; h: number; stage: number }

/** The batches: one per area's baked art, made as its art arrives, filled each frame with that area's one instance. */
export class SoundsystemGenView {
  private batches = new Map<string, SpriteBatch>();
  private used = new Set<string>();
  private warmed = new WeakSet<object>();
  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number, private renderer?: THREE.WebGLRenderer) {}

  /** Upload an area's atlas as soon as its bake is here (foxtrot's hitch check on #541), so its first frame on screen doesn't
   *  pay for it: for the next waves' areas that's well before they rise. */
  private warm(a: { atlas: { albedo: THREE.Texture; normal: THREE.Texture } } | undefined): void {
    if (!a || !this.renderer || this.warmed.has(a)) return;
    this.warmed.add(a); this.renderer.initTexture(a.atlas.albedo); this.renderer.initTexture(a.atlas.normal);
  }

  /** Ask for the next waves' art ahead (in the background), then draw this frame's. Returns, per area drawn, its light colour,
   *  its projector's top in the world (the sky hologram's anchor) and its sprite's height in metres. */
  update(g: Game, draws: GenDraw[]): Map<string, GenInfo> {
    const K = genKnobs(g), specs = soundsystemSpecs(g.map, K), out = new Map<string, GenInfo>();
    for (const s of leyChain(g.party, g.map, K.ahead, 0).stones) { const sp = specs.get(cellKey(s.cell)); if (sp) this.warm(this.assets.soundsystemGenArt(sp.id, sp.genome, sp.yaw, sp.size, false)); }
    this.used.clear();
    const R = SPRITE_UNIFORMS.uRight.value, U = SPRITE_UNIFORMS.uUp.value;
    for (const d of draws) {
      const sp = specs.get(d.key); if (!sp) continue;
      const play = this.assets.soundsystemGenArt(sp.id, sp.genome, sp.yaw, sp.size, true); if (!play) continue;
      this.warm(play);
      // hurt: its damage (stages 1 to 3, the rubble), baked once it's first needed; meanwhile its playing frames
      const dmg = d.stage > 0 ? this.assets.soundsystemGenArt(sp.id, sp.genome, sp.yaw, sp.size, true, "damage") : undefined, art = dmg ?? play, bid = dmg ? `${sp.id}-dmg` : sp.id;
      this.warm(dmg);
      let b = this.batches.get(bid);
      if (!b) { b = new SpriteBatch(art.atlas, this.mpp, { solid: true }); this.batches.set(bid, b); this.scene.add(...b.meshes); }
      const fi = !dmg ? Math.floor(d.time * 6) % 3 : d.stage >= 4 ? 6 : (d.stage - 1) * 2 + (Math.floor(d.time * (3 + d.stage * 2)) % 2), f = art.atlas.frames[fi], o = art.origins[fi], p = art.projectors[fi];
      if (!f) continue;
      const h = f.h * this.mpp, dx = (o.x - f.w / 2) * this.mpp, dy = (f.h - o.y) * this.mpp, y = -(1 - d.rise) * h;
      // its origin (its middle on the ground) where it stands: the sprite's bottom middle shifted by the origin's offset
      b.set([{ x: d.x - R.x * dx - U.x * dy, y: y - R.y * dx - U.y * dy, z: d.z - R.z * dx - U.z * dy, frame: f, flip: false, fresh: d.fresh } as SpriteInstance]);
      this.used.add(bid);
      const bx = d.x - R.x * dx - U.x * dy, by = y - R.y * dx - U.y * dy, bz = d.z - R.z * dx - U.z * dy, at = (px: number, py: number) => { const a = (px - f.w / 2) * this.mpp, c = (f.h - py) * this.mpp; return { x: bx + R.x * a + U.x * c, y: by + R.y * a + U.y * c, z: bz + R.z * a + U.z * c }; };
      const proj = p ? at(p.x, p.y) : null;
      out.set(d.key, { rgb: play.rgb, projector: proj, h, stage: d.stage });
    }
    for (const [id, b] of this.batches) if (!this.used.has(id) && b.count) b.set([]);
    return out;
  }

  get count(): number { let n = 0; for (const b of this.batches.values()) n += b.count; return n; }
  get dropped(): number { let n = 0; for (const b of this.batches.values()) n += b.dropped; return n; }
}
