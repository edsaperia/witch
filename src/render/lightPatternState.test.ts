import { expect, it } from 'vitest';
import { newBeatClock, timeAt } from '../rules/beat';
import { IDENTITY_PATTERN, PatternSlots, patternOptions, sourcePattern, speakerPattern } from './lightPatternState';
it('has one explicit off switch and three repeatable soundsystem looks', () => {
  const clock = newBeatClock(120);
  expect(patternOptions('?patternlight=off')).toBe('off');
  expect(patternOptions('?patternlight=unknown')).toBe('auto');
  expect(speakerPattern(clock, 10, 'off', false)).toBe(IDENTITY_PATTERN);
  expect(speakerPattern(clock, 10, 'auto', true)).toBe(IDENTITY_PATTERN);
  expect([8, 72, 136].map(beat => speakerPattern(clock, timeAt(clock, beat), 'auto', false)[0])).toEqual([1, 2, 3]);
  expect(speakerPattern(clock, timeAt(clock, 64), 'auto', false)[2]).toBe(0);
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
  expect(sourcePattern('flicker', 12, false)[2]).toBe(.16);
  expect(sourcePattern('flicker', 12, true)).toBe(IDENTITY_PATTERN);
  expect(sourcePattern('rings', 12, false)).toEqual(sourcePattern('rings', 12, false));
});
