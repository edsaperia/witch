// Spells: a hat and a broom (Ed, 2026-10-11; docs/backlog/unlocks.md). She has two slots, a hat and a broom, each with a spell
// (or none: the plain hat and broom). Hats are mostly placed (put down with the sigil button held, rules/hat.ts): some fire once
// when placed, some work over time while placed; the Helmet is worn. Brooms change how she moves or how much she can pull:
// some passive, some active, cast with the spell button (R; the pad's L3, Ed 2026-10-15; touch "spell"), then recharging. The broom's
// spell isn't picked any more: it's the set her broom's parts complete (the Workshop, Ed 2026-10-23: "R casts the completed set's
// spell"; rules/broomParts.ts), none on a broom that completes none; the old passive brooms (Long, Double blink, Haul, the plain
// broom's quick take-off) are parts' stats now. Spells may stun or slow enraged creatures but never damage them (Ed, 2026-10-11).
// No drawing here.
import type { Tuning } from "./tuning";
import { fittedOf, partsPull, spellOfParts, type Fitted } from "./broomParts";

export type HatSpellId = "none" | "harvest" | "dowsing" | "sentry" | "bramble" | "slingshot" | "gathering" | "helmet" | "mine" | "healing" | "lullaby" | "cyclone" | "nursing" | "edgeseer" | "routeseer";
export type BroomSpellId = "none" | "speed" | "battering" | "leyjump" | "pound" | "stealth";

/** How a spell works: a hat worn, placed (working while it's down), or fired once on placing; a broom passive or active (a
 *  button, with a cooldown). */
export type SpellHow = "worn" | "placed" | "onPlace" | "passive" | "active";
export interface SpellInfo<Id extends string> { id: Id; name: string; how: SpellHow; line: string; /** built in the rules yet (the picker offers only these) */ built: boolean }

export const HAT_SPELLS: SpellInfo<HatSpellId>[] = [
  { id: "none", name: "Plain hat", how: "placed", line: "No spell.", built: true },
  { id: "helmet", name: "Helmet", how: "worn", line: "An extra hit: the first blow knocks it off instead. Pick it up to wear it again.", built: true },
  { id: "healing", name: "Healing ring", how: "placed", line: "Put it down: standing near it, she heals a hit every few seconds.", built: true },
  { id: "harvest", name: "Harvest", how: "onPlace", line: "Put it down: a ring of six berries grows round it.", built: true }, // (Ed, 2026-10-11)
  { id: "dowsing", name: "Dowsing", how: "onPlace", line: "Put it down: a pointer leads to the nearest relic for a minute.", built: true },
  { id: "sentry", name: "Sentry", how: "placed", line: "Put it down: it throws 💌s at wild creatures within 33 m.", built: true }, // (Ed, 2026-10-11: "larger ranges")
  { id: "bramble", name: "Bramble", how: "placed", line: "Put it down: wild creatures within 30 m of it are slowed.", built: true }, // (Ed, 2026-10-11: "Bramble should have 30m range")
  { id: "slingshot", name: "Slingshot", how: "placed", line: "Put it down: 💌s that pass within 10 m circle it, then fly at a creature up to 40 m off.", built: true },
  { id: "gathering", name: "Gathering", how: "placed", line: "Put it down, then pick it up: every sigil of hers within 100 m comes back to her stack.", built: true }, // (Ed, 2026-10-11: "all sigils in range")
  { id: "mine", name: "Mine", how: "onPlace", line: "Put it down: it bursts, stunning wild creatures within 15 m.", built: true },
  { id: "lullaby", name: "Lullaby", how: "onPlace", line: "Put it down: wild creatures within 15 m fall asleep; a 💌 wakes one.", built: true }, // (Ed, 2026-10-12: "wake up when hit with an invitation")
  { id: "cyclone", name: "Cyclone", how: "placed", line: "Put it down: a whirlwind sweeps creatures near it round, lifts them and flings them out.", built: true }, // (Ed, 2026-10-12, instead of the Decoy)
  { id: "nursing", name: "Nursing", how: "placed", line: "Put it down: her creatures near it heal.", built: true },
  { id: "edgeseer", name: "Edge-seer", how: "worn", line: "Worn: she sees the areas' edges glow.", built: true }, // (Ed, 2026-10-15: "shows the area edges"; "only the player wearing the hat sees the things")
  { id: "routeseer", name: "Route-seer", how: "worn", line: "Worn: she sees the whole ley line, and every runestone's beacon.", built: true }, // (Ed, 2026-10-15: "a 'see the entire route' hat power as well")
];

