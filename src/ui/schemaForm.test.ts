// The form made from a JSON schema (ui/schemaForm.ts, the Fight Arena's attack editor): read on a schema shaped like the composable
// attacks' (docs/plans/attack-grammar.md: modules, kinds by a const, children that are attacks again) and on the game's own.
import { describe, expect, it } from "vitest";
import { blankOf, fieldOf, getAt, MAX_DEPTH, resolve, setAt, variantOf, type Field, type Schema } from "./schemaForm";
import combatSchema from "../../config/schema/combat.schema.json";

const ATTACK: Schema = {
  $ref: "#/$defs/attack",
  $defs: {
    attack: {
      type: "object",
      properties: {
        base: { type: "string", description: "a named attack to start from" },
        cast: { type: "object", properties: { windup: { type: "number", minimum: 0, default: 0.6 }, casts: { type: "integer", minimum: 1, default: 1 } } },
        telegraph: { type: "object", properties: { kind: { enum: ["lane", "landing", "ring", "none"] }, lead: { type: "number", minimum: 0 } } },
        body: { oneOf: [
          { title: "bolt", type: "object", properties: { kind: { const: "bolt" }, radius: { type: "number", default: 0.5 } } },
          { type: "object", properties: { kind: { const: "lob" }, height: { type: "number" } } },
        ] },
        path: { type: "array", items: { type: "object", additionalProperties: { type: "number" } } },
        hit: { type: "object", properties: { friendly: { type: "boolean", default: false } } },
        on: { type: "object", additionalProperties: { type: "array", items: { type: "object", properties: { attack: { oneOf: [{ type: "string" }, { $ref: "#/$defs/attack" }] } } } } },
      },
    },
  },
};

const find = (f: Field, path: (string | number)[]): Field | undefined => {
  if (JSON.stringify(f.path) === JSON.stringify(path) && f.kind !== "choice") return f;
  for (const c of f.children ?? []) { const r = find(c, path); if (r) return r; }
  if (JSON.stringify(f.path) === JSON.stringify(path)) return f;
  return undefined;
};

describe("a form made from a JSON schema (the Fight Arena's attack editor)", () => {
  it("shows every module of an empty attack, unset (its defaults), each with its control", () => {
    const f = fieldOf(ATTACK, undefined, ATTACK);
    expect(f.kind).toBe("object");
    expect(f.children!.map(c => [c.key, c.kind])).toEqual([["base", "string"], ["cast", "object"], ["telegraph", "object"], ["body", "choice"], ["path", "array"], ["hit", "object"], ["on", "map"]]);
    for (const c of f.children!) expect(c.value).toBeUndefined();
    expect(f.children!.find(c => c.key === "body")!.variants).toEqual(["bolt", "lob"]);
  });

  it("reads a set attack: its numbers, its enum, its body's variant by its kind, its path's terms, its children's attacks", () => {
    const v = { cast: { windup: 0.8 }, telegraph: { kind: "lane" }, body: { kind: "lob", height: 4 }, path: [{ curve: 40 }], on: { expire: [{ attack: { body: { kind: "bolt" } } }] } };
    const f = fieldOf(ATTACK, v, ATTACK);
    expect(find(f, ["cast", "windup"])).toMatchObject({ kind: "number", value: 0.8 });
    expect(find(f, ["cast", "casts"])).toMatchObject({ kind: "integer", value: undefined });
    expect(find(f, ["telegraph", "kind"])).toMatchObject({ kind: "enum", value: "lane", options: ["lane", "landing", "ring", "none"] });
    const body = f.children!.find(c => c.key === "body")!;
    expect(body.variant).toBe(1);
    expect(find(f, ["body", "height"])).toMatchObject({ kind: "number", value: 4 });
    expect(find(f, ["path", 0, "curve"])).toMatchObject({ kind: "number", value: 40 });
    // a child's inline attack is an attack again, its own modules there
    const choice = (x: Field): Field | undefined => x.kind === "choice" && JSON.stringify(x.path) === JSON.stringify(["on", "expire", 0, "attack"]) ? x : x.children?.map(choice).find(Boolean);
    const child = choice(f)!;
    expect(child.kind).toBe("choice");
    expect(child.variant).toBe(1);
    expect(find(f, ["on", "expire", 0, "attack", "body"])).toBeDefined();
  });

  it("sets and unsets by path, keeping the value only what's set (an attack copied from it stays short)", () => {
    let v: unknown = undefined;
    v = setAt(v, ["cast", "windup"], 0.9);
    v = setAt(v, ["telegraph", "kind"], "ring");
    v = setAt(v, ["path", 0], { wave: 1.5 });
    expect(v).toEqual({ cast: { windup: 0.9 }, telegraph: { kind: "ring" }, path: [{ wave: 1.5 }] });
    v = setAt(v, ["cast", "windup"], undefined);
    expect(v).toEqual({ telegraph: { kind: "ring" }, path: [{ wave: 1.5 }] }); // (cast, left empty, gone)
    v = setAt(v, ["path", 0], undefined);
    expect(getAt(v, ["path"])).toBeUndefined(); // (the list, left empty, gone too)
    expect(v).toEqual({ telegraph: { kind: "ring" } });
    expect(setAt({ a: 1 }, ["a"], undefined)).toBeUndefined();
    const before = { a: { b: 1 } }, after = setAt(before, ["a", "c"], 2);
    expect(before).toEqual({ a: { b: 1 } }); // (a copy)
    expect(after).toEqual({ a: { b: 1, c: 2 } });
  });

  it("starts an added field from its default, or the empty kind with a variant's kind filled in", () => {
    const root = ATTACK, a = resolve(ATTACK, root);
    expect(blankOf(a.properties!.cast, root)).toEqual({});
    expect(blankOf(a.properties!.body, root)).toEqual({ kind: "bolt" });
    expect(blankOf(a.properties!.path, root)).toEqual([]);
    expect(blankOf({ type: "number", minimum: 0.2 }, root)).toBe(0.2);
    expect(blankOf({ type: "number", default: 3 }, root)).toBe(3);
    expect(variantOf(a.properties!.body.oneOf!, { kind: "lob" }, root)).toBe(1);
    expect(variantOf([{ type: "string" }, { $ref: "#/$defs/attack" }], "frostFan", root)).toBe(0);
    expect(variantOf([{ type: "string" }, { $ref: "#/$defs/attack" }], { body: {} }, root)).toBe(1);
  });

  it("stops at its depth, the rest raw JSON (children of children of ... are attacks)", () => {
    let v: Record<string, unknown> = {};
    for (let i = 0; i < 8; i++) v = { on: { hit: [{ attack: v }] } };
    const f = fieldOf(ATTACK, v, ATTACK);
    let deepest = 0;
    const walk = (x: Field, d: number) => { deepest = Math.max(deepest, d); for (const c of x.children ?? []) walk(c, d + 1); };
    walk(f, 0);
    expect(deepest).toBeLessThanOrEqual(MAX_DEPTH + 2);
    const json: Field[] = [];
    const all = (x: Field) => { if (x.kind === "json") json.push(x); x.children?.forEach(all); };
    all(f);
    expect(json.length).toBeGreaterThan(0);
  });

  it("reads the game's own schemas without throwing (combat.json's)", () => {
    const f = fieldOf(combatSchema as Schema, undefined, combatSchema as Schema);
    expect(f.kind).toBe("object");
    expect(f.children!.length).toBeGreaterThan(3);
  });
});
