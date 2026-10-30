# Parity results 2 C (not for merge)

Commit: 832fd07bdd09cdcf6e1f4502f62c827493da5956 (codex/travel-perf-2); commit 5e51a00c4 present locally. `npm ci` ok.
GPU in every row: ANGLE (Google, Vulkan 1.3.0 SwiftShader Device (Subzero)).

| Run | Exit | Wall-clock | Rows | Rows with nonzero parity/currentDrift/baselineDrift pixels | Sensitivity |
|---|---|---|---|---|---|
| dry (SHARD=0 DRY_ROW=0) | 0 | npm ci + dry together 9 s | 1 (extras-0) | 0 (parity 0/0) | distance-field-ablation 12666 px, max 97 |
| shard 4 of 8 | 0 | 351 s | 66 | 0 | every row's sensitivity entry nonzero (e.g. extras-196: 10024 px, max 98) |
| shard 5 of 8 | 0 | 362 s | 66 | 0 | every row's sensitivity entry nonzero |

Notes: the script prints one JSON line per row and no separate pass/fail line; "pass" above is exit 0 plus zero RGBA differences in every row (parity, currentDrift, baselineDrift all {pixels:0,max:0}). No shader, link or page errors in the logs; only esbuild duplicate-key warnings for art/effects.js (legendLob, legendBeam).
Output directories: ground-extra-dry, ground-extra-parity-4, ground-extra-parity-5 (each ~3.3 MB). Files skipped for size (>20 MB): none.
