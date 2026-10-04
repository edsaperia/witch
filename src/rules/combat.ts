// Combat (Stage 4; DESIGN.md "Combat, pacing and forecasting"): one system for wild and party
// creatures. Every creature of young age and up has an attack from config/combat.json (melee, a
// shot or the legends' quake), by its level and whether its species shoots; the numbers are data,
// one power budget per level. Sides: party (leashed) against wild; the witch is on the party's
// side and wild creatures shoot at her on the ground (Ed, 2026-10-04). Same kind never fights
// same kind, whichever side (Ed: inviting doesn't start fights inside a group; your wolves can't
// defend against wild wolves). Sieges: when a wave wakes an area, its wild creatures march on its
// new soundsystem; survivors of a won siege march on to the next-nearest. No drawing here.
import raw from "../../config/combat.json";
import { LEGEND, type Creature, type Level } from "./creatures";
import type { Cell } from "./partition";
import type { Tuning } from "./tuning";

export type Delivery = "melee" | "shot" | "quake";
export type Modifier = "none" | "knockback" | "slow";

export interface Attack {
  delivery: Delivery;
  range: number;
  windup: number;
  cooldown: number;
  modifier: Modifier;
  speed?: number;
  radius?: number;
  knockback?: number;
  slowMult?: number;
  slowTime?: number;
  /** Melee: how far it lunges at where it aimed when the blow lands (dodgeable: it's committed). */
  lunge?: number;
}

export interface CombatData {
  levels: { hp: number[]; dps: number[] };
  attacks: Record<string, Attack>;
  byLevel: { melee: (string | null)[]; ranged: (string | null)[] };
  ranged: string[];
  /** Species with their own attacks by level (overriding byLevel). */
  bySpecies: Record<string, (string | null)[]>;
  /** Kiting (Ed, 2026-10-04: "keep a certain distance as part of their attack pattern"): these
   *  hold between near and far of their range from what they shoot at, backing off or closing in. */
  kite: { species: string[]; near: number; far: number };
  /** How a species' babies take to the witch close by (Ed's playtest: curious or skittish). */
  temperament: { curious: string[]; skittish: string[] };
}

export const COMBAT = raw as unknown as CombatData;

/** Who a blow lands on: a creature, a witch, or a soundsystem (by its area's key; "home" the dancefloor). */
export type Target = { kind: "creature"; id: number } | { kind: "witch"; id: number } | { kind: "sound"; key: string };

/** A creature's fight: what it's after and where its attack is. */
export interface Fight {
  target: Target | null;
  /** Game time its attack is ready again. */
  readyAt: number;
  /** Winding up: the game time it lands or flies, and where it was aimed then (a shot flies at that point). */
  windupUntil: number;
  aimX: number;
  aimZ: number;
}

/** A projectile in flight: dodgeable (it flies at a point, not after its target). */
export interface Shot {
  id: number;
  x: number;
  z: number;
  vx: number;
  vz: number;
  /** Game time it fizzles out (after range / speed). */
  until: number;
  from: number;
  side: "wild" | "party";
  species: string;
  damage: number;
  radius: number;
  attack: string;
}

export type CombatEventKind = "hit" | "windup" | "shot" | "quake" | "fled" | "lost" | "witchHit" | "soundHit" | "soundDestroyed";
export interface CombatEvent { kind: CombatEventKind; x: number; z: number; at: number; id?: number; key?: string; big?: boolean }

/** A soundsystem's health (home: the dancefloor's ring). */
export interface SoundHealth { hp: number; max: number; x: number; z: number; radius: number }

export interface CombatState {
  shots: Shot[];
  nextShot: number;
  sounds: Map<string, SoundHealth>;
  /** Areas whose soundsystem was destroyed: the party there is over for the run. */
  ruined: Set<string>;
  /** What happened in this frame's steps (cleared by stepGame each frame), for the view. */
  events: CombatEvent[];
  /** Creatures besieging, fleeing, mid-fight or walking home: stepped wherever the witches are. */
  busy: Set<number>;
}