export const BROOM_SPELLS: SpellInfo<BroomSpellId>[] = [
  { id: "none", name: "Bare broom", how: "passive", line: "No spell: no set of parts complete.", built: true },
  { id: "speed", name: "Speed", how: "active", line: "Press the spell button: much faster for a few seconds.", built: true },
  { id: "battering", name: "Battering", how: "passive", line: "Blinks stun the creatures in her path.", built: true }, // (Ed, 2026-10-12)
  { id: "leyjump", name: "Ley jump", how: "active", line: "Press the spell button: jump to the ley line's pulse. A long recharge.", built: true },
  { id: "pound", name: "Ground pound", how: "active", line: "Press the spell button: rise or land at once, knocking creatures back; landing stuns them.", built: true }, // (Ed, 2026-10-12: Updraft renamed, its landing stuns)
  { id: "stealth", name: "Stealth", how: "passive", line: "Creatures don't see her unless she's inviting or placing or picking up; ones that do chase her till she's out of range.", built: true }, // (Ed, 2026-10-12, instead of Shadow step)
];

export const hatSpell = (id: string): SpellInfo<HatSpellId> | undefined => HAT_SPELLS.find(s => s.id === id);
export const broomSpell = (id: string): SpellInfo<BroomSpellId> | undefined => BROOM_SPELLS.find(s => s.id === id);
/** A known, built hat spell's id, else "none". */
export const hatOf = (id: string | undefined): HatSpellId => (id && hatSpell(id)?.built ? (id as HatSpellId) : "none");
/** A known, built broom spell's id, else "none". */
export const broomOf = (id: string | undefined): BroomSpellId => (id && broomSpell(id)?.built ? (id as BroomSpellId) : "none");

export interface SpellState {
  hat: HatSpellId;
  /** The spell hats she owns (Ed, 2026-10-23: every hat but the plain one is found, one a night: rules/finds.ts); absent, every
   *  built hat (tests, tools and bots). The page sets it from her save (app/hatSave.ts) through the tuning's spells.hats. */
  hats?: string[];
  /** Her broom's spell: the set her parts complete (spellOfParts), never picked on its own. */
  broom: BroomSpellId;
  /** Her broom's parts, a slot each (rules/broomParts.ts). */
  parts: Fitted;
  /** Her bag (a config/wardrobe.json bag item's id: rules/bags.ts, its 💌 stats), or none. */
  bag?: string;
  /** Game time the active broom spell's effect ends (it's active before then). */
  activeUntil: number;
  /** Game time it can be cast again. */
  readyAt: number;
  /** Game time it was last cast. */
  castAt: number;
  /** Stealth: seen until then (she threw 💌s, or put down or picked up something). */
  seenUntil?: number;
  /** The Healing ring: when she next heals a hit while she stays by it (absent: she's not by it). */
  healAt?: number;
  /** The Harvest hat: when its ring last grew. */
  harvestAt?: number;
  /** The Dowsing hat: the relic it points to, till when. */
  dowse?: { relic: number; until: number };
  /** The Mine and the Lullaby: when each last went off. */
  mineAt?: number;
  lullAt?: number;
  /** The Cyclone: when its last whirlwind began, where, and whom it holds (each at its own angle and distance from the hat). */
  cyc?: { at: number; x: number; z: number; held: { id: number; a: number; r: number }[] };
}

export function newSpells(t: Tuning): SpellState {
  const parts = fittedOf(t.spells.parts);
  const owned = t.spells.hats;
  return { hat: hatOf(t.spells.hat), ...(owned !== undefined && owned !== "*" ? { hats: owned.split(",").filter(id => hatOf(id) !== "none") } : {}), broom: spellOfParts(parts), parts, ...(t.spells.bag ? { bag: t.spells.bag } : {}), activeUntil: -Infinity, readyAt: 0, castAt: -Infinity };
}
/** Whether she owns a hat (the plain hat is always hers). */
export const ownsHat = (s: Pick<SpellState, "hats">, id: string): boolean => id === "none" || !s.hats || s.hats.includes(id);

