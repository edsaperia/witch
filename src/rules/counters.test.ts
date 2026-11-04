// Counters are tested with actual controlled landed hits, independent of AI outcomes.
import {describe, expect, it} from "vitest";
import {COMBAT, counterOf, traitsOf, newCombat, stunWorth, type Attack, type CombatWorld} from "./combat/data";
import {land} from "./combat/hits";
import type {Creature} from "./creatures";
import {TUNING} from "./tuning";
function hit(species: string, attack: Attack) {
  const c = {id: 0, species, level: 2, x: 0, z: 0, rand: () => 0.5} as Creature;
  const s = newCombat(), w = {creatures: [c], time: 1, t: TUNING} as CombatWorld;
  land(w, s, null, {kind: "creature", id: 0}, 1, attack, -1, 0);
  return {c, event: s.events.find(e => e.kind === "hit")!, damage: -(c.fills ?? []).reduce((sum, value) => sum + Math.min(0, value), 0) * stunWorth(c)};
}
describe("traits and landed counter effects", () => {
  it("gives traits their delivery, knockback and stun counters", () => {
    expect(traitsOf("raven")).toContain("flier");
    expect(traitsOf("bat")).toEqual(expect.arrayContaining(["flier", "swarm"]));
    expect(traitsOf("beetle")).toContain("armoured"); expect(traitsOf("boar")).toContain("heavy"); expect(traitsOf("wolf")).toEqual([]);
    expect(counterOf("raven", "melee").damage).toBe(0.5); expect(counterOf("raven", "shot").damage).toBe(1);
    expect(counterOf("beetle", "shot").damage).toBeLessThan(0.5); expect(counterOf("beetle", "melee").knockback).toBe(2); expect(counterOf("beetle", "melee").stun).toBeGreaterThan(0);
    expect(counterOf("bat", "quake").damage).toBe(2); expect(counterOf("boar", "melee").knockback).toBe(0);
  });
  it("applies flying resistance to an actual melee hit", () => {expect(hit("raven", COMBAT.attacks.nip).damage).toBeCloseTo(hit("wolf", COMBAT.attacks.nip).damage * 0.5);});
  it("applies armour resistance to an actual beam hit", () => {
    const beam: Attack = {delivery: "beam", range: 10, windup: 0.5, cooldown: 1, modifier: "none"};
    expect(hit("beetle", beam).damage).toBeCloseTo(hit("wolf", beam).damage * 0.35);
  });
  it("a landed maul knocks an armoured creature over and stuns it", () => {const {c} = hit("beetle", COMBAT.attacks.maul); expect(c.stunUntil).toBeGreaterThan(1); expect(Math.hypot(c.kx ?? 0, c.kz ?? 0)).toBeGreaterThan(0);});
  it("marks actual hits strong, resisted or neutral for the view", () => {
    expect(hit("bat", COMBAT.attacks.quake).event.counter).toBe(1);
    expect(hit("raven", COMBAT.attacks.nip).event.counter).toBe(-1);
    expect(hit("wolf", COMBAT.attacks.nip).event.counter).toBe(0);
  });
});
