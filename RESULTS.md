# Parity results 2 B (not for merge)

Commit 832fd07bdd09cdcf6e1f4502f62c827493da5956 (codex/travel-perf-2); 5e51a00c4 present locally. `npm ci` ok. CLOUD_RIG=1, EXPECT_SHA set, SHARDS=8. GPU: SwiftShader (Vulkan, ANGLE).

| Run | Exit | Wall time | Rows | Parity diffs (pixels/max) | currentDrift | baselineDrift |
|---|---|---|---|---|---|---|
| dry (SHARD=0 DRY_ROW=0) | 0 | 8 s | 1 (extras-0, plain) | 0 / 0 | 0 / 0 | 0 / 0 |
| shard 2 (ground-extra-parity-2) | 0 | 247 s | 68 | all 0 / 0 | all 0 | all 0 |
| shard 3 (ground-extra-parity-3) | 0 | 233 s | 66 | all 0 / 0 | all 0 | all 0 |

Sensitivity (distance-field-ablation changed-pixel counts): dry 12666 (max 97); shard 2: 5013 to 12707; shard 3: 10024 to 12707. All nonzero, so the comparison could detect differences.
Shard 2 fixtures: extras-2,10,18,...,250 (step 8), debug-full, sensitivity-DANCEFLOOR. Shard 3: extras-3,11,...,251, sensitivity-PAVEMENT.
No shader, link or page errors were found in the output (only esbuild "duplicate key" warnings in art/effects.js, legendLob/legendBeam).
No RGBA differences in any row. Skipped files over 20 MB: none.
Output directories: ground-extra-dry/, ground-extra-parity-2/, ground-extra-parity-3/ (baseline.cjs, candidate.cjs, results.json each).
