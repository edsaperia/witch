import type { Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { sideOf } from "../rules/combat/targeting";

/** Exercise the real collision/damage/state port without selecting an AI role.
 * State fixtures use a decisive hit; contact/truce fixtures can request a small one. */
export function queueCombatHit(g: Game, from: Creature, target: Creature, damage = 1e6): void {
  g.combat.shots.push({ id: g.combat.nextShot++, x: target.x, z: target.z, vx: 0, vz: 0, until: g.clock.time + 1,
    from: from.id, side: sideOf(from), species: from.species, damage, radius: 0.1, attack: "nip" });
}
