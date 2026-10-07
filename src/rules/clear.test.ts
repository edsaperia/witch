// Ed's new core design (2026-10-07): clearing an area transforms its runestone at once; the waves keep their schedule and
// only celebrate at a stone that already plays; every area is peopled from the start by its place on the route, and
// nothing grows on a clock.
import { describe, expect, it } from "vitest";
import { loseSoundsystem, newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING, withTuning } from "./tuning";
import { cellKey, routeOf } from "./party";
import { clearedAreas, holdsArea } from "./clear";
import { countScale, routeExtra, routeIndex, startCount } from "./growth";
import { spawnCreatures } from "./creatures";
import { generateMap, AREA_TYPES } from "./map";
import { befriend } from "./creatureStates";
import { leyChain } from "./leylines";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, c: Controls = still) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };

/** A game under way, the witch high over home (out of every fight), the boot long done. */
function game(seed = 123, t = TUNING): Game {
  const g = newGame(seed, t);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  return g;
}
const own = (g: Game, key: string) => g.creatures.filter(c => cellKey(c.cell) === key);
/** Every one of an area's own creatures that holds it, invited (happy; the babies) or run off (the rest). */
function empty(g: Game, key: string): void {
  for (const c of own(g, key)) if (holdsArea(c)) { if (c.level === 0) befriend(c, g.clock.time); else c.gone = true; }
  g.byArea = null;
}

describe("pre-population by route (Ed, 2026-10-07: no growth on a clock)", () => {
  it("gives each area start plus per × its route index (times its count scale, rounded down), or the table's", () => {
    const R = { per: 0.5, table: [] as number[] };
    expect([1, 2, 3, 4, 5, 6].map(i => routeExtra(i, R, 1))).toEqual([0, 1, 1, 2, 2, 3]); // (what an area woken at that wave grew to)
    expect(routeExtra(4, R, 3)).toBe(6);
    expect([1, 2, 3, 9].map(i => routeExtra(i, { per: 0.5, table: [0, 2, 5] }, 1))).toEqual([0, 2, 5, 5]); // (the table's last for those past it)
    expect(routeExtra(3, { per: 0, table: [] }, 1)).toBe(0);
  });

  it("peoples every area from the start, the later on the route the more, the same from the same seed", () => {
    const map = generateMap(123, TUNING), all = spawnCreatures(map), order = routeOf(map).order, at = routeIndex(order), S = TUNING.population.start;
    expect(order.length).toBe(map.cells.length - 1); // (every area but home)
    const count = (key: string) => all.filter(c => cellKey(c.cell) === key && !c.boss && !c.circle).length;
    for (const key of order) {
      const [cx, cy] = key.split(",").map(Number), k = countScale(AREA_TYPES[map.typeOf(cx, cy)].creature);
      expect(count(key), key).toBe(startCount(S.babies, k) + startCount(S.young, k) + startCount(S.adults, k) + routeExtra(at.get(key)!, TUNING.population.byRoute, k));
    }
    const first = order.slice(0, 5).reduce((a, k) => a + count(k), 0), last = order.slice(-5).reduce((a, k) => a + count(k), 0);
    expect(last).toBeGreaterThan(first);
    expect(spawnCreatures(generateMap(123, TUNING)).map(c => [c.level, c.x, c.z])).toEqual(all.map(c => [c.level, c.x, c.z]));
    // A table shapes it freely (population.byRoute.table: Balance 2's).
    const flat = withTuning({ population: { ...TUNING.population, byRoute: { ...TUNING.population.byRoute, table: [0] } } });
    expect(spawnCreatures(generateMap(123, flat)).length).toBeLessThan(all.length);
  }, 60000);
});

