// Read-only analysis of the sealed training checkpoint. No game execution.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { objective, better } from '../../../../tools/balance/expert-search-core.mjs';
import { sourceFingerprint, digest } from '../../../../tools/balance/expert-contract.mjs';
const here = fileURLToPath(new URL('.', import.meta.url));
const c = JSON.parse(readFileSync(here + 'checkpoint.json', 'utf8'));
if (c.manifest.fingerprint !== sourceFingerprint() || c.manifest.execution !== 'local-full-night' || c.held.length) throw Error('Source/execution/held-out provenance differs');
const key = r => JSON.stringify([r.worldSeed, r.seed, r.island, r.bpm, r.condition, r.bag, r.hat, r.parts, r.limit]);
const summarize = rows => ({ cases: rows.length, wins: rows.filter(r => r.outcome === 'won').length,
  losses: rows.filter(r => r.outcome === 'lost').length, censored: rows.filter(r => r.outcome === 'censored').length,
  quests: rows.reduce((n, r) => n + r.questsCompleted, 0), allQuests: rows.filter(r => r.allQuestsCompleted).length,
  eligibleFinds: rows.filter(r => r.upgradeEligibleToKeep).length, knockdowns: rows.reduce((n, r) => n + r.knockdowns, 0),
  objective: rows.length ? objective(rows) : null });
const baseline = c.evaluations.find(e => e.candidate.id === 0);
if (!baseline) throw Error('No default evaluation');
const base = new Map(baseline.rows.map(r => [key(r), r]));
if (base.size !== baseline.rows.length) throw Error('Duplicate baseline cases');
const comparisons = c.evaluations.filter(e => e.candidate.id !== 0).map(e => {
  if (new Set(e.rows.map(key)).size !== e.rows.length) throw Error('Duplicate candidate cases');
  const pairs = e.rows.filter(r => base.has(key(r))).map(r => ({ baseline: base.get(key(r)), candidate: r }));
  const old = pairs.map(p => p.baseline), next = pairs.map(p => p.candidate);
  const a = summarize(old), b = summarize(next);
  return { candidate: e.candidate.id, parameters: e.candidate.point,
    complete: e.rows.length === c.manifest.fitnessCases.length, baselineOnSameCases: a, candidateOnSameCases: b,
    objectiveImproved: pairs.length ? better(b.objective, a.objective) : false,
    primaryImproved: pairs.length ? better([...b.objective.slice(0, 4), 0, 0, 0, 0], [...a.objective.slice(0, 4), 0, 0, 0, 0]) : false,
    lostBaselineWins: pairs.filter(p => p.baseline.outcome === 'won' && p.candidate.outcome !== 'won').length,
    perIsland: pairs.map(p => ({ island: p.candidate.island, worldSeed: p.candidate.worldSeed, nightSeed: p.candidate.seed,
      bpm: p.candidate.bpm, baseline: summarize([p.baseline]), candidate: summarize([p.candidate]) })) };
});
const summary = { schema: 1, complete: c.complete, sourceCommit: c.manifest.commit, sourceFingerprint: c.manifest.fingerprint,
  checkpointDigest: digest(c), analysisDigest: digest(readFileSync(fileURLToPath(import.meta.url), 'utf8').replace(/\r\n/g, '\n')),
  plannedCases: c.manifest.fitnessCases.length, plannedCandidates: c.manifest.iterations, heldOutEvaluated: c.held.length,
  baseline: summarize(baseline.rows), comparisons, selected: c.search.incumbent, promoted: false,
  limits: 'Training comparisons, one case per island kind; no independent generalization or persistence claim. Partial candidates use common completed cases only.' };
writeFileSync(here + 'comparison.json', JSON.stringify(summary, null, 2) + '\n');
const line = (name, s) => `| ${name} | ${s.cases} | ${s.wins} | ${s.losses} | ${s.censored} | ${s.quests} | ${s.eligibleFinds} | ${s.knockdowns} |`;
let md = '# Full-night campaign training comparison\n\n' + summary.limits + '\n\n| Policy | Matched cases | Wins | Losses | Censored | Quests | Eligible finds | Knockdowns |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n' + line('Defaults (all completed)', summary.baseline) + '\n';
for (const e of comparisons) md += line(`Defaults paired with candidate ${e.candidate}`, e.baselineOnSameCases) + '\n' + line(`Candidate ${e.candidate}`, e.candidateOnSameCases) + '\n';
md += '\n## Default results by island\n\n| Island | World / night | BPM | Outcome | Player seconds | Quests | Eligible find | Knockdowns |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n';
for (const r of baseline.rows) md += `| ${r.island} | ${r.worldSeed} / ${r.seed} | ${r.bpm} | ${r.outcome} | ${r.playerEnd.toFixed(1)} | ${r.questsCompleted}/${r.questsTotal} | ${r.upgradeEligibleToKeep ? 'yes' : 'no'} | ${r.knockdowns} |\n`;
for (const e of comparisons) {
  md += `\n## Candidate ${e.candidate}: paired islands\n\n| Island | Default result | Candidate result | Default / candidate quests | Default / candidate knockdowns |\n| --- | --- | --- | --- | --- |\n`;
  for (const pair of e.perIsland) {
    const outcome = s => s.wins ? 'won' : s.losses ? 'lost' : 'censored';
    md += `| ${pair.island} | ${outcome(pair.baseline)} | ${outcome(pair.candidate)} | ${pair.baseline.quests} / ${pair.candidate.quests} | ${pair.baseline.knockdowns} / ${pair.candidate.knockdowns} |\n`;
  }
}
md += '\nPer-island paired results and parameter vectors: `comparison.json`. Defaults remain unchanged.\n';
writeFileSync(here + 'comparison.md', md);
console.log(JSON.stringify({ complete: c.complete, baseline: summary.baseline, comparisons: comparisons.map(e => ({ id: e.candidate, cases: e.candidateOnSameCases.cases, improved: e.objectiveImproved, wins: e.candidateOnSameCases.wins })) }));
