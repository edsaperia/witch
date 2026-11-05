import { expect, it } from 'vitest';
import { LIGHT_PATTERN_GLSL, lightPatternSample, prepareLightPattern } from './lightPatterns';
import { beginLightPatterns, LIGHT_PATTERN_UNIFORMS, trimLightPatterns, writeLightPattern } from './lightPatternUniforms';

it('prepares the same spatially constant flicker for signed and large phases', () => {
  for (const phase of [-10000, -3, 0, .2, 9, 10000]) for (const scale of [.01, .1, 6, 100]) {
    const [inverse, wave] = prepareLightPattern(scale, phase), packedPhase = Math.fround(phase);
    const reference = lightPatternSample({ x: 2, y: 3, z: 4 }, { x: 0, y: 0, z: 0 },
      { kind: 'flicker', scale, contrast: .5, angle: 0, phase: packedPhase });
    expect(.5 + .5 * wave).toBeCloseTo(reference[0], 14);
    expect(inverse).toBe(1 / Math.max(.1, Math.fround(scale)));
  }
});
it('packs prepared values in the existing slots and clears replaced/truncated entries', () => {
  beginLightPatterns(); writeLightPattern(0, [4, 6, .5, 9]); writeLightPattern(1, [5, 3, .75, 14]);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[0].toArray()).toEqual([4, 1 / 6, .5, prepareLightPattern(6, 9)[1]]);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[1].toArray()).toEqual([5, 1 / 3, .75, 14]);
  trimLightPatterns(1); expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[1].lengthSq()).toBe(0);
  writeLightPattern(0); expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[0].lengthSq()).toBe(0);
  expect(Object.keys(LIGHT_PATTERN_UNIFORMS)).toEqual(['uLightPattern']);
});
it('reuses light distance for rings without changing the spatial field', () => {
  for (const x of [-100, -1, 0, .001, 10]) for (const y of [-8, 0, 4]) for (const z of [-10, 0, 1]) for (const scale of [.1, 3, 100]) {
    const a = Math.hypot(x / scale, y / scale, z / scale), b = Math.hypot(x, y, z) / scale;
    expect(a).toBeCloseTo(b, 11);
  }
  expect(LIGHT_PATTERN_GLSL).toContain('atan(p.z, p.x)'); // rejected algebra retains the original centre guard/look
  expect(LIGHT_PATTERN_GLSL).toContain('wave = pattern.w');
  expect(LIGHT_PATTERN_GLSL).toContain('lightDistance * pattern.y');
});
