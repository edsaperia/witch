import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import raw from "../../config/tuning.json";
import schemaJson from "../../config/schema/tuning.schema.json";
import indexJson from "../../config/knobs/index.json";
import type { Schema } from "./schema";
import { describeSchema, knobDocsProblems, knobsReference, type KnobIndex, type KnobSection } from "./knobDocs";

// The tuning knobs' words (config/knobs/*.json; knobDocs.ts): every knob has an entry, every entry a knob, and what's made from
// them is up to date.
const tuning = raw as Record<string, unknown>;
const index = indexJson as KnobIndex;
const sections = index.order.map(n => JSON.parse(readFileSync(`config/knobs/${n}.json`, "utf8")) as KnobSection);
const FIX = "after changing config/knobs/*.json or a knob, run `node tools/config/schema.mjs --add --docs` and commit config/KNOBS.md and config/schema/tuning.schema.json";

describe("the knobs' words (config/knobs)", () => {
  it("has an entry for every top-level knob, and every entry (and the knobs it names as also or see) is a knob", () => {
    expect(knobDocsProblems(tuning, sections)).toEqual([]);
  });

  it("catches a knob with no entry, an entry for no knob and a note back in the tuning file", () => {
    const bad = { ...tuning, newKnob: 1, _newKnob: "what it does" };
    const secs = [{ ...sections[0], knobs: { ...sections[0].knobs, "map.nothing": { what: "x" } } }, ...sections.slice(1)];
    const errs = knobDocsProblems(bad, secs).join("\n");
    expect(errs).toMatch(/newKnob has no entry/);
    expect(errs).toMatch(/map\.nothing isn't a knob/);
    expect(errs).toMatch(/_newKnob is a note/);
  });

  it("gives every decision a date in the form 2026-10-28 or none, and something: who, when, a quote or words", () => {
    const bad: string[] = [];
    for (const s of sections) for (const [p, e] of Object.entries(s.knobs)) for (const d of e.decisions ?? []) {
      if (d.date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) bad.push(`${p}: ${d.date}`);
      if (!d.quote && !d.rest && !d.by && !d.date) bad.push(`${p}: an empty decision`);
    }
    expect(bad).toEqual([]);
  });

  it("says what each knob does in one plain sentence (the rest in notes: the coordinator's hand pass, 2026-10-28)", () => {
    const long: string[] = [];
    for (const s of sections) for (const [p, e] of Object.entries(s.knobs)) {
      const w = e.what ?? "";
      if ((w.match(/\.(\s+["A-Z]|$)/g) ?? []).length > 1 || w.length > 300) long.push(`${s.section}: ${p}`);
    }
    expect(long, "make `what` one sentence (300 characters at most) and move the rest into `notes`").toEqual([]);
  });

  it("names only knobs that are there: a dotted path (beat.knockBeats) read from the entry's knob up", () => {
    // (a path whose first name is no knob near the entry is prose or a file: chart.html, art/country.js; a localStorage key is
    // said as one: "localStorage witch.broom")
    const at = (path: string[]) => path.reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), tuning);
    const wrong: string[] = [];
    for (const s of sections) for (const [path, e] of Object.entries(s.knobs)) {
      const text = [e.what ?? "", e.notes ?? "", ...(e.decisions ?? []).map(d => d.rest ?? "")].join(" ");
      const here = path.split(".");
      for (const m of text.matchAll(/(localStorage )?\b([a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)+)\b(?!\.?[a-z]*\/)/g)) {
        const p = m[2].split(".");
        if (m[1] || /^(ts|js|json|md|mjs|cjs|png|html)$/.test(p[p.length - 1])) continue;
        const ups = here.map((_, i) => here.slice(0, here.length - i)).concat([[]]);
        if (!ups.some(up => { const o = at(up); return !!o && typeof o === "object" && p[0] in o; })) continue; // (not a knob's name here)
        if (!ups.some(up => at([...up, ...p]) !== undefined)) wrong.push(`${path}: ${m[2]}`);
      }
    }
    expect(wrong, "an entry names a knob that isn't in config/tuning.json: rename or drop it in config/knobs").toEqual([]);
  });

  it("keeps config/KNOBS.md and the schema's descriptions up to date (node tools/config/schema.mjs --docs)", () => {
    const schema = schemaJson as Schema;
    expect(JSON.stringify(schema), FIX).toBe(JSON.stringify(describeSchema(schema, sections)));
    expect(readFileSync("config/KNOBS.md", "utf8"), FIX).toBe(knobsReference(tuning, schema, index, sections));
  });
});
