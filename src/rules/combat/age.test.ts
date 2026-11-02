import {describe, expect, it} from "vitest";
import {ageProfile} from "./age";
import {combatProfile, COMBAT} from "./data";
import {speciesAttack, legendAttack} from "../attacks/species";
import {waitingProfile, telegraphHazard, hazardAvoidance} from "../combatSpacing";
import {TUNING} from "../tuning";
import {LEGENDS} from "../legends";
import type {Telegraph} from "../attacks/engine";
import type {Creature} from "../creatures";

describe("numerical creature age roles", () => {
  it("makes adults durable mobile tanks without charging extra berries through health or dps", () => {
    const youth = ageProfile(1), adult = ageProfile(2), c = {species: "wolf", level: 2} as Creature;
    expect(adult.speed).toBeGreaterThan(0); expect(adult.speed).toBeLessThan(youth.speed);
    expect(adult.tempo).toBeLessThan(youth.tempo);
    const p = combatProfile(c.species, c.level);
    expect(p.durability).toBe(COMBAT.levels.stun![2] * p.strength * adult.durability);
    expect(p.health).toBe(COMBAT.levels.hp[2] * p.strength);
    expect(p.damagePerSecond).toBe(COMBAT.levels.dps[2] * p.strength);
    const y = waitingProfile({...c, level: 1}), a = waitingProfile(c);
    expect(a.radius).toBeLessThan(y.radius); expect(a.period).toBeGreaterThan(y.period);
    expect(a.turn).toBeLessThan(y.turn); expect(a.centerShift).toBeLessThan(y.centerShift);
  });
  it("grows range and coverage while preserving species paths, effects and child triggers", () => {
    const youth = speciesAttack("arcticfox", 1)!, adult = speciesAttack("arcticfox", 2)!;
    expect(adult.cast!.range! / youth.cast!.range!).toBeGreaterThanOrEqual(2);
    expect(adult.on!.expire).toHaveLength(youth.on!.expire!.length);
    const y = youth.on!.expire![0].attack, a = adult.on!.expire![0].attack;
    expect(typeof y).toBe("object"); expect(typeof a).toBe("object");
    if (typeof a === "object" && typeof y === "object") {
      expect(a.hit).toEqual(y.hit); expect(a.body?.element).toBe(y.body?.element);
      expect(a.life!.range!).toBeGreaterThan(y.life!.range!);
    }
    const yArea = speciesAttack("lion", 1)!, aArea = speciesAttack("lion", 2)!;
    expect(aArea.area!.r!).toBe(yArea.area!.r! * 2);
  });
  it("gives artillery more coverage and time to react, using its actual telegraph for avoidance", () => {
    const A = LEGENDS.attack, L = {range: A.range, windup: A.windup, interval: A.interval, flight: A.lobFlight, radius: A.lobRadius};
    const legend = legendAttack("flyingsquirrel", L)!;
    expect(legend.cast!.range!).toBeGreaterThan(speciesAttack("flyingsquirrel", 2)!.cast!.range!);
    expect(legend.cast!.windup!).toBeGreaterThan(A.windup); expect(legend.body!.flight!).toBeGreaterThan(A.lobFlight);
    const hazard = telegraphHazard({shape: {type: "disc", x: 0, z: 0, r: 25}} as Telegraph);
    expect(hazard.radius).toBe(25);
    const escape = hazardAvoidance({id: 0, species: "wolf", level: 2, x: 20, z: 0} as Creature, [hazard], TUNING);
    expect(escape.x).toBeGreaterThan(0);
    expect(telegraphHazard({shape: {type: "segment", x: 0, z: 0, x2: 50, z2: 10, width: 4}} as Telegraph)).toEqual({x: 0, z: 0, endX: 50, endZ: 10, radius: 2});
  });
});
