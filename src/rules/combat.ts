// Combat (Stage 4; DESIGN.md "Combat, pacing and forecasting"): one system for wild and party
// creatures. Every creature of young age and up has an attack: by default its species' own in the
// attack grammar (rules/attacks/species.ts; the tuning's attacks.species), and against a soundsystem
// or with ?attacks=old the one from config/combat.json (melee, a
// shot or the legends' quake), by its level and whether its species shoots; the numbers are data,
// one power budget per level. Sides: party (leashed) against wild; the witch is on the party's
// side and wild creatures shoot at her on the ground (Ed, 2026-10-04). Same kind never fights
// same kind, whichever side (Ed: inviting doesn't start fights inside a group; your wolves can't
// defend against wild wolves). Sieges: when a wave wakes an area, its wild creatures march on its
// new soundsystem; survivors of a won siege march on to the next-nearest. No drawing here.
// The step's phases live in rules/combat/ (step, flight, turn and the turn's own phases: standby, choose, fighter, lunge, waiting,
// packWait, moves, stances, approach, release); everything public is still exported from here.
import { COMBAT, type CombatData, type CombatState, type CombatWorld } from "./combat/data";
import { beginStep, combatStep } from "./combat/step";
import { layTrails, stepBeams, stepShots, stepSpellsInFlight, stepTrails } from "./combat/flight";
import { creatureTurn } from "./combat/turn";
import { stepCommandActs } from "./commands/act";

export { COMBAT, traitsOf, counterOf, newCombat, strengthOf, combatProfile, attackOf, scaled, attackNamed, maxHp, creatureMaxHp, stunWorth } from "./combat/data";
export type { Delivery, Modifier, Attack, CombatData, Trait, Target, Fight, Shot, Beam, CombatEventKind, CombatEvent, SoundHealth, CombatState, Trail, CombatWorld } from "./combat/data";
export { fighting, targetable, truce, guardOf, nearestSound } from "./combat/targeting";
export { lungeOf, longLunge, lungeLength, guardRadius } from "./combat/reach";
export { nearestHomeSpeaker, startSiege, topSpeedOf, marchSpeedOf, marchSpeed, marchOn } from "./combat/siege";

/** One step of every fight. Creatures fighting move here (their roam and leash leave them be). */
export function stepCombat(s: CombatState, w: CombatWorld, data: CombatData = COMBAT): void {
  const b = beginStep(s, w, data); // (the fight's speeds, her trail, the grid of fighters)
  stepShots(b); // shots and lobs fly and land
  stepSpellsInFlight(b); // attacks in the grammar in flight
  stepBeams(b); // beams burn and sweep
  stepTrails(b); // slime and spores dry, slowing the other side on them
  stepCommandActs(b); // her commands carried out (?commands=1: rules/commands/act.ts)
  const k = combatStep(b); // her party, the packs and their plans, the claims, the dodge's tokens
  for (const c of w.active) creatureTurn(k, c); // each creature's turn (rules/combat/turn.ts)
  layTrails(b); // a trail-layer on the move lays its trail
}
