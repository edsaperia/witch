# Music behaviour report: timing evidence

Baseline: green prototype `79d539208a6916aedc9d0f918b6cbe64826e64f0`, [CI run 41441454183](https://github.com/edsaperia/witch/actions/runs/41441454183). Values below come from its four `unit-selection-*` artifacts (`ci-unit-timings.json` and `ci-unit-results.json`), not the audit's older timing fixture.

| Changed file | Baseline measured file time |
|---|---:|
| `src/platform/audio/seaLife.cues.test.ts` | 8.561 s |
| `src/rules/musicForm.test.ts` | 9.376 s |
| `src/platform/audio/tempoUp.cues.test.ts` | 0.866 s |

The original dolphin case measured 3.383 s, the kraken case 3.043 s and the melody survey 0.006 s. These contain setup and other work; moving a survey does not save its containing file's entire duration. The replacement sea-life suite keeps a real coast fixture, adds controlled delivery checks and removes repeated generated-game setup. The cheer change is wording only and claims no time saving.

Baseline unit test-process durations by shard were 170.090 / 234.798 / 290.981 / 327.392 s; selector-plus-process totals were 172.421 / 237.372 / 293.355 / 330.483 s. Concurrent shard times are not additive CI wall time.

Candidate: `f9b641ad2f236b9260d5de1965f66de64b095381`, [CI run 41444363518](https://github.com/edsaperia/witch/actions/runs/41444363518). Candidate measurements are pending. **CI savings are not yet established.** Compare exact changed-file durations and shard work when this run completes, retaining the uncertainty from different runners, suite selection and shard packing. A simple total-job delta is not proof of savings caused by this PR.

The new report workflow's branch dispatch was attempted once and GitHub returned HTTP 404 because the workflow is not registered on the default branch. The coordinator will dispatch after merge, per [instruction 6576951911](https://github.com/edsaperia/witch/pull/1632#issuecomment-6576951911). No local generated-world/report run is claimed. This first report execution remains a named follow-up condition; it does not authorize treating unmeasured results as passing.

## Changed tests and retained protections

- `seaLife.cues.test.ts`: the two generated occurrence cases move unchanged sample sizes to the informational report. Opposite-coast exclusions and inland silence remain blocking; supplied dolphin/kraken events additionally prove exactly-once delivery and water-pour routing without requiring naturally sampled occurrences. A shared real coast fixture preserves the original spatial coverage.
- `musicForm.test.ts`: only “mostly slow, with whole notes and triplets often, and some busier bars” moves to reporting. The original 60 seeds × ABC and four numeric references remain visible. All remaining note, pitch, rest, triplet-timing, section and form checks are untouched.
- `tempoUp.cues.test.ts`: correct +1 BPM to the current +5 BPM description and remove obsolete rewind wording. Both cheer timing assertions are unchanged.
- `tools/ci/behaviour-report.test.ts`: four new lightweight checks prove out-of-reference values are data, invalid measurements are separate errors, summaries retain actual numbers and reporting discovery/workflow triggers remain outside release tests.

No production engine, score, tuning, combat or multiplayer changes. No player-facing text changes.
