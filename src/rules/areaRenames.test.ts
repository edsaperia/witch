// Area ids renamed by the roster's re-themes (art/areaRenames.js; Ed, 2026-10-25): the old ids are gone, each maps to an area that
// is, the areas keep their places (so every map is as it was), and a save from before the rename still loads whole.
import { describe, expect, it } from "vitest";
import { AREA_RENAMES, areaIdOf } from "../../art/areaRenames.js";
import { AREA_TYPES } from "./map";
import { KIND_SLOTS } from "./kinds";
import { loadSave, SAVE_KEY } from "../app/chartSave";

const ids = new Set(AREA_TYPES.map(a => a.id));

describe("renamed areas", () => {
  it("leaves no old id among the areas, and maps each to one that is", () => {
    for (const [old, now] of Object.entries(AREA_RENAMES)) {
      expect(ids.has(old), old).toBe(false);
      expect(ids.has(areaIdOf(old)), `${old} → ${now}`).toBe(true);
    }
    for (const id of ids) expect(areaIdOf(id)).toBe(id);
  });

  it("keeps each renamed area's creature in its kind's slot (its island and its place on the maps as they were)", () => {
    const creatureOf = (id: string) => AREA_TYPES.find(a => a.id === areaIdOf(id))?.creature ?? "";
    expect(creatureOf("holly-thicket")).toBe("spider");
    expect(creatureOf("norway")).toBe("snake");
    expect(creatureOf("cave-mouth")).toBe("bat");
    expect(creatureOf("stream")).toBe("otter");
    expect(creatureOf("heronry")).toBe("heron");
    for (const old of Object.keys(AREA_RENAMES)) expect(KIND_SLOTS[creatureOf(old)], old).toBeGreaterThanOrEqual(0);
  });

  it("loads a save from before the renames whole (saves keep kinds, never area ids)", () => {
    const before = { world: 7, found: ["spider", "griffin", "fox"], won: ["home", "spider"], played: ["home", "spider", "griffin"], voyages: [{ from: "home", to: "spider" }, { from: "spider", to: "griffin" }] };
    const store = { getItem: (k: string) => (k === SAVE_KEY ? JSON.stringify(before) : null), setItem: () => {}, removeItem: () => {} };
    expect(loadSave(store)).toEqual(before);
  });
});
