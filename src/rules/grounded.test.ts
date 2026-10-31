// Grounded by who follows her (Ed, 2026-10-18: "One adult stops you taking off. Three young do.", the numbers indicative, by
// weight; rules/leashWeight.ts groundedBy, leash.grounded.weight): with the creatures following her, their sigils in her stack,
// weighing an adult's worth or more, she stays on the ground at a press to rise (the view draws her pulled back down: the
// "grounded" leash event) and spends no cooldown; parked animals and babies don't count; heavier species count for more; once up
// she stays up.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { creatureWeight, groundedBy } from "./leashWeight";
import { strengthOf } from "./combat";
import { newGame as fullGame, stepGame, STEP, type Controls, type Game } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Grounding checks a few creatures placed beside one witch on local open ground, independent of area count.");
import type { Creature } from "./creatures";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const crit = (id: number, level: number, gone = false) => ({ id, x: 0, z: 0, level, species: "wolf", gone }) as unknown as Creature;

/** Her on home's open ground, off her decks, waves off. */
function onGround(t: Tuning = TUNING): Game {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "ground", lift: 0, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30 };
  for (let i = 0; i < 4 / STEP; i++) stepGame(g, idle, STEP); // (past any landing's cooldown)
  return g;
}
/** `levels` of creatures following her, beside her: their sigils in her stack. */
function follow(g: Game, levels: number[]): Creature[] {
  const W = g.witches[0], pool = g.creatures.filter(c => !c.boss && !c.gone && !c.leashed && strengthOf(c.species, 1) === 1); // (of normal strength: the indicative numbers)
  return levels.map((level, i) => {
    const c = pool[i];
    c.level = level as Creature["level"]; c.leashed = true; c.x = W.body.x + 2 + i; c.z = W.body.z;
    W.leash.stack.push(c.id);
    return c;
  });
}
const press = (g: Game) => { const was = g.witches[0].cool.left; stepGame(g, { ...idle, toggleMode: true }, STEP); return { up: g.witches[0].body.mode !== "ground", grounded: g.leashEvents.some(e => e.kind === "grounded"), spent: g.witches[0].cool.left > was }; };

describe("grounded by who follows her", () => {
  it("weighs the stack: each creature at creatureWeight, babies and the gone not at all", () => {
    const cs = [crit(0, 0), crit(1, 1), crit(2, 2), crit(3, 3), crit(4, 1, true)], W = TUNING.leash.weight.levels;
    expect(groundedBy([0, 1], cs, TUNING).weight).toBeCloseTo(creatureWeight(cs[1], TUNING), 9);
    expect(groundedBy([2], cs, TUNING).grounded).toBe(true);
    expect(groundedBy([3], cs, TUNING).grounded).toBe(true);
    expect(groundedBy([1, 4], cs, TUNING).weight).toBeCloseTo(creatureWeight(cs[1], TUNING), 9);
    // the indicative numbers, at normal strength: one adult, or three young, but not two
    expect(TUNING.leash.grounded!.weight).toBeLessThanOrEqual(W[2]);
    expect(3 * W[1]).toBeGreaterThanOrEqual(TUNING.leash.grounded!.weight);
    expect(2 * W[1]).toBeLessThan(TUNING.leash.grounded!.weight);
  });

  it("light and heavy species extrapolate: weight is level weight times strength", () => {
    const g = newGame(7, TUNING), byStrength = (f: (k: number) => boolean) => g.creatures.find(c => !c.boss && f(strengthOf(c.species, 2)));
    const light = byStrength(k => k * TUNING.leash.weight.levels[2] < TUNING.leash.grounded!.weight), heavy = byStrength(k => k > 1);
    if (light) expect(groundedBy([light.id], g.creatures.map(c => (c.id === light.id ? ({ ...c, level: 2 } as Creature) : c)), TUNING).grounded).toBe(false); // (a light adult: not enough)
    if (heavy) expect(creatureWeight({ species: heavy.species, level: 1 }, TUNING)).toBeGreaterThan(TUNING.leash.weight.levels[1]); // (a heavy young weighs more than a young)
    expect(light || heavy).toBeTruthy();
  });

  it("one adult, or three young, keep her on the ground: said, and no cooldown spent", () => {
    const a = onGround(); follow(a, [2]);
    expect(press(a)).toEqual({ up: false, grounded: true, spent: false });
    const y = onGround(); follow(y, [1, 1, 1]);
    expect(press(y)).toEqual({ up: false, grounded: true, spent: false });
  });

  it("two young, or any number of babies, don't", () => {
    const y = onGround(); follow(y, [1, 1]);
    expect(press(y).up).toBe(true);
    const b = onGround(); follow(b, [0, 0, 0, 0, 0, 0]);
    expect(press(b).up).toBe(true);
  });

  it("parked animals don't count: an adult's sigil put down on the ground frees her", () => {
    const g = onGround(), W = g.witches[0], [adult] = follow(g, [2]);
    expect(press(g).up).toBe(false);
    W.leash.stack = W.leash.stack.filter(id => id !== adult.id);
    W.leash.placed.push({ id: adult.id, x: W.body.x + 3, z: W.body.z } as (typeof W.leash.placed)[number]);
    expect(press(g).up).toBe(true);
  });

  it("a take-off pulled back down is input: she stops idling into the party", () => {
    const g = onGround(), W = g.witches[0], D = g.map.dancefloor;
    W.body = { ...W.body, x: D.x + D.radius * 0.5, z: D.z + D.radius * 0.5 }; follow(g, [2]);
    for (let i = 0; i < (TUNING.partyWitches.idleAfter + 2) / STEP; i++) stepGame(g, idle, STEP);
    const I = () => g.partyWitches.players[0];
    expect(I()?.activity ?? null).not.toBeNull();
    expect(press(g).grounded).toBe(true);
    expect(I()?.activity ?? null).toBeNull();
  });

  it("the weight is a knob (leash.grounded.weight), 0 turning it off", () => {
    const off = onGround(withTuning({ leash: { ...TUNING.leash, grounded: { weight: 0 } } })); follow(off, [2, 1, 1, 1]);
    expect(press(off).up).toBe(true);
    const more = onGround(withTuning({ leash: { ...TUNING.leash, grounded: { weight: 10 } } })); follow(more, [2]);
    expect(press(more).up).toBe(true);
  });

  it("up in the treetops when the count is reached, she stays up: it only stops the next take-off", () => {
    const g = onGround(), W = g.witches[0], [c] = follow(g, [1]);
    expect(press(g).up).toBe(true);
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, idle, STEP);
    expect(W.body.mode).toBe("treetop");
    c.level = 2; // (her young grows up while she flies)
    for (let i = 0; i < 3 / STEP; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
    expect(W.body.mode).toBe("treetop");
    expect(g.leashEvents.some(e => e.kind === "grounded")).toBe(false);
  });
});
