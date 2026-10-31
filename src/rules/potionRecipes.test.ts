import { describe, expect, it } from 'vitest';
import { MUSHROOM_COLOURS } from './mushrooms';
import { effectEnvelope, POTION_RECIPES, potionRecipe } from './potionRecipes';
describe('the developer potion recipe book', () => {
  it('covers all 165 combinations exactly once, independent of ingredient order', () => {
    expect(POTION_RECIPES).toHaveLength(165);
    expect(new Set(POTION_RECIPES.map(r => r.id)).size).toBe(165);
    expect(POTION_RECIPES.every(r => Number.isInteger(r.id) && r.id > 0)).toBe(true);
    expect(new Set(POTION_RECIPES.map(r => r.key)).size).toBe(165);
    for (const a of MUSHROOM_COLOURS) for (const b of MUSHROOM_COLOURS) for (const c of MUSHROOM_COLOURS) {
      const recipe = potionRecipe([a, b, c]);
      expect(recipe, `${a}+${b}+${c}`).toBeDefined();
      expect(recipe).toBe(potionRecipe([c, a, b]));
    }
    for (const r of POTION_RECIPES) {
      expect(r.name.length).toBeGreaterThan(0); expect(r.description.length).toBeGreaterThan(0);
      expect(r.recipe).toHaveLength(3); expect(r.recipe.every(c => MUSHROOM_COLOURS.includes(c))).toBe(true);
      if (r.effect.startsWith('unassigned-')) expect(r.comingSoon).toBe(true);
    }
  });
  it('starts at full strength on wake, stays full eight minutes, fades the last two', () => {
    const trip = { at: 100, until: 700 };
    expect(effectEnvelope(trip, 99)).toBe(0);
    expect(effectEnvelope(trip, 100)).toBe(1);
    expect(effectEnvelope(trip, 580)).toBe(1);
    expect(effectEnvelope(trip, 640)).toBe(.5);
    expect(effectEnvelope(trip, 700)).toBe(0);
    expect(effectEnvelope(trip, 800)).toBe(0);
    expect(effectEnvelope(undefined, 150)).toBe(0);
  });
});
