// Ed's new core design (2026-10-07): clearing an area transforms its runestone at once; the waves keep their schedule and
// only celebrate at a stone that already plays; every area is peopled from the start by its place on the route, and
// nothing grows on a clock.
import { describe, expect, it } from "vitest";
import { affectionOf, loseSoundsystem, newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey, routeOf } from "./party";
import { clearCue, clearableAt, clearedAreas, holdsArea, wildLeft } from "./clear";
import { routeIndex, routePopulation } from "./growth";
import { POWER_TABLE, buildSwarm, capOf, estimatedPower, referenceAt, swarmPower, targetPower, type PowerTable } from "./swarm";
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
/** Every one of an area's own creatures that holds it (its young and adults) run off. */
function empty(g: Game, key: string): void {
  for (const c of own(g, key)) if (holdsArea(c)) c.gone = true;
  g.byArea = null;
}

describe("the hostile swarms by the runestone order (Ed, 2026-10-08)", () => {
  const W = TUNING.population.swarm, kinds = [...new Set(AREA_TYPES.map(t => t.creature))], F5 = [0, 0.25, 0.5, 0.75, 1];
  /** Every swarm a species could field (up to its cap) and its distance from the target at f. */
  const options = (f: number, sp: string) => { const T = targetPower(f, W), out: { y: number; a: number; err: number }[] = []; for (let n = 1; n <= capOf(sp, W); n++) for (let y = 0; y <= n; y++) out.push({ y, a: n - y, err: Math.abs(swarmPower(sp, y, n - y) - T) / T }); return out; };
  const errOf = (f: number, sp: string) => { const [y, a] = buildSwarm(f, W, sp); return Math.abs(swarmPower(sp, y, a) - targetPower(f, W)) / targetPower(f, W); };

  it("every species at five places along the order comes within 15% of the target (or as near as any swarm it could field)", () => {
    for (const f of F5) for (const sp of kinds) {
      const best = Math.min(...options(f, sp).map(o => o.err));
      expect(errOf(f, sp), `${sp} at ${f}`).toBeLessThanOrEqual(Math.max(W.tolerance, best) + 1e-9);
    }
    for (const f of [0.25, 0.5, 0.75, 1]) for (const sp of kinds) expect(errOf(f, sp), `${sp} at ${f}`).toBeLessThanOrEqual(0.15);
  });

  it("the caps hold, and a mix of young and adults is chosen wherever one comes within tolerance", () => {
    for (const f of [...F5, 0.1, 0.6, 0.9]) for (const sp of kinds) {
      const [y, a] = buildSwarm(f, W, sp);
      expect(y + a, `${sp} at ${f}`).toBeLessThanOrEqual(capOf(sp, W));
      if (options(f, sp).some(o => o.y > 0 && o.a > 0 && o.err <= W.tolerance)) expect(y > 0 && a > 0, `${sp} at ${f}: ${y} young, ${a} adults`).toBe(true);
    }
  });

  it("at the last runestone the swarms average endAverage (12): strong kinds 5 to 6, none over 20; mostly young early, mostly adults late", () => {
    const end = kinds.map(sp => buildSwarm(1, W, sp)).map(([y, a]) => y + a);
    expect(Math.abs(end.reduce((x, y) => x + y, 0) / end.length - W.endAverage)).toBeLessThanOrEqual(1);
    for (const sp of ["bear", "boar", "elk", "stag", "badger", "ram", "beaver"]) { const [y, a] = buildSwarm(1, W, sp); expect(y + a, sp).toBeGreaterThanOrEqual(5); expect(y + a, sp).toBeLessThanOrEqual(6); }
    expect(Math.max(...end)).toBeLessThanOrEqual(20);
    const share = (f: number) => { const s = kinds.map(sp => buildSwarm(f, W, sp)); return s.reduce((x, [y]) => x + y, 0) / s.reduce((x, [y, a]) => x + y + a, 0); };
    expect(share(0.25)).toBeGreaterThan(0.5); expect(share(1)).toBeLessThan(0.3);
    for (let f = 0; f < 1; f += 0.1) { expect(targetPower(f + 0.1, W)).toBeGreaterThan(targetPower(f, W)); expect(referenceAt(f + 0.1, W).young).toBeLessThanOrEqual(referenceAt(f, W).young + 1e-9); }
    expect(referenceAt(0, W).size).toBe(W.start); expect(referenceAt(1, W).size).toBe(W.endAverage);
  });

  it("the simulated table, where it has a measurement, stands in for estimatedPower (its young shares by a straight line)", () => {
    const shares = [0, 0.5, 1], est = (y: number, a: number) => estimatedPower("wolf", y, a);
    // A wolf measured twice as strong as estimated at every size but 5: the builder fields a weaker swarm by the estimate.
    const sizes = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12], table: PowerTable = { version: 1, youngShares: shares, species: { wolf: { sizes, power: sizes.map(n => shares.map(s => 2 * est(n * s, n - n * s))) } } };
    expect(swarmPower("wolf", 2, 2, table)).toBeCloseTo(2 * est(2, 2));
    expect(swarmPower("wolf", 1, 3, table)).toBeCloseTo(2 * (est(0, 4) + est(2, 2)) / 2); // (a quarter young: halfway between 0 and 0.5)
    expect(swarmPower("wolf", 2, 3, table)).toBeCloseTo(est(2, 3)); // (5 not measured: estimated)
    expect(swarmPower("fox", 2, 2, table)).toBeCloseTo(estimatedPower("fox", 2, 2)); // (no entry: estimated)
    const plain = buildSwarm(0.5, W, "wolf", { ...table, species: {} }), sim = buildSwarm(0.5, W, "wolf", table);
    expect(est(...sim)).toBeLessThan(est(...plain) * 0.75);
    expect(sim[0] + sim[1]).not.toBe(5); // (only measured sizes come near)
    // The shipped table is well formed.
    expect(POWER_TABLE.youngShares[0]).toBe(0); expect(POWER_TABLE.youngShares[POWER_TABLE.youngShares.length - 1]).toBe(1);
    for (const [sp, e] of Object.entries(POWER_TABLE.species)) { expect(kinds, sp).toContain(sp); expect(e.power.length, sp).toBe(e.sizes.length); for (const row of e.power) expect(row.length, sp).toBe(POWER_TABLE.youngShares.length); }
  });

  it("the first wild area holds at least one hostile; every area has its two babies", () => {
    const R = TUNING.population.byRoute, S = TUNING.population.start;
    for (const sp of kinds) {
      const p = routePopulation(1, 90, R, W, S, sp);
      expect(p[1] + p[2], sp).toBeGreaterThanOrEqual(1);
      expect(p[0], sp).toBe(R.babies);
    }
  });

  it("peoples every area from the start by its place on the route, the later the more, the same from the same seed", () => {
    const map = generateMap(123, TUNING), all = spawnCreatures(map), order = routeOf(map).order, at = routeIndex(order), T = TUNING.population;
    expect(order.length).toBe(map.cells.length - 1); // (every area but home)
    const levels = (key: string) => [0, 1, 2].map(l => all.filter(c => cellKey(c.cell) === key && !c.boss && !c.circle && c.level === l).length);
    const kind = (key: string) => { const [cx, cy] = key.split(",").map(Number); return AREA_TYPES[map.typeOf(cx, cy)].creature; };
    for (const key of order) expect(levels(key), key).toEqual(routePopulation(at.get(key)!, at.size, T.byRoute, T.swarm, T.start, kind(key)));
    const P = (keys: string[]) => keys.reduce((a, k) => { const [, y, ad] = levels(k); return a + estimatedPower(kind(k), y, ad); }, 0);
    expect(P(order.slice(-5))).toBeGreaterThan(P(order.slice(0, 5)) * 10);
    expect(spawnCreatures(generateMap(123, TUNING)).map(c => [c.level, c.x, c.z])).toEqual(all.map(c => [c.level, c.x, c.z]));
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
    expect(g.party.areas.get(key)!.celebrated).toBe(g.clock.time); // (kept: its lasers stay on)
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
    const last = own(g, key).find(c => !c.boss && !c.circle && c.level > 0)!; // (minHostile: every wild area has one)
    last.gone = false; last.state = undefined; // one left, wild
    expect(clearedAreas(g.party, g.map, g.creatures).map(cellKey)).not.toContain(key);
    last.leashed = true; // invited and leashed
    expect(clearedAreas(g.party, g.map, g.creatures).map(cellKey)).toContain(key);
  }, 60000);

  it("babies never hold it (Ed, 2026-10-07: 'Wild babies don't count'): with only its wild babies left it transforms, and they join the party", () => {
    const g = game(), key = routeOf(g.map).order[4];
    const babies = own(g, key).filter(c => c.level === 0 && !c.circle && !c.gone && c.state !== "happy");
    expect(babies.length, "the area has wild babies").toBeGreaterThan(0);
    expect(babies.some(holdsArea)).toBe(false);
    empty(g, key);
    expect(clearedAreas(g.party, g.map, g.creatures).map(cellKey)).toContain(key);
    run(g, 0.5);
    expect(g.party.areas.has(key)).toBe(true);
    for (const c of babies) { expect(c.state, `baby ${c.id}`).toBe("happy"); expect(c.dancing, `baby ${c.id} dances`).toBeTruthy(); }
  }, 60000);

  it("its wave transforming it uncleared, its wild babies join the party too (Ed, 2026-10-07: 'Wild babies become party babies when the pulse transforms an uncleared area'); its young and adults besiege", () => {
    const g = game(), key = cellKey(g.party.next[0]);
    const babies = own(g, key).filter(c => c.level === 0 && !c.circle && !c.gone && c.state !== "happy");
    const hostiles = own(g, key).filter(holdsArea);
    expect(babies.length, "the area has wild babies").toBeGreaterThan(0);
    expect(hostiles.length, "and is uncleared").toBeGreaterThan(0);
    stepGame(g, { ...still, nextWave: true }, 1 / 60);
    run(g, 0.5);
    expect(g.party.areas.has(key)).toBe(true);
    for (const c of babies) { expect(c.state, `baby ${c.id}`).toBe("happy"); expect(c.dancing, `baby ${c.id} dances`).toBeTruthy(); }
    expect(hostiles.some(c => c.enraged || c.siege), "its young and adults besiege, as before").toBe(true);
  }, 60000);

  it("plays the same from the same seed", () => {
    const play = () => { const g = game(7), key = routeOf(g.map).order[3]; empty(g, key); run(g, 1); stepGame(g, { ...still, nextWave: true }, 1 / 60); return [...g.party.areas.keys(), g.party.wave, g.creatures.length, g.combat.sounds.size]; };
    expect(play()).toEqual(play());
  }, 60000);
});

