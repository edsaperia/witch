import { describe, expect, it } from "vitest";
import { FIGHTERS, nextSeed, packSpec, rollPack } from "./fightArena";
import { parseArena, setupArena } from "./arena";
import { LEGEND } from "./creatures";
import { attackOf } from "./combat/data";
import { newGame, stepGame, STEP, type Controls } from "./game";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("the Fight Arena's pack roll (Ed, 2026-10-27)", () => {
  it("rolls the same pack from the same seed, and a valid one from any: kinds with attacks, 1 to 8 in all, young, adult or a lone legend", () => {
    expect(FIGHTERS.length).toBeGreaterThan(10);
    const seen = new Set<string>();
    for (let seed = 0, s = 1; seed < 400; seed++, s = nextSeed(s)) {
      const p = rollPack(s);
      expect(rollPack(s)).toEqual(p);
      expect(p.length).toBeGreaterThan(0);
      const total = p.reduce((a, g) => a + g.count, 0);
      expect(total).toBeGreaterThanOrEqual(1); expect(total).toBeLessThanOrEqual(8);
      for (const g of p) {
        expect(FIGHTERS).toContain(g.species);
        expect(attackOf(g.species, g.level)).not.toBeNull();
        if (g.level === LEGEND) expect(p).toEqual([{ species: g.species, count: 1, level: LEGEND }]);
        else { expect([1, 2]).toContain(g.level); expect(g.count).toBeGreaterThanOrEqual(2); }
      }
      expect(new Set(p.map(g => g.species)).size).toBe(p.length); // (two kinds, never one twice)
      // its spec reads back as itself (the link carries it)
      expect(parseArena(packSpec(p))).toEqual(p);
      seen.add(packSpec(p));
    }
    expect(seen.size).toBeGreaterThan(300); // (it varies)
  });

  it("the next seed is another, in range", () => {
    let s = 7;
    for (let i = 0; i < 100; i++) { const n = nextSeed(s); expect(n).not.toBe(s); expect(n).toBeGreaterThanOrEqual(0); expect(n).toBeLessThan(1_000_000); s = n; }
  });
});

describe("the arena wild only (the Fight Arena): her alone against the pack", () => {
  it("puts every group down wild, none of hers, and they come for her", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "wolf*3@2,raven*2@1", { wildOnly: true });
    const ids = g.arena!.ids;
    expect(ids.length).toBe(5);
    for (const id of ids) expect(g.creatures[id].leashed).toBe(false);
    expect(g.leash.placed.length).toBe(0);
    let struck = 0;
    for (let i = 0; i < 30 / STEP; i++) {
      g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP);
      for (const e of g.combat.events) if (e.at === g.clock.time && (e.kind === "windup" || e.kind === "charged" || e.kind === "shot")) struck++;
    }
    expect(struck).toBeGreaterThan(0);
  }, 60000);
});
