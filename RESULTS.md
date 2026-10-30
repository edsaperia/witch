# Parity results round 4 C (not for merge)

Commit 5bdd581732cdb973729d8814aff5ca963eb32655 (codex/travel-perf-2); baseline 5e51a00c4 available locally. `npm ci` ok. No source edited.

| Shard | Exit code | Wall-clock | Rows |
|---|---|---|---|
| ground-extra-parity-4 (SHARDS=8 SHARD=4) | 0 | 298 s | 66 |
| ground-extra-parity-5 (SHARDS=8 SHARD=5) | 0 | 292 s | 66 |

Summary (from the printed JSON rows, counted by script):
- Both shards: 66 rows each; 0 rows with nonzero `parity`, `currentDrift` or `baselineDrift` pixel counts (RGBA difference counts all 0, max 0).
- Sensitivity (distance-field-ablation): every row nonzero (e.g. extras-108 plain 12692 px, max 172) -> 0 rows with zero/missing sensitivity.
- No shader, link or page errors in any row (no "error" text in rows). Only noise in output: esbuild duplicate-key warnings for `legendLob`/`legendBeam` in art/effects.js.
- GPU: ANGLE (Google, Vulkan 1.3.0, SwiftShader Device (Subzero)), software renderer.
- Skipped files over 20 MB: none (each output dir ~3.3 MB).
