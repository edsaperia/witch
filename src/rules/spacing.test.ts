import { describe, expect, it } from "vitest";
import { type Creature, type Level } from "./creatures";
import { STEP } from "./game";
import { newLeash, stepLeash } from "./leash";
import { bodyRadius, spaceOut } from "./spacing";
import { FIGHT, MOVEMENT } from "./movement";
import { TUNING } from "./tuning";

const fake = (id: number, species: string, level: Level, x: number, z: number) => ({ id, species, level, x, z } as Creature);
const B = MOVEMENT.bodies;

describe("spacing (Ed, 2026-10-05)", () => {
  it("sizes a body by its kind and level: a bear's bigger than a dormouse's, a legend's the biggest", () => {
    expect(bodyRadius({ species: "bear", level: 2 })).toBeGreaterThan(bodyRadius({ species: "dormouse", level: 2 }) * 3);
    expect(bodyRadius({ species: "dormouse", level: 0 })).toBeLessThan(bodyRadius({ species: "dormouse", level: 2 }));
    expect(bodyRadius({ species: "bear", level: 3 })).toBeGreaterThan(bodyRadius({ species: "bear", level: 2 }) * 2);
  });

  it("eases a heap apart, softly, to about the room their sizes want: more round a bear than between dormice", () => {
    const heap = [fake(0, "bear", 2, 0, 0), fake(1, "bear", 2, 0.3, 0.1), ...Array.from({ length: 6 }, (_, i) => fake(2 + i, "dormouse", 2, 0.2 * i, -0.2 * i))];
    let maxStep = 0;
    for (let i = 0; i < 4 / STEP; i++) { const before = heap.map(c => [c.x, c.z]); spaceOut(heap, STEP, () => false); heap.forEach((c, k) => { maxStep = Math.max(maxStep, Math.hypot(c.x - before[k][0], c.z - before[k][1]) / STEP); }); }
    const gap = (a: Creature, b: Creature) => Math.hypot(a.x - b.x, a.z - b.z);
    const want = (a: Creature, b: Creature) => (bodyRadius(a) + bodyRadius(b)) * B.factor + B.margin;
    expect(gap(heap[0], heap[1])).toBeGreaterThan(want(heap[0], heap[1]) * 0.9); // the bears
    let mice = Infinity; for (let i = 2; i < 8; i++) for (let j = i + 1; j < 8; j++) mice = Math.min(mice, gap(heap[i], heap[j]));
    expect(mice).toBeGreaterThan(want(heap[2], heap[3]) * 0.8);
    expect(mice).toBeLessThan(gap(heap[0], heap[1])); // (dormice keep less room than bears)
    expect(maxStep).toBeLessThanOrEqual(B.push + 1e-6); // soft: never faster than its push
  });

  it("leaves a sleeping legend where it lies, and pushes others off it", () => {
    const L = fake(0, "bear", 3, 0, 0), m = fake(1, "dormouse", 1, 0.5, 0);
    for (let i = 0; i < 3 / STEP; i++) spaceOut([L, m], STEP, c => c === L);
    expect([L.x, L.z]).toEqual([0, 0]);
    expect(Math.hypot(m.x, m.z)).toBeGreaterThan(bodyRadius(L) * B.factor);
  });

  it("keeps supplied followers on their leash with finite positions and configured bounded spacing pushes", () => {
    const party = Array.from({ length: 8 }, (_, i) => ({ ...fake(i, i < 2 ? "bear" : "dormouse", 1, i * 0.1, i % 2 * 0.1), tx: 0, tz: 0, rest: 0, rand: () => 0.5, leashed: true, walk: 0, facing: 1, speed: TUNING.creatureSpeed } as Creature));
    const s = newLeash(); s.stack = party.map(c => c.id);
    stepLeash(s, party, { talk: false, sigil: false }, { x: 0, z: 0 }, true, STEP, STEP, TUNING);
    const before = party.map(c => [c.x, c.z]);
    spaceOut(party, STEP, () => false);
    expect(s.stack).toEqual(party.map(c => c.id));
    let moved = 0;
    party.forEach((c, i) => { const distance = Math.hypot(c.x - before[i][0], c.z - before[i][1]); if (distance > 0) moved++;
      expect(distance).toBeLessThanOrEqual(B.push * FIGHT.speed * STEP + 1e-9);
      expect(Number.isFinite(c.x) && Number.isFinite(c.z)).toBe(true); expect(c.leashed).toBe(true);
    });
    expect(moved).toBeGreaterThan(0);
    // C1 reports the original seed77/eight-followers/6s normalized minimum-gap outcome.
  }, 60000);
});
