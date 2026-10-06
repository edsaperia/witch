// Leashing a happy creature by picking up its sigil rune (Ed, 2026-10-06; states.leash "pickup"): its 💌 ring full, it's
// happy and its sigil lies as a rune at its feet, moving with it; on the ground within leash.runeRadius, E picks it up
// and it's leashed at the bottom of her stack. 💌s no longer fill a second meter. Her hat comes first, then a placed
// sigil of hers, then the nearest rune. Only happy legends (and legends) have none; pickupDelay holds it back.
import { afterEach, describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { affectionOf, newGame, stepGame, type Game } from "./game";
import { hasRune, runeNear, stateOf, STATES } from "./creatureStates";
import type { Creature } from "./creatures";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const saved = { leash: STATES.leash, delay: STATES.pickupDelay };
afterEach(() => { STATES.leash = saved.leash; STATES.pickupDelay = saved.delay; });

function game(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false;
  g.party.spellAt = undefined;
  return g;
}
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; };
/** A wild creature brought to (x, z), made happy by filling its 💌 meter. */
function happyAt(g: Game, x: number, z: number, skip: number[] = []): Creature {
  const c = g.creatures.find(k => !k.boss && k.level < 3 && stateOf(k) === "wild" && !skip.includes(k.id) && Math.hypot(k.x - x, k.z - z) > 200)!;
  Object.assign(c, { x, z, tx: x, tz: z, wanderTo: undefined, fleeUntil: undefined });
  const A = affectionOf(g);
  for (let i = 0; i < 40 && stateOf(c) === "wild"; i++) A.hit(c, TUNING.invites.amount, g.clock.time);
  expect(stateOf(c)).toBe("happy");
  return c;
}
const press = (g: Game) => { stepGame(g, { ...C, place: true }, 1 / 60); const ev = g.leashEvents.map(e => e.kind); stepGame(g, C, 1 / 60); return ev; };

