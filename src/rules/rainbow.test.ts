// The rainbow wave (Ed, 2026-10-29; rules/rainbow.ts): an early clear sends one from its own soundsystem's stone, both ways along
// the route, the way back stopping at the spark, twice the old speed and three times the old length, leaving nothing behind; a wave
// arriving sends none.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP } from "./game";
import { TUNING } from "./tuning";
import { clearArea, wavePlan } from "./party";
import { pulseRouteMetres, routeLengths } from "./leypulse";
import { liveRainbows, rainbowKnobs, rainbowLength, rainbowRuns, rainbowSpeed, routePoint, sendRainbow, stoneMetres } from "./rainbow";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
// Keep the authored fox route: wave travel, spark interception and metre-by-metre continuity cover its complete island path.
const onFox = { ...TUNING, map: { ...TUNING.map!, island: "fox", found: [] } };

describe("the rainbow wave", () => {
  it("sets off from the early-cleared soundsystem's own stone, and only from an early clear", () => {
    const g = newGame(7, onFox);
    g.clock.paused = false;
    for (let i = 0; i < 30; i++) stepGame(g, idle, STEP);
    expect(g.rainbows ?? []).toEqual([]);
    const next = [...wavePlan(g.party, g.map).entries()].sort((a, b) => a[1] - b[1])[0][0], [x, y] = next.split(",").map(Number);
    expect(clearArea(g.party, g.map, [x, y], g.clock.time)).not.toBeNull();
    stepGame(g, idle, STEP);
    expect(g.rainbows?.length).toBe(1);
    const w = g.rainbows![0], from = stoneMetres(g.party, g.map, [x, y]);
    expect(from).not.toBeNull();
    expect(w.from).toBeCloseTo(from!, 5);
    expect(w.from).toBeGreaterThan(0); // (not from home)
  }, 60000);

  it("twice as fast as before, three times as long", () => {
    expect(rainbowSpeed(TUNING)).toBeCloseTo(TUNING.groundSpeed * 0.85 * 2, 5);
    expect(rainbowLength(TUNING)).toBeCloseTo(28 * 1.4 * 3, 5);
    expect(rainbowKnobs(TUNING)).not.toHaveProperty("linger"); // (no trail: Ed, "have no silver trail")
  });

  it("runs both ways: on to the route's end, and back till it meets the spark", () => {
    const g = newGame(7, onFox), p = g.party, map = g.map, total = routeLengths(p, map).reduce((a, b) => a + b, 0), v = rainbowSpeed(g.tuning), L = rainbowLength(g.tuning);
    const spark = pulseRouteMetres(p, map, 0), from = spark + Math.min(400, (total - spark) / 2), waves = [{ at: 0, from }];
    const runs = rainbowRuns(p, map, waves, 2);
    expect(runs.map(r => r.dir).sort()).toEqual([-1, 1]);
    const on = runs.find(r => r.dir === 1)!, back = runs.find(r => r.dir === -1)!;
    expect(on.head).toBeCloseTo(from + 2 * v, 5); expect(on.lo).toBe(from); expect(on.hi).toBeCloseTo(total, 5);
    expect(back.head).toBeCloseTo(from - 2 * v, 5); expect(back.hi).toBe(from); expect(back.lo).toBeCloseTo(Math.max(0, pulseRouteMetres(p, map, 2)), 5);
    // (the way back is gone once its last bar has met the spark; the way on once its last bar has passed the end)
    const backDone = (from - Math.max(0, spark) + L) / v + 1;
    expect(rainbowRuns(p, map, waves, backDone).filter(r => r.dir === -1)).toEqual([]);
    const onDone = (total - from + L) / v + 0.1;
    expect(liveRainbows(p, map, waves, onDone)).toEqual([]);
    // (one set off behind the spark goes only on)
    expect(rainbowRuns(p, map, [{ at: 0, from: Math.max(0, spark - 10) }], 1).map(r => r.dir)).toEqual([1]);
  }, 60000);

  it("follows the route's own line, and keeps at most max at once", () => {
    const g = newGame(7, onFox), p = g.party, map = g.map, total = routeLengths(p, map).reduce((a, b) => a + b, 0);
    let last = routePoint(p, map, 0)!;
    for (let m = 1; m <= total; m += 1) {
      const q = routePoint(p, map, m)!;
      expect(Math.hypot(q.x - last.x, q.z - last.z), `${m} m`).toBeLessThan(1.6); // (no jumps: the route's own curve)
      last = q;
    }
    const K = rainbowKnobs(g.tuning), many: { at: number; from: number }[] = [];
    for (let i = 0; i < K.max + 2; i++) sendRainbow(many, g.tuning, i, 10 * i);
    expect(many.length).toBe(K.max);
    expect(many[0]).toEqual({ at: 2, from: 20 });
  }, 60000);
});
