import {afterEach, describe, expect, it, vi} from "vitest";
import {resolveActionSpell} from "./attackSelection";
import {ACTIONS, actionsOf, actionRole} from "./actions";
import {COMBAT} from "./data";
import {packKindOf, type Directive} from "./packs";
import type {Creature} from "../creatures";
import {newCombat, stepCombat, type CombatWorld} from "../combat";
import {withTuning} from "../tuning";
import {rng} from "../random";
import {drawSpells} from "../../render/leash/attackSpells";
import type {LeashView} from "../../render/leash";
import type {Game} from "../game";
import {SPECIES_ATTACKS} from "../attacks/species";

const original = ACTIONS.species;
afterEach(() => {ACTIONS.species = original;});
function fixture(species: string) {
  ACTIONS.species = {...original, [species]: original[species].map(a => ({...a, weight: a.attack === "species" ? 1 : 0}))};
  const c = {id: 0, species, level: 2, x: -18, z: 0, vx: 0, vz: 0, walk: 0, facing: 1, homeX: 0, homeZ: 0, cell: [0, 0], rand: rng(1634), moveReadyAt: 0, hunting: 0,
    fight: {target: {kind: "witch", id: 0}, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0, seenAt: -10}} as Creature;
  const state = newCombat();
  const world = {creatures: [c], active: [c], t: withTuning({combatSpacing: true}), time: 0, dt: 1 / 60,
    witches: [{id: 0, x: 0, z: 0, onGround: true, down: false}], busy: () => false, leashPoint: () => null, parked: () => false, talkingTo: () => -1,
    exit: () => ({x: 1000, z: 1000}), unseen: () => false, asleep: () => false, inArea: () => true, hitWitch: () => {}, loseParty: () => {}} as CombatWorld;
  const mock = () => vi.fn<(...args: unknown[]) => void>();
  const look = {tell: mock(), telegraph: mock(), core: mock(), zone: mock(), beam: mock(), hit: mock(), burst: mock(), hatch: mock()};
  const view = {look, tops: new Map()} as unknown as LeashView;
  const game = {combat: state, creatures: world.creatures, witch: world.witches[0]} as unknown as Game;
  return {c, state, world, look, draw: () => drawSpells(view, game, world.time, false, () => true, () => ({r: 1, g: 1, b: 1}))};
}

describe("composed attack selection", () => {
  it("lets an armadillo select its configured roll and pebble-burst composition", () => {
    const c = {id: 0, species: "armadillo", level: 2} as Creature;
    const resolved = actionsOf(c.species).map(action => resolveActionSpell(c, COMBAT, packKindOf(c.species), {action, role: actionRole(action), move: action.delivery === "melee" ? "melee" : "ranged", team: {}, state: {size: 1}} as Directive));
    expect(resolved.some(spell => !!spell?.spec.on?.expire?.length)).toBe(true);
  });
  it("makes every authored species attack selectable at both combat ages", () => {
    for (const species of Object.keys(SPECIES_ATTACKS)) for (const level of [1, 2] as const) {
      const c = {id: 0, species, level} as Creature;
      const action = actionsOf(species).find(a => a.attack === "species");
      // Native melee grammar already has its own selectable melee action.
      const selected = action ?? actionsOf(species).find(a => a.delivery === "melee")!;
      const spell = resolveActionSpell(c, COMBAT, packKindOf(species), {action: selected, move: selected.delivery === "melee" ? "melee" : "ranged"} as Directive);
      expect(spell?.name, `${species}@${level}`).toBe(`species:${species}`);
    }
  });
  for (const species of ["armadillo", "arcticfox", "flyingsquirrel"]) it(`${species} casts its actual selected composition and sends children to the effect drawing adapter`, () => {
    const {c, state, world, look, draw} = fixture(species);
    stepCombat(state, world);
    const team = [...state.waitingTeams!.values()][0]; team.phase = "combo"; team.nextAt = 100;
    const children = new Set<number>();
    for (let i = 1; i < 720; i++) {
      world.time = i * world.dt; stepCombat(state, world);
      for (const body of state.spells?.bodies ?? []) if (body.depth > 0) children.add(body.id);
      // Step aside during the child's warning: splinters then fly instead of all touching the stationary target at birth.
      if (state.spells?.pending.some(p => p.depth > 0)) world.witches[0].z = 20;
      draw();
      expect(c.charge).toBeUndefined(); expect(c.leap).toBeUndefined(); expect(c.burrow).toBeUndefined();
    }
    expect(state.spells?.stats.bodies[0]).toBeGreaterThan(0);
    expect(state.spells?.stats.bodies[1]).toBeGreaterThan(0);
    expect(look.core).toHaveBeenCalled(); expect(look.hit).toHaveBeenCalled();
    expect(look.core.mock.calls.some(call => children.has(call[8] as number))).toBe(true);
    expect(look.core.mock.calls.some(call => (call[0] as {el: string}).el === (species === "arcticfox" ? "frost" : species === "flyingsquirrel" ? "wood" : "earth"))).toBe(true);
  });
});
