// Letters wake them (Ed, 2026-10-11): a 💌 that reaches a napping wild creature rouses it, wherever she stands (another area,
// or the same), and lands as any other invitation; before, a sleeper took none till she was on the ground in its own area,
// and they flew through it. One asleep for good (the party's over) still lets them by.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, affectionOf, type Game } from "./game";
import { TUNING } from "./tuning";
import { cellKey } from "./party";
import type { Creature } from "./creatures";

// Keep the seeded radius world: this regression needs a naturally placed sleeper within 15 m of another playable area's border.
const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

/** A wild young one napping, and a spot 15 m off it in another area, nothing else near. */
function napperAcross(): { g: Game; c: Creature; at: { x: number; z: number } } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.paused = true;
  for (const c of g.creatures) {
    if (c.gone || c.boss || c.level !== 1 || cellKey(c.cell) === cellKey(g.map.centreCell)) continue;
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2, at = { x: c.x + Math.cos(a) * 15, z: c.z + Math.sin(a) * 15 }, q = g.map.cellSafe(at.x, at.z).cell, here = g.map.cellSafe(c.x, c.z).cell;
      if (cellKey(q) === cellKey(c.cell) || cellKey(here) !== cellKey(c.cell) || !g.map.playable(q[0], q[1])) continue;
      for (const o of g.creatures) if (o !== c && Math.hypot(o.x - c.x, o.z - c.z) < 60) o.gone = true;
      g.byArea = null;
      Object.assign(c, { asleep: true, napUntil: 1e9, rest: 0, tx: c.x, tz: c.z });
      return { g, c, at };
    }
  }
  throw new Error("no napper by a border");
}

describe("letters wake them (Ed, 2026-10-11)", () => {
  it("a 💌 from the next area over rouses a napper and counts on its meter", () => {
    const { g, c, at } = napperAcross(), w = g.witches[0];
    w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: at.x, z: at.z };
    let hit = false;
    for (let i = 0; i < 3 * 60 && !hit; i++) {
      stepGame(g, { ...idle, fire: true, aimX: c.x - w.body.x, aimZ: c.z - w.body.z }, 1 / 60);
      hit = w.invites.events.some(e => e.kind === "hit" && e.id === c.id);
    }
    expect(hit).toBe(true);
    expect(c.asleep).toBeFalsy();
    expect(c.napUntil).toBeUndefined();
    expect(affectionOf(g).affection(c)).toBeGreaterThan(0);
  });

  it("one asleep for good (the party's over: no nap's end) still lets them by", () => {
    const { g, c, at } = napperAcross(), w = g.witches[0];
    Object.assign(c, { napUntil: undefined });
    w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: at.x, z: at.z };
    for (let i = 0; i < 3 * 60; i++) stepGame(g, { ...idle, fire: true, aimX: c.x - w.body.x, aimZ: c.z - w.body.z }, 1 / 60);
    expect(c.asleep).toBe(true);
    expect(affectionOf(g).affection(c) ?? 0).toBe(0);
  });
});