/** Her broom's parts now (fitted at the Workshop's bay: ui/stationPanel.ts, main.ts), at once, mid-night too: its stats with them
 *  (witchTuning reads them each step) and its spell the set they complete (its timers reset when it changes). */
export function setParts(s: SpellState, f: Fitted): void {
  s.parts = f;
  const b = spellOfParts(f);
  if (b !== s.broom) { s.broom = b; s.activeUntil = -Infinity; s.readyAt = 0; s.castAt = -Infinity; }
}

/** Her hat spell now (the creator's pick, or a hat put on: unknown or unbuilt ones none). Her broom's isn't picked: it's her parts'
 *  set (setParts; the Workshop's bay). */
export function setLoadout(s: SpellState, hat: string | undefined): void {
  s.hat = hatOf(hat);
}

/** Whether her broom has a spell to cast (the action bar's spell slot shows only then). */
export const castable = (s: SpellState): boolean => broomSpell(s.broom)?.how === "active";

/** Cast her broom's spell if it has one and it's ready (and `can`: it has somewhere to go, rules/brooms.ts): returns whether
 *  it went off. Speed lasts its duration, then recharges; Ley jump and Ground pound act at once (rules/brooms.ts) and recharge. */
export function castSpell(s: SpellState, time: number, t: Tuning, can = true): boolean {
  if (!castable(s) || time < s.readyAt || !can) return false;
  if (s.broom === "speed") {
    const S = t.spells.speed;
    s.castAt = time; s.activeUntil = time + S.duration; s.readyAt = s.activeUntil + S.cooldown;
    return true;
  }
  const cool = s.broom === "leyjump" ? t.spells.leyjump?.cooldown : s.broom === "pound" ? t.spells.pound?.cooldown : undefined;
  if (cool === undefined) return false;
  s.castAt = time; s.activeUntil = time; s.readyAt = time + cool;
  return true;
}

/** Stealth (Ed, 2026-10-12): her broom's Stealth and nothing she did lately has given her away. */
export const stealthed = (s: SpellState, time: number): boolean => s.broom === "stealth" && time >= (s.seenUntil ?? -Infinity);
/** She did something they notice (a 💌 thrown, something put down or picked up): seen for stealth.reveal seconds. */
export function revealed(s: SpellState, time: number, t: Tuning): void { if (s.broom === "stealth") s.seenUntil = Math.max(s.seenUntil ?? -Infinity, time + (t.spells.stealth?.reveal ?? 3)); }
/** How much her sigils pull on her: the Canoe hull's less (the Haul broom's old job; rules/broomParts.ts). */
export const pullOf = (s: SpellState | undefined): number => (s?.parts ? partsPull(s.parts) : 1);

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

/** The Healing ring (Ed, 2026-10-11, "Second wind" reworked: "placed: standing near it, she heals a hit every few seconds"): a
 *  Healing hat of hers down within spells.healing.radius of her (`hats`: those lying, rules/hatSpells.ts hatsDown), she heals a
 *  hit every spells.healing.every seconds there while she's hurt. Returns whether she healed now. */
export function stepHealingRing(s: SpellState, health: { hp: number; repairAt: number }, hats: { x: number; z: number; spell: string }[], x: number, z: number, time: number, t: Tuning): boolean {
  const H = t.spells.healing;
  if (!H || health.hp <= 0 || health.hp >= t.witchHealth.hits || !hats.some(q => q.spell === "healing" && Math.hypot(q.x - x, q.z - z) <= H.radius)) { s.healAt = undefined; return false; }
  if (s.healAt === undefined) { s.healAt = time + H.every; return false; }
  if (time < s.healAt) return false;
  health.hp += 1; s.healAt = time + H.every;
  if (health.hp >= t.witchHealth.hits) health.repairAt = Infinity;
  return true;
}
