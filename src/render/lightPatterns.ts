// Drawing-only light modulation shared by ordinary sources and magic layer 4.
// Coordinates are light-local metres derived from WORLD positions, never camera or sprite UVs.
import { beatAt, type BeatClock } from '../rules/beat';

export const LIGHT_PATTERN = { none: 0, spokes: 1, stripes: 2, bands: 3, flicker: 4, rings: 5 } as const;
export type LightPatternKind = keyof typeof LIGHT_PATTERN;
export interface LightPattern { kind: LightPatternKind; scale: number; contrast: number; angle: number; phase: number }
export interface LightPoint { x: number; y: number; z: number }
export const PATTERN_DEFAULTS = { scale: 6, contrast: .3, beatsPerTurn: 32, projectorCap: 3 } as const;
const TAU = Math.PI * 2;
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/** Absolute musical phase: deterministic across frame subdivision, tempo ramps and pauses. */
export function lightPatternPhase(clock: BeatClock, gameTime: number): number {
  return beatAt(clock, gameTime) * TAU / PATTERN_DEFAULTS.beatsPerTurn;
}

/** Comfort/off returns the exact identity, not a separate animation clock or a bright flash. */
export function patternContrast(contrast: number, enabled: boolean, reduceFlashing: boolean): number {
  return enabled && !reduceFlashing && Number.isFinite(contrast) ? clamp(contrast, 0, .65) : 0;
}

export function lightLocal(point: LightPoint, origin: LightPoint, angle: number): LightPoint {
  const x = point.x - origin.x, z = point.z - origin.z, c = Math.cos(angle), s = Math.sin(angle);
  return { x: c * x + s * z, y: point.y - origin.y, z: -s * x + c * z };
}

/** CPU reference for anchoring/bounds tests and approved capture tooling; NOT a GPU validation claim. */
export function lightPatternSample(point: LightPoint, origin: LightPoint, pattern: LightPattern): [number, number, number] {
  const contrast = patternContrast(pattern.contrast, pattern.kind !== 'none', false);
  if (!contrast) return [1, 1, 1];
  const p = lightLocal(point, origin, pattern.angle), scale = Math.max(.1, pattern.scale);
  const x = p.x / scale, y = p.y / scale, z = p.z / scale, phase = pattern.phase;
  let channels: [number, number, number];
  const stripe = x + .35 * y + .25 * z;
  if (pattern.kind === 'bands') channels = [0, TAU / 3, 2 * TAU / 3].map(offset => .5 + .5 * Math.sin(stripe * TAU - phase + offset)) as [number, number, number];
  else {
    let wave = .5;
    if (pattern.kind === 'spokes') {
      // Fade out the angular singularity right at the source: no centre sparkle/alias spike.
      const r = Math.hypot(x, z), blend = clamp(r / .3, 0, 1);
      wave = 1 - blend + blend * (.5 + .5 * Math.sin(Math.atan2(z, x) * 4 - phase));
    } else if (pattern.kind === 'stripes') wave = .5 + .5 * Math.sin(stripe * TAU - phase);
    else if (pattern.kind === 'rings') wave = .5 + .5 * Math.sin(Math.hypot(x, y, z) * TAU - phase);
    else if (pattern.kind === 'flicker') wave = .5 + .3 * Math.sin(phase) + .2 * Math.sin(phase * 1.73 + 1.2);
    channels = [wave, wave, wave];
  }
  return channels.map(value => 1 - contrast + contrast * clamp(value, 0, 1)) as [number, number, number];
}

/** Shared by ground, trunks and creatures through LIGHT_GLSL. Parameters: kind/scale/contrast/phase.
 *  Rotation is supplied separately. Modulates incident RGB only; not normals, occlusion or shadows. */
export const LIGHT_PATTERN_GLSL = /* glsl */ `
vec3 lightPattern(vec3 relativeWorld, vec4 pattern, vec2 rotation) {
  if (pattern.x < 0.5 || pattern.z <= 0.0) return vec3(1.0);
  vec3 p = vec3(dot(relativeWorld.xz, rotation), relativeWorld.y,
    dot(relativeWorld.xz, vec2(-rotation.y, rotation.x))) / max(0.1, pattern.y);
  float stripe = p.x + 0.35 * p.y + 0.25 * p.z;
  float wave = 0.5;
  vec3 bands;
  if (pattern.x < 1.5) {
    float radius = length(p.xz), blend = clamp(radius / 0.3, 0.0, 1.0);
    float angle = radius < 0.00001 ? 0.0 : atan(p.z, p.x);
    wave = mix(1.0, 0.5 + 0.5 * sin(angle * 4.0 - pattern.w), blend);
  } else if (pattern.x < 2.5) wave = 0.5 + 0.5 * sin(stripe * 6.28318530718 - pattern.w);
  else if (pattern.x < 3.5) {
    bands = 0.5 + 0.5 * sin(vec3(stripe * 6.28318530718 - pattern.w) + vec3(0.0, 2.09439510239, 4.18879020479));
    return mix(vec3(1.0), clamp(bands, 0.0, 1.0), clamp(pattern.z, 0.0, 0.65));
  } else if (pattern.x < 4.5) wave = 0.5 + 0.3 * sin(pattern.w) + 0.2 * sin(pattern.w * 1.73 + 1.2);
  else wave = 0.5 + 0.5 * sin(length(p) * 6.28318530718 - pattern.w);
  return vec3(mix(1.0, clamp(wave, 0.0, 1.0), clamp(pattern.z, 0.0, 0.65)));
}
`;
