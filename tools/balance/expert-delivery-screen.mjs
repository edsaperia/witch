// Coordinator6520516411: one correctness ablation, no parameter search.
import { isSurveyReserved } from "./expert-contract.mjs";
export const DELIVERY_SCREEN_LIMITS = Object.freeze({ playerSeconds: 120, preflightSeconds: 120, workerSeconds: 180, wholeJobSeconds: 300 });
export const DELIVERY_SCREEN_GATE = "Gate: OFF reproduces stall,ON completes actualwolf297quest by120,no addedKO/loss/contractviolation; otherwise stop.";
export function deliveryCases(protectedPairs) {
  if (!Array.isArray(protectedPairs)) throw Error("Protected pair list required");
  const cases = ["off", "on"].map(vector => ({ vector, condition: "home-everything", seed: 32676, worldSeed: 0,
    island: "home", bpm: 100, bag: "satchel", hat: "none", wearsHat: false, parts: [], limit: 120, questMax: 1,
    rememberDreamVisits: true, coverageExploration: false, knownQuestPriority: false, questDeliveryRepair: vector === "on" }));
  if (cases.some(c => isSurveyReserved(c) || protectedPairs.some(p => p.worldSeed === c.worldSeed && p.nightSeed === c.seed))) throw Error("Delivery screen intersects protected/reserved pairs");
  return cases;
}
