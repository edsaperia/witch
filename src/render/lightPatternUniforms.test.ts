import { afterEach, expect, it } from 'vitest';
import { beginLightPatterns, LIGHT_PATTERN_UNIFORMS, patternedLightCount, trimLightPatterns, writeLightPattern } from './lightPatternUniforms';
afterEach(beginLightPatterns);
it('packs bounded metadata, resets ordinary replacements and clears the next frame', () => {
  beginLightPatterns();
  for (let i = 0; i < 24; i++) writeLightPattern(i, [1, 6, .3, .2]);
  expect(patternedLightCount()).toBe(3);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[3].toArray()).toEqual([0, 0, 0, 0]);
  writeLightPattern(1); expect(patternedLightCount()).toBe(2);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[1].toArray()).toEqual([0, 0, 0, 0]);
  writeLightPattern(22, [5, 3, .25, 4]); expect(patternedLightCount()).toBe(3);
  trimLightPatterns(2); expect(patternedLightCount()).toBe(1);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[22].lengthSq()).toBe(0);
  writeLightPattern(2, [5, 3, .25, 4]); expect(patternedLightCount()).toBe(2);
  beginLightPatterns();
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value.every(v => v.lengthSq() === 0)).toBe(true);
  expect(patternedLightCount()).toBe(0);
});
