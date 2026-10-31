import { expect, it } from 'vitest';
import { CoastReadiness } from './coastReadiness';
it('does not compile before coast demand and starts only once across leaving/returning', () => {
  const c = new CoastReadiness(); expect(c.launch()).toBe(false);
  c.request(true, 100); expect(c.launch()).toBe(true); expect(c.launch()).toBe(false);
  c.request(false, 200); c.request(true, 300); expect(c.launch()).toBe(false);
});
it('keeps continuous fallback while linking and cannot pop fully visible across a driver stall', () => {
  const c = new CoastReadiness(); c.request(true, 0); c.launch();
  expect(c.frame(20000)).toBe(0); expect(c.fallbackMs).toBe(20000);
  c.linked = true; expect(c.frame(22000)).toBe(0.0625);
  for (let t = 22050; t <= 22750; t += 50) c.frame(t);
  expect(c.share).toBe(1);
  const wait = c.fallbackMs; c.frame(30000); expect(c.fallbackMs).toBe(wait);
  c.request(false, 30000); c.frame(40000); expect(c.fallbackMs).toBe(wait);
});
it('keeps the fast/cache-ready path immediate if no fallback frame was needed', () => {
  const c = new CoastReadiness(); c.request(true, 100); c.launch(); c.linked = true;
  expect(c.frame(101)).toBe(1); expect(c.fallbackMs).toBe(0);
});
