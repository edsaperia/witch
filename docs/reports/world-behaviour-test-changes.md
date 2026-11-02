# W8 first world slice: assertion dispositions

Approved by Ed, 2 November 2026 (1632#6576776394); prioritised after acceptance of #1656 in 6577541796. This PR covers 12 audited source declarations in nine files, with the buffer template retaining all seven registrations. It does not move whole mixed tests or change production code. Audit identifiers below use73741aa8 start lines; current membership is reconciled by exact test name.

| Case | Informational report | Blocking protection retained |
|---|---|---|
| archipelago:22 | nearest coast `<4*STRAIT` | each coast `>STRAIT-8`; explicit neighbour coverage |
| beachDecor:35 | `>50` footprints | nonempty rocks/prints, every rock on a rocky stretch, exercised fading |
| bufferClearings:15 | incidental hard-clear spots `<=ceil(inland*.25)` | original playable/buffer `arenaOpen` checks and `buffer>10` coverage across all seven fixtures |
| groundcover:19 | `>5` reeds | nonempty ponds/rim reeds and every tuft outside pond water |
| groundcover:30 | more tufts near feet with forest than without | original wooded/tree coverage, nonempty tufts and trunk clearance |
| lakeShore:16 | `>50` shore pieces | nonempty pieces, exact seeded equality, allowed kinds, shore/path/legend-clearance bounds |
| lakeShore:30 | `>4` lava lights | actual nonempty lava glow, no oasis glow, no plain-water dressing/glow |
| layoutPatterns:18 | mean mask between `.6` and `1.5` | exact eleven supported names |
| layoutPatterns:22 | range `>.8`, absolute pair correlation `<.8` | exercised fields and every minimum nonnegative |
| mapShape:53 | radial headland/bay ratio `>1.1` | **the >90% inside/outside boundary agreement**, seed distinction and zero-amplitude endpoint |
| rosters:44 | `>2` distinct home deals over eight nights | exact dealt count, no own/duplicate/out-of-roster kinds, unfound-first behavior |
| zooMap:20 | median nearest street above gap and at most street+1 | all kinds, unique cells, across-size, plaza clearance and every minimum coast gap |

The report retains original seeds, matrices, coordinates, outline resolution and numerical references. It records actual values plus sample metadata. Pattern correlation uses the original formula; original shared full maps and authored islands are not reduced. Blocking coverage thresholds retained above are guards against vacuity, not replacements for the removed quality targets. Other cases in these files are unchanged, including W7's separate pattern-shape case.

## Report infrastructure

`world.behaviour.ts` adds this slice to the accepted independent nightly/manual pattern. The runner requires fresh `music.json` and `world.json`, removes each system's prior file before execution and reports missing results as execution errors. The metric helper adds `<=` for the original buffer/street references, with direct equality/exceedance checks. Scheduled quiet-night behavior from #1656's correction15a634466 is carried as a dependency; no world changes are pushed to that branch. Manual reports still always run.

## Validation and timing

Local validation is typecheck, report-survey typecheck, five lightweight harness cases, generated tool-index freshness and whitespace checks. No laptop generated-world/browser/full-suite run. Own exact-head CI must validate the retained world cases. Full report execution remains coordinator-dispatched after workflow registration on main; a PR check is not a survey execution.

Baseline source is prototype7313e5781, with accepted music/report dependency15a634466. Prototype CI41447815433 was still running at source pickup; exact candidate/baseline timings are pending. No file-envelope, declaration count or historical audit duration is claimed as savings. Console durations including hooks and JSON assertion envelopes must be distinguished, as #1656 demonstrated. Final measured comparisons are reported on this PR after CI completes, without changing tested source merely to attach results.

## Remaining scope

Seventeen W8 declarations in the shared `rules.test.ts` remain unchanged:65,80,301,766,1049,1063,1110,1121,1131,1148,1172,1200,1221,1231,1513,1524,1621. Start their separate small PR after this slice reaches coordinator review, per [the plan](../plans/world-behaviour-reports.md). W4/W7/W-R2-1, combat and multiplayer are outside this PR. The accepted music dependency is combined once by the coordinator; this builder performs no merge to prototype/main or release.