export const newCombat = (): CombatState => ({ shots: [], nextShot: 0, sounds: new Map(), ruined: new Set(), events: [], busy: new Set() });

/** The attack a creature has: none for babies; by its level and whether its kind shoots. */
export function attackOf(species: string, level: Level, data: CombatData = COMBAT): { name: string; attack: Attack; damage: number } | null {
  const list = data.bySpecies[species] ?? (data.ranged.includes(species) ? data.byLevel.ranged : data.byLevel.melee), name = list[level];
  if (!name) return null;
  const attack = data.attacks[name];
  return { name, attack, damage: data.levels.dps[level] * attack.cooldown };
}

export const maxHp = (level: Level, data: CombatData = COMBAT) => data.levels.hp[Math.min(level, data.levels.hp.length - 1)];

/** Whether a creature takes part in fights now: alive, not wandering home neutral, not asleep. */
export const fighting = (c: Creature) => !c.gone && !c.fleeUntil && !c.wanderTo;

/** Whether anything may attack it: fighting, and not a baby (Ed, 2026-10-04: "No animals should
 *  attack babies"; shots and quakes pass them by, and they can't be beaten in a fight). */
export const targetable = (c: Creature) => fighting(c) && c.level > 0;

const sideOf = (c: Creature): "wild" | "party" => (c.leashed ? "party" : "wild");

/** Same kind never fights same kind (Ed, 2026-10-04), on any side. */
export const truce = (a: Creature, b: Creature) => a.species === b.species;

/** What the rest of the game tells combat each step. */
export interface CombatWorld {
  creatures: Creature[];
  /** The creatures to step this time (near a witch, or busy with a siege). */
  active: Creature[];
  witches: { id: number; x: number; z: number; onGround: boolean; down: boolean }[];
  /** Where a party animal's leash is fixed. */
  leashPoint: (id: number) => { x: number; z: number } | null;
  /** Whether a party animal is parked (at a sigil on the ground): it guards round it. */
  parked: (id: number) => boolean;
  /** The witch a creature is being invited by right now (it holds its fire on her: Ed's playtest), or -1. */
  talkingTo: (id: number) => number;
  /** How far a creature at (x, z) runs to leave the map, and where (a point just past its edge). */
  exit: (x: number, z: number) => { x: number; z: number };
  /** Whether (x, z) is out of every witch's sight (far beyond the haze): a fleeing creature there is gone. */
  unseen: (x: number, z: number) => boolean;
  /** Whether (x, z) is in the creature's own area. */
  inArea: (c: Creature, x: number, z: number) => boolean;
  /** A wild creature still asleep (a dormant legend): no fighting. */
  asleep: (c: Creature) => boolean;
  time: number;
  dt: number;
  t: Tuning;
  /** A party animal is busy (eating, evolving): it doesn't fight. */
  busy: (id: number) => boolean;
  /** A witch is hit (one point, whatever hits her). */
  hitWitch: (id: number, time: number) => void;
  /** A party animal is lost for the run. */
  loseParty: (id: number) => void;
}

function targetPos(w: CombatWorld, s: CombatState, tg: Target): { x: number; z: number; r: number } | null {
  if (tg.kind === "creature") { const c = w.creatures[tg.id]; return c && !c.gone ? { x: c.x, z: c.z, r: 0.6 + c.level * 0.25 } : null; }
  if (tg.kind === "witch") { const v = w.witches[tg.id]; return v && v.onGround && !v.down ? { x: v.x, z: v.z, r: 0.5 } : null; }
  const h = s.sounds.get(tg.key);
  return h && h.hp > 0 ? { x: h.x, z: h.z, r: h.radius } : null;
}

