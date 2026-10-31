import { expect, it } from 'vitest';
import { lakeKindAblation } from './ground-parity-scene.mjs';

it('removes water-only regions without depending on compiled-out lake looks', () => {
  const distances = new Float32Array([12, 4, -3]);
  expect([...lakeKindAblation(distances, new Uint8Array([0, 0, 0]), 0)]).toEqual([-1000, -1000, -1000]);
  expect([...distances]).toEqual([12, 4, -3]);
});

it('ablates each requested kind independently and rejects absent or mismatched fixtures', () => {
  const distances = new Float32Array([12, 4, -3, 8]), looks = new Uint8Array([0, 2, 0, 2]);
  expect([...lakeKindAblation(distances, looks, 0)]).toEqual([-1000, 4, -1000, 8]);
  expect([...lakeKindAblation(distances, looks, 2)]).toEqual([12, -1000, -3, -1000]);
  expect(() => lakeKindAblation(distances, looks, 1)).toThrow('absent from fixture');
  expect(() => lakeKindAblation(distances, new Uint8Array(1), 0)).toThrow('size mismatch');
});
