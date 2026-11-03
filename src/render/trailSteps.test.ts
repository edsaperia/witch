// The cooldown trail (render/trail.ts steps; Ed, 2026-11-03): the buffer at the front, then a section of dots for each dash's worth of
// the shared counter (rules/cooldown.ts), read as the dashes she hasn't got; the tail's dots going one at a time; more sections with
// more charges; a landing's three over a room of two; the take-off ring exactly while a take-off is locked; sections as long as her
// top speed makes them, each draining in a dash's worth; and off, the trail exactly as before.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { STEPS_DEFAULT, TRAIL_DEFAULT, WitchTrail, type TrailCounter } from "./trail";
import { coolReady, coolSpend } from "../rules/cooldown";

const RED = new THREE.Vector3(1, 0, 0);
const stepped = () => new WitchTrail({ ...TRAIL_DEFAULT, steps: { ...STEPS_DEFAULT } });
/** The bare broom's numbers: a dash 1 s, two in the room, a take-off 2 s, a landing 3 s; on the ground at 19.25 m/s top. */
const bare = (left: number, more: Partial<TrailCounter> = {}): TrailCounter => ({ left, room: 2, dash: 1, rise: 2, landing: 3, top: 19.25, ...more });
/** A frame of her flying east at `speed` (60 a second), the counter as given. */
function frame(tr: WitchTrail, c: TrailCounter | null, x: number, speed = 10, i = 0, dt = 1 / 60) { tr.counter = c; tr.update(x, 2, 0, speed, 19.25, 0, RED, i * dt, dt, -Infinity); return tr.reading; }
/** She flies a second to lay a path, then the counter's put at `c`: what the trail reads. */
function read(c: TrailCounter, tr = stepped()) {
  for (let i = 0; i < 60; i++) frame(tr, bare(0), i * 0.2, 12, i);
  return frame(tr, c, 12, 12, 60);
}
/** The dashes she has by the rules: how many go one after another from the counter as it stands. */
function dashesByRules(left: number, room: number): number {
  const c = { left }; let n = 0;
  while (n < 10 && coolReady(c, 1, room)) { coolSpend(c, 1, room); n++; }
  return n;
}

