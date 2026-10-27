// Reading, checking and writing attacks in the composable grammar (rules/attacks/types.ts; docs/plans/attack-grammar.md): a named
// attack's `base` laid under it, each inline child checked as an attack in its own right (to the depth cap), the reaction floor
// checked (rules/attacks/timeline.ts), and canonical JSON written back (stable key order, nothing empty), so the Fight Arena can
// randomise, edit, save and copy an attack as text. Pure: the arena and the tests use the same code as the game.
import { validate } from "../schema";
import { attackSchema, MAX_DEPTH } from "./schema";
import { REACTION_FLOOR, liftToFloor, readability } from "./timeline";
import type { AttackSpec, Child } from "./types";

/** The attacks by name (a file's, the library the arena edits against). */
export type Library = Readonly<Record<string, AttackSpec>>;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** `over` laid on `under`: objects merged key by key, anything else (lists too) replaced. */
export function merge<T>(under: T, over: T): T {
  if (!isObj(under) || !isObj(over)) return (over === undefined ? under : over) as T;
  const out: Record<string, unknown> = { ...under };
  for (const [k, v] of Object.entries(over)) out[k] = v === undefined ? out[k] : merge(out[k], v);
  return out as T;
}

/** An attack with its `base` chain laid under it (the base's own base first); `base` itself dropped. Throws on a missing base or a loop. */
export function withBase(spec: AttackSpec, lib: Library, seen: string[] = []): AttackSpec {
  if (!spec.base) return spec;
  const name = spec.base;
  if (seen.includes(name)) throw new Error(`base loop: ${[...seen, name].join(" → ")}`);
  const under = lib[name];
  if (!under) throw new Error(`no attack named "${name}" to base on`);
  const { base: _b, ...rest } = spec;
  return merge(withBase(under, lib, [...seen, name]), rest as AttackSpec);
}

/** A child's attack, named or inline, as a spec (its base laid under it). */
export function childSpec(c: Child, lib: Library): AttackSpec {
  return withBase(typeof c.attack === "string" ? (lib[c.attack] ?? (() => { throw new Error(`no attack named "${c.attack}"`); })()) : c.attack, lib);
}

/** Every way an attack breaks the grammar, as "path: what" lines; its inline children checked too, to `depth` more levels. */
export function check(spec: unknown, lib: Library, depth = MAX_DEPTH, path = "(attack)"): string[] {
  const out = validate(spec, attackSchema(), path);
  if (out.length || !isObj(spec)) return out;
  const S = spec as AttackSpec;
  if (S.base !== undefined && !lib[S.base]) out.push(`${path}.base: no attack named "${S.base}"`);
  S.path?.forEach((t, i) => { const n = Object.keys(t).length; if (n !== 1) out.push(`${path}.path[${i}]: one term each (it has ${n})`); });
  for (const [ev, list] of Object.entries(S.on ?? {})) (list as Child[] | undefined)?.forEach((c, i) => {
    const at = `${path}.on.${ev}[${i}]`;
    if (typeof c.attack === "string") { if (!lib[c.attack]) out.push(`${at}.attack: no attack named "${c.attack}"`); }
    else if (!isObj(c.attack)) out.push(`${at}.attack: a name or an attack`);
    else if (depth <= 0) out.push(`${at}: children nest at most ${MAX_DEPTH} deep`);
    else out.push(...check(c.attack, lib, depth - 1, `${at}.attack`));
  });
  return out;
}

export interface Parsed {
  /** The attack as authored, its base laid under it (its warning lengthened to the floor, unless strict): null if it couldn't be read. */
  attack: AttackSpec | null;
  /** What makes it unusable. */
  errors: string[];
  /** What was changed or is worth knowing (a warning lengthened to the floor). */
  warnings: string[];
}

/** An attack from the arena or a file: JSON text or an object; checked against the grammar and `lib`, its base laid under it, and its
 *  warning held to the reaction floor (lengthened and said so, or with `strict` an error instead). */
export function parseAttack(input: unknown, lib: Library, o: { floor?: number; strict?: boolean } = {}): Parsed {
  let raw = input;
  if (typeof input === "string") {
    try { raw = JSON.parse(input); } catch (e) { return { attack: null, errors: [`not JSON: ${(e as Error).message}`], warnings: [] }; }
  }
  const errors = check(raw, lib);
  if (errors.length) return { attack: null, errors, warnings: [] };
  let attack: AttackSpec;
  try { attack = withBase(raw as AttackSpec, lib); } catch (e) { return { attack: null, errors: [(e as Error).message], warnings: [] }; }
  const floor = o.floor ?? REACTION_FLOOR, r = readability(attack, lib);
  if (r.warning >= floor) return { attack, errors: [], warnings: [] };
  const msg = `${r.where}: ${r.warning.toFixed(2)} s from its first warning to its first harm, under the ${floor} s floor`;
  if (o.strict) return { attack: null, errors: [msg], warnings: [] };
  return { attack: liftToFloor(attack, lib, floor), errors: [], warnings: [`${msg}: lengthened`] };
}

// (the canonical order: the schema's own, so a copied attack reads the same way every time)
const ORDER = Object.keys(attackSchema().properties!);

/** An attack as canonical JSON: modules in the grammar's order, their keys sorted, nothing undefined or empty. `indent` as JSON.stringify's. */
export function serialiseAttack(spec: AttackSpec, indent?: number): string {
  return JSON.stringify(canonical(spec, true), null, indent);
}
function canonical(v: unknown, top = false): unknown {
  if (Array.isArray(v)) return v.map(x => canonical(x));
  if (!isObj(v)) return v;
  const keys = Object.keys(v).filter(k => v[k] !== undefined);
  keys.sort(top ? (a, b) => rank(a) - rank(b) : undefined);
  const out: Record<string, unknown> = {};
  for (const k of keys) {
    const c = canonical(v[k]);
    if (isObj(c) && !Object.keys(c).length) continue;
    out[k] = c;
  }
  return out;
}
const rank = (k: string) => { const i = ORDER.indexOf(k); return i < 0 ? ORDER.length : i; };
