import { describe, expect, it } from 'vitest';
import type { Game } from '../rules/game';
import { POTION_RECIPES } from '../rules/potionRecipes';
import { sortedPotions, potionLabSnapshot, tryLabPotion } from './potionLab';
describe('potion lab', () => {
  it('reverses each sortable column without changing permanent IDs', () => {
    for (const column of ['mushrooms', 'effect', 'status'] as const) {
      expect(sortedPotions(column, true)).toEqual(sortedPotions(column).reverse());
      expect(new Set(sortedPotions(column).map(r => r.id)).size).toBe(165);
    }
  });
  it('tries implemented effects for ten game minutes and never pretends a pending effect works', () => {
    const g = { seed: 61, clock: { time: 100, paused: true }, witches: [{ id: 0 }], mushrooms: { affected: {}, trips: {} } } as unknown as Game;
    const recipe = POTION_RECIPES.find(r => !r.comingSoon)!;
    expect(tryLabPotion(g, recipe)).toBe(true);
    expect(g.mushrooms.trips[0]).toEqual({ recipe: recipe.recipe, key: recipe.key, at: 100, until: 700 });
    expect(g.clock.paused).toBe(true);
    expect(tryLabPotion(g, POTION_RECIPES.find(r => r.comingSoon)!)).toBe(false);
    const snapshot = potionLabSnapshot(g, recipe, 'test');
    expect(snapshot.recipe.id).toBe(recipe.id);
    expect(snapshot.seed).toBe(61);
    expect(snapshot.settings.effects['trip-indicator']).toBeDefined();
    expect(Object.keys(snapshot.settings.effects)).toHaveLength(10);
  });
});
