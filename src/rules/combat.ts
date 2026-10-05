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
import { enrage, foes, huntsWitch, stateOf, STATES, type State } from "./creatureStates";
import { LEGENDS, lull } from "./legends";
import { bodyRadius } from "./spacing";
import { FIGHT, legendSetOf, packsOf, profileOf, startCharge, steer, stepBurrow, stepCharge, stepLeap, type LegendSet } from "./movement";
import type { Tuning } from "./tuning";

export type Delivery = "melee" | "shot" | "quake" | "lob" | "beam" | "pulse";
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
  /** Lob: seconds in the air. Beam: its width, seconds it burns, seconds between its ticks, and how fast it sweeps (degrees a second). */
  flight?: number;
  width?: number;
  duration?: number;
  tick?: number;
  sweep?: number;
  /** Its damage times this, so its expected damage a second matches the level's budget. */
  factor?: number;
  /** A legend's nova: how many shots, in a ring. A legend's spin: degrees a second its beam turns. */
  shots?: number;
  spin?: number;
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
  /** Traits (Stage 5, readable counters): the species with each. */
  traits: Record<Trait, string[]>;
  /** What each trait does to a blow: its damage times counters[trait][delivery]; and knockback
   *  (its distance times this), stun (seconds a knockback stuns it), slow (a slow's time times this). */
  counters: Record<Trait, Partial<Record<Delivery | "knockback" | "stun" | "slow", number>>>;
  /** Species strength (Ed, 2026-10-05: "just a number that goes up and down"): each species'
   *  multiplier on health and damage, 1 when not listed. */
  strength?: { species: Record<string, number> };
}

export type Trait = "flier" | "armoured" | "swarm" | "heavy" | "nimble" | "burrower";
export const COMBAT = raw as unknown as CombatData;
let D: CombatData = COMBAT; // (the data stepCombat was given, for land)

/** A species' traits. */
export const traitsOf = (species: string, data: CombatData = COMBAT): Trait[] => (Object.keys(data.traits) as Trait[]).filter(k => data.traits[k].includes(species));
/** What a target's traits make of a blow: damage, knockback and slow multipliers, and a stun. */
export function counterOf(species: string, delivery: Delivery, data: CombatData = COMBAT): { damage: number; knockback: number; stun: number; slow: number } {
  const out = { damage: 1, knockback: 1, stun: 0, slow: 1 };
  for (const tr of traitsOf(species, data)) {
    const k = data.counters[tr];
    if (!k) continue;
    out.damage *= k[delivery] ?? 1; out.knockback *= k.knockback ?? 1; out.stun = Math.max(out.stun, k.stun ?? 0); out.slow *= k.slow ?? 1;
  }
  return out;
}

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
  /** A wild legend's move being wound up (Stage 5), for the view's telegraph. */
  move?: string;
  /** When it noticed its target (it reacts combat.reaction seconds later), and a melee lunge under way: its way, and the metres left. */
  seenAt?: number;
  lunge?: { dx: number; dz: number; left: number; /** its speed now */ v?: number };
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
  /** The shooter's state (rules/creatureStates.ts): whom it can hit is foes(). */
  side: State;
  species: string;
  damage: number;
  radius: number;
  attack: string;
  /** A lob: from where to where, and when it was thrown and lands (it hits only where it lands). */
  lob?: { fx: number; fz: number; tx: number; tz: number; at: number; lands: number };
}

/** A beam burning (Stage 5): from its creature toward an angle, sweeping toward its target. */
export interface Beam { /** A legend's spin (radians a second), and when each thing it swept was last hit. */ spin?: number; last?: Record<string, number>; id: number; from: number; angle: number; length: number; width: number; until: number; nextTick: number; tick: number; damage: number; side: State; species: string; attack: string; target: Target }

export type CombatEventKind = "hit" | "windup" | "shot" | "quake" | "landed" | "beam" | "charged" | "sprung" | "stunned" | "pulse" | "burrowed" | "surfaced" | "leapt" | "slammed" | "nova" | "rush" | "phase" | "slept" | "fled" | "lost" | "witchHit" | "soundHit" | "soundDestroyed" | "dug" | "braced" | "blocked" | "flash" | "dazed";
export interface CombatEvent { kind: CombatEventKind; x: number; z: number; at: number; id?: number; key?: string; big?: boolean; /** A hit: strong against its target's traits (1), resisted (-1). */ counter?: number }

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
  beams: Beam[];
  /** A snail's slime (Ed's species pass): a patch of ground slowing whatever of the other side crosses it, till it dries. */
  trails: Trail[];
}
export interface Trail { x: number; z: number; r: number; until: number; side: State; slow: number; from: number }

export const newCombat = (): CombatState => ({ shots: [], nextShot: 0, sounds: new Map(), ruined: new Set(), events: [], busy: new Set(), beams: [], trails: [] });

/** The attack a creature has: none for babies; by its level and whether its kind shoots. */
/** A species' strength (Ed, 2026-10-05): the multiplier on its health and damage, 1 normal,
 *  below 1 weaker (a swarm), above 1 stronger (a loner); legends are never scaled. */
export function strengthOf(species: string, level: Level = 0, data: CombatData = COMBAT): number {
  if (level === LEGEND) return 1;
  return data.strength?.species[species] ?? 1;
}

export function attackOf(species: string, level: Level, data: CombatData = COMBAT): { name: string; attack: Attack; damage: number } | null {
  const list = data.bySpecies[species] ?? (data.ranged.includes(species) ? data.byLevel.ranged : data.byLevel.melee), name = list[level];
  if (!name) return null;
  const attack = scaled(name, attackNamed(name, data));
  return { name, attack, damage: data.levels.dps[level] * strengthOf(species, level, data) * attack.cooldown * (attack.factor ?? 1) };
}

/** An attack at the fight's scale and speed (FIGHT): its lengths times scale, its shot's speed times speed. */
const SCALED = new Map<string, Attack>();
export function scaled(name: string, A: Attack): Attack {
  if (!A) return A;
  const key = `${name}|${FIGHT.scale}|${FIGHT.speed}`;
  let out = SCALED.get(key);
  if (!out) {
    const L = FIGHT.scale, V = FIGHT.speed, m = (x: number | undefined, k: number) => (x === undefined ? undefined : x * k);
    out = { ...A, range: A.range * L, lunge: m(A.lunge, L), radius: m(A.radius, L), width: m(A.width, L), knockback: m(A.knockback, L), speed: m(A.speed, V) };
    if (SCALED.size > 2000) SCALED.clear();
    SCALED.set(key, out);
  }
  return out;
}
/** An attack by its name, at the fight's scale (for the view, and data lookups). */
export const attackNamed = (name: string, data: CombatData = COMBAT): Attack => scaled(name, data.attacks[name]);

export const maxHp = (level: Level, data: CombatData = COMBAT) => data.levels.hp[Math.min(level, data.levels.hp.length - 1)];

/** A creature's full health: its level's, times its species' strength. */
export const creatureMaxHp = (c: { species: string; level: Level }, data: CombatData = COMBAT) => maxHp(c.level, data) * strengthOf(c.species, c.level, data);

/** Whether a creature takes part in fights now: alive, not wandering home neutral, not asleep. */
export const fighting = (c: Creature) => !c.gone && !c.fleeUntil && !c.wanderTo && !c.dazed && !(c.leashed && c.travelling); // (a dazed one lies still: rules/creatureStates.ts) // (a travelling party animal is quiet both ways: rules/travel.ts)

