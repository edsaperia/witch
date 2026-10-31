// Developer recipe book. Explicit assignments stay stable when more effects are implemented.
import entries from '../../config/potion-recipes.json';
import type { MushroomColour } from './mushrooms';
export interface PotionRecipe { id: number; key: string; recipe: MushroomColour[]; effect: string; name: string; description: string; comingSoon: boolean }
export const POTION_RECIPES = entries as PotionRecipe[];
const byKey = new Map(POTION_RECIPES.map(entry => [entry.key, entry]));
export const potionRecipe = (recipe: readonly MushroomColour[] | string): PotionRecipe | undefined => byKey.get(typeof recipe === 'string' ? recipe : [...recipe].sort().join('+'));
/** Full strength on waking; fades only during the final two minutes of the ten-minute game clock. */
export function effectEnvelope(trip: { at: number; until: number } | null | undefined, time: number): number {
  return !trip || time < trip.at ? 0 : Math.max(0, Math.min(1, (trip.until - time) / 120));
}
