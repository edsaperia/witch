# Behaviour reports

Ed, 2 November 2026: outcome statistics never block a release. This directory starts with approved music survey M4; later systems join only through their own reviewed PRs.

Run from the repository root:

```
node tools/behaviour/run.mjs
npx vitest run tools/ci/behaviour-report.test.ts --maxWorkers=1
npx tsc -p tools/behaviour/tsconfig.json
```

The first command uses a separate Vitest configuration, one worker and `*.behaviour.ts` discovery outside the blocking test configuration. It retains the original radius-map setup, seed 123, 0.1-second sampling over 60/600 seconds for sea-life cues and 60 seeds × ABC for melodies. No browser or audio device is used. It records actual counts, ratios, sample metadata, exact Git SHA, tracked-dirty state, elapsed wall time and historical references in `out/behaviour/`. `summary.md` is readable; `run.log` preserves execution output. Every attempt removes its own previous result filenames before starting.

Outside-reference values are informational and leave the command successful. Missing, nonfinite or failed measurements are execution errors and fail the standalone reporting command, preserving that distinction. The independent workflow runs at 04:47 UTC nightly against a resolved prototype SHA or manually against the selected revision. It is never invoked by PR/build/release CI. Its artifacts last 14 days. Scheduled errors or observations update one standing canonical issue comment; passing nights stay quiet unless recovering that comment.

The workflow becomes schedulable after it reaches the default branch. A local run or a PR check does not prove a scheduled run occurred. Actual cloud timing savings require comparable CI measurements; historical file totals and local timings are not cloud savings.
