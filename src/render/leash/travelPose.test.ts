import { expect, it } from 'vitest';
import { groundLinks, travelPose, type TravelPose } from './travelPose';

const air = [{ x: 0, y: 7, z: 0 }, { x: 2, y: 4, z: 0 }, { x: 4, y: 1, z: 0 }];
const ground = groundLinks([{ x: 4, z: 0 }, { x: 4, z: 3 }, { x: 0, z: 3 }, { x: 0, z: 0 }], 1);
it('lays links in sigil order around a route corner at the ordinary link spacing', () => {
  expect(ground).toHaveLength(11);
  expect(ground[3]).toEqual({ x: 0, y: .15, z: 3 });
  expect(ground[7]).toEqual({ x: 4, y: .15, z: 3 });
  expect(ground.at(-1)).toEqual({ x: 4, y: .15, z: 0 });
});
it('starts each transition at the current pose, including a rejoin halfway through a fall', () => {
  const state: TravelPose = {};
  travelPose(state, false, air, 0, .5);
  expect(travelPose(state, true, ground, 1, .5)).toEqual(air);
  const falling = travelPose(state, true, ground, 1.25, .5);
  expect(falling[0].y).toBeCloseTo((7 + .15) / 2);
  const lifting = travelPose(state, false, air, 1.25, .5);
  expect(lifting).toHaveLength(falling.length);
  lifting.forEach((p, i) => expect(p.y).toBeCloseTo(falling[i].y));
  expect(travelPose(state, false, air, 1.75, .5)).toBe(air);
});
it('reaches the ground in the configured time and lifts the sigil end first', () => {
  const state: TravelPose = {};
  travelPose(state, false, air, 0, 1);
  travelPose(state, true, ground, 0, 1);
  expect(travelPose(state, true, ground, 1, 1)).toBe(ground);
  travelPose(state, false, air, 1, 1);
  const lifting = travelPose(state, false, air, 1.2, 1);
  expect(lifting[0].y).toBeGreaterThan(.15);
  expect(lifting.at(-1)!.y).toBe(.15);
});
