// Walking about her bedroom (src/ui/roomWalk.ts on art/bedroom.js's floor): the keys move her as on screen, the walls and the
// furniture stop her, and she never ends up inside anything however long she walks.
import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { clear, floorDir, keysDir, newWalker, walk, type RoomFloor } from "./roomWalk";

const room = (S?: number) => (Art.bedroomSprite as unknown as (st: object, o: object) => { walk: RoomFloor })({ pixel: 4 }, { S }).walk;

describe("walking in her bedroom", () => {
  const f = room();
  it("is twice the first room's floor, and she starts somewhere clear", () => {
    expect(f.S * f.S).toBeGreaterThanOrEqual(2 * 3 * 3 - .5);
    expect(clear(f, f.start[0], f.start[1])).toBe(true);
  });
  it("moves her the way the keys point on screen", () => {
    for (const [sx, sy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1]]) {
      const [dx, dz] = floorDir(f, sx, sy), a = f.project([2, 0, 2]), b = f.project([2 + dx * .1, 0, 2 + dz * .1]);
      const mx = b[0] - a[0], my = b[1] - a[1], l = Math.hypot(mx, my);
      expect((mx * sx + my * sy) / l / Math.hypot(sx, sy), `${sx},${sy}`).toBeGreaterThan(.99);
    }
    expect(keysDir(new Set(["KeyW", "KeyD"]))).toEqual([1, -1]);
    expect(keysDir(new Set(["ArrowDown", "ArrowLeft"]))).toEqual([-1, 1]);
  });
  it("stops at the walls and the furniture, sliding along them, and never ends up inside anything", () => {
    for (const [sx, sy] of [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, -1], [1, 1], [1, -1], [-1, 1]]) {
      const w = newWalker(f);
      for (let i = 0; i < 600; i++) { walk(w, f, sx, sy, 1 / 60); expect(clear(f, w.x, w.z), `${sx},${sy} step ${i}`).toBe(true); }
      expect(w.moving).toBe(true);
    }
    // straight at the bed, from beside it: she stops short of it
    const w = newWalker(f); w.x = 1.5; w.z = 1.4;
    const [dx] = floorDir(f, -1, 0);
    for (let i = 0; i < 300; i++) walk(w, f, dx < 0 ? -1 : 1, 0, 1 / 60);
    expect(w.x).toBeGreaterThan(1.1);
  });
  it("faces the way she walks", () => {
    const w = newWalker(f);
    walk(w, f, -1, 0, 1 / 60); expect(w.flip).toBe(true);
    walk(w, f, 0, -1, 1 / 60); expect(w.away).toBe(true);
    walk(w, f, 1, 1, 1 / 60); expect(w.flip).toBe(false); expect(w.away).toBe(false);
    walk(w, f, 0, 0, 1 / 60); expect(w.moving).toBe(false);
  });
  it("keeps every footprint and her start inside the floor at any size", () => {
    for (const S of [3, 4.25, 6]) {
      const g = room(S);
      expect(clear(g, g.start[0], g.start[1]), `start at ${S}`).toBe(true);
      for (const [x0, z0, x1, z1] of g.blocks) { expect(x0).toBeLessThan(x1); expect(z0).toBeLessThan(z1); expect(x1).toBeLessThanOrEqual(S + .01); expect(z1).toBeLessThanOrEqual(S + .01); }
    }
  });
});
