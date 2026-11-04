// The config is read-only at run time (config mutation, 2026-11-04): the game keeps what it works out at run time in its own maps,
// never in the config objects it read (the pack moves were cached into the combat file's attacks: rules/combat/packs.ts), and
// withTuning hands a test its own tuning all the way down, so a nested value changed on it never reaches TUNING.
import { describe, expect, it } from "vitest";
import combatJson from "../../config/combat.json";
import { TUNING, withTuning } from "./tuning";
import { COMBAT, attackNamed } from "./combat/data";
import { PACKS, packAttack } from "./combat/packs";
import type { Level } from "./creatures";

describe("the config stays as it was read", () => {
  it("withTuning's tuning is its own copy, nested parts and parts passed in too", () => {
    const before = JSON.stringify(TUNING);
    const t = withTuning({});
    t.partyObjects.generated = !TUNING.partyObjects.generated; // (styleFromLink's, which leaked into later test files)
    t.camera.curve.treetop += 1; t.map!.islandAreas = 99;
    const map = { ...TUNING.map! }, u = withTuning({ map }); // (a part passed in, sharing the map's own nested parts)
    expect(u.map).not.toBe(map);
    for (const v of Object.values(u.map!)) if (v && typeof v === "object") expect(Object.values(TUNING.map!)).not.toContain(v);
    expect(JSON.stringify(TUNING)).toBe(before);
    expect(t.partyObjects.generated).toBe(!TUNING.partyObjects.generated); // (the override itself still takes)
    expect(withTuning({ creatureSpeed: 3 }).creatureSpeed).toBe(3);
    expect(withTuning({ camera: { ...TUNING.camera, fov: 7 } }).camera.fov).toBe(7);
  });

  it("a pack's moves are made into their own map, not the combat file's attacks, and found by name", () => {
    const before = JSON.stringify(combatJson), moves = Object.keys(PACKS.kinds).flatMap(species => ([1, 2] as Level[]).flatMap(level => (["melee", "ranged"] as const).map(move => ({ species, level, move }))));
    // (by name first: a page that hadn't made one yet, a resumed night's shot in flight, finds it made as packAttack makes it)
    const byName = moves.map(m => attackNamed(`pack:${m.species}:${m.move}:${m.level}`));
    const made = moves.map(m => packAttack(m.species, m.level, m.move));
    expect(made.filter(Boolean).length).toBeGreaterThan(10);
    made.forEach((p, i) => { if (p) { expect(p.name).toBe(`pack:${moves[i].species}:${moves[i].move}:${moves[i].level}`); expect(byName[i]).toEqual(p.attack); expect(attackNamed(p.name)).toBe(p.attack); } else expect(byName[i]).toBeUndefined(); });
    expect(Object.keys(COMBAT.attacks).filter(k => k.startsWith("pack:"))).toEqual([]);
    expect(JSON.stringify(combatJson)).toBe(before);
    // (the same object each time: the view's and the fight's scaling caches key on it)
    const m = moves.find((_, i) => made[i])!;
    expect(packAttack(m.species, m.level, m.move)!.attack).toBe(made[moves.indexOf(m)]!.attack);
  });
});
