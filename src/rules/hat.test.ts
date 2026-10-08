// Her dropped hat (Ed, 2026-10-06; rules/hat.ts): knocked out, she drops it where she went down; standing on
// it, the sigil button puts it straight back on (never into the stack), before any sigil under it; the marker
// shows only while it's down; knocked out again with it down, nothing more drops; and a witch with no hat
// (the character creator's none) has none of it.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { hitWitch, newGame, stepGame, type Game } from "./game";
import { hatMarker, wearing } from "./hat";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

function game(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false;
  g.party.spellAt = undefined;
  return g;
}
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; };
/** Hit her till she's knocked out, then let the knockout play out (home again). */
function knockOutAndBack(g: Game): void {
  const W = g.witches[0];
  for (let i = 0; i < 50 && !W.ko; i++) hitWitch(g, 0, g.clock.time + i * (TUNING.witchHealth.grace + 0.05));
  expect(W.ko).not.toBeNull();
  for (let i = 0; i < 60 * 60 && W.ko; i++) stepGame(g, C, 1 / 60);
  expect(W.ko).toBeNull();
}
const press = (g: Game) => { stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); };

describe("her dropped hat", () => {
  it("a knockout drops it where she went down; the marker shows only while it's down", () => {
    const g = game(), W = g.witches[0];
    expect(wearing(W.hat)).toBe(true);
    expect(hatMarker(W.hat)).toBeNull();
    at(g, g.witch.x + 30, g.witch.z + 20);
    const x = g.witch.x, z = g.witch.z;
    knockOutAndBack(g);
    expect(W.hat.down).toMatchObject({ x, z });
    expect(wearing(W.hat)).toBe(false);
    expect(hatMarker(W.hat)).toEqual({ x, z });
    expect(Math.hypot(g.witch.x - x, g.witch.z - z)).toBeGreaterThan(5); // (home again, away from it)
    at(g, x, z);
    press(g);
    expect(hatMarker(W.hat)).toBeNull();
  }, 60000);

  it("the sigil button on it puts it back on, with nothing in the stack and nothing put down", () => {
    const g = game(), W = g.witches[0];
    at(g, g.witch.x + 30, g.witch.z + 20);
    const x = g.witch.x, z = g.witch.z;
    knockOutAndBack(g);
    const stack = [...W.leash.stack], placed = W.leash.placed.length;
    // A step off it (past the pick radius): nothing.
    at(g, x + TUNING.leash.runeRadius + 1, z);
    press(g);
    expect(W.hat.down).not.toBeNull();
    at(g, x + 0.5, z);
    press(g);
    expect(wearing(W.hat)).toBe(true);
    expect(W.leash.stack).toEqual(stack);
    expect(W.leash.placed.length).toBe(placed);
    // Pressed again: no hat to put down; there's nothing more to it.
    press(g);
    expect(wearing(W.hat)).toBe(true);
  }, 60000);

  it("lying on a sigil, the first press takes the hat and the next the sigil", () => {
    const g = game(), W = g.witches[0];
    at(g, g.witch.x + 30, g.witch.z + 20);
    const x = g.witch.x, z = g.witch.z;
    knockOutAndBack(g);
    const id = g.creatures.find(c => !c.boss)!.id;
    W.leash.placed.push({ id, x: x + 0.3, z, at: g.clock.time });
    at(g, x, z);
    press(g);
    expect(wearing(W.hat)).toBe(true);
    expect(W.leash.placed.some(p => p.id === id)).toBe(true);
    expect(W.leash.stack).not.toContain(id);
    press(g);
    expect(W.leash.placed.some(p => p.id === id)).toBe(false);
    expect(W.leash.stack).toContain(id);
  }, 60000);

  it("knocked out again with it still down, the old one stays where it lies and nothing new drops", () => {
    const g = game(), W = g.witches[0];
    at(g, g.witch.x + 30, g.witch.z + 20);
    const first = { x: g.witch.x, z: g.witch.z };
    knockOutAndBack(g);
    at(g, first.x - 40, first.z + 10);
    knockOutAndBack(g);
    expect(W.hat.down).toMatchObject(first);
    expect(hatMarker(W.hat)).toEqual(first);
  }, 60000);

  it("a witch with no hat (the creator's none) drops nothing: no marker, and the knockout as ever", () => {
    const g = game(), W = g.witches[0];
    W.hat.has = false;
    at(g, g.witch.x + 30, g.witch.z + 20);
    const events: string[] = [];
    for (let i = 0; i < 50 && !W.ko; i++) { hitWitch(g, 0, g.clock.time + i * (TUNING.witchHealth.grace + 0.05)); events.push(...g.koEvents.map(e => e.kind)); }
    expect(W.ko).not.toBeNull();
    expect(events).toContain("down");
    expect(events).not.toContain("hatDropped");
    expect(W.hat.down).toBeNull();
    expect(hatMarker(W.hat)).toBeNull();
    for (let i = 0; i < 60 * 60 && W.ko; i++) stepGame(g, C, 1 / 60);
    expect(W.ko).toBeNull();
    expect(W.hat.down).toBeNull();
  }, 60000);

  it("is off with the knob", () => {
    const g = newGame(123, { ...TUNING, knockout: { ...TUNING.knockout, dropHat: false } }), W = g.witches[0];
    g.clock.paused = false; g.party.spellAt = undefined;
    for (let i = 0; i < 50 && !W.ko; i++) hitWitch(g, 0, i * (TUNING.witchHealth.grace + 0.05), g.tuning);
    expect(W.ko).not.toBeNull();
    expect(W.hat.down).toBeNull();
  });
});
