# Parity results C (not for merge)

Commit 71fcf5fa07fd9aa8c627abe9230ea137e8efd96d (codex/travel-perf-2); baseline 5e51a00c4 present locally. `npm ci` ok. No source edits.

Both shards FAILED early with the same error; no rows were compared.

| shard | command | exit | wall-clock | rows | complete |
|---|---|---|---|---|---|
| 4 (of 8) | ground-extra-parity.mjs ground-extra-parity-4 | 1 | 5 s | 0 of 66 expected (534 total) | false |
| 5 (of 8) | ground-extra-parity.mjs ground-extra-parity-5 | 1 | 4 s | 0 of 66 expected | false |

Error in results.json (shard 4):
`Error: page.evaluate: Error: lake kind 0 not exercised at Module.compareGround (http://127.0.0.1:46069/tools/bench/ground-parity-scene.mjs:120:36)`

Shard 5 error: `Error: page.evaluate: Error: lake kind 0 not exercised
    at Module.compareGround (http://127.0.0.1:42391/tools/bench/ground-parity-scene.mjs:120:36)
    at async <anonymous>:337:30`

No RGBA difference counts, sensitivity results or pass/fail summary were produced. Console output was only esbuild "Duplicate key legendLob/legendBeam" warnings from art/effects.js:130-131. GPU: ANGLE SwiftShader Vulkan (CPU renderer).
Output dirs: ground-extra-parity-4/, ground-extra-parity-5/ (baseline.cjs, candidate.cjs, results.json each); no files over 20 MB skipped.