/** Whether anything may attack it: fighting, and not a baby (Ed, 2026-10-04: "No animals should
 *  attack babies"; shots and quakes pass them by, and they can't be beaten in a fight). */
export const targetable = (c: Creature) => fighting(c) && c.level > 0 && !c.burrow; // (a burrower underground can't be hit)

/** Whose side: hers (on her leash, at a sigil, or a happy area legend: Ed, 2026-10-04) or the wild's. */
const sideOf = (c: Creature): State => stateOf(c); // (its state: who fights whom is foes(), rules/creatureStates.ts)

/** Same kind never fights same kind (Ed, 2026-10-04), on any side. */
export const truce = (a: Creature, b: Creature) => a.species === b.species;

/** What the rest of the game tells combat each step. */
export interface CombatWorld {
  creatures: Creature[];
  /** The creatures to step this time (near a witch, or busy with a siege). */
  active: Creature[];
  witches: { id: number; x: number; z: number; onGround: boolean; down: boolean; /** her velocity (flankers go round to her back) */ vx?: number; vz?: number }[];
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
  /** A witch is slowed (a snail's slime, a glow-worm's flash): her speed times mult until then. */
  slowWitch?: (id: number, until: number, mult: number) => void;
}

/** How much of a blow a creature takes for how it's holding itself (Ed's species pass): curled up
 *  rolling, dug in or braced behind its tail; and whether it's rooted (no knockback). */
export function guardOf(o: Creature, delivery: Delivery, time: number): { damage: number; rooted: boolean } {
  if (o.charge?.curl) return { damage: o.charge.curl, rooted: false };
  const P = profileOf(o.species)?.move;
  if (o.dug !== undefined && time < o.dug) return { damage: P?.armour ?? 0.5, rooted: true };
  if (o.brace !== undefined && time < o.brace) return { damage: delivery === "melee" ? 0.5 : P?.armour ?? 0.15, rooted: true };
  return { damage: 1, rooted: false };
}

function targetPos(w: CombatWorld, s: CombatState, tg: Target): { x: number; z: number; r: number } | null {
  if (tg.kind === "creature") { const c = w.creatures[tg.id]; return c && !c.gone ? { x: c.x, z: c.z, r: Math.max(0.6 + c.level * 0.25, bodyRadius(c) + 0.3) } : null; } // (its body, so a blow reaches a big one that spacing keeps at arm's length)
  if (tg.kind === "witch") { const v = w.witches[tg.id]; return v && v.onGround && !v.down ? { x: v.x, z: v.z, r: 0.5 } : null; }
  const h = s.sounds.get(tg.key);
  return h && h.hp > 0 ? { x: h.x, z: h.z, r: h.radius } : null;
}

/** Which way a target is heading (a unit vector), or null if it's about still. */
function headingOf(w: CombatWorld, tg: Target): { x: number; z: number } | null {
  const v = tg.kind === "witch" ? w.witches[tg.id] : tg.kind === "creature" ? w.creatures[tg.id] : null;
  const vx = v?.vx ?? 0, vz = v?.vz ?? 0, m = Math.hypot(vx, vz);
  return m > 1.5 ? { x: vx / m, z: vz / m } : null;
}

/** Lights within R of a creature: glow-worms and soundsystems (moths are drawn to them). */
function lightsNear(w: CombatWorld, s: CombatState, c: Creature, R: number): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [];
  for (const o of w.active) if (o !== c && o.species === "glowworm" && !o.gone && Math.abs(o.x - c.x) < R && Math.abs(o.z - c.z) < R) out.push(o);
  for (const h of s.sounds.values()) if (h.hp > 0 && Math.hypot(h.x - c.x, h.z - c.z) < R) out.push(h);
  return out;
}

/** Whether a target is still worth fighting for this creature. */
/** Whether (x, z) is more than combat.leaveArea metres past the creature's area's edge (Ed,
 *  2026-10-05): outside its area, and still outside it that far back toward its home. */
function pastEdge(w: CombatWorld, c: Creature, x: number, z: number): boolean {
  if (w.inArea(c, x, z)) return false;
  const hx = c.anchorX - x, hz = c.anchorZ - z, hd = Math.hypot(hx, hz) || 1, L = Math.min(hd, w.t.combat.leaveArea * FIGHT.scale);
  return !w.inArea(c, x + (hx / hd) * L, z + (hz / hd) * L);
}

/** The creature she's inviting (Ed, 2026-10-04): her party leaves it be while they chat. */
const inviting = (w: CombatWorld, c: Creature, o: Creature) => !huntsWitch(sideOf(c)) && w.talkingTo(o.id) >= 0;

function valid(w: CombatWorld, s: CombatState, c: Creature, tg: Target): boolean {
  if (tg.kind === "creature") {
    const o = w.creatures[tg.id];
    return !!o && targetable(o) && foes(sideOf(o), sideOf(c)) && !truce(c, o) && !w.asleep(o) && !inviting(w, c, o);
  }
  if (tg.kind === "witch") {
    // A wild one loses her when she rises, or (Ed, 2026-10-05: "wild creatures shouldn't pursue you
    // very far outside of their area") once she's combat.leaveArea metres past its area's edge;
    // then it turns back and walks home. A besieger keeps the old rule: out of its area, out of its
    // attack range and at least combat.witchLose away. (Only wild ones go for her at all.)
    const v = w.witches[tg.id];
    if (!huntsWitch(sideOf(c)) || !v || !v.onGround || v.down || w.talkingTo(c.id) === tg.id) return false;
    if (!c.siege) return !pastEdge(w, c, v.x, v.z);
    const d = Math.hypot(v.x - c.x, v.z - c.z), range = attackOf(c.species, c.level)?.attack.range ?? 0;
    return !(d > range && d >= w.t.combat.witchLose * FIGHT.scale && !w.inArea(c, v.x, v.z));
  }
  return !c.leashed && (s.sounds.get(tg.key)?.hp ?? 0) > 0;
}

/** What a creature goes for: the nearest enemy within `range` of (x, z), of the other side and
 *  another kind, never a baby. A wild one goes for a witch on the ground once she's within its
 *  attack range or she's on the ground in its area (Ed's playtest, 2026-10-04). A party animal following her takes on only
 *  what attacks her or her party (Ed: they engage anything that attacks the witch or them); a
 *  parked one, anything within guard.radius of its sigil. */
