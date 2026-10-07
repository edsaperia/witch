// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"):
// rules/leyroute.ts and the route picker (rules/party.ts). node tools/balance/leycross.mjs measures
// it over hundreds of seeds.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING, type Tuning } from "./tuning";
import { newParty, spreadWave, wavePlan, cellKey, routeOf } from "./party";
import { polylinesMeet, segmentsMeet, crossings } from "./crossing";
import { CROSSING_RULES, crossingPairs, meetPoint, overHome, routeShape, spiralOrder, withinCrossingRules } from "./leyroute";
import { TIP_PACE } from "./leypulse";

describe("lines meeting", () => {
  it("counts crossing, touching and doubling back, not two links joined at their stone", () => {
    expect(segmentsMeet([0, 0], [10, 10], [0, 10], [10, 0])).toBe(true); // crossing
    expect(segmentsMeet([0, 0], [10, 0], [5, 0], [5, 8])).toBe(true); // one end resting on the other
    expect(segmentsMeet([0, 0], [10, 0], [0, 1], [10, 1])).toBe(false); // side by side
    expect(segmentsMeet([0, 0], [10, 0], [10, 0], [20, 5], true)).toBe(false); // joined at their stone
    expect(segmentsMeet([0, 0], [10, 0], [10, 0], [4, 0], true)).toBe(true); // joined, but doubling back along it
    expect(segmentsMeet([0, 0], [10, 0], [10, 0], [20, 5])).toBe(true); // the same point, not joined: touching
    expect(polylinesMeet([[0, 0], [10, 0]], [[10, 0], [20, 5], [5, 0.0]])).toBe(true); // joined, then back onto it
    expect(polylinesMeet([[0, 0], [10, 0]], [[10, 0], [20, 5], [30, 0]])).toBe(false);
  });
});

