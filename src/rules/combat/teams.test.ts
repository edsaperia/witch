import { describe, expect, it } from "vitest";
import { chooseTeamActions, consumeAction, stepTeams, teamOf } from "./teams";
import { ACTIONS, actionsOf, actionReach } from "./actions";
import { PACKS } from "./packs";
import { newCombat, type CombatWorld } from "../combat";
import type { Creature } from "../creatures";
import { FIGHT } from "../movement";

const animal = (id: number, species = "fox", level = 2) => ({ id, species, level, x: 0, z: 0, fight: { target: { kind: "witch", id: 0 } } } as Creature);
describe("mixed combat teams", () => {
  it("waits for another finite opportunity when all its actions are cooling down", () => {
    const c = animal(0), state = newCombat(), world = { active: [c], time: 1, witches: [{ id: 0, x: 0, z: 0 }] } as CombatWorld;
    stepTeams(state, world, PACKS, () => false);
    const team = teamOf(state, 0)!;
    team.ready[0] = Object.fromEntries(actionsOf(c.species).map(a => [a.id, 1000]));
    team.phase = "lull"; team.nextAt = 1;
    stepTeams(state, world, PACKS, () => false);
    expect(team.roles[0]).toBe("hold"); expect(team.phase).toBe("lull");
    expect(Number.isFinite(team.nextAt)).toBe(true); expect(team.nextAt).toBeGreaterThan(world.time);
  });
  it.each(["fox", "ram"])("lets a lone %s choose its own repertoire without inventing a third role", species => {
    const actions = new Set(Array.from({ length: 100 }, (_, round) => chooseTeamActions([animal(1, species)], 123, round)[1]?.id));
    expect(actions).toEqual(new Set(actionsOf(species).map(a => a.id)));
    expect(actions.size).toBe(2);
  });
  it("does not replace a committed intent at an encounter round boundary", () => {
    const c = animal(0), state = newCombat(), world = { active: [c], time: 1, witches: [{ id: 0, x: 0, z: 0 }] } as CombatWorld;
    stepTeams(state, world, PACKS, () => false);
    const team = teamOf(state, 0)!, roles = { ...team.roles }, round = team.round;
    world.time = 100;
    stepTeams(state, world, PACKS, () => true);
    expect(team.roles).toEqual(roles); expect(team.round).toBe(round);
    stepTeams(state, world, PACKS, () => false);
    team.used = [c.id]; world.time = team.nextAt + 1;
    stepTeams(state, world, PACKS, () => false);
    world.time = team.nextAt;
    stepTeams(state, world, PACKS, () => false);
    expect(team.round).toBe(round + 1); expect(team.nextAt).toBeGreaterThan(world.time);
  });
  it("shares total pressure across species without reserving delivery slots", () => {
    const members = Array.from({ length: 12 }, (_, i) => animal(i, i % 2 ? "fox" : "hare", i % 3 ? 2 : 1));
    const actions = chooseTeamActions(members, 123, 2, (_c, a) => a.delivery === "melee");
    expect(actions).toEqual(chooseTeamActions(members, 123, 2, (_c, a) => a.delivery === "melee"));
    expect(Object.values(actions).filter(Boolean)).toHaveLength(4);
    expect(Object.values(actions).filter(Boolean).every(a => a?.delivery === "melee")).toBe(true);
  });
  it("accepts five actions with the same executor and cools down only the chosen action of its actor", () => {
    const original = ACTIONS.species.fox;
    try {
      ACTIONS.species.fox = Array.from({length: 5}, (_, i) => ({id: `choice-${i}`, delivery: "effect", effect: "confusion", parameters: {range: 3 + i}, weight: i + 1, youngWeight: 1, cooldown: 7}));
      const c = animal(0), state = newCombat(), world = {active: [c], time: 1} as CombatWorld;
      stepTeams(state, world, PACKS, () => false);
      const team = teamOf(state, 0)!, action = team.actions[0]!;
      expect(new Set(Array.from({length: 400}, (_, round) => chooseTeamActions([c], 123, round)[0]?.id)).size).toBe(5);
      expect(actionReach(c, action, PACKS)).toBe(action.parameters!.range! * FIGHT.scale);
      consumeAction(team, 0, 10);
      expect(team.ready[0]).toEqual({[action.id]: 17});
      expect(team.ready[1]).toBeUndefined();
      const next = chooseTeamActions([c], 123, 5, (actor, a) => (team.ready[actor.id]?.[a.id] ?? 0) <= 11)[0];
      expect(next).toBeDefined(); expect(next!.id).not.toBe(action.id);
    } finally { ACTIONS.species.fox = original; }
  });
  it("filters adult-only actions while retaining independent weights and youth preference", () => {
    const actions = Array.from({length: 300}, (_, round) => chooseTeamActions([animal(0, "unicorn", 1)], 321, round)[0]);
    expect(actions.every(a => a?.id !== "mind")).toBe(true);
    expect(actionsOf("ram").find(a => a.delivery === "melee")?.knockback).toBeGreaterThan(0);
    expect(actionsOf("ram").some(a => a.effect === "knockback")).toBe(false);
  });
  it("retains individual action cooldowns when an animal changes target", () => {
    const c = animal(0), state = newCombat(), world = {active: [c], time: 1} as CombatWorld;
    stepTeams(state, world, PACKS, () => false);
    const first = teamOf(state, 0)!, action = first.actions[0]!;
    consumeAction(first, 0, 10);
    first.ready[0][action.id] = 20;
    c.fight!.target = {kind: "creature", id: 1};
    stepTeams(state, world, PACKS, () => false);
    const next = teamOf(state, 0)!;
    expect(next).not.toBe(first); expect(next.ready[0][action.id]).toBe(20);
    expect(next.actions[0]?.id).not.toBe(action.id);
  });
  it("groups by side and target while excluding babies and legends", () => {
    const members = [animal(0), animal(1, "hare", 1), animal(2, "fox", 0), animal(3, "fox", 3), { ...animal(4), leashed: true }];
    const state = newCombat(), world = { active: members, time: 1 } as CombatWorld;
    stepTeams(state, world, PACKS, () => false);
    expect(teamOf(state, 0)?.members).toEqual([0, 1]);
    expect(teamOf(state, 2)).toBeUndefined();
    expect(teamOf(state, 3)).toBeUndefined();
    expect(teamOf(state, 4)?.members).toEqual([4]);
  });
  it("withdraws damaged animals between attacks, preserves committed attacks and keeps an all-hurt team playable", () => {
    const members = [animal(0), animal(1), animal(2)], state = newCombat();
    const world = { active: members, time: 1 } as CombatWorld;
    stepTeams(state, world, PACKS, () => false);
    members[0].affection = 0.9; members[1].affection = 0.9;
    stepTeams(state, world, PACKS, c => c.id === 1);
    expect(teamOf(state, 0)?.roles[0]).toBe("hurt");
    expect(teamOf(state, 1)?.withdrawn[1]).toBeUndefined();
    members[2].affection = 0.9;
    stepTeams(state, world, PACKS, () => false);
    expect(Object.values(teamOf(state, 0)!.roles).some(r => r !== "hold" && r !== "hurt")).toBe(true);
  });
});
