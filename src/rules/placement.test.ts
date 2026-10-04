import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { soundsystemFor } from "./party";
import { TUNING } from "./tuning";

// Gameplay first, then scenery (Ed, 2026-10-03: set pieces were landing on soundsystems).
describe("scenery placement", () => {
  const t = TUNING, R = t.setPieceFootprint * t.setPieceScale;
  for (const seed of [1, 123, 4242, 90210, 777777]) {
    it(`no set piece's, decoration's, relic's or ground's footprint touches a soundsystem, the dancefloor, the treehouse or a set piece (seed ${seed})`, () => {
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
      const th = map.treehouse, thClear = t.treehouse.clear;
      for (const p of pieces) expect(Math.hypot(p.x - th.x, p.z - th.z)).toBeGreaterThanOrEqual(R + thClear);
      // Decorations: their footprint clear of soundsystems, the dancefloor, the treehouse and set pieces.
      const decor = forest.decorNear(half, half, half + map.areaSize), F = t.decor.footprint;
      for (const p of decor) {
        for (const s of sounds) expect(Math.hypot(p.x - s.x, p.z - s.z)).toBeGreaterThanOrEqual(F + t.soundsystemFootprint);
        expect(Math.hypot(p.x - d.x, p.z - d.z)).toBeGreaterThanOrEqual(F + d.radius);
        expect(Math.hypot(p.x - th.x, p.z - th.z)).toBeGreaterThanOrEqual(F + thClear);
        for (const q of pieces) expect(Math.hypot(p.x - q.x, p.z - q.z)).toBeGreaterThanOrEqual(F + R);
      }
      // Grounds (playgrounds, sports grounds): their whole clearing clear of all of it, and of each other.
      for (const gr of map.grounds) {
        for (const s of sounds) expect(Math.hypot(gr.x - s.x, gr.z - s.z)).toBeGreaterThanOrEqual(gr.r + t.soundsystemFootprint);
        expect(Math.hypot(gr.x - d.x, gr.z - d.z)).toBeGreaterThanOrEqual(gr.r + d.radius);
        expect(Math.hypot(gr.x - th.x, gr.z - th.z)).toBeGreaterThanOrEqual(gr.r + thClear);
        for (const q of pieces) expect(Math.hypot(gr.x - q.x, gr.z - q.z)).toBeGreaterThanOrEqual(gr.r + R);
        for (const o of map.grounds) if (o !== gr) expect(Math.hypot(gr.x - o.x, gr.z - o.z)).toBeGreaterThanOrEqual(gr.r + o.r);
      }
      // Modern relics: their footprint clear too.
      for (const p of forest.relicsNear(half, half, half + map.areaSize)) {
        for (const s of sounds) expect(Math.hypot(p.x - s.x, p.z - s.z)).toBeGreaterThanOrEqual(F + t.soundsystemFootprint);
        for (const gr of map.grounds) expect(Math.hypot(p.x - gr.x, p.z - gr.z)).toBeGreaterThanOrEqual(F + gr.r);
      }
    }, 60000); // the whole map's set pieces and decor
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
