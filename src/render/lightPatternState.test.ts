import { expect, it } from 'vitest';
import { newBeatClock, timeAt } from '../rules/beat';
import { IDENTITY_PATTERN, PatternSlots, patternOptions, sourcePattern, speakerPattern, setGentleLanternPattern, type PackedPattern } from './lightPatternState';
it('has one explicit off switch and three repeatable soundsystem looks', () => {
  const clock = newBeatClock(120);
  expect(patternOptions('?patternlight=off')).toBe('off');
  expect(patternOptions('?patternlight=unknown')).toBe('off');
  expect(patternOptions('')).toBe('off');
  expect(patternOptions('?patternlight=auto')).toBe('auto');
  expect(speakerPattern(clock, 10, 'off', false)).toBe(IDENTITY_PATTERN);
  expect(speakerPattern(clock, 10, 'auto', true)).toBe(IDENTITY_PATTERN);
  expect(speakerPattern(clock, 10, 'stripes', false)[2]).toBe(.9);
  expect([8, 72, 136].map(beat => speakerPattern(clock, timeAt(clock, beat), 'auto', false)[0])).toEqual([1, 2, 3]);
  expect(speakerPattern(clock, timeAt(clock, 64), 'auto', false)[2]).toBe(0);
});
it('forces the opt-in speaker and home lantern off with reduced flashing', () => {
  const look = patternOptions('?patternlight=auto'), clock = newBeatClock(120);
  expect(look).toBe('auto');
  expect(speakerPattern(clock, 20, look, false)[2]).toBe(.9);
  expect(speakerPattern(clock, 20, look, true)).toBe(IDENTITY_PATTERN);
  const lantern: { pattern?: PackedPattern } = {};
  setGentleLanternPattern(lantern, 20, look, false); expect(lantern.pattern?.[2]).toBe(.5);
  setGentleLanternPattern(lantern, 20, look, true); expect(lantern.pattern).toBeUndefined();
});
it('respects existing physical slots and releases/replaces patterned metadata without leaking across frames', () => {
  const slots = new PatternSlots(24), pattern = sourcePattern('rings', 12, false);
  slots.begin();
  for (let i = 0; i < 24; i++) slots.write(i, pattern);
  expect(slots.used).toBe(3);
  expect([...slots.data.slice(12)]).toEqual(Array(84).fill(0));
  slots.write(1); expect(slots.used).toBe(2);
  slots.write(7, pattern); expect(slots.used).toBe(3);
  slots.write(-1, pattern); slots.write(24, pattern); expect(slots.used).toBe(3);
  slots.begin(); expect(slots.used).toBe(0); expect(slots.data.every(x => x === 0)).toBe(true);
});
it('gentle sources use world time and comfort keeps exact identity', () => {
  expect(sourcePattern('flicker', 12, false)[2]).toBe(.5);
  expect(sourcePattern('rings', 12, false)[2]).toBe(.75);
  expect(sourcePattern('flicker', 12, true)).toBe(IDENTITY_PATTERN);
  expect(sourcePattern('rings', 12, false)).toEqual(sourcePattern('rings', 12, false));
});
it('tags only the existing lantern entry when preview is on and comfort is off', () => {
  const original = { x: 2, y: 3, z: 4, reach: 50, strength: 2, rgb: [1, .8, .4] };
  const lantern: typeof original & { pattern?: PackedPattern } = { ...original };
  const other: typeof lantern = { ...original }, lights = [lantern, other];
  setGentleLanternPattern(lights[0], 20, 'auto', false);
  expect(lantern.pattern).toEqual(sourcePattern('flicker', 20, false));
  expect({ ...lantern, pattern: undefined }).toEqual({ ...original, pattern: undefined });
  expect(other).toEqual(original); expect(lights).toHaveLength(2);
  setGentleLanternPattern(lantern, 20, 'off', false); expect(lantern.pattern).toBeUndefined();
  setGentleLanternPattern(lantern, 20, 'bands', false); expect(lantern.pattern?.[0]).toBe(4);
  setGentleLanternPattern(lantern, 20, 'bands', true); expect(lantern.pattern).toBeUndefined();
  setGentleLanternPattern(undefined, 20, 'auto', false);
});
