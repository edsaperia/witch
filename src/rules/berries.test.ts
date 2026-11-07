import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { COMBAT } from "./combat";
import { berryPatches, cancelFeeding, feed, feedRoom, hasRoom, newBerries, queueBerry, queuedFor, stepBerries, toEvolve, type BerryState, berryCounts } from "./berries";
import { LEGEND, spawnCreatures, type Creature, type Level } from "./creatures";
import { invitable, leashSpeed, newLeash } from "./leash";
import { generateMap, stumpClearance } from "./map";
import { TUNING, withTuning } from "./tuning";
import { smallWorldTuning } from "../test/worlds";

/** Every species at strength 1 for these tests (Ed, 2026-10-08, gave the species strengths by class; these test other
 *  mechanics, written when every species was 1): combat.json strength.species emptied for the block, put back after. */
const SAVED_STRENGTH = { ...COMBAT.strength!.species };
const plainStrength = () => { for (const k of Object.keys(COMBAT.strength!.species)) delete COMBAT.strength!.species[k]; };
const restoreStrength = () => Object.assign(COMBAT.strength!.species, SAVED_STRENGTH);

// Retain the full population for area-distribution ratios, patch coverage and the separated berry-index fixtures.
const map = generateMap(123, TUNING), t = TUNING;
const mechanicsMap = () => generateMap(123, smallWorldTuning(TUNING, "Evolution counters and one creature's leash pace do not depend on world size."));
const bushesOk = (s: BerryState) => {
  const seen = new Set<number>();
  for (const b of s.berries) { expect(seen.has(b.bush)).toBe(false); seen.add(b.bush); expect(s.onBush[b.bush]).toBe(b.id); }
  expect([...s.onBush].filter(i => i >= 0).length).toBe(s.berries.length);
};
// A creature standing next to a berry, as a party animal (leashed) or a wild one.
const beside = (s: BerryState, c: Creature, i: number, leashed: boolean, level: Level) => {
  const p = s.bushes[s.berries[i].bush];
  Object.assign(c, { x: p.x + 1, z: p.z + 1, leashed, level, rest: 0 });
  return { x: p.x + 1, z: p.z + 1 };
};
const run = (s: BerryState, cs: Creature[], points: Map<number, { x: number; z: number }>, secs: number, from = 0) => {
  let time = from;
  for (let i = 0; i < secs * 20; i++) { time += 0.05; stepBerries(s, cs, id => points.get(id) ?? null, time, 0.05, t); }
  return time;
};

