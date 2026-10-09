// Ed's new core design (2026-10-07): clearing an area transforms its runestone at once; the waves keep their schedule and
// only celebrate at a stone that already plays; every area is peopled from the start by its place on the route, and
// nothing grows on a clock.
import { describe, expect, it } from "vitest";
import { affectionOf, loseSoundsystem, newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey, routeOf } from "./party";
import { clearCue, clearableAt, clearedAreas, holdsArea, wildLeft } from "./clear";
import { routeIndex, routePopulation } from "./growth";
import { POWER_TABLE, buildSwarm, capAt, capOf, classOf, estimatedPower, powerOf, referenceAt, swarmTotals, targetPower, type PowerTable } from "./swarm";
import { classStrengths, strengthOf } from "./combat/data";
import { spawnCreatures } from "./creatures";
import { generateMap, AREA_TYPES } from "./map";
import { befriend } from "./creatureStates";
import { leyChain, waveReached } from "./leylines";
import { leyPulse, leyReachTimes, straightLink } from "./leypulse";
import { leyReveal } from "../render/leylines";

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

describe("the hostile swarms by the runestone order (Ed, 2026-10-08: the swarm plan, phase 1)", () => {
  const W = TUNING.population.swarm, kinds = [...new Set(AREA_TYPES.map(t => t.creature))], P5 = [0, 0.25, 0.5, 0.75, 1];
  /** Every swarm a species could field at p (up to its cap there) and its distance from the target. */
  const options = (p: number, sp: string) => { const T = targetPower(p, W), out: { y: number; a: number; err: number }[] = []; for (let n = 1; n <= capAt(sp, p, W); n++) for (let y = 0; y <= n; y++) out.push({ y, a: n - y, err: Math.abs(powerOf(sp, y, n - y) - T) / T }); return out; };
  const errOf = (p: number, sp: string) => { const [y, a] = buildSwarm(p, W, sp); return Math.abs(powerOf(sp, y, a) - targetPower(p, W)) / targetPower(p, W); };

  it("three classes, strength 12 / cap: strong 6 (×2), medium 12 (×1, every species not listed), light 16 (×0.75)", () => {
    expect(Object.fromEntries(Object.entries(W.classes).map(([k, c]) => [k, c.cap]))).toEqual({ strong: 6, medium: 12, light: 16 });
    for (const sp of kinds) { const c = classOf(sp, W); expect(strengthOf(sp, 1), sp).toBeCloseTo(12 / W.classes[c].cap, 9); expect(capOf(sp, W), sp).toBe(W.classes[c].cap); }
    expect(classOf("bear", W)).toBe("strong"); expect(classOf("wolf", W)).toBe("medium"); expect(classOf("hedgehog", W)).toBe("light"); expect(classOf("bat", W)).toBe("light");
    for (const sp of Object.values(W.classes).flatMap(c => c.species)) expect(kinds, sp).toContain(sp);
    expect(Object.values(W.classes).flatMap(c => c.species).length).toBe(new Set(Object.values(W.classes).flatMap(c => c.species)).size); // (each in one class)
    expect(classStrengths({ reference: "medium", classes: { medium: { cap: 12, species: [] }, big: { cap: 4, species: ["x"] } } })).toEqual({ x: 3 });
  });

  it("the target: a medium reference swarm of 1 + 11·p^1.3, its young share 1.0 to 0.2; growing along the order", () => {
    expect(referenceAt(0, W)).toEqual({ size: 1, young: 1 });
    expect(referenceAt(1, W).size).toBe(12); expect(referenceAt(1, W).young).toBeCloseTo(0.2, 9);
    expect(referenceAt(0.5, W).size).toBeCloseTo(1 + 11 * Math.pow(0.5, 1.3), 9);
    expect(targetPower(0, W)).toBe(45 * 3); // (one young)
    for (let p = 0; p < 1; p += 0.1) expect(targetPower(p + 0.1, W)).toBeGreaterThan(targetPower(p, W));
    const t = swarmTotals("bear", 1, 2); expect(t).toEqual({ hp: (45 + 320) * 2, siegeDps: (3 + 20) * 2, witchThreat: 3 }); expect(estimatedPower("bear", 1, 2)).toBe(t.hp * t.siegeDps);
  });

  it("every species at p = 0, .25, .5, .75 and 1 comes within 15% of the target (or, at the first stone, as near as one creature can)", () => {
    for (const p of P5) for (const sp of kinds) {
      const best = Math.min(...options(p, sp).map(o => o.err));
      expect(errOf(p, sp), `${sp} at ${p}`).toBeLessThanOrEqual(Math.max(0.15, best + W.mixTolerance) + 1e-9);
      if (p > 0) expect(errOf(p, sp), `${sp} at ${p}`).toBeLessThanOrEqual(0.15);
    }
  });

  it("the caps hold (grown along the curve), and a mix of young and adults is chosen wherever one is within mixTolerance of the nearest", () => {
    for (const p of [...P5, 0.1, 0.6, 0.9]) for (const sp of kinds) {
      const [y, a] = buildSwarm(p, W, sp), o = options(p, sp), best = Math.min(...o.map(c => c.err));
      expect(y + a, `${sp} at ${p}`).toBeLessThanOrEqual(capAt(sp, p, W)); expect(capAt(sp, p, W)).toBeLessThanOrEqual(capOf(sp, W));
      expect(y + a, `${sp} at ${p}`).toBeGreaterThanOrEqual(1);
      if (o.some(c => c.y > 0 && c.a > 0 && c.err <= best + W.mixTolerance)) expect(y > 0 && a > 0, `${sp} at ${p}: ${y} young, ${a} adults`).toBe(true);
    }
    expect(capAt("hedgehog", 1, W)).toBe(16); expect(capAt("bear", 1, W)).toBe(6); expect(capAt("wolf", 0, W)).toBe(2);
  });

  it("at the last runestone the swarms average endAverage (12), none over 16; mostly young early, mostly adults late", () => {
    const end = kinds.map(sp => buildSwarm(1, W, sp)).map(([y, a]) => y + a);
    expect(Math.abs(end.reduce((x, y) => x + y, 0) / end.length - W.endAverage)).toBeLessThanOrEqual(0.5);
    expect(Math.max(...end)).toBeLessThanOrEqual(16);
    const share = (p: number) => { const s = kinds.map(sp => buildSwarm(p, W, sp)); return s.reduce((x, [y]) => x + y, 0) / s.reduce((x, [y, a]) => x + y + a, 0); };
    expect(share(0.25)).toBeGreaterThan(0.5); expect(share(1)).toBeLessThan(0.3);
  });

  it("powerOf reads the simulated table where it has the swarm, else the estimate; the builder follows it", () => {
    // A wolf measured twice as strong as estimated at every size up to 12.
    const species: PowerTable["species"] = { wolf: {} };
    for (let n = 1; n <= 12; n++) species.wolf[String(n)] = Array.from({ length: n + 1 }, (_, y) => 2 * estimatedPower("wolf", y, n - y));
    const table: PowerTable = { version: 1, species };
    expect(powerOf("wolf", 2, 3, table)).toBe(2 * estimatedPower("wolf", 2, 3));
    expect(powerOf("fox", 2, 3, table)).toBe(estimatedPower("fox", 2, 3)); // (no entry)
    expect(powerOf("wolf", 2, 3, { version: 1, species: { wolf: { "5": [1, 2] } } })).toBe(estimatedPower("wolf", 2, 3)); // (no such young count)
    const plain = buildSwarm(0.75, W, "wolf", { version: 1, species: {} }), sim = buildSwarm(0.75, W, "wolf", table);
    expect(estimatedPower("wolf", ...sim)).toBeLessThan(estimatedPower("wolf", ...plain) * 0.75);
    expect(POWER_TABLE).toEqual(expect.objectContaining({ version: 1, species: {} })); // (phase 1: estimated only)
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

describe("an area cleared ahead of the pulse (Ed, 2026-10-08: 'the pulse jumps to the area's runestone')", () => {
  // Cleared early, an area transforms at once, but the ley line and its pulse keep their own pace along the route: its
  // stone counts as reached only when its wave comes (rules/leylines.ts waveReached, party.ts passed()).
  const round = <T,>(v: T): T => (typeof v === "number" ? Math.round(v * 1e6) / 1e6 : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, round(x)])) : v) as T; // (to a rounding: reckoned on from the pulse's last step)
  const view = (g: Game, at: number) => {
    const c = leyChain(g.party, g.map), times = leyReachTimes(g.party, g.map);
    return { current: cellKey(c.stones[c.current].cell), stones: c.stones.map(s => cellKey(s.cell)), link: straightLink(g.party, g.map), pulse: round(leyPulse(g.party, g.map, at)), reveal: round(leyReveal(g.party, g.map, at, 3)), times: times && [...times].map(([k, t]) => [k, Number.isFinite(t) ? Math.round(t * 1e4) / 1e4 : t]) }; // (to a rounding: reckoned from the pulse now)
  };

  it("leaves the pulse, its link, the line's front and every stone's reach time as they were", () => {
    const g = game(), order = routeOf(g.map).order;
    stepGame(g, { ...still, nextWave: true }, 1 / 60); // (a wave in: the pulse on its way to the next stone)
    g.party.bootUntil = Math.min(g.party.bootUntil, g.clock.time - 1); // (the boot long over: the pulse under way)
    const at = g.clock.time + 5, chain = leyChain(g.party, g.map), key = cellKey(chain.stones[chain.current + 2].cell); // (two stones past the pulse's)
    expect(order).toContain(key);
    const before = view(g, at);
    expect(before.pulse).not.toBeNull();
    empty(g, key); run(g, 0.5);
    expect(g.party.areas.get(key)?.early).toBe(true); // (it did transform)
    expect(view(g, at)).toEqual(before);
    expect(waveReached(g.party, key)).toBeUndefined();
  }, 60000);

  it("counts its stone reached when its wave comes, at the wave's time, in the route's order", () => {
    const g = game(), key = cellKey(g.party.next[0]);
    empty(g, key); run(g, 0.5);
    expect(cellKey(leyChain(g.party, g.map).stones[leyChain(g.party, g.map).current].cell)).toBe(cellKey(g.map.centreCell)); // (still home's)
    stepGame(g, { ...still, nextWave: true }, 1 / 60);
    const c = leyChain(g.party, g.map), wave = g.party.waveAt![0];
    expect(cellKey(c.stones[c.current].cell)).toBe(key);
    expect(waveReached(g.party, key)).toBe(wave);
    expect(leyReachTimes(g.party, g.map)!.get(key)).toBeLessThanOrEqual(wave);
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
