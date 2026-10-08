// A 💌 wakes the area (Ed, 2026-10-08; rules/inviteWakes.ts): a letter landing on a wild creature ends its area's watch at
// once, and its young and adults, napping or not, go for her straight away, by the hunt's rules.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { cellKey } from "./party";
import { holdsArea } from "./clear";
import type { Creature } from "./creatures";
import { wakeOnInvites } from "./inviteWakes";

const W = TUNING.wildWatch!;

/** A game under way, she landed 3 m east of one of a wild area's young or adults (an area with at least two), her health endless. */
function landed(t: Tuning = TUNING): { g: Game; key: string; target: Creature; natives: () => Creature[] } {
  const g = newGame(123, t);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witches[0].health.hp = 1e6;
  stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
  const home = cellKey(g.map.centreCell), by = new Map<string, Creature[]>();
  for (const c of g.creatures) if (holdsArea(c) && c.level > 0 && c.level < 3) { const k = cellKey(c.cell); if (k !== home && !g.party.areas.has(k)) by.set(k, [...(by.get(k) ?? []), c]); }
  const [key, list] = [...by].find(([k, l]) => l.length >= 2 && l.some(c => cellKey(g.map.cellSafe(c.x, c.z).cell) === k))!;
  const target = list.find(c => cellKey(g.map.cellSafe(c.x, c.z).cell) === key)!;
  g.witch = { ...g.witch, seated: false, x: target.x + 3, z: target.z, vx: 0, vz: 0, mode: "ground", lift: 0 };
  const natives = () => g.creatures.filter(o => cellKey(o.cell) === key && holdsArea(o) && o.level > 0 && o.level < 3);
  return { g, key, target, natives };
}
/** Steps throwing 💌s at `target` until one lands on a creature of `key`'s area; the game time it landed. */
function letterLands(g: Game, key: string, target: Creature, secs = 3): number | null {
  for (let i = 0; i < secs / STEP; i++) {
    stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: target.x - g.witch.x, aimZ: target.z - g.witch.z }, STEP);
    if (g.witches[0].invites.events.some(e => e.kind === "hit" && cellKey(g.creatures[e.id].cell) === key)) return g.clock.time;
  }
  return null;
}

describe("a 💌 wakes the area (Ed, 2026-10-08: 'an invitation hitting a wild creature wakes the area')", () => {
  it("its watch is over at once and every young and adult of it, a napper too, hunts her straight away; never its babies, legend or circle baby", () => {
    const { g, key, target, natives } = landed();
    expect(W.on && W.inviteWakes).toBe(true);
    // One of them napping (not the one she aims at).
    const napper = natives().find(c => c !== target)!;
    Object.assign(napper, { asleep: true, asleepAt: g.clock.time, napUntil: g.clock.time + 300 });
    const at = letterLands(g, key, target);
    expect(at, "a 💌 lands").not.toBeNull();
    expect(g.wildEntry.get(key)!.until).toBeLessThanOrEqual(at!); // (the watch over)
    for (let i = 0; i < 3; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP); // (the hunt picks them up the next step)
    expect(g.clock.time - at!).toBeLessThan(W.time / 4); // (well inside the watch she'd have had)
    expect(napper.asleep).toBeFalsy(); expect(napper.wakeUntil).toBeUndefined(); // (up at once, no getting up)
    for (const c of natives().filter(c => !c.dazed && c.state !== "happy" && !c.leashed)) { expect(c.hunting, `${c.id}`).toBe(0); expect(c.watchUntil).toBeUndefined(); }
    for (const c of g.creatures) if (cellKey(c.cell) === key && (c.level === 0 || c.boss || c.circle)) expect(c.hunting).toBeUndefined();
  }, 120000);

  it("by the hunt's rules: with her not on the ground in the area, nobody hunts; and with inviteWakes off, the watch plays as ever", () => {
    const off = landed(withTuning({ wildWatch: { ...W, inviteWakes: false } }));
    const at = letterLands(off.g, off.key, off.target);
    expect(at).not.toBeNull();
    for (let i = 0; i < 3; i++) stepGame(off.g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    expect(off.natives().some(c => c.hunting !== undefined), "still watching").toBe(false);
    expect(off.g.wildEntry.get(off.key)!.until).toBeGreaterThan(off.g.clock.time);
    // On: the area woken while she stands just outside it doesn't hunt her there (the hunt is in its area).
    const { g, key, natives } = landed(), d = g.map.dancefloor;
    let out = { x: g.witch.x, z: g.witch.z };
    for (let r = 4; r < 400; r += 2) { const x = g.witch.x + (d.x - g.witch.x) * r / 400, z = g.witch.z + (d.z - g.witch.z) * r / 400; if (cellKey(g.map.cellSafe(x, z).cell) !== key) { out = { x, z }; break; } }
    g.witch = { ...g.witch, x: out.x, z: out.z };
    g.witches[0].invites.events.length = 0;
    const one = natives()[0];
    // (a letter's hit, as rules/invites.ts reports it)
    expect(wakeOnInvites(g, [{ kind: "hit", x: one.x, z: one.z, at: g.clock.time, id: one.id, n: 1, spent: false }], TUNING)).toEqual([key]);
    for (let i = 0; i < 3; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    expect(natives().some(c => c.hunting !== undefined)).toBe(false);
    // and she steps in: they hunt her at once, no watch
    g.witch = { ...g.witch, x: one.x + 3, z: one.z };
    for (let i = 0; i < 3; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    expect(natives().filter(c => !c.asleep && !c.dazed).every(c => c.hunting === 0)).toBe(true);
  }, 120000);
});
