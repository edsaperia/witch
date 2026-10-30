// One cooldown for her dodge and her take-off (Ed, 2026-10-15: "One trail, one cooldown ... Its length shows one shared
// cooldown counter for dodge and take-off (the two contribute different amounts to it)"; rules/cooldown.ts).
import { describe, expect, it } from "vitest";
import { newGame as fullGame, stepGame, STEP, type Controls, type Game } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Dodge and take-off cooldown timing needs only local open ground, independent of area count.");
import { TUNING, withTuning, type Tuning } from "./tuning";
import { coolCharge, coolReady, coolShare, coolSpend, newCool, stepCool } from "./cooldown";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** Her on home's open ground, off her decks, waves off, on the bare broom (no parts: the take-off's and the landing's full
 *  amounts; the Jet nozzles would halve them, rules/broomParts.ts). */
const BARE = withTuning({ spells: { ...TUNING.spells, parts: "" } });
function onGround(t: Tuning = BARE): Game {
  const g = newGame(7, t), W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "ground", lift: 0, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30 };
  for (let i = 0; i < 1 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
const run = (g: Game, secs: number) => { for (let i = 0; i < secs / STEP; i++) stepGame(g, idle, STEP); };
const blink = (g: Game): boolean => { const at = g.witches[0].dash.at; stepGame(g, { ...idle, moveX: 1, dash: true }, STEP); return g.witches[0].dash.at !== at; };
const rise = (g: Game): boolean => { stepGame(g, { ...idle, toggleMode: true }, STEP); return g.witches[0].body.mode !== "ground"; };

describe("the shared cooldown counter (rules/cooldown.ts)", () => {
  it("is on, with room for two dodges (dash.charges × dash.cooldown) and a take-off adding cooldown.rise; a new game starts a dodge's worth in (as the charges did: one blink in hand, the second a second later)", () => {
    expect(TUNING.cooldown?.shared).toBe(true);
    expect(newGame(7, TUNING).witches[0].cool.left).toBe(TUNING.dash.cooldown);
    expect(TUNING.dash.charges).toBe(2); expect(TUNING.dash.cooldown).toBe(1); expect(TUNING.cooldown!.rise).toBe(2); expect(TUNING.riseCooldown).toBe(3);
  });

  it("an action goes with room for its amount, an amount over the room only when empty; it drains a second a second", () => {
    const c = newCool(), room = 2;
    expect(coolReady(c, 1, room)).toBe(true); coolSpend(c, 1, room); expect(c.left).toBe(1);
    expect(coolReady(c, 1, room)).toBe(true); coolSpend(c, 1, room); expect(c.left).toBe(2);
    expect(coolReady(c, 1, room)).toBe(false); expect(coolReady(c, 2, room)).toBe(false);
    stepCool(c, 1.01); expect(coolReady(c, 1, room)).toBe(true); expect(coolReady(c, 2, room)).toBe(false); // (one dodge's room back; a take-off needs it empty)
    coolSpend(c, 3, room); expect(c.left).toBe(3); // (a landing: over the room, held at its own amount)
    coolSpend(c, 1, room); expect(c.left).toBe(3); // (never lowered)
    expect(coolShare(c, room)).toBe(1); stepCool(c, 2); expect(coolShare(c, room)).toBeCloseTo(0.5);
    expect(coolCharge(c, 1, room)).toBe(1); stepCool(c, -1); c.left = 1.5; expect(coolCharge(c, 1, room)).toBeCloseTo(0.5);
  });

  it("in play: two dodges go straight off, the third a second later (as before: Ed, 2026-10-08)", () => {
    const g = onGround();
    expect(blink(g)).toBe(true);
    run(g, 0.3);
    expect(blink(g)).toBe(true);
    run(g, 0.3);
    expect(blink(g)).toBe(false);
    run(g, 0.75);
    expect(blink(g)).toBe(true);
  });

  it("after a dodge she can't take off for a second; a take-off adds its own amount (the trail's share full)", () => {
    const g = onGround(), W = g.witches[0];
    expect(blink(g)).toBe(true);
    run(g, 0.3);
    expect(rise(g)).toBe(false); // (the counter at about 0.7 of 2: no room for a 2 s take-off)
    run(g, 0.8);
    expect(rise(g)).toBe(true);
    expect(W.cool.left).toBeCloseTo(TUNING.cooldown!.rise, 1);
    expect(coolShare(W.cool, 2)).toBe(1);
  });

  it("landing adds riseCooldown: no rising for 3 s, no dodge for 2 s (the counter over its room)", () => {
    const g = onGround(), W = g.witches[0];
    W.body = { ...W.body, mode: "treetop", lift: 1 };
    run(g, 3);
    stepGame(g, { ...idle, toggleMode: true }, STEP); // (down)
    for (let i = 0; i < 10 / STEP && W.body.mode !== "ground"; i++) stepGame(g, idle, STEP);
    expect(W.body.mode).toBe("ground");
    expect(W.cool.left).toBeCloseTo(TUNING.riseCooldown!, 1);
    run(g, 1.5);
    expect(blink(g)).toBe(false); expect(rise(g)).toBe(false);
    run(g, 0.6); // (2.1 s on)
    expect(rise(g)).toBe(false); expect(blink(g)).toBe(true);
    run(g, 2); // (the dodge added a second to the 0.9 left: empty again 1.9 s on)
    expect(rise(g)).toBe(true);
  });

  it("with cooldown.shared off, the dodge's charges and the rise cooldown run apart as before", () => {
    const g = onGround(withTuning({ spells: { ...TUNING.spells, parts: "missile,fairing,nozzles" }, cooldown: { shared: false, rise: 2 } }));
    expect(blink(g)).toBe(true);
    run(g, 0.3);
    expect(rise(g)).toBe(true); // (a dodge never held her take-off before)
    expect(g.witches[0].cool.left).toBe(TUNING.dash.cooldown); // (the counter untouched: its starting value, a dodge's worth in)
  });
});