function acquire(w: CombatWorld, c: Creature, x: number, z: number, range: number, attackRange: number, grid: Grid, guarding: boolean, keep?: (o: Creature) => boolean): Target | null {
  // (an enraged one goes for a happy legend within legends.attack.wornReach: it wears it down)
  const legReach = sideOf(c) === "enraged" ? LEGENDS.attack.wornReach * FIGHT.scale : 0;
  let best: Target | null = null, bd = Math.max(range, legReach);
  for (const o of grid.near(x, z, Math.max(range, legReach))) {
    if (o === c || !targetable(o) || !foes(sideOf(o), sideOf(c)) || truce(c, o) || w.asleep(o) || inviting(w, c, o) || (keep && !keep(o))) continue;
    if (Math.hypot(o.x - x, o.z - z) > range && !(o.boss && o.legendState === "happy")) continue;
    if (c.leashed && !guarding) {
      const tg = o.fight?.target;
      if (!tg || (tg.kind !== "witch" && !(tg.kind === "creature" && w.creatures[tg.id]?.leashed))) continue;
    }
    const d = Math.hypot(o.x - x, o.z - z);
    if (d < bd) { bd = d; best = { kind: "creature", id: o.id }; }
  }
  if (huntsWitch(sideOf(c))) for (const v of w.witches) {
    if (!v.onGround || v.down || w.talkingTo(c.id) === v.id) continue; // (the one she's inviting holds its fire on her)
    const d = Math.hypot(v.x - c.x, v.z - c.z);
    if ((w.inArea(c, v.x, v.z) || (d < attackRange && (c.siege || !pastEdge(w, c, v.x, v.z)))) && (!best || d < bd)) { bd = d; best = { kind: "witch", id: v.id }; }
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
  if (from && inviting(w, from, o)) return; // (her party's shots and area hits pass the one she's inviting by)
  // Its traits against this kind of blow (Stage 5): shown as strong or resisted.
  const k = counterOf(o.species, a.delivery, D), gd = guardOf(o, a.delivery, time), mult = k.damage * gd.damage;
  o.hp = (o.hp ?? creatureMaxHp(o)) - damage * mult;
  o.hurtAt = time;
  s.events.push({ kind: "hit", x: o.x, z: o.z, at: time, id: o.id, big: from?.level === LEGEND, counter: mult > 1 ? 1 : mult < 1 ? -1 : 0 });
  if (gd.damage < 1 && !o.charge?.curl) s.events.push({ kind: "blocked", x: o.x, z: o.z, at: time, id: o.id });
  if (a.modifier === "knockback" && a.knockback && k.knockback > 0 && !gd.rooted) {
    const dx = o.x - fx, dz = o.z - fz, d = Math.hypot(dx, dz) || 1, kb = a.knockback * k.knockback;
    o.kx = (dx / d) * kb * 6; o.kz = (dz / d) * kb * 6; // eased off over a moment (stepKnock)
    if (k.stun > 0) { o.stunUntil = time + k.stun; if (o.fight) o.fight.windupUntil = 0; s.events.push({ kind: "stunned", x: o.x, z: o.z, at: time, id: o.id }); }
  }
  if (a.modifier === "slow") o.slowUntil = time + (a.slowTime ?? 2) * k.slow; // a new slow renews, never stacks
  // It turns on whoever hit it, if it isn't busy with another.
  if (from && o.fight && !o.fight.target) o.fight.target = { kind: "creature", id: from.id };
  if (o.hp <= 0 && o.boss && !o.leashed) {
    // An area legend beaten (Ed, 2026-10-04): it sinks back into the ground where it stands,
    // asleep for good; its area's soundsystem is safe from it.
    lull(o, time); // (#87: worn down, angry or happy, it goes back to sleep; a buff she has from it is kept)
    s.events.push({ kind: "slept", x: o.x, z: o.z, at: time, id: o.id });
    return;
  }
  if (o.hp <= 0 && stateOf(o) === "wild" && !o.dazed) {
    // Knocked down while wild (Ed, 2026-10-05, #87): dazed a while (nothing attacks it, and she
    // can still invite it), then it runs off (stepCombat).
    o.dazed = true; o.dazedUntil = time + STATES.daze; o.fight = undefined; o.moving = false; o.vx = 0; o.vz = 0;
    s.events.push({ kind: "dazed", x: o.x, z: o.z, at: time, id: o.id });
    return;
  }
  if (o.hp <= 0) {
    // Knocked down (Ed, 2026-10-04: "it's sad when animals die"; #87: "knocked down", "ran off"):
    // it runs off the map, visibly, and is gone for good. A party animal is lost for the run: off
    // its leash as it goes.
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
  D = data;
  FIGHT.scale = t.fight.scale; FIGHT.speed = t.fight.speed; FIGHT.momentum = t.fight.momentum ?? 1;
  // Shots fly; each hits the first enemy (not its own kind) it reaches, or fizzles at its range.
  const grid = new Grid(w.active.filter(c => fighting(c)));
  s.shots = s.shots.filter(sh => {
    // A lob flies over everything and lands where it was aimed, hitting all of the other side there.
    if (sh.lob) {
      const L = sh.lob, k = Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at));
      sh.x = L.fx + (L.tx - L.fx) * k; sh.z = L.fz + (L.tz - L.fz) * k;
      if (time < L.lands) return true;
      const from = w.creatures[sh.from] ?? null, a = attackNamed(sh.attack, data);
      s.events.push({ kind: "landed", x: L.tx, z: L.tz, at: time, id: sh.from });
      area(w, s, from, sh.side, sh.species, L.tx, L.tz, sh.radius, sh.damage, a, grid);
      return false;
    }
    sh.x += sh.vx * dt; sh.z += sh.vz * dt;
    if (time >= sh.until) return false;
    const from = w.creatures[sh.from], a = attackNamed(sh.attack, data);
    for (const o of grid.near(sh.x, sh.z, sh.radius + 2)) {
      if (!targetable(o) || !foes(sideOf(o), sh.side) || o.species === sh.species || w.asleep(o)) continue;
      if (Math.hypot(o.x - sh.x, o.z - sh.z) <= sh.radius + 0.4 + o.level * 0.2) { land(w, s, from ?? null, { kind: "creature", id: o.id }, sh.damage, a, sh.x - sh.vx, sh.z - sh.vz); return false; }
    }
    if (huntsWitch(sh.side)) for (const v of w.witches) {
      if (!v.onGround || v.down) continue;
      if (Math.hypot(v.x - sh.x, v.z - sh.z) <= sh.radius + 0.3) { land(w, s, from ?? null, { kind: "witch", id: v.id }, sh.damage, a, sh.x, sh.z); return false; }
    }
    if (sh.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - sh.x, h.z - sh.z) <= h.radius + sh.radius) { land(w, s, from ?? null, { kind: "sound", key }, sh.damage, a, sh.x, sh.z); return false; }
    return true;
  });

  // Beams burn along their line in ticks, sweeping after their target.
  s.beams = s.beams.filter(b => {
    const c = w.creatures[b.from];
    if (!c || c.gone || c.fleeUntil || time >= b.until) return false;
    if (b.spin) {
      // A legend's spin: the beam goes all the way round; whatever it sweeps over is hit, once a pass.
      const prev = b.angle, a = attackNamed(b.attack, data), turn = b.spin * dt, last = (b.last ??= {}), again = (Math.PI * 2 / b.spin) * 0.8;
      b.angle += turn;
      const swept = (x: number, z: number, r: number) => { const rx = x - c.x, rz = z - c.z, dd = Math.hypot(rx, rz); if (dd > b.length + r || dd < 0.3) return false; const da = (((Math.atan2(rz, rx) - prev) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); return da <= turn + (b.width / 2 + r) / dd; };
      const once = (key: string) => { if (last[key] !== undefined && time - last[key] < again) return false; last[key] = time; return true; };
      for (const o of grid.near(c.x, c.z, b.length + 2)) if (o !== c && targetable(o) && foes(sideOf(o), b.side) && o.species !== b.species && !w.asleep(o) && swept(o.x, o.z, 0.4 + o.level * 0.2) && once(`c${o.id}`)) land(w, s, c, { kind: "creature", id: o.id }, b.damage, a, c.x, c.z);
      if (huntsWitch(b.side)) {
        for (const v of w.witches) if (v.onGround && !v.down && swept(v.x, v.z, 0.3) && once(`w${v.id}`)) land(w, s, c, { kind: "witch", id: v.id }, b.damage, a, c.x, c.z);
        if (b.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && swept(h.x, h.z, h.radius) && once(`s${key}`)) land(w, s, c, { kind: "sound", key }, b.damage, a, c.x, c.z);
      }
      return true;
    }
    const p = targetPos(w, s, b.target);
    if (p) {
      const want = Math.atan2(p.z - c.z, p.x - c.x);
      let da = ((want - b.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      const step = ((attackNamed(b.attack, data).sweep ?? 0) * Math.PI / 180) * dt;
      da = Math.max(-step, Math.min(step, da));
      b.angle += da;
    }
    if (time >= b.nextTick) {
      b.nextTick += b.tick;
      const ex = Math.cos(b.angle), ez = Math.sin(b.angle), a = attackNamed(b.attack, data);
      const hit = (x: number, z: number, r: number) => { const rx = x - c.x, rz = z - c.z, along = rx * ex + rz * ez; return along >= 0 && along <= b.length && Math.abs(-rx * ez + rz * ex) <= b.width / 2 + r; };
      for (const o of grid.near(c.x + ex * b.length / 2, c.z + ez * b.length / 2, b.length / 2 + 2)) if (o !== c && targetable(o) && foes(sideOf(o), b.side) && o.species !== b.species && !w.asleep(o) && hit(o.x, o.z, 0.4 + o.level * 0.2)) land(w, s, c, { kind: "creature", id: o.id }, b.damage, a, c.x, c.z);
      if (huntsWitch(b.side)) {
        for (const v of w.witches) if (v.onGround && !v.down && hit(v.x, v.z, 0.3)) land(w, s, c, { kind: "witch", id: v.id }, b.damage, a, c.x, c.z);
        if (b.side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && hit(h.x, h.z, h.radius)) land(w, s, c, { kind: "sound", key }, b.damage, a, c.x, c.z);
      }
    }
    return true;
  });

  // Slime (a snail's trail) dries; anything of the other side on it is slowed.
  if (s.trails.length) {
    s.trails = s.trails.filter(tr => time < tr.until);
    for (const tr of s.trails) {
      for (const o of grid.near(tr.x, tr.z, tr.r + 1)) if (foes(sideOf(o), tr.side) && o.species !== "snail" && Math.hypot(o.x - tr.x, o.z - tr.z) <= tr.r) o.slowUntil = Math.max(o.slowUntil ?? 0, time + 0.25);
      if (huntsWitch(tr.side)) for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - tr.x, v.z - tr.z) <= tr.r) w.slowWitch?.(v.id, time + 0.25, tr.slow);
    }
  }
  // Her party (for angry besiegers looking for the nearest of it or a soundsystem).
  const partyList = w.active.filter(o => foes("enraged", sideOf(o)) && targetable(o) && !w.asleep(o)); // (what besiegers go for: the leashed and the happy)
  // Packs (Stage 5): creatures of a kind going for the same target, and their tactic.
  const packs = packsOf(w.active.filter(c => c.fight?.target && fighting(c)).map(c => ({ c, target: JSON.stringify(c.fight!.target) })), time);

  for (const c of w.active) {
    stepKnock(c, dt);
    if (c.gone) continue;
    if (c.dazed) {
      // Dazed: it lies still till its daze is over (invited meanwhile, it's whole and happy: states.befriend), then runs off.
      if (stateOf(c) !== "wild") { c.dazed = false; c.dazedUntil = undefined; }
      else if (time >= (c.dazedUntil ?? 0)) { c.dazed = false; c.dazedUntil = undefined; const out = w.exit(c.x, c.z); c.fleeUntil = Infinity; c.fleeX = out.x; c.fleeZ = out.z; c.fight = undefined; c.siege = undefined; s.events.push({ kind: "fled", x: c.x, z: c.z, at: time, id: c.id }); }
      else { c.moving = false; continue; }
    }
    // Beaten: it runs for the map's edge, and is gone once it's off the map or out of every witch's sight.
    if (c.fleeUntil) {
      const ax = (c.fleeX ?? c.x) - c.x, az = (c.fleeZ ?? c.z) - c.z, d = Math.hypot(ax, az);
      if (d < 1 || w.unseen(c.x, c.z)) { c.gone = true; continue; }
      c.x += (ax / d) * c.speed * C.fleeMult * dt; c.z += (az / d) * c.speed * C.fleeMult * dt;
      c.facing = ax > 0 ? 1 : -1; c.away = az < -Math.abs(ax);
      c.moving = true; c.walk += dt * 8;
      continue;
    }
    // An angry or happy legend (#87): it stands in its area and shoots from afar (stepLegendAttack).
    if (c.boss && !c.leashed && (c.legendState === "angry" || c.legendState === "happy") && fighting(c)) { stepLegendAttack(w, s, c, data, grid); continue; }
    if (!fighting(c) || w.asleep(c) || (c.leashed && w.busy(c.id))) { c.fight = undefined; continue; }
    // Stunned (an armoured one knocked over): it does nothing for a moment.
    if (c.stunUntil !== undefined && time < c.stunUntil) { c.moving = false; c.vx = 0; c.vz = 0; continue; }
    const atk = attackOf(c.species, c.level, data);
    if (!atk) { c.fight = undefined; continue; } // babies don't attack
    const f = (c.fight ??= { target: null, readyAt: time + atk.attack.cooldown * 0.5 * (c.rand() + 0.5), windupUntil: 0, aimX: 0, aimZ: 0 });
    // A happy area legend guards its area like a parked party animal with a far bigger reach, round its home (Ed, 2026-10-04).
    const happy = !c.leashed && (c.legendState === "happy" || !!c.guard || c.state === "happy"); // (and a friendly area's guards, once partified: rules/quest.ts; and every happy creature, #87: it defends its own area)
    // (a guard looks round where it stands, for anything in its own area: area-wide, as it roams it)
    const lp = c.leashed ? w.leashPoint(c.id) : happy ? { x: c.x, z: c.z } : null, guarding = (!!lp && w.parked(c.id)) || happy;
    // Party animals fight only near their leash point (a parked one within guard.radius of its
    // sigil); wild ones within aggro of where they are.
    // (Ed's motion scale pass: party animals chase about 40 m from her or their sigil before giving up)
    const S = FIGHT.scale, reachX = lp ? lp.x : c.x, reachZ = lp ? lp.z : c.z, reach = (lp ? (happy ? t.wildLegends.guard : guarding ? t.guard.radius : C.pursuit) : C.aggro) * S;
    if (f.target && !valid(w, s, c, f.target)) f.target = null;
    const had = !!f.target;
    if (f.target && lp) { const p = targetPos(w, s, f.target); if (!p || Math.hypot(p.x - lp.x, p.z - lp.z) > reach + atk.attack.range || (happy && !w.inArea(c, p.x, p.z))) f.target = null; }
    if (!f.target || f.windupUntil === 0) {
      const near = acquire(w, c, reachX, reachZ, reach, atk.attack.range, grid, guarding, happy ? o => w.inArea(c, o.x, o.z) : undefined);
      if (near) f.target = near;
      else if (!f.target && c.siege && !c.leashed) {
        // An angry area's creatures (its quest undone, Ed 2026-10-04) go for the nearest party animal or
        // soundsystem; a legend keeps to its own area's soundsystem.
        f.target = { kind: "sound", key: c.siege };
        if (!c.boss) {
          const sk = nearestSound(s, c.x, c.z), sh = sk ? s.sounds.get(sk)! : null, sd = sh ? Math.hypot(sh.x - c.x, sh.z - c.z) : Infinity;
          let best: Creature | null = null, bd = sd;
          for (const o of partyList) { const dd = Math.hypot(o.x - c.x, o.z - c.z); if (dd < bd && !truce(c, o)) { bd = dd; best = o; } }
          f.target = best ? { kind: "creature", id: best.id } : sk ? { kind: "sound", key: sk } : f.target;
        }
      }
    }
    if (f.target && !had) f.seenAt = time; // (it reacts in a moment: combat.reaction)
    if (!f.target) {
      if (f.windupUntil) f.windupUntil = 0;
      f.lunge = undefined;
      c.sprung = undefined; // (an ambusher lies in wait again)
      if (c.burrow) c.burrow = undefined; // (a burrower comes up)
      if (c.leap) { c.x = c.leap.tx; c.z = c.leap.tz; c.leap = undefined; } // (a leaper comes down)
      c.dug = undefined; c.brace = undefined; // (a digger comes up, a blocker lowers its tail)
      continue;
    }
    const p = targetPos(w, s, f.target);
    if (!p) { f.target = null; f.windupUntil = 0; continue; } // (it fell this very step)
    const d = Math.hypot(p.x - c.x, p.z - c.z), A = atk.attack, K = data.kite, kites = A.delivery === "shot" && K.species.includes(c.species);
    const want = A.delivery === "shot" || A.delivery === "lob" || A.delivery === "beam" ? A.range * (kites ? K.far : 0.8) : A.delivery === "pulse" ? Math.max(0.8, (A.radius ?? 2) * 0.6) : A.range + p.r + (A.lunge ?? 0) * 0.85 - 0.3;
    // Its lunge under way: a dash-strike down the line it wound up on; at its end the blow lands, if it's still there.
    if (f.lunge) {
      // (At a creature it homes in: creatures can't read a telegraph; but not at a flier, which flits up out of its way.
      // At the witch it keeps its line, so she can sidestep it.)
      // (with momentum, Ed 2026-10-05: it builds up to 60 m/s and eases out at the end, carrying some speed on)
      const L = f.lunge, a = (300 * FIGHT.speed) / FIGHT.momentum, top = 60 * FIGHT.speed, v0 = L.v ?? 0;
      const v = Math.min(top, v0 + a * dt, Math.sqrt(Math.max(0, 2 * a * L.left + (12 * FIGHT.speed) ** 2))), step = Math.min(L.left, v * dt);
      L.v = v;
      if (f.target.kind === "creature" && !traitsOf(w.creatures[f.target.id]?.species ?? "", data).includes("flier")) { const hx = p.x - c.x, hz = p.z - c.z, hd = Math.hypot(hx, hz); if (hd > 1e-3) { L.dx = hx / hd; L.dz = hz / hd; L.left = Math.min(L.left, Math.max(0, hd - A.range * 0.5)); } }
      c.x += L.dx * step; c.z += L.dz * step; L.left -= step; c.moving = true; c.walk += dt * 12; c.facing = L.dx >= 0 ? 1 : -1;
      c.vx = L.dx * v; c.vz = L.dz * v;
      if (L.left <= 1e-6) { f.lunge = undefined; if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r) land(w, s, c, f.target, atk.damage, A, c.x, c.z); }
      continue;
    }
    // Just noticed: it turns to look a moment before it goes (combat.reaction).
    if (f.windupUntil === 0 && time - (f.seenAt ?? -1e9) < C.reaction) { c.moving = false; c.facing = p.x >= c.x ? 1 : -1; continue; }
    // Its speed in a fight (Ed's motion scale pass: about the witch's): its profile's, else combat.fightRun; slowed, or a legend's.
    // Closing in from afar (Ed: "the creatures in it should be onto me in a few seconds"), it sprints at combat.pursuitRun.
    const slow = c.slowUntil && time < c.slowUntil ? A.slowMult ?? 0.5 : 1, own = c.level === LEGEND ? C.legendRun : profileOf(c.species)?.speed ?? C.fightRun;
    const speed = (c.level !== LEGEND && d > 30 * S ? Math.max(own, profileOf(c.species)?.pursuit ?? C.pursuitRun) : own) * FIGHT.speed * slow;
    // A wild legend fights by its move set (Stage 5): long, telegraphed moves in a pattern, and a second phase.
    if (c.level === LEGEND && !c.leashed && !(f.target.kind === "sound" && d > 40 * S)) { stepLegend(w, s, c, f, p, d, legendSetOf(c.species), data, grid); continue; }
    const P = profileOf(c.species), marching = (f.target.kind === "sound" || (!!c.siege && !c.leashed)) && d > 40 * S; // (a besieger far off marches)
    if (f.windupUntil === 0 && P && !marching) {
      // A movement profile (Stage 5): its signature move, then its behaviours and its pack's tactic.
      const run = speed;
      if (P.move?.kind === "charge") {
        const was = c.charge, r = stepCharge(c, P.move, p.x, p.z, A.range + p.r + 0.3, time, dt, run);
        // A pair (the stags): its pack mates whose charge is ready set off with it, side by side.
        if (P.move.pair && !was && c.charge) for (const m of packs.get(c.id)?.members ?? []) if (m !== c && !m.charge && time >= (m.moveReadyAt ?? 0) && m.fight?.windupUntil === 0 && !m.fight.lunge) startCharge(m, P.move, p.x, p.z, time);
        if (r === "hit") { land(w, s, c, f.target, atk.damage, { ...A, modifier: "knockback", knockback: 15 * S }, c.x, c.z); f.readyAt = time + A.cooldown; s.events.push({ kind: "charged", x: c.x, z: c.z, at: time, id: c.id }); continue; }
        if (r === "charging") continue;
      }
      if (P.move?.kind === "burrow") {
        // The mole: under the ground (untouchable, a moving mound) to its target, then up, striking at once.
        const r = stepBurrow(c, P.move, p.x, p.z, run, time, dt);
        if (r === "burrowed") s.events.push({ kind: "burrowed", x: c.x, z: c.z, at: time, id: c.id });
        if (r === "under" || r === "burrowed") continue;
        if (r === "surfaced") {
          s.events.push({ kind: "surfaced", x: c.x, z: c.z, at: time, id: c.id });
          if (time >= f.readyAt) { f.windupUntil = time + Math.min(A.windup, 0.35); f.aimX = p.x; f.aimZ = p.z; s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id }); }
          continue;
        }
      }
      if (P.move?.kind === "leap") {
        // The toad: a leap in an arc at its target (a ring shows where it'll land), slamming down: its attack.
        const r = stepLeap(c, P.move, p.x, p.z, time >= f.readyAt, time);
        if (r === "leapt") s.events.push({ kind: "leapt", x: c.x, z: c.z, at: time, id: c.id });
        if (r === "landed") {
          f.readyAt = time + A.cooldown;
          s.events.push({ kind: "slammed", x: c.x, z: c.z, at: time, id: c.id });
          // A pounce (the lynx) lands its blow on its target, if it's still there; a slam (the toad) hits all round.
          if (P.move.strike) { if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r + 1 * S) land(w, s, c, f.target, atk.damage, A, c.x, c.z); }
          else area(w, s, c, sideOf(c), c.species, c.x, c.z, A.radius ?? 2.4, atk.damage, A, grid);
          continue;
        }
        if (r !== "none") continue;
      }
      if (P.move?.kind === "ambush" && !c.leashed) {
        if (c.sprung === undefined) {
          if (d > (P.move.trigger ?? 20) * S) { c.moving = false; c.vx = 0; c.vz = 0; c.facing = p.x >= c.x ? 1 : -1; continue; }
          c.sprung = time; s.events.push({ kind: "sprung", x: c.x, z: c.z, at: time, id: c.id });
          if (P.move.strike) f.readyAt = Math.min(f.readyAt, time); // (the snake: it strikes as it springs)
        }
      }
      if (P.move?.kind === "dig") {
        // The badger digs in when its target comes close: rooted, taking armour times the damage, biting
        // without a lunge at whatever's in reach; then it comes up and the move cools down.
        if (c.dug !== undefined && time < c.dug) {
          c.vx = 0; c.vz = 0; c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
          if (time >= f.readyAt && d <= A.range + p.r + 1.5 * S) { f.windupUntil = time + A.windup * 0.7; f.aimX = p.x; f.aimZ = p.z; s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id }); }
          continue;
        }
        if (c.dug !== undefined) { c.dug = undefined; c.moveReadyAt = time + P.move.cooldown; }
        else if (time >= (c.moveReadyAt ?? 0) && d <= (P.move.trigger ?? 6) * S) { c.dug = time + (P.move.time ?? 3); s.events.push({ kind: "dug", x: c.x, z: c.z, at: time, id: c.id }); continue; }
      }
      if (P.move?.kind === "block") {
        // The beaver braces behind its tail when a shot's coming at it or its target winds up: rooted,
        // shots all but stopped, blows halved; then it slaps back at once.
        if (c.brace !== undefined && time < c.brace) { c.vx = 0; c.vz = 0; c.moving = false; c.facing = p.x >= c.x ? 1 : -1; continue; }
        if (c.brace !== undefined) { c.brace = undefined; c.moveReadyAt = time + P.move.cooldown; f.readyAt = Math.min(f.readyAt, time); }
        else if (time >= (c.moveReadyAt ?? 0)) {
          const R = (P.move.radius ?? 12) * S, side = sideOf(c);
          let threat = s.shots.some(sh => { if (!foes(sh.side, side) || sh.lob) return false; const rx = c.x - sh.x, rz = c.z - sh.z, sv = Math.hypot(sh.vx, sh.vz) || 1; return Math.hypot(rx, rz) < R && (rx * sh.vx + rz * sh.vz) / sv > 0 && Math.abs((rx * -sh.vz + rz * sh.vx) / sv) < 2 * S; });
          if (!threat && f.target.kind === "creature") { const o = w.creatures[f.target.id]; threat = !!o?.fight && o.fight.windupUntil > time && o.fight.target?.kind === "creature" && o.fight.target.id === c.id; }
          if (threat) { c.brace = time + (P.move.time ?? 1.2); s.events.push({ kind: "braced", x: c.x, z: c.z, at: time, id: c.id }); continue; }
        }
      }
      if (P.move?.kind === "trail" && c.moving && time >= (c.moveReadyAt ?? 0)) {
        // The snail leaves slime as it goes: a patch every `every` seconds, slowing the other side, drying after `time`.
        s.trails.push({ x: c.x, z: c.z, r: (P.move.radius ?? 2.5) * S, until: time + (P.move.time ?? 6), side: sideOf(c), slow: P.move.slow ?? 0.5, from: c.id });
        c.moveReadyAt = time + (P.move.every ?? 0.5);
      }
      if (P.move?.kind === "flash" && time >= (c.moveReadyAt ?? 0) && d <= (P.move.radius ?? 10) * S) {
        // The glow-worm's flash: a pulse of light dazzling the other side round it (slowed a moment).
        const R = (P.move.radius ?? 10) * S, until = time + (P.move.time ?? 1.5), side = sideOf(c);
        for (const o of grid.near(c.x, c.z, R)) if (o !== c && targetable(o) && foes(sideOf(o), side) && !truce(c, o) && Math.hypot(o.x - c.x, o.z - c.z) <= R) o.slowUntil = Math.max(o.slowUntil ?? 0, until);
        if (huntsWitch(side)) for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - c.x, v.z - c.z) <= R) w.slowWitch?.(v.id, until, P.move.slow ?? 0.6);
        s.events.push({ kind: "flash", x: c.x, z: c.z, at: time, id: c.id });
        c.moveReadyAt = time + P.move.cooldown;
      }
      const burst = c.sprung !== undefined && time - c.sprung < (P.move?.time ?? 0) ? P.move?.speed ?? 1 : 1;
      const heading = headingOf(w, f.target), lights = P.fight.some(b => b.kind === "light") ? lightsNear(w, s, c, 40 * S) : undefined;
      const may = steer(c, P, { px: p.x, pz: p.z, pr: p.r, want, range: A.range, speed: run * burst, time, dt, pack: packs.get(c.id) ?? null, neighbours: [...grid.near(c.x, c.z, 12 * S)], threats: s.shots, side: sideOf(c), ready: time >= f.readyAt, beat: 60 / t.beat.bpm, heading, lights });
      if (may && time >= f.readyAt) {
        f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z; // (it glides to a stop as it winds up: below)
        s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
      }
      continue;
    }
    if (f.windupUntil === 0) {
      if (d > want) { moveToward(c, p.x, p.z, want, marching ? c.speed * C.marchMult : speed, dt); continue; }
      // A kiter backs off when its target comes too close, keeping its distance while it shoots.
      if (kites && d < A.range * K.near && d > 0.01) { c.x -= ((p.x - c.x) / d) * speed * dt; c.z -= ((p.z - c.z) / d) * speed * dt; c.moving = true; c.walk += dt * 6; c.facing = p.x >= c.x ? 1 : -1; if (time < f.readyAt) continue; }
      c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
      if (time >= f.readyAt) {
        f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z;
        s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
      }
      continue;
    }
    // Winding up: it telegraphs (gliding to a stop, with momentum), then the blow lands, the shot flies, or the ground quakes.
    { const vx = c.vx ?? 0, vz = c.vz ?? 0, v = Math.hypot(vx, vz);
      if (v > 0.05) { const nv = Math.max(0, v - ((40 * FIGHT.speed) / FIGHT.momentum) * dt); c.vx = (vx / v) * nv; c.vz = (vz / v) * nv; c.x += c.vx * dt; c.z += c.vz * dt; } else { c.vx = 0; c.vz = 0; }
      c.moving = v > 1; }
    if (time < f.windupUntil) continue;
    f.windupUntil = 0; f.readyAt = time + A.cooldown;
    const dmg = atk.damage;
    if (A.delivery === "melee") {
      // The lunge (Ed's motion scale pass: 12 to 16 m, a dash-strike): down the line to where it aimed
      // when it wound up, so stepping aside dodges it; the blow lands at its end (above).
      const ax = f.aimX - c.x, az = f.aimZ - c.z, ad = Math.hypot(ax, az), L = c.dug !== undefined && time < c.dug ? 0 : Math.min(A.lunge ?? 0, Math.max(0, ad - A.range * 0.5)); // (dug in: no lunge)
      if (ad > 0.01 && L > 0.05) f.lunge = { dx: ax / ad, dz: az / ad, left: L, v: Math.hypot(c.vx ?? 0, c.vz ?? 0) };
      else if (Math.hypot(p.x - c.x, p.z - c.z) <= A.range + p.r) land(w, s, c, f.target, dmg, A, c.x, c.z);
    }
    else if (A.delivery === "shot") {
      const ax = f.aimX - c.x, az = f.aimZ - c.z, ad = Math.hypot(ax, az) || 1, v = A.speed ?? 9;
      s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: (ax / ad) * v, vz: (az / ad) * v, until: time + (A.range * 1.3) / v, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 0.6, attack: atk.name });
      s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
    } else if (A.delivery === "lob") {
      const fl = A.flight ?? 1.2;
      s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: 0, vz: 0, until: time + fl + 1, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 1.8, attack: atk.name, lob: { fx: c.x, fz: c.z, tx: f.aimX, tz: f.aimZ, at: time, lands: time + fl } });
      s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
    } else if (A.delivery === "beam") {
      const dur = A.duration ?? 0.8, tick = A.tick ?? 0.2, ticks = Math.max(1, Math.round(dur / tick));
      s.beams.push({ id: s.nextShot++, from: c.id, angle: Math.atan2(f.aimZ - c.z, f.aimX - c.x), length: A.range, width: A.width ?? 1, until: time + dur, nextTick: time, tick, damage: dmg / ticks, side: sideOf(c), species: c.species, attack: atk.name, target: f.target });
      s.events.push({ kind: "beam", x: c.x, z: c.z, at: time, id: c.id });
    } else {
      // The quake (a legend's), or a pulse (Stage 5: a bat's screech, a mole's upheaval): everything
      // of the other side round it, and the witch if she's on the ground in it.
      const R = A.radius ?? 5;
      s.events.push(A.delivery === "pulse" ? { kind: "pulse", x: c.x, z: c.z, at: time, id: c.id } : { kind: "quake", x: c.x, z: c.z, at: time, id: c.id, big: true });
      for (const o of grid.near(c.x, c.z, R)) if (o !== c && targetable(o) && foes(sideOf(o), sideOf(c)) && !truce(c, o) && Math.hypot(o.x - c.x, o.z - c.z) <= R) land(w, s, c, { kind: "creature", id: o.id }, dmg, A, c.x, c.z);
      if (!c.leashed) {
        for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - c.x, v.z - c.z) <= R) land(w, s, c, { kind: "witch", id: v.id }, dmg, A, c.x, c.z);
        for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - c.x, h.z - c.z) <= R + h.radius) land(w, s, c, { kind: "sound", key }, dmg, A, c.x, c.z);
      }
    }
  }
}

