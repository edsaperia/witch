// The rainbow wave (Ed, 2026-10-29; rules/rainbow.ts): an early clear sends one down the ley line from home to the route's end, a
// little slower than her ground speed, showing the line as it passes and fading behind; a wave arriving sends none.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP } from "./game";
import { TUNING } from "./tuning";
import { clearArea, wavePlan } from "./party";
import { routeLengths } from "./leypulse";
import { liveRainbows, rainbowFronts, rainbowKnobs, rainbowSpeed, routePoint, sendRainbow } from "./rainbow";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const onFox = { ...TUNING, map: { ...TUNING.map!, island: "fox", found: [] } };

describe("the rainbow wave", () => {
  it("sets off from an early clear, and only from one", () => {
    const g = newGame(7, onFox);
    g.clock.paused = false;
    for (let i = 0; i < 30; i++) stepGame(g, idle, STEP);
    expect(g.rainbows ?? []).toEqual([]);
    const next = [...wavePlan(g.party, g.map).entries()].sort((a, b) => a[1] - b[1])[0][0], [x, y] = next.split(",").map(Number);
    expect(clearArea(g.party, g.map, [x, y], g.clock.time)).not.toBeNull();
    stepGame(g, idle, STEP);
    expect(g.rainbows?.length).toBe(1);
    // (on it goes, a little slower than her speed on the ground)
    const at = g.rainbows![0], later = at + 3, f = rainbowFronts(g.party, g.map, g.rainbows!, later)[0];
    expect(f.front).toBeCloseTo(3 * rainbowSpeed(g.tuning), 5);
    expect(rainbowSpeed(g.tuning)).toBeLessThan(g.tuning.groundSpeed);
    expect(rainbowSpeed(g.tuning)).toBeGreaterThan(g.tuning.groundSpeed * 0.6);
  }, 60000);

  it("runs the whole route, home to its last stone, along its own line, and is let go once the line behind it has faded", () => {
    const g = newGame(7, onFox), p = g.party, map = g.map, total = routeLengths(p, map).reduce((a, b) => a + b, 0);
    let last = routePoint(p, map, 0)!;
    for (let m = 1; m <= total; m += 1) {
      const q = routePoint(p, map, m)!;
      expect(Math.hypot(q.x - last.x, q.z - last.z), `${m} m`).toBeLessThan(1.6); // (no jumps: the route's own curve)
      last = q;
    }
    const v = rainbowSpeed(g.tuning), K = rainbowKnobs(g.tuning), done = total / v;
    expect(rainbowFronts(p, map, [0], done + K.linger * 0.5)[0].front).toBe(total);
    expect(liveRainbows(p, map, [0], done + K.linger + 0.1)).toEqual([]);
    // (several at once, the oldest let go past max)
    const many: number[] = [];
    for (let i = 0; i < K.max + 2; i++) sendRainbow(many, g.tuning, i);
    expect(many.length).toBe(K.max);
    expect(many[0]).toBe(2);
  }, 60000);
});
