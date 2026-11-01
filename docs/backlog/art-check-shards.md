# Art-check sharding — parked

Ed, 2026-11-01 about17:40UTC: “I don't think art checks should hold up a build. We can do them when there's time.” Canonical1583#6561490005 and6561497894 cancel the cold measurement and park sharding. PR1583 stays draft; no sharding release. No cold dispatch occurred. Art scheduling is now a separate scheduling-only change: nightly03:17UTC against exact `claude/prototype`, or manual on any chosen ref; no PR/push trigger or build/deploy/release dependency. Nightly failures update one standing issue1476 comment with sourceSHA and failed/unproven task batch; a later pass resolves that comment. All checks, fingerprint cache and exact-tree reuse remain.

The parked implementation and complete59-task duration table with artifact hashes are preserved at pushed commit [7c7e6b513](https://github.com/edsaperia/witch/commit/7c7e6b513eb0f29e35136197c843c88b79433716), including [task-times.json](https://github.com/edsaperia/witch/blob/7c7e6b513eb0f29e35136197c843c88b79433716/tools/art-check/task-times.json). Those unshipped files are restored to prototype in the active diff, leaving only scheduling/tests/this note. The measurements came from cold41264535322/e3ba7d66. Its four active shard times were10m45/37m14/23m04/12m11; queue-inclusive envelope59m29 versus unsharded42m34. Cached e763dcab/41331519953 validated59/59 records in55s including queue; that is not cold-render speedup evidence.

The whole auxiliary/lab unit took1816.2s (30m16.2), an indivisible floor without separately authorized decomposition. Duration packing models the existing three-page sprite pool and serial auxiliary, not overlapping task-time sums. The refreshed three-shard proposal isolates auxiliary with projected loads1816.2/1092.1/1092.1s.

| Shards | Render critical path | No-queue envelope | Historical queue replay |
|---|---:|---:|---:|
|2|32m14.7s|33m47.7s|53m39.7s|
|3|30m16.2s|31m49.2s|46m39.2s|
|4|30m16.2s|31m49.2s|46m39.2s|

Three tied four's projected critical path with fewer runners. Replay includes670s workflow-to-plan completion, historical availability offsets239/541/647/654s,56s setup/teardown and18s gate, optimistically assigning longest work first. These are estimates; all miss42m34 with those old queues. No controlled cold result exists, and none is now required. Preserve the work/history for an explicit future request; do not resume a cold run or make sharding a release gate. Scheduling-only commit may be extracted by canonical while the sharding draft remains parked.