describe("what's left to clear (Ed's playtest, 2026-10-07: the HUD's count, and pointers to the last few)", () => {
  it("lists the area's own still holding it, the area she's in if it can still be cleared, and says so in words", () => {
    const g = game(), key = routeOf(g.map).order[3], [cx, cy] = key.split(",").map(Number) as [number, number];
    const left = wildLeft(g.creatures, [cx, cy]);
    expect(left.length).toBeGreaterThan(0);
    expect(left.every(c => holdsArea(c) && !c.boss && !c.circle && cellKey(c.cell) === key)).toBe(true);
    const one = left[0];
    expect(clearableAt(g.party, g.map, one.x, one.z) === null || cellKey(clearableAt(g.party, g.map, one.x, one.z)!) === cellKey(g.map.cellSafe(one.x, one.z).cell)).toBe(true);
    const d = g.map.dancefloor;
    expect(clearableAt(g.party, g.map, d.x, d.z)).toBeNull(); // (home)
    one.asleep = true;
    const cue = clearCue(left);
    expect(cue.n).toBe(left.length); expect(cue.asleep).toBe(1);
    expect(cue.text).toContain(`${left.length} wild`); expect(cue.text).toContain("1 asleep");
    expect(clearCue([]).text).toBe("");
    empty(g, key);
    expect(wildLeft(g.creatures, [cx, cy])).toEqual([]);
    run(g, 0.5);
    expect(g.party.areas.has(key)).toBe(true);
    const site = g.map.siteOf(cx, cy);
    if (cellKey(g.map.cellSafe(site.x, site.z).cell) === key) expect(clearableAt(g.party, g.map, site.x, site.z)).toBeNull(); // (cleared: nothing to say)
  }, 60000);

  it("a sleeper isn't to be invited from the treetops, and holds its area till she lands in it and wakes it (what Ed met)", () => {
    const g = game(), key = routeOf(g.map).order[4], [cx, cy] = key.split(",").map(Number) as [number, number];
    const A = affectionOf(g), left = wildLeft(g.creatures, [cx, cy]);
    const sleeper = left[0];
    sleeper.asleep = true; sleeper.napUntil = g.clock.time + 999;
    for (const c of left) if (c !== sleeper) befriend(c, g.clock.time);
    expect(A.invitable(sleeper)).toBe(false);
    run(g, 0.5);
    expect(g.party.areas.has(key), "the sleeper holds it").toBe(false);
    expect(clearCue(wildLeft(g.creatures, [cx, cy])).text).toContain("1 asleep");
    // she lands in its area: it wakes (and can be invited)
    g.witch = { ...g.witch, x: sleeper.x, z: sleeper.z + 3, mode: "ground", lift: 0 };
    run(g, 2);
    expect(sleeper.asleep).toBeFalsy();
  }, 60000);
});

