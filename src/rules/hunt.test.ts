// The hunt (Ed, 2026-10-07): woken, a wild area's own young and adults fight her until she's knocked out or they're invited;
// all invited, its runestone transforms (rules/hunt.ts).
import { describe, expect, it } from "vitest";
import { hitWitch, newGame, stepGame, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey } from "./party";
import { befriend } from "./creatureStates";
import { holdsArea, wildLeft } from "./clear";
import type { Creature } from "./creatures";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs * 60); i++) { stepGame(g, still, 1 / 60); each?.(); } };
const W = TUNING.wildWatch!;

/** A game under way, she landed by a wild area's young or adult (an area with at least two of them), her health endless. */
function landed(): { g: Game; key: string; natives: () => Creature[] } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witches[0].health.hp = 1e6;
  run(g, 0.1);
  const home = cellKey(g.map.centreCell), by = new Map<string, Creature[]>();
  for (const c of g.creatures) if (holdsArea(c) && c.level > 0 && c.level < 3) { const k = cellKey(c.cell); if (k !== home && !g.party.areas.has(k)) by.set(k, [...(by.get(k) ?? []), c]); }
  const [key, list] = [...by].find(([k, l]) => l.length >= 2 && l.some(c => cellKey(g.map.cellSafe(c.x, c.z).cell) === k))!;
  const c = list.find(c => cellKey(g.map.cellSafe(c.x, c.z).cell) === key)!;
  g.witch = { ...g.witch, seated: false, x: c.x + 3, z: c.z, vx: 0, vz: 0, mode: "ground", lift: 0 };
  const natives = () => g.creatures.filter(o => cellKey(o.cell) === key && holdsArea(o) && o.level > 0 && o.level < 3);
  return { g, key, natives };
}

describe("the hunt (Ed, 2026-10-07: 'fight with me until either I die or they are invited')", () => {
  it("once the watch is over, every awake young and adult of the area hunts her; never its babies, legend or circle baby", () => {
    const { g, key, natives } = landed();
    run(g, W.on ? W.time - 0.5 : 0.1);
    if (W.on) expect(natives().some(c => c.hunting !== undefined), "not during the watch").toBe(false);
    run(g, 1.5);
    const awake = natives().filter(c => !c.asleep && !c.dazed);
    expect(awake.length).toBeGreaterThan(0);
    for (const c of awake) expect(c.hunting, `${c.id}`).toBe(0);
    for (const c of g.creatures) if (cellKey(c.cell) === key && (c.level === 0 || c.boss || c.circle)) expect(c.hunting).toBeUndefined();
  }, 120000);

  it("she leaves their area: they lose interest and go home, as before (Ed: 'as they did before')", () => {
    const { g, key, natives } = landed();
    run(g, (W.on ? W.time : 0) + 1);
    const hunters = natives().filter(c => c.hunting === 0);
    expect(hunters.length).toBeGreaterThan(0);
    const d0 = g.map.dancefloor, away = { x: g.witch.x - d0.x, z: g.witch.z - d0.z }, n = Math.hypot(away.x, away.z) || 1;
    // she walks 220 m straight on, away from home (and out of the area), then stands
    const start = { x: g.witch.x, z: g.witch.z };
    let left = false, wasOut = false;
    run(g, 30, () => {
      // out of their area since the step before, no creature of it hunts her
      if (wasOut) for (const c of hunters) expect(c.hunting, `${c.id} still hunting`).toBeUndefined();
      const w = g.witch;
      if (Math.hypot(w.x - start.x, w.z - start.z) < 220) g.witch = { ...w, x: w.x + (away.x / n) * 0.2, z: w.z + (away.z / n) * 0.2 };
      wasOut = cellKey(g.map.cellSafe(g.witch.x, g.witch.z).cell) !== key;
      left ||= wasOut;
    });
    expect(left, "she left the area").toBe(true);
    const near = hunters.filter(c => !c.gone && c.state !== "happy" && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 40);
    expect(near.length, "they've turned back").toBe(0);
  }, 180000);

  it("all of the area's own invited, its stone transforms", () => {
    const { g, key, natives } = landed();
    run(g, (W.on ? W.time : 0) + 1);
    expect(natives().some(c => c.hunting === 0)).toBe(true);
    const [cx, cy] = key.split(",").map(Number) as [number, number];
    for (const c of wildLeft(g.creatures, [cx, cy])) befriend(c, g.clock.time);
    run(g, 0.5);
    expect(g.party.areas.has(key)).toBe(true);
    expect(natives().some(c => c.hunting !== undefined)).toBe(false);
  }, 120000);

  it("knocked out, the hunt ends: they give up and go home, and her next visit starts with the watch again", () => {
    const { g, key, natives } = landed();
    run(g, (W.on ? W.time : 0) + 1);
    const hunters = natives().filter(c => c.hunting === 0);
    expect(hunters.length).toBeGreaterThan(0);
    g.witches[0].health.hp = 1;
    for (let i = 0; i < 50 && !g.witches[0].ko; i++) hitWitch(g, 0, g.clock.time + i * (TUNING.witchHealth.grace + 0.05));
    expect(g.witches[0].ko).toBeTruthy();
    run(g, 0.1);
    for (const c of hunters) expect(c.hunting).toBeUndefined();
    expect(hunters.some(c => c.retreat)).toBe(true);
    expect(g.wildEntry.has(key)).toBe(false);
  }, 120000);
});
