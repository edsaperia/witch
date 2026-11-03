// Grounded by who follows her (Ed, 2026-11-03, replacing 2026-10-18's weight rule: "I think leashed youths shouldn't stop you from
// taking off, only adults and legends do."; rules/leashWeight.ts groundedBy): with an adult or legend following her, its sigil in her
// stack, she stays on the ground at a press to rise (the view draws her pulled back down: the "grounded" leash event) and spends no
// cooldown; youths (however many), babies and parked animals don't count; species strength doesn't matter; once up she stays up.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { groundedBy } from "./leashWeight";
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
  it("an adult or a legend on her leash grounds her; youths, babies and the gone never do", () => {
    const cs = [crit(0, 0), crit(1, 1), crit(2, 2), crit(3, 3), crit(4, 2, true), crit(5, 1)];
    expect(groundedBy([2], cs, TUNING)).toMatchObject({ grounded: true, adult: true });
    expect(groundedBy([3], cs, TUNING).grounded).toBe(true);
    expect(groundedBy([0, 1, 5, 4], cs, TUNING).grounded).toBe(false);
    expect(groundedBy([1, 5, 2], cs, TUNING).grounded).toBe(true);
    expect("grounded" in TUNING.leash).toBe(false); // (the weight rule's knob, retired)
    expect("weight" in TUNING.leash).toBe(false); // (and the sigil weight)
  });

  it("species strength doesn't matter: a light adult grounds her, a heavy youth doesn't", () => {
    const g = newGame(7, TUNING), byStrength = (f: (k: number) => boolean) => g.creatures.find(c => !c.boss && f(strengthOf(c.species, 2)));
    const light = byStrength(k => k < 1), heavy = byStrength(k => k > 1);
    if (light) expect(groundedBy([light.id], g.creatures.map(c => (c.id === light.id ? ({ ...c, level: 2 } as Creature) : c)), TUNING).grounded).toBe(true);
    if (heavy) expect(groundedBy([heavy.id], g.creatures.map(c => (c.id === heavy.id ? ({ ...c, level: 1 } as Creature) : c)), TUNING).grounded).toBe(false);
    expect(light || heavy).toBeTruthy();
  });

  it("one adult keeps her on the ground: said, and no cooldown spent", () => {
    const a = onGround(); follow(a, [2]);
    expect(press(a)).toEqual({ up: false, grounded: true, spent: false });
  });

  it("youths, however many, and babies don't", () => {
    const y = onGround(); follow(y, [1, 1, 1, 1, 1]);
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

  it("up in the treetops when a youth grows up, she stays up: it only stops the next take-off", () => {
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
