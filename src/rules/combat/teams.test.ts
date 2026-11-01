import { describe, expect, it } from "vitest";
import { chooseTeamRoles, stepTeams, teamOf } from "./teams";
import { PACKS } from "./packs";
import { newCombat, type CombatWorld } from "../combat";
import type { Creature } from "../creatures";

const animal = (id: number, species = "fox", level = 2) => ({ id, species, level, x: 0, z: 0, fight: { target: { kind: "witch", id: 0 } } } as Creature);
describe("mixed combat teams", () => {
  it("lets a lone capable animal choose each role over successive rounds", () => {
    const roles = new Set(Array.from({ length: 100 }, (_, round) => chooseTeamRoles([animal(1)], 123, round, PACKS)[1]));
    expect(roles).toEqual(new Set(["lunger", "shooter", "special"]));
  });
  it("shares role limits across species, filters unavailable specials and repeats deterministically", () => {
    const members = Array.from({ length: 12 }, (_, i) => animal(i, i % 2 ? "fox" : "hare", i % 3 ? 2 : 1));
    const roles = chooseTeamRoles(members, 123, 2, PACKS, () => false);
    expect(roles).toEqual(chooseTeamRoles(members, 123, 2, PACKS, () => false));
    expect(Object.values(roles).filter(r => r === "lunger").length).toBeLessThanOrEqual(1);
    expect(Object.values(roles).filter(r => r === "shooter").length).toBeLessThanOrEqual(2);
    expect(Object.values(roles)).not.toContain("special");
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
