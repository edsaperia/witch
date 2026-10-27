// A form made from a JSON schema (the Fight Arena's attack editor, Ed 2026-10-27: "a form generated from the schema so new modules
// appear by themselves"): every property the schema has, its control by its type (a number with its bounds, a choice from an enum,
// on/off/default, text, a list, a choice of variants), and the value only what's been set, so an attack copied from it stays short
// (every field has a default). Pure here (fieldsOf, setAt): the page's DOM is drawn from it in renderForm, and the tests read it.

export interface Schema {
  type?: string | string[]; title?: string; description?: string; default?: unknown; const?: unknown; enum?: unknown[];
  minimum?: number; maximum?: number; multipleOf?: number;
  properties?: Record<string, Schema>; required?: string[]; additionalProperties?: boolean | Schema;
  items?: Schema; oneOf?: Schema[]; anyOf?: Schema[]; $ref?: string;
  definitions?: Record<string, Schema>; $defs?: Record<string, Schema>;
  /** The game's own dialect (rules/schema.ts): a unit for the label, null allowed too, a list's length. */
  unit?: string; nullable?: boolean; minItems?: number; maxItems?: number;
}

export type Path = (string | number)[];
export type Kind = "number" | "integer" | "boolean" | "enum" | "string" | "object" | "map" | "array" | "choice" | "json";

export interface Field {
  path: Path; key: string; kind: Kind; schema: Schema;
  /** Its value now (undefined: unset, its default). */
  value: unknown;
  /** Its parts (an object's properties, a map's or a list's entries, a choice's variant's), when it's set. */
  children?: Field[];
  /** A choice's variants (their labels) and the one its value is. */
  variants?: string[]; variant?: number;
  /** An enum's options. */
  options?: unknown[];
}

/** How deep the form goes (an attack's children are attacks, each about five levels: a child's child's child fits): past it, a field's raw JSON. Only what's set is opened, so it bounds a value's depth, not the schema's. */
export const MAX_DEPTH = 16;

/** A `$ref` ("#/definitions/x", "#/$defs/x" or any "#/a/b") looked up in the root schema; anything else as it is. */
export function resolve(s: Schema, root: Schema): Schema {
  for (let k = 0; k < 16 && s.$ref; k++) {
    if (!s.$ref.startsWith("#/")) break;
    let at: unknown = root;
    for (const p of s.$ref.slice(2).split("/")) at = (at as Record<string, unknown> | undefined)?.[decodeURIComponent(p.replace(/~1/g, "/").replace(/~0/g, "~"))];
    if (!at || typeof at !== "object") break;
    const { $ref: _, ...rest } = s;
    s = { ...(at as Schema), ...rest };
  }
  return s;
}

const typeOf = (s: Schema): string | undefined => Array.isArray(s.type) ? s.type.find(t => t !== "null") : s.type;

/** Which variant of a choice a value is: the one whose `const` properties it matches, else the first its type fits, else 0. */
export function variantOf(variants: Schema[], value: unknown, root: Schema): number {
  if (value === undefined) return 0;
  const fits = (s: Schema): boolean => {
    const t = typeOf(s);
    if (s.const !== undefined) return value === s.const;
    if (s.enum) return s.enum.includes(value);
    if (t === "object" || s.properties) {
      if (!value || typeof value !== "object" || Array.isArray(value)) return false;
      const v = value as Record<string, unknown>;
      return Object.entries(s.properties ?? {}).every(([k, p]) => { const r = resolve(p, root); return r.const === undefined || v[k] === r.const; });
    }
    if (t === "array") return Array.isArray(value);
    if (t === "number" || t === "integer") return typeof value === "number";
    if (t === "string") return typeof value === "string";
    if (t === "boolean") return typeof value === "boolean";
    return false;
  };
  const exact = variants.findIndex(v => { const r = resolve(v, root); return Object.values(r.properties ?? {}).some(p => resolve(p, root).const !== undefined) && fits(r); });
  if (exact >= 0) return exact;
  const i = variants.findIndex(v => fits(resolve(v, root)));
  return i < 0 ? 0 : i;
}

/** A variant's label: its title, its `const` (a "kind"), its type. */
export function variantLabel(s: Schema, root: Schema, i: number): string {
  const r = resolve(s, root);
  if (r.title) return r.title;
  if (r.const !== undefined) return String(r.const);
  const c = Object.entries(r.properties ?? {}).find(([, p]) => resolve(p, root).const !== undefined);
  if (c) return String(resolve(c[1], root).const);
  if (s.$ref) return s.$ref.split("/").pop()!;
  return typeOf(r) ?? `option ${i + 1}`;
}

