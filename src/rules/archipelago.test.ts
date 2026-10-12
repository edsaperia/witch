// The archipelago (Ed, 2026-10-12, the journey's tessellation: rules/archipelago.ts): every island in its own patch, grown inside
// it, so neighbouring coasts keep a strait between them and follow each other across it.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { homeIsland, islandOf, REAL_KINDS, worldOf } from "./rosters";
import { islandOutline } from "./islandShape";
import { CHART_METRES, STRAIT } from "./archipelago";

describe("the archipelago", () => {
  it("is the same for a world each time, and another world's is another", () => {
    const a = worldOf(0), b = worldOf(1);
    expect(worldOf(0)).toBe(a);
    expect(a.islands.size).toBe(b.islands.size);
    expect(a.islands.get("home")!.x).toBe(0);
    const k = [...a.islands.keys()].find(x => x !== "home")!;
    expect(a.islands.get(k)!.x).not.toBe(b.islands.get(k)!.x);
    // (one true scale, every world: the sea chart draws by CHART_METRES)
    expect(Math.abs(a.metres - CHART_METRES)).toBeLessThan(5);
    expect(Math.abs(b.metres - CHART_METRES)).toBeLessThan(5);
  });

  it("grows each island in its patch: home and its nearest neighbours' coasts never meet, a strait apart, and close enough to read as fitted", () => {
    const W = worldOf(0), home = W.islands.get("home")!, M = W.metres;
    const near = [...W.islands.values()].filter(p => p.id !== "home" && islandOf(p.id)).sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y)).slice(0, 4);
    const coast = (id: string, x: number, y: number) => {
      const o = islandOutline(id === "home" ? homeIsland(0, REAL_KINDS.slice(0, 64), 64) : islandOf(id, 0)!, TUNING, 32), pts: number[] = [];
      for (const l of o.loops) if (l.sea) for (let i = 0; i < l.pts.length; i += 2) pts.push(x * M + l.pts[i], y * M + l.pts[i + 1]);
      return pts;
    };
    const H = coast("home", home.x, home.y);
    let closest = Infinity;
    for (const p of near) {
      const C = coast(p.id, p.x, p.y);
      let d = Infinity;
      for (let i = 0; i < H.length; i += 2) for (let j = 0; j < C.length; j += 2) d = Math.min(d, Math.hypot(H[i] - C[j], H[i + 1] - C[j + 1]));
      expect(d, `home and ${p.id}`).toBeGreaterThan(STRAIT - 8); // (a strait at least, less the outline's sampling)
      closest = Math.min(closest, d);
    }
    expect(closest).toBeLessThan(STRAIT * 4); // (one of them across a strait from home, not open sea)
  }, 120000);
});
