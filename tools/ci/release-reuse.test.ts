import { describe, expect, it } from 'vitest';
import { TASKS, JOBS, assembleProof, findReleaseProof, proofMatches, releasePr } from './release-reuse.mjs';

const hex = (s: string) => s.repeat(40);
const copy = (v: any) => structuredClone(v);
function fixture() {
  const source: any = { schema: 1, repository: 'owner/game', event: 'pull_request', ref: 'refs/pull/12/merge',
    runId: 100, attempt: 2, commit: hex('a'), tree: hex('b'), clean: true, workload: 'f'.repeat(64),
    environment: { node: 'v22.20.0', os: 'Linux', arch: 'X64', image: 'ubuntu24', imageVersion: '20261104.1' },
    pr: { number: 12, repository: 'owner/game', base: 'main', branch: 'claude/release-12', head: hex('c'), title: 'Release: movement' } };
  const records = TASKS.map((task: string) => ({ task, context: copy(source), ...(task.startsWith('unit-') ? {
    unit: { mode: 'full', status: 0, testMs: 100, shard: `${task.slice(-1)}/4`, tests: [`src/${task}.test.ts`], balanced: { files: 1, of: 4 } },
  } : {}) }));
  const current = { ...copy(source), event: 'push', ref: 'refs/heads/main', runId: 200, commit: hex('d'), pr: null };
  const run: any = { id: 100, run_attempt: 2, status: 'completed', conclusion: 'success', event: 'pull_request',
    repository: { full_name: source.repository }, head_repository: { full_name: source.repository },
    path: '.github/workflows/ci.yml', head_sha: source.pr.head, html_url: 'https://github.com/owner/game/actions/runs/100' };
  const pr = { number: 12, merged: true, merge_commit_sha: hex('d'), title: source.pr.title,
    base: { ref: 'main' }, head: { ref: source.pr.branch, sha: source.pr.head, repo: { full_name: source.repository } } };
  const artifact = { id: 300, name: 'ci-release-proof-2', expired: false, size_in_bytes: 500 };
  const jobs = JOBS.map((name: string) => ({ name, status: 'completed', conclusion: 'success' }));
  const state: any = { source, records, current, run, pr, artifact, jobs, latest: run, checkedTree: source.tree, mergedTree: source.tree, reads: 0 };
  const actions = {
    listWorkflowRuns: async () => ({ data: { workflow_runs: [state.run] } }),
    listWorkflowRunArtifacts: async () => state.artifacts ?? [state.artifact],
    listJobsForWorkflowRun: async () => state.jobs,
    getWorkflowRun: async () => ({ data: state.latest }),
  };
  const github = { rest: { actions, pulls: { get: async () => ({ data: state.pr }) }, git: {
    getCommit: async ({ commit_sha }: any) => ({ data: { tree: { sha: commit_sha === source.commit ? state.checkedTree : state.mergedTree } } }),
  } }, paginate: async (fn: any, args: any) => fn(args) };
  const find = () => findReleaseProof({ github, current: state.current, readProof: async () => {
    state.reads++; if (state.throwRead) throw Error('download unavailable');
    return state.proof ?? assembleProof(state.source, state.records);
  } });
  return { ...state, state, find, github };
}

