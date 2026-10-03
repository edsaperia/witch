import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { soundsystemFor } from "./party";
import { TUNING } from "./tuning";

// Gameplay first, then scenery (Ed, 2026-10-03: set pieces were landing on soundsystems).
describe("scenery placement", () => {
  const t = TUNING, R = t.setPieceFootprint * t.setPieceScale;
  for (const seed of [1, 123, 4242, 90210, 777777]) {
    it(`no set piece's footprint touches a soundsystem or the dancefloor (seed ${seed})`, () => {
      const map = generateMap(seed, t), forest = new Forest(map), d = map.dancefloor;
      const sounds: { x: number; z: number }[] = [];
      for (let y = 0; y < map.n; y++) for (let x = 0; x < map.n; x++)
        if (!(x === map.centreCell[0] && y === map.centreCell[1])) sounds.push(soundsystemFor(map, [x, y]));
      const half = (map.n * map.areaSize) / 2, pieces = forest.setPiecesNear(half, half, half + map.areaSize);
      expect(pieces.length).toBeGreaterThan(3);
      for (const p of pieces) {
        for (const s of sounds) expect(Math.hypot(p.x - s.x, p.z - s.z)).toBeGreaterThanOrEqual(R + t.soundsystemFootprint);
        expect(Math.hypot(p.x - d.x, p.z - d.z)).toBeGreaterThanOrEqual(R + d.radius);
        const c = map.areaAt(p.x, p.z).cell, s = map.setPieceSpot(c[0], c[1]);
        expect(s).toEqual({ x: p.x, z: p.z }); // in its own area
      }
    });
  }
  it("soundsystems stand in their own area, and trees keep clear of them", () => {
    const map = generateMap(123, t), forest = new Forest(map);
    for (const [x, y] of [[3, 4], [10, 9], [12, 0]]) {
      const s = soundsystemFor(map, [x, y]), c = map.areaAt(s.x, s.z).cell;
      expect(c).toEqual([x, y]);
      for (const tr of forest.treesNear(s.x, s.z, 12)) expect(Math.hypot(tr.x - s.x, tr.z - s.z)).toBeGreaterThanOrEqual(t.soundsystemFootprint + t.treeMarginFromSoundsystem);
    }
  });
});
