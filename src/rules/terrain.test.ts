// The lie of the land in the layout (rules/terrain.ts): runestones on rises, legend clearings in hollows, trees thicker
// in low ground; seeded, and nothing with ground.layout off.
import { describe, expect, it } from "vitest";
import { Forest } from "./forest";
import { generateMap, type ForestMap } from "./map";
import { drawnHills, layoutBias, lowlandDensity, terrainAt } from "./terrain";
import { TUNING, withTuning } from "./tuning";

const H = drawnHills(TUNING), off = withTuning({ ground: { ...TUNING.ground, layout: { ...TUNING.ground.layout!, on: false } } });
const ring = (m: ForestMap, x: number, z: number, r: number) => { let s = 0; for (let a = 0; a < 16; a++) s += terrainAt(m, x + Math.cos(a * Math.PI / 8) * r, z + Math.sin(a * Math.PI / 8) * r, H); return s / 16; };

describe("the lie of the land (ground.layout)", () => {
  for (const seed of [123, 31337]) it(`seed ${seed}: every runestone on a rise, every legend clearing in a hollow`, () => {
    const m = generateMap(seed, TUNING), [hx, hy] = m.centreCell;
    for (const [cx, cy] of m.cells) if (cx !== hx || cy !== hy) { const s = m.soundsystemSpot(cx, cy); expect(terrainAt(m, s.x, s.z, H)).toBeGreaterThan(ring(m, s.x, s.z, 50)); }
    expect(m.legendClearings.length).toBeGreaterThan(10);
    for (const c of m.legendClearings) expect(terrainAt(m, c.x, c.z, H)).toBeLessThan(ring(m, c.x, c.z, 50));
  });

  it("is seeded, and with ground.layout off the land is the hills alone and trees grow as before", () => {
    const a = generateMap(7, TUNING), b = generateMap(7, TUNING), s = a.soundsystemSpot(...a.cells[3]);
    expect(terrainAt(a, s.x, s.z, H)).toBe(terrainAt(b, s.x, s.z, H));
    const m = generateMap(7, off);
    expect(layoutBias(m, s.x, s.z)).toBe(0);
    expect(lowlandDensity(m, s.x, s.z)).toBe(1);
  });

  it("grows trees thicker in the low ground than on the high", () => {
    const m = generateMap(123, TUNING), f = new Forest(m), { x, z } = m.dancefloor, R = 400;
    const hs: number[] = [];
    for (let i = -R; i <= R; i += 10) for (let j = -R; j <= R; j += 10) if (i * i + j * j < R * R) hs.push(terrainAt(m, x + i, z + j, H));
    hs.sort((p, q) => p - q);
    const low = hs[Math.floor(hs.length / 3)], high = hs[Math.floor((2 * hs.length) / 3)], n = [0, 0];
    for (const t of f.treesNear(x, z, R)) { const v = terrainAt(m, t.x, t.z, H); if (v < low) n[0]++; else if (v >= high) n[1]++; }
    expect(n[0]).toBeGreaterThan(n[1] * 1.3);
  }, 60000);
});
