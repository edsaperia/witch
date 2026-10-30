// Fixed coordinator6520033543 screen. No optimizer, resume or seed substitution.
import { isSurveyReserved } from "./expert-contract.mjs";
export const KNOWN_QUEST_SCREEN_LIMITS = Object.freeze({ playerSeconds: 600, preflightSeconds: 120, workerSeconds: 480, wholeJobSeconds: 600 });
export const KNOWN_QUEST_SCREEN_DECISION = "Compare complete pairs only. Proceed to separately routed full-night validation only if ON adds at least one actual quest completion before natural win across the four cases, preserves every OFF win, does not worsen KO/loss totals, respects every budget/safety fallback, and uses no forbidden input. Otherwise do not promote this tactic; no automatic repeat or parameter search. Learned requests, attempted deliveries, deferral seconds and timing are diagnostics, not completion credit. Report wins, quest count/all-quests, find eligibility/persistence, waves and safety separately. If these 600-second cases never reach the ending, they provide no evidence of full-night win preservation; later validation would need fresh permission. No lock, survey, optimizer or held-out evaluation.";
export function knownQuestCases(protectedPairs) {
  if (!Array.isArray(protectedPairs)) throw Error("Protected pair list required");
  const held = new Set(protectedPairs.map(p => `${p.worldSeed}/${p.nightSeed}`));
  const cases = [1000, 32676].flatMap((seed, index) => (index % 2 ? ["on", "off"] : ["off", "on"]).map(vector => ({
    vector, condition: "home-everything", seed, worldSeed: 0, island: "home", bpm: 100,
    bag: "satchel", hat: "none", wearsHat: false, parts: [], limit: 600, questMax: 1,
    rememberDreamVisits: true, coverageExploration: false, knownQuestPriority: vector === "on" })));
  if (cases.some(c => held.has(`${c.worldSeed}/${c.seed}`) || isSurveyReserved(c))) throw Error("Known-quest screen intersects protected/reserved pairs");
  return cases;
}
