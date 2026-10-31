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

/** Amplify the existing watching motion without modifying saved tuning or simulation. */
export function potionWatching(base: { on: boolean; radius: number; lean: number; lag: number } | undefined, amount: number) {
  const k = Math.max(0, Math.min(1, amount)), p = potionSettings('the-audience');
  const normal = base ?? { on: false, radius: 9, lean: 0, lag: .45 };
  if (!k) return normal;
  return { on: true, radius: normal.radius + (p.radius - normal.radius) * k,
    lean: (normal.on ? normal.lean : 0) * (1 - k) + p.lean * k,
    lag: normal.lag + (p.lag - normal.lag) * k };
}

/** Deform existing legs only; the trip envelope never changes simulation size or reach. */
export function stiltwalkerShape(amount: number): { length: number; tip: number; strength: number } {
  const k = Math.max(0, Math.min(1, amount)), p = potionSettings('stiltwalkers');
  return { length: 1 + (p.length - 1) * k, tip: k ? p.tip : 1, strength: k };
}

export const tripIndicatorStrength = (g: Game): number => effectEnvelope(g.mushrooms?.trips[g.witches[0]?.id ?? 0], g.clock.time);

/** Grow the existing scene pixels in whole display-pixel steps; expiry restores its exact baseline. */
export function chunkyPixelSize(base: number, dpr: number, amount: number): number {
  if (amount <= 0) return base;
  const scale = 1 + (potionSettings('chunky').multiplier - 1) * amount;
  if (scale === 1) return base;
  return Math.max(base, Math.round(base * scale * dpr) / dpr);
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
/** Lower the existing camera toward its focus, without changing saved camera or flight settings. */
export const wormsEyeCamera = (angle: number, distance: number, amount: number) => {
  if (amount <= 0) return { angle, distance };
  const p = potionSettings('worm-s-eye');
  return { angle: angle + (p.angle - angle) * amount, distance: distance * (1 + (p.distance - 1) * amount) };
};
export const potionLevels = (black: number, gamma: number, amount: number) => {
  const p = potionSettings('thick-canopy');
  return { black: black + (p.blackFloor - black) * amount, gamma: gamma * (1 + (p.gamma - 1) * amount), saturation: 1 + (p.saturation - 1) * amount };
};
/** Existing tone controls recover dark detail; no extra screen pass or changes to saved lighting. */
export function nightVisionLevels(black: number, gamma: number, grade: number, amount: number) {
  if (amount <= 0) return { black, gamma, grade };
  const p = potionSettings('night-vision');
  return { black: black + (p.blackFloor - black) * amount,
    gamma: gamma * (1 + (1 / p.brightness - 1) * amount),
    grade: grade * (1 + (p.grade - 1) * amount) };
}