describe("berries and evolving", () => {
  beforeAll(plainStrength); afterAll(restoreStrength);
  it("keeps berry indexing, exercised configured area bounds and exact seed replay", () => {
    const s = newBerries(map, t), [lo, hi] = berryCounts(map, t).perArea; // (scaled to the areas' size)
    bushesOk(s);
    const per = new Map<string, number>();
    for (const b of s.berries) { const c = map.areaAt(s.bushes[b.bush].x, s.bushes[b.bush].z).cell.join(","); per.set(c, (per.get(c) ?? 0) + 1); }
    const counts = [...per.values()];
    expect(counts.length).toBeGreaterThan(0);
    expect(counts.every(n => n >= Math.min(lo, 1) && n <= hi)).toBe(true);
    // C1 reports area coverage and the lower-bound share; configured per-area bounds remain.
    const again = newBerries(map, t);
    expect(again.berries.map(b => b.bush)).toEqual(s.berries.map(b => b.bush));
    expect(again.bushes.slice(0, 50)).toEqual(s.bushes.slice(0, 50));
  });

  /** Every berry taken but `n`, those set round (x, z) at `d` metres (a ring), for a clean test. */
  const only = (s: BerryState, n: number, x: number, z: number, d = 3) => {
    for (const b of s.berries) b.claimedBy = -1;
    return s.berries.slice(0, n).map((b, i) => { b.claimedBy = null; Object.assign(s.bushes[b.bush], { x: x + Math.cos(i * 1.3) * d, z: z + Math.sin(i * 1.3) * d }); return b; });
  };

  it("nothing eats on its own (Ed, 2026-11-03): hers by ripe berries, following or parked, hungry or hurt, claim none", () => {
    const s = newBerries(map, t), cs = spawnCreatures(map).slice(0, 3), points = new Map<number, { x: number; z: number }>();
    cs.forEach((c, i) => points.set(c.id, beside(s, c, i * 40, true, i as Level)));
    cs[2].drops = 0.5; // (a hurt adult)
    run(s, cs, points, 6);
    expect(s.feeding.size).toBe(0);
    expect(s.ateAt.size).toBe(0);
    expect(s.berries.every(b => b.claimedBy === null)).toBe(true);
  });

  it("fed, a party animal walks to its berry and eats it; it grows again elsewhere, so the total never changes", () => {
    const s = newBerries(map, t), cs = spawnCreatures(map).slice(0, 3), total = s.berries.length;
    const points = new Map<number, { x: number; z: number }>();
    cs.forEach((c, i) => { points.set(c.id, beside(s, c, i * 40, true, 0)); expect(queueBerry(s, c, c.x, c.z, 0, t)).not.toBeNull(); });
    const before = s.berries.map(b => b.bush);
    run(s, cs, points, 6);
    expect(s.berries.length).toBe(total);
    bushesOk(s);
    for (const c of cs) expect(s.ateAt.has(c.id)).toBe(true); // (a baby evolves after one, so fed is back to 0)
    expect(s.berries.filter((b, i) => b.bush !== before[i]).length).toBeGreaterThanOrEqual(3); // eaten ones moved
  });

  it("wild animals and legends never eat: no room (Ed, 2026-11-03: \"Legends still need no berries\"), not even hurt", () => {
    const s = newBerries(map, t), cs = spawnCreatures(map).slice(0, 2);
    beside(s, cs[0], 0, false, 1); // wild
    beside(s, cs[1], 5, true, LEGEND); // a party legend
    cs[1].drops = 0.5;
    for (const c of cs) { expect(feedRoom(c, s, t)).toBe(0); expect(queueBerry(s, c, c.x, c.z, 0, t)).toBeNull(); }
    expect(s.berries.every(b => b.claimedBy === null)).toBe(true);
  });

  it("each press queues one more, capped by the berries within berries.feed.reach of her and by the animal's room", () => {
    const map = mechanicsMap(), s = newBerries(map, t), [y] = spawnCreatures(map), need = toEvolve(1, t);
    Object.assign(y, { leashed: true, level: 1, x: 0, z: 0 });
    const R = t.berries.feed!.reach;
    // three in reach, two beyond
    only(s, 5, 0, 0, 3).forEach((b, i) => { if (i >= 3) Object.assign(s.bushes[b.bush], { x: R + 4 + i, z: 0 }); });
    expect(feedRoom(y, s, t)).toBe(need);
    for (let i = 0; i < 6; i++) queueBerry(s, y, 0, 0, 0, t);
    expect(queuedFor(s, y.id), "the three in reach").toBe(Math.min(3, need));
    // room: a youth two berries from adult takes two however many are near
    const s2 = newBerries(map, t);
    only(s2, 8, 0, 0, 3);
    s2.fed.set(y.id, need - 2);
    for (let i = 0; i < 6; i++) queueBerry(s2, y, 0, 0, 0, t);
    expect(queuedFor(s2, y.id)).toBe(2);
    expect(hasRoom(y, s2, t)).toBe(false);
    // hurt, one more (the berry that heals it counts for nothing else)
    y.drops = 0.4;
    expect(hasRoom(y, s2, t)).toBe(true);
    expect(queueBerry(s2, y, 0, 0, 0, t)).not.toBeNull();
    expect(queuedFor(s2, y.id)).toBe(3);
    // cancelled, every one's let go
    cancelFeeding(s2, y.id);
    expect(queuedFor(s2, y.id)).toBe(0);
    expect(s2.berries.every(b => b.claimedBy !== y.id)).toBe(true);
  });

  it("eats its queue in order, then stops; the queue's berries can't be taken by another", () => {
    const map = mechanicsMap(), s = newBerries(map, t), [a, b] = spawnCreatures(map);
    Object.assign(a, { leashed: true, level: 1, x: 0, z: 0, rest: 0 }); Object.assign(b, { leashed: true, level: 1, x: 0, z: 0, rest: 0 });
    const bs = only(s, 3, 0, 0, 4);
    for (let i = 0; i < 2; i++) queueBerry(s, a, 0, 0, 0, t);
    const order = [s.feeding.get(a.id)!.berry, ...s.queue!.get(a.id)!];
    expect(queueBerry(s, b, 0, 0, 0, t)?.id, "b gets the one left").toBe(bs.find(x => !order.includes(x.id))!.id);
    const ate: number[] = [];
    let time = 0;
    for (let i = 0; i < 20 * 20; i++) { time += 0.05; stepBerries(s, [a, b], () => ({ x: 0, z: 0 }), time, 0.05, t); for (const e of s.events) if (e.kind === "ate" && e.id === a.id) ate.push(e.at); }
    expect(ate.length).toBe(2);
    expect(s.fed.get(a.id)).toBe(2);
    expect(queuedFor(s, a.id)).toBe(0);
  });

  it("goes to its berry at its leash pace times berries.feed.speed (Ed, 2026-11-03: not much faster, or feeding's a way of moving them quickly)", () => {
    for (const speed of [1, 1.2]) {
      const tt = withTuning({ berries: { ...t.berries, feed: { ...t.berries.feed!, speed } } });
      const map = mechanicsMap(), s = newBerries(map, tt), [a] = spawnCreatures(map);
      only(s, 1, 0, 0, 10);
      const p = s.bushes[s.berries[0].bush];
      Object.assign(a, { x: p.x - 8, z: p.z + 0.6, leashed: true, level: 1, rest: 0 });
      queueBerry(s, a, p.x - 8, p.z, 0, tt);
      const x0 = a.x;
      stepBerries(s, [a], () => ({ x: a.x, z: a.z }), 0.05, 0.05, tt);
      expect((a.x - x0) / 0.05).toBeCloseTo(leashSpeed(a, tt) * speed, 5);
    }
  });

  it("evolves after 1 and 4 berries (a baby's one: Ed, 2026-10-11; the youth's by its strength gained, Ed 2026-10-05; 3 / 4 / 8 by strength, Ed 2026-10-27), on a bar line, up to adult and no further (Ed, 2026-10-04); legends can't be invited", () => {
    const map = mechanicsMap();
    const s = newBerries(map, t), [c, wild] = spawnCreatures(map), leash = newLeash();
    Object.assign(c, { leashed: true, level: 0 });
    leash.stack.push(c.id);
    expect([0, 1, 2].map(l => toEvolve(l as Level, t))).toEqual([1, 4, Infinity]);
    let time = 0;
    for (const level of [0, 1] as Level[]) {
      expect(c.level).toBe(level);
      for (let i = 0; i < toEvolve(level, t) - 1; i++) feed(s, c, time, t);
      expect(s.evolving.has(c.id)).toBe(false);
      feed(s, c, time, t);
      const e = s.evolving.get(c.id)!;
      expect(e.to).toBe(level + 1);
      const bar = (60 / t.beat.bpm) * 4;
      expect(Math.abs(e.at / bar - Math.round(e.at / bar))).toBeLessThan(1e-9); // on a bar line
      time = run(s, [c], new Map([[c.id, { x: c.x, z: c.z }]]), e.at - time + 0.1, time);
      expect(c.level).toBe(level + 1);
    }
    expect(c.level).toBe(2);
    for (let i = 0; i < 20; i++) feed(s, c, time, t); // an adult eats (a hurt one heals) but doesn't evolve
    expect(s.evolving.has(c.id)).toBe(false);
    expect(c.leashed).toBe(true);
    Object.assign(wild, { leashed: false, level: LEGEND });
    expect(invitable(wild)).toBe(false);
  });

  it("keeps exercised berry bushes finite and their berry indices consistent", () => {
    const s = newBerries(map, t);
    expect(s.bushes.length).toBeGreaterThan(0); expect(s.berries.length).toBeGreaterThan(0);
    bushesOk(s);
    for (const b of s.bushes) { expect(Number.isFinite(b.x)).toBe(true); expect(Number.isFinite(b.z)).toBe(true); }
    // C1 reports the original full-population patch-neighbour share.
  });

});

