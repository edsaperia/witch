import { expect, it } from 'vitest';
import { LOOK_IDS } from '../rules/lakeLooks';
import { groundDefines, groundFamily } from './groundFamily';

it('selects each lake kind independently with stable combination ordering', () => {
  expect(groundFamily(false, null)).toBe('no-lakes');
  for (const look of LOOK_IDS) {
    const family = groundFamily(true, new Set([look]));
    expect(family).toBe(`lakes:${look}`);
    expect(groundDefines(family, false)).toEqual({ GROUND_LAKES: '', [`GROUND_LAKE_${look.toUpperCase()}`]: '' });
  }
  expect(groundFamily(true, new Set(['ice', 'water']))).toBe('lakes:water,ice');
  expect(groundDefines(groundFamily(true, new Set(['lava', 'tarn'])), true)).toEqual({ GROUND_LAKES: '', GROUND_LAKE_LAVA: '', GROUND_LAKE_TARN: '', GROUND_BEACH: '' });
});

it('retains all kinds for unknown, forced, zoo and mutable diagnostic views', () => {
  for (const looks of [new Set(['unknown']), new Set<string>(), null]) expect(groundFamily(true, looks)).toBe('full-lakes');
  expect(groundFamily(true, new Set(['water']), true)).toBe('full-lakes');
  expect(groundFamily(true, new Set(['water']), false, true)).toBe('full-lakes');
  expect(groundFamily(true, new Set(['water']), false, false, true)).toBe('full-lakes');
  expect(Object.keys(groundDefines('full-lakes', false))).toEqual(['GROUND_LAKES', ...LOOK_IDS.map(look => `GROUND_LAKE_${look.toUpperCase()}`)]);
  expect(groundDefines('no-lakes', false)).toEqual({});
  expect(groundDefines('no-lakes', true)).toEqual({ GROUND_BEACH: '' });
});