/** Whether a target is still worth fighting for this creature. */
function valid(w: CombatWorld, s: CombatState, c: Creature, tg: Target): boolean {
  if (tg.kind === "creature") {
    const o = w.creatures[tg.id];
    return !!o && targetable(o) && sideOf(o) !== sideOf(c) && !truce(c, o) && !w.asleep(o);
  }
  if (tg.kind === "witch") {
    // A wild one loses her when she rises, or once she's out of its area, out of its attack range
    // and at least combat.witchLose away (Ed, 2026-10-04); then it walks back to its spot.
    const v = w.witches[tg.id];
    if (c.leashed || !v || !v.onGround || v.down || w.talkingTo(c.id) === tg.id) return false;
    const d = Math.hypot(v.x - c.x, v.z - c.z), range = attackOf(c.species, c.level)?.attack.range ?? 0;
    return !(d > range && d >= w.t.combat.witchLose && !w.inArea(c, v.x, v.z));
  }
  return !c.leashed && (s.sounds.get(tg.key)?.hp ?? 0) > 0;
}

/** What a creature goes for: the nearest enemy within `range` of (x, z), of the other side and
 *  another kind, never a baby. A wild one goes for a witch on the ground once she's within its
 *  attack range or she's on the ground in its area (Ed's playtest, 2026-10-04). A party animal following her takes on only
 *  what attacks her or her party (Ed: they engage anything that attacks the witch or them); a
 *  parked one, anything within guard.radius of its sigil. */
function acquire(w: CombatWorld, c: Creature, x: number, z: number, range: number, attackRange: number, grid: Grid, guarding: boolean): Target | null {
  let best: Target | null = null, bd = range;
  for (const o of grid.near(x, z, range)) {
    if (o === c || !targetable(o) || sideOf(o) === sideOf(c) || truce(c, o) || w.asleep(o)) continue;
    if (c.leashed && !guarding) {
      const tg = o.fight?.target;
      if (!tg || (tg.kind !== "witch" && !(tg.kind === "creature" && w.creatures[tg.id]?.leashed))) continue;
    }
    const d = Math.hypot(o.x - x, o.z - z);
    if (d < bd) { bd = d; best = { kind: "creature", id: o.id }; }
  }
  if (!c.leashed) for (const v of w.witches) {
    if (!v.onGround || v.down || w.talkingTo(c.id) === v.id) continue; // (the one she's inviting holds its fire on her)
    const d = Math.hypot(v.x - c.x, v.z - c.z);
    if ((d < attackRange || w.inArea(c, v.x, v.z)) && (!best || d < bd)) { bd = d; best = { kind: "witch", id: v.id }; }
  }
  return best;
}

/** A coarse grid of the fighting creatures, rebuilt each step, so finding enemies near one is cheap. */
class Grid {
  private cells = new Map<number, Creature[]>();
  constructor(list: Creature[], private size = 16) {
    for (const c of list) { const k = this.key(Math.floor(c.x / size), Math.floor(c.z / size)); let l = this.cells.get(k); if (!l) this.cells.set(k, (l = [])); l.push(c); }
  }
  private key(i: number, j: number) { return (i + 65536) * 131072 + (j + 65536); }
  *near(x: number, z: number, r: number): Generator<Creature> {
    const s = this.size;
    for (let j = Math.floor((z - r) / s); j <= Math.floor((z + r) / s); j++)
      for (let i = Math.floor((x - r) / s); i <= Math.floor((x + r) / s); i++) yield* this.cells.get(this.key(i, j)) ?? [];
  }
}

/** Move a creature toward (x, z) at `speed`, by up to `dt`; returns how far it still is. */
function moveToward(c: Creature, x: number, z: number, stopAt: number, speed: number, dt: number): number {
  const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz);
  if (d <= stopAt) { c.moving = false; return d; }
  const step = Math.min(d - stopAt, speed * dt);
  c.x += (dx / d) * step; c.z += (dz / d) * step;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = dz < -Math.abs(dx);
  c.moving = true;
  c.walk += dt * 5;
  return d - step;
}

/** A blow lands on a target: damage, knockback and slow for creatures; one point for a witch; the
 *  soundsystem's health for a siege. */
