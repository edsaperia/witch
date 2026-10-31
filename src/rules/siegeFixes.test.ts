// Ed's playtest (2026-10-11): besiegers walked "very slowly" to the soundsystems they meant to attack, and some kinds (owl,
// hedgehog...) "seem to struggle to damage soundsystems". Now every besieger marches at combat.marchShare of its top speed
// (rules/combat.ts marchSpeedOf), and against a soundsystem or speaker a charging kind doesn't charge and a swooper doesn't
// swoop: each lands and uses its ordinary attack.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Game } from "./game";
import { TUNING } from "./tuning";
import { speakerKey } from "./speakers";
import { attackOf, marchSpeedOf, topSpeedOf } from "./combat";
import { profileOf } from "./movement";
import { LEGEND, type Creature, type Level } from "./creatures";

// Keep the radius fixture: this regression moves her 2000 m away and compares a besieger's 120 m coarse-to-full approach.
const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** One creature of `species` at `level` besieging home's speaker 0 from `from` metres off (away from the dancefloor), alone, the
 *  witch far off over the treetops; the speaker can't fall. */
function besieging(species: string, level: Level, from: number): { g: Game; c: Creature; h: { x: number; z: number; hp: number; max: number } } {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1, x: g.map.dancefloor.x + 2000, z: g.map.dancefloor.z };
  for (const o of g.creatures) if (!o.boss) o.gone = true;
  const key = speakerKey(0), h = g.combat.sounds.get(key)!, d = g.map.dancefloor, dx = h.x - d.x, dz = h.z - d.z, L = Math.hypot(dx, dz) || 1;
  h.hp = h.max = 1e6;
  const c = g.creatures.find(o => !o.boss)!;
  Object.assign(c, { gone: false, species, level, x: h.x + (dx / L) * from, z: h.z + (dz / L) * from, hp: undefined, siege: key, enraged: true, state: "enraged", leashed: false, fight: undefined, circle: undefined, asleep: false, napUntil: undefined, wanderTo: undefined, fleeUntil: undefined });
  g.combat.busy.add(c.id); g.byArea = null;
  return { g, c, h };
}

describe("besiegers hurry (combat.marchShare)", () => {
  it("march at half their top speed, their kind's own (a legend's too)", () => {
    expect(TUNING.combat.marchShare).toBe(0.5);
    for (const sp of ["wolf", "boar", "snail", "hare", "owl"]) expect(marchSpeedOf(sp, 2, TUNING)).toBeCloseTo((profileOf(sp)?.speed ?? TUNING.combat.fightRun) * TUNING.fight.speed * 0.5, 9);
    expect(marchSpeedOf("bear", LEGEND, TUNING)).toBeCloseTo(TUNING.combat.legendRun * TUNING.fight.speed * 0.5, 9);
    expect(marchSpeedOf("wolf", 2, TUNING)).toBeGreaterThan(4); // (it was 0.6 × 1.5)
  });

  it("cover the way to their soundsystem at that pace, far from her (coarse) and near it (full)", () => {
    const { g, c, h } = besieging("wolf", 2, 120), d0 = Math.hypot(c.x - h.x, c.z - h.z);
    for (let i = 0; i < 6 / STEP; i++) stepGame(g, idle, STEP);
    expect(d0 - Math.hypot(c.x - h.x, c.z - h.z)).toBeGreaterThan(marchSpeedOf("wolf", 2, TUNING) * 6 * 0.7);
  }, 60000);
});

describe("against a soundsystem, its ordinary attack (no charge, no swoop)", () => {
  for (const [sp, lvl] of [["elk", 2], ["ram", 1], ["hedgehog", 2], ["boar", 2], ["owl", 2], ["raven", 2]] as const) it(`${sp} at level ${lvl}: never charges or swoops at it, and lands at least half its attack's damage a second`, () => {
    const { g, c, h } = besieging(sp, lvl, 6), A = attackOf(sp, lvl)!;
    let charged = false, swooped = false;
    for (let i = 0; i < 30 / STEP; i++) { stepGame(g, idle, STEP); charged ||= !!c.charge; swooped ||= !!c.swoop?.up && (c.swoop.phase === "tele" || c.swoop.phase === "dive"); }
    expect(charged, "charged").toBe(false);
    expect(swooped, "swooped").toBe(false);
    expect((h.max - h.hp) / 30, "damage a second").toBeGreaterThan((A.damage / A.attack.cooldown) * 0.5);
  }, 60000);
});

it("still charges and swoops at her (unchanged)", () => {
  expect(profileOf("elk")?.move?.kind).toBe("charge");
  expect(profileOf("owl")?.move?.kind).toBe("swoop");
  expect(topSpeedOf("elk", 2, TUNING)).toBeGreaterThan(0);
});
