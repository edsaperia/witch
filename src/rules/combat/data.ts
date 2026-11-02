// Combat's data and shapes (split from rules/combat.ts, no change in behaviour): the attacks, levels and traits from
// config/combat.json, strength by species, and the types the fight is made of (targets, shots, beams, events, the world it reads).
import raw from "../../../config/combat.json";
import TUNED from "../../../config/tuning.json";
import type { Creature, Level } from "../creatures";
import { LEGEND } from "../creatureLevels";
import { type State } from "../creatureStates";
import { FIGHT } from "../movement";
import { sectionOf, speciesWith } from "../creatureConfig";
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
  levels: { hp: number[]; dps: number[]; /** A full 💌 ring's worth of blows' damage, by level (combat as orbit slots, rules/orbit.ts: a blow fills its damage over this of the slots); hp when missing. */ stun?: number[] };
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
/** Species strength by class (Ed, 2026-10-08: population.swarm.classes in the tuning file): a class's species are as strong
 *  as the reference class's cap over their class's (strength = 12 / cap: strong 6 ×2, light 16 ×0.75); the reference class
 *  (swarm.reference, medium) and unlisted species 1. */
export function classStrengths(swarm: { classes: Record<string, { cap: number; species: string[] }>; reference: string }): Record<string, number> {
  const ref = swarm.classes[swarm.reference]?.cap ?? 12, out: Record<string, number> = {};
  for (const c of Object.values(swarm.classes)) for (const sp of c.species) out[sp] = ref / Math.max(1, c.cap);
  return out;
}
const R = raw as unknown as CombatData;
// (each species' attacks, strength, ranged and kite flags, temperament and traits from its folder, over anything the file still
// holds: rules/creatureConfig.ts; the lists in the order the folders come, by id)
export const COMBAT: CombatData = {
  ...R,
  bySpecies: { ...R.bySpecies, ...sectionOf("attacks") },
  strength: { species: { ...(R.strength?.species ?? {}), ...sectionOf("strength") } },
  ranged: [...R.ranged, ...speciesWith("ranged")],
  kite: { ...R.kite, species: [...R.kite.species, ...speciesWith("kite")] },
  temperament: Object.fromEntries(Object.entries(R.temperament).map(([k, v]) => [k, [...v, ...speciesWith("temperament", k)]])) as CombatData["temperament"],
  traits: Object.fromEntries(Object.entries(R.traits).map(([k, v]) => [k, [...v, ...speciesWith("traits", k)]])) as CombatData["traits"],
};
// (the classes' strengths, under any combat.json lists by species)
COMBAT.strength = { species: { ...classStrengths((TUNED as unknown as { population: { swarm: Parameters<typeof classStrengths>[0] } }).population.swarm), ...(COMBAT.strength?.species ?? {}) } };
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
  /** In a pack (rules/combat/packs.ts): the move its wind-up or lunge uses. */
  packMove?: "melee" | "ranged";
  /** An attack in the grammar being wound up (rules/attacks/combatWorld.ts): the engine's cast, released at the windup's end. */
  spellCast?: number;
  /** a legend's casts at once, one an aim (rules/combat/legend.ts) */
  spellCasts?: number[];
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
  /** A pack lob that leaves a patch where it lands (the toad's spores: rules/combat/packs.ts), slowing the other side to `slow` for `time` s. */
  patch?: { r: number; slow: number; time: number };
}

/** A beam burning (Stage 5): from its creature toward an angle, sweeping toward its target. */
export interface Beam { /** A legend's bombardment: the soundsystem it burns, and the damage a tick. */ sound?: { key: string; damage: number }; /** A legend's spin (radians a second), and when each thing it swept was last hit. */ spin?: number; last?: Record<string, number>; id: number; from: number; angle: number; length: number; width: number; until: number; nextTick: number; tick: number; damage: number; side: State; species: string; attack: string; target: Target }

