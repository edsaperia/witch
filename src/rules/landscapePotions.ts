import type { Game } from "./game";
import { effectEnvelope, potionRecipe } from "./potionRecipes";
import { waveCountdown } from "./party";
import { potionSettings } from "./potionSettings";

// Stable recipe IDs also select the corresponding shader branch. Filter cutoff
// and modulation describe how the same scene signal colours the existing mix.
export const LANDSCAPE_POTIONS = {
  "walking-wood": { id: 6, cutoff: 1050, sweep: .9 },
  "giant-trees": { id: 25, cutoff: 720, sweep: .3 },
  "concertina": { id: 65, cutoff: 1700, sweep: 1.6 },
  "seeing-through-seeing": { id: 75, cutoff: 6200, sweep: .4 },
  "held-breath": { id: 78, cutoff: 900, sweep: 2 },
  "out-of-time": { id: 79, cutoff: 2200, sweep: 1.1 },
  "distant-giants": { id: 82, cutoff: 1400, sweep: .6 },
  "underwater-light": { id: 89, cutoff: 1150, sweep: .65 },
  "inside-out-relief": { id: 92, cutoff: 3100, sweep: .8 },
  "living-bark": { id: 93, cutoff: 1950, sweep: .75 },
} as const;
export type LandscapeEffect = keyof typeof LANDSCAPE_POTIONS;

export function landscapeEffect(name?: string): LandscapeEffect | undefined {
  return name && Object.hasOwn(LANDSCAPE_POTIONS, name) ? name as LandscapeEffect : undefined;
}

export function landscapeState(g: Game) {
  const trip = g.mushrooms?.trips[g.witches[0]?.id ?? 0];
  if (!trip) return;
  const recipe = potionRecipe(trip.key), effect = landscapeEffect(recipe?.effect);
  if (!effect || recipe?.comingSoon) return;
  const amount = effectEnvelope(trip, g.clock.time);
  if (!amount) return;
  const setting = potionSettings(effect).value;
  const phase = effect === "held-breath" ? (g.party?.pulse ? waveCountdown(g.party, g.map, g.clock.time).gone : 0) : g.clock.time;
  return { ...LANDSCAPE_POTIONS[effect], effect, amount, setting, phase };
}

export function concertinaOffset(x: number, centre: number, amount: number, wavelength: number): number {
  const k = 2 * Math.PI / wavelength;
  return amount * .9 / k * (Math.sin(x * k) - Math.sin(centre * k));
}

export function borrowedClock(time: number, amount: number, excursion: number): number {
  return time + amount * excursion * (1 + Math.sin(time * .75));
}
