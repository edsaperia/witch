// The hydra's heads take turns (Ed, 2026-11-13: "it would be cool if the hydra did attacks with alternating heads"): its attack
// (config/species-attacks.json `hydra`) is a burst of three, one shot a head, left, middle, right and round again, each setting
// off from its own head's side of the caster (rules/attacks/engine.ts `headOf`, emit.heads), with the same venom, homing, pools
// and damage a cast as when it fanned three at once.
import { expect, it } from "vitest";
import { cast, headOf, newSpells, stepSpells, type Hittable, type SpellWorld } from "./engine";
import { SPECIES_ATTACKS } from "./species";
import type { AttackSpec } from "./index";

const STEP = 1 / 60, hydra = SPECIES_ATTACKS.hydra as AttackSpec;

it("spits one bolt a head in turn, left, middle, right, from that head's side, the same three a cast", () => {
  const her: Hittable = { kind: "witch", id: "her", x: 18, z: 0, r: 0.3, side: "party" }, caster = { kind: "creature" as const, id: 1, x: 0, z: 0, r: 0.5, side: "wild", species: "hydra" };
  const W: SpellWorld = { seed: 7, near: () => [], hostile: (side, t) => t.side !== side, harm: () => {}, where: (kind, id) => (kind === "creature" && id === 1 ? caster : kind === "witch" ? her : null) };
  const S = newSpells(), born: { head: number | undefined; at: number; side: number; element: string }[] = [], seen = new Set<number>();
  cast(S, W, hydra, "hydra", { id: 1, x: 0, z: 0, side: "wild", species: "hydra" }, her, 0, 1);
  for (let t = STEP; t <= 2.5; t += STEP) { stepSpells(S, W, {}, t, STEP); for (const b of S.bodies) if (b && b.depth === 0 && !seen.has(b.id)) { seen.add(b.id); born.push({ head: b.head, at: b.born, side: b.oz, element: b.element }); } }
  // three shots, as before, and the same venom
  expect(born.length).toBe(3); expect(hydra.emit?.n).toBe(3); expect(hydra.hit?.damage).toBe(0.35); expect(born.every(b => b.element === "venom")).toBe(true);
  expect(hydra.path?.some(t => "home" in t)).toBe(true); expect(hydra.on?.expire?.length).toBe(1);
  // one head after another: 0 (its left), 1, 2
  expect(born.map(b => b.head)).toEqual([0, 1, 2]);
  // the first as its wind-up ends, the others a gap apart
  const gap = hydra.emit?.gap ?? 0, windup = hydra.cast?.windup ?? 0;
  born.forEach((b, k) => expect(b.at).toBeCloseTo(windup + k * gap, 1));
  // each from its own side: aimed along +x, its left is -z, its middle the middle, its right +z
  expect(born[0].side).toBeLessThan(-0.3); expect(Math.abs(born[1].side)).toBeLessThan(0.05); expect(born[2].side).toBeGreaterThan(0.3);
});

it("goes round again past its last head", () => {
  expect([0, 1, 2, 3, 4, 5, 6].map(k => headOf(hydra, k))).toEqual([0, 1, 2, 0, 1, 2, 0]);
  expect(headOf({ emit: { pattern: "burst", n: 3 } }, 1)).toBe(-1);
});
