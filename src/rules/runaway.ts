// Beaten creatures sleep on the beach (Ed, 2026-10-28: "Maybe creatures that run away should go to the beach and sleep there until
// the party is over, and stay there if it's won"): a beaten one runs (rules/combat.ts, its flee) to a spot on the nearest stretch
// of beach, clear of the beach witches and of the others there, and lies down asleep (the shared asleep state, Creature.asleep: the
// sleeping art, the 😴). For the game's rules it's `gone` as before (out of every fight, no rune, no 💌s, not on its area for
// clears, rosters or waves), only drawn, at its spot (`beached`). The night won, it sleeps on there; the party lost, the afterparty
// gets it up and walks it home to its own area (rules/partyOver.ts), as everyone else. A map without a beach (the square map, the
// beach off): it runs off the map's edge and is gone, as before. No drawing here.
import { beachOf } from "./mapShape";
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";
import type { Tuning } from "./tuning";

/** How far apart two sleepers on the beach lie (m), and how far from a spot of beach witches they keep. */
const APART = 3, FROM_WITCHES = 10;

/** Where a beaten creature runs to sleep: a spot on the sand of the coast nearest it (in from the water, as the beach witches lie),
 *  stepped along the coast till it's clear of the beach witches' spots and of every other creature lying there or on its way;
 *  or null (no beach: it runs off the map's edge, rules/combat.ts). */
export function runawaySpot(g: { map: ForestMap; tuning: Tuning; creatures: readonly Creature[]; beach: readonly { x: number; z: number }[] | null }, c: Creature): { x: number; z: number } | null {
  const beach = beachOf(g.map.bounds, g.tuning);
  if (!beach) return null;
  const L = beach.land, sh = L.shore(c.x, c.z), taken: { x: number; z: number }[] = [];
  for (const o of g.creatures) if (o !== c && o.beach) taken.push(o.beach);
  const clear = (x: number, z: number) => taken.every(p => Math.hypot(p.x - x, p.z - z) >= APART) && (g.beach ?? []).every(p => Math.hypot(p.x - x, p.z - z) >= FROM_WITCHES);
  let first: { x: number; z: number } | null = null;
  for (let k = 0; k < 40; k++) {
    const s = sh.s + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * APART, at = L.along(sh.loop, s), d = Math.min(30, beach.sandAlong(sh.loop, s) * 0.4); // (in from where the water starts)
    const p = { x: at.x - at.nx * d, z: at.z - at.nz * d };
    first ??= p;
    if (clear(p.x, p.z)) return p;
  }
  return first; // (a crowded stretch: by the nearest anyway)
}

/** Set it running for its spot on the beach (`spot`, rules/runaway.ts runawaySpot), or, with none (no beach), for `exit` past the
 *  map's edge: every flee starts here, so nobody vanishes mid-night (Ed, 2026-10-28: "no creatures are created and none are
 *  destroyed" in a night): a beaten wild one, a party animal knocked down, a ruined area's happy babies. */
export function runOff(c: Creature, spot: { x: number; z: number } | null, exit: () => { x: number; z: number }): void {
  const to = spot ?? exit();
  c.beach = spot ?? undefined; c.fleeUntil = Infinity; c.fleeX = to.x; c.fleeZ = to.z;
}

/** Its run over: there (or out of every witch's sight, there at once), it lies down asleep at its spot on the beach; with no spot
 *  (no beach), gone off the map's edge, as before. */
export function runawayArrives(c: Creature, time: number): void {
  c.gone = true;
  if (!c.beach) return;
  c.x = c.tx = c.beach.x; c.z = c.tz = c.beach.z;
  c.beached = true; c.asleep = true; c.asleepAt = time; c.napUntil = undefined; c.wakeUntil = undefined;
  c.fleeUntil = undefined; c.fleeX = undefined; c.fleeZ = undefined; c.moving = false; c.vx = 0; c.vz = 0;
}

/** Up off the beach (the party lost: rules/partyOver.ts walks it home from here), back on the island as any other creature. */
export function offTheBeach(c: Creature): void {
  if (!c.beached) return;
  c.gone = false; c.beached = false; c.beach = undefined; c.asleep = false; c.asleepAt = undefined;
}
