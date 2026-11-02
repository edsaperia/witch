# Behaviour reports

Ed, 2 November 2026: outcome statistics never block a release. This directory contains approved music survey M4 and the first W8 world slice (12 focused declarations). Later slices/systems join only through their own reviewed PRs.

Run from the repository root:

```
node tools/behaviour/run.mjs
npx vitest run tools/ci/behaviour-report.test.ts --maxWorkers=1
npx tsc -p tools/behaviour/tsconfig.json
```

The first command uses a separate Vitest configuration, one worker and `*.behaviour.ts` discovery outside the blocking test configuration. It retains the original radius-map setup, seed 123, 0.1-second sampling over 60/600 seconds for sea-life cues and 60 seeds × ABC for melodies. No browser or audio device is used. It records actual counts, ratios, sample metadata, exact Git SHA, tracked-dirty state, elapsed wall time and historical references in `out/behaviour/`. `summary.md` is readable; `run.log` preserves execution output. Every attempt removes its own previous result filenames before starting.

`world.behaviour.ts` preserves W8's focused-file samples: world 0/four nearest coast outlines at resolution32; full seed123 beach/groundcover; the original seven seed/island/size buffer fixtures; seed1 lava island; seed7 pattern fields at -58..58 in steps of2; five original coast seeds; eight home legend deals; and all zoo islands at the original chart scale. JSON includes fixture metadata and actual measurements, not just pass/fail. `world.json` and `music.json` are both required for a complete run. The 17 shared `rules.test.ts` W8 declarations remain unchanged pending their separate slice; W4/W7/W-R2-1 are not included.

Outside-reference values are informational and leave the command successful. Missing, nonfinite or failed measurements are execution errors and fail the standalone reporting command, preserving that distinction. The independent workflow runs at 04:47 UTC nightly against a resolved prototype SHA or manually against the selected revision. It is never invoked by PR/build/release CI. Its artifacts last 14 days. Scheduled errors or observations update one standing canonical issue comment; passing nights stay quiet unless recovering that comment.

Ed's 2 November pre-release correction (1632#6577571686): scheduled runs skip successfully when prototype's latest commit is over 24 hours old. This uses his expressly permitted age shortcut, not a claim that the SHA was compared with the last report. Skips install/run/upload nothing and post no comment. Manual dispatch always runs; invalid date metadata fails open so it cannot silently suppress a report.

The workflow becomes schedulable after it reaches the default branch. A local run or a PR check does not prove a scheduled run occurred. Actual cloud timing savings require comparable CI measurements; historical file totals and local timings are not cloud savings.
