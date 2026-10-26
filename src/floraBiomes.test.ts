// The flora check (Ed, 2026-10-25: "Norway firs don't sound very temperate to me!"; and "Lower phase non-home biome areas can be
// semi-temperate looking; higher phase biomes are more extreme"): a ring 5 area (phase 4) grows only its biome's trees, a ring 4
// area's main tree is its biome's, and ring 3 may mix in temperate ones. The trees each biome may grow, from the species we draw.
import { describe, expect, it } from "vitest";
import { AREAS } from "../art/areas.js";
import { AREA_FLORA } from "../art/flora/areas.js";
import { KINDS_TABLE } from "./rules/kinds";

const BIOME_TREES: Record<string, string[]> = {
  hot: ["acacia", "baobab", "datePalm", "marula", "mopane"],
  badlands: ["juniper", "mesquite", "desertIronwood", "paloVerde", "saguaro", "joshua", "pricklyPear", "ocotillo", "pine"], // the pine a pinyon
  "mangrove swamp": ["mangrove", "baldCypress", "coconut", "nipa", "strangler", "palm"], // palm: the tree fern
  jungle: ["kapok", "strangler", "bamboo", "vinewood", "palm", "ironwood"], // ironwood: the rainforest one
  "mountains and glaciers": ["fir", "juniper", "larch", "cherry", "crystal"], // cherry: the Himalayan terraces'
  cold: ["fir", "larch", "birch", "juniper", "pine"], // boreal birch and pine
  "cold rainforest": ["cedar", "fir", "alder", "palm", "rowan", "yew", "birch"],
  volcanic: ["cycad", "palm", "datePalm", "acacia"],
};

// The 17 areas moved out to the biomes on 2026-10-23, being re-themed by their own builder: checked once that lands.
const RETHEMING = new Set(["garden", "bog", "rocky-slope", "deadwood", "tangly-forest", "ravine", "log-pile", "moor", "holly-thicket", "eyrie",
  "meadow", "norway", "cave-mouth", "heronry", "stream", "berry-thicket", "stone-shrine"]);

const graded = AREAS.map(A => ({ A, k: KINDS_TABLE[(A as { creature?: string }).creature ?? ""], F: (AREA_FLORA as unknown as Record<string, { species: [string, number][] }>)[A.id] }))
  .filter(({ A, k, F }) => F && !RETHEMING.has(A.id) && k && k.biome && k.biome !== "temperate" && k.phase >= 3);

describe("flora fits the biome by ring", () => {
  it("finds the graded areas", () => expect(graded.length).toBeGreaterThan(20));
  for (const { A, k, F } of graded) {
    const ok = BIOME_TREES[k.biome!];
    it(`${A.id} (ring ${k.phase + 1}, ${k.biome})`, () => {
      expect(ok, k.biome).toBeTruthy();
      const trees = k.phase >= 4 ? F.species.map(([id]) => id) : [F.species[0][0]];
      for (const id of trees) expect(ok, `${A.id} grows ${id}`).toContain(id);
    });
  }
});
