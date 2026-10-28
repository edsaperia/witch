// The tuning knobs' words as data (Ed, 2026-10-28: "Reformat prose into data where you can"): config/tuning.json holds the values
// only, and config/knobs/<section>.json says, per knob path, what it does, Ed's decisions (who, when, his words) and the files it
// lives in; config/knobs/index.json the file's own notes and the sections' order. Units and ranges are the schema's
// (config/schema/tuning.schema.json, src/rules/tuningSchema.ts). From these: config/KNOBS.md, and the schema's descriptions (an
// editor shows them on hover). tools/config/knob-docs.mjs made the files from the old notes; tools/config/schema.mjs --docs writes
// the reference and the descriptions; src/rules/knobDocs.test.ts checks every knob has an entry and every entry a knob. Not read
// by the game. No Three.js here.
import type { Schema } from "./schema";

export interface KnobDecision {
  /** Who: Ed, Ed's playtest, Ed's pick B, the coordinator, a builder. */
  by: string | null;
  date: string | null;
  /** His words, as said (one or several). */
  quote?: string | string[];
  /** What else the decision said: what it was before, the PR, the reason. */
  rest?: string;
}
export interface KnobEntry {
  /** What the knob does; [n] marks where decisions[n - 1] was said. */
  what?: string;
  /** Other knobs the same words are about ("sigilGlyph and sigilHalo"). */
  also?: string[];
  decisions?: KnobDecision[];
  /** Files it names (the code that reads it, the plan it came from). */
  links?: string[];
  /** A knob no words were written about of its own: the one whose words cover it. */
  see?: string;
  notes?: string;
}
export interface KnobSection { section: string; about: string; knobs: Record<string, KnobEntry> }
export interface KnobIndex { readme: string; sections: string; order: string[] }

/** Every path in the tuning file (an array's items aren't paths). */
export function knobPaths(tuning: Record<string, unknown>): string[] {
  const out: string[] = [];
  const walk = (o: Record<string, unknown>, p: string) => {
    for (const [k, v] of Object.entries(o)) {
      const q = p ? `${p}.${k}` : k;
      out.push(q);
      if (v && typeof v === "object" && !Array.isArray(v)) walk(v as Record<string, unknown>, q);
    }
  };
  walk(tuning, "");
  return out;
}

/** What's wrong between the tuning file and its words: a top-level knob with no entry, an entry (or its also, or its see) for a
 *  knob that isn't there, a note left in the tuning file, a knob in two sections. */
export function knobDocsProblems(tuning: Record<string, unknown>, sections: KnobSection[]): string[] {
  const out: string[] = [];
  const paths = new Set(knobPaths(tuning));
  for (const p of paths) if (p.split(".").pop()!.startsWith("_")) out.push(`config/tuning.json: ${p} is a note: words go in config/knobs/<section>.json now`);
  const seen = new Map<string, string>();
  for (const s of sections) for (const [p, e] of Object.entries(s.knobs)) {
    if (seen.has(p)) out.push(`${p}: in both ${seen.get(p)} and ${s.section}`);
    seen.set(p, s.section);
    if (!paths.has(p)) out.push(`config/knobs/${s.section}.json: ${p} isn't a knob in config/tuning.json`);
    for (const a of [...(e.also ?? []), ...(e.see ? [e.see] : [])]) if (!paths.has(a)) out.push(`config/knobs/${s.section}.json: ${p} names ${a}, which isn't a knob`);
  }
  for (const k of Object.keys(tuning)) if (!seen.has(k)) out.push(`config/tuning.json: ${k} has no entry in config/knobs/<section>.json (what it does, and Ed's decision if there was one)`);
  return out;
}

const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
const range = (s: Schema) => (s.enum ? s.enum.map(e => JSON.stringify(e)).join(" / ") : s.minimum !== undefined || s.maximum !== undefined ? `${s.minimum ?? "…"} to ${s.maximum ?? "…"}` : "");
const quoteText = (q: string | string[]) => (Array.isArray(q) ? q : [q]).map(x => `"${x}"`).join(" … ");
/** A decision as a line: who, when: "his words" (the rest). */
export const decisionLine = (d: KnobDecision): string => {
  const head = [d.by, d.date].filter(Boolean).join(", ");
  const said = d.quote ? quoteText(d.quote) : "";
  return [head && (said || d.rest) ? `${head}:` : head, said, d.rest ? (said ? `(${d.rest})` : d.rest) : ""].filter(Boolean).join(" ");
};

/** The knob reference (config/KNOBS.md): by section, every top-level knob in the file's order with what it and its parts do, its
 *  decisions, and a row for each knob under it: its path, type and range (and unit). Not its value: the file has them. */
