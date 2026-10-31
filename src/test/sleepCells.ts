import type { Creature } from "../rules/creatures";
import type { ForestMap } from "../rules/map";

/** Physical legend cells belong to their paired playable area (Ed, 2026-10-26). Keep raw differences visible. */
export function sleepCellAudit(map: ForestMap, creatures: readonly Creature[]) {
  const rawDifferences = creatures.filter(c => !c.gone && !c.leashed).flatMap(c => {
    const physical = map.cellSafe(c.x, c.z).cell;
    if (physical[0] === c.cell[0] && physical[1] === c.cell[1]) return [];
    const assigned = c.cell.join(","), paired = map.legendAreas.get(physical.join(","));
    return [{ id: c.id, species: c.species, assigned: [...c.cell], physical: [...physical], logical: [...map.areaOf(physical)],
      boss: !!c.boss, circle: !!c.circle, asleep: !!c.asleep,
      sameArea: map.sameArea(physical, c.cell), paired: paired === assigned,
      valid: map.sameArea(physical, c.cell) && paired === assigned && !!(c.boss || c.circle) }];
  });
  return { rawDifferences, mismatches: rawDifferences.filter(c => !c.valid) };
}
