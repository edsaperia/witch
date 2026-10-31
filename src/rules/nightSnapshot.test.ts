import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { snapshotGame, restoreGame } from "./nightSnapshot";
import { rng, rngState } from "./random";
import { inviteCreature } from "./leash";
import { knockOut } from "./knockout";
import { spreadWave } from "./party";
import { largestWorldTuning } from "../test/worlds";

const idle: Controls = { moveX: 0, moveZ: 0, zoom: 0, toggleMode: false };
// Largest shipped home world: snapshot graphs and continuation must include the full creature/area roster; named later islands retain their authored layouts.
const fresh = (island = "home") => { const t = structuredClone(TUNING); t.map!.island = island; t.map!.islandAreas = 10; return newGame(123, island === "home" ? largestWorldTuning(t) : t); };
const roundtrip = (g: Game) => restoreGame(JSON.parse(JSON.stringify(snapshotGame(g))));
function stable(g: Game) { const paused = g.clock.paused; g.clock.paused = false; try { return snapshotGame(g); } finally { g.clock.paused = paused; } }

describe("a whole night's snapshot", () => {
  it("keeps seeded streams at their cursor without changing the existing generator", () => {
    const a = rng(123); expect([a(), a(), a()]).toEqual([0.7872516233474016, 0.1785435655619949, 0.49531551403924823]);
    const b = rng(rngState(a)!); expect([b(), b(), b()]).toEqual([a(), a(), a()]);
    expect(rngState(Math.random)).toBeUndefined();
  });

  it("roundtrips a played night, its maps, sets, typed buffers, shared references and infinities", () => {
    const g = fresh(); g.clock.paused = false;
    for (let i = 0; i < 120; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
    const c = g.creatures.find(c => !c.boss)!;
    inviteCreature(g.leash, c, c.x, c.z, g.clock.time);
    g.friendly.add("test"); g.wildEntry.set("test", { at: 1, until: 4, last: 2, danger: 0.5 });
    const placed = g.creatures.find(p => !p.boss && p.id !== c.id)!;
    placed.leashed = true;
    g.leash.placed.push({ id: placed.id, x: placed.x, z: placed.z, at: g.clock.time });
    // Shared values stay shared, rather than two copies which may diverge after the next step.
    const meal = { berry: 0, eating: false, eatLeft: 0 };
    g.berries.feeding.set(100_001, meal); g.berries.feeding.set(100_002, meal);
    g.legendIds = [c.id];
    const h = roundtrip(g);
    expect(h.witch).toBe(h.witches[0].body); expect(h.leash).toBe(h.witches[0].leash);
    expect(h.friendly).toEqual(g.friendly); expect(h.wildEntry).toEqual(g.wildEntry);
    expect(h.berries.onBush).toEqual(g.berries.onBush); expect(h.berries.onBush).toBeInstanceOf(Int32Array);
    expect(h.berries.feeding.get(100_001)).toBe(h.berries.feeding.get(100_002));
    expect(h.growth.lookedAt).toBe(g.growth.lookedAt);
    expect(h.witches[0].health.repairAt).toBe(Infinity);
    expect(h.leash.stack).toEqual(g.leash.stack);
    expect(h.leash.placed).toEqual(g.leash.placed);
    expect(h.map.typeOf(...h.map.centreCell)).toBe(g.map.typeOf(...g.map.centreCell));
    expect(h.forest.treesNear(h.witch.x, h.witch.z, 5)).toEqual(g.forest.treesNear(g.witch.x, g.witch.z, 5));
    expect(h.clock.paused).toBe(true); expect(h.pending).toEqual({}); expect(h.acc).toBe(0);
    expect(stable(h)).toEqual(stable(g));
  });

  it("continues the same simulation, including RNG, after later waves and a knockout", () => {
    const g = fresh(); g.clock.paused = false;
    for (let i = 0; i < 60; i++) stepGame(g, idle, STEP);
    spreadWave(g.party, g.map, g.clock.time);
    // A creature materialized by wild growth has an id beyond the starting population.
    g.creatures.push({ ...g.creatures[0], id: g.creatures.length, rand: rng(9191) });
    const c = g.creatures.find(c => !c.boss)!;
    inviteCreature(g.leash, c, c.x, c.z, g.clock.time);
    g.witches[0].ko = knockOut(g.leash, g.creatures, g.herTime, g.tuning);
    if (g.trunk) { g.trunk.item = "test"; }
    const h = roundtrip(g); h.clock.paused = false;
    for (let i = 0; i < 240; i++) { const input = { ...idle, moveZ: i % 60 < 30 ? 1 : -1 }; stepGame(g, input, STEP); stepGame(h, input, STEP); }
    expect(stable(h)).toEqual(stable(g));
  });

  it("rejects incompatible, incomplete, executable and malformed saves", () => {
    expect(() => restoreGame(null)).toThrow();
    const s = snapshotGame(fresh());
    expect(() => restoreGame({ ...s, version: 99 })).toThrow();
    expect(() => restoreGame({ ...s, state: { root: { ref: -1 }, nodes: [] } })).toThrow();
    expect(() => restoreGame({ ...s, state: { root: { ref: 0 }, nodes: [{ kind: "object", keys: ["__proto__"], values: [null] }] } })).toThrow();
    expect(() => restoreGame({ ...s, state: { root: { ref: 0 }, nodes: [{ kind: "object", keys: [], values: [] }] } })).toThrow();
    const badCursor = structuredClone(s), random = badCursor.state.nodes.find(n => n.kind === "random")!;
    random.cursor = -1; expect(() => restoreGame(badCursor)).toThrow();
    const extra = structuredClone(s), root = extra.state.nodes[(extra.state.root as { ref: number }).ref];
    root.keys!.push("unexpectedState"); root.values.push(null);
    expect(() => restoreGame(extra)).toThrow();
    const g = fresh(); g.berries.rand = Math.random;
    expect(() => snapshotGame(g)).toThrow();
  });

  it("measures home and a later island's snapshot budget", () => {
    for (const island of ["home", "wolf", "unicorn"]) {
      const g = fresh(island), start = performance.now(), text = JSON.stringify(snapshotGame(g));
      console.info(`snapshot ${island}: ${g.creatures.length} creatures, ${text.length} chars, ${(performance.now() - start).toFixed(1)} ms`);
      expect(text.length).toBeLessThan(4_000_000);
    }
  });
});
