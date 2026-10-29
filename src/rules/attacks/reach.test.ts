// A shot reaches as far as it's fired from (Ed's playtest, 2026-10-29: "ranged weapons from creatures that I encountered seem to have
// a very short range"): a species' shot at her fired from dodge.b.range times its cast's range flies that much further too
// (combatWorld.ts reachingFurther), and none is fired from further than its bolt really gets (bodyReach: a frost shard that ends short
// and bursts, a roller that slows or stops and goes).
import { describe, expect, it } from "vitest";
import { setupArena } from "../arena";
import { newGame, stepGame, STEP, type Controls } from "../game";
import { TUNING } from "../tuning";
import { bodyReach, reachingFurther } from "./combatWorld";
import { SPECIES_ATTACKS, speciesAttack } from "./species";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const floor = TUNING.attacks?.reactionFloor;

describe("how far a thrown attack reaches", () => {
  it("a bolt to its life's range (1.3 times its cast's when it has none); a short-lived shard, a slowing or stop-and-go roller less", () => {
    expect(bodyReach({ cast: { range: 20 }, body: { kind: "bolt" }, speed: { v: 26 } })).toBeCloseTo(26, 0);
    expect(bodyReach(speciesAttack("arcticfox", 1, floor)!)).toBeCloseTo(12, 0); // (its shard ends at 12 m and bursts: cast from 18)
    expect(bodyReach(speciesAttack("woodlouse", 1, floor)!)).toBeLessThan(17); // (three legs of 0.5 s at 16 m/s)
    expect(bodyReach(speciesAttack("squirrel", 1, floor)!)).toBe(Infinity); // (a lob lands where it's aimed)
  });

  it("at her by dodge.b.range: its cast's range and its bolt's both that much further, its children as they were", () => {
    const k = TUNING.dodge!.b.range;
    for (const sp of Object.keys(SPECIES_ATTACKS)) {
      const a = speciesAttack(sp, 2, floor)!, far = reachingFurther(a, k);
      if (!a || !Number.isFinite(bodyReach(a))) continue;
      expect(far.cast!.range).toBeCloseTo(a.cast!.range! * k, 6);
      expect(bodyReach(far)).toBeGreaterThanOrEqual(bodyReach(a) - 1e-6);
      expect(far.on).toEqual(a.on);
    }
    const plain = speciesAttack("dormouse", 1, floor)!;
    expect(bodyReach(reachingFurther(plain, k))).toBeCloseTo(bodyReach(plain) * k, 0);
  });

  for (const sp of ["fennec", "moth", "meerkat", "dormouse"]) { // (each fired from out of its reach before: the fennec 10 shots of 24, up to 6.8 m short)
    it(`a lone ${sp} fires at her only from where its shot reaches her`, () => {
      const g = newGame(5, TUNING);
      g.clock.paused = false; g.party.paused = true;
      setupArena(g, `${sp}*1@1`, { wildOnly: true });
      const c = g.creatures[g.arena!.ids[0]], W = g.witches[0];
      W.body = { ...W.body, x: c.x - 28, z: c.z }; // (further than its cast's range, inside dodge.b's)
      const seen = new Set<number>();
      let fired = 0;
      for (let i = 0; i < 20 / STEP; i++) {
        W.health.hp = 1e6; W.body = { ...W.body, x: c.x - Math.max(10, Math.min(28, c.x - W.body.x)), z: c.z }; // (she keeps away, up to 28 m)
        stepGame(g, idle, STEP);
        for (const b of g.combat.spells?.bodies ?? []) {
          if (!b.alive || seen.has(b.id) || b.source !== c.id || b.depth !== 0) continue;
          seen.add(b.id); fired++;
          expect(Math.hypot(W.body.x - b.ox, W.body.z - b.oz) - 0.3 - b.radius).toBeLessThanOrEqual(bodyReach(b.attack) + 1); // (she's within its reach, a metre for her step since)
        }
      }
      expect(fired).toBeGreaterThan(0);
    }, 60000);
  }
});