describe("the cooldown trail (Ed, 2026-11-03)", () => {
  it("shows a section for each dash she hasn't got (a part-drained one counting), as the rules have it", () => {
    for (const room of [2, 3, 4]) for (let left = 0; left <= room + 1.001; left += 0.05) {
      const r = read(bare(left, { room }));
      expect(r.ready, `room ${room}, left ${left.toFixed(2)}`).toBe(dashesByRules(left, room));
      expect(r.sections).toBe(Math.max(0, Math.ceil(left - 1e-6)));
    }
  });
  it("shows only the buffer when the counter's empty: no dots, no ring, the take-off ready", () => {
    const tr = stepped(), r = read(bare(0), tr);
    expect(r.sections).toBe(0); expect(r.dots).toBe(0); expect(r.ring).toBe(false); expect(r.takeOffLocked).toBe(false);
    expect(tr.dots.visible).toBe(false);
    expect(tr.mesh.geometry.drawRange.count).toBeGreaterThan(0); // (the buffer, as she moves)
  });
  it("loses its dots from the tail one at a time as the counter drains", () => {
    const tr = stepped();
    for (let i = 0; i < 60; i++) frame(tr, bare(0), i * 0.2, 12, i);
    let left = 2, last = frame(tr, bare(left), 12, 0, 0, 1 / 240).dots, drops = 0;
    expect(last).toBeGreaterThan(40);
    for (let i = 1; i <= 2 * 240; i++) {
      left = Math.max(0, 2 - i / 240);
      const n = frame(tr, bare(left), 12, 0, i, 1 / 240).dots;
      expect(n).toBeLessThanOrEqual(last); // (never back)
      expect(last - n).toBeLessThanOrEqual(1); // (one at a time)
      if (n < last) drops++;
      last = n;
    }
    expect(last).toBe(0);
    expect(drops).toBeGreaterThan(40); // (in many small steps, not smoothly or all at once)
  });
  it("shows more sections, and a longer trail, with more charges", () => {
    const two = read(bare(2)), three = read(bare(3, { room: 3 })), four = read(bare(4, { room: 4 }));
    expect([two.sections, three.sections, four.sections]).toEqual([2, 3, 4]);
    expect(three.dots).toBeGreaterThan(two.dots); expect(four.dots).toBeGreaterThan(three.dots);
    expect(three.dotsBySection[0]).toBe(two.dotsBySection[0]); // (each section reads the same)
  });
  it("shows a landing's 3 s over a room of 2 as three sections, nothing ready till it drains back", () => {
    const r = read(bare(3));
    expect(r.sections).toBe(3); expect(r.ready).toBe(0); expect(r.takeOffLocked).toBe(true);
    expect(read(bare(2.5)).ready).toBe(0);
    expect(read(bare(1)).ready).toBe(1);
  });
  it("rings the take-off's threshold exactly while a take-off is locked, where one can go before the counter's empty", () => {
    for (let left = 0; left <= 4.001; left += 0.05) {
      const r = read(bare(left, { room: 3 })), locked = !coolReady({ left }, 2, 3);
      expect(r.takeOffLocked, `left ${left.toFixed(2)}`).toBe(locked);
      expect(r.ring).toBe(locked);
    }
    for (let left = 0; left <= 3.001; left += 0.25) expect(read(bare(left)).ring).toBe(false); // (the bare broom: only the buffer showing says it)
    const off = new WitchTrail({ ...TRAIL_DEFAULT, steps: { ...STEPS_DEFAULT, ring: false } });
    expect(read(bare(3, { room: 3 }), off).ring).toBe(false);
  });
  it("makes its sections as long as her top speed: longer over the treetops and with a Darters buff, each draining in a dash's worth", () => {
    const per = (top: number) => { const tr = stepped(); read(bare(2, { top }), tr); for (let i = 0; i < 120; i++) frame(tr, bare(2, { top }), 12, 0, 61 + i); return frame(tr, bare(2, { top }), 12, 0, 200).dotsBySection[0]; };
    const ground = per(19.25), darters = per(19.25 * 1.25), treetops = per(48);
    expect(darters / ground).toBeCloseTo(1.25, 1);
    expect(treetops / ground).toBeCloseTo(48 / 19.25, 1);
    for (const top of [19.25, 48]) { // (the count by the counter alone, whatever her speed; a section drained each dash's worth)
      const tr = stepped();
      for (let i = 0; i < 60; i++) frame(tr, bare(0, { top }), i * 0.2, 12, i);
      for (let k = 0; k <= 20; k++) { const left = 2 - k * 0.1, r = frame(tr, bare(left, { top }), 12, 0, 60 + k); expect(r.sections).toBe(Math.max(0, Math.ceil(left - 1e-6))); }
    }
  });
  it("eases a section's length when her top speed changes (a take-off), not in a jump", () => {
    const tr = stepped(); read(bare(2), tr);
    const a = frame(tr, bare(2), 12, 0, 61).dotsBySection[0], b = frame(tr, bare(2, { top: 48 }), 12, 0, 62).dotsBySection[0];
    expect(b - a).toBeGreaterThan(0); expect(b - a).toBeLessThan((48 / 19.25 - 1) * a * 0.2); // (a fifth of the jump at most in a frame)
  });
  it("off: the trail exactly as before", () => {
    const old = new WitchTrail(), off = new WitchTrail({ ...TRAIL_DEFAULT, steps: { ...STEPS_DEFAULT, on: false } });
    off.counter = bare(1.5);
    for (let i = 0; i < 180; i++) for (const tr of [old, off]) tr.update(i * 0.25, 2, 0, 15, 19.25, 0.3, RED, i / 60, 1 / 60, i === 90 ? 1.5 : -Infinity, i === 90 ? { fromX: i * 0.25 - 10, fromZ: 0, toX: i * 0.25, toZ: 0 } : null, 0.6);
    const A = old.mesh.geometry, B = off.mesh.geometry;
    expect(B.drawRange.count).toBe(A.drawRange.count);
    for (const k of ["position", "aDir", "aT", "aS", "aCol"]) expect(Array.from(B.getAttribute(k).array)).toEqual(Array.from(A.getAttribute(k).array));
    expect(off.dots.visible).toBe(false);
  });
});
