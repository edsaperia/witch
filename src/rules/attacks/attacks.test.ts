// The composable attack grammar's format (docs/plans/attack-grammar.md, step 1): the 27 attacks the game runs written in it and compiled
// back to exactly the records combat.json holds (so nothing plays differently), the schema file up to date, the parser's checks and
// errors, the canonical writer, and the reaction floor: every attack's first warning at least REACTION_FLOOR before its first harm.
import { describe, expect, it } from "vitest";
import combat from "../../../config/combat.json";
import schemaFile from "../../../config/schema/attacks.schema.json";
import { ATTACK_FILE_SCHEMA, ATTACK_LIB, REACTION_FLOOR, compileLegacy, fromLegacy, merge, parseAttack, readability, serialiseAttack, withBase, type AttackSpec } from "./index";
import type { Attack } from "../combat/data";

const OLD = combat.attacks as Record<string, Attack>;

describe("the attack grammar's format", () => {
  it("writes every attack the game runs, compiling back to exactly combat.json's record (run node tools/attacks/compile.mjs after editing)", () => {
    expect(Object.keys(OLD).sort()).toEqual(Object.keys(ATTACK_LIB).filter(k => compileLegacy(withBase(ATTACK_LIB[k], ATTACK_LIB))).sort());
    for (const [name, rec] of Object.entries(OLD)) expect(JSON.stringify(compileLegacy(withBase(ATTACK_LIB[name], ATTACK_LIB))), name).toBe(JSON.stringify(rec));
    expect(schemaFile).toEqual(JSON.parse(JSON.stringify(ATTACK_FILE_SCHEMA)));
  });

  it("reads an old record into the grammar and back unchanged, and leaves what the old runtime can't run to the new engine", () => {
    for (const [name, rec] of Object.entries(OLD)) expect(compileLegacy(fromLegacy(rec)), name).toEqual(rec);
    expect(compileLegacy({ ...fromLegacy(OLD.spit), path: [{ curve: 30 }] })).toBeNull();
    expect(compileLegacy({ ...fromLegacy(OLD.spit), on: { expire: [{ attack: "spit" }] } })).toBeNull();
    expect(compileLegacy({ ...fromLegacy(OLD.spit), hit: { effect: { stun: 1 } } })).toBeNull();
  });

  it("checks every attack in the library", () => {
    for (const [name, spec] of Object.entries(ATTACK_LIB)) expect(parseAttack(spec, ATTACK_LIB, { strict: true }).errors, name).toEqual([]);
  });

  it("lays a base under an attack: objects merged, lists replaced, a loop or a missing base an error", () => {
    expect(merge({ a: { b: 1, c: 2 }, l: [1, 2] }, { a: { c: 3 }, l: [9] })).toEqual({ a: { b: 1, c: 3 }, l: [9] });
    const long = withBase(ATTACK_LIB.longspit, ATTACK_LIB);
    expect(long.cast?.range).toBe(36); expect(long.speed?.v).toBe(28); expect(long.base).toBeUndefined();
    const lib = { a: { base: "b" }, b: { base: "a" } } as Record<string, AttackSpec>;
    expect(parseAttack({ base: "a" }, lib).errors[0]).toMatch(/base loop/);
    expect(parseAttack({ base: "nowhere" }, ATTACK_LIB).errors[0]).toMatch(/no attack named "nowhere"/);
  });

  it("says what's wrong with a bad attack, by its path", () => {
    const bad = (x: unknown) => parseAttack(x, ATTACK_LIB).errors.join("\n");
    expect(bad("{nope")).toMatch(/not JSON/);
    expect(bad({ cast: { windup: -1 } })).toMatch(/cast.windup: -1, below its minimum 0/);
    expect(bad({ body: { kind: "dragon" } })).toMatch(/body.kind: "dragon", should be one of/);
    expect(bad({ wobble: 1 })).toMatch(/wobble/);
    expect(bad({ path: [{ curve: 30, wave: { amp: 1, freq: 1 } }] })).toMatch(/path\[0\]: one term each/);
    expect(bad({ on: { expire: [{ attack: "nothing" }] } })).toMatch(/on.expire\[0\].attack: no attack named "nothing"/);
    expect(bad({ on: { hit: [{ attack: { body: { kind: "zone" }, zone: { r: -2 } } }] } })).toMatch(/on.hit\[0\].attack.zone.r/);
    // (children nest at most three deep)
    const nest = (d: number): AttackSpec => (d ? { on: { expire: [{ attack: nest(d - 1) }] } } : { body: { kind: "area" } });
    expect(bad(nest(3))).toBe("");
    expect(bad(nest(4))).toMatch(/nest at most 3 deep/);
  });

  it("writes canonical JSON: the grammar's order, nothing empty, read back the same", () => {
    const a: AttackSpec = { hit: { damage: 0.5 }, body: { kind: "bolt" }, cast: { windup: 0.8, tell: {} }, path: [{ curve: -40 }], emit: undefined };
    const text = serialiseAttack(a);
    expect(text).toBe('{"cast":{"windup":0.8},"body":{"kind":"bolt"},"path":[{"curve":-40}],"hit":{"damage":0.5}}');
    expect(serialiseAttack(parseAttack(text, ATTACK_LIB).attack!)).toBe(text);
  });
});

