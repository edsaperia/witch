import { expect, test } from 'vitest';
import { deckOf, keepInHouse, onFloor } from './treehouse';
import { nearestRoomFloor } from './houseRooms';
import { newWitch, stepWitch } from './witch';
import { TUNING } from './tuning';

const bounds = { minX: -10000, minZ: -10000, maxX: 10000, maxZ: 10000 };
const deck = () => deckOf({ treehouse: { x: 0, z: 0 } }, TUNING)!;

test('treehouse walking is20percent faster than the prior7.5m/s, without changing flight', () => {
  const d = deck();
  expect(d.house!.walk).toBe(7.5 * 1.2);
  const start = { ...newWitch(0, 0), perch: true }, intent = { moveX: 1, moveZ: 0, toggleMode: false };
  const old = stepWitch(start, intent, 0.1, TUNING, bounds, undefined, { ...d, house: { ...d.house!, walk: 7.5 } });
  const w = stepWitch(start, intent, 0.1, TUNING, bounds, undefined, d);
  expect(w.x / old.x).toBeCloseTo(1.2); // Same acceleration, twenty-percent higher walking pace.
});

test('every treehouse floor edge is open, with a safe return point on that edge', () => {
  const d = deck();
  for (const [x, z] of [[1000, 0], [-1000, 0], [0, 1000], [0, -1000]]) {
    const edge = keepInHouse(d, x, z);
    expect(edge.off).toBe(true);
    expect(onFloor(d, edge.x, edge.z)).toBe(true);
  }
});

test('walking off without a broom returns to the departure edge after the thud pause', () => {
  const d = deck(); d.house!.fall.on = true;
  const n = nearestRoomFloor(d.house!.rooms!, 1000, 0)!;
  const len = Math.hypot(1000 - n.x, n.z), intent = { moveX: (1000 - n.x) / len, moveZ: -n.z / len, toggleMode: false };
  let w = stepWitch({ ...newWitch(n.x, n.z), perch: true }, intent, 0.2, TUNING, bounds, undefined, d);
  expect(w.falling).toBe(0);
  const departure = keepInHouse(d, w.x, w.z);
  w = stepWitch(w, intent, d.house!.fall.time, TUNING, bounds, undefined, d);
  expect(w.falling).toBeDefined();
  w = stepWitch(w, intent, (d.house!.fall.beat ?? 0) + 0.01, TUNING, bounds, undefined, d);
  expect(w.falling).toBeUndefined();
  expect(w.perch).toBe(true);
  expect(Math.hypot(w.x - departure.x, w.z - departure.z)).toBeLessThan(0.01);
  expect(onFloor(d, w.x, w.z)).toBe(true);
});

test('with a broom the same open edge starts flight instead of a fall', () => {
  const d = deck(); d.house!.fall.on = false;
  const n = nearestRoomFloor(d.house!.rooms!, -1000, 0)!;
  const len = Math.hypot(-1000 - n.x, n.z);
  const w = stepWitch({ ...newWitch(n.x, n.z), perch: true }, { moveX: (-1000 - n.x) / len, moveZ: -n.z / len, toggleMode: false }, 0.2, TUNING, bounds, undefined, d);
  expect(w.mode).toBe('rising');
  expect(w.falling).toBeUndefined();
});
