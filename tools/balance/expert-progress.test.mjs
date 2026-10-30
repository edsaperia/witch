import { test } from "node:test";
import assert from "node:assert/strict";
import { progressObserver } from "./expert-progress.mjs";

test("partial deliveries count each real quest once, not repeated placement farming", () => {
  const p = progressObserver(), g = { trunk: null, leashEvents: [{ kind: "outsideCircle", id: 7 }], questEvents: [] };
  p.step(g); p.step(g);
  assert.deepEqual(p.finish(), { provisionalFindsCollected: 0, questDeliveries: 1, questDeliveriesIncomplete: 1 });
  g.questEvents = [{ kind: "done", id: 7 }]; p.step(g);
  assert.deepEqual(p.finish(), { provisionalFindsCollected: 0, questDeliveries: 1, questDeliveriesIncomplete: 0 });
  g.questEvents = [{ kind: "done", id: 8 }]; p.step(g);
  assert.equal(p.finish().questDeliveries, 2);
});

test("a provisional pickup stays recorded without becoming a kept find", () => {
  const p = progressObserver(), g = { trunk: { found: true }, leashEvents: [], questEvents: [] };
  p.step(g); g.trunk = null; p.step(g);
  assert.equal(p.finish().provisionalFindsCollected, 1);
  assert.equal("upgradeEligibleToKeep" in p.finish(), false);
});

test("ordinary sigil/relic events and invalid IDs do not create quest progress", () => {
  const p = progressObserver();
  p.step({ leashEvents: [{ kind: "placed", id: 2 }, { kind: "relicPlaced", id: 3 }, { kind: "outsideCircle", id: -1 }], questEvents: [] });
  assert.equal(p.finish().questDeliveries, 0);
});
