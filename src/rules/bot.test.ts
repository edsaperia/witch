// The bots (rules/bot.ts): the balance tool's and the bot game's one player made of rules.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, type Game } from "./game";
import { article, newBot, plural, type BotKind } from "./bot";

/** A fresh game as the bot game starts one: unpaused, waiting for the party spell. */
function fresh(seed = 123): Game {
  const g = newGame(seed, TUNING);
  g.clock.paused = false;
  g.party.spellAt = null;
  return g;
}
/** Plays `secs` seconds with the bot, a fixed step at a time; the witch's track every 10 s. */
function play(g: Game, kind: BotKind, secs: number) {
  const bot = newBot(kind), track: string[] = [], said = new Set<string>();
  for (let i = 0; i < secs * 60; i++) {
    stepGame(g, bot.decide(g), 1 / 60);
    said.add(bot.doing);
    if (i % 600 === 0) track.push(`${g.witch.x.toFixed(2)},${g.witch.z.toFixed(2)},${g.witch.mode}`);
  }
  return { bot, track, said };
}

describe("the bot", () => {
  it("casts the party spell itself when the game waits for it", () => {
    const g = fresh(), bot = newBot("skilled");
    const c = bot.decide(g);
    expect(c.castParty).toBe(true);
    expect(bot.doing).toBe("casting the party spell");
    stepGame(g, c, 1 / 60);
    expect(g.party.spellAt).not.toBeNull();
    expect(bot.decide(g).castParty).toBe(false);
  });

  it("the skilled bot leaves her seat, flies off and invites; it says what it's doing", () => {
    const g = fresh(), home = { x: g.witch.x, z: g.witch.z };
    const { said } = play(g, "skilled", 150);
    expect(g.witch.seated).toBeFalsy();
    expect(Math.hypot(g.witch.x - home.x, g.witch.z - home.z)).toBeGreaterThan(30);
    expect([...said].some(s => /^(flying to|inviting) the /.test(s))).toBe(true);
    expect(g.leash.stack.length + g.leash.placed.length).toBeGreaterThan(0); // (leashed: their runes picked up)
  });

  it("is deterministic: the same game and steps give the same run", () => {
    const a = play(fresh(7), "skilled", 60).track, b = play(fresh(7), "skilled", 60).track;
    expect(a).toEqual(b);
  });

  it("the idle bot stays home; the hover bot rises", () => {
    const g = fresh(), x = g.witch.x, z = g.witch.z;
    play(g, "idle", 10);
    expect(Math.hypot(g.witch.x - x, g.witch.z - z)).toBeLessThan(1);
    const h = fresh();
    play(h, "hover", 10);
    expect(h.witch.mode).toBe("treetop");
  });

  it("names a species in the plural for its tag", () => {
    expect(plural("fox")).toBe("foxes");
    expect(plural("moth")).toBe("moths");
    expect(plural("dormouse")).toBe("dormice");
    expect(plural("woodlouse")).toBe("woodlice");
    expect(plural("wolf")).toBe("wolves");
    expect(plural("elk")).toBe("elk");
    expect(plural("lynx")).toBe("lynxes");
    expect(article("elk")).toBe("an elk");
    expect(article("fox")).toBe("a fox");
  });

  it("doesn't hop up and down at the edge of where she lands (rising past 60 m on foot, landing within 45)", () => {
    const g = fresh(), bot = newBot("skilled");
    let flips = 0, was = g.witch.mode;
    for (let i = 0; i < 200 * 60; i++) {
      stepGame(g, bot.decide(g), 1 / 60);
      const m = g.witch.mode === "rising" ? "treetop" : g.witch.mode === "descending" ? "ground" : g.witch.mode;
      if (m !== was && i > 0) flips++;
      was = m;
    }
    expect(flips).toBeLessThan(40); // (the old 45 m line flipped her every second or so)
  });
});
