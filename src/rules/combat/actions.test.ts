import { afterEach, describe, expect, it } from "vitest";
import { ACTIONS, actionsOf, type CreatureAction } from "./actions";
import { PACKS, stepPacks, packGate, markStrike } from "./packs";
import { teamOf } from "./teams";
import { newCombat, type CombatWorld } from "../combat";
import type { Creature } from "../creatures";
import { withTuning } from "../tuning";

const original = ACTIONS.species;
afterEach(() => { ACTIONS.species = original; });
const animal = (id: number): Creature => ({id, species: "wolf", level: 2, x: id + 2, z: 0, fight: {target: {kind: "witch", id: 0}, windupUntil: 0}} as Creature);
function fixture(action: CreatureAction) {
  ACTIONS.species = {...original, wolf: [action]};
  const creatures = [animal(0), animal(1)], state = newCombat();
  const world = {creatures, active: creatures, t: withTuning({combatSpacing: true}), time: 0, witches: [{id: 0, x: 0, z: 0, onGround: true, down: false}]} as CombatWorld;
  stepPacks(state, world);
  const team = teamOf(state, 0)!; team.phase = "combo"; team.nextAt = 10;
  return {state, world, team, creatures};
}
describe("creature action contracts", () => {
  it("authors finite unique repertoires without a mandatory third action", () => {
    expect(Object.keys(ACTIONS.species).sort()).toEqual(Object.keys(PACKS.kinds).sort());
    for (const [species, actions] of Object.entries(ACTIONS.species)) {
      expect(actions.length, species).toBeGreaterThan(0);
      expect(new Set(actions.map(a => a.id)).size).toBe(actions.length);
      for (const action of actions) {
        expect(Number.isFinite(action.weight) && action.weight >= 0).toBe(true);
        expect(Number.isFinite(action.youngWeight) && action.youngWeight >= 0).toBe(true);
        if (action.delivery === "effect") expect(action.effect).toBeDefined();
      }
    }
    expect(actionsOf("ram").map(a => a.delivery)).toEqual(["melee", "ranged"]);
  });
  it("executes each selected effect with its own parameters, ignoring the old pack special clock", () => {
    const action: CreatureAction = {id: "warning-call", delivery: "effect", effect: "confusion", weight: 1, youngWeight: 1, cooldown: 7, parameters: {range: 10, radius: 10, time: 2, move: true}};
    const {state, world, team} = fixture(action);
    for (const pack of state.packs!.values()) pack.specialReadyAt = Infinity;
    let calls = 0;
    const callback = (_id: number, _until: number, _drift: number, movement?: boolean) => { calls++; expect(movement).toBe(true); };
    stepPacks(state, world, {confuse: callback});
    expect(calls).toBe(2); // No one-effect slot or species-wide cooldown.
    expect(team.used).toEqual([0, 1]);
    expect(team.ready[0]).toEqual({"warning-call": 7}); expect(team.ready[1]).toEqual({"warning-call": 7});
    stepPacks(state, world, {confuse: callback}); expect(calls).toBe(2);
  });
  it("records the selected strike cooldown and applies lane pressure at commitment", () => {
    const {state, world, team, creatures} = fixture({id: "bite", delivery: "melee", weight: 1, youngWeight: 1, cooldown: 3});
    const directives = stepPacks(state, world), first = directives.get(0)!, second = directives.get(1)!;
    expect(packGate(first)).toBe(true);
    markStrike(first, creatures[0], 4);
    expect(team.ready[0]).toEqual({bite: 7});
    expect(packGate(first)).toBe(false); expect(packGate(second)).toBe(false);
    expect(team.ready[1]).toBeUndefined();
  });
  it("queues both selected spore leaps without replacing an existing movement owner", () => {
    const {state, world, creatures} = fixture({id: "spores", delivery: "effect", effect: "cloud", weight: 1, youngWeight: 1, cooldown: 7, parameters: {range: 10, leap: true, radius: 3}});
    creatures[0].hop = {fx: 2, fz: 0, tx: 3, tz: 0, at: 0, lands: 1, height: 1};
    stepPacks(state, world);
    expect(creatures[0].leap).toBeUndefined(); expect(creatures[1].leap).toBeDefined();
    creatures[0].hop = undefined; world.time = 0.1;
    stepPacks(state, world);
    expect(creatures[0].leap).toBeDefined();
    expect([...state.packs!.values()][0].pendingClouds).toHaveLength(2);
  });
});
