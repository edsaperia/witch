// Reuse full release-PR validation only for an identical main tree and execution environment.
// Missing or uncertain evidence is a cache miss; publication always uses a fresh main build.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const TASKS = ['build', 'unit-1', 'unit-2', 'unit-3', 'unit-4', 'check-work', 'smoke', 'large-world'];
export const JOBS = ['build', 'unit tests (1/4)', 'unit tests (2/4)', 'unit tests (3/4)', 'unit tests (4/4)', 'check-work', 'check', 'smoke', 'largest shipped world art', 'release validation proof'];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const sha = s => typeof s === 'string' && /^[a-f0-9]{40}$/.test(s);
const positive = n => Number.isSafeInteger(n) && n > 0;
export function releasePr(pr, repository) {
  return !!pr && positive(pr.number) && pr.repository === repository && pr.base === 'main' && sha(pr.head)
    && (/(^|\/)release\//i.test(pr.branch) || /^claude\/rel(?:ease)?-/i.test(pr.branch)
      || pr.branch === 'claude/publish-snapshot' || /^Release(?: check)?:/i.test(pr.title) || /^Publish:/i.test(pr.title));
}
export function prContext(pr) {
  return pr ? { number: pr.number, repository: pr.head?.repo?.full_name, base: pr.base?.ref,
    branch: pr.head?.ref, head: pr.head?.sha, title: pr.title } : null;
}
export function localContext(env = process.env) {
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
  const event = env.GITHUB_EVENT_PATH ? JSON.parse(fs.readFileSync(env.GITHUB_EVENT_PATH, 'utf8')) : {};
  return { schema: 1, repository: env.GITHUB_REPOSITORY, event: env.GITHUB_EVENT_NAME, ref: env.GITHUB_REF,
    runId: Number(env.GITHUB_RUN_ID), attempt: Number(env.GITHUB_RUN_ATTEMPT),
    commit: git('rev-parse', 'HEAD'), tree: git('rev-parse', 'HEAD^{tree}'),
    clean: git('status', '--porcelain', '--untracked-files=no') === '', pr: prContext(event.pull_request),
    environment: { node: process.version, os: env.RUNNER_OS, arch: env.RUNNER_ARCH,
      image: env.ImageOS, imageVersion: env.ImageVersion },
    workload: createHash('sha256').update(fs.readFileSync('.github/workflows/ci.yml')).update(JSON.stringify(TASKS)).digest('hex') };
}
function validContext(c) {
  return c?.schema === 1 && typeof c.repository === 'string' && c.repository.includes('/')
    && positive(c.runId) && positive(c.attempt) && sha(c.commit) && sha(c.tree) && c.clean === true
    && /^[a-f0-9]{64}$/.test(c.workload ?? '') && c.environment
    && ['node', 'os', 'arch', 'image', 'imageVersion'].every(k => typeof c.environment[k] === 'string' && c.environment[k].length > 0);
}
function fullUnits(records) {
  const units = records.filter(r => r.task.startsWith('unit-')).map(r => r.unit);
  if (units.length !== 4 || units.some((u, i) => !u || u.shard !== `${i + 1}/4` || u.mode !== 'full'
    || u.status !== 0 || u.signal || u.error || !Number.isFinite(u.testMs) || u.testMs <= 0 || !Array.isArray(u.tests))) return false;
  if (units.every(u => !u.balanced && u.tests.length === 0)) return true; // Vitest's native full --shard fallback.
  if (units.some(u => !u.balanced || !positive(u.balanced.files) || !positive(u.balanced.of)
    || u.balanced.files !== u.tests.length || u.balanced.of !== units[0].balanced?.of
    || u.tests.some(f => typeof f !== 'string' || !f.endsWith('.test.ts') || f.startsWith('/') || f.includes('..')))) return false;
  const files = units.flatMap(u => u.tests);
  return new Set(files).size === files.length && files.length === units[0].balanced.of;
}
export function assembleProof(context, records) {
  if (!validContext(context) || context.event !== 'pull_request' || !releasePr(context.pr, context.repository)) return null;
  if (!Array.isArray(records) || records.length !== TASKS.length || records.some(r => !r || !TASKS.includes(r.task))) return null;
  const ordered = TASKS.map(task => records.find(r => r.task === task));
  if (ordered.some(r => !r || !same(r.context, context)) || !fullUnits(ordered)) return null;
  return { schema: 1, context, records: ordered };
}
export function proofMatches(proof, current, run) {
  const source = proof?.context;
  if (!validContext(current) || !source || !assembleProof(source, proof.records) || proof.schema !== 1) return false;
  return source.repository === current.repository && source.tree === current.tree && source.workload === current.workload
    && same(source.environment, current.environment) && source.runId === run.id && source.attempt === run.run_attempt
    && source.runId !== current.runId && [source.pr.head, source.commit].includes(run.head_sha);
}

