import { describe, expect, it } from "vitest";
import { ik2, followChain, footCycle, dutyFactor, rigDirection, rigWorld, RigBody } from "./rig";

describe("the live rig (#79 stage 5)", () => {
  it("solves a two-bone leg exactly: the bones keep their lengths and the foot reaches its target", () => {
    for (const [fx, fy] of [[0.1, -0.8], [0.4, -0.5], [-0.3, -0.6], [0, -0.3]]) {
      const [kx, ky, ex, ey] = ik2(0, 0, fx, fy, 0.5, 0.45, 1);
      expect(Math.hypot(kx, ky)).toBeCloseTo(0.5, 6);
      expect(Math.hypot(ex - kx, ey - ky)).toBeCloseTo(0.45, 6);
      expect(ex).toBeCloseTo(fx, 6); expect(ey).toBeCloseTo(fy, 6);
    }
  });
  it("pulls an unreachable foot in rather than breaking the leg, and bends the knee the way it's told", () => {
    const [kx, ky, ex, ey] = ik2(0, 0, 0, -3, 0.5, 0.45, 1);
    expect(Math.hypot(kx, ky)).toBeCloseTo(0.5, 6);
    expect(Math.hypot(ex, ey)).toBeLessThanOrEqual(0.95);
    expect(Math.sign(ik2(0, 0, 0, -0.6, 0.5, 0.45, 1)[0])).toBe(-Math.sign(ik2(0, 0, 0, -0.6, 0.5, 0.45, -1)[0]));
  });
  it("keeps a chain's links at their length as its head moves (follow the leader)", () => {
    const n = 8, nodes = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) nodes[i * 3] = -i * 0.5;
    for (let f = 0; f < 50; f++) { nodes[0] += 0.1; nodes[2] = Math.sin(f * 0.3); followChain(nodes, n, 0.5); }
    for (let i = 1; i < n; i++) expect(Math.hypot(nodes[i * 3] - nodes[i * 3 - 3], nodes[i * 3 + 1] - nodes[i * 3 - 2], nodes[i * 3 + 2] - nodes[i * 3 - 1])).toBeCloseTo(0.5, 4);
  });
  it("steps each foot on its phase: down for the duty factor, sliding back, then lifted forward", () => {
    expect(footCycle(0, 0.6)).toEqual([0.5, 0]);
    expect(footCycle(0.3, 0.6)[1]).toBe(0);
    expect(footCycle(0.8, 0.6)[1]).toBeGreaterThan(0.9);
    expect(dutyFactor(0)).toBeGreaterThan(0.5); // a walk
    expect(dutyFactor(5)).toBeLessThan(0.5); // a run
  });
  it("picks the nearest of the eight headings, the left ones the right ones mirrored", () => {
    expect(rigDirection(0)).toMatchObject({ i: 2, flip: false });
    expect(rigDirection(Math.PI)).toMatchObject({ i: 2, flip: true });
    expect(rigDirection(Math.PI / 2)).toMatchObject({ i: 4, flip: false });
    expect(rigDirection(-Math.PI / 2)).toMatchObject({ i: 0, flip: false });
    expect(rigDirection((3 * Math.PI) / 4)).toMatchObject({ i: 3, flip: true });
    // a mirrored heading puts a model point where the baked heading's sprite, flipped, shows it
    const p = [0.5, 0.2, 0.3], a = rigWorld(p, Math.PI / 4, false, 1), b = rigWorld(p, Math.PI / 4, true, 1);
    expect(b[0]).toBeCloseTo(-a[0], 9); expect(b[2]).toBeCloseTo(a[2], 9);
  });
  it("turns its body toward where it goes and feels its acceleration", () => {
    const r = new RigBody();
    r.update(0, 0, 0, 0, 1);
    let x = 0;
    for (let i = 0; i < 60; i++) { x += 0.05; r.update(x, 0, 1 / 60, 3, 0); }
    expect(Math.abs(r.heading)).toBeLessThan(0.05);
    expect(r.speed).toBeGreaterThan(2.5);
  });
});
