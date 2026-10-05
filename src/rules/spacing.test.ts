import { describe, expect, it } from "vitest";
import { type Creature, type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { bodyRadius, spaceOut } from "./spacing";
import { MOVEMENT } from "./movement";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
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

  it("keeps her party from bunching as they follow her", () => {
    const g: Game = newGame(77, TUNING);
    g.clock.paused = false;
    const d = g.map.dancefloor;
    g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
    for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80 && !c.boss) c.gone = true;
    const party = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 200).slice(0, 8);
    party.forEach((c, i) => { Object.assign(c, { species: i < 2 ? "bear" : "dormouse", level: 1, x: g.witch.x + 1, z: g.witch.z + 1, tx: g.witch.x, tz: g.witch.z, leashed: true }); g.leash.stack.push(c.id); });
    for (let i = 0; i < 6 / STEP; i++) stepGame(g, { ...idle, moveX: i * STEP < 3 ? 1 : 0 }, STEP);
    let closest = Infinity; for (const a of party) for (const b of party) if (a !== b) closest = Math.min(closest, Math.hypot(a.x - b.x, a.z - b.z) / ((bodyRadius(a) + bodyRadius(b)) * B.factor + B.margin));
    expect(closest).toBeGreaterThan(0.6); // (each pair at least most of the room it wants)
  }, 60000);
});
