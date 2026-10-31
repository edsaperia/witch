import { expect, it } from 'vitest';
import { emptyBaskets, type MushroomState } from '../rules/mushrooms';
import { mushroomStock, restoreMushroomStock, saveMushroomStock, loadMushroomStock } from './mushroomStock';
import { SaveSlots } from './saveSlots';
const state = () => ({ baskets: emptyBaskets(), carried: { 0: ['blue'] }, flights: [] } as unknown as MushroomState);
it('keeps mushroom supplies separate between save slots on the same world', () => {
  const data = new Map<string, string>();
  const slots = new SaveSlots({ getItem: k => data.get(k) ?? null, setItem: (k, v) => { data.set(k, v); } });
  const first = slots.active(), second = slots.create().id;
  const a = state(); a.baskets.red = 20;
  saveMushroomStock(a, 0, slots.storage(first));
  const b = state(); loadMushroomStock(b, 0, slots.storage(second));
  expect(b.baskets.red).toBe(0);
  loadMushroomStock(b, 0, slots.storage(first)); expect(b.baskets.red).toBe(20);
});
it('carries baskets, bags and unloading mushrooms exactly once into a fresh night', () => {
  const a = state(); a.baskets.red = 7;
  a.flights.push({ id: 1, witch: 0, type: 'pink', kind: 'unload', from: { x: 0, z: 0 }, to: { x: 1, z: 1 }, at: 0, lands: 1 });
  const b = state(); restoreMushroomStock(b, mushroomStock(a));
  expect(b.baskets.red).toBe(7); expect(b.baskets.pink).toBe(1); expect(b.carried[0]).toEqual(['blue']);
  b.carried[0].push('white'); expect(a.carried[0]).toEqual(['blue']);
});
it('separates campaigns and rejects malformed stock', () => {
  const data = new Map<string, string>(), store = { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); } };
  const a = state(); a.baskets.orange = 20; saveMushroomStock(a, 1, store);
  const b = state(); loadMushroomStock(b, 1, store); expect(b.baskets.orange).toBe(20);
  const c = state(); loadMushroomStock(c, 2, store); expect(c.baskets.orange).toBe(0);
  restoreMushroomStock(c, { baskets: { red: -5, blue: 2.5 }, carried: { 0: ['blue', 'unknown'], bad: ['red'] } });
  expect(c.baskets).toEqual(emptyBaskets()); expect(c.carried).toEqual({ 0: ['blue'] });
});
