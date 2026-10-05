// Config schemas (housekeeping, issue #122): a small subset of JSON Schema to check the config files
// against, so a mistyped or out-of-range knob fails a test rather than a playtest, and the knob
// reference (config/KNOBS.md) generated from the schema and the files' own `_` notes. Plain
// TypeScript, no library. Read by the config tests and tools/config/schema.mjs; nothing in the game.

export interface Schema {
  type?: "number" | "boolean" | "string" | "array" | "object";
  /** Numbers: inclusive bounds. */
  minimum?: number;
  maximum?: number;
  /** Allowed values (strings, usually). */
  enum?: readonly unknown[];
  /** Arrays: every item's schema, and a length range. */
  items?: Schema;
  minItems?: number;
  maxItems?: number;
  /** Objects: each key's schema, the ones that must be there, and what other keys may be (false: none; a schema: any key, its value checked). Keys starting "_" are notes: always allowed, always strings. */
  properties?: Record<string, Schema>;
  required?: readonly string[];
  additionalProperties?: boolean | Schema;
  /** For the docs. */
  unit?: string;
  description?: string;
}

const kind = (v: unknown) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

/** Every way `value` breaks `schema`, as "path: what" lines (none: it's valid). */
export function validate(value: unknown, schema: Schema, path = "(root)"): string[] {
  const out: string[] = [];
  const t = kind(value);
  if (schema.type && t !== schema.type) return [`${path}: ${t}, should be ${schema.type}`];
  if (schema.enum && !schema.enum.includes(value)) out.push(`${path}: ${JSON.stringify(value)}, should be one of ${schema.enum.map(e => JSON.stringify(e)).join(", ")}`);
  if (t === "number") {
    const n = value as number;
    if (!Number.isFinite(n)) out.push(`${path}: ${n}, should be a finite number`);
    if (schema.minimum !== undefined && n < schema.minimum) out.push(`${path}: ${n}, below its minimum ${schema.minimum}`);
    if (schema.maximum !== undefined && n > schema.maximum) out.push(`${path}: ${n}, above its maximum ${schema.maximum}`);
  }
  if (t === "array") {
    const a = value as unknown[];
    if (schema.minItems !== undefined && a.length < schema.minItems) out.push(`${path}: ${a.length} items, at least ${schema.minItems}`);
    if (schema.maxItems !== undefined && a.length > schema.maxItems) out.push(`${path}: ${a.length} items, at most ${schema.maxItems}`);
    if (schema.items) a.forEach((v, i) => out.push(...validate(v, schema.items!, `${path}[${i}]`)));
  }
  if (t === "object") {
    const o = value as Record<string, unknown>, P = schema.properties ?? {};
    for (const k of schema.required ?? []) if (!(k in o)) out.push(`${path}.${k}: missing`);
    for (const [k, v] of Object.entries(o)) {
      if (k.startsWith("_")) { if (typeof v !== "string") out.push(`${path}.${k}: a note, should be a string`); continue; }
      if (P[k]) out.push(...validate(v, P[k], `${path}.${k}`));
      else if (schema.additionalProperties === false) out.push(`${path}.${k}: not in the schema (a new knob? add it to the schema)`);
      else if (schema.additionalProperties && schema.additionalProperties !== true) out.push(...validate(v, schema.additionalProperties, `${path}.${k}`));
    }
  }
  return out;
}

/** A schema for `value` as it stands: its structure, every key required and no others; numbers at
 *  least 0 unless negative now; arrays of their first item's kind. `over` (by dotted path, "[]" for
 *  an array's items) replaces or adds to what's inferred: enums, ranges, open-keyed records. */
export function inferSchema(value: unknown, over: Record<string, Partial<Schema>> = {}, path = ""): Schema {
  const t = kind(value), o = over[path] ?? {};
  let s: Schema;
  if (t === "number") s = { type: "number", ...((value as number) >= 0 ? { minimum: 0 } : {}) };
  else if (t === "boolean") s = { type: "boolean" };
  else if (t === "string") s = { type: "string" };
  else if (t === "array") { const a = value as unknown[]; s = { type: "array", ...(a.length ? { items: inferSchema(a[0], over, `${path}[]`) } : {}) }; }
  else if (t === "object") {
    const props: Record<string, Schema> = {}, keys = Object.keys(value as object).filter(k => !k.startsWith("_"));
    for (const k of keys) props[k] = inferSchema((value as Record<string, unknown>)[k], over, path ? `${path}.${k}` : k);
    s = { type: "object", properties: props, required: keys, additionalProperties: false };
  } else s = {};
  if (o.additionalProperties && typeof o.additionalProperties === "object") { delete s.properties; delete s.required; }
  return { ...s, ...o };
}

const range = (s: Schema) => (s.enum ? s.enum.map(e => JSON.stringify(e)).join(" / ") : s.minimum !== undefined || s.maximum !== undefined ? `${s.minimum ?? "…"} to ${s.maximum ?? "…"}` : "");
const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

/** The knob reference: the file's knobs in its own order, grouped under the note that comes before
 *  them (a group runs from one note to the next), a row for every knob: its path, type and range
 *  (and unit, if the schema gives one; not its value, so changing a value never needs the docs redone: the file has them). */
export function knobsMarkdown(file: Record<string, unknown>, schema: Schema, title: string, source: string): string {
  const lines = [`# ${title}`, "", `Generated from \`${source}\` and its schema by \`node tools/config/schema.mjs --docs\`; don't edit by hand. A test fails if it's out of date.`, ""];
  const rows = (v: unknown, s: Schema | undefined, path: string): string[] => {
    if (s?.type === "object" && s.properties && kind(v) === "object") return Object.keys(s.properties).flatMap(k => rows((v as Record<string, unknown>)[k], s.properties![k], `${path}.${k}`));
    const type = s?.type === "array" ? `array of ${s.items?.type ?? "any"}` : s?.type === "object" ? "record" : (s?.type ?? kind(v));
    return [`| \`${path}\` | ${type} | ${esc([s ? range(s) : "", s?.unit ?? ""].filter(Boolean).join(", "))} |`];
  };
  // Groups: a note and the knobs after it (the file's first knobs may have none).
  const groups: { note: string | null; keys: string[] }[] = [];
  for (const k of Object.keys(file)) {
    if (k.startsWith("_")) { groups.push({ note: file[k] as string, keys: [] }); continue; }
    if (!groups.length) groups.push({ note: null, keys: [] });
    groups[groups.length - 1].keys.push(k);
  }
  for (const g of groups) {
    if (!g.keys.length) continue;
    lines.push(`## ${g.keys.map(k => `\`${k}\``).join(", ")}`, "");
    if (g.note) lines.push(esc(g.note), "");
    lines.push("| knob | type | range |", "|---|---|---|", ...g.keys.flatMap(k => rows(file[k], schema.properties?.[k], k)), "");
  }
  return lines.join("\n");
}
