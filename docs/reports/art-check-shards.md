# Parallel art-check evidence

PR1583 owns only the art workflow, art orchestration, safety fixtures, recorded weights and scoped docs. Canonical owns other CI, unit sharding, browser-install policy and publication. No game code or user-visible text changed.

One immutable complete plan preserves exact checked-tree lookup and validated per-task cache reuse. Three selected shards assign every task once using observed durations; unknown tasks get a conservative weight. Auxiliary/labs remain whole. Unknown dependency analysis runs the unchanged full art command once; the other selected shards must submit successful no-op manifests. Browser version/install commands are relocated unchanged, with no new retry policy. The initial four-shard evidence below is historical; the refreshed choice is documented at the end.

The always-evaluated `art check` gate verifies planning/job conclusions, source tree, run, environment, plan hash, allowed attempt and exact task/key coverage. Failed/cancelled/skipped required jobs, missing/duplicate/extra records and stale proofs fail. An explicit failed-job retry can reuse passed manifests only from the same immutable plan/run. Exact/cached modes require skipped shards and validated evidence. A fresh complete source plan is recomputed before affected/cached combination. Existing `art-check-tree` artifact/schema and task-result cache are retained.

Before: source c67d3da7729581fb0a8a4b0a5dba115b69235a87, Art check41253034424/job124690329035, ubuntu-latest, Nodev22.23.4, Playwright1.56.1:42m34s total; sprites1621.5s/three pages, sleeping-legends384.8s/128checks, auxiliary/labs882.8s. The59 observed durations in `tools/art-check/task-times.json` are scheduling weights under concurrency, not predicted wall-time savings.

Initial preparation (historical): exact-head cloud CI was pending. No local art/browser/full-suite/typecheck was claimed: canonical1476#6551913255 reserved the laptop for Ed. Only source review, JavaScript syntax and whitespace checks ran locally. Seven original pure orchestration safety fixtures ran in the planning job; ordinary CI retained broader checks. Tool/workflow fingerprints could make the first art run cold. The resumed CPU checks and current acceptance gate appear below.

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

## Resumed ownership and controlled cold gate (2026-11-01)

Canonical6561275704 resolved the workflow-test ownership question. Prototypefe62217e normally merged; e763dcabf updates only that scoped test. Local14 workflow tests,7 original orchestration tests and typecheck passed. Art41331519953 passed on exacte763: created17:27:02 to combined gate finish17:27:57,55s queue-inclusive. Plan queue3s/execution32s, final gate queue2s/execution17s. All59 task records were validated cache hits; all four shards skipped (queue/execution N/A). This is cache evidence, not a cold speedup against42m34.

Canonical6561396621 requires refreshed duration packing, a count comparison and ONE controlled cold run. Release only if its complete queue-inclusive envelope beats42m34 and normal cached path remains about1minute; otherwise retain the unsharded implementation and park sharding. No release decision is made by this branch.

### Measured packing model

`tools/art-check/task-times.json` now records all58 sprite-task timings and the whole1816.2s auxiliary invocation from cold41264535322, with source SHA, artifact paths and log SHA256s. To refresh: download `art-check-shard-*` artifacts from a completed cold run, extract the named `... s ... checks page ...` lines (not the later art-lint species lines), and the auxiliary `passes: ...; all ... s` line. Require exactly59 unique task IDs matching the complete plan before replacing the table; refresh queue/setup observations and count projections too. Zero means rounded below0.05s, not skipped coverage. Unknown tasks retain a conservative60s weight.

Sprite durations overlap across the existing three-page pool. Packing now projects that pool's ordered greedy lane schedule, then adds auxiliary duration serially, matching existing execution. It does not sum overlapping sprite seconds as runner wall time. Auxiliary is deliberately indivisible: its30m16.2s floor prevents a21-minute critical path without a separately authorized check decomposition. No check, lab or assertion was split or dropped.

| Shards | Projected render critical path | No-queue envelope | Replay of historical queue |
|---|---:|---:|---:|
|2|32m14.7s|33m47.7s|53m39.7s|
|3|30m16.2s|31m49.2s|46m39.2s|
|4|30m16.2s|31m49.2s|46m39.2s|

Choose3: same predicted critical path as4 while consuming one fewer runner, and better than2. The three loads are1816.2/1092.1/1092.1s; auxiliary is alone. These are estimates, not new measurements. No-queue adds the observed19s plan execution, conservative56s setup/teardown and18s final gate envelope. Historical replay uses670s workflow-created-to-plan-finish, observed shard availability offsets239/541/647/654s, and18s final gate; it optimistically matches longest work to earliest available runner. Account scheduling can assign them differently. All choices miss the release reference under those old queue conditions; the cold run must establish actual current latency. Do not hide queue delay or claim the projection beats42m34.

### One-run cold allocation

Normal PR/push cache lookup, key validation and reuse remain unchanged. `workflow_dispatch` defaults `cold=false`. Only an explicit canonical allocation may dispatch with `cold=true` on the exact final branch head. That run disables exact-tree lookup, result-cache restoration and historical-result import, plans against an empty cache, discards stale cached flags, and uses a distinct run-ID-scoped cache path. It must produce successful manifests for every selected shard; the same strict combination checks source/run/attempt/environment and all59 task keys. Ordinary caches may be seeded only by its successfully validated combined proof, as before. Full unknown-analysis fallback still executes once with successful manifests from every selected shard.

The cached run and the controlled cold run must both name their exact source, workflow/run IDs, cache mode, all job timestamps and final conclusion. A skipped shard has no measured queue or rendering time. The cold result is pending, not accepted. No laptop/browser run or game-visible text change is part of this work.
