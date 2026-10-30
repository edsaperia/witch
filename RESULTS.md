# Parity results round 4 A (not for merge)

Commit 5bdd581732cdb973729d8814aff5ca963eb32655 (codex/travel-perf-2); `git rev-parse HEAD` confirmed; 5e51a00c4 present locally (commit). `npm ci` ok. Renderer: SwiftShader (ANGLE Vulkan). Run one after the other, each `timeout 840s`, CLOUD_RIG=1, EXPECT_SHA set, SHARDS=8.

| shard | exit code | wall-clock | result rows |
|---|---|---|---|
| SHARD=0 (ground-extra-parity-0) | 0 | 225 s | 68 |
| SHARD=1 (ground-extra-parity-1) | 0 | 226 s | 68 |

Summary (computed from each shard's printed JSON rows; the script prints no other summary line):
- Shard 0: 68 rows (fixtures extras-0..248 step 8, sensitivity-ZOO_STREET, forced-full; modes plain and beach). Every row: parity 0 pixels (max 0), currentDrift 0, baselineDrift 0. No RGBA differences.
- Shard 1: 68 rows (fixtures extras-1..249 step 8, sensitivity-ZOO_PLAZA, zoo-full; modes plain and beach). Every row: parity 0 pixels (max 0), currentDrift 0, baselineDrift 0. No RGBA differences.
- Sensitivity: every row's distance-field-ablation sensitivity changed pixels (nonzero, none at 0), e.g. extras-112 plain 12657 px max 172.
- Shader/link/page errors: none seen. Only non-row output is esbuild "Duplicate key legendLob / legendBeam" warnings in art/effects.js (lines 130, 131).
- Files over 20 MB skipped: none (each directory 3.4 MB). Raw stdout added as stdout.txt in each directory.
