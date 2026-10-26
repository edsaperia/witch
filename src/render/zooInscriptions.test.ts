// The zoo's inscriptions' words (render/zooInscriptions.ts; Ed, 2026-10-26): a found island's animal, its area and biome, its line;
// one not found yet, the animal and its biome only.
import { describe, expect, it } from "vitest";
import { inscriptionLines, wrap } from "./zooInscriptions";
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
});