describe("leashing a happy creature by its sigil rune", () => {
  it("full ring: happy, its rune at its feet; E within reach leashes it at the bottom of her stack, as a pick-up", () => {
    const g = game(), W = g.witches[0];
    at(g, g.witch.x + 30, g.witch.z + 20);
    const c = happyAt(g, g.witch.x + 0.8, g.witch.z);
    expect(c.happyAt).toBe(g.clock.time);
    expect(hasRune(c, g.clock.time)).toBe(true);
    // Out of reach: nothing (and with an empty stack, nothing put down).
    const far = { x: c.x + TUNING.leash.runeRadius + 1.5, z: c.z };
    at(g, far.x, far.z); c.x = far.x - TUNING.leash.runeRadius - 1.5; c.tx = c.x;
    press(g);
    expect(c.leashed).toBeFalsy();
    // Beside it (it may have wandered a step: still within reach).
    at(g, c.x + 0.5, c.z);
    const ev = press(g);
    expect(c.leashed).toBe(true);
    expect(stateOf(c)).toBe("leashed");
    expect(W.leash.stack[W.leash.stack.length - 1]).toBe(c.id); // (the bottom: next to be put down)
    expect(ev).toContain("picked");
    expect(hasRune(c, g.clock.time)).toBe(false);
  }, 60000);

  it("forgiving (Ed's playtest, 2026-10-06): E picks a rune up from further than her own sigils, and a rune near her comes to her", () => {
    const g = game();
    at(g, g.witch.x + 30, g.witch.z + 20);
    expect(TUNING.leash.runeRadius).toBeGreaterThan(TUNING.leash.pickRadius);
    const c = happyAt(g, g.witch.x + TUNING.leash.runeRadius - 0.3, g.witch.z);
    press(g);
    expect(c.leashed).toBe(true);
    // Another, a few metres off: it trots over to her, stopping short of her.
    const P = TUNING.leash.runePull, o = happyAt(g, g.witch.x, g.witch.z + P.radius - 1);
    for (let i = 0; i < 6 * 60; i++) stepGame(g, C, 1 / 60);
    const d = Math.hypot(o.x - g.witch.x, o.z - g.witch.z);
    expect(d).toBeLessThan(P.stop + 0.5);
    expect(d).toBeGreaterThan(P.stop - 0.5);
    press(g);
    expect(o.leashed).toBe(true);
  }, 60000);

  it("💌s no longer fill a second meter: a happy creature isn't invitable", () => {
    const g = game(), c = happyAt(g, g.witch.x + 5, g.witch.z), A = affectionOf(g);
    expect(A.invitable(c)).toBe(false);
    for (let i = 0; i < 40; i++) A.hit(c, TUNING.invites.amount, g.clock.time);
    expect(c.leashed).toBeFalsy();
    expect(c.affection).toBeUndefined();
    // Behind the flag, the old way still works.
    STATES.leash = "again";
    const B = affectionOf(g);
    expect(B.invitable(c)).toBe(true);
    for (let i = 0; i < 40 && !c.leashed; i++) B.hit(c, TUNING.invites.amount, g.clock.time);
    expect(c.leashed).toBe(true);
    expect(hasRune(c)).toBe(false);
  }, 60000);

  it("picks up her hat first, then a placed sigil of hers, then the nearest happy creature's rune", () => {
    const g = game(), W = g.witches[0];
    at(g, g.witch.x + 30, g.witch.z + 20);
    const x = g.witch.x, z = g.witch.z;
    const near = happyAt(g, x + 0.6, z), farther = happyAt(g, x - 1.4, z, [near.id]);
    const mine = g.creatures.find(k => !k.boss && k.level < 3 && stateOf(k) === "wild" && k.id !== near.id && k.id !== farther.id)!;
    Object.assign(mine, { leashed: true, state: "leashed", x: x + 0.3, z, tx: x + 0.3, tz: z });
    W.leash.placed.push({ id: mine.id, x: x + 0.3, z, at: g.clock.time });
    W.hat.down = { x, z, at: g.clock.time };
    const hold = () => { at(g, x, z); for (const k of [near, farther]) if (!k.leashed) { k.tx = k.x; k.tz = k.z; } };
    hold(); press(g);
    expect(W.hat.down).toBeNull();
    expect(near.leashed || farther.leashed).toBeFalsy();
    hold(); press(g);
    expect(W.leash.placed.some(p => p.id === mine.id)).toBe(false);
    expect(W.leash.stack).toContain(mine.id);
    expect(near.leashed || farther.leashed).toBeFalsy();
    hold(); press(g);
    expect(near.leashed).toBe(true);
    expect(farther.leashed).toBeFalsy();
    hold(); press(g);
    // (The farther rune is within reach too: it's next, before anything is put down.)
    expect(farther.leashed).toBe(true);
  }, 60000);

  it("only happy legends carry no rune (Ed, 2026-10-06: no more guards; a circle's baby has one like any other)", () => {
    const g = game(), c = happyAt(g, g.witch.x + 5, g.witch.z);
    expect(hasRune(c)).toBe(true);
    expect(runeNear(g.creatures, c.x, c.z, 3, g.clock.time)).toBe(c);
    const L = g.creatures.find(k => k.boss)!;
    L.legendState = "happy";
    expect(stateOf(L)).toBe("happy");
    expect(hasRune(L)).toBe(false);
  }, 60000);

  it("pickupDelay holds the rune back for that long after the hearts", () => {
    STATES.pickupDelay = 1;
    const g = game();
    at(g, g.witch.x + 30, g.witch.z + 20);
    const c = happyAt(g, g.witch.x + 0.6, g.witch.z);
    expect(hasRune(c)).toBe(true); // (it has one: the view shows it popping out)
    expect(hasRune(c, g.clock.time)).toBe(false);
    at(g, c.x, c.z); press(g);
    expect(c.leashed).toBeFalsy();
    for (let i = 0; i < 60; i++) stepGame(g, C, 1 / 60);
    at(g, c.x, c.z); press(g);
    expect(c.leashed).toBe(true);
  }, 60000);
});
