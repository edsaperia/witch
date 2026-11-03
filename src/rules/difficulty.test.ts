// The difficulty (Ed, 2026-11-03: "the game is much too easy"; tuning difficulty, the pause page's Difficulty sliders): creatures
// faster in a fight (difficulty.creatureSpeed), ranged attacks reaching further (difficulty.rangedRange) and adults stronger
// (difficulty.adultStrength), each by its knob, her own speed untouched; and the spark's speed by the tempo squared
// (leyLines.tempoExponent). The swarm by island (population.swarm.largestIsland) is island.test.ts's.
import { afterEach, describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { FIGHT, resetFight, startCharge, type Move } from "./movement";
import { attackOf, marchSpeedOf, newCombat, stunWorth, topSpeedOf } from "./combat";
import { adultMult, combatProfile } from "./combat/data";
import { speciesSpell } from "./attacks/combatWorld";
import { COMBAT } from "./combat/data";
import { newBeatClock, recordTempo, tempoRate } from "./beat";
import { newGame as fullGame, stepGame, STEP, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
import { setupArena } from "./arena";
import { reachingFurther } from "./attacks/combatWorld";
import { stepLongCharge } from "./combat/legend";
import { LEGENDS } from "./legends";
import { Grid } from "./combat/targeting";
import type { Creature } from "./creatures";
import type { CombatWorld, Fight } from "./combat/data";

const D = TUNING.difficulty!;
const at = (over: Partial<NonNullable<Tuning["difficulty"]>>): Tuning => ({ ...TUNING, difficulty: { ...D, ...over } });
const newGame = smallWorld(fullGame, "The difficulty's knobs are read in one arena fight, independent of world extent.");
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
afterEach(() => resetFight());

describe("the difficulty's knobs (Ed, 2026-11-03)", () => {
  it("is as Ed asked: creatures 20% faster, ranged attacks 20% further, adults 1.3 times as strong", () => {
    expect(D).toEqual({ creatureSpeed: 1.2, rangedRange: 1.2, adultStrength: 1.3 });
  });

  it("a fight step takes them up (FIGHT.creature, FIGHT.adult); a fresh night starts at 1", () => {
    const g = newGame(5, at({ creatureSpeed: 1.5, adultStrength: 2 }));
    g.clock.paused = false; g.party.paused = true;
    stepGame(g, idle, STEP);
    expect([FIGHT.creature, FIGHT.adult]).toEqual([1.5, 2]);
    resetFight();
    expect([FIGHT.creature, FIGHT.adult]).toEqual([1, 1]);
  }, 60000);

  it("creatureSpeed: a kind's top speed and its march times it, legends' too; her ground speed untouched", () => {
    for (const [sp, level] of [["wolf", 1], ["bear", 2], ["hare", 1], ["toad", 3]] as const) {
      expect(topSpeedOf(sp, level, at({ creatureSpeed: 1.2 }))).toBeCloseTo(topSpeedOf(sp, level, at({ creatureSpeed: 1 })) * 1.2, 9);
      expect(marchSpeedOf(sp, level, at({ creatureSpeed: 1.2 }))).toBeCloseTo(marchSpeedOf(sp, level, at({ creatureSpeed: 1 })) * 1.2, 9);
    }
    expect(at({ creatureSpeed: 2 }).groundSpeed).toBe(TUNING.groundSpeed);
  });

  it("creatureSpeed: a charge runs that much faster, its chase at her too", () => {
    const mv: Move = { kind: "charge", speed: 28, windup: 0.5, cooldown: 3 } as Move;
    const run = (k: number) => { FIGHT.creature = k; FIGHT.walk = TUNING.groundSpeed; const c = { x: 0, z: 0 } as Creature; startCharge(c, mv, 20, 0, 0); return c.charge!.speed; };
    expect(run(1.2)).toBeCloseTo(run(1) * 1.2, 9);
    FIGHT.charge = { ...FIGHT.charge, chase: 10 }; // (a chase at ten times her walk: above its own run)
    expect(run(1.2)).toBeCloseTo(run(1) * 1.2, 9);
  });

  it("creatureSpeed: a legend's long charge builds to its top speed times it", () => {
    const top = (k: number) => {
      resetFight(); FIGHT.creature = k;
      const c = { id: 0, species: "boar", level: 3, x: 0, z: 0, walk: 0, run: { phase: "run", at: 0, angle: 0, speed: 0, turn: 1, target: { kind: "witch", id: 0 }, tx: 1e6, tz: 0, ran: 0, hit: [], fromX: 0, fromZ: 0 } } as unknown as Creature;
      const f: Fight = { target: null, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 };
      const w = { creatures: [c], active: [c], witches: [{ id: 0, x: 1e6, z: 0, onGround: true, down: false }], time: 0, dt: 1 / 60, t: TUNING, asleep: () => false, inArea: () => true } as unknown as CombatWorld;
      let most = 0;
      for (let i = 0; i < 600 && c.run?.phase === "run"; i++) { stepLongCharge(w, newCombat(), c, f, new Grid([c]), true); most = Math.max(most, c.run?.speed ?? 0); c.run!.ran = 0; w.witches[0].x = c.x + 1e6; }
      return most;
    };
    expect(top(1)).toBeCloseTo(LEGENDS.charge.speed, 6);
    expect(top(1.2)).toBeCloseTo(LEGENDS.charge.speed * 1.2, 6);
  });

  it("adultStrength: an adult's full ring of blows and its damage times it; a young's, a baby's and a legend's as they were, and its evolving value", () => {
    FIGHT.adult = 1.3;
    expect(adultMult(2)).toBe(1.3);
    for (const l of [0, 1, 3] as const) expect(adultMult(l)).toBe(1);
    for (const sp of ["wolf", "bear", "hare"]) {
      expect(stunWorth({ species: sp, level: 2 })).toBeCloseTo(combatProfile(sp, 2).durability * 1.3, 9);
      expect(stunWorth({ species: sp, level: 1 })).toBeCloseTo(combatProfile(sp, 1).durability, 9);
      const a = attackOf(sp, 2), y = attackOf(sp, 1);
      FIGHT.adult = 1;
      const a1 = attackOf(sp, 2), y1 = attackOf(sp, 1);
      FIGHT.adult = 1.3;
      if (a && a1) expect(a.damage).toBeCloseTo(a1.damage * 1.3, 9);
      if (y && y1) expect(y.damage).toBeCloseTo(y1.damage, 9);
      const c = { species: sp, level: 2 } as Creature, s13 = speciesSpell(c, COMBAT);
      FIGHT.adult = 1;
      const s1 = speciesSpell(c, COMBAT);
      FIGHT.adult = 1.3;
      if (s13 && s1) expect(s13.damage).toBeCloseTo(s1.damage * 1.3, 9);
    }
    expect(combatProfile("wolf", 2).health).toBe(COMBAT.levels.hp[2] * (COMBAT.strength?.species.wolf ?? 1)); // (its value, so its evolving cost, as it was)
  });

  it("rangedRange: a beam's length grows with its cast's range and its life's (reachingFurther)", () => {
    const beam = { cast: { range: 10 }, body: { kind: "beam" as const }, beam: { length: 12, width: 1 } };
    const far = reachingFurther(beam, 1.2);
    expect(far.cast!.range).toBeCloseTo(12, 9); expect(far.beam!.length).toBeCloseTo(14.4, 9); expect(far.beam!.width).toBe(1);
  });

  for (const sp of ["dormouse", "squirrel"]) { // (a bolt, a lob)
    it(`rangedRange: a ${sp}'s attack at her is cast from and flies that many times as far`, () => {
      const first = (k: number) => {
        const g = newGame(5, at({ rangedRange: k }));
        g.clock.paused = false; g.party.paused = true;
        setupArena(g, `${sp}*1@1`, { wildOnly: true });
        const c = g.creatures[g.arena!.ids[0]], W = g.witches[0];
        for (let i = 0; i < 20 / STEP; i++) {
          W.health.hp = 1e6; W.body = { ...W.body, x: c.x - 12, z: c.z };
          stepGame(g, idle, STEP);
          const b = (g.combat.spells?.bodies ?? []).find(b => b.source === c.id && b.depth === 0);
          if (b) return { cast: b.attack.cast!.range!, life: b.attack.life?.range };
        }
        throw Error(`no ${sp} shot`);
      };
      const one = first(1), more = first(1.2);
      expect(more.cast / one.cast).toBeCloseTo(1.2, 6);
      if (one.life !== undefined) expect(more.life! / one.life).toBeCloseTo(1.2, 6);
    }, 60000);
  }
});

describe("the spark's speed by the tempo squared (leyLines.tempoExponent; Ed, 2026-11-03)", () => {
  const rateAt = (bpm: number, t: Tuning = TUNING) => { const c = newBeatClock(120); recordTempo(c, t, bpm, 0); return tempoRate(c, t); };
  it("is 2 as Ed asked: with pulseSpeed 1, about 0.69 m/s at 100 bpm, 1 at 120, 1.56 at 150 and 2.78 at 200: 4 times apart", () => {
    expect(TUNING.leyLines.tempoExponent).toBe(2);
    expect(TUNING.leyLines.pulseSpeed).toBe(1);
    expect(rateAt(100)).toBeCloseTo((100 / 120) ** 2, 9); expect(rateAt(100)).toBeCloseTo(0.694, 3);
    expect(rateAt(120)).toBeCloseTo(1, 9);
    expect(rateAt(150)).toBeCloseTo(1.5625, 9);
    expect(rateAt(200)).toBeCloseTo(2.778, 3);
    expect(rateAt(200) / rateAt(100)).toBeCloseTo(4, 9);
  });
  it("at exponent 1, in step with the tempo as before (twice as fast at 200 as at 100)", () => {
    const one: Tuning = { ...TUNING, leyLines: { ...TUNING.leyLines, tempoExponent: 1 } };
    expect(rateAt(200, one) / rateAt(100, one)).toBeCloseTo(2, 9);
    expect(rateAt(150, one)).toBeCloseTo(1.25, 9);
  });
});
