import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { CONFIGS } from "./configSchemas";
import { validate, type Schema } from "./schema";
import { AREA_TYPES } from "./map";

// The other config files (housekeeping, issue #122): each against its schema, and the names in them
// pointing at real things (species, attacks, area types, buff kinds).
const load = (f: string) => JSON.parse(readFileSync(f, "utf8"));
const data = Object.fromEntries(CONFIGS.map(c => [c.name, load(c.file)]));
const SPECIES = new Set(AREA_TYPES.map(t => t.creature)), AREAS = new Set(AREA_TYPES.map(t => t.id));
const unknown = (names: Iterable<string>, known: Set<string>) => [...names].filter(n => !known.has(n));

describe("the config files' schemas (config/schema/)", () => {
  for (const c of CONFIGS) it(`holds ${c.file}`, () => {
    expect(validate(data[c.name], load(c.schema) as Schema, c.name)).toEqual([]);
  });
});

describe("the names the config files use", () => {
  it("combat.json: levels and species name real attacks; every species is real", () => {
    const C = data.combat, attacks = new Set(Object.keys(C.attacks));
    const named = [...C.byLevel.melee, ...C.byLevel.ranged, ...Object.values(C.bySpecies as Record<string, (string | null)[]>).flat()].filter((a): a is string => !!a);
    expect(unknown(named, attacks)).toEqual([]);
    const species = [...Object.keys(C.strength.species), ...Object.keys(C.bySpecies), ...C.ranged, ...C.kite.species, ...C.temperament.curious, ...C.temperament.skittish, ...Object.values(C.traits as Record<string, string[]>).flat()];
    expect(unknown(species, SPECIES)).toEqual([]);
    expect(unknown(Object.keys(C.counters), new Set(Object.keys(C.traits)))).toEqual([]); // (counters for the traits there are)
  });

  it("movement.json: profiles and bodies are real species, legends' moves real attacks", () => {
    const M = data.movement, attacks = new Set(Object.keys(data.combat.attacks));
    expect(unknown([...Object.keys(M.profiles), ...Object.keys(M.bodies.radius), ...Object.keys(M.legends.bySpecies)], SPECIES)).toEqual([]);
    const sets = [M.legends, ...Object.values(M.legends.bySpecies)] as { pattern: string[]; phase2: { pattern: string[] } }[];
    expect(unknown(sets.flatMap(s => [...s.pattern, ...s.phase2.pattern]), attacks)).toEqual([]);
  });

  it("area-types.json: every type is a real area type", () => {
    expect(unknown(Object.keys(data["area-types"].types), AREAS)).toEqual([]);
  });

  it("legend-buffs.json: every species real, every kind one with limits, every value within them", () => {
    const B = data["legend-buffs"], bad: string[] = [];
    expect(unknown(Object.keys(B.species), SPECIES)).toEqual([]);
    for (const [sp, b] of Object.entries(B.species as Record<string, { kind: string; value: number }>)) {
      const lim = B.limits[b.kind] as [number, number] | undefined;
      if (!lim) bad.push(`${sp}: kind ${b.kind} has no limits`);
      else if (b.value < lim[0] || b.value > lim[1]) bad.push(`${sp}: ${b.kind} ${b.value} outside ${lim[0]}–${lim[1]}`);
    }
    expect(bad).toEqual([]);
  });
});