/** Bounded, read-only lookup. API faults, old attempts, partial work and malformed artifacts all run full CI. */
export async function findReleaseProof({ github, current, readProof, log = () => {} }) {
  if (!validContext(current) || current.event !== 'push' || current.ref !== 'refs/heads/main') return null;
  const [owner, repo] = current.repository.split('/'), params = { owner, repo };
  try {
    const { data } = await github.rest.actions.listWorkflowRuns({ ...params, workflow_id: 'ci.yml', event: 'pull_request', status: 'success', per_page: 100 });
    for (const run of data.workflow_runs ?? []) {
      if (run.event !== 'pull_request' || run.status !== 'completed' || run.conclusion !== 'success'
        || run.repository?.full_name !== current.repository || run.head_repository?.full_name !== current.repository
        || run.path !== '.github/workflows/ci.yml' || !positive(run.run_attempt) || run.id === current.runId) continue;
      try {
        const artifacts = await github.paginate(github.rest.actions.listWorkflowRunArtifacts, { ...params, run_id: run.id, per_page: 100 });
        const matches = artifacts.filter(a => a.name === `ci-release-proof-${run.run_attempt}`);
        if (matches.length !== 1 || matches[0].expired || !positive(matches[0].size_in_bytes) || matches[0].size_in_bytes > 1048576) continue;
        const proof = await readProof(matches[0]);
        if (!proofMatches(proof, current, run)) continue;
        const source = proof.context;
        const { data: pr } = await github.rest.pulls.get({ ...params, pull_number: source.pr.number });
        if (pr.merged !== true || !same(prContext(pr), source.pr) || !releasePr(prContext(pr), current.repository) || !sha(pr.merge_commit_sha)) continue;
        // Both the actual checkout and published merge must resolve to the exact tested tree.
        const { data: checked } = await github.rest.git.getCommit({ ...params, commit_sha: source.commit });
        const { data: merged } = await github.rest.git.getCommit({ ...params, commit_sha: pr.merge_commit_sha });
        if (checked.tree?.sha !== current.tree || merged.tree?.sha !== current.tree) continue;
        const jobs = await github.paginate(github.rest.actions.listJobsForWorkflowRun, { ...params, run_id: run.id, filter: 'latest', per_page: 100 });
        if (!JOBS.every(name => { const found = jobs.filter(j => j.name === name); return found.length === 1 && found[0].status === 'completed' && found[0].conclusion === 'success'; })) continue;
        // Re-fetch after inspecting evidence: a concurrent rerun must not reuse a previous attempt.
        const { data: latest } = await github.rest.actions.getWorkflowRun({ ...params, run_id: run.id });
        if (latest.run_attempt !== run.run_attempt || latest.status !== 'completed' || latest.conclusion !== 'success') continue;
        log(`Reuse full release validation from run ${run.id}, attempt ${run.run_attempt}, PR #${source.pr.number}, tree ${current.tree}. Main build/publication remain fresh.`);
        return { runId: run.id, attempt: run.run_attempt, tree: current.tree, url: run.html_url };
      } catch { log(`Run ${run.id}: proof unavailable or invalid; trying another successful release.`); }
    }
  } catch { log('Release proof lookup unavailable; running full validation.'); }
  return null;
}

// github-script calls this with its read-only client. Context comes from setup-node's Node22,
// not github-script's different bundled runtime. Never extract or execute artifact contents.
export async function lookup({ github, core }) {
  core.setOutput('reuse', 'false');
  const current = JSON.parse(execFileSync('node', ['tools/ci/release-reuse.mjs', 'context'], { encoding: 'utf8' }));
  const result = await findReleaseProof({ github, current, log: s => core.info(s), readProof: async artifact => {
    const [owner, repo] = current.repository.split('/');
    const { data } = await github.rest.actions.downloadArtifact({ owner, repo, artifact_id: artifact.id, archive_format: 'zip' });
    if (Buffer.byteLength(data) > 1048576) throw Error('Oversized release proof archive');
    const tmp = fs.mkdtempSync(path.join(process.env.RUNNER_TEMP, 'release-proof-'));
    const zip = path.join(tmp, 'proof.zip');
    try {
      fs.writeFileSync(zip, Buffer.from(data));
      return JSON.parse(execFileSync('unzip', ['-p', zip, 'ci-release-proof.json'], { encoding: 'utf8', maxBuffer: 1048576, timeout: 10000 }));
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  } });
  if (result) {
    core.setOutput('reuse', 'true');
    core.setOutput('source', `${result.url} (attempt ${result.attempt}, tree ${result.tree})`);
    await core.summary.addRaw(`Reusing full release validation: ${result.url}, attempt ${result.attempt}, tree ${result.tree}. Fresh main build and publication still run.\n`).write();
  } else core.info('No exact successful release proof; running full validation.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const [command, task] = process.argv.slice(2), context = localContext();
  if (command === 'context') console.log(JSON.stringify(context));
  else if (command === 'candidate') {
    const candidate = context.event === 'pull_request' && releasePr(context.pr, context.repository);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `candidate=${candidate}\n`);
  }
  else if (command === 'record') {
    if (!TASKS.includes(task)) throw Error('Unknown validation task');
    const record = { task, context, ...(task.startsWith('unit-') ? { unit: JSON.parse(fs.readFileSync('ci-unit-results.json', 'utf8')) } : {}) };
    fs.mkdirSync('ci-validation', { recursive: true });
    fs.writeFileSync(`ci-validation/validation-${task}.json`, JSON.stringify(record));
  } else if (command === 'assemble') {
    const records = TASKS.map(t => JSON.parse(fs.readFileSync(`ci-validation/validation-${t}.json`, 'utf8')));
    const proof = assembleProof(context, records);
    if (proof) fs.writeFileSync('ci-release-proof.json', JSON.stringify(proof));
    else console.log('No reusable release proof: validation contexts or full-shard evidence differ.');
  } else throw Error('Expected context, record <task>, or assemble');
}
