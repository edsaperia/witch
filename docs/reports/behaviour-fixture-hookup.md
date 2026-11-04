# T6 nightly integration checkpoint

Implements coordinator1632#6578304163 independently of release CI. Base c7b1f993 retains merged world-rules. Dependency #1660 c66e07ffe supplies its accepted replay and fixture split unchanged; additive note conflicts preserved both branches, and tools inventory was regenerated. IP2 #1663 must retain both invite providers alongside world-rules and this hookup when canonical combines it.

The reporting runner invokes the original replay test and separate fixture CLI sequentially, with two-minute subprocess bounds. Their logs, raw fixture JSON, actual values, references and elapsed fixture seconds accompany the existing report. Historical outcomes remain informational, including false values for all four rows. Replay/process/malformed/stale-output failures become execution errors, without a release dependency. Existing music/world/world-rules registrations and nightly quiet policy remain.

Tests changed: four lightweight cases added to `tools/ci/behaviour-report.test.ts` for actual false observations/readable output; stale/missing/invalid data; sequential commands/bounds/stale cleanup; and replay/process/missing-output failures with logs. Its existing five tests remain unchanged. No test declaration removed. #1660's replay declaration, calls, equality/accounting/fixture assertions and four synthetic split tests remain unchanged. No game/tuning/combat/MP or player-facing text changed.

Local validation: normal typecheck, nine reporting harness cases, four supplied-data fixture split cases and syntax checks. No laptop generated game/replay/world, browser or full suite. Exact CI result and later independent cloud report must be attached separately; source validation does not prove nightly execution. The original MJS checks did not run in release CI, so no CI saving is demonstrated.

W8 priority interruption: checkpoint3c4454a46 was saved before the requested existing-artifact timing investigation (1632#6578871842). That investigation preserves every assertion and source checkpoint; it does not authorize an invented timing gate or tuning change.
