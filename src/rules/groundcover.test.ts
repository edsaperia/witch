// The ground cover's extras (Ed, 2026-10-04: "extra grass touches"): reeds ringing ponds and none in
// the water, none right against a trunk and thicker round its foot.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { TUNING } from "./tuning";
import { tuftSpan, tuftsInCell, TUFT_KINDS } from "./groundcover";

const map = generateMap(123, TUNING), forest = new Forest(map), G = TUNING.groundCover;
const cells = (x: number, z: number, r: number, f?: Forest) => {
  const out = [], span = Math.max(1, Math.round(G.cell / G.spacing)) * G.spacing; // (a cell's true size: whole tufts across, as tuftsInCell has it)
  for (let cj = Math.floor((z - r) / span); cj <= Math.floor((z + r) / span); cj++)
    for (let ci = Math.floor((x - r) / span); ci <= Math.floor((x + r) / span); ci++) out.push(...tuftsInCell(map, ci, cj, G.cell, G.spacing, 1, f));
  return out;
};

describe("ground cover extras", () => {
  it("rings ponds with reeds and keeps the water clear", () => {
    const d = map.dancefloor, ponds = forest.lightsNear(d.x, d.z, 1500).filter(l => l.kind === "pond").slice(0, 6);
    expect(ponds.length).toBeGreaterThan(0);
    let reeds = 0;
    for (const p of ponds) for (const t of cells(p.x, p.z, 3 * p.size + 3, forest)) {
      const pd = Math.hypot(t.x - p.x, t.z - p.z);
      expect(pd).toBeGreaterThanOrEqual(3 * p.size - 1e-6);
      if (pd < 3 * p.size + 1.6 && TUFT_KINDS[t.kind] === "reeds") reeds++;
    }
    expect(reeds).toBeGreaterThan(5);
  });
  it("keeps clear of trunks and grows thicker round their feet", () => {
    // Somewhere wooded near home (not in an area's open arena).
    const d = map.dancefloor, spots = Array.from({ length: 64 }, (_, i) => [d.x + 120 + (i % 8) * 25, d.z + 90 + Math.floor(i / 8) * 25]);
    const [x, z] = spots.find(([sx, sz]) => forest.treesNear(sx, sz, 30).length > 12)!, trees = forest.treesNear(x, z, 30);
    expect(trees.length).toBeGreaterThan(5);
    const withF = cells(x, z, 30, forest), without = cells(x, z, 30);
    for (const t of withF) for (const p of trees) expect(Math.hypot(t.x - p.x, t.z - p.z)).toBeGreaterThanOrEqual(0.35 - 1e-6);
    const nearFeet = (l: { x: number; z: number }[]) => l.filter(t => trees.some(p => { const fd = Math.hypot(t.x - p.x, t.z - p.z); return fd > 0.35 && fd < 1.75; })).length;
    expect(nearFeet(withF)).toBeGreaterThan(nearFeet(without));
  });
});

describe("ground cover cells far from the origin", () => {
  // The view asks for the cells round her by tuftSpan (a cell's true size, whole tufts across):
  // indexed by G.cell instead (8 m, against 8.1 m), the tufts came about 18 m off, 1500 m out.
  it("has the cell the view asks for at a point hold the tufts round that point", () => {
    const C = tuftSpan(G.cell, G.spacing);
    let checked = 0;
    for (let i = 0; i < 40; i++) {
      const x = 1400 + i * 37.3, z = 1600 + i * 23.9, ci = Math.floor(x / C), cj = Math.floor(z / C);
      const t = tuftsInCell(map, ci, cj, G.cell, G.spacing, 1);
      if (t.length < 10) continue; // (a path, a pond or a clearing there)
      checked++;
      const xs = t.map(p => p.x), zs = t.map(p => p.z);
      expect(x, `cell ${ci},${cj}`).toBeGreaterThanOrEqual(Math.min(...xs) - G.spacing * 1.5);
      expect(x, `cell ${ci},${cj}`).toBeLessThanOrEqual(Math.max(...xs) + G.spacing * 1.5);
      expect(z, `cell ${ci},${cj}`).toBeGreaterThanOrEqual(Math.min(...zs) - G.spacing * 1.5);
      expect(z, `cell ${ci},${cj}`).toBeLessThanOrEqual(Math.max(...zs) + G.spacing * 1.5);
    }
    expect(checked).toBeGreaterThan(10);
  });
});