describe("the ley line's route (Ed, 2026-10-06)", () => {
  const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
  it("runs through every area once, home first, and the waves wake them in its order", () => {
    const map = generateMap(7, TUNING), r = routeOf(map), p = newParty(map);
    expect(r.order.length).toBe(map.cells.length - 1);
    expect(new Set(r.order).size).toBe(r.order.length);
    expect(r.order).not.toContain(cellKey(map.centreCell));
    expect([...wavePlan(p, map).keys()]).toEqual(r.order);
    for (let w = 0; w < 5; w++) expect(spreadWave(p, map, (w + 1) * 300).map(a => cellKey(a.cell))).toEqual([r.order[w]]);
  });
  it("is the same for a seed every time", () => {
    const a = routeOf(generateMap(11, TUNING)), b = routeOf(generateMap(11, TUNING));
    expect(b.order).toEqual(a.order);
  });
  it("keeps Ed's crossing rules on 40 seeds: at most 4 a map, none the pulse would pass over already drawn ahead of it, 350 m apart (Ed, 2026-10-06)", () => {
    const seen = new Set<number>();
    for (let seed = 1; seed <= 40; seed++) {
      const map = generateMap(seed, TUNING), r = routeOf(map), links = r.links, pairs = crossingPairs(links);
      // (and never over the dancefloor, Ed 2026-10-06: the line leaving home goes round it, rules/departure.ts; no link after it crosses home)
      for (let i = 1; i < r.stones.length; i++) expect(overHome(map, r.stones[i - 1], r.stones[i]), `seed ${seed}: link ${i} over the dancefloor`).toBe(false);
      seen.add(pairs.length);
      expect(pairs.length, `seed ${seed}`).toBeLessThanOrEqual(CROSSING_RULES.max);
      for (const [i, j] of pairs) expect(j, `seed ${seed}: links ${i} and ${j}`).toBeGreaterThanOrEqual(CROSSING_RULES.pace * (i + 1) + CROSSING_RULES.margin);
      const pts = pairs.map(([i, j]) => meetPoint(links[i], links[j])!);
      for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) expect(Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]), `seed ${seed}`).toBeGreaterThanOrEqual(CROSSING_RULES.apart);
    }
    expect(seen.size, "a few crossings on some maps, none on others").toBeGreaterThan(1);
  }, 180_000);
  it("(the rules themselves: too many, drawn ahead of the pulse, too close together)", () => {
    expect(CROSSING_RULES.pace).toBe(TIP_PACE);
    const x = (i: number): [number, number][] => [[i * 100, 0], [i * 100 + 50, 10]]; // (a link far from the others)
    const cross = (a: number, b: number, links: [number, number][][], at = 20000 + a * 1000) => // (well clear of the others)
      { links[a] = [[at, -5], [at + 10, 5]]; links[b] = [[at, 5], [at + 10, -5]]; };
    const ok = Array.from({ length: 40 }, (_, i) => x(i)); cross(5, 22, ok);
    expect(withinCrossingRules(ok)).toBe(true); // (the tip starts link 22 at 7.3 waves; the pulse has left link 5 at 6)
    const ahead = Array.from({ length: 40 }, (_, i) => x(i)); cross(5, 18, ahead);
    expect(withinCrossingRules(ahead)).toBe(false); // (link 18 drawn at 6 waves: as the pulse finishes link 5, over it)
    const close = Array.from({ length: 80 }, (_, i) => x(i)); cross(2, 20, close, 20000); cross(3, 30, close, 20200);
    expect(withinCrossingRules(close)).toBe(false); // (200 m apart)
    const apart = Array.from({ length: 80 }, (_, i) => x(i)); cross(2, 20, apart, 20000); cross(3, 30, apart, 20500);
    expect(withinCrossingRules(apart)).toBe(true);
    const many = Array.from({ length: 80 }, (_, i) => x(i)); [[1, 20], [2, 30], [3, 40], [4, 50], [5, 60]].forEach(([a, b], k) => cross(a, b, many, 20000 + k * 1000));
    expect(withinCrossingRules(many)).toBe(false); // (5 crossings)
  });
  it("spirals out (Ed, 2026-10-06): distance from home growing steadily with the wave, no late return toward home, the waves spread round home", () => {
    for (const seed of SEEDS.slice(0, 12)) {
      const map = generateMap(seed, TUNING), sh = routeShape(map, routeOf(map).stones);
      expect(sh.drift, `seed ${seed}: drift`).toBeLessThan(160);
      expect(sh.oneSided, `seed ${seed}: one-sided`).toBeLessThan(0.7);
      expect(sh.lateDip, `seed ${seed}: late dip`).toBeLessThan(450);
    }
  }, 120_000);
  it("is the spiral before untangling and crossings (spiralOrder)", () => {
    const map = generateMap(5, TUNING), spiral = spiralOrder(map), r = routeOf(map);
    expect(new Set(spiral)).toEqual(new Set(r.order));
  }, 60_000);
  it("(the noisy picker before it crossed itself thousands of times a run)", () => {
    const t = structuredClone(TUNING) as Tuning;
    t.party.picker = "noisy";
    const map = generateMap(1, t), p = newParty(map), order = [...wavePlan(p, map).keys()], r = routeOf(map);
    const st = order.map(k => r.stones[r.order.indexOf(k)]), links = [r.links[0]];
    for (let i = 1; i < st.length; i++) links.push([st[i - 1], st[i]]);
    expect(crossings(links)).toBeGreaterThan(map.cells.length * 5); // (over a thousand on the old 196-area map; it grows with the map)
  }, 60_000);
  it("starts about the ring round home, and keeps the waves near each other", () => {
    for (const seed of SEEDS.slice(0, 10)) {
      const map = generateMap(seed, TUNING), r = routeOf(map), d = map.dancefloor, far = (q: readonly number[]) => Math.hypot(q[0] - d.x, q[1] - d.z);
      const ring = Math.max(...[...(map.neighbours.get(cellKey(map.centreCell)) ?? [])].map(k => far(r.stones[r.order.indexOf(k)])));
      expect(far(r.stones[0]), `seed ${seed}`).toBeLessThan(ring * 1.3);
      const steps = r.stones.slice(1, 40).map((q, i) => Math.hypot(q[0] - r.stones[i][0], q[1] - r.stones[i][1]));
      expect(steps.reduce((a, b) => a + b, 0) / steps.length, `seed ${seed}`).toBeLessThan(2 * map.areaSize);
    }
  }, 60_000);
});
