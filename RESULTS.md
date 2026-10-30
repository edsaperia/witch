# Parity results A (not for merge)

Commit: 71fcf5fa07fd9aa8c627abe9230ea137e8efd96d (branch codex/travel-perf-2); baseline 5e51a00c4 present locally. `npm ci` ok. Sources not edited.

Both commands failed fast (before any row was compared):

| shard | exit code | wall-clock | rows done / expected | complete |
|---|---|---|---|---|
| SHARD=0 | 1 | 6 s | 0 / 68 | false |
| SHARD=1 | 1 | 3 s | 0 / 68 | false |

Printed summary: no pass/fail or row summary was printed; stdout/stderr held only esbuild duplicate-key warnings (art/effects.js:130-131, legendLob/legendBeam). No RGBA difference counts, no sensitivity results (none reached).

Error recorded in results.json for shard 0:
`Error: page.evaluate: Error: lake kind 0 not exercised`
Error recorded in results.json for shard 1:
`Error: page.evaluate: Error: lake kind 0 not exercised`

GPU: ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver).

Files skipped for size (>20 MB): none (each directory ~3.3 MB: baseline.cjs, candidate.cjs, results.json).
Raw logs: not committed (gitignored); content was only the esbuild warnings above.
