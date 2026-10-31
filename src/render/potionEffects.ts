// View-only changes derived anew each frame; never mutate saved tuning.
import type { Game } from '../rules/game';
import { effectEnvelope, potionRecipe } from '../rules/potionRecipes';
import { potionSettings } from '../rules/potionSettings';
import type { PostTuning } from './post';

/** Same effective tilt settings for the scene and its world-space DOM overlays. */
export function miniatureTilt(base: PostTuning['tiltShift'], amount: number): PostTuning['tiltShift'] {
  const k = Math.max(0, Math.min(1, amount));
  if (!k) return base;
  const p = potionSettings('miniature'), mix = (a: number, b: number) => a + (b - a) * k;
  return { ...base, on: true, strength: mix(base.on ? base.strength : 0, p.blur),
    band: mix(base.band, p.band), centre: mix(base.centre, p.centre),
    treetop: { ...base.treetop, strength: mix(base.on ? base.treetop.strength : 0, p.blur), band: mix(base.treetop.band, p.band) } };
}

export const tripIndicatorStrength = (g: Game): number => effectEnvelope(g.mushrooms?.trips[g.witches[0]?.id ?? 0], g.clock.time);

/** Rotation about the neutral RGB axis: greys stay grey; 120 degrees permutes channels. */
export function hueRotation(phase: number): [number, number, number] {
  const c = Math.cos(phase), s = Math.sin(phase) / Math.sqrt(3), k = (1 - c) / 3;
  return [c + k, k - s, k + s];
}

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