export type CombatEventKind = /** one of her posse drew it off her (rules/combat/hits.ts) */ "taunted" | "hit" | "windup" | "shot" | "quake" | "landed" | "beam" | "charged" | "sprung" | "stunned" | "pulse" | "burrowed" | "surfaced" | "leapt" | "slammed" | "nova" | "rush" | "phase" | "slept" | "fled" | "lost" | "witchHit" | "soundHit" | "soundDestroyed" | "dug" | "braced" | "blocked" | "flash" | "dazed" | /** stunned and not converted: up again (rules/orbit.ts) */ "up" | "swooped" | /** pack combat (rules/combat/packs.ts): its tell, its special, her party animal splitting it */ "packTell" | "packSpecial" | "packPull" | "packMind" | "packSplit" | /** Phase 1's (Echo): a mirage image taking a 💌 and bursting, a heron blinking where she blinked */ "mirageBurst" | "packSync";
/** A soundsystem's events carry its key; every other combat event its creature's id (witchHit: the witch's). */
export type SoundEventKind = "soundHit" | "soundDestroyed";
export interface CombatEventAt { x: number; z: number; at: number; big?: boolean; /** A hit: strong against its target's traits (1), resisted (-1). */ counter?: number }
export type CombatEvent =
  | (CombatEventAt & { kind: Exclude<CombatEventKind, SoundEventKind>; id: number; key?: undefined })
  | (CombatEventAt & { kind: SoundEventKind; key: string; id?: undefined });

/** A soundsystem's health (home: the dancefloor's ring). */
export interface SoundHealth { hp: number; max: number; x: number; z: number; radius: number }

