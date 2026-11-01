// Pattern metadata follows the already-selected physical light slots. All light writers use this reset/replace boundary.
import * as THREE from 'three';
import { PatternSlots, type PackedPattern } from './lightPatternState';
import { prepareLightPattern } from './lightPatterns';

/** Same capacity as the existing lighting ABI; this creates no lights or textures. */
export const PATTERN_SLOT_CAPACITY = 24;
const slots = new PatternSlots(PATTERN_SLOT_CAPACITY);
export const LIGHT_PATTERN_UNIFORMS = {
  uLightPattern: { value: Array.from({ length: PATTERN_SLOT_CAPACITY }, () => new THREE.Vector4()) },
};
export function beginLightPatterns(): void {
  slots.begin();
  for (const value of LIGHT_PATTERN_UNIFORMS.uLightPattern.value) value.set(0, 0, 0, 0);
}
export function writeLightPattern(slot: number, pattern?: PackedPattern): void {
  slots.write(slot, pattern);
  if (!Number.isInteger(slot) || slot < 0 || slot >= PATTERN_SLOT_CAPACITY) return;
  const at = slot * 4, d = slots.data;
  const value = LIGHT_PATTERN_UNIFORMS.uLightPattern.value[slot];
  if (d[at] > 0 && d[at + 2] > 0) {
    const [inverseScale, flicker] = prepareLightPattern(d[at + 1], d[at + 3]);
    value.set(d[at], inverseScale, d[at + 2], d[at] === 4 ? flicker : d[at + 3]);
  } else value.set(0, 0, 0, 0);
}
/** A later light writer may reserve/truncate world slots before filling its own; clear those too. */
export function trimLightPatterns(used: number): void {
  for (let slot = Math.max(0, Math.floor(used)); slot < PATTERN_SLOT_CAPACITY; slot++) writeLightPattern(slot);
}
export const patternedLightCount = (): number => slots.used;
