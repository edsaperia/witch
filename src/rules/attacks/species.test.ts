// Each species' own attack (config/species-attacks.json, rules/attacks/species.ts; step 5 of docs/plans/attack-grammar.md): every
// species has one, each as written at least the reaction floor and its adult's too; within each biome no two alike in style; and
// the further out its island's phase the more it composes (Ed, 2026-10-27).
import { describe, expect, it } from "vitest";
import { KINDS_TABLE } from "../kinds";
import { CREATURE_IDS } from "../creatureConfig";
import { adultOf, legendAttack, legendOf, SPECIES_ATTACKS, speciesAttack } from "./species";
import { LEGENDS } from "../legends";
import { parseAttack, readability, REACTION_FLOOR, type AttackSpec } from "./index";
import { ownWarning } from "./timeline";
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
  const children = new Set<string>();
  for (const list of Object.values(a.on ?? {})) for (const c of list as Child[]) {
    // One child composition may happen on a hit or on a miss; count its structure once.
    const key = JSON.stringify(c); if (children.has(key)) continue; children.add(key);
    n += 1 + (typeof c.attack === "object" ? complexity(c.attack) : 0);
  }
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

  it("grows the same species tree into broader, longer-ranged adult attacks, including its children", () => {
    const hog = adultOf(SPECIES_ATTACKS.hedgehog), fox = adultOf(SPECIES_ATTACKS.arcticfox);
    expect(hog.emit?.n).toBe(9); expect(hog.body?.radius).toBeCloseTo(0.75); expect(hog.cast?.range).toBeCloseTo(13.5);
    expect((fox.on!.expire![0].attack as AttackSpec).emit?.n).toBe(5);
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

  it("gives each kind's legend its attack exaggerated: thrown from afar with a long warning, bursting into its kind's own, bigger and more of it", () => {
    const A = LEGENDS.attack, L = { range: A.range, windup: A.windup, interval: A.interval, flight: A.lobFlight, radius: A.lobRadius };
    for (const sp of Object.keys(SPECIES_ATTACKS)) {
      const raw = legendOf(SPECIES_ATTACKS[sp], L), a = legendAttack(sp, L)!;
      expect(parseAttack(raw, {}, { strict: true }).errors, sp).toEqual([]);
      expect(a.cast?.range, sp).toBe(A.range);
      // (low threat, long readable warnings: the throw's own, its windup and its flight (a beam's, its charge), and every part of the
      // burst at least the floor, each showing its own as it goes)
      expect(ownWarning(a, false), sp).toBeGreaterThanOrEqual(A.windup + (a.body?.kind === "beam" ? 1.2 : A.lobFlight));
      expect(readability(a, {}).warning, sp).toBeGreaterThanOrEqual(REACTION_FLOOR);
    }
    expect(legendAttack("salamander", L)!.beam?.length).toBe(A.range); // (a giant beam across its whole reach)
    const hog = legendAttack("hedgehog", L)!, burst = hog.on!.land![0].attack as AttackSpec;
    expect(hog.body?.kind).toBe("lob"); expect(burst.emit?.n).toBe(12); // Its species' ring, with the artillery profile's density.
    expect((legendAttack("dormouse", L)!.on!.land![0].attack as AttackSpec).emit).toMatchObject({ pattern: "fan", n: 3 }); // (a single becomes three)
    expect((legendAttack("wolf", L)!.on!.land![0].attack as AttackSpec).body?.kind).toBe("area"); // (a lunge becomes a great slam)
  });
});
