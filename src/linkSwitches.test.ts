// The link switches as data (config/link-switches.json; Ed, 2026-10-28: "Reformat prose into data where you can"): every switch the
// code reads is registered, every registered one is read, each record says where (the code's own reads, tools/config/linkSwitches.mjs),
// and docs/LINK-SWITCHES.md is the one written from it. On a failure: add or retire the record, then node tools/config/linkSwitches.mjs.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DOC, GROUPS, ROOT, linkSwitchProblems, loadRegistry, renderLinkSwitches, scanLinkSwitches } from "../tools/config/linkSwitches.mjs";

const reg = loadRegistry(), scan = scanLinkSwitches();

describe("the link switches (config/link-switches.json)", () => {
  it("finds the reads it should (the scan itself)", () => {
    for (const name of ["seed", "island", "zoo", "shot", "fight", "chart", "arrive", "look"]) expect(scan.has(name), name).toBe(true);
    expect(scan.get("chart")).toContain("index.html"); // (the root's pages too)
    expect(scan.has("pull")).toBe(false); // (a Map's get isn't a switch: rules/broomParts.ts)
  });

  it("registers every switch the code reads, and reads every one it registers, each where it says", () => {
    expect(linkSwitchProblems(reg, scan)).toEqual([]);
  });

  it("gives each a plain sentence, its values, a group and a date, once", () => {
    const names = reg.switches.map((s: { name: string }) => s.name);
    expect(new Set(names).size).toBe(names.length);
    for (const s of reg.switches) {
      expect(Object.keys(GROUPS), s.name).toContain(s.group);
      expect(s.does, s.name).toMatch(/^[A-Z].*[.!?]$/);
      expect(Array.isArray(s.values), s.name).toBe(true);
      expect(s.since, s.name).toMatch(/^\d{4}-\d\d-\d\d$|^#\d+$/);
    }
  });

  it("writes docs/LINK-SWITCHES.md from it (node tools/config/linkSwitches.mjs)", () => {
    expect(readFileSync(join(ROOT, DOC), "utf8")).toBe(renderLinkSwitches(reg));
  });
});