/** An angry or happy legend's turn (Ed, 2026-10-05; #87; config/legends.json attack): it never
 *  leaves its area (it stands where it lay), but reaches attack.range metres. Every interval seconds it
 *  picks the nearest it may shoot (angry: the witch on the ground and her posse, never soundsystems or
 *  happy creatures; happy: the enraged), winds up for windup seconds, then lobs (a bomb landing after
 *  lobFlight seconds) or beams (by its species), each hit attack.damage times its level's power for
 *  interval seconds. (Its shots are the wild's when angry, the happy's when happy: foes() does the rest.) */
function stepLegendAttack(w: CombatWorld, s: CombatState, c: Creature, _data: CombatData, grid: Grid): void {
  const A = LEGENDS.attack, time = w.time, S = FIGHT.scale, R = A.range * S, angry = c.legendState === "angry", side: State = angry ? "wild" : "happy";
  const f = (c.fight ??= { target: null, readyAt: time + A.interval * 0.5, windupUntil: 0, aimX: 0, aimZ: 0 });
  c.moving = false; c.vx = 0; c.vz = 0; // (it stands where it lay, in its area)
  if (f.windupUntil > 0) {
    if (time < f.windupUntil) return;
    f.windupUntil = 0; f.readyAt = time + A.interval;
    const beam = A.beam.includes(c.species);
    for (const a of c.aims ?? []) {
      if (beam) {
        const ticks = Math.max(1, Math.round(A.beamTime / 0.25));
        s.beams.push({ id: s.nextShot++, from: c.id, angle: Math.atan2(a.z - c.z, a.x - c.x), length: R, width: A.beamWidth * S, until: time + A.beamTime, nextTick: time, tick: 0.25, damage: A.damage / ticks, side, species: c.species, attack: "legendBeam", target: a.target });
      } else s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: 0, vz: 0, until: time + A.lobFlight + 1, from: c.id, side, species: c.species, damage: A.damage, radius: A.lobRadius * S, attack: "legendLob", lob: { fx: c.x, fz: c.z, tx: a.x, tz: a.z, at: time, lands: time + A.lobFlight } });
    }
    if (c.aims?.length) s.events.push({ kind: beam ? "beam" : "shot", x: c.x, z: c.z, at: time, id: c.id });
    c.aims = undefined;
    return;
  }
  if (time < f.readyAt) return;
  // The nearest it may shoot, up to attack.targets of them.
  const found: { d: number; x: number; z: number; target: Target }[] = [];
  if (angry) for (const v of w.witches) { if (!v.onGround || v.down) continue; const d = Math.hypot(v.x - c.x, v.z - c.z); if (d <= R) found.push({ d, x: v.x, z: v.z, target: { kind: "witch", id: v.id } }); }
  for (const o of grid.near(c.x, c.z, R)) {
    if (o === c || !targetable(o) || truce(c, o) || w.asleep(o)) continue;
    const st = stateOf(o);
    if (angry ? st !== "leashed" : st !== "enraged") continue;
    const d = Math.hypot(o.x - c.x, o.z - c.z);
    if (d <= R) found.push({ d, x: o.x, z: o.z, target: { kind: "creature", id: o.id } });
  }
  if (!found.length) { f.target = null; return; }
  found.sort((a, b) => a.d - b.d);
  c.aims = found.slice(0, A.targets).map(({ x, z, target }) => ({ x, z, target }));
  f.target = c.aims[0].target; f.aimX = c.aims[0].x; f.aimZ = c.aims[0].z; f.windupUntil = time + A.windup;
  c.facing = f.aimX >= c.x ? 1 : -1;
  s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
}

