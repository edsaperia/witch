// The zoo's islands in their real shapes (Ed, 2026-10-26: "We already know the real coastline shapes, can't we reuse them in the
// zoo without calculating anything?"; rules/zooMap.ts placeCoast, app/chartCache.ts compactCoast): a coast with a bay keeps its
// bay (inside it is the street, not the island), the fence stops her at the coast itself, and an island the cache doesn't have is
// round as before.
import { describe, expect, it } from "vitest";
import { compactCoast } from "../app/chartCache";
import { coastDist, insideIsland, placeCoast, zooFence, zooLayout, type ZooIsland } from "./zooMap";
import { KIND_NAMES } from "./rosters";

/** A "C": a disc with a deep bay cut into its east side (x, z pairs, metres). */
function crescent(n = 200): Float32Array {
  const pts: number[] = [];
  for (let k = 0; k < n; k++) {
    const a = -Math.PI + (k / n) * Math.PI * 2, bay = Math.abs(a) < 0.5 ? 1 - 0.75 * Math.cos((a / 0.5) * (Math.PI / 2)) : 1;
    pts.push(Math.cos(a) * 1000 * bay, Math.sin(a) * 1000 * bay);
  }
  return Float32Array.from(pts);
}

describe("the zoo's islands in their real coasts", () => {
  const unit = compactCoast([{ pts: crescent(), sea: true }, { pts: Float32Array.from([0, 0, 10, 0, 10, 10]), sea: false }])!;

  it("keeps the chart's biggest sea loop, evenly spaced, its longer side 1 across, centred on its box", () => {
    expect(unit.length).toBeGreaterThan(100);
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let i = 0; i < unit.length; i += 2) { x0 = Math.min(x0, unit[i]); x1 = Math.max(x1, unit[i]); z0 = Math.min(z0, unit[i + 1]); z1 = Math.max(z1, unit[i + 1]); }
    expect(Math.max(x1 - x0, z1 - z0)).toBeCloseTo(1, 1);
    expect((x0 + x1) / 2).toBeCloseTo(0, 2);
  });

  it("keeps its bay: a point in the bay is the street, the land round it the island", () => {
    const P = placeCoast(unit, 250), I: ZooIsland = { kind: "x", x: 0, z: 0, reach: P.reach, most: P.most, coast: P.coast, found: true, cell: [1, 1] };
    // (the bay's mouth is east of the box's middle: find it from the coast itself)
    let ex = -Infinity; for (let i = 0; i < P.coast.length; i += 2) ex = Math.max(ex, P.coast[i]);
    const bayX = ex - 30; // (30 m in from the points either side of the bay, on its axis)
    const zMid = (() => { let a = Infinity, b = -Infinity; for (let i = 0; i < P.coast.length; i += 2) { a = Math.min(a, P.coast[i + 1]); b = Math.max(b, P.coast[i + 1]); } return (a + b) / 2; })();
    expect(insideIsland(I, bayX, zMid)).toBe(false);
    expect(insideIsland(I, bayX, zMid + 70)).toBe(true); // (the horn of land beside it)
    expect(coastDist(I, 0, 0)).toBeGreaterThan(30); // (its middle, the deepest point, well inside)
  });

  it("the fence stops her at the coast itself, in the bay too", () => {
    const P = placeCoast(unit, 250), I: ZooIsland = { kind: "x", x: 500, z: 500, reach: P.reach, most: P.most, coast: P.coast, found: true, cell: [3, 3] };
    const F = zooFence({ islands: [I], home: { x: 0, z: 0 }, homeCell: [0, 0], reach: 900, scale: 1, n: 10 }, 168);
    // (walking from her island's middle straight east, into the bay)
    let x = 500, z = 500, stopped = false;
    for (let i = 0; i < 400; i++) { const s = F.stop(x, z, x + 1, z); if (s) { x = s.x; z = s.z; stopped = true; break; } x += 1; }
    expect(stopped).toBe(true);
    expect(Math.abs(coastDist(I, x, z))).toBeLessThan(1); // (at the coast, just this side)
    expect(insideIsland(I, x, z)).toBe(true);
  });

  it("lays out with the real coasts it's given, and round ones for the rest", () => {
    const A = 168, some = Object.fromEntries(KIND_NAMES.slice(0, 5).map(k => [k, unit]));
    const L = zooLayout(0, "all", { across: A * 1.6, gap: 16, street: 28, plaza: 60, margin: 120, areaSize: A, coasts: some });
    expect(L.islands.filter(I => I.real).map(I => I.kind).sort()).toEqual(KIND_NAMES.slice(0, 5).sort());
    for (const I of L.islands) { expect(insideIsland(I, I.x, I.z), I.kind).toBe(true); expect(coastDist(I, I.x, I.z), I.kind).toBeGreaterThan(20); }
  });
});
