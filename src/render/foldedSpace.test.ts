import { expect, it } from 'vitest';
import { bendPoint, creaseHeight, HEIGHT_UNIFORMS } from './height';

it('places fixed creases across positive and negative island coordinates and keeps the walker anchored', () => {
  const period = 40, height = 18;
  expect(creaseHeight(0, 0, height, period)).toBe(height);
  expect(creaseHeight(25, 0, height, period)).toBe(0);
  expect(creaseHeight(-25, 0, height, period)).toBe(0);
  expect(creaseHeight(50, 0, height, period)).toBe(height);
  const u = HEIGHT_UNIFORMS.uWorldFold.value, saved = u.clone();
  try {
    u.set(height, period, creaseHeight(25, 0, height, period));
    expect(bendPoint({ x: 25, y: 2, z: 0 }).y).toBe(2);
    expect(bendPoint({ x: 0, y: 2, z: 0 }).y).toBe(20);
  } finally { u.copy(saved); }
});
