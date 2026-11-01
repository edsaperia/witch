# Parallel art-check evidence

PR1583 owns only the art workflow, art orchestration, safety fixtures, recorded weights and scoped docs. Canonical owns other CI, unit sharding, browser-install policy and publication. No game code or user-visible text changed.

One immutable complete plan preserves exact checked-tree lookup and validated per-task cache reuse. Four shards assign every task once using observed durations; unknown tasks get a conservative weight. Auxiliary/labs remain whole. Unknown dependency analysis runs the unchanged full art command once; the other three shards must submit successful no-op manifests. Browser version/install commands are relocated unchanged, with no new retry policy.

The always-evaluated `art check` gate verifies planning/job conclusions, source tree, run, environment, plan hash, allowed attempt and exact task/key coverage. Failed/cancelled/skipped required jobs, missing/duplicate/extra records and stale proofs fail. An explicit failed-job retry can reuse passed manifests only from the same immutable plan/run. Exact/cached modes require skipped shards and validated evidence. A fresh complete source plan is recomputed before affected/cached combination. Existing `art-check-tree` artifact/schema and task-result cache are retained.

Before: source c67d3da7729581fb0a8a4b0a5dba115b69235a87, Art check41253034424/job124690329035, ubuntu-latest, Nodev22.23.4, Playwright1.56.1:42m34s total; sprites1621.5s/three pages, sleeping-legends384.8s/128checks, auxiliary/labs882.8s. The59 observed durations in `tools/art-check/task-times.json` are scheduling weights under concurrency, not predicted wall-time savings.

After: pending exact-head cloud CI. No local art/browser/full-suite/typecheck is claimed: canonical1476#6551913255 reserves the laptop for Ed. Only source review, JavaScript syntax and whitespace checks ran locally. Seven pure orchestration safety fixtures run in the planning job; ordinary CI retains broader checks. Tool/workflow fingerprints can make the first art run cold. Record runner, cache hits, coverage, per-shard elapsed and total wall time before claiming improvement, explicitly disclosing workload differences.

First cloud run41263347164 on e5dc494b0: plan seven fixtures PASS; shard0 PASS. Shard1 failed before browser/art at job124721483331 because its runner's `node-version: 22` resolved cached22.23.3 while the plan/shard0 used22.23.4. The strict environment guard correctly refused this mismatch; zero art detail annotations did not mean art passed. All three setup-node sites now pin22.23.4. Environment/fingerprint checks remain exact; mismatch diagnostics now print expected/actual identity. No blind rerun was requested. Other old-head shards were still running at diagnosis; no complete old-head acceptance or after-speedup claim.

[Cloud proof candidates](cloud-proof-candidates.md) lists recommendations and prerequisites only; no proof migration or new runner is authorized here.

## Completed first successful art run (historical e3ba head)

Art run41264535322 succeeded on source e3ba7d6615f8a217deb0fc3d8c3f336fe9af6701, tested tree a44da33875ebab3a19b4e31f6efac9b7b8c75b82, attempt1. Original downloaded plan and combined proof agree exactly on all59 unique task IDs/keys and passed records:58 sprite tasks/1694 assertions plus the auxiliary/lab unit. Seven pure safety fixtures passed. Every job used Nodev22.23.4/Linuxx64/Playwright1.56.1. Planner snapshot3b8c7bcb5ad5dc9780fc3eebe175836e3d8254b4c6ff30f0b11dc192912dd071.

The result cache restored art-results-v1-Linux-41262800176-1 and imported472 historical records, but the actual complete plan had ZERO current-key hits: all59 tasks ran. npm and browser download caches hit. Historical import count is not current fingerprint reuse. This evidence predates1592's new fingerprint scheme and does not certify its local integration.

| Job | Started UTC | Finished UTC | Job wall time | Assigned tasks |
|---|---|---|---|---|
| Plan124724963833 |02:27:52|02:28:11|19s|complete plan|
| Shard0/124726838575 |02:37:12|02:47:57|10m45s|13|
| Shard1/124726838582 |02:38:58|03:16:12|37m14s|16 including auxiliary|
| Shard2/124726838577 |02:32:10|02:55:14|23m04s|15|
| Shard3/124726838566 |02:39:05|02:51:16|12m11s|15|
| Strict gate124736186800 |03:16:14|03:16:30|16s|59 matching records|

Created02:17:01 to gate completion03:16:30:59m29s, including10m51s initial queue. Plan completion to individual shard start waits were9m01s/10m47s/3m59s/10m54s for shards0/1/2/3; these overlap and must not be added to end-to-end latency. Sum of six active job wall times is5029s (83m49s), excluding queue; this is runner occupancy, not CPU time or an invoice calculation. Three renderer pages per art invocation remained unchanged.

All four old predicted weights were1439.7s, but observed job times were very different. Shard1's sprite pass finished02:45:49, then its whole auxiliary/lab invocation took1816.2s (~30m16s), including lab pages1556.7s and lint200.6s. The whole unit remains covered; no assertion was dropped to shorten it. Sleeping-legends on shard2 took1092.1s/128 checks versus historical384.8s. This exposes a lab bottleneck and substantial timing variability; it does not establish their cause or authorize splitting/weakening auxiliary coverage.

No measured overall speedup: historical single art job42m34s and this queued multi-job run59m29s have different endpoints, sources and runner conditions. The completed art result is real, but full CI on e3ba remains RED from the stale art-needs assertion (3237passed/1failed). Ownership QUESTION6552510945 is still pending. Local1592 integration6e731876b remains unpushed under overnight6552671020; latest1592 head4067d81ee11c87c44cb4b5772bd4f5724dced2f1 was observed, not merged blindly. No new run, rerun, cancellation, threshold reset, FINAL or release acceptance follows from this report.
