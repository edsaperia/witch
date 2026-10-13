import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CREATURES, CREATURE_IDS } from "./rules/creatureConfig";
import { validate, type Schema } from "./rules/schema";
import { AREA_TYPES } from "./rules/map";

// The creatures' data (art/creatures/<id>/: genome.js, sigil.js, legend.js, nap.js, creature.js, assembled by
// art/creatures/index.js; tools/creatures.mjs): the index current, no entry left in the old registries or the config files (an
// old-style merge), every folder's exports its own id's, no genome problems, and each creature.js against its schema
// (config/schema/creature.schema.json: its sections and their shapes; the sections' insides are checked as the config files'
// assembled tables, configs.test.ts).
describe("the creatures' folders (art/creatures/)", () => {
  it("assemble cleanly: the index current, every record in its folder, no genome problems", () => {
    const out = execFileSync("node", ["tools/creatures.mjs", "check"], { encoding: "utf8" });
    expect(out).toMatch(/^ok: \d+ species/);
  });
  it("each creature.js holds only known sections, of the right shapes (config/schema/creature.schema.json)", () => {
    const schema = JSON.parse(readFileSync("config/schema/creature.schema.json", "utf8")) as Schema;
    for (const id of CREATURE_IDS) expect(validate(CREATURES[id], schema, `art/creatures/${id}/creature.js`), id).toEqual([]);
  });
  it("every creature in the game has its folder, with its movement, voice and buff", () => {
    for (const t of AREA_TYPES) {
      const c = CREATURES[t.creature];
      expect(c, `${t.creature} (${t.id}'s creature) has no art/creatures/${t.creature}/creature.js`).toBeTruthy();
      for (const k of ["movement", "voice", "buff"] as const) expect(c[k], `${t.creature}'s ${k}`).toBeTruthy();
    }
  });
});

// The other split registries (tools/data.mjs): the decisions' fragments (config/decisions/<pr>-<group>.json) sound and none
// left in config/decisions.json's array; the flora's species files (art/flora/species/<id>.js) each exporting PLANT_<ID>, their
// index current, no record left in art/flora/genomes.js, and the baseline folder (art/flora/baseline/<id>.json) only known species';
// the areas' folders (art/areas/<id>/: recipe.js, kind.json, flora.js) whole, with the kinds table's slots 0 to n-1, one kind each.
describe("the split registries (tools/data.mjs)", () => {
  it("decisions: every fragment named by its pr and group, ids unique, none left in the file", () => {
    const out = execFileSync("node", ["tools/data.mjs", "decisions", "check"], { encoding: "utf8" });
    expect(out).toMatch(/^ok: decisions/);
  });
  it("flora: one file a species, the index current, none left in genomes.js, the baseline folder sound", () => {
    const out = execFileSync("node", ["tools/data.mjs", "flora", "check"], { encoding: "utf8" });
    expect(out).toMatch(/^ok: flora/);
  });
  it("areas: a folder an area with its kind line, the recipes and the original areas' flora in them, the kinds' slots whole", () => {
    const out = execFileSync("node", ["tools/data.mjs", "areas", "check"], { encoding: "utf8" });
    expect(out).toMatch(/^ok: areas/);
  });
});
