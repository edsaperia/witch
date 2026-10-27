// The Fight Arena's attack editor on the grammar's own schema (rules/attacks): every module of it in the form, and every value of a
// rolled attack a control of its own (not raw JSON), at least as deep as the form goes.
import { describe, expect, it } from "vitest";
import { formSchema } from "./fightArena";
import { ATTACK_LIB, attackSchema, parseAttack, type AttackSpec } from "../rules/attacks";
import { fieldOf, getAt, setAt, type Field, type Path } from "../ui/schemaForm";

/** Every leaf (a number, string, boolean) in a value, by path. */
const leaves = (v: unknown, path: Path = []): Path[] => v && typeof v === "object" ? Object.entries(v).flatMap(([k, x]) => leaves(x, [...path, Array.isArray(v) ? Number(k) : k])) : [path];

describe("the Fight Arena's attack form, on the grammar's schema", () => {
  it("shows every module the grammar has (a module added to it appears by itself)", () => {
    const S = formSchema(), f = fieldOf(S, undefined, S);
    expect(f.children!.map(c => c.key)).toEqual(Object.keys(attackSchema().properties!));
  });

  it("gives every value of every attack in the library, and of one with children two deep, a control of its own, and sets them back the same", () => {
    const S = formSchema();
    // (the plan's composed example, two deep: a curving bolt splitting into a ring of homing bolts, each leaving a puddle)
    const composed: AttackSpec = { cast: { windup: 0.8 }, body: { kind: "bolt" }, path: [{ curve: 40 }], life: { range: 20 }, on: { expire: [{ attack: { emit: { pattern: "ring", n: 6 }, body: { kind: "bolt" }, path: [{ home: { turn: 60, giveUp: 3 } }], on: { hit: [{ attack: { body: { kind: "zone" }, zone: { r: 2, time: 2 } }, from: "self" }] } }, from: "self", damage: 0.5 }] } };
    expect(parseAttack(composed, ATTACK_LIB).errors).toEqual([]);
    let deep = 0;
    for (const [s, a] of [...Object.entries(ATTACK_LIB), ["composed", composed] as const]) {
      const f = fieldOf(S, a, S), byPath = new Map<string, Field>();
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
