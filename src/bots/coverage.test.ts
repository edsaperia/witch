import { expect, test } from "vitest";
import { newCoverage } from "./coverage";
import type { Observation } from "./observe";
const frame = (t = 0, x = 0, z = 0) => ({ playerTime: t, self: { x, z }, view: { halfWidth: 40, halfDepth: 40 } }) as Observation;
test("coverage remembers only whole cells in observed rectangles and is repeatable", () => {
  const a = newCoverage(), b = newCoverage();
  for (const c of [a, b]) { c.observe(frame()); c.observe(frame()); }
  expect(a.snapshot().fullySeenCells).toBe(16);
  expect(a.snapshot().fullySeenSquareMetres).toBe(6400);
  a.observe(frame(1, 80)); expect(a.snapshot().fullySeenCells).toBe(32);
  expect(b.snapshot().fullySeenCells).toBe(16); // Unobserved gap/terrain is never filled in.
  const c = newCoverage(); c.observe(frame());
  expect(c.waypoint(frame())).toEqual(b.waypoint(frame()));
});
test("a least-seen candidate wins over a previously observed footprint and holds its waypoint", () => {
  const c = newCoverage(); c.observe(frame(0, 100)); c.observe(frame(.1));
  const target = c.waypoint(frame(.1))!;
  expect(target.x).toBeLessThan(99); // East was observed, another heading was not.
  c.observe(frame(.3, 3)); expect(c.waypoint(frame(.3, 3))).toEqual(target);
  const copy = c.snapshot(); copy.job!.x = 999;
  expect(c.waypoint(frame(.4, 4))).toEqual(target);
});
test("the waypoint deadline does not renew and there is only one episode per thirty-second interval", () => {
  const c = newCoverage(); c.observe(frame()); c.waypoint(frame());
  for (let i = 1; i < 24; i++) { const o = frame(i / 5, i); c.observe(o); c.waypoint(o); expect(c.snapshot().job?.until).toBe(4.75); }
  c.observe(frame(5, 25)); expect(c.waypoint(frame(5, 25))).toBeNull();
  c.observe(frame(29, 25)); expect(c.waypoint(frame(29, 25))).toBeNull();
  c.observe(frame(30, 25)); expect(c.waypoint(frame(30, 25))).not.toBeNull();
});
test("no observed movement abandons the heading with a bounded cooldown", () => {
  const c = newCoverage(); c.observe(frame()); c.waypoint(frame());
  expect(c.snapshot().job?.heading).toBe(0);
  c.observe(frame(1.1)); expect(c.snapshot().job).toBeNull();
  expect(c.waypoint(frame(1.2))).toBeNull();
  c.observe(frame(30)); c.waypoint(frame(30)); expect(c.snapshot().job?.heading).not.toBe(0);
});
