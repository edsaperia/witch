// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"):
// rules/leyroute.ts and the route picker (rules/party.ts). node tools/balance/leycross.mjs measures
// it over hundreds of seeds.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING, type Tuning } from "./tuning";
import { newParty, spreadWave, wavePlan, cellKey, routeOf } from "./party";
import { polylinesMeet, segmentsMeet, crossings } from "./crossing";
import { CROSSING_RULES, crossingPairs, withinCrossingRules } from "./leyroute";

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
    expect(r.order.length).toBe(map.n * map.n - 1);
    expect(new Set(r.order).size).toBe(r.order.length);
    expect(r.order).not.toContain(cellKey(map.centreCell));
    expect([...wavePlan(p, map).keys()]).toEqual(r.order);
    for (let w = 0; w < 5; w++) expect(spreadWave(p, map, (w + 1) * 300).map(a => cellKey(a.cell))).toEqual([r.order[w]]);
  });
  it("is the same for a seed every time", () => {
    const a = routeOf(generateMap(11, TUNING)), b = routeOf(generateMap(11, TUNING));
    expect(b.order).toEqual(a.order);
  });
  it("keeps Ed's crossing rules on 60 seeds: at most 4 a map, the two links at least 12 waves apart, none in the first 12 (Ed, 2026-10-06)", () => {
    for (let seed = 1; seed <= 60; seed++) {
      const pairs = crossingPairs(routeOf(generateMap(seed, TUNING)).links);
      expect(pairs.length, `seed ${seed}`).toBeLessThanOrEqual(CROSSING_RULES.max);
      for (const [i, j] of pairs) { expect(j - i, `seed ${seed}`).toBeGreaterThanOrEqual(CROSSING_RULES.gap); expect(i, `seed ${seed}`).toBeGreaterThanOrEqual(CROSSING_RULES.first); }
    }
  }, 180_000);
  it("(the rules themselves: too many, too close, too early)", () => {
    const x = (i: number): [number, number][] => [[i * 100, 0], [i * 100 + 50, 10]]; // (a link far from the others)
    const cross = (a: number, b: number, links: [number, number][][]) => { links[a] = [[a * 1000, -5], [a * 1000 + 10, 5]]; links[b] = [[a * 1000, 5], [a * 1000 + 10, -5]]; };
    const ok = Array.from({ length: 40 }, (_, i) => x(i)); cross(13, 30, ok);
    expect(withinCrossingRules(ok)).toBe(true);
    const near = Array.from({ length: 40 }, (_, i) => x(i)); cross(20, 25, near);
    expect(withinCrossingRules(near)).toBe(false); // (5 waves apart)
    const early = Array.from({ length: 40 }, (_, i) => x(i)); cross(5, 30, early);
    expect(withinCrossingRules(early)).toBe(false); // (in the first 12)
    const many = Array.from({ length: 80 }, (_, i) => x(i)); [[12, 30], [13, 31], [14, 32], [15, 33], [16, 34]].forEach(([a, b]) => cross(a, b, many));
    expect(withinCrossingRules(many)).toBe(false); // (5 crossings)
  });
  it("takes different shapes on different maps: not all spirals (Ed: \"mix in back-and-forth sweeps and lobes so maps aren't all spirals\")", () => {
    // How often each route turns back toward or away from home (lobes, combs, sweeps do; a spiral hardly does): spread across maps.
    const counts = SEEDS.slice(0, 16).map(seed => {
      const map = generateMap(seed, TUNING), d = map.dancefloor, st = routeOf(map).stones, rad = (q: readonly number[]) => Math.hypot(q[0] - d.x, q[1] - d.z);
      let rev = 0, last = 0;
      for (let i = 1; i < st.length; i++) { const dr = rad(st[i]) - rad(st[i - 1]); if (Math.abs(dr) > 40) { const s = Math.sign(dr); if (last && s !== last) rev++; last = s; } }
      return rev;
    });
    expect(Math.max(...counts) - Math.min(...counts)).toBeGreaterThan(20);
  }, 60_000);
  it("(the noisy picker before it crossed itself thousands of times a run)", () => {
    const t = structuredClone(TUNING) as Tuning;
    t.party.picker = "noisy";
    const map = generateMap(1, t), p = newParty(map), order = [...wavePlan(p, map).keys()], r = routeOf(map);
    const st = order.map(k => r.stones[r.order.indexOf(k)]), links = [r.links[0]];
    for (let i = 1; i < st.length; i++) links.push([st[i - 1], st[i]]);
    expect(crossings(links)).toBeGreaterThan(1000);
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
