# CI speed and readable failures (coordinator, 2026-10-31, from Ed's 48-hour review)

Ed asked for the causes of slow work to be fixed. Measured today:
- **art check** (`.github/workflows/art-check.yml`): 44–57 min on release heads.
- **check:** 12–22 min.
- **smoke:** 5–9 min.
- **bench:quick:** 8–10 min.
- Push-to-live for a combined release is about 2 hours (PR CI, then release CI, then deploy). Seven PRs at once queue jobs.
- The coordinator's environment can read check-run **annotations** but not Actions logs or artifacts, so every failure needs a builder to download and relay it, and relays are lossy (today one relay carried 2 of 5 failures).

## Do, in this order (one PR per numbered item is fine)

1. **Readable failures.** Every failing tool emits concise GitHub annotations (`::error file=…,line=…::message`) the coordinator can read via the API:
   - vitest: each failing test's name, file and first assertion line;
   - `tools/config/check.mjs`: each stale table or invalid config;
   - `tools/bench/compare.cjs`: each mismatching scene/frame with pixel counts, bbox and the rules-fingerprint scene;
   - the art check: each failing card/page/key with its reason (for example the Art Lab ReferenceError seen today);
   - smoke: each failing check name.

   Cap it at about 20 annotations per job, plus one summary annotation with the totals. Keep the artifacts as they are.
2. **Art check reuse on releases.** Facts from `.github/workflows/art-check.yml`:
   - Ordinary PRs already reuse cached task results by fingerprint (`tools/art-check/affected.mjs`).
   - Release-check PRs (`claude/rel-*` or titled "Release check:"), **and every push to `claude/prototype` and `main`**, run the full uncached check: 44–57 min each. So one release costs **three** full runs: the release PR (blocking publication), then the prototype push and the main push (not blocking, but they hold runners while other PRs queue).
   - The workflow also triggers on PR `edited` (a title or body edit restarts it, as happened to #1542).

   Wanted: the release PR reuses fingerprinted results like ordinary PRs. The prototype/main pushes skip when the pushed tree equals a tree whose art check already passed, so a fast-forward of a checked release head costs nothing. `edited` events don't re-run art when the code hasn't changed.

   Original text of this item: A combined release re-runs the full art check even though every merged PR head already passed it. Reuse each PR's passing art check when the release's art inputs are byte-identical to the union already checked: hash the inputs the art check actually reads (art/, the art config, generator code). Re-run only when the release's art input hash differs from every passed head's, or a merge touched art inputs. Look at the existing "Restore successful PR art checks" step first and extend it rather than adding a parallel mechanism. Prove it on a replay of today's release #1549 (ea42af82): it would have reused, and a deliberate art change must not reuse.
3. **Pages churn.** `pages.yml` deploys on every gh-pages push. Each PR head's `preview` job pushes to gh-pages, which gave 69 cancelled Pages deploys today, and the live deploy waits in that queue. Debounce or coalesce: for example the Pages deploy runs at most once a minute and always for `main`, or previews batch. Main's deploy must never wait behind preview churn. Measure before and after: the time from main's push to the live version.
4. **Superseded runs.** `ci.yml` already cancels in-progress runs per ref (non-main). Check that `art-check.yml` and `pages.yml` do too, and that a PR title/body edit doesn't restart CI (today one did, #1542).
5. **Local config gate timeouts.** `node tools/config/check.mjs` times out in Vite SSR `fetchModule` (60 s) on Ed's Windows laptop (`rules/creatures.ts` via `combat/data.ts`, `wildWatch.ts`), but passes in the cloud. Find out why (cold transform of big modules on Windows?) and make it reliable locally, without raising the CI timeout blindly.

## Rules
- No test skipped or weakened. Green must still mean the same as today.
- Owns: `.github/workflows/*`, `tools/config/check.mjs` (only its reporting and timeouts), the reporting parts of `tools/bench/compare.cjs`, the art check's reporting, and vitest reporter config.
- Before/after timings in each REPORT. The coordinator publishes workflow changes in a release like any other change.
