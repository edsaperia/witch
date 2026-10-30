# Parity results round 4 B (not for merge)

Commit: 5bdd581732cdb973729d8814aff5ca963eb32655 (HEAD confirmed); 5e51a00c4 present locally (commit). `npm ci` ok. No source edited. No files over 20 MB skipped.

## Shard 2 (SHARDS=8 SHARD=2, ground-extra-parity-2)
- Exit code: 0; wall-clock 346 s
- Rows: 68 JSON result rows; rows with nonzero parity / currentDrift / baselineDrift pixels: 0 (all `parity: {pixels:0,max:0}`)
- Sensitivity: every row's distance-field-ablation changed >= 5013 pixels (min 5013); extraSensitivity null on 66 of 68 rows (the other 2 rows carry feature sensitivity)
- Shader/link/page errors: none printed (only esbuild "Duplicate key" warnings in art/effects.js: legendLob, legendBeam)
- GPU: ANGLE Vulkan SwiftShader (parallel false)

## Shard 3 (SHARDS=8 SHARD=3, ground-extra-parity-3)
- Exit code: 0; wall-clock 334 s
- Rows: 66 JSON result rows; rows with nonzero parity / currentDrift / baselineDrift pixels: 0
- Sensitivity: min distance-field-ablation pixels 10024 across rows; last row sensitivity-PAVEMENT: extraSensitivity PAVEMENT 3504 px (max 122)
- Shader/link/page errors: none printed (same esbuild duplicate-key warnings)
- GPU: ANGLE Vulkan SwiftShader (parallel false)

Raw output: ground-extra-parity-2/results.json, ground-extra-parity-3/results.json (+ baseline.cjs, candidate.cjs).
