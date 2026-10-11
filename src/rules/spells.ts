// Spells: a hat and a broom (Ed, 2026-10-11; docs/backlog/unlocks.md). She has two slots, a hat and a broom, each with a spell
// (or none: the plain hat and broom). Hats are mostly placed (put down with the sigil button held, rules/hat.ts): some fire once
// when placed, some work over time while placed; the Helmet is worn. Brooms change how she moves or how much she can pull:
// some passive, some active, cast with the spell button (R; gamepad circle; touch "spell"), then recharging. The plain broom
// lets her rise again sooner after landing. All unlocked for now; achievements come later. Spells may stun or slow enraged
// creatures but never damage them (Ed, 2026-10-11). No drawing here.
import type { Tuning } from "./tuning";

export type HatSpellId = "none" | "harvest" | "dowsing" | "sentry" | "bramble" | "slingshot" | "gathering" | "helmet" | "mine" | "healing" | "lullaby" | "decoy" | "nursing";
export type BroomSpellId = "none" | "speed" | "battering" | "long" | "double" | "leyjump" | "haul" | "updraft" | "shadow" | "comet" | "homing";

/** How a spell works: a hat worn, placed (working while it's down), or fired once on placing; a broom passive or active (a
 *  button, with a cooldown). */
export type SpellHow = "worn" | "placed" | "onPlace" | "passive" | "active";
export interface SpellInfo<Id extends string> { id: Id; name: string; how: SpellHow; line: string; /** built in the rules yet (the picker offers only these) */ built: boolean }

export const HAT_SPELLS: SpellInfo<HatSpellId>[] = [
  { id: "none", name: "Plain hat", how: "placed", line: "No spell.", built: true },
  { id: "helmet", name: "Helmet", how: "worn", line: "An extra hit: the first blow knocks it off instead. Pick it up to wear it again.", built: true },
  { id: "healing", name: "Healing ring", how: "placed", line: "Put it down: standing near it, she heals a hit every few seconds.", built: true },
  { id: "harvest", name: "Harvest", how: "onPlace", line: "Put it down: a ring of six berries grows round it.", built: false }, // (Ed, 2026-10-11)
  { id: "dowsing", name: "Dowsing", how: "onPlace", line: "Put it down: it points to the nearest relic for a while.", built: false },
  { id: "sentry", name: "Sentry", how: "placed", line: "Put it down: it throws 💌s at wild creatures nearby.", built: false },
  { id: "bramble", name: "Bramble", how: "placed", line: "Put it down: creatures near it are slowed.", built: false },
  { id: "slingshot", name: "Slingshot", how: "placed", line: "Put it down: 💌s that pass it orbit, then fly at the nearest creature.", built: false },
  { id: "gathering", name: "Gathering", how: "onPlace", line: "Put it down: her sigils nearby gather to it; pick it up to take them all.", built: false },
  { id: "mine", name: "Mine", how: "onPlace", line: "Put it down: it stuns every creature nearby.", built: false },
  { id: "lullaby", name: "Lullaby", how: "onPlace", line: "Put it down: wild creatures nearby nap.", built: false },
  { id: "decoy", name: "Decoy", how: "placed", line: "Put it down: it draws attackers to itself.", built: false },
  { id: "nursing", name: "Nursing", how: "placed", line: "Put it down: her creatures near it heal.", built: false },
];

export const BROOM_SPELLS: SpellInfo<BroomSpellId>[] = [
  { id: "none", name: "Plain broom", how: "passive", line: "Rise to the treetops again sooner after landing.", built: true },
  { id: "speed", name: "Speed", how: "active", line: "Press the spell button: much faster for a few seconds.", built: true },
  { id: "long", name: "Long", how: "passive", line: "Blinks go twice as far.", built: true },
  { id: "double", name: "Double blink", how: "passive", line: "One more blink before it needs to recharge.", built: true }, // (Ed, 2026-10-11: "a broom that gives you an extra blink")
  { id: "battering", name: "Battering", how: "passive", line: "Blinks knock creatures in the way aside.", built: false },
  { id: "leyjump", name: "Ley jump", how: "active", line: "Press the spell button: jump to the ley line's pulse.", built: false },
  { id: "haul", name: "Haul", how: "passive", line: "Her sigils pull on her less.", built: false },
  { id: "updraft", name: "Updraft", how: "active", line: "Press the spell button: rise or land at once, knocking creatures back.", built: false },
  { id: "shadow", name: "Shadow step", how: "passive", line: "After a blink, creatures lose sight of her for a moment.", built: false },
  { id: "comet", name: "Comet", how: "active", line: "Press the spell button: charge along the ground, knocking creatures aside.", built: false },
  { id: "homing", name: "Homing", how: "active", line: "Press the spell button: blink to her nearest placed sigil.", built: false },
];

