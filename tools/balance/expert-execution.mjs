// Ed explicitly requested full-night training/comparison on2026-10-31. Keep
// local execution honestly labelled, bounded and training-only; never use the
// cloud flag to bypass the laptop's old short-pilot guard.
export function validateExecution({ execution, cap, limit, trainingOnly, campaignOnly, caseFile }) {
  if (!["pilot", "cloud", "local-full-night"].includes(execution)) throw Error("Unsupported execution mode");
  const fullLocal = execution === "local-full-night";
  if (!Number.isFinite(cap) || cap <= 0 || cap > (execution === "pilot" ? 600 : 3600)) throw Error("Invalid hard wall cap");
  if (!Number.isFinite(limit) || limit <= 0 || execution === "pilot" && limit > 120) throw Error("Long training requires explicit full-night execution");
  if (fullLocal && (!trainingOnly || !campaignOnly || !caseFile || limit > 4200)) throw Error("Local full-night training requires campaign-only, training-only, exact cases and <=4200 player seconds");
}
