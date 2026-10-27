import { describe, expect, it } from "vitest";
import { FIGHTERS, nextSeed, packSpec, rollAttack, rollPack, TellWatch } from "./fightArena";
import { ATTACK_LIB, check, parseAttack, readability, REACTION_FLOOR, serialiseAttack } from "./attacks";
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

describe("the Fight Arena's telegraph timings", () => {
  it("sees each windup once, from when it began to when it lands, its lead the attack's windup", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "wolf*3@2", { wildOnly: true });
    const w = new TellWatch(), windup = attackOf("wolf", 2)!.attack.windup;
    let live = 0;
    for (let i = 0; i < 20 / STEP; i++) {
      g.witches[0].health.hp = 1e6; stepGame(g, idle, i % 6 ? 0 : 6 * STEP); // (a frame of six steps at a time, as a slow machine's: each windup's start still its own step)
      for (const t of w.update(g)) { live++; expect(t.fire).toBeGreaterThan(g.clock.time); expect(t.start).toBeLessThanOrEqual(g.clock.time); expect(t.species).toBe("wolf"); }
    }
    expect(w.count).toBeGreaterThan(0);
    expect(live).toBeGreaterThan(w.count); // (each shown over several frames)
    // the shortest seen: no longer than the attack's windup (a strike's is 0.7 of it, rules/combat.ts; pack moves may differ), and
    // not cut short by the frames (each lead a whole number of steps of a real windup, not a frame's worth less)
    expect(w.shortest).toBeGreaterThan(0.3 * windup);
    expect(w.shortest).toBeLessThanOrEqual(windup + 1e-6);
    w.reset();
    expect([w.count, w.shortest]).toEqual([0, Infinity]);
  }, 60000);

  it("takes the composable attacks' telegraphs too, with their own start", () => {
    const w = new TellWatch();
    const g = { clock: { time: 10 }, creatures: [], arena: { spec: "", ids: [] }, combat: { telegraphs: [{ id: 3, start: 9.6, fire: 10.5, shape: { a: { x: 1, z: 2 }, b: { x: 5, z: 2 } } }, { id: 4, start: 9, fire: 9.5, shape: { x: 0, z: 0 } }] } };
    expect(w.update(g as never)).toEqual([{ key: "t3", species: "telegraph", x: 1, z: 2, start: 9.6, fire: 10.5 }]);
    expect(w.shortest).toBeCloseTo(0.9);
  });
});


describe("the Fight Arena's random attack (the arena's own till the grammar's composer lands)", () => {
  it("rolls the same attack from the same seed, always one the grammar takes, fair once parsed (the floor lifted and said), and varied", () => {
    const kinds = new Set<string>(), shapes = new Set<string>();
    let lifted = 0, children = 0;
    for (let s = 1; s <= 300; s++) {
      const a = rollAttack(s);
      expect(rollAttack(s)).toEqual(a);
      expect(check(a, ATTACK_LIB), `seed ${s}`).toEqual([]);
      const p = parseAttack(a, ATTACK_LIB);
      expect(p.errors, `seed ${s}`).toEqual([]);
      expect(readability(p.attack!, ATTACK_LIB).warning).toBeGreaterThanOrEqual(REACTION_FLOOR - 1e-9);
      if (p.warnings.length) lifted++;
      if (a.on) children++;
      kinds.add(a.body!.kind!); shapes.add(JSON.stringify(Object.keys(a).sort()));
      // (copied and pasted back: the same)
      expect(parseAttack(serialiseAttack(a), ATTACK_LIB).attack).toEqual(p.attack);
    }
    expect(kinds.size).toBe(8); // (every top-level body: bolt, lob, runner, beam, area, mine, lure, melee; zones come as children)
    expect(shapes.size).toBeGreaterThan(12); // (the modules each sets: 19 kinds of set in 300 rolls)
    expect(children).toBeGreaterThan(30);
    expect(lifted).toBeGreaterThan(0); // (some rolled under the floor, and parseAttack said so)
  });
});
