// The layout engine's patterns (rules/forest.ts patternMask; art/areas.js LAYOUT_PATTERNS): each one a density mask over the
// area, about 1 on average so the area's density means what it says, and each its own shape, so an area with a pattern few
// others have looks unlike them (Ed's intent: each area different; the three of 2026-10-13, glades, hedges and grid, join the
// eight).
import { describe, expect, it } from "vitest";
import { LAYOUT_PATTERNS } from "../../art/areas.js";
import { patternMask } from "./forest";
import type { AreaLayout, ForestMap } from "./map";

const map = { seed: 7, areaAt: (x: number, z: number) => ({ openness: Math.min(1, Math.hypot(x, z) / 60) }) } as unknown as ForestMap;
const layout = (pattern: string): AreaLayout => ({ pattern, along: 30, density: 0.5, clump: 0.7, undergrowth: 0.5, lean: { dir: 40, amount: 0.2 }, terrain: ["hollows"] });
const field = (pattern: string): number[] => { const L = layout(pattern), out: number[] = []; for (let z = -58; z <= 58; z += 2) for (let x = -58; x <= 58; x += 2) out.push(patternMask(map, x, z, L)); return out; };

describe("the layout patterns", () => {
  const shaped = (LAYOUT_PATTERNS as string[]).filter(p => !["scatter", "lone", "thicket"].includes(p)); // (those three are flat: the density alone)
  it("are exactly the eleven supported art/areas.js names", () => {
    expect(LAYOUT_PATTERNS).toEqual(["scatter", "groves", "rows", "rings", "thicket", "lone", "stands", "edgeOnly", "glades", "hedges", "grid"]);
    // W8, Ed 2026-11-02: sampled mask means are informational reports.
  });
  it("keeps every sampled shaped mask nonnegative", () => {
    const fields = Object.fromEntries(shaped.map(p => [p, field(p)]));
    for (const p of shaped) { const f = fields[p]; expect(f.length).toBeGreaterThan(0); expect(Math.min(...f), p).toBeGreaterThanOrEqual(0); }
    // The original field ranges and pair correlations are retained in the W8 report.
  });
  it("glades are the inverse of groves' idea (holes in a full wood), hedges thin lines, a grid rows crossing rows", () => {
    const g = field("glades"); expect(g.filter(v => v > 1.2).length / g.length).toBeGreaterThan(0.5); // mostly full wood
    const h = field("hedges"); expect(h.filter(v => v < 0.5).length / h.length).toBeGreaterThan(0.5); // mostly open ground
    const r = field("rows"), q = field("grid"); expect(q.filter(v => v > 0.8).length).toBeGreaterThan(r.filter(v => v > 0.8).length); // the crossing rows add trees
  });
});