export interface CombatState {
  /** Individual action cooldowns survive changes of target/team. Live state, not profile data. */
  actionReady?: Record<number, Record<string, number>>;
  /** Shared youth/adult attack rounds by side + target, including mixed species. */
  waitingTeams?: Map<string, import("./teams").TeamState>;
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
  /** Pack combat (rules/combat/packs.ts, behind combat.packs.on): each pack's state by its key, and the dust clouds hiding tells. */
  packs?: Map<string, import("./packs").PackState>;
  clouds?: import("./packs").Cloud[];
  /** The raven's mirage (rules/combat/packs.ts): images of the flock round her that take a 💌 and burst. */
  mirages?: import("./packs").Mirage[];
  /** The raccoons' decoys (rules/combat/packs.ts): the one waving draws her 💌s in its way, till then. */
  decoys?: { id: number; until: number; r: number; side: string }[];
  /** Each witch's places over the last moment (rules/momentum.ts: creatures chasing her steer for where she was). */
  herTrail?: Map<number, { t: number; x: number; z: number }[]>;
  /** The composable attacks in flight (rules/attacks/engine.ts), made at the first cast of one; and the library they're named from
   *  (config/attacks.json, with the Fight Arena's own: ?attack=). */
  spells?: import("../attacks/engine").SpellState;
  attackLib?: import("../attacks/parse").Library;
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

export interface CreatureCombatProfile {
  readonly strength: number; readonly health: number; readonly durability: number; readonly damagePerSecond: number;
}
const profiles = new WeakMap<CombatData, Map<string, (CreatureCombatProfile | undefined)[]>>();
/** Effective species/age statistics. Current wounds and invitation progress are
 * instance state, not another copy of the animal's balancing definition. */
export function combatProfile(species: string, level: Level, data: CombatData = COMBAT): CreatureCombatProfile {
  const strength = strengthOf(species, level, data), health = data.levels.hp[Math.min(level, data.levels.hp.length - 1)] * strength;
  const capacity = data.levels.stun ?? data.levels.hp, durability = capacity[Math.min(level, capacity.length - 1)] * strength;
  const damagePerSecond = data.levels.dps[level] * strength;
  let speciesProfiles = profiles.get(data);
  if (!speciesProfiles) profiles.set(data, (speciesProfiles = new Map()));
  let ages = speciesProfiles.get(species);
  if (!ages) speciesProfiles.set(species, (ages = []));
  let profile = ages[level];
  if (!profile || profile.strength !== strength || profile.health !== health || profile.durability !== durability || profile.damagePerSecond !== damagePerSecond)
    ages[level] = profile = Object.freeze({ strength, health, durability, damagePerSecond });
  return profile;
}

export function attackOf(species: string, level: Level, data: CombatData = COMBAT): { name: string; attack: Attack; damage: number } | null {
  const list = data.bySpecies[species] ?? (data.ranged.includes(species) ? data.byLevel.ranged : data.byLevel.melee), name = list[level];
  if (!name) return null;
  const attack = scaled(name, attackNamed(name, data));
  return { name, attack, damage: combatProfile(species, level, data).damagePerSecond * attack.cooldown * (attack.factor ?? 1) };
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
/** A full 💌 ring's worth of blows' damage on c (levels.stun by its level, times its species' strength, as health was): a blow fills
 *  its damage over this of its slots (rules/orbit.ts). */
export const stunWorth = (c: { species: string; level: Level }, data: CombatData = COMBAT) => combatProfile(c.species, c.level, data).durability;

/** A creature's full health: its level's, times its species' strength. */
export const creatureMaxHp = (c: { species: string; level: Level }, data: CombatData = COMBAT) => combatProfile(c.species, c.level, data).health;

/** What the rest of the game tells combat each step. */
export interface CombatWorld {
  /** Tonight's curved ley route and its drawing tip, in metres; absent in detached combat worlds. */
  friendlyRoute?: () => { line: readonly (readonly [number, number])[]; tip: number };
  creatures: Creature[];
  /** The creatures to step this time (near a witch, or busy with a siege). */
  active: Creature[];
  witches: { id: number; x: number; z: number; onGround: boolean; down: boolean; /** her velocity (flankers go round to her back) */ vx?: number; vz?: number; /** in a calm legend's circle (rules/slowTime.ts): that legend's id; nothing else attacks her there */ shelter?: number; /** her Stealth broom (rules/brooms.ts): unseen, but by what already went for her while it's within this many metres */ hidden?: number }[];
  /** Where a party animal's leash is fixed. */
  leashPoint: (id: number) => { x: number; z: number } | null;
  /** Whether a party animal is parked (at a sigil on the ground): it guards round it. */
  parked: (id: number) => boolean;
  /** The witch a creature is being invited by right now (it holds its fire on her: Ed's playtest), or -1. */
  talkingTo: (id: number) => number;
  /** Where a creature at (x, z) heads for (tx, tz) round the lakes (rules/lakes.ts roundLakes): null, straight there; absent with none. */
  round?: (x: number, z: number, tx: number, tz: number) => { x: number; z: number } | null;
  /** How far a creature at (x, z) runs to leave the map, and where (a point just past its edge). */
  exit: (x: number, z: number) => { x: number; z: number };
  /** Where a beaten creature runs to sleep on the beach, or null (no beach: `exit`): rules/runaway.ts runawaySpot. */
  runaway?: (c: Creature) => { x: number; z: number } | null;
  /** The map's centre (home): besiegers march inward, never on a soundsystem further from it than they are (rules/combat.ts). */
  centre?: { x: number; z: number };
  /** Whether (x, z) is out of every witch's sight (far beyond the haze): a fleeing creature there is gone. */
  unseen: (x: number, z: number) => boolean;
  /** The home area (the dancefloor's): whether (x, z) is in it, and a circle (x, z, r) holding all of it. A party animal parked
   *  with its sigil in it guards the whole of it (Ed, 2026-10-11). */
  home?: { inside: (x: number, z: number) => boolean; x: number; z: number; r: number };
  /** The area (x, z) lies in, the same way (rules/homeArea.ts areaOf): a party animal parked with its sigil anywhere guards the whole
   *  of its sigil's area, plus guard.radius round the sigil (Ed, 2026-10-15: "Placing a sigil in any area should work as home does"). */
  areaAt?: (x: number, z: number) => { inside: (x: number, z: number) => boolean; x: number; z: number; r: number } | null;
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
  /** Optional actual witch state for detached accepted-outcome diagnostics; absent means unknown. */
  witchHitState?: (id: number) => import("../attackObservation").WitchHitState | null;
  /** A party animal is lost for the run. */
  loseParty: (id: number) => void;
  /** Pack combat's view of her (rules/combat/packs.ts): her last blink, her 💌s landing, her aim confused. */
  packWorld?: import("./packs").PackWorld;
  /** A witch is slowed (a snail's slime, a flash): her speed times mult until then. */
  slowWitch?: (id: number, until: number, mult: number) => void;
  /** An attack in the grammar's effects on her without a hit (rules/attacks/combatWorld.ts): thrown this far from (x, z), staggered
   *  till then, moved by a force field this step. */
  throwWitch?: (id: number, x: number, z: number, metres: number) => void;
  stunWitch?: (id: number, until: number) => void;
  nudgeWitch?: (id: number, dx: number, dz: number) => void;
}
