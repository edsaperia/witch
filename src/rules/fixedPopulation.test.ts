// No creature is made or lost in a night (Ed, 2026-10-28: "during a night, no creatures are created and none are destroyed"): the
// island is peopled at the start (rules/creatures.ts spawnCreatures, by its place on the route; no growth on a clock, Ed 2026-10-07),
// and one that runs off (beaten, knocked down off her leash, its area's soundsystem lost) sleeps on the beach (rules/runaway.ts), gone
// for the rules but there; after a lost party, at home in bed with the rest.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { loseSoundsystem, newGame, stepGame, STEP, type Game } from "./game";
import { newBot } from "./bot";
import { endParty } from "./partyOver";
import { cellKey } from "./party";
import { queueCombatHit } from "../test/combatHit";
import { runAway } from "./orbit";
import { runawaySpot } from "./runaway";
import type { Creature, Level } from "./creatures";
import { stepWin } from "./win";

// Keep the seed-22 ten-area bot night and seed-77 radius fight: these cover complete win/loss population conservation and real beach return travel.
/** Every one gone is asleep on the beach. */
const allBeached = (g: Game) => { for (const c of g.creatures.filter(c => c.gone)) { expect(c.beached, `#${c.id} gone, not on the beach`).toBe(true); expect(c.asleep).toBe(true); } };

describe("a night's creatures (Ed, 2026-10-28)", () => {
  /** A bot-played night on a 10-area home (seed 22, which the skilled bot wins), one of each runaway made to happen as it goes
   *  (the bot rarely beats one or loses a soundsystem here): a beaten wild one now and then, and a soundsystem with happy babies
   *  lost; till it's won, or the party's lost at `loseAt` (game time). */
  function night(loseAt = Infinity) {
    // (the stacks off, ?cast=0: with them a converted area's babies' sigils lie loose round it and they don't run off when it falls
    // (DESIGN.md, "Loose sigils stay"), so this night's lost soundsystem would only have had runaways by chance)
    const g = newGame(22, withTuning({ map: { ...TUNING.map!, islandAreas: 10 }, cast: { ...TUNING.cast!, on: false } }));
    g.clock.paused = false; g.witch = { ...g.witch, seated: false, perch: false };
    const bot = newBot("skilled"), start = g.creatures.length, ran = new Set<number>();
    let most = start, dazed = 0, lost = 0;
    for (let i = 0; i < 20 * 60 * 60 && g.win?.phase !== "won" && !g.partyOver; i++) {
      if (i % (30 * 60) === 0 && i > 0 && dazed < 4) {
        const c = g.creatures.find(c => !c.gone && !c.leashed && !c.boss && !c.fleeUntil && !c.asleep && c.level > 0 && c.state !== "happy" && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60);
        if (c) { runAway(c, runawaySpot(g, c), () => ({ x: c.x, z: c.z })); dazed++; } // (beaten: run away, as a stunned hostile does, rules/orbit.ts)
      }
      if (!lost && g.clock.time > 120) {
        const area = [...g.party.areas.keys()].find(k => k !== "home" && g.creatures.some(c => !c.gone && !c.leashed && !c.loose && c.level === 0 && c.state === "happy" && cellKey(c.cell) === k));
        if (area) { const s = g.combat.sounds.get(area); if (s) s.hp = 0; loseSoundsystem(g, area, s?.x ?? 0, s?.z ?? 0); lost++; }
      }
      if (g.clock.time > loseAt) endParty(g);
      stepGame(g, bot.decide(g), 1 / 60);
      if (g.creatures.length > most) most = g.creatures.length;
      for (const c of g.creatures) if (c.fleeUntil) ran.add(c.id);
    }
    return { g, bot, start, most, ran, dazed, lost };
  }

it("explicit runaways remain asleep on the beach at victory, with the population unchanged", () => {
    const g = newGame(22, withTuning({ map: {...TUNING.map!, islandAreas: 10}, cast: {...TUNING.cast!, on: false} }));
    const ids = g.creatures.map(c => c.id), runners = g.creatures.filter(c => !c.boss && c.level > 0 && c.level < 3 && !c.leashed).slice(0, 3);
    expect(runners).toHaveLength(3);
    for (const c of runners) {const beach = runawaySpot(g, c); expect(beach).not.toBeNull(); runAway(c, beach, () => ({x: c.x, z: c.z}));}
    // Exercise the actual victory transition, without requiring a particular bot to win a fight.
    g.win = {phase: "lap", lastWaveAt: 0, target: null, pickedAt: 0, lap: [{key: "home", x: g.witch.x, z: g.witch.z, at: g.clock.time, links: 0}], fired: 0, sigil: "tree", found: [], lost: [], settled: false, lead: 0, congaSize: 0};
    stepWin(g, STEP);
    expect(g.win.phase).toBe("won"); expect(g.creatures.map(c => c.id)).toEqual(ids);
    for (const c of runners) {expect(c.beached).toBe(true); expect(c.asleep).toBe(true); expect(c.gone).toBe(true);}
    allBeached(g);
  });

  it("the party lost mid-night: nobody gone, every one asleep, those from the beach at home", () => {
    const { g, bot, start, ran } = night(200);
    expect(g.partyOver).toBeTruthy();
    expect(ran.size).toBeGreaterThan(0);
    expect(g.creatures.filter(c => c.gone || c.beached).map(c => c.id)).toEqual([]); // (up off the beach at once)
    // (then home at their own pace, those in her sight walking: one caught mid-run takes minutes)
    for (let i = 0; i < 600 * 60 && g.creatures.some(c => !c.asleep && !c.partyLegend); i++) stepGame(g, bot.decide(g), 1 / 60);
    expect(g.creatures.length).toBe(start);
    expect(g.creatures.filter(c => c.gone || c.beached).map(c => c.id)).toEqual([]);
    expect(g.creatures.filter(c => !c.asleep && !c.partyLegend).map(c => c.id)).toEqual([]);
  }, 400000);

  it("a party animal knocked down runs off its leash to sleep on the beach", () => {
    const g = newGame(77, TUNING), d = g.map.dancefloor;
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "treetop", lift: 1 }; // (out of reach herself)
    for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60) c.gone = true; // (out of the way)
    const place = (species: string, level: Level, x: number, z: number, party = false): Creature => {
      const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 80)!;
      Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 });
      c.cell = g.map.cellSafe(x, z).cell as [number, number];
      if (party) { c.leashed = true; g.leash.placed.push({ id: c.id, x, z, at: g.clock.time }); }
      g.byArea = null;
      return c;
    };
    const mine = place("hedgehog", 1, g.witch.x + 2, g.witch.z, true), before = new Set(g.creatures.filter(c => c.gone).map(c => c.id));
    const attacker = place("bear", 2, g.witch.x + 4, g.witch.z); place("bear", 2, g.witch.x + 3, g.witch.z + 2);
    queueCombatHit(g, attacker, mine);
    for (let i = 0; i < 60 / STEP && !mine.fleeUntil; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    expect(mine.fleeUntil).toBeTruthy();
    expect(mine.leashed).toBe(false);
    expect(mine.beach).toBeTruthy();
    for (let i = 0; i < 600 / STEP && !mine.gone; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
    expect(mine.beached).toBe(true); expect(mine.asleep).toBe(true);
    expect(g.creatures.filter(c => c.gone && !before.has(c.id) && !c.beached).map(c => c.id)).toEqual([]);
  }, 240000);
});
