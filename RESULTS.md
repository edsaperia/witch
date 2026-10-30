# Parity results B (not for merge)

Commit: 71fcf5fa07fd9aa8c627abe9230ea137e8efd96d (HEAD confirmed). Baseline 5e51a00c4 present locally (`git cat-file -t` = commit). `npm ci` succeeded. No source files edited. Commands run exactly as given.

Note: my first launch was killed by me within seconds (a wrong background timeout and a pkill); its output dirs were deleted and both shards re-run from scratch. Results below are from the clean re-run.

## Shard 2 (SHARDS=8 SHARD=2)
- Exit code: 1
- Wall-clock: 7 s
- Summary: rows 0 of expectedRows 68 (totalMatrixRows 534); complete=false; no pass/fail, no RGBA difference counts, no sensitivity results.
- Error: `Error: page.evaluate: Error: lake kind 0 not exercised` at `Module.compareGround (tools/bench/ground-parity-scene.mjs:120:36)`
- GPU: ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)
- Console: only esbuild duplicate-key warnings for `legendLob` and `legendBeam` in art/effects.js (130/131 vs 103/104). No shader/link/page errors printed.

## Shard 3 (SHARDS=8 SHARD=3)
- Exit code: 1
- Wall-clock: 5 s
- Summary: rows 0, complete=false.
- Error: identical to shard 2 (`lake kind 0 not exercised`, ground-parity-scene.mjs:120:36).
- Console: same duplicate-key warnings only.

Files skipped (over 20 MB): none. Included: ground-extra-parity-{2,3}/{results.json,baseline.cjs,candidate.cjs,console.log}.