describe("telegraphs and the reaction floor", () => {
  it("gives every attack in the library at least the floor from its first warning to its first harm", () => {
    for (const [name, spec] of Object.entries(ATTACK_LIB)) expect(readability(withBase(spec, ATTACK_LIB), ATTACK_LIB).warning, name).toBeGreaterThanOrEqual(REACTION_FLOOR);
  });

  it("counts a lob's flight, a beam's charge and a mine's arming as warning; a timer's wait for its child", () => {
    expect(readability({ cast: { windup: 0.2 }, body: { kind: "lob", flight: 1 } }, ATTACK_LIB).warning).toBeCloseTo(1.2);
    expect(readability({ cast: { windup: 0.2 }, body: { kind: "beam" }, beam: { charge: 0.5 } }, ATTACK_LIB).warning).toBeCloseTo(0.7);
    expect(readability({ cast: { windup: 0.3 }, telegraph: { lead: 0.1 }, body: { kind: "mine", arm: 1 } }, ATTACK_LIB).warning).toBeCloseTo(1.1);
    // (a sticky bolt whose blast goes off 1.5 s after it's released: the blast's warning is its countdown)
    const sticky: AttackSpec = { cast: { windup: 0.6 }, body: { kind: "bolt" }, life: { stick: true }, hit: { damage: 0 }, on: { timer: [{ at: 1.5, attack: { body: { kind: "area" }, area: { r: 4 } } }] } };
    expect(readability(sticky, ATTACK_LIB)).toEqual({ warning: 1.5, where: "on.timer[0]" });
    // (harmless: a puddle that neither hurts nor slows)
    expect(readability({ body: { kind: "zone" }, hit: { damage: 0 } }, ATTACK_LIB).warning).toBe(Infinity);
  });

  it("lengthens a part under the floor, or with strict refuses it, saying where", () => {
    // (a bolt that splits into a ring of bolts released at once: each child hits with no warning of its own)
    const split: AttackSpec = { body: { kind: "bolt" }, on: { expire: [{ attack: { emit: { pattern: "ring", n: 8 }, body: { kind: "bolt" } } }] } };
    expect(readability(split, ATTACK_LIB)).toEqual({ warning: 0, where: "on.expire[0]" });
    expect(parseAttack(split, ATTACK_LIB, { strict: true }).errors[0]).toMatch(/on.expire\[0\]: 0.00 s .* under the 0.45 s floor/);
    const p = parseAttack(split, ATTACK_LIB);
    expect(p.warnings[0]).toMatch(/lengthened/);
    expect(readability(p.attack!, ATTACK_LIB).warning).toBeCloseTo(REACTION_FLOOR);
    const child = p.attack!.on!.expire![0].attack as AttackSpec;
    expect(child.cast?.windup).toBeCloseTo(REACTION_FLOOR);
    // (a named child is taken inline to lengthen it; a timer's wait counts toward its child's warning)
    const named = parseAttack({ body: { kind: "bolt" }, on: { timer: [{ at: 0.3, attack: "nip" }] } }, { ...ATTACK_LIB, nip: { ...ATTACK_LIB.nip, cast: { ...ATTACK_LIB.nip.cast, windup: 0 } } });
    expect((named.attack!.on!.timer![0].attack as AttackSpec).cast?.windup).toBeCloseTo(REACTION_FLOOR - 0.3);
    // (a telegraph of `none` is given its body's own once it's lengthened)
    const hidden = parseAttack({ cast: { windup: 0.1 }, telegraph: { kind: "none" }, body: { kind: "area" } }, ATTACK_LIB).attack!;
    expect(hidden.telegraph?.kind).toBe("ring"); expect(readability(hidden, ATTACK_LIB).warning).toBeGreaterThanOrEqual(REACTION_FLOOR);
  });
});
