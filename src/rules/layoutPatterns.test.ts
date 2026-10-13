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
const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const corr = (a: number[], b: number[]) => { const ma = mean(a), mb = mean(b); let sab = 0, saa = 0, sbb = 0; for (let i = 0; i < a.length; i++) { sab += (a[i] - ma) * (b[i] - mb); saa += (a[i] - ma) ** 2; sbb += (b[i] - mb) ** 2; } return saa && sbb ? sab / Math.sqrt(saa * sbb) : 0; };

describe("the layout patterns", () => {
  const shaped = (LAYOUT_PATTERNS as string[]).filter(p => !["scatter", "lone", "thicket"].includes(p)); // (those three are flat: the density alone)
  it("are the eleven art/areas.js names, each about 1 on average over an area", () => {
    expect(LAYOUT_PATTERNS).toEqual(["scatter", "groves", "rows", "rings", "thicket", "lone", "stands", "edgeOnly", "glades", "hedges", "grid"]);
    for (const p of LAYOUT_PATTERNS as string[]) { const m = mean(field(p)); expect(m, p).toBeGreaterThan(0.6); expect(m, p).toBeLessThan(1.5); }
  });
  it("each shaped one varies over the area, never below 0, and reads unlike every other (correlation under 0.8)", () => {
    const fields = Object.fromEntries(shaped.map(p => [p, field(p)]));
    for (const p of shaped) { const f = fields[p]; expect(Math.min(...f), p).toBeGreaterThanOrEqual(0); expect(Math.max(...f) - Math.min(...f), p).toBeGreaterThan(0.8); }
    for (const a of shaped) for (const b of shaped) if (a < b) expect(Math.abs(corr(fields[a], fields[b])), `${a} ~ ${b}`).toBeLessThan(0.8);
  });
  it("glades are the inverse of groves' idea (holes in a full wood), hedges thin lines, a grid rows crossing rows", () => {
    const g = field("glades"); expect(g.filter(v => v > 1.2).length / g.length).toBeGreaterThan(0.5); // mostly full wood
    const h = field("hedges"); expect(h.filter(v => v < 0.5).length / h.length).toBeGreaterThan(0.5); // mostly open ground
    const r = field("rows"), q = field("grid"); expect(q.filter(v => v > 0.8).length).toBeGreaterThan(r.filter(v => v > 0.8).length); // the crossing rows add trees
  });
});
