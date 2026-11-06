import { beforeAll, describe, expect, it } from 'vitest';
import { newGame, stepGame, STEP, coastOf, type Game } from './game';
import { TUNING } from './tuning';
import { MUSHROOM_BUSH_MARGIN, basketFill, basketNear, kitchenLayout, mushroomButton, newMushrooms, placeMushrooms, potionPhase, recipeKey, stepMushrooms } from './mushrooms';
import { stumpClearance, type ForestMap } from './map';
import { vi } from 'vitest';
import { isInside, beachOf } from './mapShape';
import { onLake } from './lakes';
let base: Game;
beforeAll(() => { base = newGame(123, TUNING); });
function game(players = 1) { return newGame(123, TUNING, players, base.map); }
function kitchen(g: Game, i = 0, type = 'red') {
  const b = kitchenLayout(g).baskets.find(b => b.type === type)!;
  Object.assign(g.witches[i].body, { x: b.x, z: b.z, mode: 'ground', perch: true, seated: false, vx: 0, vz: 0 });
}
function time(g: Game, her: number, world = her) { g.herTime = her; g.clock.time = world; stepMushrooms(g); }
function brew(g: Game) {
  kitchen(g); g.mushrooms.baskets.red = 3;
  for (let i = 0; i < 3; i++) expect(mushroomButton(g, g.witches[0], false, true)).toBe(true);
  time(g, .7);
}
describe('mushrooms and brewing', () => {
  it('keeps the inland recovery camera upright while preserving seaside stargazing', () => {
    const g = game(); kitchen(g); Object.assign(g.witch, { perch: false, stargazing: true });
    expect(coastOf(g)?.gazing).toBe(false);
    const shore = beachOf(g.map.bounds, g.tuning)!.coastAt(g.witch.x, g.witch.z);
    Object.assign(g.witch, shore);
    expect(coastOf(g)?.gazing).toBe(true);
  });
  it('places exactly one reachable seeded patch per non-home area', () => {
    const s = base.mushrooms;
    expect(s.patches).toHaveLength(base.map.cells.length - 1);
    expect(newMushrooms(base.map, base.forest, base.berries.bushes).patches).toEqual(s.patches);
    for (const p of s.patches) {
      expect(p.id).not.toBe(base.map.centreCell.join(','));
      expect(base.map.cellSafe(p.x, p.z).cell.join(',')).toBe(p.id);
      expect(isInside(base.map.bounds, p.x, p.z, 3)).toBe(true);
      expect(onLake(base.map.bounds, p.x, p.z, 2)).toBe(false);
      expect(base.forest.treesNear(p.x, p.z, 2).some(t => Math.hypot(t.x - p.x, t.z - p.z) < 1.8)).toBe(false);
    }
  });
  it('collects only on place, once, into hidden inventory with a puff; a new night regrows it', () => {
    const g = game(), p = g.mushrooms.patches[0], W = g.witches[0];
    Object.assign(W.body, { x: p.x, z: p.z, perch: false, seated: false, mode: 'ground' });
    expect(mushroomButton(g, W, false, true)).toBe(false);
    expect(mushroomButton(g, W, true, false)).toBe(true);
    expect(mushroomButton(g, W, true, false)).toBe(false);
    expect(g.mushrooms.carried[0]).toEqual([p.type]); expect(g.mushrooms.puffs).toHaveLength(1);
    expect(g.mushrooms.baskets[p.type]).toBe(0);
    expect(newMushrooms(g.map, g.forest).patches.every(p => !p.picked)).toBe(true);
  });
  it('unloads two per second and only credits baskets when their arcs land', () => {
    const g = game(); kitchen(g); g.mushrooms.carried[0] = ['red', 'blue', 'red'];
    time(g, 0); expect(g.mushrooms.flights).toHaveLength(1); expect(g.mushrooms.baskets.red).toBe(0);
    time(g, .49); expect(g.mushrooms.flights).toHaveLength(1);
    time(g, .5); expect(g.mushrooms.flights).toHaveLength(2);
    time(g, .7); expect(g.mushrooms.baskets.red).toBe(1); expect(g.mushrooms.flights).toHaveLength(1);
    time(g, 1); expect(g.mushrooms.carried[0]).toHaveLength(0);
    time(g, 2); expect(g.mushrooms.baskets.red).toBe(2); expect(g.mushrooms.baskets.blue).toBe(1);
  });
  it('reserves three ingredients in flight; starts smoke on the third plop, not keypress', () => {
    const g = game(); kitchen(g); g.mushrooms.baskets.red = 8;
    expect(basketNear(g)?.type).toBe('red');
    for (let i = 0; i < 5; i++) mushroomButton(g, g.witches[0], false, true);
    expect(g.mushrooms.flights).toHaveLength(3); expect(g.mushrooms.baskets.red).toBe(5);
    expect(g.mushrooms.smoke).toBeNull(); time(g, .7);
    expect(g.mushrooms.smoke?.recipe).toEqual(['red', 'red', 'red']); expect(g.mushrooms.plops).toHaveLength(3);
  });
  it('affects late entrants, spins through the smoke, falls, sleeps, wakes and holds stargazing', () => {
    const g = game(3); brew(g);
    expect(potionPhase(g)).toBe('spin'); expect(g.mushrooms.affected[1]).toBeUndefined();
    kitchen(g, 1); time(g, 3);
    expect(potionPhase(g, g.witches[1])).toBe('spin'); expect(g.mushrooms.affected[2]).toBeUndefined();
    const p = g.mushrooms.affected[0]; time(g, p.fallAt);
    expect(potionPhase(g)).toBe('fall'); expect(g.witch.perch).toBe(true);
    expect(g.mushrooms.smoke?.until).toBeCloseTo(10.7, 12); // (it hangs ten seconds over the reach: Ed, 2026-11-03)
    time(g, p.landAt); expect(g.witch.perch).toBe(false); expect(g.witch.stargazing).toBe(true); expect(potionPhase(g)).toBe('sleep');
    time(g, p.wakeAt, 12); expect(potionPhase(g)).toBe('recover'); expect(g.mushrooms.trips[0].until).toBe(612);
    time(g, p.freeAt, 13); expect(potionPhase(g)).toBeNull(); expect(g.witch.stargazing).toBe(true);
    expect(g.mushrooms.smoke).toBeNull(); expect(g.mushrooms.ingredients).toHaveLength(0);
  });
  it('replaces a trip and measures expiry on game time only', () => {
    const g = game(); g.mushrooms.trips[0] = { recipe: ['blue', 'blue', 'blue'], key: 'old', at: 0, until: 999 };
    brew(g); time(g, g.mushrooms.affected[0].wakeAt, 100);
    expect(g.mushrooms.trips[0].key).toBe('red+red+red'); expect(g.mushrooms.trips[0].until).toBe(700);
    time(g, 2000, 699.99); expect(g.mushrooms.trips[0]).toBeDefined();
    time(g, 2001, 700); expect(g.mushrooms.trips[0]).toBeUndefined();
    expect(recipeKey(['blue', 'red', 'red'])).toBe(recipeKey(['red', 'blue', 'red']));
  });
  it('uses the agreed basket thresholds', () => {
    expect([0, 1, 5, 6, 15, 16].map(basketFill)).toEqual(['empty', 'half', 'half', 'full', 'full', 'overflowing']);
  });
  it('blocks movement and dodge during recovery in the real game step', () => {
    const g = game(); brew(g); const p = g.mushrooms.affected[0]; time(g, p.wakeAt, 12);
    g.clock.paused = false; const before = { x: g.witch.x, z: g.witch.z };
    stepGame(g, { moveX: 1, moveZ: 1, toggleMode: true, dash: true, place: true, zoom: 0 }, STEP);
    expect(g.witch.x).toBe(before.x); expect(g.witch.z).toBe(before.z); expect(g.witch.stargazing).toBe(true);
  });
  // Ed, 2026-11-06: "Mushrooms shouldn't grow on berry patches, paths, stump fight areas, etc."
  it('grows no mushroom in a stump\'s arena, by a berry bush, on a path or on kept ground', () => {
    const { map } = base, clear = stumpClearance(map.tuning), bushGap = map.tuning.berries.patch.radius + MUSHROOM_BUSH_MARGIN;
    expect(clear).toBe(55);
    for (const p of base.mushrooms.patches) {
      expect(map.stoneGap(p.x, p.z)).toBeGreaterThanOrEqual(clear);
      for (const b of base.berries.bushes) expect(Math.hypot(b.x - p.x, b.z - p.z)).toBeGreaterThanOrEqual(bushGap);
      expect(map.paths.at(p.x, p.z, 2)).toBeNull();
      expect(map.hardClear(p.x, p.z)).toBe(false); // (beach sand, lake shores, legends' and the challenge's circles, stumps' roots...)
      expect(map.reserved(p.x, p.z, 2)).toBe(false);
    }
  });
  it('with no ground off the paths, grows on a path (Ed, 2026-11-06: "If no valid spot, on a path is ok."); with none at all, skips the area and says so', () => {
    // (four areas of the night's map: each search here sweeps an area's whole vicinity, twice)
    const { forest } = base, bushes = base.berries.bushes, map = Object.assign(Object.create(base.map) as ForestMap, { cells: base.map.cells.slice(0, 5) });
    const everywhere = Object.assign(Object.create(map) as ForestMap, { paths: Object.assign(Object.create(map.paths), { at: () => ({ kind: 'path', line: 0, d: 0, seg: 0 }) }) });
    const info = vi.spyOn(console, 'info').mockImplementation(() => {}), warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const onPaths = placeMushrooms(everywhere, forest, bushes);
      expect(onPaths).toHaveLength(map.cells.filter(c => c.join() !== map.centreCell.join()).length);
      for (const p of onPaths) { expect(map.stoneGap(p.x, p.z)).toBeGreaterThanOrEqual(stumpClearance(map.tuning)); expect(map.hardClear(p.x, p.z)).toBe(false); }
      expect(info.mock.calls.filter(c => String(c[0]).includes('on or by a path'))).toHaveLength(onPaths.length);
      const nowhere = Object.assign(Object.create(map) as ForestMap, { hardClear: () => true });
      expect(placeMushrooms(nowhere, forest, bushes)).toEqual([]);
      expect(warn.mock.calls.filter(c => String(c[0]).includes('no ground'))).toHaveLength(onPaths.length);
    } finally { info.mockRestore(); warn.mockRestore(); }
  });
});
