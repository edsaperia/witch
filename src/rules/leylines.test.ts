// The ley line: from the last runestone reached to the next objective in the order the waves really
// wake them, moving on when that area's wave arrives or its quest is done, whichever comes first
// (Ed, 2026-10-04, 2026-10-05).
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { TUNING } from "./tuning";
import { newParty, spreadWave, cellKey } from "./party";
import { departureClear, departureRoute, leyChain, leyKey, onAreaDone } from "./leylines";

const map = generateMap(123, TUNING);
const keys = (c: { cell: readonly [number, number] }[]) => c.map(s => cellKey(s.cell));
/** The last stone reached and `count - 1` after it (no stones behind). */
const ahead = (p: Parameters<typeof leyChain>[0], m: typeof map, count: number) => leyChain(p, m, count - 1, 0).stones;

describe("ley lines", () => {
  it("start at home, pointing to the next wave's stone, then the ones after in the order they will wake", () => {
    const p = newParty(map), one = ahead(p, map, 2), chain = ahead(p, map, 7);
    expect(keys(one)).toEqual([cellKey(map.centreCell), cellKey(p.next[0])]);
    expect(one[0]).toMatchObject({ x: map.treehouseFront.x, z: map.treehouseFront.z, wave: 0, depart: true }); // (home's: the treehouse's front, Ed 2026-10-05)
    expect(keys(chain).slice(0, 3)).toEqual([map.centreCell, ...p.next, ...p.afterNext].map(cellKey).slice(0, 3));
    expect(new Set(keys(chain)).size).toBe(7); // no stone twice
  });
  it("foretell what the waves really wake, and move on to the next stone as each wave arrives", () => {
    const p = newParty(map);
    let time = 100;
    for (let w = 0; w < 5; w++) {
      const before = ahead(p, map, 4), key = leyKey(p);
      const woke = spreadWave(p, map, (time += 100));
      expect(leyKey(p)).not.toBe(key);
      expect(cellKey(woke[0].cell)).toBe(keys(before)[1]); // the line pointed to the stone the wave woke
      expect(keys(ahead(p, map, 3))).toEqual(keys(before).slice(1, 4)); // and now runs on from it
    }
  });
  it("move on when the next area's quest is done, before its wave, and stay put when that wave comes", () => {
    const p = newParty(map);
    spreadWave(p, map, 100);
    const before = ahead(p, map, 3), next = before[1].cell, key = leyKey(p);
    onAreaDone(p, next, 120);
    expect(leyKey(p)).not.toBe(key);
    const after = ahead(p, map, 2);
    expect(keys(after)).toEqual(keys(before).slice(1, 3)); // from the quest's stone to the one after
    // Its wave arrives: the line already moved on, so it keeps pointing to the same next stone.
    const woke = spreadWave(p, map, 200);
    expect(cellKey(woke[0].cell)).toBe(cellKey(next));
    expect(keys(ahead(p, map, 2))).toEqual(keys(after));
  });
});

describe("the whole route, the whole time (Ed, 2026-10-06: \"I think the leylines should cover the entire set of waves the whole time\")", () => {
  const all = map.cells.length;
  it("at the start runs from home through every area, in the order the waves will wake them", () => {
    const p = newParty(map), c = leyChain(p, map);
    expect(c.current).toBe(0);
    expect(c.stones.length).toBe(all);
    expect(c.stones[0].depart).toBe(true); // (leaving the treehouse's front)
    expect(new Set(keys(c.stones)).size).toBe(all);
    expect(keys(c.stones.slice(1, 3))).toEqual([...p.next, ...p.afterNext].map(cellKey).slice(0, 2));
  });
  it("stays the same line as the waves come, the last stone reached moving on along it", () => {
    const p = newParty(map), first = keys(leyChain(p, map).stones), woken = [cellKey(map.centreCell)];
    let time = 100;
    for (let w = 0; w < 6; w++) {
      const key = leyKey(p);
      for (const a of spreadWave(p, map, (time += 100))) woken.push(cellKey(a.cell));
      const c = leyChain(p, map);
      expect(leyKey(p)).not.toBe(key);
      expect(keys(c.stones)).toEqual(first);
      expect(c.current).toBe(woken.length - 1);
      expect(keys(c.stones.slice(0, c.current + 1))).toEqual(woken);
    }
  });
  it("moves on when the next area's quest is done", () => {
    const p = newParty(map);
    spreadWave(p, map, 100);
    const next = leyChain(p, map).stones[2].cell;
    onAreaDone(p, next, 120);
    const c = leyChain(p, map);
    expect(cellKey(c.stones[c.current].cell)).toBe(cellKey(next));
    expect(c.current).toBe(2); // home, the first wave's, then the quest's
  });
});