describe("only an area's natives count (Ed, 2026-10-07: visitors from next door 'wouldn't get enraged when the runestone transforms')", () => {
  it("a visitor standing in a cleared area doesn't block it, isn't counted, and isn't touched when its stone transforms; a native wandered off still holds it", () => {
    const g = game(), order = routeOf(g.map).order, other = order[6];
    // an area of two or more young and adults (the first ring's may hold only minHostile's one)
    const key = order.slice(1).find(k => k !== other && wildLeft(g.creatures, k.split(",").map(Number) as [number, number]).length >= 2)!;
    const [cx, cy] = key.split(",").map(Number) as [number, number];
    // a wild visitor from another area, standing in this one
    const visitor = g.creatures.find(c => cellKey(c.cell) === other && holdsArea(c) && c.level > 0)!;
    const inside = wildLeft(g.creatures, [cx, cy])[0];
    Object.assign(visitor, { x: inside.x + 1, z: inside.z + 1, tx: inside.x + 1, tz: inside.z + 1 });
    // a native that has wandered out of it
    const native = wildLeft(g.creatures, [cx, cy]).find(c => c !== inside)!;
    const far = g.map.siteOf(...(other.split(",").map(Number) as [number, number]));
    expect(wildLeft(g.creatures, [cx, cy])).not.toContain(visitor);
    empty(g, key);
    Object.assign(native, { gone: false, state: undefined, x: far.x, z: far.z, tx: far.x, tz: far.z });
    expect(wildLeft(g.creatures, [cx, cy])).toEqual([native]); // (the native, wherever it is; never the visitor)
    run(g, 0.5);
    expect(g.party.areas.has(key), "the native away still holds it").toBe(false);
    native.state = "happy";
    run(g, 0.5);
    expect(g.party.areas.has(key), "cleared with the visitor in it").toBe(true);
    expect(visitor.enraged, "the visitor isn't enraged").toBeFalsy();
    expect(visitor.siege).toBeUndefined();
    expect(visitor.state).toBeUndefined();
  }, 60000);
});