/** A wild legend's turn (Stage 5): it works through its pattern of big moves, approaching each one's
 *  reach and winding it up long and visibly (the view telegraphs each), and roars into its second
 *  phase at phase2.at of its health: a faster pattern with more in it. */
function stepLegend(w: CombatWorld, s: CombatState, c: Creature, f: Fight, p: { x: number; z: number; r: number }, d: number, L: LegendSet, data: CombatData, grid: Grid): void {
  const { time, dt } = w, C = w.t.combat, st = (c.legend ??= { step: 0, phase: 1 }), max = maxHp(c.level, data);
  // An area legend guards its own area (Ed, 2026-10-04): nothing beyond it (an arena's has none).
  if (c.boss && !c.charge && !w.inArea(c, p.x, p.z)) { f.target = null; f.windupUntil = 0; f.move = undefined; return; }
  if (st.phase === 1 && (c.hp ?? max) <= max * L.phase2.at) {
    // The phase change: a roar (a burst and the screen shaking), and it starts its second pattern.
    st.phase = 2; st.step = 0; f.windupUntil = 0; f.move = undefined; c.charge = undefined; f.readyAt = time + 1.2; c.moving = false;
    s.events.push({ kind: "phase", x: c.x, z: c.z, at: time, id: c.id, big: true });
    return;
  }
  const two = st.phase === 2, pat = two ? L.phase2.pattern : L.pattern, name = pat[st.step % pat.length], A = attackNamed(name, data);
  if (!A) { st.step++; return; }
  const fast = two ? L.phase2.speed : 1, cool = two ? L.phase2.cooldown : 1, dmg = data.levels.dps[LEGEND] * A.cooldown * (A.factor ?? 1);
  // Charging: a straight run, trampling everything of the other side it meets, once each.
  if (c.charge) {
    const ch = c.charge, hit = (ch.hit ??= []);
    if (time < ch.until) {
      c.x += ch.dx * ch.speed * dt; c.z += ch.dz * ch.speed * dt; c.moving = true; c.walk += dt * 8; c.facing = ch.dx >= 0 ? 1 : -1;
      for (const o of grid.near(c.x, c.z, A.range + 2)) if (o !== c && targetable(o) && foes(sideOf(o), sideOf(c)) && !truce(c, o) && !hit.includes(o.id) && Math.hypot(o.x - c.x, o.z - c.z) <= A.range + 0.4 + o.level * 0.2) { hit.push(o.id); land(w, s, c, { kind: "creature", id: o.id }, dmg, A, c.x, c.z); }
      for (const v of w.witches) if (v.onGround && !v.down && !hit.includes(-1 - v.id) && Math.hypot(v.x - c.x, v.z - c.z) <= A.range + 0.3) { hit.push(-1 - v.id); land(w, s, c, { kind: "witch", id: v.id }, dmg, A, c.x, c.z); }
      return;
    }
    c.charge = undefined; c.moving = false;
    return;
  }
  if (f.windupUntil > 0) {
    c.moving = false;
    if (time < f.windupUntil) return;
    f.windupUntil = 0; f.move = undefined; f.readyAt = time + A.cooldown * cool; st.step++;
    const aim = Math.atan2(f.aimZ - c.z, f.aimX - c.x);
    if (A.delivery === "quake") {
      s.events.push({ kind: "quake", x: c.x, z: c.z, at: time, id: c.id, big: true });
      area(w, s, c, sideOf(c), c.species, c.x, c.z, A.radius ?? 5, dmg, A, grid);
    } else if (A.delivery === "shot") {
      // The nova: a ring of shots outward, one straight at where it aimed.
      const n = A.shots ?? 8, v = A.speed ?? 8;
      for (let i = 0; i < n; i++) { const a = aim + (i / n) * Math.PI * 2; s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: Math.cos(a) * v, vz: Math.sin(a) * v, until: time + A.range / v, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: A.radius ?? 0.8, attack: name }); }
      s.events.push({ kind: "nova", x: c.x, z: c.z, at: time, id: c.id });
    } else if (A.delivery === "beam") {
      const dur = A.duration ?? 2;
      s.beams.push({ id: s.nextShot++, from: c.id, angle: aim, length: A.range, width: A.width ?? 1.5, until: time + dur, nextTick: time, tick: A.tick ?? 0.2, damage: dmg, side: sideOf(c), species: c.species, attack: name, target: f.target!, spin: ((A.spin ?? 150) * Math.PI / 180) * fast });
      s.events.push({ kind: "beam", x: c.x, z: c.z, at: time, id: c.id });
    } else {
      const dx = f.aimX - c.x, dz = f.aimZ - c.z, dd = Math.hypot(dx, dz) || 1;
      c.charge = { dx: dx / dd, dz: dz / dd, speed: (A.speed ?? 8) * fast, until: time + (A.duration ?? 1.5), hit: [] };
      s.events.push({ kind: "rush", x: c.x, z: c.z, at: time, id: c.id });
    }
    return;
  }
  // To each move's reach, then wind it up (where it aims is fixed then: step out of it).
  const reach = A.delivery === "quake" ? (A.radius ?? 5) * 0.7 : A.delivery === "shot" ? A.range * 0.6 : A.delivery === "beam" ? A.range * 0.7 : 14;
  if (A.delivery === "melee" && d < 6 && !(time >= f.readyAt && d >= 4)) {
    // Too close to charge: it backs off first, heavily, to get a run at its target.
    if (d > 1e-3) { c.x -= ((p.x - c.x) / d) * C.legendRun * FIGHT.speed * 0.6 * dt; c.z -= ((p.z - c.z) / d) * C.legendRun * FIGHT.speed * 0.6 * dt; c.moving = true; c.walk += dt * 3; c.facing = p.x >= c.x ? 1 : -1; }
    return;
  }
  if (d > reach) { moveToward(c, p.x, p.z, reach * 0.9, C.legendRun * FIGHT.speed * fast, dt); return; }
  c.moving = false; c.facing = p.x >= c.x ? 1 : -1;
  if (time >= f.readyAt) {
    f.windupUntil = time + A.windup; f.aimX = p.x; f.aimZ = p.z; f.move = name;
    s.events.push({ kind: "windup", x: c.x, z: c.z, at: time, id: c.id });
  }
}

