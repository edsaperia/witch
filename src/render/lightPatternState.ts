// Frame-local bounded metadata for EXISTING light slots. No added lights, textures or simulation state.
import { beatAt, type BeatClock } from '../rules/beat';
import { LIGHT_PATTERN, lightPatternPhase, patternContrast, PATTERN_DEFAULTS, type LightPatternKind } from './lightPatterns';
export type PatternLook = 'auto' | 'off' | 'spokes' | 'stripes' | 'bands';
export type PackedPattern = readonly [number, number, number, number];
export const IDENTITY_PATTERN: PackedPattern = [0, 1, 0, 0];
export const patternOptions = (search: string): PatternLook => {
  const value = new URLSearchParams(search).get('patternlight');
  if (value === 'off') return 'off';
  return value === 'spokes' || value === 'stripes' || value === 'bands' ? value : 'auto';
};
export const PATTERN_LOOK = patternOptions(globalThis.location?.search ?? '');
const smooth = (x: number) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };

/** All music-driven looks share the game's absolute beat clock; gently fade at look boundaries. */
export function speakerPattern(clock: BeatClock, time: number, look: PatternLook, calm: boolean): PackedPattern {
  if (look === 'off' || calm) return IDENTITY_PATTERN;
  const beat = Math.max(0, beatAt(clock, time)), cycle = beat / 64;
  const kind = look === 'auto' ? (['spokes', 'stripes', 'bands'] as const)[Math.floor(cycle) % 3] : look;
  const within = beat % 64, envelope = look === 'auto' ? smooth(within / 4) * smooth((64 - within) / 4) : 1;
  return [LIGHT_PATTERN[kind], PATTERN_DEFAULTS.scale, patternContrast(PATTERN_DEFAULTS.contrast * envelope, true, calm), lightPatternPhase(clock, time)];
}
export function sourcePattern(kind: LightPatternKind, worldTime: number, calm: boolean): PackedPattern {
  return calm ? IDENTITY_PATTERN : [LIGHT_PATTERN[kind], kind === 'rings' ? 3 : 6,
    patternContrast(kind === 'flicker' ? .5 : .75, true, calm), worldTime * (kind === 'flicker' ? .45 : .7)];
}

/** Tag one existing home light only; never change its incident-light data. */
export function setGentleLanternPattern(light: { pattern?: PackedPattern } | undefined, time: number, look: PatternLook, calm: boolean): void {
  if (light) light.pattern = look !== 'off' && !calm ? sourcePattern('flicker', time, false) : undefined;
}

/** Clears every slot each frame, and also when another writer replaces that slot. */
export class PatternSlots {
  readonly data: Float32Array;
  private count = 0;
  constructor(readonly slots: number, readonly cap = PATTERN_DEFAULTS.projectorCap) { this.data = new Float32Array(slots * 4); }
  begin(): void { this.data.fill(0); this.count = 0; }
  write(slot: number, pattern: PackedPattern = IDENTITY_PATTERN): void {
    if (!Number.isInteger(slot) || slot < 0 || slot >= this.slots) return;
    const at = slot * 4;
    if (this.data[at] > 0) this.count--;
    this.data.fill(0, at, at + 4);
    if (!(pattern[0] > 0 && pattern[2] > 0) || this.count >= this.cap || !pattern.every(Number.isFinite)) return;
    this.data.set(pattern, at); this.count++;
  }
  get used(): number { return this.count; }
}
