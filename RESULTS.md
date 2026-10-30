# Parity results round 4 D (not for merge)

Commit: 5bdd581732cdb973729d8814aff5ca963eb32655 (codex/travel-perf-2); 5e51a00c4 present locally (`git cat-file -t` = commit). `npm ci` ran fine. Source not edited.
Command for each shard: `timeout 840s env CLOUD_RIG=1 EXPECT_SHA=5bdd581732cdb973729d8814aff5ca963eb32655 SHARDS=8 SHARD=<n> node tools/bench/ground-extra-parity.mjs ground-extra-parity-<n>`

## Shard 6 (ground-extra-parity-6)
- Exit code: 0. Wall-clock: 309 s.
- 66 result rows (32 extras fixtures x plain/beach, plus sensitivity-KOI plain/beach). Full output: ground-extra-parity-6/stdout.txt; data: results.json.
- Parity RGBA difference: 0 pixels (max 0) in all 66 rows. currentDrift 0/0 and baselineDrift 0/0 in all rows.
- Sensitivity (distance-field-ablation): 10024 pixels in every extras row (max 98-110); sensitivity-KOI 12666/12668 pixels (max 172). Feature KOI ablation: 86 pixels, max 136 (both modes).
- Errors: no shader, link, page or console errors. Only esbuild warnings (duplicate keys legendLob/legendBeam in art/effects.js:130-131).
- GPU: SwiftShader (ANGLE Vulkan), parallel=false.

## Shard 7 (ground-extra-parity-7)
- Exit code: 0. Wall-clock: 305 s.
- Note: the first attempt was killed after ~290 s by MY 10-minute background-task limit (not the script's 840 s timeout), so shard 7 was rerun from scratch with a longer limit. The reported run is the rerun; the killed partial stdout is kept as stdout-first-attempt-killed-partial.txt. Shard 6 was unaffected.
- 66 result rows (32 extras fixtures x plain/beach, plus sensitivity-BARE plain/beach). Full output: ground-extra-parity-7/stdout.txt; data: results.json.
- Parity RGBA difference: 0 pixels (max 0) in all 66 rows. currentDrift 0/0 and baselineDrift 0/0 in all rows.
- Sensitivity (distance-field-ablation): 10024 pixels in every extras row (max 110). Feature BARE ablation: 26840 pixels (max 122) plain, 19163 pixels (max 128) beach.
- Errors: no shader, link, page or console errors. Same esbuild duplicate-key warnings only.
- GPU: SwiftShader (ANGLE Vulkan), parallel=false.

## Skipped files
None over 20 MB (largest ~1.7 MB).
