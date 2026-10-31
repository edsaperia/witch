import { afterEach, describe, expect, it } from 'vitest';
import { POTION_PARAMETERS, potionSettings, potionSettingsSnapshot, resetPotionSettings, setPotionSetting } from './potionSettings';
import { potionBloom, potionBend, potionCamera, potionLevels, tripIndicatorStrength } from '../render/potionEffects';
import { POTION_RECIPES } from './potionRecipes';
import type { Game } from './game';

afterEach(() => resetPotionSettings());
describe('live potion controls', () => {
  it('exposes defaults for all implemented effects and copies independent complete settings', () => {
    for (const recipe of POTION_RECIPES.filter(r => !r.comingSoon)) expect(POTION_PARAMETERS[recipe.effect]?.length).toBeGreaterThan(0);
    const snapshot = potionSettingsSnapshot();
    for (const [effect, parameters] of Object.entries(POTION_PARAMETERS)) for (const p of parameters) {
      expect(snapshot.effects[effect][p.key]).toBe(p.default);
      expect(p.default).toBeGreaterThanOrEqual(p.min); expect(p.default).toBeLessThanOrEqual(p.max);
    }
    snapshot.effects['big-moon'].size = 900;
    expect(potionSettings('big-moon').size).toBe(10);
  });
  it('clamps unsafe values, ignores unknown fields, changes renderer values immediately and resets', () => {
    setPotionSetting('big-moon', 'size', 999); expect(potionSettings('big-moon').size).toBe(40);
    setPotionSetting('big-moon', 'size', NaN); expect(potionSettings('big-moon').size).toBe(40);
    setPotionSetting('big-moon', 'unknown', 1); expect(potionSettings('big-moon').unknown).toBeUndefined();
    setPotionSetting('glow-up', 'minimumBoost', 7); expect(potionBloom(.8, .1, 1).strength).toBe(7.1);
    setPotionSetting('ravine', 'minimumBend', .02); expect(potionBend(.001, .001, 1, 0)).toBe(-.02);
    setPotionSetting('vertigo', 'distance', 3); expect(potionCamera(35, 80, 50, 1).distance).toBe(240);
    setPotionSetting('vertigo', 'fov', 30); expect(potionCamera(35, 80, 50, 1).fov).toBe(30);
    setPotionSetting('thick-canopy', 'blackFloor', 0); expect(potionLevels(.03, 1, 1).black).toBe(0);
    resetPotionSettings('big-moon'); expect(potionSettings('big-moon').size).toBe(10);
    expect(potionSettings('vertigo').distance).toBe(3);
    expect(potionCamera(35, 80, 50, 0).distance).toBe(80);
  });
  it('shows the shared trip indicator even for coming-soon recipes, then fades and clears it', () => {
    const recipe = POTION_RECIPES.find(r => r.comingSoon)!;
    const g = { witches: [{ id: 9 }], clock: { time: 99 }, mushrooms: { trips: { 9: { key: recipe.key, at: 100, until: 700 } } } } as unknown as Game;
    expect(tripIndicatorStrength(g)).toBe(0);
    g.clock.time = 100; expect(tripIndicatorStrength(g)).toBe(1);
    g.clock.time = 640; expect(tripIndicatorStrength(g)).toBe(.5);
    g.clock.time = 700; expect(tripIndicatorStrength(g)).toBe(0);
    delete g.mushrooms.trips[9]; expect(tripIndicatorStrength(g)).toBe(0);
  });
});
