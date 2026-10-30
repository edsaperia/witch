import { LOOK_IDS } from '../rules/lakeLooks';

export type GroundFamily = 'no-lakes' | 'full-lakes' | `lakes:${string}`;
/** Lake looks are fixed with the map. Mutable diagnostic views retain every kind. */
export function groundFamily(hasLakes: boolean, looks: ReadonlySet<string> | null, forced = false, zoo = false, debug = false): GroundFamily {
  if (!hasLakes) return 'no-lakes';
  if (forced || zoo || debug || !looks?.size || [...looks].some(look => !LOOK_IDS.some(id => id === look))) return 'full-lakes';
  return `lakes:${LOOK_IDS.filter(look => looks.has(look)).join(',')}`;
}
export function groundDefines(family: GroundFamily, beach: boolean): Record<string, string> {
  const defines: Record<string, string> = {};
  if (family !== 'no-lakes') {
    defines.GROUND_LAKES = '';
    const selected = family === 'full-lakes' ? LOOK_IDS : family.slice(6).split(',');
    for (const look of LOOK_IDS) if (selected.includes(look)) defines[`GROUND_LAKE_${look.toUpperCase()}`] = '';
  }
  if (beach) defines.GROUND_BEACH = '';
  return defines;
}
