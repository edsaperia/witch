// Grounded by who follows her (Ed, 2026-10-18: "One adult stops you taking off. Three young do."; rules/leashWeight.ts
// groundedBy, leash.grounded): with an adult (or a legend) or three young following her, their sigils in her stack, a press to
// rise is refused and said (the "grounded" leash event) and spends no cooldown; parked animals and babies don't count; once up
// she stays up.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { groundedBy } from "./leashWeight";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
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
  const W = g.witches[0], pool = g.creatures.filter(c => !c.boss && !c.gone && !c.leashed);
  return levels.map((level, i) => {
    const c = pool[i];
    c.level = level as Creature["level"]; c.leashed = true; c.x = W.body.x + 2 + i; c.z = W.body.z;
    W.leash.stack.push(c.id);
    return c;
  });
}
const press = (g: Game) => { const was = g.witches[0].cool.left; stepGame(g, { ...idle, toggleMode: true }, STEP); return { up: g.witches[0].body.mode !== "ground", grounded: g.leashEvents.some(e => e.kind === "grounded"), spent: g.witches[0].cool.left > was }; };

describe("grounded by who follows her", () => {
  it("counts the stack by level: an adult or a legend as an adult, babies and the gone not at all", () => {
    const cs = [crit(0, 0), crit(1, 1), crit(2, 2), crit(3, 3), crit(4, 1, true)];
    expect(groundedBy([0, 1], cs, TUNING)).toEqual({ adults: 0, young: 1, grounded: false });
    expect(groundedBy([2], cs, TUNING).grounded).toBe(true);
    expect(groundedBy([3], cs, TUNING)).toEqual({ adults: 1, young: 0, grounded: true });
    expect(groundedBy([1, 4], cs, TUNING).young).toBe(1);
  });

  it("one adult, or three young, stop her taking off: refused, said, and no cooldown spent", () => {
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

  it("the counts are knobs (leash.grounded), 0 turning a half off", () => {
    const off = onGround(withTuning({ leash: { ...TUNING.leash, grounded: { adults: 0, young: 0 } } })); follow(off, [2, 1, 1, 1]);
    expect(press(off).up).toBe(true);
    const two = onGround(withTuning({ leash: { ...TUNING.leash, grounded: { adults: 2, young: 3 } } })); follow(two, [2]);
    expect(press(two).up).toBe(true);
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
