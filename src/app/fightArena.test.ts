// The Fight Arena's attack editor on the grammar's own schema (rules/attacks): every module of it in the form, and every value of a
// rolled attack a control of its own (not raw JSON), at least as deep as the form goes.
import { describe, expect, it } from "vitest";
import { formSchema } from "./fightArena";
import { attackSchema } from "../rules/attacks";
import { rollAttack } from "../rules/fightArena";
import { fieldOf, getAt, setAt, type Field, type Path } from "../ui/schemaForm";

/** Every leaf (a number, string, boolean) in a value, by path. */
const leaves = (v: unknown, path: Path = []): Path[] => v && typeof v === "object" ? Object.entries(v).flatMap(([k, x]) => leaves(x, [...path, Array.isArray(v) ? Number(k) : k])) : [path];

describe("the Fight Arena's attack form, on the grammar's schema", () => {
  it("shows every module the grammar has (a module added to it appears by itself)", () => {
    const S = formSchema(), f = fieldOf(S, undefined, S);
    expect(f.children!.map(c => c.key)).toEqual(Object.keys(attackSchema().properties!));
  });

  it("gives every value of 100 rolled attacks a control of its own, children's included, and sets them back the same", () => {
    const S = formSchema();
    let deep = 0;
    for (let s = 1; s <= 100; s++) {
      const a = rollAttack(s), f = fieldOf(S, a, S), byPath = new Map<string, Field>();
      const walk = (x: Field) => { if (!x.children || x.kind === "choice") byPath.set(JSON.stringify(x.path), x); x.children?.forEach(walk); };
      walk(f);
      for (const p of leaves(a)) {
        const field = byPath.get(JSON.stringify(p)) ?? [...byPath.values()].find(x => x.kind === "json" && JSON.stringify(p).startsWith(JSON.stringify(x.path).slice(0, -1)));
        expect(field, `seed ${s}: ${p.join(".")}`).toBeDefined();
        if (field!.kind !== "json") expect(field!.value).toEqual(getAt(a, p)); else deep++;
        expect(getAt(setAt(a, p, getAt(a, p)), p)).toEqual(getAt(a, p));
      }
    }
    expect(deep).toBe(0); // (two levels of children fit inside the form's depth)
  });
});
