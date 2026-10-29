import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import RAW from "../../config/default-look.json";
import { PART_IDS, SLOTS, bareBroom, partById, type Fitted } from "../rules/broomParts";
import { readFileSync } from "node:fs";
import { NOTE, defaultBroom, defaultGenome, defaultsText, newWitchLink } from "./defaultLook";
import { firstBroom, loadBroom } from "./broomSave";

const upgrade = Art.upgradeGenome as (g: unknown) => Record<string, unknown>;

// Ed, 2026-10-29: "Please give me an easy way to select character creation defaults ... This is a dev tool - just so I can set the defaults for the game".
describe("the game's default look (config/default-look.json)", () => {
  it("is a witch the generator's rules allow, or the classic one; its broom known parts in their own slots", () => {
    if (RAW.genome !== null) { expect(defaultGenome(), "refused by witchGenomeProblems").not.toBeNull(); expect((Art.witchGenomeProblems as (g: unknown) => string[])(defaultGenome())).toEqual([]); }
    const b = RAW.broom as Record<string, string | null> | null;
    if (b) for (const s of SLOTS) if (b[s]) expect(partById(b[s]!)?.slot, `${s}: ${b[s]}`).toBe(s);
  });

  it("Copy look as defaults gives a file that brings back exactly how she was dressed", () => {
    const g = (Art.witchGenome as (s: number) => Record<string, unknown>)(7);
    const parts: Fitted = { ...bareBroom() };
    for (const s of SLOTS) parts[s] = PART_IDS.find(id => partById(id)?.slot === s) ?? null;
    const file = JSON.parse(defaultsText(g, parts));
    expect(file._).toBe(JSON.parse(readFileSync("config/default-look.json", "utf8"))._); // (the file's own note, kept: NOTE)
    expect(file._).toBe(NOTE);
    expect(defaultGenome(file)).toEqual(upgrade(g));
    expect(defaultBroom(file)).toEqual(parts);
    // the classic witch and a bare broom write nulls, as the file ships
    const plain = JSON.parse(defaultsText(null, bareBroom()));
    expect([plain.genome, plain.broom]).toEqual([null, null]);
    expect(defaultGenome(plain)).toBeNull();
    expect(defaultBroom(plain)).toEqual(bareBroom());
  });

  it("refuses a genome or part it can't use (the classic witch, a bare slot)", () => {
    expect(defaultGenome({ genome: { hat: { shape: "no such hat" } } })).toBeNull();
    expect(defaultBroom({ broom: { tip: "no such part", chassis: 3 } })).toEqual(bareBroom());
    const wrong = PART_IDS.find(id => partById(id)?.slot !== "tip")!;
    expect(defaultBroom({ broom: { tip: wrong } }).tip).toBeNull();
  });

  it("a first game's broom is the default's, fitted and found (no save yet)", () => {
    const empty = { getItem: () => null, setItem: () => {} };
    expect(loadBroom(empty)).toEqual(firstBroom());
    expect(firstBroom().fitted).toEqual(defaultBroom());
    expect(firstBroom().found.sort()).toEqual(SLOTS.map(s => defaultBroom()[s]).filter(Boolean).sort());
  });

  it("Try as a new witch opens this link with ?newWitch=1, nothing of hers over it", () => {
    const u = new URL(newWitchLink("https://x.test/witch/?seed=5&hat=healing&parts=missile&bag=far&island=fox"));
    expect(u.searchParams.get("newWitch")).toBe("1");
    expect(u.searchParams.get("seed")).toBe("5");
    expect(u.searchParams.get("island")).toBe("fox");
    for (const k of ["hat", "parts", "bag"]) expect(u.searchParams.has(k), k).toBe(false);
  });
});
