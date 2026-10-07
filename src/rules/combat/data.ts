// Combat's data and shapes (split from rules/combat.ts, no change in behaviour): the attacks, levels and traits from
// config/combat.json, strength by species, and the types the fight is made of (targets, shots, beams, events, the world it reads).
import raw from "../../../config/combat.json";
import { LEGEND, type Creature, type Level } from "../creatures";
import { type State } from "../creatureStates";
import { FIGHT } from "../movement";
import { type Tuning } from "../tuning";

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
/** A species' traits. */
const TRAITS = new WeakMap<CombatData, Map<string, readonly Trait[]>>();
/** A species' traits, worked out once a data set (two new arrays a call were a fight frame's allocator: every hit, every hurt
 *  creature's marks); shared, so read-only. */
export function traitsOf(species: string, data: CombatData = COMBAT): readonly Trait[] {
  let by = TRAITS.get(data);
  if (!by) TRAITS.set(data, (by = new Map()));
  let tr = by.get(species);
  if (!tr) by.set(species, (tr = Object.freeze((Object.keys(data.traits) as Trait[]).filter(k => data.traits[k].includes(species)))));
  return tr;
}
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
  /** A legend's bombardment (legends.json attack.bombard): the soundsystem it was thrown at, and the damage it does that one if it lands on it. */
  sound?: { key: string; damage: number };
}

/** A beam burning (Stage 5): from its creature toward an angle, sweeping toward its target. */
export interface Beam { /** A legend's bombardment: the soundsystem it burns, and the damage a tick. */ sound?: { key: string; damage: number }; /** A legend's spin (radians a second), and when each thing it swept was last hit. */ spin?: number; last?: Record<string, number>; id: number; from: number; angle: number; length: number; width: number; until: number; nextTick: number; tick: number; damage: number; side: State; species: string; attack: string; target: Target }

export type CombatEventKind = "hit" | "windup" | "shot" | "quake" | "landed" | "beam" | "charged" | "sprung" | "stunned" | "pulse" | "burrowed" | "surfaced" | "leapt" | "slammed" | "nova" | "rush" | "phase" | "slept" | "fled" | "lost" | "witchHit" | "soundHit" | "soundDestroyed" | "dug" | "braced" | "blocked" | "flash" | "dazed";
/** A soundsystem's events carry its key; every other combat event its creature's id (witchHit: the witch's). */
export type SoundEventKind = "soundHit" | "soundDestroyed";
export interface CombatEventAt { x: number; z: number; at: number; big?: boolean; /** A hit: strong against its target's traits (1), resisted (-1). */ counter?: number }
export type CombatEvent =
  | (CombatEventAt & { kind: Exclude<CombatEventKind, SoundEventKind>; id: number; key?: undefined })
  | (CombatEventAt & { kind: SoundEventKind; key: string; id?: undefined });

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
export const SCALED = new Map<string, Attack>();
export function scaled(name: string, A: Attack): Attack {
  if (!A) return A;
  // (the last scaling of each attack, by name, kept while the fight's scale and speed stay: no key string a call; phase
  // 2's GC audit. SCALED still holds every scaling made, as before.)
  const last = LAST_SCALED.get(name);
  if (last && last.A === A && last.scale === FIGHT.scale && last.speed === FIGHT.speed) return last.out;
  const key = `${name}|${FIGHT.scale}|${FIGHT.speed}`;
  let out = SCALED.get(key);
  if (!out) {
    const L = FIGHT.scale, V = FIGHT.speed, m = (x: number | undefined, k: number) => (x === undefined ? undefined : x * k);
    out = { ...A, range: A.range * L, lunge: m(A.lunge, L), radius: m(A.radius, L), width: m(A.width, L), knockback: m(A.knockback, L), speed: m(A.speed, V) };
    if (SCALED.size > 2000) SCALED.clear();
    SCALED.set(key, out);
  }
  LAST_SCALED.set(name, { A, scale: FIGHT.scale, speed: FIGHT.speed, out });
  return out;
}
const LAST_SCALED = new Map<string, { A: Attack; scale: number; speed: number; out: Attack }>();
/** An attack by its name, at the fight's scale (for the view, and data lookups). */
export const attackNamed = (name: string, data: CombatData = COMBAT): Attack => scaled(name, data.attacks[name]);

export const maxHp = (level: Level, data: CombatData = COMBAT) => data.levels.hp[Math.min(level, data.levels.hp.length - 1)];

/** A creature's full health: its level's, times its species' strength. */
export const creatureMaxHp = (c: { species: string; level: Level }, data: CombatData = COMBAT) => maxHp(c.level, data) * strengthOf(c.species, c.level, data);

/** What the rest of the game tells combat each step. */
export interface CombatWorld {
  creatures: Creature[];
  /** The creatures to step this time (near a witch, or busy with a siege). */
  active: Creature[];
  witches: { id: number; x: number; z: number; onGround: boolean; down: boolean; /** her velocity (flankers go round to her back) */ vx?: number; vz?: number; /** in a calm legend's circle (rules/slowTime.ts): that legend's id; nothing else attacks her there */ shelter?: number }[];
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
  /** A witch is hit (one point, whatever hits her), and thrown by the blow (rules/knock.ts). */
  hitWitch: (id: number, time: number, blow?: { x: number; z: number; knockback: number; rams: boolean }) => void;
  /** A party animal is lost for the run. */
  loseParty: (id: number) => void;
  /** A witch is slowed (a snail's slime, a glow-worm's flash): her speed times mult until then. */
  slowWitch?: (id: number, until: number, mult: number) => void;
}
