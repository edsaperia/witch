import { expect, test } from 'vitest';
import { insideTreehouseCanopy, treehouseVisible } from './treehouseVisibility';

test('rooms stay hidden from the ground, including behind the tree', () => {
  expect(treehouseVisible({ mode: 'ground' }, true)).toBe(false);
  expect(treehouseVisible({ mode: 'ground' }, false)).toBe(false);
  expect(treehouseVisible({ mode: 'ground', perch: true }, true)).toBe(true);
});
test('treetop entry reveals rooms only within the crown footprint', () => {
  const dome = { cx: 0, cz: 0, rx: 100, rz: 50 };
  expect(insideTreehouseCanopy({ x: 20, z: 10 }, dome)).toBe(true);
  expect(insideTreehouseCanopy({ x: 20, z: 100 }, dome)).toBe(false);
  expect(treehouseVisible({ mode: 'treetop' }, true)).toBe(true);
  expect(treehouseVisible({ mode: 'treetop' }, false)).toBe(false);
  expect(treehouseVisible({ mode: 'descending', perch: true }, true)).toBe(true);
});
