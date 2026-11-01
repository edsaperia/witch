# A4 evidence guard publication

Branch `codex/a4-evidence-guard`; worktree `work/a4-evidence-guard`.
Owner chat `01a19366-12da-7cc0-a12c-d252489911ae`; parent rehearsal PR #1562.
Base prototype `e67842754af816e233ddadf6ba932f51b191aa7c`.

Publish only the confirmed evidence-completeness fix from local rehearsal commit
`9aa1969768a9da123f4516ce5ec8f52c3d7cf8e4`, its fixture and this documentation.
The shared benchmark comparator intentionally supports rules-only inputs. An A4
no-change proof needs both rules and frames, so a missing frame run must fail
before reaching that comparator. Its comparison rules remain unchanged.

The standalone CLI takes before/after directories and full source SHAs. It checks
the default quick workload (seeds 123/165272, wave 10, 900 steps and all three
checkpoints), source keys, all three quick scenes and PNGs, and page errors.
It validates completeness only; then run the existing comparator without an
expected-change declaration or override. Neither command's output alone proves
an entire A4 rehearsal. No browser or game runs in the guard.

The two helper/fixture files are selected from the rehearsal; the explicit CLI
adapts the helper to prototype without importing any split manifest or runtime.
No supervisor, browser preload, main/view split, product source, workflow or
historical evidence is included. #1562's remote f90c8674e and local 9aa196976
remain intact. This PR neither opens the fence nor grants a proof slot.

Validation: small Node fixture tests, syntax and generated tool inventory checks.
No full suite, typecheck, art bake, browser, benchmark or proof runner is requested.
Canonical owns CI/release priority. No user-visible text changed.
