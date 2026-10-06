// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"):
// rules/leyroute.ts and the route picker (rules/party.ts). node tools/balance/leycross.mjs measures
// it over hundreds of seeds.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING, type Tuning } from "./tuning";
import { newParty, spreadWave, wavePlan, cellKey, routeOf } from "./party";
import { polylinesMeet, segmentsMeet, crossings } from "./crossing";

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
  it("never crosses itself, the whole route, on any of 30 seeds (Ed: \"I thought the idea was to have no crossings?\")", () => {
    for (const seed of SEEDS) expect(crossings(routeOf(generateMap(seed, TUNING)).links), `seed ${seed}`).toBe(0);
  }, 120_000);
  it("differs from map to map: not one shape (Ed: \"ideally it shouldn't be just spirals\")", () => {
    // How far round the dancefloor the first ten stones go, and which way: the noisy picker's lobes, not one spiral.
    const turns = SEEDS.slice(0, 12).map(seed => {
      const map = generateMap(seed, TUNING), d = map.dancefloor, r = routeOf(map);
      let turn = 0;
      for (let i = 1; i < 10; i++) { const a = Math.atan2(r.stones[i - 1][0] - d.x, r.stones[i - 1][1] - d.z), b = Math.atan2(r.stones[i][0] - d.x, r.stones[i][1] - d.z); turn += Math.atan2(Math.sin(b - a), Math.cos(b - a)); }
      return turn;
    });
    expect(turns.some(t => t > 0.5) && turns.some(t => t < -0.5)).toBe(true); // (some wind one way round home, some the other)
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