describe("clearing an area transforms its runestone (Ed, 2026-10-07)", () => {
  it("raises its soundsystem at once, its babies (its circle's too) happy and dancing, its stone reached, no wave spent", () => {
    const g = game(), order = routeOf(g.map).order, key = order[2], wave = g.party.wave, next = g.party.next.map(cellKey);
    expect(clearedAreas(g.party, g.map, g.creatures)).toEqual([]); // (nothing cleared at the start)
    empty(g, key);
    expect(own(g, key).some(c => c.boss || c.circle)).toBe(own(g, key).some(c => c.boss)); // (its legend and circle baby stay: they don't count)
    run(g, 0.5);
    const a = g.party.areas.get(key)!;
    expect(a).toBeDefined(); expect(a.early).toBe(true); expect(a.soundsystem).not.toBeNull();
    expect(g.combat.sounds.has(key)).toBe(true);
    for (const c of own(g, key)) if (!c.gone && c.level === 0) expect(c.state, `${c.id}`).toBe("happy"); // (its circle's baby too)
    expect(own(g, key).filter(c => !c.gone && !c.boss).every(c => !c.enraged)).toBe(true);
    expect(g.party.wave).toBe(wave); expect(g.party.next.map(cellKey)).toEqual(next); // (the waves keep their schedule)
    expect(leyChain(g.party, g.map).stones.some(s => cellKey(s.cell) === key)).toBe(true);
    expect(g.party.ahead?.has(key)).toBe(true);
  }, 60000);

  it("a wave at a stone already playing changes nothing in the rules: no enraging, no second soundsystem; it celebrates", () => {
    const g = game(), key = cellKey(g.party.next[0]), after = g.party.afterNext.map(cellKey);
    empty(g, key);
    run(g, 0.5);
    expect(g.combat.sounds.has(key)).toBe(true);
    const sounds = g.combat.sounds.size, hp = g.combat.sounds.get(key)!.hp, areas = g.party.areas.size, at = g.party.areas.get(key)!.at;
    const enraged = g.creatures.filter(c => c.enraged).length, n = g.creatures.length;
    stepGame(g, { ...still, nextWave: true }, 1 / 60);
    expect(g.party.wave).toBe(1); // (the music's step, the countdown: on as ever)
    expect(g.waveEvents.filter(e => e.kind === "waveCelebrate")).toEqual([expect.objectContaining({ kind: "waveCelebrate", key, wave: 1 })]);
    expect(g.combat.sounds.size).toBe(sounds); expect(g.combat.sounds.get(key)!.hp).toBe(hp);
    expect(g.party.areas.size).toBe(areas); expect(g.party.areas.get(key)!.at).toBe(at); expect(g.party.areas.get(key)!.early).toBeUndefined();
    expect(g.creatures.filter(c => c.enraged).length).toBe(enraged); expect(g.creatures.length).toBe(n);
    expect(g.party.ahead?.has(key)).toBe(false);
    expect(g.party.next.map(cellKey)).toEqual(after); // (on to the next stone on the route)
    expect(g.party.waveAt?.[0]).toBe(g.clock.time);
  }, 60000);

  it("a wave still wakes a stone not yet cleared, as ever; and an early soundsystem lost is skipped quietly by its wave", () => {
    const g = game(), order = routeOf(g.map).order;
    // the second stone cleared, then lost before its wave
    empty(g, order[1]);
    run(g, 0.5);
    expect(g.combat.sounds.has(order[1])).toBe(true);
    const s = g.combat.sounds.get(order[1])!;
    s.hp = 0; loseSoundsystem(g, order[1], s.x, s.z);
    expect(g.party.ruined?.has(order[1])).toBe(true);
    // the first wave: the first stone, woken as ever
    stepGame(g, { ...still, nextWave: true }, 1 / 60); stepGame(g, still, 1 / 60);
    expect(g.party.areas.get(order[0])?.early).toBeUndefined();
    expect(g.combat.sounds.has(order[0])).toBe(true);
    expect(g.party.next.map(cellKey)).toEqual([order[1]]); // (its place on the route kept)
    // the second: at the ruined stone, nothing; then on to the third
    stepGame(g, { ...still, nextWave: true }, 1 / 60);
    expect(g.waveEvents.some(e => e.kind === "waveCelebrate")).toBe(false);
    expect(g.party.areas.has(order[1])).toBe(false);
    expect(g.party.next.map(cellKey)).toEqual([order[2]]);
  }, 60000);

  it("clears no area while any of its own wild (or enraged) creatures is about; its legend and circle baby don't count", () => {
    const g = game(), key = routeOf(g.map).order[4];
    const holders = own(g, key).filter(holdsArea);
    expect(holders.length).toBeGreaterThan(0);
    expect(holders.some(c => c.boss || c.circle)).toBe(false);
    empty(g, key);
    const last = own(g, key).find(c => c.level > 0)!;
    last.gone = false; // one left
    expect(clearedAreas(g.party, g.map, g.creatures).map(cellKey)).not.toContain(key);
    last.leashed = true; // invited and leashed
    expect(clearedAreas(g.party, g.map, g.creatures).map(cellKey)).toContain(key);
  }, 60000);

  it("plays the same from the same seed", () => {
    const play = () => { const g = game(7), key = routeOf(g.map).order[3]; empty(g, key); run(g, 1); stepGame(g, { ...still, nextWave: true }, 1 / 60); return [...g.party.areas.keys(), g.party.wave, g.creatures.length, g.combat.sounds.size]; };
    expect(play()).toEqual(play());
  }, 60000);
});
