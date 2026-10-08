// The simulation's level of detail (Ed, 2026-10-05: creatures far from the action frozen until
// she comes closer): roamers in full near her, coarse beyond, frozen past the simulation radius;
// marchers coarse far from her and the action, still arriving; no flicker at the line.
import { describe, expect, it } from "vitest";
import { setupArena } from "./arena";
import { stepCreaturesNear, type Creature } from "./creatures";
import { newGame, STEP, stepGame, type Game } from "./game";
import { inFull } from "./simLod";
import { TUNING } from "./tuning";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const L = TUNING.simLod;

describe("roaming creatures", () => {
  const g = newGame(7, TUNING), c = g.creatures.find(k => !k.boss && k.level < 3)!;

  it("in full within full of her: a step every step", () => {
    c.seen = 0; c.lod = undefined; c.rest = 0; c.tx = c.x + 30; c.tz = c.z;
    const x0 = c.x;
    stepCreaturesNear([c], c.x, c.z, 1e6, STEP, STEP, g.map, () => false, { full: 50, band: 10, every: 30 });
    expect(c.lod).toBe("full");
    expect(c.x).not.toBe(x0);
  });

  it("beyond it, coarse: still on most steps, and by `every` steps at once on its turn", () => {
    c.lod = undefined; c.rest = 0; c.tx = c.x + 30; c.tz = c.z;
    const at = c.x + 200, moved: number[] = [];
    for (let i = 1; i <= 60; i++) {
      const before = c.x;
      stepCreaturesNear([c], at, c.z, 1e6, STEP, i * STEP, g.map, () => false, { full: 50, band: 10, every: 30 });
      if (c.x !== before) moved.push(c.x - before);
    }
    expect(c.lod).toBe("coarse");
    expect(moved.length).toBeLessThanOrEqual(2);
    expect(moved.length).toBeGreaterThanOrEqual(1);
    expect(Math.max(...moved)).toBeGreaterThan(c.speed * STEP * 10); // (many steps' worth)
  });

  it("frozen past the simulation radius (by its home)", () => {
    const x0 = c.x, seen = c.seen;
    stepCreaturesNear([c], c.homeX + 5000, c.homeZ, 600, STEP, 99, g.map, () => false, { full: 50, band: 10, every: 30 });
    expect(c.x).toBe(x0);
    expect(c.seen).toBe(seen);
  });
});

describe("no flicker at the line", () => {
  it("comes into full at the line, and goes out only band past it", () => {
    const c = { lod: undefined } as unknown as Creature;
    expect(inFull(c, 120, 100, 30)).toBe(false); // out
    expect(inFull(c, 101, 100, 30)).toBe(false); // still out, just past the line
    expect(inFull(c, 99, 100, 30)).toBe(true); // in at the line
    expect(inFull(c, 125, 100, 30)).toBe(true); // in the band: stays in
    expect(inFull(c, 99, 100, 30)).toBe(true);
    expect(inFull(c, 131, 100, 30)).toBe(false); // band past: out
  });
});

describe("marching besiegers", () => {
  /** Besiegers on home's soundsystem put down `far` metres east of it, the witch over the treetops `away` metres west. */
  function siege(far: number, away: number): { g: Game; marchers: Creature[]; home: { x: number; z: number } } {
    const g = newGame(7, TUNING);
    g.clock.paused = false;
    stepGame(g, { ...idle, moveX: 1 }, STEP);
    setupArena(g, "wolf*1@2,boar*6@2!");
    const home = g.combat.sounds.get("home")!, marchers = g.arena!.ids.map(id => g.creatures[id]).filter(c => c.siege);
    marchers.forEach((c, i) => { c.x = home.x + far; c.z = home.z + i * 3; c.fight = undefined; g.combat.busy.add(c.id); }); // (marching: a siege under way)
    for (const id of g.arena!.ids) if (!g.creatures[id].siege) g.creatures[id].gone = true; // (hers out of the way)
    g.witches[0].body = { ...g.witch, seated: false, mode: "treetop", lift: 1, x: home.x - away, z: home.z };
    return { g, marchers, home };
  }

  it("far from her and the action they march coarsely, at their marching pace, and come into full near the soundsystem", () => {
    const { g, marchers, home } = siege(L.action + 60, 2000);
    stepGame(g, idle, STEP);
    expect(g.lod!.marchCoarse).toBe(marchers.length);
    const dist = (c: Creature) => Math.hypot(c.x - home.x, c.z - home.z), d0 = marchers.map(dist);
    for (let i = 0; i < 60 * 30; i++) stepGame(g, idle, STEP);
    marchers.forEach((c, i) => expect(d0[i] - dist(c)).toBeGreaterThan(c.speed * TUNING.combat.marchMult * 30 * 0.8)); // (marching on, at their pace)
    for (let i = 0; i < 60 * 90; i++) stepGame(g, idle, STEP);
    expect(g.lod!.marchCoarse).toBe(0); // (in full near the soundsystem)
  }, 120_000);

  it("near her they march in full", () => {
    const { g, marchers } = siege(600, -600);
    stepGame(g, idle, STEP);
    expect(g.lod!.marchFull).toBe(marchers.length);
    expect(g.lod!.marchCoarse).toBe(0);
  }, 120_000);

  it("coarse marching keeps pace with full marching", () => {
    const a = siege(600, 2000), b = siege(600, 2000);
    (b.g as { tuning: typeof TUNING }).tuning = { ...b.g.tuning, simLod: { ...L, every: 1 } }; // (every step: all in full)
    for (let i = 0; i < 60 * 8; i++) { stepGame(a.g, idle, STEP); stepGame(b.g, idle, STEP); }
    const da = Math.hypot(a.marchers[0].x - a.home.x, a.marchers[0].z - a.home.z), db = Math.hypot(b.marchers[0].x - b.home.x, b.marchers[0].z - b.home.z);
    expect(Math.abs(da - db)).toBeLessThan(L.every * STEP * a.marchers[0].speed * TUNING.combat.marchMult * 1.5);
  }, 120_000);
});