export const hatSpell = (id: string): SpellInfo<HatSpellId> | undefined => HAT_SPELLS.find(s => s.id === id);
export const broomSpell = (id: string): SpellInfo<BroomSpellId> | undefined => BROOM_SPELLS.find(s => s.id === id);
/** A known, built hat spell's id, else "none". */
export const hatOf = (id: string | undefined): HatSpellId => (id && hatSpell(id)?.built ? (id as HatSpellId) : "none");
/** A known, built broom spell's id, else "none". */
export const broomOf = (id: string | undefined): BroomSpellId => (id && broomSpell(id)?.built ? (id as BroomSpellId) : "none");

export interface SpellState {
  hat: HatSpellId;
  broom: BroomSpellId;
  /** Game time the active broom spell's effect ends (it's active before then). */
  activeUntil: number;
  /** Game time it can be cast again. */
  readyAt: number;
  /** Game time it was last cast. */
  castAt: number;
  /** The Healing ring: when she next heals a hit while she stays by it (absent: she's not by it). */
  healAt?: number;
}

export function newSpells(t: Tuning): SpellState {
  return { hat: hatOf(t.spells.hat), broom: broomOf(t.spells.broom), activeUntil: -Infinity, readyAt: 0, castAt: -Infinity };
}

/** Her hat and broom spells now (the creator's pick; unknown or unbuilt ones none). */
export function setLoadout(s: SpellState, hat: string | undefined, broom: string | undefined): void {
  s.hat = hatOf(hat);
  const b = broomOf(broom);
  if (b !== s.broom) { s.broom = b; s.activeUntil = -Infinity; s.readyAt = 0; s.castAt = -Infinity; }
}

/** Whether her broom has a spell to cast (the action bar's spell slot shows only then). */
export const castable = (s: SpellState): boolean => broomSpell(s.broom)?.how === "active";

/** Cast her broom's spell if it has one and it's ready: returns whether it went off. */
export function castSpell(s: SpellState, time: number, t: Tuning): boolean {
  if (!castable(s) || time < s.readyAt) return false;
  if (s.broom === "speed") {
    const S = t.spells.speed;
    s.castAt = time; s.activeUntil = time + S.duration; s.readyAt = s.activeUntil + S.cooldown;
    return true;
  }
  return false;
}

export const spellActive = (s: SpellState, time: number) => time < s.activeUntil;

/** How far it has recharged, 0 just cast to 1 ready (for the HUD ring). */
export function spellCharge(s: SpellState, time: number): number {
  if (time >= s.readyAt) return 1;
  const total = s.readyAt - s.castAt;
  return total > 0 ? Math.max(0, Math.min(1, (time - s.castAt) / total)) : 1;
}

/** How much faster she moves now: the Speed broom's multiplier while it's on, easing off over its last half second. */
export function speedMultiplier(s: SpellState, time: number, t: Tuning): number {
  if (s.broom !== "speed" || !spellActive(s, time)) return 1;
  const S = t.spells.speed, k = Math.min(1, (s.activeUntil - time) / 0.5);
  return 1 + (S.mult - 1) * k;
}

/** Seconds after landing before she can rise again: the plain broom's shorter (Ed, 2026-10-11: "default broom reduces treetop
 *  cooldown"). */
export const riseCooldownOf = (s: SpellState, t: Tuning): number => (t.riseCooldown ?? 0) * (s.broom === "none" ? t.spells.plain?.riseCooldown ?? 1 : 1);

/** How far her blink goes: the Long broom's twice as far (it stacks with the Hare's extra charges: Ed, 2026-10-11). */
export const blinkDistance = (s: SpellState, t: Tuning): number => t.dash.distance * (s.broom === "long" ? t.spells.long?.mult ?? 1 : 1);

/** Her blinks before the cooldown: the Double blink broom's one more (stacking with the Hare's: rules/buffs.ts). */
export const extraBlinks = (s: SpellState, t: Tuning): number => (s.broom === "double" ? t.spells.double?.charges ?? 1 : 0);

/** The Healing ring (Ed, 2026-10-11, "Second wind" reworked: "placed: standing near it, she heals a hit every few seconds"): her
 *  hat down within spells.healing.radius of her, she heals a hit every spells.healing.every seconds there while she's hurt.
 *  Returns whether she healed now. */
export function stepHealingRing(s: SpellState, health: { hp: number; repairAt: number }, hat: { x: number; z: number } | null, x: number, z: number, time: number, t: Tuning): boolean {
  const H = t.spells.healing;
  if (s.hat !== "healing" || !H || !hat || health.hp <= 0 || health.hp >= t.witchHealth.hits || Math.hypot(hat.x - x, hat.z - z) > H.radius) { s.healAt = undefined; return false; }
  if (s.healAt === undefined) { s.healAt = time + H.every; return false; }
  if (time < s.healAt) return false;
  health.hp += 1; s.healAt = time + H.every;
  if (health.hp >= t.witchHealth.hits) health.repairAt = Infinity;
  return true;
}
