import { describe, expect, it } from "vitest";
import { ik2, followChain, footCycle, dutyFactor, rigDirection, rigWorld, RigBody, RigOut } from "./rig";
import type { RigMeta } from "./rigBuild";

// A four-legged body in model units: torso at the origin, legs 0.6 long, a disc of every radius.
const piece = (frame: number) => ({ frame, px: 0, py: 0 }), five = (f: number) => [0, 1, 2, 3, 4].map(i => piece(f + i));
const leg = (name: string, fore: boolean, side: number) => ({ name, fore, side, hip: [fore ? 0.4 : -0.4, 0, side * 0.15], knee: [fore ? 0.42 : -0.35, -0.3, side * 0.15], foot: [fore ? 0.4 : -0.4, -0.6, side * 0.15], r: [0.08, 0.06, 0.05], fl: 0.06, mat: 1, hoof: false }) as RigMeta["legs"][number];
const META: RigMeta = { template: "quadruped", s: 40, torso: five(0), head: five(10), tail: five(20), faces: {}, discs: { 1: Object.fromEntries([1, 2, 3, 4].map(r => [r, piece(30 + r)])) }, legs: [leg("legFN", true, 1), leg("legFF", true, -1), leg("legHN", false, 1), leg("legHF", false, -1)], neck: [0.55, 0.15, 0], headAt: [0.6, 0.2, 0], tailAt: [-0.5, 0.05, 0], top: 0.4, len: 0.5, spine: [] };
const lay = (sleep: number, droop = sleep) => { const b = new RigBody(), out = new RigOut(); b.update(0, 0, 0, 1, 0); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0, sleep, droop }, out); return out.items.slice(0, out.n).map(it => ({ f: it.piece.frame, y: it.y })); };
/** Walks a body at `speed` m/s along `dir` (radians) for `secs`, at `fps`, u2m metres per unit: how far its planted feet slid, as a share of the way it went. */
function slide(speed: number, dir = 0, secs = 4, fps = 60, u2m = 1): number {
  const b = new RigBody(), out = new RigOut(), dt = 1 / fps, prev = new Float32Array(12);
  let x = 0, z = 0, slid = 0, went = 0;
  b.update(x, z, 0);
  for (let f = 0; f < secs * fps; f++) {
    x += Math.cos(dir) * speed * dt; z += Math.sin(dir) * speed * dt; went += speed * dt;
    b.update(x, z, dt); out.reset(); b.quadruped(META, u2m, dt, { crouch: 0, charging: false, air: 0 }, out);
    if (f > fps) for (let k = 0; k < 4; k++) if (b.feet[k * 3 + 2] && prev[k * 3 + 2]) slid += Math.hypot(b.feet[k * 3] - prev[k * 3], b.feet[k * 3 + 1] - prev[k * 3 + 1]) / 4;
    prev.set(b.feet);
  }
  return slid / (went * (secs * fps - fps) / (secs * fps));
}

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
  it("lies a sleeping legend down: its body on the ground, its head down, its feet where they were", () => {
    const up = lay(0), down = lay(1);
    const y = (items: { f: number; y: number }[], lo: number) => items.find(i => i.f >= lo && i.f < lo + 5)!.y;
    expect(y(down, 0)).toBeLessThan(y(up, 0) - 0.3); // the torso, most of a leg lower
    expect(y(down, 10) - y(down, 0)).toBeLessThan(y(up, 10) - y(up, 0)); // the head down, by its body
    const low = (items: { f: number; y: number }[]) => Math.min(...items.filter(i => i.f >= 30).map(i => i.y));
    expect(low(down)).toBeCloseTo(low(up), 1); // feet still on the ground
  });
  it("plants its feet: a foot on the ground stays where it is while the body walks on, at any speed and heading", () => {
    const all = [0.3, 0.8, 1.5, 3].flatMap(speed => [0, 0.4, Math.PI / 2, 2.6].map(dir => [speed, dir, slide(speed, dir)])), worst = Math.max(...all.map(r => r[2]));
    if (worst >= 0.03) console.log(all.map(r => r.map(v => v.toFixed(2)).join(" ")).join("\n"));
    expect(worst).toBeLessThan(0.03);
    expect(slide(1.2, 0.4, 4, 15)).toBeLessThan(0.03); // at a choppy 15 frames a second too
  });
  it("stops stepping when it stops", () => {
    const b = new RigBody(), out = new RigOut();
    let x = 0; b.update(0, 0, 0);
    for (let f = 0; f < 120; f++) { x += 0.02; b.update(x, 0, 1 / 60); out.reset(); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0 }, out); }
    for (let f = 0; f < 60; f++) { b.update(x, 0, 1 / 60); out.reset(); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0 }, out); }
    const p = b.phase;
    for (let f = 0; f < 60; f++) { b.update(x, 0, 1 / 60); out.reset(); b.quadruped(META, 1, 1 / 60, { crouch: 0, charging: false, air: 0 }, out); }
    expect(b.phase).toBe(p);
  });
});
