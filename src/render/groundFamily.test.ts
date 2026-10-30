import { expect, it } from 'vitest';
import { groundDefines, groundFamily, type GroundFamily } from './groundFamily';

it('specializes only unforced ordinary-water maps and retains lava/mixed/zoo/unknown paths', () => {
  expect(groundFamily(false, null)).toBe('no-lakes');
  expect(groundFamily(true, new Set(['water']))).toBe('water-only-lakes');
  for (const looks of [new Set(['lava']), new Set(['water', 'ice']), new Set<string>(), null]) expect(groundFamily(true, looks)).toBe('full-lakes');
  expect(groundFamily(true, new Set(['water']), true)).toBe('full-lakes');
  expect(groundFamily(true, new Set(['water']), false, true)).toBe('full-lakes');
});

it('has exactly six source/define combinations and preserves existing no-lake/full-lake defines', () => {
  const families: GroundFamily[] = ['no-lakes', 'water-only-lakes', 'full-lakes'];
  expect(new Set(families.flatMap(family => [false, true].map(beach => JSON.stringify(groundDefines(family, beach))))).size).toBe(6);
  expect(groundDefines('no-lakes', false)).toEqual({});
  expect(groundDefines('full-lakes', true)).toEqual({ GROUND_LAKES: '', GROUND_BEACH: '' });
  expect(groundDefines('water-only-lakes', false)).toEqual({ GROUND_LAKES: '', GROUND_WATER_ONLY: '' });
});