function land(w: CombatWorld, s: CombatState, from: Creature | null, tg: Target, damage: number, a: Attack, fx: number, fz: number): void {
  const time = w.time;
  if (tg.kind === "witch") { w.hitWitch(tg.id, time); const v = w.witches[tg.id]; s.events.push({ kind: "witchHit", x: v.x, z: v.z, at: time, id: tg.id }); return; }
  if (tg.kind === "sound") {
    const h = s.sounds.get(tg.key);
    if (!h || h.hp <= 0) return;
    h.hp = Math.max(0, h.hp - damage);
    s.events.push({ kind: "soundHit", x: h.x, z: h.z, at: time, key: tg.key });
    if (h.hp === 0) s.events.push({ kind: "soundDestroyed", x: h.x, z: h.z, at: time, key: tg.key });
    return;
  }
  const o = w.creatures[tg.id];
  if (!o || o.gone || o.level === 0) return; // babies can't be hurt
  o.hp = (o.hp ?? maxHp(o.level)) - damage;
  o.hurtAt = time;
  s.events.push({ kind: "hit", x: o.x, z: o.z, at: time, id: o.id, big: from?.level === LEGEND });
  if (a.modifier === "knockback" && a.knockback) {
    const dx = o.x - fx, dz = o.z - fz, d = Math.hypot(dx, dz) || 1;
    o.kx = (dx / d) * a.knockback * 6; o.kz = (dz / d) * a.knockback * 6; // eased off over a moment (stepKnock)
  }
  if (a.modifier === "slow") o.slowUntil = time + (a.slowTime ?? 2); // a new slow renews, never stacks
  // It turns on whoever hit it, if it isn't busy with another.
  if (from && o.fight && !o.fight.target) o.fight.target = { kind: "creature", id: from.id };
  if (o.hp <= 0) {
    // Beaten (Ed, 2026-10-04: "it's sad when animals die"): it runs off the map, visibly, and is
    // gone for good. A party animal is lost for the run: off its leash as it goes.
    const party = o.leashed;
    if (party) { w.loseParty(o.id); o.leashed = false; }
    const out = w.exit(o.x, o.z);
    o.fleeUntil = Infinity; o.fleeX = out.x; o.fleeZ = out.z; o.fight = undefined; o.siege = undefined; o.enraged = false;
    s.events.push({ kind: party ? "lost" : "fled", x: o.x, z: o.z, at: time, id: o.id });
  }
}

