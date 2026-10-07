import { describe, expect, it } from "vitest";
import { generateMap } from "../rules/map";
import { Forest } from "../rules/forest";
import { TUNING } from "../rules/tuning";
import { BarkFaces, treeKey } from "./barkFaces";
import { cellKey } from "../rules/party";

describe("bark faces (render/barkFaces.ts)", () => {
  it("at most two trees an area wear one, never home's, the same every time", () => {
    const map = generateMap(123, TUNING), forest = new Forest(map), d = map.dancefloor, home = map.areaAt(d.x, d.z).cell;
    const run = () => {
      const F = new BarkFaces(map, home), near = (x: number, z: number, r: number) => forest.treesNear(x, z, r), byArea = new Map<string, number>(), keys: number[] = [];
      expect(F.anchors).toBeLessThanOrEqual(map.cells.length * 2);
      for (const [cx, cy] of map.cells) {
        const s = map.siteOf(cx, cy);
        for (const p of forest.treesNear(s.x, s.z, 70)) if (F.isFace(p, near)) {
          const a = map.areaAt(p.x, p.z), k = cellKey(a.cell);
          if (!keys.includes(treeKey(p.x, p.z))) { keys.push(treeKey(p.x, p.z)); byArea.set(k, (byArea.get(k) ?? 0) + 1); }
        }
      }
      return { byArea, keys };
    };
    const A = run(), B = run();
    for (const n of A.byArea.values()) expect(n).toBeLessThanOrEqual(2);
    expect(A.byArea.has(cellKey(home))).toBe(false);
    expect(A.keys.length).toBeGreaterThan(5); // (some, across the map)
    expect(B.keys.sort()).toEqual(A.keys.sort());
  });
});