describe("the first ley line leaves the treehouse's front, due south (Ed, 2026-10-05)", () => {
  const D = TUNING.leyLines.depart;
  it("starts at the treehouse's front at the start of a run", () => {
    const m = generateMap(123, TUNING), p = newParty(m), first = ahead(p, m, 2)[0];
    expect(first.depart).toBe(true);
    expect([first.x, first.z]).toEqual([m.treehouseFront.x, m.treehouseFront.z]);
    expect(m.treehouseFront.z).toBeGreaterThan(m.treehouse.z); // (south: towards the camera)
  });
  it("stands due north of the dancefloor, its footprint gap metres outside the ring of speakers (Ed, 2026-10-05)", () => {
    for (const seed of [123, 293912, 31337]) {
      const m = generateMap(seed, TUNING), d = m.dancefloor, th = m.treehouse, S = TUNING.dancefloor.speakers;
      expect(th.x).toBeCloseTo(d.x, 6);
      expect(th.z).toBeLessThan(d.z); // (north: up the screen)
      const edge = Math.hypot(th.x - d.x, th.z - d.z) - TUNING.treehouse.clear, ring = TUNING.dancefloor.radius * S.radiusFactor + S.footprint;
      expect(edge - ring).toBeCloseTo(TUNING.treehouse.gap, 6);
    }
  });
  it("runs due south straight across the dancefloor, then curves smoothly to the first objective outside the ring, wherever that lies", () => {
    let north = 0;
    // (The route picker's first objective is always south of home; the noisy picker's lies anywhere.)
    const T = { ...TUNING, party: { ...TUNING.party, picker: "noisy" } };
    for (const seed of [123, 293912, 7, 1000, 42, 31337, 5, 99]) {
      const m = generateMap(seed, T), p = newParty(m), [a, b] = ahead(p, m, 2), d = m.dancefloor;
      if (b.z < a.z) north++;
      const pts = departureRoute(m, b, D.past, D.avoid, 4), R = departureClear(m, D.avoid);
      expect(pts[0]).toEqual([a.x, a.z]);
      const last = pts[pts.length - 1];
      expect(Math.hypot(last[0] - b.x, last[1] - b.z)).toBeLessThan(1);
      // Due south first, straight across the floor (over its middle) and out past the ring.
      let i = 1;
      for (; i < pts.length && pts[i][0] === a.x && pts[i][1] > pts[i - 1][1]; i++);
      const crossed = pts[i - 1];
      expect(crossed[1]).toBeGreaterThanOrEqual(d.z + R + D.past - 1e-6);
      expect(Math.abs(a.x - d.x)).toBeLessThan(1); // (through the middle of the floor)
      // After the crossing, kept outside the ring.
      for (const q of pts.slice(i)) expect(Math.hypot(q[0] - d.x, q[1] - d.z)).toBeGreaterThanOrEqual(R - 1e-6);
      // Smooth: no sharp corners.
      for (let i = 2; i < pts.length; i++) {
        const u = [pts[i - 1][0] - pts[i - 2][0], pts[i - 1][1] - pts[i - 2][1]], v = [pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]];
        const cos = (u[0] * v[0] + u[1] * v[1]) / ((Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1])) || 1);
        expect(cos, `seed ${seed} at ${i}`).toBeGreaterThan(Math.cos((50 * Math.PI) / 180));
      }
    }
    expect(north).toBeGreaterThan(0); // (some seeds' first objective lies north, behind the treehouse)
  }, 60000);
});
