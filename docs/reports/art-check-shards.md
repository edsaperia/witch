# Parallel art-check evidence

PR1583 owns only the art workflow, art orchestration, safety fixtures, recorded weights and scoped docs. Canonical owns other CI, unit sharding, browser-install policy and publication. No game code or user-visible text changed.

One immutable complete plan preserves exact checked-tree lookup and validated per-task cache reuse. Four shards assign every task once using observed durations; unknown tasks get a conservative weight. Auxiliary/labs remain whole. Unknown dependency analysis runs the unchanged full art command once; the other three shards must submit successful no-op manifests. Browser version/install commands are relocated unchanged, with no new retry policy.

The always-evaluated `art check` gate verifies planning/job conclusions, source tree, run, environment, plan hash, allowed attempt and exact task/key coverage. Failed/cancelled/skipped required jobs, missing/duplicate/extra records and stale proofs fail. An explicit failed-job retry can reuse passed manifests only from the same immutable plan/run. Exact/cached modes require skipped shards and validated evidence. A fresh complete source plan is recomputed before affected/cached combination. Existing `art-check-tree` artifact/schema and task-result cache are retained.

Before: source c67d3da7729581fb0a8a4b0a5dba115b69235a87, Art check41253034424/job124690329035, ubuntu-latest, Nodev22.23.4, Playwright1.56.1:42m34s total; sprites1621.5s/three pages, sleeping-legends384.8s/128checks, auxiliary/labs882.8s. The59 observed durations in `tools/art-check/task-times.json` are scheduling weights under concurrency, not predicted wall-time savings.

After: pending exact-head cloud CI. No local art/browser/full-suite/typecheck is claimed: canonical1476#6551913255 reserves the laptop for Ed. Only source review, JavaScript syntax and whitespace checks ran locally. Seven pure orchestration safety fixtures run in the planning job; ordinary CI retains broader checks. Tool/workflow fingerprints can make the first art run cold. Record runner, cache hits, coverage, per-shard elapsed and total wall time before claiming improvement, explicitly disclosing workload differences.

First cloud run41263347164 on e5dc494b0: plan seven fixtures PASS; shard0 PASS. Shard1 failed before browser/art at job124721483331 because its runner's `node-version: 22` resolved cached22.23.3 while the plan/shard0 used22.23.4. The strict environment guard correctly refused this mismatch; zero art detail annotations did not mean art passed. All three setup-node sites now pin22.23.4. Environment/fingerprint checks remain exact; mismatch diagnostics now print expected/actual identity. No blind rerun was requested. Other old-head shards were still running at diagnosis; no complete old-head acceptance or after-speedup claim.

[Cloud proof candidates](cloud-proof-candidates.md) lists recommendations and prerequisites only; no proof migration or new runner is authorized here.
