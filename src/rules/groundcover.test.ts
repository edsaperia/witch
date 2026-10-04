// The ground cover's extras (Ed, 2026-10-04: "extra grass touches"): reeds ringing ponds and none in
// the water, none right against a trunk and thicker round its foot.
import { describe, expect, it } from "vitest";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { TUNING } from "./tuning";
import { tuftsInCell, TUFT_KINDS } from "./groundcover";

const map = generateMap(123, TUNING), forest = new Forest(map), G = TUNING.groundCover;
const cells = (x: number, z: number, r: number, f?: Forest) => {
  const out = [];
  for (let cj = Math.floor((z - r) / G.cell); cj <= Math.floor((z + r) / G.cell); cj++)
    for (let ci = Math.floor((x - r) / G.cell); ci <= Math.floor((x + r) / G.cell); ci++) out.push(...tuftsInCell(map, ci, cj, G.cell, G.spacing, 1, f));
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
    const d = map.dancefloor, x = d.x + 120, z = d.z + 90, trees = forest.treesNear(x, z, 30);
    expect(trees.length).toBeGreaterThan(5);
    const withF = cells(x, z, 30, forest), without = cells(x, z, 30);
    for (const t of withF) for (const p of trees) expect(Math.hypot(t.x - p.x, t.z - p.z)).toBeGreaterThanOrEqual(0.35 - 1e-6);
    const nearFeet = (l: { x: number; z: number }[]) => l.filter(t => trees.some(p => { const fd = Math.hypot(t.x - p.x, t.z - p.z); return fd > 0.35 && fd < 1.75; })).length;
    expect(nearFeet(withF)).toBeGreaterThan(nearFeet(without));
  });
});
