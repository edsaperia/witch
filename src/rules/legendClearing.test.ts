import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { keepsToCircle, pointInArea, spawnCreatures, stepCreature } from "./creatures";
import { rng } from "./random";
import { soundsystemFor } from "./party";
import { TUNING } from "./tuning";

// Each area's sleeping legend lies in a small circular clearing of its own (Ed, 2026-10-06), near its top.
describe("legend clearings", () => {
  for (const seed of [1, 123, 4242, 90210]) {
    it(`every area but home has one, inside its own area, clear of trees, bushes, decor and the soundsystem, its legend near the top (seed ${seed})`, () => {
      const map = generateMap(seed, TUNING), forest = new Forest(map), creatures = spawnCreatures(map);
      // every area with room for one has one: 4000 m² or more of its ground where she can fly (the rest: slivers at the map's edge, or absorbed by their neighbours)
      const B = map.bounds, ground = new Map<string, number>();
      for (let x = B.minX + 15; x < B.maxX - 15; x += 8) for (let z = B.minZ + 15; z < B.maxZ - 15; z += 8) { const k = map.areaAt(x, z).cell.join(","); ground.set(k, (ground.get(k) ?? 0) + 64); }
      for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++)
        if (!(x === map.centreCell[0] && y === map.centreCell[1]) && (ground.get(`${x},${y}`) ?? 0) >= 4000) expect(map.legendClearing(x, y), `area ${x},${y}`).not.toBeNull();
      expect(map.legendClearing(map.centreCell[0], map.centreCell[1])).toBeNull();
      for (const c of map.legendClearings) {
        expect(map.legendClearing(c.cell[0], c.cell[1])).toBe(c);
        for (let k = 0; k < 16; k++) { const b = (k / 16) * Math.PI * 2, at = map.areaAt(c.x + Math.cos(b) * c.r, c.z + Math.sin(b) * c.r).cell; expect(at).toEqual(c.cell); }
        // (its edge ragged by up to a metre and a half either way)
        for (const t of forest.treesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r - 1.6);
        for (const t of forest.bushesNear(c.x, c.z, c.r + 2)) expect(Math.hypot(t.x - c.x, t.z - c.z)).toBeGreaterThanOrEqual(c.r - 1.6);
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
  // Ed (2026-10-06): "Legend circles should spawn with a wild baby in them, which tries to stay within the circle while it's wild."
  it("each holds a wild baby of its legend's kind, which keeps to the circle while wild, comes back in if pushed out, and is free once hers", () => {
    const map = generateMap(123, TUNING), creatures = spawnCreatures(map);
    for (const c of map.legendClearings) {
      const L = creatures.find(o => o.boss && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1])!;
      const babies = creatures.filter(o => o.circle && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1]);
      expect(babies.length).toBe(1);
      const B = babies[0];
      expect(B.level).toBe(0);
      expect(B.species).toBe(L.species);
      expect(Math.hypot(B.x - c.x, B.z - c.z)).toBeLessThan(c.r);
      expect(Math.hypot(B.x - L.x, B.z - L.z)).toBeGreaterThan(c.r * 0.3); // (off its legend's lair)
    }
    const B = creatures.find(o => o.circle)!, k = B.circle!;
    expect(keepsToCircle(B)).toBe(true);
    for (let i = 0; i < 60 * 60; i++) { stepCreature(B, 1 / 60, map); expect(Math.hypot(B.x - k.x, B.z - k.z)).toBeLessThan(k.r + 0.5); }
    // pushed out: back in within 20 s (a baby walks slowly)
    B.x = k.x + k.r + 6; B.z = k.z; B.tx = B.x; B.tz = B.z;
    for (let i = 0; i < 60 * 20; i++) stepCreature(B, 1 / 60, map);
    expect(Math.hypot(B.x - k.x, B.z - k.z)).toBeLessThan(k.r);
    // hers (leashed, or happy): no longer kept to it
    B.leashed = true;
    expect(keepsToCircle(B)).toBe(false);
    const r = rng(5), far = Array.from({ length: 40 }, () => pointInArea(map, B, r)).some(([x, z]) => Math.hypot(x - k.x, z - k.z) > k.r);
    expect(far).toBe(true);
  });
});