describe('full release validation evidence', () => {
  it('matches trees even when the PR head, tested merge and main commits differ', async () => {
    const f = fixture();
    expect(await f.find()).toMatchObject({ runId: 100, attempt: 2, tree: hex('b') });
    f.state.run.head_sha = f.source.commit;
    expect(await f.find()).not.toBeNull();
  });
  it('recognizes release/publish naming only for same-repository PRs into main', () => {
    const { source } = fixture();
    for (const branch of ['claude/rel-123', 'release/12', 'other/release/12', 'claude/publish-snapshot'])
      expect(releasePr({ ...source.pr, branch, title: 'Check' }, source.repository)).toBe(true);
    for (const change of [{ base: 'claude/prototype' }, { repository: 'fork/game' }, { branch: 'feature', title: 'Feature' }])
      expect(releasePr({ ...source.pr, ...change }, source.repository)).toBe(false);
  });
  it('refuses partial, related, failed, empty or duplicate unit evidence', () => {
    const changes = [
      (r: any[]) => r.pop(),
      (r: any[]) => r[2].unit.mode = 'related',
      (r: any[]) => r[2].unit.status = 1,
      (r: any[]) => r[2].unit.signal = 'SIGTERM',
      (r: any[]) => r[2].unit.error = 'could not run',
      (r: any[]) => r[2].unit.testMs = 0,
      (r: any[]) => r[2].unit.tests = [],
      (r: any[]) => r[2].unit.shard = '1/4',
      (r: any[]) => r[2].unit.tests = r[1].unit.tests,
      (r: any[]) => r[2].unit.balanced.of = 5,
      (r: any[]) => r[2].context.environment.node = 'v20.0.0',
      (r: any[]) => r[2].context.tree = hex('e'),
      (r: any[]) => r[2].context.clean = false,
    ];
    for (const change of changes) { const { source, records } = fixture(); change(records); expect(assembleProof(source, records)).toBeNull(); }
  });
  it('permits native full shards while rejecting mixed full/selected evidence', () => {
    const { source, records } = fixture();
    for (const r of records.filter((r: any) => r.unit)) { delete r.unit.balanced; r.unit.tests = []; }
    expect(assembleProof(source, records)).not.toBeNull();
    records[1].unit.tests = ['src/a.test.ts'];
    expect(assembleProof(source, records)).toBeNull();
  });
  it('requires exact environment/workload/tree, clean source and matching run attempt', () => {
    const { source, current, run, records } = fixture(), proof = assembleProof(source, records);
    for (const change of [ { tree: hex('e') }, { workload: '0'.repeat(64) }, { clean: false }, { runId: 100 },
      ...['node', 'os', 'arch', 'image', 'imageVersion'].map(k => ({ environment: { ...current.environment, [k]: 'different' } })) ])
      expect(proofMatches(proof, { ...current, ...change }, run)).toBe(false);
    expect(proofMatches(proof, current, { ...run, run_attempt: 3 })).toBe(false);
    expect(proofMatches(proof, current, { ...run, head_sha: hex('e') })).toBe(false);
  });
});

describe('release provenance lookup fails closed', () => {
  it('never shortcuts PR, prototype, dispatch or dirty main runs', async () => {
    for (const change of [{ event: 'pull_request' }, { event: 'workflow_dispatch' }, { ref: 'refs/heads/claude/prototype' }, { clean: false }]) {
      const f = fixture(); Object.assign(f.current, change);
      expect(await f.find()).toBeNull(); expect(f.state.reads).toBe(0);
    }
  });
  it('rejects unsuccessful, wrong-repository, wrong-workflow and non-PR source runs', async () => {
    for (const change of [{ conclusion: 'failure' }, { conclusion: 'cancelled' }, { status: 'in_progress' }, { event: 'push' },
      { repository: { full_name: 'fork/game' } }, { head_repository: { full_name: 'fork/game' } }, { path: '.github/workflows/other.yml' }]) {
      const f = fixture(); Object.assign(f.run, change); expect(await f.find()).toBeNull();
    }
  });
  it('rejects changed/missing/skipped/failed/cancelled or duplicate required jobs', async () => {
    for (const name of JOBS) for (const result of ['skipped', 'failure', 'cancelled', 'missing', 'duplicate']) {
      const f = fixture(), target = f.jobs.find((j: any) => j.name === name);
      if (result === 'missing') f.state.jobs = f.jobs.filter((j: any) => j !== target);
      else if (result === 'duplicate') f.jobs.push(copy(target));
      else target.conclusion = result;
      expect(await f.find(), `${name}: ${result}`).toBeNull();
    }
  });
  it('rejects unavailable, expired, duplicate, oversized, malformed and older-attempt artifacts', async () => {
    for (const change of [{ expired: true }, { size_in_bytes: 1048577 }, { size_in_bytes: 0 }, { name: 'ci-release-proof-1' }]) {
      const f = fixture(); Object.assign(f.artifact, change); expect(await f.find()).toBeNull();
    }
    for (const change of [{ artifacts: [] }, { proof: {} }, { throwRead: true }]) {
      const f = fixture(); Object.assign(f.state, change); expect(await f.find()).toBeNull();
    }
    const f = fixture(); f.state.artifacts = [f.artifact, f.artifact]; expect(await f.find()).toBeNull();
  });
  it('requires the merged PR and both actual Git trees, not an artifact assertion', async () => {
    for (const change of [{ merged: false }, { merge_commit_sha: null }, { base: { ref: 'claude/prototype' } },
      { title: 'Changed title' }, { head: { ...fixture().pr.head, sha: hex('e') } }]) {
      const f = fixture(); Object.assign(f.pr, change); expect(await f.find()).toBeNull();
    }
    for (const field of ['checkedTree', 'mergedTree']) { const f = fixture(); f.state[field] = hex('e'); expect(await f.find()).toBeNull(); }
  });
  it('rejects a concurrent rerun and falls back on API failure', async () => {
    const f = fixture(); f.state.latest = { ...f.run, run_attempt: 3 }; expect(await f.find()).toBeNull();
    f.github.rest.actions.listWorkflowRuns = async () => { throw Error('rate limit'); }; expect(await f.find()).toBeNull();
  });
});
