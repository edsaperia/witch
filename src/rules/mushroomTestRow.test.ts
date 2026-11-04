import {describe, expect, it} from 'vitest';
import {mushroomRow} from './mushroomTestRow';
import {generateMap} from './map';
import {Forest} from './forest';
import {TUNING} from './tuning';
import {MUSHROOM_LIGHT_DEFAULTS} from './mushroomLight';
import {MUSHROOM_COLOURS, syncMushroomTestRow, type MushroomState} from './mushrooms';
import {onLake} from './lakes';

describe('optional mushroom light test row', () => {
  it('is centred 40m south, east-west and 10m apart when clear', () => {
    const row = mushroomRow({x: 100, z: 200}, 9, () => true)!;
    expect(row).toEqual(Array.from({length: 9}, (_, i) => ({x: 60 + i * 10, z: 240})));
  });
  it('nudges every sample by the same deterministic offset, never onto blocked ground', () => {
    const clear = (x: number, z: number) => z >= 44 && Math.abs(x) > 1;
    const row = mushroomRow({x: 0, z: 0}, 9, clear)!;
    expect(row).toEqual(mushroomRow({x: 0, z: 0}, 9, clear));
    expect(row.every(p => clear(p.x, p.z))).toBe(true);
    for (let i = 1; i < row.length; i++) expect([row[i].x - row[i - 1].x, row[i].z - row[i - 1].z]).toEqual([10, 0]);
    expect(mushroomRow({x: 0, z: 0}, 9, () => false)).toBeNull();
  });
  for (const seed of [123, 1000, 165272]) it(`places every kind safely on map seed ${seed}, without duplicate samples or replenishing a picked sample on toggle`, () => {
    const map = generateMap(seed, TUNING), forest = new Forest(map), mushrooms = {patches: []} as unknown as MushroomState;
    const tuning = {...TUNING, mushroomLight: {...MUSHROOM_LIGHT_DEFAULTS}};
    const g = {map, forest, mushrooms, tuning};
    syncMushroomTestRow(g); expect(mushrooms.patches).toEqual([]);
    tuning.mushroomLight.testRow = true; syncMushroomTestRow(g);
    const row = mushrooms.patches; expect(row.map(p => p.type)).toEqual([...MUSHROOM_COLOURS]);
    for (const p of row) {
      expect(onLake(map.bounds, p.x, p.z, 2)).toBe(false); expect(map.clearOfStones(p.x, p.z, 2)).toBe(true); expect(map.reserved(p.x, p.z, 2)).toBe(false);
      for (const [items, gap] of [[forest.treesNear(p.x, p.z, 4), 3], [forest.bushesNear(p.x, p.z, 4), 3], [forest.decorNear(p.x, p.z, 5), 4], [forest.wallsNear(p.x, p.z, 9), 8], [forest.bedsNear(p.x, p.z, 9), 8], [forest.setPiecesNear(p.x, p.z, 13), 12], [forest.relicsNear(p.x, p.z, 13), 12]] as const)
        expect(items.every(o => Math.hypot(o.x - p.x, o.z - p.z) >= gap)).toBe(true);
    }
    for (let i = 1; i < row.length; i++) expect([row[i].x - row[i - 1].x, row[i].z - row[i - 1].z]).toEqual([10, 0]);
    row[0].picked = true; syncMushroomTestRow(g); expect(mushrooms.patches).toHaveLength(9);
    tuning.mushroomLight.testRow = false; syncMushroomTestRow(g); expect(mushrooms.patches).toEqual([]);
    tuning.mushroomLight.testRow = true; syncMushroomTestRow(g); expect(mushrooms.patches[0]).toBe(row[0]); expect(row[0].picked).toBe(true);
  });
});