export function knobsReference(tuning: Record<string, unknown>, schema: Schema, index: KnobIndex, sections: KnobSection[]): string {
  const lines = ["# Tuning knobs", "", "Generated from `config/tuning.json` (the values), `config/schema/tuning.schema.json` (types and ranges) and `config/knobs/<section>.json` (what each knob does, Ed's decisions) by `node tools/config/schema.mjs --docs`; don't edit by hand. A test fails if it's out of date.", "", esc(index.readme), ""];
  const bySec = new Map(sections.map(s => [s.section, s]));
  const secOf = new Map<string, string>();
  for (const s of sections) for (const p of Object.keys(s.knobs)) secOf.set(p, s.section);
  const rows = (v: unknown, s: Schema | undefined, path: string): string[] => {
    if (s?.type === "object" && s.properties && v && typeof v === "object" && !Array.isArray(v)) return Object.keys(s.properties).flatMap(k => rows((v as Record<string, unknown>)[k], s.properties![k], `${path}.${k}`));
    const type = s?.type === "array" ? `array of ${s.items?.type ?? "any"}` : s?.type === "object" ? "record" : (s?.type ?? typeof v);
    return [`| \`${path}\` | ${type} | ${esc([s ? range(s) : "", s?.unit ?? ""].filter(Boolean).join(", "))} |`];
  };
  const entryLines = (path: string, e: KnobEntry, top: boolean): string[] => {
    const out: string[] = [];
    const name = [path, ...(e.also ?? [])].map(p => `\`${p}\``).join(", ");
    const what = e.what ? esc(e.what) : e.see ? `See \`${e.see}\`.` : "";
    if (top) { if (what) out.push(what, ""); }
    else out.push(`- **${name}**${what ? `: ${what}` : ""}`);
    (e.decisions ?? []).forEach((d, i) => out.push(`${top ? "" : "  "}${i + 1}. ${esc(decisionLine(d))}`));
    if (e.notes) out.push(`${top ? "" : "  "}${esc(e.notes)}`);
    if (e.links?.length) out.push(`${top ? "" : "  "}Code: ${e.links.map(l => `\`${l}\``).join(", ")}`);
    if (top && (e.decisions?.length || e.notes || e.links?.length)) out.push("");
    return out;
  };
  for (const name of index.order) {
    const s = bySec.get(name);
    if (!s) continue;
    lines.push(`## ${name[0].toUpperCase()}${name.slice(1)}`, "", esc(s.about), "");
    for (const k of Object.keys(tuning)) {
      if (secOf.get(k) !== name) continue;
      lines.push(`### \`${k}\``, "");
      const e = s.knobs[k] ?? {};
      lines.push(...entryLines(k, e, true));
      const subs = Object.keys(s.knobs).filter(p => p.startsWith(`${k}.`));
      if (subs.length) { for (const p of subs) lines.push(...entryLines(p, s.knobs[p], false)); lines.push(""); }
      lines.push("| knob | type | range |", "|---|---|---|", ...rows(tuning[k], schema.properties?.[k], k), "");
    }
  }
  return lines.join("\n");
}

/** A hover's worth: the first sentence (outside brackets and quotes), its decision markers dropped. */
export function firstSentence(t: string): string {
  let depth = 0, q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '"') q = !q;
    else if (!q && c === "(") depth++;
    else if (!q && c === ")") depth = Math.max(0, depth - 1);
    else if (!q && !depth && c === "." && (t[i + 1] === " " || i === t.length - 1) && !/\b(e\.g|i\.e|etc|vs|approx)$/.test(t.slice(Math.max(0, i - 6), i))) { t = t.slice(0, i + 1); break; }
  }
  return t.replace(/\s*\[\d+\]/g, "").trim();
}

/** The schema with each knob's description the first sentence of its entry's what (an editor shows it on hover), none where
 *  there's no entry. */
export function describeSchema(schema: Schema, sections: KnobSection[]): Schema {
  const what = new Map<string, string>();
  for (const s of sections) for (const [p, e] of Object.entries(s.knobs)) { const w = e.what ? firstSentence(e.what) : e.see ? `See ${e.see}.` : ""; if (w) what.set(p, w); }
  const walk = (sc: Schema, path: string): Schema => {
    const out: Schema = { ...sc };
    delete out.description;
    const w = path && what.get(path);
    if (w) out.description = w;
    if (sc.properties) out.properties = Object.fromEntries(Object.entries(sc.properties).map(([k, v]) => [k, walk(v, path ? `${path}.${k}` : k)]));
    return out;
  };
  return walk(schema, "");
}