/** One step of every fight. Creatures fighting move here (their roam and leash leave them be). */
export function stepCombat(s: CombatState, w: CombatWorld, data: CombatData = COMBAT): void {
  // (Events gather over a frame's steps: stepGame clears them once a frame, for the view.)
  const { time, dt, t } = w, C = t.combat;
  // Shots fly; each hits the first enemy (not its own kind) it reaches, or fizzles at its range.
  const grid = new Grid(w.active.filter(c => fighting(c)));
  s.shots = s.shots.filter(sh => {
    sh.x += sh.vx * dt; sh.z += sh.vz * dt;
    if (time >= sh.until) return false;
    const from = w.creatures[sh.from], a = data.attacks[sh.attack];
    for (const o of grid.near(sh.x, sh.z, sh.radius + 2)) {
      if (!targetable(o) || sideOf(o) === sh.side || o.species === sh.species || w.asleep(o)) continue;
      if (Math.hypot(o.x - sh.x, o.z - sh.z) <= sh.radius + 0.4 + o.level * 0.2) { land(w, s, from ?? null, { kind: "creature", id: o.id }, sh.damage, a, sh.x - sh.vx, sh.z - sh.vz); return false; }
    }
    if (sh.side === "wild") for (const v of w.witches) {
      if (!v.onGround || v.down) continue;
      if (Math.hypot(v.x - sh.x, v.z - sh.z) <= sh.radius + 0.3) { land(w, s, from ?? null, { kind: "witch", id: v.id }, sh.damage, a, sh.x, sh.z); return false; }
    }
    if (sh.side === "wild") for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - sh.x, h.z - sh.z) <= h.radius + sh.radius) { land(w, s, from ?? null, { kind: "sound", key }, sh.damage, a, sh.x, sh.z); return false; }
    return true;
  });

  for (const c of w.active) {
    stepKnock(c, dt);
    if (c.gone) continue;
    // Beaten: it runs for the map's edge, and is gone once it's off the map or out of every witch's sight.
    if (c.fleeUntil) {
      const ax = (c.fleeX ?? c.x) - c.x, az = (c.fleeZ ?? c.z) - c.z, d = Math.hypot(ax, az);
      if (d < 1 || w.unseen(c.x, c.z)) { c.gone = true; continue; }
      c.x += (ax / d) * c.speed * C.fleeMult * dt; c.z += (az / d) * c.speed * C.fleeMult * dt;
      c.facing = ax > 0 ? 1 : -1; c.away = az < -Math.abs(ax);
      c.moving = true; c.walk += dt * 8;
      continue;
    }
    if (!fighting(c) || w.asleep(c) || (c.leashed && w.busy(c.id))) { c.fight = undefined; continue; }
    const atk = attackOf(c.species, c.level, data);
    if (!atk) { c.fight = undefined; continue; } // babies don't attack
    const f = (c.fight ??= { target: null, readyAt: time + atk.attack.cooldown * 0.5 * (c.rand() + 0.5), windupUntil: 0, aimX: 0, aimZ: 0 });
    const lp = c.leashed ? w.leashPoint(c.id) : null, guarding = !!lp && w.parked(c.id);
    // Party animals fight only near their leash point (a parked one within guard.radius of its
    // sigil); wild ones within aggro of where they are.
    const reachX = lp ? lp.x : c.x, reachZ = lp ? lp.z : c.z, reach = lp ? (guarding ? t.guard.radius : t.leash.length + C.engage) : C.aggro;
    if (f.target && !valid(w, s, c, f.target)) f.target = null;
    if (f.target && lp) { const p = targetPos(w, s, f.target); if (!p || Math.hypot(p.x - lp.x, p.z - lp.z) > reach + atk.attack.range) f.target = null; }
    if (!f.target || f.windupUntil === 0) {
      const near = acquire(w, c, reachX, reachZ, reach, atk.attack.range, grid, guarding);
      if (near) f.target = near;
      else if (!f.target && c.siege && !c.leashed) f.target = { kind: "sound", key: c.siege };
    }
    if (!f.target) { if (f.windupUntil) f.windupUntil = 0; continue; }
    const p = targetPos(w, s, f.target);
    if (!p) { f.target = null; f.windupUntil = 0; continue; } // (it fell this very step)
    const d = Math.hypot(p.x - c.x, p.z - c.z), A = atk.attack, K = data.kite, kites = A.delivery === "shot" && K.species.includes(c.species);
    const want = A.delivery === "shot" ? A.range * (kites ? K.far : 0.8) : A.range + p.r + (A.lunge ?? 0) - 0.3;
    const speed = c.speed * (c.leashed ? C.partyChaseMult : C.chaseMult) * (c.slowUntil && time < c.slowUntil ? A.slowMult ?? 0.5 : 1) * (c.level === LEGEND ? 0.6 : 1);
    if (f.windupUntil === 0) {
      if (d > want) { moveToward(c, p.x, p.z, want, f.target.kind === "sound" ? c.speed * C.marchMult : speed, dt); continue; }
      // A kiter backs off when its target comes too close, keeping its distance while it shoots.
      if (kites && d < A.range * K.near && d > 0.01) { c.x -= ((p.x - c.x) / d) * speed * dt; c.z -= ((p.z - c.z) / d) * speed * dt; c.moving = true; c.walk += dt * 6; c.facing = p.x >= c.x ? 1 : -1; if (time < f.readyAt) continue; }
      c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
      if (time >= f.readyAt) {
        f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z;
        s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
      }
      continue;
    }
    // Winding up: it stands and telegraphs, then the blow lands, the shot flies, or the ground quakes.
    c.moving = false;
    if (time < f.windupUntil) continue;
    f.windupUntil = 0; f.readyAt = time + A.cooldown;
    const dmg = atk.damage;
    if (A.delivery === "melee") {
      // The lunge: at where it aimed when it wound up, so stepping aside dodges it.
      const ax = f.aimX - c.x, az = f.aimZ - c.z, ad = Math.hypot(ax, az), L = Math.min(A.lunge ?? 0, Math.max(0, ad - 0.5));
      if (ad > 0.01 && L > 0) { c.x += (ax / ad) * L; c.z += (az / ad) * L; }
      if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r) land(w, s, c, f.target, dmg, A, c.x, c.z);
    }
    else if (A.delivery === "shot") {
      const ax = f.aimX - c.x, az = f.aimZ - c.z, ad = Math.hypot(ax, az) || 1, v = A.speed ?? 9;
      s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: (ax / ad) * v, vz: (az / ad) * v, until: time + (A.range * 1.3) / v, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 0.6, attack: atk.name });
      s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
    } else {
      // The quake: everything of the other side round it, and the witch if she's on the ground in it.
      const R = A.radius ?? 5;
      s.events.push({ kind: "quake", x: c.x, z: c.z, at: time, id: c.id, big: true });
      for (const o of grid.near(c.x, c.z, R)) if (o !== c && targetable(o) && sideOf(o) !== sideOf(c) && !truce(c, o) && Math.hypot(o.x - c.x, o.z - c.z) <= R) land(w, s, c, { kind: "creature", id: o.id }, dmg, A, c.x, c.z);
      if (!c.leashed) {
        for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - c.x, v.z - c.z) <= R) land(w, s, c, { kind: "witch", id: v.id }, dmg, A, c.x, c.z);
        for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - c.x, h.z - c.z) <= R + h.radius) land(w, s, c, { kind: "sound", key }, dmg, A, c.x, c.z);
      }
    }
  }
}