/** The field for `value` under `schema` at `path`. */
export function fieldOf(schema: Schema, value: unknown, root: Schema, path: Path = [], key = "", depth = 0): Field {
  const s = resolve(schema, root), t = typeOf(s), base = { path, key, schema: s, value };
  if (depth > MAX_DEPTH) return { ...base, kind: "json" };
  const alts = s.oneOf ?? s.anyOf;
  if (alts?.length) {
    const variants = alts.map((a, i) => variantLabel(a, root, i)), variant = variantOf(alts, value, root);
    const own: Schema = { ...s, oneOf: undefined, anyOf: undefined }, chosen = { ...own, ...resolve(alts[variant], root), ...(s.properties && resolve(alts[variant], root).properties ? { properties: { ...s.properties, ...resolve(alts[variant], root).properties } } : {}) };
    return { ...base, kind: "choice", variants, variant, ...(value !== undefined ? { children: [fieldOf(chosen, value, root, path, key, depth + 1)] } : {}) };
  }
  if (s.enum) return { ...base, kind: "enum", options: s.enum };
  if (s.const !== undefined) return { ...base, kind: "enum", options: [s.const] };
  if (t === "number" || t === "integer") return { ...base, kind: t };
  if (t === "boolean") return { ...base, kind: "boolean" };
  if (t === "string") return { ...base, kind: "string" };
  if (t === "array") {
    const list = Array.isArray(value) ? value : undefined;
    return { ...base, kind: "array", ...(list ? { children: list.map((v, i) => fieldOf(s.items ?? {}, v, root, [...path, i], String(i), depth + 1)) } : {}) };
  }
  if (t === "object" || s.properties || s.additionalProperties) {
    const o = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
    if (!s.properties && typeof s.additionalProperties === "object") {
      return { ...base, kind: "map", ...(o ? { children: Object.keys(o).map(k => fieldOf(s.additionalProperties as Schema, o[k], root, [...path, k], k, depth + 1)) } : {}) };
    }
    const props = Object.keys(s.properties ?? {});
    return { ...base, kind: "object", ...(o || depth === 0 ? { children: props.map(k => fieldOf(s.properties![k], o?.[k], root, [...path, k], k, depth + 1)) } : {}) };
  }
  return { ...base, kind: "json" };
}

/** The value at `path`. */
export function getAt(value: unknown, path: Path): unknown {
  let at = value;
  for (const p of path) at = (at as Record<string | number, unknown> | undefined)?.[p];
  return at;
}

/** `value` with `path` set to `v` (a copy; undefined unsets it, and an object or list left empty by that goes too). */
export function setAt(value: unknown, path: Path, v: unknown): unknown {
  if (!path.length) return v;
  const [p, ...rest] = path, list = typeof p === "number";
  const here = value && typeof value === "object" ? value : list ? [] : {};
  const copy: Record<string | number, unknown> | unknown[] = Array.isArray(here) ? [...here] : { ...(here as Record<string, unknown>) };
  const next = setAt((here as Record<string | number, unknown>)[p], rest, v);
  const empty = next === undefined || (rest.length > 0 && next && typeof next === "object" && Object.keys(next).length === 0);
  if (Array.isArray(copy)) { if (empty && rest.length === 0) copy.splice(p as number, 1); else copy[p as number] = next; }
  else if (empty) delete copy[p as string]; else copy[p as string] = next;
  return Array.isArray(copy) ? copy : Object.keys(copy).length ? copy : undefined;
}

/** A starting value for a field being added (an object, a list, a variant): its default, else the empty kind, a choice's first
 *  variant's `const` properties filled in. */
export function blankOf(schema: Schema, root: Schema): unknown {
  const s = resolve(schema, root);
  if (s.default !== undefined) return structuredClone(s.default);
  const alts = s.oneOf ?? s.anyOf;
  if (alts?.length) return blankOf(alts[0], root);
  if (s.const !== undefined) return s.const;
  if (s.enum) return s.enum[0];
  const t = typeOf(s);
  if (t === "array") return [];
  if (t === "object" || s.properties) {
    const o: Record<string, unknown> = {};
    for (const [k, p] of Object.entries(s.properties ?? {})) { const r = resolve(p, root); if (r.const !== undefined) o[k] = r.const; }
    return o;
  }
  if (t === "number" || t === "integer") return s.minimum ?? 0;
  if (t === "boolean") return false;
  if (t === "string") return "";
  return null;
}