// Where berries grow (Ed, 2026-11-06: "I think we should change this process to more evenly distribute patches in the area, and also
// increase the clearance from the stump (not the middle)."; berries outside the stump's fight zone). The fox island at seed 123, one
// of the two islands measured for it: ten areas of 196 m.
describe("where berries grow", () => {
  const fox = { ...TUNING, map: { ...TUNING.map!, island: "fox", islandAreas: 10, world: 0 } }, foxMap = generateMap(123, fox);
  const placed = berryPatches(foxMap, fox), B = berryCounts(foxMap, fox), areas = foxMap.cells.filter(([x, y]) => x !== foxMap.centreCell[0] || y !== foxMap.centreCell[1]);
  const inArea = (cx: number, cy: number) => placed.patches.filter(p => p.cell[0] === cx && p.cell[1] === cy);

  it("spreads patch centres evenly: none nearer another than patch.spacing (across areas too), and no big empty stretch of woods", () => {
    const P = placed.patches, spacing = fox.berries.patch.spacing;
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) expect(Math.hypot(P[i].x - P[j].x, P[i].z - P[j].z)).toBeGreaterThanOrEqual(spacing);
    // Coverage: the farthest a spot of an area's bush ground beyond the stumps' arenas lies from any of its patch centres. The old
    // random-angle draw left up to 190 m (127 m on average) on this island; spread, 113 m at most (70 on average).
    const gaps = areas.map(([cx, cy]) => {
      const s = foxMap.siteOf(cx, cy), A = foxMap.areaSize, ps = inArea(cx, cy), clear = stumpClearance(fox) + fox.berries.patch.radius;
      let most = 0;
      for (let x = s.x - A; x <= s.x + A; x += 6) for (let z = s.z - A; z <= s.z + A; z += 6) {
        const c = foxMap.areaAt(x, z).cell;
        if (c[0] !== cx || c[1] !== cy || foxMap.hardClear(x, z) || foxMap.paths.at(x, z, 1.5) || foxMap.stoneGap(x, z) < clear) continue;
        most = Math.max(most, Math.min(...ps.map(p => Math.hypot(p.x - x, p.z - z))));
      }
      return most;
    });
    expect(Math.max(...gaps)).toBeLessThan(foxMap.areaSize * 0.62);
    expect(gaps.reduce((a, b) => a + b, 0) / gaps.length).toBeLessThan(foxMap.areaSize * 0.45);
  });

  it("keeps every bush out of every stump's fighting arena, measured from the stump, and every area still gets its bushes", () => {
    const clear = stumpClearance(fox);
    expect(clear).toBe((fox.arena!.radius + fox.arena!.band) * fox.fight.scale + fox.berries.stumpClear);
    expect(clear).toBe(55);
    for (const b of placed.bushes) expect(foxMap.stoneGap(b.x, b.z)).toBeGreaterThanOrEqual(clear);
    for (const [cx, cy] of areas) expect(inArea(cx, cy).reduce((n, p) => n + p.to - p.from, 0)).toBe(B.bushesPerArea);
    // (the clearance follows the arena, and stumpClear is metres past it: less lets bushes into its outer band)
    expect(stumpClearance({ ...fox, arena: { ...fox.arena!, band: 30 } })).toBe(35);
    const nearer = { ...fox, berries: { ...fox.berries, stumpClear: -25 } };
    expect(Math.min(...berryPatches(foxMap, nearer).bushes.map(b => foxMap.stoneGap(b.x, b.z)))).toBeLessThan(clear);
  });

  it("keeps each patch whole in its own area, its bushes within patch.radius of its centre", () => {
    for (const p of placed.patches) for (let i = p.from; i < p.to; i++) {
      const b = placed.bushes[i];
      expect(Math.hypot(b.x - p.x, b.z - p.z)).toBeLessThanOrEqual(fox.berries.patch.radius + 1e-9);
      expect(foxMap.areaAt(b.x, b.z).cell).toEqual(p.cell);
      expect(foxMap.paths.at(b.x, b.z, 1.5)).toBeNull();
      expect(foxMap.hardClear(b.x, b.z)).toBe(false);
    }
  });

  it("is the same from the same seed", () => {
    expect(berryPatches(foxMap, fox)).toEqual(placed);
    const a = newBerries(foxMap, fox), b = newBerries(foxMap, fox);
    expect(b.bushes).toEqual(a.bushes);
    expect(b.berries).toEqual(a.berries);
    expect(a.bushes).toEqual(placed.bushes);
  });
});

