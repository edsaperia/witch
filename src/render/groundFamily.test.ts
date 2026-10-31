import { expect, it } from 'vitest';
import { LOOK_IDS } from '../rules/lakeLooks';
import { GROUND_EXTRAS, groundDefines, groundExtras, groundFamily } from './groundFamily';

const empty = { zoo: false, dancefloor: false, pavement: false, legends: false, legendFloor: false, koi: false, bare: false };
it('keeps each fixed ground extra independent and diagnostics conservative', () => {
  expect(groundExtras(empty)).toEqual([]);
  expect(groundExtras({ ...empty, dancefloor: true, pavement: true, legends: true, legendFloor: true })).toEqual(['DANCEFLOOR', 'PAVEMENT', 'LEGENDS', 'LEGEND_FLOOR']);
  expect(groundExtras({ ...empty, legendFloor: true })).toEqual([]);
  expect(groundExtras({ ...empty, koi: true, bare: true })).toEqual(['KOI', 'BARE']);
  expect(groundExtras({ ...empty, zoo: true })).toEqual(GROUND_EXTRAS);
  expect(groundExtras(empty, true)).toEqual(GROUND_EXTRAS);
});

it('assigns stable distinct defines for every extra mask without changing lake/beach selection', () => {
  const keys = new Set<string>();
  for (let mask = 0; mask < 1 << GROUND_EXTRAS.length; mask++) {
    const selected = GROUND_EXTRAS.filter((_, i) => mask & (1 << i));
    const plain = groundDefines('lakes:water,ice', false, selected), beach = groundDefines('lakes:water,ice', true, selected);
    expect(plain.GROUND_SPECIALIZED).toBe(''); expect(plain.GROUND_LAKE_WATER).toBe(''); expect(plain.GROUND_LAKE_ICE).toBe('');
    expect(beach).toEqual({ ...plain, GROUND_BEACH: '' });
    keys.add(JSON.stringify(plain));
  }
  expect(keys.size).toBe(256);
});

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
