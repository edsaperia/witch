import { describe, expect, it } from "vitest";
import { simulate } from "./balance";
import { generateMap } from "./map";
import { lanchester, levelValue, powerReport } from "./power";
import { newGame } from "./game";
import { TUNING } from "./tuning";

describe("fighting value (rules/power.ts)", () => {
  it("is √(hp × dps) by level: babies 0, young 15.5, adults 29, legends 76", () => {
    expect(levelValue(0)).toBe(0);
    expect(levelValue(1)).toBeCloseTo(15.5, 1);
    expect(levelValue(2)).toBeCloseTo(29, 0);
    expect(levelValue(3)).toBeCloseTo(76, 0);
    expect(lanchester(50, 30)).toBeCloseTo(40, 9);
    expect(lanchester(30, 50)).toBe(0);
  });

  it("reads the party and the sieges off a game", () => {
    const g = newGame(123, TUNING), young = g.creatures.find(c => c.level === 1)!, adult = g.creatures.find(c => c.level === 2)!;
    young.leashed = true; g.leash.stack.push(young.id);
    adult.siege = "home";
    const p = powerReport(g.creatures, g.witches, g.combat.sounds);
    expect(p.leashed).toBeCloseTo(levelValue(1), 9);
    expect(p.parked).toBe(0);
    expect(p.counts).toEqual([0, 1, 0, 0]);
    expect(p.sieges).toEqual([{ key: "home", value: levelValue(2), count: 1, hp: TUNING.combat.homeHealth }]);
    expect(p.marching).toBeCloseTo(levelValue(2), 9);
  }, 30000);
});

describe("the balance simulator (rules/balance.ts, tools/balance/sim.mjs)", () => {
  const map = generateMap(1000, TUNING);

  it("runs a quick idle run: sieges grow wave by wave, soundsystems fall, the same every time", () => {
    const t0 = Date.now(), a = simulate(map, { interval: 60, maxWaves: 12 });
    expect(Date.now() - t0).toBeLessThan(5000);
    expect(a.waves.length).toBeGreaterThanOrEqual(Math.min(12, a.survived));
    expect(a.waves[0].largest).toBeGreaterThan(0); // the first ring brings adults (Ed, 2026-10-04)
    expect(a.waves[a.waves.length - 1].marching).toBeGreaterThan(a.waves[0].marching);
    expect(simulate(map, { interval: 60, maxWaves: 12 })).toEqual(a); // deterministic, and the cached fighters reset
  }, 30000);

  it("loses an idle player in time with five-minute waves, and a strong player lasts longer", () => {
    const idle = simulate(map, { interval: 300, maxWaves: 30 });
    expect(idle.lost).not.toBeNull();
    const strong = simulate(map, { interval: 300, maxWaves: 30, player: { growth: 200, fromWave: 0, fightTime: 20 } });
    expect(strong.survived).toBeGreaterThan(idle.survived);
    expect(strong.waves.some(w => w.player! > 0)).toBe(true);
  }, 30000);
});