/** Knockback eases off over a moment. */
function stepKnock(c: Creature, dt: number): void {
  if (!c.kx && !c.kz) return;
  c.x += (c.kx ?? 0) * dt; c.z += (c.kz ?? 0) * dt;
  const k = Math.exp(-dt * 10);
  c.kx = (c.kx ?? 0) * k; c.kz = (c.kz ?? 0) * k;
  if (Math.hypot(c.kx, c.kz) < 0.05) { c.kx = 0; c.kz = 0; }
}

/** The soundsystem a siege goes for next: the nearest still standing, from (x, z). */
export function nearestSound(s: CombatState, x: number, z: number): string | null {
  let best: string | null = null, bd = Infinity;
  for (const [key, h] of s.sounds) { if (h.hp <= 0) continue; const d = Math.hypot(h.x - x, h.z - z); if (d < bd) { bd = d; best = key; } }
  return best;
}

/** A soundsystem rises (a wave woke its area): its health, and the wild creatures of the area march on it. */
export function startSiege(s: CombatState, key: string, at: { x: number; z: number }, cell: Cell, creatures: Creature[], t: Tuning): void {
  s.sounds.set(key, { hp: t.combat.soundsystemHealth, max: t.combat.soundsystemHealth, x: at.x, z: at.z, radius: t.combat.soundsystemRadius });
  for (const c of creatures) if (!c.gone && !c.leashed && !c.wanderTo && c.cell[0] === cell[0] && c.cell[1] === cell[1] && c.level > 0) { c.siege = key; c.enraged = true; }
}

/** After a soundsystem falls: the survivors march on to the next-nearest still standing. */
export function marchOn(s: CombatState, key: string, creatures: Creature[]): void {
  for (const c of creatures) if (c.siege === key && !c.gone) { c.siege = nearestSound(s, c.x, c.z) ?? undefined; if (c.fight) c.fight.target = null; }
}
