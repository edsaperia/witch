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

describe("ley lines", () => {
  it("start at home, pointing to the next wave's stone, then the ones after in the order they will wake", () => {
    const p = newParty(map), one = leyChain(p, map, 2), chain = leyChain(p, map, 7);
    expect(keys(one)).toEqual([cellKey(map.centreCell), cellKey(p.next[0])]);
    expect(one[0]).toMatchObject({ x: map.treehouseFront.x, z: map.treehouseFront.z, wave: 0, depart: true }); // (home's: the treehouse's front, Ed 2026-10-05)
    expect(keys(chain).slice(0, 3)).toEqual([map.centreCell, ...p.next, ...p.afterNext].map(cellKey).slice(0, 3));
    expect(new Set(keys(chain)).size).toBe(7); // no stone twice
  });
  it("foretell what the waves really wake, and move on to the next stone as each wave arrives", () => {
    const p = newParty(map);
    let time = 100;
    for (let w = 0; w < 5; w++) {
      const before = leyChain(p, map, 4), key = leyKey(p);
      const woke = spreadWave(p, map, (time += 100));
      expect(leyKey(p)).not.toBe(key);
      expect(cellKey(woke[0].cell)).toBe(keys(before)[1]); // the line pointed to the stone the wave woke
      expect(keys(leyChain(p, map, 3))).toEqual(keys(before).slice(1, 4)); // and now runs on from it
    }
  });
  it("move on when the next area's quest is done, before its wave, and stay put when that wave comes", () => {
    const p = newParty(map);
    spreadWave(p, map, 100);
    const before = leyChain(p, map, 3), next = before[1].cell, key = leyKey(p);
    onAreaDone(p, next, 120);
    expect(leyKey(p)).not.toBe(key);
    const after = leyChain(p, map, 2);
    expect(keys(after)).toEqual(keys(before).slice(1, 3)); // from the quest's stone to the one after
    // Its wave arrives: the line already moved on, so it keeps pointing to the same next stone.
    const woke = spreadWave(p, map, 200);
    expect(cellKey(woke[0].cell)).toBe(cellKey(next));
    expect(keys(leyChain(p, map, 2))).toEqual(keys(after));
  });
});

describe("the first ley line leaves the treehouse's front, due south (Ed, 2026-10-05)", () => {
  const D = TUNING.leyLines.depart;
  it("starts at the treehouse's front at the start of a run", () => {
    const m = generateMap(123, TUNING), p = newParty(m), first = leyChain(p, m, 2)[0];
    expect(first.depart).toBe(true);
    expect([first.x, first.z]).toEqual([m.treehouseFront.x, m.treehouseFront.z]);
    expect(m.treehouseFront.z).toBeGreaterThan(m.treehouse.z); // (south: towards the camera)
  });
  it("sets off due south, then curves smoothly to the first objective, never over the dancefloor, wherever that lies", () => {
    let north = 0;
    for (const seed of [123, 293912, 7, 1000, 42, 31337, 5, 99]) {
      const m = generateMap(seed, TUNING), p = newParty(m), [a, b] = leyChain(p, m, 2), d = m.dancefloor;
      if (b.z < a.z) north++;
      const pts = departureRoute(m, b, D.run, D.avoid, 4);
      expect(pts[0]).toEqual([a.x, a.z]);
      const last = pts[pts.length - 1];
      expect(Math.hypot(last[0] - b.x, last[1] - b.z)).toBeLessThan(1);
      // Due south first, for a stretch you can see (several metres before the floor stops it).
      let south = 0;
      for (let i = 1; i < pts.length && pts[i][0] === a.x && pts[i][1] > pts[i - 1][1]; i++) south = pts[i][1] - a.z;
      expect(south).toBeGreaterThanOrEqual(4);
      for (const q of pts) expect(Math.hypot(q[0] - d.x, q[1] - d.z)).toBeGreaterThanOrEqual(departureClear(m, D.avoid) - 1e-6); // off the dancefloor and its ring of speakers
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
