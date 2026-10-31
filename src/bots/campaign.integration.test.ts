import { expect, test } from "vitest";
import { newGame, stepGame } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING, withTuning } from "../rules/tuning";
import { newExpert } from "./expert";
import { newObserver } from "./observe";
const make = smallWorld(newGame, "Actual expert controls at a berry patch; no full-night strength evaluation.");

test("the expert grows and retrieves a baby through real sigil controls and berry rules", () => {
  const g = make(1000, withTuning({ cast: { ...TUNING.cast, on: false } })), w = g.witches[0];
  g.trunk = null; g.loose = []; g.relics = [];
  g.clock.paused = false;
  for (const c of g.creatures) c.gone = true;
  const baby = g.creatures.find(c => !c.boss)!;
  const remote = g.creatures.find(c => !c.boss && c.id !== baby.id)!;
  Object.assign(remote, { gone: false, x: w.body.x + 1500, z: w.body.z + 1500 });
  const berry = g.berries.bushes[g.berries.berries[0].bush];
  Object.assign(w.body, { x: berry.x, z: berry.z, seated: false, perch: false, mode: "ground", lift: 0 });
  Object.assign(baby, { gone: false, leashed: true, level: 0, x: berry.x, z: berry.z, cell: g.map.cellSafe(berry.x, berry.z).cell });
  w.leash.stack = [baby.id];
  const bot = newExpert({}, 1, undefined, undefined, { guardedCoverageExploration: false });
  let dropped = false, retrieved = false;
  for (let i = 0; i < 1200 && !retrieved; i++) {
    stepGame(g, bot.decide(g), 1 / 60);
    if (w.leash.placed.some(p => p.id === baby.id)) dropped = true;
    if (dropped && baby.level > 0 && w.leash.stack.includes(baby.id)) retrieved = true;
  }
  expect(dropped, JSON.stringify({ doing: bot.doing, level: baby.level, stack: w.leash.stack, placed: w.leash.placed, time: g.herTime, body: w.body, observation: newObserver()(g).campaign })).toBe(true);
  expect(baby.level).toBe(1); expect(retrieved).toBe(true);
});

test("unrevealed route, remote berries and remote troop positions do not escape the observer", () => {
  const g = make(1000, TUNING), w = g.witches[0], observe = newObserver();
  g.party.spellAt = null;
  expect(observe(g).campaign!.route).toEqual([]);
  const bush = g.berries.bushes.find(p => Math.abs(p.x - w.body.x) > 1000)!;
  if (bush) { const before = observe(g); bush.x += 100; expect(observe(g)).toEqual(before); }
  const c = g.creatures.find(c => !c.boss)!;
  c.leashed = true; w.leash.stack = [c.id]; c.x = w.body.x + 10000; c.z = w.body.z + 10000;
  const before = observe(g); c.x += 1000; c.z += 1000;
  expect(observe(g)).toEqual(before);
  expect(before.campaign!.troops[0].x).toBe(w.body.x);
});

test("an adult is posted with real controls and is not immediately collected again", () => {
  const g = make(1000, withTuning({ cast: { ...TUNING.cast, on: false } })), w = g.witches[0];
  g.clock.paused = false; g.party.bootUntil = 0; g.trunk = null; g.relics = []; g.loose = [];
  for (const c of g.creatures) c.gone = true;
  const adult = g.creatures.find(c => !c.boss)!, next = g.party.next[0];
  const at = g.map.soundsystemSpot(next[0], next[1]);
  Object.assign(w.body, { x: at.x + 24, z: at.z + 24, seated: false, perch: false, mode: "ground", lift: 0 });
  Object.assign(adult, { gone: false, leashed: true, level: 2, x: w.body.x, z: w.body.z }); w.leash.stack = [adult.id];
  const remote = g.creatures.find(c => !c.boss && c.id !== adult.id)!;
  Object.assign(remote, { gone: false, x: w.body.x + 1500, z: w.body.z + 1500 });
  const bot = newExpert({}, 1, undefined, undefined, { guardedCoverageExploration: false });
  for (let i = 0; i < 300; i++) stepGame(g, bot.decide(g), 1 / 60);
  expect(w.leash.stack).not.toContain(adult.id);
  const placed = w.leash.placed.find(p => p.id === adult.id);
  expect(placed).toBeDefined(); expect(Math.hypot(placed!.x - at.x, placed!.z - at.z)).toBeLessThan(60);
});
