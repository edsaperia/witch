// Ed, 2026-11-01: animal behaviour comes first; there is no universal special role.
import raw from "../../../config/creature-actions.json";
import type { Creature } from "../creatures";
import { FIGHT, profileOf } from "../movement";
import { attackOf } from "./data";
import type { PacksData, Role, SpecialData, SpecialKind } from "./packs";

export interface CreatureAction {
  id: string;
  delivery: "melee" | "ranged" | "effect";
  weight: number;
  youngWeight: number;
  cooldown?: number;
  knockback?: number;
  effect?: SpecialKind;
  parameters?: Partial<SpecialData>;
}
export const ACTIONS = raw as { species: Record<string, CreatureAction[]> };
export const actionsOf = (species: string): readonly CreatureAction[] => ACTIONS.species[species] ?? [];
/** Adapter to the existing attack executors. These labels do not reserve team slots. */
export const actionRole = (action: CreatureAction): Role => action.delivery === "melee" ? "lunger" : action.delivery === "ranged" ? "shooter" : "special";
export function actionReach(c: Creature, action: CreatureAction, data: PacksData): number {
  const kind = data.kinds[c.species], move = profileOf(c.species)?.move;
  if (action.delivery === "ranged") return (kind?.ranged?.range ?? 4) * FIGHT.scale * (c.level === 1 ? data.young.range : 1);
  if (action.delivery === "effect") {
    const effect = action.parameters ?? {};
    const range = (effect.leap ? move?.to : undefined) ?? effect.range ?? effect.reach ?? effect.radius ?? 20;
    return range * FIGHT.scale * (c.level === 1 ? data.young.special : 1);
  }
  const ordinary = attackOf(c.species, c.level)?.attack;
  const preparation = move?.to ?? move?.from ?? move?.trigger ?? (move?.kind === "swoop" ? move.radius : undefined);
  return preparation !== undefined ? preparation * FIGHT.scale : (ordinary?.range ?? 4) + (ordinary?.lunge ?? 0);
}
