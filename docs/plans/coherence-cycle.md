# Coherence cycle (brief)

Ed asked (2026-10-30 15:12 UTC) for a coherence pass once the structural work landed. It has: robustness logging and replay (#1493), save slots (#1494), input stack (#1495), art-cache fingerprints (#1487/#1500), attack fixes (#1480), travel-perf-2 M1+M2 (#1498), house first-show precompute (#1507), CI shared build and small test worlds (#1496), sleep-cell test fix (#1516). Live is v6478 = claude/prototype 82e4e24c.

Review range: `e9d2ecfb..82e4e24c` (v5967 → v6478), about 408 files in src/, tools/ and .github/.

Two tracks, one builder each, on separate branches so they never touch the same files without saying so first.

## Track R: code review (branch `codex/coherence-review`)

1. Read the range for correctness bugs, especially at the seams between features that landed in parallel today:
   - save slots × input stack × recording/replay (pause, resume, restore bundles);
   - map-prep worker (paths/heights) × art cache × worker `format: "es"`;
   - house precompute virtual module × furniture/hat runtime paths;
   - travel readiness (per-program shader readiness, beach on demand) × sleep-until-alarm landing.
2. Post findings as a REPORT: each with file:line, what goes wrong in play, how sure you are (proven by a test / traced / suspected), and severity.
3. Fix small, clearly local bugs on this branch with a test each. Anything that changes behaviour Ed would notice, or spans systems, goes to me as a QUESTION first.
4. No tuning or balance changes. No refactors for taste.

## Track H: housekeeping and docs (branch `codex/coherence-housekeeping`)

Known items:
1. `src/app/lazyScreen.ts` and its test are unused in product code (left from the stopped rare-screen split). Remove, or say why it should stay.
2. `tools/rare-screens/` (poll.mjs, value-estimate.cjs) and large `docs/rare-screens-*.json` records: remove or move to an archive, keeping any number a decision relied on.
3. Duplicate keys `legendLob` / `legendBeam` in the effects data (find them; the later one silently wins).
4. Smoke: the effects-off/on scenes take pictures but assert nothing, and on SwiftShader can catch a half-built black frame on either build. Give them a real assertion (or a wait that guarantees the scene is drawn) so they prove something.
5. Smoke flakes: list any check that has failed and then passed on rerun in CI over the last day (from CI history), with a cause or a fix.
6. Docs: walk docs/plans/ and docs/notes/ for plans that are finished or superseded today and mark them so (or archive), and fix docs that now describe old behaviour (CI pipeline, save format, input handling, travel loading, house build). Don't hand-edit generated files (KNOBS.md, schema descriptions, docs/notes/INDEX.md, LINK-SWITCHES.md, tools READMEs): those belong to #1510.
7. Builder-local helpers committed by accident (pollers, temp diagnostics): find and remove.

## Both tracks

- PLAN first (short), then work.
- Merge claude/prototype before each milestone.
- No laptop browser without a slot. Cloud runs go through me.
- FINAL with head SHA, CI green on it, and a plain list of what changed.
