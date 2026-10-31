import { expect, it, vi } from "vitest";
import { COMBAT, newCombat, type CombatWorld } from "../combat/data";
import { TUNING } from "../tuning";
import { meleeExtras, spellWorld } from "./combatWorld";
import type { Hittable } from "./engine";

function fixture(shelter: number | null = 42) {
  const calls = { hit: vi.fn(), stun: vi.fn(), slow: vi.fn(), throw: vi.fn(), pull: vi.fn(), nudge: vi.fn() };
  const creatures = [] as unknown as CombatWorld["creatures"];
  creatures[1] = { id: 1, species: "wolf", level: 2, x: 0, z: 0 } as CombatWorld["creatures"][number];
  creatures[42] = { id: 42, species: "wolf", level: 2, x: 0, z: 0 } as CombatWorld["creatures"][number];
  const w = { creatures, witches: [{ id: 0, x: 4, z: 0, onGround: true, down: false, shelter: shelter ?? undefined }], time: 10, t: TUNING,
    asleep: () => false, hitWitch: calls.hit, stunWitch: calls.stun, slowWitch: calls.slow,
    throwWitch: calls.throw, nudgeWitch: calls.nudge, packWorld: { pull: calls.pull } } as unknown as CombatWorld;
  const state = newCombat(), port = spellWorld(w, state, { near: () => [] } as never, 5, COMBAT);
  const target: Hittable = { kind: "witch", id: 0, x: 4, z: 0, r: 0.3, side: "party" };
  return { calls, w, state, port, target };
}
const effect = { stun: 0.2, root: 0.3, pull: 2, knockback: 3, slow: { mult: 0.5, time: 1 } };

it.each([0, 1])("rejects outside spell effects with damage %s while sheltered", damage => {
  const { calls, port, target, state } = fixture();
  port.harm(target, damage, effect, 0, 0, 1, "shelter-test", "bolt");
  for (const call of Object.values(calls)) expect(call).not.toHaveBeenCalled();
  expect(state.events).toEqual([]);
});

it.each(["owner", "unprotected"])("retains accepted spell effects for %s", mode => {
  const { calls, port, target } = fixture(mode === "owner" ? 42 : null);
  const source = mode === "owner" ? 42 : 1;
  port.harm(target, 1, effect, 0, 0, source, "shelter-test", "bolt");
  expect(calls.hit).toHaveBeenCalledOnce(); expect(calls.stun).toHaveBeenCalledOnce(); expect(calls.slow).toHaveBeenCalled(); expect(calls.pull).toHaveBeenCalledOnce();
});

it("rejects effects from an attacker that disappeared while she is sheltered", () => {
  const { calls, port, target } = fixture();
  port.harm(target, 0, effect, 0, 0, 999, "shelter-test", "bolt");
  for (const call of Object.values(calls)) expect(call).not.toHaveBeenCalled();
});

it("checks her current shelter for an effect already in flight", () => {
  const { calls, port, target, w } = fixture(null);
  w.witches[0].shelter = 42;
  port.harm(target, 1, effect, 0, 0, 1, "shelter-test", "bolt");
  expect(calls.hit).not.toHaveBeenCalled(); expect(calls.stun).not.toHaveBeenCalled();
  w.witches[0].shelter = undefined;
  port.harm(target, 1, effect, 0, 0, 1, "shelter-test", "bolt");
  expect(calls.hit).toHaveBeenCalledOnce(); expect(calls.stun).toHaveBeenCalledOnce();
});

it("rejects melee extras from outside", () => {
  const { calls, w, state } = fixture();
  meleeExtras(w, state, { kind: "witch", id: 0 }, { hit: { effect } }, 0, 0, w.creatures[1]);
  expect(calls.stun).not.toHaveBeenCalled(); expect(calls.pull).not.toHaveBeenCalled();
  meleeExtras(w, state, { kind: "witch", id: 0 }, { hit: { effect } }, 0, 0, w.creatures[42]);
  expect(calls.stun).toHaveBeenCalledOnce(); expect(calls.pull).toHaveBeenCalledOnce();
});

it("rejects outside force fields and lures while sheltered", () => {
  const { calls, port, target } = fixture();
  port.force!(target, 0, 0, 3, 0.1, 1);
  expect(calls.nudge).not.toHaveBeenCalled();
  port.force!(target, 0, 0, 3, 0.1, 42);
  expect(calls.nudge).toHaveBeenCalledOnce();
});
