import { describe, expect, it } from "vitest";
import { dressingOf, isLit } from "./partyDressing";
import { generateMap } from "./map";
import { floorClearing } from "./speakers";
import { TUNING } from "./tuning";

const map = generateMap(123, TUNING), t = TUNING, P = t.partyObjects;

describe("party objects (Ed, 2026-10-04)", () => {
  it("home (the dancefloor's area) is dressed too, but nothing lands on the floor, its rim, its speakers, the treehouse or her seat (Ed)", () => {
    const d = dressingOf(map, map.centreCell, t), D = map.dancefloor;
    expect(d.loose.length + d.clusters.length).toBeGreaterThan(5);
    for (const p of [...d.loose, ...d.clusters, ...(d.caught ? [d.caught] : [])]) {
      expect(Math.hypot(p.x - D.x, p.z - D.z)).toBeGreaterThan(floorClearing(t));
      expect(Math.hypot(p.x - map.treehouse.x, p.z - map.treehouse.z)).toBeGreaterThan(t.treehouse.clear);
      expect(Math.hypot(p.x - map.start.x, p.z - map.start.z)).toBeGreaterThan(3);
    }
  });

  it("each area gets 2-4 clusters, 20-40 loose pieces (a set piece at most), lights capped, nothing on paths or the dancefloor; the same each time", () => {
    let areas = 0;
    for (let cy = 0; cy < map.n; cy += 2) for (let cx = 0; cx < map.n; cx += 2) {
      if (cx === map.centreCell[0] && cy === map.centreCell[1]) continue;
      const d = dressingOf(map, [cx, cy], t);
      areas++;
      expect(d.clusters.length).toBeLessThanOrEqual(P.clusters[1]);
      expect(d.loose.length).toBeLessThanOrEqual(P.loose[1] + 1);
      expect(d.lights.length).toBeLessThanOrEqual(P.lightsPerArea);
      expect(d.lights.every(p => isLit(p.ref))).toBe(true);
      expect(d.loose.some(p => p.ref.includes("led-cube"))).toBe(false); // left out (Ed, v271)
      for (const p of [...d.loose, ...d.clusters]) {
        expect(map.paths.at(p.x, p.z, 1)).toBeFalsy();
        expect(Math.hypot(p.x - map.dancefloor.x, p.z - map.dancefloor.z)).toBeGreaterThan(floorClearing(t));
        const at = map.areaAt(p.x, p.z).cell;
        expect([at[0], at[1]]).toEqual([cx, cy]);
      }
      expect(dressingOf(map, [cx, cy], t)).toEqual(d);
    }
    expect(areas).toBeGreaterThan(5);
    // Most areas get the full numbers.
    const sample = dressingOf(map, [1, 1], t);
    expect(sample.clusters.length).toBeGreaterThanOrEqual(P.clusters[0] - 1);
    expect(sample.loose.length).toBeGreaterThanOrEqual(P.loose[0] * 0.75);
  });
});
