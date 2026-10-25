// The ley pulse at a constant speed (Ed, 2026-10-09: "Pure constant speed"; 1 m/s since 2026-10-18; rules/pulseRoute.ts): its
// distance along the route grows at leyLines.pulseSpeed times the party's tempo, a wave lands as it reaches its stone, and the
// boot runs its 195 m path at its own speed (boot.speed, 4 m/s).
import { describe, expect, it } from "vitest";
import { newGame, stepGame, type Game } from "./game";
import { TUNING } from "./tuning";
import { leyReachTimes, pulseRouteMetres } from "./leypulse";
import { behindLength, stretchLengths } from "./pulseRoute";
import { bootPath, bootSeconds } from "./bootRing";
import { tempoRate } from "./beat";

const still = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const V = TUNING.leyLines.pulseSpeed;
function game(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  return g;
}
const run = (g: Game, secs: number) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, still, 1 / 60); };

describe("the ley pulse at a constant speed (Ed, 2026-10-09)", () => {
  it("is 1 m/s (Ed, 2026-10-18), and the boot runs its 195 m path at its own 4 m/s: about 49 s, whatever the waves' speed", () => {
    const g = game();
    expect(V).toBe(1); expect(TUNING.boot.speed).toBe(4);
    expect(bootPath(g.map).length).toBeCloseTo(195, 0); // (179 m while the treehouse stood due north; the oak's front is farther out, north-west)
    expect(bootSeconds(g.map)).toBeCloseTo(195 / 4, 0);
    run(g, 0.05);
    expect(g.party.bootUntil - g.party.bootFrom!).toBeCloseTo(bootPath(g.map).length / 4, 9);
    const slow = { ...g.map, tuning: { ...g.map.tuning, leyLines: { ...g.map.tuning.leyLines, pulseSpeed: 0.25 } } } as typeof g.map;
    expect(bootSeconds(slow)).toBeCloseTo(bootSeconds(g.map), 9);
  });

  it("runs pulseSpeed metres a second along the route at the base tempo, and pulseSpeed times the tempo's rate after a knockdown's BPM", () => {
    const g = game();
    run(g, bootSeconds(g.map) + 1);
    const m0 = pulseRouteMetres(g.party, g.map, g.clock.time); run(g, 5);
    expect(pulseRouteMetres(g.party, g.map, g.clock.time) - m0).toBeCloseTo(5 * V, 3);
    g.beat.bonus = 60; const rate = tempoRate(g.beat, g.tuning); // (a knockdown's BPM, many times over)
    expect(rate).toBeGreaterThan(1.4);
    const m1 = pulseRouteMetres(g.party, g.map, g.clock.time), w = g.party.wave; run(g, 3);
    if (g.party.wave === w) expect(pulseRouteMetres(g.party, g.map, g.clock.time) - m1).toBeCloseTo(3 * V * rate, 1); // (the new speed from the next step on)
  }, 60000);

  it("lands each wave as the pulse reaches its stone: the gap its link's length over the speed", () => {
    const g = game();
    run(g, bootSeconds(g.map) + 0.05);
    for (let k = 0; k < 3; k++) {
      const w = g.party.wave, L = stretchLengths(g.party, g.map).reduce((a, b) => a + b, 0), t0 = g.clock.time, d0 = g.party.pulse.d;
      while (g.party.wave === w) stepGame(g, still, 1 / 60);
      expect(g.clock.time - t0).toBeCloseTo((L - d0) / V, 1); // (within a step)
      expect(pulseRouteMetres(g.party, g.map, g.clock.time) - behindLength(g.party, g.map)).toBeLessThan(V / 60 + 1e-9); // (just past the stone)
    }
  }, 60000);
  it("set to 0 on the pause page mid-night, holds the pulse where it is (no waves, nothing NaN), and moves on when set again", () => {
    const g = newGame(123, JSON.parse(JSON.stringify(TUNING)));
    g.clock.paused = false; g.party.spellAt = undefined;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    g.witches[0].health.hp = 1e6;
    run(g, bootSeconds(g.map) + 5);
    const m0 = pulseRouteMetres(g.party, g.map, g.clock.time);
    expect(m0).toBeGreaterThan(0);
    g.tuning.leyLines.pulseSpeed = 0; run(g, 20);
    expect(Math.abs(pulseRouteMetres(g.party, g.map, g.clock.time) - m0)).toBeLessThan(0.05); // (a step's metres at the old speed, at most)
    expect(g.party.wave).toBe(0); expect(g.party.nextAt).toBe(Infinity);
    for (const t of leyReachTimes(g.party, g.map)!.values()) expect(Number.isNaN(t)).toBe(false);
    g.tuning.leyLines.pulseSpeed = 3; run(g, 2);
    expect(pulseRouteMetres(g.party, g.map, g.clock.time)).toBeCloseTo(m0 + 6, 1);
  });
});
