// Each species' own attack (config/species-attacks.json, rules/attacks/species.ts; step 5 of docs/plans/attack-grammar.md): every
// species has one, each as written at least the reaction floor and its adult's too; within each biome no two alike in style; and
// the further out its island's phase the more it composes (Ed, 2026-10-27).
import { describe, expect, it } from "vitest";
import { KINDS_TABLE } from "../kinds";
import { CREATURE_IDS } from "../creatureConfig";
import { adultOf, SPECIES_ATTACKS, speciesAttack } from "./species";
import { parseAttack, readability, REACTION_FLOOR, type AttackSpec } from "./index";
import type { Child } from "./types";

/** An attack's style: its body, its pattern, and the modules it composes (two in one biome may not share it). */
export function styleOf(a: AttackSpec): string {
  const parts = [a.body?.kind ?? "bolt", a.emit?.pattern ?? "single", a.area?.shape ?? "", a.area?.at ?? "", ...Object.keys(a.hit?.effect ?? {}), a.area?.rain ? "rain" : "", a.area?.grow ? "grow" : "", a.speed?.profile ?? "",
    ...(a.path ?? []).map(t => Object.keys(t)[0]), ...Object.keys(a.pack ?? {}), ...Object.keys(a.on ?? {}), a.force ? "force" : "", a.life?.bounce ? "bounce" : "", a.life?.stick ? "stick" : ""];
  return parts.filter(Boolean).join("+");
}
/** How much it composes: a point a module or term beyond a plain single bolt, its children's counted in. */
export function complexity(a: AttackSpec): number {
  let n = 0;
  const kind = a.body?.kind ?? "bolt";
  if (kind !== "bolt" && kind !== "melee") n++;
  if ((a.emit?.pattern ?? "single") !== "single") n++;
  n += (a.path ?? []).length + Object.keys(a.pack ?? {}).length;
  if (a.area?.shape && a.area.shape !== "disc") n++;
  if (a.area?.rain || (a.area?.waves ?? 1) > 1) n++;
  if (a.area?.grow) n++;
  if (a.speed?.profile) n++;
  if (a.life?.bounce || a.life?.pierce || a.life?.stick) n++;
  if (a.force) n++;
  if (a.beam?.sweep || a.beam?.track || a.beam?.charge) n++;
  n += Object.keys(a.hit?.effect ?? {}).length > 1 ? 1 : 0;
  for (const list of Object.values(a.on ?? {})) for (const c of list as Child[]) n += 1 + (typeof c.attack === "object" ? complexity(c.attack) : 0);
  return n;
}

describe("each species' own attack", () => {
  it("is given every species, reads cleanly, and gives at least the floor's warning, young and adult", () => {
    expect(Object.keys(SPECIES_ATTACKS).sort()).toEqual([...CREATURE_IDS].sort());
    for (const [sp, a] of Object.entries(SPECIES_ATTACKS)) {
      expect(parseAttack(a, {}, { strict: true }).errors, sp).toEqual([]);
      expect(parseAttack(adultOf(a), {}, { strict: true }).errors, `${sp} adult`).toEqual([]);
      for (const level of [1, 2]) expect(readability(speciesAttack(sp, level)!, {}).warning, `${sp} ${level}`).toBeGreaterThanOrEqual(REACTION_FLOOR);
    }
    expect(speciesAttack("wolf", 0)).toBeNull(); expect(speciesAttack("wolf", 3)).toBeNull(); expect(speciesAttack("nobody", 1)).toBeNull();
  });

  it("grows its adult's: one more in its pattern, bigger and further, its children too", () => {
    const hog = adultOf(SPECIES_ATTACKS.hedgehog), fox = adultOf(SPECIES_ATTACKS.arcticfox);
    expect(hog.emit?.n).toBe(7); expect(hog.body?.radius).toBeCloseTo(0.6); expect(hog.cast?.range).toBeCloseTo(6.6);
    expect((fox.on!.expire![0].attack as AttackSpec).emit?.n).toBe(4);
  });

  it("gives every species in a biome its own style, and composes more the further out its phase", () => {
    const byBiome = new Map<string, string[]>(), byPhase = new Map<number, number[]>();
    for (const [sp, a] of Object.entries(SPECIES_ATTACKS)) {
      const k = KINDS_TABLE[sp], key = `${k.biome ?? "temperate"}`;
      byBiome.set(key, [...(byBiome.get(key) ?? []), `${styleOf(a)}`]);
      byPhase.set(k.phase, [...(byPhase.get(k.phase) ?? []), complexity(a)]);
    }
    for (const [biome, styles] of byBiome) expect(new Set(styles).size, `${biome}: ${styles.join(", ")}`).toBe(styles.length);
    const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
    const phases = [...byPhase.keys()].sort((a, b) => a - b), means = phases.map(p => mean(byPhase.get(p)!));
    for (let i = 1; i < means.length; i++) expect(means[i], `phase ${phases[i]} over ${phases[i - 1]}: ${means.map(m => m.toFixed(2))}`).toBeGreaterThan(means[i - 1]);
  });
});
