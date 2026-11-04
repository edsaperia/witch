import { describe, expect, it } from "vitest";
import { FIGHTERS, nextSeed, packSpec, rollPack, TellWatch } from "./fightArena";
import { arenaAttack, parseArena, setupArena } from "./arena";
import { LEGEND } from "./creatures";
import { attackOf } from "./combat/data";
import { newGame as fullGame, stepGame, STEP, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
import { TUNING, withTuning } from "./tuning";
import { withCombatRoles } from "../test/combatRoles";

const newGame = smallWorld(fullGame, "Fight Arena setup and telegraph timing use explicitly injected local packs, independent of world extent.");
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
    // knocked out, the fight again: her back, whole
    g.witches[0].health.hp = 0; g.witches[0].ko = { inAt: g.clock.time } as never;
    setupArena(g, "wolf*3@2,raven*2@1", { wildOnly: true });
    expect(g.witches[0].ko).toBeNull();
    expect(g.witches[0].health.hp).toBe(TUNING.witchHealth.hits);
  }, 60000);
});

describe("the Fight Arena's telegraph timings", () => {
  it("sees each windup once, from when it began to when it lands, its lead the attack's windup (the old flat attacks, ?attacks=old)", () => {
    const g = newGame(5, withTuning({ attacks: { reactionFloor: TUNING.attacks?.reactionFloor ?? 0.45, species: false } }));
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

  it("sees the chosen species melee's grammar telegraphs without duplicate windups", withCombatRoles({ wolf: "melee" }, () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "wolf*3@2", { wildOnly: true });
    const w = new TellWatch();
    let species = 0, windups = 0;
    for (let i = 0; i < 20 / STEP; i++) {
      g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP);
      for (const t of w.update(g)) { if (t.key.startsWith("t") && t.species.startsWith("species:wolf")) species++; if (t.key.startsWith("w")) windups++; }
    }
    expect(species).toBeGreaterThan(0);
    expect(windups).toBe(0);
    expect(w.shortest).toBeGreaterThanOrEqual((TUNING.attacks?.reactionFloor ?? 0.45) - 1e-6); // (held to the floor)
  }), 60000);

    it("takes the grammar's telegraphs too (alive ones, with their own start), and not a grammar caster's windup twice", () => {
    const w = new TellWatch();
    const g = { clock: { time: 10 }, creatures: [{ id: 0, species: "wolf", x: 0, z: 0, spell: "arena", fight: { windupUntil: 10.5 } }], arena: { spec: "", ids: [0] }, combat: { events: [], spells: { telegraphs: [
      { id: 3, alive: true, kind: "lane", attack: "arena", source: 0, start: 9.6, fire: 10.5, shape: { type: "segment", x: 1, z: 2, x2: 5, z2: 2 } },
      { id: 4, alive: false, kind: "ring", attack: "arena", start: 9, fire: 10.6, shape: { type: "disc", x: 0, z: 0 } },
      { id: 5, alive: true, kind: "landing", attack: "arena", start: 9, fire: 9.5, shape: { type: "disc", x: 0, z: 0 } },
    ] } } };
    expect(w.update(g as never)).toEqual([{ key: "t3", species: "arena lane", x: 1, z: 2, start: 9.6, fire: 10.5 }]);
    expect(w.shortest).toBeCloseTo(0.9);
  });
});

describe("the Fight Arena's pack with an attack in the grammar (rules/attacks, the arena's hook)", () => {
  it("arms every wild one with it, and the timings see the engine's telegraphs, each with its lead", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "wolf*3@2", { wildOnly: true });
    expect(arenaAttack(g, '{ "cast": { "windup": 0.7, "range": 18 }, "emit": { "pattern": "fan", "n": 3, "angle": 40 }, "body": { "kind": "bolt" }, "speed": { "v": 18 } }')).toEqual([]);
    for (const id of g.arena!.ids) expect(g.creatures[id].spell).toBe("arena");
    const w = new TellWatch();
    let grammar = 0;
    for (let i = 0; i < 20 / STEP && !grammar; i++) {
      g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP);
      for (const t of w.update(g)) if (t.key.startsWith("t")) { grammar++; expect(t.species).toMatch(/^arena /); expect(t.fire - t.start).toBeGreaterThan(0); }
    }
    expect(grammar).toBeGreaterThan(0);
    expect(arenaAttack(g, '{ "body": { "kind": "dragon" } }')[0]).toMatch(/body\.kind/); // (refused, said why)
  }, 60000);
});
