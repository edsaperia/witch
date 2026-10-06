import { describe, expect, it } from "vitest";
import { growthLevel, growWave, materialize, newGrowth, pendingCounts } from "./growth";
import { generateMap } from "./map";
import { newGame, stepGame, simRadius } from "./game";
import { spawnCreatures } from "./creatures";
import { TUNING, withTuning } from "./tuning";
import { cellKey } from "./party";

// (the mechanism at one creature a wave, whatever the tuning file's pace)
const T1 = withTuning({ population: { ...TUNING.population, growth: { ...TUNING.population.growth, perWave: 1 } } });
const still = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

describe("wild areas grow (Ed, 2026-10-04: a creature a wave while wild)", () => {
  const map = generateMap(123, T1);

  it("picks each grown creature's level by the weights, the same from the same seed", () => {
    const n = [0, 0, 0];
    for (let w = 1; w <= 40; w++) for (let cx = 0; cx < 20; cx++) n[growthLevel(123, [cx, 7], w, 0, [1, 1, 1])]++;
    for (const k of n) expect(k / 800).toBeGreaterThan(0.27), expect(k / 800).toBeLessThan(0.4); // about a third each
    expect(growthLevel(123, [3, 4], 9, 0, [1, 1, 1])).toBe(growthLevel(123, [3, 4], 9, 0, [1, 1, 1]));
    for (let w = 1; w < 30; w++) expect(growthLevel(5, [1, 1], w, 0, [0, 0, 1])).toBe(2); // all adults
    for (let w = 1; w < 30; w++) expect(growthLevel(5, [1, 1], w, 0, [1, 0, 0])).toBe(0);
  });

  it("grows every still-wild area by perWave a wave, as counts only, never home or a partified area", () => {
    const s = newGrowth(), [hx, hy] = map.centreCell, party = new Set([cellKey(map.centreCell), "3,3"]);
    for (let w = 1; w <= 5; w++) growWave(s, map, w, key => !party.has(key));
    growWave(s, map, 5, () => true); // (a wave grows once)
    expect(s.grown).toBe((map.n * map.n - 2) * 5 * T1.population.growth.perWave);
    expect(s.pending.has(`${hx},${hy}`)).toBe(false);
    expect(s.pending.has("3,3")).toBe(false);
    expect(pendingCounts(s, "0,0").reduce((a, b) => a + b, 0)).toBe(5);
    const off = newGrowth();
    growWave(off, generateMap(123, withTuning({ population: { ...T1.population, growth: { ...T1.population.growth, on: false } } })), 1, () => true);
    expect(off.grown).toBe(0);
  });

  it("makes the counts real only near a witch, out of her sight; a woken area's at once", () => {
    const s = newGrowth(), creatures = spawnCreatures(map), before = creatures.length;
    for (let w = 1; w <= 3; w++) growWave(s, map, w, () => true);
    const site = map.siteOf(2, 2), far = { x: site.x + 5000, z: site.z };
    expect(materialize(s, creatures, map, [far], 600, 10)).toBe(0); // nobody near: counts only
    // A witch 500 m off: its area's creatures appear, beyond the haze from her.
    const near = { x: site.x + 500, z: site.z };
    const made = materialize(s, creatures, map, [near], 600, 20);
    expect(made).toBeGreaterThan(0);
    for (const c of creatures.slice(before)) {
      expect(Math.hypot(c.x - near.x, c.z - near.z)).toBeGreaterThanOrEqual(T1.haze.far + T1.population.growth.hide);
      expect(creatures[c.id]).toBe(c); // ids are their places
    }
    // Standing in an area, none of its own appear in sight... unless it wakes.
    const [cx, cy] = [9, 9], inside = map.siteOf(cx, cy), key = `${cx},${cy}`;
    const waiting = pendingCounts(s, key).reduce((a, b) => a + b, 0);
    expect(waiting).toBe(3);
    materialize(s, creatures, map, [inside], 600, 30);
    expect(pendingCounts(s, key).reduce((a, b) => a + b, 0)).toBe(waiting);
    const n = creatures.length;
    materialize(s, creatures, map, [inside], 600, 30.5, new Set([key]));
    expect(creatures.length - n).toBe(waiting);
    expect(s.pending.has(key)).toBe(false);
  }, 30000);

  it("in a game: a woken area marches with what it grew, and areas far off stay counts", () => {
    const g = newGame(123, T1), start = g.creatures.length;
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    let woke: string | null = null;
    for (let wave = 1; wave <= 3; wave++) {
      woke = cellKey(g.party.next[0]);
      stepGame(g, { ...still, nextWave: true }, 1 / 60);
      stepGame(g, still, 1 / 60);
    }
    expect(g.growth.grown).toBeGreaterThan((g.map.n * g.map.n - 10) * 3); // (every wild area, a creature a wave)
    expect(g.creatures.length - start).toBeLessThan(g.growth.grown); // most still counts
    const mine = g.creatures.filter(c => cellKey(c.cell) === woke);
    expect(mine.length).toBe(T1.population.start.babies + T1.population.start.young + T1.population.start.adults + 3 + (mine.some(c => c.boss) ? 1 : 0) + (mine.some(c => c.circle) ? 1 : 0)); // (and its legend and its clearing's baby)
    for (const c of mine) if (c.level > 0 && !c.boss) expect(c.siege).toBe(woke); // they march on its new soundsystem (its legend sleeps on)
    expect(g.growth.pending.has(woke!)).toBe(false);
    expect(simRadius(g)).toBeGreaterThan(T1.haze.far);
  }, 60000);
});
