# Parity results 2 A (not for merge)

Commit 832fd07bdd09cdcf6e1f4502f62c827493da5956 (HEAD confirmed); baseline 5e51a00c4 present locally. `npm ci` ok. No source edited. GPU: SwiftShader (ANGLE Vulkan). Skipped files over 20 MB: none.

| run | exit | wall | rows | result |
|---|---|---|---|---|
| dry (SHARD=0 DRY_ROW=0) | 0 | 11 s | 1/1, complete | parity 0 px, currentDrift 0, baselineDrift 0; sensitivity (distance-field-ablation) 12666 px, max 97 |
| shard 0 | 1 | 390 s | 64/68, complete=false | all 64 rows done: parity/currentDrift/baselineDrift 0 px; min sensitivity 10024 px. Then FAILED: `Error: page.evaluate: Error: ground extra ZOO_STREET not exercised` at `compareGround (ground-parity-scene.mjs:121:43)`. Remaining 4 rows not run. |
| shard 1 | 0 | 418 s | 68/68, complete | parity/currentDrift/baselineDrift 0 px on every row; min sensitivity 5013 px; no shader/link/page errors in log |

Notes:
- Shard 1's first attempt (run right after shard 0) was killed by my own background-task time limit mid-run (not a script failure; ~35 rows done). I deleted that partial output and reran shard 1 alone with the identical command; the table shows the rerun.
- Shard 0's failure is deterministic script behaviour (a thrown check, not a timeout); I did not retry or edit code. Log has esbuild duplicate-key warnings from art/effects.js (legendLob/legendBeam), harmless.
- Each directory has results.json, baseline.cjs, candidate.cjs and run.log (full stdout/stderr).
