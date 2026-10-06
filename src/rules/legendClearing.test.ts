import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { isInside } from "./mapShape";
import { Forest } from "./forest";
import { spawnCreatures } from "./creatures";
import { soundsystemFor } from "./party";
import { TUNING } from "./tuning";

// Each area's sleeping legend lies in a small circular clearing of its own (Ed, 2026-10-06), near its top.
describe("legend clearings", () => {
  for (const seed of [1, 123, 4242, 90210]) {
    it(`every area with a legend has one (and only those), inside its own area, clear of trees, bushes, decor and the soundsystem, its legend near the top (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), forest = new Forest(map), creatures = spawnCreatures(map);
      // every area with room for one has one: 4000 m² or more of its ground where she can fly (the rest: slivers at the map's edge, or absorbed by their neighbours)
      const B = map.bounds, ground = new Map<string, number>();
      for (let x = B.minX + 15; x < B.maxX - 15; x += 8) for (let z = B.minZ + 15; z < B.maxZ - 15; z += 8) if (isInside(B, x, z, 15)) { const k = map.areaAt(x, z).cell.join(","); ground.set(k, (ground.get(k) ?? 0) + 64); }
      for (const [x, y] of map.cells)
        if (map.hasLegend(x, y) && (ground.get(`${x},${y}`) ?? 0) >= 4000) expect(map.legendClearing(x, y), `area ${x},${y}`).not.toBeNull();
        else if (!map.hasLegend(x, y)) expect(map.legendClearing(x, y), `area ${x},${y} has no legend`).toBeNull();
      expect(map.legendClearing(map.centreCell[0], map.centreCell[1])).toBeNull();
      for (const c of map.legendClearings) {
        expect(map.legendClearing(c.cell[0], c.cell[1])).toBe(c);
        for (let k = 0; k < 16; k++) { const b = (k / 16) * Math.PI * 2, at = map.areaAt(c.x + Math.cos(b) * c.r, c.z + Math.sin(b) * c.r).cell; expect(at).toEqual(c.cell); }
        for (const t of forest.treesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r * 0.98);
        for (const t of forest.bushesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r * 0.98);
        for (const d of forest.decorNear(c.x, c.z, c.r + 2)) expect(Math.hypot(d.x - c.x, d.z - c.z)).toBeGreaterThanOrEqual(c.r);
        const s = soundsystemFor(map, c.cell);
        expect(Math.hypot(s.x - c.x, s.z - c.z)).toBeGreaterThan(c.r + TUNING.soundsystemFootprint);
        // its legend: in the circle, near its far (north, top of the screen) side, the open floor in front
        const L = creatures.find(o => o.boss && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1])!;
        expect(Math.hypot(L.x - c.x, L.z - c.z)).toBeLessThan(c.r * 0.6);
        expect(L.z).toBeLessThan(c.z - c.r * 0.3);
      }
    });
  }
  it("is sized to its legend: the elk's wider than the bat's", () => {
    const S = TUNING.legendClearing.species;
    expect(S.elk).toBeGreaterThan(TUNING.legendClearing.radius);
    expect(S.bat ?? TUNING.legendClearing.radius).toBeLessThan(S.elk);
  });
});
