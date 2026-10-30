import { isSurveyReserved } from "./expert-contract.mjs";
export const GUARDED_COVERAGE_LIMITS = Object.freeze({ playerSeconds: 300, preflightSeconds: 120, workerSeconds: 360, wholeJobSeconds: 480 });
export const GUARDED_COVERAGE_GATE = "Total fully-seen cells rise, neither condition's coverage falls, no extra KO or loss in either pair; otherwise stop, with no tuning. Report minimum HP for each case alongside.";
export function guardedCoverageCases(protectedPairs) {
  if (!Array.isArray(protectedPairs)) throw Error("Protected pair list required");
  const cases = ["matched", "home-everything"].flatMap(condition => ["off", "on"].map(vector => ({vector,condition,seed:24757,worldSeed:0,island:"home",bpm:100,bag:"satchel",hat:"none",wearsHat:false,parts:[],limit:300,questMax:1,
    rememberDreamVisits:true,questDeliveryRepair:true,knownQuestPriority:false,coverageExploration:false,guardedCoverageExploration:vector==="on"})));
  if(cases.some(c=>isSurveyReserved(c)||protectedPairs.some(p=>p.worldSeed===c.worldSeed&&p.nightSeed===c.seed)))throw Error("Guarded coverage intersects protected/reserved pairs");
  return cases;
}
