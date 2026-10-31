import { LOOK_IDS } from '../rules/lakeLooks';

export type GroundFamily = 'no-lakes' | 'full-lakes' | `lakes:${string}`;
export const GROUND_EXTRAS = ['ZOO_STREET', 'ZOO_PLAZA', 'DANCEFLOOR', 'PAVEMENT', 'LEGENDS', 'LEGEND_FLOOR', 'KOI', 'BARE'] as const;
export type GroundExtra = typeof GROUND_EXTRAS[number];
export interface GroundExtraFacts { zoo: boolean; dancefloor: boolean; pavement: boolean; legends: boolean; legendFloor: boolean; koi: boolean; bare: boolean }
/** Facts describe geometry/uniforms fixed with the map. Mutable diagnostic views keep the full shader. */
export function groundExtras(facts: GroundExtraFacts, mutable = false): readonly GroundExtra[] {
  if (mutable || facts.zoo) return GROUND_EXTRAS;
  const present: Record<GroundExtra, boolean> = { ZOO_STREET: facts.zoo, ZOO_PLAZA: facts.zoo, DANCEFLOOR: facts.dancefloor,
    PAVEMENT: facts.pavement, LEGENDS: facts.legends, LEGEND_FLOOR: facts.legends && facts.legendFloor, KOI: facts.koi, BARE: facts.bare };
  return GROUND_EXTRAS.filter(extra => present[extra]);
}
/** Lake looks are fixed with the map. Mutable diagnostic views retain every kind. */
export function groundFamily(hasLakes: boolean, looks: ReadonlySet<string> | null, forced = false, zoo = false, debug = false): GroundFamily {
  if (!hasLakes) return 'no-lakes';
  if (forced || zoo || debug || !looks?.size || [...looks].some(look => !LOOK_IDS.some(id => id === look))) return 'full-lakes';
  return `lakes:${LOOK_IDS.filter(look => looks.has(look)).join(',')}`;
}
export function groundDefines(family: GroundFamily, beach: boolean, extras?: readonly GroundExtra[]): Record<string, string> {
  const defines: Record<string, string> = {};
  if (family !== 'no-lakes') {
    defines.GROUND_LAKES = '';
    const selected = family === 'full-lakes' ? LOOK_IDS : family.slice(6).split(',');
    for (const look of LOOK_IDS) if (selected.includes(look)) defines[`GROUND_LAKE_${look.toUpperCase()}`] = '';
  }
  if (beach) defines.GROUND_BEACH = '';
  if (extras) { defines.GROUND_SPECIALIZED = ''; for (const extra of GROUND_EXTRAS) if (extras.includes(extra)) defines[`GROUND_${extra}`] = ''; }
  return defines;
}
