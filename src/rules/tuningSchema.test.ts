import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import raw from "../../config/tuning.json";
import schemaJson from "../../config/schema/tuning.schema.json";
import { knobsMarkdown, validate, type Schema } from "./schema";

// The tuning file's schema and its knob reference (housekeeping, issue #122).
const schema = schemaJson as Schema;
// Said on a failure: the one command that brings the schema and the reference up to the file.
const FIX = "the tuning file and its schema differ: after adding, renaming or removing a knob (or editing a note), run `node tools/config/schema.mjs --add --docs` and commit config/schema/tuning.schema.json and config/KNOBS.md (a wrong type or range is the file's mistake, or set it in src/rules/tuningSchema.ts)";

describe("the tuning schema (config/schema/tuning.schema.json)", () => {
  it("holds config/tuning.json: every knob known, of its type, in its range", () => {
    expect(validate(raw, schema, "tuning"), FIX).toEqual([]);
  });

  it("catches a new knob, a wrong type, an out-of-range number and a bad choice", () => {
    const bad = JSON.parse(JSON.stringify(raw));
    bad.groundSpeed = "fast"; bad.party.interval = -5; bad.fx = "blurry"; bad.newKnob = 1; delete bad.treetopSpeed;
    const errs = validate(bad, schema, "tuning").join("\n");
    expect(errs).toMatch(/tuning\.groundSpeed: string, should be number/);
    expect(errs).toMatch(/tuning\.party\.interval: -5, below its minimum 0/);
    expect(errs).toMatch(/tuning\.fx: "blurry", should be one of/);
    expect(errs).toMatch(/tuning\.newKnob: not in the schema/);
    expect(errs).toMatch(/tuning\.treetopSpeed: missing/);
  });

  it("keeps config/KNOBS.md up to date (node tools/config/schema.mjs --docs)", () => {
    expect(readFileSync("config/KNOBS.md", "utf8"), FIX).toBe(knobsMarkdown(raw as Record<string, unknown>, schema, "Tuning knobs", "config/tuning.json"));
  });
});
