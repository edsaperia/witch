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
    bad.groundSpeed = "fast"; bad.party.startDelay = -5; bad.map.shape = "blurry"; bad.newKnob = 1; delete bad.treetopSpeed;
    const errs = validate(bad, schema, "tuning").join("\n");
    expect(errs).toMatch(/tuning\.groundSpeed: string, should be number/);
    expect(errs).toMatch(/tuning\.party\.startDelay: -5, below its minimum 0/);
    expect(errs).toMatch(/tuning\.map\.shape: "blurry", should be one of/);
    expect(errs).toMatch(/tuning\.newKnob: not in the schema/);
    expect(errs).toMatch(/tuning\.treetopSpeed: missing/);
  });

  it("names only knobs that are there in its notes: a dotted path (beat.knockBeats) read from the note's section up", () => {
    // (a path whose first name is no knob near the note is prose or a file: chart.html, art/country.js; a localStorage key is
    // said as one: "localStorage witch.broom")
    const at = (path: string[]) => path.reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), raw);
    const wrong: string[] = [];
    const walk = (o: Record<string, unknown>, path: string[]) => {
      for (const [k, v] of Object.entries(o)) {
        if (v && typeof v === "object" && !Array.isArray(v)) { walk(v as Record<string, unknown>, [...path, k]); continue; }
        if (!k.startsWith("_") || typeof v !== "string") continue;
        const section = k === "_" ? path : [...path, k.slice(1)];
        for (const m of v.matchAll(/(localStorage )?\b([a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)+)\b(?!\.?[a-z]*\/)/g)) {
          const p = m[2].split(".");
          if (m[1] || /^(ts|js|json|md|mjs|cjs|png|html)$/.test(p[p.length - 1])) continue;
          const ups = section.map((_, i) => section.slice(0, section.length - i)).concat([[]]);
          if (!ups.some(up => { const o = at(up); return !!o && typeof o === "object" && p[0] in o; })) continue; // (not a knob's name here)
          if (!ups.some(up => at([...up, ...p]) !== undefined)) wrong.push(`${section.join(".") || "(top)"}: ${m[2]}`);
        }
      }
    };
    walk(raw as Record<string, unknown>, []);
    expect(wrong, "a note names a knob that isn't in config/tuning.json: rename or drop it in the note (then --docs)").toEqual([]);
  });

  it("keeps config/KNOBS.md up to date (node tools/config/schema.mjs --docs)", () => {
    expect(readFileSync("config/KNOBS.md", "utf8"), FIX).toBe(knobsMarkdown(raw as Record<string, unknown>, schema, "Tuning knobs", "config/tuning.json"));
  });
});
