import { expect, it } from 'vitest';
import { potionBlackout, potionFall } from './potionChoreography';
const p = { at: 10, fallAt: 14, landAt: 15, wakeAt: 17, freeAt: 20 };
it('hides the fall from the participant and restores sight while she still rests', () => {
  expect(potionBlackout(p, 10)).toBe(0);
  expect(potionBlackout(p, 11)).toBeGreaterThan(0);
  expect(potionBlackout(p, 14.5)).toBe(1);
  expect(potionBlackout(p, 17)).toBe(1);
  expect(potionBlackout(p, 19)).toBe(0);
  expect(potionBlackout(undefined, 19)).toBe(0);
});
it('accelerates downwards and finishes at ground level', () => {
  expect(potionFall(p, 13)).toBe(0);
  expect(potionFall(p, 14.5)).toBe(.25);
  expect(potionFall(p, 15)).toBe(1);
});