/** Everything of the other side (not its own kind, never babies) within `r` of (x, z) is hit: a lob landing. */
function area(w: CombatWorld, s: CombatState, from: Creature | null, side: State, species: string, x: number, z: number, r: number, damage: number, a: Attack, grid: Grid): void {
  for (const o of grid.near(x, z, r + 1)) if (targetable(o) && foes(sideOf(o), side) && o.species !== species && !w.asleep(o) && Math.hypot(o.x - x, o.z - z) <= r + 0.3 + o.level * 0.2) land(w, s, from, { kind: "creature", id: o.id }, damage, a, x, z);
  if (huntsWitch(side)) {
    for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - x, v.z - z) <= r + 0.3) land(w, s, from, { kind: "witch", id: v.id }, damage, a, x, z);
    if (side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - x, h.z - z) <= r + h.radius) land(w, s, from, { kind: "sound", key }, damage, a, x, z);
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
export function startSiege(s: CombatState, key: string, at: { x: number; z: number }, cell: Cell, creatures: Creature[], t: Tuning, besiege = true): void {
  s.sounds.set(key, { hp: t.combat.soundsystemHealth, max: t.combat.soundsystemHealth, x: at.x, z: at.z, radius: t.combat.soundsystemRadius });
  // Its wild creatures are enraged (#87: part-invited ones too, their meters lost; happy ones never) and besiege it.
  if (besiege) for (const c of creatures) if (!c.gone && !c.leashed && !c.wanderTo && !c.fleeUntil && !c.dazed && c.cell[0] === cell[0] && c.cell[1] === cell[1] && c.level > 0 && enrage(c)) c.siege = key;
}

/** After a soundsystem falls: the survivors march on to the next-nearest still standing. */
export function marchOn(s: CombatState, key: string, creatures: Creature[]): void {
  for (const c of creatures) if (c.siege === key && !c.gone) { c.siege = c.boss ? undefined : nearestSound(s, c.x, c.z) ?? undefined; if (c.fight) c.fight.target = null; } // (a legend stays to guard its area)
}
