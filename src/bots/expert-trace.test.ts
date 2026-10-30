import { afterAll, expect, test, vi } from "vitest";
import type { Game } from "../rules/game";
import type { Observation } from "./observe";
import { EXPERT_LIMITS, newExpert, type ExpertTrace } from "./expert";

// Pure scripted observations: no newGame, stepping, map generation or simulation.
// The project uses isolate:false: expert.test may already have cached the real
// observer. Reset before this file's imports, then leave no mock/cache behind.
vi.hoisted(() => vi.resetModules());
vi.mock("./observe", () => ({ newObserver: () => (g: { fixture: Observation }) => structuredClone(g.fixture) }));
afterAll(() => { vi.doUnmock("./observe"); vi.resetModules(); });
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

const legend = () => ({ id: 9, species: "fox", level: 3, boss: true, friendly: false, angry: false,
  stunned: false, area: "1,1", rune: null, x: 30, z: 0 });
function visitScript(rememberDreamVisits: boolean, change: (o: Observation, t: number) => void, end = 6) {
  const events: ExpertTrace[] = [], bot = newExpert({}, 123, EXPERT_LIMITS, e => events.push(e), { rememberDreamVisits });
  for (let i = 0; i <= end * 60; i++) {
    const o = observation(), t = i / 60; o.playerTime = t; o.worldTime = t;
    o.next = { x: -100, z: 0 }; if (t < .5) o.creatures = [legend()]; change(o, t);
    bot.decide({ fixture: o } as unknown as Game);
  }
  return events;
}
test("a selected dream visit remembers only its observed position after it leaves view", () => {
  const on = visitScript(true, () => {}), off = visitScript(false, () => {});
  const at2 = (events: ExpertTrace[]) => events.find(e => e.observation.playerTime >= 2)!;
  expect(at2(on).observation.creatures).toEqual([]);
  expect(at2(on).dreamVisit).toEqual({ id: 9, x: 30, z: 0, until: 30 });
  expect(at2(on).visitingLegend).toBe(9); expect(at2(on).controls.moveX).toBeGreaterThan(0);
  expect(at2(off).visitingLegend).toBeNull(); expect(at2(off).controls.moveX).toBeLessThan(0);
});
for (const open of [true, false]) test(`arrival alone never marks a dream read; real ${open ? "open" : "closed"} cue releases job`, () => {
  const events = visitScript(true, (o, t) => {
    if (t >= 1) { o.self.x = 34; o.self.z = 4; }
    if (t >= 3) o.quests = [{ id: 9, wants: open ? "hare" : "", open, delivery: { x: 34, z: 4 }, hint: null }];
  });
  const arrived = events.find(e => e.observation.playerTime >= 2)!;
  expect(arrived.visitingLegend).toBe(9); expect(arrived.heardDreams).toEqual([]);
  const read = events.find(e => e.observation.playerTime >= 3)!;
  expect(read.dreamVisit).toBeNull(); expect(read.heardDreams).toContain(9);
  expect(read.knownQuests.map(q => q.id)).toEqual(open ? [9] : []);
});
test("healing, KO and audible dodge interrupt the visit without replacing its destination", () => {
  const events = visitScript(true, (o, t) => {
    if (t >= 1 && t < 2) o.self.hp = 1;
    if (t >= 2 && t < 3) o.self.ko = true;
    if (t >= 3 && t < 4) o.windups = [{ x: 2, z: 0 }];
  });
  for (const [t, doing] of [[1.2, "rising to heal"], [2.2, "recovering"], [3.2, "dodging an audible wind-up"]] as const) {
    const e = events.find(e => e.observation.playerTime >= t)!;
    expect(e.doing).toBe(doing); expect(e.dreamVisit?.id).toBe(9); expect(e.dreamVisit?.until).toBe(30);
  }
  expect(events.find(e => e.observation.playerTime >= 4.2)!.visitingLegend).toBe(9);
});
for (const interrupted of [false, true]) test(`the 30-second deadline cannot renew or restart, interrupted=${interrupted}`, () => {
  const events = visitScript(true, (o, t) => {
    o.creatures = [{ ...legend(), x: t > 1 ? 40 : 30 }];
    if (interrupted && t >= 1 && t < 31) o.self.ko = true;
  }, 32);
  expect(events.filter(e => e.dreamVisit).every(e => e.dreamVisit!.until === 30)).toBe(true);
  const expired = events.filter(e => e.observation.playerTime >= 30);
  expect(expired.length).toBeGreaterThan(1);
  expect(expired.every(e => e.dreamVisit === null && e.visitingLegend === null)).toBe(true);
  expect(expired.at(-1)!.heardDreams).toEqual([]);
});
