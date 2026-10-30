// One final fixed diagnostic screen, coordinator6519419386. No search/proposals.
export const COVERAGE_SCREEN_NIGHTS = Object.freeze([16838, 24757, 32676, 40595]);
export const COVERAGE_SCREEN_LIMITS = Object.freeze({ playerSeconds: 300, preflightSeconds: 120, workerSeconds: 480, wholeJobSeconds: 600 });
export const COVERAGE_SCREEN_DECISION = "Proceed to later full-night validation only if total learned requests improves, total seen does not fall, neither condition loses requests, and KO/loss totals do not worsen. Otherwise drop the tactic; no repeated parameter search.";
export function finalCoverageCases(protectedPairs) {
  if (!Array.isArray(protectedPairs)) throw Error("Protected pair list required");
  const held = new Set(protectedPairs.map(p => `${p.worldSeed}/${p.nightSeed}`));
  if (COVERAGE_SCREEN_NIGHTS.some(seed => held.has(`0/${seed}`))) throw Error("Final screen intersects protected pairs");
  return COVERAGE_SCREEN_NIGHTS.flatMap((seed, i) => ["matched", "home-everything"].flatMap(condition =>
    (i % 2 ? ["on", "off"] : ["off", "on"]).map(vector => ({ vector, condition, seed, worldSeed: 0,
      island: "home", bpm: 100, bag: "satchel", hat: "none", wearsHat: false, parts: [],
      limit: COVERAGE_SCREEN_LIMITS.playerSeconds, rememberDreamVisits: true, coverageExploration: vector === "on" }))));
}