/** The form for `value` under `schema`, drawn into `into`; each change made gives `changed` the new value (and draws it again). */
export function renderForm(into: HTMLElement, schema: Schema, value: unknown, changed: (v: unknown) => void): void {
  const root = schema, el = (tag: string, cls = "", text = "") => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
  const put = (path: Path, v: unknown) => changed(setAt(value, path, v));
  const draw = (f: Field, depth: number): HTMLElement => {
    const row = el("div", `sf-row sf-${f.kind}`), label = el("label", "sf-key", `${f.key || "attack"}${f.schema.unit ? ` (${f.schema.unit})` : ""}`);
    if (f.schema.description) label.title = f.schema.description;
    const unset = f.value === undefined, def = f.schema.default !== undefined ? ` (${JSON.stringify(f.schema.default)})` : "";
    row.append(label);
    const clear = () => { const b = el("button", "sf-x", "×"); b.title = "Back to its default"; b.onclick = () => put(f.path, undefined); return b; };
    if (f.kind === "number" || f.kind === "integer") {
      const i = el("input") as HTMLInputElement; i.type = "number";
      if (f.schema.minimum !== undefined) i.min = String(f.schema.minimum);
      if (f.schema.maximum !== undefined) i.max = String(f.schema.maximum);
      i.step = f.kind === "integer" ? "1" : String(f.schema.multipleOf ?? "any");
      i.placeholder = def.trim() || "default"; i.value = unset ? "" : String(f.value);
      i.onchange = () => put(f.path, i.value === "" ? undefined : f.kind === "integer" ? Math.round(+i.value) : +i.value);
      row.append(i);
    } else if (f.kind === "boolean" || f.kind === "enum") {
      const sel = el("select") as HTMLSelectElement, opts = f.kind === "boolean" ? [true, false] : f.options!;
      sel.append(new Option(`default${def}`, ""));
      opts.forEach((o, k) => sel.append(new Option(String(o), String(k))));
      sel.value = unset ? "" : String(opts.findIndex(o => o === f.value));
      sel.onchange = () => put(f.path, sel.value === "" ? undefined : opts[+sel.value]);
      row.append(sel);
    } else if (f.kind === "string") {
      const i = el("input") as HTMLInputElement; i.placeholder = def.trim() || "default"; i.value = unset ? "" : String(f.value);
      i.onchange = () => put(f.path, i.value === "" ? undefined : i.value);
      row.append(i);
    } else if (f.kind === "choice") {
      const sel = el("select") as HTMLSelectElement;
      sel.append(new Option(unset ? `default${def}` : "(none)", ""));
      f.variants!.forEach((v, k) => sel.append(new Option(v, String(k))));
      sel.value = unset ? "" : String(f.variant);
      sel.onchange = () => { const alts = f.schema.oneOf ?? f.schema.anyOf ?? []; put(f.path, sel.value === "" ? undefined : blankOf(alts[+sel.value], root)); };
      row.append(sel);
      if (!unset && f.children?.[0]) { const inner = draw(f.children[0], depth + 1); inner.querySelector(".sf-key")?.remove(); inner.querySelector(":scope > select")?.remove(); row.append(inner); }
    } else if (f.kind === "object" || f.kind === "map" || f.kind === "array") {
      if (unset && depth > 0) { const b = el("button", "sf-add", "+"); b.title = `Set ${f.key}${def}`; b.onclick = () => put(f.path, blankOf(f.schema, root)); row.append(b); }
      else {
        if (depth > 0) row.append(clear());
        const box = el("div", "sf-box");
        for (const c of f.children ?? []) {
          const cr = draw(c, depth + 1);
          if (f.kind !== "object") { const x = el("button", "sf-x", "−"); x.title = "Remove it"; x.onclick = () => put(c.path, undefined); cr.append(x); }
          box.append(cr);
        }
        if (f.kind === "array") { const b = el("button", "sf-add", "+ item"); b.onclick = () => put([...f.path, (f.value as unknown[] | undefined)?.length ?? 0], blankOf(f.schema.items ?? {}, root)); box.append(b); }
        if (f.kind === "map") {
          const i = el("input") as HTMLInputElement; i.placeholder = "new name"; i.className = "sf-name";
          const b = el("button", "sf-add", "+"); b.onclick = () => { if (i.value) put([...f.path, i.value], blankOf(f.schema.additionalProperties as Schema, root)); };
          box.append(i, b);
        }
        row.append(box);
      }
    } else {
      const t = el("textarea") as HTMLTextAreaElement; t.rows = 2; t.value = unset ? "" : JSON.stringify(f.value);
      t.onchange = () => { try { put(f.path, t.value.trim() ? JSON.parse(t.value) : undefined); t.classList.remove("bad"); } catch { t.classList.add("bad"); } };
      row.append(t);
    }
    if (!unset && (f.kind === "number" || f.kind === "integer" || f.kind === "string" || f.kind === "json")) row.append(clear());
    return row;
  };
  into.replaceChildren(draw(fieldOf(schema, value, root), 0));
}
