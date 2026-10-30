# Parity results D (not for merge)

Commit: 71fcf5fa07fd9aa8c627abe9230ea137e8efd96d (codex/travel-perf-2); baseline 5e51a00c4 available locally.
`npm ci` ok. Skipped files over 20 MB: none.

Both shards failed before comparing any row (rows: [], complete: false). Not worked around; no code edited.

## Shard 6 (SHARDS=8 SHARD=6)
- exit code: 1
- wall-clock: 6 s
- results.json: expectedRows 66 of totalMatrixRows 534; rows 0; complete false
- error: `Error: page.evaluate: Error: lake kind 0 not exercised at Module.compareGround (tools/bench/ground-parity-scene.mjs:120:36)`
- RGBA difference counts / sensitivity results: none produced
- Other output: only esbuild "Duplicate key legendLob/legendBeam" warnings for art/effects.js:130-131 (no shader/link/page errors printed)
- GPU: ANGLE SwiftShader (Vulkan 1.3, Subzero)

## Shard 7 (SHARDS=8 SHARD=7)
- exit code: 1
- wall-clock: 5 s
- results.json: rows 0, complete false
- error: `Error: page.evaluate: Error: lake kind 0 not exercised at Module.compareGround (tools/bench/ground-parity-scene.mjs:120:36)`
- Output: same esbuild duplicate-key warnings only
