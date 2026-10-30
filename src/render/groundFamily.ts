export type GroundFamily = 'no-lakes' | 'water-only-lakes' | 'full-lakes';
/** Lake looks are fixed with the map. Forced looks and zoo maps keep the existing complete shader. */
export function groundFamily(hasLakes: boolean, looks: ReadonlySet<string> | null, forced = false, zoo = false): GroundFamily {
  if (!hasLakes) return 'no-lakes';
  if (!forced && !zoo && looks?.size && [...looks].every(look => look === 'water')) return 'water-only-lakes';
  return 'full-lakes';
}
export function groundDefines(family: GroundFamily, beach: boolean): Record<string, string> {
  return { ...(family !== 'no-lakes' ? { GROUND_LAKES: '' } : {}), ...(family === 'water-only-lakes' ? { GROUND_WATER_ONLY: '' } : {}), ...(beach ? { GROUND_BEACH: '' } : {}) };
}
