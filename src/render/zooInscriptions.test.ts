// The zoo's inscriptions' words (render/zooInscriptions.ts; Ed, 2026-10-26): a found island's animal, its area and biome, its line;
// one not found yet, the animal and its biome only.
import { describe, expect, it } from "vitest";
import { INSCRIPTION, inscriptionLines, inscriptionSpot, wrap } from "./zooInscriptions";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { insideIsland } from "../rules/zooMap";
import { ZOO_CONFIG } from "../rules/zoo";
import { AREA_TYPES } from "../rules/map";

describe("the zoo's inscriptions", () => {
  const area = AREA_TYPES.find(a => a.layout.feel)!;
  it("a found island: its animal (big), its area and biome, and its line wrapped", () => {
    const L = inscriptionLines({ area: area.id, kind: area.creature, row: "Temperate woodland", found: true });
    expect(L[0][1]).toBe(2);
    expect(L[1][0]).toBe(`${area.name} · Temperate woodland`);
    expect(L.slice(2).map(l => l[0]).join(" ")).toBe(area.layout.feel!.split(/\s+/).join(" "));
  });
  it("one not found yet: just the animal and its biome underneath", () => {
    const L = inscriptionLines({ area: area.id, kind: area.creature, row: "Tundra", found: false });
    expect(L.map(l => l[0])).toEqual([L[0][0], "Tundra"]);
  });
  it("wraps words to the width", () => {
    expect(wrap("a bb ccc dddd", 6)).toEqual(["a bb", "ccc", "dddd"]);
  });
  it("every island in the zoo has room for a whole inscription in the street, off every island; south of it nearly always", () => {
    const g = newGame(7, { ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0, found: ["*"] } }), L = g.map.zoo!.layout!;
    const edge = L.reach + (ZOO_CONFIG.margin ?? 120) - 8;
    // (about the biggest, as wrapped wider and shallower in turn: a name and five lines, four, three; then just the name and place)
    const sizes: [number, number][] = [[420, 170], [560, 145], [760, 120], [360, 60]];
    let south = 0;
    for (const I of L.islands) {
      let at: ReturnType<typeof inscriptionSpot> = null, size = sizes[0];
      for (const s of sizes) { at = inscriptionSpot(I, L.islands, s[0], s[1], L.home, edge); size = s; if (at) break; }
      expect(at, I.kind).not.toBeNull();
      expect(at!.t).toBeGreaterThanOrEqual(INSCRIPTION.least - 1e-6);
      if (at!.z > I.z) south++;
      const W = size[0] * at!.t, H = size[1] * at!.t;
      for (const [fx, fz] of [[0, 0], [1, 0], [0, 1], [1, 1], [0.5, 0.5]]) for (const J of L.islands) expect(insideIsland(J, at!.x - W / 2 + W * fx, at!.z + H * fz)).toBe(false);
    }
    expect(south / L.islands.length).toBeGreaterThan(0.85);
  });
});
