// The bots (rules/bot.ts): the balance tool's and the bot game's one player made of rules.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { newGame, stepGame, type Game } from "./game";
import { article, BOT_GAME, newBot, plural, type BotKind, type BotOptions } from "./bot";

// Keep the seeded radius runs and ten-area regressions: full-night wins, cross-area sleeper targeting and 150–200 s travel/landing behavior depend on their routes and populations.
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
    // (leashed: their runes picked up; or, knocked out lately, let go happy where they stood till she fetches them: rules/knockout.ts letGoHappy)
    expect(g.leash.stack.length + g.leash.placed.length + g.creatures.filter(c => c.dropped && !c.gone).length).toBeGreaterThan(0);
  });

  // (seeds 11 and 33: the two ways it stood idle with a full leash and never finished the night, 2026-10-26: on 11 its home guards
  // turned the stack over every step and never went down, a fighter of the same level already at the bottom; on 33 it kept the
  // last hare of an area with no legend, so the area could never be cleared, and had no one else to invite)
  it.each([11, 22, 33])("plays the islands' pace (bots-again, 2026-10-11): on a 10-area home it recruits through the run and wins the night (seed %i)", seed => {
    // (before: it stood at each next soundsystem before its wave, invited 3 to 5 all run and lost every night)
    // (seed 11: 8919, which this run was tuned on, lost once the bare broom lost the plain broom's quick take-off, Ed 2026-10-23, a
    // chaotic run; on the bare broom seeds 11, 22 and 33 win)
    // (seed 22 since the legend circles were sized to their legends, 2026-10-26: their maps moved, and on seed 11 the bot then
    // stood idle with a full leash from 6 minutes on, never finishing the night, as seed 33 already did before; both fixed in the
    // bot since, above: all three run)
    const g = newGame(seed, withTuning({ map: { ...TUNING.map!, islandAreas: 10 } }));
    g.clock.paused = false; g.witch = { ...g.witch, seated: false, perch: false }; // (on the ground by the treehouse, as this run was tuned from; the deck's start shifts this chaotic run: 8 seeds from one spot invite about as many with it on as off)
    const bot = newBot("skilled");
    let invited = 0;
    const babies = g.creatures.filter(c => c.level === 0), alreadyHappy = new Set(babies.filter(c => c.state === "happy").map(c => c.id));
    const joinedBabies = new Set<number>(); // Ed, 2026-10-31: babies join through soundsystems, not invitation events.
    for (let i = 0; i < 20 * 60 * 60 && g.win?.phase !== "won" && !g.partyOver; i++) {
      stepGame(g, bot.decide(g), 1 / 60);
      for (const e of g.witches[0].invites.events) if (e.kind === "happy") invited++;
      for (const c of babies) if (c.state === "happy" && !alreadyHappy.has(c.id)) joinedBabies.add(c.id);
    }
    expect(g.partyOver).toBeFalsy();
    expect(g.win?.phase).toBe("won");
    // Count both supported recruitment paths; retain the 15-creature floor and the full-night victory requirement.
    expect(invited + joinedBabies.size).toBeGreaterThanOrEqual(15);
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

  // The old seed1000/10-area/40-second recruitment-win gate mixed sleeper eligibility with combat balance.
  // Actual cross-area letter hits, waking and accepted affection remain in lettersWake.test.ts (both green in CI41373428283),
  // with area-wide wake coverage in inviteWakes.test.ts and clear.test.ts. Record the historical outcome for the next balance pass;
  // do not tune creature behaviour or bot strategy to force that timed win (Ed, 2026-11-02).

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
