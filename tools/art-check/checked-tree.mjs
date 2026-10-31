// Reuse only an exact tree/environment proven by a successful same-repository Art check run.
// Missing/expired/invalid proof is a cache miss, never a successful check.
export function proofMatches(proof, tree, environment, runId) {
  return proof?.schema === 1 && /^[a-f0-9]{40}$/.test(tree) && proof.tree === tree && proof.runId === runId
    && ['node', 'os', 'arch', 'browser'].every(k => typeof environment[k] === 'string' && proof.environment?.[k] === environment[k]);
}

/** API/download failures conservatively fall back to the actual art check. */
export async function findPassedTree({ github, owner, repo, tree, environment, currentRun, readProof, info = () => {} }) {
  try {
    // Bounded lookup; older proofs simply miss. Never infer a pass from head SHA alone:
    // a PR workflow may have checked a synthetic merge rather than that head's tree.
    const { data } = await github.rest.actions.listWorkflowRuns({ owner, repo, workflow_id: 'art-check.yml', status: 'success', per_page: 100 });
    for (const run of data.workflow_runs) {
      if (run.id === currentRun || run.conclusion !== 'success' || run.head_repository?.full_name !== `${owner}/${repo}`) continue;
      const { data: commit } = await github.rest.git.getCommit({ owner, repo, commit_sha: run.head_sha });
      if (commit.tree.sha !== tree) continue;
      const { data: artifacts } = await github.rest.actions.listWorkflowRunArtifacts({ owner, repo, run_id: run.id, per_page: 100 });
      for (const artifact of artifacts.artifacts.filter(a => a.name === 'art-check-tree' && !a.expired)) {
        try { if (proofMatches(await readProof(artifact), tree, environment, run.id)) return run.id; }
        catch (error) { info(`Art proof ${artifact.id} unavailable: ${String(error)}`); }
      }
    }
  } catch (error) { info(`Checked-tree lookup unavailable; checking art: ${String(error)}`); }
  return null;
}
