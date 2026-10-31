// View-only changes derived anew each frame; never mutate saved tuning.
import type { Game } from '../rules/game';
import { effectEnvelope, potionRecipe } from '../rules/potionRecipes';
import { potionSettings } from '../rules/potionSettings';

/** Amplify the existing watching motion without modifying saved tuning or simulation. */
export function potionWatching(base: { on: boolean; radius: number; lean: number; lag: number } | undefined, amount: number) {
  const k = Math.max(0, Math.min(1, amount)), p = potionSettings('the-audience');
  const normal = base ?? { on: false, radius: 9, lean: 0, lag: .45 };
  if (!k) return normal;
  return { on: true, radius: normal.radius + (p.radius - normal.radius) * k,
    lean: (normal.on ? normal.lean : 0) * (1 - k) + p.lean * k,
    lag: normal.lag + (p.lag - normal.lag) * k };
}

export const tripIndicatorStrength = (g: Game): number => effectEnvelope(g.mushrooms?.trips[g.witches[0]?.id ?? 0], g.clock.time);

export function potionStrength(g: Game, effect: string): number {
  const trip = g.mushrooms?.trips[g.witches[0]?.id ?? 0];
  const recipe = trip && potionRecipe(trip.key);
  return recipe && !recipe.comingSoon && recipe.effect === effect ? effectEnvelope(trip, g.clock.time) : 0;
}
export const potionBend = (base: number, treetop: number, ravine: number, planet: number): number => {
  const r = potionSettings('ravine'), p = potionSettings('little-planet');
  return base * (1 - ravine) - Math.max(r.minimumBend, treetop * r.bendMultiplier) * ravine + Math.max(p.minimumBend, treetop * p.bendMultiplier) * planet;
};
export const potionBloom = (threshold: number, strength: number, amount: number) => {
  const p = potionSettings('glow-up');
  return { threshold: threshold * (1 + (p.thresholdScale - 1) * amount), strength: strength + Math.max(p.minimumBoost, strength * p.strengthMultiplier) * amount };
};
/** The flight's exaggeration follows her existing lift, so landing restores the normal camera. */
export const vertigoAmount = (strength: number, lift: number): number => strength * Math.max(0, Math.min(1, lift));
export const potionCamera = (angle: number, distance: number, fov: number, amount: number) => {
  const p = potionSettings('vertigo');
  return { angle: angle + (p.angle - angle) * amount * p.angleMix, distance: distance * (1 + (p.distance - 1) * amount), fov: fov + (p.fov - fov) * amount };
};
export const potionLevels = (black: number, gamma: number, amount: number) => {
  const p = potionSettings('thick-canopy');
  return { black: black + (p.blackFloor - black) * amount, gamma: gamma * (1 + (p.gamma - 1) * amount), saturation: 1 + (p.saturation - 1) * amount };
};
