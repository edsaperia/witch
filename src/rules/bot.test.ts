// The bots (rules/bot.ts): the balance tool's and the bot game's one player made of rules.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { hitWitch, newGame, stepGame, type Game } from "./game";
import { article, BOT_GAME, newBot, plural, type BotKind, type BotOptions } from "./bot";

// Seeded movement and replay contracts remain here. Full-night/recruitment outcomes are tools/balance/bot-outcomes.mjs.
/** A fresh game as the bot game starts one: unpaused, waiting for the party spell. */
function fresh(seed = 123): Game {
  const g = newGame(seed, TUNING);
  g.clock.paused = false;
  g.party.spellAt = null;
  return g;
}
/** Plays `secs` seconds with the bot, a fixed step at a time; the witch's track every 10 s. */
function play(g: Game, kind: BotKind, secs: number, opts: BotOptions = {}) {
  const bot = newBot(kind, opts), track: string[] = [], said = new Set<string>();
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
    const { said, track } = play(g, "skilled", 150);
    // (left her seat and got well away: at some point, not necessarily at the end, as a knockout puts her back in her seat; with
    // creature momentum, 2026-10-27, this seed's bot is knocked out at about 144 s)
    const far = Math.max(...track.map(p => { const [x, z] = p.split(",").map(Number); return Math.hypot(x - home.x, z - home.z); }));
    expect(far).toBeGreaterThan(30);
    expect([...said].some(s => /^(flying to|inviting) the /.test(s))).toBe(true);
    // (leashed: their runes picked up; or, knocked out lately, parked where she went down till she fetches them: rules/knockout.ts)
    expect(g.leash.stack.length + g.leash.placed.length).toBeGreaterThan(0);
  });

  it("back from a knockout, the skilled bot goes back to where she went down and picks up the sigils that fell there (Ed, 2026-11-03)", () => {
    const g = fresh(123), W = g.witches[0], d = g.map.dancefloor;
    g.party.spellAt = -100; g.party.paused = true; // (the party on, no waves)
    const spot = { x: d.x + 30, z: d.z + 40 };
    W.body = { ...W.body, seated: false, perch: false, mode: "ground", lift: 0, x: spot.x, z: spot.z };
    for (const c of g.creatures) if (!c.boss && Math.hypot(c.x - spot.x, c.z - spot.z) < 150) c.gone = true;
    const mine = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && c.level === 1).slice(0, 2);
    for (const c of mine) { Object.assign(c, { x: spot.x - 2, z: spot.z + 2, tx: spot.x - 2, tz: spot.z + 2, leashed: true, state: "leashed", fight: undefined, siege: undefined, enraged: false }); W.leash.stack.push(c.id); }
    g.byArea = null;
    const bot = newBot("skilled", { feed: false, quests: false, relics: false });
    stepGame(g, bot.decide(g), 1 / 60); // (it notes what she carries)
    W.health.hp = 1; hitWitch(g, 0, g.clock.time, g.tuning);
    expect(W.ko).not.toBeNull();
    const said = new Set<string>();
    let fell = false;
    for (let i = 0; i < 150 * 60 && (W.ko || !mine.every(c => W.leash.stack.includes(c.id))); i++) {
      stepGame(g, bot.decide(g), 1 / 60); said.add(bot.doing);
      fell ||= mine.every(c => W.leash.placed.some(p => p.id === c.id && Math.hypot(p.x - spot.x, p.z - spot.z) < 15));
    }
    expect(fell, "they fell where she went down").toBe(true);
    expect(W.leash.placed.filter(p => mine.some(c => c.id === p.id)), "every fallen sigil picked up").toEqual([]);
    expect(mine.every(c => W.leash.stack.includes(c.id))).toBe(true);
    expect([...said].some(t => /^gathering her posse/.test(t))).toBe(true);
  }, 240000);

  it("is deterministic: the same game and steps give the same run", () => {
    const a = play(fresh(7), "skilled", 60).track, b = play(fresh(7), "skilled", 60).track;
    expect(a).toEqual(b);
  });

  it("the champion without its tactics plays exactly as the skilled bot (skilled stays the balance's measuring stick)", () => {
    expect(play(fresh(7), "champion", 60).track).toEqual(play(fresh(7), "skilled", 60).track);
  });

  it("the champion plays its own game: it says what it's doing, and is deterministic", () => {
    const a = play(fresh(9), "champion", 60, BOT_GAME.champion), b = play(fresh(9), "champion", 60, BOT_GAME.champion);
    expect(a.track).toEqual(b.track);
    expect([...a.said].every(s => s.length > 0)).toBe(true);
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
