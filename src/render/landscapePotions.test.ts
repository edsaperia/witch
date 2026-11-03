import { afterEach, expect, it } from "vitest";
import type { Game } from "../rules/game";
import { POTION_RECIPES } from "../rules/potionRecipes";
import { potionSettings, resetPotionSettings, setPotionSetting } from "../rules/potionSettings";
import { borrowedClock, concertinaOffset, LANDSCAPE_POTIONS, landscapeState } from "../rules/landscapePotions";
import { potionFilterState } from "../platform/audio/potionFilter";
import { bendPoint } from "./height";
import { landscapeUniform } from "./landscapeUniforms";

afterEach(() => { resetPotionSettings(); landscapeUniform.value.set(0, 0, 0, 0); });

it.each(Object.entries(LANDSCAPE_POTIONS))("%s is a brewable, tunable trip with a matching audio fade", (effect, spec) => {
  const recipe = POTION_RECIPES.find(entry => entry.id === spec.id)!;
  expect(recipe.effect).toBe(effect);
  expect(recipe.comingSoon).toBe(false);
  const g = { clock: { time: 10 }, witches: [{ id: 7 }],
    mushrooms: { trips: { 7: { key: recipe.key, at: 10, until: 610 } } } } as unknown as Game;
  expect(landscapeState(g)?.setting).toBe(potionSettings(effect).value);
  expect(landscapeState(g)?.amount).toBe(1);
  setPotionSetting(effect, "value", 999);
  expect(landscapeState(g)?.setting).toBe(potionSettings(effect).value);
  g.clock.time = 550;
  expect(landscapeState(g)?.amount).toBe(.5);
  expect(potionFilterState(g).amount).toBe(.5);
  expect(potionFilterState(g).low).toBeGreaterThan(0);
  g.clock.time = 610;
  expect(landscapeState(g)).toBeUndefined();
  expect(potionFilterState(g).amount).toBe(0);
});

it("holds the concertina centre and bends CPU-projected markers with the landscape", () => {
  expect(concertinaOffset(7, 7, 1, 60)).toBe(0);
  expect(concertinaOffset(15, 0, .5, 60)).toBeCloseTo(concertinaOffset(15, 0, 1, 60) / 2);
  landscapeUniform.value.set(65, 1, 60, 0);
  expect(bendPoint({ x: 15, y: 0, z: 0 }).x).toBeCloseTo(15 + concertinaOffset(15, 0, 1, 60));
});

it("lets the borrowed scenery clock run backwards without reversing simulation time", () => {
  expect(borrowedClock(3, 0, 7)).toBe(3);
  expect(borrowedClock(4.1, 1, 7)).toBeLessThan(borrowedClock(4, 1, 7));
});
