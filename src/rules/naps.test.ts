// Wild idlers nap (Ed, 2026-10-06: "I think animals in wild areas which are idling can sleep. They awake when you are
// there in ground mode, but stay asleep if you're in treetop mode, or not in their area"): rules/creatures.ts NapRules.
import { describe, expect, it } from "vitest";
import type { Creature } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, type Tuning } from "./tuning";
import { cellKey } from "./party";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };

/** A wild area away from home, the witch high over it in the treetops, the game running. */
function overWild(t: Tuning = TUNING): { g: Game; key: string; at: { x: number; z: number } } {
  const g = newGame(77, t);
  g.clock.paused = false;
  g.witches[0].health.hp = 1e6;
  // (the wild area with the most wild creatures in it)
  const home = cellKey(g.map.centreCell), count = new Map<string, number>();
  for (const c of g.creatures) if (!c.boss && !c.gone) count.set(cellKey(c.cell), (count.get(cellKey(c.cell)) ?? 0) + 1);
  const cell = g.map.cells.map(c => ({ c, s: g.map.siteOf(c[0], c[1]), n: count.get(cellKey(c)) ?? 0 })).filter(({ c }) => cellKey(c) !== home && !g.party.areas.has(cellKey(c)))
    .sort((a, b) => b.n - a.n)[0];
  // (a point in it: its site, or where one of its creatures lives when the partition puts the site over the border)
  const key = cellKey(cell.c), inIt = (x: number, z: number) => cellKey(g.map.cellSafe(x, z).cell) === key;
  const one = g.creatures.find(c => cellKey(c.cell) === key && !c.boss && inIt(c.x, c.z));
  const at = inIt(cell.s.x, cell.s.z) || !one ? { x: cell.s.x, z: cell.s.z } : { x: one.x, z: one.z };
  g.witch = { ...g.witch, seated: false, x: at.x, z: at.z, vx: 0, vz: 0, mode: "treetop", lift: 1 };
  return { g, key, at };
}
const wildHere = (g: Game, key: string) => g.creatures.filter(c => cellKey(c.cell) === key && !c.gone && !c.leashed && !c.boss && !c.enraged);
const land = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: "ground", lift: 0, seated: false }; };

describe("wild idlers nap (Ed, 2026-10-06)", () => {
  it("has some of an area's idlers asleep at a time, not all, each for a while, with her in the treetops; never a legend", () => {
    const { g, key } = overWild(), list = wildHere(g, key);
    let most = 0, ever = new Set<number>(), woke = 0;
    run(g, 120, () => {
      const n = list.filter(c => c.asleep).length;
      most = Math.max(most, n);
      for (const c of list) { if (c.asleep) ever.add(c.id); else if (ever.has(c.id) && c.wakeUntil !== undefined) woke++; }
      for (const c of g.creatures) if (c.boss) expect(c.asleep).toBeFalsy();
    });
    expect(ever.size, "some nap").toBeGreaterThan(0);
    expect(most, "never all at once").toBeLessThan(list.length);
    expect(woke, "and get up again by themselves").toBeGreaterThan(0);
  }, 120_000);

  it("wakes them gently when she lands in their area: up over naps.wake, out of fights meanwhile, and no new naps while she's there", () => {
    const { g, key, at } = overWild();
    run(g, 90);
    const sleepers = wildHere(g, key).filter(c => c.asleep);
    expect(sleepers.length).toBeGreaterThan(0);
    land(g, at.x, at.z);
    run(g, 2 * STEP);
    for (const c of sleepers) { expect(c.asleep).toBeFalsy(); expect(c.wakeUntil).toBeGreaterThan(g.clock.time); }
    // getting up: no fight taken up before wake is over
    const wake = TUNING.naps!.wake;
    run(g, wake * 0.6, () => { for (const c of sleepers) expect(c.fight?.target ?? null).toBeNull(); });
    run(g, 20, () => { for (const c of wildHere(g, key)) expect(c.asleep, "no new nap with her on the ground here").toBeFalsy(); });
  }, 120_000);

  it("keeps them asleep with her in the treetops right over them, or on the ground in the next area, close to the border", () => {
    const { g, key } = overWild();
    run(g, 90);
    const sleepers = wildHere(g, key).filter(c => c.asleep && c.napUntil! > g.clock.time + 5);
    expect(sleepers.length).toBeGreaterThan(0);
    const s = sleepers[0];
    g.witch = { ...g.witch, x: s.x, z: s.z + 2 }; // (treetops, right over it)
    run(g, 2);
    expect(s.asleep).toBe(true);
    // on the ground just over the border, in the next area
    let x = s.x, z = s.z;
    for (let k = 1; k < 400; k++) { const q = g.map.cellSafe(s.x + k, s.z).cell; if (cellKey(q) !== key) { x = s.x + k + 3; z = s.z; break; } }
    expect(cellKey(g.map.cellSafe(x, z).cell)).not.toBe(key);
    land(g, x, z);
    run(g, 2);
    expect(s.asleep, "she's in another area").toBe(true);
  }, 120_000);

  it("wakes them when their area is partified, and lets no one nap with naps off", () => {
    const { g, key } = overWild();
    run(g, 90);
    const sleepers = wildHere(g, key).filter(c => c.asleep);
    expect(sleepers.length).toBeGreaterThan(0);
    const [cx, cy] = key.split(",").map(Number);
    g.party.areas.set(key, { cell: [cx, cy], at: g.clock.time, wave: 1 } as never);
    run(g, 2 * STEP);
    for (const c of sleepers) expect(c.asleep).toBeFalsy();
    const off = overWild({ ...TUNING, naps: { ...TUNING.naps!, on: false } });
    run(off.g, 60, () => { for (const c of off.g.creatures) expect(c.asleep).toBeFalsy(); });
  }, 120_000);

  it("leaves a sleep without napUntil (the party's over) alone: down till cleared, out of fights", () => {
    const { g, key, at } = overWild(), c: Creature = wildHere(g, key)[0];
    c.asleep = true;
    land(g, at.x, at.z);
    run(g, 3);
    expect(c.asleep).toBe(true);
    expect(c.fight?.target ?? null).toBeNull();
  }, 60_000);
});
