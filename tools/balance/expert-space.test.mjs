import { test } from "node:test";
import assert from "node:assert/strict";
import { POLICY_SPACE, INITIAL_POLICY, equipmentSpace, equipmentOf, trainingCases, policyOf } from "./expert-space.mjs";
import { startSearch, ask, tell } from "./expert-search-core.mjs";
const catalogue = { bag: ["satchel", "purse"], hat: ["none", "helmet"], tip: [null, "tip-a"], chassis: [null, "body-a"], exhaust: [null, "tail-a"] };

test("all proposed equipment is one choice per legal slot and never enters matched cases", () => {
  const initial = { ...INITIAL_POLICY, ...Object.fromEntries(Object.keys(catalogue).map(k => [k, 0])) };
  const state = startSearch([...POLICY_SPACE, ...equipmentSpace(catalogue)], initial, 11);
  for (let i = 0; i < 30; i++) {
    const c = ask(state), equipment = equipmentOf(c.point, catalogue);
    assert.equal(Object.keys(policyOf(c.point)).length, POLICY_SPACE.length);
    assert.ok(equipment.parts.length <= 3);
    const cases = trainingCases([1, 2], equipment);
    assert.equal(cases.length, 16);
    for (const row of cases) {
      if (row.condition === "matched") { assert.equal(row.bag, "satchel"); assert.equal(row.hat, "none"); assert.equal(row.wearsHat, false); assert.deepEqual(row.parts, []); }
      else { assert.equal(row.island, "home"); assert.equal(row.bag, equipment.bag); assert.deepEqual(row.parts, equipment.parts); }
    }
    tell(state, c, [0, 0, 0, 0, 0, 0, i, 0]);
  }
  assert.throws(() => equipmentOf({ ...initial, hat: 100 }, catalogue));
});
