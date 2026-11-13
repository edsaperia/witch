// A kind renamed since a link or a save was made (rules/kinds.ts RENAMED; Ed, 2026-11-13: "can we actually rename it in the files
// and put the moth on the bench?"): the moth's name still means the swallowtail, the kind `butterfly`.
import { describe, expect, it } from "vitest";
import { renamedLink } from "./renamedLink";
import { tuningFromLink } from "./linkParams";
import { nightFromHref } from "./sail";
import { nightLinkConflicts, savedNightResumeLink } from "./nightSave";
import { loadSave, SAVE_KEY } from "./chartSave";
import { playableIsland } from "../rules/rosters";

const memory = (items: Record<string, string> = {}) => ({ getItem: (k: string) => items[k] ?? null, setItem: (k: string, v: string) => { items[k] = v; }, removeItem: (k: string) => { delete items[k]; } });

describe("a link or save naming the moth", () => {
  it("?island=moth and ?found=...,moth play and find the butterfly's island; other names are left alone", () => {
    expect(renamedLink(new URLSearchParams("island=moth&seed=7&found=fox,moth,owl")).toString()).toBe("island=butterfly&seed=7&found=fox%2Cbutterfly%2Cowl");
    expect(renamedLink(new URLSearchParams("found=moth,butterfly")).get("found")).toBe("butterfly"); // (none twice)
    for (const q of ["island=fox&found=owl", "island=30", "island=home", "seed=5", "found="]) expect(renamedLink(new URLSearchParams(q)).toString(), q).toBe(new URLSearchParams(q).toString());
    expect(playableIsland("moth")).toBe(false); // (the moth itself is on the bench, with no island: the alias is what plays)
    const t = tuningFromLink(new URLSearchParams("island=moth&found=moth,fox")).tuning.map!;
    expect(t.island).toBe("butterfly");
    expect(t.found).toEqual(["butterfly", "fox"]);
    expect(tuningFromLink(new URLSearchParams("island=butterfly")).tuning.map!.island).toBe("butterfly");
    expect(nightFromHref("bed", "https://unit.invalid/?island=moth&seed=9").island).toBe("butterfly");
  });
  it("a night saved on the moth's island is the same night as the butterfly's link, and resumes on it", () => {
    const n = { params: "seed=123&island=moth&world=42" };
    expect(nightLinkConflicts(n, new URLSearchParams("island=butterfly"))).toEqual([]);
    expect(nightLinkConflicts(n, new URLSearchParams("island=moth"))).toEqual([]);
    expect(nightLinkConflicts(n, new URLSearchParams("island=fox"))).toEqual(["island"]);
    expect(savedNightResumeLink(n, "/witch/")).toBe("/witch/?seed=123&island=butterfly&world=42&resume=1");
  });
  it("the sea chart's save: the moth's island found, won, played and sailed from is the butterfly's, nothing lost and none twice", () => {
    const old = { world: 42, found: ["fox", "moth", "owl"], won: ["home", "moth"], played: ["home", "moth", "fox"], voyages: [{ from: "home", to: "fox" }, { from: "fox", to: "moth" }, { from: "moth", to: "owl" }] };
    expect(loadSave(memory({ [SAVE_KEY]: JSON.stringify(old) }))).toEqual({ world: 42, found: ["fox", "butterfly", "owl"], won: ["home", "butterfly"], played: ["home", "butterfly", "fox"],
      voyages: [{ from: "home", to: "fox" }, { from: "fox", to: "butterfly" }, { from: "butterfly", to: "owl" }] });
    const both = { world: 0, found: ["moth", "butterfly"], won: ["butterfly", "moth"], played: [], voyages: [] }; // (a save written by both builds)
    expect(loadSave(memory({ [SAVE_KEY]: JSON.stringify(both) }))).toMatchObject({ found: ["butterfly"], won: ["butterfly"] });
    // (the marten's is still dropped: it was swapped for another animal, not renamed)
    expect(loadSave(memory({ [SAVE_KEY]: JSON.stringify({ world: 0, found: ["marten", "fox"], won: [], played: [], voyages: [] }) })).found).toEqual(["fox"]);
  });
});
