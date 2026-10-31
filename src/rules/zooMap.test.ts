// The zoo laid out like the sea chart (rules/zooMap.ts; Ed, 2026-10-26, mock: previews/ed/zoo-map on claude/ed-shots): every island
// at its chart place and one area across, the streets (home's ground) between, an island found its area and its kind alone, one
// not found its biome's lake, each legend asleep at its island's middle, its runestone by the south shore.
import { describe, expect, it } from "vitest";
import { newGame, type Game } from "./game";
import { TUNING, type Tuning } from "./tuning";
import { AREA_TYPES } from "./map";
import { homeKinds, KIND_NAMES } from "./rosters";
import { insideIsland, reachAt, zooLayout } from "./zooMap";
import { lakeDepth } from "./lakes";
import { ZOO_CONFIG } from "./zoo";

// Keep the complete chart-shaped zoo: all 64 islands, street clearance, per-kind population and found/unfound lake geometry are the assertions.
const zoo = (found: string[]): Tuning => ({ ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0, found } });
const A = TUNING.areaSize * TUNING.areaScale;
const games = new Map<string, Game>();
const game = (found: string[]) => { const k = found.join(","); if (!games.has(k)) games.set(k, newGame(7, zoo(found))); return games.get(k)!; };

describe("the zoo laid out like the sea chart (Ed, 2026-10-26)", () => {
  it("puts every kind's island at its chart place, size areas across, no two closer than the gap, the typical street about street (Ed: \"too small and too far apart\")", () => {
    const S = ZOO_CONFIG.size ?? 1, across = A * S;
    const L = zooLayout(0, "all", { across, gap: ZOO_CONFIG.gap!, street: ZOO_CONFIG.street, plaza: ZOO_CONFIG.plaza, margin: ZOO_CONFIG.margin!, areaSize: A });
    expect(L.islands.length).toBe(KIND_NAMES.length);
    const cells = new Set([`${L.homeCell[0]},${L.homeCell[1]}`]);
    for (const I of L.islands) {
      let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
      for (let k = 0; k < 360; k++) { const a = -Math.PI + (k / 360) * Math.PI * 2, r = reachAt(I.reach, a); x0 = Math.min(x0, Math.cos(a) * r); x1 = Math.max(x1, Math.cos(a) * r); z0 = Math.min(z0, Math.sin(a) * r); z1 = Math.max(z1, Math.sin(a) * r); }
      expect(Math.max(x1 - x0, z1 - z0) / across, I.kind).toBeCloseTo(1, 1); // (size areas across, whatever its real size)
      expect(cells.has(`${I.cell[0]},${I.cell[1]}`), I.kind).toBe(false); cells.add(`${I.cell[0]},${I.cell[1]}`);
      // (off the plaza)
      expect(Math.hypot(I.x - L.home.x, I.z - L.home.z) - reachAt(I.reach, Math.atan2(L.home.z - I.z, L.home.x - I.x))).toBeGreaterThanOrEqual((ZOO_CONFIG.plaza ?? 0) + ZOO_CONFIG.gap! - 0.5);
    }
    // (coast to coast along the line between their middles: never under the gap; the median nearest about the street)
    const street = L.islands.map(I => Math.min(...L.islands.filter(J => J !== I).map(J => { const a = Math.atan2(J.z - I.z, J.x - I.x); return Math.hypot(J.x - I.x, J.z - I.z) - reachAt(I.reach, a) - reachAt(J.reach, a + Math.PI); })));
    expect(Math.min(...street)).toBeGreaterThanOrEqual(ZOO_CONFIG.gap! - 0.5);
    const sorted = [...street].sort((a, b) => a - b), med = sorted[Math.floor(sorted.length / 2)];
    expect(med).toBeGreaterThan(ZOO_CONFIG.gap!);
    expect(med).toBeLessThanOrEqual((ZOO_CONFIG.street ?? 0) + 1);
  });

  it("?all (found \"*\", the map's see-all): every island its kind's area; the rest of the ground home's (the plaza and the streets)", () => {
    const g = game(["*"]), m = g.map, Z = m.zoo!, L = Z.layout!;
    expect(Z.blocks.length).toBe(64);
    expect(Z.blocks.every(b => b.found)).toBe(true);
    expect(m.cells.length).toBe(65); // (64 islands and home)
    expect(new Set(Z.blocks.map(b => b.area)).size).toBe(AREA_TYPES.length); // (every area type, on exactly one island)
    for (const b of Z.blocks) {
      expect(AREA_TYPES[m.typeOf(b.cell[0], b.cell[1])].id).toBe(b.area);
      expect(m.areaAt(b.x!, b.z!).cell).toEqual(b.cell);
    }
    // (any point is its island's when inside its outline, else home's: no other area anywhere)
    for (let i = 0; i < 4000; i++) {
      const x = L.home.x + (Math.sin(i * 12.9898) * 0.5) * L.reach * 2.2, z = L.home.z + (Math.sin(i * 78.233) * 0.5) * L.reach * 2.2;
      const I = L.islands.find(J => insideIsland(J, x, z)), c = m.areaAt(x, z).cell;
      expect(c).toEqual(I ? I.cell : m.centreCell);
    }
  });

  it("keeps the plaza and the streets bare (no tree, no scenery) and every creature on its own island, its own kind", () => {
    const g = game(["*"]), m = g.map, L = m.zoo!.layout!;
    for (let i = 0; i < 600; i++) {
      const x = L.home.x + Math.sin(i * 3.1) * L.reach, z = L.home.z + Math.cos(i * 1.7) * L.reach;
      if (L.islands.some(I => insideIsland(I, x, z))) continue;
      expect(m.hardClear(x, z)).toBe(true);
      expect(m.treeWeight(x, z)).toBe(0);
    }
    const byCell = new Map(m.zoo!.blocks.map(b => [`${b.cell[0]},${b.cell[1]}`, b]));
    for (const c of g.creatures) {
      const b = byCell.get(`${c.cell[0]},${c.cell[1]}`)!;
      expect(b, c.species).toBeTruthy();
      expect(AREA_TYPES.find(a => a.id === b.area)!.creature).toBe(c.species);
      expect(m.areaAt(c.x, c.z).cell).toEqual(c.cell);
    }
  });

  it("lays each legend's clearing at its island's middle, sized as play sizes it but to the zoo's cap, its runestone by the south shore", () => {
    const g = game(["*"]), m = g.map;
    for (const b of m.zoo!.blocks) {
      const c = m.legendClearing(b.cell[0], b.cell[1])!;
      expect(c, b.area ?? b.kind).toBeTruthy();
      expect(Math.hypot(c.x - b.x!, c.z - b.z!)).toBeLessThan(0.01);
      expect(c.r).toBeLessThanOrEqual(ZOO_CONFIG.legendCap!);
      const s = m.soundsystemSpot(b.cell[0], b.cell[1]);
      expect(s.z).toBeGreaterThan(b.z! + c.r); // (south of the circle)
      expect(m.areaAt(s.x, s.z).cell).toEqual(b.cell); // (on its own island)
    }
    // (a big sleeper fits in the zoo though not in play: the cap's past play's 25 m)
    const big = m.zoo!.blocks.find(b => AREA_TYPES.find(a => a.id === b.area)!.creature === "elephant");
    if (big) expect(m.legendClearing(big.cell[0], big.cell[1])!.r).toBeGreaterThan(25);
  });

  it("with a fresh save, only the kinds she knows are areas; every other island is its lake, with no creature on it", () => {
    const g = game([]), m = g.map, Z = m.zoo!;
    const known = new Set(homeKinds());
    for (const b of Z.blocks) expect(b.found, b.kind).toBe(known.has(AREA_TYPES.find(a => a.id === b.area)!.creature));
    expect(m.bounds.lakes).toBeTruthy();
    for (const b of Z.blocks.filter(k => !k.found)) {
      expect(m.playable(b.cell[0], b.cell[1])).toBe(false);
      expect(m.isLake(b.cell[0], b.cell[1])).toBe(true);
      expect(lakeDepth(m.bounds, b.x!, b.z!), b.kind).toBeGreaterThan(0);
      expect(g.creatures.some(c => c.cell[0] === b.cell[0] && c.cell[1] === b.cell[1])).toBe(false);
    }
  });
});
