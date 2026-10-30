import { expect, test, vi } from "vitest";
import type { Game } from "../rules/game";
import type { Observation } from "./observe";
import { EXPERT_LIMITS, newExpert, type ExpertTrace } from "./expert";

// Pure scripted observations: no newGame, stepping, map generation or simulation.
vi.mock("./observe", () => ({ newObserver: () => (g: { fixture: Observation }) => structuredClone(g.fixture) }));
const observation = (): Observation => ({ playerTime: 0, worldTime: 0,
  self: { x: 0, z: 0, mode: "ground", hp: 3, ko: false, seated: false, perched: false, grounded: false },
  range: 30, pickRadius: 4, spacing: 4, castRadius: 5, castBlocked: false, waiting: false, home: { x: 0, z: 0 },
  carried: [], creatures: [], stones: [], loose: [], placed: [], next: null, straggler: null,
  legends: [], alarms: [], windups: [], quests: [], find: null, relics: [] });
const fixtures = Array.from({ length: 960 }, (_, i) => {
  const o = observation(); o.playerTime = i / 60; o.worldTime = i / 60;
  const phase = Math.floor(i / 60);
  if (phase === 0) o.self.seated = true;
  if (phase === 1) o.waiting = true;
  if (phase === 2) o.self.ko = true;
  if (phase === 3) o.self.hp = 1;
  if (phase === 4) o.find = { x: 10, z: 0 };
  if (phase >= 5 && phase < 12) o.quests = [{ id: 1, wants: "hare", open: phase !== 11, delivery: { x: 20, z: 0 }, hint: { x: 100, z: 0 } }];
  if (phase === 6) o.carried = [{ id: 8, species: "hare", level: 1 }];
  if (phase === 7) o.loose = [{ id: 8, x: 2, z: 0 }];
  if (phase === 8) o.stones = [{ key: "1,1", x: 0, z: 0, open: true, ready: true, cast: { x: 0, z: 0 } }];
  if (phase === 9) o.creatures = [{ id: 8, species: "hare", level: 1, boss: false, friendly: false, angry: false, stunned: false, area: "1,1", rune: null, x: 20, z: 0 }];
  if (phase === 10) o.windups = [{ x: 2, z: 0 }];
  if (phase === 12) o.creatures = [{ id: 2, species: "fox", level: 3, boss: true, friendly: false, angry: false, stunned: false, area: "2,2", rune: null, x: 30, z: 0 }];
  if (phase === 13) o.next = { x: 100, z: 0 };
  if (phase === 14) o.self.mode = "treetop";
  return o;
});
for (const questMax of [1, 2]) test(`diagnostic output preserves every control, questMax=${questMax}`, () => {
  const events: ExpertTrace[] = [];
  const plain = newExpert({ questMax }, 123), logged = newExpert({ questMax }, 123, EXPERT_LIMITS, e => events.push(e));
  const mutating = newExpert({ questMax }, 123, EXPERT_LIMITS, e => {
    e.controls.moveX = 999; e.observation.self.hp = -999; e.knownQuests.length = 0; e.heardDreams.push(999);
  });
  for (const fixture of fixtures) {
    const g = { fixture } as unknown as Game, expected = plain.decide(g);
    expect(logged.decide(g)).toEqual(expected); expect(mutating.decide(g)).toEqual(expected);
  }
  expect(events.length).toBeGreaterThan(80);
  expect(events.every(e => e.playerTime - e.observation.playerTime >= .25 - 1e-9)).toBe(true);
  expect(events.some(e => e.selectedQuest === 1)).toBe(true);
  expect(events.some(e => e.controls.fire)).toBe(true);
  expect(events.some(e => e.doing === "bringing a requested sigil to a legend")).toBe(true);
});
